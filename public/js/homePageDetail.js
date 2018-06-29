$(function () {
    /*====================echarts图表====================*/
    // 实时进水量报表
    var enterWaterEchart = echarts.init(document.getElementById('enterWater'));
    // 趋势分析
    var trendEchart = echarts.init(document.getElementById('trend'));
    // 实时药耗
    var drugEchart = echarts.init(document.getElementById('drug'));
    // 实时电耗
    var electricEchart = echarts.init(document.getElementById('electric'));
    // 实时水量
    var waterEchart = echarts.init(document.getElementById('water'));
    // 实时进水量option
    var enterWaterOption = {
        tooltip: {
            //触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'  
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    type: 'dashed',
                    color: '#42626a',
                }
            },
            formatter : function(parms) {
				var nameArr = [];
				var timeArr = [];
				var valueArr = [];
				var colorArr = [];
                var node = '';
                for (var i = 0; i < parms.length; i++) {
                        var name = parms[i].seriesName;
                        var time = parms[i].data[0];
                        var value = parms[i].data[1];
                        nameArr.push(name);
                        timeArr.push(time);
                        valueArr.push(value);
                        node += timeArr[i] + '</br>' + '<div style="width: 10px; height: 10px; margin-right: 5px; display: inline-block; border-radius: 5px; background-color: ' + '#5b91ea' + '"></div>' + nameArr[i] + '：' + valueArr[i] + '</br>';
                        if(name == 'anchor'){
                            node = ''
                        }
                    }
				return node
			}
        },
        grid: {

            y: 40,
            y2: 20
        },
        xAxis: {
            type: 'time',
            splitLine : {
                show : false
            },
            axisLine: {
                lineStyle: {
                    color: '#3e4250'
                }
            },
            axisLabel: {
                color: '#696b73',
                fontSize: 14,
                // align: 'left'
            },
            axisTick: { // X轴刻度
                show: false
            },
        },
        yAxis: {
            name: "cod",
            nameTextStyle: {
                color: '#696b73',
                fontSize: 16
            },
            axisLine: {
                lineStyle: {
                    color: '#3e4250'
                }
            },
            textStyle: {
                margin: 20,
                color: '#828690'
            },
            axisLabel: { //刻度标签
                show: false,
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#0177d4'
                }
            },
            axisTick: { // y轴刻度
                show: false
            },
            minInterval: 35,
            // 最小刻度
        },
        legend: {
            show: true,
            selectedMode: false, // 关闭图例点击事件
            right: '20',
            itemWidth: 10,
            itemHeight: 3,
            icon: 'roundRect',
            data: ['超标线', '预警线', '出水值'],
            textStyle: {
                margin: 20,
                color: '#828690'
            }
        },
        series: [
            {
                type: 'bar',
                name: '出水值',
                barWidth: 8,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#5b91ea'
                        }, {
                            offset: 0.8,
                            color: '#435b74'
                        }], false)
                    }
                },
                markLine: {
                    silent: true, // 不触发鼠标事件
                    symbol: 'circle',
                    symbolSize: [0, 10],
                    label: {
                        show: true,
                        position: 'middle',
                    },
                    data: [
                        {
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
                            yAxis: 28,
                            lineStyle: {
                                normal: {
                                    color: '#efad41'
                                }
                            },
                        }
                    ]
                },
                data:[
                    ['2018-4-12 13:00:00',26],
                    ['2018-4-12 14:00:00',25],
                    ['2018-4-12 15:00:00',26],
                    ['2018-4-12 16:05:00',26],
                ]
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
            {
				name : 'anchor', // 其它数据X轴
				type : 'line',
				smooth : true,
				showSymbol : false,
				data : [
                    {
						name : '2018-4-12 00:00:00',
						value : [ '2018-4-12 00:00:00', 0 ]
					},
					{
						name : '2018-4-12 24:00:00',
						value : [ '2018-4-12 24:00:00', 0 ]
					}
                ],
				itemStyle : {
					normal : {
						opacity : 0
					}
				},
				lineStyle : {
					normal : {
						opacity : 0
					}
				}
			},
        ]
    };
    // 趋势分析option
    var trendOption = {
        legend: {
            show: true,
            selectedMode: false, // 关闭图例点击事件
            right: '20',
            itemWidth: 10,
            itemHeight: 3,
            icon: 'roundRect',
            data: ['预测数据', '实际数据'],
            textStyle: {
                margin: 20,
                color: '#828690'
            }
        },
        tooltip: {
            //触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'  
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#202739',
                }
            },
            formatter : function(parms) {
				var nameArr = [];
				var timeArr = [];
				var valueArr = [];
				var colorArr = [];
                var node = '';
                for (var i = 0; i < parms.length; i++) {
                        var name = parms[i].seriesName;
                        var time = parms[i].data[0];
                        var value = parms[i].data[1];
                        var color = parms[i].color;
                        nameArr.push(name);
                        timeArr.push(time);
                        valueArr.push(value);
                        colorArr.push(color);
                        if(name == '实际数据'){
                            node += timeArr[i] + '</br>' + '<div style="width: 10px; height: 10px; margin-right: 5px; display: inline-block; border-radius: 5px; background-color: ' + colorArr[i] + '"></div>' + nameArr[i] + '：' + valueArr[i] + '</br>';
                        }
                    }
				return node
			}
        },
        grid: {
            y: 40,
            y2: 20
        },
        xAxis: {
            type: 'time',
            boundaryGap: false, //坐标轴两边留白
            splitLine : {
                show : false
            },
            axisLine: {
                lineStyle: {
                    color: '#3e4250'
                }
            },
            axisLabel: {
                color: '#696b73',
                fontSize: 14,
                // align: 'left'
            },
            axisTick: { // X轴刻度
                // show: false
                show: true,
                inside: true
            },
        },
        yAxis: {
            name: "mg/l",
            nameTextStyle: {
                color: '#696b73',
                fontSize: 16
            },
            axisLine: {
                lineStyle: {
                    color: '#3e4250'
                }
            },
            textStyle: {
                margin: 20,
                color: '#828690'
            },
            axisLabel: { //刻度标签
                // show: false,
            },
            splitLine: {
                lineStyle: {
                    color: '#3e4250'
                }
            },
            axisTick: { // y轴刻度
                show: false
            },
            minInterval: 10,
            // 最小刻度
        },
        series: [
            {
                name: '实际数据',
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#5bd06d',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#5bd06d'
                    }
                },
                markLine: {
                    silent: true, // 不触发鼠标事件
                    symbol: 'circle',
                    symbolSize: [0, 10],
                    label: {
                        show: true,
                        position: 'middle',
                    },
                    data: [
                        {
                            name: '超标值',
                            yAxis: 40,
                            lineStyle: {
                                normal: {
                                    color: '#ce6352'
                                }
                            },
                        }
                    ]
                },
                data:[
                    ['2018-4-12 00:00:00',25],
                    ['2018-4-12 01:00:00',22],
                    ['2018-4-12 02:00:00',24],
                    ['2018-4-12 03:00:00',23],
                    ['2018-4-12 04:00:00',23],
                    ['2018-4-12 05:00:00',30],
                    ['2018-4-12 06:00:00',22],
                    ['2018-4-12 07:00:00',21],
                    ['2018-4-12 08:00:00',22],
                    ['2018-4-12 09:00:00',40],
                ]
            },
            {
                name: '预测数据TOP',
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#262e43',
                    }
                },
                itemStyle: {
                    normal: {
                        opacity: 0
                    }
                },
                areaStyle: {
                    normal: {
                        color: '#313b54',
                        opacity: 0.5,
                    }
                },
                data:[
                    ['2018-4-12 00:00:00',33],
                    ['2018-4-12 01:00:00',32],
                    ['2018-4-12 02:00:00',31],
                    ['2018-4-12 03:00:00',30],
                    ['2018-4-12 04:00:00',35],
                    ['2018-4-12 05:00:00',36],
                    ['2018-4-12 06:00:00',38],
                    ['2018-4-12 07:00:00',38],
                    ['2018-4-12 08:00:00',40],
                    ['2018-4-12 09:00:00',50],
                    ['2018-4-12 10:00:00',30],
                    ['2018-4-12 11:00:00',22],
                ]
            },
            {
                name: '预测数据bottom',
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        color: '#262e43',
                    }
                },
                itemStyle: {
                    normal: {
                        opacity: 0
                    }
                },
                areaStyle: {
                    normal: {
                        color: '#262e43',
                        // opacity: 0.5,
                    }
                },
                data:[
                    ['2018-4-12 00:00:00',3],
                    ['2018-4-12 01:00:00',12],
                    ['2018-4-12 02:00:00',11],
                    ['2018-4-12 03:00:00',10],
                    ['2018-4-12 04:00:00',15],
                    ['2018-4-12 05:00:00',16],
                    ['2018-4-12 06:00:00',18],
                    ['2018-4-12 07:00:00',18],
                    ['2018-4-12 08:00:00',20],
                    ['2018-4-12 09:00:00',30],
                    ['2018-4-12 10:00:00',10],
                    ['2018-4-12 11:00:00',12],
                ]
            },
            {
                name: '预测数据',
                type: 'line',
                barWidth: 1,
                itemStyle: {
                    normal: {
                        color: '#313b54',
                    }
                },
            },
            {
				name : 'anchor', // 其它数据X轴
				type : 'line',
				smooth : true,
				showSymbol : false,
				data : [
                    {
						name : '2018-4-12 00:00:00',
						value : [ '2018-4-12 00:00:00', 0 ]
					},
					{
						name : '2018-4-12 24:00:00',
						value : [ '2018-4-12 24:00:00', 0 ]
					}
                ],
				itemStyle : {
					normal : {
						opacity : 0
					}
				},
				lineStyle : {
					normal : {
						opacity : 0
					}
				}
			},
        ]
    };
    // 实时药耗option
    var drugOption = {
        tooltip: {
            //触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'  
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    type: 'dashed',
                    color: '#42626a',
                }
            },
            formatter : function(parms) {
				var nameArr = [];
				var timeArr = [];
				var valueArr = [];
				var colorArr = [];
                var node = '';
                for (var i = 0; i < parms.length; i++) {
                        var name = parms[i].seriesName;
                        var time = parms[i].data[0];
                        var value = parms[i].data[1];
                        var color = parms[i].color;
                        nameArr.push(name);
                        timeArr.push(time);
                        valueArr.push(value);
                        colorArr.push(color);
                        node += timeArr[i] + '</br>' + '<div style="width: 10px; height: 10px; margin-right: 5px; display: inline-block; border-radius: 5px; background-color: ' + colorArr[i] + '"></div>' + nameArr[i] + '：' + valueArr[i] + '</br>';
                        if(name == 'anchor'){
                            node = ''
                        }
                    }
				return node
			}
        },
        xAxis: {
            type: 'time',
            boundaryGap: false, //坐标轴两边留白
            splitLine : {
                show : false
            },
            axisLine: {
                lineStyle: {
                    color: '#3e4250'
                }
            },
            axisLabel: {
                color: '#696b73',
                fontSize: 14,
                // align: 'left'
            },
            axisTick: { // X轴刻度
                // show: false
                show: true,
                inside: true
            },
        },
        yAxis: {
            name: "mg/d",
            nameTextStyle: {
                color: '#696b73',
                fontSize: 16
            },
            axisLine: {
                lineStyle: {
                    color: '#3e4250'
                }
            },
            textStyle: {
                margin: 20,
                color: '#828690'
            },
            axisLabel: { //刻度标签
                // show: false,
                interval: 0
            },
            splitLine: { // Y轴线
                lineStyle: {
                    color: '#3e4250'
                }
            },
            axisTick: { // y轴刻度
                show: false
            },
            minInterval: 10,
            // 最小刻度
        },
        grid: {
            x:'40',
            y: 40,
            y2: 20
        },
        series: [
            {
                name: '实时药耗',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1,
                        color: 'rgba(163,139,226)',
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(163,139,226, 1)'
                            },
                            {
                                offset: 0.8,
                                color: 'rgba(41, 48, 71, 0.3)'
                            }
                        ], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(163,139,226, 1)',
                        borderColor: 'rgba(163,139,226, 1)',
                    }
                },
                data: [
                    ['2018-4-12 00:00:00',11],
                    ['2018-4-12 01:00:00',23],
                    ['2018-4-12 02:00:00',73],
                    ['2018-4-12 03:00:00',23],
                    ['2018-4-12 04:00:00',43],
                    ['2018-4-12 05:00:00',13],
                    ['2018-4-12 06:00:00',23],
                    ['2018-4-12 13:00:00',3],
                    ['2018-4-12 14:00:00',73],
                    ['2018-4-12 15:00:00',73],
                    ['2018-4-12 16:05:00',7],
                    ]
            },
            {
				name : 'anchor', // 其它数据X轴
				type : 'line',
				smooth : true,
				showSymbol : false,
				data : [
                    {
						name : '2018-4-12 00:00:00',
						value : [ '2018-4-12 00:00:00', 0 ]
					},
					{
						name : '2018-4-12 24:00:00',
						value : [ '2018-4-12 24:00:00', 0 ]
					}
                ],
				itemStyle : {
					normal : {
						opacity : 0
					}
				},
				lineStyle : {
					normal : {
						opacity : 0
					}
				}
			},
        ]
    };
    // 实时电耗option
    var electricOption = {
        tooltip: {
            //触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'  
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    type: 'dashed',
                    color: '#42626a',
                }
            },
            formatter : function(parms) {
				var nameArr = [];
				var timeArr = [];
				var valueArr = [];
				var colorArr = [];
                var node = '';
                for (var i = 0; i < parms.length; i++) {
                        var name = parms[i].seriesName;
                        var time = parms[i].data[0];
                        var value = parms[i].data[1];
                        var color = parms[i].color;
                        nameArr.push(name);
                        timeArr.push(time);
                        valueArr.push(value);
                        colorArr.push(color);
                        node += timeArr[i] + '</br>' + '<div style="width: 10px; height: 10px; margin-right: 5px; display: inline-block; border-radius: 5px; background-color: ' + colorArr[i] + '"></div>' + nameArr[i] + '：' + valueArr[i] + '</br>';
                        if(name == 'anchor'){
                            node = ''
                        }
                    }
				return node
			}
        },
        xAxis: {
            type: 'time',
            boundaryGap: false, //坐标轴两边留白
            splitLine : {
                show : false
            },
            axisLine: {
                lineStyle: {
                    color: '#3e4250'
                }
            },
            axisLabel: {
                color: '#696b73',
                fontSize: 14,
                // align: 'left'
            },
            axisTick: { // X轴刻度
                // show: false
                show: true,
                inside: true
            },
        },
        yAxis: {
            name: "度",
            type: 'value',
            nameTextStyle: {
                color: '#696b73',
                fontSize: 16
            },
            axisLine: {
                lineStyle: {
                    color: '#3e4250'
                }
            },
            textStyle: {
                margin: 20,
                color: '#828690'
            },
            axisLabel: { //刻度标签
                // show: false,
            },
            splitLine: { // Y轴线
                lineStyle: {
                    color: '#3e4250'
                }
            },
            axisTick: { // y轴刻度
                show: false
            },
        },
        grid: {

            y: 40,
            y2: 20
        },
        series: [
            {
                name: '实时药耗',
                type: 'line',
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1,
                        color: '#ff8257',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ff8257',
                        borderColor: '#ff8257',
                    }
                },
                data: [
                    ['2018-4-12 12:00:00',29273],
                    ['2018-4-12 13:00:00',29273],
                    ['2018-4-12 14:00:00',29273],
                    ['2018-4-12 15:00:00',29273],
                    ['2018-4-12 16:05:00',2927],
                    ]
            },
            {
				name : 'anchor', // 其它数据X轴
				type : 'line',
				smooth : true,
				showSymbol : false,
				data : [
                    {
						name : '2018-4-12 00:00:00',
						value : [ '2018-4-12 00:00:00', 0 ]
					},
					{
						name : '2018-4-12 24:00:00',
						value : [ '2018-4-12 24:00:00', 0 ]
					}
                ],
				itemStyle : {
					normal : {
						opacity : 0
					}
				},
				lineStyle : {
					normal : {
						opacity : 0
					}
				}
			},
        ]
    };
    // 实时水量option
    var waterOption = {
        tooltip: {
            //触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'  
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#42626a',
                }
            },
            formatter : function(parms) {
				var nameArr = [];
				var timeArr = [];
				var valueArr = [];
				var colorArr = [];
                var node = '';
                for (var i = 0; i < parms.length; i++) {
                        var name = parms[i].seriesName;
                        var time = parms[i].data[0];
                        var value = parms[i].data[1];
                        var color = parms[i].color;
                        nameArr.push(name);
                        timeArr.push(time);
                        valueArr.push(value);
                        colorArr.push(color);
                        node += timeArr[i] + '</br>' + '<div style="width: 10px; height: 10px; margin-right: 5px; display: inline-block; border-radius: 5px; background-color: ' + colorArr[i] + '"></div>' + nameArr[i] + '：' + valueArr[i] + '</br>';
                        if(name == 'anchor'){
                            node = ''
                        }
                    }
				return node
			}
        },
        xAxis: {
            type: 'time',
            boundaryGap: false, //坐标轴两边留白
            splitLine : {
                show : false
            },
            axisLine: {
                lineStyle: {
                    color: '#3e4250'
                }
            },
            axisLabel: {
                color: '#696b73',
                fontSize: 14,
                // align: 'left'
            },
            axisTick: { // X轴刻度
                // show: false
                show: true,
                inside: true
            },
        },
        yAxis: {
            name: "吨",
            nameTextStyle: {
                color: '#696b73',
                fontSize: 16
            },
            axisLine: {
                lineStyle: {
                    color: '#3e4250'
                }
            },
            textStyle: {
                margin: 20,
                color: '#828690'
            },
            axisLabel: { //刻度标签
                // show: false,
            },
            splitLine: { // Y轴线
                lineStyle: {
                    color: '#3e4250'
                }
            },
            axisTick: { // y轴刻度
                show: false
            },
            minInterval: 250,
        },
        grid: {
            y: 40,
            y2: 20
        },
        series: [
           
            {
                name: '实时水量',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1,
                        color: '#48cfae',
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#48cfae',
                        borderColor: '#48cfae',
                    }
                },
                // data: [300, 350, 322, 258, 255, 337, 721, 638, 512, 211, 312, 442, 223, 312, 669, 222, 558, 225, 443, 885, 314, 313, 312, 555, 444]
                data: [
                    ['2018-4-12 00:00:00',300],
                    ['2018-4-12 01:00:00',350],
                    ['2018-4-12 14:00:00',29273],
                    ['2018-4-12 15:00:00',29273],
                    ['2018-4-12 16:05:00',2927],
                    ]
            },
            {
				name : 'anchor', // 其它数据X轴
				type : 'line',
				smooth : true,
				showSymbol : false,
				data : [
                    {
						name : '2018-4-12 00:00:00',
						value : [ '2018-4-12 00:00:00', 0 ]
					},
					{
						name : '2018-4-12 24:00:00',
						value : [ '2018-4-12 24:00:00', 0 ]
					}
                ],
				itemStyle : {
					normal : {
						opacity : 0
					}
				},
				lineStyle : {
					normal : {
						opacity : 0
					}
				}
			},
        ]
    };
    enterWaterEchart.setOption(enterWaterOption);
    trendEchart.setOption(trendOption);
    drugEchart.setOption(drugOption);
    electricEchart.setOption(electricOption);
    waterEchart.setOption(waterOption);
    // 实时进出水量切换
    $('.enter-water-title').on('click', 'li', function () {
        var index = $(this).index() // 0:cod 1:ss 2:TP 3:TN
        /*
            data由ajax获取
            格式
            data:[
                    ['2018-4-12 13:00:00',26],
                    ['2018-4-12 14:00:00',25],
                    ['2018-4-12 15:00:00',26],
                    ['2018-4-12 16:05:00',26],
                ]
        */
        if (index == 0) { // cod
            enterWaterEchart.setOption({
                series: {
                    data:[
                            ['2018-4-12 13:00:00',26],
                            ['2018-4-12 14:00:00',25],
                            ['2018-4-12 15:00:00',26],
                            ['2018-4-12 16:05:00',26],
                        ]
                }
            })
        }
        if (index == 1) { // ss
            enterWaterEchart.setOption({
                series: {
                    data: [
                            ['2018-4-12 13:00:00',26],
                            ['2018-4-12 14:00:00',22],
                            ['2018-4-12 15:00:00',26],
                            ['2018-4-12 16:05:00',26],
                    ]
                }
            })
        }
        if (index == 2) { // TP
            enterWaterEchart.setOption({
                series: {
                }
            })
        }
        if (index == 3) { // TN
            enterWaterEchart.setOption({
                series: {
                }
            })
        }
    })
    // 趋势分析切换
    $('.trend-title').on('click', 'li', function () {
        var index = $(this).index() // 0:cod 1:ss 2:TP 3:TN
        var tempOption = trendEchart.getOption();
        /*
            data由ajax获取
            格式
            data:[
                    ['2018-4-12 13:00:00',26],
                    ['2018-4-12 14:00:00',25],
                    ['2018-4-12 15:00:00',26],
                    ['2018-4-12 16:05:00',26],
                ]
        */
        if (index == 0) {
            tempOption.series[0].data = [];
            trendEchart.setOption(tempOption)
        }
        if (index == 1) { // ss
            tempOption.series[0].data = [];
            trendEchart.setOption(tempOption)
        }
        if (index == 2) { // TP
            tempOption.series[0].data = [];
            trendEchart.setOption(tempOption)
        }
        if (index == 3) { // TN
            tempOption.series[0].data = [];
            trendEchart.setOption(tempOption)
        }
    })
    // 实时药耗切换
    $('.drug-title').on('click', 'li', function () {
        var index = $(this).index() // 0:cod 1:ss 2:TP 3:TN
        /*
            data由ajax获取
             格式
            data:[
                    ['2018-4-12 13:00:00',26],
                    ['2018-4-12 14:00:00',25],
                    ['2018-4-12 15:00:00',26],
                    ['2018-4-12 16:05:00',26],
                ]
        */
        if (index == 0) { // 次氯酸钠
            drugEchart.setOption({
                series: {
                    data: []
                }
            })
        }
        if (index == 1) { // 柠檬酸
            drugEchart.setOption({
                series: {
                    data: []
                }
            })
        }
        if (index == 2) { // 除磷
            drugEchart.setOption({
                series: {
                    data: []
                }
            })
        }
        if (index == 3) { // 碳源
            drugEchart.setOption({
                series: {
                    data: []
                }
            })
        }
    })
    // 实时水量切换
    $('.water-title').on('click', 'li', function () {
        var index = $(this).index() // 0:cod 1:ss 2:TP 3:TN
        /*
            data由ajax获取
        */
        if (index == 0) { // 当天处理
            waterEchart.setOption({
                series: {
                    data: []
                }
            })
        }
        if (index == 1) { // 调节池
            waterEchart.setOption({
                series: {
                    data: []
                }
            })
        }
        if (index == 2) { // 膜池
            waterEchart.setOption({
                series: {
                    data: []
                }
            })
        }
        if (index == 3) { // DO
            waterEchart.setOption({
                series: {
                    data: []
                }
            })
        }
        if (index == 4) { // DRP
            waterEchart.setOption({
                series: {
                    data: []
                }
            })
        }
        if (index == 5) { // MLSS
            waterEchart.setOption({
                series: {
                    data: []
                }
            })
        }
    })
    /**
     * 报表自适应
     */
    window.addEventListener("resize", function () {
        enterWaterEchart.resize();
        trendEchart.resize();
        drugEchart.resize();
        electricEchart.resize();
        waterEchart.resize();
    })
    /*====================智能工单+实时信息====================*/
    // 工单自动滚动
    var jobInterval = setInterval('autoScroll(".job-list:nth-of-type(1)",5)', 3000);
    // 实时信息自动滚动
    var imformationInterval = setInterval('autoScroll(".information-list",5)', 3000);
    /** 
     * 工单切换
    */
    $('.job-title').on('click', 'li', function (){
        clearInterval(jobInterval)
        var $contentItem = $(this).parents('.job-item');
        var $contentList = $contentItem.find('.job-list'); // 内容列表
        var index = $(this).index();
        $contentList.removeClass('list-show').eq(index).addClass('list-show');
        jobInterval = setInterval(function(){
            autoScroll($contentList.eq(index),5)
        }, 3000);
    })
    /**
     * 实时信息切换
    */
   $('.information-title').on('click', 'li', function (){
    clearInterval(imformationInterval)
    var $contentItem = $(this).parents('.information-item');
    var $contentList = $contentItem.find('.information-list'); // 内容列表
    var index = $(this).index();
    $contentList.removeClass('list-show').eq(index).addClass('list-show');
    imformationInterval = setInterval(function(){
        autoScroll($contentList.eq(index),5)
    }, 3000);
    })

    /*====================厂站列表====================*/
    var stationSerach = document.querySelector('.station-serach');
    var $stationPopup = $('.station-popup'); //厂站列表弹窗
    var stationSubmit = document.querySelector('.station-submit');
    // 打开厂站并初始化
    stationSerach.addEventListener('click',function(){
        $('.shade').fadeIn();
        $stationPopup.fadeIn();
        $('.station-comboTree').combotree({
            // data: '../data/treegrid_data1.json',
            width: 170,
            height: 30,
            hasDownArrow: false
        });
    })
    // 选择厂站
    $stationPopup.on('click','.station-name',function(){
        $stationPopup.find('.station-name').removeClass('station-name-active');
        $(this).addClass('station-name-active');
    });
    // 提交
    stationSubmit.addEventListener('click',function(){
        var $popup= $(this).parents('.popup');
        var $stationChecked = $popup.find('.station-name-active');
        if($stationChecked.length === 1){
            new CustomPrompt({
                type: 'success',
                msg: '提交成功'
            });
            $popup.fadeOut();
            $('.shade').fadeOut();
        }else{
            new CustomPrompt({
                type: 'default',
                msg: '至少选择一个厂站'
            });
        }
    });
    // 关闭厂站列表
    $('.popup .close-icon').on('click',function(){
        $(this).parents('.popup').fadeOut();
        $('.shade').fadeOut();
    });


    /*====================其它====================*/
    // 点击title改变颜色
    $('.item-title li').on('click', function () {
        $(this).parents('.item-title').find('li').removeClass('li-checked');
        $(this).addClass('li-checked');
    });

});
/*====================其它方法====================*/
// 自动滚动函数
function autoScroll(node, num) { //node:ul节点 num:一个框能存放的li数量
    var $this = $(node);
    var height = $this.find('li').height();
    var $liFirst = $this.find('li:nth-of-type(1)');
    if ($this.find('li').length > num) {
        $this.animate({
            top: -height + 'px'
        }, 1000, function () {
            var $tempLi = $liFirst.clone();
            $liFirst.remove();
            $this.append($tempLi).css('top', '0');
        })
    }
}

