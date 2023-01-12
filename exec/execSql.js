/**
 * 数据库连接
 */

const { client } = require('../config/db')

client.connect()

client.on('error', () => {
    console.log('数据库连接已断开，重新保存文件重启')
})

const execSql = (sql) => {
    // promise的作用？
    const promise = new Promise((resolve, reject) => {
        client.query(sql, (err, data) => {
            console.log(sql)
            if (err) {
                reject(err)
                return promise
            }
            // console.log(data)
            resolve(data)
        })
    })

    return promise
}

module.exports = {
    execSql
}