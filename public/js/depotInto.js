var outId = 0;//备货
var bloutId = 0;//补领可以出库的id
$(function () {
    /*=========================初始化配置类+变量声明=========================*/
	//initWebSocket();

    var clearSuccessWrapper; // 成功弹窗setTimeout
    // 整体tab
    $('#tab').tabs({
        tabWidth: 80,
        tabHeight: 50,
        plain: true,
        // justified: true, // 生成等宽标题
        narrow:true, // 删除选项卡之间的间距
    });

    // 入库整体table
    $('#depotInto').datagrid({
    	url: 'getMattersByPage',
        method: 'POST',
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination : true,
        pageSize: 10,         //分页大小  
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'typeName',
                    title: '类型',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'name',
                    title: '模板名称',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'brand',
                    title: '品牌',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'A',
                    title: '二维码',
                    width: 80,
                    align: 'center',
                    formatter: function (value,row,index) {
                        return '<a class="td-picture"><i></i><div><img src="http://localhost:8080/wai-web-base/'+row.qrcodeUrl+'" alt=""></div></a>'
                    }
                },
                {
                    field: 'qrcode',
                    title: '二维码编号',
                    width: 150,
                    align: 'center',
                },
                {
                    field: 'model',
                    title: '规格型号',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'G',
                    title: '状态',
                    width: 80,
                    align: 'center',
                    formatter: function (value,row,index) {
                    	if(row.equipState=='故障'){
                    		return '<a class="td-fault">故障</a>';                   		
                    	}else if(row.equipState=='报废'){
                    		return '<a class="td-scrap">报废</a>';
                    	}else if(row.equipState=='正常'){
                    		return '<a class="td-normal">正常</a>';
                    	}else{
                    		return '<a>无</a>';
                    	}
                        // <a class="td-scrap">报废</a>
                        // <a class="td-normal">正常</a>
                        // <a>无</a>
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 100,
                    align: 'center',
                    formatter: function (value,row,index) {
                        return '<div class="table-operation"><a class="table-delete" onclick="deleteOpen(0,'+row.id+')"><i></i>删除</a></div>'
                    }
                }
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

    var deportId2=$("#deportId2").val();
    // 出库整体table
    $('#depotOut').datagrid({
    	url: 'getWorkSheetsByDeportId',
    	queryParams: {'deportId':deportId2},
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
                    field: 'workSheetType',
                    title: '工单类型',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'workSheetNo',
                    title: '工单编号',
                    width: 150,
                    align: 'center',
                },
                {
                    field: 'workSheetPerson',
                    title: '运维人员',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'workSheetState',
                    title: '工单状态',
                    width: 80,
                    align: 'center',
                    formatter: function (val,rec) {
                        return '<a class="td-state-no">未处理</a>'
                    }
                },
                {
                    field: 'workSheetTime',
                    title: '派发时间',
                    width: 150,
                    align: 'center',
                },
                {
                    field: 'F',
                    title: '清单',
                    width: 80,
                    align: 'center',
                    formatter: function (value, row , index) {
                        return '<a class="td-detail" onclick="detailOpen('+row.id+')">详情</a>';
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) {
                    	var json=row.workSheetPersonIds;
                    	var workSheetPersonIds="";
                    	$.each(json,function(i,n){
                    		workSheetPersonIds+=n.personId+'\,';
                    	});
                    	if(row.outType==0){//未出库
                    		return '<a class="td-stocking" onclick="stockingOpen('+row.id+',\''+workSheetPersonIds+'\')">备货</a>' +
                            '<a class="td-out" onclick="outCodeOpen(1,'+row.id+',\''+workSheetPersonIds+'\')">出库</a>';
                    	}else if(row.outType==1){//已出库
                    		var str = '<a class="td-replace" onclick="replacementOpen('+row.id+',\''+workSheetPersonIds+'\')">补领</a>'+
                            '<a class="td-out" onclick="outCodeOpen(2,'+row.id+',\''+workSheetPersonIds+'\')">出库</a>';
                    		return str;
                    	}
                        //<a class="td-out">出库</a>;
                        //<a class="td-replace">补领</a>;
                    }
                }
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
    
    $('#deportId2').on('change',function(){
    	deportId2=$("#deportId2").val();
    	$('#depotOut').datagrid({
    		queryParams: {
    			'deportId':deportId2
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
    // 关闭成功弹窗
    $('.popup .btn-close').on('click',function () {
        var $popup = $(this).parents('.popup');
        clearTimeout(clearSuccessWrapper); // 清楚setTimeOut
        $('.shade').hide();
        $popup.hide();
    });

    /*=========================删除弹窗=========================*/

    var deleteConfirm = document.querySelector('.delete-confirm');
    var inforCancel = document.querySelector('.infor-cancel');
    // 确认删除
    deleteConfirm.addEventListener('click',function () {
        var type = $(this).parents('.delete-wrapper').attr('state'); // 0:删除表格信息 1:删除清单表格信息 2:删除备货表格信息 3:删除补领表格信息
        if(type == 0){//入库
        	var url="deleteMatter";
        	var param={"id":indexOn};
        	$.post(url,param,function(data){
     			if(data.data==1){
     				new CustomPrompt({
     					type: 'success',
     					msg: '删除成功'
     				});
     				$('#depotInto').datagrid('reload');    // 重新载入当前页面数据
     			}else{
     				new CustomPrompt({
     					type: 'error',
     					msg: '删除失败'
     				});
     			}
        	},"json");
            $('.shade,.delete-wrapper').fadeOut();
        }else if(type == 1){//出库详情
            $('.delete-wrapper').fadeOut();
            $('.shade').css('z-index','9997');
            $('.detail-submit').addClass('submit-show');
        }else if(type == 2){//出库备货
        	var url="deleteOutMatter";
        	var param={"taskResourcesId":indexOn};
        	$.post(url,param,function(data){
     			if(data.data==1){
     				new CustomPrompt({
     					type: 'success',
     					msg: '删除成功'
     				});
     				$('#stocking-table').datagrid('reload');    // 重新载入当前页面数据
     			}else{
     				new CustomPrompt({
     					type: 'error',
     					msg: '删除失败'
     				});
     			}
        	},"json");
            $('.delete-wrapper').fadeOut();
            $('.shade').css('z-index','9997');
        }else if(type == 3){//出库补领
        	var url="deleteOutMatter";
        	var param={"taskResourcesId":indexOn};
        	$.post(url,param,function(data){
     			if(data.data==1){
     				new CustomPrompt({
     					type: 'success',
     					msg: '删除成功'
     				});
     				$('#replacement-table').datagrid('reload');    // 重新载入当前页面数据
     			}else{
     				new CustomPrompt({
     					type: 'error',
     					msg: '删除失败'
     				});
     			}
        	},"json");
            $('.delete-wrapper').fadeOut();
            $('.shade').css('z-index','9997');
        }
        /*new CustomPrompt({
            type: 'success',
            msg: '删除成功'
        });*/
    });
    // 取消弹窗
    inforCancel.addEventListener('click',function () {
        var type = $(this).parents('.delete-wrapper').attr('state');
        if(type == 0){
            $('.shade').fadeOut();
            $(this).parents('.infor-wrapper').fadeOut();
        }else {
            $(this).parents('.infor-wrapper').fadeOut();
            $('.shade').css('z-index','9997');
        }
    });

    /*=========================入库页面=========================*/

    // 入库提交
    var scanSubmit = document.querySelector('.scan-submit'); // 入库按钮
    var scanState = 0; // 判断设备信息 0:无信息 1:有信息(判断是故障还是报废)
    scanSubmit.addEventListener('click',function () {
    	var deportId= $("#deportId").val();
        $('.scan-into-form').form('submit',{
        	url: 'getMatterByQrcode?deportId='+deportId,
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                return formValue
            },
            success: function (data) {
            	var json = eval("("+data+")");
            	if(json[0]!=null && json[0].invalidate){
    				window.parent.location.href = json[0].loginPage;
    			}
            	if(json[0]!=null && null != json[0].noOpt && json[0].noOpt){
         			new CustomPrompt({
                        type: 'error',
                        msg: '您无权操作！'
                    });
         		}else{
         			if(json.typeId==-1){
         				$intoPopup.fadeIn();
         				$('.shade').fadeIn();
         			}else if(json.typeId==-2){
         				new CustomPrompt({
         					type: 'success',
         					msg: '物资已录入'
         				});
         			}else if(json.typeId==-3){
         				new CustomPrompt({
         					type: 'error',
         					msg: '提交失败'
         				});
         			}else{
         				$('#depotInto').datagrid('reload');    // 重新载入当前页面数据
         			}     			
         		}
                /*if(scanState == 0){
                    $intoPopup.fadeIn();
                    $('.shade').fadeIn();
                }*/
            }
        });
    });

    /*=========================入库弹窗=========================*/

    var $intoPopup = $('.depotInto-wrapper'); // 入库
    var intoSubmit = document.querySelector('.depotInto-submit');
    common.commonRadio('.depotInto-wrapper'); // 调用入库radio
    // 入库确认提交
    intoSubmit.addEventListener('click',function () {
    	var qrcode=$("#qrcode").val();
    	var deportId= $("#deportId").val();
        $('.depotInto-form').form('submit',{
        	url:"addMatter?qrcode="+qrcode+"&deportId="+deportId,
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                return formValue;
            },
            success: function (data) {
            	var json = eval("("+data+")");
            	if(json[0]!=null && json[0].invalidate){
    				window.parent.location.href = json[0].loginPage;
    			}
            	if(json[0]!=null && null != json[0].noOpt && json[0].noOpt){
         			new CustomPrompt({
                        type: 'error',
                        msg: '您无权操作！'
                    });
         		}else{
         			if(json.data==1){
         				new CustomPrompt({
         					type: 'success',
         					msg: '提交成功'
         				});          		
         			}else{
         				new CustomPrompt({
         					type: 'error',
         					msg: '提交失败'
         				});
         			}
         			$('#depotInto').datagrid('reload');      			
         		}
                $intoPopup.fadeOut();
                $('.shade').fadeOut();
            }
        });
    });
    
    /*=========================入库单提交=========================*/
    var intoSubmit = document.querySelector('.into-submit');
    intoSubmit.addEventListener('click',function () {
    	$.ajax({
			type:"post",
			url:"addTest",
			dataType:"json",
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
         	        addInorder();   			
         		}
			}
		});
    });

    /*=========================出库清单+添加物资+重新扫码=========================*/

   // var $detailPopup = $('.detail-wrapper'); // 清单弹窗
   // var detailAdd = document.querySelector('.detail-add'); // 添加物资
    //var addSubmit = document.querySelector('.add-submit'); // 添加物资提交
    //var detailSubmit = document.querySelector('.detail-submit'); // 清单提交
    //var $detailScanInput = $('.scan-wrapper input[type=text]'); // 清单扫码input
    // 从添加物资返回详情弹窗
    //returnPopup('.detail-wrapper','.add-wrapper');
    // 从重新扫码返回详情弹窗
   //returnPopup('.detail-wrapper','.scan-wrapper');
    // 弹出添加物资弹窗
   /*detailAdd.addEventListener('click',function () {
        $detailPopup.fadeOut();
        $('.add-wrapper').fadeIn().find('select').val('0');
    });*/
    // 添加物资提交
    /*addSubmit.addEventListener('click',function () {
        $('.add-form').form('submit',{
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                return formValue
            },
            success: function (data) {
                new CustomPrompt({
                    type: 'success',
                    msg: '添加成功'
                });
                $('.add-wrapper').fadeOut();
                $detailPopup.fadeIn();
                $('.detail-submit').addClass('submit-show');
            }
        })
    });*/
    // 清单扫码input回车事件
   /*$detailScanInput.on('keypress',function (event) {
    	var outQrcode=$('#outQrcode').val();
    	alert(taskResourceId);
       if(event.keyCode == 13){
           if($detailScanInput.val() != ''){
        	   var url="getDetailScan";
        	   var param={"deportId":deportId2,"taskResourceId":taskResourceId,"qrcode":outQrcode};
        	   $.post(url,param,function(data){
        		   $('#detail-table').datagrid("reload");
        		   if(data.data == 1){			//绑定成功
           			new CustomPrompt({type: 'defalut',msg: '添加成功'});
	           		}else if(data.data == 2){	//已经其他工单预备
	           			new CustomPrompt({type: 'defalut',msg: '已经其他工单预备'});
	           		}else if(data.data == 3){	//二维码不正确
	           			new CustomPrompt({type: 'defalut',msg: '二维码不正确'});
	           		}else{
	           			new CustomPrompt({type: 'defalut',msg: '添加失败'});
	           		}
        	   },"json");
               $('.scan-wrapper').fadeOut();
               $detailPopup.fadeIn();
               $('.detail-submit').addClass('submit-show');
           }else {
               new CustomPrompt({
                   type: 'default',
                   msg: '请输入二维码!'
               });
           }
       }
    });*/
    // 清单提交
    /*detailSubmit.addEventListener('click',function () {
        alert('提交')
    });*/

    /*=========================备货弹窗+添加物资=========================*/

    var $stockingPopup = $('.stocking-wrapper');
    var stockingAdd = document.querySelector('.stocking-add'); // 备货添加物资
    var stockingAddSubmit = document.querySelector('.stocking-add-submit'); // 备货添加物资提交
    var stockingSubmit = document.querySelector('.stocking-submit'); // 备货提交
    var $stockingScanInput = $('.stocking-scan-wrapper input[type=text]'); // 备货扫码input
    // 添加物资返回备货
    returnPopup('.stocking-wrapper','.stocking-add-wrapper');
    // 扫描返回备货
    returnPopup('.stocking-wrapper','.stocking-scan-wrapper');
    // 弹出备货添加物资
    stockingAdd.addEventListener('click',function () {
    	$("#weekStat").find("option").remove();
    	$.ajax({
 			type:"post",
 			url:"addTest",
 			dataType:"json",
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
          	         addMatterTest(workSheetId2);  			
          		}
 			}
 		});
    });
    
    $("#weekStat").change(function(data){
    	$("#weekTaskn").find("option").remove();
    	var str = '<option value="0">请选择任务对象</option>';
    	$("#weekTaskn").html(str);
    	var stationId = $("#weekStat").val();
    	$.post("getTasksByStationId",{"stationId":stationId,"workSheetId":workSheetId2},function(data){
    		var str = '<option value="0">请选择任务对象</option>';
    		$(data).each(function(i,n){
    			if(n.type!=""){
    				str += '<option value="'+n.id+'">'+n.type+'-'+n.name+'</option>';  				
    			}else{
    				str += '<option value="'+n.id+'">'+n.name+'</option>';  
    			}
    		})
    		$("#weekTaskn").html(str);
    	},"json")
    });
    
    $("#weekMatt").change(function(data){
    	$("#weekSupp").find("option").remove();
    	var str='<option value="0">请选择供应商名称</option>';
    	$("#weekSupp").html(str);
    	var typeId=$("#weekMatt").val()-1;
    	var url="getSuppliers";
        var param={"type":typeId};
        $.post(url,param,function(data){
        	$.each(data, function(i,n){
        		str+="<option value="+n.templateSupplierId+">"+n.templateSupplier+"</option>";
        	})
        	$("#weekSupp").html(str);
        },"json");
    });
    
    $("#weekSupp").change(function(data){
    	$("#weekTemp").find("option").remove();
    	var str='<option value="0">请选择模板对象</option>';
    	$("#weekTemp").html(str);
    	var supplierId=$("#weekSupp").val();
    	var typeId=$("#weekMatt").val()-1;
    	var url="getMatterTemplate";
        var param={"type":typeId,"templateSupplierId":supplierId};
        $.post(url,param,function(data){
        	$.each(data, function(i,n){
        		str +="<option value="+n.id+">"+n.templateName+"-"+n.templateBrand+"-"+n.templateModel+"</option>";
        	})
        	$("#weekTemp").html(str);
        },"json");
    });
    
    // 备货添加物资提交
    stockingAddSubmit.addEventListener('click',function () {
        $('.stocking-add-form').form('submit',{
        	url:"addOutMatter",
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                return formValue
            },
            success: function (data) {
            	var json = eval("("+data+")");
     			if(json.data==1){
     				new CustomPrompt({
     					type: 'success',
     					msg: '提交成功'
     				});          		
     				$('#stocking-table').datagrid('reload');
     			}else{
     				new CustomPrompt({
     					type: 'error',
     					msg: '提交失败'
     				});
     			}
                $('.stocking-add-wrapper').fadeOut();
                $stockingPopup.fadeIn();
            }
        })
    });
    // 备货扫码input
    $stockingScanInput.on('keypress',function (event) {
    	var stockQrcode=$('#stockQrcode').val();
       if(event.keyCode == 13){
           if($stockingScanInput.val() != ''){
        	   var url="getStockScan";
        	   var param={"deportId":deportId2,"taskResourceId":taskResourceId,"qrcode":stockQrcode};
        	   $.post(url,param,function(data){
        		   $('#detail-table').datagrid("reload");
        		   if(data.data == 1){			//绑定成功
           			new CustomPrompt({type: 'defalut',msg: '添加成功'});
	           		}else if(data.data == 2){	//已经其他工单预备
	           			new CustomPrompt({type: 'defalut',msg: '已经其他工单预备'});
	           		}else if(data.data == 3){	//二维码不正确
	           			new CustomPrompt({type: 'defalut',msg: '二维码不正确'});
	           		}else{
	           			new CustomPrompt({type: 'defalut',msg: '添加失败'});
	           		}
        		   $('#stocking-table').datagrid("reload");
        	   },"json");
        	   $('.stocking-scan-wrapper').fadeOut();
               $stockingPopup.fadeIn();
           }else {
               new CustomPrompt({
                   type: 'default',
                   msg: '请输入二维码!'
               });
           }
       }
    });

    // 备货提交
    stockingSubmit.addEventListener('click',function () {
    	outCodeOpen(1,workSheetId2,workSheetPersonIds2);
    });

    /*=========================补领弹窗+添加物资=========================*/

    var $replacementPopup = $('.replacement-wrapper');
    var replacementAdd = document.querySelector('.replacement-add'); // 添加物资按钮
    var replacementAddSubmit = document.querySelector('.replacement-add-submit'); // 添加物资添加按钮
    var replacementSubmit = document.querySelector('.replacement-submit'); // 补领弹窗提交
    var $replacementScanInput = $('.replacement-scan-wrapper input[type=text]'); //补领扫码input
    // 从添加物资返回补领弹窗
    returnPopup('.replacement-wrapper','.replacement-add-wrapper');
    // 从扫描返回补领弹窗
    returnPopup('.replacement-wrapper','.replacement-scan-wrapper');
    // 打开添加物资弹窗
    replacementAdd.addEventListener('click',function () {
    	$("#weekStat2").find("option").remove();
    	$.ajax({
 			type:"post",
 			url:"addTest",
 			dataType:"json",
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
          	         addReplaceTest(workSheetId2);  			
          		}
 			}
 		});
    });
    $("#weekStat2").change(function(data){
    	$("#weekTaskn2").find("option").remove();
    	var str = '<option value="0">请选择任务对象</option>';
    	$("#weekTaskn2").html(str);
    	var stationId = $("#weekStat2").val();
    	$.post("getTasksByStationId",{"stationId":stationId,"workSheetId":workSheetId2},function(data){
    		$(data).each(function(i,n){
    			if(n.type!=""){
    				str += '<option value="'+n.id+'">'+n.type+'-'+n.name+'</option>';  				
    			}else{
    				str += '<option value="'+n.id+'">'+n.name+'</option>';  
    			}
    		})
    		$("#weekTaskn2").html(str);
    	},"json")
    });
    $("#weekMatt2").change(function(data){
    	$("#weekSupp2").find("option").remove();
    	var str='<option value="0">请选择供应商名称</option>';
    	$("#weekSupp2").html(str);
    	var typeId=$("#weekMatt2").val()-1;
    	var url="getSuppliers";
        var param={"type":typeId};
        $.post(url,param,function(data){
        	$.each(data, function(i,n){
        		str+="<option value="+n.templateSupplierId+">"+n.templateSupplier+"</option>";
        	})
        	$("#weekSupp2").html(str);
        },"json");
    });
    
    $("#weekSupp2").change(function(data){
    	$("#weekTemp2").find("option").remove();
    	var str='<option value="0">请选择模板对象</option>';
    	$("#weekTemp2").html(str);
    	var supplierId=$("#weekSupp2").val();
    	var typeId=$("#weekMatt2").val()-1;
    	var url="getMatterTemplate";
        var param={"type":typeId,"templateSupplierId":supplierId};
        $.post(url,param,function(data){
        	var str='';
        	$.each(data, function(i,n){
        		str +="<option value="+n.id+">"+n.templateName+"-"+n.templateBrand+"-"+n.templateModel+"</option>";
        	})
        	$("#weekTemp2").html(str);
        },"json");
    });
    // 添加物资提交
    replacementAddSubmit.addEventListener('click',function () {
       $('.replacement-add-form').form('submit',{
    	   url:"addOutMatter",
    	   onSubmit: function () {
               var formValue = $(this).form('enableValidation').form('validate');
               return formValue
           },
           success: function (data) {
	           var json = eval("("+data+")");
    			if(json.data==1){
    				new CustomPrompt({
    					type: 'success',
    					msg: '提交成功'
    				});          		
    				$('#replacement-table').datagrid('reload');
    			}else{
    				new CustomPrompt({
    					type: 'error',
    					msg: '提交失败'
    				});
    			}
	           	$('.replacement-add-wrapper').fadeOut();
	            $replacementPopup.fadeIn();
           }
       })
    });
    // 补领扫码input
    $replacementScanInput.on('keypress',function (event) {
    	var replaceQrcode=$('#replaceQrcode').val();
       if(event.keyCode == 13){
           if($replacementScanInput.val() != ''){
               var url="getReplaceScan";
               var param={"deportId":deportId2,"taskResourceId":taskResourceId,"qrcode":replaceQrcode};
               $.post(url,param,function(data){
            	   $('#detail-table').datagrid("reload");
            	   if(data.data == 1){			//绑定成功
            		   new CustomPrompt({type: 'defalut',msg: '添加成功'});
            	   }else if(data.data == 2){	//已经其他工单预备
            		   new CustomPrompt({type: 'defalut',msg: '已经其他工单预备'});
            	   }else if(data.data == 3){	//二维码不正确
            		   new CustomPrompt({type: 'defalut',msg: '二维码不正确'});
            	   }else{
            		   new CustomPrompt({type: 'defalut',msg: '添加失败'});
            	   }
            	   $('#replacement-table').datagrid("reload");
               },"json");
               $('.replacement-scan-wrapper').fadeOut();
               $replacementPopup.fadeIn();
           }else {
               new CustomPrompt({
                   type: 'default',
                   msg: '请输入二维码!'
               })
           }
       }
    });
    // 补领弹窗提交
    replacementSubmit.addEventListener('click',function () {
    	outCodeOpen(2,workSheetId2,workSheetPersonIds2);
    });
    /*=========================出库单二维码+出库成功=========================*/

    // 模拟扫描成功事件
    $('.outCode-wrapper img').on('click',function(){
        $('.outCode-wrapper').fadeOut();
        $('.depotOut-success').fadeIn();
    });
    // 查看出库信息(跳转到历史记录出库选项卡)
    $('.depotOut-success .btn-look').on('click',function () {
        alert('历史记录出库信息选项卡');
    })
    
    var url="getSuppliers";
    var param={"type":0};
    $.post(url,param,function(data){
    	$.each(data, function(i,n){
    		$("#templateSupplier").append("<option value="+n.templateSupplierId+">"+n.templateSupplier+"</option>");
    		if(i==0){
    			getMatterTemplate(0,n.templateSupplierId);
    		}
    	})
    },"json");
    
});

