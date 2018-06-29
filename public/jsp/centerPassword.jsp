<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>个人中心/修改密码</title>
    <link rel="stylesheet" href="<%=basePath%>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/personPassword.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
    <div class="body-wrapper">
        <form class="password-form" method="post">
            <div>
                <label for="旧密码">旧密码:</label>
                <input id="oldPass" class="easyui-validatebox" type="password" data-options="required:true" validType= 'length[6,20]' placeholder="原有密码" maxlength="12" />
            </div>
            <div>
                <label for="新密码">新密码:</label>
                <input  class="easyui-validatebox" id="password" type="password" data-options="required:true" validType= 'length[6,20]' placeholder="新密码" maxlength="12" />
            </div>
            <div>
                <label for="新密码">确认密码:</label>
                <input  class="easyui-validatebox" id="newPassword" type="password" data-options="required:true" validType= "same['password']" placeholder="确认新密码" maxlength="12" />
            </div>
            <div class="submit">确认修改</div>
        </form>
    </div>
    <script src="<%=basePath%>front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath%>front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath%>front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath%>front/public/js/common.js"></script>
    <script src="<%=basePath%>front/public/js/customPrompt.js"></script>
    <!--<script src="../js/refresh.js"></script> -->
    <script src="<%=basePath%>front/public/js/personPassword.js"></script>
</body>
</html>
