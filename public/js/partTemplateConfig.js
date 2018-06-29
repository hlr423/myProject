var deleteId;
var addNames;
var addBrands;
var addModels;
var addSupplies;
var addEquipTemp;	//新增的设备模板全查
var editEquipTemp;
var addEditState; //0 新建 1 编辑
$(function () {
    /*=========================初始化配置+变量定义=========================*/
    var popupState = 0; // 用于区分 新建与编辑弹窗的上一步与下一步按钮事件(0:新建 1:编辑)
    
    // 整体table
    $('#dg').datagrid({
        fit: true,
        url: "getListByPage",
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination: true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'id',
                    hidden: true
                },
                {
                    field: 'name',
                    title: '部件模板名称',
                    width: 120,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'brand',
                    title: '品牌',
                    width: 100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'spec',
                    title: '规格型号',
                    width: 140,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'unit',
                    title: '单位',
                    width: 60,
                },
                {
                    field: 'price',
                    title: '价格(元)',
                    width: 60,
                },
                {
                    field: 'picUrl',
                    title: '照片',
                    width: 60,
                    align: 'center',
                    formatter: function(value,row,index){
                        return "<a class='td-picture'><i></i>照片" +
                    		"<div><img src='"+basePath()+value+"' alt=''></div></a>";
                    }
                },
                {
                    field: 'warranty',
                    title: '保修期(月)',
                    width: 60,
                },
                {
                    field: 'supplierId',
                    hidden: true
                },
                {
                    field: 'supplier',
                    title: '供应商',
                    width: 140,
                    formatter: function (value, row, index) {
                        return '<a class="td-factory" onclick="factoryOpen(' + row.supplierId + ')" title='+value+'>' + value + '</a>';
                    }
                },
                {
                    field: 'supplyCycle',
                    title: '供货周期(天)',
                    width: 80,
                },
                {
                    field: 'important',
                    title: '是否重要',
                    width: 80,
                    formatter: function (value, row, index) {
                        if (value) {
                            return '<a class="td-yes"><i></i></a>';
                        }
                        return '<a class="td-not"><i></i></a>';
                    }
                },
                {
                    field: 'I',
                    title: '关联设备模板',
                    width: 80,
                    align: 'center',
                    formatter: function (value, row, index) {
                        return '<a class="td-detail" onclick="detailOpen('+row.id+')">详情</a>';
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 120,
                    formatter: function (value, row, index) {
                        return '<div class="table-operation"><a class="table-edit" onclick="editOpen(' + row.id + ')"><i></i>编辑</a> ' +
                            '<a class="table-delete" onclick="deleteOpen(' + row.id + ')"><i></i>删除</a>' +
                            '</div>';
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
    
    /*=========================初始化新建和编辑的查询参数=========================*/
    $('#add-eq-type,#add-eq-brand,#add-eq-spec,#add-eq-factory').on("change",function(){
    	var index = $('#add-eq-type,#add-eq-brand,#add-eq-spec,#add-eq-factory').index($(this));
    	var name = "";
    	var brand = "";
    	var spec = "";
    	var supply = "";
    	if($("#add-eq-type").select2("data") != ""){
    		name = $("#add-eq-type").select2("data")[0].text;
    	}
    	if($("#add-eq-brand").select2("data") != ""){
    		brand = $("#add-eq-brand").select2("data")[0].text;
    	}
    	if($("#add-eq-spec").select2("data") != ""){
    		spec = $("#add-eq-spec").select2("data")[0].text;
    	}
    	if($("#add-eq-factory").select2("data") != ""){
    		supply = $("#add-eq-factory").select2("data")[0].text;
    	}
    	var temp = new Array();
    	$(addEquipTemp).each(function(index,data){
    		if((data.name.indexOf(name) != -1)&&(data.model.indexOf(spec) != -1)&&
    				(data.brand.indexOf(brand) != -1)&&(data.supplier.indexOf(supply) != -1)){
    			temp.push(data)
    		}
    	})
    	$('#partAdd-table').datagrid('loadData', temp)
    	$("#add-eq-num").html(temp.length)
    	var aa = addDataArr.length
    	for (var k = 0; k < aa; k++) {
            var index = $('#partAdd-table').datagrid('getRowIndex', addDataArr[k]);
            $('#partAdd-table').datagrid('checkRow', index);
        }
    });
    
    $('#edit-eq-type,#edit-eq-brand,#edit-eq-spec,#edit-eq-factory').on("change",function(){
    	var index = $('#edit-eq-type,#edit-eq-brand,#edit-eq-spec,#edit-eq-factory').index($(this));
    	var name = "";
    	var brand = "";
    	var spec = "";
    	var supply = "";
    	if($("#edit-eq-type").select2("data") != ""){
    		name = $("#edit-eq-type").select2("data")[0].text;
    	}
    	if($("#edit-eq-brand").select2("data") != ""){
    		brand = $("#edit-eq-brand").select2("data")[0].text;
    	}
    	if($("#edit-eq-spec").select2("data") != ""){
    		spec = $("#edit-eq-spec").select2("data")[0].text;
    	}
    	if($("#edit-eq-factory").select2("data") != ""){
    		supply = $("#edit-eq-factory").select2("data")[0].text;
    	}
    	var temp = new Array();
    	$(editEquipTemp).each(function(index,data){
    		if((data.name.indexOf(name) != -1)&&(data.model.indexOf(spec) != -1)&&
    				(data.brand.indexOf(brand) != -1)&&(data.supplier.indexOf(supply) != -1)){
    			temp.push(data)
    		}
    	})
    	$('#partEdit-table').datagrid('loadData', temp)
    	$("#edit-eq-num").html(temp.length)
    	var aa = editDataArr.length;
    	for (var k = 0; k < aa; k++) {
            var index = $('#partEdit-table').datagrid('getRowIndex', editDataArr[k]);
            $('#partEdit-table').datagrid('checkRow', index);
        }
    
    })
    
    /*=========================初始化设备模板表格=========================*/
    $('#partFactory-table').datagrid({
        fit: true,
        fitColumns: true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: "id",
                    hidden: true,
                },
                {
                    field: 'name',
                    title: '供应商名称',
                    width: 100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                    
                },
                {
                    field: 'presaleName',
                    title: '售前联系人',
                    width: 80,
                },
                {
                    field: 'presalePhone',
                    title: '售前电话',
                    width: 100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'presaleMail',
                    title: '售前邮箱',
                    width: 100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'aftersaleName',
                    title: '售后联系人',
                    width: 80,
                },
                {
                    field: 'aftersalePhone',
                    title: '售后电话',
                    width: 100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'aftersaleMail',
                    title: '售后邮箱',
                    width: 100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
            ]
        ]
    });


    
    
    /*=========================初始化编辑的设备模板表格=========================*/
    $('#partEdit-table').datagrid({
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: false,
        scrollbarSize: 6,
        onCheck: function (index, row) {
        	if(editDataArr.indexOf(row)==-1){
        		editDataArr.push(row);
            }
            $('.part-edit-data').html(editDataArr.length);

        },
        onUncheck: function (index, row) {
            editDataArr.remove(row);
            $('.part-edit-data').html(editDataArr.length);

        },
        onCheckAll: function (rows) {
            for (var i = 0; i < rows.length; i++) {
                var index = editDataArr.indexOf(rows[i]);
                (index == -1) && (editDataArr.push(rows[i]));
            }
            $('.part-edit-data').html(editDataArr.length);
        },
        onUncheckAll: function (rows) {
            for (var j = 0; j < rows.length; j++) {
                var index = editDataArr.indexOf(rows[j]);
                (index != -1) && (editDataArr.remove(rows[j]));
            }
            $('.part-edit-data').html(editDataArr.length);
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
                    singleSelect: true,
                    width: 100,
                },
                {
                    field: 'name',
                    title: '设备模板名称',
                    width: 100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'brand',
                    title: '品牌',
                    width: 100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'model',
                    title: '规格型号',
                    width: 100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'supplier',
                    title: '供货商',
                    width: 100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
            ]
        ],
        onLoadSuccess:function(data1){
        	if(data1.total == 0){
				new CustomPrompt({
					type: 'error',
					msg: '没有相关记录'
				});
			}else{
				$("#edit-eq-num").text(data1.total);
				var rows = $('#partEdit-table').datagrid("getRows");
				//循环数据找出列表中ID和需要选中数据的ID相等的数据并选中
				for(var i=0;i<rows.length;i++){
					var rowId = rows[i].ID;
					var parts = data1.parts;
					if(parts.length > 0){
						for(var j=0; j<parts.length; j++){
							if(rowId == parts[j].ID){
								var index = $("#partEdit-table").datagrid("getRowIndex",rows[i])
								$("#partEdit-table").datagrid("checkRow",index);
							}
						}
					}
				}
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
    $('.close-popup').on('click', function () {
        var $popup = $(this).parents('.popup');
        $('.shade').fadeOut();
        $popup.fadeOut();
    });

    $('.newAdd-wrapper .close-popup').on('click', function () {
        divIndex = 0; //初始化步奏索引
        nextState = 0;
    });

    /*=========================删除弹窗=========================*/

    var deleteConfirm = document.querySelector('.delete-confirm');
    var inforCancel = document.querySelector('.infor-cancel');
    // 确认删除
    deleteConfirm.addEventListener('click', function () {
        $.post("deleteById", {"id": deleteId}, function (data) {
            if (data == 1) {
                $('.shade').fadeOut();
                $('.delete-wrapper').fadeOut();
                new CustomPrompt({
                    type: 'success',
                    msg: '删除成功'
                });
            } else {
                new CustomPrompt({
                    type: 'default',
                    msg: '删除失败'
                });
            }
            $('#dg').datagrid("reload");
        })
    });
    // 取消弹窗
    inforCancel.addEventListener('click', function () {
        $('.shade').fadeOut();
        $(this).parents('.infor-wrapper').fadeOut();
    });


    /*=========================新建弹窗=========================*/
    var pictureFile = document.querySelector('.part-picture input[type=file]');
    var nextState = 0; // 调整表格宽度
    var divIndex = 0; // 步奏 索引
    var addDataArr = new Array(); // 存放table选中的数据
    var cancelDataArr = new Array(); // 保存已选取消的数据
    var newAddBtn = document.querySelector('.new-btn'); // 新建按钮
    var $newPopup = $('.newAdd-wrapper'); // 新建弹窗
    var newAddSubmit = document.querySelector('.newAdd-submit');
    // 初始化图片上传
    pictureFile.addEventListener('change',function () {
        validate.checkImg($(this));
    });
    // 新建弹窗并初始化
    newAddBtn.addEventListener('click', function () {
        var $inputFile = $('.newAdd-wrapper input[type=file]');
        $inputFile.val(''); // 清空新建inputFile
        $inputFile.next().next('span').html('支持.jpg/.png/.JPEG').css('color','#ccc').removeAttr('state');
    	addEditState = 0;
        divIndex = 0; //初始化步奏索引
        nextState = 0;
        popupState = 0;
        cancelDataArr = [];
        $newPopup.fadeIn();
        $('.shade').fadeIn();
        $newPopup.find('input[type=text]').not($newPopup.find('.textbox.combo input[type=text]')).val('');
        $newPopup.css('width', '450px');
        $newPopup.find('.content-step:nth-of-type(1)').css('height', 'auto');
        $newPopup.find('.content-step:nth-of-type(2)').css('height', '0');
        $newPopup.find('.line').css('width', '210px');
        $('.newAdd-prev, .newAdd-submit').removeClass('submit-show');
        $('.newAdd-next').addClass('submit-show');
        $newPopup.find('.table-div').show();
        $newPopup.find('.table-div-checked').hide();
        $(this).css('color', '#59afff');
        $('.newAdd-wrapper .checkedData').css('color', '');

        $('.part-factory, .part-name, .part-brande, .part-type').val('0'); // 供应商
        $('.part-add-data').html('0');
        initSupply();	//加载供应商
        
        $('#partAdd-table').datagrid({
            fit: true,
            fitColumns: true,
            rownumbers: true, // 显示行号列
            singleSelect: false,
            scrollbarSize: 6,
            onCheck: function (index, row) {
                if(addDataArr.indexOf(row) == -1){
                	addDataArr.push(row);
                }
                $('.part-add-data').html(addDataArr.length);
            },
            onUncheck: function (index, row) {
                addDataArr.remove(row);
                $('.part-add-data').html(addDataArr.length);
            },
            onCheckAll: function (rows) {
                for (var i = 0; i < rows.length; i++) {
                    var index = addDataArr.indexOf(rows[i]);
                    (index == -1) && (addDataArr.push(rows[i]));
                }
                $('.part-add-data').html(addDataArr.length);
            },
            onUncheckAll: function (rows) {
                for (var j = 0; j < rows.length; j++) {
                    var index = addDataArr.indexOf(rows[j]);
                    (index != -1) && (addDataArr.remove(rows[j]));// 存在的数据从数组中删除
                }
                $('.part-add-data').html(addDataArr.length);
            },
            columns: [
                [
                    {
                        field: "id",
                        hidden: true,
                    },
                    {
                    	field: "supplierId",
                    	hidden: true,
                    },
                    {
                        field: 'checkbox',
                        title: '多选',
                        checkbox: true,
                        singleSelect: true,
                        width: 100,
                    },
                    {
                        field: 'name',
                        title: '设备模板名称',
                        width: 100,
                        formatter: function (value,row) {
                            return  "<span title='" + value + "'>" + value + "</span>"; 
                        }
                    },
                    {
                        field: 'brand',
                        title: '品牌',
                        width: 100,
                        formatter: function (value,row) {
                            return  "<span title='" + value + "'>" + value + "</span>"; 
                        }
                    },
                    {
                        field: 'model',
                        title: '规格型号',
                        width: 100,
                        formatter: function (value,row) {
                            return  "<span title='" + value + "'>" + value + "</span>"; 
                        }
                    },
                    {
                        field: 'supplier',
                        title: '供货商',
                        width: 100,
                        formatter: function (value,row) {
                            return  "<span title='" + value + "'>" + value + "</span>"; 
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
        }); // 初始化设备模板表格
        //初始化筛选条件
        initEquipTempAttr();
        //初始化要筛选的数据
        initAddEquipList();
    });
    // 下一步
    $('.newAdd-next').on('click', function () {
        var divValue = false;
        var $content = $(this).parents('.popup');
        var id = null;
        var name;
        var brand;
        var spec;
        var supplierId;
        var inputFileState; // 是否上传了图片 
        var $inputFile = $content.find('input[type=file]'); // inputFile
        var $inputFileSpan = $inputFile.next().next('span');
        
        if(addEditState == 0){		//新增
        	name = $("#add-name").val();
            brand = $("#add-brand").val();
            spec = $("#add-spec").val();
            supplierId = $("#add-supply").val();
//            if($inputFile.val() == ''){
//                $inputFileSpan.html('请选择文件!!!').css('color','#ff642e').attr('state','errFile');
//            }
        }else if(addEditState == 1){	//编辑
        	id = $("#edit-id").val();
        	name = $("#edit-name").val();
            brand = $("#edit-brand").val();
            spec = $("#edit-spec").val();
            supplierId = $("#edit-supply").val();
        }
        
        var $content = $(this).parents('.popup');
        var $divNode = $content.find('.content-step').eq(divIndex);
        divValue = $divNode.form('enableValidation').form('validate');
        if (divValue && ($inputFileSpan.attr('state') != 'errFile')) {
        	if(isExist(id, name, brand, spec, supplierId)){
        		new CustomPrompt({
                    type: 'default',
                    msg: '部件模板已存在！'
                });
            	return;
            }
            $divNode.css('height', 0);
            divIndex++;
            $content.css('width', '750px');
            $content.find('.line').css('width', '450px');
            $content.find('.content-step').eq(divIndex).css('height', 'auto');
            if (nextState == 0) { //调整表格宽度 只执行一次
                 $content.find('.part-datagrid').datagrid('resize');
                nextState++;
            }

        }
        if (divIndex == 1) {
            $(this).removeClass('submit-show');
            $content.find('.newAdd-prev').addClass('submit-show');
            $content.find('.footer .submit:nth-of-type(3)').addClass('submit-show');
        }
    });

    // 上一步
    $('.newAdd-prev').on('click', function () {
        var $content = $(this).parents('.popup');
        var $divNode = $content.find('.content-step').eq(divIndex);
        $divNode.css('height', '0');
        divIndex--;
        $content.find('.line').css('width', '210px');
        $content.css('width', '450px').find('.content-step').eq(divIndex).css('height', 'auto');
        if (divIndex == 0) {
            $(this).removeClass('submit-show');
            $content.find('.footer>.submit:nth-of-type(3)').removeClass('submit-show');
            $content.find('.newAdd-next').addClass('submit-show');
        }
    });

    // 新建获取已选数据
    $('.newAdd-wrapper .checkedData').on('click', function () {
        $newPopup.find('.table-div').hide();
        $newPopup.find('.table-div-checked').show();
        $(this).css('color', '#59afff');
        $('.newAdd-wrapper .allData').css('color', '#666');
        $('#partAdd-table-checked').datagrid({
            fit: true,
            fitColumns: true,
            rownumbers: true, // 显示行号列
            singleSelect: false,
            scrollbarSize: 6,
            onCheck: function (index, row) {
                var num = 0;
                cancelDataArr.remove(row);
                num = addDataArr.length - cancelDataArr.length;
                $('.newAdd-wrapper .part-add-data').html(num);
            },
            onCheckAll: function (rows) {
                cancelDataArr = [];
                $('.newAdd-wrapper .part-add-data').html(addDataArr.length);
            },
            onUncheckAll: function (rows) {
                cancelDataArr = rows;
                $('.newAdd-wrapper .part-add-data').html(0);
            },
            onUncheck: function (index, row) {
                var num = 0;
                var idx = cancelDataArr.indexOf(row);
                (idx == -1) && (cancelDataArr.push(row)); //不存在放在数组中
                num = addDataArr.length - cancelDataArr.length;
                $('.newAdd-wrapper .part-add-data').html(num);
            },
            columns: [
                [
                    {
                        field: 'checkbox',
                        title: '多选',
                        checkbox: true,
                        singleSelect: true,
                        width: 100,
                    },
                    {
                        field: 'name',
                        title: '设备模板名称',
                        width: 100,
                        formatter: function (value,row) {
                            return  "<span title='" + value + "'>" + value + "</span>"; 
                        }
                    },
                    {
                        field: 'brand',
                        title: '品牌',
                        width: 100,
                        formatter: function (value,row) {
                            return  "<span title='" + value + "'>" + value + "</span>"; 
                        }
                    },
                    {
                        field: 'model',
                        title: '规格型号',
                        width: 100,
                        formatter: function (value,row) {
                            return  "<span title='" + value + "'>" + value + "</span>"; 
                        }
                    },
                    {
                        field: 'supplier',
                        title: '供货商',
                        width: 100,
                        formatter: function (value,row) {
                            return  "<span title='" + value + "'>" + value + "</span>"; 
                        }
                    },
                ]
            ]
        });
        $('#partAdd-table-checked').datagrid('loadData', addDataArr);
        $('#partAdd-table-checked').datagrid('selectAll');
    });
    // 新建全选数据
    $('.newAdd-wrapper .allData').on('click', function () {
        var tempArr = [];
        for (var l = 0; l < cancelDataArr.length; l++) {
            tempArr.push(cancelDataArr[l])
        }
        if (tempArr.length > 0) {
            for (var i = 0; i < addDataArr.length; i++) {
                for (var j = 0; j < tempArr.length; j++) {
                    if (addDataArr[i] == tempArr[j]) {
                        addDataArr.splice(i, 1);
                        i--;
                    }
                }
            }
            for (var k = 0; k < tempArr.length; k++) {
                var index = $('#partAdd-table').datagrid('getRowIndex', tempArr[k]);
                $('#partAdd-table').datagrid('uncheckRow', index);
            }
        }
        $newPopup.find('.table-div').show();
        $newPopup.find('.table-div-checked').hide();
        $(this).css('color', '#59afff');
        $('.newAdd-wrapper .checkedData').css('color', '');
    });
    // 新建提交
    newAddSubmit.addEventListener('click', function () {
        $('.newAdd-form').form('submit', {
            onSubmit: function () {
//                $(this).find('.checkedData').trigger('click');
                var formValue = $(this).form('enableValidation').form('validate');
//                var checkedData = $('#partAdd-table-checked').datagrid('getChecked');
                if (addDataArr.length <= 0) {
                    new CustomPrompt({
                        type: 'default',
                        msg: '至少选择一条数据'
                    });
                }
                if(formValue && (addDataArr.length > 0)){
                	var arr = new Array();
                	$(addDataArr).each(function(index,data){
                		arr.push(data.id)
                	})
                	$("#add-eq-part").val(JSON.stringify(arr));
                }
                return formValue && (addDataArr.length > 0);
            },
            success: function (data) {
            	$('#dg').datagrid("load")
            	if(data == 1){
            		$('.shade, .newAdd-wrapper').fadeOut();
            		new CustomPrompt({
            			type: 'success',
            			msg: '提交成功'
            		});
            	}else{
            		new CustomPrompt({
            			type: 'default',
            			msg: '部件已存在'
            		});
            	}
            }
        });
    });

    /*=========================编辑弹窗=========================*/
    var editInputFile = document.querySelector('.edit-picture input[type=file]')
    var $editPopup = $('.edit-wrapper');
    var editSubmit = document.querySelector('.edit-submit');
    var editCancelArr = new Array(); // 编辑已选中取消的数据
    // 初始化编辑上传图片
    editInputFile.addEventListener('change',function(){
        validate.checkImg($(this));
    });
    // 初始化编辑弹窗
    $('.edit-wrapper .close-popup').on('click', function () {
        nextState = 0; // 调整表格宽度
        divIndex = 0;//初始化步奏索引
        setTimeout(function () {
            $editPopup.css('width', '450px');
            $editPopup.find('.content-step:nth-of-type(1)').css('height', 'auto');
            $editPopup.find('.content-step:nth-of-type(2)').css('height', '0');
            $editPopup.find('.line').css('width', '210px');
        },400)
        $('.newAdd-prev, .edit-submit').removeClass('submit-show');
        $('.newAdd-next').addClass('submit-show');
        $editPopup.find('.table-div').show();
        $editPopup.find('.table-div-checked').hide();
    });
    // 编辑获取已选数据
    $('.edit-wrapper .checkedData').on('click', function () {
        $editPopup.find('.table-div').hide();
        $editPopup.find('.table-div-checked').show();
        $(this).css('color', '#59afff');
        $('.edit-wrapper .allData').css('color', '#666');
        $('#partEdit-table-checked').datagrid({
            fit: true,
            fitColumns: true,
            rownumbers: true, // 显示行号列
            singleSelect: false,
            scrollbarSize: 6,
            onCheck: function (index, row) {
                var num = 0;
                editCancelArr.remove(row);
                num = editDataArr.length - editCancelArr.length;
                $('.edit-wrapper .part-edit-data').html(num);
                console.log(editCancelArr)
            },
            onCheckAll: function (rows) {
                editCancelArr = [];
                $('.edit-wrapper .part-edit-data').html(editDataArr.length);
            },
            onUncheckAll: function (rows) {
                for (var i = 0; i < rows.length; i++) {
                    var index = editCancelArr.indexOf(rows[i]);
                    (index == -1) && (editCancelArr.push(rows[i]));
                }
                $('.edit-wrapper .part-edit-data').html(0);
            },
            onUncheck: function (index, row) {
                var num = 0;
                var idx = editCancelArr.indexOf(row);
                if (idx == -1) {
                    editCancelArr.push(row)
                }
                num = editDataArr.length - editCancelArr.length;
                $('.edit-wrapper .part-edit-data').html(num);
                console.log(editCancelArr)
            },
            columns: [
                [
                    {
                        field: 'checkbox',
                        title: '多选',
                        checkbox: true,
                        singleSelect: true,
                        width: 100,
                    },
                    {
                        field: 'name',
                        title: '设备模板名称',
                        width: 100,
                        formatter: function (value,row) {
                            return  "<span title='" + value + "'>" + value + "</span>"; 
                        }
                    },
                    {
                        field: 'brand',
                        title: '品牌',
                        width: 100,
                        formatter: function (value,row) {
                            return  "<span title='" + value + "'>" + value + "</span>"; 
                        }
                    },
                    {
                        field: 'model',
                        title: '规格型号',
                        width: 100,
                        formatter: function (value,row) {
                            return  "<span title='" + value + "'>" + value + "</span>"; 
                        }
                    },
                    {
                        field: 'supplier',
                        title: '供货商',
                        width: 100,
                        formatter: function (value,row) {
                            return  "<span title='" + value + "'>" + value + "</span>"; 
                        }
                    },
                ]
            ]
        });
        $('#partEdit-table-checked').datagrid('loadData', editDataArr);
        $('#partEdit-table-checked').datagrid('selectAll');
    });
    // 编辑全选数据
    $('.edit-wrapper .allData').on('click', function () {
        var tempArr = [];
        for (var l = 0; l < editCancelArr.length; l++) {
            tempArr.push(editCancelArr[l])
        }
        if (tempArr.length > 0) {
            for (var i = 0; i < editDataArr.length; i++) {
                for (var j = 0; j < tempArr.length; j++) {
                    if (editDataArr[i] == tempArr[j]) {
                        editDataArr.splice(i, 1);
                        i--;
                    }
                }
            }
            for (var k = 0; k < tempArr.length; k++) {
                var index = $('#partEdit-table').datagrid('getRowIndex', tempArr[k]);
                console.log(index)
                $('#partEdit-table').datagrid('uncheckRow', index);
            }
        }
        $editPopup.find('.table-div').show();
        $editPopup.find('.table-div-checked').hide();
        $(this).css('color', '#59afff');
        $('.edit-wrapper .checkedData').css('color', '');
    });
    
    // 编辑提交
    editSubmit.addEventListener('click', function () {
        $('.edit-form').form('submit', {
            onSubmit: function () {
//                $(this).find('.checkedData').trigger('click');
                var formValue = $(this).form('enableValidation').form('validate');
//                var checkedData = $('#partEdit-table-checked').datagrid('getChecked');
                if (editDataArr.length <= 0) {
                    new CustomPrompt({
                        type: 'default',
                        msg: '至少选择一条数据'
                    });
                }
                if(formValue && (editDataArr.length > 0)){
                	var arr = new Array();
                	$(editDataArr).each(function(index,data){
                		arr.push(data.id)
                	})
                	$("#edit-eq-part").val(JSON.stringify(arr));
                }
                return formValue && (editDataArr.length > 0);
            },
            success: function (data) {
            	$('#dg').datagrid("load")
            	if(data == 1){
            		$('.shade, .edit-wrapper').fadeOut();
            		new CustomPrompt({
            			type: 'success',
            			msg: '提交成功'
            		});
            	}else{
            		new CustomPrompt({
            			type: 'default',
            			msg: '部件已存在'
            		});
            	}
            }
        });
    });

    //搜索键
    $(".search-btn").click(function(data){
    	$('#dg').datagrid("load",{name:$("#searchName").val(), supplierId: $("#supplier").val()})
    })
    
    /*=========================其它方法=========================*/

    common.commonRadio('.newAdd-wrapper .content-step'); // 调用单选公用事件
    common.commonRadio('.edit-wrapper .content-step'); // 调用单选公用事件
    
});

/*=========================其它方法=========================*/
// 其它类型验证方法
var validate = {
    checkImg: function (node) {
        var thisNode = $(node)[0];
        var $inputText = $(node).next().next('span');
        var imgArr = new Array();
        var length = thisNode.files.length;
        if (length != 0) { //选择了文件
            for (var i = 0; i < length; i++) {
                var imgName = thisNode.files[i].name;
                console.log(imgName.indexOf("png"));
                if (imgName.indexOf('jpg') != -1 || imgName.indexOf("png") != -1 || imgName.indexOf("JPEG") != -1) {
                    imgArr.push(imgName);
                } else { // 选择错误的文件
                    $inputText.html('文件选择错误！！').css('color', '#ff642e').attr('state', 'errFile');
                }
            }
            if (length == imgArr.length) {
                $inputText.html(imgArr.toString()).css('color', '#dcdcdc').removeAttr('state');
            }
        } else {
            $inputText.html('支持.jpg/.png/.JPEG').css('color', '#dcdcdc').removeAttr('state');
        }
    }
};


var editDataArr = new Array(); // 存放编辑的已选数据(ajax获取的数据放入这个数组)
// 显示编辑弹窗
function editOpen(id) {
	editDataArr = [];
    var $inputFile = $('.edit-wrapper input[type=file]');
    $inputFile.val(''); // 清空新建inputFile
    $inputFile.next().next('span').html('支持.jpg/.png/.JPEG').css('color','#ccc').removeAttr('state');
	addEditState = 1;
    initSupply();	//加载供应商
    initEquipTempAttr();//加载设备模板属性
    initEditEquipList();//加载列表
    $.post("updateGetById",{"id":id},function(data){
    	if(data.state == 200){
    		$("#edit-id").val(data.id);
    		$("#edit-name").val(data.name);
    		$("#edit-brand").val(data.brand);
    		$("#edit-spec").val(data.spec);
    		$("#edit-price").val(data.price);
    		$("#edit-unit").val(data.unit);
    		$("#edit-supply").val(data.supplierId);
    		$("#edit-warranty").val(data.warranty);
    		$("#edit-supplyCycle").val(data.supplyCycle);
    		$("#edit-pic").attr("src", basePath()+data.picUrl);
    		var str1 = "";
    		var str2 = "";
    		var str = "";
    		if(data.important){
    			str1 ='<a class="radio-wrapper radio-checked"><i></i><input type="radio" name="important" value="true" checked="checked">';
    			str2 ='<a class="radio-wrapper"><i></i><input type="radio" name="important" value="true"">';
    		}else{
    			str1 ='<a class="radio-wrapper"><i></i><input type="radio" name="important" value="true"">';
    			str2 ='<a class="radio-wrapper radio-checked"><i></i><input type="radio" name="important" value="true" checked="checked">';
    		}
    		str += '<span>';
    		str += str1;
    		str += '</a>是';
    		str += '</span>';
    		str += '<span>';
    		str += str2;
    		str += '</a>否';
    		str += '</span>';
    		$("#edit-imp").html(str);
    		common.commonRadio('.edit-wrapper .content-step'); // 调用单选公用事件
    		var aa = editEquipTemp.length
    		$(data.equipTemplates).each(function(i,s){
    			for (var k = 0; k < aa; k++) {
    				var index = $('#partEdit-table').datagrid('getRowIndex', editEquipTemp[k]);
    				if(editEquipTemp[k].id == s){
    					$('#partEdit-table').datagrid('checkRow', index);
    				}
    			}
    		})
    	}
    },"json")
    
    $('.shade, .edit-wrapper').fadeIn();
}

// 显示关联设备模板详情弹窗
function detailOpen(id) {
    $('.shade, .detail-wrapper').fadeIn();
    $('#partDetail-table').datagrid({
    	url: 'getEquipTempList',
    	queryParams: {"id":id},
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: "id",
                    hidden: true,
                },
                {
                    field: 'name',
                    title: '设备模板名称',
                    width: 100,
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
                    width: 100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'supply',
                    title: '供货商',
                    width: 100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
            ]
        ],
        onLoadSuccess:function(data){
        	$("#etTotal").text(data.total);
        }
    }); // 初始化设备模板表格
}

// 显示供应商弹窗
function factoryOpen(id) {
    $('.shade, .factory-wrapper').fadeIn();
    $('#partFactory-table').datagrid({url: 'getSupplier', queryParams: {"id": id}})
}

// 删除弹窗
function deleteOpen(id) {
    deleteId = id;
    $('.delete-wrapper, .shade').fadeIn();
}

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

function initSupply() {
    	$.ajax({
			async: false,
			type: "post",
			url: "getAllSupplier",
			dataType: "json",
			success : function(data){
				var str = '<option value="0">请选择供应商</option>';
		        $(data).each(function (i, s) {
		            str += '<option value="' + s.id + '">' + s.name + '</option>';
		        })
		        $(".add-supply ,.edit-supply").html(str);
		}
	})
}

function initEquipTempAttr(){
	$.ajax({
		async: false,
		type: "post",
		url: "getAllEquipAttr",
		dataType: "json",
		success : function(data){
			addNames = data.names;
			addModels = data.models;
			addBrands = data.brands;
			addSupplies = data.suppliers;
			 $('#add-eq-type,#edit-eq-type').select2({
				 data: addNames
			 })
			 $('#add-eq-brand,#edit-eq-brand').select2({
				 data: addBrands
			 })
			 $('#add-eq-spec,#edit-eq-spec').select2({
				 data: addModels
			 })
			 $('#add-eq-factory,#edit-eq-factory').select2({
				 data: addSupplies
			 })
			//设置不默认选中
			$("#add-eq-type,#edit-eq-type").val("").select2({
				placeholder: '请选择模板名称',
				allowClear: true,
				language: "zh-CN"
			});
			$("#add-eq-brand,#edit-eq-brand").val("").select2({
				placeholder: '请选择品牌',
				allowClear: true,
				language: "zh-CN"
			});
			$("#add-eq-spec,#edit-eq-spec").val("").select2({
				placeholder: '请选择规格型号',
				allowClear: true,
				language: "zh-CN"
			});
			$("#add-eq-factory,#edit-eq-factory").val("").select2({
				placeholder: '请选择供货商',
				allowClear: true,
				language: "zh-CN"
			});
		}
	})
}
function initAddEquipList(){
	$.ajax({
		async: false,
		type: "post",
		url: "getAllEquipTemp",
		dataType: "json",
		success : function(data){
			addEquipTemp = data.rows;
			$('#partAdd-table').datagrid('loadData', data.rows)
			$("#add-eq-num").html(data.rows.length)
		}
	})
}

function initEditEquipList(){
	$.ajax({
		async: false,
		type: "post",
		url: "getAllEquipTemp",
		dataType: "json",
		success : function(data){
			editEquipTemp = data.rows;
			$('#partEdit-table').datagrid('loadData', data.rows)
			$("#edit-eq-num").html(data.rows.length)
		}
	})
}

function isExist(id,name,brand,spec,supplierId){
	var bo ;
	$.ajax({
		async: false,
		data: {"id":id,"name":name,"brand":brand,"spec":spec,"supplierId":supplierId},
		type: "post",
		url: "getExist",
		dataType: "json",
		success : function(data){
			bo = data;
		}
	})
	return bo;
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