/*=========================其它方法=========================*/
function getMatterTemplate(type,templateSupplierId){
	var url="getMatterTemplate";
    var param={"type":type,"templateSupplierId":templateSupplierId};
    $.post(url,param,function(data){
    	$.each(data, function(i,n){
    		$("#templateMatter").append("<option value="+n.id+">"+n.templateName+"-"+n.templateBrand+"-"+n.templateModel+"</option>");
    	})
    },"json");
}

function addInorder(){
	var deportId= $("#deportId").val();
    var url="addInOrder";
    var param={"deportId":deportId};
    $.post(url,param,function(data){
		if(data.data==1){
			new CustomPrompt({
				type: 'success',
				msg: '提交成功'
			});
			//$('#depotInto').datagrid('reload');
			setTimeout("location.reload();", 500);
		}else{
			new CustomPrompt({
				type: 'error',
				msg: '提交失败'
			});
		}
    },"json");
}

$("#templateSupplier").on("change",function(){
	$("#templateMatter").find("option").remove();
	var type=$("input[type='radio']:checked").val();
	var templateSupplier=$("#templateSupplier").val();
	var url="getMatterTemplate";
	var param={"type":type,"templateSupplierId":templateSupplier};
	$.post(url,param,function(data){
    	$.each(data, function(i,n){
    		$("#templateMatter").append("<option value="+n.id+">"+n.templateName+"-"+n.templateBrand+"-"+n.templateModel+"</option>");
    	})
    },"json");
});

