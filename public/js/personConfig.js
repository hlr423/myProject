// ======================================全局变量======================================
var $shade = $('.shade'); // 遮罩
var newDepValue = false; // 新建-部门cbt全局变量
var editDepValue = false; // 编辑-部门cbt全局变量
var personId;
$(function () {
    // ======================================下拉树======================================
    $('#client').combotree({
        url: '../data/tree_data1.json',
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
                    width: '80'
                },
                {
                    field: 'gender',
                    title: '性别',
                    width: '40'
                },
                {
                    field: 'phone',
                    title: '电话号码',
                    width: '100'
                },
                {
                    field: 'account',
                    title: '登录账号',
                    width: '80'
                },
                {
                    field: 'role',
                    title: '角色',
                    width: '100'
                },
                {
                    field: 'department',
                    title: '部门',
                    width: '60'
                },
                {
                    field: 'landline',
                    title: '办公室电话',
                    width: '100'
                },
                {
                    field: 'email',
                    title: '邮箱',
                    width: '100'
                },
                {
                    field: 'address',
                    title: '家庭住址',
                    width: '100'
                },
                {
                    field: 'state',
                    title: '状态',
                    width: '60',
                    formatter: function (value, rec) {
                    	var personStatus = "<a class='state green'>"+value+"</a>";
                    	if(value == "离职"){
                    		personStatus = "<a class='state green'>"+value+"</a>";
                    	}
                    	return personStatus;
                        //return '<a class="state green">在职</a>'+'<a class="state gray">离职</a>' + '<a class="state red">失效</a>'
                    }
                },
                {
                    field: 'record',
                    title: '通讯录',
                    width: '60',
                    formatter: function (value, rec) {
                    	var addressListContent = "<a href='javascript:void(0)' class='state green' onclick='inAddressList(" + rec.id +")'>加入</a>";
                    	if(rec.isInAddressList){
                    		addressListContent = "<a href='javascript:void(0)' class='state red' onclick='outAddressList(" + rec.id +")'>移除</a>";
                    	}
                    	return addressListContent;
                    }
                },
                {
                    field: 'orgManager',
                    title: '部门<br/>主管',
                    width: '50',
                    formatter: function (value, rec) {
                    	var managerContent = "<a href='javascript:void(0)' class='state green' onclick='setOrgManager(" + rec.id + "," + rec.departmentId + ")'>设置</a>";
                    	if(rec.isOrgManager){ 
                    		managerContent = "<a href='javascript:void(0)' class='state red' onclick='withdrawOrgManager(" + rec.id + "," + rec.departmentId + ")'>取消</a>";
                    	}
                    	return managerContent;
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 1200,
                    formatter: function(value, rec) {
                        var content = '';
                        content += '<div class="table-operation">';
                        if(rec.account != "无"){
                        	content += '<a class="table-init" onclick=initPwd('+rec.id+')><i></i>初始化密码</a>';
                        }
                        if(!rec.hasAccount){
                        	content += '<a class="table-account" onclick=account('+rec.id+')><i></i>分配账号</a>';
                        }
                        content += '<a class="table-region" onclick=region('+rec.id+')><i></i>分配管辖区域</a>';
                        content += '<a class="table-edit" onclick=edit('+rec.id+')><i></i>编辑</a>';
                        content += '<a class="table-delete" onclick=singleDelete('+rec.id+')><i></i>删除</a>';
                        content += '</div>';
                        return content;
                    }
                }
            ]
        ],
        onLoadSuccess: function (row, data){
        	if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
			}
        }
    });
    
    //点击搜索
    $(".search-btn").on("click",function(){
    	search(1,10);
    })
    
    
    
    // ======================================新建框======================================
    var $newPopup = $('.new-popup'); // 新建弹窗框
    var newBtn = document.querySelector('.new-btn'); // 新建按钮
    var newSubmit = document.querySelector('.new-submit'); // 新建提交按钮
    var $newDep = $('#newDep'); // 新建-部门cbt
    var newRole = document.querySelector('.new-role'); // 新建-角色select
    // 初始化新建部门下拉树
    $newDep.combotree({
        url: 'getOrgs',
        method: 'post',
        width: 250,
        height: 30,
        hasDownArrow: false,
    });
    
    // 打开弹窗，清空数据
    newBtn.addEventListener('click', function () {
    	$.ajax({
         	type:"post",
         	url:"addTestRoles",
         	dataType:"json",
         	success:function(data){
         		if(null != data && null != data[0] && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
         		}
         		
         		if(null != data && null != data[0] && data[0].noOpt){
         			new CustomPrompt({
                        type: 'error',
                        msg: '您无权操作！'
                    });
         		}else{
         			$("#addRoleId").empty();
         			var content = "<option value='0'>请选择PC端角色</option>";
         			if(data.length > 0){
         				for(var i = 0; i < data.length; i++){
         					var role = data[i];
         					content += "<option value='"+role.id+"'>"+role.text+"</option>";
         				}
         			}
         			$("#addRoleId").append(content);
         			$shade.fadeIn();
         			$newPopup.fadeIn();
         			$newPopup.find('input[type=text]').not($newPopup.find('.textbox.combo input[type=text]')).val('');
         			newRole.children[0].selected = true;
         			$newDep.combotree('clear');
         		}
         	},
     		error:function (XMLHttpRequest, textStatus, errorThrown){ 
     	     	//请求错误的处理
     			//请求错误的处理
     			//请求错误的处理
     	   	}
         })
    });
    
    // 滚动时判断是否有提示框
    $('.new-popup .content, .edit-popup .content').on('scroll', function () {
        var tooltip = document.querySelector('.tooltip.tooltip-right');
        if (tooltip !== null) {
            $(this).find('input').trigger('blur');
        };
    });
    
    // 新建-选择性别
    common.commonRadio('.new-chose-gender');
    
    // 新建提交按钮
    newSubmit.addEventListener('click', function () {
        $('#newForm').form('submit', {
            onSubmit: function () {
            	if($(this).form('enableValidation').form('validate')){
            		var person = new Object();
            		var $form = $("#newForm");
            		person.name = $form.find("input[name='name']").val();
            		person.gender = $form.find("input[name='gender']:checked").val();
            		person.telephone = $form.find("input[name='telephone']").val();
            		person.idCard = $form.find("input[name='idCard']").val();
            		person.sn = $form.find("input[name='sn']").val();
            		person.position = $form.find("input[name='position']").val();
            		person.workphone = $form.find("input[name='workphone']").val();
            		person.email = $form.find("input[name='email']").val();
            		person.address = $form.find("input[name='address']").val();
            		
            		var role = new Object();
            		role.id = parseInt($("#addRoleId").val()) ;
            		person.role = role;
            		
            		var organization = new Object();
            		organization.id = parseInt($("#newDep").combotree("getValue"));
            		person.organization = organization;
            		console.log(JSON.stringify(person));
            		$.ajax({
                     	type:"post",
                     	url:"addPerson",
                     	contentType:"application/json;charset=utf-8",
                     	data:JSON.stringify(person),
                     	traditional:true,
                     	dataType:"json",
                     	success:function(data){
                     		console.log(data)
                     		if(null != data && null != data[0] && data[0].invalidate){
                				window.parent.location.href = data[0].loginPage;
                     		}
                     		
                     		
                     		if(data.telephone){
                     			new CustomPrompt({
                                    type: 'default',
                                    msg: '手机号重复！'
                                });
                     		}else{
                     			if(data.idCard){
                     				new CustomPrompt({
                                        type: 'default',
                                        msg: '身份证号重复！'
                                    });
                     			}else{
                     				if(data.sn){
                     					new CustomPrompt({
                                            type: 'default',
                                            msg: '工号重复！'
                                        });
                     				}else{
                     					if(data.result){
                                 			new CustomPrompt({
                                                type: 'success',
                                                msg: '操作成功！'
                                            });
                                            $shade.fadeOut();
                                            $newPopup.fadeOut();
                                            setTimeout("window.location.reload()", 2000);
                                 		}else{
                                 			new CustomPrompt({
                                                type: 'error',
                                                msg: '操作失败！'
                                            });
                                 		}
                     				}
                     			}
                     		}
                     	},
        	     		error:function (XMLHttpRequest, textStatus, errorThrown){ 
        	     	     	//请求错误的处理
        	     			//请求错误的处理
        	     			//请求错误的处理
        	     	   	}
                     })
            	}
            },
        });
    });
    
    
    // ======================================编辑框======================================
    // 编辑-选择性别
    common.commonRadio('.edit-chose-gender');
    
    // 编辑提交按钮
    var editSubmit = document.querySelector('.edit-submit'); // 编辑提交按钮
    var $editPopup = $('.edit-popup'); // 编辑弹窗框
    var $editDep = $('#editDep'); // 编辑-部门cbt
    editSubmit.addEventListener('click', function () {
        $('#editForm').form('submit', {
            onSubmit: function () {
            	if($(this).form('enableValidation').form('validate')){
            		var person = new Object();
            		person.id = personId;
            		person.name = $("#editName").val();
             		person.telephone = $("#editTelephone").val();
             		person.idCard = $("#editIdCard").val();
             		person.sn = $("#editSn").val();
             		person.position = $("#editPosition").val();
             		person.workphone = $("#editWorkphone").val();
             		person.email = $("#editEmail").val();
             		person.address = $("#editAddress").val();
             		person.gender = $("#editGender").find("input[name='gender']:checked").val();
             		
             		var role = new Object();
             		role.id = parseInt($("#editRoleId").val());
             		person.role = role;
             		
             		var organization = new Object();
             		organization.id = parseInt($("#editDep").combotree("getValue"));
             		person.organization = organization;
             		
             		var personStatus = new Object();
             		personStatus.id = $("#editPersonStatusId").val();
             		person.personStatus = personStatus;
             		$.ajax({
                     	type:"post",
                     	url:"updatePerson",
                     	contentType:"application/json;charset=utf-8",
                     	data:JSON.stringify(person),
                     	dataType:"json",
                     	success:function(data){
                     		if(null != data && null != data[0] && data[0].invalidate){
                				window.parent.location.href = data[0].loginPage;
                     		}
                     		
                     		if(data.telephone){
                     			new CustomPrompt({
                                    type: 'default',
                                    msg: '手机号重复！'
                                });
                     		}else{
                     			if(data.idCard){
                     				new CustomPrompt({
                                        type: 'default',
                                        msg: '身份证号重复！'
                                    });
                     			}else{
                     				if(data.sn){
                     					new CustomPrompt({
                                            type: 'default',
                                            msg: '工号重复！'
                                        });
                     				}else{
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
                     				}
                     			}
                     		}
                     	},
        	     		error:function (XMLHttpRequest, textStatus, errorThrown){ 
        	     	     	//请求错误的处理
        	     			//请求错误的处理
        	     			//请求错误的处理
        	     			//请求错误的处理
        	     	   	}
                     })
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
    })
    
    // ======================================确认初始化按钮======================================
    var initConfirm = document.querySelector('.init-confirm');
    initConfirm.addEventListener('click', function () {
    	$.ajax({
         	type:"post",
         	url:"updateInitialPass",
         	data:"personId="+personId,
         	dataType:"json",
         	success:function(data){
         		if(null != data && null != data[0] && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
         		}
         		
         		$shade.fadeOut();
                $('.init-pwd-wrapper').fadeOut();
                if(data.result){
                    new CustomPrompt({
                        type: 'success',
                        msg: '操作成功！'
                    });
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
     			//请求错误的处理
     			//请求错误的处理
     	   	}
         })
    });

    // ======================================确认删除按钮======================================
    var deleteConfirm = document.querySelector('.delete-confirm');
    deleteConfirm.addEventListener('click', function () {
    	$.ajax({
         	type:"post",
         	url:"deletePerson",
         	data:"personId="+personId,
         	dataType:"json",
         	success:function(data){
         		if(null != data && null != data[0] && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
         		}
         		
         		$shade.fadeOut();
                $('.delete-wrapper').fadeOut();
                if (data.result) {
                    new CustomPrompt({
                        type: 'success',
                        msg: '操作成功！',
                    });
                    setTimeout("window.location.reload()", 2000);
                } else {
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
     			//请求错误的处理
     	   	}
         })
    });

    // ======================================确认分配账号======================================
    var accountSubmit = document.querySelector('.account-submit');
    accountSubmit.addEventListener('click', function () {
    	var userName = $(".account-popup").find("input[name='userName']").val();
    	$.ajax({
         	type:"post",
         	url:"addUser",
         	data:"userName="+userName+"&personId="+personId,
         	dataType:"json",
         	success:function(data){
         		if(null != data && null != data[0] && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
         		}
         		
         		 $shade.fadeOut();
                 $('.account-popup').fadeOut();
                 if(data.result) {
                     new CustomPrompt({
                         type: 'success',
                         msg: '操作成功！'
                     });
                     setTimeout("window.location.reload()", 2000);
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
     			//请求错误的处理
     			//请求错误的处理
     	   	}
         })
    })
    
    //====================================分配区域提交===========================================
    $(".region-submit").on("click",function(){
    	var temp = $("#treeTable1 tbody tr");
    	var areas = new Array();
    	var jsonArray = new Array();
    	$(temp).each(function(i,node){
    		var $trAttr = $(node).attr("data-tt-id");
    		if($trAttr.split("-").length == 1){
    			//查询当前节点的儿子
    			var $checkRow = $(node).find(".check-row");
    			//console.log(parseInt($checkRow.attr("name")));
    			var jsonObj = new Object();
    			if($checkRow.prop("checked")){
    				var name = $(node).find("td:eq(2)").text();
    				var id = parseInt($checkRow.attr("name"));
    				var children = new Array();
    				jsonObj.id = id;
    				jsonObj.text = name;
    				jsonObj.children = children;
    				areas.push(id);
    				getChildren(node,areas,jsonObj);
    				if(null != jsonObj && jsonObj.id != null){
    					jsonArray.push(jsonObj);
    				}
    			}else{
    				getChildren(node,areas,jsonObj);
    				if(null != jsonObj && jsonObj.id != null){
    					jsonArray.push(jsonObj);
    				}
    			}
    		}
    	})
    	var area = new Object();
    	area.jsonArray = jsonArray;
    	area.areas = areas;
    	area.personId = personId;
    	//console.log(JSON.stringify(area));
    	$.ajax({
         	type:"post",
         	url:"updatePersonArea",
         	data:"areas="+JSON.stringify(area),
         	dataType:"json",
         	success:function(data){
         		if(null != data && null != data[0] && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
         		}
         		
         		if(data.result) {
                    new CustomPrompt({
                        type: 'success',
                        msg: '操作成功！'
                    });
                    setTimeout("window.location.reload()", 2000);
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
     			//请求错误的处理
     	   	}
         })
    })
});

// ======================================其他方法======================================

// 初始化密码
function initPwd(obj) {
	personId = obj;
	$.ajax({
		url:"updateTest",
		method:"post",
		dataType:"json",
		success:function(data){
			if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
     		
     		if(null != data && null != data[0].noOpt && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
            	 $shade.fadeIn();
            	 $('.init-pwd-wrapper').fadeIn();
            }
		},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
	})
}

// 编辑
function edit(obj) {
	personId = obj;
	$.ajax({
     	type:"post",
     	url:"updatePersonTest",
     	data:"personId="+obj,
     	dataType:"json",
     	success:function(data){
     		//console.log(data)
     		if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
     		
     		if(null != data && null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			var personInfo = data.personInfo;
     			var roles = data.roles;
     			var orgs = data.orgs;
     			var personStatus = data.personStatus;
     			var gender = personInfo.gender;
     			//显示原来的人员基本信息
     			$("#editName").val(personInfo.name);
     			$("#editTelephone").val(personInfo.telephone);
     			$("#editIdCard").val(personInfo.idCard);
     			$("#editSn").val(personInfo.sn);
     			$("#editPosition").val(personInfo.position);
     			$("#editWorkphone").val(personInfo.workphone);
     			$("#editEmail").val(personInfo.email);
     			$("#editAddress").val(personInfo.address);
     			var inputs = $("#editGender").find("input")
     			for(var i = 0; i < inputs.length; i++){
     				var $input = $(inputs[i]);
     				var inputValue = $input.val();
     				if(inputValue == gender){
     					$input.parent("a").addClass("radio-checked");
     					$input.attr("checked","checked")
     				}else{
     					$input.parent("a").removeClass("radio-checked");
     				}
     			}
     			
     			var roleIdOld = personInfo.roleId;
     			var personStatusIdOld = personInfo.personStatusId;
     			var orgIdOld = personInfo.orgId;
     			
     			// 初始化编辑-部门cbt
     			$('#editDep').combotree({
     				data:orgs,
     				value:orgIdOld,
     				width: 250,
     				height: 30,
     				hasDownArrow: false,
     			});
     			
     			//角色选择
     			$("#editRoleId").empty();
     			var roleContent = "<option value='0'>请选择角色</option>"
     				if(null != roles && roles.length > 0){
     					for(var i = 0; i < roles.length; i++){
     						var role = roles[i];
     						if(role.id == roleIdOld){
     							roleContent += "<option value='"+role.id+"' selected>"+role.text+"</option>";
     						}else{
     							roleContent += "<option value='"+role.id+"'>"+role.text+"</option>";
     						}
     					}
     				}
     			$("#editRoleId").append(roleContent);
     			
     			//人员状态选择
     			$("#editPersonStatusId").empty();
     			var psContent = "<option value='0'>请选择状态</option>"
     				if(null != personStatus && personStatus.length > 0){
     					for(var i = 0; i < personStatus.length; i++){
     						var ps = personStatus[i];
     						if(ps.id == personStatusIdOld){
     							psContent += "<option value='"+ps.id+"' selected>"+ps.text+"</option>";
     						}else{
     							psContent += "<option value='"+ps.id+"'>"+ps.text+"</option>";
     						}
     					}
     				}
     			$("#editPersonStatusId").append(psContent);
     			$shade.fadeIn();
     			$('.edit-popup').fadeIn();
     		}
     	},
 		error:function (XMLHttpRequest, textStatus, errorThrown){
 			new CustomPrompt({
                type: 'error',
                msg: '请求出错!'
            });
 			//window.location.href = "/wai-web-base/excPage/toExcPage2";
 			//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
     })
};

// 单个删除
function singleDelete(obj) {
	personId = obj;
	$.ajax({
		url:"deleteTest",
		method:"post",
		dataType:"json",
		success:function(data){
			if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
     		
     		if(null != data && null != data[0].noOpt && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     		    $shade.fadeIn();
     		    $('.delete-wrapper').fadeIn();
            }
		},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
	})
	
};

// 分配账号
function account(obj) {
	personId = obj;
	$.ajax({
		url:"updateTest",
		method:"post",
		dataType:"json",
		success:function(data){
			if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
     		
     		if(null != data && null != data[0].noOpt && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			$shade.fadeIn();
     		    $('.account-popup').fadeIn();
            }
		},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
	})
}

// 分配管辖区域
function region (obj) {
	personId = obj;
	$.ajax({
     	type:"post",
     	url:"updateAreas",
     	data:"personId="+obj,
     	dataType:"json",
     	success:function(data){
     		if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
     		
     		if(null != data && null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			var result = data.areas;
     			var personInfo = data.personInfo;
     			$(".region-popup").find(".content").find("span").text(personInfo.name);
     			
     			// 初始化tabletree
     			var option = {
     					expandable: true,
     					column: 1,
     					indent: 20,
     			}
     			
     			$(".region-popup").find("#treeTable1").remove();
     			var $treeTable1 = "<table id='treeTable1' class='treetable'></table>"
     				$(".region-popup").find(".content").find(".content-item").after($treeTable1);
     			var content = "<thead>" +
     			"<tr>" +
     			"<th>" +
     			"<a class='checkbox-all-wrapper'>" +
     			"<i></i><input type='checkbox' name='' class='check-all'>" +
     			"</a>" +
     			"</th>"+
     			"<th>序号</th>" +
     			"<th>区域名称</th>" +
     			"</tr>" +
     			"</thead>";
     			content += "<tbody>";
     			for(var i = 0; i < result.length; i++){
     				var first = result[i];//第一级对象
     				var secondChildren = first.children
     				//var firstLevel = first.level;
     				content += "<tr data-tt-id='"+(i+1)+"' class='expanded'>";
     				content += "<td>" +
     				"<a class='checkbox-wrapper'><i></i>" +
     				"<input type='checkbox' name='"+first.id+"' id='' class='check-row'>" +
     				"</a>" +
     				"</td>";
     				content += "<td>"+(i+1)+"</td>";
     				content += "<td>"+first.text+"</td>";
     				content +="</tr>"
 					//arr.push((i+1));
 					if(null != secondChildren && secondChildren.length > 0){
 						for(var j = 0; j < secondChildren.length; j++){//遍历第二级集合
 							var second = secondChildren[j];//第二级对象
 							var thirdChildren = second.children;//第三级集合
 							content += "<tr data-tt-id='"+(i+1)+"-"+(j+1)+"' data-tt-parent-id='"+(i+1)+"'>";
 							content += "<td>" +
 							"<a class='checkbox-wrapper'><i></i>" +
 							"<input type='checkbox' name='"+second.id+"' id='' class='check-row'>" +
 							"</a>" +
 							"</td>";
 							content += "<td>"+(i+1)+"-"+(j+1)+"</td>";
 							content += "<td>"+second.text+"</td>";
 							content +="</tr>"
							//arr.push((i+1)+"-"+(j+1));
							if(null != thirdChildren && thirdChildren.length > 0){
								for(var k = 0; k < thirdChildren.length; k++){//遍历第三级集合
									var third = thirdChildren[k];//第三级对象
									var forthChildren = third.children;//第四级集合
									content += "<tr data-tt-id='"+(i+1)+"-"+(j+1)+"-"+(k+1)+"' data-tt-parent-id='"+(i+1)+"-"+(j+1)+"'>";
									content += "<td>" +
									"<a class='checkbox-wrapper'><i></i>" +
									"<input type='checkbox' name='"+third.id+"' id='' class='check-row'>" +
									"</a>" +
									"</td>";
									content += "<td>"+(i+1)+"-"+(j+1)+"-"+(k+1)+"</td>";
									content += "<td>"+third.text+"</td>";
									content += "</tr>"
									//arr.push((i+1)+"-"+(j+1)+"-"+(k+1));
									if(null != forthChildren && forthChildren.length > 0){
										for(var l = 0; l < forthChildren.length; l++){//遍历第四级集合
											var forth = forthChildren[l];//第四级对象
											var fifthChildren = forth.children;//第五级集合
											content += "<tr data-tt-id='"+(i+1)+"-"+(j+1)+"-"+(k+1)+"-"+(l+1)+"' data-tt-parent-id='"+(i+1)+"-"+(j+1)+"-"+(k+1)+"'>";
											content += "<td>" +
											"<a class='checkbox-wrapper'><i></i>" +
											"<input type='checkbox' name='"+forth.id+"' id='' class='check-row'>" +
											"</a>" +
											"</td>";
											content += "<td>"+(i+1)+"-"+(j+1)+"-"+(k+1)+"-"+(l+1)+"</td>";
											content += "<td>"+forth.text+"</td>";
											content +="</tr>"
											//arr.push((i+1)+"-"+(j+1)+"-"+(k+1)+"-"+(l+1));
											if(null != fifthChildren && fifthChildren.length > 0){
												for(var m = 0; m < fifthChildren.length; m++){//遍历第五级集合
													var fifth = fifthChildren[m];//第五级对象
													var sixthChildren = fifth.children;//第六级集合
													content += "<tr data-tt-id='"+(i+1)+"-"+(j+1)+"-"+(k+1)+"-"+(l+1)+"-"+(m+1)+"' data-tt-parent-id='"+(i+1)+"-"+(j+1)+"-"+(k+1)+"-"+(l+1)+"'>";
													content += "<td>" +
													"<a class='checkbox-wrapper'><i></i>" +
													"<input type='checkbox' name='"+fifth.id+"' id='' class='check-row'>" +
													"</a>" +
													"</td>";
													content += "<td>"+(i+1)+"-"+(j+1)+"-"+(k+1)+"-"+(l+1)+"-"+(m+1)+"</td>";
													content += "<td>"+fifth.text+"</td>";
													content +="</tr>"
													if(null != sixthChildren && sixthChildren.length > 0){
														for(var n = 0; n < sixthChildren.length; n++){//遍历第六级集合
															var sixth = sixthChildren[n];//第五级对象
															content += "<tr data-tt-id='"+(i+1)+"-"+(j+1)+"-"+(k+1)+"-"+(l+1)+"-"+(m+1)+"-"+(n+1)+"' data-tt-parent-id='"+(i+1)+"-"+(j+1)+"-"+(k+1)+"-"+(l+1)+"-"+(m+1)+"'>";
															content += "<td>" +
															"<a class='checkbox-wrapper'><i></i>" +
															"<input type='checkbox' name='"+sixth.id+"' id='' class='check-row'>" +
															"</a>" +
															"</td>";
															content += "<td>"+(i+1)+"-"+(j+1)+"-"+(k+1)+"-"+(l+1)+"-"+(m+1)+"-"+(n+1)+"</td>";
															content += "<td>"+sixth.text+"</td>";
															content +="</tr>"
														}
													}
												}
											}
										}
									}
								}
							}
 						}
 					}
     			}
     			content +="</tbody>"
     			$("#treeTable1").append(content);
     			$('#treeTable1').treetable(option); // 新建
     			$('#treeTable1').treetable("expandAll"); // 展开全部
     			$('#treeTable1').
     			common.commonCheckbox('.treetable'); // 单选
     			common.checkboxAll('.treetable'); // 全选    
     			$shade.fadeIn();
     			$('.region-popup').fadeIn();
     		}
     	},
 		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
     })
}

//将某人设置为部门主管
function setOrgManager(personIdTemp, orgId){
	$.ajax({
     	type:"post",
     	url:"addOrgManager",
     	data:"personId="+personIdTemp+"&orgId="+orgId,
     	dataType:"json",
     	success:function(data){
     		if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
     		
     		if(null != data && null != data[0].noOpt && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			if(data.result) {
     				new CustomPrompt({
     					type: 'success',
     					msg: '操作成功！'
     				});
     				setTimeout("window.location.reload()", 2000);
     			}else{
     				new CustomPrompt({
     					type: 'error',
     					msg: '操作失败！'
     				});
     			}
     		}
     	},
 		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
     })
}

//取消某人的部门主管
function withdrawOrgManager(personIdTemp, orgId){
	$.ajax({
     	type:"post",
     	url:"deleteOrgManager",
     	data:"personId="+personIdTemp,
     	dataType:"json",
     	success:function(data){
     		if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
     		
     		if(null != data && null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			if(data.result) {
     				new CustomPrompt({
     					type: 'success',
     					msg: '操作成功！'
     				});
     				setTimeout("window.location.reload()", 2000);
     			}else{
     				new CustomPrompt({
     					type: 'error',
     					msg: '操作失败！'
     				});
     			}
     		}
     	},
 		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
     })
}

//添加到通讯录
function inAddressList(obj){
	$.ajax({
     	type:"post",
     	url:"addAddressList",
     	data:"personId="+obj,
     	dataType:"json",
     	success:function(data){
     		if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
     		
     		if(null != data && null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			if(data.result) {
     				new CustomPrompt({
     					type: 'success',
     					msg: '操作成功！'
     				});
     				setTimeout("window.location.reload()", 2000);
     			}else{
     				new CustomPrompt({
     					type: 'error',
     					msg: '操作失败！'
     				});
     			}
     		}
     	},
 		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
     })
}

//从通讯录移除
function outAddressList(obj){
	$.ajax({
     	type:"post",
     	url:"deleteAddressList",
     	data:"personId="+obj,
     	dataType:"json",
     	success:function(data){
     		if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
     		
     		if(null != data && null != data[0].noOpt && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			if(data.result) {
     				new CustomPrompt({
     					type: 'success',
     					msg: '操作成功！'
     				});
     				setTimeout("window.location.reload()", 2000);
     			}else{
     				new CustomPrompt({
     					type: 'error',
     					msg: '操作失败！'
     				});
     			}
     		}
     	},
 		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
     })
}

//点击搜索框
function search(pageIndex,pageSize){
	var keyword = $("#keyword").val();
	var url = 'getByPage';
	if($.trim(keyword).length > 0){
		url = 'getByParas';
	}
	
	
	$.ajax({
	   	type:"post",
	   	url:url,
	   	data:"keyword="+keyword,
	   	success:function(data){
	   		if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
     		
	   		
	   		$('#dg').datagrid("loadData",JSON.parse(data));
	   		$('#dg').datagrid('getPager').pagination({pageNumber:pageIndex});
	   	},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
	   	}
   })
}

//封装区域的残疾树结构
function getChildren(obj, areas, temp){
	if(temp.id != null){
		var $trAttr = $(obj).attr("data-tt-id");
		//查询当前节点的儿子
		var childrenNode = $("#treeTable1 tbody tr[data-tt-parent-id="+$trAttr+"]");
		if(childrenNode != null && childrenNode.length > 0){
			$(childrenNode).each(function(i,node){
				var $childCheckRow = $(node).find(".check-row");
				var childName = $(node).find("td:eq(2)").text();
				var childId = parseInt($childCheckRow.attr("name"))
				if($childCheckRow.prop("checked")){
					var childTemp = new Object();
					var children2 = new Array();
					childTemp.id = childId;
					childTemp.children = children2;
					childTemp.text = childName;
					temp.children.push(childTemp);
					areas.push(childId);
					getChildren(node,areas,childTemp);
				}else{
					getChildren(node,areas,temp);
				}
			})
		}
	}else{
		var $trAttr = $(obj).attr("data-tt-id");
		//查询当前节点的儿子
		var childrenNode = $("#treeTable1 tbody tr[data-tt-parent-id="+$trAttr+"]");
		if(childrenNode != null && childrenNode.length > 0){
			$(childrenNode).each(function(i,node){
				var $childCheckRow = $(node).find(".check-row");
				var childName = $(node).find("td:eq(2)").text();
				var childId = parseInt($childCheckRow.attr("name"))
				if($childCheckRow.prop("checked")){
					var children2 = new Array();
					temp.id = childId;
					temp.children = children2;
					temp.text = childName;
					areas.push(childId);
					getChildren(node,areas,temp);
				}else{
					getChildren(node,areas,temp);
				}
			})
		}
	}
}



