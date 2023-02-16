import { createContext, useContext, useReducer, useState } from "react";
import axios from 'axios';
import reducer from "./reducer";
import { DISPLAY_ALERT,CLEAR_ALERT,REGISTER_USER_BEGIN,
   REGISTER_USER_SUCCESS,REGISTER_USER_ERROR,LOGIN_USER_BEGIN,LOGIN_USER_SUCCESS,LOGIN_USER_ERROR } from "./action";


const AppContext = createContext()
const addUserToLocalStorage = ({user,location,token})=>{
  localStorage.setItem('user',JSON.stringify(user))
  localStorage.setItem('token', token)
  localStorage.setItem('location', location)
}

const removeUserFromLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('location');
};

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    jobLocation: userLocation || ''
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
      const registerUser = async (currentUser)=>{
        dispatch({type: REGISTER_USER_BEGIN})
        try {
          const response = await axios.post('/api/v1/auth/register',currentUser)
          console.log(response)
          const {user,token,location} = response.data
          dispatch({type: REGISTER_USER_SUCCESS, payload:{user,token,location}})
          addUserToLocalStorage({user,token,location})
        } catch (error) {
          console.log(error)
          dispatch({type: REGISTER_USER_ERROR, payload:{msg: error.response.data.msg}})
        }
        clearAlert()
      }
      const loginUser = async (currentUser)=>{
        dispatch({type:LOGIN_USER_BEGIN})
        try {
          const {data} = await axios.post('/api/v1/auth/login',currentUser)
          const {user,token,location} = data
          dispatch({type: LOGIN_USER_SUCCESS,payload:{user,token,location}})
          addUserToLocalStorage({user,token,location})
        } catch (error) {
          console.log(error)
          dispatch({type: LOGIN_USER_ERROR, payload:{msg: error.response.data.msg}})
        }
        clearAlert()
      }
    return(
        <AppContext.Provider value={{...state,displayAlert,registerUser,loginUser}}>{children}</AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    //this is a conviniet method that allows us to use the contex in the relevant components with
    //out having to call useContext
    return useContext(AppContext)
}

export {AppProvider}

