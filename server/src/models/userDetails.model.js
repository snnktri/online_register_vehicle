import mongoose, { Schema } from "mongoose";


const addressSchema = new Schema({
    district: {
        type: String,
        required: true, // Ensure district is required
    },
    province: {
        type: String,
        enum: [
            "Koshi",
            "Madhesh",
            "Bagmati",
            "Gandaki",
            "Lumbini",
            "Karnali",
            "Sudurpashchim"
        ],
        required: true, // Ensure province is required
    },
    areaType: {
        type: String,
        enum: ['municipality', 'metropolitan', 'sub-metropolitab', 'rural-municipality'],
        required: true, 
    },
    city: {
        type: String,
        required: true, 
    },
    wadaNumber: {
        type: Number,
        required: true,
    }
});

const userDetailsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    address: addressSchema,
    nagarkitaNumber: {
        type: String,
        required: true,
        unique: true,
    },
    nagariktaPhotos: {
        front: {
            type: String,
            required: true,
        },
        back: {
            type: String,
            required: true,
        }
    },

},
{
    timestamps: true
});








export const UserDetails = mongoose.model("UserDetails", userDetailsSchema);