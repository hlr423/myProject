$(function () {
    /*=========================初始化配置类+变量声明=========================*/
	var param = GetRequest();
	var carId = param["$c*\a"];
	$.ajax({
		type:"post",
		url:"getCarInfoById",
		data:"carId="+carId,
		dataType:"json",
		success:function(data){
			$("#carNo").text(data.carNo);
			$("#carType").text(data.carType);
			$("#tab1").find("tr").eq(0).find("td").eq(1).text(data.carType);
			$("#tab1").find("tr").eq(1).find("td").eq(1).text(data.carNo);
			$("#tab1").find("tr").eq(2).find("td").eq(1).text(data.brand);
			$("#tab1").find("tr").eq(3).find("td").eq(1).text(data.model);
			$("#tab1").find("tr").eq(4).find("td").eq(1).text(data.seat);
			$("#tab1").find("tr").eq(5).find("td").eq(1).text(data.cartaker);
			$("#tab1").find("tr").eq(6).append("<input type='hidden' value="+basePath()+data.licencePic+">");
			$("#tab1").find("tr").eq(7).find("td").eq(1).text(data.outCarTimes);
			$("#tab1").find("tr").eq(8).find("td").eq(1).text(data.nowKmNum);
			$("#tab1").find("tr").eq(9).find("td").eq(1).text(data.realKmNum);
			
			$("#tab2").find("tr").eq(0).find("td").eq(1).text(data.avgOil+"L/百公里");
			$("#tab2").find("tr").eq(1).find("td").eq(1).text("￥"+data.avgPrice+"/KM");
			$("#tab2").find("tr").eq(2).find("td").eq(1).text("￥"+data.totalCost);
			$("#tab2").find("tr").eq(3).find("td").eq(1).text("￥"+data.oilCost);
			$("#tab2").find("tr").eq(4).find("td").eq(1).text("￥"+data.repairCost);
			
			$("#qrcode").attr("src",basePath()+data.qrcodeUrl);
			$("#carPic").attr("src",basePath()+data.carPic);
			
		}
	});
    // 整体tab
    $('#tab').tabs({
        tabWidth: 80,
        tabHeight: 50,
        plain: true,
        // justified: true, // 生成等宽标题
        narrow:true, // 删除选项卡之间的间距

    });
    // 加油记录
    $('#carOil').datagrid({
    	url:"getCostRecordByCarId",
    	queryParams : {
				carId : carId,
				type:1
			},
    	pagination: true,     //开启分页  
        pageSize: 10,         //分页大小 
        // fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行,
        height: 280,
        columns: [
            [
                {
                    field: 'cost',
                    title: '金额',
                    width:100,
                 },
                {
                    field: 'B',
                    title: '升数(L)',
                    width:100,
                },
                {
                    field: 'C',
                    title: '发票',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) {
                    	//通过picture()方法直接传url会有问题
                        return '<a class="td-invoice" onclick="picture(1,this)"><input type="hidden" value='+row.C+'>查看</a>';
                    }
                },
                {
                    field: 'persons',
                    title: '责任人',
                    width: 100,
                },

                {
                    field: 'createTime',
                    title: '派发时间',
                    width: 100,
                },

            ]
        ]
    });
    // 保养记录
    $('#carKeep').datagrid({
    	url:"getCostRecordByCarId",
    	queryParams : {
				carId : carId,
				type : 2
			},
        pageSize: 10,         //分页大小 
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行,
        pagination : true,
        height: 280,
        columns: [
            [
                {
                    field: 'cost',
                    title: '金额',
                    width:100,
                },
                {
                    field: 'B',
                    title: '保养公里数(KM)',
                    width:100,
                },
                {
                    field: 'C',
                    title: '发票',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) {
                        return '<a class="td-invoice" onclick="picture(1,this)"><input type="hidden" value='+row.C+'>查看</a>';
                    }
                },
                {
                    field: 'persons',
                    title: '责任人',
                    width: 100,
                },

                {
                    field: 'createTime',
                    title: '派发时间',
                    width: 100,
                },

            ]
        ]
    });
    // 维修记录
    $('#carRepair').datagrid({
    	url:"getCostRecordByCarId",
    	queryParams : {
				carId : carId,
				type : 3
			},
    	pagination: true,     //开启分页  
        pageSize: 10,         //分页大小 
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行,
        height: 280,
        columns: [
            [
                {
                    field: 'cost',
                    title: '金额(元)',
                    width:100,
                },
                {
                    field: 'B',
                    title: '维修原因',
                    width:100,
                },
                {
                    field: 'C',
                    title: '发票',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) {
                        return '<a class="td-invoice" onclick="picture(1,this)"><input type="hidden" value='+row.C+'>查看</a>';
                    }
                },
                {
                    field: 'persons',
                    title: '责任人',
                    width: 100,
                },

                {
                    field: 'createTime',
                    title: '派发时间',
                    width: 100,
                },

            ]
        ]
    });
    $("#type").on("change",function(){
    	$("#carLife").datagrid({
			url:"getCarLifeByCarId",
	    	queryParams:{
	    		carId:carId,
				typeId:$("#type").val()
	    	}
		});
    });
    // 生命周期
    $('#carLife').datagrid({
    	url:"getCarLifeByCarId",
    	queryParams : {
				carId: carId,
				typeId:$("#type").val()
			},
    	pagination: true,     //开启分页  
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行,
        height:280,
        columns: [
            [
                {
                    field: 'type',
                    title: '类型',
                    width:100,
                },
                {
                    field: 'persons',
                    title: '责任人/领取人',
                    width: 100,
                },

                {
                    field: 'createTime',
                    title: '派发时间',
                    width: 100,
                },

                {
                    field: 'C',
                    title: '详情',
                    width: 100,
                    align: 'center',
                    formatter: function (value, row , index) {
                        return '<a class="td-detail" onclick="history()">详情</a>';
                    }
                },

            ]
        ]
    });

    /*=========================弹窗=========================*/

    // 关闭弹窗
    $('.close-icon').on('click', function () {
        var $popup = $(this).parents('.popup');
        $('.shade').fadeOut();
        $popup.fadeOut();
    });

    /*=========================车辆数据=========================*/

    var carCard = document.querySelector('.car-card');  //行驶证
    carCard.addEventListener('click',function () {
    	var url = $(this).siblings("input:hidden").val();
    	$('.picture-wrapper .title>span').html('行驶证');
    	$("#img").attr("src",url);
        $('.picture-wrapper, .shade').fadeIn();
    });

    /*=========================车辆维修申请=========================*/
    var carRepairBtn = document.querySelector('.car-repair'); // 车辆维修申请
    console.log(carRepairBtn)
    var carRepairSubmit = document.querySelector('.car-repair-submit'); // 车辆维修申请提交
    console.log(carRepairSubmit)
    carRepairBtn.addEventListener('click',function(){
        $('.car-repair-popup').fadeIn();
        $('.shade').fadeIn();
    })
    carRepairSubmit.addEventListener('click',function(){
        var $textarea = $(this).parents('.popup').find('textarea');
        if($textarea.val() == ''){
            $textarea.focus();
        }else{
        	var car = new Object();
        	car.id = carId;
        	var carApply = new Object();
        	carApply.description = $textarea.val();
        	carApply.car = car;
        	$.ajax({
        		url:"addCarApply",
        		method:"post",
        		contentType:"application/json;charset=utf-8",
             	data:JSON.stringify(carApply),
             	traditional:true,
        		success:function(data){
        			if(data.result) {
                        new CustomPrompt({
                            type: 'success',
                            msg: '操作成功！'
                        });
                        $('.shade,.delete-wrapper').fadeOut();
                        setTimeout("window.location.reload()", 2000);
                    }else{
                        new CustomPrompt({
                            type: 'error',
                            msg: '操作失败！'
                        });
                    }
        		},
        		error:function (XMLHttpRequest, textStatus, errorThrown){ 
         	     	//请求错误的处理
         			//请求错误的处理
         			//请求错误的处理
         	   	}
        	})

        	
            new CustomPrompt({
                type: 'success',
                msg: '提交成功'
            });
            $('.car-repair-popup').fadeOut();
            $('.shade').fadeOut();
        }
    });

    /*=========================其它=========================*/

    var exportBtn = document.querySelector('.export'); // 导出按钮
    exportBtn.addEventListener('click',function () {
       exportDetail();
    });
    //返回列表
    $(".back-list").on("click",function(){
    	window.location.href="toCarInfo";
    });

});

/*=========================其它=========================*/

// 打开行驶证/发票弹窗
function picture(card,node) { // card :0-行驶证 card：1 发票
	var url = $(node).find("input:hidden").val();
    (card == 0) && $('.picture-wrapper .title>span').html('行驶证');
    (card == 1) && $('.picture-wrapper .title>span').html('发票');
    $("#img").attr("src",basePath()+url);
    $('.picture-wrapper, .shade').fadeIn();
}

// 生命周期详情跳转到对应的车辆历史记录
function history() {
    alert('跳转到对应的车辆历史记录')
}

// 导出
function exportDetail() {
    alert('导出')
}
//获取跳转页面是传递的参数
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
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