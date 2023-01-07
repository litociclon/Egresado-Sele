const usersModels = require("../models/UserModels");

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
	let userFromCookie = usersModels.findByField('email', emailInCookie);

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}

	if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
    }


    next();
}
module.exports = userLoggedMiddleware