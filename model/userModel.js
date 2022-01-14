const mongoose=require('mongoose');
require('dotenv').config()
const Joi=require('joi');
const jwt=require('jsonwebtoken')
const hapiJoi = require('@hapi/joi')
hapiJoi.objectId = require('joi-objectid')(hapiJoi)
tabRole=["Admin","Client","visiteur"]

const schemaUser=new mongoose.Schema({
    username:{type:String,required:true,min:3,unique:true},
    password:{type:String,required:true,min:5},
    email:{type:String,email:true,required:true},
    roles:tabRole,
    firstName: {type:String,required:true},
    lastName: {type:String,required:true},
    phone: {type:String,required:true},
    adresse:{type:String,required:true},
    code_postal:{type:String,required:true}, 
    pays:{type:String,required:true},
    city:{type:String,require:true}
})


schemaUser.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id,role:this.role},process.env.Secret);
    return token ; 
}


const User=mongoose.model('User',schemaUser);
function validateUser(user) {
    schema={
        username:Joi.string().min(5).max(16).required(),
        password:Joi.string().min(5).max(16).required(),
        email:Joi.string().email().required(),
        roles:Joi.array().items(Joi.valid(...tabRole)).required(),  
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phone: Joi.string().required(),
        adresse:Joi.string().required(),
        code_postal:Joi.string().required(),
        pays:Joi.string().required(),
        city:Joi.string().required(),
    }

    return Joi.validate(user,schema)
}

function validateLogin(user){
    schema={
        
        username:Joi.string().max(16).min(5).required(),                                                                                                                                                                                                                                                                                                                                                                     
        password:Joi.string().max(16).min(5).required(),
        
    }
    return Joi.validate(user,schema)

}
module.exports.User=User
module.exports.validateUser=validateUser
module.exports.validateLogin=validateLogin