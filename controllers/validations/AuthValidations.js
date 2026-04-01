const joi = require('joi')

const RegesterSchemaValidation = joi.object({
    empid : joi.string().required(),
    name : joi.string().required(),
    email: joi.string().required().email(),
    password : joi.string().min(8).max(15),
    role : joi.string().valid("employee" ,"manager","hr"),
    department : joi.string()




})

module.exports = {RegesterSchemaValidation}