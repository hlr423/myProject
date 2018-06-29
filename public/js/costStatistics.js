var consumePower;
var drugPower;
var personCost;
var factoryWater;
var costStatistics;
var subText ; //费用累计变量

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
    consumePower = echarts.init(document.getElementById('echarts-wrapper-consumePower')); // 耗电统计
    drugPower = echarts.init(document.getElementById('echarts-wrapper-drugPower')); // 药耗统计
    personCost = echarts.init(document.getElementById('echarts-wrapper-personCost')); //  人工成本统计
    factoryWater = echarts.init(document.getElementById('echarts-wrapper-factoryWater')); //厂站用水成本统计
    costStatistics = echarts.init(document.getElementById('echarts-wrapper-costStatistics')); // 费用统计

    // 耗电统计
    var consumePowerParam = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#ff8257'
                }
            }
        },
        grid: {
            left: '3%',
            // right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            name: '月',
            boundaryGap: false,
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
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisLabel: {
                interval: 0, //显示所有的标签，不要这是显示奇数对应的标签
                // rotate:-10  //倾斜度的设置
            },
        }],
        yAxis: [{
            type: 'value',
            // name: '累计耗电(Kw)',
            name: '度',
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
            name: '耗电统计',
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
                        color: 'rgba(255, 130, 87, 0.8)'
                    }, {
                        offset: 1,
                        color: 'rgba(255, 130, 87, 0.2)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(255, 130, 87)', //border
                    borderColor: 'rgba(255, 130, 87, 0.8)',
                    borderWidth: 12

                }
            },
            data: [50, 20, 90, 13, 60, 88, 99, 66, 44, 33, 22, 99]
        }, ]
    };

    // 药耗统计
    var drugPowerParam = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#ff8257'
                }
            }
        },
        grid: {
            left: '3%',
            // right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            name: '月',
            boundaryGap: false,
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
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisLabel: {
                interval: 0, //显示所有的标签，不要这是显示奇数对应的标签
                // rotate:-10  //倾斜度的设置
            },
        }],
        yAxis: [{
            type: 'value',
            name: 'mg/d',
            min: 0,
            max: 15,
            splitNumber: 3,
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
        series: [{ //次氨酸钠
                name: '药耗统计',
                type: 'line',
                smooth: true,
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
                            color: 'rgba(151, 116, 239, 0.8)',
                        }, {
                            offset: 1,
                            color: 'rgba(151, 116, 239, 0)',
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#9774ef', //border
                        borderColor: 'rgba(151, 116, 239, 0)',
                        borderWidth: 12

                    }
                },
                data: [8, 5, 7, 6, 8, 9, 8, 6, 7, 8, 7, 8]
            },

            { //4根折线--柠檬酸
                name: '柠檬酸',
                color: ['#d82c26'],
                type: 'line',
                smooth: 'true',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 2, //折线宽度
                        },
                        color: 'red',
                        opacity: 0.4
                    }
                },
                data: [8, 5, 7, 6, 8, 9, 4, 6, 7, 8, 7, 6]
            },
            { //----除磷
                name: '除磷',
                color: ['#d82c66'],
                type: 'line',
                smooth: 'true',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 2, //折线宽度
                        },
                        color: '#f6bb43',
                        opacity: 0.4
                    }
                },
                data: [8, 4, 5, 7, 4, 6, 7, 8, 9, 4, 3, 8]
            },
            { //---碳源
                name: '碳源',
                color: ['#d82c26'],
                type: 'line',
                smooth: 'true',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 2, //折线宽度
                        },
                        color: '#fb6e52',
                        opacity: 0.4
                    }
                },
                data: [3, 4, 3, 5, 6, 9, 5, 6, 7, 5, 7, 4]
            }
        ]
    };
    // 人工成本统计
    var personCostParam = {
        color: ['#fb5b1e'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'right',
            padding: [20, 10, 0, 0], // padding:[5, 10, 15, 20],

            // data: ['出库', '入库'],


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
            name: '万元（￥）',
            max: 30,
            splitNumber: 3,
            min: 10,
            // axisLabel : {
            //     // formatter: function(){
            //     //       return "";
            //     // }
            // }



        }],
        series: [{
            // name: '累计成本',
            type: 'bar',
            barWidth: 10, //柱图宽度
            data: [12.5, 15, 18.5, 11, 22, 17.5, 25, 22, 13, 21, 22.5, 21],
        }, ],

    };
    // 厂站用水成本统计
    var factoryWaterParam = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#ff8257'
                }
            }
        },
        grid: {
            left: '3%',
            // right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            name: '月',
            boundaryGap: false,
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
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisLabel: {
                interval: 0, //显示所有的标签，不要这是显示奇数对应的标签
                // rotate:-10  //倾斜度的设置
            },
        }],
        yAxis: [{
            type: 'value',
            // name: '累计耗电(Kw)',
            name: '度',
            nameTextStyle: {
                color: '#666'
            },
            min: 0,
            splitNumber: 3,
            max: 15,
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
            smooth: true,
            symbol: 'circle',
            symbolSize: 1,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 2,
                    opacity: 0.5,
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255, 130, 87, 0.8)'
                    }, {
                        offset: 1,
                        color: 'rgba(151, 116, 239, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'red', //border
                    borderColor: 'rgba(255, 130, 87, 0.6)',
                    borderWidth: 12

                }
            },
            data: [5, 8, 6, 8, 6, 7, 12, 14, 9, 11, 7, 8]
        }, ]
    };
    // 厂站总成本统计
    var factoryallCostParam = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#ff8257'
                }
            }
        },
        grid: {
            left: '3%',
            // right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            name: '月',
            boundaryGap: false,
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
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisLabel: {
                interval: 0, //显示所有的标签，不要这是显示奇数对应的标签
                // rotate:-10  //倾斜度的设置
            },
        }],
        yAxis: [{
            type: 'value',
            // name: '累计耗电(Kw)',
            name: '度',
            min: 0,
            splitNumber: 3,
            max: 15,
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
            smooth: 'true',
            symbol: 'circle',
            symbolSize: 1,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 2,
                    opacity: 0.5,
                }
            },
            areaStyle: {
                normal: {

                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255, 130, 87, 0.8)',
                    }, {
                        offset: 1,
                        color: 'rgba(151, 116, 239, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10,
                }
            },
            itemStyle: {
                normal: {
                    color: 'red', //border
                    borderColor: 'rgba(255, 130, 87, 0.8)',
                    borderWidth: 12

                }
            },
            data: [5, 8, 6, 8, 6, 7, 12, 14, 9, 11, 7, 8],

        }, ]
    };
    // 费用统计
    var costStatisticsParam = {

        title: {
            subtext:''+subText>0 ?subText:'12345'+'',     //12345是设置的临时默认值
            text:'共计(￥)',
            x:'center',
            y:'70',
            textStyle: {
                fontSize:14,
                color: '#000'
            },
            subtextStyle: {  // 副标题文字颜色
                color: '#000',
                fontSize:16    
            }
        },

        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c}"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                // colorLightness: [0, 1]
            }
        },
        series: [{
            name: '费用统计',
            type: 'pie',
            radius: ['75%', '50%'],
            center: ['50%', '50%'],
            color: ['#f7bb43', '#f69b43', '#f67a43', '#c5bee9', '#13b5b1', '#84ccc9'], //????没有起作用
            data: [{
                    value: 335,
                    name: '加油费'
                },
                {
                    value: 310,
                    name: '维修费'
                },
                {
                    value: 274,
                    name: '保养费'
                },
                {
                    value: 235,
                    name: '过路费'
                },
                {
                    value: 400,
                    name: '通信费'
                },
                {
                    value: 500,
                    name: '其他'
                },
            ],
            roseType: 'angle', //图表的宽窄随数据的大小变化，默认无，则一样大
            label: {
                normal: {
                    show: false,
                }
            },
            labelLine: {
                normal: {
                    show: false,
                    smooth: 0.1,
                    length: 10,
                    length2: 20
                }
            },
        }]
    }
    // ======================调用图表========================//
    consumePower.setOption(consumePowerParam); // 耗电统计
    drugPower.setOption(drugPowerParam); // 药耗统计
    personCost.setOption(personCostParam); // 人工成本统计
    factoryWater.setOption(factoryWaterParam); // 厂站用水成本统计
    costStatistics.setOption(costStatisticsParam); // 费用统计
    /**
     * 报表自适应
     */
    window.addEventListener("resize", function () {
        consumePower.resize();
        drugPower.resize();
        personCost.resize();
        factoryWater.resize();
        costStatistics.resize();
    })


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
        (thisValue == 2) && content.find('.data-year1').removeClass('data-show');
    });
})

