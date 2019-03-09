const homeTpl = require('../views/home.html')

module.exports = {
    routeCallBack({res}) {
        res.render(homeTpl)
    }
}