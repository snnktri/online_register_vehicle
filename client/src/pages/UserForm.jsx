import React, {useState} from 'react'

const UserForm = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    user: '',
    phoneNumber: '',
    address: '',
    nagarkitaNumber: '',
    district: '',
    province: '',
    areaType: '',
    city: '',
    wadaNumber: '',
    nFront: null,
    nBack: null,
    profile: null
  });

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
      //  const formData = new FormData();
        console.log(Object.entries(userData))
        Object.entries(userData).forEach(([key, value]) => {
            
            if(value instanceof File) {
               // console.log(`Appending file: ${key}`, value);
                formData.append(key, value);}
            else formData.append(key, value);
        });

        console.log(formData);
        try {
            const response = await submitForm(formData);

            if(response.data.success) {
                console.log("Form submitted successfully");
                setUserData({
                    firstName: '',
                    lastName: '',
                    user: '',
                    phoneNumber: '',
                    address: '',
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
            }
        } catch (error) {
            console.error("Error submitting form: ", error.message)
        }
    }
  return (
    <div className='min-h-screen container bg-gray-100 flex flex-col items-center p-6 gap-4'>
      <div className='flex w-full'>
        <form onSubmit={hnadleSubmit} className='w-full flex- flex-col gap-4'>
            <div className='flex items-center w-full'>
                
                <label className='m-2'>
                    First Name:
                    <input
                        className='w-full border-1 border-gray-800 p-1 rounded active:border-blue-800'
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                    />
                </label>
                
                <label className='m-2'>
                    First Name:
                    <input
                    className='w-full border-1 border-gray-800 p-1 rounded active:border-blue-800'
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                    />
                </label>
                
            </div>
            <div>
                <label>
                    Profile Picture:
                    <input className='border-1'
                        type="file"
                        name="profile"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </label>
            </div>
            <button className=''>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default UserForm
