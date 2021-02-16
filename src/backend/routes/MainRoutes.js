const express = require("express");
const router = express.Router();

const mainController = require("../controller/MainController");
const signupController = require("../controller/SignupController");
const emailLoginController = require("../controller/EmailloginController")
const middilewar = require("../controller/Middleware")

router.route('/').get(middilewar.home, mainController.home)
router.route('/signup').get(mainController.signup)
router.route('/emailLogin').get(mainController.emailLogin)

router.route('/signup').post(signupController.signup)
router.route('/emailLogin').post(emailLoginController.emailLogin)

router.route("/logout").get(mainController.logOut)
router.route("/OTP").get(mainController.OTP)

module.exports = router;