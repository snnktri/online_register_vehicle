import { Router } from "express";
import { verifyJWT } from "../middelwares/auth.middelware.js";
import { upload } from "../middelwares/multer.middelware.js";
import { registerDetails } from "../controllers/register.controller.js";
import { paymentTrnasfer } from "../controllers/paymen.controller.js";


const router = Router();

router.route("/registerDetails").post(
    verifyJWT,
    upload.single("thridPartyInsurance"),
    registerDetails
);

router.route("/payment").post(
    verifyJWT,
    paymentTrnasfer
)
export default router;