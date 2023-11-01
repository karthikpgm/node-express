const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signUp_new_user = (req, res, next)=>{  
    
    User.find({email: req.body.email})
    .exec()
    .then(userData=>{
        if(userData.length >=1){
            return res.status(409).json({
                        message:"User already exists"
                    });
        }else{
            
            const user = new User({
                _id:  new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: req.body.password
            });
       
            user.save()
            .then(result=>{
                res.status(201).json({
                    message:"User created"
                });
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                }); 
            });
        }
    });
};

exports.login_user =  (req, res, next)=>{
   User.find({email: req.body.email})
   .exec()
   .then(user=>{
       if(user.length < 1){
           return res.status(401).json({
               message:"Auth failed"
           });
       }
       
      
   })
   .catch(err=>{
        res.status(500).json({error:err});
    });
};

exports.delete_user = (req, res, next)=>{
    const id = req.params.userId;
    User.remove({_id: id})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"User deleted"
        });
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
     
};