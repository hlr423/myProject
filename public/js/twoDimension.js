 //   show and hidden ->module
 $(".close-popup").click(function () {
    $(".shade").fadeOut();
    $(".newAdd-wrapper").hide();
})
$(".infor-module").click(function () {
    $(".shade").fadeIn();
    $(".infor-module-show").fadeIn();
});

// 电磁流量计的模态框
$(".infor-module-show-E").click(function () {
    $(".shade").fadeIn();
    $(".infor-module-show-electric").fadeIn();
});
// 电磁流量计的模态框
$(".infor-module-show-s").click(function () {
    $(".shade").fadeIn();
    $(".infor-module-show-sound").fadeIn();
});

  /*============控制开关===========*/
$('#circle1').click(function () {
    console.log("aaaa")
    $(this).css({
        'background': '#50C589',
        'color': 'white',
        'box-shadow': '0px 0px 20px 1px #50C589'
    }).siblings().css({
        'background': 'white',
        'color': '#B0B0B0',
        'box-shadow': '0px 0px 0px 0px #50C589'
    })

});
$('#circle2').click(function () {
    $(this).css({
        'background': '#B0B0B0',
        'color': 'white',
        'box-shadow': '0px 0px 20px 2px #B0B0B0'
    }).siblings().css({
        'background': 'white',
        'color': '#50C589',
        'box-shadow': '0px 0px 0px 0px #B0B0B0'
    })
});

  /*============今日实时数据===========*/
$('.time-data').click(function(){
  alert("今日实时数据跳转页面！")
   
})
