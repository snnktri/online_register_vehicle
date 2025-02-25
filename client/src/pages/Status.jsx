import React, { useState } from 'react';
import { status } from '../services/Register';

const Status = () => {
  const [registrationNumber, setRegistrationNumber] = useState();
  const [statusData, setStatusData] = useState([]);

  const handleClick = async() => {
   try {
    const response = await status(registrationNumber);
    console.log(response.data);
    setStatusData(response.data);
   } catch (error) {
    console.error("Error on searching: ", error.message);
   }
  }
  return (
    <div className='min-h-screen flex flex-col items-center'>
      <div className='w-full flex flex-col items-center gap-4'>
        <label htmlFor="" className='p-2 mt-2 text-center'>Enter a Registratin Number to find the status</label>
        <input
          type="text"
          placeholder="Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          className='block w-[40%] md:w-[20%] p-2 bg-gray-200 rounded border-1 active:border-blue-800 shadow-xl'
        />
        <button onClick={handleClick} className='p-2 bg-blue-500 w-[40%] md:w-[20%] rounded-xl hover:bg-blue-700 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105'>Check Status</button>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Status
