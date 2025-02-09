import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json({
    extended: true,
    limit: "32kb"//optionsk
}));

app.use(express.urlencoded({ extended: true, limit: "32kb"}));

app.use(express.static("public"));

app.use(cookieParser());



//routes here

import userRoute from "./routes/user.router.js";

app.use("/api/v1/users", userRoute);







export { app };