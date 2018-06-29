var switchShade = false; //显示隐藏阴影的开关  ，默认新增分类没有弹出
var add_edit_status = 0;//通讯人员的新建与编辑框供用，用该状态来标识提交的时候是新建还是编辑
var delete_person_type_status = 0;//用于区分是删除人员还是删除类型


$(function () {
	//点击搜索
	$(".search-btn").on("click",function(){
		search(1,10);
	})
    // 整体table
	
    $('#dg').datagrid({
        // fit: true,//表的页脚置低
        url: "getByPage_addressList",
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination: true, //允许显示表的页脚
        scrollbarSize: 0,
        columns: [
            [{
                    field: 'type',
                    title: '类型',
                    width: 90,
                },
                {
                    field: 'name',
                    title: '名称',
                    width: 100,
                },
                {
                    field: 'tel',
                    title: '电话',
                    width: 80,
                },
                {
                    field: 'e-mail',
                    title: '邮箱',
                    width: 80,
                },
                {
                    field: 'operation',
                    title: '操作',
                    width: 90,
                    formatter: function (value, row, index) {
                        return '<div class="table-operation"><a class="table-edit" onclick="editOpen(' + row.addressListId + ')"><i></i>编辑</a> ' +
                            '<a class="table-delete" onclick="deleteOpen(' + row.addressListId + ')"><i></i>删除</a>' +
                            '</div>';
                    }
                }

            ]
        ]
    });
    //自定义分页


    // 分类的模态框的显示和隐藏
    $("#classification").click(function () {
        $(".shade").fadeIn();
        $(".classification").fadeIn();
        switchShade = true;
        $('#classificationTable').datagrid({
            fit: "true",
            url: "getAddressTypes",
            fitColumns: true,
            rownumbers: true, // 显示行号列
            singleSelect: true, // 允许选择一行
            // pagination: true, //允许显示表的页脚
            scrollbarSize: 0,
            columns: [
                [{
                    field: 'text',
                    title: '类型名称',
                    width: 30,
                }, {
                    field: 'operation',
                    title: '操作',
                    width: 40,
                    formatter: function (value, row, index) {
                        return '<div class="table-operation"><a class="table-edit" onclick="typeEditOpen(' + row.id + ')"><i></i>编辑</a> ' +
                            '<a class="table-delete" onclick="deleteTypeOpen(' + row.id + ')"><i></i>删除</a>' +
                            '</div>';
                    }
                }]
            ]
        })
        $(".close-popup-delete").click(function () {
            $(".newAdd-wrapper-delete").hide();
        })
    })
    
    
    var editTypeSubmit = document.querySelector('#editType_submit');
    editTypeSubmit.addEventListener('click', function () {
  		var addressType = new Object();
  		addressType.name = $("#editAddressType").val();
  		var addressTypeId = parseInt($("#editAddressTypeId").val());
  		addressType.id = addressTypeId;
  		$.ajax({
      		url:"updateAddressType",
      		method:"post",
      		contentType:"application/json;charset=utf-8",
      		data:JSON.stringify(addressType),
      		dataType:"json",
      		success:function(data){
      			if(data.isExist){
       				new CustomPrompt({
                        type: 'error',
                        msg: '该名称已存在！'
                    });
       			}else{
       				if(data.result) {
    	                new CustomPrompt({
    	                    type: 'success',
    	                    msg: '操作成功！'
    	                });
    	                $('.shade,.delete-wrapper').fadeOut();
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
})
    
    
    $(".deletePerson-submit").on("click",function(){
    	if(delete_person_type_status == 1){
    		var addressListId = $("#editAddressListId").val();
        	$.ajax({
        		url:"deleteAddressList",
        		method:"post",
        		data:"addressListId="+addressListId,
        		dataType:"json",
        		success:function(data){
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
    	}else if(delete_person_type_status == 2){
    		var addressTypeId = $("#editAddressTypeId").val();
        	$.ajax({
        		url:"deleteAddressType",
        		method:"post",
        		data:"addressTypeId="+addressTypeId,
        		dataType:"json",
        		success:function(data){
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
    	}
    })
    
    
    /*$(".submit.newAdd-submit").on("click",function(){
    	alert("新建通讯人员提交")
    })*/
   // var newSubmit = document.querySelector('.submit.newAdd-submit'); // 新建提交按钮
    /*newSubmit.addEventListener('click', function () {
        $('.newAdd-form').form('submit', {
            onSubmit: function () {
            	
            }
        })
    })*/
});
/*===========其它方法=========*/
// 弹出编辑通讯人员框
function editOpen(obj) {
	add_edit_status = 2;
	$("#editAddressListId").val(obj);
	$.ajax({
		url:"getByPersonId",
		method:"post",
		data:"addressListId="+obj,
		dataType:"json",
		success:function(data){
			$("#addName").val(data.name);
			$("#addTel").val(data.telephone);
			$("#addEmail").val(data.email);
			var addressTypes = data.addressTypes;
			var addressTypeId = data.addressTypeId;
			var content = "<option value='0'>请选择类型</option>";
 			$("#addressTypes").empty();
 			if(addressTypes.length > 0){
				for(var i = 0; i < addressTypes.length; i++){
					var addressType = addressTypes[i];
					if(addressTypeId == addressType.id){
						content += "<option value='"+ addressType.id +"' selected>"+ addressType.text +"</option>";
					}else{
						content += "<option value='"+ addressType.id +"'>"+ addressType.text +"</option>";
					}
				}
			}
 			$("#addressTypes").append(content);
		},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
	})
    var editM = document.getElementById('edit-module');
    $(editM).find(".title").find("span").text("编辑");
    var shade = document.getElementById('shade')
    editM.style.display = "inline";
    shade.style.display = "inline";
}

//删除通讯类型弹窗
function deleteTypeOpen(typeId){
	$("#editAddressTypeId").val(typeId)
	delete_person_type_status = 2;
    var Delete = document.getElementById('Delete');
    var shade = document.getElementById('shade')
    Delete.style.display = "inline";
    shade.style.display = "inline";
}

// 弹出删除框
function deleteOpen(obj) {
	$("#editAddressListId").val(obj)
	delete_person_type_status = 1;
    var Delete = document.getElementById('Delete');
    var shade = document.getElementById('shade')
    Delete.style.display = "inline";
    shade.style.display = "inline";
}





//弹出编辑通讯类型框
function typeEditOpen(obj) {
	$("#editAddressTypeId").val(obj);
	$.ajax({
		url:"getByTypeId",
		method:"post",
		data:"addressTypeId="+obj,
		dataType:"json",
		success:function(data){
			$("#editAddressType").val(data.name)
		},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
	})
    var Delete = document.getElementById('classification-change');
    var shade = document.getElementById('shade')
    Delete.style.display = "inline";
    shade.style.display = "inline";
    
    // 编辑类别
    // $("#newModule").click(function () {
    //     $(".shade").fadeIn();
    //     $(".classification-change").fadeIn()
    // })
}
/*===========新建通讯人员==========*/
var newSubmit = document.querySelector('.newAdd-submit'); // 新建提交按钮
var newTypeSubmit = document.querySelector('#addressType_addSubmit'); // 新建类型提交按钮
$("#newModule").click(function () {
	add_edit_status = 1;
	 var editM = document.getElementById('edit-module');
	    $(editM).find(".title").find("span").text("新建");
	$.ajax({
		url:"getAddressTypes",
		method:"post",
		dataType:"json",
		success:function(data){
			if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}else{
     			var content = "<option value='0'>请选择类型</option>";
     			$("#addressTypes").empty();
     			if(data.length > 0){
    				for(var i = 0; i < data.length; i++){
    					var addressType = data[i];
    					content += "<option value='"+ addressType.id +"'>"+ addressType.text +"</option>";
    				}
    			}
     			$("#addressTypes").append(content);
     		}
			$(".shade").fadeIn();
		    $(".newAddShow").fadeIn()
		},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
	})
})

//新建通讯人员提交
newSubmit.addEventListener('click', function () {
	if(add_edit_status == 1){
		$('.newAdd-form').form('submit', {
		       onSubmit:function(){
		    	   if($(this).form('enableValidation').form('validate')){
		       		var person = new Object();
		       		var addressType = new Object();
		       		var addressTypeId = parseInt($("#addressTypes").val());
		       		addressType.id = addressTypeId;
		       		person.addressType = addressType;
		       		
		       		var name = $("#addName").val();
		       		var telephone = $("#addTel").val();
		       		var email = $("#addEmail").val();
		       		person.name = name;
		       		person.telephone = telephone;
		       		person.email = email;
		       		//console.log(JSON.stringify(person));
		       		$.ajax({
		           		url:"addAddressList",
		           		method:"post",
		           		contentType:"application/json;charset=utf-8",
		           		data:JSON.stringify(person),
		           		dataType:"json",
		           		success:function(data){
		           			if(data.isExist){
		           				new CustomPrompt({
		                            type: 'error',
		                            msg: '该人员已存在！'
		                        });
		           			}else{
		           				if(data.result) {
		                            new CustomPrompt({
		                                type: 'success',
		                                msg: '操作成功！'
		                            });
		                            $('.shade,.delete-wrapper').fadeOut();
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
		       }
		    })
	}else if(add_edit_status == 2){
		$('.newAdd-form').form('submit', {
		       onSubmit:function(){
		    	   if($(this).form('enableValidation').form('validate')){
		       		var person = new Object();
		       		var personId = $("#editAddressListId").val();
		       		person.id = personId;
		       		var addressType = new Object();
		       		var addressTypeId = parseInt($("#addressTypes").val());
		       		addressType.id = addressTypeId;
		       		person.addressType = addressType;
		       		
		       		var name = $("#addName").val();
		       		var telephone = $("#addTel").val();
		       		var email = $("#addEmail").val();
		       		person.name = name;
		       		person.telephone = telephone;
		       		person.email = email;
		       		//console.log(JSON.stringify(person));
		       		$.ajax({
		           		url:"updateAddressList",
		           		method:"post",
		           		contentType:"application/json;charset=utf-8",
		           		data:JSON.stringify(person),
		           		dataType:"json",
		           		success:function(data){
		           			if(data.isExist){
		           				new CustomPrompt({
		                            type: 'error',
		                            msg: '该人员已存在！'
		                        });
		           			}else{
		           				if(data.result) {
		                            new CustomPrompt({
		                                type: 'success',
		                                msg: '操作成功！'
		                            });
		                            $('.shade,.delete-wrapper').fadeOut();
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
		       }
		    })
	}
})

//新建通讯类型提交
newTypeSubmit.addEventListener('click', function () {
  		var addressType = new Object();
  		addressType.name = $("#addAddressTypeName").val();
  		$.ajax({
      		url:"addAddressType",
      		method:"post",
      		contentType:"application/json;charset=utf-8",
      		data:JSON.stringify(addressType),
      		dataType:"json",
      		success:function(data){
      			if(data.isExist){
       				new CustomPrompt({
                        type: 'error',
                        msg: '该名称已存在！'
                    });
       			}else{
       				if(data.result) {
    	                new CustomPrompt({
    	                    type: 'success',
    	                    msg: '操作成功！'
    	                });
    	                $('.shade,.delete-wrapper').fadeOut();
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
})
// 新增关闭
$(".close-popup").click(function () {
    $(".shade").fadeOut();
    $(".newAdd-wrapper").hide();
})

// 隐藏弹出删除框
$(".close-popup-delete").click(function () {
    if (switchShade) {
        $(".newAdd-wrapper-delete").hide();
        switchShade = false;
    } else {
        $(".shade").fadeOut();
        $(".newAdd-wrapper-delete").hide();
    }
})

// 类别关闭
$(".close-popup-edit").click(function () {
    $("#classification-change").hide();
})


function deleteType(addressTypeId){
	
}


//点击搜索框
function search(pageIndex,pageSize){
	var keyword = $("#keyword").val();
	var url = 'getByPage_addressList';
	if($.trim(keyword).length > 0){
		url = 'getByParas_addressList';
	}
	
	$.ajax({
	   	type:"post",
	   	url:url,
	   	data:"keyword="+keyword,
	   	success:function(result){
	   		$('#dg').datagrid("loadData",JSON.parse(result));
	   		$('#dg').datagrid('getPager').pagination({pageNumber:pageIndex});
	   	},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
	   	}
 })
}

function getHostIp(){
	var ip_addr = document.location.hostname;
	console.log(ip_addr)
}
