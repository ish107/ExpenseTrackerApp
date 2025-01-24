import React from "react";
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { ColorsList } from "../../util/Colors";

type ButtonProps={
    onPress : ()=>void,
    children : string ,// can use React.ReactNode to allow anything
    style?: StyleProp<ViewStyle> | undefined
}

function Button({ onPress,children,style}:ButtonProps):React.JSX.Element{
    return(
        <View style={style}>
             <Pressable onPress={onPress} android_ripple={{color:ColorsList.primary400, foreground:true}}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{children}</Text>
                </View>
            </Pressable>
        </View>
       
    )
}

export default Button;

const styles = StyleSheet.create({
    button:{
        borderRadius:4,
        padding:8,
        backgroundColor:ColorsList.primary500,
    },
    buttonText:{
        color:'white',
        textAlign:'center'
    }
})