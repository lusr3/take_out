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
    let sql = 'select cname, createtime, ttid, address, dname from task T natural join history H natural join dish D natural join customer C '
    sql += `where T.vid='${vid}' and T.status<>2 order by createtime desc;`
    return execSql(sql)
}

const getTask = (vid) => {
    let sql = 'select cname, createtime, ttid, address, dname from task T natural join history H natural join dish D natural join customer C '
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