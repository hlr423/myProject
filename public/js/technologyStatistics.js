// 全局变量
var earlyWarning;
var giveAlarm;
var afterfault;
var echartWrapper = $('#echartWrapper'); //图表容器
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


// ======================================添加数据================
var addBtn = document.getElementsByClassName('add-btn')[0];
addBtn.addEventListener('click', function () {
    var content = '';
    content += '<div class="item">';
    content += '<a class="check-all-wrapper"><i class="check-box"></i><input type="checkbox" name="" value="no" class="check-all"><label for="btn-checkbox">数据1</label></a>';
    content += '<select name="" id="" class="chose-place"><option value="0">请选择位置</option></select>';
    content += '<select name="" id="" class="chose-eq"><option value="0">请选择位置</option><option value="1">111</option></select>';
    content += '<div class="delete-btn"><i></i>删除</div>';
    content += '</div>';

    var num = getItemNum();
    if (num > 5) {
        return
    }
    $(this).before(content)
    ProhibitionOfOperation()
})
// ======================================删除数据================
$('.add-data').on('click', '.delete-btn', function () {
    var num = getItemNum();
    console.log("del:" + num)
    if (num == 1) {
        return
    }
    $(this).parent().remove();
    ProhibitionOfOperation()
})
// ===========================得到选中的item的数量=================
function getItemNum() {
    var itemNum = $('.item')

    return itemNum.length;
}

function getItemChoseNum() {
    var itemNum = $('.item')
    var num = [];
    for (let j = 0; j < itemNum.length; j++) {
        var dd = itemNum[j].getElementsByTagName('input')[0].value
        if (dd == 'yes') {
            num.push(dd)
        }
    }
    return num.length;
}

// ===============复选框的状态=======================================
// no 表未选中,yes相反
$('.add-data').on('click', '.check-box', function () {
    var dd = $(this).next()[0].value; //值为no or yes
    console.log(dd)
    if (dd == 'no') {
        console.log("hlr")
        $(this).css({
            backgroundPositionX: '86px'
        })
        $(this).parent().parent().css({
            backgroundColor: '#f4f3f2'
        })
        $(this).next()[0].value = 'yes';
    } else {
        $(this).css({
            backgroundPositionX: '-24px'
        })
        $(this).parent().parent().css({
            backgroundColor: 'white'
        })
        $(this).next()[0].value = 'no';
    }
})
// ========================改变添加数据和删除按钮的状态==========================
//   当数据达到最小时，禁止操作 
function ProhibitionOfOperation() {
    var num = getItemNum()
    if (num == 1) {
        $('.delete-btn').css({
            cursor: 'not-allowed',
            display: 'none',
        })
    } else {
        $('.delete-btn').css({
            cursor: 'pointer',
            display: 'block',
        })
    }
    if (num > 5) {
        console.log("hlr")
        $('.add-btn').css({
            cursor: 'not-allowed',
            display: 'none',
        })
    } else {
        $('.add-btn').css({
            cursor: 'pointer',
            display: 'block',
        })
    }

}
// ======================================选择位置======================================
$('.add-data').on('change', '.chose-eq', function () {
    if (this.value === '0') {
        return
    }

    var content = '';
    for (var i = 1; i < 4; i++) {
        
        content+=   '<a class="check-all-wrapper">' +
                    '<i class="check-box"></i>' +
                    '<input type="checkbox" name="" value="no"  class="check-data">' +
                    '<label for="btn-checkbox">数据'+ i +'</label>' +
                    '</a>'
    }

    $(this).siblings('.checkbox-wrapper, span').remove();
    $(this).after(content);
    common.commonCheckbox('.item')
})
// ==================================================================
// 模拟数据
var anchor = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; //x坐标的标值的设置
var waterData = [9, 6, 8, 2, 1, 4, 5, 7, 8, 9, 0, 1, 2, 3, 4];
var waterData1 = [3, 7, 2, 5, 1, 3, 5, 6, 8, 2, 10, 1, 2, 3, ];
var waterData2 = [3, 4, 2, 5, 11, 13, 5, 6, 8, 2, 0, 11, 2, 3, ];
var waterData3 = [3, 4, 2, 7, 1, 3, 5, 1, 8, 2, 0, 1, 6, 3, ];
var option = {
    backgroundColor: '#f6f4f3',
    textStyle: {
        color: '#999'
    },
    legend: {
        data: ['电压', '电流', '值1', '值2'],
        itemWidth: 10,
        itemHeight: 2,
        top: 20,
        right: 5,
    },
    tooltip: {
        trigger: 'axis',
    },
    grid: {
        top: '50px',
        left: '50px',
        right: '36px'
    },
    xAxis: [{
        type: "category",
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
            // margin: 10,
            textStyle: {
                fontSize: 14,
                color: '#999'
            }
        },
        data: anchor,
    }],
    yAxis: {
        type: 'value',
        name: '曲线',
        min: 0,
        max: 15,
        splitLine: 5,
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#dbdbdb'
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 12
            }
        },
        splitLine: {
            lineStyle: {
                color: '#dbdbdb'
            }
        }
    },
    series: [{
            name: '电压',
            type: 'line',
            smooth: true,
            //   itemStyle: {
            //       normal: {
            //           lineStyle: {
            //               width: 3, //折线宽度
            //           },
            //           opacity: 0.4
            //       }
            //   },
            data: waterData,
        },
        {
            name: '电流',
            type: 'line',
            smooth: true,
            data: waterData1,
            showSymbol: false,
        },
        {
            name: '值1',
            type: 'line',
            smooth: true,
            data: waterData2,
            showSymbol: false,
        },
        {
            name: '值2',
            type: 'line',
            smooth: true,
            data: waterData3,
            showSymbol: false,
        },
    ],
    color: ['#6bbc71', '#469dc0', '#958bc2', '#e57855', '#2fcbf9'],
}
// =======================生成echarts图表==============================
var echartBtn = document.getElementsByClassName('echart-btn')[0];
echartBtn.addEventListener('click', function () {
    var num = getItemChoseNum();
    if (num == '' || num == 'undefind') {
        echartWrapper.empty(); //移除all元素
        new CustomPrompt({
            type: 'default',
            msg: '请选择设备!!'
        });
    } else {
        var div = '';
        for (var i = 0; i < num; i++) {
            div += '<div class="echart' + i + '">';
            div += '<div class="echart-title">工艺位置-设备名称1</div>';
            div += '<div id="echart' + i + '"></div>';
            div += '</div>';
        }
        echartWrapper.empty();
        echartWrapper.append(div);

        // 注：有几个设备就需要传几个对应的option,
        for (var j = 0; j < num; j++) {
            echarts.init(document.getElementById('echart' + j + '')).setOption(option);
        }
    }
})


//======================厂站统计搜索按钮=============================
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



//======================================================================