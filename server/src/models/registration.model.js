import mongoose, { Schema } from "mongoose";
import { Vehicle } from "./vehicle.model.js";


const vehilceRegisterAmount = {
    Truck: 5000,
    Bus: 7000,
    Car: 3000,
    Motercycle: 2000
}
const registerSchema = new Schema({
    registerDate: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    thridPartyInsurance: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String
    },
    registrationStatus: {
        type: String,
        enum: ['registered', 'pneding', 'rejected'],
        default: 'pending'
    },
    registerAmount: {
        type: Number,
        required: true
    }
},
{
    timestamps: true,
});

registerSchema.pre('save', async function(next) {
   const vehicle = await Vehicle.findById(this.vehicle);

   if(!vehicle) return next();

   const vehicleType = vehicle.type;
   const registerFee = vehilceRegisterAmount[vehicleType];
   this.registerAmount = registerAmount;
   
   next();
 });


export const Register = mongoose.model('Register', registerSchema);