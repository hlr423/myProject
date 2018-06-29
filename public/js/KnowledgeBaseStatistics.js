var myChart1;
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
    var option1 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },

        legend: {
            right: '4%',
            top: '40',
            itemWidth: 8,
            itemHeight: 15,
            data: ['累计文章数', '累计评论数', '累计浏览数']
        },
        grid: {
            top: '35%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            name: '月',
            axisLine: {
                lineStyle: {
                    color: '#000'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },

            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    color: '#999'
                }
            },
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        }],
        yAxis: [{
            type: 'value',
            name: '次数',
            min: '0',
            max: '100',
            nameTextStyle: {
                color: '#666'
            },
            axisLine: {
                lineStyle: {
                    color: '#CEE1FC',

                }
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    color: '#999'
                },
            },
            splitLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#ccc',
                    opacity: '0.2'
                }
            },
        }],
        series: [{
                name: '累计文章数',
                type: 'bar',
                barWidth: '15%', //柱图宽度
                itemStyle: {
                    normal: {
                        color: '#508ee0',
                        barBorderRadius: [5, 5, 0, 0],
                    },
                },
                data: [23, 79, 64, 59, 37, 20, 27, 28, 35, 85, 24, 94]
            },
            {
                name: '累计评论数',
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    normal: {
                        color: '#fcc84f',
                        barBorderRadius: [5, 5, 0, 0],
                    },
                },

                data: [10, 14, 19, 12, 21, 18, 98, 56, 13, 49, 30, 21]
            },
            {
                name: '累计浏览数',
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    normal: {
                        color: '#e17ab2',
                        barBorderRadius: [5, 5, 0, 0],
                    },
                },

                data: [78, 57, 99, 34, 23, 81, 73, 21, 32, 72, 30, 70]
            }
        ]
    };

    // ====================调用echarts========================//
    myChart1.setOption(option1);

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
// =======================累计文章数、评论数、浏览数据统计===========================

//  knowledgeFun是数据改变的方法，
// 有三个参数：
//1、knowDate为时间单位表示,2、arr1 为累计即文章数 , 3、arr2为累计评论数  4、arr3 为累计浏览数  5、DatetypeSent 时间类型

function knowledgeFun(DateCompany, DatetypeSent, arr1, arr2, arr3) {
    var DatetypeEnd;
    if (DatetypeSent.lenght == 0 || DatetypeSent === undefined) {
        DatetypeEnd = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    } else {
        DatetypeEnd = DatetypeSent
    }

    myChart1.setOption({
        xAxis: [{
            name: DateCompany,
            data: DatetypeEnd
        }],
        series: [{
            data: arr1
        }, {
            data: arr2
        }, {
            data: arr2
        }]
    });
}

/*======================日期选择=============================*/
// 判断
$(".order-btn").click(function () {
    var content = $(this).parents('.title');
    var state = $(".data").val() // 0:年 1:季度 2:月
    var dataYear = $(".data-year"); //date中的年选择的value
    var dataMonth = $(".data-month"); //date中的月选择的value
    var quarter = $(".data-quarter"); // 0: 春季 1:夏季 2:秋季  3:冬季
    var number = $(".time-all").html(); //获取页面上的time-all的值
    var dataX; //时间的临时变量
    var tempValue; //状态的临时变量
    console.log(state)
    // console.log(quarter.val())

    if (state == 0) { //年
        var tempValue = dataYear.val()
        if (tempValue == '' || tempValue == 'undefind') {
            new CustomPrompt({
                type: 'default',
                msg: '请选择日期!!'
            });
        } else {
            // 请求数据--测试数据
            var knowDate = '月';
            var DataType = [];
            var arr1 = [8, 17, 91, 24, 43, 61, 23, 71, 32, 72, 90, 40]
            var arr2 = [7, 5, 29, 34, 23, 41, 23, 27, 12, 92, 30, 50]
            var arr3 = [8, 5, 9, 14, 22, 41, 53, 61, 42, 22, 10, 60]
            knowledgeFun(knowDate, DataType, arr1, arr2, arr3)
        }

    } else if (state == 1) { //季度
        var tempValue = quarter.val()
        var knowDate = '季度'
        // 模拟数据
        var arr1 = [8, 17, 91];
        var arr2 = [92, 30, 50];
        var arr3 = [22, 41, 53];
        // 季度
        (tempValue == 0) && (dataX = ['1', '2', '3']);
        (tempValue == 1) && (dataX = ['4', '5', '6']);
        (tempValue == 2) && (dataX = ['7', '8', '9']);
        (tempValue == 3) && (dataX = ['10', '11', '12']);
        console.log(dataX)

        // 请求数据--测试数据
        knowledgeFun(knowDate, dataX, arr1, arr2, arr3)

    } else { //月

        var tempValue = dataMonth.val()
        console.log(tempValue)
        if (tempValue == '' || tempValue == 'undefind') {
            new CustomPrompt({
                type: 'default',
                msg: '请选择月!!'
            });
        } else {
            var year = tempValue.split('-')[0];
            var month = tempValue.split('-')[1];
            dataX = getDaysInMonth(year, month);
            // 请求数据--测试数据
            // 请求数据--测试数据
            var knowDate = '日'
            var arr1 = [23, 71, 32, 72, 90, 40,8, 17, 91, 24, 43, 61, 23, 71, 32, 72, 90, 40,8, 17, 91, 24, 43, 61, 23, 71, 32, 72, 90, 40,22]
            var arr2 = [23, 71, 32, 24, 43, 61, 23, 71, 32, 72, 90, 40,8, 17, 91, 24, 43, 61, 23, 71, 32, 72, 90, 40,72, 90, 40,8, 17, 91,33]
            var arr3 = [8, 17, 91, 24, 43, 61, 23, 71, 32, 72, 90, 40,8, 17, 91, 24, 43, 61, 23, 71, 32, 72, 90, 40,23, 71, 32, 72, 90, 40,44]
            knowledgeFun(knowDate,dataX,arr1, arr2, arr3)

        }
    }

})
// 获取具体月份天数
function getDaysInMonth(year, month) {
    var dataArr = [];
    month = parseInt(month, 10); //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
    var temp = new Date(year, month, 0);

    var data = temp.getDate();

    for (var i = 0; i < data; i++) {
        dataArr.push(i + 1);
    }
    return dataArr;
}