import React, { useState } from 'react';
import { vehicleForm } from '../services/Vehicle';
import { useNavigate } from "react-router-dom"

const RegisterVehicle = () => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        color: '',
        vin: '',
        vehiclePhoto: [],
        engineNumber: '',
        manufacutureData: '',
        type: 'Car',
        fuelType: 'Gasoline',
        vehiclePurchaseProof: null,
        licencePlate: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        // Store the actual File objects, not Blob URLs
        setFormData((prevState) => ({
            ...prevState,
            vehiclePhoto: files,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Store the actual File object, not Blob URL
            setFormData((prevState) => ({
                ...prevState,
                vehiclePurchaseProof: file,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formInput = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value instanceof File) {
                formInput.append(key, value);
            } else if (Array.isArray(value)) {
                value.forEach((file) => {
                    // Append each image in vehiclePhoto as a File object
                    formInput.append('vehiclePhoto', file);
                });
            } else {
                formInput.append(key, value);
            }
        });
        //console.log(formInput);
        try {
            const response = await vehicleForm(formInput);
            console.log(response.data);

            if(response.success) {
                console.log("Vehicle registered successfully");
                
                setFormData({
                    brand: '',
                    model: '',
                    color: '',
                    vin: '',
                    vehiclePhoto: [],
                    engineNumber: '',
                    manufacutureData: '',
                    type: 'Car',
                    fuelType: 'Gasoline',
                    vehiclePurchaseProof: null,
                });
                navigate("/registerDetails")

            }
        } catch (error) {
           console.error("Error on submitting vehicle details: ", error.message); 
        }
       console.log('Form Data:', formData);
      
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
            <h2 className='text-2xl font-bold text-center mb-4'>Enter Vehicle Details</h2>
      
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
              <h1 className='text-xl text-center'>
                Fill in the details and submit
              </h1>
      
              <div>
                <label className='block text-sm font-medium'>Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
      
              <div>
                <label className='block text-sm font-medium'>Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
      
              <div>
                <label className='block text-sm font-medium'>Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
      
              <div>
                <label className='block text-sm font-medium'>VIN</label>
                <input
                  type="text"
                  name="vin"
                  value={formData.vin}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
      
              <div>
                <label className='block text-sm font-medium'>Date of Manufacture</label>
                <input
                  type="date"
                  name="manufacutureData"
                  value={formData.manufacutureData}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
      
              <div>
                <label className='block text-sm font-medium'>Engine Number</label>
                <input
                  type="text"
                  name="engineNumber"
                  value={formData.engineNumber}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
      
              <div>
                <label className='block text-sm font-medium'>Vehicle Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="Car">Car</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Truck">Truck</option>
                  <option value="Bus">Bus</option>
                </select>
              </div>
      
              <div>
                <label className='block text-sm font-medium'>Fuel Type</label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
      
              <div>
                <label className='block text-sm font-medium'>Vehicle Photos</label>
                <input
                  type="file"
                  name="vehiclePhoto"
                  onChange={handleImageChange}
                  multiple
                  accept="image/*"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
      
              <div>
                <label className='block text-sm font-medium'>Vehicle Purchase Proof</label>
                <input
                  type="file"
                  name="vehiclePurchaseProof"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
      
              <div>
                <label className='block text-sm font-medium'>License Plate Number</label>
                <input
                  type="text"
                  name="licencePlate"
                  value={formData.licencePlate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
                <p className="text-blue-500 mt-2">Not needed for first-time registration.</p>
                <p className="text-red-500">Required for renewal, please provide the plate number.</p>
              </div>
      
              <div className="w-full flex justify-center items-center">
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

export default RegisterVehicle
