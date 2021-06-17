const Joi = require('joi')

// Validating the schema data and throw the error
const signUpValidation = (data)=>{
    const schemaValidator = Joi.object({
        username:Joi.string().min(4).required(),
        email:Joi.string().min(8).email().required(),
        phn:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        password:Joi.string().min(8).required(),
        address:Joi.string().min(8).required()
    })
    return schemaValidator.validate(data)
}

//Validating the LogIn 
const logInValidation = (data)=>{
    const schemaValidator = Joi.object({
        email:Joi.string().min(8).email().required(),
        password:Joi.string().min(8).required()
    })
    return schemaValidator.validate(data)
}

module.exports.signUpValidation = signUpValidation
module.exports.logInValidation = logInValidation