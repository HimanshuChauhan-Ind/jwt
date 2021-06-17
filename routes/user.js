const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// Validating the user data
const {signUpValidation, logInValidation} = require('../validation')

//Getting the user Model
const User = require('../models/User')

//Home page
router.get('/', (req,res)=>{
    res.send('Welcome Back')
})

//Getting the Sign Up page
router.get('/signup',(req,res)=>{
    res.render('user/signUp.ejs')
})


//Registering the user
router.post('/signup',async(req,res)=>{

    // Validating the user data
    const {error} = signUpValidation(req.body)
    if (error){
       return res.status(400).send(error.details[0].message)
    }

    //Getting unique email
    const uniqueEmail = await User.findOne({email: req.body.email})
    if(uniqueEmail){
        return res.status(400).send('Email already Exists')
    }

    //Hashing the Password
    let password = req.body.password
    const salt = await bcrypt.genSaltSync(10);
    password = await bcrypt.hash(password,salt)

    const user = new User({
        ...req.body,
        password: password
    })
    try{
        const savedUser = await user.save()
        res.redirect('/')
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})


// Showing the log in Page
router.get('/login',(req,res)=>{
    res.render('user/login')
})

// Submiting the log in request
router.post('/login',async(req,res)=>{
    // Validating the user data
    const {error} = logInValidation(req.body)
    if (error){
       return res.status(400).send(error.details[0].message)
    }

    //Getting the user
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).send('Email does not Exist')
    }

    //Verifying Password
    const passCheck = await bcrypt.compare(req.body.password, user.password)
    if(!passCheck){
        return res.status(400).send('Incorrect Password')
    }

    //Adding JWT
    const token = jwt.sign({_id:user._id},process.env.TOKEN)
    res.header('auth-token', token).send(token)

})

module.exports = router