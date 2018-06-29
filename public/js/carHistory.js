$(function () {
    /*=========================初始化配置类+变量声明=========================*/

    var clearSuccessWrapper; // 成功弹窗setTimeout
    // 整体tab
    $('#tab').tabs({
        tabWidth: 80,
        tabHeight: 50,
        plain: true,
        // justified: true, // 生成等宽标题
        narrow:true, // 删除选项卡之间的间距
        onSelect: function(title,index){
        	if(index == 0){
        		$('#carRepair').datagrid("load",{"carTypeId":$("#carType").val(),"carNo":$("#carNo").val()});
        	}else{
        		$('#carOut').datagrid("load",{"carTypeId":$("#carType").val(),"carNo":$("#carNo").val()});
        	}
        }
    });

    // 出换车整体table
    $('#carOut').datagrid({
    	url: "getCarHistories",
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination : true,
        columns: [
            [	
            	{
            		field: "id",
            		hidden: true,
            	},
            	{
	                field: 'sheetTypeId',	//工单类型id
	                hidden: true,
            	},
                {
                    field: 'sheetTypeName',
                    title: '类型',
                    width: 80,
                },
            	{
	                field: 'realCarId',	//车辆id
	                hidden: true,
            	},
            	{
	                field: 'realCarTypeId',	//车辆类型id
	                hidden: true,
            	},
                {
                    field: 'realCarTypeName',
                    title: '车辆类型',
                    width: 80,
                },
                {
                    field: 'realCarNo',
                    title: '车牌号',
                    width: 80,
                },
                {
                    field: 'persons',
                    title: '运维人员',
                    width: 80,
                },
                {
                    field: 'detail',
                    title: '车辆详情',
                    width: 50,
                    align: 'center',
                    formatter: function (value, rec) {
                        return '<a class="td-detail" onclick="outDetail('+rec.realCarId+')">详情</a>';
                    }
                },
                {
                    field: 'workSheetNo',
                    title: '工单编号',
                    width: 80,
                },
                {
                    field: 'stateName',
                    title: '工单状态',
                    width: 50,
                    align: 'center',
                    formatter: function (value, row , index) {
//                    	if(row.stateId == 1 || row.stateId == 0){
//                    		return '<a class="td-state-no">'+row.stateName+'</a>';
//                    	}else{
//                    		return '<a class="td-state-yes">'+row.stateName+'</a>';
//                    	}
                    	if(row.stateId == 0){
	                		return '<a class="td-noPass">'+row.stateName+'</a>';
	                	}else if(row.stateId == 1){
	                		return '<a class="td-approval">'+row.stateName+'</a>';
	                	}else{
	                		return '<a class="td-pass">'+row.stateName+'</a>';
	                	}
                    }
                },
                {
                    field: 'createTime',
                    title: '派发时间',
                    width: 100,
                },
                {
                	field: "outTime",
                	hidden: true
                },
                {
                	field: "outKm",
                	hidden: true
                },
                {
                	field: "personName",
                	hidden: true
                },
                {
                    field: 'q',
                    title: '出车记录',
                    width: 50,
                    align: 'center',
                    formatter: function (value, row , index) {
                    	$("#outTime").html(row.outTime);
                    	$("#outKm").html(row.outKm);
                    	$("#personName").html(row.personName);
                        return '<a class="td-out" onclick="outHistory()">详情</a>';
                    }
                },
                {
                    field: 'w',
                    title: '还车记录',
                    width: 50,
                    align: 'center',
                    formatter: function (value, row , index) {
                        return '<a class="td-back" onclick="backHistory('+row.id+')">详情</a>';
                    }
                },
            ]
        ]
    });
    //维修记录table
    $('#carRepair').datagrid({
        fit: true,
        url: "getCarApplyForHis",
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination : true,
        columns: [
            [
            	{
            		field: "id",
            		hidden: true,
            	},
            	{
            		field: "carId",
            		hidden: true,
            	},
                {
                    field: 'carType',
                    title: '车辆类型',
                    width: 80,
                },
                {
                    field: 'carNo',
                    title: '车牌号',
                    width: 80,
                },
                {
                    field: 'description',
                    title: '故障描述',
                    width: 150,
                },
                {
                    field: 'persons',
                    title: '运维人员',
                    width: 80,
                },
                {
                    field: 'time',
                    title: '派发时间',
                    width: 150,
                },
                {
                    field: 'detail',
                    title: '车辆详情',
                    width: 50,
                    align: 'center',
                    formatter: function (value, rec) {
                        return '<a class="td-detail" onclick="repairDetail('+rec.carId+')">详情</a>';
                    }
                },
                {
	                field: 'stateName',
	                title: '工单状态',
	                width: 80,
	                align: 'center',
	                formatter: function (value, row , index) {
	                    //return '<a class="td-pass">通过</a>'; // <a class="td-approval">审批中</a> <a class="td-noPass">不通过</a>
	                	if(row.stateId == 0){
	                		return '<a class="td-noPass">'+row.stateName+'</a>';
	                	}else if(row.stateId == 1){
	                		return '<a class="td-approval">'+row.stateName+'</a>';
	                	}else{
	                		return '<a class="td-pass">'+row.stateName+'</a>';
	                	}
	                }
            },
            ]
        ]
    });

    // 弹窗内容滚动删除提示框
    $('.popup .content').on('scroll', function () {
        var tooltip = document.querySelector('.tooltip.tooltip-right');
        if (tooltip !== null) {
            $(this).find('input').trigger('blur');
        }
    });

    /*=========================弹窗=========================*/

    // 关闭弹窗
    $('.close-icon').on('click', function () {
        var $popup = $(this).parents('.popup');
        $('.shade').fadeOut();
        $popup.fadeOut();
    });

    /*=========================发票弹窗=========================*/

    $('.back-wrapper').on('click','.cost-img',function () {
    	$(".picture-wrapper img").attr("src",basePath()+$(this).prev().val());
        $('.shade, .picture-wrapper').fadeIn();
        $('.back-wrapper').fadeOut();
    });
    $('.picture-wrapper .return-icon').on('click',function () {
        $('.picture-wrapper').fadeOut();
        $('.back-wrapper').fadeIn();
    });


    /*=========================还车记录=========================*/

    var $backWrapper = $('.back-wrapper');
    $('.table-carOut').on('click','.td-back',function () {
        $backWrapper.fadeIn();
        $('.shade').fadeIn();
    });

    /*=========================其它=========================*/

    var exportBtn = document.querySelector('.export'); // 导出按钮
    exportBtn.addEventListener('click',function () {
        exportDetail();
    });
    
    
    /*=========================其它=========================*/
    
    $(".search-btn").click(function(){
    	var index = $('#tab').tabs('getTabIndex',$('#tab').tabs('getSelected'));
    	 if(index == 0){
    		 $('#carRepair').datagrid("load",{"carTypeId":$("#carType").val(),"carNo":$("#carNo").val()});
    	 }else{
    		 $('#carOut').datagrid("load",{"carTypeId":$("#carType").val(),"carNo":$("#carNo").val()});
    	 }
    })
});

