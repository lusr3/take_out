/**
 * 顾客sql语句
 */

const { execSql } = require('../exec/execSql')

const list = () => {
    let sql = `select vname, vpicture, grade, floor_price from vendor order by grade desc, floor_price asc;`
    return execSql(sql)
}


const detail = (vname) => {
    let sql = `select dname, dpicture, price, sale from dish 
    where vid = (select vid from vendor where vname='${vname}' order by dname);`
    return execSql(sql)
}

const add = (cid, dname) => {
    let sql = `insert into ttemp values('${cid}',
    (select vid from dish where dname = '${dname}'),
    (select did from dish where dname = '${dname}')
    );`
    return execSql(sql)
}

const deleteDish = (cid, dname) => {
    let sql = `delete from ttemp where did = 
    (select did from dish where dname='${dname}' and cid='${cid}')`
    return execSql(sql)
}

const commit = () => {
    
}

module.exports = {
    list,
    detail,
    add,
    deleteDish,
    commit
}