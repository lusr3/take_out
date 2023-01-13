/**
 * 骑手sql语句
 */

const { execSql } = require('../exec/execSql')

const getUnTask = (rid) => {
    let sql = 'select cname, createtime, ttid, address, dname from task T natural join history H natural join dish D natural join customer C '
    sql += `where T.status<>2 order by createtime desc;`
    return execSql(sql)
}

const getFiTask = (rid) => {
    let sql = 'select cname, createtime, ttid, address, dname from task T natural join history H natural join dish D natural join customer C '
    sql += `where T.rid='${rid}' and T.status=2 order by createtime desc;`
    return execSql(sql)
}

const getTask = (rid, ttid) => {
    let sql = `update task set rid='${rid}', status='1' where ttid='${ttid}';`
    return execSql(sql)
}

module.exports = {
    getUnTask,
    getFiTask,
    getTask
}