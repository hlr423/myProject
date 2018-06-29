// ======================================全局变量======================================
var UUId;//短信点击事件的UUId
var $shade = $('.shade'); // 遮罩
$(function() {
	// ======================================下拉树======================================
	$('#client').combotree({
		url : "getAreaTree",
		method : 'get',
		width : 200,
		height : 30,
		hasDownArrow : false,
		onChange : function() {
			var areaId = $("#client").combotree("getValue");
			var stationStateId = $("#stationstate").val();
			getStation(areaId, stationStateId); //得到厂站的变化
		}
	});
	getStationState();
	getStation(0,0);

	// 搜索框
	$('.station-input').on('keyup', function() {
		var $this = $(this);
		if (this.value.length == 0) {
			$this.css({
				'background-position' : '35px'
			})
		} else {
			$this.css({
				'background-position' : '180px'
			})
		}
	}).on('focus', function() {
		var $this = $(this);
		console.log(123)
		$this.css({
			border : '1px solid #59afff !important'
		})
	})

	common.commonRadio('.chose-radio');

	// 整体tab
	$('#tab').tabs({
		tabWidth : 120,
		tabHeight : 50,
		plain : true,
		narrow : true, // 删除选项卡之间的间距
		onSelect : function(title, index) {
			if (index == 0) {

			} else if (index == 1) { //运维
				$('#dg1').datagrid({
					url : "getEquipTaskInfo",
					queryParams : {
						stationId : $("#choseStation").val(),
						taskTypeId : $("#taskType").val(),
						startTime : $("#startTime1").val(),
						endTime : $("#endTime1").val(),
					},
					fit : true,
					fitColumns : true,
					rownumbers : true,
					singleSelect : true,
					pagination : true, //开启分页  
					pageSize : 10, //分页大小  
					scrollbarSize : 6,
					columns : [
						[
							{
								field : 'taskType',
								title : '任务类型',
								width : 100,
							},
							{
								field : 'opobj',
								title : '操作对象',
								width : 100
							},
							{
								field : 'state',
								title : '状态',
								width : 100,
								formatter : function(value,rec) {
									taskId = rec.id;
									if(rec.stateId == 1){
                                		return '<span class="order-state no">'+rec.state+'</span>'
                                	}else if(rec.stateId == 2){
                                		return '<span class="order-state yes">'+rec.state+'</span>'
                                	}else{
                                		return '<span class="order-state ing">'+rec.state+'</span>'
                                	}
								}
							},
							{
								field : 'f',
								title : '运维详情',
								width : 100,
								align : 'center',
								formatter : function(value,rec) {
									return '<a class="yw-detail" onclick=ywDetail('+rec.id+')>详情</a>'
								}
							},
							{
								field : 'startTime',
								title : '开始时间',
								width : 100,
							},
							{
								field : 'endTime',
								title : '结束时间',
								width : 100,
							},
							{
								field : 'i',
								title : '下次运维任务',
								width : 100,
								align : 'center',
								formatter : function(value, rec) {
									return '<a class="next-task" onclick=nextDeteail()>详情</a>'
								}
							}
						]
					],
					onLoadSuccess:function(data){
						if(data.total == 0){
							new CustomPrompt({
								type: 'error',
								msg: '没有相关记录'
							});
						}
                    }
				});

			} else if (index == 2) { //预警
				getStationEquips1();
				$('#dg2').datagrid({
					url : "getEarlyWarning",
					queryParams : {
						stationId : $("#choseStation").val(),
						startTime : null,
						endTime : null,
					},
					fit : true,
					fitColumns : true,
					rownumbers : true,
					singleSelect : true,
					pagination : true, //开启分页  
					pageSize : 10, //分页大小  
					scrollbarSize : 6,
					columns : [
						[
							{
								field : 'equipName',
								title : '设备名称',
								width : 100
							},
							{
								field : 'description',
								title : '预警描述',
								width : 100
							},
							{
								field : 'level',
								title : '等级',
								width : 100
							},
							{
								field : 'startTime',
								title : '预警开始时间',
								width : 100
							},
							{
								field : 'endTime',
								title : '预警结束时间',
								width : 100
							},
							{
								field : 'duringTime',
								title : '持续时间（小时）',
								width : 100
							},
							{
								field : 'person',
								title : '响应人员',
								width : 100
							},
							{
								field : 'workSheetState',
								title : '工单状态',
								align : 'center',
								width : 100,
								formatter : function(value, rec) {
									var content = '';
									if (true) {
										if (value != undefined) {
											if (value.hasOwnProperty("state")) {
												if (value.state == 1) {
													content += '<div class="order-state send">';
													content += '<span>已派发</span>';
												} else if (value.state == 2) {
													content += '<div class="order-state send">';
													content += '<span>处理中</span>';
												} else if (value.state == 3) {
													content += '<div class="order-state send">';
													content += '<span>已完成</span>';
												} else {
													content += '<div class="order-state send">';
													content += '<span>已验收</span>';
												}
												content += '<div class="roder-state-detail">';
												for (var i = 0; i < value.data.length; i++) {
													content += '<p class="item pass">';
													content += '<span>' + value.data[i].workState + '</span>';
													content += '<span>' + value.data[i].time + '</span>';
													content += '</p>';
												}
												content += '</div>'
												content += '</div>'
											}
										}
									} else {
										content += '<div class="order-state ing"><span>处理中</span></div>';
										content += '<div class="order-state no"><span>未处理</span></div>';
										content += '<div class="order-state yes"><span>已处理</span></div>';
									}
									return content;
								}
							},

							{
								field : 'message',
								title : '预警通知状态',
								width : 100,
								align : 'center',
								formatter : function(value, rec) {
									if(value!=undefined){
										UUId = value.UUId;
										return '<a class="notice-detail" onclick=noticeDeteail()>详情</a>'
									}
								}
							}
						]
					],
					onLoadSuccess:function(data){
						if(data.total == 0){
							new CustomPrompt({
								type: 'error',
								msg: '没有相关记录'
							});
						}
					}
				});
			} else if (index == 3) { //告警
				getStationEquips2();
				$('#dg3').datagrid({
					url : "getWarning",
					queryParams : {
						stationId : $("#choseStation").val(),
						startTime : null,
						endTime : null,
					},
					fit : true,
					fitColumns : true,
					rownumbers : true,
					singleSelect : true,
					pagination : true, //开启分页  
					pageSize : 10, //分页大小  
					scrollbarSize : 6,
					columns : [
						[
							{
								field : 'equipName',
								title : '设备名称',
								width : 100
							},
							{
								field : 'description',
								title : '告警描述',
								width : 100
							},
							{
								field : 'level',
								title : '等级',
								width : 100
							},
							{
								field : 'startTime',
								title : '告警开始时间',
								width : 100
							},
							{
								field : 'endTime',
								title : '告警结束时间',
								width : 100
							},
							{
								field : 'duringTime',
								title : '持续时间（小时）',
								width : 100
							},
							{
								field : 'person',
								title : '响应人员',
								width : 100
							},
							{
								field : 'workSheetState',
								title : '工单状态',
								align : 'center',
								width : 100,
								formatter : function(value, rec) {
									var content = '';
									if (true) {
										if (value != undefined) {
											if (value.hasOwnProperty("state")) {
												if (value.state == 1) {
													content += '<div class="order-state send">';
													content += '<span>已派发</span>';
												} else if (value.state == 2) {
													content += '<div class="order-state send">';
													content += '<span>处理中</span>';
												} else if (value.state == 3) {
													content += '<div class="order-state send">';
													content += '<span>已完成</span>';
												} else {
													content += '<div class="order-state send">';
													content += '<span>已验收</span>';
												}
												content += '<div class="roder-state-detail">';
												for (var i = 0; i < value.data.length; i++) {
													content += '<p class="item pass">';
													content += '<span>' + value.data[i].workState + '</span>';
													content += '<span>' + value.data[i].time + '</span>';
													content += '</p>';
												}
												content += '</div>'
												content += '</div>'
											}
										}
									} else {
										content += '<div class="order-state ing"><span>处理中</span></div>';
										content += '<div class="order-state no"><span>未处理</span></div>';
										content += '<div class="order-state yes"><span>已处理</span></div>';
									}
									return content;
								}
							},
							{
								field : 'message',
								title : '告警通知状态',
								width : 100,
								align : 'center',
								formatter : function(value, rec) {
									if(value!=undefined){
										UUId = value.UUId;
										return '<a class="notice-detail" onclick=noticeDeteail()>详情</a>'
										
									}
								}
							}
						]
					],
					onLoadSuccess:function(data){
						if(data.total == 0){
							new CustomPrompt({
								type: 'error',
								msg: '没有相关记录'
							});
						}
					}
				});
			} else if (index == 4) { //故障
				getStationEquips3();
				$('#dg4').datagrid({
					url :"getWrong",
					queryParams : {
						stationId : $("#choseStation").val(),
						startTime : null,
						endTime : null,
					},
					fit : true,
					fitColumns : true,
					rownumbers : true,
					singleSelect : true,
					pagination : true, //开启分页  
					pageSize : 10, //分页大小  
					scrollbarSize : 6,
					columns : [
						[
							{
								field : 'equipName',
								title : '设备名称',
								width : 100
							},
							{
								field : 'description',
								title : '故障描述',
								width : 100
							},
							{
								field : 'level',
								title : '等级',
								width : 100
							},
							{
								field : 'startTime',
								title : '故障开始时间',
								width : 100
							},
							{
								field : 'endTime',
								title : '故障结束时间',
								width : 100
							},
							{
								field : 'duringTime',
								title : '持续时间（小时）',
								width : 100
							},
							{
								field : 'person',
								title : '响应人员',
								width : 100
							},
							{
								field : 'workSheetState',
								title : '工单状态',
								align : 'center',
								width : 100,
								formatter : function(value, rec) {
									var content = '';
									if (true) {
										if (value != undefined) {
											if (value.hasOwnProperty("state")) {
												if (value.state == 1) {
													content += '<div class="order-state send">';
													content += '<span>已派发</span>';
												} else if (value.state == 2) {
													content += '<div class="order-state send">';
													content += '<span>处理中</span>';
												} else if (value.state == 3) {
													content += '<div class="order-state send">';
													content += '<span>已完成</span>';
												} else {
													content += '<div class="order-state send">';
													content += '<span>已验收</span>';
												}
												content += '<div class="roder-state-detail">';
												for (var i = 0; i < value.data.length; i++) {
													content += '<p class="item pass">';
													content += '<span>' + value.data[i].workState + '</span>';
													content += '<span>' + value.data[i].time + '</span>';
													content += '</p>';
												}
												content += '</div>'
												content += '</div>'
											}
										}
									} else {
										content += '<div class="order-state ing"><span>处理中</span></div>';
										content += '<div class="order-state no"><span>未处理</span></div>';
										content += '<div class="order-state yes"><span>已处理</span></div>';
									}
									return content;
								}
							},
							{
								field : 'message',
								title : '故障通知状态',
								width : 100,
								align : 'center',
								formatter : function(value, rec) {
									if(value!=undefined){
										UUId = rec.UUId;
										return '<a class="notice-detail" onclick=noticeDeteail()>详情</a>'
										
									}
								}
							}
						]
					],
					onLoadSuccess:function(data){
						if(data.total == 0){
							new CustomPrompt({
								type: 'error',
								msg: '没有相关记录'
							});
						}
					}
				});
			} else if (index == 5) {
				getEquip();
				$('#dg5').datagrid({
					url :"getEquipLifeCycle",
					queryParams : {
						equipId : 0
					},
					fit : true,
					fitColumns : true,
					rownumbers : true,
					singleSelect : true,
					pagination : true, //开启分页  
					pageSize : 10, //分页大小  
					scrollbarSize : 6,
					columns : [
						[
							{
								field : 'state',
								title : '状态',
								width : 100
							},
							{
								field : 'time',
								title : '时间',
								width : 100
							},
						]
					],
					onLoadSuccess:function(data){
						if(data.total == 0){
							new CustomPrompt({
								type: 'error',
								msg: '没有相关记录'
							});
						}
			        }
				});
			}
		}
	});
	//生命周期里工艺位置change事件
	$("#position1").on("change",function(){
		getEquip();
	});
	//运维信息查询按钮
	$("#search2").on("click",function(){
		getEquipTask();
	});
	$('#dg0').datagrid({
		url:"getStationEquipInfo",
    	queryParams : {
				stationId : 0,
				equipTempId:0,
				brand:"",
				positionId:0,
				stateId:0
			},
		fit : true,
		fitColumns : true,
		rownumbers : true,
		singleSelect : true,
		pagination : true, //开启分页  
		pageSize : 10, //分页大小  
		scrollbarSize : 6,
		columns : [
			[
				{
					field : 'equipName',
					title : '设备名称',
					width : 100,
				},
				{
					field : 'equipTemp',
					title : '设备模板',
					width : 100
				},
				{
					field : 'brand',
					title : '品牌',
					width : 100
				},
				{
					field : 'model',
					title : '规格型号',
					width : 100,
				},
				{
					field : 'position',
					title : '工艺位置',
					width : 100,
				},
				{
					field : 'runTime',
					title : '运行时长(h)',
					width : 100,
				},
				{
					field : 'state',
					title : '状态',
					width : 100,
				},
				{
					field : 'pic',
					title : '照片',
					width : 100,
					align : 'center',
					formatter : function(value,rec) {
						if (rec.pic) {
							var content = '';
							content += '<a class="td-picture"><i></i>照片'
							content += '<div><img src='+basePath()+rec.pic+' alt="">';
							content += '</div></a>'
							return content;
						} else {
							return "无照片";
						}
					}
				},
//				{
//					field : 'i',
//					title : '运维信息',
//					width : 100,
//					align : 'center',
//					formatter : function() {
//						return '<a class="to-page">详情</a>'
//					}
//				},
//				{
//					field : 'j',
//					title : '预警信息',
//					width : 100,
//					align : 'center',
//					formatter : function() {
//						return '<a class="to-page">详情</a>'
//					}
//				},
//				{
//					field : 'k',
//					title : '告警信息',
//					width : 100,
//					align : 'center',
//					formatter : function() {
//						return '<a class="to-page">详情</a>'
//					}
//				},
//				{
//					field : 'l',
//					title : '故障信息',
//					width : 100,
//					align : 'center',
//					formatter : function() {
//						return '<a class="to-page">详情</a>'
//					}
//				},
//				{
//					field : 'm',
//					title : '生命周期',
//					width : 100,
//					align : 'center',
//					formatter : function() {
//						return '<a class="to-page">详情</a>'
//					}
//				}
			]
		],
		onLoadSuccess:function(data){
			if(data.total == 0){
				new CustomPrompt({
					type: 'error',
					msg: '没有相关记录'
				});
			}
        }
	})
	//下拉框change事件
	$("#equipTemp,#brand,#position,#state,#choseStation").on("change",function(){
		getStationEquipInfo();
		getEquipTask();
		getEquip();
	});

	//---------------------------查询按钮------------------------------------

	$('#search3').on('click', function() { //预警信息的查询
		$("#dg2").datagrid({
			url : "getEarlyWarning",
			queryParams : {
				stationId : $("#choseStation").val(),
				onlyId : $("#allEquips1").val(),
				startTime : $("#startTime2").val(),
				endTime : $("#endTime2").val(),
			},
		});
	})

	$('#search4').on('click', function() { //告警信息的查询
		$("#dg3").datagrid({
			url :"getWarning",
			queryParams : {
				stationId : $("#choseStation").val(),
				onlyId : $("#allEquips2").val(),
				startTime : $("#startTime3").val(),
				endTime : $("#endTime3").val(),
			},
		});
	})
	$('#search5').on('click', function() { //故障信息的查询
		$("#dg4").datagrid({
			url :"getWrong",
			queryParams : {
				stationId : $("#choseStation").val(),
				onlyId : $("#allEquips3").val(),
				startTime : $("#startTime4").val(),
				endTime : $("#endTime4").val(),
			},
		});
	})
	$('#equip').on("change",function(){//设备生命周期的查询
		var equipId = $("#equip").val();
		if(equipId != 0){
			$("#cur-title").text($("#equip").find("option:selected").text());
		}else{
			$("#cur-title").text("");
		}
		$('#dg5').datagrid({
			url :"getEquipLifeCycle",
			queryParams : {
				equipId : equipId
			},
			onLoadSuccess:function(data){
				var content = "";
	        	if(data.total == 0){
	        		$(".time-chart").html(content);
	        		new CustomPrompt({
	        			type: 'error',
	        			msg: '没有相关记录'
	        		});
	        	}else{
	        		var lifeCycles = data.rows;
	        		for(var i=0; i<lifeCycles.length; i++){
	        			content += "<div class='content'><div class='circle'>"+lifeCycles[i].state+"</div>";
	        			if(lifeCycles[i].station){
	        				content += "<p>"+lifeCycles[i].station+"</p>";
	        			}
	        			content += "<p>"+lifeCycles[i].time+"</p><div class='line'></div></div>"
	        		}
	        		$(".time-chart").html(content);
	        	}
	        }
		});
	});

	// ======================================初始化时间选择器======================================
	lay('.chose-time').each(function(e) {
		var _this = this;
		laydate.render({
			elem : this,
			type : 'datetime',
			theme : 'date'
		})
	})

	// ======================================关闭弹窗按钮======================================
	var $closeBtn = $('.close-icon'); // 关闭弹窗按钮
	$closeBtn.on('click', function() {
		$shade.fadeOut();
		$(this).parents('.popup').fadeOut();
	})

	// ======================================取消按钮======================================
	$('.infor-cancel').on('click', function() {
		$shade.fadeOut();
		$(this).parents('.infor-wrapper').fadeOut();
	});

	// 返回
	$('.next-opreate-popup .return-icon').on('click', function() {
		$('.next-opreate-popup').fadeOut();
		$('.next-task-popup').fadeIn();
	})
})
var taskId;
// 通知状态
function noticeDeteail() {
	$shade.fadeIn();
	$('.notice-detail-popup').fadeIn();

	$('#noticeDetail').datagrid({
		url : "getMessageDetail",
		queryParams : {
			UUId : UUId,
		},
		fitColumns : true,
		singleSelect : true,
		scrollbarSize : 6,
		columns : [
			[
				{
					field : 'name',
					title : '姓名',
					width : 100,
					align : 'center',
				},
				{
					field : 'telephone',
					title : '手机号',
					width : 100,
					align : 'center',
				},
				{
					field : 'send',
					title : '送达状态',
					width : 100
				},
				{
					field : 'receive',
					title : '回复状态',
					align : 'center',
					width : 100,
				},
			]
		]
	});
}

