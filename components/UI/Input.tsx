
import { View , Text, TextInput, StyleSheet, TextInputProps, StyleProp, ViewStyle} from "react-native";
import { ColorsList } from "../../util/Colors";

type InputProps = {
    label:string,
    textInputConfig : TextInputProps,
    invalid : boolean
    /*type: e, //can use this type with {} type declaration too
    maxLength: number*/
}

function Input(props:InputProps):React.JSX.Element{
    const {label, textInputConfig,invalid} = props

    let inputStyles = styles.input;
    
    if (textInputConfig && textInputConfig.multiline) {
        inputStyles= {...inputStyles,...styles.inputMultiline};
    }
    if (invalid){
        inputStyles = {...inputStyles, ...styles.invalidInput}
    }
    return (
        <View style={styles.container}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig}/>
        </View>
    )
   
}

export default Input;

const styles = StyleSheet.create({
    container:{
        marginHorizontal:4,
        marginVertical:8,
       
    },
    label :{
        color: ColorsList.primary100,
        marginBottom:4,
        fontSize:12
    },
    input:{
        backgroundColor:ColorsList.primary100,
        color:ColorsList.primary800,
        padding:6,
        borderRadius:6,
        fontSize:18,
       
    },
    inputMultiline:{
        minHeight:100,
        textAlignVertical:'top'
    },
    invalidLabel:{
        color: ColorsList.error500
    },
    invalidInput:{
        backgroundColor:ColorsList.error50
    }
        
})