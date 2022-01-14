const {User}=require('../model/userModel');
const {validateAnnonce, Annonce}=require('../model/annonceModel');
const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken')
const fs = require('fs');
const path = require('path');
const authmidlware=require('../midlware/authmidlware');
var multer = require('multer');


var pathDir;

    var storage = multer.diskStorage({
        destination:  function (req, file, cb) {
            cb(null, pathDir)
          } ,
        filename: function (req, file, cb) {
          cb(null, file.originalname)
        },
    });
    
    var upload = multer({ storage: storage });



router.post('/new',async(req, res,next)=>{
 var {error}=validateAnnonce(req.body);
 if(error)
 return res.status(400).send({status:false,resultat:error.details[0].message});

 try {

        var annonce=new Annonce({
            
            title:req.body.title,
            description:req.body.description,
            prix: req.body.prix,
            annee:req.body.annee,
            typologie:req.body.typologie,
            marque:req.body.marque,
            model:req.body.model,
            category:req.body.category,
            kilometrage:req.body.kilometrage,
            portes:req.body.portes,
            transmission:req.body.transmission,
            energie:req.body.energie,
            places:req.body.places,
            puissance:req.body.puissance,
            couleur:req.body.couleur,
            carrosserie:req.body.carrosserie,
            cylindre:req.body.cylindre,
            longueur:req.body.longueur,
            nombre_moteur:req.body.nombre_moteur,
            puissance_total:req.body.puissance_total,
            creater:req.body.creater,
        })
      
      const result=await annonce.save()
        fs.mkdir(path.join('uploads/',annonce.id), (err) => { 
            if (err) { 
                return console.error(err); 
            } 
            console.log('Directory created successfully!'); 
        })
        pathDir=path.join('uploads/',annonce.id);
      return res.status(200).send({status:true,resultat:result})   
    } catch (error) {

       return res.status(400).send({status:false,resultat:error});   
    
    }

 
})


router.post('/upload/:id',upload.any('image'),async(req,res,next)=>{

    try{
        
        let id =req.params.id
       
     fs.readdir(pathDir,async(err, files) => {
        let fileInfos = [];

        files.forEach((file) => {
    
   
                  fileInfos.push({
                    data: fs.readFileSync(pathDir+'/'+file) ,
                    contentType:path.extname(file).replace('.','')
                  }); 
                  
        
            console.log(fileInfos)

        });
        
           const result=await Annonce.findByIdAndUpdate(id,{$push:{images:fileInfos}},{new:true} )
           console.log(result.images)
           return res.status(200).send({status:true,resultat:result});  
       })
       
     
       }catch(error){
   res.status(402).send(error)
       }
       
   })



router.get('/all', async(req,res)=>{
   
    try {
        const result=await Annonce.find()
         return res.send({status:true,resultat:result}); 
    } catch (error) {
        res.status(402).send(error)
    }
    
})

router.get('/getOne/:id',async(req,res)=>{
    try{
        const result=await Annonce.findById(req.params.id);
        return res.send({status:true,resultat:result});
    } catch (error) {
        res.status(402).send(error)
    }
})









router.put('/update/:id', async(req,res)=>{
console.log(req.params.id)
    try {
        const result=await Annonce.findByIdAndUpdate(req.params.id,{$set:{
            title:req.body.title,
            description:req.body.description,
            images:req.body.images, 
            prix: req.body.prix,
            annee:req.body.annee,
            typologie:req.body.typologie,
            marque:req.body.marque,
            model:req.body.model,
            category:req.body.category,
            kilometrage:req.body.kilometrage,
            portes:req.body.portes,
            transmission:req.body.transmission,
            energie:req.body.energie,
            places:req.body.places,
            puissance:req.body.puissance,
            couleur:req.body.couleur,
            carrosserie:req.body.carrosserie,
            cylindre:req.body.cylindre,
            longueur:req.body.longueur,
            nombre_moteur:req.body.nombre_moteur,
            puissance_total:req.body.puissance_total,
            creater:req.body.creater,
        }},{new:true})
        console.log(result)
        
         return res.status(200).send({status:true,resultat:result}); 
    } catch (error) {
        res.status(402).send(error)
    }
    
})

router.delete('/delete/:id',authmidlware, async(req,res)=>{
   console.log(req.params.id)
    try {
        const result=await User.findByIdAndDelete(req.params.id)   
        console.log(result)
         return res.status(200).send({status:true,resultat:result}); 
    } catch (error) {
        res.status(402).send(error)
    }
    
})





module.exports.routeAnnonce=router;


