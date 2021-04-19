function auth(req, res, next){
    if(req.session.user){
        next();
    }else{
        req.flash('status', ['Failure', 'Please login first.'])
        res.redirect("/emailLogin");
    }
}

module.exports = {
    auth: auth
}