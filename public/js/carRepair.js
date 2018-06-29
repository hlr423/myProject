$(function () {

    /*=========================弹窗=========================*/

    // 关闭弹窗
    $('.close-popup').on('click',function () {
        console.log(111)
        var $popup = $(this).parents('.popup');
        $('.shade').fadeOut();
        $popup.fadeOut();
    });

    /*=========================其它方法=========================*/

    var describeSubmit = document.querySelector('.describe-submit'); // 故障描述提交
    describeSubmit.addEventListener('click',function () {
        var $textarea = $('.describe textarea');
        if($textarea.val() == ''){
            $textarea.focus();
        }else {
            new CustomPrompt({
                type: 'success',
                msg: '提交成功'
            });
            $textarea.val('');
        }
    });

    var carCard = document.querySelector('.car-card'); // 查看驾驶证
    carCard.addEventListener('click',function () {
        $('.picture-wrapper, .shade').fadeIn();
    });

});

/*=========================其它方法=========================*/
