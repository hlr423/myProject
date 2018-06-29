var personId = $("#personId").val();
var mileage;
var oilAnalyse;
var oilFee;
var numberOfTrips;
var maintenanceCosts;
var maintenanceNumber;
var repairCosts;
var repairNumber;

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
            // showBopieCostsom: false,
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
            // showBopieCostsom: false,
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
    mileage = echarts.init(document.getElementById('echarts-wrapper-mileage')); //里程统计
    oilAnalyse = echarts.init(document.getElementById('echarts-wrapper-oilAnalyse')); // 油耗分析
    oilFee = echarts.init(document.getElementById('echarts-wrapper-oilFee')); // 油费统计
    numberOfTrips = echarts.init(document.getElementById('echarts-wrapper-numberOfTrips')); // 出车次数统计
    maintenanceCosts = echarts.init(document.getElementById('echarts-wrapper-maintenanceCosts')); // 保养费统计
    maintenanceNumber = echarts.init(document.getElementById('echarts-wrapper-maintenanceNumber')); // 保养次数统计
    repairCosts = echarts.init(document.getElementById('echarts-wrapper-repairCosts')); // 维修费统计
    repairNumber = echarts.init(document.getElementById('echarts-wrapper-repairNumber')); // 维修次数统计

    // 油费统计--饼图
    var oilFeeParam = {
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
            radius: ['0%', '60%'],
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
    //里程统计
    var mileageParam = {
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
            name: '车辆',
            data: ['通勤车', '运渣车', '吸污车', '移动脱水车'],
            axisLabel: {
                interval: 0, //显示所有的标签，不要这是显示奇数对应的标签
                // rotate:-10  //倾斜度的设置
            }
        }],
        yAxis: [{
            type: 'value',
            name: '里程(Km)',
            max: 30000,
            splitNumber: 4,
            min: 0,
            // axisLabel : {
            //     // formapieCostser: function(){
            //     //       return "";
            //     // }
            // }
        }],
        series: [{
            // name: '累计成本',
            type: 'bar',
            barWidth: 20, //柱图宽度
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}KM',
                        textStyle: {
                            color: '#615a5a'
                        },
                    },
                    barBorderRadius: [5, 5, 0, 0],
                    color: function (params) {
                        var colorList = ['#42c0c2', '#fac34a', '#9f85e3', '#42b4df'];
                        return colorList[params.dataIndex];
                    }
                }
            },
            data: [18015, 24958, 13459, 17872],
        }],

    };
    //油耗分析
    var oilAnalyseParam = {
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
            name: '车辆',
            data: ['通勤车', '运渣车', '吸污车', '移动脱水车'],
            axisLabel: {
                interval: 0, //显示所有的标签，不要这是显示奇数对应的标签
                // rotate:-10  //倾斜度的设置
            }
        }],
        yAxis: [{
            type: 'value',
            name: '1L/100KM',
            max: 30,
            splitNumber: 4,
            min: 0,
            // axisLabel : {
            //     // formapieCostser: function(){
            //     //       return "";
            //     // }
            // }
        }],
        series: [{
            // name: '累计成本',
            type: 'bar',
            barWidth: 20, //柱图宽度
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}L',
                        textStyle: {
                            color: '#615a5a'
                        },
                    },
                    barBorderRadius: [5, 5, 0, 0],
                    color: function (params) {
                        var colorList = ['#42c0c2', '#fac34a', '#9f85e3', '#42b4df'];
                        return colorList[params.dataIndex];
                    }
                }
            },
            data: [9.2, 24, 13.5, 17.1],
        }, ],

    };
    //出车次数统计
    var numberOfTripsParam = {
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
            name: '车辆',
            data: ['通勤车', '运渣车', '吸污车', '移动脱水车'],
            axisLabel: {
                interval: 0, //显示所有的标签，不要这是显示奇数对应的标签
                // rotate:-10  //倾斜度的设置
            }
        }],
        yAxis: [{
            type: 'value',
            name: '单次',
            max: 6000,
            splitNumber: 4,
            min: 0,
            // axisLabel : {
            //     // formapieCostser: function(){
            //     //       return "";
            //     // }
            // }
        }],
        series: [{
            // name: '累计成本',
            type: 'bar',
            barWidth: 20, //柱图宽度
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}次',
                        textStyle: {
                            color: '#615a5a'
                        },
                    },
                    barBorderRadius: [5, 5, 0, 0],
                    color: function (params) {
                        var colorList = ['#42c0c2', '#fac34a', '#9f85e3', '#42b4df'];
                        return colorList[params.dataIndex];
                    }
                }
            },
            data: [3801, 4495, 3459, 3872],
        }, ],

    };
    // 保养费统计--饼图
    var maintenanceCostsParam = {
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
            radius: ['0%', '60%'],
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
    //保养次数统计
    var maintenanceNumberParam = {
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
            name: '车辆',
            data: ['通勤车', '运渣车', '吸污车', '移动脱水车'],
            axisLabel: {
                interval: 0, //显示所有的标签，不要这是显示奇数对应的标签
                // rotate:-10  //倾斜度的设置
            }
        }],
        yAxis: [{
            type: 'value',
            name: '单次',
            max: 600,
            splitNumber: 4,
            min: 0,
            // axisLabel : {
            //     // formapieCostser: function(){
            //     //       return "";
            //     // }
            // }
        }],
        series: [{
            // name: '累计成本',
            type: 'bar',
            barWidth: 20, //柱图宽度
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}次',
                        textStyle: {
                            color: '#615a5a'
                        },
                    },
                    barBorderRadius: [5, 5, 0, 0], //柱状圆角
                    　　　　　　　 //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params) {
                        var colorList = ['#42c0c2', '#fac34a', '#9f85e3', '#42b4df'];
                        return colorList[params.dataIndex];
                    }
                },
            },
            data: [380, 449, 345, 382],

        }]


    };
    // 维修费统计--饼图
    var repairCostsParam = {
        tooltip: {
            trigger: 'item',
            formapieCostser: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
        },
        series: [{
            name: '维修费统计',
            type: 'pie',
            radius: ['0%', '60%'],
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
    //维修次数统计
    var repairNumberParam = {
        color: ['#fb5b1e'],
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            x: 'right',
            padding: [20, 10, 0, 0], // padding:[5, 10, 15, 20],
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            name: '车辆',
            data: ['通勤车', '运渣车', '吸污车', '移动脱水车'],
            axisLabel: {
                interval: 0, //显示所有的标签，不要这是显示奇数对应的标签
                // rotate:-10  //倾斜度的设置
            }
        }],
        yAxis: [{
            type: 'value',
            name: '单次',
            max: 600,
            splitNumber: 4,
            min: 0,
        }],
        series: [{
            // name: '累计成本',
            type: 'bar',
            barWidth: 20, //柱图宽度
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}次',
                        textStyle: {
                            color: '#615a5a'
                        },
                    },
                    barBorderRadius: [5, 5, 0, 0],
                    color: function (params) {
                        var colorList = ['#42c0c2', '#fac34a', '#9f85e3', '#42b4df'];
                        return colorList[params.dataIndex];
                    }
                },
            },
            data: [380, 449, 345, 382],
        }, ],

    };
    // ======================调用图表========================//
    mileage.setOption(mileageParam); //里程统计
    oilAnalyse.setOption(oilAnalyseParam); //油耗分析
    oilFee.setOption(oilFeeParam); //油费统计
    numberOfTrips.setOption(numberOfTripsParam); //出车次数统计
    maintenanceCosts.setOption(maintenanceCostsParam); //保养费统计
    maintenanceNumber.setOption(maintenanceNumberParam); //保养次数统计
    repairCosts.setOption(repairCostsParam); //维修费统计
    repairNumber.setOption(repairNumberParam); //维修次数统计

    /**
     * 报表自适应
     */
    window.addEventListener("resize", function () {
        mileage.resize();
        oilAnalyse.resize();
        oilFee.resize();
        numberOfTrips.resize();
        maintenanceCosts.resize();
        maintenanceNumber.resize();
        repairCosts.resize();
        repairNumber.resize();
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

/*======================车辆统计搜索按钮=============================*/
// 判断
var timeBtn = document.querySelector('.order-btn'); //监听事件。
timeBtn.addEventListener('click', function () {
    var content = $(this).parents('.title');
    // var contentParents = $(this).parents('.body-wrapper'); // 容器的根
    var carValState = $("#select-area").val() //车辆类型选择value值
    var stationState = $(".stationValue").val(); //厂站选择的value  0:全部厂站  其余值是单个厂站
    var state = $(".data").val() // 0:年 1:季度 2:月
    var dataYear = $(".data-year"); //date选择的value值
    var dataYearquarter = $(".data-year1"); //季度对应的date选择的value值
    var quarter = $(".data-quarter"); // 0: 春季 1:夏季 2:秋季  3:冬季
    var dataMonth = $(".data-month "); //月选择的value值
    var inputvalue = $(".input-search").val() //模糊查询value值
    var number = $(".time-all").html(); //获取页面上的time-all的值
    var dataX; // 年/季度/月  
    var tempValue; //临时变量


    // 饼图--pp1-pp5为油费统计、保养费统计、维修费统计中对应的总费用、通勤车、吸污车、运渣车、移动脱水库的number值
    var oilFeeText = $('.work-time-text');
    //pieCosts方法是用来获取所有有关费用的图中的number值，
    // 三个参数：1、某个费用的块级元素 2、四种车型的各自的统计费用 3、总的费用
    function pieCosts(textp, value) {

        // 累加
        var total = value.reduce(function (first, second) { //reduce(从左到右累加)--es6
            return first + second;
        }, 0);
        // console.log(value)
        oilFeeText[textp].getElementsByTagName('p')[1].getElementsByTagName('span')[0].innerText = '' + total + '' //1
        oilFeeText[textp].getElementsByTagName('p')[2].getElementsByTagName('span')[0].innerText = '' + value[0] + '' //2
        oilFeeText[textp].getElementsByTagName('p')[3].getElementsByTagName('span')[0].innerText = '' + value[1] + '' //3
        oilFeeText[textp].getElementsByTagName('p')[4].getElementsByTagName('span')[0].innerText = '' + value[2] + '' //4
        oilFeeText[textp].getElementsByTagName('p')[5].getElementsByTagName('span')[0].innerText = '' + value[3] + '' //5

    }

    function echartsPie() {
        // 油费统计
        // 这里调用pieCosts方法并传值

        oilData = [2222, 2323, 4422, 4455], //模拟数据
            allValue = 2222222; //模拟数据

        pieCosts(0, oilData)
        oilFee.setOption({ //油费统计
            series: [{
                data: oilData,
            }]
        });
        // 保养费统计
        pieCosts(1, oilData)
        maintenanceCosts.setOption({ //油费统计
            series: [{
                data: oilData,
            }]
        });
        // 维修费统计
        pieCosts(2, oilData)
        repairCosts.setOption({ //油费统计
            series: [{
                data: oilData,
            }]
        });
    }

    /*==========================厂站选择判断=====================*/
    // 为全部车辆类型，全部厂站时，图表的显示方法
    // 年、季度、月
    if (stationState == '0' && carValState == '0') {

        if (state == '0') { //年
            tempValue = dataYear.val()
            console.log(tempValue)
            if (tempValue == '' || tempValue == 'undefind') {
                new CustomPrompt({
                    type: 'default',
                    msg: '请选择年!!'
                });
            } else {
                // 请求数据
                mileage.setOption({ //里程统计
                    series: [{
                        data: [18015, 24958, 13459, 17872],
                    }]
                });
                oilAnalyse.setOption({ //油耗分析
                    series: [{
                        data: [9.2, 24, 13.5, 17.1],
                    }]
                });
                numberOfTrips.setOption({ //出车次数统计
                    series: [{
                        data: [3801, 4495, 3459, 3872],
                    }]
                });
                maintenanceNumber.setOption({ //保养次数统计
                    series: [{
                        data: [380, 449, 345, 382],
                    }]
                });
                repairNumber.setOption({ //维修次数统计
                    series: [{
                        data: [380, 449, 345, 382],
                    }]
                });
                // ========================================//
                // 油费统计
                // 这里调用pieCosts方法并传值
                echartsPie();
            }
        }
        if (state == '1') { //季度 默认是春季
            console.log('1:' + quarter.val()) //select对应的value的值
            console.log('2:' + dataYearquarter.val()) //季度对应的年的值
            tempValue = quarter.val();
            // 按季节分月
            (tempValue == 0) && (dataX = ['1', '2', '3']);
            (tempValue == 1) && (dataX = ['4', '5', '6']);
            (tempValue == 2) && (dataX = ['7', '8', '9']);
            (tempValue == 3) && (dataX = ['10', '11', '12']);
            // ==================
            // 请求数据
            mileage.setOption({ //里程统计
                series: [{
                    data: [10015, 12958, 7459, 8072],
                }]
            });
            oilAnalyse.setOption({ //油耗分析
                series: [{
                    data: [16, 22, 14.4, 17],
                }]
            });
            numberOfTrips.setOption({ //出车次数统计
                series: [{
                    data: [1801, 1495, 2459, 1872],
                }]
            });
            maintenanceNumber.setOption({ //保养次数统计
                series: [{
                    data: [220, 249, 245, 182],
                }]
            });
            repairNumber.setOption({ //维修次数统计
                series: [{
                    data: [220, 249, 245, 182],
                }]
            });
            //========================================//
            // 油费统计
            // 这里调用pieCosts方法并传值
            echartsPie();
            // ===============


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
                // ==================
                // 请求数据
                mileage.setOption({ //里程统计
                    series: [{
                        data: [10015, 12958, 7459, 8072],
                    }]
                });
                oilAnalyse.setOption({ //油耗分析
                    series: [{
                        data: [16, 22, 14.4, 17],
                    }]
                });
                numberOfTrips.setOption({ //出车次数统计
                    series: [{
                        data: [1801, 1495, 2459, 1872],
                    }]
                });
                maintenanceNumber.setOption({ //保养次数统计
                    series: [{
                        data: [220, 249, 245, 182],
                    }]
                });
                repairNumber.setOption({ //维修次数统计
                    series: [{
                        data: [220, 249, 245, 182],
                    }]
                });
                //========================================//
                // 油费统计
                // 这里调用pieCosts方法并传值
                echartsPie();
                // =====================================//
            }
        }
    } else

    if (carValState == '0' && stationState != '0') { // 选择全部车辆类型+单个厂站，
        // console.log("gm")
        // console.log(inputvalue) // 模糊查询获取某个厂站input框中的搜索值
        // console.log(stationState) //单选select厂站的value值
        //    请求数据
        if (state == '0') { //年
            tempValue = dataYear.val()
            console.log(tempValue)
            if (tempValue == '' || tempValue == 'undefind') {
                new CustomPrompt({
                    type: 'default',
                    msg: '请选择年!!'
                });
            } else {
                // 请求数据
                mileage.setOption({ //里程统计
                    series: [{
                        data: [1801, 2458, 1349, 1772],
                    }]
                });
                oilAnalyse.setOption({ //油耗分析
                    series: [{
                        data: [5.2, 2.4, 10.5, 20.1],
                    }]
                });
                numberOfTrips.setOption({ //出车次数统计
                    series: [{
                        data: [301, 495, 359, 372],
                    }]
                });
                maintenanceNumber.setOption({ //保养次数统计
                    series: [{
                        data: [30, 249, 315, 182],
                    }]
                });
                repairNumber.setOption({ //维修次数统计
                    series: [{
                        data: [30, 249, 315, 182],
                    }]
                });
                //========================================//
                // 所有的费用统计请求数据
                // 这里调用echartsPie方法再调用pieCosts方法并传值-改变
                echartsPie()
                // ============================================//
            }

        }
        if (state == '1') { //季度

            tempValue = quarter.val();
            (tempValue == 0) && (dataX = ['1', '2', '3']);
            (tempValue == 1) && (dataX = ['4', '5', '6']);
            (tempValue == 2) && (dataX = ['7', '8', '9']);
            (tempValue == 3) && (dataX = ['10', '11', '12']);
            // 请求数据
            mileage.setOption({ //里程统计
                series: [{
                    data: [1801, 2458, 1349, 1772],
                }]
            });
            oilAnalyse.setOption({ //油耗分析
                series: [{
                    data: [5.2, 2.4, 10.5, 20.1],
                }]
            });
            numberOfTrips.setOption({ //出车次数统计
                series: [{
                    data: [301, 495, 359, 372],
                }]
            });
            maintenanceNumber.setOption({ //保养次数统计
                series: [{
                    data: [30, 249, 315, 182],
                }]
            });
            repairNumber.setOption({ //维修次数统计
                series: [{
                    data: [30, 249, 315, 182],
                }]
            });
            //========================================//
            // 所有的费用统计请求数据
            // 这里调用echartsPie方法再调用pieCosts方法并传值-改变
            echartsPie()
            // ============================================//

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
                // 请求数据
                mileage.setOption({ //里程统计
                    series: [{
                        data: [10015, 12958, 7459, 8072],
                    }]
                });
                oilAnalyse.setOption({ //油耗分析
                    series: [{
                        data: [16, 22, 14.4, 17],
                    }]
                });
                numberOfTrips.setOption({ //出车次数统计
                    series: [{
                        data: [1801, 1495, 2459, 1872],
                    }]
                });
                maintenanceNumber.setOption({ //保养次数统计
                    series: [{
                        data: [220, 249, 245, 182],
                    }]
                });
                repairNumber.setOption({ //维修次数统计
                    series: [{
                        data: [220, 249, 245, 182],
                    }]
                });
                //========================================//
                // 所有的费用统计请求数据
                // 这里调用echartsPie方法再调用pieCosts方法并传值-改变
                echartsPie()
                // ============================================//
            }
        }
    } else if (carValState != '0' && stationState == '0') { // 选择全部厂站+单个车辆类型，
        // console.log("gm")
        // console.log(inputvalue) // 模糊查询获取某个厂站input框中的搜索值
        // console.log(stationState) //单选select厂站的value值
        if (state == '0') { //年
            tempValue = dataYear.val()
            console.log(tempValue)
            if (tempValue == '' || tempValue == 'undefind') {
                new CustomPrompt({
                    type: 'default',
                    msg: '请选择年!!'
                });
            } else {
                // 请求数据
                mileage.setOption({ //里程统计
                    series: [{
                        data: [1801, 2458, 1349, 1772],
                    }]
                });
                oilAnalyse.setOption({ //油耗分析
                    series: [{
                        data: [5.2, 2.4, 10.5, 20.1],
                    }]
                });
                numberOfTrips.setOption({ //出车次数统计
                    series: [{
                        data: [301, 495, 359, 372],
                    }]
                });
                maintenanceNumber.setOption({ //保养次数统计
                    series: [{
                        data: [30, 249, 315, 182],
                    }]
                });
                repairNumber.setOption({ //维修次数统计
                    series: [{
                        data: [30, 249, 315, 182],
                    }]
                });
                //========================================//
                // 所有的费用统计请求数据
                // 这里调用echartsPie方法再调用pieCosts方法并传值-改变
                echartsPie()
                // ============================================//
            }

        }
        if (state == '1') { //季度

            tempValue = quarter.val();
            (tempValue == 0) && (dataX = ['1', '2', '3']);
            (tempValue == 1) && (dataX = ['4', '5', '6']);
            (tempValue == 2) && (dataX = ['7', '8', '9']);
            (tempValue == 3) && (dataX = ['10', '11', '12']);
            // 请求数据
            mileage.setOption({ //里程统计
                series: [{
                    data: [1801, 2458, 1349, 1772],
                }]
            });
            oilAnalyse.setOption({ //油耗分析
                series: [{
                    data: [5.2, 2.4, 10.5, 20.1],
                }]
            });
            numberOfTrips.setOption({ //出车次数统计
                series: [{
                    data: [301, 495, 359, 372],
                }]
            });
            maintenanceNumber.setOption({ //保养次数统计
                series: [{
                    data: [30, 249, 315, 182],
                }]
            });
            repairNumber.setOption({ //维修次数统计
                series: [{
                    data: [30, 249, 315, 182],
                }]
            });
            //========================================//
            // 所有的费用统计请求数据
            // 这里调用echartsPie方法再调用pieCosts方法并传值-改变
            echartsPie()
            // ============================================//

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
                // 请求数据
                mileage.setOption({ //里程统计
                    series: [{
                        data: [10015, 12958, 7459, 8072],
                    }]
                });
                oilAnalyse.setOption({ //油耗分析
                    series: [{
                        data: [16, 22, 14.4, 17],
                    }]
                });
                numberOfTrips.setOption({ //出车次数统计
                    series: [{
                        data: [1801, 1495, 2459, 1872],
                    }]
                });
                maintenanceNumber.setOption({ //保养次数统计
                    series: [{
                        data: [220, 249, 245, 182],
                    }]
                });
                repairNumber.setOption({ //维修次数统计
                    series: [{
                        data: [220, 249, 245, 182],
                    }]
                });
                //========================================//
                // 所有的费用统计请求数据
                // 这里调用echartsPie方法再调用pieCosts方法并传值-改变
                echartsPie()
                // ============================================//
            }
        }
    } else {
        console.log("gm")
        console.log(inputvalue) // 模糊查询获取某个厂站input框中的搜索值
        console.log(stationState) //单选select厂站的value值
        if (state == '0') { //年
            tempValue = dataYear.val()
            console.log(tempValue)
            if (tempValue == '' || tempValue == 'undefind') {
                new CustomPrompt({
                    type: 'default',
                    msg: '请选择年!!'
                });
            } else {
                // 请求数据
                mileage.setOption({ //里程统计
                    series: [{
                        data: [1801, 2458, 1349, 1772],
                    }]
                });
                oilAnalyse.setOption({ //油耗分析
                    series: [{
                        data: [5.2, 2.4, 10.5, 20.1],
                    }]
                });
                numberOfTrips.setOption({ //出车次数统计
                    series: [{
                        data: [301, 495, 359, 372],
                    }]
                });
                maintenanceNumber.setOption({ //保养次数统计
                    series: [{
                        data: [30, 249, 315, 182],
                    }]
                });
                repairNumber.setOption({ //维修次数统计
                    series: [{
                        data: [30, 249, 315, 182],
                    }]
                });
                //========================================//
                // 所有的费用统计请求数据
                // 这里调用echartsPie方法再调用pieCosts方法并传值-改变
                echartsPie()
                // ============================================//
            }

        }
        if (state == '1') { //季度

            tempValue = quarter.val();
            (tempValue == 0) && (dataX = ['1', '2', '3']);
            (tempValue == 1) && (dataX = ['4', '5', '6']);
            (tempValue == 2) && (dataX = ['7', '8', '9']);
            (tempValue == 3) && (dataX = ['10', '11', '12']);
            // 请求数据
            mileage.setOption({ //里程统计
                series: [{
                    data: [1801, 2458, 1349, 1772],
                }]
            });
            oilAnalyse.setOption({ //油耗分析
                series: [{
                    data: [5.2, 2.4, 10.5, 20.1],
                }]
            });
            numberOfTrips.setOption({ //出车次数统计
                series: [{
                    data: [301, 495, 359, 372],
                }]
            });
            maintenanceNumber.setOption({ //保养次数统计
                series: [{
                    data: [30, 249, 315, 182],
                }]
            });
            repairNumber.setOption({ //维修次数统计
                series: [{
                    data: [30, 249, 315, 182],
                }]
            });
            //========================================//
            // 所有的费用统计请求数据
            // 这里调用echartsPie方法再调用pieCosts方法并传值-改变
            echartsPie()
            // ============================================//
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
                // 请求数据
                mileage.setOption({ //里程统计
                    series: [{
                        data: [10015, 12958, 7459, 8072],
                    }]
                });
                oilAnalyse.setOption({ //油耗分析
                    series: [{
                        data: [16, 22, 14.4, 17],
                    }]
                });
                numberOfTrips.setOption({ //出车次数统计
                    series: [{
                        data: [1801, 1495, 2459, 1872],
                    }]
                });
                maintenanceNumber.setOption({ //保养次数统计
                    series: [{
                        data: [220, 249, 245, 182],
                    }]
                });
                repairNumber.setOption({ //维修次数统计
                    series: [{
                        data: [220, 249, 245, 182],
                    }]
                });
                //========================================//
                // 所有的费用统计请求数据
                // 这里调用echartsPie方法再调用pieCosts方法并传值-改变
                echartsPie()
                // ============================================//
            }
        }
    }

})