// ======================================全局变量======================================
var $shade = $('.shade'); // 遮罩
$(function () {
	$('.new-role').combotree({
        url: 'getAllRoles',
        method: 'get',
        width: 250,
        height: 30,
        hasDownArrow: false,
        multiple: true,
        onlyLeafCheck: true,
        onLoadSuccess: function (node,data) {
        	/*$.each(data,function(i,n){
        		if(n.checked){
        			var dd="_easyui_tree_"+(i+1);
        			var cc=$('#'+dd).find('span')[2];
        			$(cc).removeClass();
        			$(cc).addClass('tree-checkbox tree-checkbox1');       			
        		}
        	});*/
            $("#editRole").combotree('tree').tree('expandAll');
        }
    });
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
    	url: 'getLevels',
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
                    title: '级别名称',
                    width: 100,
                    align: 'center'
                },
                {
                    field: 'overtime',
                    title: '超限时间(小时)',
                    width: 100
                },
                {
                    field: 'notifyinterval',
                    title: '通知频率(小时)',
                    width: 100
                },
                {
                    field: 'roles',
                    title: '通知角色',
                    width: 100
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 150,
                    align:'center',
                    formatter: function (value,row,index) {
                        var content = '';
                        content += '<div class="table-operation">';
                        content += '<a class="table-edit" onclick=edit('+row.id+')><i></i>编辑</a>';
                       // content += '<a class="table-delete" onclick=singleDelete('+row.id+')><i></i>删除</a>';
                        content += '</div>';
                        return content;
                    }
                }
            ]
        ]
    });

    // ======================================新建框======================================
    //var $newPopup = $('.new-popup'); // 新建弹窗框
   // var newBtn = document.querySelector('.new-btn'); // 新建按钮
    //var newSubmit = document.querySelector('.new-submit'); // 新建提交按钮
   // var $newRole = $('#organizationIds'); // 新建-通知角色cbt
   // var newLevel = document.querySelector('.new-level'); // 新建-级别select
    // 初始化新建-通知部门下拉树
    /*$newRole.combotree({
        url: '../../../level/getAllOrganizations',
        method: 'get',
        width: 250,
        height: 30,
        hasDownArrow: false,
        multiple: true,
        onlyLeafCheck: true,
        onLoadSuccess: function () {
            $newRole.combotree('tree').tree('expandAll');
        }
    });*/
    // 打开弹窗，清空数据
    /*newBtn.addEventListener('click', function () {
        $shade.fadeIn();
        $newPopup.fadeIn();
        $newPopup.find('input[type=text]').not($newPopup.find('.textbox.combo input[type=text]')).val('');
        newLevel.children[0].selected = true;
       // $newRole.combotree('clear');
    });*/

    // 新建提交按钮
    /*newSubmit.addEventListener('click', function () {
        $('#newForm').form('submit', {
        	url: 'addLevel',
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
                $shade.fadeOut();
                $newPopup.fadeOut();
    			$('#dg').datagrid('reload');
            }
        });
    });*/
   

    // ======================================编辑框======================================
    // 编辑提交按钮
    var editSubmit = document.querySelector('.edit-submit'); // 编辑提交按钮
    var $editPopup = $('.edit-popup'); // 编辑弹窗框
    editSubmit.addEventListener('click', function () {
        $('#editForm').form('submit', {
        	url: 'updateLevel',
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
     				$('#dg').datagrid('reload');
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
    //var deleteConfirm = document.querySelector('.delete-confirm');
    /*deleteConfirm.addEventListener('click', function () {
        $shade.fadeOut();
        $('.delete-wrapper').fadeOut();
        var url = "deleteLevel";
		var param = {"levelId":levelId2};
		$.post(url,param,function(data){			
			if (data.data!=0) {
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
    });*/
});

// ======================================其他方法======================================
// 编辑
function edit(levelId) {
	var $editPopup = $('.edit-popup');
	$('#editRole').combotree('clear');
	$editPopup.find('input[type=text]').not($editPopup.find('.textbox.combo input[type=text]')).val('');
    // 初始化编辑-通知角色下拉树
    /*$('#editRole').combotree({
        url: '../../../level/getAllOrganizations',
        method: 'get',
        width: 250,
        height: 30,
        hasDownArrow: false,
        multiple: true,
        onlyLeafCheck: true,
        onLoadSuccess: function () {
            $newRole.combotree('tree').tree('expandAll');
        }
    });*/
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
     			editLevel(levelId);
     		}
		}
	});
};

function editLevel(levelId){
    $shade.fadeIn();
    $('.edit-popup').fadeIn();
	var url="getRoleIdsById";
	var param={"levelId":levelId};
	$.post(url,param,function(data){
		$('#editRole').combotree("setValues",data);
	},"json");
	$('#editForm').form('load','getLevelById?levelId='+levelId);	
}

// 单个删除
/*var levelId2=0;
function singleDelete(levelId) {
	levelId2=levelId;
    $shade.fadeIn();
    $('.delete-wrapper').fadeIn();
};*/

function searchFun(){
	var keyWord=$('#keyWord').val();
	$("#dg").datagrid("load", {    
		keyWord: keyWord
	});
}

//等级校验
/*function levelValid(){
	var levelName=$('#levelName').val();
	var url="getLevelsByName";
	var param={"levelName":levelName};
	$.post(url,param,function(data){
		if(data==1){
			new CustomPrompt({
                type: 'success',
                msg: '等级已存在'
            });
		}
	},"json");
}*/
