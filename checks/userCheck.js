const validator = require('validator');

const userChecks = (req)=>{
    let errors = {};
    let name = validator.trim(req.body.name?req.body.name:'');
    let email = validator.trim(req.body.email?req.body.email:'');
    let password = validator.trim(req.body.password?req.body.password:'');
    let company = validator.trim(req.body.company?req.body.company:'');
    let address = validator.trim(req.body.address?req.body.address:'');
    if(validator.isEmpty(name)){
        errors.name="Name cannot be Empty";
    }
    if(validator.isEmpty(email)){
        errors.email="Email cannot be empty";
    }
    if(!validator.isEmail(email)){
        error.email="Email is not valid";
    }
    if(validator.isEmpty(password)){
        errors.password="Password cannot be empty";
    }
    if(validator.isEmpty(company)){
        errors.company="Company cananot be empty";
    }
    if(validator.isEmpty(address)){
        errors.address="Address cannot be empty";
    }
    return errors;
}
module.exports= userChecks;