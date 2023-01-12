const { detail } = require('../controller/user')

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