import React , {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import FormikInput from '../ui/FormikInput';
import Button from '../ui/Button';
import { ColorsList } from '../../util/Colors';
import { Expense, ExpenseWithoutID } from '../../types/Expense';
import CalendarPicker from "../modals/DatePicker";
import { FormValues } from '../../types/Form';

type FormProps = {
    submitLabel: string,
    defaultValues?: Expense | undefined,
    onSubmit:(expenseData:ExpenseWithoutID)=>void,
    onCancel:()=>void,
};

const validationSchema = Yup.object().shape({
    amount: Yup.number().typeError('Amount must be a number').required('Amount is required').positive('Amount must be positive'),
    date: Yup.date().required('Select and Confirm the Date'),
    description: Yup.string().required('Description is required'),
});

function ExpenseFormikForm({ submitLabel, defaultValues, onCancel, onSubmit }: FormProps): React.JSX.Element {
    const [calendarVisible, setCalendarVisible] = useState(false)
    const [calendarDate, setCalendarDate] = useState(new Date())
    const today = new Date()

    const initialValues: FormValues = {
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : today.toISOString().slice(0,10),
        description: defaultValues ? defaultValues.description : '',
        };
    function handlePress(){
        setCalendarVisible(true)
    }
    
    const handleSubmit = (values: FormValues) => {
       const expenseData ={
        amount : +values.amount,
        date : new Date(values.date),
        description: values.description
       }
       onSubmit(expenseData);
        };
        
    return (
        <View style={styles.formContainer}>
        <Text style={styles.title}>Your Expense</Text>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue}) => (
            <>
            <FormikInput
            label="Amount"
            name="amount"
            textInputConfig={{
                keyboardType: 'decimal-pad',
                onChangeText: handleChange('amount'),
                onBlur: handleBlur('amount'),
                value: values.amount.toString(),
            }}/>
            {touched.amount && errors.amount ? (<Text style={styles.errorText}>{errors.amount}</Text>) : null}
            <FormikInput
            label="Date"
            name="date"
            textInputConfig={{
                maxLength: 10,
                caretHidden: true,
                onChangeText: handleChange('date'),
                onBlur: handleBlur('date'),
                value: values.date,
                onPressIn: handlePress,
            }}/>
            {touched.date && errors.date ? (<Text style={styles.errorText}>{errors.date}</Text>) : null}
            < CalendarPicker 
                opened={calendarVisible} 
                onCancel={()=>{
                    setFieldValue('date', '');
                    setCalendarVisible(false)
                }} 
                onConfirm={(date) => {
                    setCalendarDate(date);
                    setFieldValue('date', date.toISOString().slice(0, 10));
                    setCalendarVisible(false);
                }}
                Date={calendarDate}
            />
            <FormikInput
            label="Description"
            name="description"
            textInputConfig={{
                multiline: true,
                onChangeText: handleChange('description'),
                onBlur: handleBlur('description'),
                value: values.description,
            }}/>
            {touched.description && errors.description ? (<Text style={styles.errorText}>{errors.description}</Text>) : null}
            <View style={styles.buttonContainer}>
                <Button style={styles.button} onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={handleSubmit}>
                    {submitLabel}
                </Button>
            </View>
        </> )}
    </Formik>
    </View>
    );}

export default ExpenseFormikForm;

const styles = StyleSheet.create({
    formContainer:{
        marginTop:16
    },
    title:{
        fontSize:24,
        color:'white',
        fontWeight:'bold',
        marginVertical:24,
        textAlign:'center'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        marginTop:16
    },
    button:{
        minWidth:120,
        marginHorizontal:8
    },
    errorText:{
        textAlign:'center',
        color: ColorsList.error50,
        margin:8
    }
});