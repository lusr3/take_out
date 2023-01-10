/**
 * 获取当前时间
 */

const currentTime = () => {
    const date = new Date()

    let year = date.getFullYear()
    let month = createData(date.getMonth() + 1)
    let day = createData(date.getDate())
    let hour = createData(date.getHours())
    let min = createData(date.getMinutes())
    let sec = createData(date.getSeconds())
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}

const createData = (data) => {
    data = '0' + data
    data = data.slice(-2)
    return data
}

module.exports = {
    currentTime
}