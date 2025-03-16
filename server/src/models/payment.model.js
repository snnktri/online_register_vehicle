import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed']
    },
    registerAmount: {
        type: Number,
        required: true
    },
    vin: {
        type: String,
        required: true,
        unique: true
    }

},
{
    timestamps: true
});


export const PaymentFee = mongoose.model("PaymentFee", paymentSchema);