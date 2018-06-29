var certificationId;
$(function () {
    /*=========================初始化配置类+变量声明=========================*/
	
    // 初始化时间控件
    laydate.render({
        elem: '.chose-time',
        // type: 'datetime',
        showBottom: false,
        done:function () {
            $('.chose-time').focus();
            $('.layui-laydate').hide();
        }
    });
    
    
    // 点击搜索
    $(".search-btn").on("click", function() {
    	search(1,10);
    });

    // 整体table
    $('#dg').datagrid({
    	url:"getByPage_Certification",
    	method:"post",
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
                    field: 'name',
                    title: '证件名称',
                    width: 100,
                },
                {
                    field: 'number',
                    title: '证件编号',
                    width: 150,
                },
                {
                    field: 'department',
                    title: '发证单位',
                    width: 150,
                },
                {
                    field: 'url',
                    title: '文件预览',
                    width: 100,
                    align: 'center',
                    formatter: function (val,rec) {
                        return '<a class="td-picture" onclick="pictureOpen('+rec.id+')">查看</a>'
                    }
                },
                {
                    field: 'approvalStatus',
                    title: '审批状态',
                    width: 100,
                    align: 'center',
                    formatter: function (val,rec) {
                        // return '<a class="td-state-now">审核中</a>'
                    	var content = "";
                    	if(rec.isApproverNone){
                    		content = '<a class="td-state-no">没有审核人<div></div></a>';
                    	}else if(rec.approvalStatusId == 4){
                    		content = '<a class="td-state-no">未通过<div>'+rec.description+'</div></a>';
                    	}else{
                    		content = '<a class="td-state-now">'+rec.approvalStatus+'</a>';
                    	}
                        return content;
                        //<a>通过</a>
                        //<a class="td-state-no">未通过<div>未通过原因</div></a>
                    }
                },
                {
                    field: 'owner',
                    title: '所属人',
                    width: 100,
                },
                {
                    field: 'G',
                    title: '审核人',
                    width:  100,
                    align: 'center',
                    formatter: function (val,rec) {
                    	var cars = rec.cars;
                    	var content = '<a class="td-detail">详情 <div class="td-detail-wrapper">';
                    	if(null != cars && cars.length > 0){
                    		for(var i = 0; i < cars.length; i++){
                    			var car = cars[i];
                    			var approvalStatusId = car.approvalStatusId;
                    			var approvalStatus = car.approvalStatus;
                    			if(approvalStatusId == 4){
                    				content += '<p class="item nopass"><span>'+car.approvalStatus+'</span><span>'+car.approver+car.approvalTime+'</span></p>';
                    			}else{
                    				content += '<p class="item pass"><span>'+car.approvalStatus+'</span><span>'+car.approver+car.approvalTime+'</span></p>';
                    			}
                    		}
                    	}
                    	content += '</div></a>';
                        return content;
                    }
                },
                {
                    field: 'createTime',
                    title: '上传时间',
                    width: 150,
                },
                {
                    field: 'updateTime',
                    title: '审核时间',
                    width: 150,
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 100,
                    formatter: function (value, rec) {
                        return '<div class="table-operation">' +
                            '<a class="table-delete" onclick="deleteOpen('+rec.id+')" ><i></i>删除</a>' +
                            '</div>';
                    }
                }
            ]
        ],
        onLoadSuccess: function (row, data){
        	if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
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
    var pictureFile = document.querySelector('.card-picture input[type=file]');
    pictureFile.addEventListener('change',function () {
        validate.checkImg($(this));
    });

    /*=========================弹窗=========================*/

    // 关闭弹窗
    $('.close-icon').on('click',function () {
        var $popup = $(this).parents('.popup');
        $('.shade').fadeOut();
        $popup.fadeOut();
    });
    
    /*=========================删除弹窗=========================*/

    var deleteConfirm = document.querySelector('.delete-confirm');
    var inforCancel = document.querySelector('.infor-cancel');
    // 确认删除
    deleteConfirm.addEventListener('click',function () {
    	$.ajax({
    		url:"deleteCertification",
    		method:"post",
    		data:"certificationId="+certificationId,
    		dataType:"json",
    		success:function(data){
    			if(null != data && null != data[0] && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
         		}
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
    });
    // 取消弹窗
    inforCancel.addEventListener('click',function () {
        $('.shade').fadeOut();
        $(this).parents('.infor-wrapper').fadeOut();
    });

    /*=========================新建弹窗=========================*/

    var $newPopup = $('.newAdd-wrapper'); // 新建弹窗
    // 新建弹窗+初始化数据
    $('.new-btn').on('click', function () {
    	$.ajax({
         	type:"post",
         	url:"addTest",
         	dataType:"json",
         	success:function(data){
         		if(null != data && null != data[0] && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
         		}
         		
         		if(null != data && null != data[0].noOpt && data[0].noOpt){
         			new CustomPrompt({
                        type: 'error',
                        msg: '您无权操作！'
                    });
         		}else{
         			var $inputFile = $('.newAdd-wrapper input[type=file]');
         	        $inputFile.val(''); // 清空新建inputFile
         	        $inputFile.next().next('span').html('支持.jpg/.png/.JPEG').css('color','#ccc').removeAttr('state');
         	        $('.shade, .newAdd-wrapper').fadeIn();
         	        $newPopup.find('input[type=text]').not($newPopup.find('.textbox.combo input[type=text]')).val('');
         		}
         	},
     		error:function (XMLHttpRequest, textStatus, errorThrown){ 
     	     	//请求错误的处理
     			//请求错误的处理
     			//请求错误的处理
     	   	}
         })
    });
    // 新建弹窗提交
    var newAddSubmit = document.querySelector('.newAdd-submit');
    newAddSubmit.addEventListener('click',function () {
        $('.newAdd-form').form('submit', {
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                var $inputFile= $(this).find('input[type=file]').next().next('span');
                if($(this).find('input[type=file]').val() == ''){
                    $inputFile.html('请选择文件!!').css('color','#ff642e');
                }
                // setTimeout(function () {
                //     $('.chose-time').focus().blur();
                //     $('.layui-laydate').hide();
                // },0)
                return (formValue) && ($inputFile.attr('state') == 'normalFile')
            },
            success: function (result) {
            	if(null != result && null != result[0] && result[0].invalidate){
    				window.parent.location.href = result[0].loginPage;
         		}
            	
            	var data = JSON.parse(result);
            	if(data.result){
            		 new CustomPrompt({
                         type: 'success',
                         msg: '操作成功！'
                     });
                     $newPopup.fadeOut();
                     $('.shade').fadeOut();
                     setTimeout("window.location.reload()", 2000);
            	}else{
            		 new CustomPrompt({
                         type: 'success',
                         msg: '操作失败！'
                     });
            	}
            }
        });
    });

    /*=========================不通过弹窗=========================*/
    var approvalNoSubmit = document.querySelector('.approval-no-submit'); // 不通过原因提交
    // 弹出不通过原因弹窗
    $('.approval-submit-no').on('click',function () {
        $('.approval-wrapper').fadeOut();
        $('.approval-no-wrapper').fadeIn();
    });
    approvalNoSubmit.addEventListener('click',function () {
        var $textarea = $(this).parents('.popup').find('textarea');
        if($textarea.val() == ''){
            $textarea.focus()
        }else {
            new CustomPrompt({
                type: 'success',
                msg: '提交成功'
            });
            $('.shade').fadeOut();
            $('.approval-no-wrapper').fadeOut();
        }

    });
    // 返回审核弹窗
    $('.approval-no-wrapper .return-icon').on('click',function () {
        $('.approval-wrapper').fadeIn();
        $('.approval-no-wrapper').fadeOut();
    });
    // 通过
    $('.approval-submit-yes').on('click',function () {
        new CustomPrompt({
            type: 'success',
            msg: '提交成功'
        });
        $('.shade, .approval-wrapper').fadeOut();
    })
});

/*=========================其它方法=========================*/

// 其它类型验证方法
var validate = {
    checkImg: function (node) {
        var thisNode = $(node)[0];
        var $inputText = $(node).next().next('span');
        var imgArr = new Array();
        var length = thisNode.files.length;
        if(length != 0){ //选择了文件
            for (var i = 0; i < length; i++) {
                var imgName = thisNode.files[i].name;
                console.log(imgName.indexOf("png"));
                if(imgName.indexOf('jpg') != -1 || imgName.indexOf("png") != -1 || imgName.indexOf("JPEG") != -1){
                    imgArr.push(imgName);
                }else { // 选择错误的文件
                    $inputText.html('文件选择错误！！').css('color','#ff642e').attr('state','errFile');
                }
            }
            if(length == imgArr.length){
                $inputText.html(imgArr.toString()).css('color','#dcdcdc').attr('state','normalFile');
            }
        }else{
            $inputText.html('支持.jpg/.png/.JPEG').css('color','#dcdcdc').attr('state','errFile');
        }
    }
};
// 打开删除弹窗
function deleteOpen(objId) {
	certificationId = objId;
	$.ajax({
		url:"deleteTest",
		method:"post",
		dataType:"json",
		success:function(data){
			if(null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
     		
     		if(null != data[0].noOpt && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
     			$('.delete-wrapper, .shade').fadeIn();
            }
		},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
	})
}

// 打开厂站照片弹窗
function pictureOpen(objId) {
	$.ajax({
		url:"getImages",
		method:"post",
		data:"certificationId="+objId,
		dataType:"json",
		success:function(data){
			if(null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
			if(null != data && null != data.imageDetailPaths && data.imageDetailPaths.length > 0){
				var commonPath = data.commonPath;
				var imagesArray = data.imageDetailPaths;
				
				var $node = $('.shade, .picture-wrapper').find(".content");
				$node.empty();
				var content = " <div class='swiper-container gallery-top'><div class='swiper-wrapper'>";
				for(var i = 0; i < imagesArray.length; i++){
					content += "<div class='swiper-slide'><img src="+basePath() + commonPath+'/'+imagesArray[i]+" alt=''></div>";
				}
				content += "</div></div>";
				content += "<div class='swiper-container gallery-thumbs'><div class='swiper-wrapper'>";
				for(var i = 0; i < imagesArray.length; i++){
					content += "<div class='swiper-slide' style='background-image:url("+ basePath() +commonPath+'/'+imagesArray[i]+")'></div>";
				}
                content += "</div><div class='swiper-button-next'></div><div class='swiper-button-prev'></div></div>";
                content += "<div class='swiper-pagination'></div>";
                $node.append(content);
                var galleryTop = new Swiper('.gallery-top', {
                });
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
			}
		},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
	})
	$('.shade, .picture-wrapper').fadeIn();
   
}


function basePath() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var currentPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = currentPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPath = currentPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPath + projectName + "/");
}


//点击搜索框
function search(pageIndex,pageSize){
	var keyword = $("#keyword").val();
	var url = 'getByPage';
	if($.trim(keyword).length > 0){
		url = 'getByParas';
	}
	
	
	$.ajax({
	   	type:"post",
	   	url:url,
	   	data:"parasJson="+keyword,
	   	success:function(data){
	   		if(null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
     		}
	   		$('#dg').datagrid("loadData",JSON.parse(data));
	   		$('#dg').datagrid('getPager').pagination({pageNumber:pageIndex});
	   	},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
	   	}
 })
}


