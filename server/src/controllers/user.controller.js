import { UserDetails } from "../models/userDetails.model.js";
import { User } from "../models/user.model.js";
import {uploadonCloudinary } from "../utils/cloudineary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { useReducer } from "react";

const userRegister = asyncHandler(async (req, res)=> {
    const { email, password, role } = req.body;

    if([email, password].some(field => field?.trim() === "")) {
        throw new ApiError("All fields are required", 400);
    }

    const userExist = await User.findOne({ email });

    if(userExist) {
        throw new ApiError("Email already exists", 400);
    }

    const userCreate = await User.create({
        email,
        password,
        role:"USER",
    });

    //console.log(userCreate);

    const user = await User.findById(userCreate._id).select("-password");


   if(!user) {
        throw new ApiError("Failed to create user", 500);
    }

    return res.status(201).json(
        new ApiResponse(200, user, "user created successfully")
    );
})

const registerDetails = asyncHandler( async (req, res) => {
    const {firstName, lastName, phoneNumber, address, nagarkitaNumber, district, province, areaType, city, wadaNumber} = req.body;

    const user = req.user;


    if([
        firstName, lastName,  phoneNumber, nagarkitaNumber,
        district, province, areaType, city, wadaNumber
    ].some(field => field?.trim() === "")) {
        throw new ApiError("All fields are required", 400);
    }

    const userexist = await UserDetails.findById(user._id);

    if(userexist) {
        throw new ApiError("user already exists", 400);
    }

    const { profile, nFront, nBack } = req.files;

    if( !profile) {
        throw new ApiError("Profile picture is required", 400);
    }

    if(!nFront || !nBack) {
        throw new ApiError("Nagarkit photos are required", 400);
    };

   //console.log(req.files)

    const profilePhoto = await uploadonCloudinary(profile[0].path);
    const nFrontPhoto = await uploadonCloudinary(nFront[0].path);
    const nBackPhoto = await uploadonCloudinary(nBack[0].path);

    console.log("I reach here");



    const newUser = await UserDetails.create({
        firstName,
        lastName,
        user,
        profile: profilePhoto?.url,
        phoneNumber,
        address: {
            district,
            province,
            areaType,
            city,
            wadaNumber
        },
        nagariktaPhotos: {
            front: nFrontPhoto?.url,
            back:nBackPhoto?.url,
        },
        nagarkitaNumber
    })

    console.log("I rach here 2")

    // const createdUser = await UserDetails.findById(newUser._id);

    // if(!createdUser) {
    //     throw new ApiError("Failed to create user", 500);
    // }
    // console.log("I am here know");
    // console.log("Returning user: ", newUser);
    // const simplifiedUser = {
    //     id: newUser._id.toString(),
    //     email: newUser.firstName,
    // };
    return res.status(201).
    json(
        new ApiResponse(200, newUser, "user Details submitted successfully")
    );

})

const loginUser = asyncHandler( async(req, res) => {
    const { email, password } = req.body;

    if([email, password].some(field => field?.trim() === "")) {
        throw new ApiError("All fields are required", 400);
    }

    const user = await User.findOne({email});

   // console.log(user);
    
    if(!user) {
        throw new ApiError("Invalid email or password", 401);
    }
    if(user.role === "ADMIN") {
        throw new ApiError("Admin access denied", 403);
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
     throw new ApiError(401, "Invalid user credentials")
     }

    const accessToken = await user.generateAccessToken();


   // consoel.log(accessToken);

    if(!accessToken) {
        throw new ApiError("Failed to generate access token", 500);
    }

    const loginUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
    }

    return res.status(200).
    cookie("accessToken", accessToken, options).
    json(
        new ApiResponse(200, {
            loginUser,
            accessToken: accessToken
        }, "user logged in successfully")
    );
})

const logout = asyncHandler( async (req, res) => {
    const user = req.user;

    console.log(user);

    const userexist = await User.findById(user._id);

    if(!userexist) {
        throw new ApiError(404, "User not found");
    }

    const options = {
        httpOnly: true,
    }

    return res.status(200).
    clearCookie("accessToken", options).
    json(
        new ApiResponse(200, null, "user logged out successfully")
    );

})


const protectedUser = asyncHandler(async (req, res) => {
    if(!req.user) {
        throw new ApiError(401, "Not authorized");
    }

    if(req.user.role === "ADMIN") {
        throw new ApiError("Admin access denied", 403);
    }
    return res.status(200).json(
        new ApiResponse(200, req.user, "protected user")
    );

})

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if([email, password].some(field => field?.trim() === "")) {
        throw new ApiError("All fields are required", 400);
    }

    const user = await User.findOne({email});
    if(!user) {
        throw new ApiError("Invalid email or password", 401);
    }

    if(user.role!== "ADMIN") {
        throw new ApiError("Admin access denied", 403);
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const accessToken = await user.generateAccessToken();
    if(!accessToken) {
        throw new ApiError("Failed to generate access token", 500);
    }
    const loginUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
    }

    return res.status(200).
    cookie("accessToken", accessToken, options).
    json(
        new ApiResponse(200, {
            loginUser,
            accessToken: accessToken
        }, "admin user logged in successfully")
    );
});

const adminProtectd = asyncHandler(async(req, res) => {
    const user = req.user;
    if(!user || user.role!== "ADMIN") {
        throw new ApiError(401, "Not authorized as admin");
    }
    return res.status(200).json(
        new ApiResponse(200, user, "admin protected user")
    );
})

const getUserDetails = asyncHandler(async (req, res) => {
    const user = req.query;
    console.log(user);

    if(!user) {
        throw new ApiError("User not found", 404);
    }

    const userExist = await User.findById(user.user);
    if(!userExist) {
        throw new ApiError("User not found", 404);
    }

    console.log("1");

    const userDetails = await UserDetails.findOne({
        user: user.user
    }).
    populate(
        { path: "user", select: "firstName lastName email" }
    );

    return res.status(200).json(
        new ApiResponse(200, userDetails, "User details fetched successfully")
    );
 });
export { registerDetails, userRegister, loginUser, logout, protectedUser, loginAdmin, adminProtectd, getUserDetails
 };
