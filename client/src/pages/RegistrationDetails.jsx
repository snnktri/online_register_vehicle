import React, { useState } from 'react';
import { registerForm } from '../services/Register';
import { useNavigate } from 'react-router-dom';

const RegistrationDetails = () => {
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
      const response = await registerForm(formData);
      if(response.success) {
        setRegData({
          registerDate: '',                  
          expiryDate: '',         
          thirdPartyInsurance: null,   
          registrationNumber: '',    
          vin: '',
        })
        navigate('/payment');
      }
    } catch (error) {
      console.error("Error on submitting the detais: ", e.message);
    }
  }
  return (
    <div className='flex bg-gray-300 container'>
      <div></div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='w-full bg-red-200'>
            <label htmlFor="registerDate">Register Date: </label>
            <input type="date"
             name="registerDate"
             onChange={handleChange}
             className=''
            value={regData.registerDate}/>
          </div>
          <div>
            <label htmlFor="expiryDate">Expire Date: </label>
            <input type="date"
             name="expiryDate"
             onChange={handleChange}
            value={regData.expiryDate}/>
          </div>
          <div>
            <label htmlFor="vin">VID: </label>
            <input type="text"
            name="vin"
            onChange={handleChange}
            value={regData.vin} />
          </div>
          <div>
            <label htmlFor="thridPartyInsurance">Third Party Insurance: </label>
            <input
                    type="file"
                    name="thridPartyInsurance"
                    onChange={handleChangeFile}
                    accept="image/*"
                    required
                />
          </div>
          <div>
            <label htmlFor="registrationNumber">Registration Number: </label>
            <input type="text"
             name="registrationNumber"
             onChange={handleChange}
            value={regData.registrationNumber} />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default RegistrationDetails
