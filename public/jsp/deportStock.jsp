<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>仓库管理/信息</title>
    <link rel="stylesheet" href="<%=basePath%>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>/front/public/css/depotInformation.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
<div class="body-wrapper">
    <div class="search-wrapper">
        <select name="" id="deport">
        </select>
        <input type="text" placeholder="请输入模板名称" id="keyword">
        <div class="search-btn">搜索</div>
    </div>
    <div class="table-wrapper">
        <table class="easyui-datagrid" id="dg">
            <!-- js动态加载 -->
        </table>
    </div>
</div>
<div class="shade"></div>
<!--详情弹窗-->
<div class="popup detail-wrapper">
    <div class="title">
        <span>库存详情</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <table class="easyui-datagrid" id="detail-table">
        	<!-- js动态加载 -->
        </table>
    </div>
</div>
<script src="<%=basePath%>/front/public/js/jquery-3.2.1.min.js"></script>
<script src="<%=basePath%>/front/public/js/jquery.easyui.min.js"></script>
<script src="<%=basePath%>/front/public/js/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath%>/front/public/js/common.js"></script>
<script src="<%=basePath%>/front/public/js/customPrompt.js"></script>
<script src="<%=basePath%>/front/public/js/depotInformation.js"></script>
</body>
</html>