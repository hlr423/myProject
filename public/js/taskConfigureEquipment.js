var editIndex = 0; // 编辑步奏索引
$(function () {
    /*=========================初始化配置类+变量声明=========================*/
    // 整体table
    $('#dg').datagrid({
    	url: "getAllEquipTaskByPager",
    	queryParams : {
				ttId : 0,
				levelId : 0
			},
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        scrollbarSize: 6,
        pagination: true,
        columns: [
            [
                {
                    field: 'type',
                    title: '分属类型',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'taskType',
                    title: '任务类型',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'equipment',
                    title: '模板名称',
                    width: 100,
                    align: 'center',
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'work',
                    title: '所需工种',
                    width: 100,
                    align: 'center',
                    formatter:function (value,rec) {
                        return '<a class="td-work" onclick="workOpen('+rec.id+')">详情</a>'
                    }
                },
                {
                    field: 'part',
                    title: '所需备件',
                    width: 100,
                    align: 'center',
                    formatter:function (value,rec) {
                        return '<a class="td-part" onclick="partOpen('+rec.id+')">详情</a>'
                    }
                },
                {
                    field: 'car',
                    title: '所需车辆',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'taskCycle',
                    title: '任务周期',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'cycle',
                    title: '周期单位',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'time',
                    title: '所需时长(小时)',
                    width: 130,
                    align: 'center',
                },
                {
                    field: 'explain',
                    title: '操作说明',
                    width: 100,
                    align: 'center',
                    formatter:function (value,rec) {
                        return '<a class="td-explain" onclick="explainOpen('+rec.id+')">详情</a>'
                    }
                },
                {
                    field: 'isCycle',
                    title: '是否周期内完成',
                    width: 140,
                    formatter: function (value, rec) {
                    	if(rec.isCycle){
                    		return '<a class="td-finish"><i></i></a>' // 未完成为<a class="td-not"><i></i></a>
                    	}else{
                    		return '<a class="td-not"><i></i></a>' 
                    	}
                    }
                },
                {
                    field: 'isPhoto',
                    title: '是否拍照',
                    width: 100,
                    formatter: function (value, rec) {
                    	if(rec.isPhoto){
                    		return '<a class="td-finish"><i></i></a>' // 未完成为<a class="td-not"><i></i></a>
                    	}else{
                    		return '<a class="td-not"><i></i></a>' 
                    	}
                    }
                },
                {
                    field: 'isTest',
                    title: '是否强检',
                    width: 100,
                    formatter: function (value, rec) {
                    	if(rec.isTest){
                    		return '<a class="td-finish"><i></i></a>' // 未完成为<a class="td-not"><i></i></a>
                    	}else{
                    		return '<a class="td-not"><i></i></a>' 
                    	}
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 150,
                    formatter: function (value, rec) {
                        return '<div class="table-operation"><a class="table-edit" onclick="editOpen('+rec.id+','+rec.typeId+')"><i></i>编辑</a> ' +
                            '<a class="table-delete" onclick="deleteOpen('+rec.id+')"><i></i>删除</a>' +
                            '</div>';
                    }
                }
            ]
        ],
        onLoadSuccess:function(data){
        	if(data.total == 0){
        		 $(this).datagrid('appendRow', { type: '<div style="text-align:center;color:red">没有相关记录！</div>' }).datagrid('mergeCells', { index: 0, field: 'type', colspan: 14 })
                 //隐藏分页导航条，这个需要熟悉datagrid的html结构，直接用jquery操作DOM对象，easyui datagrid没有提供相关方法隐藏导航条
                 $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
        	}
        }
    });
    //搜索按钮
    $(".search-btn").on("click",function(){
    	 $('#dg').datagrid({
    	url: "getAllEquipTaskByPager",
    	queryParams : {
				ttId : $("#topTaskType").val(),
				levelId : $("#level").val()
			},
    	 });
    });
    // 初始化富文本编辑
    var Editor = window.wangEditor;
    var editor1 = new Editor('#equipment-editor');
    var editor2 = new Editor('#part-editor');
    editor1.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
    editor2.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
    editor1.customConfig.uploadImgHooks = {
		    customInsert: function (insertImg, result, editor) {
		    	for(var i=0; i<result.length; i++){
		    		var url = result[i].data;
		    		insertImg(basePath()+url);
		    	}
		    }
	   };
	    
	editor1.customConfig.uploadImgServer = 'uploadFile';
	editor1.customConfig.uploadFileName = 'file';
	editor1.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;	//限制图片5M
	editor1.customConfig.debug=true;
	 // 自定义菜单配置
    editor1.customConfig.menus = [
    	'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
//        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
    ]
	editor2.customConfig.uploadImgHooks = {
		    customInsert: function (insertImg, result, editor) {
		    	for(var i=0; i<result.length; i++){
		    		var url = result[i].data;
		    		insertImg(basePath()+url);
		    	}
		    }
	   };
	    
	editor2.customConfig.uploadImgServer = 'uploadFile';
	editor2.customConfig.uploadFileName = 'file';
	editor2.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;	//限制图片5M
	editor2.customConfig.debug=true;
	 // 自定义菜单配置
    editor1.customConfig.menus = [
    	'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
//        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
    ]
    editor1.create(); // 创建富文本
    editor2.create(); // 创建富文本

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
    		url:"deleteTaskCycleById",
    		data:"tcId="+tcId,
    		dataType:"json",
    		success:function(data){
    			if(data == 1){
    				new CustomPrompt({
    		            type: 'success',
    		            msg: '删除成功'
    		        });
    		        $('.shade,.delete-wrapper').fadeOut();
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
    $('.new-btn').on('click',function () {
        $('.shade, .newAdd-wrapper').fadeIn();
    });

    /*=========================新建设备任务弹窗=========================*/
    var $newEquipmentPopup = $('.newEquipment-wrapper'); // 新建设备弹窗
    var newEquipment = document.querySelector('.new-equipment'); // 新建设备
    var equipmentSubmit = document.querySelector('.equipment-submit'); // 提交
    var equipmentIndex = 0; // 步奏索引
    var nextState = true; // 调整弹窗宽度
    var equipmentCheckedClick = true; // 判断所需备件已选是否点击
    var equipmentCheckedArr1 = new Array(); // 存放设备模板已选的数据
    var equipmentCheckedArr2 = new Array(); // 存放所需备件已选的数据
    var cancelDataArr1 = new Array(); // 存放已选数据表格取消的数据
    common.commonRadio('.content-radio'); // 调用单选
    // 弹出新建设备弹窗,并初始化
    newEquipment.addEventListener('click',function () {
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
         			$('.newAdd-wrapper').fadeOut();
         			$newEquipmentPopup.fadeIn();
         			equipmentIndex = 0;
         			nextState = true;
         			equipmentCheckedArr1 = [];
         			equipmentCheckedArr2 = [];
         			$newEquipmentPopup.css('width','450px');
         			$newEquipmentPopup.find('input[type=text]').not($newEquipmentPopup.find('.textbox.combo input[type=text]')).val('');
         			$newEquipmentPopup.find('select').val('0'); // 初始化select
         			$('#unitId').val('1');
         			$(".newEquipment-wrapper input[name='isCycle'],.newEquipment-wrapper input[name='photo'],.newEquipment-wrapper input[name='isTest']").prop('checked',false).parents('a').removeClass('radio-checked');
         			$(".newEquipment-wrapper input[name='isCycle']").eq(0).prop('checked',true).parents('a').addClass('radio-checked');
         			$(".newEquipment-wrapper input[name='photo']").eq(1).prop('checked',true).parents('a').addClass('radio-checked');
         			$(".newEquipment-wrapper input[name='isTest']").eq(1).prop('checked',true).parents('a').addClass('radio-checked');
         			$newEquipmentPopup.find('.w-e-text').html(''); // 清空富文本
         			$newEquipmentPopup.find('.submit').removeClass('submit-show');
         			$newEquipmentPopup.find('.submit:nth-of-type(2)').addClass('submit-show');
         			$newEquipmentPopup.find('.content-step').css('height','0');
         			$newEquipmentPopup.find('.content-step:nth-of-type(1)').css('height','auto');
         			$('.equipment-allData1').trigger('click');
         			$('.equipment-allData2').trigger('click');
         			$.ajax({
         				type:"post",
         				url:"getEnum",
         				dataType:"json",
         				success:function(data){
         					$("#etname").select2({
         						data:data.name
         					})
         					$("#etbrand").select2({
         						data:data.brand
         					})
         					$("#etmodel").select2({
         						data:data.model
         					})
         					$("#pname").select2({
         						data:data.pname
         					})
         					$("#mname").select2({
         						data:data.mname
         					})
         					//设置不默认选中
         					$("#etname").val("").select2({
         						placeholder: '请选择模板名称',
         						allowClear: true,
         						language: "zh-CN"
         					});
         					$("#etbrand").val("").select2({
         						placeholder: '请选择模板品牌',
         						allowClear: true,
         						language: "zh-CN"
         					});
         					$("#etmodel").val("").select2({
         						placeholder: '请选择模板型号',
         						allowClear: true,
         						language: "zh-CN"
         					});
         					$("#pname").val("").select2({
         						placeholder: '请选择模板名称',
         						allowClear: true,
         						language: "zh-CN"
         					});
         					$("#mname").val("").select2({
         						placeholder: '请选择模板名称',
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
         				}
         			});
         			// 初始化设备模板表格
         			$('#equipment-table').datagrid({
         				url: "getEquipTemp",
         				queryParams : {
         					name:"",
         					brand:"",
         					model:"",
         					supplierId : 0
         				},
         				fit: true,
         				fitColumns: true,
//         				rownumbers: true, // 显示行号列
         				singleSelect: true,
         				scrollbarSize: 6,
         				onSelect: function (index,row) {
         					equipmentCheckedArr1 = [];
         					equipmentCheckedArr1.push(row);
         				},
         				columns: [
         					[
         						{
         							field: "id",
         							hidden: true,
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
         							align : 'center'
         						},
         						{
         							field: 'brand',
         							title: '品牌',
         							width: 100,
         							align : 'center'
         						},
         						{
         							field: 'model',
         							title: '型号',
         							width: 100,
         							align : 'center'
         						},
         						{
         							field: 'supplier',
         							title: '供货商',
         							width: 100,
         							align : 'center'
         						},
         						]
         					],
         					onLoadSuccess:function(data){
         						$(".equipment-allData1").text("共"+data.total+"条数据");
         					}
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
         				$("#equipment-table").datagrid({
         					url : "getEquipTemp",
         					queryParams : {
         						name:name,
         						brand:brand,
         						model:model,
         						supplierId : $("#supplier").val()
         					},
         					onBeforeLoad : function(param){
         						$('.equipment-allData1').trigger('click');
         					},
         					onLoadSuccess:function(data){
         						$(".equipment-allData1").text("共"+data.total+"条数据");
         						var rows = $('#equipment-table').datagrid("getRows");
         						//循环数据找出列表中ID和需要选中数据的ID相等的数据并选中
         						for(var i=0;i<rows.length;i++){
         							var rowId = rows[i].id;
         							if(equipmentCheckedArr1.length > 0){
         								if(rowId == equipmentCheckedArr1[0].id){
         									var index = $("#equipment-table").datagrid("getRowIndex",rows[i])
         									$("#equipment-table").datagrid("checkRow",index);
         								}
         							}
         						}
         					}
         				});
         			});
         			// 初始化设备所需备件表格
         			$('#equipment-table2').datagrid({
         				url: "getPartAndMedicine",
         				queryParams : {
         					pname:"",
         					mname:""
         				},
         				fit: true,
         				fitColumns: true,
         				rownumbers: true, // 显示行号列
         				singleSelect: false,
         				scrollbarSize: 6,
         				onCheck: function (index,row) {
         					if(JSON.stringify(equipmentCheckedArr2).indexOf(JSON.stringify(row))==-1){
         						equipmentCheckedArr2.push(row);
         					}
         					$('.equipment-add-data').html(equipmentCheckedArr2.length);
         				},
         				onUncheck: function(index,row){
         					equipmentCheckedArr2.remove(row);
         					$('.equipment-add-data').html(equipmentCheckedArr2.length);
         				},
         				onCheckAll: function (rows) {
         					for (var i = 0; i < rows.length; i++) {
         						var index = equipmentCheckedArr2.indexOf(rows[i]);
         						(index == -1) && (equipmentCheckedArr2.push(rows[i]));
         					}
         					console.log(equipmentCheckedArr2)
         					$('.equipment-add-data').html(equipmentCheckedArr2.length);
         				},
         				onUncheckAll: function (rows) {
         					for (var j = 0; j < rows.length; j++) {
         						var index = equipmentCheckedArr2.indexOf(rows[j]);
         						(index != -1) && (equipmentCheckedArr2.remove(rows[j]));// 存在的数据从数组中删除
         					}
         					$('.equipment-add-data').html(equipmentCheckedArr2.length);
         				},
         				columns: [
         					[
         						{
         							field: "id",
         							hidden: true,
         						},
         						{
         							field: 'checkbox',
         							title: '多选',
         							checkbox: true,
         							width: 100,
         						},
         						{
         							field: 'name',
         							title: '设备模板名称',
         							width: 100,
         							align : 'center'
         						},
         						{
         							field: 'brand',
         							title: '品牌',
         							width: 100,
         							align : 'center'
         						},
         						{
         							field: 'model',
         							title: '型号',
         							width: 100,
         							align : 'center'
         						},
         						{
         							field: 'supplier',
         							title: '供货商',
         							width: 100,
         							align : 'center'
         						},
         						]
         					],
         					onLoadSuccess:function(data){
         						$(".equipment-allData2").text("共"+data.total+"条数据");
         					}
         			});
         			$("#pname,#mname").on("change",function(){
         				var pname = "";
         				var mname = "";
         				if($("#pname").select2("data") != ""){
         					pname = $("#pname").select2("data")[0].text;
         				}
         				if($("#mname").select2("data") != ""){
         					mname = $("#mname").select2("data")[0].text;
         				}
         				$('#equipment-table2').datagrid({
         					url: "getPartAndMedicine",
         					queryParams : {
         						pname:pname,
         						mname:mname
         					},
         					onBeforeLoad:function(param){
         						$('.equipment-allData2').trigger('click');
         					},
         					onLoadSuccess:function(data){
         						$(".equipment-allData2").text("共"+data.total+"条数据");
         						var rows = $('#equipment-table2').datagrid("getRows");
         						//循环数据找出列表中ID和需要选中数据的ID相等的数据并选中
         						for(var i=0;i<rows.length;i++){
         							var rowId = rows[i].ID;
         							if(equipmentCheckedArr2.length > 0){
         								for(var j=0; j<equipmentCheckedArr2.length; j++){
         									if(rowId == equipmentCheckedArr2[j].ID){
         										var index = $("#equipment-table2").datagrid("getRowIndex",rows[i])
         										$("#equipment-table2").datagrid("checkRow",index);
         									}
         								}
         							}
         						}
         					}
         				});
         			});
         		}
			}
    	});
    });
    // 新建设备弹窗下一步
    $('.equipment-next').on('click',function () {
        var $popup = $(this).parents('.popup');
        var $divNode = $popup.find('.content-step').eq(equipmentIndex);
        var divValue =  false; // 为true满足下一步条件
        var inputValue = false; // 工种至少填一个
        var $input = $('.equipment-input'); // 工种input
        // 基础信息
        if(equipmentIndex == 0){
            $('.equipment-allData1').trigger('click');
            divValue = $divNode.form('enableValidation').form('validate');
            $input.each(function (index,node) {
               if(node.value != ''){
                   inputValue = true ;
                   return false;
               }
            });
            if(!inputValue){
                new CustomPrompt({
                    type: 'default',
                    msg: '工种至少填一种!'
                });
            }
            if(divValue && inputValue){
                $popup.find('.submit:nth-of-type(1)').addClass('submit-show');
                $newEquipmentPopup.css('width','750px');
                $divNode.css('height', 0);
                equipmentIndex++;
                $popup.find('.content-step').eq(equipmentIndex).css('height', 'auto');
                if(nextState){
                    $popup.find('#equipment-table').datagrid('resize');
                    nextState = false;
                }
            }
            return false;
        }
        // 设备模板
        if(equipmentIndex == 1){
            $('.equipment-allData2').trigger('click');
            if(equipmentCheckedArr1.length > 0){
                $divNode.css('height', 0);
                equipmentIndex++;
                $popup.find('.content-step').eq(equipmentIndex).css('height', 'auto');
                $('#equipment-table2').datagrid('resize');
                $('.equipment-checkedData1').trigger('click');
            }else {
                new CustomPrompt({
                    type: 'default',
                    msg: '至少选择一条数据'
                });
            }
            return false;
        }
        // 所需备件
        if(equipmentIndex == 2){
            equipmentCheckedClick == true ? $('.equipment-checkedData2').trigger('click') : $('.equipment-allData2').trigger('click');
            if(equipmentCheckedArr2.length > 0){
                $divNode.css('height', 0);
                equipmentIndex++;
                $popup.find('.content-step').eq(equipmentIndex).css('height', 'auto');
                $popup.find('.submit:nth-of-type(2)').removeClass('submit-show');
                $popup.find('.submit:nth-of-type(3)').addClass('submit-show');
                $('.equipment-checkedData2').trigger('click');
            }else {
                new CustomPrompt({
                    type: 'default',
                    msg: '至少选择一条数据'
                });
                $('.equipment-allData2').trigger('click');
            }
            return false;
        }
    });
    // 新建设备弹窗上一步
    $('.equipment-prev').on('click',function () {
        var $popup = $(this).parents('.popup');
        var $divNode = $popup.find('.content-step').eq(equipmentIndex);
        // 设备模板
        if(equipmentIndex == 1){
            $newEquipmentPopup.css('width','450px');
            $popup.find('.submit:nth-of-type(1)').removeClass('submit-show');
            $popup.find('.submit:nth-of-type(2)').addClass('submit-show');

        }else if(equipmentIndex == 2){
        	$('.equipment-allData1').trigger('click');
        }else if(equipmentIndex == 3){
        	$('.equipment-allData2').trigger('click');
        }
        $divNode.css('height', 0);
        equipmentIndex--;
        $popup.find('.content-step').eq(equipmentIndex).css('height', 'auto');
        $popup.find('.submit:nth-of-type(2)').addClass('submit-show');
        $popup.find('.submit:nth-of-type(3)').removeClass('submit-show');

    });
    // 新建设备弹窗(设备模板已选)
    $('.equipment-checkedData1').on('click',function () {
        $(this).addClass('data-checked');
        $(this).prev('span').removeClass('data-checked');
        var $content = $(this).parents('.content-item');
        $content.find('.table-div').hide();
        $content.find('.table-div-checked').show();
        $('#equipment-table-checked').datagrid({
            fit: true,
            fitColumns: true,
            rownumbers: true, // 显示行号列
            // singleSelect: true,
            scrollbarSize: 6,
            onSelect: function(index,row){
              equipmentCheckedArr1.push(row);
            },
            onUnselect: function(index,row){
                equipmentCheckedArr1 = [];
            },
            columns: [
                [
                    {
                        field: "id",
                        hidden: true,
                    },
                    {
                        field: 'checkbox',
                        title: '多选',
                        checkbox: true,
                        width: 100,
                    },
                    {
                        field: 'name',
                        title: '设备模板名称',
                        width: 100,
                        align:true
                    },
                    {
                        field: 'brand',
                        title: '品牌',
                        width: 100,
                        align:true
                    },
                    {
                        field: 'model',
                        title: '型号',
                        width: 100,
                        align:true
                    },
                    {
                        field: 'supplier',
                        title: '供货商',
                        width: 100,
                        align:true
                    },
                ]
            ]
        });
        (equipmentCheckedArr1.length > 0) && $('#equipment-table-checked').datagrid('loadData', equipmentCheckedArr1);
        
        $('#equipment-table-checked').datagrid('selectAll');
        $content.find('.table-div-checked input[type=checkbox]').eq(0).hide();
    });
    // 新建设备弹窗全选
    $('.equipment-allData1').on('click',function () {
        var $content = $(this).parents('.content-item');
        $(this).addClass('data-checked');
        $(this).next('span').removeClass('data-checked');
        $content.find('.table-div').show();
        $content.find('.table-div-checked').hide();
        // 全部数据中的选中数据
        if(equipmentCheckedArr1.length == 0){
            $content.find('.table-div input[type=checkbox]').prop('checked',false)
        }
    });
    // 新建设备弹窗(所需备件已选)
    $('.equipment-checkedData2').on('click',function () {
        var $content = $(this).parents('.content-item');
        equipmentCheckedClick = false;
        $(this).addClass('data-checked');
        $(this).prev('span').removeClass('data-checked');
        $content.find('.table-div').hide();
        $content.find('.table-div-checked').show();
        $('#equipment-table-checked2').datagrid({
            fit: true,
            fitColumns: true,
            rownumbers: true, // 显示行号列
            scrollbarSize: 6,
            singleSelect: false,
            onCheck: function (index, row) {
                var num = 0;
                cancelDataArr1.remove(row);
                num = equipmentCheckedArr2.length - cancelDataArr1.length;
                $('.equipment-add-data').html(num);
            },
            onCheckAll: function (rows) {
                cancelDataArr1 = [];
                $('.equipment-add-data').html(equipmentCheckedArr2.length);
            },
            onUncheckAll: function (rows) {
                cancelDataArr1 = rows;
                $('.equipment-add-data').html(0);
            },
            onUncheck: function (index, row) {
                var num = 0;
                var idx = cancelDataArr1.indexOf(row);
                (idx == -1) && (cancelDataArr1.push(row)); //不存在放在数组中
                num = equipmentCheckedArr2.length - cancelDataArr1.length;
                $('.equipment-add-data').html(num);
            },
            columns: [
                [
                    {
                        field: "id",
                        hidden: true,
                    },
                    {
                        field: 'checkbox',
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
                        title: '型号',
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
        $('#equipment-table-checked2').datagrid('loadData', equipmentCheckedArr2);
        $('#equipment-table-checked2').datagrid('selectAll');
        // $content.find('.table-div-checked input[type=checkbox]').eq(0).hide();
    });
    // 新建设备弹窗(所需备件全选)
    $('.equipment-allData2').on('click',function () {
        var $content = $(this).parents('.content-item');
        var tempArr = [];
        equipmentCheckedClick = true;
        $(this).addClass('data-checked');
        $(this).next('span').removeClass('data-checked');
        for (var l = 0; l < cancelDataArr1.length; l++) {
            tempArr.push(cancelDataArr1[l])
        }
        if (tempArr.length > 0) {
            for (var i = 0; i < equipmentCheckedArr2.length; i++) {
                for (var j = 0; j < tempArr.length; j++) {
                    if (equipmentCheckedArr2[i] == tempArr[j]) {
                        equipmentCheckedArr2.splice(i, 1);
                        i--;
                    }
                }
            }
            for (var k = 0; k < tempArr.length; k++) {
                var index = $('#equipment-table2').datagrid('getRowIndex', tempArr[k]);
                $('#equipment-table2').datagrid('uncheckRow', index);
            }
        }
        $content.find('.table-div').show();
        $content.find('.table-div-checked').hide();
    });
    // 新建设备弹窗提交
    equipmentSubmit.addEventListener('click',function () {
        var $editor = $(this).parents('.popup').find('.w-e-text');
        if($editor.html() != ''){
        	var obj = new Object();
        	obj.taskTypeId = $("#taskType").val();
        	obj.unitId = $("#unitId").val();
        	obj.cycle = $("#cycle").val();
        	obj.howLong = $("#howLong").val();
        	obj.isCycle = $('.equipment-form input[name="isCycle"]:checked ').val();
        	obj.isPhoto = $('.equipment-form input[name="photo"]:checked ').val();
        	obj.isTest = $('.equipment-form input[name="isTest"]:checked ').val();
        	obj.wt1 = $("#wt1").val();
        	obj.wt2 = $("#wt2").val();
        	obj.wt3 = $("#wt3").val();
        	obj.carTypeId = $("#carType").val();
        	obj.equipTempId = equipmentCheckedArr1[0].id;
        	var partArray = new Array();
        	for(var i=0; i<equipmentCheckedArr2.length; i++){
        		var obj1 = new Object();
        		obj1.id = equipmentCheckedArr2[i].id;
        		obj1.type = equipmentCheckedArr2[i].type;
        		partArray.push(obj1);
        	}
        	obj.parts = partArray;
        	obj.editor = $editor.html();
        	$("#addObj").val(JSON.stringify(obj));
            var options = {
                    success: function (data) {
                    	if(data == -1){
                    		new CustomPrompt({
                    			type: 'error',
                    			msg: '该任务周期已存在'
                    		});
                    	}else if(data > 1){
                    		new CustomPrompt({
                    			type: 'success',
                    			msg: '新建成功'
                    		});
                    		$newEquipmentPopup.fadeOut();
                    		$('.shade').fadeOut();
                    		$("#dg").datagrid("reload");
                    	}else{
                    		 new CustomPrompt({
                                 type: 'default',
                                 msg: '新建失败'
                             });
                    	}
                    }
                };
            $(".equipment-form").ajaxSubmit(options);
        }else {
            $editor.focus();
            new CustomPrompt({
                type: 'default',
                msg: '请输入操作说明!'
            });
        }
    });

    /*=========================新建部件任务弹窗=========================*/
    var $newPartPopup = $('.newPart-wrapper'); // 新建部件弹窗
    var newPart = document.querySelector('.new-part'); // 新建部件
    var partSubmit = document.querySelector('.part-submit'); // 提交
    var partCheckedClick = true; // 判断所需备件已选是否点击
    var partIndex = 0; // 步奏索引
    var partNextState = true; // 调整弹窗宽度
    var partCheckedArr1 = new Array(); // 存放设备模板已选的数据
    var partCheckedArr2 = new Array(); // 存放所需备件已选的数据
    var cancelDataArr2 = new Array(); // 存放所需备件已选的数据
    // 弹出新建部件弹窗,并初始化
    newPart.addEventListener('click',function () {
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
         			$('.newAdd-wrapper').fadeOut();
         			$newPartPopup.fadeIn();
         			partIndex = 0;
         			partNextState = true;
         			partCheckedArr1 = [];
         			partCheckedArr2 = [];
         			$newPartPopup.css('width','450px');
         			$newPartPopup.find('input[type=text]').not($newPartPopup.find('.textbox.combo input[type=text]')).val('');
//         			$newPartPopup.find('select').val('0'); // 初始化select
         			$('#unitId1').val('1');
         			$(".newPart-wrapper input[name='isCycle'],.newPart-wrapper input[name='photo'],.newPart-wrapper input[name='isTest']").prop('checked',false).parents('a').removeClass('radio-checked');
         			$(".newPart-wrapper input[name='isCycle']").eq(0).prop('checked',true).parents('a').addClass('radio-checked');
         			$(".newPart-wrapper input[name='photo']").eq(1).prop('checked',true).parents('a').addClass('radio-checked');
         			$(".newPart-wrapper input[name='isTest']").eq(1).prop('checked',true).parents('a').addClass('radio-checked');
         			$newPartPopup.find('.w-e-text').html(''); // 清空富文本
         			$newPartPopup.find('.submit').removeClass('submit-show');
         			$newPartPopup.find('.submit:nth-of-type(2)').addClass('submit-show');
         			$newPartPopup.find('.content-step').css('height','0');
         			$newPartPopup.find('.content-step:nth-of-type(1)').css('height','auto');
         			$('.part-allData1').trigger('click');
         			$('.part-allData2').trigger('click');
         			//加载部件模板名称、品牌、型号下拉框
         			$.ajax({
         				type:"post",
         				url:"getPartEnum",
         				dataType:"json",
         				success:function(data){
         					$("#etname1").select2({
         						data:data.name
         					})
         					$("#etbrand1").select2({
         						data:data.brand
         					})
         					$("#etmodel1").select2({
         						data:data.model
         					})
         					$("#pname1").select2({
         						data:data.name
         					})
         					$("#mname1").select2({
         						data:data.mname
         					})
         					//设置不默认选中
         					$("#etname1").val("").select2({
         						placeholder: '请选择模板名称',
         						allowClear: true,
         						language: "zh-CN"
         					});
         					$("#etbrand1").val("").select2({
         						placeholder: '请选择模板品牌',
         						allowClear: true,
         						language: "zh-CN"
         					});
         					$("#etmodel1").val("").select2({
         						placeholder: '请选择模板型号',
         						allowClear: true,
         						language: "zh-CN"
         					});
         					$("#pname1").val("").select2({
         						placeholder: '请选择模板名称',
         						allowClear: true,
         						language: "zh-CN"
         					});
         					$("#mname1").val("").select2({
         						placeholder: '请选择模板名称',
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
         					$("#supplier1").html(content1);
         				}
         			});
         			// 初始化部件模板表格
         			$('#part-table').datagrid({
         				url: "getPartTemp",
         				queryParams : {
         					name:"",
         					brand:"",
         					model:"",
         					supplierId : 0
         				},
         				fit: true,
         				fitColumns: true,
         				rownumbers: true, // 显示行号列
         				singleSelect: true,
         				scrollbarSize: 6,
         				onSelect: function (index,row) {
         					partCheckedArr1 = [];
         					partCheckedArr1.push(row);
         				},
         				columns: [
         					[
         						{
         							field: "id",
         							hidden: true,
         						},
         						{
         							field: 'checkbox',
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
         							title: '型号',
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
         						$(".part-allData1").text("共"+data.total+"条数据");
         					}
         			});
         			$("#etname1,#etbrand1,#etmodel1,#supplier1").on("change",function(){
         				var name = "";
         				var brand = "";
         				var model = "";
         				if($("#etname1").select2("data") != ""){
         					name = $("#etname1").select2("data")[0].text;
         				}
         				if($("#etbrand1").select2("data") != ""){
         					brand = $("#etbrand1").select2("data")[0].text;
         				}
         				if($("#etmodel1").select2("data") != ""){
         					model = $("#etmodel1").select2("data")[0].text;
         				}
         				$("#part-table").datagrid({
         					url : "getPartTemp",
         					queryParams : {
         						name:name,
         						brand:brand,
         						model:model,
         						supplierId : $("#supplier1").val()
         					},
         					onBeforeLoad : function(param){
         						$('.part-allData1').trigger('click');
         					},
         					onLoadSuccess:function(data){
         						$(".part-allData1").text("共"+data.total+"条数据");
         					}
         				});
         			});
         			// 初始化部件所需备件表格
         			$('#part-table2').datagrid({
         				url: "getPartAndMedicine",
         				queryParams : {
         					pname:"",
         					mname:""
         				},
         				fit: true,
         				fitColumns: true,
         				rownumbers: true, // 显示行号列
         				singleSelect: false,
         				scrollbarSize: 6,
         				onCheck: function (index,row) {
         					if(JSON.stringify(partCheckedArr2).indexOf(JSON.stringify(row))==-1){
         						partCheckedArr2.push(row);
         					}
         					$('.part-add-data').html(partCheckedArr2.length);
         				},
         				onUncheck: function(index,row){
         					partCheckedArr2.remove(row);
         					$('.part-add-data').html(partCheckedArr2.length);
         				},
         				onCheckAll: function (rows) {
         					for (var i = 0; i < rows.length; i++) {
         						var index = partCheckedArr2.indexOf(rows[i]);
         						(index == -1) && (partCheckedArr2.push(rows[i]));
         					}
         					$('.equipment-add-data').html(partCheckedArr2.length);
         				},
         				onUncheckAll: function (rows) {
         					for (var j = 0; j < rows.length; j++) {
         						var index = partCheckedArr2.indexOf(rows[j]);
         						(index != -1) && (partCheckedArr2.remove(rows[j]));// 存在的数据从数组中删除
         					}
         					$('.equipment-add-data').html(partCheckedArr2.length);
         				},
         				columns: [
         					[
         						{
         							field: "id",
         							hidden: true,
         						},
         						{
         							field: 'checkbox',
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
         							title: '型号',
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
         						$(".part-allData2").text("共"+data.total+"条数据");
         					}
         			});
         			//备品备件和药剂change事件
         			$("#pname1,#mname1").on("change",function(){
         				var pname = "";
         				var mname = "";
         				if($("#pname1").select2("data") != ""){
         					pname = $("#pname1").select2("data")[0].text;
         				}
         				if($("#mname1").select2("data") != ""){
         					mname = $("#mname1").select2("data")[0].text;
         				}
         				$('#part-table2').datagrid({
         					url: "getPartAndMedicine",
         					queryParams : {
         						pname:pname,
         						mname:mname
         					},
         					onBeforeLoad : function(param){
         						$('.part-allData2').trigger('click');
         					},
         					onLoadSuccess:function(data){
         						$(".part-allData2").text("共"+data.total+"条数据");
         						var rows = $('#part-table2').datagrid("getRows");
         						//循环数据找出列表中ID和需要选中数据的ID相等的数据并选中
         						for(var i=0;i<rows.length;i++){
         							var rowId = rows[i].ID;
         							if(equipmentCheckedArr2.length > 0){
         								for(var j=0; j<equipmentCheckedArr2.length; j++){
         									if(rowId == equipmentCheckedArr2[j].ID){
         										var index = $("#part-table2").datagrid("getRowIndex",rows[i])
         										$("#part-table2").datagrid("checkRow",index);
         									}
         								}
         							}
         						}
         					}
         				});
         			});
         		}
			}
    	});
    });
    // 新建部件弹窗下一步
    $('.part-next').on('click',function () {
        var $popup = $(this).parents('.popup');
        var $divNode = $popup.find('.content-step').eq(partIndex);
        var divValue =  false; // 为true满足下一步条件
        var inputValue = false;
        var $input = $('.part-input');
        // 基础信息
        if(partIndex == 0){
            $('.part-allData1').trigger('click');
            divValue = $divNode.form('enableValidation').form('validate');
            $input.each(function (index,node) {
                if(node.value != ''){
                    inputValue = true ;
                    return false;
                }
            });
            if(!inputValue){
                new CustomPrompt({
                    type: 'default',
                    msg: '工种至少填一种!'
                });
            }
            if(divValue && inputValue){
                $popup.find('.submit:nth-of-type(1)').addClass('submit-show');
                $newPartPopup.css('width','750px');
                $divNode.css('height', 0);
                partIndex++;
                $popup.find('.content-step').eq(partIndex).css('height', 'auto');
                if(partNextState){
                    $popup.find('#part-table').datagrid('resize');
                    partNextState = false;
                }
            }
            return false;
        }
        // 部件模板
        if(partIndex == 1){
            $('.part-allData2').trigger('click');
            if(partCheckedArr1.length > 0){
                $divNode.css('height', 0);
                partIndex++;
                $popup.find('.content-step').eq(partIndex).css('height', 'auto');
                $('#part-table2').datagrid('resize');
                $('.part-checkedData1').trigger('click');
            }else {
                new CustomPrompt({
                    type: 'default',
                    msg: '至少选择一条数据'
                });
            }
            return false;
        }
        // 所需备件
        if(partIndex == 2){
            partCheckedClick == true ? $('.part-checkedData2').trigger('click') : $('.part-allData2').trigger('click');
            if(partCheckedArr2.length > 0){
                $divNode.css('height', 0);
                partIndex++;
                $popup.find('.content-step').eq(partIndex).css('height', 'auto');
                $popup.find('.submit:nth-of-type(2)').removeClass('submit-show');
                $popup.find('.submit:nth-of-type(3)').addClass('submit-show');
                $('.part-checkedData2').trigger('click')
            }else {
                new CustomPrompt({
                    type: 'default',
                    msg: '至少选择一条数据'
                });
                $('.part-allData2').trigger('click');
            }
            return false;
        }
    });
    // 新建部件弹窗上一步
    $('.part-prev').on('click',function () {
        var $popup = $(this).parents('.popup');
        var $divNode = $popup.find('.content-step').eq(partIndex);
        // 设备模板
        if(partIndex == 1){
            $newPartPopup.css('width','450px');
            $popup.find('.submit:nth-of-type(1)').removeClass('submit-show');
            $popup.find('.submit:nth-of-type(2)').addClass('submit-show');

        }else if(partIndex == 2){
        	$('.part-allData1').trigger('click');
        }else if(partIndex == 3){
        	$('.part-allData2').trigger('click');
        }
        $divNode.css('height', 0);
        partIndex--;
        $popup.find('.content-step').eq(partIndex).css('height', 'auto');
        $popup.find('.submit:nth-of-type(2)').addClass('submit-show');
        $popup.find('.submit:nth-of-type(3)').removeClass('submit-show');

    });
    // 新建部件弹窗(设备模板已选)
    $('.part-checkedData1').on('click',function () {
        $(this).addClass('data-checked');
        $(this).prev('span').removeClass('data-checked');
        var $content = $(this).parents('.content-item');
        $content.find('.table-div').hide();
        $content.find('.table-div-checked').show();
        $('#part-table-checked').datagrid({
            fit: true,
            fitColumns: true,
            rownumbers: true, // 显示行号列
            // singleSelect: true,
            scrollbarSize: 6,
            onSelect: function(index,row){
                partCheckedArr1.push(row);
            },
            onUnselect: function(index,row){
                partCheckedArr1 = [];
            },
            columns: [
                [
                    {
                        field: "id",
                        hidden: true,
                    },
                    {
                        field: 'checkbox',
                        title: '多选',
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
                        title: '型号',
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
        $('#part-table-checked').datagrid('loadData', partCheckedArr1);
        $('#part-table-checked').datagrid('selectAll');
        $content.find('.table-div-checked input[type=checkbox]').eq(0).hide();
    });
    // 新建部件弹窗全选
    $('.part-allData1').on('click',function () {
        $(this).addClass('data-checked');
        $(this).next('span').removeClass('data-checked');
        var $content = $(this).parents('.content-item');
        $content.find('.table-div').show();
        $content.find('.table-div-checked').hide();
        // 全部数据中的选中数据
        if(partCheckedArr1.length == 0){
            $content.find('.table-div input[type=checkbox]').prop('checked',false)
        }
    });
    // 新建部件弹窗(所需备件已选)
    $('.part-checkedData2').on('click',function () {
        var $content = $(this).parents('.content-item');
        partCheckedClick = false;
        $(this).addClass('data-checked');
        $(this).prev('span').removeClass('data-checked');
        $content.find('.table-div').hide();
        $content.find('.table-div-checked').show();
        $('#part-table-checked2').datagrid({
            fit: true,
            fitColumns: true,
            rownumbers: true, // 显示行号列
            scrollbarSize: 6,
            singleSelect: false,
            onCheck: function (index, row) {
                var num = 0;
                cancelDataArr2.remove(row);
                num = partCheckedArr2.length - cancelDataArr2.length;
                $('.part-add-data').html(num);
            },
            onCheckAll: function (rows) {
                cancelDataArr2 = [];
                $('.part-add-data').html(partCheckedArr2.length);
            },
            onUncheckAll: function (rows) {
                cancelDataArr2 = rows;
                $('.part-add-data').html(0);
            },
            onUncheck: function (index, row) {
                var num = 0;
                var idx = cancelDataArr2.indexOf(row);
                (idx == -1) && (cancelDataArr2.push(row)); //不存在放在数组中
                num = partCheckedArr2.length - cancelDataArr2.length;
                $('.part-add-data').html(num);
            },
            columns: [
                [
                    {
                        field: "id",
                        hidden: true,
                    },
                    {
                        field: 'checkbox',
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
                        title: '型号',
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
        $('#part-table-checked2').datagrid('loadData', partCheckedArr2);
        $('#part-table-checked2').datagrid('selectAll');
    });
    // 新建部件弹窗(所需备件全选)
    $('.part-allData2').on('click',function () {
        var $content = $(this).parents('.content-item');
        var tempArr = [];
        partCheckedClick = true;
        $(this).addClass('data-checked');
        $(this).next('span').removeClass('data-checked');
        for (var l = 0; l < cancelDataArr2.length; l++) {
            tempArr.push(cancelDataArr2[l])
        }
        if (tempArr.length > 0) {
            for (var i = 0; i < partCheckedArr2.length; i++) {
                for (var j = 0; j < tempArr.length; j++) {
                    if (partCheckedArr2[i] == tempArr[j]) {
                        partCheckedArr2.splice(i, 1);
                        i--;
                    }
                }
            }
            for (var k = 0; k < tempArr.length; k++) {
                var index = $('#part-table2').datagrid('getRowIndex', tempArr[k]);
                $('#part-table2').datagrid('uncheckRow', index);
            }
        }
        $content.find('.table-div').show();
        $content.find('.table-div-checked').hide();
    });
    // 新建部件弹窗提交
    partSubmit.addEventListener('click',function () {
        var $editor = $(this).parents('.popup').find('.w-e-text');
        if($editor.html() != ''){
        	var obj = new Object();
        	obj.taskTypeId = $("#taskType1").val();
        	obj.unitId = $("#unitId1").val();
        	obj.cycle = $("#cycle1").val();
        	obj.howLong = $("#howLong").val();
        	obj.isCycle = $('.part-form input[name="isCycle"]:checked ').val();
        	obj.isPhoto = $('.part-form input[name="photo"]:checked ').val();
        	obj.isTest = $('.part-form input[name="isTest"]:checked ').val();
        	obj.wt1 = $("#wt11").val();
        	obj.wt2 = $("#wt12").val();
        	obj.wt3 = $("#wt13").val();
        	obj.carTypeId = $("#carType1").val();
        	obj.partTempId = partCheckedArr1[0].id;
        	var partArray = new Array();
        	for(var i=0; i<partCheckedArr2.length; i++){
        		var obj1 = new Object();
        		obj1.id = partCheckedArr2[i].id;
        		obj1.type = partCheckedArr2[i].type;
        		partArray.push(obj1);
        	}
        	obj.parts = partArray;
        	obj.editor = $editor.html();
        	$("#addObj1").val(JSON.stringify(obj));
            var options = {
                    success: function (data) {
                    	if(data == -1){
                    		new CustomPrompt({
                    			type: 'error',
                    			msg: '该任务周期已存在'
                    		});
                    	}else if(data > 1){
                    		new CustomPrompt({
                    			type: 'success',
                    			msg: '新建成功'
                    		});
                    		$('.shade').fadeOut();
                            $newPartPopup.fadeOut();
                    		$("#dg").datagrid("reload");
                    	}else{
                    		 new CustomPrompt({
                                 type: 'default',
                                 msg: '新建失败'
                             });
                    	}
                    }
                };
            $(".part-form").ajaxSubmit(options);
        }else {
            $editor.focus();
            new CustomPrompt({
                type: 'default',
                msg: '请输入操作说明!'
            });
        }
    });

    /*=========================编辑弹窗=========================*/
    var $editPopup = $('.edit-wrapper'); // 编辑部件弹窗
    var editSubmit = document.querySelector('.edit-submit'); // 提交
    var editNextState = true; // 调整弹窗宽度
    var editCheckedClick = true;
    // 编辑部件弹窗下一步
    $('.edit-next').on('click',function () {
//    	alert(editIndex);
        var $popup = $(this).parents('.popup');
        var $divNode = $popup.find('.content-step').eq(editIndex);
        var divValue =  false; // 为true满足下一步条件
        var inputValue = false;
        var $input = $('.edit-input');
        // 基础信息
        if(editIndex == 0){
            $('.edit-allData1').trigger('click');
            divValue = $divNode.form('enableValidation').form('validate');
            $input.each(function (index,node) {
                if(node.value != ''){
                    inputValue = true ;
                    return false;
                }
            });
            if(!inputValue){
                new CustomPrompt({
                    type: 'default',
                    msg: '工种至少填一种!'
                });
            }
            if(divValue && inputValue){
                $popup.find('.submit:nth-of-type(1)').addClass('submit-show');
                $editPopup.css('width','750px');
                $divNode.css('height', 0);
                editIndex++;
                $popup.find('.content-step').eq(editIndex).css('height', 'auto');
                if(editNextState){
                    $popup.find('#edit-table').datagrid('resize');
                    editNextState = false;
                }
            }
            return false;
        }
        // 设备模板
        if(editIndex == 1){
        	
            $('.edit-allData2').trigger('click');
            if(editCheckedArr1.length > 0){
                $divNode.css('height', 0);
                editIndex++;
                $popup.find('.content-step').eq(editIndex).css('height', 'auto');
                $('#edit-table2').datagrid('resize');
                $('.edit-checkedData1').trigger('click');
            }else {
                new CustomPrompt({
                    type: 'default',
                    msg: '至少选择一条数据'
                });
            }
            return false;
        }
        // 所需备件
        if(editIndex == 2){
            editCheckedClick == true ? $('.edit-checkedData2').trigger('click') : $('.edit-allData2').trigger('click');
            if(editCheckedArr2.length > 0){
                $divNode.css('height', 0);
                editIndex++;
                $popup.find('.content-step').eq(editIndex).css('height', 'auto');
                $popup.find('.submit:nth-of-type(2)').removeClass('submit-show');
                $popup.find('.submit:nth-of-type(3)').addClass('submit-show');
                $('.edit-checkedData2').trigger('click');
            }else {
                new CustomPrompt({
                    type: 'default',
                    msg: '至少选择一条数据'
                });
                $('.edit-allData2').trigger('click');
            }
            return false;
        }
    });
    // 编辑部件弹窗上一步
    $('.edit-prev').on('click',function () {
        var $popup = $(this).parents('.popup');
        var $divNode = $popup.find('.content-step').eq(editIndex);
        // 设备模板
        if(editIndex == 1){
            $editPopup.css('width','450px');
            $popup.find('.submit:nth-of-type(1)').removeClass('submit-show');
            $popup.find('.submit:nth-of-type(2)').addClass('submit-show');

        }else if(editIndex == 2){
        	$(".edit-allData1").trigger("click");
        }else if(editIndex == 3){
        	$(".edit-allData2").trigger("click");
        }
        $divNode.css('height', 0);
        editIndex--;
        $popup.find('.content-step').eq(editIndex).css('height', 'auto');
        $popup.find('.submit:nth-of-type(2)').addClass('submit-show');
        $popup.find('.submit:nth-of-type(3)').removeClass('submit-show');

    });
    // 编辑部件弹窗(设备模板已选)
    $('.edit-checkedData1').on('click',function () {
        $(this).addClass('data-checked');
        $(this).prev('span').removeClass('data-checked');
        var $content = $(this).parents('.content-item');
        $content.find('.table-div').hide();
        $content.find('.table-div-checked').show();
        $('#edit-table-checked').datagrid({
            fit: true,
            fitColumns: true,
            rownumbers: true, // 显示行号列
            // singleSelect: true,
            scrollbarSize: 6,
            onSelect: function(index,row){
                editCheckedArr1.push(row);
            },
            onUnselect: function(index,row){
                editCheckedArr1 = [];
            },
            columns: [
                [
                    {
                        field: "id",
                        hidden: true,
                    },
                    {
                        field: 'checkbox',
                        title: '多选',
                        checkbox: true,
                        width: 100,
                    },
                    {
                        field: 'name',
                        title: '设备模板名称',
                        width: 100,
                        align: 'center'
                    },
                    {
                        field: 'brand',
                        title: '品牌',
                        width: 100,
                        align: 'center'
                    },
                    {
                        field: 'model',
                        title: '型号',
                        width: 100,
                        align: 'center'
                    },
                    {
                        field: 'supplier',
                        title: '供货商',
                        width: 100,
                        align: 'center'
                    },
                ]
            ]
        });
        $('#edit-table-checked').datagrid('loadData', editCheckedArr1);
        $('#edit-table-checked').datagrid('selectAll');
        $content.find('.table-div-checked input[type=checkbox]').eq(0).hide();
    });
    // 编辑部件弹窗全选
    $('.edit-allData1').on('click',function () {
        $(this).addClass('data-checked');
        $(this).next('span').removeClass('data-checked');
        var $content = $(this).parents('.content-item');
        $content.find('.table-div').show();
        $content.find('.table-div-checked').hide();
        // 全部数据中的选中数据
        if(editCheckedArr1.length == 0){
            $content.find('.table-div input[type=checkbox]').prop('checked',false)
        }
    });
    // 编辑部件弹窗(所需备件已选)
    $('.edit-checkedData2').on('click',function () {
        editCheckedClick = false;
        $(this).addClass('data-checked');
        $(this).prev('span').removeClass('data-checked');
        var $content = $(this).parents('.content-item');
        $content.find('.table-div').hide();
        $content.find('.table-div-checked').show();
        $('#edit-table-checked2').datagrid({
            fit: true,
            fitColumns: true,
            rownumbers: true, // 显示行号列
            scrollbarSize: 6,
            singleSelect: false,
            onCheck: function (index, row) {
                var num = 0;
                editCheckedArr2.remove(row);
                num = editCheckedArr2.length - cancelDataArr3.length;
                $('.edit-add-data').html(num);
            },
            onCheckAll: function (rows) {
                cancelDataArr3 = [];
                $('.edit-add-data').html(editCheckedArr2.length);
            },
            onUncheckAll: function (rows) {
                cancelDataArr3 = rows;
                $('.edit-add-data').html(0);
            },
            onUncheck: function (index, row) {
                var num = 0;
                var idx = cancelDataArr3.indexOf(row);
                (idx == -1) && (cancelDataArr3.push(row)); //不存在放在数组中
                num = editCheckedArr2.length - cancelDataArr3.length;
                $('.edit-add-data').html(num);
            },
            columns: [
                [
                    {
                        field: "id",
                        hidden: true,
                    },
                    {
                        field: 'checkbox',
                        title: '单选',
                        checkbox: true,
                        width: 100,
                    },
                    {
                        field: 'name',
                        title: '设备模板名称',
                        width: 100,
                        align: 'center'
                    },
                    {
                        field: 'brand',
                        title: '品牌',
                        width: 100,
                        align: 'center'
                    },
                    {
                        field: 'model',
                        title: '型号',
                        width: 100,
                        align: 'center'
                    },
                    {
                        field: 'supplier',
                        title: '供货商',
                        width: 100,
                        align: 'center'
                    },
                ]
            ]
        });
        $('#edit-table-checked2').datagrid('loadData', editCheckedArr2);
        $('#edit-table-checked2').datagrid('selectAll');
    });
    // 编辑部件弹窗(所需备件全选)
    $('.edit-allData2').on('click',function () {
        var $content = $(this).parents('.content-item');
        var tempArr = [];
        editCheckedClick = true;
        for (var l = 0; l < cancelDataArr3.length; l++) {
            tempArr.push(cancelDataArr3[l])
        }
        if (tempArr.length > 0) {
            for (var i = 0; i < editCheckedArr2.length; i++) {
                for (var j = 0; j < tempArr.length; j++) {
                    if (editCheckedArr2[i] == tempArr[j]) {
                        editCheckedArr2.splice(i, 1);
                        i--;
                    }
                }
            }
            for (var k = 0; k < tempArr.length; k++) {
                var index = $('#edit-table2').datagrid('getRowIndex', tempArr[k]);
                $('#edit-table2').datagrid('uncheckRow', index);
            }
        }
        $(this).addClass('data-checked');
        $(this).next('span').removeClass('data-checked');
        $content.find('.table-div').show();
        $content.find('.table-div-checked').hide();

    });
    // 编辑部件弹窗提交
    editSubmit.addEventListener('click',function () {
    	var $editor = $(this).parents('.popup').find('.w-e-text');
        if($editor.html() != ''){
        	var obj = new Object();
        	obj.id = tcId;
        	obj.type = tId;
        	obj.taskTypeId = $("#etaskType").val();
        	obj.unitId = $("#eunitId").val();
        	obj.cycle = $("#ecycle").val();
        	obj.howLong = $("#howLong").val();
        	obj.isCycle = $('.edit-form input[name="isCycle"]:checked ').val();
        	obj.isPhoto = $('.edit-form input[name="photo"]:checked ').val();
        	obj.isTest = $('.edit-form input[name="isTest"]:checked ').val();
        	obj.wt1 = $("#ewt1").val();
        	obj.wt2 = $("#ewt2").val();
        	obj.wt3 = $("#ewt3").val();
        	obj.carTypeId = $("#ecarType").val();
        	obj.tempId = editCheckedArr1[0].id;
        	var partArray = new Array();
        	for(var i=0; i<editCheckedArr2.length; i++){
        		var obj1 = new Object();
        		obj1.id = editCheckedArr2[i].id;
        		obj1.type = editCheckedArr2[i].type;
        		partArray.push(obj1);
        	}
        	obj.parts = partArray;
        	obj.editor = $editor.html();
        	$("#editObj").val(JSON.stringify(obj));
            var options = {
                    success: function (data) {
                    	if(data == -1){
                    		new CustomPrompt({
                    			type: 'error',
                    			msg: '该任务周期已存在'
                    		});
                    	}else if(data == 1){
                    		new CustomPrompt({
                    			type: 'success',
                    			msg: '修改成功'
                    		});
                    		editIndex = 0;
                    		$editPopup.fadeOut();
                    		$('.shade').fadeOut();
//                    		$("#dg").datagrid("reload");
                    	}else{
                    		 new CustomPrompt({
                                 type: 'default',
                                 msg: '修改失败'
                             });
                    	}
                    }
                };
            $(".edit-form").ajaxSubmit(options);
        }else {
            $editor.focus();
            new CustomPrompt({
                type: 'default',
                msg: '请输入操作说明!'
            });
        }
        
    });

});
//function aaa(file){
//	var $editor = $(".equipment-submit").parents('.popup').find('.w-e-text');
//	var edit = $editor.html();
//	console.log(edit+"<a href='www.baidu.com'></a>");
//	var a = edit+"<video controls='autoplay'>" +
//			"<source src='http://video.699pic.com/videos/38/02/54/D2CmipaD9zWn1522380254.mp4' type='video/mp4'></video>";
//	$editor.html(a)
//}
var tcId;
var tId;
/*=========================其它=========================*/
// 删easyUi 验证
$.extend($.fn.validatebox.methods, {
    remove: function(jq, newposition){
        return jq.each(function(){
            $(this).removeClass("validatebox-text validatebox-invalid").unbind('focus.validatebox').unbind('blur.validatebox');
        });
    },
    reduce: function(jq, newposition){
        return jq.each(function(){
            var opt = $(this).data().validatebox.options;
            $(this).addClass("validatebox-text").validatebox(opt);
        });
    }
});

// 删除数组指定元素
Array.prototype.indexNum = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            return i;
        }
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexNum(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

// 打开删除弹窗
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
     			tcId = id;
     			$('.shade, .delete-wrapper').fadeIn();
     		}
		}
	});
}

// 打开设备模板/部件模板详情
function equipmentOpen() {
    $('.shade, .equipment-detail-wrapper').fadeIn();
    $('#equipment-detail-table').datagrid({
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'A',
                    title: '设备模板名称',
                    width: 150,
                    align:'center'
                },
                {
                    field: 'B',
                    title: '品牌',
                    width: 100,
                    align:'center'
                },
                {
                    field: 'C',
                    title: '规格型号',
                    width: 200,
                    align:'center'
                },
                {
                    field: 'D',
                    title: '供货商',
                    width: 100,
                    align:'center'
                },

            ]
        ]
    })
}
// 打开工种详情
function workOpen(id) {
    $('.shade, .work-detail-wrapper').fadeIn();
    $.ajax({
    	type:"post",
    	url:"getWorkTypeByTcId",
    	data:"tcId="+id,
    	dataType:"json",
    	success:function(data){
    		var content = "<tr><td>类型</td><td>数量</td></tr>";
    		if(data.length > 0){
    			for(var i=0; i<data.length; i++){
    				content += "<tr><td>"+data[i].type+"</td><td>"+data[i].num+"</td></tr>";
    			}
    		}
    		$(".work-detail-table").html(content);
    	}
    });
//    $('#equipment-detail-table').datagrid()
}

// 打开所需备件详情
function partOpen(id) {
    $('.shade, .part-detail-wrapper').fadeIn();
    $('#part-detail-table').datagrid({
    	url: "getPartsByTcId",
    	queryParams : {
				tcId : id
			},
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'type',
                    title: '类型',
                    width: 100,
                    align : 'center'
                },
                {
                    field: 'name',
                    title: '名称',
                    width: 100,
                    align : 'center'
                },
                {
                    field: 'num',
                    title: '数量',
                    width: 100,
                    align : 'center'
                },

            ]
        ],
        onLoadSuccess:function(data){
        	$("#totalPart").text(data.total)
        }
    })
}

// 打开操作说明详情
function explainOpen(id) {
    $('.shade, .explain-detail-wrapper').fadeIn();
    $.ajax({
    	type:"post",
    	url:"getOpstepByTcId",
    	data:"tcId="+id,
    	dataType:"json",
    	success:function(data){
    		$(".explain-detail-wrapper .content").html(data);
    	}
    });
}
// 判断元素是否存在数组
function isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}
// 打开编辑
var editCheckedArr1 = []; // 存放设备模板已选的数据
var editCheckedArr2 = []; // 存放所需备件已选的数据
var cancelDataArr3 = new Array(); // 存放已选数据表格取消的数据
function editOpen(id,typeId){  // 0:设备任务 1:部件任务
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
     			tcId = id;
     			tId = typeId;
     			var $editPopup = $('.edit-wrapper'); // 编辑部件弹窗
     			var editSubmit = document.querySelector('.edit-submit'); // 提交
//     			var editIndex = 0; // 步奏索引
     			var editNextState = true; // 调整弹窗宽度
     			var editCheckedClick = true;
     			editIndex = 0;
     			editNextState = true;
     			$editPopup.css('width','450px');
     			$editPopup.find('.submit').removeClass('submit-show');
     			$editPopup.find('.submit:nth-of-type(2)').addClass('submit-show');
     			$editPopup.find('.content-step').css('height','0');
     			$editPopup.find('.content-step:nth-of-type(1)').css('height','auto');
     			$('.edit-allData1').trigger('click');
     			$('.edit-allData2').trigger('click');
     			
     			$('.shade, .edit-wrapper').fadeIn();
     			$(".edit-form input[name='isCycle'],.edit-form input[name='photo'],.edit-form input[name='isTest']").prop('checked',false).parents('a').removeClass('radio-checked');
     			$.ajax({
     				type:"post",
     				url:"getTaskCycleById",
     				data:"tcId="+id,
     				dataType:"json",
     				success:function(data){
     					if(data.type == 1){
     						$('.edit-type').html('设备模板')
     					}else{
     						$('.edit-type').html('部件模板')
     					}
     					var taskTypes = data.taskTypes;
     					var content = "<option value='0'>请选择任务类型</option>";
     					if(taskTypes.length > 0){
     						for(var i=0; i<taskTypes.length; i++){
     							if(taskTypes[i].id == data.ttId){
     								content += "<option value="+taskTypes[i].id+" selected>"+taskTypes[i].name+"</option>";
     							}else{
     								content += "<option value="+taskTypes[i].id+">"+taskTypes[i].name+"</option>";
     							}
     						}
     					}
     					$("#etaskType").html(content);
     					
     					var content1 = "";
     					if(data.cycleUnit == "天"){
     						content1 = "<option selected value='1'>天</option><option value='2'>小时</option>";
     					}else{
     						content1 = "<option value='1'>天</option><option value='2' selected>小时</option>";
     					}
     					$("#eunitId").html(content1);
     					$("#ecycle").val(data.taskCycle);
     					$("#ehowLong").val(data.howLong);
     					if(data.isCycle){
     						$(".edit-form input[name='isCycle']").eq(0).prop('checked',true).parents('a').addClass('radio-checked');
     					}else{
     						$(".edit-form input[name='isCycle']").eq(1).prop('checked',true).parents('a').addClass('radio-checked');
     					}
     					if(data.isPhoto){
     						$(".edit-form input[name='photo']").eq(0).prop('checked',true).parents('a').addClass('radio-checked');
     					}else{
     						$(".edit-form input[name='photo']").eq(1).prop('checked',true).parents('a').addClass('radio-checked');
     					}
     					if(data.isTest){
     						$(".edit-form input[name='isTest']").eq(0).prop('checked',true).parents('a').addClass('radio-checked');
     					}else{
     						$(".edit-form input[name='isTest']").eq(1).prop('checked',true).parents('a').addClass('radio-checked');
     					}
     					if(data.hasOwnProperty("wt1")){
     						$("#ewt1").val(data.wt1)
     					}
     					if(data.hasOwnProperty("wt2")){
     						$("#ewt2").val(data.wt2)
     					}
     					if(data.hasOwnProperty("wt3")){
     						$("#ewt3").val(data.wt3)
     					}
     					var carTypes = data.carTypes;
     					var content2 = "<option value='0'>请选择车辆类型</option>"
     						if(carTypes.length > 0){
     							for(var i=0; i<carTypes.length; i++){
     								if(carTypes[i].id == data.ctId){
     									content2 += "<option value="+carTypes[i].id+" selected>"+carTypes[i].name+"</option>";
     								}else{
     									content2 += "<option value="+carTypes[i].id+">"+carTypes[i].name+"</option>";
     								}
     							}
     						}
     					$("#ecarType").html(content2);
     					
     					var suppliers = data.suppliers;
     					var content3 = "<option value='0'>请选择供货商</option>"
     						if(suppliers.length > 0){
     							for(var i=0; i<suppliers.length; i++){
     								content3 += "<option value="+suppliers[i].id+">"+suppliers[i].name+"</option>";
     							}
     						}
     					$("#esupplier").html(content3);
     					
     					$("#eetname").select2({
     						data:data.name
     					})
     					$("#eetbrand").select2({
     						data:data.brand
     					})
     					$("#eetmodel").select2({
     						data:data.model
     					})
     					$("#epname").select2({
     						data:data.pname
     					})
     					$("#emname").select2({
     						data:data.mname
     					})
     					//设置不默认选中
     					$("#eetname").val("").select2({
     						placeholder: '请选择模板名称',
     						allowClear: true,
     						language: "zh-CN"
     					});
     					$("#eetbrand").val("").select2({
     						placeholder: '请选择模板品牌',
     						allowClear: true,
     						language: "zh-CN"
     					});
     					$("#eetmodel").val("").select2({
     						placeholder: '请选择模板型号',
     						allowClear: true,
     						language: "zh-CN"
     					});
     					$("#epname").val("").select2({
     						placeholder: '请选择模板名称',
     						allowClear: true,
     						language: "zh-CN"
     					});
     					$("#emname").val("").select2({
     						placeholder: '请选择模板名称',
     						allowClear: true,
     						language: "zh-CN"
     					});
     					
     					// 初始化编辑时模板表格
     					$('#edit-table').datagrid({
     						url: "getTemp",
     						queryParams : {
     							name : "",
     							brand : "",
     							model : "",
     							supplierId : 0,
     							typeId : typeId
     						},
     						fit: true,
     						fitColumns: true,
     						rownumbers: true, // 显示行号列
     						singleSelect: true,
     						scrollbarSize: 6,
     						onSelect: function (index,row) {
     							editCheckedArr1 = [];
     							editCheckedArr1.push(row);
     						},
     						columns: [
     							[
     								{
     									field: "id",
     									hidden: true,
     								},
     								{
     									field: 'checkbox',
     									title: '单选',
     									checkbox: true,
     									width: 100,
     								},
     								{
     									field: 'name',
     									title: '设备模板名称',
     									width: 100,
     									align:'center'
     								},
     								{
     									field: 'brand',
     									title: '品牌',
     									width: 100,
     									align:'center'
     								},
     								{
     									field: 'model',
     									title: '型号',
     									width: 100,
     									align:'center'
     								},
     								{
     									field: 'supplier',
     									title: '供货商',
     									width: 100,
     									align:'center'
     								},
     								]
     							],
     							onLoadSuccess:function(data1){
     								$(".edit-allData1").text("共"+data1.total+"条数据");
     								var rows = $('#edit-table').datagrid("getRows");
     								//循环数据找出列表中ID和需要选中数据的ID相等的数据并选中
     								for(var i=0;i<rows.length;i++){
     									var rowId = rows[i].id;
     									if(rowId = data.tempId){
     										var index = $("#edit-table").datagrid("getRowIndex",rows[i])
     										$("#edit-table").datagrid("checkRow",index);
     									}
     								}
     							}
     					});
     					
     					// 初始化编辑时所需备件表格
     					$('#edit-table2').datagrid({
     						url: "getPartAndMedicine",
     						queryParams : {
     							pname:"",
     							mname:""
     						},
     						fit: true,
     						fitColumns: true,
     						rownumbers: true, // 显示行号列
     						singleSelect: false,
     						scrollbarSize: 6,
     						onCheck: function (index, row) {
     							if(JSON.stringify(editCheckedArr2).indexOf(JSON.stringify(row))==-1){
     								editCheckedArr2.push(row);
     							}
     							$('.edit-add-data').html(editCheckedArr2.length);
     						},
     						onUncheck: function (index, row) {
     							editCheckedArr2.remove(row);
     							$('.edit-add-data').html(editCheckedArr2.length);
     						},
     						onCheckAll: function (rows) {
     							for (var i = 0; i < rows.length; i++) {
     								var index = editCheckedArr2.indexOf(rows[i]);
     								(index == -1) && (editCheckedArr2.push(rows[i]));
     							}
     							$('.edit-add-data').html(editCheckedArr2.length);
     						},
     						onUncheckAll: function (rows) {
     							for (var j = 0; j < rows.length; j++) {
     								var index = editCheckedArr2.indexOf(rows[j]);
     								(index != -1) && (editCheckedArr2.remove(rows[j]));// 存在的数据从数组中删除
     							}
     							$('.edit-add-data').html(editCheckedArr2.length);
     						},
     						columns: [
     							[
     								{
     									field: "id",
     									hidden: true,
     								},
     								{
     									field: 'checkbox',
     									title: '单选',
     									checkbox: true,
     									width: 100,
     								},
     								{
     									field: 'name',
     									title: '设备模板名称',
     									width: 100,
     									align:'center'
     								},
     								{
     									field: 'brand',
     									title: '品牌',
     									width: 100,
     									align:'center'
     								},
     								{
     									field: 'model',
     									title: '型号',
     									width: 100,
     									align:'center'
     								},
     								{
     									field: 'supplier',
     									title: '供货商',
     									width: 100,
     									align:'center'
     								},
     								]
     							],
     							onLoadSuccess:function(data1){
     								$(".edit-allData2").text("共"+data1.total+"条数据");
     								var rows = $('#edit-table2').datagrid("getRows");
     								editCheckedArr2 = [];
     								//循环数据找出列表中ID和需要选中数据的ID相等的数据并选中
     								for(var i=0;i<rows.length;i++){
     									var rowId = rows[i].ID;
     									var parts = data.parts;
     									if(parts.length > 0){
     										for(var j=0; j<parts.length; j++){
     											if(rowId == parts[j].ID){
     												var index = $("#edit-table2").datagrid("getRowIndex",rows[i])
     												editCheckedArr2.push(rows[i]);
     												$("#edit-table2").datagrid("checkRow",index);
     											}
     										}
     									}
     								}
     							}
     					});
     					var Editor = window.wangEditor;
     					var editor3 = new Editor('#edit-editor');
     					editor3.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
     					editor3.customConfig.uploadImgHooks = {
     							customInsert: function (insertImg, result, editor) {
     								for(var i=0; i<result.length; i++){
     									var url = result[i].data;
     									insertImg(basePath()+url);
     								}
     							}
     					};
     					
     					editor3.customConfig.uploadImgServer = 'uploadFile';
     					editor3.customConfig.uploadFileName = 'file';
     					editor3.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;	//限制图片5M
     					editor3.customConfig.debug=true;
     					 // 自定义菜单配置
     				    editor3.customConfig.menus = [
     				    	'head',  // 标题
     				        'bold',  // 粗体
     				        'fontSize',  // 字号
     				        'fontName',  // 字体
     				        'italic',  // 斜体
     				        'underline',  // 下划线
     				        'strikeThrough',  // 删除线
     				        'foreColor',  // 文字颜色
     				        'backColor',  // 背景颜色
     				        'link',  // 插入链接
     				        'list',  // 列表
     				        'justify',  // 对齐方式
     				        'quote',  // 引用
//     				        'emoticon',  // 表情
     				        'image',  // 插入图片
     				        'table',  // 表格
     				        'video',  // 插入视频
     				        'code',  // 插入代码
     				        'undo',  // 撤销
     				        'redo'  // 重复
     				    ]
     					editor3.create(); // 创建富文本
     					editor3.txt.html(data.opStep);
     				}
     			});
     		}
		}
	});
}
//模板名称、品牌、型号、供货商change事件
$("#eetname,#eetbrand,#eetmodel,#esupplier").on("change",function(){
	var name = "";
	var brand = "";
	var model = "";
	if($("#eetname").select2("data") != ""){
		name = $("#eetname").select2("data")[0].text;
	}
	if($("#eetbrand").select2("data") != ""){
		brand = $("#eetbrand").select2("data")[0].text;
	}
	if($("#eetmodel").select2("data") != ""){
		model = $("#eetmodel").select2("data")[0].text;
	}
	 $('#edit-table').datagrid({
	    	url: "getTemp",
	    	queryParams : {
					name : name,
					brand : brand,
					model : model,
					supplierId : $("#esupplier").val(),
					typeId : tId
			},
 			onBeforeLoad : function(param){
 				$('.edit-allData1').trigger('click');
 			},
 			onLoadSuccess:function(data){
 				$(".edit-allData1").text("共"+data.total+"条数据");
 				var rows = $('#edit-table').datagrid("getRows");
 				//循环数据找出列表中ID和需要选中数据的ID相等的数据并选中
 			    for(var i=0;i<rows.length;i++){
 			      var rowId = rows[i].id;
 			      if(editCheckedArr1.length > 0){
 			    	  if(rowId == editCheckedArr1[0].id){
 			    		  var index = $("#edit-table").datagrid("getRowIndex",rows[i])
 			    		  $("#edit-table").datagrid("checkRow",index);
 			    	  }
 			      }
 			    }
 			}
	 });
});
//备品备件、药剂chanege事件
$("#epname,#emname").on("change",function(){
	var pname = "";
	var mname = "";
	if($("#epname").select2("data") != ""){
		pname = $("#epname").select2("data")[0].text;
	}
	if($("#emname").select2("data") != ""){
		mname = $("#emname").select2("data")[0].text;
	}
    $('#edit-table2').datagrid({
    	url: "getPartAndMedicine",
    	queryParams : {
				pname:pname,
				mname:mname
		},
		onBeforeLoad:function(param){
			$('.edit-allData2').trigger('click');
		},
        onLoadSuccess:function(data){
        	$(".edit-allData2").text("共"+data.total+"条数据");
        	var rows = $('#edit-table2').datagrid("getRows");
				//循环数据找出列表中ID和需要选中数据的ID相等的数据并选中
			    for(var i=0;i<rows.length;i++){
			      var rowId = rows[i].ID;
			      if(editCheckedArr2.length > 0){
			    	  for(var j=0; j<editCheckedArr2.length; j++){
			    		  if(rowId == editCheckedArr2[j].ID){
			    			  var index = $("#edit-table2").datagrid("getRowIndex",rows[i])
			    			  $("#edit-table2").datagrid("checkRow",index);
			    		  }
			    	  }
			      }
			    }
        }
    })
})
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