import {
    GoogleSignin
} from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';

/**
 * Configure Google Sign-In
 * @param {object} config - Google Sign-In configuration
 */
export const configureGoogleSignIn = (config: any) => {
    GoogleSignin.configure(config);

    
};

/**
 * Perform Google login and get authorization code
 * @param {object} options - Options for Google login
 * @returns {Promise<object>} - Google authentication data with auth code
 */
export const googleLogin = async () => {
    try {
        console.log('🚀 Starting Google Sign-In process...');
        
        // Check Play Services availability (Android only)
        if (Platform.OS === 'android') {
            await GoogleSignin.hasPlayServices();
            console.log('✅ Google Play Services available');
        }
        
        // This will prompt for consent and return user info
        const userInfo = await GoogleSignin.signIn();
        console.log('✅ Google Sign-In successful:', userInfo);
        
        // Get tokens (access token, id token)
        const tokens = await GoogleSignin.getTokens();
        console.log('✅ Google tokens retrieved:', tokens);
        
        return {
            ...userInfo,
            ...tokens
        };
    } catch (error: any) {
        console.error('Google Sign In Error:', error);
        throw new Error('Google authentication failed: ' + error.message);
    }
};

/**
 * Sign out from Google
 */
export const googleSignOut = async () => {
    try {
        await GoogleSignin.signOut();
    } catch (error) {
        console.error('Google Sign Out Error:', error);
        throw error;
    }
};
