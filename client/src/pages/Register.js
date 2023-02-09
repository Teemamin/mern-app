import { useState, useEffect } from 'react';
import { Logo,FormRow } from '../components';
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

  // global context and useNavigate later

  const handleChange = (e) => {
    console.log(e.target);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>

        {/* name field */}
        <FormRow type= {'text'} name={'name'} value={values.name} handleChange={handleChange} labelText={'name'}/>
        <FormRow type= {'password'} name={'password'} value={values.password} handleChange={handleChange} labelText={'password'}/>

        <button type='submit' className='btn btn-block'>
          submit
        </button>
      </form>
    </Wrapper>
  );
}

export default Register