// 下次运维任务
function nextDeteail() {
	$shade.fadeIn();
	$('.next-task-popup').fadeIn();
	$('#nextTask').datagrid({
		url:"getNextTime",
		queryParams : {
			taskId : taskId
		},
		fitColumns : true,
		singleSelect : true,
		scrollbarSize : 6,
		columns : [
			[
				{
					field : 'taskType',
					title : '任务类型',
					width : 100,
					align : 'center',
				},
				{
					field : 'nextTime',
					title : '预计运维时间',
					width : 100,
					align : 'center',
				},
				{
					field : 'c',
					title : '操作说明',
					width : 100,
					align : 'center',
					formatter : function(value,rec) {
						return '<a class="next-operate-detail" onclick=nextOperate('+rec.taskCycleId+')>详情</a>'
					}
				},
			]
		]
	});
}

// 下次运维操作说明
function nextOperate(id) {
	$('.next-task-popup').fadeOut();
	$('.next-opreate-popup').fadeIn();
	$.ajax({
		type:"post",
		url:"getEquipOpstep",
		data:"taskCycleId="+id,
		dataType:"json",
		success:function(data){
			$(".next-opreate-popup .content").html(data.opstep);
		}
	});
}

// 运维详情
function ywDetail(id) {
	$('.next-task-popup').fadeOut();
	$('.yw-popup,.shade').fadeIn();
	 $.ajax({
	    	type:"post",
	    	url:"getTaskById",
	    	data:"taskId="+id,
	    	dataType:"json",
	    	success:function(data){
	    		$(".yw-table").find("tr").eq(0).find("td").eq(1).text(data.taskType);
	    		$(".yw-table").find("tr").eq(0).find("td").eq(3).text(data.opobj);
	    		$(".yw-table").find("tr").eq(1).find("td").eq(1).text(data.state);
	    		$(".yw-table").find("tr").eq(1).find("td").eq(3).text(data.remark);
	    		$(".yw-table").find("tr").eq(2).find("td").eq(1).text(data.persons);
	    		$(".yw-table").find("tr").eq(4).find("td").eq(1).find("p").text(data.feedback);
	    		var pics = data.pics;
	    		var content = "";
	    		if(pics.length > 0){
	    			for(var i=0; i<pics.length; i++){
	    				content += "<img src="+basePath()+pics[i].url+" alt=''>";
	    			}
	    		}
	    		$("#pics").html(content);
	    		
	    		var feedBacks = data.feedbackPics;
	    		var content1 = "";
	    		if(feedBacks.length > 0){
	    			for(var i=0; i<feedBacks.length; i++){
	    				content1 += "<img src="+basePath()+feedBacks[i].url+" alt=''>";
	    			}
	    		}
	    		$("#feedBacks").html(content1);
	    	}
	    });
}

