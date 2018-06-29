$(function () {
    /*=========================初始化配置类+变量声明=========================*/
	
	$.ajax({
		type:"post",
		url:"getDeportByPersonId",
		dataType:"json",
		success:function(data){
			if(data.length==0){//此人下面没有分管的仓库
				$("#deport").css({
					display:"none",
				});
			}else{
				$("#deport").css({
					display:"inline-block",
				});
				var content = "<option value='0'>请选择仓库</option>";
				if(data.length > 0){
					for(var i=0; i<data.length; i++){
						content += "<option value="+data[i].id+">"+data[i].name+"</option>";
					}
				}
				$("#deport").html(content);
			}
		}
	});
	$("#deport").on("change",function(){
		$("#dg").datagrid({
			url : "getStockByDeportId",
			queryParams : {
				deportId : $("#deport").val(),
				keyword : $("#keyword").val()
			}
		})
	})
	$(".search-btn").on("click",function(){
		$("#dg").datagrid({
			url : "getStockByDeportId",
			queryParams : {
				deportId : $("#deport").val(),
				keyword : $("#keyword").val()
			}
		})
	});
    // 整体table
    $('#dg').datagrid({
    	url:"getStockByDeportId",
    	queryParams : {
				deportId : $("#deport").val(),
				keyword : $("#keyword").val()
			},
    	pagination: true,     //开启分页  
        pageSize: 10,         //分页大小 
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
                },
                {
                    field: 'tempName',
                    title: '模板名称',
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
                    width: 150,
                },
                {
                    field: 'supplier',
                    title: '供应商',
                    width: 100,
                },
                {
                    field: 'stock',
                    title: '库存数量',
                    width: 100
//                    formatter: function (value,rec) {
//                        return '<a>100</a>'     // 为1的时候加上class="td-fault"
//                    }
                },
                {
                    field: 'F',
                    title: '告警状态',
                    width: 100,
                    align: 'center',
                    formatter: function (value,rec) {
                    	if(rec.stock < 10){
                    		return '<a class="td-fault">库存不足</a>'
                    	}else{
                    		return '<a class="td-normal">正常</a>'
                    	}
                    }
                },
                {
                    field: 'G',
                    title: '详情',
                    width: 100,
                    align: 'center',
                    formatter:function (value,rec) {
                        return '<a class="td-detail" onclick="detailOpen('+rec.tempId+','+rec.typeId+')">详情</a>'
                    }
                },
            ]
        ],
        onLoadSuccess:function(data){
        	if(data.total == 0){
        		 $(this).datagrid('appendRow', { type: '<div style="text-align:center;color:red">没有相关记录！</div>' }).datagrid('mergeCells', { index: 0, field: 'type', colspan: 8 })
                 //隐藏分页导航条，这个需要熟悉datagrid的html结构，直接用jquery操作DOM对象，easyui datagrid没有提供相关方法隐藏导航条
                 $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
        	}
        }
    });

    /*=========================弹窗=========================*/

    // 关闭弹窗
    $('.close-icon').on('click', function () {
        var $popup = $(this).parents('.popup');
        $('.shade').fadeOut();
        $popup.fadeOut();
    });
});

/*=========================其它方法=========================*/

// 打开详情弹窗
function detailOpen(tempId,typeId) {
    $('.shade, .detail-wrapper').fadeIn();
    $('#detail-table').datagrid({
    	url:"getDetailByTempId",
    	queryParams : {
			deportId : $("#deport").val(),
			tempId : tempId,
			typeId : typeId
		},
        fit: true,
        fitColumns: true,
        singleSelect: true, // 允许选择一行
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'name',
                    title: '名称',
                    width: 100,
                },
                {
                    field: 'qrcode',
                    title: '二维码',
                    width: 80,
                    align: 'center',
                    formatter: function (value,rec) {
                        return '<a class="detail-picture"><i></i><div><img src="../images/twoCode.png" alt=""></div></a>'
                    }
                },
                {
                    field: 'inTime',
                    title: '最后入库时间',
                    width: 150,
                },
                {
                    field: 'outTime',
                    title: '最后出库时间',
                    width: 150,
                }
            ]
        ]
    });
}