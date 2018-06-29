// ======================================全局变量======================================
var $shade = $('.shade'); // 遮罩
var $newPopup = $('.new-popup'); // 新建弹窗框
var newBtn = document.getElementsByClassName('new-btn')[0]; // 新建按钮
var newNextBtn = document.getElementsByClassName('new-next')[0]; // 新建-下一步按钮
var newPrevBtn = document.getElementsByClassName('new-prev')[0]; // 新建 上一步按钮
var newSubmit = document.getElementsByClassName('new-submit')[0]; // 新建提交按钮
var editSubmit = document.querySelector('.edit-submit'); // 编辑提交按钮
var $editPopup = $('.edit-popup'); // 编辑弹窗框
var editNextBtn = document.getElementsByClassName('edit-next')[0]; // 编辑-下一步按钮
var editPrevBtn = document.getElementsByClassName('edit-prev')[0]; // 编辑 上一步按钮
var editSubmit = document.getElementsByClassName('edit-submit')[0]; // 编辑提交按钮
var step = document.getElementsByClassName('step'); // 新建和编辑框分别有两个step
var stepNum = document.getElementsByClassName('step-num'); // 新建和编辑框顶部的123
var $step = $('.step');
var $line = $('.line'); // 新建和编辑框顶部的线
$(function () {
    // ======================================下拉树======================================
	$(".search-btn").on("click",function(){
		$("#dg").datagrid({
			url:"getAll",
	    	queryParams:{
	    		supplierId:$("#topsupplier").val(),
	    		keyword:$("#keyword").val()
	    	}
		});
	});
	$.ajax({
		type:"post",
		url:"getLevelAndSupplier",
		async:false,
		dataType:"json",
		success:function(data){
			$("#topsupplier").empty();
			var content = "<option value='0'>请选择供货商</option>"
			var suppliers = data.suppliers;
			if(suppliers.length > 0){
				for(var i=0; i<suppliers.length; i++){
					content += "<option value="+suppliers[i].id+">"+suppliers[i].name+"</option>";
				}
			}
			$("#topsupplier").append(content);
		}
	});
    // ======================================表格======================================
    $('#dg').datagrid({
    	url:"getAll",
    	pagination: true,     //开启分页  
        pageSize: 10,         //分页大小  
        fit: true,
        fitColumns: true,
        rownumbers: true,
        singleSelect: true,
        scrollbarSize: 6,
        columns: [
            [
            	{
                    field: 'id',
                    hidden:true
                },
                {
                    field: 'name',
                    title: '设备模板名称',
                    width: 60,
                    align: 'center',
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'brand',
                    title: '品牌',
                    width: 60,
                    align: 'center',
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'Model',
                    title: '规格型号',
                    width: 60,
                    align: 'center',
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'unit',
                    title: '单位',
                    width: 60,
                    align: 'center',
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'price',
                    title: '价格(元)',
                    width: 60,
                    align: 'center',
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
                    field: 'guarantee',
                    title: '保修期(月)',
                    align: 'center',
                    width: 60
                },
                {
                    field: 'MTBF',
                    title: 'MTBF(小时)',
                    align: 'center',
                    width: 60
                },
                {
                    field: 'level',
                    title: '重要级别',
                    align: 'center',
                    width: 60
                },
                {
                    field: 'supplier',
                    title: '供应商',
                    width: 60,
                    align: 'center',
                    formatter: function (value,row) {
                        return '<a class="supplier" onclick=opensupPopup('+row.id+')>'+row.supplier+'</a>'
                    }
                },
                {
                    field: 'cycle',
                    title: '供货周期(天)',
                    align: 'center',
                    width: 60
                },
                {
                    field: 'param',
                    title: '关键参数',
                    align: 'center',
                    width: 60,
                    formatter: function (value,row) {
                        return '<a class="detail" onclick=openParamPopup('+row.id+')>详情</a>'
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 100,
                    formatter: function (value, rec) {
                        var content = '';
                        content += '<div class="table-operation">';
                        content += '<a class="table-edit" onclick=edit('+rec.id+')><i></i>编辑</a>';
                        content += '<a class="table-delete" onclick=singleDelete('+rec.id+')><i></i>删除</a>';
                        content += '</div>';
                        return content;
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
    
    // 滚动时判断是否有提示框
    $('.new-popup .content, .edit-popup .content').on('scroll', function () {
        var tooltip = document.querySelector('.tooltip.tooltip-right');
        if (tooltip !== null) {
            $(this).find('input').trigger('blur');
        };
    });

    


    // ======================================新建框======================================
    
    // 验证新建图片上传
	var pictureFile = document.querySelector('.equip-picture input[type=file]');
	pictureFile.addEventListener('change', function () {
		validate.checkImg($(this));
	});

    // 打开新建弹窗，清空数据
    newBtn.addEventListener('click', function () {
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
//         			$("input[name='token']").val(data);
         			$(pictureFile).val(''); // 清空inputfile值
         			$(pictureFile).next().next('span').html('支持.jpg/.png/.JPEG(小于2M)').css('color','#dcdcdc');
         			$shade.fadeIn();
         			$newPopup.fadeIn();
         			$newPopup.find('input[type=text]').val('');
         			step[0].style.display = 'block';
         			step[1].style.display = 'none';
         			newNextBtn.style.display = "inline-block";
         			newPrevBtn.style.display = "none";
         			newSubmit.style.display = "none";
         			stepNum[0].removeChild(stepNum[0].firstChild);
         			stepNum[0].innerHTML = '1';
         			$(stepNum[1]).parent().addClass('gray');
         			$('.line').eq(0).removeClass('green').addClass('gray');
         			//查询级别和供应商下拉框
         			$.ajax({
         				type:"post",
         				url:"getLevelAndSupplier",
         				dataType:"json",
         				success:function(data){
         					$("#level").empty();
         					var content = "<option value='0'>请选择级别</option>"
         						var levels = data.levels;
         					if(levels.length > 0){
         						for(var i=0; i<levels.length; i++){
         							content += "<option value="+levels[i].id+">"+levels[i].name+"</option>";
         						}
         					}
         					$("#level").append(content);
         					
         					$("#supplier").empty();
         					var content1 = "<option value='0'>请选择供货商</option>"
         						var suppliers = data.suppliers;
         					if(suppliers.length > 0){
         						for(var i=0; i<suppliers.length; i++){
         							content1 += "<option value="+suppliers[i].id+">"+suppliers[i].name+"</option>";
         						}
         					}
         					$("#supplier").append(content1);
         				}
         			});
         		}
			}
    	});
    });

    // 新建-下一步
    newNextBtn.addEventListener('click', function () {
        var _this = this;
        var result = $('#newForm1').form('enableValidation').form('validate');
        var $inputFile = $newPopup.find('.equip-picture input[type=file]');
        var $inputTextState = $inputFile.next().next('span').attr('state');
        if (result && $inputTextState!= 'errFile') {
        	//判断设备模版是否存在
            $.ajax({
            	type:"post",
            	url:"isRepate",
            	async:false,
            	data:{
            		equipTempName:$("#name").val(),
            		brand:$("#brand").val(),
            		model:$("#model").val(),
            		supplierId:$("#supplier").val(),
            	},
            	dataType:"json",
            	success:function(data){
            		if(data == 1){
                		new CustomPrompt({
                			type: 'error',
                			msg: '该模版已存在'
                		});
                	}else{
                		_this.style.display = "none";
                		newSubmit.style.display = "inline-block";
                		step[1].style.display = "block";
                		step[0].style.display = "none";
                		newPrevBtn.style.display = "inline-block";
                		var i = '<i class="sus"></i>';
                		stepNum[0].innerHTML = '';
                		$(stepNum[0]).append(i);
                		$(stepNum[1]).parent().removeClass('gray');
                		$line.eq(0).removeClass('gray').addClass('green');
                		
                		var obj = new Object();
                		obj.name = $("#name").val();
                		obj.brand = $("#brand").val();
                		obj.model = $("#model").val();
                		obj.unit = $("#unit").val();
                		obj.price = $("#price").val();
                		obj.warranty = $("#warranty").val();
                		obj.mtbf = $("#mtbf").val();
                		obj.supplyCycle = $("#suppluCycle").val();
                		obj.levelId = $("#level").val();
                		obj.supplierId = $("#supplier").val();
                		$("#equipTempJson").val(JSON.stringify(obj));
                	}
            	}
            })
        }
    });

    // 新建-上一步 
    newPrevBtn.addEventListener('click', function () {
        this.style.display = "none";
        newSubmit.style.display = "none";
        step[1].style.display = "none";
        step[0].style.display = "block";
        newNextBtn.style.display = "inline-block";
        stepNum[0].removeChild(stepNum[0].firstChild);
        stepNum[0].innerHTML = '1';
        $(stepNum[1]).parent().addClass('gray');
        $('.line').eq(0).removeClass('green').addClass('gray')
    });

    // 新建-添加关键参数
    $step.on('click', '.new-add', function () {
        var $itemGroup = $('.new-popup .item-group');
        var i = $itemGroup.length + 1;

        $(this).parent().remove();

        var newItemGroup = '<div class="item-group addKeyparam">';
        newItemGroup += '<div class="title-num"><p>关键参数' + i + '</p><i class="remove-item-group"></i></div>'; // 序号
        newItemGroup += '<div class="content-item"><label>属性名</label><input type="text" class="easyui-validatebox"  maxlength="50" placeholder="请输入属性名" name="name"></div>'; // 属性名
        newItemGroup += '<div class="content-item"><label>属性值</label><input type="text" class="easyui-validatebox" data-options="validType:\'positiveTwo\'" maxlength="7" placeholder="请输入属性值" name="value"></div>'; // 属性值
        newItemGroup += '<div class="content-item"><label>单位</label><input type="text" class="easyui-validatebox" maxlength="10" placeholder="请输入单位" name="unit"></div>'; // 单位
        newItemGroup += '<div class="content-item"><label>上限值</label><input type="text" class="easyui-validatebox" data-options="validType:\'positiveTwo\'" maxlength="7" placeholder="请输入上限值" name="upperLimit"></div>'; // 上限
        newItemGroup += '<div class="content-item"><label>下限值</label><input type="text" class="easyui-validatebox" data-options="validType:\'positiveTwo\'" maxlength="7" placeholder="请输入下限值" name="lowerLimit"></div>'; // 下限
        newItemGroup += createBtn(1);

        $itemGroup.last().after(newItemGroup);
        // 再次解析表单规则
        $.parser.parse('#newForm2');

        // 滚动条向下移动
        var scrollHeight = $newPopup.find('.content').prop('scrollHeight');
        $newPopup.find('.content').scrollTop(scrollHeight);
        console.log(newItemGroup);
    });

    // 删掉当前的组
    $step.on('click', '.remove-item-group', function () {
        var $this = $(this);
        
        var currForm = $this.parents('form');

        // 移除当前按钮
        $this.parents('.item-group').remove();

        // 添加关键参数的按钮数目
        var length = 0;
        // 判断是否是新建框
        var isNewPopup = $this.parents('.item-group').hasClass('addKeyparam');

        if (isNewPopup) {
            length = currForm.find('.new-add').length;
        } else {
            length = currForm.find('.edit-add').length;
        }

        // 如果长度0的话，给最后一个item-group添加一个按钮
        if (length == 0) {
            if (isNewPopup) {
                currForm.find('.item-group').last().append(createBtn(1));
            } else {
                currForm.find('.item-group').last().append(createBtn(3));
            }
        }

        // 更改序号
        currForm.find('.title-num p').each(function (index) {
            var num = index + 1;
            this.innerHTML = '关键参数' + num;
        })
    })

    // 新建提交按钮
    newSubmit.addEventListener('click', function () {
        $('#newForm1').form('submit', {
            onSubmit: function () {
            	if($(this).form('enableValidation').form('validate')){
//            		newSubmit.style.display = "none";
            		var array = new Array();
                	var $nodeList = $('.addKeyparam');
                	for(var i=0; i<$nodeList.length; i++){
                		var obj = new Object();
                		obj.name = $nodeList.eq(i).find("input[name='name']").val();
                		obj.value = $nodeList.eq(i).find("input[name='value']").val();
                		obj.unit = $nodeList.eq(i).find("input[name='unit']").val();
                		obj.upperLimit = $nodeList.eq(i).find("input[name='upperLimit']").val();
                		obj.lowerLimit = $nodeList.eq(i).find("input[name='lowerLimit']").val();
                		array.push(obj);
                	} 
                	$("#equipKeyparams").val(JSON.stringify(array));
                	return true;
            	}else{
            		return false;
            	}
            },
            success: function (data) {
            	if(data > 0){
//            		newSubmit.style.display = "none";
            		new CustomPrompt({
            			type: 'success',
            			msg: '添加成功'
            		});
            		$shade.fadeOut();
            		$newPopup.fadeOut();
            		$("#dg").datagrid("reload");
            	}else{
            		new CustomPrompt({
            			type: 'default',
            			msg: '添加失败'
            		});
            	}
            },
            error:function(data){
            	new CustomPrompt({
        			type: 'error',
        			msg: '系统错误'
        		});
            }
        });
    });

    // ======================================编辑框======================================
   
    

    // 编辑-下一步
    editNextBtn.addEventListener('click', function () {
        var _this = this;
        var result = $('#editForm1').form('enableValidation').form('validate');
        var editInputTextState = $(editPictureFile).next().next('span').attr('state'); // 图片上传文件文字提示
        if (result && editInputTextState!='errFile') {
        	//判断设备模版是否存在
            $.ajax({
            	type:"post",
            	url:"isRepateEdit",
            	async:false,
            	data:{
            		equipTempId:etId,
            		equipTempName:$("#ename").val(),
            		brand:$("#ebrand").val(),
            		model:$("#emodel").val(),
            		supplierId:$("#esupplier").val(),
            	},
            	dataType:"json",
            	success:function(data){
            		if(data == 1){
                		new CustomPrompt({
                			type: 'error',
                			msg: '该模版已存在'
                		});
                	}else{
                		_this.style.display = "none";
                        editSubmit.style.display = "inline-block";
                        step[3].style.display = "block";
                        step[2].style.display = "none";
                        editPrevBtn.style.display = "inline-block";
                        var i = '<i class="sus"></i>';
                        stepNum[3].innerHTML = '2';
                        stepNum[2].innerHTML = '';
                        $(stepNum[2]).append(i);
                        $(stepNum[3]).parent().removeClass('gray');
//                        $line.eq(2).removeClass('gray');
                        $line.eq(1).removeClass('gray').addClass('green');
                	}
            	}
            })
        }
    });

    // 编辑-上一步 
    editPrevBtn.addEventListener('click', function () {
        this.style.display = "none";
        editSubmit.style.display = "none";
        step[3].style.display = "none";
        step[2].style.display = "block";
        editNextBtn.style.display = "inline-block";
        stepNum[3].removeChild(stepNum[3].firstChild);
        stepNum[2].innerHTML = '1';
        stepNum[3].innerHTML = '2';
        $(stepNum[3]).parent().addClass('gray');
        $line.eq(1).addClass('gray');
    });

    // 编辑-添加关键参数
    $step.on('click', '.edit-add', function () {
    	var $itemGroup = $('.edit-popup .item-group');
        var i = $itemGroup.length + 1;

        $(this).parent().remove();

        var newItemGroup = '<div class="item-group editKeyparam">';
        newItemGroup += '<div class="title-num"><p>关键参数' + i + '</p><i class="remove-item-group"></i></div>'; // 序号
        newItemGroup += "<input type='hidden' value='0'>"
        newItemGroup += '<div class="content-item"><label>属性名</label><input type="text" class="easyui-validatebox" maxlength="50" placeholder="请输入属性名" name="name"></div>'; // 属性名
        newItemGroup += '<div class="content-item"><label>属性值</label><input type="text" class="easyui-validatebox" data-options="validType:\'positiveTwo\'" maxlength="7" placeholder="请输入属性值" name="value"></div>'; // 属性值
        newItemGroup += '<div class="content-item"><label>单位</label><input type="text" class="easyui-validatebox" maxlength="10" placeholder="请输入单位" name="unit"></div>'; // 单位
        newItemGroup += '<div class="content-item"><label>上限值</label><input type="text" class="easyui-validatebox" data-options="validType:\'positiveTwo\'" maxlength="7" placeholder="请输入上限值" name="upperLimit"></div>'; // 上限
        newItemGroup += '<div class="content-item"><label>下限值</label><input type="text" class="easyui-validatebox" data-options="validType:\'positiveTwo\'" maxlength="7" placeholder="请输入下限值" name="lowerLimit"></div>'; // 下限
        newItemGroup += createBtn(3);

        $itemGroup.last().after(newItemGroup);
        // 再次解析表单规则
        $.parser.parse('#editForm2');
   
        // 滚动条向下移动
        var scrollHeight = $editPopup.find('.content').prop('scrollHeight');
        $editPopup.find('.content').scrollTop(scrollHeight);
    	
    });

    // 编辑 - 提交按钮
    editSubmit.addEventListener('click', function () {
    	$('#editForm1').form('submit', {
            onSubmit: function () {
            	if($(this).form('enableValidation').form('validate')){
            		var obj = new Object();
                	obj.id = etId;
             		obj.name = $("#ename").val();
             		obj.brand = $("#ebrand").val();
             		obj.model = $("#emodel").val();
             		obj.unit = $("#eunit").val();
             		obj.price = $("#eprice").val();
             		obj.warranty = $("#ewarranty").val();
             		obj.mtbf = $("#emtbf").val();
             		obj.supplyCycle = $("#esupplyCycle").val();
             		obj.levelId = $("#elevel").val();
             		obj.supplierId = $("#esupplier").val();
             		
             		var array = new Array();
                	var $nodeList = $('.editKeyparam');
                	var temp = "";
                	for(var i=0; i<$nodeList.length; i++){
                		var obj1 = new Object();
                		obj1.id = $nodeList.eq(i).find("input:hidden").val();
                		obj1.name = $nodeList.eq(i).find("input[name='name']").val();
                		obj1.value = $nodeList.eq(i).find("input[name='value']").val();
                		obj1.unit = $nodeList.eq(i).find("input[name='unit']").val();
                		obj1.upperLimit = $nodeList.eq(i).find("input[name='upperLimit']").val();
                		obj1.lowerLimit = $nodeList.eq(i).find("input[name='lowerLimit']").val();
                		array.push(obj1);
                		temp += $nodeList.eq(i).find("input:hidden").val()+",";
                	} 
                	obj.ekIds = temp;
                	$("#equipTempJson1").val(JSON.stringify(obj));
                	$("#equipKeyparams1").val(JSON.stringify(array));
                	return true;
            	}else{
            		return false;
            	}
            },
            success: function (data) {
            	if(data > 0){
            		new CustomPrompt({
            			type: 'success',
            			msg: '修改成功'
            		});
            		$shade.fadeOut();
            		$editPopup.fadeOut();
            		$("#dg").datagrid("reload");
            	}else{
            		new CustomPrompt({
            			type: 'default',
            			msg: '修改失败'
            		});
            	}
            },
            error:function(data){
            	new CustomPrompt({
        			type: 'error',
        			msg: '系统错误'
        		});
            }
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
    });

    // ======================================确认删除按钮======================================
    var deleteConfirm = document.querySelector('.delete-confirm');
    deleteConfirm.addEventListener('click', function () {
    	$.ajax({
    		type:"post",
    		url:"deleteEquipTempById",
    		data:"equipTempId="+etId,
    		success:function(data){
    			if(data == 1){
    				$shade.fadeOut();
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
    		},
    		error:function(){
    			new CustomPrompt({
                    type: 'error',
                    msg: '系统错误'
                });
    		}
    	});
    });
});
// ======================================其他方法======================================
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
				if(thisNode.files[i].size > 2*1024*1024){
					$inputText.html('文件超过2M！！').css('color', '#ff642e').attr('state', 'errFile');
				}else{
					if (imgName.indexOf('jpg') != -1 || imgName.indexOf("png") != -1 || imgName.indexOf("JPEG") != -1) {
						imgArr.push(imgName);
					} else { // 选择错误的文件
						$inputText.html('文件格式错误！！').css('color', '#ff642e').attr('state', 'errFile');
					}
				}
			}
			if (length == imgArr.length) {
				$inputText.html(imgArr.toString()).css('color', '#dcdcdc').removeAttr('state');
			}
		} else {
			$inputText.html('支持.jpg/.png/.JPEG(小于2M)').css('color', '#dcdcdc').removeAttr('state');
		}
	}
};

// 验证编辑图片上传
var editPictureFile = document.querySelector('.edit-picture input[type=file]');
editPictureFile.addEventListener('change', function () {
    validate.checkImg($(this));
});

// 打开编辑
function edit(equipTempId) {
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
     			$(editPictureFile).val(''); // 初始化图片上传
     			$(editPictureFile).next().next('span').html('支持.jpg/.png/.JPEG(小于2M)').css('color','#dcdcdc');
     			etId = equipTempId;
     			$shade.fadeIn();
     			$('.edit-popup').fadeIn();
     			$.ajax({
     				type:"post",
     				url:"getEquipTempById",
     				data:"equipTempId="+equipTempId,
     				dataType:"json",
     				success:function(data){
     					$("#ename").val(data.name);
     					$("#ebrand").val(data.brand);
     					$("#emodel").val(data.model);
     					$("#eunit").val(data.unit);
     					$("#eprice").val(data.price);
     					$("#ewarranty").val(data.warranty);
     					$("#emtbf").val(data.mtbf);
     					$("#esupplyCycle").val(data.supplyCycle);
     					$("#ePic").attr("src",basePath()+data.picUrl);
     					//级别下拉框
     					var levels = data.levels;
     					$("#elevel").empty();
     					var content = "<option value='0'>请选择级别</option>";
     					if(levels.length > 0){
     						for(var i=0; i<levels.length; i++){
     							if(levels[i].id == data.levelId){
     								content += "<option value="+levels[i].id+" selected>"+levels[i].name+"</option>";	
     							}else{
     								content += "<option value="+levels[i].id+">"+levels[i].name+"</option>";	
     							}
     						}
     					}
     					$("#elevel").append(content);
     					//供应商下拉框
     					var suppliers = data.suppliers;
     					$("#esupplier").empty();
     					var content1 = "<option value='0'>请选择供应商</option>";
     					if(suppliers.length > 0){
     						for(var i=0; i<suppliers.length; i++){
     							if(suppliers[i].id == data.supplierId){
     								content1 += "<option value="+suppliers[i].id+" selected>"+suppliers[i].name+"</option>";	
     							}else{
     								content1 += "<option value="+suppliers[i].id+">"+suppliers[i].name+"</option>";	
     							}
     						}
     					}
     					$("#esupplier").append(content1);
     					//关键参数
     					var equipKeyparam = data.equipKeyparam;
//     					$("#editForm2").empty();
     					var content2 = "";
     					if(equipKeyparam.length > 0){
     						for(var i=0; i<equipKeyparam.length; i++){
     							content2 += "<div class='item-group editKeyparam'>";
     							content2 += "<div class='title-num'><p>关键参数"+(i+1)+"</p><i class='remove-item-group'></i></div>";
     							content2 += "<input type='hidden' value="+equipKeyparam[i].id+">"
     							content2 += "<div class='content-item'><label>属性名</label>";
     							content2 += "<input type='text' class='easyui-validatebox' maxlength='50' placeholder='请输入属性名' name='name' value="+equipKeyparam[i].name+"></div>";
     							content2 += "<div class='content-item'><label>属性值</label>";
     							content2 += "<input type='text' class='easyui-validatebox' data-options='validType:'positiveTwo'' maxlength='7' placeholder='请输入属性值' name='value' value="+equipKeyparam[i].value+"></div>";
     							content2 += "<div class='content-item'><label>单位</label>";
     							content2 += "<input type='text' class='easyui-validatebox' maxlength='10' placeholder='请输入单位' name='unit' value="+equipKeyparam[i].unit+"></div>";
     							content2 += "<div class='content-item'><label>上限值</label>";
     							content2 += "<input type='text' class='easyui-validatebox' data-options='validType:'positiveTwo'' maxlength='7' placeholder='请输入上限值' name='upperLimit' value="+equipKeyparam[i].upperLimit+"></div>";
     							content2 += "<div class='content-item'><label>下限值</label>";
     							content2 += "<input type='text' class='easyui-validatebox' data-options='validType:'positiveTwo'' maxlength='7' placeholder='请输入下限值' name='lowerLimit' value="+equipKeyparam[i].lowerLimit+"></div>";
     							content2 += "</div>";
     						}
     					}
     					content2 += "<div class='content-item'><div class='edit-add'><i></i><span>添加关键参数</span></div></div></div>";
     					$("#editForm2").html(content2);
     					
     					
     					step[2].style.display = 'block';
     					step[3].style.display = 'none';
     					editNextBtn.style.display = "inline-block";
     					editPrevBtn.style.display = "none";
     					editSubmit.style.display = "none";
     					stepNum[3].removeChild(stepNum[3].firstChild);
     					stepNum[3].innerHTML = '2';
     					$('.line').eq(2).removeClass('green').addClass('gray')
     					
     					// 再次解析表单规则
     					$.parser.parse('#editForm2');
     					
     					// 滚动条向下移动
     					var scrollHeight = $('.edit-popup').find('.content').prop('scrollHeight');
     					$('.edit-popup').find('.content').scrollTop(scrollHeight);
     				}
     			});
     		}
		}
	});
};

