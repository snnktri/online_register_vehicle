import { Register } from "../models/registration.model.js";
import {uploadonCloudinary } from "../utils/cloudineary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Vehicle } from "../models/vehicle.model.js";
import { UserDetails } from "../models/userDetails.model.js";

const generateRegistratinNumber = async(province, district) => {

    let exist =  false;

    while(!exist){
      const randomNumber = Math.floor(1000 + Math.random() * 9000);

     // console.log(randomNumber);
      const p = province[0].charAt(0).toUpperCase();
      const d = district[0].charAt(0).toUpperCase();

      let rN = `${p}-${randomNumber}-${d}`;

      const registerExist = await Register.findOne({
        registrationNumber: rN
      });

      if(!registerExist) {
        exist = true;
        return rN;
      }
      
    }
}


const registerDetails = asyncHandler( async(req, res) => {
    const { registerDate,  expiryDate, vin  } = req.body;
    let {registrationNumber} = req.body;
   // console.log(registrationNumber);

   if(!vin) 
   {
    throw new ApiError("Registration number is required.", 400);
   }

   if(!registerDate || !expiryDate) {
    throw new ApiError("Registration date and expiry date are required.", 400);
   }
    const userId = req.user._id;

    if(!userId) {
        throw new ApiError("Not authorized", 401);
    }

    const vehicleExist = await Vehicle.findOne({
        vin: vin
    });

    if(!vehicleExist) {
        throw new ApiError("Vehicle not found", 404);
    }

   // console.log(vehicleExist);
    const userDetailsExist = await UserDetails.find({
        user: userId
    })

    if(!userDetailsExist) {
        throw new ApiError("User details not found", 404);
    }

   

    const thridPartyInsurance = req.file;

   // console.log(thridPartyInsurance);

    const isUrl = await uploadonCloudinary(thridPartyInsurance.path);

    if (!isUrl) {
        throw new ApiError("Failed to upload image", 500);
    }

    const registrationExist = await Register.findOne({ vin });
    if (registrationExist) {
        throw new ApiError("Registration  already exists.", 400);
    }

    if(registrationNumber ==="") {
        const { province, district } = userDetailsExist[0].address;

       // console.log(province, district);

       registrationNumber = await generateRegistratinNumber(province, district);

       //console.log(registrationNumber);
    }

   // console.log(userDetailsExist._id);


    const registration = await Register.create({
        user: userId,
        registerDate,
        expiryDate,
        registrationNumber,
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

const registerNuber = asyncHandler(async (req, res) => {
    const { vin } = req.query;
    if(!vin) {
        throw new ApiError("VIN is required.", 400);
    }

    const registrationExist = await Register.findOne({ vin });
    if(!registrationExist) {
        throw new ApiError("Registration not found", 404);
    }
    return res.status(200).
    json(
        new ApiResponse(200, registrationExist, "Registration number retrieved successfully.")
    );
})

const updateRegistration = asyncHandler(async(req, res) => {
    const user = req.user;
    if(!user) {
        throw new ApiError("Not authorized", 401);
    }

    const { registrationNumber, registerDate, expiryDate, vin } = req.body;
    console.log(req.body);

    const vehicleExist = await Vehicle.findOne({
        vin: vin
    });

    if(!vehicleExist) {
        throw new ApiError("Vehicle not found", 404);
    }

    const thridPartyInsurance = req.file;

    // console.log(thridPartyInsurance);
 
     const isUrl = await uploadonCloudinary(thridPartyInsurance.path);
 
     if (!isUrl) {
         throw new ApiError("Failed to upload image", 500);
     }
 
    
    const registration = await Register.findOneAndUpdate(
        { vin },
        {
            registrationNumber,
            registerDate,
            expiryDate,
            thridPartyInsurance: isUrl.url 
        },
        { new: true }
    ).lean();
    if(!registration) {
        throw new ApiError("Registration not found", 404);
    }
    return res.status(200).
    json(
        new ApiResponse(200, registration, "Registration details updated successfully.")
    );
})

const getDetails = asyncHandler( async (req, res) => {
    const { vin } = req.query;
    if(!vin) {
        throw new ApiError("VIN is required.", 400);
    }
    const registrationExist = await Register.findOne({ vin });
    if(!registrationExist) {
        throw new ApiError("Registration not found", 404);
    }
    return res.status(200).
    json(
        new ApiResponse(200, registrationExist, "Registration details retrieved successfully.")
    );
})


export {
    registerDetails, registerNuber,
    updateRegistration,
    getDetails
}