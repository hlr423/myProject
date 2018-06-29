// ======================================全局变量======================================
var worksheetId; //督办事件传的值
var aId; //新建的时候地址对应的index
var tId; //新建任务派发的所对应的div的index
/*var location = (window.location+'').split('/'); 
var basePath1 = location[0]+'//'+location[2]+'/'+location[3]; */

$(function() {
	// ======================================变量+初始化======================================
	// 整体table
	/*var wno = $("#searchInput").val().trim();
 	var stateId = parseInt($("#states").val());
 	var areaId = parseInt($("#area").val());
 	areaId = isNaN(parseInt($("#area").val()))?0:parseInt($("#area").val());
 	var startTime = $("#startTime").val();
 	var endTime = $("#endTime").val();*/
	$('#dg').datagrid({
		url : "getWorkSheetByPager",
		queryParams : {
			"startTime" : $("#startTime").val(),
			"endTime" : $("#endTime").val(),
			"wno" : $("#searchInput").val().trim(),
			"stateId" : parseInt($("#states").val()),
			"areaId" : parseInt($("#area").val()),
		},
		pagination : true, //开启分页  
		pageSize : 10, //分页大小  
		fit : true,
		fitColumns : true,
		rownumbers : true, // 显示行号列
		singleSelect : true, // 允许选择一行
		scrollbarSize : 6, // 滚动条宽度
		columns : [
			[
				{
					field : 'id',
					hidden : true
				},
				{
					field : 'workSheetType',
					title : '类型',
					width : 100,
				},
				{
					field : 'workSheetNo',
					title : '工单编号',
					width : 150,
				},
				{
					field : 'stateId',
					hidden : true
				},
				{
					field : 'stateName',
					title : '状态',
					width : 100,
					align : 'center',
					formatter : function(value, row, index) {
						var stateId = row.stateId;
						if (stateId == 1) { //已派发
							var node = '<a class="td-state-out">' + value + '</a>';
						}
						if (stateId == 2) { //处理中
							var node = '<a class="td-state-ing">' + value + '</a>';
						}
						if (stateId == 3) { //已完成
							var node = '<a class="td-state-over">' + value + '</a>';
						}
						if (stateId == 4) { //已验收
							var node = '<a class="td-state-over">' + value + '</a>';
						}
						return node;
					}
				},
				{
					field : 'createTime',
					title : '派发时间',
					width : 150,
				},
				{
					field : 'name',
					title : '运维人员',
					width : 150,
				},
				{
					field : 'E',
					title : '详情',
					width : 100,
					align : 'center',
					formatter : function(value, row, index) {
						var node = '<a class="td-detail" onClick="detailOpen(' + row.id + ')">详情</a>';
						return node;
					}
				},
				{
					field : 'F',
					title : '操作',
					width : 100,
					align : 'center',
					formatter : function(value, row, index) {
						var node;
						var stateId = row.stateId;
						if (stateId == 1) { //已派发
							node = '<a class="td-urged" onClick="openDoing(' + row.id + ')">督办</a>';
						}
						if (stateId == 2) { //处理中
							node = '<a class="td-urged" onClick="openDoing(' + row.id + ')">督办</a>';
						}
						return node;
					}
				},
			]
		],
	});

	// 初始化时间控件
	$('.search-wrapper .chose-time').each(function(index, node) {
		laydate.render({
			elem : node,
			type : 'datetime'
		});
	});

	// ======================================弹窗======================================
	$('.close-icon').on('click', function() {
		var $this = $(this);
		$this.parents('.popup').fadeOut();
		$('.shade').fadeOut();
	});



	// ======================================新建派发======================================
	var newBtn = document.querySelector('.new-btn'); // 新建派发按钮
	var $newPopup = $('.newAdd-popup'); // 新建弹窗
	var addTaskBtn = document.querySelector('.add-taskBtn'); // 添加任务按钮
	var newAddSubmit = document.querySelector('.newAdd-submit'); // 新建派发提交按钮

	// 弹出新建弹窗
	newBtn.addEventListener('click', function() {
		aId = 0;
		$newPopup.fadeIn();
		$('.shade').fadeIn();
		laydate.render({ // 初始化时间控件
			elem : '.popup-chose-time',
			type : 'datetime'
		});

		$('.area2:eq(' + aId + ')').combotree({
			url : "getAreaTree",
			method : 'get',
			width : 250,
			height : 30,
			hasDownArrow : false,
			onChange : function() {
				aId = 0;
				getStationByArea();
			}
		});
	})
	// 添加任务
	addTaskBtn.addEventListener('click', function() {
		var $this = $(this);
		var $tempNode = $this.prev().clone();
		$tempNode.find('.person').html('')
		$tempNode.find('.person-num>span>span').html('0')

		var $content = $this.parents('.content');
		var num = $content.find('.task').length;
		var node = '<div class="content-item"><label>*地址:</label>' +
			'<select class="easyui-validatebox area2" ><option>请选择区域</option></select>' +
			'</div>';

		$this.before($tempNode);
		var taskLength = $('.task').length;
		var $taskLast = $('.task').eq(taskLength - 1);
		$taskLast.find('>div:nth-of-type(1)').remove(); // 删除cobomtree所在的DIV
		$taskLast.find('>div:nth-of-type(1)').before(node); // 新增combotree
		$taskLast.find('.area2').combotree({
			url : 'getAreaTree',
			required : true,
			prompt : '请选择区地址',
			width : 250,
			height : 30,
			hasDownArrow : false,
			onChange : function() {
				aId = $('.area2').index(this);
				getStationByArea();
			}
		});
		$content.animate({
			scrollTop : $content[0].scrollHeight + num * 343 + 'px'
		})
		$('.task').each(function(index, n) {
			if (index != 0) {
				$(n).find('.delete-task').css('display', 'inline-block');
			}
		});
		$content.find('select').validatebox();
		$.parser.parse($('.newAdd-form')); // 从新解析easyUI 验证

	});

	// 删除新增任务
	$newPopup.on('click', '.delete-task', function() {
		var $content = $(this).parents('.content');
		var h = $content[0].scrollHeight;
		$(this).parents('.task').remove();
		$content.animate({
			scrollTop : h - 1000 + 'px'
		});
	});

	// 新建派发提交
	newAddSubmit.addEventListener('click', function() {
		$('.newAdd-form').form('submit', {
			onSubmit : function() {
				var formValue = $(this).form('enableValidation').form('validate');
				var $choseTime = $(this).find('.popup-chose-time'); // 时间控件
				var flag=true;
				$('.person').each(function(index,node){
					console.log($(node).find('person1').length)
					if($(node).find('div').length==0){
						flag=false;
					}
				})
				if ($choseTime.val() == '') {
					new CustomPrompt({
						type : 'default',
						msg : '请选择时间'
					});
					return false;
				} 
				console.log(flag)
				if(flag){
					var obj = new Object();
					obj.time = $('#time').val();
					obj.num = 1;
					var tasknum=$('.task').length;
					var task1=new Array();
					var personnum=new Set();//这个工单需要有几个人
					for (var i = 0; i < tasknum; i++) {
						var task=new Object();
						task.stationId = $('.station:eq(' + i + ')').val();
						task.equipId = $('.equip:eq(' + i + ')').val();
						task.text = $('.text:eq(' + i + ')').val();
						var list=new Array();
						$('.person:eq(' + i + ')>div').each(function(index, node) {
							list.push(parseInt($(node).attr('value')));
							personnum.add(parseInt($(node).attr('value')));
						})
						task.person=list;
						task1.push(task);
					}
					obj.task=task1;
					obj.num=personnum.size;
					console.log(obj)
					 $("#addManualWorkSheet").val(JSON.stringify(obj));
				}else{
					new CustomPrompt({
						type : 'default',
						msg : '请添加人员'
					});
					return false;
				}
				
			},
			success : function(data) {
				if (data > 0) {
					new CustomPrompt({
						type : 'success',
						msg : '提交成功'
					});
					$newPopup.fadeOut();
					$('.shade').fadeOut();
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
		})
	});

	// ======================================编辑人员======================================
	var $editPersonPopup = $('.edit-person-popup'); // 编辑人员弹窗
	var editPersonSubmit = document.querySelector('.edit-person-submit');

	// 弹出编辑人员弹窗
	$newPopup.on('click', '.edit-person', function() {
		tId = $newPopup.find('.edit-person').index(this);
		// 获取全部的运维人员
		getAllPerson();

		$newPopup.fadeOut();
		$editPersonPopup.fadeIn();
		common.commonCheckbox('.content-person', true) // 调用多选
		common.checkboxAll('.content-person') // 调用全选
	});
	// 返回新建
	$editPersonPopup.find('.return-icon').on('click', function() {
		$newPopup.fadeIn();
		$editPersonPopup.fadeOut();
		var num = 0;
		$('.nowPerson').each(function(index, node) {
			num += parseInt($(node).html());
		})
		console.log(num)
		console.log(tId)
		$('.personnum:eq(' + tId + ')').text(num);


		var list1 = [];
		$('.check-row:checked').each(function(index, node) {
			list1.push(parseInt($(node).val()));
		})
		console.log(list1)
		$.ajax({
			type : "post",
			data : {
				"list" : JSON.stringify(list1)
			},
			url : "getCheckedPerson",
			dataType : "json",
			async : true,
			success : function(msg) {
				console.log(msg);
				var content = '';
				for (var i = 0; i < msg.length; i++) {
					content += '<div id="person1" value="'+msg[i].id+'">';
					if (msg[i].picture != undefined) {
						content += '<img src="' + msg[i].picture + '" alt="" srcset="">';
					} else {
						content += '<img src="../front/public/images/head-img.png" alt="" srcset="">';
					}
					content += '<div>';
					content += '<p>' + msg[i].name + '</p>';
					content += '</div>';
					content += '</div>';
				}
				$('.person:eq(' + tId + ')').empty();
				$('.person:eq(' + tId + ')').append(content);
			}
		});
		list1 = [];
		console.log(list1)

	})
	$(".search-btn").click(function() {
		$('#dg').datagrid("reload", {
			"startTime" : $("#startTime").val(),
			"endTime" : $("#endTime").val(),
			"wno" : $("#searchInput").val().trim(),
			"stateId" : parseInt($("#states").val()),
			"areaId" : parseInt($("#area").val()),
		});
	})
	// 点击全选,改变已选人数
	$('.edit-person-popup').on('click', '.check-all', function() {
		var $this = $(this);
		var $contentPerson = $this.parents('.content-person');
		var checkbox = $contentPerson.find('.check-row');
		if ($this.is(':checked')) {
			$contentPerson.find('.nowPerson').html(checkbox.length);
		} else {
			$contentPerson.find('.nowPerson').html(0);
		}
	})
	// 点击单选,改变已选人数
	$('.edit-person-popup').on('click', '.check-row', function() {
		var num = 0;
		var $this = $(this);
		var $contentPerson = $this.parents('.content-person');
		var checkbox = $contentPerson.find('.check-row');
		checkbox.each(function(index, node) {
			if ($(node).is(':checked')) {
				num++;
			}
		})
		$contentPerson.find('.nowPerson').html(num);
	})
	// 提交
	editPersonSubmit.addEventListener('click', function() {
		var $this = $(this);
		var $content = $this.parents('.popup');
		var $checkbox = $content.find('.check-row');
		var num = $checkbox.length;
		$checkbox.each(function(index, node) {
			if ($(node).is(':checked')) {
				new CustomPrompt({
					type : 'success',
					msg : '提交成功'
				});
				$editPersonPopup.fadeOut();
				$('.shade').fadeOut();
				num--;
			}

		})
		console.log(num)
		if (num == 8) {
			new CustomPrompt({
				type : 'default',
				msg : '请至少选择一个人!!'
			});
		}
	});


	// ======================================督办======================================
	$('.table-wrapper').on('click', '.td-urged', function() {
		var $this = $(this);
		var time = 300;
		var timeInterval = setInterval(function() {
			time--;
			$this.html(time + 's');
			$this.removeClass('td-urged');
			if (time == 0) {
				$this.addClass('td-urged').html('督办');
				clearInterval(timeInterval);
			}
		}, 1000)
	});




	// ======================================其它======================================


});

// ======================================其它======================================
// 跳转到详情页面
function detailOpen(id) {
	window.location.href = "toWorksheetdetail?id=" + id;
}

// 点击督办
function openDoing(id) {
	$.ajax({
		type : "post",
		data : "worksheetId=" + id,
		url : "updateSupervise",
		dataType : "json",
		async : true,
		success : function(msg) {
			console.log(msg);
		}
	});

}




// 获取全部的运维人员
function getAllPerson() {
	$.ajax({
		type : "post",
		url : "getAllPerson",
		dataType : "json",
		async : false,
		success : function(msg) {
			var content = "";
			for (var i = 0; i < msg.length; i++) {
				content += '<div class="content-person">';
				content += '<span>';
				content += '<a class="checkbox-all-wrapper">';
				content += '<i></i>';
				content += '<input type="checkbox" name="" class="check-all"></a>';
				content += '' + msg[i].type + '';
				content += '</span>';
				content += '<p>共有<span class="allPerson" >' + msg[i].num + '</span>人，已选';
				content += '<span class="nowPerson">0</span>人</p>';
				content += '<div class="person">';
				for (var j = 0; j < msg[i].person.length; j++) {
					var data = msg[i].person;
					content += '<div><a class="checkbox-wrapper">';
					content += '<i></i><input type="checkbox" class="check-row" value=' + data[j].id + '>';
					if (data[j].picture != undefined) {
						content += '</a><img src="' + data[j].picture + '" alt=" " srcset=" ">';
					} else {
						content += '</a><img src="../front/public/images/head-img.png" alt=" " srcset=" ">';
					}
					content += '<p>' + data[j].name + '</p>';
					content += '</div>';
				}
				content += '</div>';
				content += '</div>';
			}

			$("#person").empty();
			$("#person").append(content);


		}
	});

}


// 获取区域
function getArea() {
	$.ajax({
		type : "post",
		url : "getAreaTree",
		dataType : "json",
		async : false,
		success : function(msg) {
			var content = '<option value="0">请选择区域</option>';
			for (var i = 0; i < msg.length; i++) {
				content += '<option value="' + msg[i].id + '">' + msg[i].text + '</option>';
			}
			$('.area2').empty();
			$('.area2').append(content);

		}
	});

}

//获取区域获取厂站
function getStationByArea() {
	var areaId = $('.area2:eq(' + aId + ')').combotree("getValue");
	$.ajax({
		type : "post",
		url : "getStations",
		dataType : "json",
		data : "areaId=" + areaId,
		async : false,
		success : function(msg) {
			var content = '<option value="0">请选择厂站</option>';
			for (var i = 0; i < msg.length; i++) {
				content += '<option value="' + msg[i].stationId + '">' + msg[i].stationName + '</option>';
			}
			$('.station:eq(' + aId + ')').empty();
			$('.station:eq(' + aId + ')').append(content);
		}
	});
}

//根据厂站获取设备
function getEquipByStation() {
	var stationId = $('.station:eq(' + aId + ')').val();
	$.ajax({
		type : "post",
		url : "getEquips",
		dataType : "json",
		data : "stationId=" + stationId,
		async : false,
		success : function(msg) {
			var content = '<option value="0">请选择设备</option>';
			for (var i = 0; i < msg.length; i++) {
				content += '<option value="' + msg[i].equipId + '">' + msg[i].equipName + '</option>';
			}
			$('.equip:eq(' + aId + ')').empty();
			$('.equip:eq(' + aId + ')').append(content);
		}
	});
}