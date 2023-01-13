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


const getUnTask = (vid) => {
    let sql = 'select cname, createtime, ttid, price, tol_price, dname from task T natural join history H natural join dish D natural join customer C '
    sql += `where T.vid='${vid}' and T.status<>2 order by createtime desc;`
    return execSql(sql)
}

// 这里一定要用左右连接，否则会出现没有评论就不显示的清空
const getTask = (vid) => {
    let sql = 'select cname, createtime, finishtime, T.ttid, price, tol_price, dname, cwords, grade from task T natural join history H natural join dish D natural join customer C left join comments CO on T.ttid=CO.ttid '
    sql += `where T.vid='${vid}' and T.status=2 order by createtime desc;`
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