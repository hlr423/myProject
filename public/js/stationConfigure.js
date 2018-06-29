$(function () {
	/*=========================初始化配置类+变量声明=========================*/
	$.ajax({
		type: "post",
		url: "getAllAreaAndPerson",
		dataType: "json",
		success: function (data) {
			$('#toparea').combotree({
				data: data.areas,
				width: 250,
				height: 30,
				hasDownArrow: false
			});
		}
	});

	// 点击搜索
	$(".search-btn").on("click", function () {
		$("#dg").datagrid({
			url: "getAllStationByPager",
			queryParams: {
				areaId: $("#toparea").combotree("getValue"),
				keyword: $("#keyword").val()
			}
		});
	});

	// 整体table
	$('#dg').datagrid({
		url: "getAllStationByPager",
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
					hidden: true
				},
				{
					field: 'name',
					title: '厂站名称',
					width: 150,
					align: 'center',
					formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
				},
				{
					field: 'region',
					title: '区域',
					width: 100,
					align: 'center',
					formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
				},
				{
					field: 'address',
					title: '地址',
					width: 150,
					align: 'center',
					formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
				},
				{
					field: 'area',
					title: '占地面积(㎡)',
					width: 150,
					align: 'center',
					formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
				},
				{
					field: 'water',
					title: '处理水量(方)',
					width: 150,
					align: 'center',
					formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
				},
				{
					field: 'people',
					title: '责任人',
					width: 100,
					align: 'center',
					formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
				},
				{
					field: 'telephone',
					title: '责任人电话',
					width: 110,
					align: 'center',
					formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
				},
				{
					field: 'SIM',
					title: 'SIM卡号',
					width: 100,
					align: 'center',
					formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
				},
				{
					field: 'cost',
					title: '通讯费(元)',
					width: 100,
					align: 'center',
					formatter: function (value,row) {
                        return  "<span title='" + value + "'>" + value + "</span>"; 
                    }
				},
				{
					field: 'picture',
					title: '厂站照片',
					align: 'center',
					width: 100,
					formatter: function (value, rec) {
						return '<a class="td-picture" onclick="pictureOpen(' + rec.id + ')">查看</a>';
					}
				},
				{
					field: 'paper',
					title: '厂站图纸',
					align: 'center',
					width: 100,
					formatter: function (value, rec) {
						return '<a class="td-paper" onclick="paperOpen(' + rec.id + ')">查看</a>';
					}
				},
				{
					field: 'index',
					title: '进水指标值',
					align: 'center',
					width: 120,
					formatter: function (value, rec) {
						return '<a class="td-detail" onclick="detailOpen(' + rec.id + ')">详情</a>';
					}
				},
				{
					field: 'standard',
					title: '出水标准',
					align: 'center',
					width: 120,
					formatter: function (value, rec) {
						return '<a class="td-detail" onclick="outWaterOpen(' + rec.id + ')">' + rec.standard + '</a>';
					}
				},
				{
					field: 'operate',
					title: '操作',
					width: 150,
					formatter: function (value, rec) {
						return '<div class="table-operation"><a class="table-edit" onclick="editOpen(' + rec.id + ')"><i></i>编辑</a> ' +
							'<a class="table-delete" onclick="deleteOpen(' + rec.id + ')" ><i></i>删除</a>' +
							'</div>';
					}
				}
			]
		],
		onLoadSuccess: function (data) {
//			 var dc = $(this).data('datagrid').dc;
//             var header2Row = dc.header2.find('tr.datagrid-header-row');
//             dc.body2.find('table').append(header2Row.clone().css({"visibility":"hidden"}));
			if (data.total == 0) {
				new CustomPrompt({
					type: 'error',
					msg: '没有相关记录'
				});
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
	/*=========================各项单独验证=========================*/

	// 验证厂站图片上传
	var pictureFile = document.querySelector('.station-picture input[type=file]');
	pictureFile.addEventListener('change', function () {
		validate.checkImg($(this));
	});

	// 验证厂站图纸上传
	var paperFile = document.querySelector('.station-paper input[type=file]');
	paperFile.addEventListener('change', function () {
		var thisNode = $(this)[0];
		var fileArr = new Array();
		var inputText = $(this).next().next('span');
		var length = thisNode.files.length;
		if (length != 0) {
			for (var i = 0; i < length; i++) {
				var fileName = thisNode.files[i].name;
				fileArr.push(fileName);
			}
			inputText.html(fileArr.toString());
		} else {
			inputText.html('请选择文件...');
		}
	});
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
	deleteConfirm.addEventListener('click', function () {
		$.ajax({
			type: "post",
			url: "deleteStation",
			data: "stationId=" + sid,
			dataType: "json",
			success: function (data) {
				if (data == 1) {
					new CustomPrompt({
						type: 'success',
						msg: '删除成功'
					});
					$('.shade,.delete-wrapper').fadeOut();
					$("#dg").datagrid("reload");
				} else {
					new CustomPrompt({
						type: 'default',
						msg: '删除失败'
					});
				}
			}
		});
	});
	// 取消弹窗
	inforCancel.addEventListener('click', function () {
		$('.shade').fadeOut();
		$(this).parents('.infor-wrapper').fadeOut();
	});

	/*=========================新建弹窗=========================*/

	var $newPopup = $('.newAdd-wrapper'); // 新建弹窗
	var $newRegion = $('.newAdd-region-comboTree'); // 新建区域
	var $newWater = $('.newAdd-water-comboTree'); // 新建设计处理水量
	var $newStandard = $('.newAdd-standard-comboTree'); // 新建出水标准
	// 新建弹窗+初始化数据
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
         			var $inputFile = $('.newAdd-wrapper input[type=file]');
         			$inputFile.val(''); // 清空新建inputFile
         			$inputFile.next().next('span').html('支持.jpg/.png/.JPEG').css('color', '#ccc').removeAttr('state');
         			$('.shade, .newAdd-wrapper').fadeIn();
         			$newPopup.find('input[type=text]').not($newPopup.find('.textbox.combo input[type=text]')).val('');
         			$newRegion.combotree('clear');
         			$newWater.combotree('clear');
         			$newStandard.combotree('clear');
         			$.ajax({
         				type: "post",
         				url: "getInit",
         				dataType: "json",
         				success: function (data) {
         					$('#area').combotree({
         						data: data.areas,
         						width: 250,
         						height: 30,
         						hasDownArrow: false
         					});
         					var treatWaters = data.treatWaters;
         					var content = "<option value='0'>请选择处理水量</option>";
         					if (treatWaters.length > 0) {
         						for (var i = 0; i < treatWaters.length; i++) {
         							content += "<option value=" + treatWaters[i].id + ">" + treatWaters[i].num + "</option>"
         						}
         					}
         					$("#treatWater").html(content);
         					
         					var caretakers = data.caretakers;
         					var content1 = "<option value='0'>请选择责任人</option>";
         					if (caretakers.length > 0) {
         						for (var i = 0; i < caretakers.length; i++) {
         							content1 += "<option value=" + caretakers[i].id + ">" + caretakers[i].text + "</option>"
         						}
         					}
         					$("#person").html(content1);
         					
         					var osls = data.osls;
         					var content2 = "<option value='0'>请选择出水标准</option>";
         					if (osls.length > 0) {
         						for (var i = 0; i < osls.length; i++) {
         							content2 += "<option value=" + osls[i].id + ">" + osls[i].name + "</option>"
         						}
         					}
         					$("#outWater").html(content2);
         				}
         			});
         		}
			}
		});
	});
	// 新建弹窗提交
	var newAddSubmit = document.querySelector('.newAdd-submit');
	newAddSubmit.addEventListener('click', function () {
		$('.newAdd-form').form('submit', {
			onSubmit: function () {
				var formValue = $(this).form('enableValidation').form('validate');
				var inputFileAttr = $(this).find('input[type=file]').next().next('span').attr('state');
				return (formValue) && (inputFileAttr != 'errFile')
			},
			success: function (data) {
				if (data == -1) {
					new CustomPrompt({
						type: 'error',
						msg: '厂站名已存在'
					});
				} else if (data > 0) {
					new CustomPrompt({
						type: 'success',
						msg: '添加成功'
					});
					$('.shade, .newAdd-wrapper').fadeOut();
					$("#dg").datagrid("reload");
				} else {
					new CustomPrompt({
						type: 'default',
						msg: '添加失败'
					});
				}
			}
		});
	});

	/*=========================编辑弹窗=========================*/

	var $editRegion = $('.edit-region-comboTree'); // 编辑区域
	var $editWater = $('.edit-water-comboTree'); // 编辑设计处理水量
	var $ediStandard = $('.edit-standard-comboTree'); // 编辑出水标准
	var editSubmit = document.querySelector('.edit-submit');
	// 编辑弹窗提交
	editSubmit.addEventListener('click', function () {
		$('.edit-form').form('submit', {
			onSubmit: function () {
				var formValue = $(this).form('enableValidation').form('validate');
				var inputFileAttr = $(this).find('input[type=file]').next().next('span').attr('state');
				return (formValue) && (inputFileAttr != 'errFile')
			},
			success: function (data) {
				if (data == -1) {
					new CustomPrompt({
						type: 'error',
						msg: '厂站名称已存在'
					});
				} else if (data == 1) {
					new CustomPrompt({
						type: 'success',
						msg: '修改成功'
					});
					$('.shade, .edit-wrapper').fadeOut();
					$("#dg").datagrid("reload");
				} else {
					new CustomPrompt({
						type: 'default',
						msg: '修改失败'
					});
				}
			}
		});
	});
	// 厂站图纸提交
	var paperSubmit = document.querySelector('.paper-submit');
	paperSubmit.addEventListener('click', function () {
		var i = 0;
		var $checkbox = $('.paper-wrapper .check-row');
		$checkbox.each(function (index, node) {
			if (!$(node).is(':checked')) {
				i++;
			}
		});
		if (i == $checkbox.length) {
			new CustomPrompt({
				type: 'default',
				msg: '请选择至少一个文件'
			});
		} else {
			$('.shade, .paper-wrapper').fadeOut();
			console.log('下载ajax')
		}

	});

	/*=========================其它=========================*/
	// 厂站图纸checkbox
	common.commonCheckbox('.paper-wrapper');
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
var sid;
// 打开编辑弹窗
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
     			$('.shade, .edit-wrapper').fadeIn();
     			$(".edit-wrapper input[name='id']").val(id);
     			$.ajax({
     				type: "post",
     				url: "getStationById",
     				data: "stationId=" + id,
     				dataType: "json",
     				success: function (data) {
     					$('#earea').combotree({
     						data: data.areas,
     						width: 250,
     						height: 30,
     						hasDownArrow: false
     					});
     					$("#earea").combotree("setValue", data.areaId);
     					var treatWaters = data.treatWaters;
     					var content = "<option value='0'>请选择处理水量</option>";
     					if (treatWaters.length > 0) {
     						for (var i = 0; i < treatWaters.length; i++) {
     							if (treatWaters[i].id == data.twId) {
     								content += "<option value=" + treatWaters[i].id + " selected>" + treatWaters[i].num + "</option>"
     							} else {
     								content += "<option value=" + treatWaters[i].id + ">" + treatWaters[i].num + "</option>"
     							}
     						}
     					}
     					$("#etreatWater").html(content);
     					
     					var caretakers = data.caretakers;
     					var content1 = "<option value='0'>请选择责任人</option>";
     					if (caretakers.length > 0) {
     						for (var i = 0; i < caretakers.length; i++) {
     							if (caretakers[i].id == data.personId) {
     								content1 += "<option value=" + caretakers[i].id + " selected>" + caretakers[i].text + "</option>"
     							} else {
     								content1 += "<option value=" + caretakers[i].id + ">" + caretakers[i].text + "</option>"
     							}
     						}
     					}
     					$("#eperson").html(content1);
     					
     					var osls = data.osls;
     					var content2 = "<option value='0'>请选择出水标准</option>";
     					if (osls.length > 0) {
     						for (var i = 0; i < osls.length; i++) {
     							if (osls[i].id == data.owId) {
     								content2 += "<option value=" + osls[i].id + " selected>" + osls[i].name + "</option>"
     							} else {
     								content2 += "<option value=" + osls[i].id + ">" + osls[i].name + "</option>"
     							}
     						}
     					}
     					$("#eoutWater").html(content2);
     					
     					$(".edit-form input[name='name']").val(data.name);
     					$(".edit-form input[name='address']").val(data.address);
     					$(".edit-form input[name='totalArea']").val(data.totalArea);
     					$(".edit-form input[name='sim']").val(data.sim);
     					$(".edit-form input[name='communicationCost']").val(data.cost);
     					$(".edit-form input[name='cod']").val(data.cod);
     					$(".edit-form input[name='tp']").val(data.tp);
     					$(".edit-form input[name='tn']").val(data.tn);
     					$(".edit-form input[name='ss']").val(data.ss);
     					
     					var pics = data.pics;
     					if (pics.length > 0) {
     						var content3 = "";
     						for (var i = 0; i < pics.length; i++) {
     							content3 += "<div class='content-img'><i></i><input type='hidden' value=" + pics[i].id + "><img src=" + basePath() + pics[i].url + " alt=''></div>";
     						}
     						$(".pic").html(content3);
     					}
     					var draws = data.draws;
     					if (draws.length > 0) {
     						var content4 = "";
     						for (var i = 0; i < draws.length; i++) {
     							content4 += "<div class='content-img'><i></i><input type='hidden' value=" + draws[i].id + "><img src=" + basePath() + draws[i].url + " alt=''></div>";
     						}
     						$(".draw").html(content4);
     						
     						// 编辑图片事件-删除
     						var picIds = "";
     						$('.edit-wrapper .content-img i').on('click', function () {
     							var id = $(this).siblings("input:hidden").val();
     							picIds += id + ",";
     							$(".edit-wrapper input[name='picIds']").val(picIds);
     							var $content = $(this).parents('.content-img');
     							$content.remove();
     						});
     						// 编辑图片事件-显示图片
     						$('.edit-wrapper .content-img img').on('click', function () {
     							var $img = $(this).clone();
     							$('.img-wrapper .content img').remove();
     							$('.img-wrapper .content').append($img);
     							$('.img-wrapper').fadeIn();
     						});
     					}
     				}
     			});
     		}
		}
	});
}
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
     			sid = id;
     			$('.delete-wrapper, .shade').fadeIn();
     		}
		}
	});
}