function addMatter(type){
	$("#templateSupplier").find("option").remove();
	$("#templateMatter").find("option").remove();
	var url="getSuppliers";
    var param={"type":type};
    $.post(url,param,function(data){
    	$.each(data, function(i,n){
    		$("#templateSupplier").append("<option value="+n.templateSupplierId+">"+n.templateSupplier+"</option>");
    		if(i==0){
    			getMatterTemplate(type,n.templateSupplierId);
    		}
    	})
    },"json");
}

function addMatterTest(workSheetId2){
	var str = '<option value="0">请选择厂站</option>';
	$("#weekStat").html(str);
	$('#workSheetId').val(workSheetId2);
	//$("#weekStat").find("option").remove();
	var url="getStationsByWorkSheetId";
	var param={"workSheetId":workSheetId2};
	$.post(url,param,function(data){
		$(data).each(function(i,n){
			str += '<option value="'+n.id+'">'+n.name+'</option>';
		})
		$("#weekStat").html(str);
		$('.stocking-add-wrapper').fadeIn().find('select').val('0');
		$stockingPopup.fadeOut();
	},"json");
}

function addReplaceTest(workSheetId2){
	var str = '<option value="0">请选择厂站</option>';
	$("#weekStat2").html(str);
	$('#workSheetId2').val(workSheetId2);
	var url="getStationsByWorkSheetId";
	var param={"workSheetId":workSheetId2};
	$.post(url,param,function(data){
		$(data).each(function(i,n){
			str += '<option value="'+n.id+'">'+n.name+'</option>';
		})
		$("#weekStat2").html(str);
		$('.replacement-add-wrapper').fadeIn().find('select').val('0');
		$replacementPopup.fadeOut();
	},"json");
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

var indexOn;
// 打开删除弹窗
function deleteOpen(type,id) { // type 0:入库删除 type 1:出库详情删除
    indexOn=id;
    $.ajax({
		type:"post",
		url:"deleteTest",
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
     		    $('.shade, .delete-wrapper').fadeIn();
     		    $('.delete-wrapper').attr('state',type);
     		    (type == 0) ? $('.shade').css('z-index','9997') : $('.shade').css('z-index','9999')
     		}
		}
	});
}

