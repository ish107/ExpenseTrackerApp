import { Formik } from "formik";
import { StyleSheet, View , Text,} from "react-native";
import * as yup from 'yup';

import FormikInput from "../ui/FormikInput";
import { ColorsList } from "../../util/Colors";
import Button from "../ui/Button";
import FlatButton from "../ui/FlatButton";
import { User } from "../../types/User";

type AuthFormProps = {
    isRegistered : boolean,
    onSubmit : (authData:any)=>void,
    submitLabel: string,
    switchMode : ()=>void
}
const initialValues = {
    firstName : '',
    lastName:'' ,
    email : '',
    password : '',
    confirmPassword : ''
}
const passwordRegx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; //uppercase, lowercase , numeric and symbols
const signUpValidationSchemea = yup.object().shape({
    firstName : yup.string().required('Name cannot be empty'),
    lastName : yup.string().required('Name cannot be empty'),
    email : yup.string().email('Invalid email address').required('Email is required'),
    password : yup.string()
        .required('No password provided')
        .min(8, 'Too short-should have atleast 8 characters')
        .matches(passwordRegx,{message:'Your password must contain al least one numerical, uppercase, lowercase and special character'}),
    confirmPassword : yup.string().oneOf([yup.ref("password")],"Passwords should match")
})
const loginValidationSchema = yup.object().shape({
    email : yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required')
})

function AuthForm({isRegistered,onSubmit,submitLabel, switchMode}:AuthFormProps):React.JSX.Element{
    const validationSchema = isRegistered? loginValidationSchema: signUpValidationSchemea;

    function handleSubmit(values: User){
        let authData = {}
        if(!isRegistered){
            authData = {
                firstName : values.firstName,
                lastName :values.lastName,
                email : values.email,
                password :values.password,
                //confirmPassword : values.confirmPassword
            }
        }else{
            authData={
                email: values.email,
                password: values.password
             }
        }
        onSubmit(authData);
        }
    
    return(
        <View style={styles.container}>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            
            >
            {({values,errors,touched,handleChange,handleBlur,handleSubmit}) => (
                <>
                {!isRegistered &&(
                <FormikInput
                label="First Name"
                name="firstName"
                textInputConfig={{
                    onChangeText: handleChange('firstName'),
                    onBlur: handleBlur('firstName'),
                    value: values.firstName,
                }}/>
            )}
                {touched.firstName && errors.firstName ? (<Text style={styles.errorText}>{errors.firstName}</Text>) : null}
                {!isRegistered && (
                <FormikInput
                label="Last Name"
                name="lastName"
                textInputConfig={{
                    onChangeText: handleChange('lastName'),
                    onBlur: handleBlur('lastName'),
                    value: values.lastName,
                }}/>
            )}
                {touched.lastName && errors.lastName ? (<Text style={styles.errorText}>{errors.lastName}</Text>) : null}
                <FormikInput
                label="Email Address"
                name="email"
                textInputConfig={{
                    keyboardType:"email-address",
                    onChangeText: handleChange('email'),
                    onBlur: handleBlur('email'),
                    value: values.email,
                }}/>
                {touched.email && errors.email ? (<Text style={styles.errorText}>{errors.email}</Text>) : null}
                <FormikInput
                label="Password"
                name="password"
                textInputConfig={{
                    secureTextEntry:true,
                    onChangeText: handleChange('password'),
                    onBlur: handleBlur('password'),
                    value: values.password,
                }}/>
                {touched.password && errors.password ? (<Text style={styles.errorText}>{errors.password}</Text>) : null}
                {!isRegistered && (
                <FormikInput
                label="Confirm Password"
                name="confirmPassword"
                textInputConfig={{
                    secureTextEntry:true,
                    onChangeText: handleChange('confirmPassword'),
                    onBlur: handleBlur('confirmPassword'),
                    value: values.confirmPassword,
                }}/>
            )}
                {touched.confirmPassword && errors.confirmPassword ? (<Text style={styles.errorText}>{errors.confirmPassword}</Text>) : null}
                <View>
                <Button style={styles.button} onPress={handleSubmit}>
                    {submitLabel}
                </Button>
                {isRegistered? 
                <FlatButton onPress={switchMode} label="New Here, Register Now !!!"/>:
                <FlatButton onPress={switchMode} label="Already a user, Login here !!!"/>
                }
                </View>
            </>
            )}
            </Formik>    
        </View>
    )
}
export default AuthForm;

const styles = StyleSheet.create({
    container:{
       
        marginHorizontal:20
    },
    button:{
        minWidth:120,
        marginHorizontal:8,
        marginTop:20,
        marginBottom:15
    },
    errorText:{
        textAlign:'center',
        color: ColorsList.error50,
        margin:8
    }
})