var changeId = 0;		//更换时id
var changeTypeId = 0; //更换时的类型
var backId ;		//还车时id	
var outId ;			//出车id
var socket ;
var canOut = false;
$(function () {
    /*=========================初始化配置类+变量声明=========================*/
	//初始化websocket
	 initWebSocket();
	
    var clearSuccessWrapper; // 成功弹窗setTimeout
    // 整体tab
    $('#tab').tabs({
        tabWidth: 80,
        tabHeight: 50,
        plain: true,
        // justified: true, // 生成等宽标题
        narrow:true, // 删除选项卡之间的间距
        onSelect: function(title,index){
        	if(index == 0){
    			$('#carOut').datagrid("load")
        	}else{
        		$('#carBack').datagrid("load")
        	}
        }
    });

    // 出车整体table
    $('#carOut').datagrid({
         url: 'getOutList',
        method: 'POST',
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination : true,
        columns: [
            [   {
	                field: 'id',			//出还车记录id
	                hidden: true,
            	},
            	{
	                field: 'sheetTypeId',	//工单类型id
	                hidden: true,
            	},
                {
                    field: 'sheetTypeName',
                    title: '类型',
                    width: 80,
                },
            	{
	                field: 'realCarId',	//车辆id
	                hidden: true,
            	},
            	{
	                field: 'realCarTypeId',	//车辆类型id
	                hidden: true,
            	},
                {
                    field: 'realCarTypeName',
                    title: '车辆类型',
                    width: 80,
                },
                {
                    field: 'realCarNo',
                    title: '车牌号',
                    width: 80,
                },
                {
                    field: 'persons',
                    title: '运维人员',
                    width: 80,
                },
                {
                    field: 'detail',
                    title: '车辆详情',
                    width: 80,
                    align: 'center',
                    formatter: function (value, row , index) {
                        return '<a class="td-detail" onclick="outDetail()">详情</a>';
                    }
                },
                {
                    field: 'workSheetNo',
                    title: '工单编号',
                    width: 100,
                },
                {
                	field: "stateId",		//工单状态id
                	hidden: true
                },
                {
                    field: 'stateName',
                    title: '工单状态',
                    width: 80,
                    align: 'center',
                    formatter: function (value, row , index) {
                    	if(row.stateId == 1 || row.stateId == 0){
                    		return '<a class="td-state-no">'+row.stateName+'</a>';
                    	}else{
                    		return '<a class="td-state-yes">'+row.stateName+'</a>';
                    	}
                    }
                },
                {
                    field: 'createTime',
                    title: '派发时间',
                    width: 150,
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) { //类型为维修、保养的时候只有出车
                    	var res = '<div class="table-operation"><a class="table-carOut" onclick="outOpen('+row.id+')"><i></i>出车</a> ';
                    	if(row.sheetTypeId == 1){
                    		res += '<a class="table-carReplace" onclick="replaceOpen('+ row.realCarTypeId +','+row.id+',\''+row.realCarTypeName+'\')"><i></i>更换车辆</a>';
                    	}
                    	res += '</div>';
                        return  res;
                    }
                }
            ]
        ]
    });

    //还车整体table
    $('#carBack').datagrid({
         url: 'getInList',
        method: 'POST',
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination : true,
        columns: [
            [
            	{
	                field: 'id',			//出还车记录id
	                hidden: true,
            	},
            	{
	                field: 'sheetTypeId',	//工单类型id
	                hidden: true,
            	},
                {
                    field: 'sheetTypeName',
                    title: '类型',
                    width: 80,
                },
            	{
	                field: 'realCarId',	//车辆id
	                hidden: true,
            	},
            	{
	                field: 'realCarTypeId',	//车辆类型id
	                hidden: true,
            	},
                {
                    field: 'realCarTypeName',
                    title: '车辆类型',
                    width: 80,
                },
                {
                    field: 'realCarNo',
                    title: '车牌号',
                    width: 80,
                },
                {
                    field: 'persons',
                    title: '运维人员',
                    width: 80,
                },
                {
                    field: 'detail',
                    title: '车辆详情',
                    width: 80,
                    align: 'center',
                    formatter: function (value, row , index) {
                        return '<a class="td-detail" onclick="backDetail()">详情</a>';
                    }
                },
                {
                    field: 'workSheetNo',
                    title: '工单编号',
                    width: 100,
                },
                {
                	field: "stateId",		//工单状态id
                	hidden: true
                },
                {
                    field: 'stateName',
                    title: '工单状态',
                    width: 80,
                    align: 'center',
                    formatter: function (value, row , index) {
                    	if(row.stateId == 1 || row.stateId == 0){
                    		return '<a class="td-state-no">'+row.stateName+'</a>';
                    	}else{
                    		return '<a class="td-state-yes">'+row.stateName+'</a>';
                    	}
                    }
                },
                {
                    field: 'createTime',
                    title: '派发时间',
                    width: 150,
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) {
                        return '<div class="table-operation"><a class="table-carBack" onclick="backOpen('+row.id+')"><i></i>还车</a> ' +
                            '</div>';
                    }
                }
            ]
        ]
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
    // 关闭成功弹窗(出车+更换车辆)
    $('.popup .btn-close').on('click',function () {
        var $popup = $(this).parents('.popup');
        clearTimeout(clearSuccessWrapper); // 清楚setTimeOut
        $('.shade').hide();
        $popup.hide();
    });

    /*=========================出车弹窗=========================*/

    var $carOutWrapper = $('.carOut-wrapper'); // 出车弹窗
    var carOutSubmit = document.querySelector('.carOut-submit');
    // 出车确认提交
    carOutSubmit.addEventListener('click',function () {
//        $('.carOut-form').form('submit',{
//            onSubmit: function () {
//                var formValue = $(this).form('enableValidation').form('validate');
//                return formValue;
//            },
//            success: function (data) {
//                // new CustomPrompt({
//                //     type: 'success',
//                //     msg: '提交成功'
//                // });
//            	$('.outCode-wrapper .content div').empty();
//            	$('.outCode-wrapper .content div').qrcode({
//            	    render: "canvas", //也可以替换为table
//            	    width: 200,
//            	    height: 200,
//            	    text: "三打白骨精"
//            	});
//                $carOutWrapper.fadeOut();
//                $outCodeWrapper.fadeIn();
//            }
//        });
        
        if($(this).form('enableValidation').form('validate')){
        	$.post("updateOutKm",{"id":outId,"outKm":$("#outKm").val()},function(data){
        		$('.outCode-wrapper .content div').empty();
            	$('.outCode-wrapper .content div').qrcode({
            	    render: "canvas", //也可以替换为table
            	    width: 200,
            	    height: 200,
            	    text: data
            	});
                $carOutWrapper.fadeOut();
                canOut = true;
                $outCodeWrapper.fadeIn();
        	})
        }
    });

    /*=========================出车二维码弹窗=========================*/

    var $outCodeWrapper =  $('.outCode-wrapper'); //出车二维码弹窗
    var $returnICon = $('.outCode-wrapper .return-icon'); // 返回按钮
    $returnICon.on('click',function () {
        $outCodeWrapper.fadeOut();
        $carOutWrapper.fadeIn();
        canOut = false;
    });

    /*=========================出车成功弹窗=========================*/

    var $carOutSuccess = $('.carOut-success'); //出车成功弹窗

    // 弹出成功弹窗（扫描二维码成功之后/这里是模拟事件）
    $('.outCode-wrapper').on('click', 'canvas', function () {
    	console.log(123)
        $outCodeWrapper.fadeOut();
        $carOutSuccess.fadeIn();
        clearSuccessWrapper = setTimeout(clearSuccess,5000);
    });

    // 查看出车信息按钮
    $('.carOut-success .btn-look').on('click',function () {
        alert('跳转页面，查看出车信息')
    });

    /*=========================更换车辆弹窗=========================*/

    var $carReplaceWrapper = $('.carReplace-wrapper'); // 更换车辆弹窗
    var $carNum = $('.car-num'); // 更换车辆弹窗select
    // 更换车辆提交
    var carReplaceSubmit = document.querySelector('.carReplace-submit'); // 更换车辆提交按钮
    carReplaceSubmit.addEventListener('click',function () {
        if($carNum.val() == 0){
            $carNum.focus();
        }else {
        	
        	$.post("updateChangeCar",{"id":changeId,"carId":$("#change-car").val()},function(data){
        		if(data == 1){
        			$('.carReplace-success').fadeIn();
        			$carReplaceWrapper.fadeOut();
        			clearSuccessWrapper = setTimeout(clearSuccess,5000);
        			$('#carOut').datagrid("load");
        		}else{
        			//重新加载可以更换的车辆
        			$.post("getCanUseByType",{"typeId":changeTypeId},function(array){
        				var str = '<option value="0">请选择车牌号</option>';
        				$(array).each(function(i,car){
        					str += '<option value="'+car.id+'">'+car.carNum+'</option>';
        				})
        				$("#change-car").html(str);
        			},"JSON")
                     new CustomPrompt({
                         type: 'default',
                         msg: '车辆已被使用，请重新选择'
                     });
        		}
        	})
        }
    });

    /*=========================还车二维码弹窗=========================*/

    var $backCodeWrapper = $('.backCode-wrapper'); // 还车二维码

    /*=========================还车信息弹窗=========================*/

    var radioState = 1; // 1产生费用 0不产生
    var $carBackWrapper = $('.carBack-wrapper');
    var radioNode = '.carBack-wrapper .content .content-item:nth-of-type(2)>div';
    carBackType('.back-type'); // 调用验证是否选择为油费
    // 调用公用验证radio
    common.commonRadio(radioNode);
    // 验证图片上传
    $carBackWrapper.on('change','input[type=file]',function () {
        validate.checkImg($(this));
    });
    // 单选事件选择'是' 显示费用明细
    $(radioNode).find('input[type=radio]').each(function (index,node) {
        $(node).on('change',function () {
            if(index == 0){
                radioState = 1;
                $('.carBack-wrapper .back-node').show()
                var $inputFile = $('.carBack-wrapper input[type=file]');
                $inputFile.val(''); // 清空新建inputFile
                $inputFile.next().next('span').html('支持.jpg/.png/.JPEG').css('color','#ccc').removeAttr('state');
                $carBackWrapper.find('input[type=text]').not($carBackWrapper.find('.textbox.combo input[type=text]')).val('');
            }else {
                radioState = 0;
                $('.carBack-wrapper .back-node').hide();
            }
        });
    });
    // 弹出信息弹窗（扫描二维码弹出/这里是模拟事件）
    $('.backCode-wrapper img').on('click',function () {
        var $inputFile = $('.carBack-wrapper input[type=file]');
        $inputFile.val(''); // 清空新建inputFile
        $inputFile.next().next('span').html('支持.jpg/.png/.JPEG').css('color','#ccc').removeAttr('state');
        $carBackWrapper.find('input[type=text]').not($carBackWrapper.find('.textbox.combo input[type=text]')).val('');
        $carBackWrapper.find('.oil-input:nth-of-type(2)').remove();
        $carBackWrapper.find('.easyui-validatebox').removeClass('oil-input');
        $('.back-type').val('0'); // 初始化select
        $carBackWrapper.find('.back-cost-del').trigger('click');// 调用删除费用明细
        $backCodeWrapper.fadeOut();
        $carBackWrapper.fadeIn();
        $.post("getCostTypes",function(data){
        	var str = '<option value="0">请选择费用类型</option>';
        	$(data).each(function(i,ct){
        		str += '<option value="'+ct.id+'">'+ct.name+'</option>';
        	})
        	$("#back-type").html(str);
        },"JSON")
    });
    // 返回二维码弹窗
    $('.carBack-wrapper .return-icon').on('click',function () {
        $carBackWrapper.fadeOut();
        $backCodeWrapper.fadeIn();
    });
    // 删除费用明细
    $('.carBack-wrapper').on('click','.back-cost-del',function(){
       $(this).parents('.back-cost').remove();
    });
    // 增加费用明细
    var carBackAdd = document.querySelector('.carBack-add');
    carBackAdd.addEventListener('click',function () {
        var $content = $('.carBack-wrapper .content');
        $.post("getCostTypes",function(data){
        	var nodeCost = '<div class="back-cost">' +
            					'<div class="content-item">' +
            						'<label for="back-title">费用明细</label>' +
            						'<div class="back-cost-del">删除</div>' +
            					'</div>' +
            					'<div class="content-item">' +
            						'<label for="back-type">*类型:</label>' +
            						'<select name="" id="" class="back-type costType">' +
            							'<option value="0">请选择费用类型</option>';
        	$(data).each(function(i,ct){
        		nodeCost			 += '<option value="'+ct.id+'">'+ct.name+'</option>';
        	})
        	nodeCost += 			'</select>' +
        						'</div>' +
        						'<div class="content-item"><label for="back-cost">*金额:</label><input class="easyui-validatebox money" type="text" data-options="required:true,validType:\'intOrFloat\'" placeholder="请输入金额" maxlength="12" />\n</div>'+
        				        '<div class="content-item"><label for="station-picture">*发票照片:</label><div class="inputFile carBack-picture"><input type="file" name="files"><span>上传</span><span>支持.jpg/.png/.JPEG</span></div></div>'+
        				        '</div>';
        	$(carBackAdd).before(nodeCost);
            $.parser.parse($('.carBack-form')); // 从新调用验证
            $content.animate({
                scrollTop: $content.scrollTop() + 180 + 'px'
            },500)
        },"JSON")
    });
    // 还车信息提交
    var carBackSummit = document.querySelector('.carBack-submit');
    carBackSummit.addEventListener('click',function () {
    	var boo = false;
    	if(radioState == 0){ // 不产生费用
            var formValue = $('.carBack-form').find('.content-item:nth-of-type(1)').form('enableValidation').form('validate');
            boo = formValue
//            return formValue;
        }else { //产生费用
            var formValue = $('.carBack-form').form('enableValidation').form('validate');
            var inputFileAttr = $('.carBack-form').find('input[type=file]').next().next('span').attr('state'); // 验证文件选择是否错误
            var inputFile = 0;
            var backType; // 是否选了费用类型
            $('.carBack-form').find('input[type=file]').each(function (index,node) {  //验证是否每个费用明细都上传了文件
                if(this.files.length != 0){
                    inputFile++;
                }else {
                    $(this).next().next('span').html('请选择文件！！').css('color','#ff642e');
                }
            });
             $('.back-type').each(function (index,node) {
                if(node.value != 0){
                    backType = true;
                }else {
                    backType = false;
                    $(node).focus();
//                    return false;
                }
             });

            boo = (formValue) && (inputFileAttr != 'errFile') && (inputFile==$('.carBack-form').find('input[type=file]').length && backType);
//            return (formValue) && (inputFileAttr != 'errFile') && (inputFile==$('.carBack-form').find('input[type=file]').length && backType);
        }
    	console.log(boo)
    	if(boo){
    		
            var formData = new FormData();
            formData.append("cid", backId);
            formData.append("nowkm", $("#intKm").val());
            if(radioState != 0){ // 产生费用
            	var array = new Array();
            	var $nodeList = $('.back-cost');
            	for(var i=0; i<$nodeList.length; i++){
            		var obj = new Object();
            		obj.costType = $nodeList.eq(i).find('.costType').val();
            		obj.money = $nodeList.eq(i).find('.money').val();
            		obj.oil = $nodeList.eq(i).find('.oil-input').val();
            		formData.append("files", $nodeList.eq(i).find('input[type=file]')[0].files[0]);   
            		array.push(obj);
            	}
            	formData.append("costRecords", JSON.stringify(array));
            }
             $.ajax({
             	url:"updateBackCar",  
 	     		type:"POST",  
 	     		data: formData,
 	     		cache: false,
 	     		processData: false,
 	     		contentType: false,
 	     		success:function(data) {  
 	     			$('#carBack').datagrid("load");
 	     			$carBackWrapper.fadeOut();
 	     			if(data == 1){
	 	                 $carBackSuccess.fadeIn();
	 	                 clearSuccessWrapper = setTimeout(clearSuccess,5000);
 	     			}else{
 	 	                  new CustomPrompt({
 	 	                      type: 'default',
 	 	                      msg: '已还车！'
 	 	                  });
 	     			}
 	     		}
 	        })
    	}
//        $('.carBack-form').form('submit',{
//            onSubmit: function () {
//                
//
//            },
//            success: function (data) {
//                // new CustomPrompt({
//                //     type: 'success',
//                //     msg: '提交成功'
//                // });
//                $carBackWrapper.fadeOut();
//                $carBackSuccess.fadeIn();
//                clearSuccessWrapper = setTimeout(clearSuccess,5000);
//            }
//        })
    });

    /*=========================还车成功弹窗=========================*/

    var $carBackSuccess = $('.carBack-success') // 还车成功弹窗
    $('.carBack-success .btn-look').on('click',function () {
        alert('跳转页面，查看还车信息')
    });

    /*=========================其它=========================*/

});

