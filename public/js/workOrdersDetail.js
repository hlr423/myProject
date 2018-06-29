$(function() {
	var taskId;
	var audio;
	/*=========================初始化配置类+变量声明=========================*/
	getWorkSheetStation();//获取这个工单到底有几个厂站

	getWorkSheetInfo(); //工单信息



	// 整体tab
	$('#tab').tabs({
		plain : true,
		// justified: true, // 生成等宽标题
		narrow : true, // 删除选项卡之间的间距
	/* onSelect:function(title,index,value){            //用户在选择一个选项卡面板的时候触发的函数  
		  
	        alert(title+' is selected'+index+value);    
	  
	    },  
*/
	});

	// 所需物质
	$('#goodsTable').datagrid({
		// fit: true,
		url : "getWorkSheetResource",

		fitColumns : true,
		rownumbers : true, // 显示行号列
		singleSelect : true, // 允许选择一行,
		scrollbarSize : 6, // 滚动条宽度
		columns : [
			[
				{
					field : 'type',
					title : '物质类型',
					width : 100,
				},
				{
					field : 'name',
					title : '名称',
					width : 100,
				},
				{
					field : 'num',
					title : '数量',
					width : 100,
					align : 'center',
				},
				{
					field : 'realNum',
					title : '实际用量',
					width : 100,
					align : 'center',
				},

			]
		]
	});
	// 所需车辆
	$('#carTable').datagrid({
		url : "getWorkSheetCar",

		// fit: true,
		fitColumns : true,
		rownumbers : true, // 显示行号列
		singleSelect : true, // 允许选择一行,
		scrollbarSize : 6, // 滚动条宽度
		columns : [
			[
				{
					field : 'carType',
					title : '车辆类型',
					width : 100,
				},
				{
					field : 'carNo',
					title : '车牌号',
					width : 100,
				},
			]
		]
	});
	// 厂站
	/*$('#station1').datagrid({
		url:"getWorkSheetStationDetail",
		queryParams:{
						"stationId":1,
					},
		pagination: true,     //开启分页  
		pageSize: 10,         //分页大小 
		fit: true,
		fitColumns: true,
		rownumbers: true, // 显示行号列
		singleSelect: true, // 允许选择一行,
		scrollbarSize: 6, // 滚动条宽度
		height: 'auto',
		columns: [
			[
				{
					field: 'type',
					title: '分属类型',
					width: 100,
				},
				{
					field: 'taskType',
					title: '任务类型',
					width: 100,
				},
				{
					field: 'obj',
					title: '任务对象',
					width: 100,
				},
				{
					field: 'person',
					title: '操作人员',
					width: 150,
				},

				{
					field: 'E',
					title: '操作说明',
					width: 100,
					align: 'center',
					formatter: function (value,row,index) {
						var node;
						if(row.optdes!=undefined){
							node = '<a class="td-detail" onClick="descriptionOpen()">详情</a>'
							$("#optdes").text(row.optdes);	
						}
						return node;
					}
				},
				{
					field: 'F',
					title: '音频',
					width: 100,
					align: 'center',
					formatter: function (value,row,index) {
						console.log(row)
						var node;
						if(row.audio!=undefined){
							taskId=row.taskId;
							node = '<a class="td-music" onClick="muiscOpen('+taskId+')">查看</a>'
						}
						return node;
					}
				},
				{
					field: 'pic',
					title: '照片',
					width: 100,
					align: 'center',
					formatter: function (value,row,index) {
						var node;
						if(row.pic!=undefined){
							node = '<a class="td-picture" onClick=pictureOpen()>查看</a>'
								for(var i=0;i<row.pic.length;i++){
									$("#pic").empty();
									$("#pic").append(' <div class="swiper-slide"><img src="'+row.pic[i]+'" alt=""></div>');
									$("#pic2").empty();
									$("#pic2").append('<div class="swiper-slide" style="background-image:url('+row.pic[i]+')"></div>');
								}
						}
						return node;
					}
				},
				{
					field: 'state',
					title: '状态',
					width: 100,
					align: 'center',
					formatter: function (value,row,index) {
						var node;
						if(row.stateId==1){//未完成
							node= '<a class="td-state-no">'+row.state+'</a>';
						}else if(row.stateId==2){//处理中
							node='<a class="td-state-ing">'+row.state+'</a>';
						}else if(row.stateId==3){//已完成
							node='<a>'+row.state+'</a>';
						}else{
							node= '<a class="td-state-no">'+row.state+'</a>';
						}
						 //node= '<a class="td-state-over">已派发</a>'
						return node;
					}
				},
				{
					field: 'startTime',
					title: '开始时间',
					width: 150,
					align: 'center',

				},
				{
					field: 'endTime',
					title: '结束时间',
					width: 150,
					align: 'center',
				},
				{
					field: 'K',
					title: '故障原因占比',
					width: 150,
					formatter: function () {
						var node = '<a class="td-reason" title="其他线路短路其他线路短路其他线路短路">其他线路短路其他线路短路其他线路短路</a>'
						return node;
					}
				},
			]
		]
	});*/

	/*=========================弹窗=========================*/
	// 关闭弹窗
	$('.close-icon').on('click', function() {
		var $popup = $(this).parents('.popup');
		$('.shade').fadeOut();
		$popup.fadeOut();
	});

	/*=========================督办=========================*/
	var urgedBtn = document.querySelector('.workOrders-urged'); // 督办
	// 点击督办等待5分钟
	$('.workOders-data').on('click', '.workOrders-urged', function() {
		var $this = $(this);
		$this.removeClass('workOrders-urged').html(300 + 's');
		var time = 299;
		var timeInterval = setInterval(function() {
			time--;
			$this.html(time + 's');
			if (time == 0) {
				$this.addClass('workOrders-urged').html('督办');
				clearInterval(timeInterval);
			}
		}, 1000)
	});

	/*=========================厂站=========================*/



	/*=========================其它=========================*/



});

