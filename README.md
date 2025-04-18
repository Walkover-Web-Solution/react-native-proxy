# react-native-proxy

react-native-proxy

## Installation

```sh
npm install react-native-proxy
```

FOR ANDROID ONLY
refer to this doc for setting up google dependencies
https://react-native-google-signin.github.io/docs/setting-up/android

## Usage

import ShowGoogleLoginButton from 'react-native-proxy'

<ShowGoogleLoginButton
    referenceId=<YOUR REF ID>
    onLoginSuccess={handleLoginSuccess}
    onLoginFailure={handleLoginFailure}
/>
ANDROID STEP 1  
file : android/app/build.gradle
location: inside dependecny

implementation platform('com.google.firebase:firebase-bom:33.12.0')
implementation 'com.google.firebase:firebase-analytics'
implementation 'com.google.android.gms:play-services-auth:20.7.0'

ANDROID STEP 2
file : android/app/build.gradle
location: paste at last

apply plugin: 'com.google.gms.google-services'

ANDROID STEP 3
file : android/build.gradle
classpath 'com.google.gms:google-services:4.4.0'



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
