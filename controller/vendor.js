/**
 * 商家sql语句
 */

const { execSql } = require('../exec/execSql')

const list = (vid) => {
    let sql = `select dname, dpicture, price, sale from dish where vid='${vid}' order by dname;`
    return execSql(sql)
}

const add = (dname, price, vid) => {
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

const task = () => {

}


module.exports = {
    list,
    add,
    deleteDish,
    task,
    insertDishPic
}