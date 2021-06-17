const jwt = require('jsonwebtoken')

module.exports = function (req,res,next){
    const token = req.header('auth-token')
    console.log(req.header)
    if(!token){
            return res.status(500).send('You are not Authorized')
    }

    try{
        const verified = jwt.verify(token, process.env.TOKEN)
        req.user = verified;
        next()
    }
    catch(err){
        res.status(500).send('Invalid Token')
    }
}
