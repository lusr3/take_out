/**
 * 数据构造
 */

class Base {
    constructor (data, apiTitle) {
        this.data = data
        this.apiTitle = apiTitle
    }
}

class SuccessModel extends Base {
    constructor (data, apiTitle) {
        super(data, apiTitle)
        this.errno = 0
    }
}

class ErrorModel extends Base {
    constructor (data, apiTitle) {
        super(data, apiTitle)
        this.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}