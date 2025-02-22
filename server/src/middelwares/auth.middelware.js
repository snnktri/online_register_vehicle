import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers['authorization']?.replace("Bearer ", "");
       // console.log('Incoming Headers:', req.headers);

      //  console.log("Authorization Header:", req.headers['authorization']);  // Check the Authorization header
        //console.log("Token:", token); 

        if(!token) {
            throw new ApiError(401, "Not authorized");
        }

        //console.log("secret: ", process.env.ACCESS_TOKEN_SECRET);

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

       // console.log("TOKEN:", decodedToken);

        if(!decodedToken) {
            throw new ApiError(401, "Not authorized");
        }

        const user = await User.findById(decodedToken._id).select("-password");

       // console.log(user);


        if(!user) {
            throw new ApiError("Not authorized", 401);

        }


        req.user = user;

        next();

    } catch (error) {
        console.error("Error on verifying jwt: ", error);
        next(error);
    }
}