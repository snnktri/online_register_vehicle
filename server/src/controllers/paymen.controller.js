import { User } from "../models/user.model.js";
import { PaymentFee } from "../models/payment.model.js";
import { Vehicle } from "../models/vehicle.model.js";
import { Register } from "../models/registration.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { v4 as uuidv4 } from 'uuid';
import crypto from "crypto";
import axios from "axios";


export const paymentTrnasfer = asyncHandler( async (req, res) => {
    const {  status = "pending", registrationNumber, vin} = req.body;

    const user = req.user._id;

    console.log(req.body);

    console.log("fkdf");

    if(!registrationNumber || !vin) {
        throw new ApiError(400, "Registration number and VIN are required.");
    }

    if(!user) {
        throw new ApiError(401, "User not authenticated");
    }

    const registrationExists = await Register.findOne({
        registrationNumber
    })

    if (!registrationExists) {
        throw new ApiError(404, "Registration not found");
    }

    const vehicleExist = await Vehicle.findOne({
        vin: vin
    })

    if(!vehicleExist) {
        throw new ApiError(404, "Vehicle not found");
    }

    console.log(vehicleExist);

    // payment amount predefind

    const feeForVehicle = {'Truck':5000, 'Bus':4000, 'Car':3000, 'Motercycle':2000};

    const vehicleType = vehicleExist.type;

    console.log("Vehicle type: " + vehicleType);

    const totalAmount = feeForVehicle[vehicleType];

    console.log(totalAmount);

 

  const transaction_uuid = uuidv4();

    console.log("UUID:"+transaction_uuid);

    const parsedAmount = parseFloat(totalAmount);
    console.log("ParsedAmount: ", parsedAmount);



    const dataToHash = `total_amount=${totalAmount},transaction_uuid=${transaction_uuid},product_code=${process.env.MERCHANT_ID}`;


    const secretId = process.env.SECRET;

    const signature = crypto.createHmac('sha256', secretId)
                         .update(dataToHash)
                         .digest('base64');

    console.log("Signature: ", signature);
    

    console.log("total amount: " + totalAmount);

    let paymentData = {
        amount: parsedAmount,
        failure_url: process.env.FAILURE_URL,
        product_code: process.env.MERCHANT_ID,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: process.env.SUCCESS_URL,
        product_delivery_charge: "0",
        product_service_charge: "0",
        tax_amount: "0",
        total_amount: totalAmount,
        transaction_uuid: transaction_uuid,
        signature: signature
      };

      console.log(paymentData)

      const paymentResponse = await axios.post(process.env.ESEWAPAYMENT_URL, null, {
        params: paymentData,
      });

      if (paymentResponse.status !== 200) {
          throw new ApiError(500, "Payment Gateway Error: Payment Failed");
      }

      const paymentCreated = await PaymentFee.create(
        {
            user,
            registrationNumber,
            vin,
            status,
            registerAmount: totalAmount
        }
      )

      return res.status(200).
      json(
        new ApiResponse(200, {
            data: paymentCreated,
            transaction_uuid,
      secret: process.env.SECRET,
      signature,
      url: process.env.SUCCESS_URL,
        }, "Payment initiated successfully.")
      )
})

