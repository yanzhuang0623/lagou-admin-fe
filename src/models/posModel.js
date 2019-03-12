module.exports = {
    getPositionList: (data) => {
        return $.ajax({
            url: '/api/position/list',
            data: data,
            type: 'POST',
        })
    }
}