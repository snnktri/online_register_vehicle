import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


const configureCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log("Cloudinary configured.");
};

const uploadonCloudinary = async (localFilePath) => {
    try {
        // Configure Cloudinary only when needed
        configureCloudinary();

        if (!localFilePath) return;

        // Upload to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        //File has been uploaded successfully
       console.log("Image uploaded successfully");
       console.log(response.url);

        // Delete the local file after upload
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.error("Error uploading image: " + error.message);
        return null;
    }
};

export { uploadonCloudinary };
