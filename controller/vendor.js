/**
 * 商家sql语句
 */

const { execSql } = require('../exec/execSql')

const list = (vid) => {
    let sql = `select dname, dpicture, price, sale from dish where vid='${vid}' order by dname;`
    return execSql(sql)
}

const add = (dname, dpicture, price, sale, vid) => {
    let sql = `insert into dish(dname, price, sale, vid, dpicture)
     values('${dname}', '${price}', '${sale}', '${vid}', '${dpicture}');`
    //  console.log(sql)
    return execSql(sql)
}

const deleteDish = (dname) => {
    let sql = `delete from dish where dname='${dname}';`
    return execSql(sql)
}

const task = () => {

}


module.exports = {
    list,
    add,
    deleteDish,
    task
}