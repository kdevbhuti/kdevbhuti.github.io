const express = require("express");
const router = express.Router();

const mainController = require("../controller/MainController");
const signupController = require("../controller/SignupController");
const emailLoginController = require("../controller/EmailloginController")
const middilewar = require("../controller/Middleware")
const verifyProfileController = require("../controller/VerifyProfileController")
const doctorDetails = require("../controller/doctorDetailsController");
const editProfile = require("../controller/editProfileController");
const editSchedule = require("../controller/editSchedule");
const bookSchedule = require("../controller/bookSchedule")
const allAppointments = require("../controller/allAppointments");

const upload = require("../controller/multerStorage");

router.route('/').get(middilewar.auth, mainController.home)
router.route('/signup').get(mainController.signup)
router.route('/emailLogin').get(mainController.emailLogin)
// router.route("/CreateNewPassword").get(mainController.createNewPassword)

router.route("/doctor").get(middilewar.auth, mainController.doctor)
router.route("/hospital").get(middilewar.auth, mainController.hospital)
router.route("/wellcome").get(middilewar.auth, mainController.wellcome)

router.route('/signup').post(signupController.signup)
router.route('/emailLogin').post(verifyProfileController.logInWithOtp,verifyProfileController.forGotPassword, emailLoginController.emailLogin)

router.route("/logout").get(mainController.logOut)
router.route("/OTP").post(verifyProfileController.resendOTP, verifyProfileController.checkOTP)
router.route("/ChangePassword").post(verifyProfileController.changePassword)
router.route("/PhoneLogin").post(verifyProfileController.loginWithPassword ,verifyProfileController.phoneLogin)

router.route("/doctorDetails").post(doctorDetails.getDoctorDetails);
router.route("/editProfile").get(middilewar.auth, mainController.editProfile);
router.route("/editProfile").post(upload.single("profilePicture"), editProfile.editProfile);
router.route("/editSchedule").get(middilewar.auth, mainController.editeSchedule);
router.route("/editSchedule").post(editSchedule.editeSchedule);




router.route("/remove-schedule").get(middilewar.auth, editSchedule.removeSchedule)
router.route("/bookAppointment").get(bookSchedule.choiceSchedule);
router.route("/bookAppointment").post(bookSchedule.bookAppointment)
router.route("/allAppointments").get(allAppointments.allAppointments)
module.exports = router;