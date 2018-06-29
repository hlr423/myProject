$(function () {
	var param = GetRequest();
	var flag = param["flag"];
	if(flag == 3){
		$("#tab").tabs("select",3);
	}
    /*=========================初始化配置类+变量声明=========================*/
    var clearSuccessSetTimeout; // 清楚成功弹窗的setTimeout
    // 初始化时间控件
    var layDataNode = document.getElementsByClassName('chose-time');
    for(var i = 0; i < layDataNode.length; i++){
        laydate.render({
            elem: layDataNode[i],
            type: 'datetime',
            // showBottom: false
        });
    }
    // 时间控件失去焦点隐藏时间选择框
    var clearSuccessWrapper; // 成功弹窗setTimeout
    // 整体tab
    $('#tab').tabs({
        tabWidth: 80,
        tabHeight: 50,
        plain: true,
        // justified: true, // 生成等宽标题
        narrow:true, // 删除选项卡之间的间距
        onSelect: function () {
            $('.layui-laydate').hide();
            $('.chose-time').val('');

        }
    });

    // 入库整体table
    $('#depotInto').datagrid({
    	url: 'getInOrderByPage',
        method: 'POST',
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination : true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'inOrderOn',
                    title: '入库单号',
                    width: 100,
                },
                {
                    field: 'time',
                    title: '入库时间',
                    width: 150,
                },
                {
                    field: 'person',
                    title: '入库人员',
                    width: 100,
                },
                {
                    field: 'D',
                    title: '入库详情',
                    width: 80,
                    align: 'center',
                    formatter: function (value,row,index) {
                        return '<a class="td-into-detail" onclick="intoDetailOpen('+row.id+')">详情</a>';
                    }
                },

            ]
        ]
    });

    // 出库整体table
    $('#depotOut').datagrid({
    	url: 'getOutOrderBypage',
        method: 'POST',
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination : true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'outOrderOn',
                    title: '出库单号',
                    width: 100,
                },
                {
                    field: 'B',
                    title: '出库二维码',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) { // 没扫描没有二维码图片
                    	return  '<a class="out-td-picture" ><i></i><div><img src="'+basePath()+row.qrcodeUrl+'" alt=""></div></a>'                    		                   	
                    }
                },
                {
                    field: 'time',
                    title: '出库时间',
                    width: 150,
                    align: 'center',
                },
                {
                    field: 'person',
                    title: '出库人员',
                    width: 100,
                },
                {
                    field: 'recipient',
                    title: '领取人员',
                    width: 100,
                },
                {
                    field: 'sheetType',
                    title: '工单类型',
                    width: 150
                },
                {
                    field: 'sheetNo',
                    title: '工单编号',
                    width: 150,
                },
                {
                    field: 'G',
                    title: '工单状态',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) {
                    	//已完成
                        return '<a class="out-state-finish">'+row.sheetState+'</a>'
                    }
                },
                {
                    field: 'sheetTime',
                    title: '派发时间',
                    width: 150,
                    align: 'center',
                },
                {
                    field: 'I',
                    title: '出库详情',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) {
                        return '<a class="out-td-detail" onclick="outDetailOpen('+row.id+')">详情</a>';
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

    // 维修整体table
    $('#depotRepair').datagrid({
    	url: "getRepairInfoBypage",
    	queryParams: {
    			"typeId" : $("#repair-type").val(),
    			"startTime" : $("#repair-startTime").val(),
    			"endTime" : $("#repair-endTime").val(),
    			"repairSno" : $("#repairSno").val()
    			},
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination : true,
        scrollbarSize: 6,
        columns: [
            [
            	{
                    field: 'id',
                   	hidden: true
                },
                {
                	field: 'typeId',
                	hidden: true
                },
                {
                    field: 'typeName',
                    title: '类型',
                    width: 100,
                },
                {
                    field: 'sno',
                    title: '维修单号',
                    width: 100,
                },
                {
                    field: 'C',
                    title: '维修二维码',
                    width: 100,
                    align: 'center',
                    formatter: function (val,rec) {
                    	var content='';
                    	if(rec.qrcodeUrl!=undefined){
                    		content='<a class="repair-td-picture" ><i></i><div><img src="'+rec.qrcodeUrl+'" alt=""></div></a>';
                    	}
                        return  content;
                    }
                },
                {
                    field: 'createTime',
                    title: '派发时间',
                    width: 150,
                    align: 'center',
                },
                {
                    field: 'personName',
                    title: '领取人员',
                    width: 100,
                },
                {
                    field: 'outPerson',
                    title: '出库人员',
                    width: 100,
                },
                {
                    field: 'outTime',
                    title: '领取时间',
                    width: 150,
                    align: 'center',
                },
                
                {
                    field: 'voucher',
                    title: '凭证码',
                    width: 100,
                },
                {
                	field: 'stateId',
                	hidden: true
                },
                {
                    field: 'stateName',
                    title: '工单状态',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) {
                        return '<a class="repair-state-finish">'+value+'</a>'
                    }
                },
                {
                    field: 'M',
                    title: '故障维修详情',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) {
                        return '<a class="repair-td-detail" onclick="repairDetailOpen('+row.id+')">详情</a>';
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

    // 盘点整体table
    $('#depotInventory').datagrid({
    	url: "getInventoryByPager",
    	queryParams: {
    			"startTime" : "",
    			"endTime" : ""
    			},
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination : true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'time',
                    title: '盘点时间',
                    width: 150,
                },
                {
                    field: 'person',
                    title: '盘点人员',
                    width: 100,
                },
                {
                    field: 'lost',
                    title: '丢失',
                    width: 100,
                    align: 'center',
                    formatter: function (val,rec) {
                    	if(rec.lost > 0){
                    		return  '<a class="inventory-td-lost" onclick="inventoryLost('+rec.id+')">'+rec.lost+'</a>'
                    	}else{
                    		return "<a>无</a>"
                    	}
                    }
                },
                {
                    field: 'detail',
                    title: '盘点详情',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) {
                        return '<a class="inventory-td-detail" onclick="inventoryDetailOpen('+row.id+')">详情</a>';
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

    // 历史整体table
    $('#depotHistory').datagrid({
    	url:"getHistoryInfo",
    	queryParams:{
    		deportId:0,
    		startTime:"",
    		endTime:""
    	},
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination : true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'action',
                    title: '操作',
                    width: 100,
                },
                {
                    field: 'time',
                    title: '时间',
                    width: 120,
                    align: 'center',
                }
            ]
        ],
        onLoadSuccess:function(data){
        	if(data.total == 0){
        		$(this).datagrid('appendRow', { action: '<div style="text-align:center;color:red">没有相关记录！</div>' }).datagrid('mergeCells', { index: 0, field: 'action', colspan: 2 })
                //隐藏分页导航条，这个需要熟悉datagrid的html结构，直接用jquery操作DOM对象，easyui datagrid没有提供相关方法隐藏导航条
                $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
        		$(".time-chart").empty();
        		$(".time-chart").css({
        			display:"none"
        		});
        		new CustomPrompt({
        			type: 'error',
        			msg: '没有相关记录'
        		});
        		
        	}else{
        		$(".time-chart").css({
        			display:"block"
        		});
        		var datas = data.rows;
        		var content = "";
        		for(var i=0; i<datas.length; i++){
        			content += "<div class='content'><div class='circle'>"+datas[i].action+"</div>";
        			content += "<p>"+datas[i].time+"</p><div class='line'></div></div>";
        		}
        		$(".time-chart").html(content);
        	}
        }
    });
    //历史信息搜索按钮
    $(".search5").on("click",function(){
    	 $('#depotHistory').datagrid({
    	    	url:"getHistoryInfo",
    	    	queryParams:{
    	    		deportId:$("#deport").val(),
    	    		startTime:$("#startTime5").val(),
    	    		endTime:$("#endTime5").val()
    	    	}
    	 });
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

    /*=========================盘点丢失弹窗+扫码弹窗=========================*/

    var $inventoryLostPopup = $('.inventory-lost-wrapper');
    var inventoryLostSubmit = document.querySelector('.inventory-lost-submit'); // 盘点丢失提交
    var $inventoryScanInput = $('.inventory-scan-wrapper .content input[type=text]'); // 补领扫码input
    var $inventoryScanRrtuen = $('.inventory-scan-wrapper .return-icon'); // 补领扫码返回按钮
    // 丢失提交
//    inventoryLostSubmit.addEventListener('click',function () {
//        $('.inventory-lost-form').form('submit',{
//            onSubmit: function () {
//                var formValue = $(this).form('enableValidation').form('validate');
//                return formValue
//            },
//            success: function (data) {
//                new CustomPrompt({
//                    type: 'success',
//                    msg: '提交成功'
//                });
//                $inventoryLostPopup.fadeOut();
//                $('.shade').fadeOut();
//            }
//        })
//    });
    // 扫码弹窗input 回车事件
    $inventoryScanInput.on('keypress',function (event) {
        if(event.keyCode == 13){
            if($inventoryScanInput.val() != ''){
            	var qrcode = $("#qrcode").val();
            	$.ajax({
            		type:"post",
            		url:"againInventory",
            		data:"id="+detailId+"&qrcode="+qrcode+"&remark="+remark,
            		dataType:"json",
            		success:function(data){
            			if(data == 0){
            				new CustomPrompt({
                                type: 'default',
                                msg: '盘点失败!'
                            });
            			}else if(data == -1){
            				new CustomPrompt({
                                type: 'default',
                                msg: '二维码不匹配!'
                            });
            			}else{
            				$('.inventory-scan-wrapper').fadeOut();
            				$('.lost-success-wrapper').fadeIn();
            				clearSuccessSetTimeout = setTimeout(clearSuccess,5000)
            				$('#depotInventory').datagrid({
            					 url: "getInventoryByPager",
            					 queryParams: {
            						 "startTime" : "",
            						 "endTime" : ""
            					 }
            				 })
            			}
            		}
            	});
            }else {
                new CustomPrompt({
                    type: 'default',
                    msg: '请输入二维码!'
                });
            }
        }
    });
    // 返回盘点丢失弹窗
    
    $inventoryScanRrtuen.on('click',function(){
    	$('.inventory-scan-wrapper').fadeOut();
    	$('.inventory-lost-wrapper').fadeIn();
    })
    
    /*=========================盘点丢失出库成功弹窗=========================*/
    var btnLook = document.querySelector('.btn-look'); // 盘点丢失成功查看盘点信息
    var btnReturn = document.querySelector('.btn-return'); // 返回丢失详情
    // 出库成功查看盘点信息
    btnLook.addEventListener('click',function () {
        $('.shade .lost-success-wrapper').fadeOut();
        clearTimeout(clearSuccessSetTimeout);
    });
    // 返回盘点丢失成功
    btnReturn.addEventListener('click',function () {
    	console.log(1111)
        $('.lost-success-wrapper').fadeOut();
        $inventoryLostPopup.fadeIn();
        clearTimeout(clearSuccessSetTimeout);
    });

    /*=========================其它=========================*/

    // 维修搜索
    $("#repair-search").click(function(){
    	 $('#depotRepair').datagrid("load",{
 			"typeId" : $("#repair-type").val(),
 			"startTime" : $("#repair-startTime").val(),
 			"endTime" : $("#repair-endTime").val(),
 			"repairSno" : $("#repairSno").val()
 			});
    })
    
});

/*=========================其它方法=========================*/

// 关闭成功弹窗
function clearSuccess() {
    $('.shade').hide();
    $('.success-wrapper').hide()
}

//入库搜索
function inOrderSearchFun(){
	var startTime = $('#inOrderStartTime').val();
	var endTime = $('#inOrderEndTime').val();
	var inOrderOn=$('#inOrderOn').val();
	$("#depotInto").datagrid("load", {    
		startTime: startTime,
		endTime: endTime,
		inOrderOn:inOrderOn,
	});
}

//出库搜索
function outOrderSearchFun(){
	var startTime=$('#outOrderStartTime').val();
	var endTime=$('#outOrderEndTime').val();
	var outOrderOn=$('#outOrderOn').val();
	$('#depotOut').datagrid("load", {    
		startTime: startTime,
		endTime: endTime,
		outOrderOn: outOrderOn
	});
}
//盘点搜索
$(".serach4").on("click",function(){
	  $('#depotInventory').datagrid({
	    	url: "getInventoryByPager",
	    	queryParams: {
	    			"startTime" : $("#startTime4").val(),
	    			"endTime" : $("#endTime4").val()
	    		},
	  })
})
// 打开入库详情
function intoDetailOpen(inOrderId) {
    $('.shade, .into-detail-wrapper').fadeIn();
    $('#into-detail-table').datagrid({
    	url: 'getInRecordsByInOrderId?inOrderId='+inOrderId,
        method: 'POST',
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'typeName',
                    title: '类型',
                    width: 100,
                },
                {
                    field: 'name',
                    title: '模板名称',
                    width: 150,
                },
                {
                    field: 'C',
                    title: '二维码',
                    width: 80,
                    align: 'center',
                    formatter: function (value, row , index) {
                    	var content='';
                    	if(row.qrcodeUrl!=null){
                    		content='<a class="into-detail-picture" ><i></i><div><img src="'+basePath()+row.qrcodeUrl+'" alt=""></div></a>';
                    	}
                        return  content;
                    }

                },
                {
                    field: 'qrcode',
                    title: '二维码编号',
                    width: 150,
                },
                {
                    field: 'brand',
                    title: '品牌',
                    width: 100,
                },
                {
                    field: 'model',
                    title: '规格型号',
                    width: 150,
                },
                {
                    field: 'G',
                    title: '状态',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) {
                    	if(row.equipState=='故障'){
                    		return '<a class="into-detail-fault">故障</a>';                   		
                    	}else if(row.equipState=='报废'){
                    		return '<a class="into-detail-scrap">报废</a>';
                    	}else if(row.equipState=='正常'){
                    		return '<a class="into-detail-normal">正常</a>';
                    	}else{
                    		return '<a>无</a>';
                    	}
                        // <a class="into-detail-scrap">报废</a>
                        // <a class="into-detail-normal">正常</a>
                        // <a>无</a>
                    }
                },

            ]
        ]
    });
}

