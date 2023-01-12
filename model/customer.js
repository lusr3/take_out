const { addDish, deleteDish, get_tol_price, get_all_order, addTask, addHistory, delete_order, get_ttid, getHistory, confirm, comment, getVid, updataGrade, listVendors, detailVendor } = require('../controller/customer')
const { currentTime } = require('../util/currentTime')
const { detail } = require('../controller/user')

exports.index = function (req, res) {
    const type = req.session.type
    const _id = req.session._id
    const promise = detail(type, _id)
    promise.then((sqlData) => {
        if (sqlData.rowCount > 0 && sqlData.rows[0].icon) {
            res.render('login/cus_index', {
                filename: sqlData.rows[0].icon,
                username: sqlData.rows[0].cname
            })
        } else {
            res.render('login/cus_index', {
                filename: 'uploads/default.jpg',
                username: sqlData.rows[0].cname
            })
        }
    })
};

exports.list = function(req, res) {
    const promise = listVendors()
    // 每个商家信息为(vname, icon, grade, floor_price)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            res.render('list_vendor', {
                items: sqlData.rows
            })
        }
        else{
            res.send('no vendors')
        }
    })
}

exports.detail = function(req, res) {
    const vname = req.query.vname
    const promise = detailVendor(vname)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            // 返回该商家的菜品信息 (dname, dpicture, price, sale)
            ret_data = sqlData.rows
            for (let i = 0; i < ret_data.length; i++) {
                if (ret_data[i].dpicture === null) {
                    ret_data[i].dpicture = 'uploads/default_dish.jpg'
                }
            }
            res.render('list_vendor_dish', {
                vname: vname,
                items: ret_data
            })
        }
        else{
            res.send('no dishs')
        }
    })
}

exports.add = function(req, res) {
    const dname = req.body.dname
    const cid = req.session._id
    // const cid = '哈哈哈'
    const promise = addDish(cid, dname)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            res.send('success')
        }
        else{
            res.send('error')
        }
    })

}

exports.delete = function(req, res) {
    const dname = req.body.dname
    const cid = req.session._id
    // const cid = '哈哈哈'
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
    const cid = req.session._id
    // const cid = '哈哈哈'
    let tol_price
    let orders
    const promise = get_tol_price(cid)
    // 得到总价格
    promise.then((sqlData) => {
        if(sqlData.rowCount) {
            tol_price = sqlData.rows[0].sum
            return get_all_order(cid)
        }
        else{
            console.log('price error')
        }
    })
    // 得到当前所有点的菜(ttemp 里面的内容)
    .then((sqlData) => {
        if (sqlData.rowCount) {
            orders = sqlData.rows
            return addTask(cid, tol_price, currentTime())
        }
        else{
            console.log('orders error')
        }
    })
    // 添加任务后得到 ttid
    .then((sqlData) => {
        if (sqlData.rowCount) {
            return get_ttid(cid)
        }
        else{
            console.log('ttid error')
        }
    })
    // 添加 ttid 到 orders
    .then((sqlData) => {
        if (sqlData.rowCount) {
            let ttid = sqlData.rows[0].ttid
            for (var key in orders) {
                orders[key].ttid = ttid
            }
            return addHistory(orders)
        }
        else{
            console.log('task error')
        }
    })
    // 添加历史
    .then((sqlData) => {
        if (sqlData.rowCount) {
            return delete_order(cid)
        }
        else{
            console.log('history error')
        }
    })
    // 删除 ttemp 中的内容
    .then((sqlData) => {
        if (sqlData.rowCount) {
            res.send('succes commit')
        }
        else{
            res.send('delete error')
        }
    })
}

exports.history = function(req, res) {
    const cid = req.session._id
    // const cid = '哈哈哈'
    const promise = getHistory(cid)
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            // 返回task中订单信息 (ttid, cid, rid, tol_price, status, creattime, finishtime)
            // 按 status 从小到大排序, 再按发起时间排序
            res.send(sqlData.rows)
        }
        else{
            res.send('no history')
        }
    })
}

exports.Gcomment = function(req, res) {
    res.send('评论表单')
}

exports.Pcomment = function(req, res) {
    const cid = req.session._id
    // const cid = '哈哈哈'
    const ttid = req.body.ttid
    const cwords = req.body.cwords
    const cpicture = req.body.cpicture
    const grade = req.body.grade
    let vid
    const promise = getVid(ttid)
    // 得到 vid 后新增评价
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            vid = sqlData.rows[0].vid
            return comment(cid, ttid, vid, cwords, cpicture, currentTime(), grade)
        }
        else{
            res.send('get vid fail')
        }
    })
    // 新增评价后更新商家评分
    .then((sqlData) => {
        if (sqlData.rowCount) {
            return updataGrade(vid)
        }
        else{
            res.send('comment fail')
        }
    })
    .then((sqlData) => {
        if (sqlData.rowCount) {
            res.send('update success')
        }
        else{
            res.send('update fail')
        }
    })
}

exports.confirm = function(req, res) {
    const ttid = req.body.ttid
    const promise = confirm(ttid, currentTime())
    // 将订单状态修改为 2，添加完成时间
    promise.then((sqlData) => {
        if (sqlData.rowCount) {
            res.send('success confirm')
        }
        else{
            res.send('confirm error')
        }
    })
}