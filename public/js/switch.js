// ======================================全局变量======================================
var swiId;
var staName;
var staId;
var $shade = $('.shade'); // 遮罩
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
				url : "getSwitch",
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
		url : "getSwitch",
		pagination : true, //开启分页  
		pageSize : 10, //分页大小  
		fit : true,
		fitColumns : true,
		rownumbers : true,
		singleSelect : true,
		columns : [
			[
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
					width : 50
				},
				{
					field : 'subfix',
					title : '字节序号',
					width : 30
				},
				{
					field : 'bitfix',
					title : '位号',
					width : 30
				},
				{
					field : 'off_des',
					title : 'off_des',
					width : 30
				},
				{
					field : 'on_des',
					title : 'on_des',
					width : 30
				},
				{
					field : 'description',
					title : '描述',
					width : 50
				},
				{
					field : 'operate',
					title : '操作',
					width : 50,
					formatter : function(value, rec) {
						var content = '';
						content += '<div class="table-operation">';
						content += '<a class="table-edit" onclick=edit(' + rec.id +  ')><i></i>编辑</a>';
						content += '<a class="table-delete" onclick=singleDelete(' + rec.id + ')><i></i>删除</a>';
						content += '</div>';
						return content;
					}
				}
			]
		]
	});

	// ======================================新建框======================================
	var $newPopup = $('.new-popup'); // 新建弹窗框
	var newBtn = document.querySelector('.new-btn'); // 新建按钮
	var newSubmit = document.querySelector('.new-submit'); // 新建提交按钮
	var $newRole = $('#newRole'); // 新建-通知角色cbt

	// 打开弹窗，清空数据
	newBtn.addEventListener('click', function() {
		$shade.fadeIn();
		$newPopup.fadeIn();
		$newPopup.find('input[type=text]').val('');
		$newPopup.find('textarea').val('');
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
				
			}
		});

		//加载所有的厂站
		$.ajax({
			type : "POST",
			url : "getStations",
			async : false,
			data : "areaId=" + 0,
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
	});

	//得到所有的位置
	getPosition(); 
	
	
	// 新建提交按钮
	newSubmit.addEventListener('click', function() {
		$('#newForm').form('submit', {
			onSubmit : function() {
				//判断在此厂站下此字节序号是否重复
				var aa = false;
				$.ajax({
					type : "POST",
					url : "getIsRepeat",
					async : false,
					data : {
						stationId : $("#stations").val(),
						subfix : $("#subfix").val(),
						bitfix : $("#bitfix").val(),
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

					var station = new Object();
					station.id = $("#stations").val();
					obj.station = station;

					//如果没有挂到位置上，则不添加属性
					if ($("#positions").val() != 0 && $("#positions").val() != null) {
						var position = new Object();
						position.id = $("#positions").val();
						obj.position = position;
					}

					if ($("#equips").val() != 0 && $("#equips").val() != null) {
						obj.onlyId = $("#equips").val();
					}

					obj.subfix = $("#subfix").val();
					obj.bitfix = $("#bitfix").val();

					if ($("#off_des").val() != null) {
						obj.off_des = $("#off_des").val();
					}

					if ($("#on_des").val() != null) {
						obj.on_des = $("#on_des").val();
					}

					if ($("#description").val() != null) {
						obj.description = $("#description").val();
					}
					console.log(obj)
					$("#addSwitch").val(JSON.stringify(obj));
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


	// ======================================编辑框======================================
	// 编辑提交按钮
	var editSubmit = document.querySelector('.edit-submit'); // 编辑提交按钮
	var $editPopup = $('.edit-popup'); // 编辑弹窗框
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
						switchId : swiId,
						stationId : staId,
						subfix : $("#esubfix").val(),
						bitfix : $("#ebitfix").val(),
					},
					dataType : "json",
					success : function(msg) {
						if (msg == 0) {
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
					obj.id = swiId;

					var station = new Object();
					station.id = staId;
					obj.station = station;

					//验证位置是否为空
					if ($("#eposition").val() != 0 && $("#eposition").val() != null) {
						var position = new Object();
						position.id = $("#eposition").val();
						obj.position = position;
					}

					if ($("#eequip").val() != null) {
						obj.onlyId = $("#eequip").val();
					}

					obj.subfix = $("#esubfix").val();
					obj.bitfix = $("#ebitfix").val();

					if ($("#eoff_des").val() != null) {
						obj.off_des = $("#eoff_des").val();
					}

					if ($("#eon_des").val() != null) {
						obj.on_des = $("#eon_des").val();
					}

					if ($("#edescription").val() != null) {
						obj.description = $("#edescription").val();
					}

					console.log(obj)
					$.ajax({
						type : "post",
						url : "updateSwitch",
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
			}
		});
	});

	// ======================================关闭弹窗按钮======================================
	var $closeBtn = $('.close-icon'); // 关闭弹窗按钮
	$closeBtn.on('click', function() {
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
			url : "deleteSwitch",
			data : "switchId=" + swiId,
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
function edit(switchId) {
	console.log(switchId)
	swiId = switchId;
	$.ajax({
		type : "POST",
		url : "getOneSwitch",
		data : "switchId=" + swiId,
		dataType: "json",
		success : function(msg) {
			console.log(msg)
			staId = msg.stationId;
			$("#estation").val(msg.station);
			getEditPosition(); //得到编辑的所有的位置
			$("#esubfix").val(msg.subfix);//默认显示的subfix
			$("#ebitfix").val(msg.bitfix);//默认显示的bitfix
			if(msg.eoff_des!=undefined){//默认显示的off-desc
				$("#eoff_des").val(msg.off_des);
			}
			if(msg.eon_des!=undefined){//默认显示的on-desc
				$("#eon_des").val(msg.on_des);
			}
			if(msg.edescription!=undefined){//默认显示的description
				$("#edescription").val(msg.description);
			}
		}
	});
	
	$shade.fadeIn();
	$('.edit-popup').fadeIn();
}
;

// 单个删除
function singleDelete(switchId) {
	swiId = switchId;
	$shade.fadeIn();
	$('.delete-wrapper').fadeIn();
}
;



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
		url : "getSwitch",
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