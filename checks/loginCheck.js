const validator = require('validator');

const loginChecks = (req)=>{
    let errors = {};
    let email = validator.trim(req.body.email?req.body.email:'');
    let password = validator.trim(req.body.password?req.body.password:'');
    if(validator.isEmpty(email)){
        errors.email="Email cannot be empty";
    }
    if(!validator.isEmail(email)){
        error.email="Email is not valid";
    }
    if(validator.isEmpty(password)){
        errors.password="Password cannot be empty";
    }
    return errors;
}
module.exports= loginChecks;