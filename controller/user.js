var User = require('../models/user');
var Chance = require('chance');
var fs = require('fs-extra');

exports.postUsers = function (req, res) {
    var user = new User({
        nickname: req.body.nickname,
        password: req.body.password,
        birth:new Date(req.body.birth),
        sex: req.body.sex,
        email: req.body.email,
        intro:req.body.intro
    });
    
    user.save(function (err) {
        if (err)
            res.status(400).json(err);
        else
             res.status(201).json(user);
    });
};

exports.login = function (req, res) {
    User.find({_id: req.user._id}, function (err, users) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(users);
    });
};

exports.getUsers = function (req, res) {
    User.find(function (err, users) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(users);
    });
};

exports.getUser = function (req, res) {
    User.find({_id: req.params.user_id}, function (err, user) {
        if (err)
            res.status(400).json(err);
        else if (!user[0])
            res.status(404).end();
        else
            res.status(200).json(user);
    });
};

exports.putUserPassword = function (req, res) {
    User.update({_id: req.user._id}, {
        password: req.body.password
    }, function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
exports.putUserPhoto= function (req, res) {
    if (!(req.files.picture === undefined)) {

        var my_chance = new Chance();
        var guid = my_chance.guid();
        var type=req.files.picture.type.split('/')[1];
        var photo = guid + "."+type;
        fs.renameSync(req.files.picture.path, "./uploads/"+photo);
   
    }

    User.update({_id: req.user._id}, {
        photo:photo
        }, function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.putUserInfo = function (req, res) {

    User.update({_id: req.user._id}, {
        nickname: req.body.nickname,
        birth:new Date(req.body.birth),
        sex: req.body.sex,
        intro:req.body.intro,
        }, function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.deleteUser = function (req, res) {
    User.remove({_id: req.params.user_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