// 打开清单弹窗
function detailOpen(workSheetId) {
    $('.shade, .detail-wrapper').fadeIn();
    $('.detail-submit').removeClass('submit-show');
    // 初始化清单table
    $('#detail-table').datagrid({
    	url: 'getDetailByWorkSheetId?workSheetId='+workSheetId,
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
                    width: 150,
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
                    width: 150,
                },
                {
                    field: 'tempName',
                    title: '所需模板名称',
                    width: 150,
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
                {
                    field: 'F',
                    title: '二维码',
                    width: 80,
                    align: 'center',
                    formatter: function (value, row , index) { // 没扫描没有二维码图片
                        return  '<a class="detail-picture" ><i></i><div><img src="http://localhost:8080/wai-web-base/'+row.qrcodeUrl+'" alt=""></div></a>'
                    }
                },
                {
                    field: 'qrcode',
                    title: '二维码编号',
                    width: 100,
                },
                {
                    field: 'name',
                    title: '名称',
                    width: 100,
                }/*,
                {
                    field: 'K',
                    title: '操作',
                    width: 150,
                    align: 'center',
                    formatter: function (value, row , index) {
                    	var str='';
                    	if(row.qrcode!=null){
                    		str='<a class="detail-scan" onclick="detailScanOpen('+row.rId+')">重新扫描</a>';
                    	}else{
                    		str='<a class="detail-scan" onclick="detailScanOpen('+row.rId+')">扫描</a>';
                    	}
                        return str+'<a class="detail-del" onclick="deleteOpen(1)">删除</a>'
                    }
                },*/
            ]
        ]
    });
}

