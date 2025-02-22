import { Register } from "../models/registration.model.js";
import {uploadonCloudinary } from "../utils/cloudineary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Vehicle } from "../models/vehicle.model.js";
import { UserDetails } from "../models/userDetails.model.js";


const registerDetails = asyncHandler( async(req, res) => {
    const { registerDate,  expiryDate, registrationNumber, vin  } = req.body;

   if(!registrationNumber || !vin) 
   {
    throw new ApiError("Registration number is required.", 400);
   }

   if(!registerDate || !registrationNumber) {
    throw new ApiError("Registration date and expiry date are required.", 400);
   }
    const userId = req.user._id;

    if(!userId) {
        throw new ApiError("Not authorized", 401);
    }

    const vehicleExist = await Vehicle.findOne({
        vin: vin
    });

    const userDetailsExist = await UserDetails.find({
        user: userId
    })

    if(!userDetailsExist) {
        throw new ApiError("User details not found", 404);
    }

    // registerSchema.pre('save', async function(next) {
    //     const vehicle = await Vehicle.findById(this.vehicle);
     
    //     if(!vehicle) return next();
     
    //     const vehicleType = vehicle.type;
    //     const registerFee = vehilceRegisterAmount[vehicleType];
    //     console.log(register)
    //     this.registerAmount = registerAmount;
        
    //     next();
    //   });
    

    const thridPartyInsurance = req.file;

    console.log(thridPartyInsurance);

    const isUrl = await uploadonCloudinary(thridPartyInsurance.path);

    if (!isUrl) {
        throw new ApiError("Failed to upload image", 500);
    }

    const registrationExist = await Register.findOne({ registrationNumber });
    if (registrationExist) {
        throw new ApiError("Registration number already exists.", 400);
    }

    console.log(userDetailsExist._id);


    const registration = await Register.create({
        user: userId,
        registerDate,
        expiryDate,
        registrationNumber,
        vehicle: vehicleExist._id,
        vin,
        thridPartyInsurance: isUrl.url
    });

    const createdReg = await Register.findById(registration._id);

    if(!createdReg) {
        throw new ApiError(500, "Registration not created.");
    }

    return res.status(200).
    json(
        new ApiResponse(200, createdReg, "Registration details registered successfully.")
    );
   
})


export {
    registerDetails
}