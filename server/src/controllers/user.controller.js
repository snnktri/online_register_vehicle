import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudineary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const register = asyncHandler( async (req, res) => {
    const {firstName, lastName, email, password, phoneNumber, address, nagarkitaNumber} = req.body;

    const { district, province, areaType, city, wadaNumber } = address;

    if([
        firstName, lastName, email, phoneNumber, nagarkitaNumber,
        district, province, areaType, city, wadaNumber, password
    ].some(field => field?.trim() === "")) {
        throw new ApiError("All fields are required", 400);
    }

    const user = await User.findOne({ email });

    if(user) {
        throw new ApiError("Email already exists", 400);
    }

    const { profile, nFront, nBack } = req.files;

    if( !profile) {
        throw new ApiError("Profile picture is required", 400);
    }

    if(!nFront || !nBack) {
        throw new ApiError("Nagarkit photos are required", 400);
    };

    const profilePhoto = await uploadOnCloudinary(profile[0].path, 'profile_photos');
    const nFrontPhoto = await uploadOnCloudinary(nFront[0].path, 'nagarikta_photos');
    const nBackPhoto = await uploadOnCloudinary(nBack[0].path, 'nagarikta_photos');

    const newUser = await User.create({
        firstName,
        lastName,
        profile: profilePhoto.url,
        email,
        password,
        phoneNumber,
        address: {
            district,
            province,
            areaType,
            city,
            wadaNumber
        },
        nagariktaPhotos: {
            front: nFrontPhoto.url,
            back:nBackPhoto.url,
        },
        role,
        nagarkitaNumber
    })

    const createdUser = await User.findById(newUser._id).select("-password");

    if(!createdUser) {
        throw new ApiError("Failed to create user", 500);
    }

    return res.status(201).
    json(
        new ApiResponse("user created successfully", createdUser, 200)
    );

})

export { register };
