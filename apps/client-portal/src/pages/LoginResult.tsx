import {useSearchParams} from "react-router-dom";
import {hexToString} from "../HexConverter";
import {useEffect, useState} from "react";
import {Auth, Hub} from "aws-amplify";
import {AuthHelper} from "../RefreshHelper";

export const LoginResult = () => {

    const [session, setSession ] = useState({
        accessToken: "",
        idToken: "",
        refreshToken: "",
        payload: ""
    });
    const [updatedToken, setUpdatedToken] = useState("")
    const [searchParams] = useSearchParams();
    const state = searchParams.get('state');
    const encodedState = state?.split("-")[1]!
    const clientProfileId = hexToString(encodedState)

    useEffect(() => {
        Hub.listen('auth', async (data) => {
            if (data.payload.event === 'signIn') {
                const user = await Auth.currentAuthenticatedUser();
                await Auth.updateUserAttributes(user, {
                    "custom:clientProfileId": clientProfileId
                });
                const updatedSession = await AuthHelper.refreshCurrentSession();
                setSession({
                    accessToken: updatedSession.getAccessToken().getJwtToken(),
                    refreshToken: updatedSession.getRefreshToken().getToken(),
                    idToken: updatedSession.getIdToken().getJwtToken(),
                    payload: JSON.stringify(updatedSession.getIdToken().decodePayload())
                })

            }
        })
    })
    return (
        <div className="LoginResult">
            <div>
                <ol>
                    <li>A client profile id of {clientProfileId} was included in the request: /Register?clientProfileId={clientProfileId}</li>
                    <li>That value was included as a &state={clientProfileId} parameter to cognito during the redirect</li>
                    <li>After authentication with Cognito and the iDP - cognito includes the parameter as a hex encoded value</li>
                    <li>state={state}</li>
                    <li>Where the format is [string1-string2].  String1 is an AWS identifier.  String2 is the hex encoded state we included in the request: {encodedState}</li>
                    <li>With the user logged in - and the client profile id available - we use the Amplify SDK to update the user pool record - specifically the [custom:clientProfileId]</li>
                    <li>Auth.updateUserAttributes(user, "custom:clientProfileId":{clientProfileId}")</li>
                    <li>This will permanently save the value on the user profile in Cognito and will now be included in the IDToken</li>
                    <li>Calling the Cognito userInfo endpoint with the provided access token</li>
                    <li>https://trajector.auth.us-east-2.amazoncognito.com/oauth2/userinfo</li>
                    <li>Include the access token as a Bearer token in the authorization header</li>
                    <li>You get an identity token of (check it out at jwt.io)</li>
                    <li>{session.idToken !== "" ? session.idToken : null }</li>
                    <li>Decoding the token - you will see a claim of custom:clientProfileId: {clientProfileId}</li>
                    <li>{session.payload !== "" ? session.payload: null }</li>
                </ol>
            </div>
        </div>

    )
}

