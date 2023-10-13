import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {Auth} from "aws-amplify";


export const Register = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const clientProfileId = searchParams.get('clientProfileId');
    useEffect(() => {
        if(!clientProfileId)
            navigate('/')
        const signIn = async () => {
            await Auth.federatedSignIn({customProvider: "id-me", customState: `${clientProfileId}`})
        }
        const signInResult = signIn()
    })



    return (
        <div className="Register">
            <h3>Register</h3>
            <p>{clientProfileId ? clientProfileId : null}</p>
        </div>
    )
}