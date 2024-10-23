import { useState } from "react";
import auth from '@react-native-firebase/auth';

import AuthContent from "../components/Auth/AuthContent";
import { User } from "../types/User";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { SignUpNavigationProp } from "../types/NavigationProps";
import { Alert } from "react-native";

type props ={
    navigation : SignUpNavigationProp
}
function SignUp({navigation}:props):React.JSX.Element{
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState('')

    async function submitHandler(user:User){
        setIsAuthenticating(true)
        try{
            await createUser(user)
            //Alert.alert("Regisered Succesfully", "LogIn Now") 
            //await auth().signOut()
            //navigation.navigate('LogIn')
        }catch(e){
            setError("Registering failed, Try again later")
        }
        setIsAuthenticating(false)
        
    }

    if(isAuthenticating){
        return <LoadingOverlay/>
    }
    if(error){
        return <ErrorOverlay message={error}/>
    }
    return(
        <AuthContent
            submitLabel="Sign Up"
            isRegistered = {false}
            onAuthenticate={submitHandler}
        />
    )
  
}

export default SignUp;
