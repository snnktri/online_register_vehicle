import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    },

},
    {
        timestamps: true,
    }
);



userSchema.pre("save", async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateAccessToken = function() {
    console.log("secret token", process.env.ACCESS_TOKEN_SECRET);
    return jwt.sign({
        _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: "1d",
    });
}




export const User = mongoose.model("User", userSchema);
