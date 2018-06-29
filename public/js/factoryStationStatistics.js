
var myChart1;
var myChart3;
var echartsWrapper1;
var echartsWrapper2;
var echartsWrapperStandard1;
var echartsWrapperStandard2;
var echartsWrapperStandard3;
var consumePower;
var drugPower;
var personCost;
var factoryWater;
var factoryallCost;
var factorySludge;
var emissionReduction;
var earlyWarning;
var giveAlarm;
var afterfault;
var fcommunication;
var TonneWater;
// 
var echartswrapperParam1;
var echartswrapperParam2;
var  echartsWrapperStandard1;
var  echartsWrapperStandard2;
var  echartsWrapperStandard3;
var  earlyWarning;
var  giveAlarm;
var  afterfault;
$(function () {
	
	
	//获取区域树
	getArea();
	//根据区域获取厂站
	getStationByArea(0);
	
	//区域变化得到厂站的变化
	$("#select-area").on('click',function(){
		var areaId=$("#select-area").val();
		getStationByArea(areaId);
	});
	
	//厂站数量的统计
	getStationNumsByArea(0);
	
	
	
	
	
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
    myChart3 = echarts.init(document.getElementById('echart3'));

    echartsWrapper1 = echarts.init(document.getElementById('echarts-wrapper1'));
    echartsWrapper2 = echarts.init(document.getElementById('echarts-wrapper2'));
    echartsWrapperStandard1 = echarts.init(document.getElementById('echarts-wrapper-standard1'));
    echartsWrapperStandard2 = echarts.init(document.getElementById('echarts-wrapper-standard2'));
    echartsWrapperStandard3 = echarts.init(document.getElementById('echarts-wrapper-standard3'));
    consumePower = echarts.init(document.getElementById('echarts-wrapper-consumePower'));
    drugPower = echarts.init(document.getElementById('echarts-wrapper-drugPower'));
    personCost = echarts.init(document.getElementById('echarts-wrapper-personCost'));
    factoryWater = echarts.init(document.getElementById('echarts-wrapper-factoryWater'));
    factoryallCost = echarts.init(document.getElementById('echarts-wrapper-factoryallCost'));
    factorySludge = echarts.init(document.getElementById('echarts-wrapper-factorySludge'));
    emissionReduction = echarts.init(document.getElementById('echarts-wrapper-emissionReduction'));
    // 下面三个是一组
    earlyWarning = echarts.init(document.getElementById('echarts-wrapper-earlyWarning'));
    giveAlarm = echarts.init(document.getElementById('echarts-wrapper-giveAlarm'));
    afterfault = echarts.init(document.getElementById('echarts-wrapper-fault'));
    // ==========
    fcommunication = echarts.init(document.getElementById('echarts-wrapper-communication'));
    TonneWater = echarts.init(document.getElementById('echarts-wrapper-TonneWater'));

    // 厂站数量统计
    var option1 = {
        series: [{
            name: '厂站数量统计',
            type: 'pie',
            color: ['#35DADD', '#B6A2DE'],
            selectedMode: true,
            radius: '65%',
            center: ['50%', '52%'],
            data: [{
                    name: '已投运',
                    value: 388,
                    label: {
                        normal: {
                            formatter: '{b}:{c}个'
                        }
                    }
                },
                {
                    name: '未投运',
                    value: 22,
                    label: {
                        normal: {
                            formatter: '{b}:{c}个'
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
    // 处理水量
    echartswrapperParam1 = {
        series: [{
            type: 'liquidFill',
            name: '155，416，50m³',
            data: [{
                name: '水站处理水量',
                value: 0.6
            }, 0.7, 0.4, 0.6],
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
                    borderColor: '#2f529a',
                    shadowBlur: 20,
                    shadowColor: 'rgba(66, 184, 249, 0.8)'
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
    echartswrapperParam2 = {
        series: [{
            type: 'liquidFill',
            name: '114，161，20m³',
            data: [{
                name: '日均处理水量',
                value: 0.6
            }, 0.5, 0.4, 0.3],
            color: ['#00c4ee', '#00acee', '#1fd5fc', '#62e1fc'], //水波颜色
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
                    borderColor: '#00acee',
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
    // 达标统计
    var echartsWrapperStandardParam1 = {
        series: [{
            type: 'liquidFill',
            name: '38个',
            data: [{
                name: '达标数量',
                value: 0.6
            }, 0.5, 0.4, 0.3],
            color: ['#30ba60', '#53ca8d', '#7adaa9', '#3cda88'], //水波颜色
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
                    borderColor: '#30ba60',
                    shadowBlur: 20,
                    shadowColor: 'rgba(48, 186, 96, 0.8)',
                    // backgroundColor:'rgba(48, 186, 96, 0.2)'
                },
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
    var echartsWrapperStandardParam2 = {
        series: [{
            type: 'liquidFill',
            name: '1287天',
            data: [{
                name: '连续达标天数',
                value: 0.6
            }, 0.5, 0.4, 0.6],
            color: ['#32dadd', '#32ddcb', '#4ae5d5', '#80efe4'],
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
                    borderColor: '#32dadd',
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
    var echartsWrapperStandardParam3 = {
        series: [{
            type: 'liquidFill',
            name: '100%',
            data: [{
                name: '达标率',
                value: 0.6
            }, 0.5, 0.4, 0.3],
            color: ['#b6a2de', '#ceb6e6', '#dec5f2', '#deb9f3'],
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
                    borderColor: '#b6a2de',
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
            {
                name: '除磷', //----除磷
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
            {
                name: '碳源', //---碳源
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
    // 厂站平均出水指标
    var option3 = {
        color: ['#80efe4'],
        tooltip: {
            //触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'  

            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    type: 'dashed',
                    color: '#42626a',
                }
            },
        },
        xAxis: {
            type: 'category',
            name: '月',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisLabel: {
                interval: 0, //显示所有的标签，不要这是显示奇数对应的标签
                // rotate:-10  //倾斜度的设置
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
        },
        grid:{
            y2: 30
        },
        yAxis: {
            name: "cod",
            min:0,
            max:100,
            splitLine: { 
                show: false,
            },
            textStyle: {
                margin: 20,
                color: '#828690'
            },
            axisLabel: { //刻度标签
                show: false,
            },
            axisTick: { // y轴刻度
                show: false
            },
        },
        legend: {
            show: true,
            selectedMode: false, // 关闭图例点击事件
            right: '20',
            top: '20',
            itemWidth: 10,
            itemHeight: 3,
            icon: 'roundRect',
            data: ['超标线', '预警线', '出水值'],
        },
        series: [{
                type: 'bar',
                name: '出水值',
                barWidth: 8,
                markLine: {
                    silent: true, // 不触发鼠标事件
                    symbol: 'circle',
                    symbolSize: [0, 10],
                    label: {
                        show: true,
                        position: 'middle',
                    },
                    data: [{
                            name: '超标线',
                            yAxis: 30,
                            lineStyle: {
                                normal: {
                                    color: '#ce6352'
                                }
                            },
                        },
                        {
                            name: '预警线',
                            yAxis: 25,
                            lineStyle: {
                                normal: {
                                    color: '#efad41'
                                }
                            },
                        },
                       
                    ]
                },
                data: [22, 12, 33, 21, 49, 63, 45, 39, 76, 79, 60, 85],

            },
            {
                name: '超标线',
                type: 'line',
                barWidth: 1,
                itemStyle: {
                    normal: {
                        color: '#ce6352',
                    }
                },
            },
            {
                name: '预警线',
                type: 'line',
                barWidth: 1,
                itemStyle: {
                    normal: {
                        color: '#efad41',
                    }
                },
            },
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
            name: '万元（￥）',
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
            name: '万元（￥）',
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
    // 厂站污泥量统计
    var factorySludgeParam = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#ac92ed'
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
            name: '吨(T)',
            min: '0',
            max: '1500',
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
                        color: '#ac92ed'
                    }, {
                        offset: 1,
                        color: 'rgba(172, 164, 237, 0.2)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: '#ac92ed', //border
                    borderColor: '#ac92ed',
                    borderWidth: 12

                }
            },
            data: [666, 777, 888, 999, 1100, 888, 777, 999, 1200, 1300, 1400, 1450]
        }, ]
    };
    // 厂站减排统计
    var emissionReductionParam = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#f4c970'
                }
            }
        },
        legend: {
            top: 20,
            x: 'right',
            itemWidth: 10,
            itemHeight: 3,
            icon: 'roundRect',
            data: ['COD', 'TP', 'TN', 'SS']
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
            name: '吨(T)',
            min: 0,
            max: 1500,
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
        series: [{
                name: 'TN',
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
                            color: '#f6bb43',
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
                        lineStyle: {
                            width: 3, //折线宽度
                        },
                        color: '#d29e33', //border
                        borderColor: 'rgba(151, 116, 239, 0)',
                        borderWidth: 12

                    }
                },
                data: [888, 555, 777, 666, 888, 999, 800, 566, 777, 678, 777, 887]
            },
            { //4根折线--柠檬酸
                name: 'COD',
                color: ['#d82c26'],
                type: 'line',
                smooth: 'true',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 2, //折线宽度
                        },
                        color: '#83cfca',
                        opacity: 0.4
                    }
                },
                data: [588, 655, 777, 666, 888, 599, 600, 466, 677, 578, 877, 587]
            },
            {
                name: 'TP',
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
                data: [588, 755, 777, 866, 888, 599, 700, 666, 577, 878, 677, 687]
            },
            {
                name: 'SS', //---碳源
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
                data: [388, 455, 377, 566, 688, 799, 500, 466, 677, 578, 677, 487]
            }
        ]
    };

    // 厂站预警、告警、故障总数统计
    var earlyWarningParam = {
        series: [{
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
                    formatter: '\n\n{a}\n\n{b}',
                    textStyle: {
                        fontSize: 16,
                        // fontWeight: 300
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
    // 厂站通信率统计
    var communicationParam = {
        color: ['#4adab9'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'right',
            top: '10',
            padding: [20, 10, 0, 0], // [5, 10, 15, 20]
            data: ['断线次数'],
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            name: '月',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            axisLabel: {
                interval: 0, //显示所有的标签，不要这是显示奇数对应的标签
                // rotate:-10  //倾斜度的设置
                textStyle: {
                    fontSize: 12,
                    color: '#999'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
        }],
        yAxis: [{
            type: 'value',
            name: '断线（次）',
            max: 100,
            splitNumber: 3,
            min: 30,
            // axisLabel : {
            //     // formatter: function(){
            //     //       return "";
            //     // }
            // }
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
                name: '断线次数',
                type: 'bar',
                barWidth: 10, //柱图宽度
                data: [40, 35, 60, 55, 50, 70, 55, 43, 80, 88, 83, 95],

            },
            // {
            //     // data:[30,60,100],
            // }

        ],

    };
    // 厂站吨水成本统计
    var xData = function () { //年的换算
        var data = [];
        for (var i = 1; i < 13; i++) {
            data.push(i);
        }
        return data;
    }();
    var TonneWaterParam = { // 效率统计
        title: {
            textStyle: {
                fontSize: '15'
            }
        },
        tooltip: {
            trigger: "axis",
        },
        grid: {
            top: '50',
        },
        legend: {
            x: 'right',
            top: '20',
            itemWidth: 10,
            itemHeight: 3,
            icon: 'roundRect',
            data: ['500', '1000', '1500', '2000']
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
            data: xData,
        }],
        yAxis: {
            type: "value",
            name: '成本(￥)',
            min: 0,
            splitNumber: 3,
            max: 3,
            nameTextStyle: {
                color: '#666'
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
        },
        series: [
            {
                name: '500',
                color: ['#d82c26'],
                type: 'line',
                smooth: 'true',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 3, //折线宽度
                        },
                        color: '#35a17a',
                        opacity: 0.4
                    }
                },
                data: [0.2, 0.4, 0.6, 0.2, 0.5, 0.6, 0.8, 0, 0.4, 0.8, 0.2, 0.6]
            },
            {
                name: '1000',
                color: ['#d82c26'],
                type: 'line',
                smooth: 'true',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 3, //折线宽度
                        },
                        color: '#e59be1',
                        opacity: 0.4
                    }
                },
                data: [1.2, 1.4, 1.6, 1.2, 1.5, 1.6, 1.8, 2, 1.4, 1.8, 2.2, 1.6]
            },
            {
                name: '1500',
                color: ['#d82c26'],
                type: 'line',
                smooth: 'true',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 3, //折线宽度
                        },
                        color: '#ef9376',
                        opacity: 0.4
                    }
                },
                data: [1.2, 2.4, 1.6, 2.2, 1.5, 2.6, 1.8, 2, 1.4, 2.2, 1.2, 2.6]
            },
            {
                name: '2000',
                color: ['#d82c26'],
                type: 'line',
                smooth: 'true',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 2, //折线宽度
                        },
                        color: '#55a4ee',
                        opacity: 0.4
                    }
                },

                data: [2.2, 2.4, 2.6, 2.2, 2.5, 2.6, 2.8, 2, 2.4, 2.2, 2.2, 2.6]
            },
        ]
    };
    // ======================调用图表========================//
    myChart1.setOption(option1); //厂站数量统计
    myChart3.setOption(option3); // 厂站平均出水指标 
    echartsWrapper1.setOption(echartswrapperParam1); // 处理水量1
    echartsWrapper2.setOption(echartswrapperParam2); // 处理水量2
    echartsWrapperStandard1.setOption(echartsWrapperStandardParam1); // 达标统计1
    echartsWrapperStandard2.setOption(echartsWrapperStandardParam2); // 达标统计2
    echartsWrapperStandard3.setOption(echartsWrapperStandardParam3); // 达标统计3
    consumePower.setOption(consumePowerParam); // 耗电统计
    drugPower.setOption(drugPowerParam); // 药耗统计
    personCost.setOption(personCostParam); // 人工成本统计
    factoryWater.setOption(factoryWaterParam); // 厂站用水成本统计
    factoryallCost.setOption(factoryallCostParam); // 厂站总成本统计
    factorySludge.setOption(factorySludgeParam); // 厂站污泥量统计
    emissionReduction.setOption(emissionReductionParam); // 厂站减排统计

    // 厂站预警、告警、故障总数统计(三个是一组的 )--饼图
    earlyWarning.setOption(earlyWarningParam);
    giveAlarm.setOption(giveAlarmParam);
    afterfault.setOption(faultParam);
    fcommunication.setOption(communicationParam); // 厂站通信率统计
    TonneWater.setOption(TonneWaterParam); // 厂站吨水成本统计

    /**
     * 报表自适应
     */
    window.addEventListener("resize", function () {
        myChart1.resize();
        myChart3.resize();
        consumePower.resize();
        drugPower.resize();
        personCost.resize();
        factoryWater.resize();
        factoryallCost.resize();
        factorySludge.resize();
        emissionReduction.resize();
        fcommunication.resize();
        TonneWater.resize();
    
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
        (thisValue == 2) && content.find('.data-year1').addClass('data-show');
    });
})





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

    /*==========================厂站选择判断=====================*/
    // 为全部厂站时，图表的显示方法
    if (stationState == '0') {
        console.log("厂站" + stationState)
        contentParents.find('.work-time:nth-of-type(2)').addClass('data-hidden') //hidden 处理水量统计
        contentParents.find('.work-time:nth-of-type(9)').addClass('data-hidden') //hidden 厂站平均出水指标
        contentParents.find('.work-time:nth-of-type(13)').addClass('data-hidden') //hidden 厂站通信率
        contentParents.find('#echarts-wrapper-standard2').addClass('data-hidden')//hidden 处理水量统计  // 用display：none，隐藏不了，用vertical：hidden：不会释放位置？？？？？bug
        // contentParents.find('#echarts-wrapper-standard2').addClass('select-hidden') //hidden 处理水量统计
        contentParents.find('#echarts-wrapper-standard2').css({
            display: 'none',
        }) //hidden 处理水量统计
        contentParents.find(' #echarts-wrapper-standard1,#echarts-wrapper-standard3').css({
            // display: 'none',
            width:'40%'
        }) //hidden 处理水量统计
 
        // 显示
        contentParents.find('.work-time:nth-of-type(1)').removeClass('data-hidden') //hidden 处理水量统计
        contentParents.find('.work-time:nth-of-type(5) select:first-child').removeClass('select-hidden') //全部处理量
        contentParents.find('.work-time:nth-of-type(4) select:first-child').removeClass('select-hidden') //全部处理量
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

                // 厂站数量统计模拟数据----图表的值的类型又BUG??????????????????
                var arr1num = [{
                        name: '已投运',
                        value: '38',
                        label: {
                            normal: {
                                formatter: '{b}:{d}'
                            }
                        }
                    },
                    {
                        name: '未投运',
                        value: '2',
                        label: {
                            normal: {
                                formatter: '{b}:{c}件'
                            }
                        }
                    }
                ];
                myChart1.setOption({
                    series: {
                        data: arr1num
                    }
                });
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
                // 厂站总成本统计
                factoryallCost.setOption({
                    xAxis: [{
                        data: dataMonth
                    }],
                    series: {
                        // data: [11, 7, 8]
                    }
                });
                // 厂站污泥量统计
                factorySludge.setOption({
                    xAxis: [{
                        data: dataMonth
                    }],
                    series: {
                        // data: [650, 997, 800]
                    }
                });
                // // 厂站减排统计
                emissionReduction.setOption({
                    xAxis: [{
                        data: dataMonth
                    }],
                    series: {
                        // data: [650, 997, 800]
                    }
                });
                // 厂站吨水成本统计  --模拟数据
                var data1 = [0.2, 0.4, 0.6, ];
                var data2 = [1.8, 2.2, 1.6];
                var data3 = [1.5, 2.6, 1.8];
                var data4 = [2.6, 2.2, 2.5];

                TonneWater.setOption({
                    xAxis: [{
                        data: dataMonth
                    }],
                    legend: {
                        data: ['500'],
                    },
                    series: [
                  
                    ]
                });




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

            // 厂站数量统计模拟数据----图表的值的类型又BUG??????????????????
            var arr1num = [{
                    name: '已投运',
                    value: '100',
                    label: {
                        normal: {
                            formatter: '{b}:{d}'
                        }
                    }
                },
                {
                    name: '未投运',
                    value: '10',
                    label: {
                        normal: {
                            formatter: '{b}:{c}件'
                        }
                    }
                }
            ];
            myChart1.setOption({
                series: {
                    data: arr1num
                }
            });
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
            // 厂站总成本统计
            factoryallCost.setOption({
                xAxis: [{
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX
                }],
                series: {
                    // data: [11, 7, 8]
                }
            });
            // 厂站污泥量统计
            factorySludge.setOption({
                xAxis: [{
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX
                }],
                series: {
                    // data: [650, 997, 800]
                }
            });
            // 厂站减排统计
            emissionReduction.setOption({
                xAxis: [{
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX
                }],
                series: {
                    // data: [650, 997, 800]
                }
            });
            // 厂站吨水成本统计
            TonneWater.setOption({
                xAxis: [{
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX
                }],
                legend: {
                    data: ['500'],
                },
                series: [
                ]
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
                // 厂站总成本统计
                factoryallCost.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    series: {
                        // data: [11, 7, 8]
                    }
                });
                // 厂站污泥量统计
                factorySludge.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    series: {
                        // data: [650, 997, 800]
                    }
                });
                // 厂站减排统计
                emissionReduction.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    series: {
                        // data: [650, 997, 800]
                    }
                });

                // 厂站吨水成本统计
                TonneWater.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    legend: {
                        data: ['500'],
                    },
                    series: [
                    ]
                });
                // ===============

            }
        }
    } else if (stationState != '0') { // 选择单个厂站，
        // 隐藏
        contentParents.find('.work-time:nth-of-type(1)').addClass('data-hidden') //hidden 处理水量统计
        contentParents.find('.work-time:nth-of-type(5) select:first-child').addClass('select-hidden') //全部处理量
        contentParents.find('.work-time:nth-of-type(4) select:first-child').addClass('select-hidden') //全部处理量
        // 显示
        contentParents.find('.work-time:nth-of-type(9)').removeClass('data-hidden') //hidden 厂站平均出水指标
        contentParents.find('#echarts-wrapper-standard2').removeClass('select-hidden') //hidden 处理水量统计
        contentParents.find('.work-time:nth-of-type(2)').removeClass('data-hidden') //hidden 处理水量统计
        // 模糊查询获取某个厂站input框中的搜索值
        console.log(inputvalue)
        // ---厂站吨水成本统计  --显示固定值的水
        var data1 = [0.2, 0.4, 0.6, 0.2, 0.5, 0.6, 0.8, 0, 0.4, 0.8, 0.2, 0.6]
        var data2 = [];
        var data3 = [];
        var data4 = [];
        TonneWater.setOption({
            legend: {
                data: ['500'],
            },
            series: [{
                    data: data1
                },
                {
                    data: data2
                },
                {
                    data: data3
                },
                {
                    data: data4
                },
            ]
        });

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

                let dataMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
                // 厂站数量统计模拟数据----图表的值的类型又BUG??????????????????
                var arr1num = [{
                        name: '已投运',
                        value: '38',
                        label: {
                            normal: {
                                formatter: '{b}:{d}'
                            }
                        }
                    },
                    {
                        name: '未投运',
                        value: '2',
                        label: {
                            normal: {
                                formatter: '{b}:{c}件'
                            }
                        }
                    }
                ];
                myChart1.setOption({
                    series: {
                        data: arr1num
                    }
                });
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
                // 厂站总成本统计
                factoryallCost.setOption({
                    xAxis: [{
                        name: '月',
                        axisLabel: {
                            interval: 0,
                        },
                        data: dataMonth
                    }],
                    series: {
                        // data: [11, 7, 8]
                    }
                });
                // 厂站平均出水指标 
                myChart3.setOption({
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
                // 厂站污泥量统计
                factorySludge.setOption({
                    xAxis: [{
                        name: '月',
                        axisLabel: {
                            interval: 0,
                        },
                        data: dataMonth
                    }],
                    series: {
                        // data: [650, 997, 800]
                    }
                });
                // // 厂站减排统计
                emissionReduction.setOption({
                    xAxis: [{
                        name: '月',
                        axisLabel: {
                            interval: 0,
                        },
                        data: dataMonth
                    }],
                    series: {
                        // data: [650, 997, 800]
                    }
                });
                // 厂站通信率统计
                fcommunication.setOption({
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
                })
                // 厂站吨水成本统计  --模拟数据
                // var data1 = [0.2, 0.4, 0.6,];
                // var data2 =  [ 1.8, 2.2, 1.6];
                // var data3 = [ 1.5, 2.6, 1.8];
                // var data4 = [2.6, 2.2, 2.5];

                TonneWater.setOption({
                    xAxis: [{
                        name: '月',
                        axisLabel: {
                            interval: 0,
                        },
                        data: dataMonth
                    }],
                    legend: {
                        data: ['500'],
                    },
                    series: [
                        // {
                        //     data: data1
                        // },
                        // {
                        //     data: data2
                        // },
                        // {
                        //     data: data3
                        // },
                        // {
                        //     data: data4
                        // },
                    ]
                });
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
            // 厂站总成本统计
            factoryallCost.setOption({
                xAxis: [{
                    name: '月',
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX
                }],
                series: {
                    // data: [11, 7, 8]
                }
            });
            // 厂站平均出水指标 
            myChart3.setOption({
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
            // 厂站污泥量统计
            factorySludge.setOption({
                xAxis: [{
                    name: '月',
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX
                }],
                series: {
                    // data: [650, 997, 800]
                }
            });
            // 厂站减排统计
            emissionReduction.setOption({
                xAxis: [{
                    name: '月',
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX
                }],
                series: {
                    // data: [650, 997, 800]
                }
            });
            // 厂站通信率统计
            fcommunication.setOption({
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
            })
            // 厂站吨水成本统计
            TonneWater.setOption({
                xAxis: [{
                    name: '月',
                    axisLabel: {
                        interval: 0,
                    },
                    data: dataX
                }],
                legend: {
                    data: ['500'],
                },
                series: [
                   
                ]
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

                // ==============================
                console.log("hlr2")
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
                // 厂站总成本统计
                factoryallCost.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    series: {
                        // data: [11, 7, 8]
                    }
                });
                // 厂站平均出水指标 
                myChart3.setOption({
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
                // 厂站污泥量统计
                factorySludge.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    series: {
                        // data: [650, 997, 800]
                    }
                });
                // 厂站减排统计
                emissionReduction.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    series: {
                        // data: [650, 997, 800]
                    }
                });
                // 厂站通信率统计
                fcommunication.setOption({

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
                })
                // 厂站吨水成本统计
                // var data1 = [0.2, 0.4, 0.6,];
                // var data2 =  [ 1.8, 2.2, 1.6];
                // var data3 = [ 1.5, 2.6, 1.8];
                // var data4 = [2.6, 2.2, 2.5];

                TonneWater.setOption({
                    xAxis: [{
                        name: '日',
                        axisLabel: {
                            interval: 1,
                        },
                        data: dataX
                    }],
                    legend: {
                        data: ['500'],
                    },
                    series: [
                        // {
                        //     data: data1
                        // },
                        // {
                        //     data: data2
                        // },
                        // {
                        //     data: data3
                        // },
                        // {
                        //     data: data4
                        // },
                    ]
                });
            }
        }
    }
    
    //厂站数量的统计
    var areaId=$("#select-area").val();
    getStationNumsByArea(areaId);
   //处理水量统计
    var stationId=$("#stations").val();
    var year=$(".data-year1").val();
    var quarter=$(".data-year data-show").val();
    var month=$(".data-month").val();
   getStationWaterDeal(stationId,year,quarter,month);
    
    
    
    
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


