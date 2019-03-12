const positionTpl = require('../views/position.html')
const posModel = require('../models/posModel')

module.exports = {
    async routeCallBack({res, router}) {
        const result = await posModel.getPositionList({})
        result.data.forEach(item => {
            item.createTime = this.timetrans(item.createTime)
        })
        const html = template.render(positionTpl, {data: result.data})
        res.render(html)
        $('#addBtn').on('click', () => {
            router.go('/position_add')
        })
    },

    timetrans(date){  //时间戳转换
        var date = new Date(date);//如果date为13位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
    }
}