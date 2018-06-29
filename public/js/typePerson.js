// ======================================全局变量======================================
var $shade = $('.shade'); // 遮罩
var personId = 0;
$(function () {
	$.ajax({
     	type:"post",
     	url:"getWorkTypes",
     	dataType:"json",
     	success:function(data){
     		$("#worktypes").empty();
     		var worktypesContent = "<option value='0'>请选择工种</option>";
     		if(null != data && data.length > 0){
     			for(var i = 0; i < data.length; i++){
     				var worktype = data[i];
     				worktypesContent += "<option value='" + worktype.id + "'>" + worktype.name + "</option>"
     			}
     		}
     		$("#worktypes").append(worktypesContent);
     	},
 		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 			
 	   	}
     })
	
     //点击搜索
    $(".search-btn").on("click",function(){
    	search(1,10);
    })
     
     
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
                    width: 100,
                    align: 'center'
                },
                {
                    field: 'telephone',
                    title: '电话',
                    width: 100,
                    align: 'center'
                },
                {
                    field: 'avatarUrl',
                    title: '头像',
                    width: 100,
                    formatter: function(value, rec) {
                        var content = '';
                        content += '<div class="small-pic">';
                        content += '<img src='+ basePath() + value +' />'
                        content += '</div>';
                        return content;
                    }
                },
                {
                    field: 'worktype',
                    title: '工种',
                    width: 100,
                    align: 'center',
                   
                },
                {
                    field: 'works',
                    title: '技能',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 150,
                    formatter: function (value, rec) {
                        var content = '';
                        content += '<div class="table-operation">';
                        content += '<a class="table-edit" onclick=edit(' + rec.id + ')><i></i>编辑</a>';
                        content += '<a class="table-delete" onclick=singleDelete(' + rec.id + ')><i></i>删除</a>';
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

    // 打开弹窗，清空数据
    newBtn.addEventListener('click', function () {
    	$.ajax({
         	type:"post",
         	url:"addTest",
         	dataType:"json",
         	success:function(data){
         		console.log(data)
         		var persons = data.persons;     //得到运维人员
         		var worktypes = data.worktypes; //得到工种
         		var works = data.works;         //得到技能
         		$("#createPersons").empty();
         		var personsContent = "<option value='0'>请选择</option>";
         		if(null != persons && persons.length > 0){
         			for(var i = 0; i < persons.length; i++){
         				var person = persons[i];
         				personsContent += "<option value='" + person.id + "'>" + person.name + "</option>"
         			}
         		}
         		$("#createPersons").append(personsContent);
         		
         		//工种下拉框
         		$("#createWorkTypes").empty();
         		var worktypesContent = "<option value='0'>请选择</option>";
         		if(null != worktypes && worktypes.length > 0){
         			for(var i = 0; i < worktypes.length; i++){
         				var worktype = worktypes[i];
         				worktypesContent += "<option value='" + worktype.id + "'>" + worktype.name + "</option>"
         			}
         		}
         		$("#createWorkTypes").append(worktypesContent);
         		
         		//技能复选框
         		$("#skillTable").empty();
         		var tableContent = "";
         		if(null != works && works.length > 0){
         			tableContent += "<thead><tr>"
         			for(var i = 0; i < works.length; i++){
         				var work = works[i];
         				tableContent += "<th>"+work.name+"</th>";
         			}
         			tableContent += "</tr></thead>";
         			
         			tableContent += "<tbody><tr>";
         			
         			for(var i = 0; i < works.length; i++){
         				var work = works[i];
         				tableContent += "<td><a class='checkbox-wrapper'><i></i>" +
         						"<input type='hidden' value='"+work.id+"'>" +
         						"<input type='checkbox' name='' id='' class='check-row'></a></td>";
         			}
         			tableContent += "</tr></tbody>";
         		}
         		$("#skillTable").append(tableContent);
         		common.commonCheckbox('.new-table .checkbox-wrapper');
         		
	     		$shade.fadeIn();
	            $newPopup.fadeIn();
	            $newPopup.find('input[type=text]').val('');
	            $('.checkbox-wrapper-checked').removeClass('checkbox-wrapper-checked').find('input').prop('checked', false);
         	},
     		error:function (XMLHttpRequest, textStatus, errorThrown){ 
     	     	//请求错误的处理
     			//请求错误的处理
     			//请求错误的处理
     	   	}
         })
    });
    
    $("#createPersons").on("change",function(){
    	var $this = $(this);
    	personId = parseInt($this.val());
    	if(personId != 0){
    		$.ajax({
             	type:"post",
             	url:"getPersonInfo",
             	data:"personId="+personId,
             	dataType:"json",
             	success:function(data){
             		$this.parents("div").next().find("input").val(data.telephone);
             		$this.parents("div").siblings(".person-img").find("img").attr("src", basePath() + data.avatarUrl);
             	},
         		error:function (XMLHttpRequest, textStatus, errorThrown){ 
         	     	//请求错误的处理
         			//请求错误的处理
         	   	}
             })
    	}else{
    		$this.parents("div").next().find("input").val("");
    		$this.parents("div").siblings(".person-img").find("img").attr("src", basePath()+"front/public/images/datou.png");
    	}
    	
    })
    
    
    // 新建提交按钮
    newSubmit.addEventListener('click', function () {
        $('#newForm').form('submit', {
            onSubmit: function () {
                var checkedNum = $newPopup.find('input[type=checkbox]:checked').length;
                var checked = checkedNum === 0 ? false : true;
                if (!checked) {
                    new CustomPrompt({
                        type: 'default',
                        msg: '至少选择一个工种和技能'
                    });
                }
                if($(this).form('enableValidation').form('validate') && checked){
                	if(personId != 0){
                		var person = new Object();
                    	person.id = personId;
                    	
                    	var worktype = new Object();
                    	worktype.id = parseInt($("#createWorkTypes").val());
                    	person.workType = worktype;
                    	
                    	var works = new Array();
                    	var $checkboxNodes = $("#skillTable").find("input[type='checkbox']");
                    	if(null != $checkboxNodes && $checkboxNodes.length > 0){
                    		$checkboxNodes.each(function(i,node){
                    			if($(node).prop("checked")){
                    				var workId = parseInt($(node).prev().val());
                        			var work = new Object();
                        			work.id = workId;
                        			works.push(work);
                    			}
                    		})
                    	}
                    	person.works = works;
                    	//console.log(JSON.stringify(person))
                		$.ajax({
                         	type:"post",
                         	url:"addPersonConfig",
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
                                    $newPopup.fadeOut();
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
            },
        });
    });
    
    // ======================================编辑框======================================
    // 编辑提交按钮
    var editSubmit = document.getElementsByClassName('edit-submit')[0]; // 编辑提交按钮
    var $editPopup = $('.edit-popup'); // 编辑弹窗框
    editSubmit.addEventListener('click', function () {
        $('#editForm').form('submit', {
            onSubmit: function () {
                var checkedNum = $editPopup.find('input[type=checkbox]:checked').length;
                var checked = checkedNum === 0 ? false : true;
                if (!checked) {
                    new CustomPrompt({
                        type: 'default',
                        msg: '至少选择一个工种和技能'
                    });
                }
                if($(this).form('enableValidation').form('validate') && checked){
                	var person = new Object();
                	person.id = personId;
                	
                	var worktype = new Object();
                	worktype.id = parseInt($("#updateWorkTypes").val());
                	person.workType = worktype;
                	
                	var works = new Array();
                	var $checkboxNodes = $("#updateSkillTable").find("input[type='checkbox']");
                	if(null != $checkboxNodes && $checkboxNodes.length > 0){
                		$checkboxNodes.each(function(i,node){
                			if($(node).prop("checked")){
                				var workId = parseInt($(node).prev().val());
                    			var work = new Object();
                    			work.id = workId;
                    			works.push(work);
                			}
                		})
                	}
                	person.works = works;
                	//console.log(JSON.stringify(person))
                	$.ajax({
                     	type:"post",
                     	url:"updatePersonConfig",
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
                                $newPopup.fadeOut();
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
            },
            success: function (data) {
                new CustomPrompt({
                    type: 'success',
                    msg: '提交成功'
                });
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
    	$.ajax({
         	type:"post",
         	url:"deletePersonConfig",
         	data:"personId="+personId,
         	dataType:"json",
         	success:function(data){
         		$shade.fadeOut();
                $('.delete-wrapper').fadeOut();
                if (data.result) {
                    new CustomPrompt({
                        type: 'success',
                        msg: '操作成功！'
                    });
                    setTimeout("window.location.reload()", 2000)
                } else {
                	  $shade.hide();
                      $('.delete-wrapper').hide();
                    new CustomPrompt({
                        type: 'error',
                        msg: '操作失败！'
                    });
                }
         	},
     		error:function (XMLHttpRequest, textStatus, errorThrown){ 
     	     	//请求错误的处理
     			//请求错误的处理
     			//请求错误的处理
     	   	}
         })
    });
});

// ======================================其他方法======================================
// 编辑
function edit(obj) {
	personId = obj;
	$.ajax({
     	type:"post",
     	url:"updateTest",
     	data:"personId="+personId,
     	dataType:"json",
     	success:function(data){
     		$("#updatePersonName").val(data.name)
     		var oldWorkTypeId = data.worktypeId;
     		var oldWorkIds = data.workIds;
     		var worktypes = data.worktypes;
     		var works = data.works;
     		
     		//工种下拉框
     		$("#updateWorkTypes").empty();
     		var worktypesContent = "<option value='0'>请选择</option>";
     		if(null != worktypes && worktypes.length > 0){
     			for(var i = 0; i < worktypes.length; i++){
     				var worktype = worktypes[i];
     				if(oldWorkTypeId == worktype.id){
     					worktypesContent += "<option value='" + worktype.id + "' selected>" + worktype.name + "</option>"
     				}else{
     					worktypesContent += "<option value='" + worktype.id + "'>" + worktype.name + "</option>"
     				}
     			}
     		}
     		$("#updateWorkTypes").append(worktypesContent);
     		
     		//技能复选框
     		$("#updateSkillTable").empty();
     		var tableContent = "";
     		if(null != works && works.length > 0){
     			tableContent += "<thead><tr>"
     			for(var i = 0; i < works.length; i++){
     				var work = works[i];
     				tableContent += "<th>"+work.name+"</th>";
     			}
     			tableContent += "</tr></thead>";
     			tableContent += "<tbody><tr>";
     			for(var i = 0; i < works.length; i++){
     				var work = works[i];
     				if($.inArray(work.id, oldWorkIds) == -1){
     					tableContent += "<td><a class='checkbox-wrapper'><i></i>" +
 						"<input type='hidden' value='"+work.id+"'>" +
 						"<input type='checkbox' name='' id='' class='check-row'></a></td>";
     				}else{
     					tableContent += "<td><a class='checkbox-wrapper'><i></i>" +
 						"<input type='hidden' value='"+work.id+"'>" +
 						"<input type='checkbox' name='' id='' class='check-row' checked='checked'></a></td>";
     				}
     			}
     			tableContent += "</tr></tbody>";
     		}
     		$("#updateSkillTable").append(tableContent);
     		
     		$shade.fadeIn();
     	    $('.edit-popup').fadeIn();
     	    // 给动态生成的checkbox添加事件
     	    common.commonCheckbox('.edit-table .checkbox-wrapper');
     	},
 		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
     })
};

// 单个删除
function singleDelete(obj) {
	personId = obj;
    $shade.fadeIn();
    $('.delete-wrapper').fadeIn();
};


//点击搜索框
function search(pageIndex,pageSize){
	var keyword = $("#keyword").val();
	var workTypeId = $("#worktypes").val();
	
	var obj = new Object();
	obj.name = keyword;
	obj.workTypeId = workTypeId;
	
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
	var basePath=localhostPath+projectName+"/";
	return basePath;
}