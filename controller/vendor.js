/**
 * 商家sql语句
 */

const { execSql } = require('../exec/execSql')

const list = (vid) => {
    let sql = `select dname, dpicture, price, sale from dish where vid='${vid}' order by dname;`
    return execSql(sql)
}

const addDish = (dname, price, vid) => {
    let sql = `insert into dish(dname, price, sale, vid)
     values('${dname}', '${price}', 0, '${vid}');`
    return execSql(sql)
}

const deleteDish = (dname) => {
    let sql = `delete from dish where dname='${dname}';`
    return execSql(sql)
}

const insertDishPic = (name, filepath) => {
    let sql = `update dish set dpicture = '${filepath}' where dname = '${name}';`

    return execSql(sql)
}

// TODO: 未完成订单
const getUnTask = (vid) => {
    let sql = 'SELECT T.ttid, C.cname, D.dname, T.createtime FROM task T LEFT JOIN history H ON T.ttid=H.ttid LEFT JOIN dish D ON H.did=D.did LEFT JOIN vendor V ON H.vid=V.vid LEFT JOIN customer c ON T.cid=C.cid '
    sql += `where T.cid='${vid}' and T.status<>2 order by createtime desc;`
    return execSql(sql)
}

// TODO: 已完成订单
const getTask = (vid) => {
    let sql = 'SELECT T.ttid, C.cname, D.dname, T.createtime FROM task T LEFT JOIN history H ON T.ttid=H.ttid LEFT JOIN dish D ON H.did=D.did LEFT JOIN vendor V ON H.vid=V.vid LEFT JOIN customer c ON T.cid=C.cid '
    sql += `where T.cid='${vid}' and T.status=2 order by createtime desc;`
    return execSql(sql)
}

module.exports = {
    list,
    addDish,
    deleteDish,
    insertDishPic,
    getUnTask,
    getTask
}