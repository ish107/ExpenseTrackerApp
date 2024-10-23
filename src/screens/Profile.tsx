import { StyleSheet, Text, View } from "react-native";
import { ColorsList } from "../util/Colors";
import Button from "../components/ui/Button";
import { logOut } from "../util/auth";
import { useUserStore } from "../store/auth-store";


function Profile():React.JSX.Element{
    const name = useUserStore.getState().userDetails.firstName
    console.log(name)
   
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Hello, {name}</Text>
            <Button onPress={logOut}>Log Out</Button>
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container:{
        backgroundColor:ColorsList.primary800,
        flex:1
    },
    title:{
        fontSize:24,
        color:'white',
        fontWeight:'bold',
        marginVertical:24,
        textAlign:'center'
    },
})