var personId = $("#personId").val();
$(function () {
            // console.log(window.parent.view_frame.document)
            // console.log($(window.parent.view_frame.document))
	loginSuccess();
	$.ajax({
		url:basePath() + "/user/getInfoByPersonId",
		method:"post",
		data:"personId="+personId,
		dataType:"json",
		success:function(data){
			console.log(data);
			if(null != data && null != data[0] && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
			}
			$("#personName").text("欢迎您，"+data.name);
			$("#avatar").attr("src",basePath() + "/" + data.avatarUrl);
		},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
	})
	
    // 登录信息
    $('.welcome').on('mouseover', function () {
        var $body = $('body', window.parent.view_frame.document)
        var loginInfo = '<div class="login-info">';
        loginInfo += '<span class="normal">正常</span>';
        loginInfo += '<p>';
        loginInfo += '<span>上次登录时间</span>';
        loginInfo += '<span>2017-09-10 14:24:45</span>';
        loginInfo += '</p>';
        loginInfo += '<p>';
        loginInfo += '<span>上次登录地点</span>';
        loginInfo += '<span>四川成都</span>';
        loginInfo += '</p>';
        loginInfo += '</div>';
        var $loginInfo = $('.login-info', window.parent.view_frame.document)
        if ($loginInfo.length == 0) {
            $body.append(loginInfo);
        }
    })
    
    
    
    $('.welcome').on('mouseout', function () {
        var $body = $('body', window.parent.view_frame.document)
        var $loginInfo = $('.login-info', window.parent.view_frame.document)
        $loginInfo.remove();
    })


    // 消息提示框
    $('.headMessage').on('click', function () {
        var $body = $('body', window.parent.view_frame.document)
        console.log($body)
        var systemInformation = '<div class="top-inf">';
        systemInformation += '<p>你有一条新的系统通知</p>';
        systemInformation += '<a>查看</a>';
        systemInformation += '</div>';
        var $topInf = $('.top-inf', window.parent.view_frame.document)
        if ($('.point').length == 1) {
            if ($topInf.length == 0) {
                $body.append(systemInformation)
            } else {
                $topInf.remove();
            }
        }
        // $(window.parent.frames["menu"].document).find('#aaa').hide()
    })

    // 公司信息
    $('.headExplain').on('mouseover', function () {
        var $body = $('body', window.parent.view_frame.document)
        var companyDetail = '<div class="top-company">';
        companyDetail += '<p>版权所有©四川亚欧瑞智科技有限公司</p>';
        companyDetail += '<p>技术支持:四川亚欧瑞智科技有限公司</p>';
        companyDetail += '<p>400-028-9537</p>';
        companyDetail += '</div>';
        var $companyDetail = $('.top-company', window.parent.view_frame.document)
        if ($companyDetail.length == 0) {
            $body.append(companyDetail)
        }
    })
            
    $('.headExplain').on('mouseout', function () {
        var $body = $('body', window.parent.view_frame.document)
        var $companyDetail = $('.top-company', window.parent.view_frame.document)
        $companyDetail.remove();
    });

    // 退出框
    $('.headClose').on('click', function () {
    	console.log("aa")
        var state = $(this).attr('state');
        var $body = $('body', window.parent.view_frame.document);

        console.log($body)
        console.log(state)
        console.log(state == 0)
        if (state == 0) {
            $(this).attr('state', '1');
            var shade = '<div class="shadeAll"></div>';
            var closeWrapper = '<div class="close-wrapper">';
           // closeWrapper += '<p><img src="'+window.location.host+basePath()+'/front/public/images/delete-icon.png" alt="">确认退出？</p>';
            closeWrapper += '<p>确认退出？</p>';
            closeWrapper += '<div><a class="close-wrapper-sure">退出</a>';
            closeWrapper += '<a class="close-wrapper-cancel">取消</a></div>';
            
            $body.append(shade).append(closeWrapper);
            
            $body.find('.close-wrapper').css('display','block');
        }
        $body.on('click','.close-wrapper-sure',function (event) {
            event.stopPropagation();
            window.parent.location.href = "/wai-web-login/user/toLoginOut";
        });
        $body.on('click','.close-wrapper-cancel',function (event) {
            event.stopPropagation();
            var $shade = $body.find('.shadeAll');
            var $headClose = $('.headClose',window.parent.head.document);
            $(this).parents('.close-wrapper').remove();
            $shade.remove();
            $headClose.attr('state','0');
        });                
    });

    
    
    function showWarming(station, equip, state) {
        var $body = $('body', window.parent.view_frame.document);
        var messageNode = '<div class="allMessage"><div class="title">';
        messageNode += '<span>故障消息</span><a class="close-popup"><i class="close-icon"></i></a>';
        messageNode += '</div><div class="content"><p></p></div></div>';
        $body.append(messageNode);
        var $allMessage = $('.allMessage', window.parent.view_frame.document);
        var $title = $allMessage.find('.title');
        var $content = $allMessage.find('.content');
        $title.find('.close-icon').on('click', function () {
            var $this = $(this);
            var $parent = $this.parents('.allMessage');
            $parent.fadeOut().css('bottom', '-110px');  // 当前消失
        });
        $allMessage.animate({ //弹出动画
            bottom: '20px'
        }, 1000);
        var context = station + "-" + equip + "-" + state;
        console.log($content.text())
        $content.each(function (index, node) {
            if ($(node).text() == '') {
                $(node).find('p').text(context);
            } else {
                console.log(2)
            }
        })
        
        $content.find('p').on('click', function () {
            alert('跳转')
        })
    }
});
    

	// 监听f5局部刷新内容frame
    document.onkeydown = function (e) {
        e = window.event || e;
        var keycode = e.keyCode || e.which;
        if (keycode == 116) {
            if (window.event) {// ie 
                e.preventDefault();
                window.parent.frames["view_frame"].location.reload();
            } else {// firefox  
                e.preventDefault();
                window.parent.frames["view_frame"].location.reload();
            }
        }
    }

    
