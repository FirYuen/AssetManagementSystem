//@login & register
const express = require("express");
const router = express.Router();

const User = require('../../models/User')

// @route GET api/users/test
// @desc 返回的请求的json数据
// @access public
router.get("/test",(req,res)=>{
    res.json({msg:'logging succesed!'})
})

// @route post api/users/register
// @desc 返回的请求的json数据
// @access public
router.post("/register",(req,res)=>{
    //res.send(req.body)
    //console.log(req.body)

    User.findOne({email:req.body.email})
        .then((User)=>{
            if (User) {
                return res.status(400).json({email:"邮箱已经被注册！"})
            }else{
                const newUser = new User({
                    ...req.body
                })
                console.log(newUser)
                res.send('ok')
            }
        })
    
})

module.exports = router;