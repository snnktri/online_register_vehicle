import React, { useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/User';
import { UserContext } from "../context/UserAuth.context";
const Login = () => {

    const [userInput, setUserInput] = useState({
        email: '',
        password: ''
      });
    
    const { setUser } = useContext(UserContext);
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
        const response = await login(userInput);

        if(response.success) {
          setUser(true);
            setUserInput({
                email: '',
                password: ''
            })
            navigate("/userInterface");
        }
       } catch (error) {
        console.error("Error on submitting form", error.message);
       }
    }
  return (
    <div className='min-h-screen container bg-gray-100 flex flex-col items-center p-6 gap-4'>
      <div>
        <h2 className='text-3xl font-bold text-gray-900 text-center'>Login</h2>
        <div className='w-full h-full justify-center items-center'>
        <form onSubmit={handleSubmit} className='w-80% h-80% shadow-xl'>
            <p className='font-bold'>Enter Your Email Address</p>
            <input
            value={userInput.email} 
            onChange={handleChange}
            type="email" required placeholder='someone@gmail.com' name="email" className='mt-2 p-3 bg-shite w-full shadow-xl shadow-gray-300 border-1 rounded-xl active:border-blue-200'/>
            <p className='font-bold mt-2'>Enter Password</p>
            <input
            value={userInput.password}
            onChange={handleChange}
             type="password" placeholder="*****" name="password" required className='mt-2 p-3 bg-shite w-full shadow-xl shadow-gray-300 border-1 rounded-xl active:border-blue-200'/>
            <button className='mt-2 p-4 bg-blue-500 w-full rounded-xl cursor-pointer hover:scale-105 text-white'>Next</button>
          </form>
          <div>
            <p className='text-center text-gray-600 mt-2'>Don't have an account? <Link className='text-blue-600' to="/">Sign Up</Link></p>
            <p className='text-center text-gray-600 mt-2'>Login as amin!! <Link className='text-blue-600' to="/loginAdmin">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
