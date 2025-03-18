import React, { useState } from 'react';
import { upDateRegister } from '../services/Register';
import { useNavigate } from 'react-router-dom';

const UpdateRegister = () => {
    const [regData, setRegData] = useState({
        registerDate: '',                  
        expiryDate: '',         
        thridPartyInsurance: null,   
        registrationNumber: '',    
        vin: '',                   
      });
    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
      const { name, value } = e.target;
    
    
      setRegData(
            prevState => ({
                ...prevState,
                [name]: value,
            })
        )
     
    }
    
    const handleChangeFile = (e) => {
      setRegData(pre => ({
        ...pre,
        [e.target.name]: e.target.files[0]
      }))
    }
    
    
      const handleSubmit = async(e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        console.log(regData);
    
        Object.entries(regData).forEach(([key, value]) =>  {
          if(value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value);
          }
        }
        )
        try {
          console.log(formData);
          const response = await upDateRegister(formData);
          console.log(response.data.registrationNumber);
          if(response.success) {
            console.log("Registration details submitted successfully");
            setRegData({
              registerDate: '',                  
              expiryDate: '',         
              thirdPartyInsurance: null,   
              registrationNumber: '',    
              vin: '',
            })
            navigate('/updatePay');
          }
        } catch (error) {
          console.error("Error on submitting the detais: ", e.message);
        }
      }
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Vehicle Registration Update</h2>
      
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <h1 className="text-xl text-center">
                Fill in the registration details <span className="text-red-500">All fields are mandatory</span>
              </h1>
      
              <div>
                <label className="block text-sm font-medium">Register Date</label>
                <input
                  type="date"
                  name="registerDate"
                  onChange={handleChange}
                  value={regData.registerDate}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
      
              <div>
                <label className="block text-sm font-medium">Expire Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  onChange={handleChange}
                  value={regData.expiryDate}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
      
              <div>
                <label className="block text-sm font-medium">VIN</label>
                <input
                  type="text"
                  name="vin"
                  onChange={handleChange}
                  value={regData.vin}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
      
              <div>
                <label className="block text-sm font-medium">Third Party Insurance</label>
                <input
                  type="file"
                  name="thridPartyInsurance"
                  onChange={handleChangeFile}
                  accept="image/*"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
      
              <div>
                <label className="block text-sm font-medium">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  required
                  onChange={handleChange}
                  value={regData.registrationNumber}
                  className="w-full p-2 border rounded-md"
                />
              </div>
      
              <div className="w-full flex justify-center items-center p-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}

export default UpdateRegister
