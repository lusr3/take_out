var express = require('express');
var md5 = require('md5');
const { detail, register, edit, login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { currentTime } = require('../util/currentTime')

exports.Pregister = function (req, res) {
    const type = req.body.type
    const id = req.body.id
    const passwd = md5(req.body.passwd)
    const name = req.body.name
    const phone = req.body.phone
    const address = req.body.address
    const fprice = req.body.fprice
    console.log('register', req.body)
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
    console.log(id, passwd, type)
    promise.then((sqlData) => {
        if (sqlData.rowCount > 0) {
            req.session.type = type
            req.session.uid = id
            if (type === 'customer') {
                req.session.username = sqlData.rows[0].cname
            } else if (type === 'vendor') {
                req.session.username = sqlData.rows[0].vname
            } else if (type === 'rider') {
                req.session.username = sqlData.rows[0].rname
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
    console.log(req.session)
    req.session.destroy();
    console.log(req.session)
    res.redirect('/user/login');
}

exports.Gedit = function(req, res) {
    const type = req.session.type
    const name = req.session.username
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
    const type = req.session.type
    const id = req.body.id
    const passwd = req.body.passwd
    const name = req.body.name
    const phone = req.body.phone
    const figure = req.body.figure
    const address = req.body.address
    const types = req.body.types
    const fprice = req.body.fprice
    const promise = edit(type, id, passwd, name, phone, figure, address, types, fprice)
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