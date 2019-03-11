const positionTpl = require('../views/position.html')

module.exports = {
    routeCallBack({res, router}) {
        res.render(positionTpl)
        $('#addBtn').on('click', () => {
            router.go('/position/add')
        })
    },

    // getPositionList() {
    //     $.ajax({
    //         url: ''
    //     })
    // }
}