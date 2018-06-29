// ======================================全局变量======================================
var $shade = $('.shade'); // 遮罩
var personId = 0;
$(function () {
	// ======================================下拉树======================================
    $('#organizations').combotree({
        url: 'getOrganizationTree',
        method: 'post',
        width: 250,
        height: 30,
        hasDownArrow: false
    });
	
    // ======================================表格======================================
    $('#dg').datagrid({
    	url:"getByPage",
    	method:"post",
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
                    title: '姓名',
                    width: 100
                },
                {
                    field: 'gender',
                    title: '性别',
                    width: 100
                },
                {
                    field: 'telephone',
                    title: '电话号码',
                    width: 100
                },
                {
                    field: 'organization',
                    title: '部门',
                    width: 100
                },
                {
                    field: 'wage',
                    title: '工资',
                    width: 100
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 150,
                    formatter: function (value, rec) {
                        var content = '';
                        content += '<div class="table-operation">';
                        content += '<a class="table-edit" onclick=edit(' + rec.id + ')><i></i>编辑</a>';
                        content += '</div>';
                        return content;
                    }
                }
            ]
        ]
    });
    
    //点击搜索
    $(".search-btn").on("click",function(){
    	search(1,10);
    })
    
    
    
    // ======================================编辑框======================================
    // 编辑提交按钮
    var editSubmit = document.querySelector('.edit-submit'); // 编辑提交按钮
    var $editPopup = $('.edit-popup'); // 编辑弹窗框
    editSubmit.addEventListener('click', function () {
        $('#editForm').form('submit', {
            onSubmit: function () {
                if($(this).form('enableValidation').form('validate')){
                	var person = new Object();
                	person.id = personId;
                	var wage = $("#updateWage").val();
                	person.wage = wage;
                	$.ajax({
                     	type:"post",
                     	url:"updateWage",
                     	data:JSON.stringify(person),
                     	contentType:"application/json;charset=utf-8",
                     	dataType:"json",
                     	success:function(data){
                     		if(data.result){
                     			new CustomPrompt({
                                    type: 'success',
                                    msg: '操作成功！'
                                });
                     			$shade.fadeOut();
                                $editPopup.fadeOut();
                                setTimeout("window.location.reload()", 2000)
                     		}else{
                     			new CustomPrompt({
                                    type: 'error',
                                    msg: '操作失败！'
                                });
                     		}
                     	},
                 		error:function (XMLHttpRequest, textStatus, errorThrown){ 
                 	     	//请求错误的处理
                 			//请求错误的处理
                 	   	}
                     })
                }
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
        if (true) {
            new CustomPrompt({
                type: 'success',
                msg: '删除成功'
            });
        } else {
            new CustomPrompt({
                type: 'error',
                msg: '您暂无权限'
            });
        }
    });
});

// ======================================其他方法======================================
// 编辑
function edit(obj) {
	personId = obj;
    $shade.fadeIn();
    $('.edit-popup').fadeIn();
};

// 单个删除
function singleDelete() {
    $shade.fadeIn();
    $('.delete-wrapper').fadeIn();
};

//点击搜索框
function search(pageIndex,pageSize){
	var keyword = $("#keyword").val();
	var orgId = $("#organizations").combotree("getValue");
	
	var obj = new Object();
	obj.name = keyword;
	obj.orgId = orgId;
	
	$.ajax({
	   	type:"post",
	   	url:"getByParas",
	   	data:"parasTemp="+JSON.stringify(obj),
	   	success:function(result){
	   		$('#dg').datagrid("loadData",JSON.parse(result));
	   		$('#dg').datagrid('getPager').pagination({pageNumber:pageIndex});
	   	},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
	   	}
	})
}
