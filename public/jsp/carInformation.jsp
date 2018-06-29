<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>车辆管理/信息</title>
    <link rel="stylesheet" href="<%=basePath%>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>/front/public/css/carInformation.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>

<div class="body-wrapper">
    <div class="search-wrapper">
        <select name="" id="carType">
            <option value="0">全部类型</option>
            <option value="1">类型1</option>
            <option value="2">类型2</option>
        </select>
        <input type="text" placeholder="请输入车牌号" id="keyword">
        <div class="search-btn">搜索</div>
    </div>
    <div class="car-information table-wrapper">
        <!-- js动态加载 -->
    </div>
</div>
<div class="shade"></div>
<script src="<%=basePath%>/front/public/js/jquery-3.2.1.min.js"></script>
<script src="<%=basePath%>/front/public/js/jquery.easyui.min.js"></script>
<script src="<%=basePath%>/front/public/js/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath%>/front/public/js/common.js"></script>
<script src="<%=basePath%>/front/public/js/customPrompt.js"></script>
<script src="<%=basePath%>/front/public/js/carInformation.js"></script>
</body>
</html>