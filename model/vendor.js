const {list, add, deleteDish, task} = require('../controller/vendor')

exports.index = function (req, res) {
    res.render('login/ven_index')
}

exports.list = function(req, res) {
    // const vid = req.session.uid
    const vid = 'test1'
    const promise = list(vid)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            // 返回数据是列表 (dname, dpicture, price, sale)
            res.send(sqlData.rows)
        }
        else{
            res.send('no dishs now')
        }
    })
}

exports.Gadd = function(req, res) {
    res.send('展示添加表单')
}

exports.Padd = function(req, res) {
    // const vid = req.session.uid
    const vid = 'test'
    const dname = req.body.dname
    const dpicture = req.body.dpicture
    const price = req.body.price
    const sale = req.body.sale
    const promise = add(dname, dpicture, price, sale, vid)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            res.send('<script>alert("添加成功"); window.location.href = "/vendor/list"; </script>')
        }
        else{
            res.send('<script>alert("您提供的信息不完整"); window.location.href = "/vendor/add"; </script>')
        }
    })
}

exports.delete = function(req, res) {
    const dname = req.body.dname
    const promise = deleteDish(dname)
    promise.then((sqlData) => {
        // console.log(sqlData)
        // 删除成功刷新列表
        if (sqlData.rowCount) {
            res.send('window.location.href = "/vendor/list"; </script>')
        }
        else{
            res.send('error')
        }
    })
}