Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}
var $shade = $('.shade'); // 遮罩
$(function () {
    // ======================================初始化时间选择器======================================
    lay('.chose-time').each(function (e) {
        var _this = this;
        laydate.render({
            elem: this,
            type: 'month',
            theme: 'date'
        })
    })
    var date = new Date();
    var dateStr = date.format("yyyy-MM");
    $("#startTime1").val(dateStr);
    
    search();
});

// 搜索事件
$('.financialAnalysis').click(function (){
    search();
})

//开始统计
function search(){
	var time = $("#startTime1").val();
	var countType = $("#countType").val();
	getCarMoney(time, countType);
	getDFMoney(time, countType);
	getYFMoney(time, countType);
	getRGMoney(time, countType);
}

// 初始化echart
var echart1 = echarts.init(document.getElementById('echart1'));
var echart2 = echarts.init(document.getElementById('echart2'));
var echart3 = echarts.init(document.getElementById('echart3'));
var echart4 = echarts.init(document.getElementById('echart4'));
// 通用echart的option
var commonOption = {
    textStyle: {
        color: '#999'
    },
    grid: {
        left: 50
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            var espan = '';
            if (params.dataIndex === 0) {
                espan = 'echart-span0';
            } else {
                espan = 'echart-span1';
            }
            return params.name + ':<br/>' + '<span class=' + espan + '>' + params.data + '</span>' + '元'
        }
    },
    xAxis: {
        type: 'category',
        name: '时间',
        axisLine: {
            lineStyle: {
                color: '#cee1fc'
            }
        },
        axisTick: {
            show: false
        },
        data: []
    },
    yAxis: {
        type: 'value',
        name: '元(￥)',
        axisLine: {
            lineStyle: {
                color: '#cee1fc'
            }
        },
        axisTick: {
            show: false
        },
        splitLine: {
            lineStyle: {
                color: '#e3eefd'
            }
        }
    },
    series: [{
            type: 'bar',
            barWidth: 15,
            label: {
                normal: {
                    show: true,
                    position: 'top',
                }
            },
            itemStyle: {
                normal: {
                    barBorderRadius: [10, 10, 0, 0],
                    color: function (params) {
                        var colorList = ['#fd8c58', '#45edc6'];
                        return (new echarts.graphic.LinearGradient(
                            0, 0, 1, 0, [{
                                    offset: 0,
                                    color: colorList[params.dataIndex]
                                },
                                {
                                    offset: 1,
                                    color: colorList[params.dataIndex]
                                }
                            ]))
                    }
                }
            },
            data: [],
        },
        {
            type: 'line',
            data: [],
        }
    ]
}