// 打开出库详情
function outDetailOpen(outOrderId) {
    $('.shade, .out-detail-wrapper').fadeIn();
    $('#out-detail-table').datagrid({
    	url: 'getOutRecordsByOutOrderId?outOrderId='+outOrderId,
        method: 'POST',
        fit: true,
        // fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'station',
                    title: '厂站',
                    width: 160,
                },
                {
                    field: 'taskType',
                    title: '任务类型',
                    width: 100,
                },
                {
                    field: 'task',
                    title: '任务对象',
                    width: 100,
                },
                {
                    field: 'matterType',
                    title: '所需物资类型',
                    width: 100,
                },
                {
                    field: 'tempName',
                    title: '所需模板名称',
                    width: 100,
                },
                {
                    field: 'F',
                    title: '二维码',
                    width: 80,
                    align: 'center',
                    formatter: function (value,row,index) {
                        return  '<a class="out-detail-picture" ><i></i><div><img src="'+basePath()+row.qrcodeUrl+'" alt=""></div></a>'
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
                    field: 'tempBrand',
                    title: '品牌',
                    width: 100,
                },
                {
                    field: 'tempModel',
                    title: '规格型号',
                    width: 100,
                },
            ]
        ]
    });
}

// 打开故障维修详情
function repairDetailOpen(id) {
    $('.shade, .repair-detail-wrapper').fadeIn();
    $('#repair-detail-table').datagrid({
        fit: true,
        url: "getTasksByRepairId",
    	queryParams: {"id":id},
        // fitColumns: true,
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
                    	var content='';
                    	if(rec.qrcodeUrl!=undefined){
                    		content='<a class="repair-detail-picture"><i></i><div><img src="'+rec.qrcodeUrl+'" alt=""></div></a>';
                    	}
                        return  content;
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
            		field: 'resultStateId',
            		hidden: true
            	},
                {
                    field: 'resultStateName',
                    title: '状态',
                    width: 100,
                    align: 'center',
                    formatter: function (value,row,index) {
                        return '<a class="detail-repair">'+row.stateName+'</a>'
                        if(row.resultStateId == 1){
                        	return '<a class="repair-detail-normal">正常</a>'
                        }
                        if(row.resultStateId == 3){
                        	
                        	return '<a class="repair-detail-scrap">报废</a>';
                        }
                        return '<a class="repair-detail-fault">'+value+'</a>';
                        
                    }
                },
            ]
        ]
    });
}

