// 全局变量
var earlyWarning;
var giveAlarm;
var afterfault;
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
    //故障原因类型  下面三个是一组
    earlyWarning = echarts.init(document.getElementById('echarts-wrapper-earlyWarning'));
    giveAlarm = echarts.init(document.getElementById('echarts-wrapper-giveAlarm'));
    afterfault = echarts.init(document.getElementById('echarts-wrapper-fault'));
    // 故障原因类型 预警、告警、故障总数统计
    var earlyWarningParam = {
        series: [
            {
            type: 'liquidFill',
            name: '41650',
            data: [{
                name: '预警信息总计',
                value: 0.6
            }, 0.5, 0.4, 0.3],
            color: ['#f33e40', '#f05657', '#ee7374', '#f48f8f'],
            radius: '80%', // 调整大小
            itemStyle: {
                normal: {
                    shadowBlur: 0
                }
            },
            outline: {
                borderDistance: 0,
                itemStyle: {
                    borderWidth: 5,
                    borderColor: '#f33e40',
                    shadowBlur: 20,
                    shadowColor: 'rgba(157, 257, 250, 0.8)'
                }
            },
            label: {
                normal: {
                    // formatter: '\n\n{a}\n\n{b}',
                    formatter: function (param) {
                        return '\n\n' + param.seriesName + '\n\n' +
                            param.name + '\n'

                    },
                    textStyle: {
                        fontSize: 16,
                    }
                }
            }
        }]
    };
    var giveAlarmParam = {
        series: [{
            type: 'liquidFill',
            name: '1252',
            data: [{
                name: '告警信息总计',
                value: 0.6
            }, 0.5, 0.4, 0.3],
            color: ['#fad52a', '#f9d842', '#f8e072', '#faecac'],

            radius: '80%', // 调整大小
            itemStyle: {
                normal: {
                    shadowBlur: 0
                }
            },
            outline: {
                borderDistance: 0,
                itemStyle: {
                    borderWidth: 5,
                    borderColor: '#fad52a',
                    shadowBlur: 20,
                    shadowColor: 'rgba(157, 257, 250, 0.8)'
                }
            },
            label: {
                normal: {
                    formatter: '\n\n{a}\n\n{b}',
                    textStyle: {
                        fontSize: 16,
                        // fontWeight: 300
                    }
                }
            }
        }]
    };
    var faultParam = {
        series: [{
            type: 'liquidFill',
            name: '52',
            data: [{
                name: '故障信息总计',
                value: 0.6
            }, 0.5, 0.4, 0.3],
            color: ['#fe7a1d', '#fc9146', '#f8a367', '#fabf95'],
            radius: '80%', // 调整大小
            itemStyle: {
                normal: {
                    shadowBlur: 0
                }
            },
            outline: {
                borderDistance: 0,
                itemStyle: {
                    borderWidth: 5,
                    borderColor: '#fe7a1d',
                    shadowBlur: 20,
                    shadowColor: 'rgba(157, 257, 250, 0.8)'
                }
            },
            label: {
                normal: {
                    formatter: '\n\n{a}\n\n{b}',
                    textStyle: {
                        fontSize: 16,
                        // fontWeight: 300
                    }
                }
            }
        }]
    };
    // ======================调用图表========================//
    // 故障原因类型
    earlyWarning.setOption(earlyWarningParam);
    giveAlarm.setOption(giveAlarmParam);
    afterfault.setOption(faultParam);

    /*====================选择年/季度/月====================*/
    $('.data').on('change', function () {
        var content = $(this).parents('.title');
        var thisValue = this.value;
        content.find('select:not(:nth-of-type(1))').removeClass('data-show');
        content.find('.data-year').removeClass('data-show');
        content.find('.data-month').removeClass('data-show');
        (thisValue == 0) && content.find('.data-year').addClass('data-show');
        (thisValue == 0) && content.find('.data-year1').removeClass('data-show');
        (thisValue == 1) && content.find('.data-quarter').addClass('data-show');
        (thisValue == 1) && content.find('.data-year1').addClass('data-show'); //季度对应的年的选择
        (thisValue == 2) && content.find('.data-month').addClass('data-show');
        (thisValue == 2) && content.find('.data-year1').addClass('data-show');
    });
})