// =================费用统计的方法=================================================
function costStatisticsfun(dataValue) {
    subText = dataValue.reduce(function(first, second) {   //reduce(从左到右累加)--es6
        return first + second; 
   }, 0);

console.log(subText)
    $('.bt')[0].getElementsByTagName('div')[0].children[1].getElementsByTagName('span')[0].innerText = '' + dataValue[0] + ''
    $('.bt')[1].getElementsByTagName('div')[0].children[1].getElementsByTagName('span')[0].innerText = '' + dataValue[1] + ''
    $('.bt')[2].getElementsByTagName('div')[0].children[1].getElementsByTagName('span')[0].innerText = '' + dataValue[2] + ''
    $('.bt')[3].getElementsByTagName('div')[0].children[1].getElementsByTagName('span')[0].innerText = '' + dataValue[3] + ''
    $('.bt')[4].getElementsByTagName('div')[0].children[1].getElementsByTagName('span')[0].innerText = '' + dataValue[4] + ''
    $('.bt')[5].getElementsByTagName('div')[0].children[1].getElementsByTagName('span')[0].innerText = '' + dataValue[5] + ''
    costStatistics.setOption({
        title:{
            subtext:''+subText+'',  //总计的数据
        },
        series: [{
            data: dataValue
        }]
    });
}

