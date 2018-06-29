// ======================================全局变量======================================
var anaId;
var staName;
var staId;
var $shade = $('.shade'); // 遮罩
var keyPara; //设备的关键参数
var chooseId=0; //默认的选择的关键参数的id
$(function() {
	// ======================================下拉树======================================
	$('#client').combotree({
		url : 'getAreaTree',
		method : 'get',
		width : 250,
		height : 30,
		hasDownArrow : false,
		onChange : function() {
			var areaId = $("#client").combotree("getValue");
			getStation(areaId); //得到厂站的变化
			$("#dg").datagrid({
				url : "getAnalog",
				queryParams : {
					areaId : areaId,
				}
			});
		}
	});

	//直接加载所有的厂站
	getStation(0);

	// ======================================表格======================================
	$('#dg').datagrid({
		url : "getAnalog",
		pagination : true, //开启分页  
		pageSize : 10, //分页大小  
		fit : true,
		fitColumns : true,
		rownumbers : true,
		singleSelect : true,
		columns : [
			[ {
				field : 'stationId',
				hidden : true
			},
				{
					field : 'station',
					title : '所属厂站',
					width : 60
				},
				{
					field : 'position',
					title : '位置',
					width : 50
				},
				{
					field : 'equip',
					title : '设备名',
					width : 60
				},
				{
					field : 'len',
					title : '所占长度',
					width : 20
				},
				{
					field : 'subfix',
					title : '字节序号',
					width : 20
				},
				{
					field : 'max',
					title : 'MAX(mg/L)',
					width : 30
				},
				{
					field : 'min',
					title : 'MIN(mg/L)',
					width : 30
				},
				{
					field : 'speed',
					title : '速度(m/h)',
					width : 30
				},
				{
					field : 'square',
					title : '面积(m2)',
					width : 30
				},
				{
					field : 'price',
					title : '价格(元)',
					width : 30
				},
				{
					field : 'param',
					title : '关键参数',
					width : 30,
					formatter : function(value, rec) {
					
						return '<a class="key-param" onclick="keyParamDetail(' + rec.param + ')">详情</a>'
					}
				},
				{
					field : 'description',
					title : '描述',
					width : 80
				},
				{
					field : 'operate',
					title : '操作',
					width : 50,
					formatter : function(value, rec) {
						var content = '';
						content += '<div class="table-operation">';
						content += '<a class="table-edit" onclick=edit(' + rec.id +')><i></i>编辑</a>';
						content += '<a class="table-delete" onclick=singleDelete(' + rec.id + ')><i></i>删除</a>';
						content += '</div>';
						return content;
					}
				}
			]
		]/*,
		onLoadSuccess : function(data) {
			if (data.total == 0) {
				$(this).datagrid('appendRow', {
					name : '<div style="text-align:center;color:red">没有相关记录！</div>'
				}).datagrid('mergeCells', {
					index : 0,
					field : 'name',
					colspan : 12
				})
				//隐藏分页导航条，这个需要熟悉datagrid的html结构，直接用jquery操作DOM对象，easyui datagrid没有提供相关方法隐藏导航条
				$(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
			}
		}*/
	});

	
	
	
	
	
	// ======================================新建框======================================
	var $newPopup = $('.new-popup'); // 新建弹窗框
	var newBtn = document.querySelector('.new-btn'); // 新建按钮
	var newSubmit = document.querySelector('.new-submit'); // 新建提交按钮
	var $newRole = $('#newRole'); // 新建-通知角色cbt
	var $newKeyRadio = $('.new-key-radio');


	// 打开弹窗，清空数据
	newBtn.addEventListener('click', function() {
		$shade.fadeIn();
		$newPopup.fadeIn();
		$newPopup.find('input[type=text]').val('');
		$newPopup.find('textarea').val('');
		$newPopup.find('select').each(function() {
			$(this).find('option').eq(0).prop('selected', true);
		});
		$('.new-key-item').hide().find('.check-row')
			.prop('checked', false)
			.parent().removeClass('checkbox-wrapper-checked');
		$('.new-key-wrapper').hide();
		//查询区域
		$('#area').combotree({
			url : 'getAreaTree',
			method : 'get',
			width : 250,
			height : 30,
			hasDownArrow : false,
			onChange : function() {
				var areaId = $("#area").combotree("getValue");
				getAddStation(areaId); //得到厂站
				getPosition(); //得到所有的位置
			}
		});
	});

	// 新建提交按钮
	newSubmit.addEventListener('click', function() {
		var result = $("#newForm").form('enableValidation').form('validate');
		$('#newForm').form('submit', {
			onSubmit : function() {
				//判断在此厂站下此字节是否重复
				var aa = false;
				$.ajax({
					type : "POST",
					url : "getIsRepeat",
					async : false,
					data : {
						stationId : $("#stations").val(),
						subfix : $("#subfix").val(),
					},
					dataType : "json",
					success : function(msg) {
						if(msg[0].invalidate){
							window.parent.location.href = msg[0].loginPage;
						}

						if (msg == 1) {
							new CustomPrompt({
								type : 'error',
								msg : '该字节序号已经存在,请重新输入'
							});
							aa = false;
						} else {
							aa = true;
						}
					}
				});
				if ($(this).form('enableValidation').form('validate') && aa) {
					var obj = new Object();
					obj.stationId = $("#stations").val();
					obj.positionId = $("#positions").val();
					obj.equipOnlyId = $("#equips").val();
					obj.len = $("#len").val();
					obj.subfix = $("#subfix").val();
					obj.max = $("#max").val();
					obj.min = $("#min").val();
					obj.speed = $("#speed").val();
					obj.square = $("#square").val();
					obj.price = $("#price").val();
					obj.description = $("#description").val();
					obj.equipKeyparamId = chooseId;
					console.log(chooseId)
					$("#addAnalog").val(JSON.stringify(obj));
					return true;
				} else {
					return false;
				}
			},
			success : function(data) {
				if (data > 0) {
					new CustomPrompt({
						type : 'success',
						msg : '提交成功'
					});
					$shade.fadeOut();
					$newPopup.fadeOut();
					$("#dg").datagrid("reload");
				} else {
					new CustomPrompt({
						type : 'default',
						msg : '提交失败'
					});
				}
			},
			error : function(data) {
				new CustomPrompt({
					type : 'error',
					msg : '系统错误'
				});
			}
		});
	});

	// 新建选择设备
	$('#equips').on('change', function() {
		$.ajax({
			type : "POST",
			url : "getKeyparam",
			async : true,
			data : {
				stationId : $("#stations").val(),
				onlyId : $("#equips").val(),
			},
			dataType : "json",
			success : function(msg) {
				console.log(msg)
				$(".new-key-radio").empty();
				keyPara = msg;
				var content = "";
				if (msg != null && msg.length > 0) {
					for (var i = 0; i < msg.length; i++) {
						content += '<div>';
						content += ' <a class="checkbox-wrapper">';
						content += ' <i></i>';
						content += '<input type="checkbox" name="" id="" class="check-row" value="' + (i + 1) + '">';
						content += '</a>';
						content += '<span>' + msg[i].name + '</span>';
						content += '</div>';
					}
				}
				$(".new-key-radio").append(content);
				common.commonCheckbox('.new-key-radio');
			}
		});

		if (this.value != 0) {
			$('.new-key-item').show();
		} else {
			$('.new-key-item').hide();
			$('.new-key-wrapper').hide();
			$newKeyRadio.find('.check-row')
				.prop('checked', false)
				.parent().removeClass('checkbox-wrapper-checked')
		}
	});

	// 新建 单选框
	$newKeyRadio.on('change', '.check-row', function() {
		var $newKeyWrapper = $('.new-key-wrapper');
		var $span = $newKeyWrapper.find('span');
		if (this.checked === true) {
			$newKeyWrapper.show();

			var num = keyPara.length;
			console.log(keyPara)
			for (var i = 0; i < num; i++) {
				if (this.value == (i + 1)) {
					chooseId = keyPara[i].id
					console.log(chooseId)
					$span.eq(0).text(keyPara[i].name)
					$span.eq(1).text(keyPara[i].value)
					$span.eq(2).text(keyPara[i].unit)
					$span.eq(3).text(keyPara[i].upperLimit)
					$span.eq(4).text(keyPara[i].lowerLimit)
					break;
				}
			}
			/* switch ( this.value) {
			     case '1':
			         $span.eq(0).text('属性名1')
			         $span.eq(1).text('属性值1')
			         $span.eq(2).text('单位1')
			         $span.eq(3).text('上限1')
			         $span.eq(4).text('下限1')
			         break;
			     case '2':
			         $span.eq(0).text('属性名2')
			         $span.eq(1).text('属性值2')
			         $span.eq(2).text('单位2')
			         $span.eq(3).text('上限2')
			         $span.eq(4).text('下限2')
			         break;
			     case '3':
			         $span.eq(0).text('属性名3')
			         $span.eq(1).text('属性值3')
			         $span.eq(2).text('单位3')
			         $span.eq(3).text('上限3')
			         $span.eq(4).text('下限3')
			         break;
			     case '4':
			         $span.eq(0).text('属性名4')
			         $span.eq(1).text('属性值4')
			         $span.eq(2).text('单位4')
			         $span.eq(3).text('上限4')
			         $span.eq(4).text('下限4')
			         break;
			     default: break;
			 }*/
			$newKeyRadio.find('.check-row')
			$newKeyRadio.find('.check-row').not(this)
				.prop('checked', false)
				.parent().removeClass('checkbox-wrapper-checked')
		} else {
			$newKeyWrapper.hide();
			chooseId = 0;
		}
	})



	// ======================================编辑框======================================
	// 编辑提交按钮
	var editSubmit = document.querySelector('.edit-submit'); // 编辑提交按钮
	var $editPopup = $('.edit-popup'); // 编辑弹窗框
	var $editKeyRadio = $('.edit-key-radio');


	editSubmit.addEventListener('click', function() {
		$('#editForm').form('submit', {
			onSubmit : function() {
				//判断在此厂站下此字节是否重复
				var aa = false;
				$.ajax({
					type : "POST",
					url : "getIsOnly",
					async : false,
					data : {
						stationId : staId,
						subfix : $("#esubfix").val(),
						analogId : anaId,
					},
					dataType : "json",
					success : function(msg) {
						if (msg == 1) {
							new CustomPrompt({
								type : 'error',
								msg : '该字节序号已经存在,请重新输入'
							});
							aa = false;
						} else {
							aa = true;
						}
					}
				});
				if ($(this).form('enableValidation').form('validate') && aa) {
					var obj = new Object();
					obj.id = anaId;
					var station = new Object();
					station.id = staId;
					obj.station = station;

					var positionId = $("#eposition").val();
					var position = new Object();
					position.id = positionId;
					obj.position = position;

					obj.onlyId = $("#eequip").val();
					obj.len = $("#elen").val();
					obj.subfix = $("#esubfix").val();
					obj.max = $("#emax").val();
					obj.min = $("#emin").val();
					obj.speed = $("#espeed").val();
					obj.square = $("#esquare").val();
					obj.price = $("#eprice").val();
					obj.description = $("#edescription").val();
					if (chooseId != 0) {
						var equipKeyparam = new Object();
						equipKeyparam.id = chooseId
						obj.equipKeyparam = equipKeyparam;
					}
					console.log(obj)
					console.log(JSON.stringify(obj))
					$.ajax({
						type : "post",
						url : "updateAnalog",
						contentType : 'application/json;charset=utf-8', //设置请求头信息
						traditional : true, //这使json格式的字符不会被转码
						data : JSON.stringify(obj),
						dataType : "json",
						success : function(data) {
							if (data > 0) {
								new CustomPrompt({
									type : 'success',
									msg : '提交成功'
								});
								$shade.fadeOut();
								$editPopup.fadeOut();
								$("#dg").datagrid("load");
							} else {
								new CustomPrompt({
									type : 'default',
									msg : '提交失败'
								});
							}
						}
					});
				}
			},
		});
	});

	// 编辑 选择设备
	$('#eequip').on('change', function() {
		$.ajax({
			type : "POST",
			url : "getKeyparam",
			async : true,
			data : {
				stationId : staId,
				onlyId : $("#eequip").val(),
			},
			dataType : "json",
			success : function(msg) {
				console.log(msg)
				$(".edit-key-radio").empty();
				keyPara = msg;
				var content = "";
				if (msg != null && msg.length > 0) {
					for (var i = 0; i < msg.length; i++) {
						content += '<div>';
						content += ' <a class="checkbox-wrapper">';
						content += ' <i></i>';
						content += '<input type="checkbox" name="" id="" class="check-row" value="' + (i + 1) + '">';
						content += '</a>';
						content += '<span>' + msg[i].name + '</span>';
						content += '</div>';
					}
				}
				$(".edit-key-radio").append(content);
				common.commonCheckbox('.new-key-radio');
			}
		});
		if (this.value != 0) {
			$('.edit-key-item').show();
		} else {
			$('.edit-key-item').hide();
			$('.edit-key-wrapper').hide();
			$editKeyRadio.find('.check-row')
				.prop('checked', false)
				.parent().removeClass('checkbox-wrapper-checked')
		}
	});

	// 编辑 单选框
	$editKeyRadio.on('change', '.check-row', function() {
		var $editKeyWrapper = $('.edit-key-wrapper');
		var $span = $editKeyWrapper.find('span');
		if (this.checked === true) {
			$editKeyWrapper.show();

			var num = keyPara.length;
			console.log(keyPara)
			for (var i = 0; i < num; i++) {
				if (this.value == (i + 1)) {
					chooseId = keyPara[i].id
					console.log(chooseId)
					$span.eq(0).text(keyPara[i].name)
					$span.eq(1).text(keyPara[i].value)
					$span.eq(2).text(keyPara[i].unit)
					$span.eq(3).text(keyPara[i].upperLimit)
					$span.eq(4).text(keyPara[i].lowerLimit)
					break;
				}
			}


			/*  switch (this.value) {
			      case '1':
			          $span.eq(0).text('属性名1')
			          $span.eq(1).text('属性值1')
			          $span.eq(2).text('单位1')
			          $span.eq(3).text('上限1')
			          $span.eq(4).text('下限1')
			          break;
			      case '2':
			          $span.eq(0).text('属性名2')
			          $span.eq(1).text('属性值2')
			          $span.eq(2).text('单位2')
			          $span.eq(3).text('上限2')
			          $span.eq(4).text('下限2')
			          break;
			      case '3':
			          $span.eq(0).text('属性名3')
			          $span.eq(1).text('属性值3')
			          $span.eq(2).text('单位3')
			          $span.eq(3).text('上限3')
			          $span.eq(4).text('下限3')
			          break;
			      case '4':
			          $span.eq(0).text('属性名4')
			          $span.eq(1).text('属性值4')
			          $span.eq(2).text('单位4')
			          $span.eq(3).text('上限4')
			          $span.eq(4).text('下限4')
			          break;
			      default: break;
			  }*/
			$editKeyRadio.find('.check-row')
			$editKeyRadio.find('.check-row').not(this)
				.prop('checked', false)
				.parent().removeClass('checkbox-wrapper-checked')
		} else {
			$editKeyWrapper.hide();
			chooseId = 0;
		}
	})

	// ======================================关闭弹窗按钮======================================
	var $closeBtn = $('.close-icon'); // 关闭弹窗按钮
	$closeBtn.on('click', function() {
		console.log(11111111)
		$shade.fadeOut();
		$(this).parents('.popup').fadeOut();
	})

	// ======================================取消按钮======================================
	$('.infor-cancel').on('click', function() {
		$shade.fadeOut();
		$(this).parents('.infor-wrapper').fadeOut();
	});

	// ======================================确认删除按钮======================================
	var deleteConfirm = document.querySelector('.delete-confirm');
	deleteConfirm.addEventListener('click', function() {
		$.ajax({
			type : "POST",
			url : "deleteAnalog",
			data : "analogId=" + anaId,
			success : function(data) {
				if (data == 1) {
					$shade.fadeOut();
					$('.delete-wrapper').fadeOut();
					new CustomPrompt({
						type : 'success',
						msg : '删除成功'
					});
					$("#dg").datagrid("reload");
				} else {
					new CustomPrompt({
						type : 'default',
						msg : '删除失败'
					});
				}
			},
			error : function() {
				new CustomPrompt({
					type : 'error',
					msg : '系统错误'
				});
			}
		});

	});
});

