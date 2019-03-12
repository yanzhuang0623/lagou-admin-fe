const positionTpl = require('../views/position.html')

module.exports = {
    async routeCallBack({res, router}) {
        const data = await this.getPositionList({})
        console.log(data)
        res.render(positionTpl)
        $('#addBtn').on('click', () => {
            router.go('/position/add')
        })
    },

    getPositionList: (data) => {
        return $.ajax({
            url: '/api/position/list',
            data: data,
            type: 'POST',
            success: (result) => {
            console.log(result.data)
               if(result.ret) {
                  return result.data
               }
            }
        })
    }
}