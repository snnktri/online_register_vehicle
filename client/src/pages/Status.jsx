import React, { useEffect, useState } from 'react';
import { status } from '../services/Register';

const Status = () => {
  const [vin, setVin] = useState();
  const [statusData, setStatusData] = useState([]);

  const handleClick = async(e) => {
    e.preventDefault();
    if(!vin) return false;
   try {
    const response = await status(vin);
    console.log(response.data);
    setStatusData(response);
   } catch (error) {
    console.error("Error on searching: ", error.message);
   }
  }

  // useEffect(() => {
  //   console.log(statusData);
  //   console.log(statusData.userDetail.firstName + " " + statusData.userDetail.profile)
  // }, [statusData])
  return (
    <div className='min-h-screen flex flex-col items-center'>
      <div className='w-full flex flex-col items-center gap-4 mb-5'>
        <label htmlFor="" className='p-2 mt-2 text-center'>Enter a VID Number to find the status</label>
        <input
          type="text"
          placeholder="VID number"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          className='block w-[40%] md:w-[20%] p-2 bg-gray-200 rounded border-1 active:border-blue-800 shadow-xl'
        />
        <button onClick={handleClick} className='p-2 bg-blue-500 w-[40%] md:w-[20%] rounded-xl hover:bg-blue-700 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105'>Check Status</button>
      </div>
      <div>
        <div>
          {
            !statusData.success ? (
              <p>No data found for the provided registration number.</p>
            ) : (
              (()=>{
                const data = statusData.data[0];
                const { userDetail, vehicle, status, registerAmount, registration} = data;
             

                return (
                  <div className="w-full my-4 h-auto bg-gray-200 flex items-center justify-center">
                    <div className="flex bg-white h-auto w-full shadow-2xl flex-col justify-center items-center p-6 rounded-lg gap-y-6">
                      {/* Profile Image */}
                      <div className="flex items-center justify-center w-[200px] h-[200px] mb-4">
                        <img 
                          src={userDetail.profile} 
                          alt="profile" 
                          className="object-cover rounded-2xl shadow-lg" 
                        />
                      </div>
                      
                      {/* User Details */}
                      <div className="space-y-2">
                        <p className="text-xl font-semibold">Owner Name: {userDetail.firstName} {userDetail.lastName}</p>
                        <p className="text-lg">Vehicle Model: {vehicle.model}</p>
                        <p className="text-lg">Status: {status}</p>
                        <p className="text-lg">Registration Amount: {registerAmount}</p>
                        <p className="text-lg">VIN: {vin}</p>
                        
                        {/* Address */}
                        <p className="text-lg">
                          Address: {userDetail.address.province}, {userDetail.address.district}, {userDetail.address.city}
                        </p>
                
                        {/* Registration Information */}
                        <p className="text-lg"></p>
                        <p className="text-lg">Nagarikta Number: {userDetail.nagarkitaNumber}</p>
                        <p className='text-lg'>Licence Plate Number: {
                          status==="completed" ? (
                            registration.registrationNumber
                          ):("Processing")
                          }
                          </p>
                          <p className="text-lg">Expiration Date: {registration.expiryDate}</p>
                          <p className="text-lg">Registration Date: {registration.registerDate}</p>
                
                        {/* Add more details as needed */}
                      </div>
                    </div>
                  </div>
                );
                

              })()
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Status
