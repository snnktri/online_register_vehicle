import React, { useState } from 'react';
import { userDetails } from '../services/admin';

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState('');

  const handleClick = async () => {
    try {
      const response = await userDetails(user);
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.error("Error on searching user: ", error.message);
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto flex justify-center flex-col items-center">
        <div className="mb-4">
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter User ID"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleClick}
          className="w-[60%] mt-2 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          Search User
        </button>
        
        {userData && (
          <div className="mt-6 p-6 bg-white rounded-lg shadow-lg w-[80%] md:w-[60%]">
            <div className="flex justify-center mb-6">
              <img
                src={userData.profile}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full"
              />
            </div>

            <h2 className="text-2xl font-semibold mb-6 text-center">User Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">First Name:</p>
                <p className="text-gray-600">{userData.firstName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Last Name:</p>
                <p className="text-gray-600">{userData.lastName}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Phone Number:</p>
                <p className="text-gray-600">{userData.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Nagarikta Number:</p>
                <p className="text-gray-600">{userData.nagarkitaNumber}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">Address:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">District: {userData.address.district}</p>
                  <p className="text-gray-600">Province: {userData.address.province}</p>
                </div>
                <div>
                  <p className="text-gray-600">City: {userData.address.city}</p>
                  <p className="text-gray-600">Wada Number: {userData.address.wadaNumber}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">Nagarikta Photos:</p>
              <div className="flex flex-wrap gap-4">
                <div className="w-32 h-32">
                  <p className="text-gray-600">Front Photo:</p>
                  <img
                    src={userData.nagariktaPhotos.front}
                    alt="Nagarikta Front"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="w-32 h-32">
                  <p className="text-gray-600">Back Photo:</p>
                  <img
                    src={userData.nagariktaPhotos.back}
                    alt="Nagarikta Back"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
