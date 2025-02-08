import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ", "");

        if(!token) {
            throw new ApiError("Not authorized", 401);
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if(!decodedToken) {
            throw new ApiError("Not authorized", 401);
        }

        const user = await User.findOne(decodedToken._id).select("-password");


        if(!user) {
            throw new ApiError("Not authorized", 401);
        }


        return res.user;

        next();

    } catch (error) {
        console.error("Error on verifying jwt: ", error);
    }
}