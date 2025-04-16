// import { storeToken } from './tokenStorage';
import { googleLogin } from './providers/googleAuth';

let companyToken: any = null;

/**
 * Initialize the authentication service with company token
 * @param {string} token - Company identification token
 * @param {string} baseUrl - Optional custom API base URL
 */
export const initializeAuth = (token: string) => {
    companyToken = token;
};

/**
 * Login with the specified provider
 * @param {string} provider - Authentication provider (google, linkedin, email, otp)
 * @param {object} options - Provider-specific options
 * @returns {Promise<object>} - Authentication result
 */
export const login = async (provider: any) => {
    if (!companyToken) {
        throw new Error(
            'Authentication not initialized. Call initializeAuth first.'
        );
    }

    let authData;

    // Handle different auth providers
    switch (provider) {
        case 'google':
            authData = await googleLogin();
            break;
        default:
            throw new Error(`Unsupported authentication provider: ${provider}`);
    }

    // Exchange auth code for company auth token
    return JSON.stringify(authData)

    // if (!response.ok) {
    //     const error = await response.json();
    //     throw new Error(error.message || 'Authentication failed');
    // }

    // const authResult = await response.json();

    // // Store the token securely
    // await storeToken(authResult.token);

    // return authResult;
};
