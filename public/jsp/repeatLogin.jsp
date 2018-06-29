<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
	
 	<!-- 重复登录 -->
    <div class="account-prompt-wrapper">
        <p><img src="<%=basePath%>front/public/images/delete-icon.png" alt="">有人试图登录您的账号，是否继续使用？</p>
        <div>
            <a class="is-self">是</a>
            <a class="no-self">否</a>
        </div>
    </div>
    <!-- 身份验证框 -->
     <div class="identify">
        <form action="">
            <div>
                <input id="yzm_generalPage" type="text" placeholder="请输入验证码" name="identifyCode">
                <a class="get-code" state="0">获取验证码</a>
            </div>
        </form>
        <div>
            <a class="identify-return">返回</a>
            <a class="to-login">继续登录</a>
        </div>
    </div>
    
    <div class="close-wrapper">
        <p>
            <!-- <img src="'+window.location.host+basePath()+'/front/public/images/delete-icon.png" alt="">确认退出？</p> -->
        <p>确认退出？</p>
        <div>
            <a class="close-wrapper-sure">退出</a>
            <a class="close-wrapper-cancel">取消</a>
        </div>
    </div>
    
    
    
    
    
    <script src="<%=basePath%>front/public/js/jquery-3.2.1.min.js"></script>
    <script>
    
		$(function () {
			var resultTemp;
			// 不继续使用
			$('.no-self').on('click', function () {
			    $('.shade, .account-prompt-wrapper').fadeOut();
			    window.parent.location.href = "/wai-web-login/user/toLoginOut";
			})
			
			//继续使用
			$('.is-self').on('click', function () {
			    $('.account-prompt-wrapper').fadeOut();
			    $('.identify').fadeIn();
			})
			
			
			$('#code_WD').on('blur keyup',function () {
     	        if(this.value != resultTemp){ // 测试
     	            $(this).next('.error').length ? $(this).after() : $(this).after(error);
     	        }else {
     	            $(this).next('.error').remove();
     	        }
     	    });
     	    
			// 获取验证码 按钮变为计时器
			$('.get-code').on('click',function () {
				alert("获取验证码！")
				var $this = $(this);
				var i = 60;
				$.ajax({
		         	type:"post",
		         	url:"/wai-web-base/center/getYZM_center",
		         	async:false,
		         	success:function(result){
		         		//console.log(result);
			         	resultTemp = result.yzm;
			         	// 验证码验证
			     	    $('#code_WD').trigger('blur');
		         	},
		     		error:function (XMLHttpRequest, textStatus, errorThrown){ 
		     	     	//请求错误的处理
		     			//请求错误的处理
		     			//请求错误的处理
		     			//请求错误的处理
		     			//请求错误的处理
		     	   	}
		         });
				
				if($this.attr('state') == 0){
			        $this.attr('state','1');
			        $this.css('background-color','#c9c9c9').text('重新获取'+i+'s');
					var time = setInterval(function () {
			            i--;
			            $this.css('background-color','#c9c9c9').text('重新获取'+i+'s');
			            if(i == 0){
			                $this.attr('state','0');
			                $this.css('background-color','#51c598').text('获取验证码');
			                clearInterval(time);
						}
			        },1000)
				}else {
					console.log('已点击等60秒再点')
				}
			});
			
			// 点击取消，退出到登录界面
		    $('.identify-return').on('click', function () {
		        $('.shade, .identify').fadeOut();
		      	window.parent.location.href = "/wai-web-login/user/toLoginOut";
		    })
			
			
			// 继续使用(已经登录人员)
			$('.to-login').on('click',function () {
				$('#code_WD').trigger('blur');
				var errorLength = $("#code_WD").next(".error").length;
				if(errorLength <= 0){
					$.ajax({
			    		url:"/wai-web-base/center/checkYZM_center",
			    		method:"post",
			    		data:"yzm="+$("#yzm_generalPage").val(),
			    		dataType:"json",
			    		success:function(data){
			    			if(data.checkResult) {
			             		$('.shade, .identify').fadeOut();
			             		$('#code_WD').val("");
								var $shade1 = $('.shade', window.parent.menu.document);
								//console.log();
								var $shade2 = $('.shade', window.parent.head.document);
								$shade1.hide();
								$shade2.hide();
			                }else{
								alert(data.checkMessage);
			                }
			    		},
			    		error:function (XMLHttpRequest, textStatus, errorThrown){ 
			     	     	//请求错误的处理
			     			//请求错误的处理
			     			//请求错误的处理
			     	   	}
			    	})
				
				
				}
		    })
		})
    </script>
    <script>
    	$.ajax({
    		url:"/wai-web-login/user/toValidateSession",
    		method:"post",
    		data:"",
    		success:function(data){
    		},
    		error:function (XMLHttpRequest, textStatus, errorThrown){ 
     	     	//请求错误的处理
     			//请求错误的处理
     			//请求错误的处理
     	   	}
    	})
    </script>
    