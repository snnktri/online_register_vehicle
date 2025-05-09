import React from 'react';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserAuth.context';
import { AdminContext } from '../context/AdminAuth.context';
import { useContext } from 'react';

const NavigationBar = () => {
  const { user } = useContext(UserContext);
  const { admin } = useContext(AdminContext);
//  console.log(user);
//console.log(admin);
  return (
  <header className="mt-0 w-full bg-white shadow-md shadow-gray-300 h-auto">
    <nav className='w-full flex mx-auto items-center flex-col justify-center gap-4'>
      <div className='mt-5 mx-6 flex flex-col md:flex-row items-center justify-center gap-2'>
        {/* image */}
        <div className='w-[100px] h-[80px]'>
          <img src={logo} alt="logo" className='h-full w-full shadow-md shadow-gray-100' />
        </div>
        {/* description */}
        <div className='flex flex-col justify-center items-center md:items-start'>
          <p className=' text-sm text-gray-900'>
          Government of Nepal
          </p>
          <h4 className='text-base text-blue-500'>
            Ministry of Physical Infrastructure and Transport
            </h4>
          <h4 className='text-base text-gray-900'>
          Department of Transport Management
          </h4>
          <h4 className='text-lg text-red-500'>
          Online Vehicle Registration and Renewal System
          </h4>
        </div>
      </div>
      <div className='w-full bg-blue-500'>
          <ul className='w-full flex gap-4 p-3 justify-center items-center md:justify-start md:ml-[100px]'>
            <li>
              <NavLink 
              to="/" 
              className={({ isActive }) => `${(isActive ? 'text-orange-500' : 'text-orange-50')}`}
             >
          Home
        </NavLink>
        </li> 
        {user ? (
        // If user is logged in
        <li>
          <NavLink
            to="/userInterface"
            className={({ isActive }) => (isActive ? 'text-orange-500' : 'text-orange-50')}
          >
            Profile
          </NavLink>
        </li>
      ) : admin ? (
        // If admin is logged in
        <li>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? 'text-orange-500' : 'text-orange-50')}
          >
            Admin Panel
          </NavLink>
        </li>
      ) : (
        // If neither user nor admin is logged in (guest)
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'text-orange-500' : 'text-orange-50')}
          >
            Login
          </NavLink>
        </li>
      )}
        
          </ul>
      
      </div>
    </nav>
  </header>
  )
}

export default NavigationBar
