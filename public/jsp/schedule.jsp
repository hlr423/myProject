<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>排班信息</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/schedule.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
            <select name="" id="areaId">
            	<c:forEach var="area" items="${areas}">
               	 	<option value="${area.id }">${area.name }</option>
            	</c:forEach>
            </select>
            <input type="text" placeholder="请选择开始时间" id="startTime" class="chose-time"> -
            <input type="text" placeholder="请选择结束时间" id="endTime" class="chose-time">
            <div class="search-btn">查询</div>
        </div>
        <div class="operation-wrapper">
            <div class="export-btn">
                <i></i>
                <span>导出</span>
            </div>
        </div>
        <div class="table-wrapper">
            <table class="easyui-datagrid" id="dg">
                <tbody>
                    <tr>
                        <td>2017-09-02</td>
                        <td>早班</td>
                        <td>9:00-20:00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="shade"></div>
    <!-- 值班、预备框 -->
    <div class="popup schedule-popup">
        <div class="title">
            <span id="state">预备</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <table class="easyui-datagrid" id="yb">
                <tbody>
                    <tr>
                        <td>张三</td>
                        <td>值班人员</td>
                        <td>13111111111</td>
                    </tr>
                    <tr>
                            <td>张三</td>
                            <td>值班人员</td>
                            <td>13111111111</td>
                        </tr>
                        <tr>
                                <td>张三</td>
                                <td>值班人员</td>
                                <td>13111111111</td>
                            </tr>
                </tbody>
            </table>
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
    <script src="<%=basePath %>/front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath %>/front/public/js/laydate/laydate.js"></script>
    <script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
    <!-- <script src="<%=basePath %>/front/public/js/refresh.js"></script> -->
    <script src="<%=basePath %>/front/public/js/schedule.js"></script>
</body>

</html>
