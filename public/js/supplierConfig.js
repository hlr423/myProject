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
    $('#dg').datagrid({
    	url: 'getSuppliers',
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
                    field: 'name',
                    title: '供应商名称',
                    width: 100
                },
                {
                    field: 'presaleName',
                    title: '售前联系人',
                    width: 100
                },
                {
                    field: 'presalePhone',
                    title: '售前电话',
                    width: 100
                    
                },
                {
                    field: 'presaleMail',
                    title: '售前邮箱',
                    width: 100
                },
                {
                    field: 'aftersaleName',
                    title: '售后联系人',
                    width: 100
                },
                {
                    field: 'aftersalePhone',
                    title: '售后电话',
                    width: 100
                },
                {
                    field: 'aftersaleMail',
                    title: '售后邮箱',
                    width: 100
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 150,
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
    
    // ======================================新建框======================================
    var $newPopup = $('.new-popup'); // 新建弹窗框
    var newBtn = document.querySelector('.new-btn'); // 新建按钮
    var newSubmit = document.querySelector('.new-submit'); // 新建提交按钮
    
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
        $('#newForm').form({
        	url: 'addSupplier',
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
     			$('#dg').datagrid('reload');
                $shade.fadeOut();
                $newPopup.fadeOut();
            }
        });
        $('#newForm').submit();
    });
   

    // ======================================编辑框======================================
    // 编辑提交按钮
    var editSubmit = document.querySelector('.edit-submit'); // 编辑提交按钮
    var $editPopup = $('.edit-popup'); // 编辑弹窗框
    editSubmit.addEventListener('click', function () {
        $('#editForm').form('submit', {
        	url: 'updateSupplier',
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
    var deleteConfirm = document.querySelector('.delete-confirm');
    deleteConfirm.addEventListener('click', function () {
        $shade.fadeOut();
        $('.delete-wrapper').fadeOut();
        var url = "deleteSupplier";
		var param = {"supplierId":supplierId2};
		$.post(url,param,function(data){
 			if (data.data==1) {
 				new CustomPrompt({
 					type: 'success',
 					msg: '删除成功'
 				});
 				//刷新表格
 				$('#dg').datagrid('reload');
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
// 编辑
function edit(supplierId) {
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
     		    $('#editForm').form('load','getSupplierById?supplierId='+supplierId);	// 读取表单的URL
     		}
		}
	});
};

// 单个删除
var supplierId2=0;
function singleDelete(supplierId) {
	supplierId2=supplierId;
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

//条件搜索
function searchFun(){
	var keyWord=$('#keyWord').val();
	$("#dg").datagrid("load", {    
		keyWord: keyWord
	});
}
