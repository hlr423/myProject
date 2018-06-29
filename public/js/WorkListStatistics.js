var myChart1;
var workListTyle;
$(function () {
    /*====================初始化+变量声明====================*/
    // 初始化时间插件
    for (var i = 0; i < 1; i++) {
        var $year = $('.data-year');
        laydate.render({ // 初始化年份选择
            elem: $year[i],
            theme: 'date', //color
            type: 'year',
            format: 'yyyy',
            // showBottom: false,
            value: '2018', //默认值的设置
            done: function (value, date, endDate) { //回调返回三个参数
                // $('.data').val(value);
            }
        });
    }
    for (var i = 0; i < 1; i++) {
        var $year = $('.data-year1');
        laydate.render({ // 初始化年份选择
            elem: $year[i],
            theme: 'date', //color
            type: 'year',
            format: 'yyyy',
            // showBottom: false,
            value: '2018', //默认值的设置
            done: function (value, date, endDate) { //回调返回三个参数
                // $('.data').val(value);
            }
        });
    }
    for (var j = 0; j < 1; j++) {
        var $month = $('.data-month');
        laydate.render({ // 初始化月份选择
            elem: $month[j],
            theme: 'date',
            type: 'month',
            format: 'yyyy-MM',
            done: function (value, date, endDate) {
                // $('.data').val(value);
            }
        });
    }
    /*====================echart====================*/
    myChart1 = echarts.init(document.getElementById('echart1'));
    workListTyle = echarts.init(document.getElementById('echarts-wrapper-oilFee')); // 油费统计
    var option1 = { // 利用率统计
        series: [{
            name: '工单数统计',
            type: 'pie',
            color: ['#B6A2DE', '#35DADD'],
            selectedMode: true,
            radius: '65%',
            center: ['50%', '48%'],
            data: [{
                    name: '未完成',
                    value: 10000,
                    label: {
                        normal: {
                            formatter: '{b}:{d}%'
                        }
                    }
                },
                {
                    name: '已完成',
                    value: 100000,
                    label: {
                        normal: {
                            formatter: '{b}:{c}件'
                        },
                    },
                },
            ]
        }]
    };
    // 工单分类统计
    var workListTyleParam = {
        tooltip: {
            trigger: 'item',
            formapieCostser: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
        },
        series: [{
            name: '油费统计',
            type: 'pie',
            radius: ['0%', '65%'],
            avoidLabelOverlap: false,
            color: ['#42c0c2', '#fac34a', '#9f85e3', '#42b4df'],
            label: {
                normal: {
                    show: false,
                    position: 'left'
                },

            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [{
                    value: 4385,
                    name: '移动脱水库'
                },
                {
                    value: 21136,
                    name: '运渣车'
                },
                {
                    value: 31834,
                    name: '吸污车'
                },
                {
                    value: 51345,
                    name: '通勤车'
                },
            ]
        }]
    };

    // ====================调用echarts========================//
    myChart1.setOption(option1);
    workListTyle.setOption(workListTyleParam);
    
    /*====================选择年/季度/月====================*/
    $('.data').on('change', function () {
        var content = $(this).parents('.title');
        var thisValue = this.value;
        content.find('select:not(:nth-of-type(1))').removeClass('data-show');
        content.find('.data-year').removeClass('data-show');
        content.find('.data-month').removeClass('data-show');
        (thisValue == 0) && content.find('.data-year').addClass('data-show');
        (thisValue == 0) && content.find('.data-year1').removeClass('data-show'); //当显示季度是需要选择的年
        (thisValue == 1) && content.find('.data-quarter').addClass('data-show');
        (thisValue == 1) && content.find('.data-year1').addClass('data-show');
        (thisValue == 2) && content.find('.data-month').addClass('data-show');
        (thisValue == 2) && content.find('.data-year1').removeClass('data-show');
    });
})
// =======================工单数统计和工单分类统计方法===========================//

//  aa是一个工单的一个数据改变的方法，
// 有三个参数：
//1、inCompleted为未完成数据,2、completed 为已完成的数据 , 3、workLT为工单分类数据

function aa(inCompleted,completed,workLT ){
   
    // 累加
     var total = workLT.reduce(function(first, second) {   //reduce(从左到右累加)--es6
         return first + second; 
    }, 0);
    // 改变工单1类到4类的值
    var workListAll=parseInt(inCompleted)+parseInt(completed);  //工单总数
    var workList=$('.work-time-text');
    $('.time-all')[0].innerText=''+workListAll+'';
    $('.time-all')[1].innerText=''+completed+'';
    $('.time-all')[2].innerText=''+inCompleted+'';

    workList[0].getElementsByTagName('p')[1].getElementsByTagName('span')[0].innerText=''+total+'' //1
    workList[0].getElementsByTagName('p')[2].getElementsByTagName('span')[0].innerText=''+workLT[0]+''  //2
    workList[0].getElementsByTagName('p')[3].getElementsByTagName('span')[0].innerText=''+workLT[1]+''  //3
    workList[0].getElementsByTagName('p')[4].getElementsByTagName('span')[0].innerText=''+workLT[2]+''  //4
    workList[0].getElementsByTagName('p')[5].getElementsByTagName('span')[0].innerText =''+workLT[3]+'' //5

    var arr1 = [ //工单数统计格式
        {
            name: '未完成',
            value: ''+inCompleted+'',
            label: {
                normal: {
                    formatter: '{b}:{d}%'
                }
            }
        },
        {
            name: '已完成',
            value: ''+completed+'',
            label: {
                normal: {
                    formatter: '{b}:{c}件'
                }
            }
        }
    ];
    // 工单数统计
    myChart1.setOption({
        series: {
            data: arr1
        }
    });
    // 工单分类统计
    workListTyle.setOption({
        series: {
            data: workLT
        }
    });
}

/*======================工单统计日期选择=============================*/
// 判断
$(".order-btn").click(function () {
    var content = $(this).parents('.title');
    var state = $(".data").val() // 0:年 1:季度 2:月
    var dataYear = $(".data-year"); //date中的年选择的value
    var dataMonth = $(".data-month"); //date中的月选择的value
    var number = $(".time-all").html(); //获取页面上的time-all的值
    var tempValue; //临时变量
    // console.log(state)

    if (state == 0) { //年
        var tempValue = dataYear.val()
        if (tempValue == '' || tempValue == 'undefind') {
            new CustomPrompt({
                type: 'default',
                msg: '请选择日期!!'
            });
        } else { 
           // 请求数据--测试数据
           inCompleted='500';
           completed='99500';
           workLT=[23222, 23423, 14422, 42455];
           aa(inCompleted,completed,workLT)
        }

    } else if (state == 1) { //季度
            // 请求数据--测试数据
            inCompleted='111';
            completed='2899';
            workLT=[2222, 2323, 4422, 4455];
            aa(inCompleted,completed,workLT)

    } else { //月

        var tempValue = dataMonth.val()
        console.log(tempValue)
        if (tempValue == '' || tempValue == 'undefind') {
            new CustomPrompt({
                type: 'default',
                msg: '请选择月!!'
            });
        } else { 
            // 请求数据--测试数据
           inCompleted='500';
           completed='99500';
           workLT=[23222, 23423, 14422, 42455];
           aa(inCompleted,completed,workLT)
        }
    }

})