// 打开厂站照片弹窗
function pictureOpen(id) {
	$(".picture-wrapper .content").empty();
	$.ajax({
		type: "post",
		url: "getPicByStationId",
		data: "stationId=" + id,
		dataType: "json",
		success: function (data) {
			if (data.length > 0) {
				$('.shade, .picture-wrapper').fadeIn();
				var content = "<div class='swiper-container gallery-top'><div class='swiper-wrapper'>";
				for (var i = 0; i < data.length; i++) {
					content += "<div class='swiper-slide'><img src=" + basePath() + data[i].url + "></div>";
				}
				content += "</div></div>";
				content += "<div class='swiper-container gallery-thumbs'><div class='swiper-wrapper'>";
				for (var j = 0; j < data.length; j++) {
					content += "<div class='swiper-slide' style='background-image:url(" + basePath() + data[j].url + ")'></div>";
				}
				content += "</div>";
				content += "<div class='swiper-button-next'></div><div class='swiper-button-prev'></div>";
				content += "</div><div class='swiper-pagination'></div>";
				$(".picture-wrapper .content").append(content);

				var galleryTop = new Swiper('.gallery-top', {});
				var galleryThumbs = new Swiper('.gallery-thumbs', {
					pagination: '.swiper-pagination',
					paginationType: 'fraction',
					spaceBetween: 10,
					centeredSlides: true,
					slidesPerView: 'auto',
					slideToClickedSlide: true,
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
				});
				galleryTop.params.control = galleryThumbs;
				galleryThumbs.params.control = galleryTop;
			} else {
				new CustomPrompt({
					type: 'error',
					msg: '无厂站照片'
				});
			}

		}
	});
}

