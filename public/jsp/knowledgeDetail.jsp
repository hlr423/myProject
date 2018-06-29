<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>知识库详情</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/wangEditor.min.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/knowledgeDetail.css">

	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
	<style>
		.acss{
			cursor:default
		}
	</style>
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
<div class="body-wrapper">
    <a href="../question/toQuestion?page=${number }" class="back"><i></i>返回列表</a>
    <section>
        <div class="title">
            <div class="title-head">
            	<input type="hidden" name="questionId" id="questionId" value="${data.questionId }"/>
                <h3>${data.questionTitle }</h3>
                <div class="title-oper">
                    <button class="reply"><i></i>回复</button>
                    <button class="del"><i></i>删除</button>
                </div>
            </div>
            <div class="title-li">
                <span>${data.questType }</span>
                <span>${data.questionEquip }</span>
                <span>${data.questionTask }</span>
                <span>${data.questionTime }</span>
                <span class="see"><i></i>${data.questionSee }</span>
                <span class="comment"><i></i>${data.questionNum }</span>
                <!-- <span class="zan"><i></i>12</span> -->
                <span class="user"><i></i>${data.questionPerson }</span>
            </div>
        </div>
        <div class="content">
            <p>
               ${data.questionContent }
            </p>
        </div>
        <input type="hidden" name="answerId" id="answerId"/>
        <input type="hidden" name="addc" id="addc" value="${addc }"/>
        <c:forEach items="${data.data }" var="p" varStatus="st">
        <c:if test="${st.count<=4 }">
        <div class="comment-content">
            <div class="comment-title">
                    <span class="user">
                    <img src="<%=basePath %>/front/public/images/zsktp.png" alt="">
                    ${p.person }
                </span>
                <span class="time">${p.time }</span>
                <c:if test="${st.count==1 }">
                	<span class="fire"><i></i>精</span>
                </c:if>
                <div>
                        <span class="dzan acss">
                        <c:if test="${p.isGood }">
                                <img src="<%=basePath %>/front/public/images/yizan.png" alt="">
                                                               赞
                            </c:if>
                            <a state="0" onclick="zanAnswer('${p.id }')">
                            <c:if test="${!p.isGood }">
                                <img src="<%=basePath %>/front/public/images/nozan.png" alt="">
                                赞
                            </c:if>
                            </a>
                            <span>${p.num }</span>
                        </span>
                    <span class="dzan-del">
                            <a onclick="delAswer('${p.id }')" class="acss"><i></i>删除</a>
                        </span>
                </div>
            </div>
            <div class="comment-detail">
                <p>
                   ${p.content }
                </p>
            </div>
        </div>
        </c:if>
        <c:if test="${st.count==5 }">
            <div class="footer" id="addmore" onclick="addmore()">
                <a class="add-more">加载更多</a>
            </div>     
        </c:if>
        <c:if test="${st.count>=5 }">
        <div class="comment-content hidden">
            <div class="comment-title">
                    <span class="user">
                    <img src="<%=basePath %>/front/public/images/zsktp.png" alt="">${p.person }
                    </span>
                <span class="time">${p.time }</span>
                <div>
                        <span class="dzan acss">
                             <c:if test="${p.isGood }">
                                <img src="<%=basePath %>/front/public/images/yizan.png" alt="">
                                                               赞
                            </c:if>
                            <a state="0" onclick="zanAnswer('${p.id }')">
                            <c:if test="${!p.isGood }">
                                <img src="<%=basePath %>/front/public/images/nozan.png" alt="">
                                赞
                            </c:if>
                            </a>
                            <span>${p.num }</span>
                        </span>
                    <span class="dzan-del"><a onclick="delAswer('${p.id }')" class="acss"><i></i>删除</a></span>
                </div>
            </div>
            <div class="comment-detail">
                <p>
					${p.content }
                </p>
            </div>
        </div>
        </c:if>
        </c:forEach>
    </section>
</div>
<!--遮罩-->
<div class="shade"></div>
<!--回复-->
<div class="reply-wrapper popup">
    <div class="title">
        <p>回复</p>
        <a class="close-popup">
            <i class=" close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form>
            <div id="editor">

            </div>
        </form>
    </div>
    <div class="footer">
        <div class="submit reply-submit">
            提交
        </div>
    </div>
</div>
<!-- 删除框 -->
<div class="infor-wrapper delete-wrapper">
    <p>
        <i></i>
        是否确认删除?
    </p>
    <div>
        <a class="delete-confirm delete-this">删除</a>
        <a class="infor-cancel">取消</a>
    </div>
</div>
<!-- 删除框 -->
<div class="infor-wrapper delete-wrapper1">
    <p>
        <i></i>
        是否确认删除?
    </p>
    <div>
        <a class="delete-confirm delete-pl">删除</a>
        <a class="infor-cancel">取消</a>
    </div>
</div>
<script src="<%=basePath %>/front/public/js/jquery-3.2.1.min.js"></script>
<script src="<%=basePath %>/front/public/js/wangEditor.min.js"></script>
<script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
<script src="<%=basePath %>/front/public/js/knowledgeDetail.js"></script>
</body>
<script type="text/javascript">
	//点赞
	function zanAnswer(id){
  		var url="updateAnswer";
  		var param={"answerId":id};
  		$.post(url,param,function(data){
  			if(data[0]!=null && data[0].invalidate!=null && data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
			}
			if(data[0]!=null && null != data[0].noOpt && data[0].noOpt){
     			new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
     		}else{
	  			if(data.status==204){
	  				new CustomPrompt({
		                type: 'success',
		                msg: '点赞失败'
	            	});
	  			}else if(data.status==200){
		  			location.reload(); 			
	  			}
  			}
  		},"json");
  	}
  	//删除
  	/* function delAswer(id){
  		$("#answerId").val(id);
  	} */
	//加载更多
	function addmore(){
		$("#addmore").hide();
		var s = $(window).scrollTop();
		$(".comment-content").show();
		$('html,body').animate({
            scrollTop : s+450+'px'
        },500);
        //$(".comment-content").attr("display",block);
	}
</script>

</html>