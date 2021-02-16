

function home(req, res, next){
    if(req.session.userid){
        if(!req.session.login){
            req.session.login = true;
            res.render("index", {status: "Success", message: "login Successfilly", name: req.session.name});
        }else{
            next()
        }
    }else{
        res.redirect("/emailLogin")
    }
   
}

module.exports = {
    home: home
}