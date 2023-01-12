/**
 * 商家sql语句
 */

const { execSql } = require('../exec/execSql')

const list = (vid) => {
    let sql = `select dname, dpicture, price, sale from dish where vid='${vid}' order by dname;`
    return execSql(sql)
}

const addDish = (dname, dpicture, price, vid) => {
    let sql = `insert into dish(dname, price, sale, vid, dpicture)
     values('${dname}', '${price}', '0', '${vid}', '${dpicture}');`
    return execSql(sql)
}

const deleteDish = (dname) => {
    let sql = `delete from dish where dname='${dname}';`
    return execSql(sql)
}

const getTask = (vid) => {
    let sql = `select * from task where vid='${vid}' order by status asc, createtime desc;`
    return execSql(sql)
}


module.exports = {
    list,
    addDish,
    deleteDish,
    getTask
}