const positionAddTpl = require('../views/positionAdd.html')

module.exports = {
    routeCallBack({res, router}) {
        res.render(positionAddTpl)
        $('#backBtn').on('click', () => {
            router.back()
        })

        //上传图片处理 因为file表单被隐藏 所以文件信息需要用jq来处理
        $(".a-upload").on("change","input[type='file']",function(){
            var filePath=$(this).val();
            if(filePath.indexOf("jpg")!=-1 || filePath.indexOf("png")!=-1){
                var arr=filePath.split('\\');
                var fileName=arr[arr.length-1];
                $(".showFileName").html(fileName).css('color', '#000');
            }else{
                $(".showFileName").html("您未上传文件，或者您上传文件类型有误！").css('color', 'red');
                return false 
            }
        })

        $('#submitBtn').on('click', this.submission)
    },

    submission() {
        const companyName = $('#companyName').val(),
              positionName = $('#positionName').val(),
              city = $('#city').val(),
              salary = $('#salary').val(),
              type = $('#type').val(),
              experience = $('#experience').val(),
              degree = $('#degree').val(),
              description = $('#description').val();

        $.ajax({
            url: '/api/position/add',
            type: 'POST',
            data: {
                companyName,
                positionName,
                city,
                salary,
                type,
                experience,
                degree,
                description,
            },
            success:(result) => {
               console.log(result)
            }
        })
    }
}