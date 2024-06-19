const jwt = require('../lib/jwt');
const config = require('../config/config');

exports.auth = async (req, res, next) => {

    const token = req.cookies['auth'];


    if(!token) {
        return next();
    }

    try {

        const decodedToken = await jwt.verify(token, config.SECRET);
        req.user = decodedToken;
        res.locals.isAuthenticated = true;


        next();

    } catch {
        res.clearCookie();
        return res.redirect('/login');
    }

};

exports.isAuth = (req, res, next) => {

    const token = req.cookies['auth'];

    if(!token) {
        return res.redirect('/login');   
    }

    next();
}