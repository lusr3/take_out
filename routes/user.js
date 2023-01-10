var express = require('express');
var router = express.Router();
const { detail, register, editUser, deleteUser, login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { currentTime } = require('../util/currentTime')

router.get('/detail', function(req, res, next) {
    const type = req.body.type
    const id = req.body.id
    const promise = detail(type, id)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            res.json(
                new SuccessModel(sqlData['rows'], '查询用户信息')
            )
        } else {
            res.json(
                new ErrorModel({
                    tip: '查询失败',
                    failTime: currentTime()
                }, '查询用户信息')
            )
        }  
    })
})

router.post('/register', function(req, res, next) {
    const type = req.body.type
    const id = req.body.id
    const passwd = req.body.passwd
    const name = req.body.name
    const phone = req.body.phone
    const figure = req.body.figure
    const address = req.body.address
    const types = req.body.types
    const fprice = req.body.fprice
    const promise = register(type, id, passwd, name, phone, figure, address, types, fprice)
    promise.then((sqlData) => {
        console.log('data', sqlData)
        if (sqlData.rowCount) {
            res.json(
                new SuccessModel({
                    tip: '注册成功',
                    createTime: currentTime()
                }, '注册用户')
            )
        } else {
            res.json(
                new ErrorModel({
                    tip: '注册失败',
                    failTime: currentTime()
                }, '注册用户')
            )
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
});

router.post('/edit', function(req, res, next) {
    const type = req.body.type
    const id = req.body.id
    const passwd = req.body.passwd
    const name = req.body.name
    const phone = req.body.phone
    const figure = req.body.figure
    const address = req.body.address
    const types = req.body.types
    const fprice = req.body.fprice
    const promise = editUser(type, id, passwd, name, phone, figure, address, types, fprice)
    promise.then((sqlData) => {
        // console.log('data', sqlData)
        if (sqlData.rowCount) {
            res.json(
                new SuccessModel({
                    tip: '修改成功',
                    createTime: currentTime()
                }, '修改用户')
            )
        } else {
            res.json(
                new ErrorModel({
                    tip: '修改失败',
                    failTime: currentTime()
                }, '修改用户')
            )
        }  
    }, (error) =>{
        {
            console.log(error)
            res.json(
                new ErrorModel({
                    tip: '修改失败2',
                    failTime: currentTime()
                }, '修改用户')
            )
        }
    })
});

router.post('/delete', function(req, res, next) {
    const type = req.body.type
    const id = req.body.id
    const promise = deleteUser(type, id)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            res.json(
                new SuccessModel({
                    tip: '删除成功',
                    updateTime: currentTime()
                }, '删除用户')
            )
        } else {
            res.json(
                new ErrorModel({
                    tip: '删除失败',
                    failTime: currentTime()
                }, '删除用户')
            )
        }  
    })
});

router.post('/login', function(req, res, next) {
    const type = req.body.type
    const id = req.body.id
    const passwd = req.body.passwd
    const promise = login(type, id, passwd)
    promise.then((sqlData) => {
        // console.log(sqlData)
        if (sqlData.rowCount > 0) {
            // req.session.username = username
            // req.session.passwd = passwd
            res.json(
                new SuccessModel({
                    tip: '登录成功',
                    updateTime: currentTime()
                }, '用户登录')
            )
        } else {
            res.json(
                new ErrorModel({
                    tip: '登录失败',
                    failTime: currentTime()
                }, '用户登录')
            )
        }  
    })
});

router.get('/login', function(req, res, next) {
    const type = req.query.type
    const id = req.query.id
    const passwd = req.query.passwd
    const promise = login(type, id, passwd)
    promise.then((sqlData) => {
        // console.log(sqlData)
        if (sqlData.rowCount > 0) {
            // req.session.username = username
            // req.session.passwd = passwd
            res.json(
                new SuccessModel({
                    tip: '登录成功',
                    updateTime: currentTime()
                }, '用户登录')
            )
        } else {
            res.json(
                new ErrorModel({
                    tip: '登录失败',
                    failTime: currentTime()
                }, '用户登录')
            )
        }  
    })
});

router.get('/login-test', (req, res, next) => {
    if (req.session && req.session.username) {
        res.json(
            new SuccessModel({
                tip: '已登录',
                loginTime: currentTime()
            })
        )
    } else {
        res.json(
            new ErrorModel({
                tip: '未登录',
                failTime: currentTime()
            })
        )
    }
})

module.exports = router;
