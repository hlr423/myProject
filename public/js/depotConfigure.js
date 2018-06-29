$(function () {
    /*=========================初始化配置类+变量声明=========================*/
	$.ajax({
		type:"post",
		url:"getAllAreaAndPerson",
		dataType:"json",
		success:function(data){
			$('#toparea').combotree({ 
				data:data.areas,
				width: 250,
		        height: 30,
		        hasDownArrow: false
			});
		}
	});
	
	 // 点击搜索
	   $(".search-btn").on("click",function(){
		   $("#dg").datagrid({
				url:"getAllDeportByPager",
		    	queryParams:{
		    		areaId:$("#toparea").combotree("getValue"),
		    		keyword:$("#keyword").val()
		    	}
			});
	   });

    // 整体table
    $('#dg').datagrid({
    	url:"getAllDeportByPager",
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
                    hidden: true
                },
                {
                    field: 'name',
                    title: '仓库名称',
                    width: 100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'region',
                    title: '区域',
                    width: 150,
                },
                {
                    field: 'address',
                    title: '地址',
                    width: 170,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'area',
                    title: '占地面积(㎡)',
                    width: 80,
                },

                {
                    field: 'people',
                    title: '责任人',
                    width: 80,
                },
                {
                    field: 'peoples',
                    title: '仓库员',
                    width: 200,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 100,
                    formatter: function (value, rec) {
                        return '<div class="table-operation"><a class="table-edit"" onclick="editOpen('+rec.id+')"><i></i>编辑</a> ' +
                            '<a class="table-delete" onclick="deleteOpen('+rec.id+')"><i></i>删除</a>' +
                            '</div>';
                    }
                }
            ]
        ],
        onLoadSuccess:function(data){
        	if(data.total == 0){
        		 $(this).datagrid('appendRow', { name: '<div style="text-align:center;color:red">没有相关记录！</div>' }).datagrid('mergeCells', { index: 0, field: 'name', colspan: 7 })
                 //隐藏分页导航条，这个需要熟悉datagrid的html结构，直接用jquery操作DOM对象，easyui datagrid没有提供相关方法隐藏导航条
                 $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
        	}
        }
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

    /*=========================删除弹窗=========================*/

    var deleteConfirm = document.querySelector('.delete-confirm');
    var inforCancel = document.querySelector('.infor-cancel');
    // 确认删除
    deleteConfirm.addEventListener('click',function () {
    	$.ajax({
    		type:"post",
    		url:"deleteDeport",
    		data:"deportId="+did,
    		dataType:"json",
    		success:function(data){
    			if(data = 1){
    				new CustomPrompt({
            			type: 'success',
            			msg: '删除成功'
            		});
    				$('.shade').fadeOut();
    		        $('.delete-wrapper').fadeOut();
    		        $("#dg").datagrid("reload");
    			}else{
    				new CustomPrompt({
            			type: 'default',
            			msg: '删除失败'
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
    var $newRegion = $('.newAdd-region-comboTree'); // 新建区域
    var $newPeoples = $('.newAdd-peoples-comboTree');// 新建仓库员
    // 新建弹窗
    $('.new-btn').on('click', function () {
    	$('.combo').attr("data-options","required:true")
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
         			$.ajax({
         				type:"post",
         				url:"getAllAreaAndPerson",
         				dataType:"json",
         				success:function(data){
         					$('#area').combotree({ 
         						data:data.areas,
         						width: 250,
         						height: 30,
         						hasDownArrow: false
         					});
         					$("#headPerson,#person").combotree({
         						data:data.caretakers,
         						width: 250,
         						height: 30,
         						hasDownArrow: false
         					})
         				}
         			});
         			
         			$('.shade, .newAdd-wrapper').fadeIn();
         			$newPopup.find('input[type=text]').not($newPopup.find('.textbox.combo input[type=text]')).val('');
         			$newRegion.combotree('clear');
         			$newPeoples.combotree('clear');
         		}
			}
    	});
    });
    // 新建弹窗提交
    var newAddSubmit = document.querySelector('.newAdd-submit');
    newAddSubmit.addEventListener('click', function () {
        $('.newAdd-form').form('submit', {
            onSubmit: function () {
                return $(this).form('enableValidation').form('validate');
            },
            success: function (data) {
            	if(data > 0){
            		new CustomPrompt({
            			type: 'success',
            			msg: '添加成功'
            		});
            		$('.shade, .newAdd-wrapper').fadeOut();
            		$("#dg").datagrid("reload");
            	}else if(data = -1){
            		new CustomPrompt({
            			type: 'error',
            			msg: '仓库名称已存在'
            		});
            	}else{
            		new CustomPrompt({
            			type: 'default',
            			msg: '添加失败'
            		});
            	}
            }
        });
    });

    /*=========================编辑弹窗=========================*/

    var $editRegion = $('.edit-region-comboTree'); // 编辑区域
    var $editPeoples = $('.edit-peoples-comboTree');// 新建仓库员
    // 编辑弹窗提交
    var editSubmit = document.querySelector('.edit-submit');
    editSubmit.addEventListener('click', function () {
        $('.edit-form').form('submit', {
            onSubmit: function () {
                return $(this).form('enableValidation').form('validate');
            },
            success: function (data) {
	  			if(data == 1){
					new CustomPrompt({
	                  type: 'success',
	                  msg: '修改成功'
					});
					$('.shade, .edit-wrapper').fadeOut();
					$("#dg").datagrid("reload");
				}else if(data == -1){
					new CustomPrompt({
	                  type: 'error',
	                  msg: '该仓库名已存在'
					});
				}else{
					new CustomPrompt({
	                  type: 'default',
	                  msg: '修改失败'
					});
				}
            }
        });
    });
    //combotree下拉框change事件改变
    $("#area,#person").combotree({
    	onChange:function(){
    		$(this).parent("div").find('.textbox-text').css({
        		color:"#666"
        	})
    	}
    });
});

/*=========================其它方法=========================*/
var did;
//编辑弹窗
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
     			did = id;
     			$("#deportId").val(id);
     			$('.shade, .edit-wrapper').fadeIn();
     			$.ajax({
     				type:"post",
     				url:"getDeportById",
     				data:"deportId="+id,
     				dataType:"json",
     				success:function(data){
     					$("#ename").val(data.name);
     					$("#eaddress").val(data.address);
     					$("#etotalArea").val(data.totalArea);
     					$("#earea").combotree({
     						data:data.areas,
     						width: 250,
     						height: 30,
     						hasDownArrow: false
     					});
     					$("#earea").combotree("setValue",data.areaId);
     					
     					$("#eperson,#epersons").combotree({
     						data:data.caretakers,
     						width: 250,
     						height: 30,
     						hasDownArrow: false
     					});
     					$("#eperson").combotree("setValue",data.personId);
     					$("#epersons").combotree("setValues",data.personsId);
     				}
     			});
     		}
		}
	});
}
//删除弹窗
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
     			did = id;
     			$('.delete-wrapper, .shade').fadeIn();
     		}
		}
	});
}