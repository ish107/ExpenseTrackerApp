import { Pressable, StyleSheet, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

type IconBtnProps={
    icon:string,
    size:number,
    color:any,
    onPress:()=>void
}

function IconBtn(props:IconBtnProps):React.JSX.Element{
    const {icon, size, color, onPress} = props;
    return(
        <Pressable onPress={onPress} style={({pressed})=>  pressed && styles.pressed}>
            <View style = {styles.btnContainer}>
                <Ionicons name={icon} size={size} color={color}/>
            </View>
        </Pressable>
    )
}

export default IconBtn;

const styles = StyleSheet.create({
    btnContainer:{
        borderRadius:24,
        padding:6,
        marginHorizontal:8,
        marginVertical:2
    },
    pressed:{
        opacity:0.7
    }
})