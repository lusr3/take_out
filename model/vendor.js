const {list, addDish, deleteDish, getTask} = require('../controller/vendor')

const { detail } = require('../controller/user')

exports.index = function (req, res) {
    const type = req.session.type
    const _id = req.session._id
    const promise = detail(type, _id)
    promise.then((sqlData) => {
        if (sqlData.rowCount > 0 && sqlData.rows[0].icon) {
            res.render('login/ven_index', {
                filename: sqlData.rows[0].icon,
                username: sqlData.rows[0].vname
            })
        } else {
            res.render('login/ven_index', {
                filename: 'uploads/default.jpg',
                username: sqlData.rows[0].vname
            })
        }
    })
};

exports.list = function(req, res) {
    // const vid = req.session._id
    const vid = 'lwyyds'
    const promise = list(vid)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            // 返回菜品信息 (dname, dpicture, price, sale)
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
    const vid = 'lwyyds'
    const dname = req.body.dname
    const dpicture = req.body.dpicture
    const price = req.body.price
    const promise = addDish(dname, dpicture, price, vid)
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
        // 删除成功刷新列表
        if (sqlData.rowCount) {
            res.send('window.location.href = "/vendor/list"; </script>')
        }
        else{
            res.send('error')
        }
    })
}

exports.task = function(req, res) {
    // const vid = req.session._id
    const vid = 'lwyyds'
    const promise = getTask(vid)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            res.send(sqlData.rows)
        }
        else{
            res.send('no tasks')
        }
    })
}