const UserModel = require("../database/moduls/userModul");

const Nexmo = require("nexmo");

const nexmo = new Nexmo({
    apiKey: 'b6687f25',
    apiSecret: 'uZhi1jwc8FKpFfav',
});


function forGotPassword(req, res, next) {
    if (req.body.command === "ForGot password") {
        var { email } = req.body;
        if (email) {
            UserModel.findOne({ email: email }, function (err, user) {
                if (user) {
                    // Seving the userId into cookie for identify user at the time reset passsword
                    res.cookie('userId', user._id);
                    req.cookies.userId = user._id;
                    nexmo.verify.request({
                        number: "91" + user.phoneNumber,
                        brand: "Tvastra",
                        pin_expiry: 60,
                        code_length: '4',
                    },
                        (err, result) => {
                            if (result.status === "0") {
                                const verifyRequestId = result.request_id;
                                res.render("OTP", { status: "Info", message: "Valid for 60 secs", requestId: verifyRequestId, buttonCommand: "forgotPassword" })
                            }else{
                                console.log(result)
                            }
                        })
                }else{
                    res.render("emailLogin", {status: "Failure", message: "Email is not associated with any user."})
                }
            })
        }
    } else {
        next();
    }
}


function resendOTP(req, res, next) {
    const { buttonCommand } = req.body;

    if (req.body.command === "Resend") {
        const { requestId } = req.body;
        if ( requestId ) {
            // Cancel the previous request
            nexmo.verify.control({
                request_id: requestId,
                cmd: 'trigger_next_event'
            }, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(result);
                    if(result.status != 0){
                        console.log(result)
                        res.redirect("/emailLogin")
                    }else{
                        res.render("OTP", { status: "Info", message: "Valid for 60 secs", requestId: requestId, buttonCommand: buttonCommand})
                    }
                }
            });
        }
    } else {
        next()
    }
}

function checkOTP(req, res) {

    var { otp1, otp2, otp3, otp4, requestId, buttonCommand } = req.body;
    if (otp1 && otp2 && otp3 && otp4 && requestId && buttonCommand) {
        let otp = otp1 + otp2 + otp3 + otp4;
        nexmo.verify.check({
            request_id: requestId,
            code: otp
        }, (err, result) => {
            console.log(result)
            if (result.status === "0") {
                if(buttonCommand === "forgotPassword"){// cecking for forgot otp or loginwith phone number
                    res.render("createNewPassword");
                }else{
                    UserModel.findById(req.cookies.userId, function(err, user){
                        if(!req.session.userid){
                            req.session.userid = user._id;
                            req.session.name = user.name
                       }
                       res.clearCookie('userId');
                        res.redirect("/")
                    }) 
                }
            } else {
                res.render("OTP", { status: "Failure", message: "Wrong OTP", requestId: requestId, buttonCommand: buttonCommand });
            }
        });
    }
}

function changePassword(req, res) {
    const { password } = req.body;
    if (req.cookies.userId && password) {
        UserModel.findOneAndUpdate({ _id: req.cookies.userId }, { password: password }, { upsert: false }, (err, user) => {
            if (user) {
                res.render("emailLogin", { status: "Success", message: "Password changed succesfully" })
            }
        })
        res.clearCookie('userId');
    }
}

function logInWithOtp(req, res, next) {
    if (req.body.command === "LogIn with OTP") {
        res.render("phoneLogin", { status: undefined });
    } else {
        next();
    }
}

function phoneLogin(req, res) {
    const { phNumber } = req.body;

    if (phNumber) {
        UserModel.findOne({ phoneNumber: phNumber }, function (err, user) {
            if (user) {


                res.cookie('userId', user._id);
                nexmo.verify.request({
                    number: "91" + user.phoneNumber,
                    brand: "Tvastra",
                    pin_expiry: 60,
                    code_length: '4',
                },
                    (err, result) => {

                        if (result.status === "0") {
                            const verifyRequestId = result.request_id;
                            res.render("OTP", { status: "Info", message: "Valid for 60 secs", requestId: verifyRequestId, buttonCommand: "phoneLogin" })
                        }else{
                            console.log(result)
                        }
                    })
            } else {
                res.render("phoneLogin", { status: "Failure", message: "Number is not associated with any user." })
            }
        })
    }
}

function loinWithPassword(req, res, next){
    const {command} = req.body;
    if(command === "LogIn with password"){
        res.redirect("/emailLogin")
    }else{
        next();
    }
}

module.exports = ({
    forGotPassword: forGotPassword,
    checkOTP: checkOTP,
    changePassword: changePassword,
    logInWithOtp: logInWithOtp,
    phoneLogin: phoneLogin,
    resendOTP: resendOTP,
    loginWithPassword: loinWithPassword
})