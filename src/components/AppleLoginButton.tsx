import {
  appleAuth
} from '@invertase/react-native-apple-authentication';
import { Platform, Alert, TouchableOpacity, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { FeatureApis } from '../apis/featureApis';
import React from 'react';

const AppleLoginButton = ({
  onLoginSuccess,
  onLoginFailure,
  buttonStyle,
  textStyle,
  loadingColor,
  disabled,
  loading,
  feature
}: {
  onLoginSuccess: (result: any) => void;
  onLoginFailure: (error: any) => void;
  buttonStyle?: object;
  textStyle?: object;
  loadingColor?: string;
  disabled?: boolean;
  loading?: boolean;
  feature: {
    text: string
    urlLink: string
    state?: string
  }
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAppleLogin = async () => {
    // Show alert asking user not to hide email
    Alert.alert(
      "Apple Sign In",
      "Please don't hide your email address. We need your email for proper authentication and identification",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Continue",
          onPress: () => performAppleLogin()
        }
      ]  
    );
  };

  const performAppleLogin = async () => {
    try {
      setIsLoading(true);
      if (appleAuth?.isSupported) {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        console.log(appleAuthRequestResponse,"Apple login ");

        const { identityToken, authorizationCode } = appleAuthRequestResponse;
        const state = feature?.state ?? (feature?.urlLink?.split('state=')[1]?.split('&')[0] || '');
        console.log("state=========",state);
        
        if (!identityToken) {
          throw new Error('Apple Sign-In failed - no identity token returned.');
        }

        const proxyResponse = await FeatureApis.getProxyAuthTokenForAppleAuth(state, identityToken, authorizationCode || '');

        onLoginSuccess && onLoginSuccess(proxyResponse);
      }
    } catch (error) {
      console.error('Apple login failed:', error);
      onLoginFailure && onLoginFailure(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (Platform.OS !== 'ios') return null;

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && styles.disabled]}
      onPress={handleAppleLogin}
      disabled={disabled || loading || isLoading}
    >
      {(loading || isLoading) ? (
        <ActivityIndicator color={loadingColor || '#000'} />
      ) : (
        <View style={styles.buttonContent}>
          <Image source={require('../image/apple.png')} style={styles.logo} />
          <Text style={[styles.text, textStyle]}>Sign in with Apple</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 12,
    minWidth: 250,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  disabled: {
    opacity: 0.7,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  text: {
    color: '#757575',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AppleLoginButton;
