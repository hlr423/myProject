// ======================================全局变量======================================
var $shade = $('.shade'); // 遮罩
var orgId;//组织机构id，用于编辑、添加子级部门、删除等功能

$(function () {
    // ======================================下拉树======================================
    /*$('#client').combotree({
        url: '../front/public/data/tree_data1.json',
        method: 'get',
        width: 250,
        height: 30,
        hasDownArrow: false
    });*/
    
    // ======================================表格======================================
	
	$('#dg').treegrid({
        url: "getByPage",
        method: 'post',
        idField: 'id',  // 必须要有
        treeField: 'name', // 必须要有
        fit: true,
        fitColumns: true,
        pagination: true,     //开启分页  
        pageSize: 10,         //分页大小  
        scrollbarSize: 6,
        columns: [
            [
	            {
	                field: 'order',
	                title: '序号',
	                align: 'center',
	                width: 100
	            },
	            {
	                field: 'level',
	                title: '等级',
	                align: 'center',
	                width: 100
	            },
	            {
	                field: 'name',
	                title: '组织机构名称',
	                width: 400
	            },
	            {
	                field: 'detail',
	                title: '人员详情',
	                align: 'center',
	                width: 100,
	                formatter: function (value, rec) {
	                    return '<a class="detail" onclick=openDetail('+ rec.id +')>查看</a>'
	                } 
	            },
	            {
	                field: 'operate',
	                title: '操作',
	                width: '600',                        
	                formatter: function (value, rec){
	                    var content = '';
	                    content += '<div class="table-operation">';
	                    if (rec.level !== '五级') {
	                        content += '<a class="table-add" onclick=add('+rec.id+')><i></i>添加子部门</a>';
	                    }
	                    content += '<a class="table-edit" onclick=edit("' + rec.name + '",'+ rec.id + ',' + rec.parentId +')><i></i>编辑</a>';
	                    content += '<a class="table-delete" onclick=singleDelete('+ rec.id +')><i></i>删除</a>';
	                    content += '</div>';
	                    return content;
	                }
	            }
            ]
        ],
        onLoadSuccess: function (row, data){
        	if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
			}else{
				if(data.length < 1){
	        		 //添加一个新数据行，第一列的值为你需要的提示信息，然后将其他列合并到第一列来，注意修改colspan参数为你columns配置的总列数
					new CustomPrompt({
                        type: 'error',
                        msg: '您无权操作！'
                    });
	                //隐藏分页导航条，这个需要熟悉datagrid的html结构，直接用jquery操作DOM对象，easyui datagrid没有提供相关方法隐藏导航条
	                //$("#dg").closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
	        	}else{
	        		//$.each(data, function (i, val){$('#dg').treegrid('collapse', data[i].id)})
	        	}
			}
        }
    });
    
    
    
    // ======================================点击搜索======================================
    $(".search-btn").on("click",function(){
    	search(1,10);
    })
    
    
    
    
    // ======================================新建框======================================
    var $newPopup = $('.new-popup'); // 新建弹窗框
    var newBtn = document.getElementsByClassName('new-btn')[0]; // 新建按钮
    var newSubmit = document.getElementsByClassName('new-submit')[0]; // 新建提交按钮
    var newType = document.getElementsByClassName('new-type')[0]; // 新建类型
    
    // 打开弹窗，清空数据
    newBtn.addEventListener('click', function () {
    	$.ajax({
         	type:"post",
         	url:"addTestRoot",
         	dataType:"json",
         	success:function(data){
         		if(null != data && null != data[0] && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
         		}
         		
         		if(null != data && null != data[0] && data[0].noOpt){
         			new CustomPrompt({
                        type: 'error',
                        msg: '您无权操作！'
                    });
         		}else{
         			$shade.fadeIn();
                    $newPopup.fadeIn();
                    $newPopup.find('input[type=text]').val('');
         		}
         	},
     		error:function (XMLHttpRequest, textStatus, errorThrown){ 
     	     	//请求错误的处理
     			//请求错误的处理
     			//请求错误的处理
     	   	}
         })
    });
    
    // 新建提交按钮
    newSubmit.addEventListener('click', function () {
        $('#newForm').form('submit', {
            onSubmit: function () {
                return $(this).form('enableValidation').form('validate');
            },
            
            success: function (data) {
            	if(null != data && null != data[0] && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
         		}
         		
            	//console.log(data)
            	var obj = JSON.parse(data);
            	if(obj.isExist){
            		new CustomPrompt({
                        type: 'default',
                        msg: '该名称已存在！'
                    });
            	}else{
            		if(obj.result){
            			new CustomPrompt({
                            type: 'success',
                            msg: '操作成功！'
                        });
                        $shade.fadeOut();
                        $newPopup.fadeOut();
                        $('#dg').treegrid('reload');
            		}else{
            			new CustomPrompt({
                            type: 'error',
                            msg: '操作失败！'
                        });
            			$('#dg').treegrid('reload');
            		}
            	}
            }
        });
    });
    
    
    // ======================================编辑框======================================
    // 编辑提交按钮
    var editSubmit = document.getElementsByClassName('edit-submit')[0]; // 编辑提交按钮
    var $editPopup = $('.edit-popup'); // 编辑弹窗框
    editSubmit.addEventListener('click', function () {
        $('#editForm').form('submit', {
            onSubmit: function () {
                return $(this).form('enableValidation').form('validate');
            },
            
            success: function (data) {
            	if(null != data && null != data[0] && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
         		}
         		
            	var obj = JSON.parse(data);
            	if(obj.isExist){
            		new CustomPrompt({
                        type: 'default',
                        msg: '该名称已存在！'
                    });
            	}else{
            		if(obj.result){
            			new CustomPrompt({
                            type: 'success',
                            msg: '操作成功！'
                        });
                        $shade.fadeOut();
                        $editPopup.fadeOut();
                        $('#dg').treegrid('reload');
            		}else{
            			new CustomPrompt({
                            type: 'error',
                            msg: '操作失败！'
                        });
            			$('#dg').treegrid('reload');
            		}
            	}
            }
        });
    });
    
    // ======================================添加子部门框======================================
    var addSubmit = document.getElementsByClassName('add-submit')[0]; // 编辑提交按钮
    var $addPopup = $('.add-popup'); // 添加子部门窗框

    addSubmit.addEventListener('click', function () {
        $('#addForm').form('submit', {
            onSubmit: function () {
                return $(this).form('enableValidation').form('validate');
            },
            
            success: function (data) {
            	//console.log(data)
            	if(null != data && null != data[0] && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
         		}
         		
            	var obj = JSON.parse(data);
            	if(obj.isExist){
            		new CustomPrompt({
                        type: 'default',
                        msg: '该名称已存在！'
                    });
            	}else{
            		if(obj.exceedMaxLevel){
            			new CustomPrompt({
                            type: 'default',
                            msg: '最多可建5级！'
                        });
            		}else{
            			if(obj.result){
                			new CustomPrompt({
                                type: 'success',
                                msg: '操作成功！'
                            });
                            $shade.fadeOut();
                            $addPopup.fadeOut();
                            $('#dg').treegrid('reload');
                		}else{
                			new CustomPrompt({
                                type: 'error',
                                msg: '操作失败！'
                            });
                			$('#dg').treegrid('reload');
                		}
            		}
            	}
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
        $shade.fadeOut();
        $('.delete-wrapper').fadeOut();
        if (true) {
        	$.ajax({
        		type:"post",
        		url:"deleteOrg",
        		data:"orgId="+orgId,
        		dataType:"json",
        		success:function(data){
        			if(null != data && null != data[0] && data[0].invalidate){
        				window.parent.location.href = data[0].loginPage;
             		}
             		
        			if(data.result){
        				new CustomPrompt({
                            type: 'success',
                            msg: '操作成功！'
                        });
        				$('#dg').treegrid('reload');
        			}else{
        				new CustomPrompt({
                            type: 'error',
                            msg: '操作失败！'
                        });
        				$('#dg').treegrid('reload');
        			}
        		}
        	})
        }
    });

    // ======================================图表框======================================
    var echartBtn = document.getElementsByClassName('img-btn')[0];
    echartBtn.addEventListener('click', function () {
    	$.ajax({
         	type:"post",
         	url:"getOrgTree",
         	success:function(data){
         		var dataTemp = data.replace(/text/g, "name")
         		//console.log(dataTemp)
         		$shade.fadeIn();
                $('.echart-popup').fadeIn();
                // 初始化图表
                var myChart = echarts.init(document.getElementById('echart1'));
                myChart.setOption(option = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    toolbox: {
                        show: true,
                        right: '25px',
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    series: [
                        {
                            type: 'tree',
                            name: '图表',
                            data: JSON.parse(dataTemp),
                            top: '0',
                            left: '65px',
                            bottom: '2%',
                            //right: '60%',
                            symbolSize: 7,
                            width: "80%",
                            initialTreeDepth: -1,
                            label: {
                                normal: {
                                    position: 'left',
                                    verticalAlign: 'middle',
                                    align: 'right'
                                }
                            },
                            leaves: {
                                label: {
                                    normal: {
                                        position: 'right',
                                        verticalAlign: 'middle',
                                        align: 'left'
                                    }
                                }
                            },
                            expandAndCollapse: true,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        }
                    ]
                });
         	},
     		error:function (XMLHttpRequest, textStatus, errorThrown){ 
     	     	//请求错误的处理
     			//请求错误的处理
     			//请求错误的处理
     	   	}
         })
    });
});

function search(pageIndex,pageSize){
	var keyword = $("#keyword").val();
	var url = 'getByPage';
	if($.trim(keyword).length > 0){
		url = 'getByPara';
	}
//	$('#dg').treegrid({
//        url: url,
//        queryParams:{"keyword":keyword}
//    });
	
	$.ajax({
     	type:"post",
     	url:url,
     	data:"keyword="+keyword,
     	success:function(result){
     		if(null != result && null != result[0] && result[0].invalidate){
				window.parent.location.href = result[0].loginPage;
     		}
     		
     		$('#dg').treegrid("loadData",JSON.parse(result));
     		$('#dg').treegrid('getPager').pagination({pageNumber:pageIndex});
     	},
 		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	   	}
     })
}

// ======================================其他方法======================================
// 添加子部门
function add(obj) {
	$.ajax({
		url:"addTestChildOrg",
		method:"post",
		dataType:"json",
		success:function(data){
			if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
     		
     		if(null != data && null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
            	$('.add-popup').find("#addForm").find(".content-item").find("input[name='parentId']").val(obj);
                $shade.fadeIn();
                $('.add-popup').fadeIn()
                    .find('input[type=text]').val('');
            }
		},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
	})
}

// 编辑
function edit(name, id, parentId) {
	$.ajax({
		url:"updateOrgTest",
		method:"post",
		dataType:"json",
		success:function(data){
			if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
     		
     		if(null != data && null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
            	$('.edit-popup').find("#editForm").find(".content-item").find(".easyui-validatebox").val(name);
	        	$('.edit-popup').find("#editForm").find(".content-item").find("input[name='orgId']").val(id);
	        	$('.edit-popup').find("#editForm").find(".content-item").find("input[name='parentId']").val(parentId);
	        	$shade.fadeIn();
	            $('.edit-popup').fadeIn();
            }
		},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
	})
};

// 单个删除
function singleDelete(id) {
	 orgId = id;
	$.ajax({
		url:"deleteOrgTest",
		method:"post",
		dataType:"json",
		success:function(data){
			if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
     		
     		if(null != data && null != data[0] && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
            	$shade.fadeIn();
                $('.delete-wrapper').fadeIn();
            }
		},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
	})
};

// 打开详情 
function openDetail(obj) {
	orgId = obj;
	$.ajax({
     	type:"post",
     	url:"getPersonsByOrgId",
     	data:"orgId="+orgId,
     	success:function(data){
     		if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
     		
     		var result = JSON.parse(data);
     		if(result.length > 0){
     			$(".detail-container").empty();
     			var flag = 0;
     			var content = "<thead><tr><th>序号</th><th>姓名</th><th>性别</th><th>电话</th></tr></thead>"
     				content += "<tbody>";
     			for(var i = 0; i < result.length; i++){
     				var person = result[i];
     				content += " <tr><td>"+(++flag)+"</td><td>"+person.name+"</td><td>"+person.gender+"</td><td>"+person.phone+"</td></tr>";
     			}
     			content += "</tbody>";
     			$(".detail-container").append(content);
     		}else{
     			$(".detail-container").empty();
     			$(".detail-container").append("无相关数据！");
     		}
     		$shade.fadeIn();
     	    $('.detail-popup').fadeIn();
     	},
 		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 	   	}
     })
}