// 打开厂站图纸弹窗
function paperOpen(id) {
	$(".paper-wrapper .content").empty();
	$.ajax({
		type: "post",
		url: "getDrawByStationId",
		data: "stationId=" + id,
		dataType: "json",
		success: function (data) {
			if (data.length > 0) {
				$('.shade, .paper-wrapper').fadeIn();
				var content = "";
				for (var i = 0; i < data.length; i++) {
					content += "<div><img src=" + basePath() + data[i].url + "><span>图纸" + (i + 1) + "</span>";
					content += "<a class='checkbox-wrapper'><i></i>";
					content += "<input type='checkbox' name='file' class='check-row'></a></div>";
				}
				$(".paper-wrapper .content").append(content);
			} else {
				new CustomPrompt({
					type: 'error',
					msg: '无厂站图纸'
				});
			}
		}
	});
}

// 打开设计进水指标值
function detailOpen(id) {
	$('.shade, .index-wrapper').fadeIn();
	$(".index-wrapper .content").empty();
	$.ajax({
		type: "post",
		url: "getInwaterStandardByStationId",
		data: "stationId=" + id,
		dataType: "json",
		success: function (data) {
			var content = "<table>";
			content += "<tr><td>序号</td><td>名称</td><td>指标值(mg/L)</td></tr>";
			content += "<tr><td>1</td><td>COD</td><td>" + data.COD + "</td></tr>";
			content += "<tr><td>2</td><td>TP</td><td>" + data.TP + "</td></tr>";
			content += "<tr><td>3</td><td>TN</td><td>" + data.TN + "</td></tr>";
			content += "<tr><td>4</td><td>SS</td><td>" + data.SS + "</td></tr>";
			content += "</table>";
			$(".index-wrapper .content").append(content);
		}
	});
}
//打开出水指标
function outWaterOpen(id) {
	$('.shade, .index-wrapper').fadeIn();
	$(".index-wrapper .content").empty();
	$.ajax({
		type: "post",
		url: "getOutwaterStandardByStationId",
		data: "stationId=" + id,
		dataType: "json",
		success: function (data) {
			if (data.length > 0) {
				var content = "<table><tr><td>序号</td><td>名称</td><td>指标值(mg/L)</td></tr>";
				for (var i = 0; i < data.length; i++) {
					content += "<tr><td>" + (i + 1) + "</td><td>" + data[i].name + "</td><td>" + data[i].value + "</td></tr>";
				}
				content += "</table>";
				$(".index-wrapper .content").append(content);
			}else{
				new CustomPrompt({
					type: 'error',
					msg: '没有相关记录'
				});
			}
		}
	});
}
//得到项目根路径
function basePath() {
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
	var basePath = localhostPath + projectName + "/";
	return basePath;
}