// 打开盘点详情
function inventoryDetailOpen(id) {
    $('.shade, .inventory-detail-wrapper').fadeIn();
    $('#inventory-detail-table').datagrid({
    	url: "getInventoryDetailById",
    	queryParams: {"id":id},
        fit: true,
        // fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'type',
                    title: '类型',
                    width: 100,
                },
                {
                    field: 'name',
                    title: '名称',
                    width: 100,
                },
                {
                    field: 'qrcodeUrl',
                    title: '二维码',
                    width: 80,
                    align: 'center',
                    formatter: function (val,rec) {
                        return  '<a class="inventory-detail-picture" ><i></i><div><img src="'+basePath()+rec.qrcodeUrl+'" alt=""></div></a>'
                    }

                },
                {
                    field: 'qrcode',
                    title: '二维码编号',
                    width: 150,
                },
                {
                    field: 'tempName',
                    title: '模板名称',
                    width: 100,
                },

                {
                    field: 'brand',
                    title: '品牌',
                    width: 100,
                },
                {
                    field: 'model',
                    title: '规格型号',
                    width: 100,
                },
                {
                    field: 'supplier',
                    title: '供应商',
                    width: 100,
                },
                {
                    field: 'remark',
                    title: '备注',
                    width: 150,
                },
            ]
        ]
    });
}

