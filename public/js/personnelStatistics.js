// var personId = $("#personId").val();
var myChart2;
var myChart1;
$(function () {
    /*====================初始化+变量声明====================*/
    // 初始化时间插件
    for (var i = 0; i < 3; i++) {
        var $year = $('.data-year');
        laydate.render({ // 初始化年份选择
            elem: $year[i],
            theme: 'date',
            type: 'year',
            format: 'yyyy',
            value: '2018',
            // showBottom: false,
            done: function (value, date, endDate) {
                // $('.data').val(value);
            }
        });
    }
    for (var j = 0; j < 3; j++) {
        var $month = $('.data-month');
        laydate.render({ // 初始化月份选择
            elem: $month[j],
            theme: 'date',
            type: 'month',
            format: 'yyyy-MM',
            // showBottom: false,
            done: function (value, date, endDate) {
                // $('.data').val(value);
            }
        });
    }

    /*====================echart====================*/
    myChart1 = echarts.init(document.getElementById('echart1'));
    myChart2 = echarts.init(document.getElementById('echart2'));
    var option1 = { // 工时统计
        series: [{
            name: '工时统计',
            type: 'pie',
            color: ['#35DADD', '#B6A2DE'],
            selectedMode: true,
            radius: '70%',
            center: ['50%', '48%'],
            data: [{
                    name: '在岗时间',
                    value: 1936,
                    label: {
                        normal: {
                            formatter: '{b}:{c}小时\n{d}%'
                        }
                    }
                },
                {
                    name: '请假时间',
                    value: 100,
                    label: {
                        normal: {
                            formatter: '{b}:{c}小时\n{d}%'
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
    var option2 = { // 效率统计
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#333'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14,
                    color: '#999'
                }
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }],
        yAxis: [{
            type: 'value',
            name: '%',
            nameTextStyle: {
                color: '#666'
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#CEE1FC'
                }
            },
            axisLabel: {
                margin: 10,
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
            name: '效率统计',
            type: 'line',
            symbol: 'circle',
            symbolSize: 1,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 1,
                    opacity: 0.5,
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 136, 212, 0.2)'
                    }, {
                        offset: 1,
                        color: 'rgba(0, 136, 212, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(0,136,212)',
                    borderColor: 'rgba(0,136,212,0.2)',
                    borderWidth: 12

                }
            },
            data: [50, 20, 90, 13, 60, 88, 99, 66, 44, 33, 22, 99]
        }, ]
    };
    myChart1.setOption(option1);
    myChart2.setOption(option2);
    /*===================部门/人员检索=====================*/
    $('.orderSearch-btn').click(function () {
        var valstate = $(".part-factory") //备件选择value
        // var tempValue;

        console.log(valstate[0].value)
        console.log(valstate[1].value)
        if (valstate[0].value == '0') { //部门检索
            new CustomPrompt({
                type: 'default',
                msg: '请选择部门!!'
            });
        } else {

        }
        if (valstate[1].value == 0) { //人员检索
            new CustomPrompt({
                type: 'default',
                msg: '请选择人员!!'
            });
        } else {

        }

    })



    /*====================选择年/季度/月====================*/
    $('.data').on('change', function () {
        var $content = $(this).parents('.title');
        var thisValue = this.value;
        $content.find('select:not(:nth-of-type(1))').removeClass('data-show');
        $content.find('.data-year').removeClass('data-show');
        $content.find('.data-month').removeClass('data-show');
        (thisValue == 0) && $content.find('.data-year').addClass('data-show');
        (thisValue == 1) && $content.find('.data-quarter').addClass('data-show');
        (thisValue == 2) && $content.find('.data-month').addClass('data-show');


    });
})


var dataYear = $('.data-year');
/*====================工时统计搜索按钮====================*/
var timeBtn = document.querySelector('.time-btn');
timeBtn.addEventListener('click', function () {
    var content = $(this).parents('.title');
    var dataYear = content.find('.data-year');
    var dataMonth = content.find('.data-month');
    var state = content.find('.data').val(); // 0:年 1:季度 2:月
    var dataMonth = $('.data-month');
    var tempValue;
    console.log(state)
    if (state == '0') { //年
        tempValue = dataYear.val()
        console.log(tempValue)
        if (tempValue == '' || tempValue == 'undefind') {
            new CustomPrompt({
                type: 'default',
                msg: '请选择年!!'
            });
        } else {
            // 改变数据
        }
    }
    if (state == '1') { //季度
            // 改变数据
    }
    if (state == '2') { //月
        tempValue = dataMonth.val()
        if (tempValue == '' || tempValue == 'undefind') {
            new CustomPrompt({
                type: 'default',
                msg: '请选择月!!'
            });
        } else {
            // 改变数据
        }
    }
})

/*====================工单统计搜索按钮====================*/
var orderBtn = document.querySelector('.order-btn');
orderBtn.addEventListener('click', function () {

    var content = $(this).parents('.title');
    var dataYear = content.find('.data-year');
    var dataMonth = content.find('.data-month');
    var state = content.find('.data').val(); // 0:年 1:季度 2:月
    var tempValue; //临时变量
    console.log(typeof state)
    if (state == '0') { //年
        tempValue = dataYear.val()
        console.log(tempValue)
        if (tempValue == '' || tempValue == 'undefind') {
            new CustomPrompt({
                type: 'default',
                msg: '请选择年!!'
            });
        } else if (tempValue != '2018') { //不等于默认年
            // 改变数据
            var arr1 = ['1111', '2222', '3333']
            $('.order-num').html(arr1[0])
            $('.task-num').html(arr1[1])
            $('.task-efficiency').html(arr1[2])
            // 改变数据
        }
    }
    if (state == '1') { //季度
        // 请求数据
        var arr1 = ['1111', '2222', '3333']
        $('.order-num').html(arr1[0])
        $('.task-num').html(arr1[1])
        $('.task-efficiency').html(arr1[2])
        // 改变数据
    }
    if (state == '2') { //月
        tempValue = dataMonth.val()
        console.log(tempValue)
        if (tempValue == '' || tempValue == 'undefind') {
            new CustomPrompt({
                type: 'default',
                msg: '请选择月!!'
            });
        } else {
            var arr1 = ['1111', '2222', '3333']
            $('.order-num').html(arr1[0])
            $('.task-num').html(arr1[1])
            $('.task-efficiency').html(arr1[2])
            // 改变数据
        }
    }
})
/*====================效率统计搜索按钮====================*/
var timeBtn = document.querySelector('.efficiency-btn'); // 效率统计按钮
timeBtn.addEventListener('click', function () {

    var content = $(this).parents('.title');
    var quarter = content.find('.data-quarter');
    var dataYear = content.find('.data-year');
    var dataMonth = content.find('.data-month');
    var state = content.find('.data').val(); // 0:年 1:季度 2:月
    var dataX; // 年/季度/月  X轴
    var tempValue; //临时变量
    console.log(typeof state)
    if (state == '0') { //年
        tempValue = dataYear.val()
        console.log(tempValue)
        if (tempValue == '' || tempValue == 'undefind') {
            new CustomPrompt({
                type: 'default',
                msg: '请选择年!!'
            });
        } else {
            // 改变数据
        }
    }
    if (state == '1') { //季度
        tempValue = quarter.val();
        var arr1 = [99, 66, 88]; // 模拟数据
        (tempValue == 0) && (dataX = ['1月', '2月', '3月']);
        (tempValue == 1) && (dataX = ['4月', '5月', '6月']);
        (tempValue == 2) && (dataX = ['7月', '8月', '9月']);
        (tempValue == 3) && (dataX = ['10月', '11月', '12月']);

        myChart2.setOption({
            xAxis: [{
                data: dataX
            }],
            series: {
                data: arr1
            }
        });
    }
    if (state == '2') { //月
        tempValue = dataMonth.val()
        console.log(tempValue)
        if (tempValue == '' || tempValue == 'undefind') {
            new CustomPrompt({
                type: 'default',
                msg: '请选择月!!'
            });
        } else {
            var arr1 = [99, 66, 88, 22, 11, 44, 55, 77, 88, 99, 0, 11, 22, 33, 44]; // 模拟数据
            var year = tempValue.split('-')[0];
            var month = tempValue.split('-')[1];
            dataX = getDaysInMonth(year, month);
            myChart2.setOption({
                xAxis: [{
                    data: dataX
                }],
                series: {
                    data: arr1
                }
            });

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
        dataArr.push(i + 1 + '日');
    }
    return dataArr;
}
