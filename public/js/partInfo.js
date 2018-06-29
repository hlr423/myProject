// ======================================全局变量======================================
var UUId;//点击事件的UUId
var $shade = $('.shade'); // 遮罩
$(function () {
    // ======================================下拉树======================================
    $('#client').combotree({
    	url: 'getAreaTree',
        method: 'get',
        width: 200,
        height: 30,
        hasDownArrow: false,
        onChange : function() {
			var areaId = $("#client").combotree("getValue");
			var stationStateId=$("#stationstate").val();
			getStation(areaId,stationStateId); //得到厂站的变化
			
		}
    });

    $('#choseStation').on("select2:select",function(){  
    	getEquips($('#choseStation').val());
    	getPartTemp($('#choseStation').val(), $("#infoEquipName").val())
    	changeTabOrStation();
    });  
    
    getStationState();//初始化加载所有的厂站的运行状态
    getStation(0,0);//初始化加载所有的厂站
    getEquips(0);
	getPartTemp(0, 0)
	getPartLife($('#choseStation').val());
	getEquipByStationAndPosition(0,0)
	getPartByEquipId(0)
    // 搜索框
    $('.station-input').on('keyup', function () {
        var $this = $(this);
        if (this.value.length == 0) {
            $this.css({
                'background-position': '35px'
            })
        } else {
            $this.css({
                'background-position': '180px'
            })
        }
    }).on('focus', function () {
        var $this = $(this);
        $this.css({
            border: '1px solid #59afff !important'
        })
    })

    // 整体tab
    $('#tab').tabs({
        tabWidth: 120,
        tabHeight: 50,
        plain: true,
        narrow: true, // 删除选项卡之间的间距
        onSelect: function (title, index) {
            if (index == 0) {

            } else if (index == 1) {//运维信息
                $('#dg1').datagrid({
                	url : "getPartTaskInfo",
					queryParams : {
						stationId : $("#choseStation").val(),
						taskTypeId : $("#taskType").val(),
						startTime : $("#startTime").val(),
						endTime : $("#endTime").val(),
					},
                    fit: true,
                    fitColumns: true,
                    rownumbers: true,
                    singleSelect: true,
                    pagination: true,     //开启分页  
                    pageSize: 10,         //分页大小  
                    scrollbarSize: 6,
                    columns: [
                        [	{
	                        	field: 'id',
                        		hidden: true
                        	},
                            {
                                field: 'taskType',
                                title: '任务类型',
                                width: 100,
                            },
                            {
                                field: 'opobj',
                                title: '操作对象',
                                width: 100
                            },
                            {
                                field: 'state',
                                title: '状态',
                                width: 100,
                                formatter: function (value,row,index) {
                                	if(row.stateId == 1 || row.stateId == 2){
                                		return '<span class="order-state no">'+value+'</span>';
                                	}else if(row.stateId == 3){
                                		return '<span class="order-state yes">'+value+'</span>';
                                	}else if(row.stateId == 4){
                                		return '<span class="order-state ing">'+value+'</span>';
                                	}
                                }
                            },
                            {
                                field: 'f',
                                title: '运维详情',
                                width: 100,
                                align: 'center',
                                formatter: function (value,row,index) {
                                    return '<a class="yw-detail" onclick=ywDetail('+row.id+')>详情</a>'
                                }
                            },
                            {
                                field: 'startTime',
                                title: '开始时间',
                                width: 100,
                            },  
                            {
                                field: 'endTime',
                                title: '结束时间',
                                width: 100,
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
            } else if (index == 2) {//故障信息
                $('#dg2').datagrid({
                	url : "getAbnormalInfo",
                	queryParams : {
            			stationId : $("#choseStation").val(),
            			partTempName:"",
            			startTime:null,
            			endTime:null,
            		},
                    fit: true,
                    fitColumns: true,
                    rownumbers: true,
                    singleSelect: true,
                    pagination: true,     //开启分页  
                    pageSize: 10,         //分页大小  
                    scrollbarSize: 6,
                    columns: [
                        [
                            {
                                field: 'partName',
                                title: '部件名称',
                                width: 100
                            },
                            {
                                field: 'equipName',
                                title: '所属设备',
                                width: 100
                            },
                            {
                                field: 'description',
                                title: '故障描述',
                                width: 100
                            },
                            {
                                field: 'level',
                                title: '故障等级',
                                width: 100
                            },
                            {
                                field: 'startTime',
                                title: '故障开始时间',
                                width: 100
                            },
                            {
                                field: 'endTime',
                                title: '故障结束时间',
                                width: 100
                            },
                            {
                                field: 'duringTime',
                                title: '持续时间(h)',
                                width: 100
                            },
                            {
                                field: 'person',
                                title: '响应人员',
                                width: 100
                            },
                            {
                                field: 'workSheetState',
                                title: '工单状态',
                                align: 'center',
                                width: 100,
                                formatter: function (value, rec) {
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
                                field: 'j',
                                title: '故障通知状态',
                                width: 100,
                                align: 'center',
                                formatter: function (rec,value, row, index) {
                                	if(value!=undefined){
                                		UUId=value.UUId;
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
            } else if (index == 3) {
                $('#dg3').datagrid({
                	url:"getPartLifeById",
                	queryParams : {
            			partId : $("#life-par").val()
            		},
                    fit: true,
                    fitColumns: true,
                    rownumbers: true,
                    singleSelect: true,
                    //pagination: true,     //开启分页  
                    //pageSize: 10,         //分页大小  
                    scrollbarSize: 6,
                    columns: [
                        [
                            {
                                field: 'name',
                                title: '状态',
                                width: 100
                            },
                            {
                                field: 'station',
                                title: '厂站',
                                width: 100
                            },
                            {
                                field: 'time',
                                title: '时间',
                                width: 100
                            },
                        ]
                    ],
					onLoadSuccess:function(data){
						if(data.total == 0){
							$(".time-chart").css({display:"none"});
							new CustomPrompt({
								type: 'error',
								msg: '没有相关记录'
							});
						}else{
							$(".time-chart").css({display:"block"});
						}
					}
                });
            }
            changeTabOrStation();
        }
    });

    // 基本信息
    $('#dg0').datagrid({
        fit: true,
        fitColumns: true,
        rownumbers: true,
        singleSelect: true,
        pagination: true,     //开启分页  
        pageSize: 10,         //分页大小  
        scrollbarSize: 6,
        columns: [
            [	{
	            	field: 'a',
	            	hidden: true
            	},
                {
                    field: 'tempName',
                    title: '部件名称',
                    width: 100,
                },
                {
                    field: 'equipName',
                    title: '所属设备',
                    width: 100
                },
                {
                    field: 'tempBrand',
                    title: '品牌',
                    width: 100
                },
                {
                    field: 'tempSpec',
                    title: '规格型号',
                    width: 100,
                },
                {
                	field: 'tempSupply',
                	title: '供应商',
                	width: 100,
                },
                {
                    field: 'curStaTime',
                    title: '在当前厂站运行时长(h)',
                    width: 100,
                },
                {
                	field: 'totalTime',
                	title: '运行总时长(h)',
                	width: 100,
                },
                {
                    field: 'f',
                    title: '生命周期',
                    width: 100,
                    align: 'center',
                    formatter: function (value,rec) {
                    	var partId;
                    	if(rec!=undefined){
                    		partId=rec.id;
                    	}
                        return '<a class="to-page" onclick="toPartDetail('+partId+')">详情</a>'
                    }
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
    })

    // ======================================初始化时间选择器======================================
    lay('.chose-time').each(function (e) {
        var _this = this;
        laydate.render({
            elem: this,
            type: 'datetime',
            theme: 'date'
        })
    })

    // ======================================关闭弹窗按钮======================================
    var $closeBtn = $('.close-icon'); // 关闭弹窗按钮
    $closeBtn.on('click', function () {
        $shade.fadeOut();
        $(this).parents('.popup').fadeOut();
    })

    // ======================================取消按钮======================================
    $('.infor-cancel').on('click', function () {
        $shade.fadeOut();
        $(this).parents('.infor-wrapper').fadeOut();
    });
    
    $("#life-pos").change(function(data){
    	getEquipByStationAndPosition($("#life-pos").val(),$('#choseStation').val())
    })
    
    $("#life-equ").change(function(data){
    	getPartByEquipId($("#life-equ").val())
    })
    
    $("#life-par").change(function(data){
    	$.post("getPartLifeById",{"partId":$(this).val()},function(data){
            var str = '';
            $(data).each(function(index,ob){
    			str += '<div class="content">';
    			str += '<div class="circle">'+ob.name+'</div>';
    			str += '<p>'+ob.station+'</p>';
    			str += '<p>'+ob.time+'</p>';
    			str += '<div class="line"></div>';
    			str += '</div>';
    		})
    		$(".time-chart").html(str);
    		$('#dg3').datagrid("loadData",data);
    		changeCurTitle();
    	},"json")
    })
    
    
    //导出excel
    $(".export-btn").click(function(){
    	var stationId = $('#choseStation').val();  
    	var stationName = $("#choseStation").find("option:selected").text();
        var tab = $('#tab').tabs('getSelected');
        var index = $('#tab').tabs("getTabIndex",tab);
        if(stationId == 0){
        	return ;
        }
        if(index == 0){
        	var tempName = $("#infoPartName").val();
        	window.location.href = "getPartInfoExcel?stationId="+stationId+"&name="+tempName+"&stationName="+stationName;
        }else if(index == 1){
        	var typeName = $("#taskType").val();
        	var startTime = $("#startTime").val();
        	var endTime = $("#endTime").val();
        	window.location.href = "getPartTaskExcel?stationId="+stationId+"&typeName="+typeName+"&stationName="
        	+stationName+"&startTime="+startTime+"&endTime="+endTime;
        }else if(index == 2){
        	
        }else if(index == 3){
        	var partId = $("#life-par").val();
        	if(partId>0){
        		var name = $("#choseStation").find("option:selected").text()+"-"+$("#cur-title").html(); 
        	}
        	window.location.href = "getPartLifeExcel?partId="+partId+"&name="+name;
        }
    })
    //运维信息查询
    $("#maintainSearch").click(function(){
    	var stationId = $('#choseStation').val();  
    	getMaintainInfo(stationId);
    })
    $("#faultInfo").click(function(){
    	var stationId = $('#choseStation').val();  
    	getFaultInfo(stationId);
    })
    
    
    $("#infoEquipName").change(function(){//基本信息中的设备的变化，部件出现变化
        var stationId=$("#choseStation").val();
        var equipId=$('#infoEquipName').val();
        
        //厂站的变化得到部件的名称
        getPartTemp(stationId,equipId);
    	getPartInfo(stationId,equipId);
    })
    
    
    $("#infoPartName").change(function(){//基本信息中的选择不同的部件，重新查数据
    	var stationId = $('#choseStation').val();
    	var equipId=$('#infoEquipName').val();
    	getPartInfo(stationId,equipId);
    })
    getPartInfo(0,0);
})

// 通知状态详情框
function noticeDeteail() {
    $shade.fadeIn();
    $('.notice-detail-popup').fadeIn();
     
    $('#noticeDetail').datagrid({
    	url : "getMessageDetail",
		queryParams : {
			UUId : UUId,
		},
        fitColumns: true,
        singleSelect: true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'name',
                    title: '姓名',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'telephone',
                    title: '手机号',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'send',
                    title: '送达状态',
                    width: 100
                },
                {
                    field: 'receive',
                    title: '回复状态',
                    align: 'center',
                    width: 100,
                },
            ]
        ]
    });
}

// 运维详情
function ywDetail(id) {
	$.post("getTaskDetail",{"taskId":id},function(data){
		$("#taskTypeName").html(data.taskType)
		$("#opobj").html(data.opobj)
		$("#state").html(data.state)
		$("#remark").html(data.remark)
		$("#startTime2").html(data.startTime)
		$("#endTime2").html(data.endTime)
		$("#persons").html(data.persons)
		var str = '';
		$(data.pics).each(function(index,jo){
			str += '<img src="'+basePath()+jo+'" alt="">';
		})
		$("#pics").html(str)
		var str2 = '';
		$(data.feedbackPics).each(function(index,jo){
			str2 += '<img src="'+basePath()+jo+'" alt="">';
		})
		$("#feedbackPics").html(str2)
	},"json")
    $('.next-task-popup').fadeOut();
    $('.yw-popup').fadeIn();
}



//===============根据区域以及运行状态获取厂站=================================
function getStation(areaId,stationStateId) {
	$.ajax({
		type : "POST",
		url : "getStations",
		async : false,
		data : "areaId=" + areaId+"&stationStateId="+stationStateId,
		dataType : "json",
		success : function(msg) {
			var $select = $('#choseStation');  
			instance = $select.data('select2');  
	        if(instance){  
	          $select.select2('destroy').empty();  
	        }
	        $select.select2({
				data:msg
			})
			 $select.val(0)
		}
	});
}
//得到设备的名称
 function getEquips(stationId){
 	$.ajax({
 		async: false,
 		url: "getEquips",
 		method: "post",
 		data: {"stationId":stationId},
 		dataType: "json",
 		success: function(data){
 			var str = '<option value="0">请选择设备</option>';
 			for(var i=0;i<data.length;i++){
 				str+='<option value="'+data[i].equipId+'">'+data[i].equipName+'</option>';
 			}
 			$("#infoEquipName").html(str);
 		}
 	})
 }
 //厂站的变化得到部件的名称
function getPartTemp(stationId,equipId){
	$.ajax({
		async: false,
		url: "getPartTempNames",
		method: "post",
		data: {"stationId":stationId,"equipId":equipId},
		dataType: "json",
		success: function(data){
			var str = '<option value="">请选择部件名称</option>';
			$(data).each(function(index,ob){
				str += '<option value="'+ob+'">'+ob+'</option>';
			})
			$("#faultPartName,#infoPartName").html(str);
		}
	})
}
//生命周期里查询设备
function getEquipByStationAndPosition(positionId,stationId){
	$.post("getEquipByStationAndPosition",{"positionId":positionId,"stationId":stationId},function(data){
		var str = '<option value="0">请选择设备</option>';
		$(data).each(function(index,ob){
			str += '<option value="'+ob.id+'">'+ob.name+'</option>';
		})
		$("#life-equ").html(str);
		changeCurTitle();
	},"json")
}
//生命周期里查询部件
function getPartByEquipId(equipId){
	$.post("getPartByEquipId",{"equipId":equipId},function(data){
		var str = '<option value="0">请选择部件</option>';
		$(data).each(function(index,ob){
			str += '<option value="'+ob.id+'">'+ob.name+'</option>';
		})
		$("#life-par").html(str);
		changeCurTitle();
	},"json")
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
function getStationByState(){
	var areaId = $("#client").combotree("getValue");
	var stationStateId=$("#stationstate").val();
	if("请选择区域"==areaId){
		areaId=0;
	}
	getStation(areaId,stationStateId);
}

function changeTabOrStation(){
	var stationId = $('#choseStation').val();  
	var equipId=$('#infoEquipName').val();
    var tab = $('#tab').tabs('getSelected');
    var index = $('#tab').tabs("getTabIndex",tab);
    if(stationId == 0){
    	return ;
    }
    if(index == 0){
    	getPartInfo(stationId,equipId);
    }else if(index == 1){
    	getMaintainInfo(stationId);
    }else if(index == 2){
    	getFaultInfo(stationId)
    }else if(index == 3){
    	$("#cur-title").html("");
    	getPartLife(stationId);
    }
}
function getPartInfo(stationId,equipId){		//基本信息
	$('#dg0').datagrid({
		url:"getPartInfo",
		queryParams:{"stationId":stationId,"equipId":equipId,"name":$("#infoPartName").val()}
	})
}
function getMaintainInfo(stationId){	//运维信息
	$('#dg1').datagrid({
		url:"getPartTaskInfo",
		queryParams:{
			"stationId":stationId,
			"typeName":$("#taskType").val(),
			"startTime":$("#startTime").val(),
			"endTime":$("#endTime").val(),
			}
	})
}
function getFaultInfo(stationId){		//故障信息
	var partTempName = $("#faultPartName option:selected").text();
	if(partTempName == "请选择部件类型"){
		partTempName = "";
	}
	console.log("partTempName==="+$("#faultPartName").val());
	$('#dg2').datagrid({
		url:"getAbnormalInfo",
		queryParams:{
			"stationId":stationId,
			partTempName:$("#faultPartName").val(),
			startTime:$("#startTime1").val(),
			endTime:$("#endTime1").val(),
			}
	})
}
function getPartLife(stationId){		//生命周期
	$.post("getPostionByStationId",{"stationId":stationId},function(data){
		var str = '<option value="0">请选择位置</option>';
		$(data).each(function(index,ob){
			str += '<option value="'+ob.id+'">'+ob.name+'</option>';
		})
		$("#life-pos").html(str);
	},"json")
}

function changeCurTitle(){
	var str = '';
	if($("#life-pos").val()!=0){
		str += $("#life-pos").find("option:selected").text();
	}
	if($("#life-equ").val()!=0){
		str += "-"+$("#life-equ").find("option:selected").text();
	}
	if($("#life-par").val()!=0){
		str += "-"+$("#life-par").find("option:selected").text();
	}
	$("#cur-title").html(str);
}

//部件基本信息的生命周期的跳转
function toPartDetail(id){
	$('#tab').tabs('select',3);
	  $.post("getPartLifeById",{"partId":id},function(data){
          var str = '';
          $(data).each(function(index,ob){
  			str += '<div class="content">';
  			str += '<div class="circle">'+ob.name+'</div>';
  			str += '<p>'+ob.station+'</p>';
  			str += '<p>'+ob.time+'</p>';
  			str += '<div class="line"></div>';
  			str += '</div>';
  		})
  		$(".time-chart").html(str);
  		$('#dg3').datagrid("loadData",data);
  		changeCurTitle();
  	},"json")
}
//查询部件运维信息
function getPartTask(){
	$('#dg1').datagrid({
		url : "getPartTask",
		queryParams : {
			stationId : $("#choseStation").val(),
			taskTypeId : $("#taskType").val(),
			startTime : $("#startTime").val(),
			endTime : $("#endTime").val(),
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
var basePath=localhostPath+projectName;
return projectName;
}