/*=========================其它方法=========================*/

// 出还车记录/车辆详情
function outDetail(id) {
    window.location.href="../carInfo/toCarInfoDetail?$c*\a="+id;
}

// 出车记录
function outHistory() {
    $('.out-wrapper').fadeIn();
    $('.shade').fadeIn();
}

// 还车记录    ----没费用类型不加载费用类型表格
function backHistory(id) {
	$.post("getBackDetail",{"id":id},function(data){
		$(".backPerson").html(data.personName);
		$(".backTime").html(data.inTime);
		$(".backKm").html(data.inKm);

//    <div class="cost-item">
//        <span>油费</span>
//        <span>￥100.00<span>/100升</span></span>
//        <span class="cost-img"><i></i></span>
//    </div>
		var str ='';
		if(data.costRecords.length>0){
				str += '<div class="cost-item">';
				str	+=	'<span>费用类型</span>';
				str	+=	'<span>金额</span>';
				str	+=	'<span>发票照片</span>';
				str	+='</div>';
			$(data.costRecords).each(function(index,r){
				str += '<div class="cost-item">';
				str	+=	'<span>'+r.typeName+'</span>';
				str	+=	'<span>'+r.money+'</span>';
				str +=  '<input type="hidden" value="'+r.url+'">';
				str	+=	'<span class="cost-img"><i></i></span>';
				str	+='</div>';
			})
		}
		$(".back-cost").html(str);
	},"JSON")
    $('.back-wrapper').fadeIn();
    $('.shade').fadeIn();
}
// 维修记录/车辆详情
function repairDetail(id) {
	    window.location.href="../carInfo/toCarInfoDetail?$c*\a="+id;
}

// 导出
function exportDetail() {
	var index = $('#tab').tabs('getTabIndex',$('#tab').tabs('getSelected'));
	 if(index == 0){
		 window.location.href = "getCarApplyHisExcel";
	 }else{
		 window.location.href = "getCarOutHisExcel";
	 }
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