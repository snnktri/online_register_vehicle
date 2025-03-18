import { Router } from "express";
import { verifyJWT } from "../middelwares/auth.middelware.js";
import { upload } from "../middelwares/multer.middelware.js";
import { registerDetails, registerNuber, updateRegistration, getDetails } from "../controllers/register.controller.js";
import { paymentTrnasfer, statusUpdate, statusReturn, returnPaymentDetails, allDatas, updatePay } from "../controllers/paymen.controller.js";


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

router.route("/statusUpdate").put(
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

router.route("/allDatas").get(
    verifyJWT,
    allDatas
);

router.route("/updateRegister").put(
    verifyJWT,
    upload.single("thridPartyInsurance"),
    updateRegistration);
router.route("/updatePay").put(
    verifyJWT,
    updatePay);


router.route("/details").get(getDetails);

export default router;