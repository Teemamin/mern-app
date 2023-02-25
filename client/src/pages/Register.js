import { useState, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import { Logo,FormRow, Alert } from '../components';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/RegisterPage';

// global context and useNavigate later

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};
// if possible prefer local state
// global state

function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState);
  const {showAlert, isLoading, displayAlert,user,setUpUser} = useAppContext()


  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user,navigate])
  // global context and useNavigate later
 const toggleMember = ()=>{
  setValues({...values, isMember: !values.isMember})
 }
  const handleChange = (e) => {
    setValues({...values, [e.target.name]:e.target.value})
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      console.log('already a member');
      setUpUser({currentUser,endPoint:'login',alertText:'Login Successful! Redirecting...'})
    } else {
      setUpUser({currentUser,endPoint:'register', alertText:'User registration Successful! Redirecting...'});
    }
  };
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
       {showAlert && <Alert/> }
        {values.isMember ? <h3>Login</h3> : <h3>Register</h3>}

        {/* name field */}
        {!values.isMember && (
        <FormRow
          type='text'
          name='name'
          value={values.name}
          handleChange={handleChange}
          />
        )}
        <FormRow type= {'email'} name={'email'} value={values.email} handleChange={handleChange} labelText={'email'}/>
        <FormRow type= {'password'} name={'password'} value={values.password} handleChange={handleChange} labelText={'password'}/>

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>

        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}

          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
      </p>
      </form>
    </Wrapper>
  );
}

export default Register