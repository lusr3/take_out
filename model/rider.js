const { detail } = require('../controller/user')
const { listFinshed, getTask, listPending, } = require('../controller/rider')

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

exports.finished = function(req, res) {
    const rid = req.session._id
    // const rid = 'lwyyds3'
    const promise = listFinshed(rid)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            res.send(sqlData.rows)
        }
        else{
            res.send('no finished task')
        }
    })
}

exports.pending = function(req, res) {
    const promise = listPending()
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            res.send(sqlData.rows)
        }
        else{
            res.send('no pending task')
        }
    })
}

exports.get = function(req, res) {
    const rid = req.session._id
    // const rid = 'lwyyds3'
    const ttid = req.body.ttid
    const promise = getTask(rid, ttid)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            res.send('get task success')
        }
        else{
            res.send('get task fail')
        }
    })
}