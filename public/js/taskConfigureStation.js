$(function () {
    /*=========================初始化配置类+变量声明=========================*/
	$.ajax({
		type:"POST",
		url:"getInit",
		dataType:"json",
		success:function(data){
			var taskTypes = data.taskTypes;
			var content = "<option value='0'>请选择任务类型</option>"
			if(taskTypes.length > 0){
				for(var i=0; i<taskTypes.length; i++){
					content += "<option value="+taskTypes[i].id+">"+taskTypes[i].name+"</option>";
				}
			}
			$("#topTaskType").html(content);
			
			var treatWaters = data.treatWaters;
			var content1 = "<option value='0'>请选择处理水量</option>"
				if(treatWaters.length > 0){
					for(var i=0; i<treatWaters.length; i++){
						content1 += "<option value="+treatWaters[i].id+">"+treatWaters[i].num+"</option>";
					}
				}
			$("#topTreatWater").html(content1);
		}
	});
	// 点击搜索
	$(".search-btn").on("click", function() {
		$("#dg").datagrid({
			url : "getAllStationTaskByPager",
			queryParams : {
				ttId : $("#topTaskType").val(),
				twId : $("#topTreatWater").val()
			}
		});
	});
    // 整体table
    $('#dg').datagrid({
    	url:"getAllStationTaskByPager",
    	pagination: true,     //开启分页  
        pageSize: 10,         //分页大小  
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        columns: [
            [
            	{
                    field: 'id',
                    hidden:true
                },
                {
                    field: 'type',
                    title: '任务类型',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'water',
                    title: '设计处理水量',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'work',
                    title: '所需工种',
                    width: 100,
                    align: 'center',
                    formatter:function (value,rec) {
                        return '<a class="td-detail" onclick="detailOpen('+rec.id+')">详情</a>'
                    }
                },
                {
                    field: 'car',
                    title: '所需车辆',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'maxCycle',
                    title: '最大周期',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'minCycle',
                    title: '最小周期',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'cycle',
                    title: '周期单位',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'time',
                    title: '所需时长(小时)',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'isCycle',
                    title: '是否周期内完成',
                    width: 100,
                    align: 'center',
                    formatter: function (value, rec) {
                    	if(rec.isCycle){
                    		return '<a class="td-finish"><i></i></a>' // 未完成为<a class="td-not"><i></i></a>
                    	}else{
                    		return '<a class="td-not"><i></i></a>' // 未完成为<a class="td-not"><i></i></a>
                    	}
                    }
                },
                {
                    field: 'isPhoto',
                    title: '是否拍照',
                    width: 100,
                    align: 'center',
                    formatter: function (value, rec) {
                    	if(rec.isPhoto){
                    		return '<a class="td-finish"><i></i></a>'// 未完成为<a class="td-not"><i></i></a>
                    	}else{
                    		return '<a class="td-not"><i></i></a>'
                    	}
                    }
                },
                {
                    field: 'isTest',
                    title: '是否强检',
                    width: 100,
                    align: 'center',
                    formatter: function (value, rec) {
                    	if(rec.isTest){
                    		return '<a class="td-finish"><i></i></a>'// 未完成为<a class="td-not"><i></i></a>
                    	}else{
                    		return '<a class="td-not"><i></i></a>'
                    	}
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 100,
                    formatter: function (value, rec) {
                        return '<div class="table-operation"><a class="table-edit" onclick="editOpen('+rec.id+')" ><i></i>编辑</a> ' +
                            '<a class="table-delete" onclick="deleteOpen('+rec.id+')"><i></i>删除</a>' +
                            '</div>';
                    }
                }
            ]
        ],
        onLoadSuccess:function(data){
        	if(data.total == 0){
        		 $(this).datagrid('appendRow', { type: '<div style="text-align:center;color:red">没有相关记录！</div>' }).datagrid('mergeCells', { index: 0, field: 'type', colspan: 12 })
                 //隐藏分页导航条，这个需要熟悉datagrid的html结构，直接用jquery操作DOM对象，easyui datagrid没有提供相关方法隐藏导航条
                 $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
        	}
        }
    });

    /*=========================弹窗=========================*/

    // 关闭弹窗
    $('.close-icon').on('click', function () {
        var $popup = $(this).parents('.popup');
        $('.shade').fadeOut();
        $popup.fadeOut();
    });

    /*=========================删除弹窗=========================*/

    var deleteConfirm = document.querySelector('.delete-confirm');
    var inforCancel = document.querySelector('.infor-cancel');
    // 确认删除
    deleteConfirm.addEventListener('click',function () {
    	$('.shade,.delete-wrapper').fadeOut();
    	$.ajax({
    		type:"post",
    		url:"deleteStationTask",
    		data:"stId="+stId,
    		dataType:"json",
    		success:function(data){
    			if(data == 1){
    				new CustomPrompt({
	                    type: 'success',
	                    msg: '删除成功！'
	                });
    				$("#dg").datagrid("reload");
    			}else{
    				new CustomPrompt({
	                    type: 'default',
	                    msg: '删除失败！'
	                });
    			}
    		}
    	});
    });
    // 取消弹窗
    inforCancel.addEventListener('click',function () {
        $('.shade').fadeOut();
        $(this).parents('.infor-wrapper').fadeOut();
    });

    /*=========================新建弹窗=========================*/

    var $newPopup = $('.newAdd-wrapper'); // 新建弹窗
    var $newType =  $('.task-type-comboTree'); // 新建任务类型comboTree
    var $newWater =  $('.task-water-comboTree');// 新建设计处理水量
    var $newCar =  $('.task-car-comboTree');// 新建任务所需车辆comboTree
    var $newSuccessPopup = $('.newAdd-success'); // 新建提交成功弹窗
    var newAddSubmit = document.querySelector('.newAdd-submit'); // 新建提交按钮
    var btnClose = document.querySelector('.btn-close'); // 成功弹窗关闭btn
    var btnAdd = document.querySelector('.btn-add'); //成功弹窗继续添加btn
    // 新建弹窗+初始化数据
    $('.new-btn').on('click', function () {
    	$.ajax({
			type:"post",
			url:"addTest",
			dataType:"json",
			success:function(data){
				if(null != data[0] && data[0].noOpt){
         			new CustomPrompt({
                        type: 'error',
                        msg: '您无权操作！'
                    });
         		}else{
         			$('.shade, .newAdd-wrapper').fadeIn();
         			$newPopup.find('input[type=text]').not($newPopup.find('.textbox.combo input[type=text]')).val('');
         			$('#unit').val(1);
         			$(".newAdd-wrapper input[name='isCycleFinish'],.newAdd-wrapper input[name='isPhotograph'],.newAdd-wrapper input[name='isMustCheck']").prop('checked',false).parents('a').removeClass('radio-checked');
         			$(".newAdd-wrapper input[name='isCycleFinish']").eq(0).prop('checked',true).parents('a').addClass('radio-checked');
         			$(".newAdd-wrapper input[name='isPhotograph']").eq(1).prop('checked',true).parents('a').addClass('radio-checked');
         			$(".newAdd-wrapper input[name='isMustCheck']").eq(1).prop('checked',true).parents('a').addClass('radio-checked');
         			$.ajax({
         				type:"POST",
         				url:"getInit",
         				dataType:"json",
         				success:function(data){
         					var taskTypes = data.taskTypes;
         					var content = "<option value='0'>请选择任务类型</option>"
         						if(taskTypes.length > 0){
         							for(var i=0; i<taskTypes.length; i++){
         								content += "<option value="+taskTypes[i].id+">"+taskTypes[i].name+"</option>";
         							}
         						}
         					$("#taskType").html(content);
         					
         					var treatWaters = data.treatWaters;
         					var content1 = "<option value='0'>请选择处理水量</option>"
         						if(treatWaters.length > 0){
         							for(var i=0; i<treatWaters.length; i++){
         								content1 += "<option value="+treatWaters[i].id+">"+treatWaters[i].num+"</option>";
         							}
         						}
         					$("#treatWater").html(content1);
         					
         					var carTypes = data.carTypes;
         					var content2 = "<option value='0'>请选择车辆类型</option>"
         						if(carTypes.length > 0){
         							for(var i=0; i<carTypes.length; i++){
         								content2 += "<option value="+carTypes[i].id+">"+carTypes[i].name+"</option>";
         							}
         						}
         					$("#carType").html(content2);
         				}
         			});
         		}
			}
    	});
    });
    // 新建单选
    common.commonRadio('.newAdd-wrapper .content-item');
    // 新建弹窗提交
    newAddSubmit.addEventListener('click',function () {
        $('.newAdd-form').form('submit', {
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                var inputValue = false; // 工种至少填一个
                var $input = $('.equipment-input'); // 工种input
                $input.each(function (index,node) {
                    if(node.value != ''){
                        inputValue = true ;
                    }
                 });
                if(!inputValue){
                    new CustomPrompt({
                        type: 'default',
                        msg: '工种至少填一种!'
                    });
                }
                return formValue && inputValue;
            },
            success: function (data) {
            	if(data == -1){
            		new CustomPrompt({
	                    type: 'error',
	                    msg: '任务周期已存在！'
	                });
            	}else if(data > 0){
            		new CustomPrompt({
	                    type: 'success',
	                    msg: '新增成功！'
	                });
            		$newPopup.fadeOut();
            		$('.shade').fadeOut();
//            		$('.shade, .newAdd-success').fadeIn().fadeOut(5000);
            		$("#dg").datagrid("reload");
            	}else if(data == 0){
            		new CustomPrompt({
	                    type: 'default',
	                    msg: '新增失败！'
	                });
            	}
            }
        });
    });
    // 新建提交成功弹窗
    btnClose.addEventListener('click',function () {
        $('.shade').fadeOut();
        $newSuccessPopup.fadeOut();
    });
    btnAdd.addEventListener('click',function () {
        $newSuccessPopup.fadeOut();
        $('.new-btn').trigger('click');
    });
    /*=========================编辑弹窗=========================*/

    var editSubmit = document.querySelector('.edit-submit');
    var $editType = $('.edit-type-comboTree');
    var $editWater = $('.edit-water-comboTree');
    var $edieCar = $('.edit-car-comboTree');
    common.commonRadio('.edit-wrapper .content-item');
    // 编辑弹窗提交
    editSubmit.addEventListener('click',function () {
        $('.edit-form').form('submit', {
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                return formValue
            },
            success: function (data) {
            	if(data == -1){
            		new CustomPrompt({
	                    type: 'error',
	                    msg: '任务周期已存在！'
	                });
            	}else if(data == 1){
            		new CustomPrompt({
	                    type: 'success',
	                    msg: '修改成功！'
	                });
            		$('.shade, .edit-wrapper').fadeOut();
            		$("#dg").datagrid("reload");
            	}else if(data == 0){
            		new CustomPrompt({
	                    type: 'default',
	                    msg: '修改失败！'
	                });
            	}
            }
        });
    });

});

