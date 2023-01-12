/**
 * 骑手sql语句
 */

const { execSql } = require('../exec/execSql')

const listFinshed = (rid) => {
    let sql = `select * from task where rid='${rid}' and status='2' order by createtime desc;`
    return execSql(sql)
}

const listPending = () => {
    let sql = `select * from task where status='0' order by createtime asc;`
    return execSql(sql)
}

// TODO: 未完成+已完成 getUnTask getTask
const getTask = (rid, ttid) => {
    let sql = `update task set rid='${rid}', status='1' where ttid='${ttid}';`
    return execSql(sql)
}

module.exports = {
    listFinshed,
    listPending,
    getTask
}