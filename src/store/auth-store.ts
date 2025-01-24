import { create } from "zustand";
import { User, UserInfo } from "../types/User";

type State = {
    userId : any,
    userDetails : UserInfo
}
type Action = {
    updateUser : (userId:State['userId'])=>void,
    setUserDetails : (userDetails:State['userDetails'])=>void
}
export const useUserStore = create<State & Action>((set)=>({
    userId : '',
    userDetails : {firstName:'',lastName:'',email:''},
    updateUser : (userId) => set(()=>({userId:userId})),
    setUserDetails : (userDetails) => set(()=>({userDetails:userDetails}))

}))

/*
type User = {
    userId?: any
}
type userStore={
    user : User{}
    setUser : (user:User)=>void
}

export const useUserStore = create<userStore>((set)=>({
    user : {},
    setUser: (user:User)=>set({user})
    
})
    )*/