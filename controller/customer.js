/**
 * 顾客sql语句
 */

const { execSql } = require('../exec/execSql')

const listVendors = () => {
    let sql = `select vname, icon, grade, floor_price from vendor order by grade desc, floor_price asc;`
    return execSql(sql)
}

const detailVendor = (vname) => {
    let sql = `select dname, dpicture, price, sale from dish
    where vid = (select vid from vendor where vname='${vname}') order by dname;`
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

const addTask = (cid, tol_price, vid, createtime) => {
    let sql = `insert into task(cid, tol_price, vid, status, createtime)
    values('${cid}', '${tol_price}', '${vid}', '0', '${createtime}');`
    return execSql(sql)
}

const get_tol_price = (cid) => {
    let sql = `select sum(price) from dish where did in
    (select did from ttemp where cid='${cid}');`
    return execSql(sql)
}

const get_ttid = (cid, time) => {
    let sql = `select ttid from task where cid='${cid}' and status='0' and createtime='${time}';`
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

const getUnHistory = (cid) => {
    let sql = 'select vname, createtime, ttid, dname, price, tol_price from task T natural join history H natural join dish D natural join vendor V '
    sql += `where T.cid='${cid}' and T.status<>2 order by createtime desc;`
    return execSql(sql)
}

const getHistory = (cid) => {
    let sql = 'select vname, createtime, finishtime, vid, ttid, dname, price, tol_price from task T natural join history H natural join dish D natural join vendor V '
    sql += `where T.cid='${cid}' and T.status=2 order by createtime desc;`
    return execSql(sql)
}

const comment = (cid, ttid, vid, cwords, commenttime, grade) => {
    let sql = `insert into comments(cid, ttid, vid, cwords, commenttime, grade)
    values('${cid}', '${ttid}', '${vid}', '${cwords}', '${commenttime}', '${grade}');`
    return execSql(sql)
}

const getVid = (ttid) => {
    let sql = `select vid from history where ttid='${ttid}';`
    return execSql(sql)
}

const checkStatus = (ttid) => {
    let sql = `select status from task where ttid='${ttid}';`
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

const updateSales = (data) => {
    let sql = `update dish set sale=sale+1 where did in (`
    for (var key in data) {
        if (key != 0) {
            sql += `, `
        }
        sql += `'${data[key].did}'`
    }
    sql += `);`
    return execSql(sql)
}

const getDishs = (cid) => {
    let sql = `select dname, price from dish where did in
    (select did from ttemp where cid='${cid}');`
    return execSql(sql)
}

module.exports = {
    listVendors,
    detailVendor,
    addDish,
    deleteDish,
    get_tol_price,
    get_all_order,
    addHistory,
    delete_order,
    get_ttid,
    addTask,
    getUnHistory,
    getHistory,
    comment,
    getVid,
    checkStatus,
    confirm,
    updataGrade,
    updateSales,
    getDishs
}