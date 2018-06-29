
var outId = 0;			//内修id
var deleteId = 0;
var bdId = 0;
var blrepairId = 0;		//补领id
var blpersonId = 0;
var bloutId = 0;		//补领可以出库的id
$(function () {
	
    /*=========================初始化配置类+变量声明=========================*/
	initWebSocket();
    // 整体table
    $('#dg').datagrid({
        fit: true,
        url: "getByPager",
        queryParams: {"deportId":$("#deportId").val()},
        method:"post",
        fitColumns: true,
        rownumbers: true, 	// 显示行号列
        singleSelect: true, // 允许选择一行
        scrollbarSize: 6,
        pagination : true,
        columns: [
            [	{
	            	field: 'id',		
	            	hidden: true
            	},
            	{
	            	field: 'typeId',		//1 内修 2 外修 3 返厂
	            	hidden: true
            	},
            	{
            		field: 'personId',		//维修人员id
            		hidden: true
            	},
            	{
            		field: 'stateId',		//状态id 1 : 待出库 2：维修中 3：已处理 4：已回库
            		hidden: true
            	},
                {
                    field: 'typeName',
                    title: '工单类型',
                    width: 100,
                },
                {
                    field: 'sno',
                    title: '工单编号',
                    width: 100,
                },
                {
                    field: 'personName',
                    title: '机修人员',
                    width: 100,
                },
                {
                    field: 'stateName',
                    title: '工单状态',
                    width: 100,
                    align: 'center',
                    formatter: function (value,row,index) {
                    	if(value!=undefined){
                    		if(row.stateId<3){
                    			return '<a class="td-handle-no">'+row.stateName+'</a>';
                    		}
                    		return '<a class="td-handle-yes">'+row.stateName+'</a>' // <a class="td-handle-no">未处理</a>
                    	}
                    },
                },
                {
                    field: 'createTime',
                    title: '派发时间',
                    width: 150,
                },
                {
                	field: 'voucher',
                    title: '凭证单号',
                    width: 100,
                },
                {
                    field: 'E',
                    title: '清单',
                    width: 100,
                    align: 'center',
                    formatter:function (value,row,index) {
                    	if(value!=undefined){
                    		return '<a class="td-detail" onclick="detailOpen('+row.id+')">详情</a>'
                    	}
                    }
                },
                {
                    field: 'F',
                    title: '操作',
                    width: 100,
                    align: 'center',
                    formatter:function (value,row,index) { //每种拼一个 具体看原形
                    	if(row.stateId == 1){
                    		if(row.typeId == 1){
                    			return '<a class="td-out" onclick="outCodeOpen('+row.id+','+row.personId+')">出库</a>';
                    		}else{
                    			return '<a class="td-out" onclick="outOpen('+row.id+')">出库</a>';
                    		}
                    	}else if(row.stateId == 2){
                    		return '<a class="td-out" onclick="replacementOpen('+row.id+','+row.personId+')">补领</a>';
                    	}else if(row.stateId == 3){
                    		return '<a class="td-out" onclick="backOpen('+row.id+')">回库</a>';
                    	}
                    }
                },
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

    /*=========================弹窗=========================*/

    // 关闭弹窗
    $('.popup').on('click', '.close-icon',function () {
    	outId = 0;
        var $popup = $(this).parents('.popup');
        $('.shade').fadeOut();
        $popup.fadeOut();
    });

    /*=========================删除弹窗=========================*/

    var deleteConfirm = document.querySelector('.delete-confirm');
    var inforCancel = document.querySelector('.infor-cancel');
//    $('.replacement-wrapper').on('click','.replacement-del',function () {
//        $('.delete-wrapper, .shade').fadeIn();
//        $('.shade').css('z-index','9999');
//    });
    // 确认删除
    deleteConfirm.addEventListener('click',function () {
    	$.post("deleteMoreById",{"id":deleteId},function(data){
    		$('#replacement-table').datagrid("reload");
    		if(data == 1){
       		 	new CustomPrompt({
                    type: 'success',
                    msg: '删除成功'
                });
       		}else{
       			new CustomPrompt({
                    type: 'defalut',
                    msg: '数据异常，补领项不存在！'
                });
       		}
    	})
        $('.delete-wrapper').fadeOut();
        $('.shade').css('z-index','9997');
    });
    // 取消弹窗
    inforCancel.addEventListener('click',function () {
        $(this).parents('.infor-wrapper').fadeOut();
        $('.shade').css('z-index','9997');
    });

    /*=========================外修出库弹窗=========================*/

    var outSubmit = document.querySelector('.out-submit'); // 外修出库提交
    outSubmit.addEventListener('click',function () {
        $('.out-form').form('submit',{
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                return formValue
            },
            success: function (data) {
            	$('.depotOut-success').fadeIn();
            	$('.out-wrapper').fadeOut();
            	$('#dg').datagrid("reload")
            	if(data == 1){
           		 	new CustomPrompt({
                        type: 'success',
                        msg: '出库成功'
                    });
           		}else{
           			new CustomPrompt({
                        type: 'defalut',
                        msg: '已被他人出库'
                    });
           		}
            }
        });
    });

    /*=========================出库二维码弹窗=========================*/

    var $icon = $('.outCode-wrapper .close-popup i'); //弹窗右上角按钮
    // 弹出出库成功弹窗
    $('.outCode-wrapper img').on('click',function(){
        $icon.removeClass('return-icon').addClass('close-icon'); // 变为关闭按钮
        $('.depotOut-success').fadeIn();
        $('.outCode-wrapper').fadeOut();
    });
    // 返回补领弹窗
    $('.outCode-wrapper').on('click','.return-icon',function () {
        $('.outCode-wrapper').fadeOut();
        $replacementPopup.fadeIn();
    });

    /*=========================出库成功弹窗=========================*/

    var btnClose = document.querySelector('.btn-close'); // 关闭
    var btnLook = document.querySelector('.btn-look'); // 查看出库信息
    btnClose.addEventListener('click',function () {
        $('.shade, .depotOut-success').fadeOut();
    });
    btnLook.addEventListener('click',function () {
        alert('跳转到历史记录故障维修信息');
    });

    /*=========================补领弹窗+添加物资=========================*/

    var $replacementPopup = $('.replacement-wrapper');
    var replacementAdd = document.querySelector('.replacement-add'); // 补领添加物资
    var replacementSubmit = document.querySelector('.replacement-submit'); // 补领提交
    var addSubmit = document.querySelector('.add-submit'); // 添加物资提交
    // 打开添加物资弹窗
    replacementAdd.addEventListener('click',function () {
    	$.post("getObjAndSuppliers",{"id":blrepairId},function(data){
    		console.log(data)
    		var str = '<option value="0">请选择任务对象</option>';
    		var str2 = '<option value="0">请选择供应商</option>';
    		$(data.objs).each(function(index,ob){
    			str += '<option value="'+ob.id+'">'+ob.name+'</option>';
    		})
    		$(data.supplies).each(function(index,ob){
    			str2 += '<option value="'+ob.id+'">'+ob.name+'</option>';
    		})
    		$("#rep-obj").html(str);
    		$("#rep-supp").html(str2);
    		
    		$replacementPopup.fadeOut();
    		$('.add-wrapper').fadeIn().find('select').val('0');
    	},"json")
    });
    $('.add-wrapper .return-icon').on('click',function () {
        $('.add-wrapper').fadeOut();
        $replacementPopup.fadeIn();
    });
    // 提交
    replacementSubmit.addEventListener('click',function () {
    	var dgd = $('#replacement-table').datagrid('getData');
    	if(dgd.rows.length <1){
    		new CustomPrompt({
                type: 'default',
                msg: '没有补领项！'
            });
    		return ;
    	}
    	$.post("checkRepairMoreOut",{"id":blrepairId},function(data){
    		if(data == 1){
    			bloutId = blrepairId;
    			$('.outCode-wrapper .content div').empty();
    			$('.outCode-wrapper .content div').qrcode({
    			    render: "canvas", //也可以替换为table
    			    width: 200,
    			    height: 200,
    			    text: '{"id":"'+blrepairId+'","personId":"'+blpersonId+'","type":"2"}',	//type 2 补领
    			});
    			$icon.removeClass('close-icon').addClass('return-icon'); // 变为返回按钮
    			$replacementPopup.fadeOut();
    			$('.outCode-wrapper').fadeIn();
    		}else{
    			bloutId = 0;
    			new CustomPrompt({
                    type: 'default',
                    msg: '存在没有备货扫描的物资！'
                });
    		}
    	})
    });
    // 添加物资提交
    addSubmit.addEventListener('click',function () {
        $('.add-form').form('submit',{
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                return formValue
            },
            success: function (data) {
            	 $('#replacement-table').datagrid("reload");
                new CustomPrompt({
                    type: 'success',
                    msg: '添加成功'
                });
                $('.add-wrapper').fadeOut();
                $replacementPopup.fadeIn();
            }
        })
    });

    /*=========================回库弹窗=========================*/

    var backSubmit = document.querySelector('.back-submit'); // 回库提交
    
    $('.back-wrapper').on('blur','.backmoney',function(){
    	var money = 0;
		$('.backmoney').each(function(index,node){
			var thisvalue = node.value;
			if(/^[1-9]+(.[0-9]{1,2})?$/.test(thisvalue)){
				var money1 = parseFloat(thisvalue)
				money = money + money1
	
			}
		})
//		if(money)
		$('#total-money').html(money.toFixed(2))
	});
    
    backSubmit.addEventListener('click',function () {
    	$('.backmoney').each(function(index,node){
    		if(node.value == ''){
    			$(node).focus()
    			return false;
    		}
    	});

    	 $('#back-form').form('submit', {
             onSubmit: function () {
                 var formValue = $(this).form('enableValidation').form('validate');
                 return formValue
             },
             success: function (data) {
            	 $('.back-wrapper').fadeOut();
            	 $('.depotOut-success').fadeIn();
            	 $('#dg').datagrid("reload");
            	 if(data == 1){
            		 new CustomPrompt({
                         type: 'success',
                         msg: '回库成功'
                     });
            	 }else{
            		 new CustomPrompt({
                         type: 'defalut',
                         msg: '已被他人回库'
                     });
            	 }
             }
         });
    });
    // 回库提交

    /*=========================补领扫码弹窗=========================*/

    var $scanInput = $('.replacement-scan-wrapper .content input[type=text]');
    // 返回补领弹窗
    $('.replacement-scan-wrapper .return-icon').on('click',function () {
        $replacementPopup.fadeIn();
        $('.replacement-scan-wrapper').fadeOut();
    });
    // input回车事件
    $scanInput.on('keypress',function (event) {
        if(event.keyCode == 13){
            if($scanInput.val() != ''){
            	$.post("updateBinding",{"id":bdId,"qrcode":$("#binding").val()},function(data){
            		$('#replacement-table').datagrid("reload")
            		if(data == 1){			//绑定成功
            			new CustomPrompt({type: 'defalut',msg: '绑定成功'});
            		}else if(data == -1){	//已经其他工单预备
            			new CustomPrompt({type: 'defalut',msg: '已经其他工单预备'});
            		}else if(data == 0){	//二维码不正确
            			new CustomPrompt({type: 'defalut',msg: '二维码不正确'});
            		}
            	},"json")
                $replacementPopup.fadeIn();
                $('.replacement-scan-wrapper').fadeOut();
            }else {
                new CustomPrompt({
                    type: 'default',
                    msg: '请输入二维码!'
                });
            }
        }
    })
    
    
    $("#rep-type,#rep-supp").change(function(data){
    	var typeId = $("#rep-type").val();
    	var supplyId = $("#rep-supp").val();
    	$.post("getTempByTypeAndSupply",{"typeId":typeId,"supplyId":supplyId},function(data){
    		console.log(data)
    		var str = '<option value="0">请选择物资模板</option>';
    		$(data).each(function(index,jo){
    			str += '<option value="'+jo.id+'">'+jo.name+'</option>';
    		})
    		$("#rep-temp").html(str)
    	},"json")
    })
    
});

/*=========================其它方法=========================*/

// 清单详情
function detailOpen(id) {
    $('.shade, .detail-wrapper').fadeIn();
    $('#detail-table').datagrid({
        fit: true,
        url: "getTasksByRepairId",
        queryParams: {"id":id},
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        scrollbarSize: 6,
        columns: [
            [
            	{
            		field: 'id',
            		hidden: true
            	},
                {
                    field: 'typeName',
                    title: '类型',
                    width: 100,
                },
                {
                    field: 'tempName',
                    title: '模板名称',
                    width: 100,
                },
                {
                    field: 'tempBrand',
                    title: '品牌',
                    width: 100,
                },
                {
                    field: 'tempSpec',
                    title: '规格型号',
                    width: 150,
                },
                {
                	field: 'tempSupply',
                	title: '供应商',
                	width: 150,
                },
                {
                    field: 'qrcodeUrl',
                    title: '二维码',
                    width: 100,
                    align: 'center',
                    formatter: function (val,rec) {
                        return  '<a class="detail-picture"><i></i><div><img src="../images/twoCode.png" alt=""></div></a>'
                    }
                },
                {
                    field: 'qrcode',
                    title: '二维码编号',
                    width: 150,
                },
                {
                    field: 'name',
                    title: '名称',
                    width: 100,
                },
                {
            		field: 'stateId',
            		hidden: true
            	},
                {
                    field: 'stateName',
                    title: '状态',
                    width: 100,
                    align: 'center',
                    formatter: function (value,row,index) {
                        return '<a class="detail-repair">'+row.stateName+'</a>'
                    }
                },
            ]
        ]
    });
}

// 弹出外修出库(外修出库时调用这个函数)
function outOpen(id) {
	$("#outRepairId").val(id)
    $('.shade, .out-wrapper').fadeIn();
}

// 弹出出库二维码
function outCodeOpen(id,personId) {
	outId = id;
	$('.outCode-wrapper .content div').empty();
	$('.outCode-wrapper .content div').qrcode({
	    render: "canvas", //也可以替换为table
	    width: 200,
	    height: 200,
	    text: '{"id":"'+id+'","personId":"'+personId+'"}', //"type":"1" 出库
	});
    $('.shade, .outCode-wrapper').fadeIn();
}
// 弹出补领弹窗
function replacementOpen(id,personId) {
	blrepairId = id;
	blpersonId = personId;
    $('.shade, .replacement-wrapper').fadeIn();
    $('#replacement-table').datagrid({
        fit: true,
        // fitColumns: true,
        url:"getHasMoreDetail",
        queryParams: {"id":id},
        method:"post",
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        scrollbarSize: 6,
        columns: [
            [	{
	        		field: 'id',
	        		hidden: true
        		},
        		{
	        		field: 'rpid',
	        		hidden: true
        		},
                {
                    field: 'repairType',
                    title: '任务类型',
                    width: 100,
                },
                {
                    field: 'repairObj',
                    title: '任务对象',
                    width: 100,
                },
                {
                    field: 'typeName',
                    title: '所需物资类型',
                    width: 150,
                },
                {
                    field: 'tempName',
                    title: '模板名称',
                    width: 100,
                },
                {
                    field: 'tempBrand',
                    title: '品牌',
                    width: 100,
                },
                {
                    field: 'tempSpec',
                    title: '规格型号',
                    width: 150,
                },
                {
                	field: 'tempSupply',
                	title: '供应商',
                	width: 150,
                },
                {
                    field: 'F',
                    title: '二维码',
                    width: 80,
                    align: 'center',
                    formatter: function (value,row,index) { // 没扫描没有二维码图片
                        return  '<a class="replacement-picture" ><i></i><div><img src="../images/twoCode.png" alt=""></div></a>'
                    }
                },
                {
                    field: 'qrcode',
                    title: '二维码编号',
                    width: 150,
                },
                {
                    field: 'name',
                    title: '名称',
                    width: 100,
                },
                {
                    field: 'K',
                    title: '操作',
                    width: 150,
                    align: 'center',
                    formatter: function (value,row,index) {
                    	var str = '';
                    	if(row.stateId == 1){
                    		str = '<a class="replacement-scan" onclick="replacementScanOpen('+row.rpid+')">扫描</a><a class="replacement-del" onclick="replacementDel('+row.rpid+')">删除</a>';
                    	}else if(row.stateId == 2){
                    		str = '<a class="replacement-scan" onclick="replacementScanOpen('+row.rpid+')">重新扫描</a><a class="replacement-del" onclick="replacementDel('+row.rpid+')">删除</a>'; // 没有扫描过的为<a class="replacement-scan">扫描</a>
                    	}
                    	return str;
                    }
                },
            ]
        ]
    });
}

function replacementDel(id){
	deleteId = id;
	var deleteConfirm = document.querySelector('.delete-confirm');
    var inforCancel = document.querySelector('.infor-cancel');
    $('.delete-wrapper, .shade').fadeIn();
    $('.shade').css('z-index','9999');
}

var isReplacementScan = false; // 判断补领扫码框是否存在
// 弹出补领扫码弹窗
function replacementScanOpen(id) {
	bdId = id;
    $('.replacement-scan-wrapper').fadeIn().find('input[type=text]').val('').focus();
    $('.replacement-wrapper').fadeOut();
    isReplacementScan = true;
}


// 弹出回库弹窗
function backOpen(id) {
	$("#backId").val(id);
    $('.shade, .back-wrapper').fadeIn();
    $('#back-table').datagrid({
        fit: true,
        // fitColumns: true,
        url: "getTasksByRepairId",
        queryParams: {"id":id},
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        scrollbarSize: 6,
        columns: [
            [
            	{
            		field: 'id',
            		hidden: true
            	},
                {
                    field: 'typeName',
                    title: '类型',
                    width: 100,
                },
                {
                    field: 'tempName',
                    title: '模板名称',
                    width: 100,
                },
                {
                    field: 'tempBrand',
                    title: '品牌',
                    width: 100,
                },
                {
                    field: 'tempSpec',
                    title: '规格型号',
                    width: 150,
                },
                {
                	field: 'tempSupply',
                	title: '供应商',
                	width: 150,
                },
                {
                    field: 'qrcodeUrl',
                    title: '二维码',
                    width: 100,
                    align: 'center',
                    formatter: function (val,rec) {
                        return  '<a class="detail-picture"><i></i><div><img src="../images/twoCode.png" alt=""></div></a>'
                    }
                },
                {
                    field: 'qrcode',
                    title: '二维码编号',
                    width: 150,
                },
                {
                    field: 'name',
                    title: '名称',
                    width: 100,
                },
                {
            		field: 'stateId',
            		hidden: true
            	},
                {
                    field: 'G',
                    title: '金额',
                    width: 100,
                    formatter: function(value,row,index){
                    	return '<input type="hidden" name="repairTasks['+index+'].id" value="'+row.id+'"><input type="text" name="repairTasks['+index+'].money" class="backmoney easyui-validatebox" data-options="required:true,validType:\'positiveTwo\'">';
                    }
//                    editor:{type:'numberbox',options:{precision:2,min: 0}}
                },
                {
                    field: 'H',
                    title: '状态',
                    width: 100,
                    align: 'center',
                    formatter: function (value,row,index) {
                        return '<select name="repairTasks['+index+'].equipState.id"><option value="0">正常</option><option value="3">报废</option></select>'
                    }
                },
            ]
        ],
        onLoadSuccess:function(data){  
            $('.backmoney').each(function(){
            	$(this).validatebox();    
            });

        }  
    });
}

function initWebSocket(){
	//创建socket对象
	socket = new WebSocket("ws://"+ window.location.host+basePath()+"/repair.do");
	//连接创建后调用
	socket.onopen = function() {
		console.log("started")
	};
	
	//接收到服务器消息后调用
	socket.onmessage = function(message) {
		var data = JSON.parse(message.data);
		console.log(data)
		if(data.type == "outRepair" && outId !=0 && outId == data.id){	//维修出库
			//出库ajax    
			$.post("addOutRepair",{'id':outId},function(data){
				console.log(data);
				$('#dg').datagrid("load");
				$('.shade').fadeOut();
		        $(".outCode-wrapper").fadeOut();
				if(data == 1){
					new CustomPrompt({
	                    type: 'success',
	                    msg: '出库领取成功！'
	                });
				}else{
					new CustomPrompt({
	                    type: 'default',
	                    msg: '已经被出库领取！'
	                });
				}
			},"json")
		}
		if(data.type == "outMore" && bloutId !=0 && bloutId == data.id){	//维修出库
			//出库ajax    
			$.post("addOutMore",{'id':bloutId},function(data){
				$('#dg').datagrid("load");
				$('.shade').fadeOut();
				$(".outCode-wrapper").fadeOut();
				if(data == 1){
					new CustomPrompt({
						type: 'success',
						msg: '补领成功！'
					});
				}else{
					new CustomPrompt({
						type: 'default',
						msg: '已经被出库领取！'
					});
				}
			},"json")
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