/*=========================其它方法=========================*/
var stId;
// 打开编辑弹窗
function editOpen(id) {
	$.ajax({
		type:"post",
		url:"updateTest",
		dataType:"json",
		success:function(data){
			if(null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			$("#stId").val(id);
     			$('.shade, .edit-wrapper').fadeIn();
     			$(".edit-wrapper input[name='isCycleFinish'],.edit-wrapper input[name='isPhotograph'],.edit-wrapper input[name='isMustCheck']").prop('checked',false).parents('a').removeClass('radio-checked');
     			$.ajax({
     				type:"post",
     				url:"getStationTaskById",
     				data:"stId="+id,
     				dataType:"json",
     				success:function(data){
     					var taskTypes = data.taskTypes;
     					var content = "<option value='0'>请选择任务类型</option>"
     						if(taskTypes.length > 0){
     							for(var i=0; i<taskTypes.length; i++){
     								if(taskTypes[i].id == data.ttId){
     									content += "<option value="+taskTypes[i].id+" selected>"+taskTypes[i].name+"</option>";
     								}else{
     									content += "<option value="+taskTypes[i].id+">"+taskTypes[i].name+"</option>";
     								}
     							}
     						}
     					$("#etaskType").html(content);
     					
     					var treatWaters = data.treatWaters;
     					var content1 = "<option value='0'>请选择处理水量</option>"
     						if(treatWaters.length > 0){
     							for(var i=0; i<treatWaters.length; i++){
     								if(treatWaters[i].id == data.twId){
     									content1 += "<option value="+treatWaters[i].id+" selected>"+treatWaters[i].num+"</option>";
     								}else{
     									content1 += "<option value="+treatWaters[i].id+">"+treatWaters[i].num+"</option>";
     								}
     							}
     						}
     					$("#etreatWater").html(content1);
     					
     					var carTypes = data.carTypes;
     					var content2 = "<option value='0'>请选择车辆类型</option>"
     						if(carTypes.length > 0){
     							for(var i=0; i<carTypes.length; i++){
     								if(carTypes[i].id == data.ctId){
     									content2 += "<option value="+carTypes[i].id+" selected>"+carTypes[i].name+"</option>";
     								}else{
     									content2 += "<option value="+carTypes[i].id+">"+carTypes[i].name+"</option>";
     								}
     							}
     						}
     					$("#ecarType").html(content2);
     					
     					var content3 = "";
     					if(data.cycleUnit == "天"){
     						content3 = "<option selected value='1'>天</option><option value='0'>小时</option>";
     					}else{
     						content3 = "<option value='1'>天</option><option value='0' selected>小时</option>";
     					}
     					$("#eunit").html(content3);
     					
     					$("#emaxCycle").val(data.maxCycle)
     					$("#eminCycle").val(data.minCycle)
     					$("#ehowLong").val(data.howLong)
     					if(data.hasOwnProperty("wt1")){
     						$("#ewt1").val(data.wt1)
     					}
     					if(data.hasOwnProperty("wt2")){
     						$("#ewt2").val(data.wt2)
     					}
     					if(data.hasOwnProperty("wt3")){
     						$("#ewt3").val(data.wt3)
     					}
     					if(data.isCycleFinish){
     						$(".edit-wrapper input[name='isCycleFinish']").eq(0).prop('checked',true).parents('a').addClass('radio-checked');
     					}else{
     						$(".edit-wrapper input[name='isCycleFinish']").eq(1).prop('checked',true).parents('a').addClass('radio-checked');
     					}
     					if(data.isPhotograph){
     						$(".edit-wrapper input[name='isPhotograph']").eq(0).prop('checked',true).parents('a').addClass('radio-checked');
     					}else{
     						$(".edit-wrapper input[name='isPhotograph']").eq(1).prop('checked',true).parents('a').addClass('radio-checked');
     					}
     					if(data.isMustCheck){
     						$(".edit-wrapper input[name='isMustCheck']").eq(0).prop('checked',true).parents('a').addClass('radio-checked');
     					}else{
     						$(".edit-wrapper input[name='isMustCheck']").eq(1).prop('checked',true).parents('a').addClass('radio-checked');
     					}
     				}
     			});
     		}
		}
	});
}
//打开删除弹窗
function deleteOpen(id){
	$.ajax({
		type:"post",
		url:"deleteTest",
		dataType:"json",
		success:function(data){
			if(null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			stId = id;
     			$('.delete-wrapper, .shade').fadeIn();
     		}
		}
	});
}
// 打开工种详情弹窗
function detailOpen(id) {
	$.ajax({
		type:"post",
		url:"getWorkTypeByStationTaskId",
		data:"stId="+id,
		dataType:"json",
		success:function(data){
			var content = "";
			if(data.length > 0){
				$('.shade, .detail-wrapper').fadeIn();
				content += "<tr><td>类型</td><td>数量</td></tr>";
				for(var i=0; i<data.length; i++){
					content += "<tr><td>"+data[i].type+"</td><td>"+data[i].num+"</td></tr>";
				}
			}else{
				new CustomPrompt({
                    type: 'error',
                    msg: '无工种详情'
                });
			}
			$(".detail-table").html(content);
		}
	});
}