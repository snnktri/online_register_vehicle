import React, { useState } from 'react';
import { getVehicleData } from "../services/admin";

const VehicleDetails = () => {
  const [vin, setVin] = useState('');
  const [vehicleDetail, setVehicleDetail] = useState(null);

  const handleClick = async () => {
    try {
      const response = await getVehicleData(vin);
      setVehicleDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching vehicle data: ", error.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold mb-6 text-center">Vehicle Details</h1>
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
          Search Vehicle Details
        </button>

        {vehicleDetail && (
          <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Vehicle Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Brand:</p>
                  <p className="text-gray-600">{vehicleDetail.brand}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Model:</p>
                  <p className="text-gray-600">{vehicleDetail.model}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Color:</p>
                  <p className="text-gray-600">{vehicleDetail.color}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Engine Number:</p>
                  <p className="text-gray-600">{vehicleDetail.engineNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Fuel Type:</p>
                  <p className="text-gray-600">{vehicleDetail.fuelType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">License Plate:</p>
                  <p className="text-gray-600">{vehicleDetail.licencePlate || 'Not available'}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Manufacture Date:</p>
                <p className="text-gray-600">{new Date(vehicleDetail.manufacutureData).toLocaleDateString()}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Vehicle Photos:</p>
                <div className="flex space-x-4">
                  {vehicleDetail.vehiclePhoto && vehicleDetail.vehiclePhoto.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Vehicle Photo ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Vehicle Purchase Proof:</p>
                <img
                  src={vehicleDetail.vehiclePurchaseProof}
                  alt="Vehicle Purchase Proof"
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

export default VehicleDetails;
