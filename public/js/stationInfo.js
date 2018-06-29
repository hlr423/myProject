// ======================================全局变量======================================
var UUId;//短信点击事件的UUId
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
    $.ajax({
		type:"post",
		url:"getAllTaskType",
		dataType:"json",
		success:function(data){
			var content = "<option value='0'>请选择任务类型</option>";
			if(data.length > 0){
				for(var i=0; i<data.length; i++){
					content += "<option value="+data[i].id+">"+data[i].name+"</option>";
				}
			}
			$("#taskType").html(content);
		}
	})
    
    getStationState();
    getStation(0,0);
    getStationInfo($("#choseStation").val());
    

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

    // 厂站选择select
    $('#choseStation').on('change', function () {
    	var stationId = $("#choseStation").select2("data")[0].id;//$("#choseStation").val()也可以
    	sId = stationId;
    	getStationInfo(stationId);
    	getTask();
    	getCommunication(stationId);
    	
    })
    $("#search").on("click",function(){
    	getTask();
    })
    // 整体tab
    $('#tab').tabs({
        tabWidth: 120,
        tabHeight: 50,
        plain: true,
        narrow: true, // 删除选项卡之间的间距
        onSelect: function (title, index) {
        	if (index == 0) {
        		getStationInfo($("#choseStation").val());
			}else if (index == 1) {
            	$(".search-wrapper:eq(1)").css("display",'block');
                $('#dg1').datagrid({
                	url : "getAbnormalInfo",
                	queryParams : {
            			stationId : $("#choseStation").val(),
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
                                field: 'abnormalType',
                                title: '异常类型',
                                width: 100,
                                formatter: function (value) {
                                	var content="";
                                	if(value!=undefined){
                                		if(value=="预警"){
                                			content+='<span class="erro-type yj">预警</span>';
                                		}else if(value=="告警"){
                                			content+='<span class="erro-type gj">告警</span>';
                                		}else if(value=="故障"){
                                			content+='<span class="erro-type gz">故障</span>';
                                		}
                                	}
                                    return content;
                                }
                            },
                            {
                                field: 'equipName',
                                title: '设备名称',
                                width: 100
                            },
                            {
                                field: 'description',
                                title: '异常描述',
                                width: 100
                            },
                            {
                                field: 'level',
                                title: '等级',
                                width: 100
                            },
                            {
                                field: 'startTime',
                                title: '开始时间',
                                width: 100
                            },
                            {
                                field: 'endTime',
                                title: '结束时间',
                                width: 100
                            },
                            {
                                field: 'duringTime',
                                title: '持续时间（小时）',
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
                                title: '通知状态',
                                width: 100,
                                align: 'center',
                                formatter: function (value, rec) {
                                	if(value!=undefined){
                                		UUId=value.UUId;
                                		return '<a class="notice-detail" onclick=noticeDeteail()>详情</a>'
                                	}
                                }
                            }
                        ]
                    ]
                });

            } else if (index == 2) {
            	$(".search-wrapper:eq(2)").css("display",'block');
                $('#dg2').datagrid({
                	url : "getStationTask",
                	queryParams : {
            			stationId : $("#choseStation").val(),
            			taskTypeId :0,
            			startTime:"",
            			endTime:""
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
                                field: 'taskType',
                                title: '任务类型',
                                width: 100,
                                align: 'center'
                            },
                            {
                                field: 'persons',
                                title: '运维人员',
                                width: 100
                            },
                            {
                                field: 'carType',
                                title: '车辆类型',
                                width: 100,
                                align: 'center'
                            },
                            {
                                field: 'carNo',
                                title: '车牌号',
                                width: 100,
                                align: 'center'
                            },
                            {
                                field: 'state',
                                title: '状态',
                                width: 100,
                                align: 'center',
                                formatter: function(value,rec) {
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
                                field: 'f',
                                title: '运维详情',
                                width: 100,
                                align: 'center',
                                formatter: function(value,rec) {
                                    return '<a class="yw-detail" onclick=ywDetail('+rec.id+')>详情</a>'
                                } 
                            },
                            {
                                field: 'startTime',
                                title: '开始时间',
                                width: 100,
                                formatter: function (value,row) {
                                    return  "<span title='" + value + "'>" + value + "</span>"; 
                                }
                            },
                            {
                                field: 'endTime',
                                title: '结束时间',
                                width: 100,
                                formatter: function (value,row) {
                                    return  "<span title='" + value + "'>" + value + "</span>"; 
                                }
                            },
                            {
                                field: 'nextTime',
                                title: '下次运维任务',
                                width: 100,
                                formatter: function (value,row) {
                                    return  "<span title='" + value + "'>" + value + "</span>"; 
                                }
                            }
                        ]
                    ],
                    onLoadSuccess:function(data){
                    	if(data.total == 0){
                    		 $(this).datagrid('appendRow', { taskType: '<div style="text-align:center;color:red">没有相关记录！</div>' }).datagrid('mergeCells', { index: 0, field: 'taskType', colspan: 9 })
                             //隐藏分页导航条，这个需要熟悉datagrid的html结构，直接用jquery操作DOM对象，easyui datagrid没有提供相关方法隐藏导航条
                             $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
                    	}
                    }
                });
            
            } else if (index == 3) {
                $('#dg4').datagrid({
                	url:'getStationCommuncation',
                	queryParams:{
                		stationId:$("#choseStation").val(),
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
                                field: 'state',
                                title: '状态',
                                width: 100,
                                align: 'center',
                                formatter: function(value,rec) {
                                	var node;
                                	if(value==1){
                                		node='<span class="com-state online">在线</span>';
                                	}else if(value==0){
                                		node='<span class="com-state discon">断线</span>';
                                	}
                                    return node;
                                } 
                            },
                            {
                                field: 'stationName',
                                title: '厂站',
                                width: 100,
                                align: 'center'
                            },
                            {
                                field: 'time',
                                title: '时间',
                                width: 100,
                                align: 'center'
                            },
                        ]
                    ]
                });
            }else{
            	$(".search-wrapper:eq(1),.search-wrapper:eq(2)").css("display",'block');
            }
        }
    });

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

    // ======================================SIM卡号详情框======================================
    var simBtn = document.getElementsByClassName('sim-btn')[0];
    simBtn.addEventListener('click', function () {
        $shade.fadeIn();
        $('.sim-popup').fadeIn();
    })

    var mapBtn = document.getElementsByClassName('map-btn')[0];
    mapBtn.addEventListener('click', function () {
        $shade.fadeIn();
        $('.map-popup').fadeIn();

        var map = new BMap.Map("allmap", {
            minZoom: 5,
            maxZoom: 20
        }); // 创建Map实例,设置地图允许的最小/大级别
        map.enableScrollWheelZoom(); //开启鼠标滚轮缩放
//        getBoundary("简阳市");
//        //加载行政区域
//        function getBoundary(cityName) {
//            var zoomNum = 11;
//            if (cityName.split(",").length > 1) {
//                zoomNum = 10;
//            }
//            for (var i = 0; i < cityName.split(",").length; i++) {
//                var cn = cityName.split(",")[i];
//                var bdary = new BMap.Boundary();
//                bdary.get(cn, function (rs) { //获取行政区域
//                    //map.clearOverlays();        //清除地图覆盖物       
//                    var count = rs.boundaries.length; //行政区域的点有多少个
//                    if (count === 0) {
//                        alert('未能获取当前输入行政区域');
//                        return;
//                    }
//                    var pointArray = [];
//                    for (var i = 0; i < count; i++) {
//                        var ply = new BMap.Polygon(rs.boundaries[i], {
//                            strokeWeight: 2,
//                            strokeColor: "#0c6bfb",
//                            fillColor: "#0c6bfb",
//                            fillOpacity: 0.1
//                        }); //建立多边形覆盖物
//                        map.addOverlay(ply); //添加覆盖物
//                        pointArray = pointArray.concat(ply.getPath());
//                    }
//                    map.setViewport(pointArray); //调整视野
//                    map.setZoom(zoomNum);
//
//                });
//            }
//        }

        // 添加覆盖物
        var lnglat = $("#info").find(".detail-item").eq(6).find("span").text();
        var array = lnglat.split(",");
        var point = new BMap.Point(array[0],array[1]);
        map.centerAndZoom(point, 15);
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);               // 将标注添加到地图中
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    })

    // ======================================投运按钮======================================
    var runBtn = document.getElementsByClassName('run')[0];
    runBtn.addEventListener('click', function () {
        $shade.fadeIn();
        $('.run-wrapper').fadeIn();


    })

    // ======================================取消按钮======================================
    $('.infor-cancel').on('click', function () {
        $shade.fadeOut();
        $(this).parents('.infor-wrapper').fadeOut();
    });

    // ======================================确认投运按钮======================================
    var runConfirm = document.getElementsByClassName('run-confirm')[0];
    runConfirm.addEventListener('click', function () {
    	$shade.fadeOut();
    	$('.run-wrapper').fadeOut();
    	$.ajax({
    		type:"post",
    		url:"updateStationUseTime",
    		data:"stationId="+sId,
    		dataType:"json",
    		success:function(data){
    			if(data == 1){
    				new CustomPrompt({
    	                type: 'success',
    	                msg: '投运成功'
    	            });
    				getStationInfo(sId);
    			}else{
    				new CustomPrompt({
    	                type: 'default',
    	                msg: '投运失败'
    	            });
    			}
    		}
    	});
    });


    $('.next-opreate-popup .return-icon').on('click', function () {
        $('.next-opreate-popup').fadeOut();
        $('.next-task-popup').fadeIn();
    })

    
    
   //查询
    $('.search-btn').on('click',function(){
    		$("#dg1").datagrid({
    			url : "getAbnormalInfo",
            	queryParams : {
        			stationId : $("#choseStation").val(),
        			abnormalTypeId:$("#abnormalType").val(),
        			startTime:$("#startTime1").val(),
        			endTime:$("#endTime1").val(),
        		},
    		});
    });
    //查看设备信息
    $(".to-eq").on("click",function(){
    	window.location.href="../equipInfo/toEquipInfo?id="+$("#choseStation").val();
    });
    //查看备件信息
    $(".to-parts").on("click",function(){
    	window.location.href="../partInfo/toPartInfo?id="+$("#choseStation").val();
    });
    
    $('#dg0').datagrid({
		url:"getStationInfo",
    	queryParams : {
				stationId : $("#choseStation").val()
			},
		fit : true,
		fitColumns : true,
		scrollbarSize : 6,
		onLoadSuccess:function(data){
			
		}
	})
})
var sId;
// 获取当前年月日星期
function getCurDay() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var week = date.getDay();

    switch (week) {
        case 0:
            week = '星期日'
            break;
        case 1:
            week = '星期一'
            break;
        case 2:
            week = '星期二'
            break;
        case 3:
            week = '星期三'
            break;
        case 4:
            week = '星期四'
            break;
        case 5:
            week = '星期五'
            break;
        case 6:
            week = '星期六'
            break;
    }

    var curDay = document.getElementById('curDay');
    curDay.innerHTML = year + '年' + month + '月' + day + '&nbsp;' + week;
}

