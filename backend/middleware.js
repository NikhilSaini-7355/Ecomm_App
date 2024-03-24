const { jwt } = require('jsonwebtoken');
const { default: JWT_SECRET } = require('./config');
function authMiddleware(req,res,next)
{
    const body = req.body;
    let token = req.headers.authorization;
    if(!(token.startsWith("Bearer ")))
    {
        return res.status(411).json({
            message : "user not logged in"
        })      
    }
    
    token = token.split(" ")[1];
     const verify = jwt.verify(token,JWT_SECRET);
     if(!verify)
     {
        return res.status(411).json({
            message : "error while logging in"
        })
     }

     req.userId = verify.userId;
     next();

}

module.exports = {
    authMiddleware
}