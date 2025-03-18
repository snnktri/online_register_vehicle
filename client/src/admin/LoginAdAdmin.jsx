import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/admin';
import { AdminContext } from '../context/AdminAuth.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginAdAdmin = () => {
    const [userInput, setUserInput] = useState({
            email: '',
            password: ''
          });
          const navigate = useNavigate();

      const { setAdmin } = useContext(AdminContext)

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
               console.log(userInput);
               const response = await login(userInput);
               //console.log(response.success)

               localStorage.setItem("token", response.data.accessToken);
               setAdmin(true);
               navigate('/admin');
               
            
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
              </div>
            </div>
          </div>
        </div>
      )
}

export default LoginAdAdmin
