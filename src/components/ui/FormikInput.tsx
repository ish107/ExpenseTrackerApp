import { Text, TextInput, View , StyleSheet, TextInputProps} from "react-native"

import { ColorsList } from "../../util/Colors";

type FormikInputProps ={
    label:string,
    textInputConfig :TextInputProps
    name:string
    //formConfig : FormikInputProps
}

function FormikInput(props:FormikInputProps):React.JSX.Element{
    const {label,textInputConfig,name} = props;

    let inputStyles = styles.input;
    
    if (textInputConfig && textInputConfig.multiline) {
        inputStyles= {...inputStyles,...styles.inputMultiline};
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig}/>
        </View>
    )
}

export default FormikInput;

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
    } 
})