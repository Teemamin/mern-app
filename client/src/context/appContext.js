import { createContext, useContext, useReducer, useState } from "react";
import reducer from "./reducer";
import { DISPLAY_ALERT,CLEAR_ALERT } from "./action";


const AppContext = createContext()

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
  };

const AppProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,initialState)

    const displayAlert = () =>{
        dispatch({type:DISPLAY_ALERT})
        clearAlert()
      }

      const clearAlert = () =>{
        setTimeout(() => {
            dispatch({
              type: CLEAR_ALERT,
            });
          }, 3000);
      }
    return(
        <AppContext.Provider value={{...state,displayAlert}}>{children}</AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    //this is a conviniet method that allows us to use the contex in the relevant components with
    //out having to call useContext
    return useContext(AppContext)
}

export {AppProvider}