var taskResourceId=0;
// 打开清单扫码弹窗
/*function detailScanOpen(rId){
	taskResourceId=rId;
    $('.scan-wrapper').fadeIn().find('input[type=text]').val('').focus();
    $('.detail-wrapper').fadeOut();
}*/

// 返回上一个弹窗
function returnPopup(prevNode,nowNode) {
    $(nowNode).find('.return-icon').on('click',function () {
       $(prevNode).fadeIn();
       $(nowNode).fadeOut();
    });
}

var workSheetId2=0;
var workSheetPersonIds2;
// 打开备货弹窗
function stockingOpen(workSheetId,workSheetPersonIds) {
	workSheetPersonIds2=workSheetPersonIds;
	workSheetId2=workSheetId;
	outId=workSheetId;
    $('.shade, .stocking-wrapper').fadeIn();
    // 初始化备货table
    $('#stocking-table').datagrid({
    	url: 'getStockByWorkSheetId?workSheetId='+workSheetId,
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
                    width: 150,
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
                    width: 150,
                },
                {
                    field: 'tempName',
                    title: '所需模板名称',
                    width: 150,
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
                {
                    field: 'F',
                    title: '二维码',
                    width: 80,
                    align: 'center',
                    formatter: function (value, row , index) { // 没扫描没有二维码图片
                        return  '<a class="detail-picture" ><i></i><div><img src="http://localhost:8080/wai-web-base/'+row.qrcodeUrl+'" alt=""></div></a>'
                    }
                },
                {
                    field: 'qrcode',
                    title: '二维码编号',
                    width: 100,
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
                    formatter: function (value, row , index) {
                    	var str='';
                    	if(row.qrcode!=null){
                    		str='<a class="detail-scan" onclick="stockingScanOpen('+row.rId+')">重新扫描</a>';
                    	}else{
                    		str='<a class="detail-scan" onclick="stockingScanOpen('+row.rId+')">扫描</a>';
                    	}
                        return str+'<a class="detail-del" onclick="deleteOpen(2,'+row.rId+')">删除</a>';
                    }
                },
            ]
        ]
    });
}