//获取区域树
function getArea(){
	$.ajax({
		type : "POST",
		url : "getAreaTree",
		async : true,
		dataType : "json",
		success : function(msg) {
			console.log(msg)
			var content='<option value="0">全部区域</option>';
			for(var i=0;i<msg.length;i++){
				content+=' <option value="'+msg[i].id+'">'+msg[i].text+'</option>';
			}
			$("#select-area").empty();
			$("#select-area").append(content);
		}
	});
}


//根据区域获取厂站
function getStationByArea(areaId){
	$.ajax({
		type : "POST",
		url : "station",
		data:"areaId="+areaId,
		async : true,
		dataType : "json",
		success : function(msg) {
			var content='<option value="0">全部厂站</option>';
			for(var i=0;i<msg.length;i++){
				content+=' <option value="'+msg[i].id+'">'+msg[i].stationName+'</option>';
			}
			$("#stations").empty();
			$("#stations").append(content);
		}
	});
}


//厂站数量的统计
function getStationNumsByArea(areaId){
	$.ajax({
		type : "POST",
		url : "num",
		data:"areaId="+areaId,
		async : true,
		dataType : "json",
		success : function(msg) {
			$("#stationtotal").text(msg.total);
            myChart1.setOption({
                series: [{
                    data: [{
                            name: '已投运',
                            value: msg.running,
                            label: {
                                normal: {
                                    formatter: '{b}:{c}个'
                                }
                            }
                        },
                        {
                            name: '未投运',
                            value: msg.notrunning,
                            label: {
                                normal: {
                                    formatter: '{b}:{c}个'
                                },
                            },
                        },
                    ]
                }]
            });			
		}
	});
}



//处理水量统计
function getStationWaterDeal(stationId,year,quarter,month){
	console.log(year)
	console.log(quarter)
	console.log(month)
	$.ajax({
		type : "POST",
		url : "deal",
		data:"stationId="+stationId+"&year="+year+"&quarter="+quarter+"&month="+month,
		async : true,
		dataType : "json",
		success : function(msg) {
			console.log(msg)
		}
	});
}