//车辆费用
function getCarMoney(time,countType){
	$.ajax({
	   type: "POST",
	   url: "getCarMoney",
	   data: "countType="+countType+"&time="+time,
	   dataType: "json",
	   success: function(msg){
		   if(msg!=null){
			   if(msg[0]!=null){
				   if(msg[0].invalidate){
					   window.parent.location.href=msg[0].loginPage;
				   }else if(msg[0].noOpt){
					   new CustomPrompt({
		           			type: 'error',
		           			msg: '您无权操作！'
		           	   });
				   }
			   }else{
				   commonOption.xAxis.data=msg.xaxis;
				   commonOption.series[0].data=msg.series;
				   commonOption.series[1].data=msg.series;
				   echart1.setOption(commonOption);
				   
				   var span1 = "<span>"+msg.xaxis[0]+"</span>";
				   var p1 = "<p><span>"+msg.series[0]+"</span>￥</p>";
				   
				   var span2 = "<span>"+msg.xaxis[1]+"</span>";
				   var p2 = "<p><span>"+msg.series[1]+"</span>￥</p>";
				   
				   var span3 = "<span>比率</span>";
				   var p3 = "<p class='"+msg.upOrDown+"'><i></i><span>"+msg.bfb+"</span>%</p>";
				   var all = span1+p1+span2+p2+span3+p3;
                   $("#carMoneyDiv").html(all);
			   }
		   }
	   }
	});
}
//获取用电成本
function getDFMoney(time,countType){
	$.ajax({
		   type: "POST",
		   url: "getMoneyByType",
		   data: "countType="+countType+"&time="+time+"&moneyType=0",
		   dataType: "json",
		   success: function(msg){
			   if(msg!=null){
				   if(msg[0]!=null){
					   if(msg[0].invalidate){
						   window.parent.location.href=msg[0].loginPage;
					   }else if(msg[0].noOpt){
						   new CustomPrompt({
			           			type: 'error',
			           			msg: '您无权操作！'
			           	   });
					   }
				   }else{
					   commonOption.xAxis.data=msg.xaxis;
					   commonOption.series[0].data=msg.series;
					   commonOption.series[1].data=msg.series;
					   echart2.setOption(commonOption);
					   
					   var span1 = "<span>"+msg.xaxis[0]+"</span>";
					   var p1 = "<p><span>"+msg.series[0]+"</span>￥</p>";
					   
					   var span2 = "<span>"+msg.xaxis[1]+"</span>";
					   var p2 = "<p><span>"+msg.series[1]+"</span>￥</p>";
					   
					   var span3 = "<span>比率</span>";
					   var p3 = "<p class='"+msg.upOrDown+"'><i></i><span>"+msg.bfb+"</span>%</p>";
					   var all = span1+p1+span2+p2+span3+p3;
	                   $("#dfMoneyDiv").html(all);
				   }
			   }
		   }
		});
}
//用药费用
function getYFMoney(time,countType){
	$.ajax({
		   type: "POST",
		   url: "getMoneyByType",
		   data: "countType="+countType+"&time="+time+"&moneyType=1",
		   dataType: "json",
		   success: function(msg){
			   if(msg!=null){
				   if(msg[0]!=null){
					   if(msg[0].invalidate){
						   window.parent.location.href=msg[0].loginPage;
					   }else if(msg[0].noOpt){
						   new CustomPrompt({
			           			type: 'error',
			           			msg: '您无权操作！'
			           	   });
					   }
				   }else{
					   commonOption.xAxis.data=msg.xaxis;
					   commonOption.series[0].data=msg.series;
					   commonOption.series[1].data=msg.series;
					   echart3.setOption(commonOption);
					   
					   var span1 = "<span>"+msg.xaxis[0]+"</span>";
					   var p1 = "<p><span>"+msg.series[0]+"</span>￥</p>";
					   
					   var span2 = "<span>"+msg.xaxis[1]+"</span>";
					   var p2 = "<p><span>"+msg.series[1]+"</span>￥</p>";
					   
					   var span3 = "<span>比率</span>";
					   var p3 = "<p class='"+msg.upOrDown+"'><i></i><span>"+msg.bfb+"</span>%</p>";
					   var all = span1+p1+span2+p2+span3+p3;
	                   $("#yhMoneyDiv").html(all);
				   }
			   }
		   }
		});
}
//人工成本
function getRGMoney(time,countType){
	$.ajax({
		   type: "POST",
		   url: "getMoneyByType",
		   data: "countType="+countType+"&time="+time+"&moneyType=2",
		   dataType: "json",
		   success: function(msg){
			   if(msg!=null){
				   if(msg[0]!=null){
					   if(msg[0].invalidate){
						   window.parent.location.href=msg[0].loginPage;
					   }else if(msg[0].noOpt){
						   new CustomPrompt({
			           			type: 'error',
			           			msg: '您无权操作！'
			           	   });
					   }
				   }else{
					   commonOption.xAxis.data=msg.xaxis;
					   commonOption.series[0].data=msg.series;
					   commonOption.series[1].data=msg.series;
					   echart4.setOption(commonOption);
					   
					   var span1 = "<span>"+msg.xaxis[0]+"</span>";
					   var p1 = "<p><span>"+msg.series[0]+"</span>￥</p>";
					   
					   var span2 = "<span>"+msg.xaxis[1]+"</span>";
					   var p2 = "<p><span>"+msg.series[1]+"</span>￥</p>";
					   
					   var span3 = "<span>比率</span>";
					   var p3 = "<p class='"+msg.upOrDown+"'><i></i><span>"+msg.bfb+"</span>%</p>";
					   var all = span1+p1+span2+p2+span3+p3;
	                   $("#rgMoneyDiv").html(all);
				   }
			   }
		   }
		});
}
// 自适应
window.addEventListener('resize', function() {
    echart1.resize();
    echart2.resize();
    echart3.resize();
    echart4.resize();
});