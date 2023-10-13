import { Auth } from 'aws-amplify'
import { CognitoRefreshToken, CognitoUserSession } from 'amazon-cognito-identity-js'
export class AuthHelper {
    static async refreshSessionPromise(refreshToken: CognitoRefreshToken): Promise<CognitoUserSession> {
        return new Promise(async (resolve, reject) => {
            const user = await Auth.currentAuthenticatedUser();
            return user.refreshSession(refreshToken, async (err: any, data: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    static async refreshCurrentSession(): Promise<CognitoUserSession> {
        const session = await Auth.currentSession();
        return this.refreshSessionPromise(session.getRefreshToken());
    }
}