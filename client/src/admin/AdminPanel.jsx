import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { logOut } from '../services/admin';

const AdminPanel = () => {

  const handleLogout = async () => {
    await logOut();
  }
  return (
    <div className="w-full min-h-screen flex">
      
      <div className="w-1/4 lg:w-2/10 md:w-3/10 bg-gray-800 text-white p-4">
        <h2 className="text-3xl text-center font-semibold mb-6">Admin Functions</h2>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin/userDetails"
              className="text-lg hover:text-yellow-400"
              activeClassName="text-yellow-400"
            >
              User Details
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/vDetails"
              className="text-lg hover:text-yellow-400"
              activeClassName="text-yellow-400"
            >
              Vehicle Details
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/rDetails"
              className="text-lg hover:text-yellow-400"
              activeClassName="text-yellow-400"
            >
              Register Details
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/admin/userDetails"
              className="text-lg hover:text-yellow-400"
              activeClassName="text-yellow-400"
            >
              Payment Details
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="/admin/changeStutus"
              className="text-lg hover:text-yellow-400"
              activeClassName="text-yellow-400"
            >
              Change Status
            </NavLink>
          </li>
          <li>
            <button className="text-lg hover:text-yellow-400 cursor-pointer" onClick={handleLogout}>logout</button>
          </li>
          
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-gray-500 text-white p-4">
          <h1 className="text-2xl font-semibold text-center text-white">Admin Panel</h1>
        </div>

        
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
