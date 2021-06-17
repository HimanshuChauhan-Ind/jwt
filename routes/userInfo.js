const express = require('express')
const router = express.Router()
const private = require('../middlewares/private')

router.get('/userinfo',private, (req,res)=>{
    console.log(req.user)
    console.log(req.header)
    res.send('Hitting It')
})

module.exports = router;