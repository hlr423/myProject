$(function () {
    // ======================================初始化时间选择器======================================
    lay('.chose-time').each(function (e) {
        var _this = this;
        laydate.render({
            elem: this,
            type: 'datetime',
            theme: 'date'
        })
    })

    // ======================================表格======================================
    var $dg = $('#dg');
    var tempOption = [];
    var isFirst = true; // 第一次全选
    $dg.datagrid({
        fit: true,
        fitColumns: true,
        rownumbers: true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'ck',
                    checkbox: true
                },
                {
                    field: 'a',
                    title: '序号',
                    width: 60,
                },
                {
                    field: 'b',
                    title: '曲线名称',
                    width: 50
                },
                {
                    field: 'c',
                    title: '最小值',
                    width: 60
                },
                {
                    field: 'd',
                    title: '最大值',
                    width: 20
                },
                {
                    field: 'e',
                    title: '平均值',
                    width: 20
                },
                {
                    field: 'f',
                    title: '状态',
                    width: 30
                },
            ]
        ],
        onSelect: function (index, row) {
            row.f = '显示';
            $dg.datagrid('refreshRow', index);
            var option = echart1.getOption(); // 获取echats 配置
            option.series[index].data = tempOption[index];
            echart1.setOption({
                series: option.series
            })
            
        },
        onUnselect: function (index, row) {
            row.f = '隐藏';
            $dg.datagrid('refreshRow', index);
            var option = echart1.getOption(); // 获取echats 配置
            tempOption[index] = option.series[index].data;
            option.series[index].data = [];
            echart1.setOption({
                series: option.series
            })
        },
        onSelectAll: function (rows) {
            if (isFirst === true) {
                isFirst = false;
                return;
            }
            rows.forEach(function (item, index) {
                item.f = '显示';
                $dg.datagrid('refreshRow', index);
                var option = echart1.getOption(); // 获取echats 配置
                option.series[index].data = tempOption[index];
                echart1.setOption({
                    series: option.series
                })
            })
        },
        onUnselectAll: function (rows) {
            rows.forEach(function (item, index) {
                item.f = '隐藏';
                $dg.datagrid('refreshRow', index);

                var option = echart1.getOption(); // 获取echats 配置
                tempOption[index] = option.series[index].data;
                option.series[index].data = [];
                echart1.setOption({
                    series: option.series
                })
            })
        },
        onLoadSuccess:function(){
            // 默认选中所有
            $dg.datagrid('selectAll');
        }
    });
})

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
var waterData2 = [
    {
        name: '2016-12-18 00:00:00',
        value: ['2016-12-18 00:00:00', 120]
    },
    {
        name: '2016-12-18 1:38:08',
        value: ['2016-12-18 1:38:08', 800]
    },
    {
        name: '2016-12-18 2:38:08',
        value: ['2016-12-18 2:38:08', 1180]
    },
    {
        name: '2016-12-18 3:38:08',
        value: ['2016-12-18 3:38:08', 3180]
    },
    {
        name: '2016-12-18 6:38:08',
        value: ['2016-12-18 6:38:08', 4180]
    },
    {
        name: '2016-12-18 13:38:18',
        value: ['2016-12-18 13:38:18', 5334]
    },
    {
        name: '2016-12-18 14:38:18',
        value: ['2016-12-18 14:38:18', 4234]
    },
    {
        name: '2016-12-18 16:38:18',
        value: ['2016-12-18 16:38:18', 6234]
    },
    {
        name: '2016-12-18 16:48:18',
        value: ['2016-12-18 16:48:18', 7234]
    },
    {
        name: '2016-12-18 17:58:18',
        value: ['2016-12-18 17:58:18', 3456]
    },
    {
        name: '2016-12-18 19:18:18',
        value: ['2016-12-18 19:18:18', 4651]
    },
    {
        name: '2016-12-18 20:18:18',
        value: ['2016-12-18 20:18:18', 6651]
    }];
    var waterData3 = [
        {
            name: '2016-12-18 00:00:00',
            value: ['2016-12-18 00:00:00', 520]
        },
        {
            name: '2016-12-18 1:38:08',
            value: ['2016-12-18 1:38:08', 500]
        },
        {
            name: '2016-12-18 2:38:08',
            value: ['2016-12-18 2:38:08', 2580]
        },
        {
            name: '2016-12-18 3:38:08',
            value: ['2016-12-18 3:38:08', 8580]
        },
        {
            name: '2016-12-18 6:38:08',
            value: ['2016-12-18 6:38:08', 2580]
        },
        {
            name: '2016-12-18 13:38:18',
            value: ['2016-12-18 13:38:18', 6534]
        },
        {
            name: '2016-12-18 14:38:18',
            value: ['2016-12-18 14:38:18', 3534]
        },
        {
            name: '2016-12-18 16:38:18',
            value: ['2016-12-18 16:38:18', 4534]
        },
        {
            name: '2016-12-18 16:48:18',
            value: ['2016-12-18 16:48:18', 2534]
        },
        {
            name: '2016-12-18 17:58:18',
            value: ['2016-12-18 17:58:18', 6556]
        },
        {
            name: '2016-12-18 19:18:18',
            value: ['2016-12-18 19:18:18', 5551]
        },
        {
            name: '2016-12-18 20:18:18',
            value: ['2016-12-18 20:18:18', 3551]
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
var echart1 = echarts.init(document.getElementById('echart'));
var option = {
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            if (params.length === 1 && params[0].seriesName === '') {
                return ;
            } 
            var nameArr = [];
            var timeArr = [];
            var valueArr = [];
            var colorArr = [];
            var node = '';
            var time = params[0].axisValueLabel;
            node += time;
            for (var i = 0; i < params.length; i++) {
                if (params[i].seriesName === '') {
                    break ;
                }
                var name = params[i].seriesName;
                var value = params[i].data.value[1];
                var color = params[i].color;
                nameArr.push(name);
                valueArr.push(value);
                colorArr.push(color);
                
                node += '</br>' + '<div style="width: 10px; height: 10px; margin-right: 5px; display: inline-block; border-radius: 5px; background-color: ' + colorArr[i] + '"></div>' + nameArr[i] + '：' + valueArr[i];
            }
            return node;
        }
    },
    grid : {
		left : '10px',
		right : '15px',
		bottom : '10px',
		containLabel : true
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
        name: '曲线1',
        type: 'line',
        // smooth: true,
        showSymbol: false,
        label: {
            show: false,
        },
        lineStyle: {
            normal: {
                width: 4
            }
        },
        data: waterData,
    },
    {
        name: '曲线2',
        type: 'line',
        // smooth: true,
        showSymbol: false,
        label: {
            show: false,
        },
        lineStyle: {
            normal: {
                width: 4
            }
        },
        data: waterData2,
    },
    {
        name: '曲线3',
        type: 'line',
        // smooth: true,
        showSymbol: false,
        label: {
            show: false,
        },
        lineStyle: {
            normal: {
                width: 4
            }
        },
        data: waterData3,
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
    }],
    textStyle: {
        color: '#666666'
    },
    color: ['#30f5f1', '#f56f56', '#5d9cec', '#4acfae', '#f4f470', '#7ecef4', '#f39800', '#d363ef']
}
echart1.setOption(option);