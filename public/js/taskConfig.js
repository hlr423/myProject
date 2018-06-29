// ======================================全局变量======================================
var $shade = $('.shade'); // 遮罩
$(function () {
    // ======================================下拉树======================================
   /* $('#client').combotree({
        url: '../data/tree_data1.json',
        method: 'get',
        width: 250,
        height: 30,
        hasDownArrow: false
    });*/

    // ======================================表格======================================
    $('#dg').datagrid({
    	//url: '../../../taskType/getTaskTypes',
    	url: 'getTaskTypes',
        method: 'POST',
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
                    field: 'type',
                    title: '分属类型',
                    width: 100,
                },
                {
                    field: 'name',
                    title: '任务类型名称',
                    width: 100,
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 100,
                    formatter: function (value,row,index) {
                        var content = '';
                        content += '<div class="table-operation">';
                        content += '<a class="table-edit" onclick=edit('+row.id+')><i></i>编辑</a>';
                        content += '<a class="table-delete" onclick=singleDelete('+row.id+')><i></i>删除</a>';
                        content += '</div>';
                        return content;
                    }
                }
            ]
        ]
    });

    // ======================================新建框======================================
    var $newPopup = $('.new-popup'); // 新建弹窗框
    var newBtn = document.getElementsByClassName('new-btn')[0]; // 新建按钮
    var newSubmit = document.getElementsByClassName('new-submit')[0]; // 新建提交按钮
    var $newRole = $('#newRole'); // 新建-通知角色cbt
    

    // 打开弹窗，清空数据
    newBtn.addEventListener('click', function () {
        $.ajax({
			type:"post",
			url:"addTest",
			dataType:"json",
			success:function(data){
				if(data[0]!=null && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
    			}
				if(null != data[0] && data[0].noOpt){
         			new CustomPrompt({
                        type: 'error',
                        msg: '您无权操作！'
                    });
         		}else{
         			$shade.fadeIn();
         	        $newPopup.fadeIn();
         	        $newPopup.find('input[type=text]').val('');      			
         		}
			}
		});
    });

    // 新建提交按钮
    newSubmit.addEventListener('click', function () {
        $('#newForm').form('submit', {
        	//url: '../../../taskType/addTaskType',
        	url: 'addTaskType',
            onSubmit: function () {
                return $(this).form('enableValidation').form('validate');
            },
            success: function (data) {
            	var json = eval("("+data+")");           	
     			if(json.data==1){
     				new CustomPrompt({
     					type: 'success',
     					msg: '提交成功'
     				});           		
     			}else if(json.data==0){
     				new CustomPrompt({
     					type: 'error',
     					msg: '该数据已经存在'
     				});
     			}else{
     				new CustomPrompt({
     					type: 'error',
     					msg: '提交失败'
     				});
     			}
     			//刷新表格
     			$('#dg').datagrid('reload');
     			$shade.fadeOut();
     			$newPopup.fadeOut();
            }
        });
    });
   

    // ======================================编辑框======================================
    // 编辑提交按钮
    var editSubmit = document.getElementsByClassName('edit-submit')[0]; // 编辑提交按钮
    var $editPopup = $('.edit-popup'); // 编辑弹窗框
    editSubmit.addEventListener('click', function () {
        $('#editForm').form('submit', {
        	//url: '../../../taskType/updateTaskType',
        	url: 'updateTaskType',
            onSubmit: function () {
                return $(this).form('enableValidation').form('validate');
            },
            success: function (data) {
            	var json = eval("("+data+")");
     			if(json.data==1){
     				new CustomPrompt({
     					type: 'success',
     					msg: '提交成功'
     				});           		
     			}else{
     				new CustomPrompt({
     					type: 'error',
     					msg: '提交失败'
     				});
     			}
     			//刷新表格
     			$('#dg').datagrid('reload');
                $shade.fadeOut();
                $editPopup.fadeOut();
            }
        });
    });

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

    // ======================================确认删除按钮======================================
    var deleteConfirm = document.getElementsByClassName('delete-confirm')[0];
    deleteConfirm.addEventListener('click', function () {
        $shade.fadeOut();
        $('.delete-wrapper').fadeOut();
        //var url = "../../../taskType/deleteTaskType";
        var url =  'deleteTaskType';
		var param = {"taskTypeId":taskTypeId2};
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
 			$('#dg').datagrid('reload');
		},"json");
    });
});

// ======================================其他方法======================================
//编辑
function edit(taskTypeId) {
	$.ajax({
		type:"post",
		url:"updateTest",
		success:function(data){
			if(data[0]!=null && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
			}
			if(null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			$shade.fadeIn();
     		    $('.edit-popup').fadeIn();
     			//$('#editForm').form('load','../../../taskType/getTaskTypeById?taskTypeId='+taskTypeId);
     		    $('#editForm').form('load','getTaskTypeById?taskTypeId='+taskTypeId);
     		}
		}
	});
};

//单个删除
var taskTypeId2=0;
function singleDelete(taskTypeId) {
	taskTypeId2=taskTypeId;
    $.ajax({
		type:"post",
		url:"deleteTest",
		success:function(data){
			if(data[0]!=null && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
			}
			if(null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			$shade.fadeIn();
     		    $('.delete-wrapper').fadeIn();
     		}
		}
	});
};

//条件查询
function searchFun(){
	var type=$('#type').val();
	var keyWord=$('#keyWord').val();
	$("#dg").datagrid("load", {    
		keyWord: keyWord,
		type:type
	});
}
