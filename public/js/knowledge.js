$(function () {
    var divs = $(".item");
    $.each(divs, function (i, n) {
        $(n).on('click', function () {
            var aa = $("#page").val();
            location.href = "../answer/getAnswerByQuestionId?questionId=" + $(n).attr('data-id') + "&number=" + aa;
        });
    });

    /*====================声明+初始化变量====================*/

    var delArrya = []; // 存放删除的数组
    var Editor = window.wangEditor; // 富文本编辑器
    var layDataNode = document.getElementsByClassName('chose-time'); // 初始化时间控件
    var editor1 = new Editor('#equipment-editor');
    editor1.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
    editor1.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        //'emoticon',  // 表情
        'image', // 插入图片
        'table', // 表格
        // 'video', // 插入视频
        //'undo',  // 撤销
        //'redo'  // 重复
    ];
    editor1.create();

    editor1.customConfig.uploadImgHooks = {
        customInsert: function (insertImg, result, editor) {
            var url = result.data;
            console.log("88:" + editor1.txt.html())
            insertImg(url);
        }
    };

    editor1.customConfig.uploadImgShowBase64 = true;
    editor1.customConfig.uploadImgServer = 'uploadImg';
    editor1.customConfig.uploadFileName = 'uploadsFile';
    editor1.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; //限制图片5M
    editor1.customConfig.debug = true;
    editor1.create();

    
    // 初始化时间控件
    for (var i = 0; i < layDataNode.length; i++) {
        laydate.render({
            elem: layDataNode[i],
            // type: 'datetime',
            showBottom: false
        });
    }
    /*=========================弹窗=========================*/

    // 关闭弹窗
    $('.close-icon').on('click', function () {
        var $popup = $(this).parents('.popup');
        $('.shade').fadeOut();
        $popup.fadeOut();
    });

    /*====================新建弹窗====================*/

    //打开新建弹窗
    $('.zsk-add').on('click', function () {
        $.ajax({
			type:"post",
			url:"addTest",
			dataType:"json",
			success:function(data){
				if(data[0]!=null && data[0].invalidate){
    				window.parent.location.href = data[0].loginPage;
    			}
				if(null != data[0] && data[0].noOpt){
         			new CustomPrompt({
                        type: 'error',
                        msg: '您无权操作！'
                    });
         		}else{
         			$('.shade, .new-task').fadeIn();
         	        $('.new-task').find('.w-e-text').html('');  			
         		}
			}
		});
    });

    // 新建弹窗提交
    var newAddSubmit = document.querySelector('.new-submit');
    newAddSubmit.addEventListener('click', function () {
        // upload();不应该要的，
        var dd = $('#content').val(editor1.txt.html());
        $('.new-form').form('submit', {
            url: 'addQuestions',
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                var $newEditor = $('.w-e-text'); // 富文本
                if ($newEditor.html() != '' && $("#title").val().trim() != '') {
                    return formValue
                } else {
                    if ($("#title").val().trim() == '') {
                        new CustomPrompt({
                            type: 'error',
                            msg: '提交失败'
                        });
                        $('.shade').fadeOut();
                        $('.new-task').fadeOut();
                    }
                    $newEditor.focus();
                    return false;
                }

            },
            success: function (data) {
                var json = eval("(" + data + ")");
                if (json.data == 1) {
                    new CustomPrompt({
                        type: 'success',
                        msg: '添加成功'
                    });
                    setTimeout("location.reload();", 500);
                } else {
                    new CustomPrompt({
                        type: 'error',
                        msg: '提交失败'
                    });
                }
                $('.shade').fadeOut();
                $('.new-task').fadeOut();
            }
        });
    });

    /*=========================删除弹窗=========================*/

    /*var deleteConfirm = document.querySelector('.delete-confirm');
    var inforCancel = document.querySelector('.infor-cancel');
    // // 确认删除
    deleteConfirm.addEventListener('click',function () {
        new CustomPrompt({
            type: 'success',
            msg: '删除成功'
        });
        $('.shade, .delete-wrapper').fadeOut();
    });
    // 取消弹窗
    inforCancel.addEventListener('click',function () {
        $('.shade').fadeOut();
        $(this).parents('.infor-wrapper').fadeOut();
    });*/


    /*====================其它方法====================*/

    // 设置可选状态 默认选中第一个
    $('.zsk-all-del').on('click', function () {
        var $itemsNode = $('.items');
        var $top1 = $itemsNode.find('.item:eq(0)');
        if (/clicked/.test($(this).attr('class'))) { //变为确认删除后
            delArrya = [];
            $($itemsNode.find('.item')).each(function (index, $node) {
                if (/chosed/.test($($node).find('.hidden-chose').attr('class'))) {
                    delArrya.push($($node).attr('data-id'));
                }
            });
            /*if(delArrya.length > 0){
                $('.shade, .delete-wrapper').fadeIn(); // 弹出删除确认框
            }*/
        } else {
            $top1.find('.hidden-chose').toggleClass('chosed');
            $(this).addClass('clicked');
            $($itemsNode.find('.item')).each(function (index, $node) {
                $($node).addClass('can-chose');
            });
            $('.cancel-del').addClass('active');

            var divs = $(".item");
            $.each(divs, function (i, n) {
                $(n).unbind('click');
            });
        }
        if (delArrya != "") {
            //$.each(delArrya,function(i,n){
            /*var url="deleteQuestion";
                var param={"questionIds":delArrya};
                $.post(url,param,function(data){
                	if(data.data==1){
                		new CustomPrompt({
                			type: 'success',
                			msg: '删除成功'
                		});
                		setTimeout("location.reload();", 500);           		
                	}else if(data.data!=1){
                		new CustomPrompt({
                			type: 'success',
                			msg: '删除失败'
                		});
                	}
                },"json");*/
            //});
            $.ajax({
                url: 'deleteQuestion',
                data: {
                    "questionIds": delArrya
                },
                dataType: "json",
                type: "POST",
                traditional: true, //这里设为true就可以了
                success: function (data) {
                    if (data[0] != null && data[0].invalidate != null && data[0].invalidate) {
                        window.parent.location.href = data[0].loginPage;
                    }
                    if (data[0] != null && null != data[0].noOpt && data[0].noOpt) {
                        new CustomPrompt({
                            type: 'error',
                            msg: '您无权操作！'
                        });
             		}else{
             			if(data.data==1){
             				new CustomPrompt({
             					type: 'success',
             					msg: '删除成功'
             				});
             			}else if(data.data!=1){
             				new CustomPrompt({
             					type: 'error',
             					msg: '删除失败'
             				});
             			}             			
             			document.getElementById("formId1").submit();          		
             		}
        	    } 
        	}); 
        }
    });
    // 点击选中
    $('.items').on('click', '.item', function () {
        if (/can-chose/.test($(this).attr('class'))) {
            //var aa=$(this).children(".questionIds").val();
            $(this).find('.hidden-chose').toggleClass('chosed');
        }
    });
    // 取消删除
    $('.cancel-del').on('click', function () {
        $(this).removeClass('active');
        $('.zsk-all-del').removeClass('clicked');
        var $itemsNode = $('.items');
        $($itemsNode.find('.item')).each(function (index, $node) {
            $($node).removeClass('can-chose')
                .find('.hidden-chose').removeClass('chosed');
        });
        delArrya = [];
    });
    // 遍历(默认,最新,最热等) 赋值事件
    /*$('.list').on('click','a',function () {
        $('.list a').removeClass('active');
        $(this).addClass('active');
    });*/
});
// =============================富文本编辑器中视频上传==========================
function uploads(file) {
    console.log(file[0])  //上传上来的文件的对象
    
    if (typeof (file[0]) == "undefined" || file[0].size <= 0) {
    	new CustomPrompt({
			type: 'error',
			msg: '请选择视频'
		});
        return;
    }
    var maxFileSize = 20 * 1024 * 1024;
    if (file[0].size >maxFileSize) {
    	new CustomPrompt({
			type: 'error',
			msg: '视频不能大于20M'
		});
        return;
    }

    var formFile = new FormData();
    formFile.append("action", "UploadVMKImagePath");  
    formFile.append("updateFile", file[0]); //加入文件对象
    
   /* var url = "uploadVideo";
	var param = {"uploadPath":url};
	$.post(url,param,function(data){
		alert(data.data);		
    },"json");*/
    
    var data = formFile;
	$.ajax({
        type: "POST",
        url: "uploadVideo",
        data: data,
        dataType:"json",
        cache: false,
        processData: false,
        contentType: false, 
        success: function (data) {
        	alert(data.data);
        	if(data.errno == 0){
        		wangEditorVideo(data.data);       		
        	}else{
        		new CustomPrompt({
        			type: 'error',
        			msg: '视频上传错误'
        		});
        	}
        }
    });
}