window.onload = getCurDay;

// 通知状态
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
                    field: 'a',
                    title: '姓名',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'b',
                    title: '手机号',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'c',
                    title: '送达状态',
                    width: 100
                },
                {
                    field: 'd',
                    title: '回复状态',
                    align: 'center',
                    width: 100,
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
        fitColumns: true,
        singleSelect: true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'a',
                    title: '任务类型',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'b',
                    title: '预计运维时间',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'c',
                    title: '操作说明',
                    width: 100,
                    align: 'center',
                    formatter: function () {
                        return '<a class="next-operate-detail" onclick=nextOperate()>详情</a>'
                    }
                },
            ]
        ]
    });
}

// 下次运维操作说明
function nextOperate() {
    $('.next-task-popup').fadeOut();
    $('.next-opreate-popup').fadeIn();
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

//===============根据区域获取厂站=================================
function getStation(areaId,stationStateId) {
	$.ajax({
		type : "POST",
		url : "getStations",
		async:false,
		data : "areaId=" + areaId+"&stationStateId="+stationStateId,
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
function getStationByState(){
	var areaId = $("#client").combotree("getValue");
	var stationStateId=$("#stationstate").val();
	if("请选择区域"==areaId){
		areaId=0;
	}
	getStation(areaId,stationStateId);
}
function getStationInfo(stationId){
	if (stationId == 0 || stationId == null || stationId == 'undefined') {
        // 第一个选项卡
        document.getElementsByClassName('chosed')[0].style.display = 'none';
        document.getElementsByClassName('no-chose')[0].style.display = 'flex';
        document.getElementsByClassName('operate')[0].style.display = 'none';
    } else {
    	// 第一个选项卡
        document.getElementsByClassName('chosed')[0].style.display = 'flex';
        document.getElementsByClassName('no-chose')[0].style.display = 'none';
        document.getElementsByClassName('operate')[0].style.display = 'block';

        // 初始化轮播
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            autoplay: 3000
        });
    	$.ajax({
    		type:"post",
    		url:"getStationInfoById",
    		data:"stationId="+stationId,
    		dataType:"json",
    		success:function(data){
    			$("#stationName").text(data.stationName);
    			$("#qrcode").attr("src",basePath()+data.qrcode);
    			$("#info").find(".detail-item").eq(0).find("span").text(data.totalArea+"㎡");
    			$("#info").find(".detail-item").eq(1).find("span").text(data.treatWater+"㎡/d");
    			$("#info").find(".detail-item").eq(2).find("span").text(data.useTime);
    			$("#info").find(".detail-item").eq(3).find("span").text(data.area);
    			$("#info").find(".detail-item").eq(4).find("span").text(data.personName);
    			$("#info").find(".detail-item").eq(5).find("span").text(data.personTel);
    			$("#info").find(".detail-item").eq(6).find("span").text(data.lnglat);
    			$("#info").find(".detail-item").eq(7).find("a").text(data.address);
    			$("#info").find(".detail-item").eq(8).find("a").text(data.sim);
    			
    			var pics = data.pics;
    			var content = "";
    			if(pics.length > 0){
    				for(var i=0; i<pics.length; i++){
    					content += "<div class='swiper-slide'><img src="+basePath()+pics[i].url+" alt=''></div>";
    				}
    			}
    			$(".swiper-wrapper").html(content);
    			
    			// 判断是否投运
                if (data.stationState == 1) {
                    $('.run').show()
                } else {
                    $('.run').hide()
                }
    		}
    	});
    }
}
function getTask(){
	$('#dg2').datagrid({
    	url : "getStationTask",
    	queryParams : {
			stationId : sId,
			taskTypeId :$("#taskType").val(),
			startTime:$("#startTime").val(),
			endTime:$("#endTime").val()
		}
	});
}

function getCommunication(stationId){
	 $('#dg4').datagrid({
     	url:'getStationCommuncation',
     	queryParams:{
     		stationId:stationId,
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
