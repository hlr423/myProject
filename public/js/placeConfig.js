// ======================================全局变量======================================
var $shade = $('.shade'); // 遮罩
$(function () {
    // ======================================下拉树======================================
    /*$('#client').combotree({
        url: '../data/tree_data1.json',
        method: 'get',
        width: 250,
        height: 30,
        hasDownArrow: false
    });*/

    // ======================================表格======================================
    $('#dg').treegrid({
        //url: '../data/place.json',
    	url: 'getPositions',
        method: 'POST',
        idField: 'id',  // 必须要有
        treeField: 'name', // 必须要有
        fit: true,
        fitColumns: true,
        //rownumbers: true,
        //singleSelect: true,
        pagination: true,     //开启分页  
        pageSize: 10,         //分页大小  
        scrollbarSize: 6,
        columns: [
            [
            	{
	                field: 'order',
	                title: '',
	                align: 'center',
	                width: 6
	            },
	            {
                    field: 'series',
                    title: '级数',
                    width: 100,
                },
                {
                    field: 'name',
                    title: '位置名称',
                    width: 100,
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 150,
                    formatter: function (value,row,index) {
                        var content = '';
                        content += '<div class="table-operation">';
                        if (row.series !== '三级') {
                            content += '<a class="table-add" onclick=add('+row.id+')><i></i>添加子类型</a>';
	                    }
                        content += '<a class="table-edit" onclick=edit('+row.id+')><i></i>编辑</a>';
                        content += '<a class="table-delete" onclick=singleDelete('+row.id+')><i></i>删除</a>';
                        content += '</div>';
                        return content;
                    }
                }
            ]
        ],
        onLoadSuccess:function(row, data){
        	if(data.total == 0){
        		new CustomPrompt({
					type: 'error',
					msg: '没有相关记录'
				});
        	}
        }
    });
    
   /* var p = $('#dg').treegrid('getPager');
    $(p).pagination({ 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录' 
    });*/

    // ======================================新建框======================================
    var $newPopup = $('.new-popup'); // 新建弹窗框
    var newBtn = document.querySelector('.new-btn'); // 新建按钮
    var newSubmit = document.querySelector('.new-submit'); // 新建提交按钮
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
        	url: 'addPosition',
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
     				$('#dg').treegrid('reload');
     			}else{
     				new CustomPrompt({
     					type: 'error',
     					msg: '提交失败'
     				});
     			}
                $shade.fadeOut();
                $newPopup.fadeOut();
            }
        });
    });
   
    // ======================================添加子类型框======================================
    var $addPopup = $('.add-popup');
    var addSubmit = document.querySelector('.add-submit'); // 提交按钮

    addSubmit.addEventListener('click', function () {
        $('#addForm').form('submit', {
        	url: 'addChildrenPosition',
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
     					type: 'success',
     					msg: '提交失败'
     				});
     			}         			
     			$('#dg').treegrid('reload');
                $shade.fadeOut();
                $addPopup.fadeOut();
            }
        });
    });

    // ======================================编辑框======================================
    // 编辑提交按钮
    var editSubmit = document.querySelector('.edit-submit'); // 编辑提交按钮
    var $editPopup = $('.edit-popup'); // 编辑弹窗框
    editSubmit.addEventListener('click', function () {
        $('#editForm').form('submit', {
        	url: 'updatePosition',
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
     				$('#dg').treegrid('reload');
     			}else{
     				new CustomPrompt({
     					type: 'error',
     					msg: '提交失败'
     				});
     			}        			
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
    var deleteConfirm = document.querySelector('.delete-confirm');
    deleteConfirm.addEventListener('click', function () {
        $shade.fadeOut();
        $('.delete-wrapper').fadeOut();
        var url = "deletePosition";
		var param = {"positionId":positionId2};
		$.post(url,param,function(data){
 			if (data.data!=0) {
 				new CustomPrompt({
 					type: 'success',
 					msg: '删除成功'
 				});
 				//刷新表格
 				$('#dg').treegrid('reload');    			
 			} else {
 				new CustomPrompt({
 					type: 'error',
 					msg: '删除失败'
 				});
 			}
		},"json");
    });
});

// ======================================其他方法======================================
// 添加子类型
function add(positionId) {
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
     		    $('.add-popup').fadeIn()
     		        .find('input[type=text]').val('');
     		    $('#parentId').val(positionId);		
     		}
		}
	});
}
// 编辑
function edit(positionId) {
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
     		    $('#editForm').form('load','getPositionById?positionId='+positionId);
     		}
		}
	});
};

// 单个删除
var positionId2=0;
function singleDelete(positionId) {
	positionId2=positionId;
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

//按添加查询
function searchFun(){
	var keyWord=$('#keyWord').val();
	$("#dg").treegrid("load", {    
		keyWord: keyWord
	});
}
