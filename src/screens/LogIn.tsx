import { useState } from "react";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { signIn } from "../util/auth";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function LogIn():React.JSX.Element{
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState('')

    async function submitHandler(user:any){
        setIsAuthenticating(true)
        try{
            await signIn(user.email, user.password)
        }catch(e){
            setError('Check your credentials and Try again')
        }
        setIsAuthenticating(false)    
    }
    if(isAuthenticating){
        return <LoadingOverlay/>
    }
    if (error){
        return <ErrorOverlay message={error}/>
    }
    return(
        <AuthContent
            submitLabel="Log In"
            isRegistered = {true}
            onAuthenticate={submitHandler}
        />
    ) 
}

export default LogIn;