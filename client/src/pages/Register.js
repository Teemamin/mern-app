import { useState, useEffect } from 'react';
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
  const [values, setValues] = useState(initialState);
  const {showAlert, isLoading, displayAlert} = useAppContext()


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
    console.log(e.target);
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

        <button type='submit' className='btn btn-block'>
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