function subForm1(){
	$("#page").val(1);
	$("#mark").val(1);
	var startDate = $('#startDate').val();
	var endDate = $('#endDate').val();
	var start = new Date(startDate.replace("-", "/").replace("-", "/"));  
	var end = new Date(endDate.replace("-", "/").replace("-", "/")); 
	var curDate = new Date();
	if(end<start){
		new CustomPrompt({
			type: 'error',
			msg: '结束时间不能小于开始时间！'
		});
	}else if(start>curDate){
		new CustomPrompt({
			type: 'error',
			msg: '开始时间不能大于当前时间！'
		});
	}else{
		document.getElementById("formId1").submit();		
	}
}

// 富文本编辑器视频上传函数调用

function wangEditorVideo(url){
    var $editor = $('.row').find('.w-e-text');
    var edit = $editor.html();
	// console.log(edit+"<a href='www.baidu.com'></a>");
	var a = edit+"<video controls='controls' autoplay='autoplay' style='width:300px;height:300px'>" +
			"<source src='"+url+"' type='video/mp4'></video>";
	$editor.html(a)
}

function sortQuestion(mark) {
    $("#page").val(1);
    if (mark == 1) {
        $("#mark").val(1); //默认查询
    } else if (mark == 2) {
        $("#mark").val(2); //热度查询
    } else if (mark == 3) {
        $("#mark").val(3); //最新查询
    } else if (mark == 4) {
        $("#mark").val(4); //我发表的问题
    } else if (mark == 5) {
        $("#mark").val(5); //我回答的问题		
    }
    document.getElementById("formId1").submit();
}