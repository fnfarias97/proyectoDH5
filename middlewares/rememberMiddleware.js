module.exports = (req, res, next) => {
    if(req.cookie.remember != undefined && req.session.userLogeedIn == undefined){
        var usuario = users.find(item => item.email == req.cookie.email);
        req.session.userLogeedIn = usuario;
    }

    next();
}