function getEquip(){
	$.ajax({
		type:"post",
		url:"getEquip",
		data:"stationId="+$("#choseStation").val()+"&positionId="+$("#position1").val(),
		dataType:"json",
		success:function(data){
			var $select = $('#equip');  
			instance = $select.data('select2');  
	        if(instance){  
	          $select.select2('destroy').empty();  
	        }
	        $select.select2({
				data:data,
				language: "zh-CN"
			})
			 $select.val(0)
		}
	});
}

//===============根据区域获取厂站=================================
function getStation(areaId, stationStateId) {
	$.ajax({
		type : "POST",
		url :"getStations",
		async : false,
		data : "areaId=" + areaId + "&stationStateId=" + stationStateId,
		dataType : "json",
		success : function(msg) {
			var $select = $('#choseStation');  
			instance = $select.data('select2');  
	        if(instance){  
	          $select.select2('destroy').empty();  
	        }
	        $select.select2({
				data:msg,
				language: "zh-CN"
			})
			 $select.val(0)
		}
	});
}


//--------------获取厂站的状态----------------------------------------
function getStationState() {
	$.ajax({
		type : "POST",
		url : "getstate",
		async : false,
		dataType : "json",
		success : function(msg) {
			var content = "";
			$("#stationstate").empty();
			content += "<option value='0'>请选择投运状态</option>";
			for (var i = 0; i < msg.length; i++) {
				var name = msg[i].name;
				var id = msg[i].id;
				content += "<option value='" + id + "'>" + name + "</option>";
			}
			$("#stationstate").append(content);
		}
	});
}

