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

const register = (type, id, passwd, name, phone, address, fprice) => {
    let sql = `insert into ${type}`
    if (type === 'customer') {
        sql += `(cid, cname, passwd, phone, icon, address)`
        sql += ` values('${id}', '${name}', '${passwd}', '${phone}', NULL, '${address}');`
    }
    else if (type === 'vendor') {
        sql += `(vid, vname, passwd, icon, grade, floor_price)`
        sql += ` values('${id}', '${name}', '${passwd}', NULL, NULL, '${fprice}');`
    }
    else{
        sql += `(rid, rname, passwd, phone, icon)`
        sql += ` values('${id}', '${name}', '${passwd}', '${phone}', NULL);`
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
        sql += `passwd='${passwd}', vname='${name}', icon=NULL, floor_price='${fprice}', types='${types}' `
        sql += `where vid='${id}';`
    }
    else{
        sql += `passwd='${passwd}', rname='${name}', phone='${phone}, icon=NULL' `
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

const findPic = (type, id) => {
    let sql = `select icon from ${type} `
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

const insertPic = (type, id, filepath) => {
    let sql = `update ${type} set `
    if (type === 'customer') {
        sql += `icon = '${filepath}' where cid = '${id}';`
    }
    else if (type === 'vendor') {
        sql += `vpicture ='${filepath}' where vid ='${id}';`
    } else {
        sql += `icon = '${filepath}' where rid = '${id}';`
    }

    return execSql(sql)
}

module.exports = {
    register,
    editUser,
    deleteUser,
    login,
    detail,
    findPic,
    insertPic
}