// 打开备货扫码弹窗
function stockingScanOpen(rId){
	taskResourceId=rId;
    $('.stocking-scan-wrapper').fadeIn().find('input[type=text]').val('').focus();
    $('.stocking-wrapper').fadeOut();
}

// 打开出库单二维码
function outCodeOpen(type,workSheetId,workSheetPersonIds) {//type 1备货   2补领
	var wspId=workSheetPersonIds.split(",");
	var ajson=new Array();
	for(i in wspId){
		if(wspId[i]!=null && wspId[i]!=''){
			ajson.push(wspId[i]);
		}
	}
	if(type==1){
		outId=workSheetId;
		$('.stocking-wrapper').fadeOut();		
	}else if(type==2){
		bloutId=workSheetId;
		$('.replacement-wrapper').fadeOut();
	}
	$('.shade, .outCode-wrapper').fadeIn();
	$('.outCode-wrapper .content div').empty();
	$('.outCode-wrapper .content div').qrcode({
	    render: "canvas", //也可以替换为table
	    width: 200,
	    height: 200,
	    text: '{"id":"'+workSheetId+'","personIds":"'+ajson+'"}',
	});
}

// 打开补领弹窗
function replacementOpen(workSheetId,workSheetPersonIds){
	//alert(workSheetPersonIds);
	workSheetPersonIds2=workSheetPersonIds;
	workSheetId2=workSheetId;
	bloutId=workSheetId;
    $('.shade, .replacement-wrapper').fadeIn();
    $('#replacement-table').datagrid({
    	url: 'getReplaceByWorkSheetId?workSheetId='+workSheetId,
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
                    width: 150,
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
                    width: 150,
                },
                {
                    field: 'tempName',
                    title: '所需模板名称',
                    width: 150,
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
                {
                    field: 'F',
                    title: '二维码',
                    width: 80,
                    align: 'center',
                    formatter: function (value, row , index) { // 没扫描没有二维码图片
                        return  '<a class="detail-picture" ><i></i><div><img src="http://localhost:8080/wai-web-base/'+row.qrcodeUrl+'" alt=""></div></a>'
                    }
                },
                {
                    field: 'qrcode',
                    title: '二维码编号',
                    width: 100,
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
                    formatter: function (value, row , index) {
                        /*return '<a class="detail-scan" onclick="replacementScanOpen()">扫描</a>'+
                            '<a class="detail-del" onclick="deleteOpen(3,'+row.rId+')">删除</a>'*/
                    	var str='';
                    	if(row.qrcode!=null){
                    		str='<a class="detail-scan" onclick="replacementScanOpen('+row.rId+')">重新扫描</a>';
                    	}else{
                    		str='<a class="detail-scan" onclick="replacementScanOpen('+row.rId+')">扫描</a>';
                    	}
                        return str+'<a class="detail-del" onclick="deleteOpen(3,'+row.rId+')">删除</a>';
                    }
                },
            ]
        ]
    });
}

