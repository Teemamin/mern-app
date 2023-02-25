import { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/Navbar';
const Navbar = () => {
    const { toggleSidebar,logoutUser,user } = useAppContext();
    const [showLogoutBtn,setShowLogoutBtn] = useState(false)

    const toggleLogoutBtn = ()=>{
        setShowLogoutBtn(!showLogoutBtn)
    }
  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          className='toggle-btn'
          onClick={toggleSidebar}
        >
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>

        <div className='btn-container'>
          <button className='btn' onClick={toggleLogoutBtn}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
         <div className={showLogoutBtn ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              onClick={logoutUser}
              className='dropdown-btn'
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar