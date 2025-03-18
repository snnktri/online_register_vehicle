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
import { UserDetails } from "../models/userDetails.model.js";


export const paymentTrnasfer = asyncHandler( async (req, res) => {
    const {  status = "pending", vin} = req.body;

    const user = req.user._id;

    console.log(req.body);

    console.log("fkdf");

    if(!vin) {
        throw new ApiError(400, "Registration number and VIN are required.");
    }

    if(!user) {
        throw new ApiError(401, "User not authenticated");
    }

    const registrationExists = await Register.findOne({
        vin: vin
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

// export const statusUpdate = asyncHandler( async(req, res) => {
//   const { vin, registrationNumber, status } = req.params;

//   const admin = req.user;
  
//   if(admin.email !=="admin@gmail.com") {
//     throw new ApiError(401, "Admin not authenticated");
//   }

//   if(!registrationNumber ||!vin) {
//     throw new ApiError(400, "Registration number and VIN are required.");
//   }
  
//   const paymentExists = await PaymentFee.findOneAndUpdate({
//     registrationNumber,
//     vin
//   })

//   if(!paymentExists) {
//     throw new ApiError(404, "Payment not found");
//   }

//   const paymentUpdated = await PaymentFee.findOneAndUpdate(
//   {
//       vin: vin,
//       registrationNumber: registrationNumber
//     },
//     {
//     $set: {status
//   }}
//   ,
//   {
//     new: true
//   });

//   if(!paymentUpdated) {
//     throw new ApiError(500, "Failed to update payment status");
//   }

//   return res.status(200).
//   json(
//     new ApiResponse(200, paymentUpdated, "Payment status updated successfully.")
//   );
// });

export const statusReturn = asyncHandler(async(req, res) => {
  const { vin } = req.query;
  const user = req.user;

  if(!vin) {
    throw new ApiError(400, "Registration number is required.");
  }

  const userExists = await User.findById(user._id);
  
  if(!userExists) {
    throw new ApiError(404, "User not found");
  }

  const registerExist = await Register.findOne(
    {
      vin: vin
    }
  );

 //console.log(registerExist);

  if(!registerExist) {
    throw new ApiError(404, "Registration not found");
  }
  const registrationNumber = registerExist.registrationNumber;
 // console.log(vin);

  const vehicleExist = await Vehicle.findOne({
    vin: vin
  })

  //console.log("vin: ", vin);

  if(!vehicleExist) {
    throw new ApiError(404, "Vehicle not found");
  }

 // console.log(vehicleExist);
  const paymentExists = await PaymentFee.findOne({
   // registrationNumber,
    vin: vin
  });

  //console.log("paymentExists: ", paymentExists);
  if(!paymentExists) {
    throw new ApiError(404, "Payment not found");
  }

  const statusData = await PaymentFee.aggregate([
    {
      $match: {
        _id: paymentExists._id
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "userdetails",
        localField: "user._id",
        foreignField: "user",
        as: "userDetail"
      }
    },
    {
      $unwind: {
        path: "$userDetail",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "registers",
        localField: "vin",
        foreignField: "vin",
        as: "registration"
      }
    },
    {
      $unwind: {
        path: "$registration",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "vehicles",
        localField: "vin",
        foreignField: "vin",
        as: "vehicle"
      }
    },
    {
      $unwind: {
        path: "$vehicle",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        "user.password": 0, 
        "user._id": 0,     
        "user.__v": 0,       
        "paymentDetails": 0,
        __v: 0,              
        "registration._id": 0, 
        "vehicle._id": 0,     
        "userDetail._id": 0,  
        "registration.vin": 0,
        "vehicle.vin": 0       
      }
    }
  ]);
  
  

  return res.status(200).
  json(
    new ApiResponse(200, statusData, "Payment details returned successfully.")
  );
});

export const returnPaymentDetails = asyncHandler(async (req, res) =>{
  const user = req.user;

  if(!user) {
    throw new ApiError(401, "User not authenticated");
  }

  //console.log(user._id);
  const paymentDetails = await PaymentFee.findOne({
    user: user._id
  }).sort({createdAt: -1});

  if(!paymentDetails) {
    throw new ApiError(404, "Payment details not found");
  }


  return res.status(200).
  json(
    new ApiResponse(200, paymentDetails, "Payment details returned successfully.")
  );
});


export const allDatas = asyncHandler(async (req, res) => {
  const user = req.user;
  if(!user) {
    throw new ApiError(401, "User not authenticated");
  }
  const allData = await PaymentFee.find();
  return res.status(200).json(
    new ApiResponse(200, allData, "All data fetched successfully.")
  )
});


export const statusUpdate = asyncHandler(async (req, res) => {
  const {  vin, status } = req.body;
  //console.log(req.params)
  const user = req.user;
  if(user.role !== "ADMIN") {
    throw new ApiError(401, "User not authenticated");
  }

 // console.log(vin)
  const paymentExists = await PaymentFee.findOneAndUpdate({
    vin: vin
  },
  {
    $set: {status: status}
  },
  {
    new: true
  });

  if(!paymentExists) {
    throw new ApiError(404, "Payment not found");
  }
  return res.status(200).json(
    new ApiResponse(200, paymentExists, "Payment status updated successfully.")
  )
})

export const updatePay = asyncHandler( async (req, res) => {
  const {  status = "pending", vin} = req.body;

  const user = req.user._id;

  console.log(req.body);

  console.log("fkdf");

  if(!vin) {
      throw new ApiError(400, "Registration number and VIN are required.");
  }

  if(!user) {
      throw new ApiError(401, "User not authenticated");
  }

  const registrationExists = await Register.findOne({
      vin: vin
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

 // console.log(totalAmount);



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

   // console.log(paymentData)

    const paymentResponse = await axios.post(process.env.ESEWAPAYMENT_URL, null, {
      params: paymentData,
    });

    if (paymentResponse.status !== 200) {
        throw new ApiError(500, "Payment Gateway Error: Payment Failed");
    }

    const paymentCreated = await PaymentFee.findOneAndUpdate(
      {
        vin: vin
      },
      { 
          status,
          registerAmount: totalAmount
      },
      {
        new: true
      }
    ).lean();

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
