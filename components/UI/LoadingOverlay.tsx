import { View, ActivityIndicator, StyleSheet } from "react-native";
import { ColorsList } from "../../util/Colors";

function LoadingOverlay(){
    return(
        <View style={styles.container}>
            <ActivityIndicator
                color = 'white'
                size = 'large'
            />
        </View>
    )
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:24,
        backgroundColor: ColorsList.primary700
    }
})