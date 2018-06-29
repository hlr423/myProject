/** 当天信息初始化 **/
$(function () {
	var dayDate = new Date();
	var d = $.fullCalendar.formatDate(dayDate, "dddd");
	var m = $.fullCalendar.formatDate(dayDate, "yyyy年MM月dd日");
	var lunarDate = lunar(dayDate);
	var nonLi = "农历" + lunarDate.lMonth + "月" + lunarDate.lDate + '&nbsp;&nbsp;' + lunarDate.gzYear + "年&nbsp;" + "【" + lunarDate.animal + "年】"
	$(".alm_date").html(m + "&nbsp;" + d + "<br>" + nonLi);
	$(".today_date").html(dayDate.getDate())
	var fes = lunarDate.festival();
	if (fes.length > 0) {
		$(".alm_lunar_date").html($.trim(lunarDate.festival()[0].desc));
		$(".alm_lunar_date").show();
	} else {
		$(".alm_lunar_date").hide();
	}
	/**====================其它====================**/
	$('.work-exportBtn').on('click',function(){
		alert('导出')
	})
	
});
/** calendar配置 **/
$(document).ready(
	function () {
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		var pervDay;
		var nextDay;
		
		$("#calendar").fullCalendar({
			header: {
				left: 'title',
				center: 'prev,next',
				right: ''
			},
			buttonText: {
				prev: "<span class='fc-text-arrow'><i></i> </span>",
				next: "<span class='fc-text-arrow'><i></i></span>",
				center: "2"
			},
			firstDay: 1, // 第一天
			height: 'parent', // 高度设置为容器高度
			aspectRatio: 2,
			events:function(pervDay,nextDay,analysisData){
				var beginTime = getYMD(pervDay);
				var endTime = getYMD(nextDay);
				$.ajax({
		    		url:"getShiftTime",
		    		method:"post",
		    		data:"beginTime="+beginTime+"&endTime="+endTime,
		    		async:false,
		    		dataType:"json",
		    		success:function(data){
		    			//console.log(JSON.stringify(result))
		    			var events = [];
		                $(data).each(function() {
		                     events.push({
		                         title: $(this).attr('title'),
		                         start: $(this).attr('start'), // will be parsed
		                         name: $(this).attr('name'),
		                         time: $(this).attr('time') // will be parsed
		                     });
		                 });
		                 analysisData(events);
		    		},
		    		error:function (XMLHttpRequest, textStatus, errorThrown){ 
		     	     	//请求错误的处理
		     			//请求错误的处理
		     			//请求错误的处理
		     	   	}
		    	})
			},
			dayClick: function (dayDate, allDay, jsEvent, view) { //点击单元格事件			
				var d = $.fullCalendar.formatDate(dayDate, "dddd");
				var m = $.fullCalendar.formatDate(dayDate, "yyyy年MM月dd日");
				var lunarDate = lunar(dayDate);
				var fes = lunarDate.festival();
				var nonLi = "农历" + lunarDate.lMonth + "月" + lunarDate.lDate + '&nbsp;&nbsp;' + lunarDate.gzYear + "年&nbsp;" + "【" + lunarDate.animal + "年】"
				var shiftDataNode = '<div class="shift-data">'+
				'<p><span class="shift-title"></span>：<span class="shift-name"></span></p>'+
				'<p>时间：<span class="shift-time"></span></p>';
				// 获取当天的所有事件对象
				var events = $('#calendar').fullCalendar('clientEvents', function (event) {
					var eventStart = event.start
					var eventEnd = event.end ? event.end : dayDate;
					var theDate = dayDate;
					return (eventStart <= theDate && (eventEnd >= theDate) && !(eventStart < theDate && (eventEnd == theDate))) || (eventStart == theDate && (eventEnd === null));
				});
				$('.shift-data').remove();
				$(".alm_date").html(m + "&nbsp;" + d + "<br>" + nonLi);
				$(".today_date").html(dayDate.getDate())
				$('.fc-day').removeClass('td-active'); // 删除边框
				$(this).addClass('td-active'); // 点击增加边框
				if (fes.length > 0) {
					$(".alm_lunar_date").html($.trim(lunarDate.festival()[0].desc));
					$(".alm_lunar_date").show();
				} else {
					$(".alm_lunar_date").hide();
				}
				
				// 将当日的事件信息填到右侧
				for(var i = 0; i < events.length ; i++){
					// 有多少个事件就添加多少个事件数据DIV
					$('.shift-data').length == 0 ? $('#div_day_detail').after(shiftDataNode) : $('.shift-data').eq(i-1).after(shiftDataNode);
					var title = events[i].title;
					var name = events[i].name;
					var time = $.fullCalendar.formatDate(events[i].start, "yyyy-MM-dd") + ' ' + events[i].time;
					$('.shift-data').eq(i).find('.shift-title').html(title);
					$('.shift-data').eq(i).find('.shift-name').html(name);
					$('.shift-data').eq(i).find('.shift-time').html(time);
				}
			},
			loading: function (bool) {
				if (bool)
					$("#msgTopTipWrapper").show();
				else
					$("#msgTopTipWrapper").fadeOut();
			},
			
		});
		pervDay = y + '-' + m + '-' + $('.fc-week.fc-first .fc-first .fc-day-number').html();
		nextDay = y + '-' + (m + 2) + '-' + $('.fc-week.fc-last .fc-last .fc-day-number').html();
		// $("#fc-dateSelect").delegate("select", "change", function () {
		// 	var fcsYear = $("#fcs_date_year").val();
		// 	var fcsMonth = $("#fcs_date_month").val();
		// 	$("#calendar").fullCalendar('gotoDate', fcsYear, fcsMonth);
		// });
		$('.fc-today').trigger('click') // 默认获取当天的所有事件在右边显示
		initialData();//页面初始化的时候加载当前月的工时情况
		
		//点击上下两个箭头时获取对应月的工时情况
		$(".fc-button-prev, .fc-button-next").on("click",function(){
			initialData()
		})
	}
);

//格式化日期
function getYMD(date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d;  
};  


//页面加载当月工时、总在岗时间等数据
function initialData(){
	var y = parseInt($('#fcs_date_year').val());
	var m = parseInt($("#fcs_date_month").val()) + 1;
	m = m < 10 ? '0' + m : m; 
	var time = y + "-" + m;
	var timeType = 2;
	$.ajax({
		url:"getWorkTime",
		method:"post",
		data:"timeType="+timeType+"&time="+time,
		dataType:"json",
		success:function(data){
			var pTagsArray = $("#calendar").find(".work-time").children("p");
			$(pTagsArray[0]).find("span").text(data[0].totalTime);
			$(pTagsArray[1]).find("span").text(data[0].workTime);
			$(pTagsArray[2]).find("span").text(data[0].leftTime);
			$(pTagsArray[3]).find("span").text(data[0].overTime);
		},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
	})
}

