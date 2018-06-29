$(function () {
    // ======================================下拉树======================================
    $('#client').combotree({
        url: '../data/tree_data1.json',
        method: 'get',
        width: 250,
        height: 30,
        hasDownArrow: false
    });

    // ======================================初始化选择时间======================================
    lay('.chose-time').each(function (e) {
        var _this = this;
        laydate.render({
            elem: this,
            type: 'time',
        })
    })

    // ======================================添加数据======================================
    var addBtn = document.getElementsByClassName('add-btn')[0];
    addBtn.addEventListener('click', function () {

        var content = '';
        content += '<div class="item">';
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

    // ======================================删除数据======================================
    $('.add-data').on('click', '.delete-btn', function () {
        var num = getItemNum();
        if (num == 1) {
            return
        }
        $(this).parent().remove();
        ProhibitionOfOperation()
    })
    // ======================================选择位置======================================
    $('.add-data').on('change', '.chose-eq', function () {
        if (this.value === '0') {
            return
        }

        var content = '';
        for (var i = 0; i < 3; i++) {
            content += '<a class="checkbox-wrapper">';
            content += '<i></i>';
            content += '<input type="checkbox" class="check-row" />'
            content += '</a>';
            content += '<span class="m10">数据' + i + '</span>'
        }

        $(this).siblings('.checkbox-wrapper, span').remove();
        $(this).after(content);
        common.commonCheckbox('.item')
    })

    // ======================================生成报表======================================

    var echartBtn = document.getElementsByClassName('echart-btn')[0];
    echartBtn.addEventListener('click', function () {
        var num = getItemNum();
        var $echartWrapper = $('#echartWrapper');
        console.log(num)
        var div = '';
        for (var i = 0; i < num; i++) {
            div += '<div class="echart' + i + '">';
            div += '<div class="echart-title">工艺位置-设备名称</div>';
            div += '<div id="echart' + i + '"></div>';
            div += '</div>';
        }
        $echartWrapper.empty();
        $echartWrapper.append(div);
        // 模拟数据
        var anchor = [{
                name: '2016-12-18 00:00:00',
                value: ['2016-12-18 00:00:00', 0]
            },
            {
                name: '2016-12-19 00:00:00',
                value: ['2016-12-19 00:00:00', 0]
            }
        ];
        var waterData = [{
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
            }
        ];
        var waterData1 = [{
                name: '2016-12-18 00:00:00',
                value: ['2016-12-18 00:00:00', 30234]
            },
            {
                name: '2016-12-18 1:38:08',
                value: ['2016-12-18 1:38:08', 30234]
            },
            {
                name: '2016-12-18 2:38:08',
                value: ['2016-12-18 2:38:08', 30234]
            },
            {
                name: '2016-12-18 3:38:08',
                value: ['2016-12-18 3:38:08', 30234]
            },
            {
                name: '2016-12-18 6:38:08',
                value: ['2016-12-18 6:38:08', 30234]
            },
            {
                name: '2016-12-18 13:38:18',
                value: ['2016-12-18 13:38:18', 30234]
            },
            {
                name: '2016-12-18 14:38:18',
                value: ['2016-12-18 14:38:18', 30234]
            },
            {
                name: '2016-12-18 16:38:18',
                value: ['2016-12-18 16:38:18', 30234]
            },
            {
                name: '2016-12-18 16:48:18',
                value: ['2016-12-18 16:48:18', 30234]
            },
            {
                name: '2016-12-18 17:58:18',
                value: ['2016-12-18 17:58:18', 30234]
            },
            {
                name: '2016-12-18 19:18:18',
                value: ['2016-12-18 19:18:18', 30234]
            }
        ];

        var option = {
            backgroundColor: '#f6f4f3',
            textStyle: {
                color: '#999'
            },
            legend: {
                data: ['电压', '电流'],
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
                        color: '#dbdbdb'
                    }
                },
            }],
            yAxis: {
                type: 'value',
                name: '曲线',
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
                    data: waterData,
                    showSymbol: false,
                },
                {
                    name: '电流',
                    type: 'line',
                    smooth: true,
                    data: waterData1,
                    showSymbol: false,
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
                }
            ],
            color: ['#6bbc71', '#469dc0', '#958bc2', '#e57855', '#2fcbf9'],
        }

        for (var j = 0; j < num; j++) {
            echarts.init(document.getElementById('echart' + j + '')).setOption(option);
        }
    })
})

// 得到item的数量

function getItemNum() {
    var num = document.getElementsByClassName('item').length
    return num; 
}


// =========================修改新增的2018.5.10=========================
//   当数据达到最小时，禁止操作  (在删除和添加方法中调用了这个方法)
function ProhibitionOfOperation(){
    var num= getItemNum()
    if (num==1) {
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
    } else{
        $('.add-btn').css({
            cursor: 'pointer',
            display: 'block',
        })
    }
    console.log(num)
}
//======================================================================