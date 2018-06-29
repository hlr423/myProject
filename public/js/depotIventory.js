var arr = new Array();
var object = new Object();
$(function () {

    /*=========================初始化配置类+变量声明=========================*/
    var clearSuccessWrapper; // 成功弹窗setTimeout
    $(".scan-submit").on("click",function(){
    	var qrcode = $("#qrcode").val();
    	var deportId = 1;
    	if(qrcode != ""){
    		$.ajax({
    			type:"post",
    			url:"getByQrcode",
    			data:{
    				qrcode:qrcode,
    				deportId:deportId
    			},
    			dataType:"json",
    			success:function(data){
    				if(JSON.stringify(data) != "{}"){
    					if(JSON.stringify(arr).indexOf(JSON.stringify(data))==-1){
    						arr.push(data);
    					}
    					$("#dg").datagrid({
    						data:arr
    					})
    				}else{
    					new CustomPrompt({
        	                type: 'error',
        	                msg: '二维码不存在'
        	            });
    				}
    			}
    		});
    	}else{
    		new CustomPrompt({
                type: 'error',
                msg: '请输入二维码编号'
            });
    	}
    });
    // 整体table
    $('#dg').datagrid({
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        scrollbarSize: 6,
        columns: [
            [
            	 {
                     field: 'id',
                     hidden: true
                 },
                {
                    field: 'type',
                    title: '类型',
                    width: 100,
                },
                {
                    field: 'name',
                    title: '名称',
                    width: 100,
                },
                {
                    field: 'qrcodeUrl',
                    title: '二维码',
                    width: 100,
                    align: 'center',
                    formatter: function (val,rec) {
                        return '<a class="td-picture"><i></i><div><img src="'+basePath()+'front/public/images/twoCode.png" alt=""></div></a>'
                    }
                },
                {
                    field: 'qrcode',
                    title: '二维码编号',
                    width: 150,
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
                    width: 150,
                },
                {
                    field: 'remark',
                    title: '备注',
                    width: 150,
                    formatter:function (val,rec) {
                        return '<input type="text" placeholder="请输入" class="remark">'
                    }
                },
            ]
        ]
    });

    /*====================盘点成功弹窗===================*/

    var state = 0; // 模拟弹出哪个弹窗
    var btnClose = document.querySelector('.btn-close'); // 关闭
    var btnLook = document.querySelector('.btn-look'); // 查看出库信息
    var btnSubmit = document.querySelector('.btn-submit'); //盘点提示提交按钮
    var btnContinue = document.querySelector('.btn-continue'); // 盘点提示继续盘点
    var $successPopup = $('.inventory-success-wrapper'); // 盘点成功弹窗
    var $promptPopup = $('.inventory-prompt-wrapper'); // 盘点提示弹窗
    var tableSubmit = document.querySelector('.table-submit'); // 保存按钮
    // 保存事件
    tableSubmit.addEventListener('click',function () {
        var rows = $('#dg').datagrid("getRows");
        var $nodeList = $('.remark');
        var equip = new Array();
        var part = new Array();
        var medicine = new Array();
        var deportId = 1;
        if(rows.length > 0){
        	for(var i=0;i<rows.length;i++){
        		if(rows[i].type == "设备"){
        			var obj = new Object();
        			obj.id = rows[i].id;
        			obj.remark = $nodeList.eq(i).val();
        			equip.push(obj);
        		}
        		if(rows[i].type == "部件"){
        			var obj = new Object();
        			obj.id = rows[i].id;
        			obj.remark = $nodeList.eq(i).val();
        			part.push(obj);
        		}
        		if(rows[i].type == "药剂"){
        			var obj = new Object();
        			obj.id = rows[i].id;
        			obj.remark = $nodeList.eq(i).val();
        			medicine.push(obj);
        		}
        	}
        	object.equip = equip;
        	object.part = part;
        	object.medicine = medicine;
        	object.deportId = deportId;
        	$.ajax({
            	type:"post",
            	url:"addIventory",
            	data:"obj="+JSON.stringify(object),
            	dataType:"json",
            	success:function(data){
            		if(data == "1"){
            			$successPopup.fadeIn();
            			$('#dg').datagrid('loadData',{total:0,rows:[]});//提交成功后删除datagrid数据
            			arr = [];//把存放盘点信息的数据清空，防止点击提交以前的数据还存在
            	        clearSuccessWrapper = setTimeout(clearSuccess,5000);
            	        
            		}else if(data == "0"){
            			new CustomPrompt({
        	                type: 'default',
        	                msg: '保存失败'
        	            });
            		}else{
            			$('.shade').fadeIn();
            			$("#tip").text(data);
            			$promptPopup.fadeIn();
            		}
            	}
            });
        }else{
        	new CustomPrompt({
                type: 'error',
                msg: '未盘点设备'
            });
        }
    });
    // 关闭盘点成功弹窗
    btnClose.addEventListener('click',function () {
        $('.shade').fadeOut();
        clearTimeout(clearSuccessWrapper);
        $successPopup.fadeOut();
    });
    // 跳转到盘点信息
    btnLook.addEventListener('click',function () {
    	window.location.href="../deportHistory/toInOrderInformation?flag=3";
    });
    btnSubmit.addEventListener('click',function () {
    	$.ajax({
        	type:"post",
        	url:"addIventory2",
        	data:"obj="+JSON.stringify(object),
        	dataType:"json",
        	success:function(data){
        		if(data == "1"){
        			$promptPopup.fadeOut();
        			$successPopup.fadeIn();
        			$('#dg').datagrid('loadData',{total:0,rows:[]});//提交成功后删除datagrid数据
        			arr = [];//把存放盘点信息的数据清空，防止点击提交以前的数据还存在
        	        clearSuccessWrapper = setTimeout(clearSuccess,5000);
        	        
        		}else if(data == "0"){
        			new CustomPrompt({
    	                type: 'default',
    	                msg: '保存失败'
    	            });
        		}
        	}
        });
    });
    // 继续盘点
    btnContinue.addEventListener('click',function () {
        $('.shade').fadeOut();
        $promptPopup.fadeOut();
    })
});

/*====================其它方法===================*/

// 关闭盘点成功弹窗
function clearSuccess() {
    $('.shade').hide();
    $('.inventory-success-wrapper').hide();
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