import mongoose from "mongoose";
import { db_Name } from "../constant.js";

const connectDb = async () => {
    try {
        
       const connectionIntances =  await mongoose.connect(`${process.env.DB_URL}/${db_Name}`);
        console.log("MongoDB connected successfully:",connectionIntances.connection.host);
    } catch (error) {
        console.error("MONGODB connection failed", error);
        exit(1);
    }
}

export default connectDb;