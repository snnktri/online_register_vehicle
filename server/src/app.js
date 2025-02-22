import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors(
   {
    credentials: true, 
  allowedHeaders: ['Authorization', 'Content-Type'],
   }
));

app.use(express.json({
    extended: true,
    limit: "32kb"//optionsk
}));

app.use(express.urlencoded({ extended: true, limit: "32kb"}));

app.use(express.static("public"));

app.use(cookieParser());



//routes here

import userRoute from "./routes/user.router.js";
import vehilceRouter from "./routes/vehicle.router.js";
import registerRouter from "./routes/register.router.js";

app.use("/api/v1/users", userRoute);
app.use("/api/v1/vehicles", vehilceRouter);

app.use("/api/v1/registers", registerRouter);







export { app };