// ======================================其他方法======================================
// 编辑
function edit(analogId) {
	anaId = analogId;
	$.ajax({
		type : "POST",
		url : "getOneAnalog",
		async : false,
		data : "analogId=" + analogId,
		dataType : "json",
		success : function(msg) {
			staId = msg.stationId;
			$("#estation").val(msg.station);
			getEditPosition(); //得到编辑的所有的位置
			$("#elen").val(msg.len);//默认显示的len
			$("#esubfix").val(msg.subfix);//默认显示的subfix
			if(msg.max!=undefined){//默认显示的max
				$("#emax").val(msg.max);
			}
			if(msg.min!=undefined){//默认显示的min
				$("#emin").val(msg.min);
			}
			if(msg.speed!=undefined){//默认显示的speed
				$("#espeed").val(msg.speed);
			}
			if(msg.square!=undefined){//默认显示的square
				$("#esquare").val(msg.square);
			}
			if(msg.description!=undefined){//默认显示的description
				$("#edescription").val(msg.description);
			}
		}
	});
	
	

	$shade.fadeIn();
	$('.edit-popup').fadeIn();
	common.commonCheckbox('.edit-key-radio');
}

// 单个删除

function singleDelete(analogId) {
	anaId = analogId;
	$shade.fadeIn();
	$('.delete-wrapper').fadeIn();

}


