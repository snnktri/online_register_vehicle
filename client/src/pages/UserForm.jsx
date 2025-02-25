import React, {useState} from 'react';
import { formSubmit } from '../services/User';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    nagarkitaNumber: '',
    district: '',
    province: '',
    areaType: '',
    city: '',
    wadaNumber: null,
    nFront: null,
    nBack: null,
    profile: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setUserData(
        prevState => ({
            ...prevState,
            [name]: files ? files[0] : value,
        })
    )
  }

    const hnadleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData)
      const formData = new FormData();
       // console.log(Object.entries(userData))
        Object.entries(userData).forEach(([key, value]) => {
            
            if(value instanceof File) {
               // console.log(`Appending file: ${key}`, value);
                formData.append(key, value);}
            else formData.append(key, value);
        });

        console.log(formData);
        try {
            const response = await formSubmit(formData);

           // console.log("Response from form: ", response);

            if(response.success) {
                console.log("Form submitted successfully");
                setUserData({
                    firstName: '',
                    lastName: '',
                    user: '',
                    phoneNumber: '',
                    nagarkitaNumber: '',
                    district: '',
                    province: '',
                    areaType: '',
                    city: '',
                    wadaNumber: '',
                    nFront: null,
                    nBack: null,
                    profile: null,
                })
                navigate("/registerVehicle");
            }
        } catch (error) {
            console.error("Error submitting form: ", error.message)
        }
    }
  return (
    <div className='min-h-screen container bg-gray-100 flex flex-col items-center p-6 gap-4'> 
      <div className='flex flex-col justify-center items-center w-full my-4 shadow-xl shadow-gray-400'>
      <h2 className='text-2xl text-gray-800'>Enter your Details</h2>
        <form onSubmit={hnadleSubmit} className='w-[80%] flex- flex-col gap-4 m-4'>
            <div className='flex items-center w-full my-2'>
                <div>
                    <label>
                        First Name:
                        <input className='border-1 md:mx-4 border-gray-500 active:border-blue-500 hover:scale-105'
                            type="text"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Last Name:
                        <input className='border-1 md:mx-4 border-gray-500 active:birder-blue-500 hover:scale-105'
                            type="text"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleChange}
                        />
                    </label>
                </div>  
            </div>
            <div className='flex flex-col md:flex-row gap-2 w-full my-2'>
                {/* address */}
                <div>
    <label>
        Province:
        <select 
            className='border-1 mx-4 md:mx-0 border-gray-500 active:border-blue-500 hover:scale-105'
            name="province"
            value={userData.province}
            onChange={handleChange}
        >
            <option value="">Select Province</option>
            <option value="Koshi">Koshi</option>
            <option value="Madhesh">Madhesh</option>
            <option value="Bagmati">Bagmati</option>
            <option value="Gandaki">Gandaki</option>
            <option value="Lumbini">Lumbini</option>
            <option value="Karnali">Karnali</option>
            <option value="Sudurpashchim">Sudurpashchim</option>
        </select>
    </label>
                </div>

                <div>
                <label>
                        Desitrict:
                        <input className='border-1 mx-4 md:mx-0 border-gray-500 active:birder-blue-500 hover:scale-105'
                            type="text"
                            name="district"
                            value={userData.district}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                <label>
                        City:
                        <input className='border-1 mx-4 md:mx-0 border-gray-500 active:birder-blue-500 hover:scale-105'
                            type="text"
                            name="city"
                            value={userData.city}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
    <label>
        Type of Division:
        <select 
            className='border-1 mx-4 md:mx-0 border-gray-500 active:border-blue-500 hover:scale-105'
            name="areaType"
            value={userData.areaType}
            onChange={handleChange}
        >
            <option value="">Select Division Type</option>
            <option value="municipality">Municipality</option>
            <option value="metropolitan">Metropolitan</option>
            <option value="sub-metropolitan">Sub-Metropolitan</option>
            <option value="rural-municipality">Rural Municipality</option>
        </select>
    </label>
</div>

                <div>
                <label>
                        Wad No:
                        <input className='border-1 mx-4 md:mx-0 border-gray-500 active:birder-blue-500 hover:scale-105'
                            type="number"
                            name="wadaNumber"
                            value={userData.wadaNumber}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
            <div className='flex flex-col gap-2 md:flex-row'>
            <label>
                        Nagarikta Number:
                        <input className='border-1 mx-4 md:mx-0 border-gray-500 active:border-blue-500 hover:scale-105'
                            type="text"
                            name="nagarkitaNumber"
                            value={userData.nagarkitaNumber}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input className='border-1 mx-4 md:mx-0 border-gray-500 active:border-blue-500 hover:scale-105'
                            type="text"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleChange}
                        />
                    </label>
            </div>
            <div className='mt-2'>
                <p className='text-blue-500 text-xl'>
                    Uploade Your Profile
                </p>
                <label>
                    Profile Picture:
                    <input className='border-1 border-gray-700 mx-4 active:border-blue-500'
                        type="file"
                        name="profile"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className='flex flex-col gap-4 mt-4'>
                <p className='text-blue-500 text-xl'>Uploade your nagarikta front and back photo</p>
                <div className='flex flex-col md:flex-row'>
                <div>
                <label>
                    Nagarikta Front:
                    <input className='border-1 border-gray-700 mx-4 active:border-blue-500'
                        type="file"
                        name="nFront"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </label>
                </div>
                <div>
                <label>
                    Nagarikta Back:
                    <input className='border-1 border-gray-700 mx-4 active:border-blue-500'
                        type="file"
                        name="nBack"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </label>
                </div>
                </div>
            </div>
            <button className='text-center w-full my-4 p-2 bg-blue-500 rounded-xl hover:scale-105 text-white cursor-pointer'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default UserForm