// ===============

/*======================厂站统计搜索按钮=============================*/
// 判断
var timeBtn = document.querySelector('.order-btn'); //监听事件。
timeBtn.addEventListener('click', function () {
    var content = $(this).parents('.title');
    var contentParents = $(this).parents('.body-wrapper'); // 容器的根
    var valstate = $(".part-factory").val() //备件选择value值
    var state = $(".data").val() // 0:年 1:季度 2:月
    var inputvalue = $(".input-search").val() //模糊查询value值
    var dataYear = $(".data-year"); //date选择的value值
    var dataYearquarter = $(".data-year1"); //季度对应的date选择的value值
    var quarter = $(".data-quarter"); // 0: 春季 1:夏季 2:秋季  3:冬季
    var dataMonth = $(".data-month "); //月选择的value值
    var stationState = $(".stationValue").val(); //厂站选择的value  0:全部厂站  其余值是单个厂站
    var number = $(".time-all").html(); //获取页面上的time-all的值
    var dataX; // 年/季度/月  X轴
    var tempValue; //临时变量

    // 区域
    // var address="天翔";
    var address = "1";
    if (address != "天翔") { //这里要用combotree的方式来实现
        let content = $(this).parents('.search-nav');
        content.find('#select-area').addClass('data-hidden');
        content.find('#select-area')
    }

    // ===============================================
//     var dd=earlyWarning.getOption()
//    dd.series[0].name="222";
//     earlyWarning.setOption(dd);

    /*==========================厂站选择判断=====================*/
    // 为全部厂站时，图表的显示方法
    if (stationState == '0') {
        console.log("厂站" + stationState)
        // 年、季度、月
        if (state == '0') { //年
            tempValue = dataYear.val()
            console.log(tempValue)
            if (tempValue == '' || tempValue == 'undefind') {
                new CustomPrompt({
                    type: 'default',
                    msg: '请选择年!!'
                });
            } else { // 改变数据
                // 定义月


                // ============================
            }
        }
        if (state == '1') { //季度
            console.log('1:' + quarter.val()) //select对应的value的值
            console.log('2:' + dataYearquarter.val()) //季度对应的年的值
            tempValue = quarter.val();
            // var arr1 = [99, 66, 88]; // 模拟数据
            var arr2a = [12, 6, 11]; // 模拟数据
            var arr2b = [8, 6, 7]; // 模拟数据
            var arr2c = [9, 8, 11]; // 模拟数据
            var arr2d = [2, 6, 11]; // 模拟数据

            (tempValue == 0) && (dataX = ['1', '2', '3']);
            (tempValue == 1) && (dataX = ['4', '5', '6']);
            (tempValue == 2) && (dataX = ['7', '8', '9']);
            (tempValue == 3) && (dataX = ['10', '11', '12']);


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
                // ==================

                // ===============

            }
        }
    } else if (stationState != '0') { // 选择单个厂站，
        // 模糊查询获取某个厂站input框中的搜索值
        console.log(inputvalue)

        if (state == '0') { //年
            tempValue = dataYear.val()
            console.log(tempValue)
            if (tempValue == '' || tempValue == 'undefind') {
                new CustomPrompt({
                    type: 'default',
                    msg: '请选择年!!'
                });
            } else {

                // ==========================

            }

        }
        if (state == '1') { //季度

            tempValue = quarter.val();
            // var arr1 = [99, 66, 88]; // 模拟数据
            // var arr2a = [12, 6, 11]; // 模拟数据
            // var arr2b = [8, 6, 7]; // 模拟数据
            // var arr2c = [9, 8, 11]; // 模拟数据
            // var arr2d = [2, 6, 11]; // 模拟数据
            (tempValue == 0) && (dataX = ['1', '2', '3']);
            (tempValue == 1) && (dataX = ['4', '5', '6']);
            (tempValue == 2) && (dataX = ['7', '8', '9']);
            (tempValue == 3) && (dataX = ['10', '11', '12']);
            console.log("hlr")


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

                // ==============================
                console.log("hlr2")

            }
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
// ===========兼容性======================？？？？？？
window.onresize = function () {
    location.reload();
}