/*=========================其它方法=========================*/

// 关闭成功弹窗
function clearSuccess() {
    $('.shade').hide();
    $('.success-wrapper').hide()
}

// 费用类型为邮费时（value：1） 增加一个input框
function carBackType(node) {
    $('.back-node').on('change',node,function () {
        var $content = $(this).parents('.content-item');
        var inputNode = '<input class="easyui-validatebox oil-input" type="text" data-options="required:true,validType:\'intOrFloat\'" placeholder="请输入加多少升" maxlength="6" />';
        if(this.value == 1){
            $content.next('.content-item').find('.easyui-validatebox').after(inputNode);
            $content.next('.content-item').find('.easyui-validatebox').addClass('oil-input');
            $.parser.parse($('.carBack-form')); // 从新调用验证
        }else {
            $content.next('.content-item').find('.easyui-validatebox').removeClass('oil-input');
            $content.next('.content-item').find('.easyui-validatebox:nth-of-type(2)').remove();
        }
    })
}
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

// 出车详情
function outDetail() {
    alert('跳转到车辆信息详情')
}

// 还车详情
function backDetail() {
    alert('跳转到车辆信息详情')
}

// 出车弹窗
function outOpen(id) {
	outId = id;
	$.post("getNowKm",{"id":id},function(data){
		$("#outKm").val(data);
	})
    $('.shade').fadeIn();
    $('.carOut-wrapper').fadeIn();
}