// =======================药耗统计中的药剂选择====================================
//    var sel= $('.select-btn-1')[0]  //耗电统计的select （no）
//    var sel= $('.select-btn-1')[1].getElementsByTagName('select')[0]  //全部处理量  （no）

function allDrugFun() {
    aa()
}

function aa() {
    var sel = $('.select-btn-1')[1].getElementsByTagName('select')[1].value //取得全部药剂select中value选中的值
    console.log(sel)
    if (sel == '1') { //次氨酸钠
        drugPowerFun()
    } else if (sel == '2') { //柠檬酸
        drugPowerFun()
    } else if (sel == '3') { //除磷
        drugPowerFun()
    } else if (sel == '4') { //碳源
        drugPowerFun()
    }
}

function drugPowerFun() {
    // 模拟数据
    var arr1 = [8, 5, 7, 6, 8, 9, 4, 6, 7, 8, 7, 6];
    var arr2 = [];
    var arr3 = [];
    var arr4 = [];

    drugPower.setOption({
        series: [{
                data: arr1
            },
            {
                data: arr2
            },
            {
                data: arr3
            },
            {
                data: arr4
            }
        ]
    });
}

/*======================成本统计搜索按钮=============================*/
// 判断
var timeBtn = document.querySelector('.order-btn'); //监听事件。
timeBtn.addEventListener('click', function () {
    var content = $(this).parents('.title');
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

    /*==========================厂站选择判断=====================*/
    // 为全部厂站时，图表的显示方法
    if (stationState == '0') {

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
                let dataMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
                let arr2a = [12, 6, 11]; // 模拟数据
                let arr2b = [8, 6, 7]; // 模拟数据
                let arr2c = [9, 8, 11]; // 模拟数据
                let arr2d = [2, 6, 11]; // 模拟数据
                //    耗电统计
                consumePower.setOption({
                    xAxis: [{
                        data: dataMonth
                    }],
                    series: {
                        data: [50, 20, 90, 13, 60, 88, 99, 66, 44, 33, 22, 99]
                    }
                });
                //药耗统计
                drugPower.setOption({
                    xAxis: [{
                        data: dataMonth
                    }],
                    series: [
                        // {
                        //     data: arr2a
                        // },
                        // {
                        //     data: arr2b
                        // },
                        // {
                        //     data: arr2c
                        // },
                        // {
                        //     data: arr2d
                        // }
                    ]
                });
                //人工成本统计
                personCost.setOption({
                    xAxis: [{
                        data: dataMonth
                    }],
                    series: {
                        data: [12.5, 15, 18.5, 11, 22, 17.5, 25, 22, 13, 21, 22.5, 21],
                    }
                });
                // 厂站用水成本统计
                factoryWater.setOption({
                    xAxis: [{
                        data: dataMonth
                    }],
                    series: {
                        // data: [5, 8, 6]
                    }
                });
                // 费用统计
                var data = [888, 333, 444, 555, 666, 222] //模拟数据
                costStatisticsfun(data)
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
            //耗电统计
            consumePower.setOption({
                xAxis: [{
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX
                }],
                series: {
                    // data: arr1
                }
            });
            //药耗统计
            drugPower.setOption({
                xAxis: [{
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX
                }],
                series: [
                    // {
                    //     data: arr2a
                    // },
                    // {
                    //     data: arr2b
                    // },
                    // {
                    //     data: arr2c
                    // },
                    // {
                    //     data: arr2d
                    // }
                ]
            });
            //人工成本统计
            personCost.setOption({
                xAxis: [{
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX
                }],
                series: {
                    // data: [12.5, 15, 18.5, 11, 22, 17.5, 25, 22, 13, 21, 22.5, 21],
                }
            });
            // 厂站用水成本统计
            factoryWater.setOption({
                xAxis: [{
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX
                }],
                series: {
                    // data: [5, 8, 6]
                }
            });
            // 费用统计
            var data = [8888, 8338, 4844, 5855, 6686, 2282] //模拟数据
            costStatisticsfun(data)
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
                //耗电统计
                consumePower.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    series: {
                        // data: arr1
                    }
                });
                //药耗统计
                drugPower.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    series: [
                        // {
                        //     data: arr2a
                        // },
                        // {
                        //     data: arr2b
                        // },
                        // {
                        //     data: arr2c
                        // },
                        // {
                        //     data: arr2d
                        // }
                    ]
                });
                //人工成本统计
                personCost.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    series: {
                        // data: [12.5, 15, 18.5, 11, 22, 17.5, 25, 22, 13, 21, 22.5, 21],
                    }
                });
                // 厂站用水成本统计
                factoryWater.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    series: {
                        // data: [5, 8, 6]
                    }
                });
                // 费用统计
                var data = [88, 838, 444, 555, 686, 222] //模拟数据
                costStatisticsfun(data)
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
                // 改变数据

                // 定义月
                let dataMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
                //    耗电统计
                consumePower.setOption({
                    xAxis: [{
                        name: '月',
                        axisLabel: {
                            interval: 0,
                        },
                        data: dataMonth
                    }],
                    series: {
                        // data: [50, 20, 90, 13, 60, 88, 99, 66, 44, 33, 22, 99]
                    }
                });
                //药耗统计
                drugPower.setOption({
                    xAxis: [{
                        name: '月',
                        axisLabel: {
                            interval: 0,
                        },
                        data: dataMonth
                    }],
                    series: [
                        // {
                        //     data: arr2a
                        // },
                        // {
                        //     data: arr2b
                        // },
                        // {
                        //     data: arr2c
                        // },
                        // {
                        //     data: arr2d
                        // }
                    ]
                });
                //人工成本统计
                personCost.setOption({
                    xAxis: [{
                        name: '月',
                        axisLabel: {
                            interval: 0,
                        },
                        data: dataMonth
                    }],
                    series: {
                        // data: [12.5, 15, 18.5, 11, 22, 17.5, 25, 22, 13, 21, 22.5, 21],
                    }
                });
                // 厂站用水成本统计
                factoryWater.setOption({
                    xAxis: [{
                        name: '月',
                        axisLabel: {
                            interval: 0,
                        },
                        data: dataMonth
                    }],
                    series: {
                        // data: [5, 8, 6]
                    }
                });
                // 费用统计
                var data = [88, 838, 444, 555, 686, 222] //模拟数据
                costStatisticsfun(data)
            }

        }
        if (state == '1') { //季度

            tempValue = quarter.val();
            (tempValue == 0) && (dataX = ['1', '2', '3']);
            (tempValue == 1) && (dataX = ['4', '5', '6']);
            (tempValue == 2) && (dataX = ['7', '8', '9']);
            (tempValue == 3) && (dataX = ['10', '11', '12']);
            console.log("hlr")
            //耗电统计
            consumePower.setOption({
                xAxis: [{
                    name: '月',
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX,
                }],
                series: {
                    // data: arr1
                }
            });
            //药耗统计
            drugPower.setOption({
                xAxis: [{
                    name: '月',
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX
                }],
                series: [
                    // {
                    //     data: arr2a
                    // },
                    // {
                    //     data: arr2b
                    // },
                    // {
                    //     data: arr2c
                    // },
                    // {
                    //     data: arr2d
                    // }
                ]
            });
            //人工成本统计
            personCost.setOption({
                xAxis: [{
                    name: '月',
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX
                }],
                series: {
                    // data: [12.5, 15, 18.5, 11, 22, 17.5, 25, 22, 13, 21, 22.5, 21],
                }
            });
            // 厂站用水成本统计
            factoryWater.setOption({
                xAxis: [{
                    name: '月',
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX
                }],
                series: {
                    // data: [5, 8, 6]
                }
            });
            // 费用统计
            var data = [88, 838, 444, 555, 686, 222] //模拟数据
            costStatisticsfun(data)

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

                // ==============================//
                //耗电统计
                consumePower.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    series: {
                        // data: arr1
                    }
                });
                //药耗统计
                drugPower.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    series: [
                        // {
                        //     data: arr2a
                        // },
                        // {
                        //     data: arr2b
                        // },
                        // {
                        //     data: arr2c
                        // },
                        // {
                        //     data: arr2d
                        // }
                    ]
                });
                //人工成本统计
                personCost.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    series: {
                        // data: [12.5, 15, 18.5, 11, 22, 17.5, 25, 22, 13, 21, 22.5, 21],
                    }
                });
                // 厂站用水成本统计
                factoryWater.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    series: {
                        // data: [5, 8, 6]
                    }
                });
                // 费用统计
                var data = [88, 838, 444, 555, 686, 222] //模拟数据
                costStatisticsfun(data)

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