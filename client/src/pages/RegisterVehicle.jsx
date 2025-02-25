import React, { useState } from 'react';
import { vehicleForm } from '../services/Vehicle';

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
                

            }
        } catch (error) {
           console.error("Error on submitting vehicle details: ", error.message); 
        }
       console.log('Form Data:', formData);
      
    };
  return (
    <div>
      <div>

      </div>
      <div>
      <form onSubmit={handleSubmit}>
            <div>
                <label>Brand</label>
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Model</label>
                <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Color</label>
                <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>VIN</label>
                <input
                    type="text"
                    name="vin"
                    value={formData.vin}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>
                    Date of Manufacture: 
                    <input
                        type="date"
                        name="manufacutureData"
                        value={formData.manufacutureData}
                        onChange={handleChange} />
                </label>
            </div>

            <div>
                <label>Engone Number: 
                    <input
                        type="text"
                        name="engineNumber"
                        value={formData.engineNumber}
                        onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>Vehicle Type:
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}>
                            {/* enum: ['Truck', 'Bus', 'Car', 'Motercycle'], */}
                        <option value="Car">Car</option>
                        <option value="Motercycle">Motorcycle</option>
                        <option value="Truck">Truck</option>
                        <option value="Bus">Bus</option>
                    </select>
                </label>
            </div>

            <div>
                <label>Fuel Type:
                    <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}>
                            {/* enum: ['Gasoline', 'Diesel', 'Electric'], */}
                        <option value="Gasoline">Gasoline</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Electric">Electric</option>
                    </select>
                </label>
            </div>

            <div>
                <label>Vehicle Photos</label>
                <input
                    type="file"
                    name="vehiclePhoto"
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"
                    required
                />
                <div>
                    {formData.vehiclePhoto.length > 0 &&
                        formData.vehiclePhoto.map((photo, index) => (
                            <img
                                key={index}
                                src={photo}
                                alt={`Preview ${index + 1}`}
                                style={{ width: '100px', height: '100px', margin: '10px' }}
                            />
                        ))}
                </div>
            </div>

            <div>
                <label>Vehicle Purchase Proof</label>
                <input
                    type="file"
                    name="vehiclePurchaseProof"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                />
                {formData.vehiclePurchaseProof && (
                    <img
                        src={formData.vehiclePurchaseProof}
                        alt="Vehicle Purchase Proof"
                        style={{ width: '100px', height: '100px', margin: '10px' }}
                    />
                )}
            </div>
            <div>
                <p className='text-blue-500'>Do not needed for the first time registratin.</p>
                <p className='text-red-500'>If it is for renewal please provide plate number</p>
                <label>Licence Plate Number: </label>
                <input
                    type="text"
                    name="licencePlate"
                    value={formData.licencePlate}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterVehicle
