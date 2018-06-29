// 初始化数据
// window.onload = init;
// 模拟数据
var waterData = [
    {
        name: '2016-12-18 00:00:00',
        value: ['2016-12-18 00:00:00', 0]
    },
    {
        name: '2016-12-18 1:38:08',
        value: ['2016-12-18 1:38:08', 1180]
    },
    {
        name: '2016-12-18 2:38:08',
        value: ['2016-12-18 2:38:08', 3180]
    },
    {
        name: '2016-12-18 3:38:08',
        value: ['2016-12-18 3:38:08', 6180]
    },
    {
        name: '2016-12-18 6:38:08',
        value: ['2016-12-18 6:38:08', 16180]
    },
    {
        name: '2016-12-18 13:38:18',
        value: ['2016-12-18 13:38:18', 25234]
    },
    {
        name: '2016-12-18 14:38:18',
        value: ['2016-12-18 14:38:18', 28234]
    },
    {
        name: '2016-12-18 16:38:18',
        value: ['2016-12-18 16:38:18', 30234]
    },
    {
        name: '2016-12-18 16:48:18',
        value: ['2016-12-18 16:48:18', 31234]
    },
    {
        name: '2016-12-18 17:58:18',
        value: ['2016-12-18 17:58:18', 32456]
    },
    {
        name: '2016-12-18 19:18:18',
        value: ['2016-12-18 19:18:18', 42651]
    }];
var energyData = [
    {
        name: '2016-12-18 00:00:00',
        value: ['2016-12-18 00:00:00', 1150]
    },
    {
        name: '2016-12-18 1:38:08',
        value: ['2016-12-18 1:38:08', 1180]
    },
    {
        name: '2016-12-18 2:38:08',
        value: ['2016-12-18 2:38:08', 1160]
    },
    {
        name: '2016-12-18 3:38:08',
        value: ['2016-12-18 3:38:08', 1090]
    },
    {
        name: '2016-12-18 6:38:08',
        value: ['2016-12-18 6:38:08', 1149]
    },
    {
        name: '2016-12-18 13:38:18',
        value: ['2016-12-18 13:38:18', 1120]
    },
    {
        name: '2016-12-18 14:38:18',
        value: ['2016-12-18 14:38:18', 1106]
    },
    {
        name: '2016-12-18 16:38:18',
        value: ['2016-12-18 16:38:18', 1188]
    },
    {
        name: '2016-12-18 16:48:18',
        value: ['2016-12-18 16:48:18', 1156]
    },
    {
        name: '2016-12-18 17:58:18',
        value: ['2016-12-18 17:58:18', 1100]
    },
    {
        name: '2016-12-18 19:18:18',
        value: ['2016-12-18 19:18:18', 1160]
    }];
var anchor = [
    {
        name: '2016-12-18 00:00:00',
        value: ['2016-12-18 00:00:00', 0]
    },
    {
        name: '2016-12-19 00:00:00',
        value: ['2016-12-19 00:00:00', 0]
    }];


var m500 = [
    {
        name: '2017-12-01',
        value: ['2017-12-01', 1.3]
    },
    {
        name: '2017-12-03',
        value: ['2017-12-03', 1.4]
    },
    {
        name: '2017-12-04',
        value: ['2017-12-04', 1.2]
    },
    {
        name: '2017-12-05',
        value: ['2017-12-05', 1.3]
    },
    {
        name: '2017-12-08',
        value: ['2017-12-08', 0.9]
    },
    {
        name: '2017-12-13',
        value: ['2017-12-13', 0.8]
    },
    {
        name: '2017-12-18',
        value: ['2017-12-18', 1.1]
    },
    {
        name: '2017-12-21',
        value: ['2017-12-21', 1.0]
    },
    {
        name: '2017-12-23',
        value: ['2017-12-23', 1.2]
    },
    {
        name: '2017-12-28',
        value: ['2017-12-28', 1.3]
    }];

var m1000 = [
    {
        name: '2017-12-01',
        value: ['2017-12-01', 1.5]
    },
    {
        name: '2017-12-03',
        value: ['2017-12-03', 1.2]
    },
    {
        name: '2017-12-04',
        value: ['2017-12-04', 1.3]
    },
    {
        name: '2017-12-05',
        value: ['2017-12-05', 1.4]
    },
    {
        name: '2017-12-08',
        value: ['2017-12-08', 1.5]
    },
    {
        name: '2017-12-13',
        value: ['2017-12-13', 1.3]
    },
    {
        name: '2017-12-18',
        value: ['2017-12-18', 1.1]
    },
    {
        name: '2017-12-21',
        value: ['2017-12-21', 1.3]
    },
    {
        name: '2017-12-23',
        value: ['2017-12-23', 1.2]
    },
    {
        name: '2017-12-28',
        value: ['2017-12-28', 1.1]
    }];

var m1500 = [
    {
        name: '2017-12-01',
        value: ['2017-12-01', 1.3]
    },
    {
        name: '2017-12-03',
        value: ['2017-12-03', 1.1]
    },
    {
        name: '2017-12-04',
        value: ['2017-12-04', 1.2]
    },
    {
        name: '2017-12-05',
        value: ['2017-12-05', 1.3]
    },
    {
        name: '2017-12-08',
        value: ['2017-12-08', 1.2]
    },
    {
        name: '2017-12-13',
        value: ['2017-12-13', 1.3]
    },
    {
        name: '2017-12-18',
        value: ['2017-12-18', 1.2]
    },
    {
        name: '2017-12-21',
        value: ['2017-12-21', 1.3]
    },
    {
        name: '2017-12-23',
        value: ['2017-12-23', 1.2]
    },
    {
        name: '2017-12-28',
        value: ['2017-12-28', 1.1]
    }];

var m2000 = [
    {
        name: '2017-12-01',
        value: ['2017-12-01', 1.1]
    },
    {
        name: '2017-12-03',
        value: ['2017-12-03', 1.0]
    },
    {
        name: '2017-12-04',
        value: ['2017-12-04', 0.9]
    },
    {
        name: '2017-12-05',
        value: ['2017-12-05', 0.9]
    },
    {
        name: '2017-12-08',
        value: ['2017-12-08', 1.0]
    },
    {
        name: '2017-12-13',
        value: ['2017-12-13', 1.0]
    },
    {
        name: '2017-12-18',
        value: ['2017-12-18', 0.9]
    },
    {
        name: '2017-12-21',
        value: ['2017-12-21', 1.0]
    },
    {
        name: '2017-12-23',
        value: ['2017-12-23', 1.1]
    },
    {
        name: '2017-12-28',
        value: ['2017-12-28', 1.1]
    }];

var anchor1 = [
    {
        name: '2017-12-01',
        value: ['2017-12-01', 0]
    },
    {
        name: '2017-12-28',
        value: ['2017-12-28', 0]
    }
];

// =====================================处理水量=====================================
var echart1 = echarts.init(document.getElementById('water'));
var option1 = {
    backgroundColor: 'transformable',
    textStyle: {
        color: '#5be8eb'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            var time = params[0].value[0];
            var value = params[0].value[1];
            var cir = '<div class="cir green"></div>';
            var index = time.indexOf(' ') + 1;
            var showTime = time.split('').splice(index).join('');
            return showTime + '<br>' + cir + '处理水量：' + value + 'm³';
        }
    },
    legend: {
        icon: 'rect',
        itemWidth: 10,
        itemHeight: 2,
        itemGap: 13,
        data: ['处理水量'],
        top: '15px',
        right: '4%',
        widht: 10,
        height: 2,
        textStyle: {
            fontSize: 12,
            color: '#5be8eb'
        }
    },
    grid: {
        top: '50px',
        left: '70px',
        right: '50px',
        bottom: '40px',
    },
    xAxis: [{
        type: 'time',
        name: 'h',
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#184877'
            }
        },
    }],
    yAxis: [{
        type: 'value',
        name: 'm³',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#184877'
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 14
            }
        },
        splitLine: {
            lineStyle: {
                color: '#1b385d'
            }
        }
    }],
    series: [{
        name: '处理水量',
        type: 'line',
        smooth: true,
        showSymbol: false,
        label: {
            show: false,
        },
        lineStyle: {
            normal: {
                width: 1
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(56, 255, 228, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(56, 255, 228, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: '#5ed66f',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12
            },
            emphasis: {
                color: '#5ed66f',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12
            }
        },
        data: waterData,
        markPoint: {
            data: [
                {
                    type: 'max',
                    label: {
                        normal: {
                            show: true,
                            formatter: '{c}m³',
                            position: 'top',
                            color: '#5be8eb',
                            fontSize: '12'
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: '#5be8eb',
                            borderColor: 'rgba(160, 212, 104, 0.3)',
                            borderWidth: '12', // 标注边线线宽，单位px，默认为1
                        }
                    },
                    symbol: 'circle',
                    symbolSize: 12,
                }
            ]
        }
    },
    {
        name: '',
        type: 'line',
        data: anchor,
        itemStyle: {
            normal: {
                opacity: 0
            }
        },
        lineStyle: {
            normal: {
                opacity: 0
            }
        },
        showSymbol: false
    }]
};
echart1.setOption(option1);

// =====================================实时能耗=====================================
var echart2 = echarts.init(document.getElementById('energy'));
var option2 = {
    backgroundColor: 'transformable',
    textStyle: {
        color: '#35e1e4'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            var time = params[0].value[0];
            var value = params[0].value[1];
            var cir = '<div class="cir yellow"></div>';
            var index = time.indexOf(' ') + 1;
            var showTime = time.split('').splice(index).join('');
            return showTime + '<br>' + cir + '实时能耗：' + value + 'kW';
        }
    },
    grid: {
        top: '35px',
        left: '60px',
        right: '50px',
        bottom: '40px',
    },
    xAxis: [{
        type: 'time',
        name: 'h',
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#184877'
            }
        },
    }],
    yAxis: [{
        type: 'value',
        name: 'kW',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#184877'
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 14
            }
        },
        splitLine: {
            lineStyle: {
                color: '#1b385d'
            }
        },
        min: '0',
        max: '2000',
        splitNumber: 4
    }],
    series: [{
        name: '实时能耗',
        type: 'line',
        smooth: true,
        showSymbol: false,
        label: {
            show: false,
        },
        lineStyle: {
            normal: {
                width: 1
            }
        },
        itemStyle: {
            normal: {
                color: '#ff8257',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12
            },
            emphasis: {
                color: '#ff8257',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12
            }
        },
        data: energyData,
        markPoint: {
            data: [
                {
                    type: 'max',
                    label: {
                        normal: {
                            show: true,
                            formatter: '{c}kW',
                            position: 'top',
                            color: '#ff8257',
                            fontSize: '12'
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: '#ff8257',
                            borderColor: 'rgba(160, 212, 104, 0.3)',
                            borderWidth: '12', // 标注边线线宽，单位px，默认为1
                        }
                    },
                    symbol: 'circle',
                    symbolSize: 12,
                },
                {
                    type: 'min',
                    label: {
                        normal: {
                            show: true,
                            formatter: '{c}kW',
                            position: 'top',
                            color: '#ff8257',
                            fontSize: '12'
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: '#ff8257',
                            borderColor: 'rgba(160, 212, 104, 0.3)',
                            borderWidth: '12', // 标注边线线宽，单位px，默认为1
                        }
                    },
                    symbol: 'circle',
                    symbolSize: 12,
                }
            ]
        }
    },
    {
        name: '',
        type: 'line',
        data: anchor,
        itemStyle: {
            normal: {
                opacity: 0
            }
        },
        lineStyle: {
            normal: {
                opacity: 0
            }
        },
        showSymbol: false
    }]
};
echart2.setOption(option2);

// =====================================吨水成本=====================================
var echart3 = echarts.init(document.getElementById('cost'));
var option3 = {
    backgroundColor: 'transformable',
    textStyle: {
        color: '#5be8eb'
    },
    legend: {
        icon: 'rect',
        itemWidth: 10,
        itemHeight: 2,
        itemGap: 13,
        data: ['500m³', '1000m³', '1500m³', '2000m³'],
        top: '15px',
        right: '4%',
        widht: 10,
        height: 2,
        textStyle: {
            fontSize: 12,
            color: '#5be8eb'
        }
    },
    tooltip: {
        trigger: 'axis',
    },
    grid: {
        top: '50px',
        left: '60px',
        right: '50px',
        bottom: '40px',
    },
    xAxis: [{
        type: 'time',
        name: '日',
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#184877'
            }
        },
    }],
    yAxis: [{
        type: 'value',
        name: '元',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#184877'
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 14
            }
        },
        splitLine: {
            lineStyle: {
                color: '#1b385d'
            }
        },
        min: '0',
        max: '2',
        splitNumber: 4
    }],
    series: [{
        name: '500m³',
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
            normal: {
                width: 1
            }
        },
        itemStyle: {
            normal: {
                color: '#01fb7f',
            },
            emphasis: {
                color: '#01fb7f',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12
            }
        },
        data: m500,
    },
    {
        name: '1000m³',
        type: 'line',
        smooth: true,
        showSymbol: false,
        label: {
            show: false,
        },
        lineStyle: {
            normal: {
                width: 1
            }
        },
        itemStyle: {
            normal: {
                color: '#49a5cb',
            },
            emphasis: {
                color: '#49a5cb',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12
            }
        },
        data: m1000,
    },
    {
        name: '1500m³',
        type: 'line',
        smooth: true,
        showSymbol: false,
        label: {
            show: false,
        },
        lineStyle: {
            normal: {
                width: 1
            }
        },
        itemStyle: {
            normal: {
                color: '#9d8fe4',
            },
            emphasis: {
                color: '#9d8fe4',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12
            }
        },
        data: m1500,
    },
    {
        name: '2000m³',
        type: 'line',
        smooth: true,
        showSymbol: false,
        label: {
            show: false,
        },
        lineStyle: {
            normal: {
                width: 1
            }
        },
        itemStyle: {
            normal: {
                color: '#f07c57',
            },
            emphasis: {
                color: '#f07c57',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12
            }
        },
        data: m2000,
    },
    ]
};
echart3.setOption(option3);

// =====================================中国地图=====================================
var echart4 = echarts.init(document.getElementById('chinaMap'));
var option4 = {
    backgroundColor: 'transformable',
    "tooltip": {
        "show": true,
        "padding": 0,
        "backgroundColor": "rgba(255,255,255,0)",
        "formatter": function (params) {
            var name = params.name;
            var number = isNaN(params.value) ? 0 : params.value;
            return name + '：' + number + '个站点'
        }
    },
    "series": [
        {
            "name": "中国",
            "type": "map",
            "mapType": "china",
            "zoom": 1.2,
            "itemStyle": {
                "normal": {
                    "areaColor": "#103a65",
                    "borderWidth": 1.5,
                    "borderColor": "#1f5c94",
                    "label": {
                        "show": true
                    }
                },
                "emphasis": {
                    "areaColor": "#74c0ed",
                    "label": {
                        "show": true
                    }
                }
            },
            "label": {
                "normal": {
                    "show": false,
                },
                "emphasis": {
                    "show": false
                }
            },
            "data": [
                {
                    "value": 38,
                    "name": "四川",
                    "itemStyle": {
                        "normal": {
                            "color": "#74c0ed",
                            "label": {
                                "show": true,
                                "textStyle": {
                                    "color": "#000",
                                    "fontSize": 12
                                },
                            }
                        }
                    }
                }
            ],
            "markPoint": {
                "symbol": "pin",
                "symbolSize": 60,
                "data": [
                    {
                        "name": "简阳",
                        "coord": [
                            104.53, 30.38
                        ],
                        "value": '38',
                        "label": {
                            "normal": {
                                "show": true,
                                "formatter": '38',
                            }
                        },
                    },
                    {
                        "name": "北京",
                        "coord": [
                            116.40, 39.9
                        ],
                        "symbol": "image://../images/proImg/start.png",
                        "symbolSize": 10,
                        "value": '0',
                        "label": {
                            "normal": {
                                "show": true,
                                "formatter": '中华人民共和国',
                                "offset": [0, -20],
                                "textStyle": {
                                    "color": "#5be8eb",
                                    "fontSize": 14
                                },
                            },
                        },
                    },
                ]
            },
        }
    ]
};
echart4.setOption(option4);

// ====================================报表自适应====================================
window.addEventListener('resize', function () {
    echart1.resize();
    echart2.resize();
    echart3.resize();
    echart4.resize();
})

// ====================================其余函数====================================

// 获取当前时间
// function getTime() {
//     var showDate = document.getElementsByClassName('show-date')[0];
//     var today = new Date();
//     var year = today.getFullYear();
//     var month = today.getMonth() + 1;
//     var tian = today.getDate();
//     var week = '';
//     switch (today.getDay()) {
//         case 0:
//             week = '星期天';
//             break;
//         case 1:
//             week = '星期一';
//             break;
//         case 2:
//             week = '星期二';
//             break;
//         case 3:
//             week = '星期三';
//             break;
//         case 4:
//             week = '星期四';
//             break;
//         case 5:
//             week = '星期五';
//             break;
//         case 6:
//             week = '星期六';
//             break;
//     }
//     showDate.firstElementChild.innerHTML = year + '年' + month + '月' + tian + '日,' + week;
// }

// 上下滚动数据
function autoScroll(obj) {
    var type = $('.info-title .active').index();
    var $obj = $(obj);
    var height = $obj.find('ul li').height();
    var index = type == 0 ? 5 : 6;
    var reg = (index - 1) * 5;
    if ($obj.find('ul li').length > reg) {
            $obj.find("ul").animate({
                marginTop: -height + 'px'
            }, 1000, function () {
                if (index == 6) {
                    $(this).css({
                        marginTop: "0px"
                    }).find('li:nth-child(1), li:nth-child(2), li:nth-child(3), li:nth-child(4), li:nth-child(5)').appendTo(this);
                } else {
                    $(this).css({
                        marginTop: "0px"
                    }).find('li:nth-child(1), li:nth-child(2), li:nth-child(3), li:nth-child(4)').appendTo(this);
                }
        })
    }
}

