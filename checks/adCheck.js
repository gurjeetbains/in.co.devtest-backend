const validator = require('validator');

const adChecks = (req)=>{
    let errors = {};
    let title = validator.trim(req.body.title?req.body.title:'');
    let adContent = validator.trim(req.body.adContent?req.body.adContent:'');
    let createdBy = req.body.createdBy?req.body.createdBy:'';
    let adType = validator.trim(req.body.adType?req.body.adType:'');
    if(validator.isEmpty(title)){
        errors.email="Title cannot be empty";
    }
    if(validator.isEmpty(adContent)){
        errors.adContent="adContent cannot be empty";
    }
    if(adContent.length<300){
        errors.adContent="adContent length is too short";
    }
    if(validator.isEmpty(createdBy)){
        errors.createdBy="CreatedBy cannot be empty";
    }
    if(!validator.isMongoId(createdBy)){
        errors.createdBy="CreatedBy is not a valid mongo id";
    }
    if(validator.isEmpty(adType)){
        errors.adType="AdType cannot be empty";
    }
    return errors;
}
module.exports= adChecks;