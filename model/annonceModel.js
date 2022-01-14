const mongoose=require('mongoose');
require('dotenv').config()
const Joi=require('joi');
const jwt=require('jsonwebtoken')
const hapiJoi = require('@hapi/joi');
const string = require('joi/lib/types/string');
hapiJoi.objectId = require('joi-objectid')(hapiJoi)
categorys=["Auto","Moto","Nautisme"]

   image={data:Buffer,contentType:String}      
        
const schemaAnnonce=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    images:[image],
    prix: {type:String,required:true},
    annee:{type:String},
    typologie:{type:String},
    marque:{type:String},
    model:{type:String},
    category:categorys,
    kilometrage:{type:String},
    portes:{type:String},
    transmission:{type:String},
    energie:{type:String},
    places:{type:String},
    puissance:{type:String},
    couleur:{type:String},
    carrosserie:{type:String},
    cylindre:{type:String},
    longueur:{type:String},
    nombre_moteur:{type:String},
    puissance_total:{type:String},
    creater:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
})



const Annonce=mongoose.model('Annonce',schemaAnnonce);
function validateAnnonce(annonce) {
    schema={
        title:Joi.string().required(),
        description:Joi.string().required(),
        prix: Joi.string().required(),
        annee:Joi.string().allow(null,''),
        typologie:Joi.string().allow(null,''),
        marque:Joi.string().allow(null,''),
        model:Joi.string().allow(null,''),
        category:Joi.string().allow(null,''),
        kilometrage:Joi.string().allow(null,''),
        portes:Joi.string().allow(null,''), 
        transmission:Joi.string().allow(null,''),
        energie:Joi.string().allow(null,''),
        places:Joi.string().allow(null,''),
        puissance:Joi.string().allow(null,''),
        couleur:Joi.string().allow(null,''),
        carrosserie:Joi.string().allow(null,''),
        cylindre:Joi.string().allow(null,''),
        longueur:Joi.string().allow(null,''),
        nombre_moteur:Joi.string().allow(null,''),
        puissance_total:Joi.string().allow(null,''),
        creater:Joi.string().allow(null,'')
    }

    return Joi.validate(annonce,schema)
}


module.exports.Annonce=Annonce
module.exports.validateAnnonce=validateAnnonce
