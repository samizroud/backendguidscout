const {User}=require('../model/userModel');
const {validateUser}=require('../model/userModel');
const {validateLogin}=require('../model/userModel');
const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken')

const authmidlware=require('../midlware/authmidlware');
router.get('/currentUser/:id',async (req,res)=>{
  try {
    const result=await User.findById(req.params.id)
    .select("-password -username"); 
    if(!result || result.length<=0){
    return  res.status(200).send({status:false,resultat:result});

    }else
   return  res.status(200).send({status:true,resultat:result});
} catch (error) {
      return res.status(404).send(error);
  }
  
  
  })


router.post('/new',async(req,res)=>{
 var {error}=validateUser(req.body);
 if(error)
 return res.status(400).send({status:false,resultat:error.details[0].message});
 
   const isExist=await User.findOne({username:req.body.username});
   if(isExist) return res.status(401).send({status:false,resultat:'Username already exist'});

    try {
        var user=new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            roles:req.body.roles,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            adresse:req.body.adresse,
            code_postal:req.body.code_postal, 
            pays:req.body.pays,
            city:req.body.city
        })
      

      const result=await user.save()
        
      return res.status(200).send({status:true,resultat:result})  

    
        
    } catch (error) {
      
       return res.status(400).send({status:false,resultat:error});   
    
    }
})


router.post('/login',async(req,res)=>{
    const {error}=validateLogin(req.body);
    if(error) return res.status(400).send({status:false , resultat:error.details[0].message});
    const isExist=await User.findOne({username:req.body.username});
    if(!isExist) return res.status(401).send({status:false,resultat:'Invalid username'});
    if (isExist.password!=req.body.password) return res.status(401).send({status:false,resultat:'Invalid  password '});
    if(isExist.password==req.body.password){
    const token=jwt.sign({user:isExist},'testpassword')
    //  const token =isExist.generateAuthToken(); 
    console.log(token);
    return res.status(200).send({status:true,resultat:token})

    }
});



router.get('/users', async(req,res)=>{
   
    try {
        const result=await User.find()
         return res.send({status:true,resultat:result}); 
    } catch (error) {
        res.status(402).send(error)
    }
    
})

router.put('/update/:id', async(req,res)=>{
console.log(req.params.id)
    try {
        const result=await User.findByIdAndUpdate(req.params.id,{$set:{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            roles:req.body.roles,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
        
        }},{new:true})
        console.log(result)
        
         return res.status(200).send({status:true,resultat:result}); 
    } catch (error) {
        res.status(402).send(error)
    }
    
})

router.delete('/delete/:idUser', async(req,res)=>{
   console.log(req.params.idUser)
    try {
        const result=await User.findByIdAndDelete(req.params.idUser)   
        console.log(result)
         return res.status(200).send({status:true,resultat:result}); 
    } catch (error) {
        res.status(402).send(error)
    }
    
})
//  async function verifPass(pass,idUser){
//     ancienPass=await User.findById(idUser).select("password")
//    pass !=='' ? req.body.password:ancienPass
//    return pass
//  }

module.exports.routeUser=router;


