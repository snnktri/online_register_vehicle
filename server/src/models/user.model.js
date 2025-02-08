import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    photo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    address: addressSchema,
    nagarkitNumber: {
        type: Number,
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


userSchema.pre("save", async function(next) {
    if( !this.isModified()) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function() {
    return jwt.sign({
        _id: this._id
    }),
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: "1d",
    }
}







export const User = mongoose.model("User", userSchema);