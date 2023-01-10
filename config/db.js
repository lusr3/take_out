/**
 * 数据库配置，redis配置
 */

const env = process.env.NODE_ENV
const {Client} = require('pg')


let REDIS_CONF
let client

if (env === 'dev') {
    client = new Client({
        host: '172.18.198.208',
        port: '15432',
        database: 'take_out',
        user: 'jonas',
        password: '1234@abc'
    })
    REDIS_CONF = {
        host: '127.0.0.1',
        port: '6379'
    }
}

if (env === 'production') {
    client = new Client({
        host: '172.18.198.208',
        port: '15432',
        database: 'take_out',
        user: 'jonas',
        password: '1234@abc'
    })
    REDIS_CONF = {
        host: '127.0.0.1',
        port: '6379'
    }
}

module.exports = {
    REDIS_CONF,
    client
}