$(function () {
    /*=========================初始化配置类+变量声明=========================*/
	$.ajax({
		type:"post",
		url:"getAllCarTypeAndCaretaker",
		dataType:"json",
		success:function(data){
			if(null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
			var carTypes = data.carTypes;
			$("#topCarType").empty();
			var content = "<option value='0'>请选择车辆类型</option>";
			if(carTypes.length > 0){
				for(var i=0; i<carTypes.length; i++){
					content += "<option value="+carTypes[i].id+">"+carTypes[i].name+"</option>"
				}
			}
			$("#topCarType").append(content);
			
			var caretakers = data.caretakers;
			$("#topCaretaker").empty();
			var content1 = "<option value='0'>请选择责任人</option>";
			if(caretakers.length > 0){
				for(var i=0; i<caretakers.length; i++){
					content1 += "<option value="+caretakers[i].id+">"+caretakers[i].name+"</option>"
				}
			}
			$("#topCaretaker").append(content1);
			
			var carStates = data.carStates;
			$("#topCarState").empty();
			var content2 = "<option value='0'>请选择车辆状态</option>";
			if(carStates.length > 0){
				for(var i=0; i<carStates.length; i++){
					content2 += "<option value="+carStates[i].id+">"+carStates[i].name+"</option>"
				}
			}
			$("#topCarState").append(content2);
		}
	});

    // 点击搜索
   $(".search-btn").on("click",function(){
	   $("#dg").datagrid({
			url:"getAllCarByPager",
	    	queryParams:{
	    		carTypeId:$("#topCarType").val(),
	    		personId:$("#topCaretaker").val(),
	    		carStateId:$("#topCarState").val(),
	    		keyword:$("#keyword").val()
	    	}
		});
   });

    // 整体table
    $('#dg').datagrid({
    	url:"getAllCarByPager",
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
                    field: 'type',
                    title: '车辆类型',
                    width: 100,
                },
                {
                    field: 'brand',
                    title: '品牌',
                    width: 80,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'model',
                    title: '型号',
                    width: 100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'carNum',
                    title: '车牌号',
                    width: 80,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'picture',
                    title: '车辆照片',
                    width: 80,
                    align: 'center',
                    formatter: function (value, rec) {
                    	if(typeof value == "undefined"){
                    		return "无照片";
                    	}else{
                    		return "<a class='td-picture'><i></i>照片" +
                    		"<div><img src="+basePath()+value+" alt=''></div></a>";
                    	}
                    }
                },
                {
                    field: 'driveCard',
                    title: '行驶证',
                    width: 80,
                    align: 'center',
                    formatter: function (value, rec) {
                    	if(typeof value == "undefined"){
                    		return "无行驶证";
                    	}else{
                    		return "<a class='td-driveCard'><i></i>行驶证" +
                    		"<div><img src="+basePath()+value+" alt=''></div></a>";
                    	}
                    }
                },
                {
                    field: 'seat',
                    title: '坐席(核载)',
                    width: 80,
                },
                {
                    field: 'people',
                    title: '责任人',
                    width: 100,
                },
                {
                    field: 'firstKm',
                    title: '首保公里数km',
                    width: 100,
                },
                {
                    field: 'initKm',
                    title: '初始公里数km',
                    width: 100,
                },
                {
                    field: 'afterKm',
                    title: '后期保养周期km',
                    width: 120,
                },
                {
                    field: 'state',
                    title: '状态',
                    width: 80,
                    align: 'center',
                    formatter: function (value, rec) {
                    	if(value <= 2){
                    		return '<a class="td-normal">'+rec.stateName+'</a>';
                    	}else{
                    		return '<a class="td-fault">'+rec.stateName+'</a>';  // 报废为<a class="td-fault">报废</a>
                    	}
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 100,
                    formatter: function (value, rec) {
                        return '<div class="table-operation"><a class="table-edit"" onclick=editOpen('+rec.id+')><i></i>编辑</a> ' +
                            '<a class="table-delete" onclick=deleteOpen('+rec.id+')><i></i>删除</a>' +
                            '</div>';
                    }
                }
            ]
        ],
        onLoadSuccess:function(data){
        	if(null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
        	if(data.total == 0){
        		 $(this).datagrid('appendRow', { type: '<div style="text-align:center;color:red">没有相关记录！</div>' }).datagrid('mergeCells', { index: 0, field: 'type', colspan: 13 })
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

    /*=========================各项单独验证=========================*/

    // 验证图片上传
    $('.inputFile input[type=file]').on('change',function () {
        validate.checkImg($(this));
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
        	url:"deleteCar",
        	data:"carId="+cid,
        	dataType:"json",
        	success:function(data){
        		if(null != data[0] && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
         		}
        		if(data == 1){
        			$('.shade').fadeOut();
        	        $('.delete-wrapper').fadeOut();
    		        new CustomPrompt({
    	                type: 'success',
    	                msg: '删除成功'
    	            });
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
    var $carType = $('.car-type-comboTree'); // 新建车辆类型comboTree
    var $carPeople = $('.car-people-comboTree'); // 新建车辆责任人comboTree
    // 新建弹窗
    $('.new-btn').on('click', function () {
    	$.ajax({
			type:"post",
			url:"addTest",
			dataType:"json",
			success:function(data){
				if(null != data[0] && data[0].invalidate){
					window.parent.location.href = data[0].loginPage;
	     		}
				if(null != data[0] && data[0].noOpt){
         			new CustomPrompt({
                        type: 'error',
                        msg: '您无权操作！'
                    });
         		}else{
         			var $inputFile = $('.newAdd-wrapper input[type=file]');
         			$inputFile.val(''); // 清空新建inputFile
         			$inputFile.next().next('span').html('支持.jpg/.png/.JPEG').css('color','#ccc').removeAttr('state');
         			$('.shade, .newAdd-wrapper').fadeIn();
         			$newPopup.find('input[type=text]').not($newPopup.find('.textbox.combo input[type=text]')).val('');
         			//查询车辆类型和责任人下拉框
         			$.ajax({
         				type:"post",
         				url:"getAllCarTypeAndCaretaker",
         				dataType:"json",
         				success:function(data){
         					var carTypes = data.carTypes;
         					$("#carType").empty();
         					var content = "<option value='0'>请选择车辆类型</option>";
         					if(carTypes.length > 0){
         						for(var i=0; i<carTypes.length; i++){
         							content += "<option value="+carTypes[i].id+">"+carTypes[i].name+"</option>"
         						}
         					}
         					$("#carType").append(content);
         					
         					var caretakers = data.caretakers;
         					$("#caretaker").empty();
         					var content1 = "<option value='0'>请选择责任人</option>";
         					if(caretakers.length > 0){
         						for(var i=0; i<caretakers.length; i++){
         							content1 += "<option value="+caretakers[i].id+">"+caretakers[i].name+"</option>"
         						}
         					}
         					$("#caretaker").append(content1);
         				}
         			});
         		}
			}
    	});
    });
    // 新建弹窗提交
    var newAddSubmit = document.querySelector('.newAdd-submit');
    newAddSubmit.addEventListener('click',function () {
        $('.newAdd-form').form('submit', {
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                var inputFileAttr = $(this).find('input[type=file]').next().next('span').attr('state');
                return (formValue) && (inputFileAttr!='errFile')
            },
            success: function (data) {
            	if(null != data[0] && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
         		}
            	if(data > 0){
            		new CustomPrompt({
            			type: 'success',
            			msg: '添加成功'
            		});
            		$('.shade, .newAdd-wrapper').fadeOut();
            		$("#dg").datagrid("reload");
            	}else if(data == -1){
            		new CustomPrompt({
            			type: 'error',
            			msg: '车牌号已存在'
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

    // 编辑弹窗提交
    var editSubmit = document.querySelector('.edit-submit');
    editSubmit.addEventListener('click',function () {
        $('.edit-form').form('submit', {
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                var inputFileAttr = $(this).find('input[type=file]').next().next('span').attr('state');
                return (formValue) && (inputFileAttr!='errFile')
            },
            success: function (data) {
            	if(null != data[0] && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
         		}
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
            			msg: '车牌号已存在'
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
    
});

/*=========================其它方法=========================*/
// 其它类型验证方法
var validate = {
    checkImg: function (node) {
        var thisNode = $(node)[0];
        var $inputText = $(node).next().next('span');
        var imgArr = new Array();
        var length = thisNode.files.length;
        if(length != 0){ //选择了文件
            for (var i = 0; i < length; i++) {
                var imgName = thisNode.files[i].name;
                console.log(imgName.indexOf("png"));
                if(imgName.indexOf('jpg') != -1 || imgName.indexOf("png") != -1 || imgName.indexOf("JPEG") != -1){
                    imgArr.push(imgName);
                }else { // 选择错误的文件
                    $inputText.html('文件选择错误！！').css('color','#ff642e').attr('state','errFile');
                }
            }
            if(length == imgArr.length){
                $inputText.html(imgArr.toString()).css('color','#dcdcdc').removeAttr('state');
            }
        }else{
            $inputText.html('支持.jpg/.png/.JPEG').css('color','#dcdcdc').removeAttr('state');
        }
    }
};

// 打开编辑弹窗
var cid;
function editOpen(id) {
	$.ajax({
		type:"post",
		url:"updateTest",
		dataType:"json",
		success:function(data){
			if(null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
			if(null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			cid = id;
     			$('.shade, .edit-wrapper').fadeIn();
     			$.ajax({
     				type:"post",
     				url:"getCarById",
     				data:"carId="+id,
     				dataType:"json",
     				success:function(data){
     					console.log(data);
     					if(null != data[0] && data[0].invalidate){
     						window.parent.location.href = data[0].loginPage;
     		     		}
     					$("#carId").val(cid);
     					$("#ebrand").val(data.brand);
     					$("#emodel").val(data.model);
     					$("#ecarNo").val(data.carNo);
     					$("#eseat").val(data.seat);
     					$("#efirstInsurance").val(data.firstInsurance);
     					$("#einitKmNum").val(data.initKmNum);
     					$("#emaintainCycle").val(data.maintainCycle);
     					var pic = "";
     					var licencePic = "";
     					if(data.carPic != ""){
     						pic = "<i></i>原照片<div><img src="+basePath()+data.carPic+" alt='加载失败'></div>"
     					}else{
     						pic = "无照片"
     					}
     					if(data.licencePic != ""){
     						licencePic = "<i></i>原行驶证<div><img src="+basePath()+data.licencePic+" alt='加载失败'></div>"
     					}else{
     						licencePic = "无行驶证"
     					}
     					$(".edit-picture").html(pic);
     					$(".edit-driveCard").html(licencePic)
     					
     					var carTypes = data.carTypes;
     					$("#ecarType").empty();
     					var content = "<option value='0'>请选择车辆类型</option>";
     					if(carTypes.length > 0){
     						for(var i=0; i<carTypes.length; i++){
     							if(carTypes[i].id == data.carTypeId){
     								content += "<option value="+carTypes[i].id+" selected>"+carTypes[i].name+"</option>"
     							}else{
     								content += "<option value="+carTypes[i].id+">"+carTypes[i].name+"</option>"
     							}
     						}
     					}
     					$("#ecarType").append(content);
     					
     					var caretakers = data.caretakers;
     					$("#eperson").empty();
     					var content1 = "<option value='0'>请选择责任人</option>";
     					if(caretakers.length > 0){
     						for(var i=0; i<caretakers.length; i++){
     							if(caretakers[i].id == data.personId){
     								content1 += "<option value="+caretakers[i].id+" selected>"+caretakers[i].name+"</option>"
     							}else{
     								content1 += "<option value="+caretakers[i].id+">"+caretakers[i].name+"</option>"
     							}
     						}
     					}
     					$("#eperson").append(content1);
     					
     					var carStates = data.carStates;
     					$("#ecarState").empty();
     					var content2 = "<option value='0'>请选择车辆状态</option>";
     					if(carStates.length > 0){
     						for(var i=0; i<carStates.length; i++){
     							if(carStates[i].id == data.carStateId){
     								content2 += "<option value="+carStates[i].id+" selected>"+carStates[i].name+"</option>"
     							}else{
     								content2 += "<option value="+carStates[i].id+">"+carStates[i].name+"</option>"
     							}
     						}
     					}
     					$("#ecarState").append(content2);
     				}
     			});
     		}
		}
	});
}
//打开删除弹窗
function deleteOpen(id){
	$.ajax({
		type:"post",
		url:"deleteTest",
		dataType:"json",
		success:function(data){
			if(null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
			if(null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			cid = id;
     			$('.delete-wrapper, .shade').fadeIn();
     		}
		}
	});
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