// 切换预警、告警、故障信息
$('.info-title>div').not('.warn-icon').on('click', function () {
    var $this = $(this);
    var index = $this.index();
    var $ul = $('.option>ul');
    // 模拟数据数据
    var li1 = '';
    var li2 = '';       
    var li3 = '';  
    
    li1 += '<li class="padleft20"><i class="j1"></i>';
    li1 += '<span title="2018.1.10  13:55:12">2018.1.10 13:55:12</span></li>';
    li1 += '<li title="三星镇污水处理厂">三星镇污水处理厂</li>';
    li1 += '<li title="SS检测仪">SS检测仪</li>';
    li1 += '<li title="SS水质超标">SS水质超标</li>';
    li1 += '<li class="padleft20"><i class="j1"></i>';
    li1 += '<span title="2018.1.10  15:25:32">2018.1.10 15:25:32</span></li>';
    li1 += '<li title="青龙镇污水处理厂">青龙镇污水处理厂</li>';
    li1 += '<li title="COD检测仪">COD检测仪</li>';
    li1 += '<li title="COD水质超标">COD水质超标</li>';
    li1 += '<li class="padleft20"><i class="j1"></i>';
    li1 += '<span title="2018.1.10  16:25:36">2018.1.10 16:25:36</span></li>';
    li1 += '<li title="五星乡污水处理厂">五星乡污水处理厂</li>';
    li1 += '<li title="TP检测仪">TP检测仪</li>';
    li1 += '<li title="TP水质超标">TP水质超标</li>';
    li1 += '<li class="padleft20"><i class="j1"></i>';
    li1 += '<span title="2018.1.10  12:42:35">2018.1.10 12:42:35</span></li>';
    li1 += '<li title="东溪乡污水处理厂">东溪乡污水处理厂</li>';
    li1 += '<li title="TN检测仪">TN检测仪</li>';
    li1 += '<li title="TN水质超标">TN水质超标</li>';
    li1 += '<li class="padleft20"><i class="j1"></i>';
    li1 += '<span title="2018.1.10  17:24:32">2018.1.10 17:24:32</span></li>';
    li1 += '<li title="灵仙乡污水处理厂">灵仙乡污水处理厂</li>';
    li1 += '<li title="COD检测仪">COD检测仪</li>';
    li1 += '<li title="COD水质超标">COD水质超标</li>';
    li1 += '<li class="padleft20"><i class="j1"></i>';
    li1 += '<span title="2018.1.10  19:55:12">2018.1.10 19:55:12</span></li>';
    li1 += '<li title="石盘镇污水处理厂">石盘镇污水处理厂</li>';
    li1 += '<li title="SS检测仪">SS检测仪</li>';
    li1 += '<li title="SS水质超标">SS水质超标</li>';

    li2 += '<li class="padleft20"><i class="j2"></i>';
    li2 += '<span title="2018.1.11  16:12:01">2018.1.11 16:12:01</span></li>';
    li2 += '<li title="玉成乡污水处理厂">玉成乡污水处理厂</li>';
    li2 += '<li title="提升泵">提升泵</li>';
    li2 += '<li title="故障">故障</li>';
    li2 += '<li title="处理中">谢家树-处理中</li>';

    li3 += '<li class="padleft20"><i class="j3"></i>';
    li3 += '<span title="2018.1.10  18:32:51">2018.1.10 18:32:51</span></li>';
    li3 += '<li title="平息乡污水处理厂">平息乡污水处理厂</li>';
    li3 += '<li title="提升泵">提升泵</li>';
    li3 += '<li title="故障">故障</li>';
    li3 += '<li title="处理中">郑兴伦-处理中</li>';

    switch (index) {
        case 0:
            $ul.html(li1).find('li').css({
                width: '25%'
            });
            break;
        case 1: 
            $ul.html(li2).find('li').css({
                width: '20%'
            });
            break;
        case 2: 
            $ul.html(li3).find('li').css({
                width: '20%'
            });
            break;
    };
    $this.addClass('active').siblings().removeClass('active');
})

$('.cnp>div').on('click', function () {
    var $this = $(this);
    var type = '';
    var val = 0;
    var value1 = 0;
    var value2 = 0;
    var value3 = 0;
    var $day = $('.tree-data .day');
    var $month = $('.reduce-wrapper .month');
    var $season = $('.reduce-wrapper .season');
    var $year = $('.reduce-wrapper .year');
    var index = $this.index();
    switch (index) {
        case 0:
            type = 'COD';
            val = 8.5;
            value1 = 255.00;
            value2 = 765.00;
            value3 = 3060.00;
            break;
        case 1: 
            type = '氨氮';
            val = 1.74;
            value1 = 52.20;
            value2 = 156.60;
            value3 = 635.10;
            break;
        case 2: 
            type = '总磷';
            val = 0.18;
            value1 = 5.40;
            value2 = 16.20;
            value3 = 65.70;
            break;
    };
    $day.find('span').first().text(type).end().last().text(val);
    $month.find('span').first().text(type).end().last().text(value1);
    $season.find('span').first().text(type).end().last().text(value2);
    $year.find('span').first().text(type).end().last().text(value3);
    $this.addClass('active').siblings().removeClass('active');
})

var info = setInterval('autoScroll(".site-info .option")', 5000);

// 鼠标移入停止滚动，移除开始滚动
var inforOption = document.getElementsByClassName('option')[0];
inforOption.addEventListener('mouseenter', function () {
    window.clearInterval(info);
})
inforOption.addEventListener('mouseleave', function () {
    info = setInterval('autoScroll(".site-info .option")', 5000);
})


// 初始化数据
// function init() {
//     getTime();
// }