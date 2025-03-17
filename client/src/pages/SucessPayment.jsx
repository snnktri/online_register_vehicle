import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPayment = () => {
  const location = useLocation();

  const { data = {}, transaction_uuid } = location.state || {};

  console.log(data.data.status); 

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Status: {data.data?.status}</p>
      <p>Registration Amount: {data.data?.registerAmount}</p>
    </div>
  );
}

export default SuccessPayment;
