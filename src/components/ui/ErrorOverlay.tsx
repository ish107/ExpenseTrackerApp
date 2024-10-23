import { View,StyleSheet, Text } from "react-native";
import { ColorsList } from "../../util/Colors";


type ErrorOverlayProps={
    message:string,
}
function ErrorOverlay({message}:ErrorOverlayProps){

    return(
        <View style={styles.container}>
            <Text style = {[styles.text, styles.title]}>An Error Occured!</Text>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:24,
        backgroundColor: ColorsList.primary700
    },
    text:{
        textAlign:'center',
        marginBottom:8,
        color:'white'
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        color:'white'
    }
})