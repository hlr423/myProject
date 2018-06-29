var personId = $("#personId").val();
var myChart1;
var myChart2;
var myChart3;
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
    myChart2 = echarts.init(document.getElementById('echart2'));
    myChart3 = echarts.init(document.getElementById('echart3'));
    var option1 = { // 利用率统计
        series: [{
            name: '利用率统计',
            type: 'pie',
            color: ['#35DADD', '#B6A2DE'],
            selectedMode: true,
            radius: '60%',
            center: ['50%', '48%'],
            data: [{
                    name: '利用率',
                    value: 100000,
                    label: {
                        normal: {
                            formatter: '{b}:{d}%'
                        }
                    }
                },
                {
                    name: '备件数',
                    value: 10000,
                    label: {
                        normal: {
                            formatter: '{b}:{c}件'
                        },
                    },
                    // labelLine: {
                    //     normal: {
                    //         show: false
                    //     },
                    // },
                },
            ]
        }]
    };
    var option2 = { // 报废统计
        series: [{
            name: '利用率统计',
            type: 'pie',
            color: ['#B6A2DE', '#35DADD'],
            selectedMode: true,
            radius: '60%',
            center: ['50%', '48%'],
            data: [{
                    name: '报废率',
                    value: 500,
                    label: {
                        normal: {
                            formatter: '{b}:{d}%'
                        }
                    }
                },
                {
                    name: '备件数',
                    value: 10000,
                    label: {
                        normal: {
                            formatter: '{b}:{c}件'
                            // show: false
                        },
                        // emphasis: {
                        //     show: true,
                        //     formatter: '{b}:{c}小时\n{d}%'
                        // }
                    },
                    // labelLine: {
                    //     normal: {
                    //         show: false
                    //     },
                    // },
                },
            ]
        }]
    };
    var option3 = {// 出入统计
        color: ['#4adab9', '#f9c148'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'right',
            padding: [20, 10, 0, 0], // [5, 10, 15, 20]
            data: ['出库', '入库'],


        },
        calculable: true,
        xAxis: [{
            type: 'category',
            name: '月',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisLabel: {
                interval: 0, //显示所有的标签，不要这是显示奇数对应的标签
                // rotate:-10  //倾斜度的设置
            }
        }],
        yAxis: [{
            type: 'value',
            name: '单位（次）',
            max: 100,
            splitNumber: 3,
            min: 30,
            // axisLabel : {
            //     // formatter: function(){
            //     //       return "";
            //     // }
            // }



        }],
        series: [{
                name: '出库',
                type: 'bar',
                data: [40, 35, 60, 55, 50, 70, 55, 43, 80, 88, 83, 95],

            },
            {
                name: '入库',
                type: 'bar',
                data: [37, 49, 55, 43, 49, 63, 45, 39, 76, 79, 60, 85],

            },
            // {
            //     // data:[30,60,100],
            // }

        ],

    };

    myChart1.setOption(option1);
    myChart2.setOption(option2);
    myChart3.setOption(option3);

    /*=========================弹窗=========================*/
    // 关闭弹窗
    $('.close-icon').on('click', function () {
        var $popup = $(this).parents('.popup');
        $('.shade').fadeOut();
        $popup.fadeOut();
    });
    /*====================选择年/季度/月====================*/
    $('.data').on('change', function () {
        var content = $(this).parents('.title');
        var thisValue = this.value;
        content.find('select:not(:nth-of-type(1))').removeClass('data-show');
        content.find('.data-year').removeClass('data-show');
        content.find('.data-month').removeClass('data-show');
        (thisValue == 0) && content.find('.data-year').addClass('data-show');
        (thisValue == 1) && content.find('.data-quarter').addClass('data-show');
        (thisValue == 2) && content.find('.data-month').addClass('data-show');
    });
})

/*======================备件统计搜索按钮=============================*/
// 判断
$(".order-btn").click(function () {
    var content = $(this).parents('.title');
    var valstate = $(".part-factory").val() //备件选择value
    var state = $(".data").val() // 0:年 1:季度 2:月
    var inputv = $(".input-search").val() //模糊查询value
    var dataYear = $(".data-year"); //date选择的value
    var number=$(".time-all").html();  //获取页面上的time-all的值
    var tempValue;  //临时变量

    console.log(state)
    console.log("input:" + inputv)

    if (state == 0) {//年
        var tempValue = dataYear.val()
        if (tempValue == '' || tempValue == 'undefind') { 
            new CustomPrompt({
                type: 'default',
                msg: '请选择日期!!'
            });
        } else if (tempValue == '2017') {   //测试数据，发ajax请求
            var arr1 = [ // 利用率模拟数据
                {
                    name: '利用率',
                    value: '100000',
                    label: {
                        normal: {
                            formatter: '{b}:{d}%'
                        }
                    }
                },
                {
                    name: '备件数',
                    value: '50000',
                    label: {
                        normal: {
                            formatter: '{b}:{c}件'
                        }
                    }
                }
            ];
            var arr2 = [ // 报废模拟数据
                {
                    name: '利用率',
                    value: '100000',
                    label: {
                        normal: {
                            formatter: '{b}:{d}%'
                        }
                    }
                },
                {
                    name: '备件数',
                    value: '50000',
                    label: {
                        normal: {
                            formatter: '{b}:{c}件'
                        }
                    }
                }
            ];

            var arr3 = [ // 出入模拟数据
                50, 40, 90, 44, 60, 88, 99, 66, 44, 33, 76, 99
            ];
            myChart1.setOption({
                series: {
                    data: arr1
                }
            });
            myChart2.setOption({
                series: {
                    data: arr2
                }
            });
            myChart3.setOption({
                series: [{
                        data: arr3
                    },
                    {
                        data: arr3
                    }
                ]
            });
        }

    }

})