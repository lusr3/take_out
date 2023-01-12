var express = require('express');
var md5 = require('md5');
const { execSql } = require('../exec/execSql');
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { currentTime } = require('../util/currentTime')
const { detail, register, edit, login, insertPic} = require('../controller/user')

exports.Pregister = function (req, res) {
    const type = req.body.type
    const id = req.body.id
    const passwd = md5(req.body.passwd)
    const name = req.body.name
    const phone = req.body.phone
    const address = req.body.address
    const fprice = req.body.fprice
    const promise = register(type, id, passwd, name, phone, address, fprice)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            res.send('<script>alert("注册成功"); window.location.href = "/user/login"; </script>');
        } else {
            res.send('<script>alert("您提供的信息不完整"); window.location.href = "/user/register"; </script>');
        }
    }, (error) =>{
        if(error.code === '23505'){
            res.json(
                new ErrorModel({
                    tip: '用户名重复',
                    failTime: currentTime()
                }, '注册用户')
            )
        }
        else {
            console.log(error)
            res.json(
                new ErrorModel({
                    tip: '注册失败',
                    failTime: currentTime()
                }, '注册用户')
            )
        }
    })
};

exports.Gregister = function (req, res) {
    res.render('login/register')
}

exports.Plogin = function (req, res) {
    const type = req.body.type
    const id = req.body.id
    const passwd = md5(req.body.passwd)
    const promise = login(type, id, passwd)
    promise.then((sqlData) => {
        if (sqlData.rowCount > 0) {
            // res.json(
            //     new SuccessModel({
            //         tip: '登录成功',
            //         updateTime: currentTime()
            //     }, '用户登录')
            // )
            req.session.type = type
            if (type === 'customer') {
                req.session.username = sqlData.rows[0].cname
                req.session._id = sqlData.rows[0].cid
            } else if (type === 'vendor') {
                req.session.username = sqlData.rows[0].vname
                req.session._id = sqlData.rows[0].vid
            } else if (type === 'rider') {
                req.session.username = sqlData.rows[0].rname
                req.session._id = sqlData.rows[0].rid
            }

            res.cookie('token', 888888, {maxAge: 1000 * 60 * 60 * 24 * 7})
            res.clearCookie('login_error')

            if (type === 'customer') {
                res.redirect('/customer/index')
            } else if (type === 'vendor') {
                res.redirect('/vendor/index')
            } else if (type === 'rider') {
                res.redirect('/rider/index')
            }
        } else {
            if (req.cookies.login_error) {
                res.cookie('login_error', parseInt(req.cookies.login_error) + 1, {maxAge: 60 * 1000 * 60 * 24 * 7});
            } else {
                res.cookie('login_error', 1, {maxAge: 60 * 1000 * 60 * 24 * 7});
            }

            res.redirect('/user/login');
        }
    })
};

exports.Glogin = function (req, res) {
    console.log(req.session.username)
    console.log(req.session.type)
    if (req.session.username) {
        if (req.session.type === 'customer') {
            res.redirect('/customer/index')
        } else if (req.session.type === 'vendor') {
            res.redirect('/vendor/index')
        } else if (req.session.type === 'rider') {
            res.redirect('/rider/index')
        }
    } else {
        res.render('login/signin')
    }
}

exports.Glogout = function (req, res) {
    res.clearCookie('token');
    req.session.destroy();
    res.redirect('/user/login');
}

exports.Gupload = function (req, res) {
    res.render('upload')
}

exports.Pupload = function(req, res, next){
    const type = req.session.type;
    const _id = req.session._id
    const filepath = 'uploads/' + req.file.filename
    const promise = insertPic(type, _id, filepath)
    promise.then((sqlData) => {
        if (type === 'customer') {
            res.redirect('/customer/index')
        } else if (type === 'vendor') {
            res.redirect('/vendor/index')
        } else if (type === 'rider') {
            res.redirect('/rider/index')
        }
    })
}

exports.Gedit = function(req, res) {
    // const type = req.session.type
    // const name = req.session.username
    const type = 'customer'
    const name = 'lu sr'
    const promise = detail(type, name)
    promise.then((sqlData) => {
        // console.log('data', sqlData.rows[0])
        // 根据type和data显示个人信息？
        if (sqlData.rowCount) {
            res.json(
                new SuccessModel(
                    {
                        type : type,
                        data : sqlData.rows[0]
                    }, '用户信息')
            )
        } else {
            res.json(
                new ErrorModel({
                    tip: '无用户',
                    failTime: currentTime()
                }, '用户信息')
            )
        }
    })
};

exports.Pedit = function(req, res) {
    // const type = req.session.type
    // const _id = req.session._id
    const type = 'rider'
    const _id = 'test'
    const passwd = md5(req.body.passwd)
    const name = req.body.name
    const phone = req.body.phone
    const icon = req.body.icon
    const address = req.body.address
    const fprice = req.body.fprice
    const promise = edit(type, _id, passwd, name, phone, icon, address, fprice)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            // 这里改成回到主页？
            let temp = '<script>alert("修改成功"); window.location.href = /' + type + '/index; </script>'
            res.send(temp)
            // res.send('<script>alert("修改成功"); window.location.href = "/user/login"; </script>');
        } else {
            res.send('<script>alert("您提供的信息不完整"); window.location.href = "/user/edit"; </script>');
        }
    })
};