// 关键参数框
function openParamPopup(equipTempId) {
    $shade.fadeIn();
    $('.param-popup').fadeIn();
    // 关键参数
    $('#paramTable').datagrid({
    	url:"getKeyparamByEquipTempId?equipTempId="+equipTempId,
        fit: true,
        fitColumns: true,
        rownumbers: true,
        singleSelect: true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'name',
                    title: '属性名',
                    align: 'center',
                    width: 100
                },
                {
                    field: 'value',
                    title: '属性值',
                    align: 'center',
                    width: 100
                    
                },
                {
                    field: 'unit',
                    title: '单位',
                    align: 'center',
                    width: 100
                    
                },
                {
                    field: 'topValue',
                    title: '上限值',
                    align: 'center',
                    width: 100
                    
                },
                {
                    field: 'botValue',
                    title: '下限值',
                    align: 'center',
                    width: 100
                    
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
    })
}

// 供应详情
function opensupPopup(equipTempId) {
    $shade.fadeIn();
    $('.sup-popup').fadeIn();
    // 供应商详情
    $('#supTable').datagrid({
    	url:"getSupplierByEquipTempId?equipTempId="+equipTempId,
        fit: true,
        fitColumns: true,
        singleSelect: true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'name',
                    title: '供应商名称',
                    width:100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'name1',
                    title: '售前联系人',
                    width:100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'phone1',
                    title: '售前电话',
                    width:100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'email1',
                    title: '售前邮箱',
                    width:100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'name2',
                    title: '售后联系人',
                    width:100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'phone2',
                    title: '售后电话',
                    width:100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
                {
                    field: 'email2',
                    title: '售后邮箱',
                    width:100,
                    formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
                },
            ]
        ]
    })
}


// 单个删除
var etId;
function singleDelete(equipTempId) {
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
     			etId = equipTempId;
     			$shade.fadeIn();
     			$('.delete-wrapper').fadeIn();
     		}
		}
	});
};

// 生成按钮
// 1 添加关键参数按钮
// 2 名称重复提示
function createBtn(num) {
    switch (num) {
        case 1:
            var btn = '<div class="content-item">';
            btn += '<div class="new-add">';
            btn += '<i></i><span>添加关键参数</span>';
            btn += '</div></div>';
            break;
        case 2:
            var btn = '<div class="repate-name">';
            btn += '<i></i>';
            btn += '<span>名称已存在</span>';
            btn += '</div>';
            break;
        case 3:
            var btn = '<div class="content-item">';
            btn += '<div class="edit-add">';
            btn += '<i></i><span>添加关键参数</span>';
            btn += '</div></div>';
            break;
    }

    return btn;
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
