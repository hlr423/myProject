// ======================================全局变量======================================
var useId;
var deleteId;
var $shade = $('.shade'); // 遮罩
$(function() {
	var addCheck = true;
	var editCheck = true;
	var toCheck = true;
	// ============================================================================
	$('#area').combotree({
		url : 'getArea',
		method : 'get',
		width : 250,
		height : 30,
		hasDownArrow : false,
		onChange : function(node) {
			var areaId = $("#area").combotree("getValue");
			$('#dg').datagrid("load", {
				"areaId" : areaId
			});
		}
	});
	// =====================================详情弹框数据======================================
	$('#db').datagrid({
		fitColumns : true,
		singleSelect : true,
		scrollbarSize : 6,
		columns : [
			[
				{
					field : 'name',
					title : '班次名称',
					align : 'center',
					width : 120
				},
				{
					field : 'startTime',
					title : '上班时间',
					align : 'center',
					width : 230
				},
				{
					field : 'endTime',
					title : '下班时间',
					align : 'center',
					width : 230
				},
				{
					field : 'dg',
					title : '电工人数',
					align : 'center',
					width : 100,
				},
				{
					field : 'yx',
					title : '运行人数',
					align : 'center',
					width : 100
				},
				{
					field : 'jx',
					title : '机修人数',
					align : 'center',
					width : 100
				},
			]
		]
	})
	// ======================================表格======================================
	$('#dg').datagrid({
		fit : true,
		url : "getAllByPager",
		fitColumns : true,
		rownumbers : true,
		singleSelect : true,
		pagination : true, //开启分页  
		pageSize : 10, //分页大小  
		scrollbarSize : 6,
		columns : [
			[ {
				field : 'id',
				hidden : true
			},
				{
					field : 'areaId',
					hidden : true
				},
				{
					field : 'inUser',
					hidden : true
				},
				{
					field : 'areaName',
					title : '区域',
					width : 100,
					align : 'center'
				},
				{
					field : 'num',
					title : '倒班数',
					width : 100,
					align : 'center'
				},
				{
					field : 'groupNum',
					title : '班组数',
					width : 100,
					align : 'center'
				},
				{
					field : 'd',
					title : '倒班详情',
					align : 'center',
					width : 100,
					formatter : function(value, row, index) {
						$("#detailNum").val(row.num);
						return '<a class="detail" onclick=openDetail(' + row.id + ')>详情</a>'
					}
				},
				{
					field : 'turnDays',
					title : '轮换周期',
					width : 100,
					align : 'center'
				},
				{
					field : 'cycle',
					title : '生成周期',
					width : 100,
					align : 'center'
				},
				{
					field : 'operate',
					title : '操作',
					width : 150,
					formatter : function(value, row, index) {
						var content = '';
						content += '<div class="table-operation">';
						if (row.inUser) {
							content += '<a class="table-used" style="cursor: default"><i></i>已启用</a>';
						} else {
							content += '<a class="table-use" onclick=use(' + row.id + ')><i></i>启用</a>';
						}
						content += '<a class="table-edit"  onclick=edit(' + row.id + ')><i></i>编辑</a>';
						if (!row.inUser) {
							content += '<a class="table-delete" onclick=singleDelete(' + row.id + ')><i></i>删除</a>';
						}
						content += '</div>';
						return content;
					}
				}
			]
		]
	});

	// ======================================新建框======================================
	var $newPopup = $('.new-popup'); // 新建弹窗框
	var newBtn = document.getElementsByClassName('new-btn')[0]; // 新建按钮
	var newSubmit = document.getElementsByClassName('new-submit')[0]; // 新建提交按钮

	// 打开弹窗，清空数据
	newBtn.addEventListener('click', function() {
		$.ajax({
			type : "post",
			url : "addTest",
			dataType : "json",
			success : function(data) {
				if (null != data[0] && data[0].invalidate) {
					window.parent.location.href = data[0].loginPage;
				}
				if (null != data[0] && data[0].noOpt) {
					new CustomPrompt({
						type : 'error',
						msg : '您无权操作！'
					});
				} else {
					$shade.fadeIn();
					$newPopup.fadeIn();
					$newPopup.find('input[type=text]').val('');

					// 初始化cbt
					$("#addArea").combotree({
						url : 'getArea',
						method : 'get',
						width : 250,
						height : 30,
						hasDownArrow : false,
						prompt : '请选择区域',
						onChange : function(node) {
							var areaId = parseInt($("#addArea").combotree("getValue"));
							var num = $("#addNum").val();
							var groupNum = $("#addGroupNum").val();
							if (checkExist(areaId, num, groupNum, null)) {
								new CustomPrompt({
									type : 'default',
									msg : '已存在当前区域、倒班数、班组数的规则'
								});
							}
							$.post("getWorkerNumByAreaId", {
								"areaId" : areaId
							}, function(data) {
								addCheck = true;
								//       			if(data == "userInvilid"){//判断登录是否失效
								//       				window.parent.location.href="User!toLogin";
								//       			}
								//           		if(null != data.no_auth && data.no_auth == true){//判断是否具有权限
								//           			$('.noOpt').show().fadeOut(3000);
								//       			}else{
								$("#newTotaldNum").val(data.dg).prev().text(data.dg);
								$("#newTotalyNum").val(data.yx).prev().text(data.yx);
								$("#newTotaljNum").val(data.jx).prev().text(data.jx);
								if (data.dg == 0 && data.yx == 0 && data.jx == 0) {
									addCheck = false;
								}
							//       			}
							}, "json")
						}
					})
					//初始化生成周期
					initCreateCycle();
					// 初始化使时间插件
					lay('.new-date-plugin').each(function(e) {
						var _this = this;
						laydate.render({
							elem : this,
							type : 'time',
							done : function(value, date, endDate) {
								setTimeout(function() {
									$(_this).focus();
									$('.layui-laydate').hide();
								}, 0)
								if (value != '') {
									autoTime($(_this), date);
								}
							}
						})
					})
				}
			}
		})

	});


	// 新建-倒班数select
	$('#addNum').on('change', function() {
		var newTr = '<tr>';
		newTr += '<td><input type="text" name="shifts[2].name" class="easyui-validatebox new-group-name" data-options="required:true" maxlength="50" placeholder="请输入名称"></td>';
		newTr += '<td><input type="text" name="shifts[2].startTime" class="easyui-validatebox new-date-plugin new-start" data-options="required:true" placeholder="请选择时间"></td>';
		newTr += '<td><input type="text" name="shifts[2].endTime" class="easyui-validatebox new-date-plugin new-end" data-options="required:true" placeholder="请选择时间"></td>';
		newTr += '<td><input type="text" name="shifts[2].electrician" class="easyui-validatebox new-d-num" data-options="required:true" maxlength="50" placeholder="请输入名称"></td>';
		newTr += '<td><input type="text" name="shifts[2].technology" class="easyui-validatebox new-y-num" data-options="required:true" maxlength="50" placeholder="请输入名称"></td>';
		newTr += '<td><input type="text" name="shifts[2].mechanic" class="easyui-validatebox new-j-num" data-options="required:true" maxlength="50" placeholder="请输入名称"></td>';
		newTr += '</tr>';

		var $newTable = $('.new-table');
		var $option = $('.new-group-number option');
		if (this.value == 2) {
			$newTable.find('tr:eq(3)').remove();
			$option.eq(0).val('3').text(3);
			$option.eq(1).val('4').text(4);
		} else {
			$newTable.append(newTr);
			$option.eq(0).val('4').text(4);
			$option.eq(1).val('5').text(5);
		}
		lay('.new-date-plugin').each(function(e) {
			var _this = this;
			laydate.render({
				elem : this,
				type : 'time',
				done : function(value, date, endDate) {
					setTimeout(function() {
						$(_this).focus();
						$('.layui-laydate').hide();
					}, 0)
					if (value != '') {
						autoTime($(_this), date);
					}
				}
			})
		});
		// 再次解析规则
		$.parser.parse('.new-table');
	})

	// 新建提交按钮
	newSubmit.addEventListener('click', function() {
		$('#newForm').form('submit', {
			onSubmit : function() {
				var numError = true;
				var dTotal = 0;
				var yTotal = 0;
				var jTotal = 0;
				for (var i = 0; i < $('.new-d-num').length; i++) {
					dTotal += Number($('.new-d-num').eq(i).val());
					yTotal += Number($('.new-y-num').eq(i).val());
					jTotal += Number($('.new-j-num').eq(i).val());
				}
				if (parseInt(dTotal) > Number($('#newTotaldNum').val()) && !addCheck) {
					new CustomPrompt({
						type : 'error',
						msg : '电工人数之和大于总电工人数'
					});
					numError = false;
				} else if (yTotal > Number($('#newTotalyNum').val()) && !addCheck) {
					new CustomPrompt({
						type : 'error',
						msg : '运行人数之和大于总运行人数'
					});
					numError = false;
				} else if (jTotal > Number($('#newTotaljNum').val()) && !addCheck) {
					new CustomPrompt({
						type : 'error',
						msg : '机修人数之和大于总机修人数'
					});
					numError = false;
				}
				var areaId = parseInt($("#addArea").combotree("getValue"));
				var num = $("#addNum").val();
				var groupNum = $("#addGroupNum").val();
				if (checkExist(areaId, num, groupNum, null)) {
					new CustomPrompt({
						type : 'default',
						msg : '已存在当前区域、倒班数、班组数的规则'
					});
					numError = false;
				}
				return $(this).form('enableValidation').form('validate') && numError;
			},
			success : function(data) {
				var areaId = $("#area").combotree("getValue");
				$('#dg').datagrid("load", {
					"areaId" : areaId
				});
				if (parseInt(data) >= 1) {
					new CustomPrompt({
						type : 'success',
						msg : '提交成功'
					});
					$shade.fadeOut();
					$newPopup.fadeOut();
				} else if (data == 0) {
					new CustomPrompt({
						type : 'default',
						msg : '已存在当前区域、倒班数、班组数的规则'
					});
				}
			}
		});
	});


	// ======================================编辑框======================================
	// 编辑提交按钮
	var editSubmit = document.getElementsByClassName('edit-submit')[0]; // 编辑提交按钮
	var $editPopup = $('.edit-popup'); // 编辑弹窗框
	// 编辑-倒班数select
	$('#editNum').on('change', function() {
		var newTr = '<tr>';
		newTr += '<td><input type="text" name="shifts[2].name" class="easyui-validatebox edit-group-name" data-options="required:true" maxlength="50" placeholder="请输入名称"></td>';
		newTr += '<td><input type="text" name="shifts[2].startTime" class="easyui-validatebox edit-date-plugin edit-start" data-options="required:true" placeholder="请选择时间"></td>';
		newTr += '<td><input type="text" name="shifts[2].endTime" class="easyui-validatebox edit-date-plugin edit-end" data-options="required:true" placeholder="请选择时间"></td>';
		newTr += '<td><input type="text" name="shifts[2].electrician" class="easyui-validatebox edit-d-num" data-options="required:true" maxlength="50" placeholder="请输入名称"></td>';
		newTr += '<td><input type="text" name="shifts[2].technology" class="easyui-validatebox edit-y-num" data-options="required:true" maxlength="50" placeholder="请输入名称"></td>';
		newTr += '<td><input type="text" name="shifts[2].mechanic" class="easyui-validatebox edit-j-num" data-options="required:true" maxlength="50" placeholder="请输入名称"></td>';
		newTr += '</tr>';

		var $newTable = $('.edit-table');
		var $option = $('.edit-group-number option');
		if (this.value == 2) {
			$newTable.find('tr:eq(3)').remove();
			$option.eq(0).val('3').text(3);
			$option.eq(1).val('4').text(4);
		} else {
			$newTable.append(newTr);
			$option.eq(0).val('4').text(4);
			$option.eq(1).val('5').text(5);
		}
		lay('.edit-date-plugin').each(function(e) {
			var _this = this;
			laydate.render({
				elem : this,
				type : 'time',
				done : function(value, date, endDate) {
					setTimeout(function() {
						$(_this).focus();
						$('.layui-laydate').hide();
					}, 0)
					if (value != '') {
						autoTime($(_this), date);
					}
				}
			})
		});
		// 再次解析规则
		$.parser.parse('.edit-table');
	});
	// 编辑提交
	editSubmit.addEventListener('click', function() {
		$('#editForm').form('submit', {
			onSubmit : function() {
				var numError = false;
				var dTotal = 0;
				var yTotal = 0;
				var jTotal = 0;
				for (var i = 0; i < $('.edit-d-num').length; i++) {
					dTotal += Number($('.edit-d-num').eq(i).val());
					yTotal += Number($('.edit-y-num').eq(i).val());
					jTotal += Number($('.edit-j-num').eq(i).val());
				}
				if (dTotal > Number($('#editTotaldNum').val()) && editCheck) {
					new CustomPrompt({
						type : 'error',
						msg : '电工人数之和大于总电工人数'
					});
					numError = false;
				} else if (yTotal > Number($('#editTotalyNum').val()) && editCheck) {
					new CustomPrompt({
						type : 'error',
						msg : '运行人数之和大于总运行人数'
					});
					numError = false;
				} else if (jTotal > Number($('#editTotaljNum').val()) && editCheck) {
					new CustomPrompt({
						type : 'error',
						msg : '机修人数之和大于总机修人数'
					});
					numError = false;
				} else {
					numError = true;
				}
				var areaId = parseInt($("#editArea").val());
				var editId = parseInt($("#editId").val());
				var num = $("#editNum").val();
				var groupNum = $("#editGroupNum").val();
				if (toCheck && checkExist(areaId, num, groupNum, editId)) {
					new CustomPrompt({
						type : 'default',
						msg : '已存在当前区域、倒班数、班组数的规则'
					});
					numError = false;
				}
				return $(this).form('enableValidation').form('validate') && numError;
			},
			success : function(data) {
				var areaId = $("#area").combotree("getValue");
				$('#dg').datagrid("load", {
					"areaId" : areaId
				});
				if (data == 1) {
					new CustomPrompt({
						type : 'success',
						msg : '提交成功'
					});
					$shade.fadeOut();
					$editPopup.fadeOut();
				} else if (data == 0) {
					new CustomPrompt({
						type : 'default',
						msg : '已存在当前区域、倒班数、班组数的规则'
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
	var deleteConfirm = document.getElementsByClassName('delete-confirm')[0];
	deleteConfirm.addEventListener('click', function() {
		$shade.fadeOut();
		$('.delete-wrapper').fadeOut();
		$.post("deleteById", {
			"id" : deleteId
		}, function(data) {
			$('#dg').datagrid("load", {
				"areaId" : $("#area").combotree("getValue")
			});
			if (data == 1) {
				new CustomPrompt({
					type : 'success',
					msg : '删除成功'
				});
			} else {
				new CustomPrompt({
					type : 'default',
					msg : '规则正在使用中'
				});
			}
		})
	/*if (true) {
	    new CustomPrompt({
	        type: 'success',
	        msg: '删除成功'
	    });
	} else {
	    new CustomPrompt({
	        type: 'error',
	        msg: '您暂无权限'
	    });
	}*/
	});

	// 启用按钮
	var useConfirm = document.getElementsByClassName('use-confirm')[0];
	useConfirm.addEventListener('click', function() {
		$.post("updateUseOne", {
			"id" : useId
		}, function(data) {
			$('#dg').datagrid("reload", {
				"id" : $('#area').val()
			})
			if (data == 1) {
				new CustomPrompt({
					type : 'success',
					msg : '启用成功'
				});
			}
		})
		$shade.fadeOut();
		$('.use-wrapper').fadeOut();
	/*if (true) {
	    new CustomPrompt({
	        type: 'success',
	        msg: '启用成功'
	    });
	} else {
	    new CustomPrompt({
	        type: 'error',
	        msg: '您暂无权限'
	    });
	}*/
	});

	$("#addNum,#addGroupNum").change(function() {
		var areaId = parseInt($("#addArea").combotree("getValue"));
		var num = $("#addNum").val();
		var groupNum = $("#addGroupNum").val();
		if (checkExist(areaId, num, groupNum, null)) {
			new CustomPrompt({
				type : 'default',
				msg : '已存在当前区域、倒班数、班组数的规则'
			});
		}
	})
	$("#editNum,#editGroupNum").change(function() {
		var areaId = parseInt($("#editArea").val());
		var editId = parseInt($("#editId").val());
		var num = $("#editNum").val();
		var groupNum = $("#editGroupNum").val();
		if (toCheck && checkExist(areaId, num, groupNum, editId)) {
			new CustomPrompt({
				type : 'default',
				msg : '已存在当前区域、倒班数、班组数的规则'
			});
		}
	})
});

// ======================================其他方法======================================
// 编辑
function edit(editId) {
	$.ajax({
		type : "post",
		url : "updateTest",
		dataType : "json",
		success : function(data) {
			if (null != data[0] && data[0].invalidate) {
				window.parent.location.href = data[0].loginPage;
			}
			if (null != data[0] && data[0].noOpt) {
				new CustomPrompt({
					type : 'error',
					msg : '您无权操作！'
				});
			} else {
				// 初始化cbt
				$.post("getById", {
					"id" : editId
				}, function(data) {
					if (data.state == 200) {
						console.log(data)
						var list = data.shifts;
						var str = '';
						$("#edit-turnDays").val(data.turnDays);
						$("#edit-cycle").val(data.cycleId);
						$("#editArea").val(data.areaId);
						$("#editId").val(data.id);
						$("#editTotaldNum").val(data.dg).prev().text(data.dg);
						$("#editTotalyNum").val(data.yx).prev().text(data.yx);
						$("#editTotaljNum").val(data.jx).prev().text(data.jx);
						if (data.dg == 0 && data.yx == 0 && data.jx == 0) {
							editCheck = false;
						} else {
							editCheck = true;
						}
						$("#edit-area").text(data.areaName);
						if ($("#editNum").val() != data.num) {
							toCheck = false;
							$("#editNum").val(data.num).trigger('change');
							toCheck = true;
						}
						for (var i = 0; i < $(".edit-item > tr").length; i++) {
							var item = $('.edit-item > tr').eq(i);
							console.log(list[i].name)
							item.find(".edit-group-name").val(list[i].name);
							item.find(".edit-start").val(list[i].startTime);
							item.find(".edit-end").val(list[i].endTime);
							item.find(".edit-d-num").val(list[i].dg);
							item.find(".edit-y-num").val(list[i].yx);
							item.find(".edit-j-num").val(list[i].jx);
						}
						$("#editGroupNum").val(data.groupNum);
					}
				//		}
				}, "json")
				// 初始化使时间插件
				lay('.edit-date-plugin').each(function(e) {
					var _this = this;
					laydate.render({
						elem : this,
						type : 'time',
						done : function(value, date, endDate) {
							setTimeout(function() {
								$(_this).focus();
								$('.layui-laydate').hide();
							}, 0)
							if (value != '') {
								autoTime($(_this), date);
							}
						}
					})
				})
				$shade.fadeIn();
				$('.edit-popup').fadeIn();
				//初始化生成周期
				initCreateCycle();
			}
		}
	})

}


// 单个删除
function singleDelete(id) {
	$.ajax({
		type:"post",
		url:"deleteTest",
		dataType:"json",
		success:function(data){
			if(null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
			if(null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			deleteId = id;
     			$shade.fadeIn();
     			$('.delete-wrapper').fadeIn();
     		}
		}
	});
}


function openDetail(id) {
	$shade.fadeIn();
	$('.detail-popup').fadeIn();
	$('#db').datagrid({
		url : 'getDeatilById',
		queryParams : {
			"id" : id
		}
	});
}

// 启用
function use(id) {
	useId = id;
	$shade.fadeIn();
	$('.use-wrapper').fadeIn();
}

// 已经启用
function used() {
	new CustomPrompt({
		type : 'error',
		msg : '已启用'
	});
}

var checkExist = function(areaId, num, groupNum, shiftRuleId) {
	var res;
	$.ajax({
		type : "post",
		url : "getExistRule",
		data : {
			"areaId" : parseInt(areaId),
			"num" : num,
			"groupNum" : groupNum,
			"shiftRuleId" : shiftRuleId
		},
		async : false,
		dataType : "JSON",
		success : function(data) {
			//       	  if(data == "userInvilid"){//判断登录是否失效
			// 				window.parent.location.href="User!toLogin";
			// 			}
			//     		if(null != data.no_auth && data.no_auth == true){//判断是否具有权限
			//     			$('.noOpt').show().fadeOut(3000);
			// 			}else{
			res = data;
		// 			}
		}
	});
	return res;
}

function autoTime(obj, data) {
	if (obj.hasClass("first-time")) {
		var $cont = obj.parents(".content");
		var num = $cont.find(".auto-num").val();
		num = 24 / parseInt(num);
		var $nodes = $cont.find(".edit-date-plugin ,.new-date-plugin");
		var hours = data.hours;
		var minutes = data.minutes;
		var seconds = data.seconds;
		var str1 = '';
		var str2 = '';
		var str3 = '';
		for (var i = 1; i < $nodes.length; i++) {
			if (i % 2 != 0) {
				hours = (hours + num) % 24
			}
			if (hours < 10) {
				str1 = "0";
			} else {
				str1 = "";
			}
			if (minutes < 10) {
				str2 = "0";
			} else {
				str2 = "";
			}
			if (seconds < 10) {
				str3 = "0";
			} else {
				str3 = "";
			}
			$nodes.eq(i).val(str1 + hours + ":" + str2 + minutes + ":" + str3 + seconds).next().remove();
		}
	}
}

function initCreateCycle() {
	$.post("getShiftCreateCycle", function(data) {
		var str = '<option value="0">请选择生成周期</option>';
		$(data).each(function(i, s) {
			str += '<option value="' + s.id + '">' + s.name + '</option>';
		})
		$("#add-cycle,#edit-cycle").html(str);
	}, "json")
}