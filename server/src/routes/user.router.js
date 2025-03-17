import { Router } from "express";
import { registerDetails, userRegister, loginUser, logout, protectedUser, loginAdmin, adminProtectd } from "../controllers/user.controller.js";
import { upload } from "../middelwares/multer.middelware.js";
import { verifyJWT } from "../middelwares/auth.middelware.js"



const router = Router();

router.route("/userRegister").post(userRegister);

router.route("/login").post(loginUser);

router.route("/logout").get(verifyJWT, logout);

router.route("/protectedUser").get(verifyJWT, protectedUser);

router.route("/loginAdmin").post(loginAdmin);


router.route("/register").post(
    verifyJWT,
    upload.fields(
        [
           {
            name: "profile",
            maxCount: 1,
            //limits: { }
           },
           {
            name: "nFront",
            maxCount: 1,
            //limits: { }
           },
           {
            name: "nBack",
            maxCount: 1,
            // limits: { }
           }

        ]
    ),
    registerDetails
);

router.route("/protectedAdmin").get(verifyJWT, adminProtectd)

export default router;