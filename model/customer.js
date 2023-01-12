const { findPic } = require('../controller/user')

exports.index = function (req, res) {
    const type = req.session.type
    const _id = req.session._id
    const promise = findPic(type, _id)
    promise.then((sqlData) => {
        if (sqlData.rowCount > 0) {
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