//-----------------选择厂站的投运状态得到厂站----------------------------------------------
function getStationByState() {
	var areaId = $("#client").combotree("getValue");
	var stationStateId = $("#stationstate").val();
	if("请选择区域"==areaId){
		areaId=0;
	}
	getStation(areaId,stationStateId);
}

//===================顶部厂站的变化得到下面的设备的变化==========================
function getEquipsByStation(){
	getStationEquips1();
	getStationEquips2();
	getStationEquips3();
}



//-----------------得到厂站下面全部的设备----------------------------------------------
function getStationEquips1() {
	$.ajax({
		type : "POST",
		url : "getEquips",
		async : false,
		data : "stationId=" + $("#choseStation").val(),
		dataType : "json",
		success : function(msg) {
			var content = "";
			$("#allEquips1").empty();
			content += "<option value='0'>全部设备</option>";
			for (var i = 0; i < msg.length; i++) {
				var equipName = msg[i].equipName;
				var equipOnlyId = msg[i].equipOnlyId;
				var positionName=msg[i].positionName;
				content += "<option value='" + equipOnlyId + "'>" +positionName+"-"+ equipName + "</option>";
			}
			$("#allEquips1").append(content);
		}
	});
}

function getStationEquips2() {
	$.ajax({
		type : "POST",
		url : "getEquips",
		async : false,
		data : "stationId=" + $("#choseStation").val(),
		dataType : "json",
		success : function(msg) {
			var content = "";
			$("#allEquips2").empty();
			content += "<option value='0'>全部设备</option>";
			for (var i = 0; i < msg.length; i++) {
				var equipName = msg[i].equipName;
				var equipOnlyId = msg[i].equipOnlyId;
				var positionName=msg[i].positionName;
				content += "<option value='" + equipOnlyId + "'>" +positionName+"-"+ equipName + "</option>";
			}
			$("#allEquips2").append(content);
		}
	});
}
function getStationEquips3() {
	$.ajax({
		type : "POST",
		url : "getEquips",
		async : false,
		data : "stationId=" + $("#choseStation").val(),
		dataType : "json",
		success : function(msg) {
			var content = "";
			$("#allEquips3").empty();
			content += "<option value='0'>全部设备</option>";
			for (var i = 0; i < msg.length; i++) {
				var equipName = msg[i].equipName;
				var equipOnlyId = msg[i].equipOnlyId;
				var positionName=msg[i].positionName;
				content += "<option value='" + equipOnlyId + "'>" +positionName+"-"+ equipName + "</option>";
			}
			$("#allEquips3").append(content);
		}
	});
}
//查询厂站设备信息
function getStationEquipInfo(){
	$('#dg0').datagrid({
		url:"getStationEquipInfo",
    	queryParams : {
				stationId : $("#choseStation").val(),
				equipTempId:$("#equipTemp").val(),
				brand:$("#brand").find("option:selected").text(),
				positionId:$("#position").val(),
				stateId:$("#state").val()
			}
	});
}
//查询设备运维信息
function getEquipTask(){
	$('#dg1').datagrid({
		url : "getEquipTaskInfo",
		queryParams : {
			stationId : $("#choseStation").val(),
			taskTypeId : $("#taskType").val(),
			startTime : $("#startTime1").val(),
			endTime : $("#endTime1").val(),
		}
	});
}
//得到项目根路径
function basePath(){
	 //获取当前网址，如： http://localhost:8080/ems/Pages/Basic/Person.jsp
 var currentPath = window.document.location.href;
 //获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
 var pathName = window.document.location.pathname;
 var pos = currentPath.indexOf(pathName);
 //获取主机地址，如： http://localhost:8080
 var localhostPath = currentPath.substring(0, pos);
 //获取带"/"的项目名，如：/ems
 var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
 //获取项目的basePath   http://localhost:8080/ems/
 var basePath=localhostPath+projectName+"/";
 return basePath;
}