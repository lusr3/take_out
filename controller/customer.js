/**
 * 顾客sql语句
 */

const { execSql } = require('../exec/execSql')

const listVendors = () => {
    let sql = `select vname, icon, grade, floor_price from vendor order by grade desc, floor_price asc;`
    return execSql(sql)
}


const detail = (vname) => {
    let sql = `select dname, dpicture, price, sale from dish 
    where vid = (select vid from vendor where vname='${vname}' order by dname);`
    return execSql(sql)
}

const addDish = (cid, dname) => {
    let sql = `insert into ttemp values('${cid}',
    (select vid from dish where dname = '${dname}'),
    (select did from dish where dname = '${dname}')
    );`
    return execSql(sql)
}

const deleteDish = (cid, dname) => {
    let sql = `delete from ttemp where did = 
    (select did from dish where dname='${dname}' and cid='${cid}');`
    return execSql(sql)
}

const addTask = (cid, tol_price, createtime) => {
    let sql = `insert into task(cid, tol_price, status, createtime) 
    values('${cid}', '${tol_price}', '0', '${createtime}');`
    return execSql(sql)
}

const get_tol_price = (cid) => {
    let sql = `select sum(price) from dish where did in 
    (select did from ttemp where cid='${cid}');`
    return execSql(sql)
}

const get_ttid = (cid) => {
    let sql = `select ttid from task where cid='${cid}';`
    return execSql(sql)
}

const get_all_order = (cid) => {
    let sql = `select * from ttemp where cid='${cid}';`
    return execSql(sql)
}

const delete_order = (cid) => {
    let sql = `delete from ttemp where cid='${cid}';`
    return execSql(sql)
}

const addHistory = (data) => {
    let sql = `insert into history(ttid, vid, did, cid) values `
    // 同时插入多条记录
    for (var key in data) {
        if (key != 0) {
            sql += `, `
        }
        sql += `('${data[key].ttid}', '${data[key].vid}', '${data[key].did}', '${data[key].cid}')`
    }
    sql += `;`
    return execSql(sql)
}

const getHistory = (cid) => {
    let sql = `select * from task where cid='${cid}' order by status desc, createtime asc;`
    return execSql(sql)
}

const comment = (cid, ttid, vid, cwords, cpicture, commenttime, grade) => {
    let sql = `insert into comments(cid, ttid, vid, cwords, cpicture, commenttime, grade) 
    values('${cid}', '${ttid}', '${vid}', '${cwords}', '${cpicture}','${commenttime}', '${grade}');`
    return execSql(sql)
}

const getVid = (ttid) => {
    let sql = `select vid from history where ttid='${ttid}';`
    return execSql(sql)
}

const confirm = (ttid, finishtime) => {
    let sql = `update task set status='2', finishtime='${finishtime}' where ttid='${ttid}';`
    return execSql(sql)
}

const updataGrade = (vid) => {
    let sql = `update vendor set grade = 
    (select avg(grade) from comments where vid='${vid}') where vid='${vid}';`
    return execSql(sql)
}

module.exports = {
    listVendors,
    detail,
    addDish,
    deleteDish,
    get_tol_price,
    get_all_order,
    addHistory,
    delete_order,
    get_ttid,
    addTask,
    getHistory,
    comment,
    getVid,
    confirm,
    updataGrade
}