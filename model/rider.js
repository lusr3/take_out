const { detail } = require('../controller/user')
const { getUnTask, getFiTask, getTask } = require('../controller/rider')

exports.index = function (req, res) {
    const type = req.session.type
    const _id = req.session._id
    const promise = detail(type, _id)
    promise.then((sqlData) => {
        if (sqlData.rowCount > 0 && sqlData.rows[0].icon) {
            res.render('login/rid_index', {
                filename: sqlData.rows[0].icon,
                username: sqlData.rows[0].rname
            })
        } else {
            res.render('login/rid_index', {
                filename: 'uploads/default.jpg',
                username: sqlData.rows[0].rname
            })
        }
    })
};

exports.task = function(req, res) {
    const rid = req.session._id
    const promise = getUnTask(rid)
    unfinished_tasks = []
    finished_tasks = []
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            let ttid = -1
            let cname
            let createtime
            let address
            let tasks = []
            let dishs = []
            for (var key in sqlData.rows) {
                if (ttid != sqlData.rows[key]['ttid']) {
                    if (ttid != -1) {
                        tasks.push(cname)
                        tasks.push(createtime)
                        tasks.push(ttid)
                        tasks.push(address)
                        unfinished_tasks.push(tasks.concat(dishs))
                    }
                    ttid = sqlData.rows[key]['ttid']
                    cname = sqlData.rows[key]['cname']
                    createtime = sqlData.rows[key]['createtime']
                    address = sqlData.rows[key]['address']
                    tasks = []
                    dishs = []
                }
                dishs.push(sqlData.rows[key]['dname'])
            }
            tasks.push(cname)
            tasks.push(createtime)
            tasks.push(ttid)
            tasks.push(address)
            unfinished_tasks.push(tasks.concat(dishs))
        }
        return getFiTask(rid)
    })
    .then((sqlData) => {
        if (sqlData.rowCount) {
            let ttid = -1
            let cname
            let createtime
            let finishtime
            let address
            let tasks = []
            let dishs = []
            for (var key in sqlData.rows) {
                if (ttid != sqlData.rows[key]['ttid']) {
                    if (ttid != -1) {
                        tasks.push(cname)
                        tasks.push(createtime)
                        tasks.push(finishtime)
                        tasks.push(address)
                        finished_tasks.push(tasks.concat(dishs))
                    }
                    ttid = sqlData.rows[key]['ttid']
                    cname = sqlData.rows[key]['cname']
                    createtime = sqlData.rows[key]['createtime']
                    finishtime = sqlData.rows[key]['finishtime']
                    address = sqlData.rows[key]['address']
                    tasks = []
                    dishs = []
                }
                dishs.push(sqlData.rows[key]['dname'])
            }
            tasks.push(cname)
            tasks.push(createtime)
            tasks.push(finishtime)
            tasks.push(address)
            finished_tasks.push(tasks.concat(dishs))
        }
        res.render('rider_task', {
            unfinished_task: unfinished_tasks,
            finished_task: finished_tasks
        })
        unfinished_tasks = []
        finished_tasks = []
    })
}

exports.get = function(req, res) {
    const rid = req.session._id
    const ttid = req.query.ttid
    const promise = getTask(rid, ttid)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            res.send('<script>alert("接单成功"); window.location.href = "/user/login"; </script>');
        }
        else{
            res.send('get task fail')
        }
    })
}