/*=========================其它=========================*/
var audioElement = document.createElement('audio'); // 音频资源
var musicState = 0; // 0:点击停止音乐重新加载音乐地址
// 打开厂站操作说明
function descriptionOpen() {
	$('.shade').fadeIn();
	$('.description-popup').fadeIn();
}
// 打开厂站照片
function pictureOpen() {
	$('.shade').fadeIn();
	$('.picture-popup').fadeIn();
	var galleryTop = new Swiper('.gallery-top', {});
	var galleryThumbs = new Swiper('.gallery-thumbs', {
		pagination : '.swiper-pagination',
		paginationType : 'fraction',
		spaceBetween : 10,
		centeredSlides : true,
		slidesPerView : 'auto',
		slideToClickedSlide : true,
		nextButton : '.swiper-button-next',
		prevButton : '.swiper-button-prev',
	});
	galleryTop.params.control = galleryThumbs;
	galleryThumbs.params.control = galleryTop;
}
// 打开音乐弹窗
function muiscOpen(taskId) {
	$('.shade, .music-popup').fadeIn();
	// 音频播放
	$('#musicTable').datagrid({
		url : "getTaskAudio",
		queryParams : {
			taskId : taskId,
		},
		fit : true,
		fitColumns : true,
		rownumbers : true, // 显示行号列
		singleSelect : true, // 允许选择一行,
		scrollbarSize : 6, // 滚动条宽度
		columns : [
			[
				{
					field : 'name',
					title : '名称',
					width : 100,
				},
				{
					field : 'realNum',
					title : '操作',
					width : 100,
					align : 'center',
					formatter : function(value, row) {
						var node;
						if (row.name != undefined) {
							audio = row.name;
							node = '<a class="music-play" onClick="muiscPlay()">播放</a>' +
								'<a class="music-stop" onClick="musicStop()">停止</a>'
						}
						return node;
					}
				},

			]
		]
	});


}
// 播放音乐
function muiscPlay() {
	if (audioElement.src && musicState == 1) {
		audioElement.currentTime = 0;
	} else {
		audioElement.setAttribute('src', audio);
		audioElement.load;
		audioElement.play();
		console.log(audioElement.src)
		musicState = 1;
	}
}
// 停止音乐
function musicStop() {
	audioElement.pause();
	musicState = 0;
}
//工单的信息
function getWorkSheetInfo() {
	$.ajax({
		type : "POST",
		url : "getWorkSheetInfo",
		async : true,
		data : "id=" + 1,
		dataType : "json",
		success : function(msg) {
			$("#worksheetNo").text(msg.workSheetNo);
			$("#worksheetState").text(msg.stateName);
			$("#sendTime").text(msg.sendTime);
			$("#person").text(msg.person);
			$("#time").text(msg.time);
		}
	});
}

