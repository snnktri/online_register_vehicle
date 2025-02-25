import React from 'react';
import { useLocation } from 'react-router-dom';


const SucessPayment = () => {
    const location = useLocation();
  
    // Extract data from the location's state
    const { paymentData, transaction_uuid } = location.state || {};
  
    return (
      <div>
        <h1>Payment Successful</h1>
        <p>Status: {paymentData?.status}</p>
        <p>Registration Number: {paymentData?.registrationNumber}</p>
        <p>Transaction ID: {transaction_uuid}</p>
        {/* You can render other details as needed */}
      </div>
    );
}

export default SucessPayment
