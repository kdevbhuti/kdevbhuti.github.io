


function home(req, res, next){
    if(req.session.user){
        if(!req.session.login){
            req.session.login = true;
            res.render("index", {status: "Success", message: "login Successfilly", user: req.session.user});
        }else{
            next()
        }
    }else{
        res.redirect("/emailLogin")
    }
   
}

function auth(req, res, next){
    if(req.session.user){
        next();
    }else{
        res.cookie('loginFirst', true);
        res.redirect("emailLogin");
    }
}

module.exports = {
    home: home,
    auth: auth
}