//获取这个工单到底有几个厂站
function getWorkSheetStation() {
	$.ajax({
		type : "POST",
		url : "getWorkSheetStationInfo",
		async : false,
		dataType : "json",
		success : function(msg) {
			var num = msg.length;
			for (var i = 0; i < num; i++) {
				var text = '<table class="easyui-datagrid" id="station' + (i + 1) + '"><tbody></tbody></table>'
				$('#tab').tabs('add', {
					title : msg[i].stationName,
					index : i,
					content : text,
					closable : true,
				});
				$("#station" + (i + 1) + "").datagrid({
					url : "getWorkSheetStationDetail",
					queryParams : {
						"stationId" : msg[i].stationId,
					},
					pagination : true, //开启分页  
					pageSize : 10, //分页大小 
					fit : true,
					fitColumns : true,
					rownumbers : true, // 显示行号列
					singleSelect : true, // 允许选择一行,
					scrollbarSize : 6, // 滚动条宽度
					height : 'auto',
					columns : [
						[
							{
								field : 'type',
								title : '分属类型',
								width : 100,
							},
							{
								field : 'taskType',
								title : '任务类型',
								width : 100,
							},
							{
								field : 'obj',
								title : '任务对象',
								width : 100,
							},
							{
								field : 'person',
								title : '操作人员',
								width : 150,
							},

							{
								field : 'E',
								title : '操作说明',
								width : 100,
								align : 'center',
								formatter : function(value, row, index) {
									var node;
									if (row.optdes != undefined) {
										node = '<a class="td-detail" onClick="descriptionOpen()">详情</a>'
										$("#optdes").text(row.optdes);
									}
									return node;
								}
							},
							{
								field : 'F',
								title : '音频',
								width : 100,
								align : 'center',
								formatter : function(value, row, index) {
									var node;
									if (row.audio != undefined) {
										taskId = row.taskId;
										node = '<a class="td-music" onClick="muiscOpen(' + taskId + ')">查看</a>'
									}
									return node;
								}
							},
							{
								field : 'pic',
								title : '照片',
								width : 100,
								align : 'center',
								formatter : function(value, row, index) {
									var node;
									if (row.pic != undefined) {
										node = '<a class="td-picture" onClick=pictureOpen()>查看</a>'
										for (var i = 0; i < row.pic.length; i++) {
											$("#pic").empty();
											$("#pic").append(' <div class="swiper-slide"><img src="' + row.pic[i] + '" alt=""></div>');
											$("#pic2").empty();
											$("#pic2").append('<div class="swiper-slide" style="background-image:url(' + row.pic[i] + ')"></div>');
										}
									}
									return node;
								}
							},
							{
								field : 'state',
								title : '状态',
								width : 100,
								align : 'center',
								formatter : function(value, row, index) {
									var node;
									if (row.stateId == 1) { //未完成
										node = '<a class="td-state-no">' + row.state + '</a>';
									} else if (row.stateId == 2) { //处理中
										node = '<a class="td-state-ing">' + row.state + '</a>';
									} else if (row.stateId == 3) { //已完成
										node = '<a>' + row.state + '</a>';
									} else {
										node = '<a class="td-state-no">' + row.state + '</a>';
									}
									//node= '<a class="td-state-over">已派发</a>'
									return node;
								}
							},
							{
								field : 'startTime',
								title : '开始时间',
								width : 150,
								align : 'center',
							},
							{
								field : 'endTime',
								title : '结束时间',
								width : 150,
								align : 'center',
							},
							{
								field : 'reason',
								title : '故障原因占比',
								width : 150,
								formatter : function(index, row, value) {
									var node;
									if(row.reason!=undefined){
										node = '<a class="td-reason" title="'+row.reason+'">'+row.reason+'</a>'
									}
									return node;
								}
							},
						]
					]
				});

			}
		}
	});
}

//返回工单管理的第一个界面
function backWorkSheetList(){
	window.location.href="toWorkSheet";
}

