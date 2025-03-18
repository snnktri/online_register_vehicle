import React from 'react';
import { NavLink } from 'react-router-dom';
import { logOut } from '../services/User';

const UserProfileInterface = () => {
    const handleLogout = () => {
        logOut();
    }

  return (
    <div className='flex flex-col container bg-gray-100 gap-3'>
      <h1 className='text-xl text-center font-bold mt-5'>User Profile</h1>
      {/* rules */}
      <div className='flex flex-col items-center'>
        <p className='text-blue-700'>User should fill all the form serially for the first time.</p>
        <p className='text-red-500 text-center'>If user have multiple vehicle to register. Do not fill the user form again,if the vehicle is register to same user</p>
      </div>
      {/* list of form */}
      <div className='flex flex-col w-full min-h-[calc(100vh-200px)] items-center gap-4 mt-4 p-4'>
        <ul className='flex flex-col ml-10 h-[80%] w-[60%] items-center gap-4 bg-gray-200rounded-xl shadow-2xl'>
            <li className='w-full text-center bg-blue-500 p-2 rounded text-white hover:bg-blue-700 hover:scale-105 cursor-pointer'>
               <NavLink to="/userDetails">
                User Form
               </NavLink>
            </li>
            <li className='w-full text-center bg-blue-500 p-2 rounded text-white hover:bg-blue-700 hover:scale-105 cursor-pointer'>
                <NavLink to="/registerVehicle">
                 Vehicle Form
                </NavLink>
            </li>
            <li className='w-full text-center bg-blue-500 p-2 rounded text-white hover:bg-blue-700 hover:scale-105 cursor-pointer'>
                <NavLink to="/registerDetails">
                 Registration Form
                </NavLink>
            </li>
            <li className='w-full text-center bg-blue-500 p-2 rounded text-white hover:bg-blue-700 hover:scale-105 cursor-pointer'>
                <NavLink to="/payment">
                 Register Payment
                </NavLink>
            </li>
            <li className='w-full text-center bg-blue-500 p-2 rounded text-white hover:bg-blue-700 hover:scale-105 cursor-pointer'>
                <NavLink to="/updateRegister">
                 Update Registration Details
                </NavLink>
            </li>

            <li className='w-full text-center bg-blue-500 p-2 rounded text-white hover:bg-blue-700 hover:scale-105 cursor-pointer'>
                <NavLink to="/updatePay">
                 Update Payment
                </NavLink>
            </li>

            <li className='w-full text-center bg-blue-500 p-2 rounded text-white hover:bg-blue-700 hover:scale-105 cursor-pointer'>
                <NavLink to="/status">
                 Check Status
                </NavLink>
            </li>
        </ul>
        {/* logout */}
        <div className='w-full flex justify-center'>
            <button onClick={handleLogout} className="p-2 w-[30%] bg-blue-500 border-1 rounded-md hover:scale-105 hover:bg-blue-700 cursor-pointer text-white transition-all duration-300 ease-in-out">LogOut</button>
        </div>
      </div>
    </div>
  )
}

export default UserProfileInterface
