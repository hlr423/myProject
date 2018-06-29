var $shade = $('.shade'); // 遮罩

var pId;


$(function () { 
    // ======================================表格======================================
    $('#dg').datagrid({
    	url:"getPrice",
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
                    title: '名称',
                    width: 100,
                },
                {
                    field: 'price',
                    title: '价格',
                    width: 100,
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 150,
                    formatter: function (value,row,index) {
                    	var content = '';
                    	if(row!=undefined){
                    			content += '<div class="table-operation">';
                    			content += '<a class="table-edit" onclick=edit('+row.id+',"' +row.name+'",' +row.price+')><i></i>编辑</a>';
                    			content += '<a class="table-delete" onclick=singleDelete('+row.id+')><i></i>删除</a>';
                    			content += '</div>';
                    	}
                        return content;
                    }
                }
            ]
        ]
    });

    // ======================================新建框======================================
    var $newPopup = $('.new-popup'); // 新建弹窗框
    var newBtn = document.querySelector('.new-btn'); // 新建按钮
    var newSubmit = document.querySelector('.new-submit'); // 新建提交按钮
    var $newRole = $('#newRole'); // 新建-通知角色cbt

    // 打开弹窗，清空数据
    newBtn.addEventListener('click', function () {
        $shade.fadeIn();
        $newPopup.fadeIn();
        $newPopup.find('input[type=text]').val('');
    });

    // 新建提交按钮
    newSubmit.addEventListener('click', function () {
        $('#newForm').form('submit', {
            onSubmit: function () {
            	if($(this).form('enableValidation').form('validate')){
            		var obj=new Object();
            		obj.name=$("#addName").val();
            		obj.price=$("#addPrice").val();
            		$("#addingPrice").val(JSON.stringify(obj));
            		return true;
            	}else{
            		return false;
            	}
            },
            success: function (data) {
                if (data > 0) {
                    new CustomPrompt({
                        type: 'success',
                        msg: '提交成功'
                    });
                    $shade.fadeOut();
                    $newPopup.fadeOut();
                    $("#dg").datagrid("reload");
                } else {
                    new CustomPrompt({
                        type: 'default',
                        msg: '提交失败'
                    });
                }
            },
            error: function (data) {
                new CustomPrompt({
                    type: 'error',
                    msg: '系统错误'
                });
            }
        });
    });

    // ======================================编辑框======================================
    // 编辑提交按钮
    var editSubmit = document.querySelector('.edit-submit'); // 编辑提交按钮
    var $editPopup = $('.edit-popup'); // 编辑弹窗框
    
    editSubmit.addEventListener('click', function () {
        $('#editForm').form('submit', {
            onSubmit: function () {
            	
            	if($(this).form('enableValidation').form('validate')){
            		var obj=new Object();
            		obj.id=pId;
            		obj.name=$("#editName").val();
            		obj.price=$("#editPrice").val();
            	$.ajax({
            		type:'POST',
            		url:'editPrice',
            		contentType: 'application/json;charset=utf-8', //设置请求头信息
                    traditional: true,//这使json格式的字符不会被转码
                    data: JSON.stringify(obj),
                    dataType: "json",
                    success: function (data) {
                    	if(data>0){
        	                new CustomPrompt({
        	                    type: 'success',
        	                    msg: '提交成功'
        	                });
        	                $shade.fadeOut();
        	                $editPopup.fadeOut();
        	                $("#dg").datagrid("load");
                    	}else{
                    		new CustomPrompt({
                    			type: 'default',
                    			msg: '提交失败'
                    		});
                    	}
                    }
            	});
            	
            	}
                
            },
           
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
    	 $.ajax({
    		 type:"POST",
    		 url:'deletePrice',
    		 data:'priceId='+pId,
    		 success:function(data){
    			 if (data == 1) {
                     $shade.fadeOut();
                     $('.delete-wrapper').fadeOut();
                     new CustomPrompt({
                         type: 'success',
                         msg: '删除成功'
                     });
                     $("#dg").datagrid("reload");
                 } else {
                     new CustomPrompt({
                         type: 'default',
                         msg: '删除失败'
                     });
                 }
    		 },
    		 error: function () {
                 new CustomPrompt({
                     type: 'error',
                     msg: '系统错误'
                 });
             }
    	 });
     });
})

// 编辑
function edit(priceId,name,price) {
	pId=priceId;
	$("#editName").val(name);
	$("#editPrice").val(price)
    $shade.fadeIn();
    $('.edit-popup').fadeIn();
};

// 单个删除
function singleDelete(priceId) {
	pId=priceId;
    $shade.fadeIn();
    $('.delete-wrapper').fadeIn();
};

