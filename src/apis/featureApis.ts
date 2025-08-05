import axios from 'axios';

export class FeatureApis {
    static async getFeatureList(referenceid: string) {
        const data = await axios.post(
            `https://routes.msg91.com/api/${referenceid}/widget?source=mobileSDK`
        )
        return data.data?.data
    }
    static async getProxyAuthTokenForGoogleAuth(state: string, idToken: string) {
        try {
            const data = await axios.post(
                `https://routes.msg91.com/api/auth/callback?source=mobileSDK&state=${state}&accessToken=${idToken}`
            )
            return data.data
        } catch (e) {
            throw e
        }
    }
    static async getProxyAuthTokenForAppleAuth(state: string, idToken: string, authorizationCode: string) {
        try {
            const data = await axios.post(
                `https://routes.msg91.com/api/auth/callback?source=mobileSDK&state=${state}&accessToken=${idToken}&id_token=${idToken}&code=${authorizationCode}`
            )
            return data.data
        } catch (e) {
            throw e
        }
    }
}