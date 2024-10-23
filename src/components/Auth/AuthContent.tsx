import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AuthForm from "./AuthForm";
import { ColorsList } from "../../util/Colors";
import { LogInNavigationProp, SignUpNavigationProp } from "../../types/NavigationProps";

type AuthContentProps ={
    isRegistered: boolean,
    submitLabel : string
    onAuthenticate : (user:any)=>void
}

function AuthContent({isRegistered,submitLabel,onAuthenticate}:AuthContentProps){
    const navigation = useNavigation<LogInNavigationProp|SignUpNavigationProp>();
    
    function switchMode(){
        if (isRegistered){
            navigation.navigate('SignUp')
        }else{
            navigation.navigate('LogIn')
        }
    }

    return(
        <View style={styles.container}>
            {!isRegistered && <Text style={styles.title}> Register Now!!!</Text>}
            <AuthForm
                isRegistered={isRegistered}
                submitLabel={submitLabel}
                onSubmit={onAuthenticate}
                switchMode={switchMode}
            />
        </View>
    )
}

export default AuthContent;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:ColorsList.primary800,
        paddingTop:100
    },
    title:{
        fontSize:24,
        color:'white',
        fontWeight:'bold',
        marginVertical:24,
        textAlign:'center',
       
    }
})