import { Router } from "express";
import { verifyJWT } from "../middelwares/auth.middelware.js";
import { upload } from "../middelwares/multer.middelware.js";
import { registerDetails, registerNuber } from "../controllers/register.controller.js";
import { paymentTrnasfer, statusUpdate, statusReturn, returnPaymentDetails } from "../controllers/paymen.controller.js";


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

router.route("/statusUpdate").post(
    verifyJWT,
    statusUpdate
);

router.route("/statusReturn").get(
    verifyJWT,
    statusReturn
);

router.route("/successPayment").get(
    verifyJWT,
    returnPaymentDetails
),

router.route("/registerNumber").post(
    registerNuber
);
export default router;