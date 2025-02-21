import React, { useState } from 'react';
import { register } from '../services/User';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInput(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      //console.log(userInput);
      const response = await register(userInput);
      //console.log(response.success)

      if(response.success) {
        console.log("User registered successfully");
        // Redirect to login page or display success message
        setUserInput({
          email: '',
          password: ''
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration", error.message)
    }

  }
  return (
    <div className='min-h-screen container bg-gray-100 flex flex-col items-center p-6 gap-4'>
      <div className='md:mt-10'>
        <p className='font-bold'>
        Welcome To Online Vehicle Registration and Renewal System of DoTM. Please follow the following steps to create your profile and submit your application.
        </p>
      </div>
      <div className='w-full flex-col md:flex-row mt-10'>
        <div className='flex w-full'>
          <form onSubmit={handleSubmit} className='w-full'>
            <p className='font-bold'>Enter Your Own Email Address</p>
            <input
            value={userInput.email} 
            onChange={handleChange}
            type="email" required placeholder='someone@gmail.com' name="email" className='mt-2 p-3 bg-shite w-full shadow-xl shadow-gray-300 border-1 rounded-xl active:border-blue-200'/>
            <p className='font-bold mt-2'>Create Password</p>
            <input
            value={userInput.password}
            onChange={handleChange}
             type="password" placeholder="*****" name="password" required className='mt-2 p-3 bg-shite w-full shadow-xl shadow-gray-300 border-1 rounded-xl active:border-blue-200'/>
            <button className='mt-2 p-4 bg-blue-500 w-full rounded-xl cursor-pointer hover:scale-105 text-white'>Next</button>
          </form>
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Home
