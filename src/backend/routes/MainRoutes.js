const express = require("express");
const router = express.Router();

const mainController = require("../controller/MainController")

router.route('/').get(mainController.home)
router.route('/signup').get(mainController.signup)
router.route('/login').get(mainController.login)
module.exports = router;