//===============根据区域获取厂站=================================
function getStation(areaId) {
	$.ajax({
		type : "POST",
		url : "getStations",
		async : false,
		data : "areaId=" + areaId,
		dataType : "json",
		success : function(msg) {
			var content = "";
			$("#stationList").empty();
			content += "<option value='0'>请选择厂站</option>";
			for (var i = 0; i < msg.length; i++) {
				var staionName = msg[i].stationName;
				var stationId = msg[i].stationId;
				content += "<option value='" + stationId + "'>" + staionName + "</option>";
			}
			$("#stationList").append(content);
		}
	});
}
//新增厂站的时候根据区域查询厂站
function getAddStation(areaId) {
	$.ajax({
		type : "POST",
		url : "getStations",
		async : true,
		data : "areaId=" + areaId,
		dataType : "json",
		success : function(msg) {
			var content = "";
			$("#stations").empty();
			content += "<option value='0'>请选择厂站</option>";
			for (var i = 0; i < msg.length; i++) {
				var staionName = msg[i].stationName;
				var stationId = msg[i].stationId;
				content += "<option value='" + stationId + "'>" + staionName + "</option>";
			}
			$("#stations").append(content);
		}
	});
}




//顶部厂站的变化，查询发生改变
function chooseStation() {
	var stationId = $("#stationList").val();
	$("#dg").datagrid({
		url : "getAnalog",
		queryParams : {
			stationId : stationId,
		}
	});
}

