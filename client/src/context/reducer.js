import { DISPLAY_ALERT, CLEAR_ALERT,TOGGLE_SIDEBAR,
   SETUP_USER_BEGIN,SETUP_USER_SUCCESS,SETUP_USER_ERROR,LOGOUT_USER,
   UPDATE_USER_BEGIN,UPDATE_USER_SUCCESS,UPDATE_USER_ERROR,HANDLE_CHANGE,
   CLEAR_VALUES,CREATE_JOB_BEGIN,CREATE_JOB_SUCCESS,CREATE_JOB_ERROR,
   GET_JOB_BEGIN,GET_JOB_SUCCESS,SET_EDIT_JOB,DELETE_JOB_BEGIN, CLEAR_FILTERS,CHANGE_PAGE,
   EDIT_JOB_BEGIN,EDIT_JOB_SUCCESS,EDIT_JOB_ERROR,SHOW_STATS_BEGIN,SHOW_STATS_SUCCESS,DELETE_JOB_ERROR
 } from "./action";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if(action.type === HANDLE_CHANGE){
    return{
      ...state,
      [action.payload.name]: action.payload.value,
      page: 1 // adding the page to 1 so that when the user uses the search input, the page buttons will be on
    }
  }
  if(action.type === LOGOUT_USER){// clearing the user in the state aswell,cos cearing localstorage wont trigger stateupdate
    return{
      ...initialState,
      user: null,
      token: null,
      userLocation: '',
      jobLocation: '',
    }
  }
  if (action.type === GET_JOB_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === CREATE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Job Created!',
    };
  }
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if(action.type === UPDATE_USER_BEGIN){
    return{
      ...state, isLoading:true
    }
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token:action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    }
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if(action.type === TOGGLE_SIDEBAR){
    return{
      ...state, showSidebar: !state.showSidebar
    }
  }
  if(action.type === SETUP_USER_BEGIN){
    return{
      ...state, isLoading:true
    }
  }
  if(action.type === SETUP_USER_SUCCESS){
    return{
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      jobLocation: action.payload.location,
      userLocation: action.payload.location,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText
    }
  }
  if(action.type === SETUP_USER_ERROR){
    return{
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
    if(action.type === DISPLAY_ALERT){
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please provide all values!',
          };
    }
    if(action.type === CLEAR_ALERT){
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
          };

    }
    
    if (action.type === CLEAR_VALUES) {
      const initialState = {
        isEditing: false,
        editJobId: '',
        position: '',
        company: '',
        jobLocation: state.userLocation,
        jobType: 'full-time',
        status: 'pending',
      };
      return { ...state, ...initialState };
    }
    if (action.type === SET_EDIT_JOB) {
      const job = state.jobs.find(job => job._id === action.payload.id)
      const { _id, position, company, jobLocation, jobType, status } = job;
      return{
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      }
    }
    if(action.type === DELETE_JOB_BEGIN){
      return{
        ...state, isLoading: true
      }
    }
    if (action.type === DELETE_JOB_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    }

    if (action.type === EDIT_JOB_BEGIN) {
      return { ...state, isLoading: true };
    }
    if (action.type === EDIT_JOB_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Edited Successfully!',
      };
    }
    if (action.type === EDIT_JOB_ERROR) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    }

    if (action.type === SHOW_STATS_BEGIN) {
      return { ...state, isLoading: true,showAlert: false };
    }
    if (action.type === SHOW_STATS_SUCCESS) {
      return {
        ...state,
        isLoading: false,
        stats: action.payload.stats,
        monthlyApplications: action.payload.monthlyApplications
      };
    }
    if(action.type === CLEAR_FILTERS){
      return{
        ...state,
        search: '',
        searchStatus: 'all',
        searchType: 'all',
        sort: 'latest',
        sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
      }
    }
    if(action.type === CHANGE_PAGE){
      return{
        ...state,
        page: action.payload.page
      }
    }
    throw new Error(`no such action :${action.type}`);
  };
  export default reducer;