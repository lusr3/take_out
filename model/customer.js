const { findPic } = require('../controller/user')

exports.index = function (req, res) {
    const type = req.session.type
    const _id = req.session._id
    const promise = findPic(type, _id)
    promise.then((sqlData) => {
        if (sqlData.rowCount > 0 && sqlData.rows[0].icon) {
            res.render('login/cus_index', {
                filename: sqlData.rows[0].icon
            })
        } else {
            res.render('login/cus_index', {
                filename: 'uploads/default.jpg'
            })
        }
    })
};

const { list, detail, add, deleteDish, commit } = require('../controller/customer')
const { SuccessModel, ErrorModel } = require('../model/resModel')

exports.list = function(req, res) {
    const promise = list()
    // rows 数组包含(vname, vpicture, grade, floor_price)信息
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            res.send(sqlData.rows)
        }
        else{
            res.send('no vendors')
        }
    })
}

exports.detail = function(req, res) {
    const vname = req.query.vname
    const promise = detail(vname)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            // 返回数据列表 (dname, dpicture, price, sale)
            res.send(sqlData.rows)
        }
        else{
            res.send('no dishs')
        }
    })
}

exports.add = function(req, res) {
    const dname = req.body.dname
    // const cid = req.session.uid
    const cid = '哈哈哈'
    const promise = add(cid, dname)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            // 需要记录点的数量？
            res.send('success')
        }
        else{
            res.send('error')
        }
    })

}

exports.delete = function(req, res) {
    const dname = req.body.dname
    // const cid = req.session.uid
    const cid = '哈哈哈'
    const promise = deleteDish(cid, dname)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            res.send('succes')
        }
        else{
            res.send('error')
        }
    })
}

exports.commit = function(req, res) {

}
