import { createContext, useContext } from "react";


const MyContext=createContext({
    isAuthorized: false,

})


export const useMyContext=()=>{
    return useContext(MyContext);         // is ka use kr ke mycontext se value le skte h (2 chije import krne ki jrurat nhi padegi ab bus ise import krna hofa)  
}
export const MyContextProvider=MyContext.Provider