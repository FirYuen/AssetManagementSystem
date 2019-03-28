var express = require("express");
var router = express.Router();
var Profile = require('../../models/Profile');
var passport = require('passport')

// @route GET api/profiles/test
// @desc 返回的请求的json数据
// @access public
router.get("/test", (req, res) => {
    res.json({
        msg: 'test succesed!'
    });
})

// @route POST api/profiles/add
// @desc 添加信息接口
// @access public
router.post("/add", passport.authenticate('jwt', { session: false }), (req, res) => {
    //res.send(req.body)
    //console.log(req.body)
    let profileFields = { ...req.body }
    profileFields.date = Date.now()
    // if(req.body.type){
    //     profileFields.type = req.body.type
    // }
    new Profile(profileFields).save().then((profile) => {
        res.json(profile)
    }).catch(err => res.status(400).json(err))
})

// @route GET api/profiles/delete/:id
// @desc 删除数据
// @access public
router.delete("/delete/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    let profileFields = { ...req.body }
    Profile.findOneAndDelete({ __id: req.param.id })
        .then(profile => {
            profile.save()
                .then(profile => res.json(profile))
        })
        .catch(err => res.status(400).json(err))
})

// @route GET api/profiles/edit/:id
// @desc 修改数据
// @access public
router.post("/edit/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    let profileFields = { ...req.body }
    Profile.findOneAndUpdate({ __id: req.param.id }, { $set: profileFields }, { new: true })
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json(err))
})

// @route GET api/profiles/:id
// @desc 请求单条数据
// @access public
router.get("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.params)
    Profile.findOne({ _id: req.params.id }).then(profile => {
        if (!profile) {
            return res.status(404).json('未找到任何内容')
        } else {
            res.json(profile)
        }
    }).catch(err => res.status(404).json(err))
})


// @route GET api/profiles
// @desc 请求所有数据
// @access public
router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find().then(profile => {
        if (!profile) {
            return res.status(404).json('未找到任何内容')
        } else {
            res.json(profile)
        }
    }).catch(err => res.status(404).json(err))
})

module.exports = router;