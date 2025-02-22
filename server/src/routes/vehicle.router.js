import { Router } from "express";
import { verifyJWT } from "../middelwares/auth.middelware.js";
import { registerVehilcleDetails } from "../controllers/vehilce.controller.js";
import { upload } from "../middelwares/multer.middelware.js";



const router = Router();

router.route("/registerVehicle").post(
    verifyJWT,
    upload.fields([
        {
            name: "vehiclePhoto",
            maxCount: 2
        },
        {
            name: "vehiclePurchaseProof",
            maxCount: 1
        }
    ] ),
     registerVehilcleDetails);

export default router;