// 打开补领扫码弹窗
function replacementScanOpen(rId) {
	taskResourceId=rId;
    $('.replacement-wrapper').fadeOut();
    $('.replacement-scan-wrapper').fadeIn().find('input[type=text]').val('').focus();
}

function initWebSocket(){
	//创建socket对象
	var socket = new WebSocket("ws://"+ window.location.host+basePath()+"/outOrder.do");
	//连接创建后调用
	socket.onopen = function() {
		console.log("started")
	};
	
	//接收到服务器消息后调用
	socket.onmessage = function(message) {
		var data = JSON.parse(message.data);
		console.log(data)
		if(data.type == "outOrder" && outId !=0 && outId == data.id){	//备货出库
			//出库ajax    
			$.post("addOutOrder",{'id':outId,'recipient':data.personId,'deportId':$("#deportId2").val()},function(data){
				console.log(data);
				$('.shade').fadeOut();
		        $(".outCode-wrapper").fadeOut();
		        if(data[0]!=null && data[0].invalidate !=null && data[0].invalidate){
            		window.parent.location.href = data[0].loginPage;
            	}
            	if(data[0]!=null && null != data[0].noOpt && data[0].noOpt){
         			new CustomPrompt({
                        type: 'error',
                        msg: '您无权操作！'
                    });
         		}else{
         			if(data == 1){
         				new CustomPrompt({
         					type: 'success',
         					msg: '出库领取成功！'
         				});
         			}else if(data == 2){
         				new CustomPrompt({
         					type: 'default',
         					msg: '已经被出库领取！'
         				});
         			}else{
         				new CustomPrompt({
         					type: 'default',
         					msg: '出库领取失败！'
         				});
         			}
         			$('#depotOut').datagrid('reload');        			
         		}
			},"json")
		}
		if(data.type == "outReplace" && bloutId !=0 && bloutId == data.id){	//补领出库
			//出库ajax    
			$.post("addOutReplace",{'id':bloutId,'recipient':data.personId,'deportId':$("#deportId2").val()},function(data){
				$('.shade').fadeOut();
				$(".outCode-wrapper").fadeOut();
				if(data[0]!=null && data[0].invalidate !=null && data[0].invalidate){
            		window.parent.location.href = data[0].loginPage;
            	}
            	if(data[0]!=null && null != data[0].noOpt && data[0].noOpt){
         			new CustomPrompt({
                        type: 'error',
                        msg: '您无权操作！'
                    });
         		}else{
         			if(data == 1){
         				new CustomPrompt({
         					type: 'success',
         					msg: '出库领取成功！'
         				});
         			}else if(data == 2){
         				new CustomPrompt({
         					type: 'default',
         					msg: '已经被出库领取！'
         				});
         			}else{
         				new CustomPrompt({
         					type: 'default',
         					msg: '出库领取失败！'
         				});
         			}
         			$('#depotOut').datagrid('reload');        			
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