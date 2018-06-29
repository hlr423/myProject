var etId;
$(function () {
    /*=========================初始化配置+变量定义=========================*/
    var popupState = 0; // 用于区分 新建与编辑弹窗的上一步与下一步按钮事件(0:新建 1:编辑)
    // 编辑启用时间初始化
    laydate.render({
        elem: '.chose-time',
        showBottom: false,
        done: function (value) {
            setTimeout(function() {
                $('.chose-time').focus();
                $('.layui-laydate').hide();
            }, 0)
        }
    });

    $.ajax({
    	type:"post",
    	url:"getInit",
    	dataType:"json",
    	success:function(data){
    		var equipTemps = data.equipTemps;
    		var content = "<option value='0'>请选择设备模板</option>";
    		if(equipTemps.length > 0){
    			for(var i=0; i<equipTemps.length; i++){
    				content += "<option value="+equipTemps[i].id+">"+equipTemps[i].text+"</option>";
    			}
    		}
    		$("#topEquipTemp").html(content);
    	}
    });
    // 点击搜索
 	$(".search-btn").on("click", function() {
 		$("#dg").datagrid({
 			url : "getAllEquipByPager",
 			queryParams : {
 				etId : $("#topEquipTemp").val(),
 				keyword : $("#keyword").val()
 			}
 		});
 	});
    // 整体table
    $('#dg').datagrid({
    	url:"getAllEquipByPager",
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
                    hidden:true
                },
                {
                    field: 'name',
                    title: '设备名称',
                    width: 80,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'mould',
                    title: '设备模板名称',
                    width: 80,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
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
                    title: '规格型号',
                    width: 150,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'position',
                    title: '工艺位置',
                    width: 100,
                },
                {
                    field: 'station',
                    title: '所属厂站',
                    width: 100,
                    align: 'center',
                    formatter: function (value, rec) {
                        return '<a class="td-detail" onclick="detailOpen('+rec.id+')">'+rec.station+'</a>';
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 100,
                    formatter: function (value, rec) {
                        return '<div class="table-operation"><a class="table-edit" onclick="editOpen('+rec.id+')"><i></i>编辑</a> ' +
                            '<a class="table-delete" onclick="deleteOpen('+rec.id+')"><i></i>删除</a>' +
                            '</div>';
                    }
                }
            ]
        ],
        onLoadSuccess:function(data){
        	if(data.total == 0){
        		 $(this).datagrid('appendRow', { name: '<div style="text-align:center;color:red">没有相关记录！</div>' }).datagrid('mergeCells', { index: 0, field: 'name', colspan: 7 })
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

    /*=========================弹窗=========================*/

    // 关闭弹窗
    $('.close-popup').on('click',function () {
        var $popup = $(this).parents('.popup');
        $('.shade').fadeOut();
        $popup.fadeOut();
    });
    
    /*=========================删除弹窗=========================*/
    var deleteConfirm = document.querySelector('.delete-confirm');
    var inforCancel = document.querySelector('.infor-cancel');
    // 确认删除
    deleteConfirm.addEventListener('click',function () {
    	$('.shade,.delete-wrapper').fadeOut();
    	$.ajax({
    		type:"post",
    		url:"deleteEquip",
    		data:"eid="+eid,
    		dataType:"json",
    		success:function(data){
    			if(data == 1){
    				new CustomPrompt({
	                    type: 'success',
	                    msg: '删除成功！'
	                });
    				$("#dg").datagrid("reload");
    			}else{
    				new CustomPrompt({
	                    type: 'default',
	                    msg: '删除失败！'
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

    var divIndex = 0; // 新建框步奏 索引
    var $newPopup = $('.newAdd-wrapper');
    var $newRegion = $('.newAdd-region-comboTree'); // 新建区域
    var equipmentCheckedArr1 = new Array(); // 存放设备模板已选的数据
    var newAddSubmit = document.querySelector('.newAdd-submit'); //新建提交
    // 新建弹窗并初始化
    $('.new-btn').on('click', function () {
    	$.ajax({
			type:"post",
			url:"addTest",
			dataType:"json",
			success:function(data){
				if(null != data[0] && data[0].noOpt){
         			new CustomPrompt({
                        type: 'error',
                        msg: '您无权操作！'
                    });
         		}else{
         			popupState = 0;
         			divIndex = 0;
         			equipmentCheckedArr1 = [];
         			$('.shade, .newAdd-wrapper').fadeIn();
         			var $checkAll = $('.newAdd-wrapper .content-checkbox .check-all');
         			$newPopup.find('input[type=text]').not($newPopup.find('.textbox.combo input[type=text]')).val('');
         			$newRegion.combotree('clear');
         			$('.newAdd-position').val('0'); //位置下拉
         			$('.newAdd-water').val('0');    //处理水量下拉
         			$('.newAdd-wrapper .content-step').css('height','0').eq(0).css('height','auto');
         			$('.newAdd-prev, .newAdd-submit').removeClass('submit-show');
         			$('.newAdd-next').addClass('submit-show');
         			$checkAll.trigger('click');
//         			if($checkAll.is(':checked')){ // 初始化全部厂站
//         				$checkAll.trigger('click');
//         			}else {
//         				$checkAll.trigger('click');
//         			}
         			$('.newAdd-wrapper .station-item-checked').html(''); // 清空已选厂站
         			// 初始化设备模板表格
         			$('#equipmentAdd-table').datagrid({
         				url:"getEquipTemp",
         				queryParams : {
         					name:"",
         					brand:"",
         					model:"",
         					supplierId : 0
         				},
         				fit: true,
         				fitColumns: true,
         				rownumbers: true, // 显示行号列
         				singleSelect: true, // 允许选择一行
         				onSelect: function (index, row) {
         					equipmentCheckedArr1 = [];
         					equipmentCheckedArr1.push(row);
         				},
         				columns: [
         					[
         						{
         							field: 'id',
         							hidden:true
         						},
         						{
         							field: 'radio',
         							title: '单选',
         							checkbox: true,
         							width: 100,
         						},
         						{
         							field: 'name',
         							title: '设备模板名称',
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
         							title: '供货商',
         							width: 100,
         						},
         						]
         					],
         					onLoadSuccess:function(data){
         						$("#etnum").text(data.total);
         					}
         			}); 
         			//新建时加载数据
         			$.ajax({
         				type:"post",
         				url:"getEnum",
         				dataType:"json",
         				success:function(data){
         					var positions = data.positions;
         					var content = "<option value='0'>请选择工艺位置</option>";
         					if(positions.length > 0){
         						for(var i=0; i<positions.length; i++){
         							content += "<option value="+positions[i].positionId+">"+positions[i].positionName+"</option>";
         						}
         					}
         					$("#position").html(content);
         					$("#etname").select2({
         						data:data.name
         					})
         					$("#etbrand").select2({
         						data:data.brand
         					})
         					$("#etmodel").select2({
         						data:data.model
         					})
         					//设置不默认选中
         					$("#etname").val("").select2({
         						placeholder: '请选择模板名称',
         						allowClear: true,
         						language: "zh-CN"
         					});
         					$("#etbrand").val("").select2({
         						placeholder: '请选择品牌',
         						allowClear: true,
         						language: "zh-CN"
         					});
         					$("#etmodel").val("").select2({
         						placeholder: '请选择规格型号',
         						allowClear: true,
         						language: "zh-CN"
         					});
         					var suppliers = data.suppliers;
         					var content1 = "<option value='0'>请选择供货商</option>";
         					if(suppliers.length > 0){
         						for(var i=0; i<suppliers.length; i++){
         							content1 += "<option value="+suppliers[i].id+">"+suppliers[i].name+"</option>";
         						}
         					}
         					$("#supplier").html(content1);
         					
         					$('#area').combotree({ 
         						data:data.areas,
         						width: 200,
         						height: 30,
         						hasDownArrow: false,
         						onChange:function(id){
         							getStation(id,$("#treatWater").val());
         						}
         					});
         					
         					var treatWaters = data.treatWaters;
         					var content2 = "<option value='0'>请选择处理水量</option>";
         					if(treatWaters.length > 0){
         						for(var i=0; i<treatWaters.length; i++){
         							content2 += "<option value="+treatWaters[i].id+">"+treatWaters[i].num+"</option>";
         						}
         					}
         					$("#treatWater").html(content2);
         					getStation(0,0);
         				}
         			});
         		}
			}
    	});
    });
    
    $("#etname,#etbrand,#etmodel,#supplier").on("change",function(){
    	var name = "";
    	var brand = "";
    	var model = "";
    	if($("#etname").select2("data") != ""){
    		name = $("#etname").select2("data")[0].text;
    	}
    	if($("#etbrand").select2("data") != ""){
    		brand = $("#etbrand").select2("data")[0].text;
    	}
    	if($("#etmodel").select2("data") != ""){
    		model = $("#etmodel").select2("data")[0].text;
    	}
    	$("#equipmentAdd-table").datagrid({
 			url : "getEquipTemp",
 			queryParams : {
 				name:name,
 				brand:brand,
 				model:model,
 				supplierId : $("#supplier").val()
 			},
 			onBeforeLoad : function(param){
 				$('.allData').trigger('click');
 			},
 			onLoadSuccess:function(data){
 				$("#etnum").text(data.total);
 				var rows = $('#equipmentAdd-table').datagrid("getRows");
 				//循环数据找出列表中ID和需要选中数据的ID相等的数据并选中
 			    for(var i=0;i<rows.length;i++){
 			      var rowId = rows[i].id;
 			      if(equipmentCheckedArr1.length > 0){
 			    	  if(rowId == equipmentCheckedArr1[0].id){
 			    		  var index = $("#equipmentAdd-table").datagrid("getRowIndex",rows[i])
 			    		  $("#equipmentAdd-table").datagrid("checkRow",index);
 			    	  }
 			      }
 			    }
 			}
 		});
    });
    $("#treatWater").on("change",function(){
    	getStation($("#area").combotree("getValue"),$("#treatWater").val());
    });
    // 下一步
    $('.newAdd-next').on('click', function () {
        var $content = $(this).parents('.popup');
        var $divNode = $content.find('.content-step').eq(divIndex);
        var divValue;
        (divIndex == 0) && (divValue = $divNode.form('enableValidation').form('validate'));
        if(divIndex == 1){ // 设备模板
            if(equipmentCheckedArr1.length == 0 && popupState == 0){
                divValue = false;
                new CustomPrompt({
                    type: 'default',
                    msg: '请选择一条数据'
                });
            }else {
                divValue = true;
            }
        }
        if (divValue) {
            $divNode.css('height',0);
            divIndex++;
            $content.find('.content-step').eq(divIndex).css('height','auto');
        }
        if (divIndex == 2) {
            $(this).removeClass('submit-show');
            $content.find('.footer .submit:nth-of-type(3)').addClass('submit-show');
        }
        (divIndex > 0) && $('.newAdd-prev').addClass('submit-show');
    });
    // 上一步
    $('.newAdd-prev').on('click', function () {
        var $content = $(this).parents('.popup');
        var $divNode = $content.find('.content-step').eq(divIndex);
        $divNode.css('height','0');
        divIndex--;
        $content.find('.content-step').eq(divIndex).css('height','auto');
        (divIndex == 0) && $(this).removeClass('submit-show');
        if (divIndex < 2) {
            $('.newAdd-submit').removeClass('submit-show');
            $('.newAdd-next').addClass('submit-show')
        }
    });
    // 切换全部模板数据和已选数据
    $('.newAdd-wrapper .allData').on('click', function () { // 全部数据
        var $content = $(this).parents('.content-item');
        $(this).addClass('data-checked');
        $(this).next('span').removeClass('data-checked');
        $content.find('.table-div').show();
        $content.find('.table-div-checked').hide();
    });
    // 新建设备弹窗(设备模板已选)
    $('.equip-checkedData').on('click',function () {
        var $content = $(this).parents('.content-item');
        $(this).addClass('data-checked');
        $(this).prev('span').removeClass('data-checked');
        $content.find('.table-div').hide();
        $content.find('.table-div-checked').show();
        $('#equipmentAdd-table-checked').datagrid({
            fit: true,
            fitColumns: true,
            rownumbers: true, // 显示行号列
            singleSelect: true,
            scrollbarSize: 6,
            columns: [
                [
                	{
                        field: 'id',
                        hidden:true
                    },
                    {
                        field: 'radio',
                        title: '单选',
                        checkbox: true,
                        width: 100,
                    },
                    {
                        field: 'name',
                        title: '设备模板名称',
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
                        title: '供货商',
                        width: 100,
                    },
                ]
            ]
        });
        $('#equipmentAdd-table-checked').datagrid('loadData', equipmentCheckedArr1);
        $('#equipmentAdd-table-checked').datagrid('selectAll');
        $content.find('.table-div-checked input[type=checkbox]').eq(0).hide();
    });
    // 切换厂站全部数据和已选数据
    $('.station-allData').on('click', function () {
        var $this = $(this);
        var $content = $this.parents('.content-step');
        var $checkbox = $content.find('.station-item .check-row');
        var $checkboxChecked = $content.find('.station-item-checked .check-row');
        var stationIdArr = new Array(); // 新建已选厂站ID数组
        $checkboxChecked.each(function (index, node) { //已选厂站遍历
            var $divNode = $(node).parents('.station-items').clone();
            var checkedStationId = $divNode.find('.check-row').attr('station-id');
            (!$(node).is(':checked')) && stationIdArr.push(checkedStationId);
        });
        $checkbox.each(function (index,node) { // 全部厂站遍历 （已选厂站不选，对应的也不选）
            var $divNode1 = $(node).parents('.station-items').clone();
            var stationId = $divNode1.find('.check-row').attr('station-id');
            (stationIdArr.indexOf(stationId) == 0) && $(node).trigger('click');
        });
        $content.find('.station-item-checked').hide();
        $content.find('.station-item').show();
        $content.find('.content-checkbox .station-checkAll').show(); // 全选显示
    });
    $('.station-checkedData').on('click', function () {
        var $this = $(this);
        var $content = $this.parents('.content-step');
        var stationArr = new Array(); // 新建存在厂站数组(厂站)
        var $checkbox = $content.find('.station-item .check-row');
        $checkbox.each(function (index, node) { // 遍历全部厂站中已选中的
            if ($(node).is(':checked')) {
                var $divNode = $(node).parents('.station-items').clone();
                stationArr.push($divNode);
            }
        });
        $content.find('.station-item').hide();
        $content.find('.station-item-checked').show().find('.station-items').remove();
        $content.find('.content-checkbox .station-checkAll').hide(); // 全选消失
        for (var i = 0; i < stationArr.length; i++) {
            $content.find('.station-item-checked').append(stationArr[i]);
        }

    });
    // 新建弹窗提交
    newAddSubmit.addEventListener('click',function () {
		var formValue = $(".newAdd-form").form('enableValidation').form('validate');
		var $checkbox = $(".newAdd-form").parents('.popup').find('.station-item input[type=checkbox]');
		var checkboxValue = false;
		$checkbox.each(function(index, node) {
			if ($(node).is(':checked')) {
				checkboxValue = true;
				return false;
			}
		});
		if(!checkboxValue){
			new CustomPrompt({
                type: 'default',
                msg: '请至少选择一个厂站'
            });
		}
		if(formValue && checkboxValue){
			var sIds = "";
			var $nodeList = $('.s');
        	for(var i=0; i<$nodeList.length; i++){
        		if($nodeList[i].checked){
        			sIds += $nodeList[i].value+","
        		}
        	}
			$.ajax({
				type:"post",
				url:"addEquip",
				data:{
					name:$("#name").val(),
					positionId:$("#position").val(),
					etId:$("#equipmentAdd-table").datagrid("getChecked")[0].id,
					sIds:sIds
				},
				dataType:"json",
				success:function(data){
					if(data == "1"){
						new CustomPrompt({
			                type: 'success',
			                msg: '新建成功'
			            });
						$("#dg").datagrid("reload");
						$('.shade, .newAdd-wrapper').fadeOut();
					}else if(data == "0"){
						new CustomPrompt({
			                type: 'defaule',
			                msg: '新建失败'
			            });
					}else{
						new CustomPrompt({
			                type: 'error',
			                msg: data
			            });
						$('.shade, .newAdd-wrapper').fadeOut();
					}
				}
			});
		}
	});

    /*=========================编辑弹窗=========================*/

    var $editPopup = $('.edit-wrapper');
    var editSubmit = document.querySelector('.editAdd-submit');
    // 验证图片上传
    var pictureFile = document.querySelector('.equipment-picture input[type=file]');
    pictureFile.addEventListener('change',function () {
        validate.checkImg($(this));
    });

  
    // 编辑图片事件-显示图片
    $('.edit-wrapper').on('click','.content-img img',function () {
        var $img = $(this).clone();
        $('.img-wrapper .content img').remove();
        $('.img-wrapper .content').append($img);
        $('.img-wrapper').fadeIn();
    });

    // 编辑提交
    editSubmit.addEventListener('click',function () {
        $('.edit-form').form('submit', {
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                return formValue
            },
            success: function (data) {
            	if(data == -1){
            		new CustomPrompt({
                        type: 'error',
                        msg: '设备名已存在'
                    });
            	}else if(data == 1){
            		new CustomPrompt({
                        type: 'success',
                        msg: '修改成功'
                    });
            		$("#dg").datagrid("reload");
            		$('.shade, .edit-wrapper').fadeOut();
            	}else{
            		new CustomPrompt({
            			type: 'default',
            			msg: '修改失败'
            		});
            	}
            }
        });
    });



    /*=========================其它方法+调用等=========================*/
    // 新建模板表格单选
    common.commonRadio('.newAdd-template-table');
    // 新建模板厂站复选/全选
    common.commonCheckbox('.newAdd-wrapper .content-checkbox', true); // 全部厂站
    common.commonCheckbox('.newAdd-wrapper .station-item-checked',false); // 已选的厂站
    common.checkboxAll('.newAdd-wrapper .content-checkbox');

    // 编辑模板厂站复选/全选
    common.commonCheckbox('.edit-wrapper .content-checkbox', true); // 全部厂站
    common.commonCheckbox('.edit-wrapper .station-item-checked',false); // 已选的厂站
    common.checkboxAll('.edit-wrapper .content-checkbox');

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

// 弹出编辑弹窗
function editOpen(id) {
	$.ajax({
		type:"post",
		url:"updateTest",
		dataType:"json",
		success:function(data){
			if(null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			$("#id").val(id);
     			$('.shade, .edit-wrapper').fadeIn();
     			$.ajax({
     				type:"post",
     				url:"getEditInit",
     				data:"eid="+id,
     				dataType:"json",
     				success:function(data){
     					$("#ename").val(data.name);
     					if(data.hasOwnProperty("useTime")){
     						$("#euseTime").val(data.useTime);
     					}
     					if(data.hasOwnProperty("picUrl")){
     						$("#epic").html("<img src="+basePath()+data.picUrl+">");
     					}
     					var positions = data.positions;
     					var content1 = "<option value='0'>请选择工艺位置</option>";
     					if(positions.length > 0){
     						for(var i=0; i<positions.length; i++){
     							if(positions[i].positionId == data.positionId){
     								content1 += "<option value="+positions[i].positionId+" selected>"+positions[i].positionName+"</option>";
     							}else{
     								content1 += "<option value="+positions[i].positionId+">"+positions[i].positionName+"</option>";
     							}
     						}
     					}
     					$("#eposition").html(content1);
     					
     					var equipTemps = data.equipTemps;
     					var content2 = "<option value='0'>请选择设备模板</option>";
     					if(equipTemps.length > 0){
     						for(var i=0; i<equipTemps.length; i++){
     							if(equipTemps[i].id == data.etId){
     								content2 += "<option value="+equipTemps[i].id+" selected>"+equipTemps[i].text+"</option>";
     							}else{
     								content2 += "<option value="+equipTemps[i].id+">"+equipTemps[i].text+"</option>";
     							}
     						}
     					}
     					$("#eequipTemp").html(content2);
     					
     					var equipStates = data.equipStates;
     					var content3 = "<option value='0'>请选择设备状态</option>";
     					if(equipStates.length > 0){
     						for(var i=0; i<equipStates.length; i++){
     							if(equipStates[i].id == data.esId){
     								content3 += "<option value="+equipStates[i].id+" selected>"+equipStates[i].name+"</option>";
     							}else{
     								content3 += "<option value="+equipStates[i].id+">"+equipStates[i].name+"</option>";
     							}
     						}
     					}
     					$("#eequipState").html(content3);
     					
     					$("#estation").select2({
     						data:data.stations,
     					});
     					$("#estation").val(data.stationId).select2({
     						placeholder: '请选择厂站',
     						allowClear: true,
     						language: "zh-CN"
     					});
     				}
     			});
     		}
		}
	});
}

// 弹出删除弹窗
function deleteOpen(id) {
	$.ajax({
		type:"post",
		url:"deleteTest",
		dataType:"json",
		success:function(data){
			if(null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			eid = id;
     			$('.shade, .delete-wrapper').fadeIn();
     		}
		}
	});
}
var eid;
// 弹出详情弹窗
function detailOpen(id) {
    $('.shade, .detail-wrapper').fadeIn();
    $.ajax({
    	type:"post",
    	url:"getStationByEquipId",
    	data:"equipId="+id,
    	dataType:"json",
    	success:function(data){
    		var content = "";
    		if(data.length > 0){
    			for(var i=0; i<data.length; i++){
    				content += "<div class='content-item'><label>"+data[i].name+"：</label><span>"+data[i].value+"</span>";
    			}
    		}
    		$(".detail-wrapper .content").html(content);
    	}
    });

}

// 编辑弹窗表单
function editSubmitForm() {
    $('.edit-form').form('submit', {
        onSubmit: function () {
            return $(this).form('enableValidation').form('validate');
        },
        success: function (data) {
            alert(data)
        }
    });
}
//根据区域id和处理水量查询厂站
function getStation(areaId,treatWaterId){
	$.ajax({
		type:"post",
		url:"getStation",
		data:"areaId="+areaId+"&twId="+treatWaterId,
		dataType:"json",
		success:function(stations){
			var content = "";
			 if(stations.length > 0){
				 $("#snum").text(stations.length);
				 for(var i=0; i<stations.length; i++){
					 content += "<div class='station-items'><a class='checkbox-wrapper'><i></i>";
					 content += "<input type='checkbox' station-id='station1' class='check-row s' value="+stations[i].id+"></a>";
					 content += "<span>"+stations[i].name+"</span></div>";
				 }
			 }else{
				 $("#snum").text(0);
				 content += '<div style="text-align:center;color:red">没有相关记录！</div>';
			 }
			 $("#station").html(content);
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
