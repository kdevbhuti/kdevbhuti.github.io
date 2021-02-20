const express = require("express");
const router = express.Router();

const mainController = require("../controller/MainController");
const signupController = require("../controller/SignupController");
const emailLoginController = require("../controller/EmailloginController")
const middilewar = require("../controller/Middleware")
const verifyProfileController= require("../controller/VerifyProfileController")

router.route('/').get(middilewar.home, mainController.home)
router.route('/signup').get(mainController.signup)
router.route('/emailLogin').get(mainController.emailLogin)
// router.route("/CreateNewPassword").get(mainController.createNewPassword)

router.route('/signup').post(signupController.signup)
router.route('/emailLogin').post(verifyProfileController.logInWithOtp,verifyProfileController.forGotPassword, emailLoginController.emailLogin)

router.route("/logout").get(mainController.logOut)
router.route("/OTP").post(verifyProfileController.resendOTP, verifyProfileController.checkOTP)
router.route("/ChangePassword").post(verifyProfileController.changePassword)

router.route("/PhoneLogin").post(verifyProfileController.phoneLogin)


module.exports = router;