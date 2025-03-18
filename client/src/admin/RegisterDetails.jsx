import React, { useState } from 'react';
import { registerDetails } from "../services/admin";

const RegisterDetails = () => {
  const [vin, setVin] = useState('');
  const [registerDetail, setRegisterDetail] = useState(null);

  const handleClick = async () => {
    try {
      const response = await registerDetails(vin);
      setRegisterDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching register details: ", error.message);
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold mb-6 text-center">Register Details</h1>
          <input
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            placeholder="Enter VIN"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleClick}
          className="w-full sm:w-auto mt-2 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search Register Details
        </button>

        {registerDetail && (
          <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Vehicle Registration Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Registration Number:</p>
                  <p className="text-gray-600">{registerDetail.registrationNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">VIN:</p>
                  <p className="text-gray-600">{registerDetail.vin}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Register Date:</p>
                  <p className="text-gray-600">{new Date(registerDetail.registerDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Expiry Date:</p>
                  <p className="text-gray-600">{new Date(registerDetail.expiryDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Third Party Insurance:</p>
                <img
                  src={registerDetail.thridPartyInsurance}
                  alt="Third Party Insurance"
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterDetails;
