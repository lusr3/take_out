/**
 * 用户sql语句
 */

const { execSql } = require('../exec/execSql')

const detail = (type, id) => {
    let sql = `select * from ${type} `
    if (type === 'customer') {
        sql += `where cid='${id}';`
    }
    else if (type === 'vendor') {
        sql += `where vid='${id}';`
    }
    else{
        sql += `where rid='${id}';`
    }
    return execSql(sql)
}

const register = (type, id, passwd, name, phone, figure, address, types, fprice) => {
    let sql = `insert into ${type}`
    if (type === 'customer') {
        sql += `(cid, cname, passwd, phone, icon, address)`
        sql += ` values('${id}', '${name}', '${passwd}', '${phone}', NULL, '${address}');`
    }
    else if (type === 'vendor') {
        sql += `(vid, vname, passwd, vpicture, grade, floor_price, types)`
        sql += ` values('${id}', '${name}', '${passwd}', NULL, NULL, '${fprice}', '${types}');`
    }
    else{
        sql += `(rid, rname, passwd, phone)`
        sql += ` values('${id}', '${name}', '${passwd}', '${phone}');`
    }
    return execSql(sql)
}

const editUser = (type, id, passwd, name, phone, figure, address, types, fprice) => {
    let sql = `update ${type} set `
    if (type === 'customer') {
        sql += `passwd='${passwd}', cname='${name}', phone='${phone}', icon=NULL, address='${address}' `
        sql += `where cid='${id}';`
    }
    else if (type === 'vendor') {
        sql += `passwd='${passwd}', vname='${name}', vpicture=NULL, floor_price='${fprice}', types='${types}' `
        sql += `where vid='${id}';`
    }
    else{
        sql += `passwd='${passwd}', rname='${name}', phone='${phone}' `
        sql += `where rid='${id}';`
    }
    return execSql(sql)
}

const deleteUser = (type, id) => {
    let sql = `delete from ${type} `
    if (type === 'customer') {
        sql += `where cid='${id}';`
    }
    else if (type === 'vendor') {
        sql += `where vid='${id}';`
    }
    else{
        sql += `where rid='${id}';`
    }
    return execSql(sql)
}

const login = (type, id, passwd) => {
    let sql = `select * from ${type} `
    if (type === 'customer') {
        sql += `where cid='${id}' and passwd='${passwd}';`
    }
    else if (type === 'vendor') {
        sql += `where vid='${id}' and passwd='${passwd}';`
    }
    else{
        sql += `where rid='${id}' and passwd='${passwd}';`
    }
    return execSql(sql)
}

module.exports = {
    register,
    editUser,
    deleteUser,
    login,
    detail
}