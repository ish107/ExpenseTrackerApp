import  auth from "@react-native-firebase/auth";
import firestore  from "@react-native-firebase/firestore";

import { User } from "../types/User";
import { useUserStore } from "../store/auth-store";
import { getUser } from "./database";

export async function createUser(userInfo:User){
    const userCredential = await auth().createUserWithEmailAndPassword(
        userInfo.email, userInfo.password)
    const user = userCredential.user
    await firestore().collection('users').doc(user.uid).set({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        });
    const {password, ...userDetails} = userInfo
    useUserStore.getState().setUserDetails(userDetails)
}

export  async function signIn(email: string, password: string) {   
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const userId = userCredential.user.uid;
    const userInfo = await getUser(userId)
    //console.log('user',userInfo)
    useUserStore.getState().setUserDetails(userInfo)
    
   
}

export async function logOut() {
    try {
        await auth().signOut();
        useUserStore.getState().updateUser(null);
        //console.log('User signed out successfully');
    } catch (error) {
        console.error('Error signing out:', error);
    }
}