//新增的时候查询所有的位置
function getPosition() {
	var stationId = $("#stations").val();
	$.ajax({
		type : "POST",
		url : "getPositions",
		async : true,
		dataType : "json",
		success : function(msg) {
			var content = "";
			$("#positions").empty();
			content += "<option value='0'>请选择位置</option>";
			for (var i = 0; i < msg.length; i++) {
				var positionName = msg[i].positionName;
				var positionId = msg[i].positionId;
				content += "<option value='" + positionId + "'>" + positionName + "</option>";
			}
			$("#positions").append(content);
		}
	});
}


//编辑的时候查询所有的位置
function getEditPosition() {
	$.ajax({
		type : "POST",
		url : "getPositions",
		async : true,
		dataType : "json",
		success : function(msg) {
			var content = "";
			$("#eposition").empty();
			content += "<option value='0'>请选择位置</option>";
			for (var i = 0; i < msg.length; i++) {
				var positionName = msg[i].positionName;
				var positionId = msg[i].positionId;
				content += "<option value='" + positionId + "'>" + positionName + "</option>";
			}
			$("#eposition").append(content);
		}
	});
}


//新建的时候根据厂站及位置得到设备
function getEquip() {
	var positionId = $("#positions").val();
	var stationId = $("#stations").val();
	console.log(stationId)
	$.ajax({
		type : "POST",
		url : "getEquipsByStaPos",
		async : true,
		data : "stationId=" + stationId + "&positionId=" + positionId,
		dataType : "json",
		success : function(msg) {
			var content = "";
			$("#equips").empty();
			content += "<option value='0'>请选择设备</option>";
			for (var i = 0; i < msg.length; i++) {
				var equipName = msg[i].equipName;
				var equipOnlyId = msg[i].equipOnlyId;
				content += "<option value='" + equipOnlyId + "'>" + equipName + "</option>";
			}
			$("#equips").append(content);
		}
	});
}


