import { Vehicle } from "../models/vehicle.model.js";
import { User } from "../models/user.model.js";
import {uploadonCloudinary } from "../utils/cloudineary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerVehilcleDetails = asyncHandler(async (req, res) => {
    const { brand, model, color, vin, engineNumber, manufacutureData, type, fuelType } = req.body;

    console.log(req.body);

   const userId = req.user._id;

    if ([brand, model, color, vin, engineNumber, type, fuelType].some(field => String(field)?.trim() === "")) {
        throw new ApiError(400, "All fields should be filled.");
    }

    const { vehiclePhoto, vehiclePurchaseProof  } = req.files;

    console.log(req.files);

    const vehiclePurchaseProofUrl = await uploadonCloudinary(vehiclePurchaseProof[0].path);

    let vehilePhotosUrl = [];

  //  console.log(vehiclePhoto);

    for(let i =0; i < vehiclePhoto.length; i++) {
        const photoUrl = await uploadonCloudinary(vehiclePhoto[i].path);
        vehilePhotosUrl.push(photoUrl.url);
    }

   // console.log(vehilePhotosUrl);

    const vehicleExist = await Vehicle.find({
        vin: vin
    })

    if(!vehicleExist) {
        throw new ApiError(400, "Vehicle already exists");
    }

    const vehicle = await Vehicle.create({
        brand,
        model,
        color,
        vin,
        engineNumber,
        manufacutureData,
        user: userId,
        type,
        fuelType,
        vehiclePurchaseProof: vehiclePurchaseProofUrl?.url,
        vehiclePhoto: vehilePhotosUrl,
    })

    const createVehicle = await Vehicle.findById(vehicle._id);

    if(!createVehicle) {
        throw new Error(500, "Vehilce not created.");
    }

   // console.log("I reach here");

    return res.status(200)
    .json(
        new ApiResponse(200, createVehicle, "vehicle details registered successfully.")
    );
});

export {
    registerVehilcleDetails,
}