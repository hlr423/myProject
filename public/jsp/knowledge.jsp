<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
 <%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>知识库</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/wangEditor.min.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/knowledge.css">

	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <!--搜索-->
        <form action="${pageContext.request.contextPath}/question/toQuestion" method="post" id="formId1">
        <div class="search-wrapper">
            <input type="text" placeholder="请选择开始时间" name="startDate" value="${data.startDate }" class="chose-time" id="startDate">
            <span>—</span>
            <input type="text" placeholder="请选择结束时间" name="endDate" value="${data.endDate }" class="chose-time" id="endDate">
            <select name="equipTemplateId" id="" class="searchSelect">
                <option value="">请选择设备模板</option>
                <c:forEach items="${equipTemps }" var="equit">
                	<c:if test="${data.equipTemplateId==equit.id }" >
                	<option value="${equit.id }" selected>${equit.text }</option>
                	</c:if>
                	<c:if test="${data.equipTemplateId!=equit.id }" >
                	<option value="${equit.id }">${equit.text }</option>
                	</c:if>
                </c:forEach>
            </select>
            <select name="taskTypeId" id="" class="searchSelect">
                <option value="">请选择任务类型</option>
                <c:forEach items="${taskTypes }" var="taskType">
                	<c:if test="${data.taskTypeId==taskType.id }" >
                		<option value="${taskType.id }" selected>${taskType.text }</option>
                	</c:if>
                	<c:if test="${data.taskTypeId!=taskType.id }" >
                		<option value="${taskType.id }">${taskType.text }</option>
                	</c:if>
                </c:forEach>
            </select>
            <input type="text" name="keyword" value="${data.keyword }" placeholder="请输入标题或内容" class="searchInput searchInput-s">
            <div class="search-btn" onClick="subForm1()">搜索</div>
        </div>
        <!--操作-->
        <div class="operation-wrapper">
            <div class="add new-btn newAddBtn zsk-add"><i></i>新建</div>
            <div class="allDelBtn zsk-all-del">
                <i></i>
                <span class="need">批量删除</span>
                <span class="confirm">确认删除</span>
            </div>
            <div class="cancel-del"><i></i>取消</div>
            <input type="hidden" name="mark" id="mark" value="${data.mark }"/>
            <div class="list">
            	<c:if test="${marks==1 }">
	                <a href="javascript:sortQuestion(1)" class="active">默认</a>
	                <a href="javascript:sortQuestion(2)">最热</a>
	                <a href="javascript:sortQuestion(3)">最新</a>
	                <a href="javascript:sortQuestion(4)">我的发布</a>
	                <a href="javascript:sortQuestion(5)">我的回复</a>
                </c:if>
                <c:if test="${marks==2 }">
                	<a href="javascript:sortQuestion(1)">默认</a>
	                <a href="javascript:sortQuestion(2)" class="active">最热</a>
	                <a href="javascript:sortQuestion(3)">最新</a>
	                <a href="javascript:sortQuestion(4)">我的发布</a>
	                <a href="javascript:sortQuestion(5)">我的回复</a>
                </c:if>
                <c:if test="${marks==3 }">
                	<a href="javascript:sortQuestion(1)">默认</a>
	                <a href="javascript:sortQuestion(2)">最热</a>
	                <a href="javascript:sortQuestion(3)" class="active">最新</a>
	                <a href="javascript:sortQuestion(4)">我的发布</a>
	                <a href="javascript:sortQuestion(5)">我的回复</a>
                </c:if>
                <c:if test="${marks==4 }">
                	<a href="javascript:sortQuestion(1)">默认</a>
	                <a href="javascript:sortQuestion(2)">最热</a>
	                <a href="javascript:sortQuestion(3)">最新</a>
	                <a href="javascript:sortQuestion(4)" class="active">我的发布</a>
	                <a href="javascript:sortQuestion(5)">我的回复</a>
                </c:if>
                <c:if test="${marks==5 }">
                	<a href="javascript:sortQuestion(1)">默认</a>
	                <a href="javascript:sortQuestion(2)">最热</a>
	                <a href="javascript:sortQuestion(3)">最新</a>
	                <a href="javascript:sortQuestion(4)">我的发布</a>
	                <a href="javascript:sortQuestion(5)" class="active">我的回复</a>
                </c:if>
            </div>
        </div>
        <!--内容-->
        <div class="body-content">
            <div class="items">
            	<c:if test="${data.rows!='' }">
            	<c:forEach items="${data.rows }" var="p" varStatus="st">
            	<c:if test="${data.pageNum==1 && st.count<=5 }">
                <div class="item top top${st.count }" data-id="${p.id}" style="cursor:pointer">
                    <h3>${p.title }<span></span></h3>
                    <p class="dis">
                    ${fn:substring(p.content,0,12) }...
					</p>
                    <div class="author">
                        <img src="<%=basePath %>/front/public/images/zsktp.png">
                        <div>
                            <span>${p.personName }</span>
                            <span>${p.startTime }</span>
                        </div>
                    </div>
                    <p class="tags">
                        <span>${p.questType }</span>
                        <span>|</span>
                        <span><a href="">${p.equipTemplateName }</a></span>
                        <span><a href="">${p.taskTypeName }</a></span>
                    </p>
                    <p class="info">
                        <span>
                            <a href="#"><i class="see"></i>${p.seeNum }</a>
                            <a href="#"><i class="chat"></i>${p.answers }</a>
                            <!-- <a href="#"><i class="zan"></i>14</a> -->
                        </span>
                        <a href="#" class="del"></a>
                    </p>
                    <div class="hidden-chose">
                        <img src="<%=basePath %>/front/public/images/qt_09.png">
                    </div>
                </div>
                </c:if>
                <c:if test="${data.pageNum!=1 || st.count>5 }">
                <div class="item" data-id="${p.id}" style="cursor:pointer">
                    <h3>${p.title }<span></span></h3>
                    <p class="dis">
                    	${fn:substring(p.content,0,12) }...
					</p>
                    <div class="author">
                        <img src="<%=basePath %>/front/public/images/zsktp.png">
                        <div>
                            <span><font color="#4f4f4f">${p.personName }</font></span>
                            <span><font color="#4f4f4f">${p.startTime }</font></span>
                        </div>
                    </div>
                    <p class="tags">
                        <span>${p.questType }</span>
                        <span>|</span>
                        <span><a href="">${p.equipTemplateName }</a></span>
                        <span><a href="">${p.taskTypeName }</a></span>
                    </p>                    <p class="info">
					<span>
						<a href="#"><i class="see"></i>${p.seeNum }</a>
						<a href="#"><i class="chat"></i>${p.answers }</a>
					</span>
                    <a href="#" class="del"></a>
                </p>
                    <div class="hidden-chose">
                        <img src="<%=basePath %>/front/public/images/qt_09.png">
                    </div>
                </div>
                </c:if>
                </c:forEach>
                </c:if>
            </div>
        </div>
        <!--分页-->
        <c:if test="${data.rows!='' }">
        <footer>
            <ul>
                <li>
	                <c:if test="${ data.pageNum > 1 }">         	
	                <a class="page-btn prev" href="javascript:to_page(${data.pageNum-1})"><i></i></a>  
	                </c:if>  
	                <c:if test="${ data.pageNum <= 1 }">         	
	                <a class="page-btn prev" href="javascript:void(0)"><i></i></a>  
	                </c:if>
                </li>
                <c:forEach begin="1" end="${data.pageCount }" step="1" var="i">
	            <c:if test="${i==data.pageNum }">
	            	<li>
	            	<a class="active" href="javascript:to_page(${i })">${i }</a>
	            	</li>
	            </c:if>
	            <c:if test="${data.pageNum!=i }">
		            <li>
		                <a href="javascript:to_page(${i })">${i }</a>
		            </li>
	            </c:if>
	        	</c:forEach>
	        	<li>     
	            	<c:if test="${data.pageNum < data.pageCount }">           
	                <a class="page-btn next" href="javascript:to_page(${data.pageNum+1})"><i></i></a> 
	                </c:if> 
	                <c:if test="${data.pageNum >= data.pageCount }">         	
	                <a class="page-btn next" href="javascript:void(0)"><i></i></a>  
	                </c:if>              
            	</li>
            	<li>
                <select name="rows" id="pageSize2" onchange="to_page()">
                	<c:if test="${data.pageSize==10}">
		                <option value="10" selected>10条/页</option>
						<option value="20">20条/页</option>
						<option value="30">30条/页</option>               	
                	</c:if>
                	<c:if test="${data.pageSize==20}">
		                <option value="10">10条/页</option>
						<option value="20" selected>20条/页</option>
						<option value="30">30条/页</option>               	
                	</c:if>
                	<c:if test="${data.pageSize==30}">
		                <option value="10">10条/页</option>
						<option value="20">20条/页</option>
						<option value="30" selected>30条/页</option>               	
                	</c:if>
                </select>
            	</li>
            	<li>跳至
                <input type="text" name="page" value="${data.pageNum }" id="page">页</li>
	            <li>
	                <a class="page-jump" href="javascript:to_page2(${data.pageCount })">跳转</a>
	            </li>
            </ul>
        </footer>
        </c:if>
        <c:if test="${data.rows=='' }">
           	<br>
         	<center style='color:red;font-size:16px'>未查到相关数据</center>
         	<br>
	     </c:if>
        </form>
    </div>
    <!--遮罩-->
    <div class="shade"></div>
    <!--新建-->
    <div class="new-task popup">
        <div class="title">
            <p>新建</p>
            <a class="close-popup">
                <i class=" close-icon"></i>
            </a>
        </div>
        <div class="content">
            <form class="new-form" method="post">
                <div class="edit-container">
                    <div class="content-item">
                        <label for="">*问题类型:</label>
                        <select name="questType" class="easyui-validatebox" data-options="required:true,validType:'selectValueRequired'">
                            <option value="0">请选择问题类型</option>
                            <option value="1">说明类</option>
                           	<option value="2">故障类</option>   
                           	<option value="3">异常类</option>  
                           	<option value="4">技术类</option> 
                        </select>
                    </div>
                    <div class="content-item">
                        <label for="">*设备模板:</label>
                        <select name="equipTemplate.id" class="easyui-validatebox" data-options="required:true,validType:'selectValueRequired'">
                            <option value="0">请选择设备模板</option>
                            <c:forEach items="${equipTemps }" var="equit">
			                	<option value="${equit.id }">${equit.text }</option>
			                </c:forEach>
                        </select>
                    </div>
                    <div class="content-item">
                        <label for="">*任务类型:</label>
                        <select name="taskType.id" class="easyui-validatebox" data-options="required:true,validType:'selectValueRequired'">
                            <option value="0">请选择任务类型</option>
                            <c:forEach items="${taskTypes }" var="taskType">
			                	<option value="${taskType.id }">${taskType.text }</option>
			                </c:forEach>
                        </select>
                    </div>
                    <div class="content-item">
                        <label for="">*问题标题:</label>
                        <input name="title" type="text" id="title" class="easyui-validatebox" data-options="required:true" maxlength="100" placeholder="请输入标题">
                    </div>
                    <div class="row">
                    	<input type="hidden" name="content" id="content"/>
                        <span class="span-title">问题内容</span>
                        <div>
                           
                        </div>
                        <div class="upload">
                            <a >                                 
                            <input id="load" type="file" onchange="uploads(this.files)" multiple accept=" .rm,.rmvb,.wmv,.avi,.mp4"/>                         
                            <i></i>   
                            </a>
                         </div> 
                        <div id="equipment-editor">
                            
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit new-submit">
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
            <a class="delete-confirm">删除</a>
            <a class="infor-cancel">取消</a>
        </div>
    </div>
    <script src="<%=basePath %>/front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath %>/front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
    <script src="<%=basePath %>/front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath %>/front/public/js/laydate/laydate.js"></script>
    <script src="<%=basePath %>/front/public/js/wangEditor.min.js"></script>
    <script src="<%=basePath %>/front/public/js/common.js"></script>
    <script src="<%=basePath %>/front/public/js/knowledge.js"></script>
</body>

<script type="text/javascript">
	//分页
   	function to_page(page){
   		//var aa=$("#page").val();
		if(page){
			// JQ代码，获取到id为page文本框，给该文本框赋值
			$("#page").val(page);
		}
		document.getElementById("formId1").submit();
	}
	//跳转
	function to_page2(pageCount){
		var aa=$("#page").val();
		for(var i=1;i<=pageCount;i++){
			if(aa==i){
				document.getElementById("formId1").submit();
				return;
			}
		}
	}
</script>

</html>