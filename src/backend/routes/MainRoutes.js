const express = require("express");
const router = express.Router();

const mainController = require("../controller/MainController");
const signupController = require("../controller/SignupController");
const emailLoginController = require("../controller/EmailloginController")

router.route('/').get(mainController.home)
router.route('/signup').get(mainController.signup)
router.route('/emailLogin').get(mainController.emailLogin)

router.route('/signup').post(signupController.signup)
router.route('/emailLogin').post(emailLoginController.emailLogin)

module.exports = router;