// 更换车辆弹窗
function replaceOpen(realCarTypeId,id,carTypeName) {
	changeId = id;
	changeTypeId = realCarTypeId;
	$(".carReplace-form span").html(carTypeName);
	$.post("getCanUseByType",{"typeId":realCarTypeId},function(array){
		var str = '<option value="0">请选择车牌号</option>';
		$(array).each(function(i,car){
			str += '<option value="'+car.id+'">'+car.carNum+'</option>';
		})
		$("#change-car").html(str);
		$('.shade').fadeIn();
		$('.carReplace-wrapper').fadeIn();
	},"JSON")
}

// 还车弹窗
function backOpen(id) {
	backId = id;
    $('.shade').fadeIn();
    $('.backCode-wrapper').fadeIn();
}
function initWebSocket(){
	//创建socket对象
	socket = new WebSocket("ws://"+ window.location.host+basePath()+"/carOut.do");
	//连接创建后调用
	socket.onopen = function() {
		//console.log("started")
	};
	
	//接收到服务器消息后调用
	socket.onmessage = function(message) {
		console.log(message.data);
		var data = JSON.parse(message.data);
		if(data.type == "outCar" && outId !=0 && outId == data.id && canOut){		//出车
			$.post("updateOutCar",{"id":outId},function(data){
				if(data == 1){
					$('#carOut').datagrid("load");
					$('.outCode-wrapper').fadeOut();
					$('.carOut-success').fadeIn();
					var clearSuccessWrapper = setTimeout(clearSuccess,5000);
				}
			})
		}
		if(data.type == "inCar" && backId !=0 && backId == data.id){	//还车
			$('.backCode-wrapper').fadeOut();
			$('.carBack-wrapper').fadeIn();
		}
	};
	//关闭连接的时候调用
	socket.onclose = function(e){
	};
	//出错时调用
	socket.onerror = function(e) {
	};
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
  var basePath=localhostPath+projectName;
  return projectName;
}