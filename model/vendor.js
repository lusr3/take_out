const {list, addDish, deleteDish, getUnTask, getTask, insertDishPic} = require('../controller/vendor')

const { detail } = require('../controller/user');
const { finished, task } = require('./rider');

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
            res.render('ven_list_dish', {
                items: []
            })
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


exports.task = function(req, res) {
    const vid = req.session._id
    const promise = getUnTask(vid)
    unfinished_tasks = []
    finished_tasks = []
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            let ttid = -1
            let cname
            let createtime
            let tol_price
            let tasks = []
            let dishs = []
            for (var key in sqlData.rows) {
                if (ttid != sqlData.rows[key]['ttid']) {
                    if (ttid != -1) {
                        tasks.push(cname)
                        tasks.push(createtime)
                        tasks.push(tol_price)
                        unfinished_tasks.push(tasks.concat(dishs))
                    }
                    ttid = sqlData.rows[key]['ttid']
                    cname = sqlData.rows[key]['cname']
                    createtime = sqlData.rows[key]['createtime']
                    tol_price = sqlData.rows[key]['tol_price']
                    tasks = []
                    dishs = []
                }
                temp = []
                temp.push(sqlData.rows[key]['dname'])
                temp.push(sqlData.rows[key]['price'])
                dishs.push(temp)
            }
            tasks.push(cname)
            tasks.push(createtime)
            tasks.push(tol_price)
            unfinished_tasks.push(tasks.concat(dishs))
        }
        return getTask(vid)
    })
    .then((sqlData) => {
        if (sqlData.rowCount) {
            let ttid = -1
            let cname
            let createtime
            let finishtime
            let tol_price
            let cwords
            let grade
            let tasks = []
            let dishs = []
            for (var key in sqlData.rows) {
                if (ttid != sqlData.rows[key]['ttid']) {
                    if (ttid != -1) {
                        tasks.push(cname)
                        tasks.push(createtime)
                        tasks.push(finishtime)
                        tasks.push(tol_price)
                        tasks.push(cwords)
                        tasks.push(grade)
                        finished_tasks.push(tasks.concat(dishs))
                    }
                    ttid = sqlData.rows[key]['ttid']
                    cname = sqlData.rows[key]['cname']
                    createtime = sqlData.rows[key]['createtime']
                    finishtime = sqlData.rows[key]['finishtime']
                    tol_price = sqlData.rows[key]['tol_price']
                    cwords = sqlData.rows[key]['cwords']
                    grade = sqlData.rows[key]['grade']
                    tasks = []
                    dishs = []
                }
                temp = []
                temp.push(sqlData.rows[key]['dname'])
                temp.push(sqlData.rows[key]['price'])
                dishs.push(temp)
            }
            tasks.push(cname)
            tasks.push(createtime)
            tasks.push(finishtime)
            tasks.push(tol_price)
            tasks.push(cwords)
            tasks.push(grade)
            finished_tasks.push(tasks.concat(dishs))
        }
        res.render('vendor_task', {
            unfinished_task: unfinished_tasks,
            finished_task: finished_tasks
        })
        unfinished_tasks = []
        finished_tasks = []
    })
}
