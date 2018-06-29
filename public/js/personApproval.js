$(function () {
    /*=========================初始化配置+变量声明=========================*/
    // 初始化请假时间插件
    laydate.render({ // 初始化范围选择(到小时)
        elem: '.leave-popup .chose-time',
        type: 'datetime',
        format: 'yyyy-MM-dd HH时',
        range: true,
        trigger: 'click', //采用click弹出
        change: function(value, date, endDate){
            $('.leave-popup .hours').val(hours(date,endDate))
        },
    });
    // 初始化加班时间插件    
    laydate.render({ // 初始化范围选择(到小时)
        elem: '.work-popup .chose-time',
        type: 'datetime',
        format: 'yyyy-MM-dd HH时',
        range: true,
        change: function(value, date, endDate){
            $('.work-popup .hours').val(hours(date,endDate))
        },
    });
    
    // 整体tab
    $('#tab').tabs({
        tabWidth: 80,
        tabHeight: 50,
        plain: true,
        // justified: true, // 生成等宽标题
        narrow:true, // 删除选项卡之间的间距
        onSelect: function () {
            $('.layui-laydate').hide();
            $('.chose-time').val('');
        }
    });
    // 待我审批整体table
    $('#approvalWait').datagrid({
    	url:"getPersonApprovals",
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination : true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'approvalTypeName',
                    title: '审批类型',
                    width: 100,
                },
                {
                    field: 'person',
                    title: '姓名',
                    width: 100,
                },
                {
                    field: 'createTime',
                    title: '提交时间',
                    width: 150,
                    align: 'center'
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) {
                        var node = '<div class="table-operation">' +
                        '<a class="table-detail" onClick="waitOpen('+row.id+','+row.approvalTypeId+')">详情</a> ' +
                        '</div>';
                        return  node;
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
    // 我已审批整体table
    $('#approvalOver').datagrid({
    	url:"getPersonEndApprovals",
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination : true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'approvalTypeName',
                    title: '审批类型',
                    width: 100,
                },
                {
                    field: 'person',
                    title: '姓名',
                    width: 100,
                },
                {
                    field: 'createTime',
                    title: '提交时间',
                    width: 150,
                    align: 'center'
                },
                {
                    field: 'state',
                    title: '操作',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) {
                        var node = '<div class="table-operation">' +
                        '<a class="table-detail" onClick="overOpen('+row.id+','+row.approvalTypeId+')">详情</a> ' +
                        '</div>';
                        return  node
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
    // 我发起的审批整体table
    $('#approvalMy').datagrid({
    	url:"getPersonRecords",
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination : true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'approvalTypeName',
                    title: '审批类型',
                    width: 100,
                },
                {
                    field: 'applyPerson',
                    title: '姓名',
                    width: 100,
                },
                {
                    field: 'approvalStatus',
                    title: '审批状态',
                    width: 100,
                    formatter: function (value, row , index) {
                    	var node='';
                    	if(row.approvalStatus==3){
                    		node='<font color="green">通过</font>'
                    	}else if(row.approvalStatus==4){
                    		node='<font color="red">不通过</font>'
                    	}else{
                    		node='<font color="orange">审批中</font>'
                    	}
                        return  node;
                    }
                },
                {
                    field: 'createTime',
                    title: '提交时间',
                    width: 150,
                    align: 'center'
                },
                {
                    field: 'state',
                    title: '操作',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) {
                        var node = '<div class="table-operation">' +
                        '<a class="table-detail" onClick="myOpen('+row.id+','+row.approvalTypeId+')">详情</a> ' +
                        '<a class="table-delete" onClick="deleteRecord('+row.id+','+row.approvalTypeId+')">删除</a> ' +
                        '</div>';
                        return  node;
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

    /*=========================弹窗=========================*/
    // 关闭弹窗
    $('.close-icon').on('click',function () { 
        $(this).parents('.popup').fadeOut();
        $('.shade').fadeOut();
     })
     // ======================================取消按钮======================================
    $('.infor-cancel').on('click', function () {
    	$('.shade').fadeOut();
        $(this).parents('.infor-wrapper').fadeOut();
    });

    /*=========================审批通过+不通过框=========================*/
    var pass = document.querySelector('.pass');
    var noPass = document.querySelector('.noPass');
    // 确认通过
    pass.addEventListener('click',function () {
        new CustomPrompt({
            type: 'success',
            msg: '操作成功'
        });
        $('.shade').fadeOut();
        $(this).parents('.infor-wrapper').fadeOut();
    });
    // 确认不通过
    noPass.addEventListener('click',function () {
        new CustomPrompt({
            type: 'success',
            msg: '操作成功'
        });
        $('.shade').fadeOut();
        $(this).parents('.infor-wrapper').fadeOut();
    });
    // 取消弹窗
    $('.infor-cancel').on('click',function () {
        $('.shade').fadeOut();
        $(this).parents('.infor-wrapper').fadeOut();
    });

    /*=========================请假框=========================*/
    var leaveBtn = document.querySelector('.approval-leave');// 请假按钮
    var $leavePopup = $('.leave-popup');
    var leaveSubmit = document.querySelector('.leave-submit'); // 提交
    // 打开请假弹窗+初始化
    leaveBtn.addEventListener('click',function(){
        $('.shade').fadeIn();
        $leavePopup.fadeIn();
        $leavePopup.find('input[type=text]').not($leavePopup.find('.textbox.combo input[type=text]')).val('');
        $leavePopup.find('textarea').val('');
        $leavePopup.find('select').val(0);
        /*$('#leave-person').combotree({
            url: '../data/tree_data1.json',
            method: 'get',
            width: 300,
            height: 30,
            hasDownArrow: false
        });*/
        var url="getApprovalPersons";
        var param={"approvalTypeId":2};
        $.post(url,param,function(data){
        	var content='<label for="leave-person">审批人:</label>';
        	$.each(data,function(i,n){
        		content+='<div class="leave-person"><div><span>'+n.person+'</span><p>'+n.person+'</p><div>'+n.role+'</div></div></div>';
        	});
        	$('#levalApproval').html(content);
        },"json");
        
    });
    // 请假提交
    leaveSubmit.addEventListener('click',function(){
        $('.leave-form').form('submit',{
        	url: 'addPersonRecord?approvalTypeId=2',
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                var $hours = $(this).find('.hours').val();
                if($hours == ''){
                    new CustomPrompt({
                        type: 'default',
                        msg: '请选择时间!!'
                    });
                    return false;
                }else if($hours.indexOf(".")!=-1){//表示小数
                	var ishours = $hours.substring($hours.indexOf(".") + 1,$hours.length);
                	if(ishours.length>1){
                		new CustomPrompt({
                			type: 'default',
                			msg: '时长不能超过小数点一位!!'
                		});
                		return false;                		
                	}
                }
                return formValue                
            },
            success: function (data) {
            	var json = eval("("+data+")");
            	if(json.status==200){
            		new CustomPrompt({
            			type: 'success',
            			msg: '提交成功'
            		});
            		$('#approvalMy').datagrid('reload');
            		$('#approvalWait').datagrid('reload');
            	}else{
            		new CustomPrompt({
            			type: 'error',
            			msg: '提交失败'
            		});  
            	}
                $leavePopup.fadeOut();
                $('.shade').fadeOut();       
            }
        })
    });

    /*=========================加班框=========================*/
    var workBtn = document.querySelector('.approval-work'); // 加班按钮
    var $workPopup = $('.work-popup');
    var workSubmit = document.querySelector('.work-submit'); // 加班提交
    // 打开加班弹窗+初始化
    workBtn.addEventListener('click',function(){
        $('.shade').fadeIn();
        $workPopup.fadeIn();
        $workPopup.find('input[type=text]').not($workPopup.find('.textbox.combo input[type=text]')).val('');
        $workPopup.find('textarea').val('');
        $workPopup.find('select').val(0);
        $('#personIds').combotree('setValue',$('#personId').val());
        
        var url="getApprovalPersons";
        var param={"approvalTypeId":1};
        $.post(url,param,function(data){
        	var content='<label for="leave-person">审批人:</label>';
        	$.each(data,function(i,n){
        		content+='<div class="leave-person"><div><span>'+n.person+'</span><p>'+n.person+'</p><div>'+n.role+'</div></div></div>';
        	});
        	$('#addApproval').html(content);
        },"json");
    });
    // 加班提交
    workSubmit.addEventListener('click',function(){
        $('.work-form').form('submit',{
        	url: 'addPersonRecord?approvalTypeId=1',
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                var $hours = $(this).find('.hours').val();
                var $holiday = $(this).find('.holiday');
                if($hours == ''){
                    new CustomPrompt({
                        type: 'default',
                        msg: '请选择时间!!'
                    });
                    return false;
                }else if($holiday.val() == '' || $holiday.val() == 0){
                    new CustomPrompt({
                        type: 'default',
                        msg: '请选择法定节日!!'
                    });
                    return false;
                }
                if($hours.indexOf(".")!=-1){//表示小数
                	var ishours = $hours.substring($hours.indexOf(".") + 1,$hours.length);
                	if(ishours.length>1){
                		new CustomPrompt({
                			type: 'default',
                			msg: '时长不能超过小数点一位!!'
                		});
                		return false;                		
                	}
                }
                return formValue
            },
            success: function (data) {
            	var json = eval("("+data+")");
            	if(json.status==200){
            		new CustomPrompt({
            			type: 'success',
            			msg: '提交成功'
            		}); 
            		$('#approvalMy').datagrid('reload');
            		$('#approvalWait').datagrid('reload');
            	}else{
            		new CustomPrompt({
            			type: 'error',
            			msg: '提交失败'
            		});  
            	}
                $workPopup.fadeOut();
                $('.shade').fadeOut();       
            }
        })
    });

    /*=========================待我审批=========================*/
    var workPassSubmit = document.querySelector('.work-pass'); // 通过按钮
    var workNopassSubmit = document.querySelector('.work-nopass'); // 不通过按钮
    /*var carPassSubmit = document.querySelector('.car-pass'); // 车辆通过按钮
    var carNopassSubmit = document.querySelector('.car-nopass'); // 车辆不通过按钮
    var equipPassSubmit = document.querySelector('.equip-pass'); // 设备通过按钮
    var equipNopassSubmit = document.querySelector('.equip-nopass'); // 设备不通过按钮
    var jobPassSubmit = document.querySelector('.job-pass'); // 工单通过按钮
    var jobNopassSubmit = document.querySelector('.job-nopass'); // 工单不通过按钮*/    
    // 通过提交
    workPassSubmit.addEventListener('click',function(){
    	if(aTypeId==1 || aTypeId==2){//加班\请假
    		var url="updatePersonApproval";
    		var param={"personApprovalId":approvalId,"approvalStatusId":3};
    		$.post(url,param,function(data){
    			if(data.data==1){
    				new CustomPrompt({
    		            type: 'success',
    		            msg: '提交成功'
    		        });
    				$('#approvalMy').datagrid('reload');
    				$('#approvalWait').datagrid('reload');
    				$('#approvalOver').datagrid('reload');
    			}else{
    				new CustomPrompt({
    		            type: 'error',
    		            msg: '提交失败'
    		        });
    			}
    		},"json");
    	}else if(aTypeId==3){//设备报废
    		
    	}else if(aTypeId==4){//车辆维修
    		
    	}else if(aTypeId==6){//异常任务
    		
    	}
        $(this).parents('.popup').fadeOut();
        $('.shade').fadeOut();
    });
    // 不通过提交 
    workNopassSubmit.addEventListener('click',function(){
    	if(aTypeId==1 || aTypeId==2){//加班\请假
    		var url="updatePersonApproval";
    		var param={"personApprovalId":approvalId,"approvalStatusId":4};
    		$.post(url,param,function(data){
    			if(data.data==1){
    				new CustomPrompt({
    		            type: 'success',
    		            msg: '提交成功'
    		        });
    				$('#approvalMy').datagrid('reload');
    				$('#approvalWait').datagrid('reload');
    				$('#approvalOver').datagrid('reload');
    			}else{
    				new CustomPrompt({
    		            type: 'error',
    		            msg: '提交失败'
    		        });
    			}
    		},"json");
    	}else if(aTypeId==3){//设备报废
    		
    	}else if(aTypeId==4){//车辆维修
    		
    	}else if(aTypeId==6){//异常任务
    		
    	}
        $(this).parents('.popup').fadeOut();
        $('.shade').fadeOut();
    });
    /*// 车辆通过提交
    carPassSubmit.addEventListener('click',function(){
        new CustomPrompt({
            type: 'success',
            msg: '提交成功'
        });
        $(this).parents('.popup').fadeOut();
        $('.shade').fadeOut();
    });
    // 车辆不通过提交
    carNopassSubmit.addEventListener('click',function(){
        new CustomPrompt({
            type: 'success',
            msg: '提交成功'
        });
        $(this).parents('.popup').fadeOut();
        $('.shade').fadeOut();
    });
    // 设备通过提交
    equipPassSubmit.addEventListener('click',function(){
        new CustomPrompt({
            type: 'success',
            msg: '提交成功'
        });
        $(this).parents('.popup').fadeOut();
        $('.shade').fadeOut();
    });
    // 设备不通过提交
    equipNopassSubmit.addEventListener('click',function(){
        new CustomPrompt({
            type: 'success',
            msg: '提交成功'
        });
        $(this).parents('.popup').fadeOut();
        $('.shade').fadeOut();
    });
    // 工单通过提交
    jobPassSubmit.addEventListener('click',function(){
        new CustomPrompt({
            type: 'success',
            msg: '提交成功'
        });
        $(this).parents('.popup').fadeOut();
        $('.shade').fadeOut();
    });
    // 工单不通过提交
    jobNopassSubmit.addEventListener('click',function(){
        new CustomPrompt({
            type: 'success',
            msg: '提交成功'
        });
        $(this).parents('.popup').fadeOut();
        $('.shade').fadeOut();
    });*/
    
    
 // ======================================确认删除按钮======================================
	var deleteConfirm = document.getElementsByClassName('delete-confirm delete')[0];
	deleteConfirm.addEventListener('click', function () {
		$('.shade').fadeOut();
		$('.delete-wrapper').fadeOut();
		if(aTypeId==1 || aTypeId==2){//加班或请假
			var url =  'deletePersonRecord';
			var param = {"id":prid,"approvalTypeId":aTypeId};
			$.post(url,param,function(data){			
				if (data.data==1) {
					new CustomPrompt({
						type: 'success',
						msg: '删除成功'
					});
				} else {
					new CustomPrompt({
						type: 'error',
						msg: '删除失败'
					});
				}
				//刷新表格
				$('#approvalMy').datagrid('reload');
				$('#approvalWait').datagrid('reload');
			},"json");			
		}
		if(approvalTypeId==3){//设备报废
			
		}
		if(approvalTypeId==4){//车辆维修
			
		}
		if(approvalTypeId==6){//异常任务
			
		}
	});
	
	 var $editApproval = $('#personIds'); // 编辑审批
    // 编辑弹窗审批comboTree
    $editApproval.combotree({
    	url: 'getPersonsByRole',
       /* onBeforeSelect:function(node){
            if(node.isparent){
                $("#personIds").tree("unselect");
            }
        },*/
        multiple : true,
        onlyLeafCheck : true,
        method: 'post',
        hasDownArrow: false,
        width: 300,
        height: 30
        //value:personId
    });
    
    // 点击搜索
    $(".search-btn1").on("click",function(){
 	   $("#approvalWait").datagrid({
 			url:"getPersonApprovals",
 	    	queryParams:{
 	    		approvalTypeId:$("#approvalTypeId1").val()
 	    	}
 		});
    });
 // 点击搜索
    $(".search-btn2").on("click",function(){
 	   $("#approvalOver").datagrid({
 			url:"getPersonEndApprovals",
 	    	queryParams:{
 	    		approvalTypeId:$("#approvalTypeId2").val()
 	    	}
 		});
    });
 // 点击搜索
    $(".search-btn3").on("click",function(){
 	   $("#approvalMy").datagrid({
 			url:"getPersonRecords",
 	    	queryParams:{
 	    		approvalTypeId:$("#approvalTypeId3").val()
 	    	}
 		});
    });
    
});

/*=========================其它=========================*/
var prid;
var aTypeId;
//删除
function deleteRecord(id,approvalTypeId) {
	prid=id;
	aTypeId=approvalTypeId;
	$('.shade').fadeIn();
    $('.delete-wrapper').fadeIn();
};

// 两个时间段相差小时 date = {year: 2018, month: 3, date: 17, hours: 0, minutes: 0, …}
function hours(date,endDate){
    var date1 = date.year + '/' + date.month + '/' + date.date + ' ' +  date.hours + ':00:00';
    var date2 = endDate.year + '/' + endDate.month + '/' + endDate.date + ' ' +  endDate.hours + ':00:00';
    var mm = new Date(date2).getTime() - new Date(date1).getTime(); // 相差毫秒数
    var days= Math.floor(mm/(24*3600*1000)); // 相差天数
    var leave1 = mm % (24*3600*1000); // 天数剩余的毫秒数
    var hours = Math.floor(leave1 / (3600.0 * 1000));  //相差时间
    return (days*24) + hours;
    //var days = (Number(mm/ (1000 * 60 * 60.0))).toFixed(2);
    //return days;
}
// 弹出通过框
function passOpen() {
    $('.shade, .pass-wrapper').fadeIn();
}

// 弹出不通过框
function noPassOpen() {
    $('.shade, .noPass-wrapper').fadeIn();
}

// 弹出我已审批详情框
function overOpen(id,approvalTypeId) { 
    $('.shade, .over-popup').fadeIn();
    $('#approvalDetail2').html('');
    if(approvalTypeId==1){//加班
		var url="getDetailPersonApprovalById";
		var param={"id":id,"approvalTypeId":approvalTypeId};
		$.post(url,param,function(data){
			var content='<form class="wait-form" method="post">';
			content+='<div class="content-item"><label>姓名:</label><div>'+data.person+'</div></div>';
			content+='<div class="content-item"><label>加班人:</label><div>'+data.addpersons+'</div></div>';
			content+='<div class="content-item"><label>开始时间:</label><div>'+data.beginTime+'</div></div>';
			content+='<div class="content-item"><label>结束时间:</label><div>'+data.endTime+'</div></div>';
			content+='<div class="content-item"><label>时长(小时):</label><div>'+data.days+'</div></div>';
			content+='<div class="content-item"><label>原因:</label><textarea disabled>'+data.description+'</textarea></div>';
			content+='<div class="content-item"><label>提交时间:</label><div>'+data.createTime+'</div></div>';
			//content+='<div class="content-item"><label>状态:</label>';
			$.each(data.personRecordAndApproval,function(i,n){
				if(i==0){
					content+='<div class="content-item"><label>状态:</label>';
				}else{
					content+='<div class="content-item"><label></label>';
				}
				if(n.approvalStatus=='同意'){
					content+='<div>'+n.approvalPerson+'<a class="detail-pass">通过</a>'+n.approvalTime+'</div>';
				}else if(n.approvalStatus=='不同意'){
					content+='<div>'+n.approvalPerson+'<a class="detail-nopass">不通过</a>'+n.approvalTime+'</div>';
				}else{
					content+='<div>'+n.approvalPerson+'<a class="detail-passing">审批中</a></div>';
				}
				content+='</div>';
			});
			content+='</form>';
			$('#approvalDetail2').html(content);
		},"json");	
	}
	if(approvalTypeId==2){//请假
		var url="getDetailPersonApprovalById";
		var param={"id":id,"approvalTypeId":approvalTypeId};
		$.post(url,param,function(data){
			var content='<form class="wait-form" method="post">';
			content+='<div class="content-item"><label>姓名:</label><div>'+data.person+'</div></div>';
			content+='<div class="content-item"><label>请假类型:</label><div>'+data.leaveType+'</div></div>';
			content+='<div class="content-item"><label>开始时间:</label><div>'+data.beginTime+'</div></div>';
			content+='<div class="content-item"><label>结束时间:</label><div>'+data.endTime+'</div></div>';
			content+='<div class="content-item"><label>时长(小时):</label><div>'+data.days+'</div></div>';
			content+='<div class="content-item"><label>原因:</label><textarea disabled>'+data.description+'</textarea></div>';
			content+='<div class="content-item"><label>提交时间:</label><div>'+data.createTime+'</div></div>';
			//content+='<div class="content-item"><label>状态:</label>';
			$.each(data.personRecordAndApproval,function(i,n){
				if(i==0){
					content+='<div class="content-item"><label>状态:</label>';
				}else{
					content+='<div class="content-item"><label></label>';
				}
				if(n.approvalStatus=='同意'){
					content+='<div>'+n.approvalPerson+'<a class="detail-pass">通过</a>'+n.approvalTime+'</div>';
				}else if(n.approvalStatus=='不同意'){
					content+='<div>'+n.approvalPerson+'<a class="detail-nopass">不通过</a>'+n.approvalTime+'</div>';
				}else{
					content+='<div>'+n.approvalPerson+'<a class="detail-passing">审批中</a></div>';
				}
				content+='</div>';
			});
			content+='</form>';
			$('#approvalDetail2').html(content);
		},"json");	
	}
	if(approvalTypeId==3){//设备报废
		
	}
	if(approvalTypeId==4){//车辆维修
		
	}
	if(approvalTypeId==6){//异常任务
		
	}
}

// 弹出我发起的详情框
function myOpen(id,approvalTypeId){
	$('.shade, .my-popup').fadeIn();
	$('#applyDetail').html('');
	if(approvalTypeId==1){//加班
		var url="getDetailPersonRecordById";
		var param={"id":id,"approvalTypeId":approvalTypeId};
		$.post(url,param,function(data){
			var content='<form class="wait-form" method="post">';
			content+='<div class="content-item"><label>姓名:</label><div>'+data.person+'</div></div>';
			content+='<div class="content-item"><label>加班人:</label><div>'+data.addpersons+'</div></div>';
			content+='<div class="content-item"><label>开始时间:</label><div>'+data.beginTime+'</div></div>';
			content+='<div class="content-item"><label>结束时间:</label><div>'+data.endTime+'</div></div>';
			content+='<div class="content-item"><label>时长(小时):</label><div>'+data.days+'</div></div>';
			content+='<div class="content-item"><label>原因:</label><textarea disabled>'+data.description+'</textarea></div>';
			content+='<div class="content-item"><label>提交时间:</label><div>'+data.createTime+'</div></div>';
			//content+='<div class="content-item"><label>状态:</label>';
			$.each(data.personRecordAndApproval,function(i,n){
				if(i==0){
					content+='<div class="content-item"><label>状态:</label>';
				}else{
					content+='<div class="content-item"><label></label>';
				}
				if(n.approvalStatus=='同意'){
					content+='<div>'+n.approvalPerson+'<a class="detail-pass">通过</a>'+n.approvalTime+'</div>';
				}else if(n.approvalStatus=='不同意'){
					content+='<div>'+n.approvalPerson+'<a class="detail-nopass">不通过</a>'+n.approvalTime+'</div>';
				}else{
					content+='<div>'+n.approvalPerson+'<a class="detail-passing">审批中</a></div>';
				}
				content+='</div>';
			});
			content+='</form>';
			$('#applyDetail').html(content);
		},"json");	
	}
	if(approvalTypeId==2){//请假
		var url="getDetailPersonRecordById";
		var param={"id":id,"approvalTypeId":approvalTypeId};
		$.post(url,param,function(data){
			var content='<form class="wait-form" method="post">';
			content+='<div class="content-item"><label>姓名:</label><div>'+data.person+'</div></div>';
			content+='<div class="content-item"><label>请假类型:</label><div>'+data.leaveType+'</div></div>';
			content+='<div class="content-item"><label>开始时间:</label><div>'+data.beginTime+'</div></div>';
			content+='<div class="content-item"><label>结束时间:</label><div>'+data.endTime+'</div></div>';
			content+='<div class="content-item"><label>时长(小时):</label><div>'+data.days+'</div></div>';
			content+='<div class="content-item"><label>原因:</label><textarea disabled>'+data.description+'</textarea></div>';
			content+='<div class="content-item"><label>提交时间:</label><div>'+data.createTime+'</div></div>';
			//content+='<div class="content-item"><label>状态:</label>';
			$.each(data.personRecordAndApproval,function(i,n){
				if(i==0){
					content+='<div class="content-item"><label>状态:</label>';
				}else{
					content+='<div class="content-item"><label></label>';
				}
				if(n.approvalStatus=='同意'){
					content+='<div>'+n.approvalPerson+'<a class="detail-pass">通过</a>'+n.approvalTime+'</div>';
				}else if(n.approvalStatus=='不同意'){
					content+='<div>'+n.approvalPerson+'<a class="detail-nopass">不通过</a>'+n.approvalTime+'</div>';
				}else{
					content+='<div>'+n.approvalPerson+'<a class="detail-passing">审批中</a></div>';
				}
				content+='</div>';
			});
			content+='</form>';
			$('#applyDetail').html(content);
		},"json");	
	}
	if(approvalTypeId==3){//设备报废
		$.ajax({
    		url:"getCarApplyDetail",
    		method:"post",
    		data:"carApplyId="+id,
    		dataType:"json",
    		success:function(data){
    			//{"approvalStatus":"无审批人员！","createTime":1523519675637,"description":"车辆维修测试"}
    			console.log(JSON.stringify(data));
    			$("#applyDetail").empty();
    			var content = "";
    				content += '<form class="wait-form" method="post">';
    				content += '<div class="content-item"><label>提交时间:</label><div>'+data.createTime+'</div></div>';
    				content += '<div class="content-item"><label>原因:</label><textarea disabled>'+data.description+'</textarea></div>';
    				var approvalStatusId = data.approvalStatusId
    				switch(approvalStatusId){
    					case 2:
            				content += '<div class="content-item"><label>状态:</label><div><a class="detail-passing">审批中</a></div></div>';
    						break;
    					case 3:
        					content += '<div class="content-item"><label>状态:</label><div><a class="detail-pass">通过</a></div></div>';        				
    						break;
    					case 4:
            				content += '<div class="content-item"><label>状态:</label><div><a class="detail-nopass">不通过</a></div></div>';
    						break;
    				}
    				content += '</form>';
        			//content += '<div class="content-item"><label>状态:</label><div><a class="detail-pass">通过</a><a class="detail-passing">审批中</a><a class="detail-nopass">不通过</a></div></div></form>';
    			$("#applyDetail").append(content);
    		},
    		error:function (XMLHttpRequest, textStatus, errorThrown){ 
     	     	//请求错误的处理
     			//请求错误的处理
     			//请求错误的处理
     	   	}
    	})
	}
	if(approvalTypeId==4){//车辆维修
		$.ajax({
    		url:"getCarApplyDetail",
    		method:"post",
    		data:"carApplyId="+id,
    		dataType:"json",
    		success:function(data){
    			//{"approvalStatus":"无审批人员！","createTime":1523519675637,"description":"车辆维修测试"}
    			console.log(JSON.stringify(data));
    			
    			$("#applyDetail").empty();
    			var content = "";
    				content += '<form class="wait-form" method="post">';
    				content += '<div class="content-item"><label>提交时间:</label><div>'+data.createTime+'</div></div>';
    				content += '<div class="content-item"><label>原因:</label><textarea disabled>'+data.description+'</textarea></div>';
    				var approvalStatusId = data.approvalStatusId
    				switch(approvalStatusId){
    					case 2:
            				content += '<div class="content-item"><label>状态:</label><div><a class="detail-passing">审批中</a></div></div>';
    						break;
    					case 3:
        					content += '<div class="content-item"><label>状态:</label><div><a class="detail-pass">通过</a></div></div>';        				
    						break;
    					case 4:
            				content += '<div class="content-item"><label>状态:</label><div><a class="detail-nopass">不通过</a></div></div>';
    						break;
    				}
    				content += '</form>';
        			//content += '<div class="content-item"><label>状态:</label><div><a class="detail-pass">通过</a><a class="detail-passing">审批中</a><a class="detail-nopass">不通过</a></div></div></form>';
    			$("#applyDetail").append(content);
    		},
    		error:function (XMLHttpRequest, textStatus, errorThrown){ 
     	     	//请求错误的处理
     			//请求错误的处理
     			//请求错误的处理
     	   	}
    	})
	}
	if(approvalTypeId==6){//异常任务
		
	}
}
var approvalId;
// 弹出待我审批
function waitOpen(id,approvalTypeId){
	approvalId=id;
	aTypeId=approvalTypeId;
    $('.shade, .wait-work-popup').fadeIn();
    $('#approvalDetail1').html('');
    if(approvalTypeId==1){//加班
    	var url="getDetailPersonApprovalById";
		var param={"id":id,"approvalTypeId":approvalTypeId};
		$.post(url,param,function(data){
			var content='<form class="wait-form" method="post">';
			content+='<div class="content-item"><label>姓名:</label><div>'+data.person+'</div></div>';
			content+='<div class="content-item"><label>加班人:</label><div>'+data.addpersons+'</div></div>';
			content+='<div class="content-item"><label>开始时间:</label><div>'+data.beginTime+'</div></div>';
			content+='<div class="content-item"><label>结束时间:</label><div>'+data.endTime+'</div></div>';
			content+='<div class="content-item"><label>时长(小时):</label><div>'+data.days+'</div></div>';
			content+='<div class="content-item"><label>原因:</label><textarea disabled>'+data.description+'</textarea></div>';
			content+='<div class="content-item"><label>提交时间:</label><div>'+data.createTime+'</div></div>';
			//content+='<div class="content-item"><label>状态:</label>';
			/*$.each(data.personRecordAndApproval,function(i,n){
				if(i==0){
					content+='<div class="content-item"><label>状态:</label>';
				}else{
					content+='<div class="content-item"><label></label>';
				}
				if(n.approvalStatus=='同意'){
					content+='<div>'+n.approvalPerson+'<a class="detail-pass">通过</a>'+n.approvalTime+'</div>';
				}else if(n.approvalStatus=='不同意'){
					content+='<div>'+n.approvalPerson+'<a class="detail-nopass">不通过</a>'+n.approvalTime+'</div>';
				}else{
					content+='<div>'+n.approvalPerson+'<a class="detail-passing">审批中</a></div>';
				}
				content+='</div>';
			});*/
			content+='</form>';
			$('#approvalDetail1').html(content);
		},"json");	
    }else if(approvalTypeId==2){//请假
    	var url="getDetailPersonApprovalById";
		var param={"id":id,"approvalTypeId":approvalTypeId};
		$.post(url,param,function(data){
			var content='<form class="wait-form" method="post">';
			content+='<div class="content-item"><label>姓名:</label><div>'+data.person+'</div></div>';
			content+='<div class="content-item"><label>请假类型:</label><div>'+data.leaveType+'</div></div>';
			content+='<div class="content-item"><label>开始时间:</label><div>'+data.beginTime+'</div></div>';
			content+='<div class="content-item"><label>结束时间:</label><div>'+data.endTime+'</div></div>';
			content+='<div class="content-item"><label>时长(小时):</label><div>'+data.days+'</div></div>';
			content+='<div class="content-item"><label>原因:</label><textarea disabled>'+data.description+'</textarea></div>';
			content+='<div class="content-item"><label>提交时间:</label><div>'+data.createTime+'</div></div>';
			//content+='<div class="content-item"><label>状态:</label>';
			/*$.each(data.personRecordAndApproval,function(i,n){
				if(i==0){
					content+='<div class="content-item"><label>状态:</label>';
				}else{
					content+='<div class="content-item"><label></label>';
				}
				if(n.approvalStatus=='同意'){
					content+='<div>'+n.approvalPerson+'<a class="detail-pass">通过</a>'+n.approvalTime+'</div>';
				}else if(n.approvalStatus=='不同意'){
					content+='<div>'+n.approvalPerson+'<a class="detail-nopass">不通过</a>'+n.approvalTime+'</div>';
				}else{
					content+='<div>'+n.approvalPerson+'<a class="detail-passing">审批中</a></div>';
				}
				content+='</div>';
			});*/
			content+='</form>';
			$('#approvalDetail1').html(content);
		},"json");	
    }else if(approvalTypeId==3){//设备报废
    	
    }else if(approvalTypeId==4){//车辆维修
    	
    }else if(approvalTypeId==6){//异常任务
    	
    }
}