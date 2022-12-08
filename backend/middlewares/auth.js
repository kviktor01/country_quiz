const jwt =require("jsonwebtoken");
require('dotenv').config()
const {User} = require("../models");

function createToken(name,email){
    let token= jwt.sign({name,email},process.env.JWT_SECRET);
    
    return token;
}
const isAuth=async (req, res, next)=> {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                let err = new Error('Not authorized! Go back!');
                err.status = 401;
                return next(err);
            }
            
            next();
        });
    } else {
        let err = new Error('Not authorized! Go back!');
        err.status = 401;
        return next(err);
    }
    /*
    User.findById(req.session.userId).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {      
            if (user === null) {     
                var err = new Error('Not authorized! Go back!');
                err.status = 401;
                return next(err);
            } else {
                return next();
            }
        }
    });
    */
}

module.exports={
    createToken,
    isAuth    
}