/***************************验证重复登录的websocket****************************/
var loginWS;//重复登录用到的websocket
function loginSuccess(){
	//创建socket对象
	//alert("ws://"+ window.location.host+"${pageContext.request.contextPath}/mygame");
	//var socket = new WebSocket("ws://192.168.2.122:8080/WAI/loginSuccess.do");
	var socket = new WebSocket("ws://"+window.location.host+basePath()+"/loginSuccess");
	loginWS = socket;
	//连接创建后调用
	socket.onopen = function() {
		var openSuccess = new Object();
		//socket.send("connection is created successfully head.js---->183");
		//console.log("webSocket连接成功！");
	};
	//接收到服务器消息后调用
	socket.onmessage = function(message) {
		//session失效时跳到登录界面
		console.log(message)
		console.log(JSON.stringify(message))
		var data = parseObj(message.data);
		console.log(data);
		console.log(JSON.stringify(data));
		if(data.type == 1){
			//alert("hahahahaha"+data.text);
			//alert("重复登录---->普通页面弹框");
			var $body1 = $('body', window.parent.menu.document);
//    		var $body2 = $('body', window.parent.view_frame.document)
			var shade = '<div class="shade"></div>';
			$body1.append(shade);
			var $shade1 = $('.shade', window.parent.menu.document);
			var $shade2 = $('.shade', window.parent.view_frame.document);
			$shade1.show();
			$shade2.show();
			$(".shade").show();
			$('.account-prompt-wrapper', window.parent.view_frame.document).show();
		}else if(data.type == 2){
			if(data.text){
				window.parent.location.href = "/wai-web-login/user/toLoginOut";
			}
		}
	};
	
	
	//关闭连接的时候调用
	socket.onclose = function(e){
		//console.log(e)
		//socket.send("*****************************");
		//console.log(socket.CLOSED)//3
		//console.log(socket.CLOSING)//2
	};
	
	//出错时调用
	socket.onerror = function(e) {
		console.log(e);
		alert("websocket出错 head.js---->228");
	};
}
        
function parseObj(strData){//转换对象
    return (new Function("return" + strData))();
};
        
        
        
        
        
        
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
    return (projectName);
}