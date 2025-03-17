import React, { useState } from 'react';
import { registerPayment } from '../services/Register';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [isPayment, setIsPayment] = useState({
    vin: '',
    paymentOption: 'esewa'
  });

  const navigate = useNavigate();

  const [isComplete, setIsComplete] = useState(false);

  const feeForVehicle = {
    Truck: 5000,
    Bus: 4000,
    Car: 3000,
    Motorcycle: 2000
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsPayment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerPayment(isPayment);
      //console.log(response.data);
      if (response.success) {
        console.log('Payment registered successfully');
        setIsPayment({
          vin: '',
          paymentOption: 'esewa',
        });
        setIsComplete(false);
        toast.success("Payment completed successfully.");
        navigate("/SucessPayment",
          {
            state: {
              data: response.data,
              transaction_uuid: response.data.transaction_uuid
            }
          }
        );

         // Reset completion status
      } else {
        toast.error("Payment failed.");
        console.error('Error registering payment:', response.message);
      }
    } catch (error) {
      setIsComplete(true);
      console.error('Error registering payment:', error);
    }
  };

  if (isComplete) {
    return (
      <h3 className='text-xl text-center text-red-500'>Please complete the payment details or vehicle registration is under process.</h3>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className='text-2xl font-bold text-center mb-4'>Payment Registration</h2>

        <div className='mb-6'>
          <p className='text-center text-blue-500 mb-4'>Payment amount will be based on the type of vehicle</p>

          <table className="min-w-full table-auto border-collapse rounded-xl mb-6">
            <thead className='bg-blue-500 text-white'>
              <tr>
                <th className="border px-4 py-2 text-left">Vehicle Type</th>
                <th className="border px-4 py-2 text-left">Payment Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(feeForVehicle).map((vehicle, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{vehicle}</td>
                  <td className="border px-4 py-2">{feeForVehicle[vehicle]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <h1 className='text-xl text-cennter'>Fill the form and submit <span className='text-red-500'>(note payment fee automatically selected based on previous vehicle types)</span></h1>
          <div>
            <label className='block text-sm font-medium'>VIN Number</label>
            <input
              type="text"
              name="vin"
              value={isPayment.vin}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

        

          <div>
            <label className='block text-sm font-medium'>Payment Option</label>
            <select
              name="paymentOption"
              value={isPayment.paymentOption}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="esewa">E-Sewa</option>
              {/* Add more payment options here if needed */}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