//编辑时候根据厂站和位置得到设备
function getEditEquip() {
	var positionId = $("#eposition").val();
	$.ajax({
		type : "POST",
		url : "getEquipsByStaPos",
		async : true,
		data : "stationId=" + staId + "&positionId=" + positionId,
		dataType : "json",
		success : function(msg) {
			var content = "";
			$("#eequip").empty();
			content += "<option value='0'>请选择设备</option>";
			for (var i = 0; i < msg.length; i++) {
				var equipName = msg[i].equipName;
				var equipOnlyId = msg[i].equipOnlyId;
				content += "<option value='" + equipOnlyId + "'>" + equipName + "</option>";
			}
			$("#eequip").append(content);
		}
	});
}

//点击关键参数
function keyParamDetail(paramId) {
	$shade.fadeIn();
	$('.key-param-detail').fadeIn()
	if (paramId != 0) {
		$.ajax({
			type : "POST",
			url : "getParam",
			async : true,
			data : "paramId=" + paramId,
			dataType : "json",
			success : function(msg) {
				$(".content").empty();
				var content = "";
				if (msg != null) {
					content += '<div class="content-item">';
					content += '<label>属性名</label>';
					content += ' <span>' + msg.name + '</span>';
					content += ' </div>';

					content += '<div class="content-item">';
					content += '<label>属性值</label>';
					content += ' <span>' + msg.value + '</span>';
					content += ' </div>';

					content += '<div class="content-item">';
					content += '<label>单位</label>';
					content += ' <span>' + msg.unit + '</span>';
					content += ' </div>';

					content += '<div class="content-item">';
					content += '<label>最小值</label>';
					content += ' <span>' + msg.lowerLimit + '</span>';
					content += ' </div>';

					content += '<div class="content-item">';
					content += '<label>最大值</label>';
					content += ' <span>' + msg.upperLimit + '</span>';
					content += ' </div>';
				}
				$(".content").append(content);
			}
		});
	}




}