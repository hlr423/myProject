$(function () {
	$(".comment-content.hidden").hide();
	$("#addmore").show();
	var addc=$("#addc").val();
	if(addc==1){//回复
		$("#addmore").hide();
		$(".comment-content.hidden").show();
		var s = $(window).scrollTop();
		$('html,body').animate({
            scrollTop : s+1000+'px'
        },500);
	}else if(addc==2){//点赞
		$("#addmore").hide();
		$(".comment-content.hidden").show();
	}

    /*====================初始化+变量声明====================*/

    // 初始化富文本
    var Editor = window.wangEditor; // 富文本编辑器
    var editor1 = new Editor('#editor');
    editor1.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
    editor1.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        //'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        //'video',  // 插入视频
        //'undo',  // 撤销
       // 'redo'  // 重复
    ];
    editor1.customConfig.uploadImgHooks = {
	    customInsert: function (insertImg, result, editor) {
	        var url = result.data;
	        insertImg(url);
	    }
    };
    
    editor1.customConfig.uploadImgShowBase64 = true;
    editor1.customConfig.uploadImgServer = 'uploadImg';
    editor1.customConfig.uploadFileName = 'uploadsFile';
    editor1.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;	//限制图片5M
    editor1.customConfig.debug=true;
    editor1.create();

    /*=========================弹窗=========================*/

    // 关闭弹窗
    $('.close-icon').on('click',function () {
        var $popup = $(this).parents('.popup');
        $('.shade').fadeOut();
        $popup.fadeOut();
    });

    /*====================回复弹窗====================*/

    // 弹出回复
    $('.reply').on('click',function () {
    	$('.shade,.reply-wrapper').fadeIn();
	    $('.reply-wrapper .w-e-text').html('')  
        /*$.ajax({
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
         			$('.shade,.reply-wrapper').fadeIn();
         	        $('.reply-wrapper .w-e-text').html('')    			
         		}
			}
		});*/
    });

    // 回复提交
    var replySubmit = document.querySelector('.reply-submit'); // 回复提交
    replySubmit.addEventListener('click',function () {
        if($('.reply-wrapper .w-e-text').html() == ''){
            $('.reply-wrapper .w-e-text').focus();
        }else {
            $('.shade, .reply-wrapper').fadeOut();
            $.ajax({
                type:'post',
                url:'addAnswer',
                data:{"content":editor1.txt.html(),"questionId":$("#questionId").val()},
                dataType:'json',
                async:false,
                success:function(data){
         			if(data.data!=0){
         				new CustomPrompt({
         					type: 'success',
         					msg: '回复成功'
         				});
         				setTimeout("location.reload();", 500);
         			}else{
         				new CustomPrompt({
         					type: 'success',
         					msg: '回复失败'
         				});
         			}
                }
            });
        }
    });

    /*=========================删除弹窗=========================*/

    var deleteThis= document.querySelector('.delete-this');
    var deletePl= document.querySelector('.delete-pl');

    // 删除当前帖子
    $('.del').on('click',function () {
        $.ajax({
    		type:"post",
    		url:"deleteTest2",
    		dataType:"json",
    		data:{"questionId":$("#questionId").val()},
    		success:function(data){
     			if(data.data == 1){
     				$('.shade, .delete-wrapper').fadeIn();      				
     			}else{
     				new CustomPrompt({
                        type: 'error',
                        msg: '您无权操作！'
                    });
     			}
    		}
    	});
    });
    // 删除评论
    var aa="";
    $('section').on('click','.dzan-del',function () {
        aa=$(this);
    });
    // 确认删除-当前帖子
    deleteThis.addEventListener('click',function () {
    	var url="deleteQuestion";
    	var param={"questionId":$("#questionId").val()};
    	$.post(url,param,function(data){
 			if(data.data==1){
 				new CustomPrompt({
 					type: 'success',
 					msg: '删除成功'
 				});  
 				location.href="../question/toQuestion";
 			}else{
 				new CustomPrompt({
 					type: 'error',
 					msg: '删除失败'
 				});   
 			}			
    	},"json");
        $(this).parents('.infor-wrapper').fadeOut();
        $('.shade').fadeOut();
    });
    // 确认删除-评论
    deletePl.addEventListener('click',function () {
    	$(this).parents('.infor-wrapper').fadeOut();
    	$('.shade').fadeOut();
    	var url="deleteAnswer";
    	var param={"answerId":$("#answerId").val()};
    	$.post(url,param,function(data){
 			if(data.status==200){
 				new CustomPrompt({
 					type: 'success',
 					msg: '删除成功'
 				});   			
 				aa.parent().parent().parent().remove();
 				$(".comment").html('<i></i>'+data.numm);
 				$("#addmore").hide();
 				$(".comment-content.hidden").show();
 			}else  if(data.status==204){
 				new CustomPrompt({
 					type: 'error',
 					msg: '删除失败'
 				});
 			} 
    	},"json");
    });
    // 取消删除弹窗
    $('.infor-cancel').on('click',function () {
        $('.shade').fadeOut();
        $(this).parents('.infor-wrapper').fadeOut();
    });


    /*====================其它====================*/



    // 评论内容点赞
    /*$('section').on('click','.dzan',function () {
         var $this = $(this);
         var state = $this.find('a').attr('state'); // 0未赞 1赞了
         var number = $this.find('span').text(); // 点赞数
         if (state == 0){
             $this.find('a').attr('state','1');
             $this.find('img').attr('src','../images/yizan.png');
             number++;
             $this.find('span').text(number);
         } else {
             $this.find('a').attr('state','0');
             $this.find('img').attr('src','../images/nozan.png');
             number--;
             $this.find('span').text(number)
         }
     });*/

    // 加载更多
    //$('.add-more').on('click',function () {
    /*var s = $(window).scrollTop();
    console.log(s);
    var content = '<div class="comment-content">';
    content += '<div class="comment-title">' ;
    content += '<span class="user">' ;
    content += '<img src="front/public/dist/images/zsktp.png" alt="">${p.person }' ;
    content += '<span class="time">${p.time }</span>' ;
    content += '<div><span class="dzan"><a state="0"><img src="front/public/dist/images/nozan.png" alt=""></a>赞<span>2</span>' ;
    content += '</span><span class="dzan-del"><i></i>删除</span></div></div>' ;
    content += '<div class="comment-detail">' ;
    content += '<p>根据理论推导可知，化学氧化反应通过氧化作用使苯系物质</p>' ;
    content += '<img src="front/public/dist/images/beng.png" alt=""></div></div>' ;
    $(this).parents('.footer').before(content);
    $('html,body').animate({
        scrollTop : s+1000+'px'
    },500);*/
    //$(".comment-content").attr("display",block);

    // alert('加载更多请求')
    // });

    // 滚动滚动条 绝对定位title
    var titleWidth = $('section .title').width();
    var state = 0;
    $(window).scroll(function () {
        var s= $(window).scrollTop();
        var $title = $('section .title');
        var $titleOper = $('.title-oper');
        if(s >= 80 && state == 0){
            $title.css({
                position : 'fixed',
                top : 0,
                width : titleWidth
            }).after('<div class="title1"></div>');
            $titleOper.css('right','39px');
            state++;
        }
        if(s<80){
            $title.css({
                position:'',
                top:'',
            });
            $('.title1').remove();
            $titleOper.css('right','50px');
            state=0
        }

        // else {
        //     $('.title1').remove();
        //     state =0;
        // }
    });
});

function delAswer(id){
	$("#answerId").val(id);
	$.ajax({
		type:"post",
		url:"deleteTest",
		dataType:"json",
		data:{"answerId":$("#answerId").val()},
		success:function(data){
 			if(data.data == 1){
 				$('.shade, .delete-wrapper1').fadeIn();         				
 			}else{
 				new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
 			}
		}
	});
} 