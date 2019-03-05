//@login & register
var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var User = require('../../models/User');
var jwt = require('jsonwebtoken')
var gravatar = require('gravatar')
var keys = require('../../config/keys')
var passport = require('passport')

// @route GET api/users/test
// @desc 返回的请求的json数据
// @access public
router.get("/test", (req, res) => {
    res.json({
        msg: 'test succesed!'
    });
})

// @route POST api/users/register
// @desc 返回的请求的json数据
// @access public
router.post("/register", (req, res) => {
    //res.send(req.body)
    //console.log(req.body)

    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                console.log(user)
                return res.status(400).json({
                    email: "邮箱已经被注册！"
                })
            } else {
                let avatarURI = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })

                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatarURI,
                    pwd: req.body.pwd
                })
                //加密存储密码
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.pwd, salt, function (err, hash) {
                        if (err) throw err;
                        newUser.pwd = hash;

                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
            }

        })

})

// @route POST api/users/login
// @desc 返回token jwt passport
// @access public

router.post("/login", (req, res) => {
    let email = req.body.email;
    let pwd = req.body.pwd;
    //查询数据库
    User.findOne({
            email: email
        })
        .then((user) => {
            if (!user) {

                return res.status(404).json({
                    email: '用户不存在'
                });
            } else {
                //密码匹配
                bcrypt.compare(pwd, user.pwd)
                    .then(isMatch => {
                        if (isMatch) {
                            let rule = {
                                id: user.id,
                                name: user.name
                            }

                            jwt.sign(rule, keys.secretKey, {
                                expiresIn: 3600
                            }, (err, token) => {
                                if (err) throw err;
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            })
                            //res.json({msg:'success!'})
                        } else {
                            return res.status(400).json({
                                pwd: '密码错误'
                            });
                        }

                    })
            }
        })
})

// @route GET api/users/current
// @desc return current user
// @access Private

router.get('/userInfo', passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        avatar: req.user.avatar
    })
})

module.exports = router;