// 打开盘点丢失弹窗
function inventoryLost(id) {
    $('.shade, .inventory-lost-wrapper').fadeIn();
    $('#inventory-lost-table').datagrid({
    	url: "getLostByInventoryId",
    	queryParams: {"id":id},
        fit: true,
        // fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'type',
                    title: '类型',
                    width: 100,
                },
                {
                    field: 'name',
                    title: '名称',
                    width: 100,
                },
                {
                    field: 'qrcodeUrl',
                    title: '二维码',
                    width: 80,
                    align: 'center',
                    formatter: function (val,rec) {
                        return  '<a class="inventory-lost-picture" ><i></i><div><img src="'+basePath()+rec.qrcodeUrl+'" alt=""></div></a>'
                    }

                },
                {
                    field: 'qrcode',
                    title: '二维码编号',
                    width: 150,
                },
                {
                    field: 'tempName',
                    title: '模板名称',
                    width: 100,
                },

                {
                    field: 'brand',
                    title: '品牌',
                    width: 100,
                },
                {
                    field: 'model',
                    title: '规格型号',
                    width: 100,
                },
                {
                    field: 'supplier',
                    title: '供应商',
                    width: 100,
                },
                {
                    field: 'remark',
                    title: '备注',
                    width: 150,
                    formatter: function (val,rec) {
                        return '<input type="text">';
                    }
                },
                {
                    field: 'operation',
                    title: '操作',
                    width: 100,
                    align: 'center',
                    formatter: function (val,rec) {
                        return '<a class="inventory-lost-scan" onclick="inventoryLostScanOpen('+rec.id+',this)">扫描入库</a>'
                    }
                },
            ]
        ]
    });
}

// 打开盘点丢失扫码弹窗
var detailId;
var remark;
function inventoryLostScanOpen(id,node) {
	detailId = id;
	remark = $(node).parents("tr").find("td").eq(8).find("input").val();
    $('.inventory-lost-wrapper').fadeOut();
    $('.inventory-scan-wrapper').fadeIn().find('input[type=text]').val('').focus();
}

//获取跳转页面是传递的参数
function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
      }
  }
  return theRequest;
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