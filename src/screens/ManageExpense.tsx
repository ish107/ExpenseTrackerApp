import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ManageExpenseNavigationProp, ManageExpenseRouteProp } from "../types/NavigationProps";
import IconBtn from "../components/ui/IconBtn";
import { ColorsList } from "../util/Colors";
import { ExpenseContext } from "../store/expenses-context";
import { ExpenseWithoutID } from "../types/Expense";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay"
import { deleteExpense, updateExpense, storeExpense } from "../util/database";
import ExpenseFormikForm from "../components/expenses/ExpenseFormikForm";
import { useUserStore } from "../store/auth-store";


function ManageExpense() : React.JSX.Element{
    
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] =useState<string|null>(null)

    const expensesCtx = useContext(ExpenseContext);
    const navigation = useNavigation<ManageExpenseNavigationProp>();
    const route = useRoute<ManageExpenseRouteProp>();
    
    const userId = useUserStore.getState().userId
    const editId = route.params?.expenseId
    const isAdding = editId == null;
    
    const selectedExpense = expensesCtx.expenses.find((expense)=>expense.id===editId)

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isAdding? 'Add Expense' :'Edit Expense'
        })
    },[navigation,isAdding])

    async function deleteExpenseHandler(){
        if (editId){
            setIsSubmiting(true);
            try{
                await deleteExpense(editId)
                expensesCtx.deleteExpense(editId);
                navigation.goBack();
            }catch(error){
                setError('Unable to Delete, Try Again!');
                setIsSubmiting(false);
            }  
        }
    }
    function cancelHandler(){
        navigation.goBack();
    }

    async function confirmHandler(expenseData: ExpenseWithoutID){
        try{
            setIsSubmiting(true)
            if(isAdding){
                const id = await storeExpense(expenseData,userId);
                expensesCtx.addExpense( {...expenseData, id:id, userId:userId} );
            }else{
                const updatedExpense = {...expenseData, id:editId, userId:userId}
                expensesCtx.updateExpense(updatedExpense);
                await updateExpense(editId,expenseData)
            }
            navigation.goBack();
        }catch(error){
            setError('Unable to Add the Data, Please Try Again')
            setIsSubmiting(false)
        }
    }
    
    if (isSubmiting){
        return <LoadingOverlay/>
    }

    if(error){
        return <ErrorOverlay message={error}/>
    }

    return(
        <View style={styles.container}>  
            <ExpenseFormikForm 
                onCancel={cancelHandler} 
                submitLabel={isAdding?"Add" : "Update"}
                onSubmit={confirmHandler}
                defaultValues = {selectedExpense}
                />
           
            {!isAdding && (
                <View style={styles.deleteContainer}>
                    <IconBtn 
                        icon="trash" 
                        color={ColorsList.error500} 
                        size={34} 
                        onPress={deleteExpenseHandler}/>
                </View>
            )}
            
        </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor:ColorsList.primary800
    },
    deleteContainer:{
        marginTop:16,
        paddingTop:8,
        borderTopWidth : 2,
        borderTopColor: ColorsList.primary200,
        alignItems:'center'
    },
    
})