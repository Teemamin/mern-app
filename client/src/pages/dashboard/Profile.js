import { useState } from 'react';
import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';


const Profile = () => {
  const {user, isLoading,userLocation,updateUser,displayAlert,showAlert} = useAppContext()
  const {name,lastName,email}= user
  const [userData,setUserData] = useState({
    name: name ? name : '',
    email: email ? email : '',
    lastName: lastName ? lastName : '',
    location: userLocation || '',
  })
  const handleChange = (e)=>{
    setUserData({...userData,[e.target.name]:e.target.value})
  }

  const handleSubmit = (evt)=>{
    evt.preventDefault()
    if (!userData.name || !userData.email || !userData.lastName || !userData.location) {
      // test and remove temporary
      displayAlert();
      return;
    }

    updateUser(userData)
  }
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile </h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            labelText='last name'
            type='text'
            name='lastName'
            value={userData.lastName}
            handleChange={handleChange}
          />
            <FormRow
            labelText='email'
            type='email'
            name='email'
            value={userData.email}
            handleChange={handleChange}
          />
            <FormRow
            labelText='location'
            type='text'
            name='location'
            value={userData.location}
            handleChange={handleChange}
          />
             <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>

  </Wrapper>
  )
}

export default Profile