//@login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../../models/User');

// @route GET api/users/test
// @desc 返回的请求的json数据
// @access public
router.get("/test",(req,res)=>{
    res.json({msg:'logging succesed!'});  
})

// @route post api/users/register
// @desc 返回的请求的json数据
// @access public
router.post("/register",(req,res)=>{
    //res.send(req.body)
    //console.log(req.body)

    User.findOne({email:req.body.email})
        .then((user)=>{
            if (user) {
                return res.status(400).json({email:"邮箱已经被注册！"})
            }else{
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    
                    pwd:req.body.pwd
                })
                console.log(newUser)
            
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.pwd, salt, function(err, hash) {
                       if(err) throw err;
                       newUser.pwd = hash;
                       
                       newUser.save()
                       .then(user=>res.json(user))
                       .catch(err=>console.log(err)
                       )
                    });
                });
            }
            
        })
    
})

module.exports = router;