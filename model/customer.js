const { list, detail, add, deleteDish, commit } = require('../controller/customer')
const { SuccessModel, ErrorModel } = require('../model/resModel')

exports.index = function (req, res) {
    res.render('login/cus_index')
};

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