import { createContext, useContext, useReducer } from "react";
import axios from 'axios';
import reducer from "./reducer";
import { DISPLAY_ALERT,CLEAR_ALERT,TOGGLE_SIDEBAR,LOGOUT_USER,
   SETUP_USER_BEGIN,SETUP_USER_SUCCESS,SETUP_USER_ERROR,
   UPDATE_USER_BEGIN,UPDATE_USER_SUCCESS,UPDATE_USER_ERROR,HANDLE_CHANGE,
   CLEAR_VALUES,CREATE_JOB_BEGIN,CREATE_JOB_SUCCESS,CREATE_JOB_ERROR,
   GET_JOB_BEGIN,GET_JOB_SUCCESS,SET_EDIT_JOB,DELETE_JOB_BEGIN,
   EDIT_JOB_BEGIN,EDIT_JOB_SUCCESS,EDIT_JOB_ERROR,
   SHOW_STATS_BEGIN,SHOW_STATS_SUCCESS
   } from "./action";


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
    showSidebar: false,
    jobLocation: userLocation || '',
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['pending', 'interview', 'declined'],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: []
  };

const AppProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,initialState)

    //axios
    const authFetch = axios.create({
      baseURL: '/api/v1',
    });

        // Add a request interceptor
    authFetch.interceptors.request.use(function (config) {
      // Do something before request is sent
      config.headers['Authorization'] = `Bearer ${state.token}`
      
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    // Add a response interceptor
    authFetch.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log(error.response);
    if (error.response.status === 401) {
      logoutUser()
    }
      return Promise.reject(error);
    });

    const getAllJobs = async ()=>{
      let url = `/jobs`
      try {
        dispatch({type: GET_JOB_BEGIN})
        const {data} = await authFetch.get(url)
        // console.log(data)
        const {jobs, totalJobs, numOfPages} = data
        dispatch({type: GET_JOB_SUCCESS, payload:{jobs, totalJobs, numOfPages}})
      } catch (error) {
        console.log(error)
        // logoutUser()
      }
      clearAlert()
    }

    const createJob = async ()=>{
      dispatch({type: CREATE_JOB_BEGIN})
     try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.post('/jobs', {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({type: CREATE_JOB_SUCCESS})
      clearValues()
     } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
     }
     clearAlert()
    }

    const updateUser = async (currentUser)=>{
      dispatch({type: UPDATE_USER_BEGIN})
      try {
        const {data} = await authFetch.patch('/auth/updateUser',currentUser)
        // console.log(data)
        const { user, location, token } = data;
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: { user, location, token },
        });
    
        addUserToLocalStorage({ user, location, token });
      } catch (error) {
        if (error.response.status !== 401) {
          //so that the alert doesnt show for 401 errors
          dispatch({
            type: UPDATE_USER_ERROR,
            payload: { msg: error.response.data.msg },
          });
        }
      }
      clearAlert();
    }

    const handleChange = ({name,value})=>{
      dispatch({type: HANDLE_CHANGE, payload: {name,value}})
    }

    const clearValues = () => {
      dispatch({ type: CLEAR_VALUES })
    }

    const logoutUser = ()=>{
      dispatch({type: LOGOUT_USER})// clearing the user in the state aswell,cos cearing localstorage wont trigger stateupdate
      removeUserFromLocalStorage()
    }
    
    const toggleSidebar = ()=>{
      dispatch({type:TOGGLE_SIDEBAR})
    }

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
      const setUpUser = async ({currentUser,endPoint,alertText})=>{
        dispatch({type: SETUP_USER_BEGIN})
        try {
          const response = await axios.post(`/api/v1/auth/${endPoint}`,currentUser)
          console.log(response)
          const {user,token,location} = response.data
          dispatch({type: SETUP_USER_SUCCESS, payload:{user,token,location,alertText}})
          addUserToLocalStorage({user,token,location})
        } catch (error) {
          console.log(error)
          dispatch({type: SETUP_USER_ERROR, payload:{msg: error.response.data.msg}})
        }
        clearAlert()
      }
      const setEditJob = (id) => {
        dispatch({ type: SET_EDIT_JOB, payload: { id } })
      }

      const editJob = async ()=>{
       try {
        dispatch({type: EDIT_JOB_BEGIN})
         const {editJobId,position, company, jobLocation, jobType, status} = state
         await authFetch.patch(`/jobs/${editJobId}`,{
          position, company, jobLocation, jobType, status
         })
         dispatch({type: EDIT_JOB_SUCCESS})
         dispatch({type: CLEAR_VALUES}) //so as to reset the edit values in the state

       } catch (error) {
        if (error.response.status === 401) return;
        dispatch({type: EDIT_JOB_ERROR, payload:{msg: error.response.data.msg}})
       }
       clearAlert()
      }
      const deleteJob = async (jobId) =>{
        try {
          dispatch({type: DELETE_JOB_BEGIN })
          await authFetch.delete(`/jobs/${jobId}`)
          getAllJobs() // calling this func to get the updated jobs and be in sync front n backend
        } catch (error) {
          // logoutUser()
        }
      }

      const showStats = async ()=>{
        try {
          dispatch({type: SHOW_STATS_BEGIN})
          const {data} = await authFetch('/jobs/stats')
          dispatch({type: SHOW_STATS_SUCCESS,payload:{stats:data.defaultStats,monthlyApplications:data.monthlyApplications}})
          
        } catch (error) {
          console.log(error.response)
          // logoutUser()
        }
      }
    return(
        <AppContext.Provider value={
          {
            ...state,displayAlert,setUpUser,toggleSidebar,
            logoutUser,updateUser, handleChange,clearValues,
            createJob,getAllJobs,setEditJob,deleteJob,editJob,
            showStats
          }
        }>{children}</AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    //this is a conviniet method that allows us to use the contex in the relevant components with
    //out having to call useContext
    return useContext(AppContext)
}

export {AppProvider}

//instead of managing each individual request seperately,
// Interceptors allow us, to have all our Auth code in one place :)