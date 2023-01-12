const {list, addDish, deleteDish, getUnTask, getTask, insertDishPic} = require('../controller/vendor')

const { detail } = require('../controller/user');
const { finished } = require('./rider');

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
    const vid = req.session._id
    // const vid = 'lwyyds'
    const promise = list(vid)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            // 返回数据是列表 (dname, dpicture, price, sale)
            ret_data = sqlData.rows
            for (let i = 0; i < ret_data.length; i++) {
                if (ret_data[i].dpicture === null) {
                    ret_data[i].dpicture = 'uploads/default_dish.jpg'
                }
            }
            res.render('ven_list_dish', {
                items: ret_data
            })
        }
        else{
            res.send('no dishs now')
        }
    })
}

exports.Gadd = function(req, res) {
    res.render('add_dish')
}

exports.Padd = function(req, res) {
    const _id = req.session._id
    const dname = req.body.dname
    const price = req.body.price
    const promise = addDish(dname, price, _id)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            res.send('<script>alert("添加成功"); window.location.href = "/vendor/list"; </script>')
        }
        else{
            res.send('error')
        }
    })
}

exports.Gdelete = function(req, res) {
    res.render('del_dish')
}

exports.Pdelete = function(req, res) {
    const dname = req.body.dname
    const promise = deleteDish(dname)
    promise.then((sqlData) => {
        // 删除成功刷新列表
        if (sqlData.rowCount) {
            res.send('<script>alert("删除成功"); window.location.href = "/vendor/list"; </script>')
        }
        else{
            res.send('error')
        }
    })
}

exports.Gupload = function (req, res) {
    res.render('upload_dish', {
        dishname: req.query.dishname
    })
}

exports.Pupload = function(req, res, next){
    const dishname = req.query.dishname
    const filepath = 'uploads/' + req.file.filename
    const promise = insertDishPic(dishname, filepath)
    promise.then((sqlData) => {
        res.redirect('/vendor/list')
    })
}

unfinished_task = []
finished_task = []

// TODO:
exports.task = function(req, res) {
    const vid = req.session._id
    const promise = getUnTask(vid)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            unfinished_task.push(sqlData.rows[0]['cname'])
            unfinished_task.push(sqlData.rows[0]['createtime'])
            unfinished_task.push(sqlData.rows[0]['ttid'])
            for (var key in sqlData.rows) {
                unfinished_task.push(sqlData.rows[key]['dname'])
            }
            res.render('vendor_task', {
                unfinished_task: unfinished_task,
                finished_task: finished_task
            })
        }
        return getTask(vid)
    })
    .then((sqlData) => {
        if (sqlData.rowCount) {
            console.log(sqlData.rows)
            // TODO: 怎么样返回
            res.render('vendor_task', {
                unfinished_task: unfinished_task,
                finished_task: finished_task
            })
            unfinished_task = []
            finished_task = []
        }
        else{
            res.send('orders error')
        }
    })
}