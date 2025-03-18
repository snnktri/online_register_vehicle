import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPayment = () => {
  const location = useLocation();

  const { data = {}, transaction_uuid } = location.state || {};

  console.log(data.data); 

  return (
    <div className='flex min-h-10/12 bg-gray-100 items-center justify-center p-8'>
      <div className='flex w-6/12 h-auto p-4 justify-center items-center bg-white shadow-xl shadow-gray-500'>
        <div className='flex flex-col gap-y-6 w-full p-6'>
          <h1 className='text-2xl font-semibold text-center'>Payment Successful</h1>
          <p>Status: {data.data?.status}</p>
          <p>Registration Amount: {data.data?.registerAmount}</p>
          <p>Transaction UUID : {transaction_uuid}</p>
        </div>
      </div>
    </div>
  );
}

export default SuccessPayment;
