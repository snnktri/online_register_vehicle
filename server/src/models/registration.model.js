import mongoose, { Schema } from "mongoose";



const registerSchema = new Schema({
    registerDate: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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
    //photo
    thridPartyInsurance: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    // registrationStatus: {
    //     type: String,
    //     enum: ['registered', 'pneding', 'rejected'],
    //     default: 'pending'
    // },
    // registerAmount: {
    //     type: Number,
    //     required: true
    // },
    vin: {
        type: String,
        required: true,
        unique: true
    }
},
{
    timestamps: true,
});



export const Register = mongoose.model('Register', registerSchema);