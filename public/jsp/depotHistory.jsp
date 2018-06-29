<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>仓库管理/历史记录</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/depotHistory.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>

<div class="body-wrapper">
    <!-- <div class="export"><i></i>导出</div> -->
    <div id="tab" class="easyui-tabs">
        <div title="入库信息">
            <div class="content-title">
                <div class="depot-data">
                    <input type="text" class="into-data-start chose-time" placeholder="开始时间" id="inOrderStartTime">
                    <input type="text" class="into-data-end chose-time" placeholder="结束时间" id="inOrderEndTime">
                </div>
                <div class="search-wrapper">
                    <input type="text" placeholder="搜索入库单号" maxlength="50" id="inOrderOn">
                    <div class="search-btn" onclick="inOrderSearchFun()">搜索</div>
                </div>
            </div>
            <div class="table-depotInto">
                <table class="easyui-datagrid" id="depotInto">
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        <div title="出库信息">
	        <div class="content-title">
	            <div class="depot-data">
	                <input type="text" class="out-data-start chose-time" placeholder="开始时间" id="outOrderStartTime">
	                <input type="text" class="out-data-end chose-time" placeholder="结束时间" id="outOrderEndTime">
	            </div>
	            <div class="search-wrapper">
	                <input type="text" placeholder="搜索出库单号" maxlength="50" id="outOrderOn">
	                <div class="search-btn" onclick="outOrderSearchFun()">搜索</div>
	            </div>
	        </div>
	        <div class="table-depotOut">
	            <table class="easyui-datagrid" id="depotOut">
	                <tbody>
	                </tbody>
	            </table>
	        </div>
    	</div>
        <div title="维修信息">
            <div class="content-title">
                <select name="" id="repair-type">
                    <option value="0">所有类型</option>
                    <c:forEach items="${repairTypes}" var="type">
                    <option value="${type.id }">${type.name }</option>
                    </c:forEach>
                </select>
                <div class="depot-data">
                    <input type="text" id="repair-startTime" class="repair-data-start chose-time" placeholder="开始时间">
                    <input type="text" id="repair-endTime" class="repair-data-end chose-time" placeholder="结束时间">
                </div>
                <div class="search-wrapper">
                	<input type="text" placeholder="搜索维修单号" maxlength="50" id="repairSno">
                    <div class="search-btn" id="repair-search">搜索</div>
                </div>
            </div>
            <div class="table-depotRepair">
                <table class="easyui-datagrid" id="depotRepair">
                </table>
            </div>
        </div>
        <div title="盘点信息">
            <div class="content-title">
                <div class="depot-data">
                    <input type="text" class="inventory-data-start chose-time" placeholder="开始时间" id="startTime4">
                    <input type="text" class="inventory-data-end chose-time" placeholder="结束时间" id="endTime4">
                </div>
                <div class="search-wrapper">
                    <div class="search-btn serach4">搜索</div>
                </div>
            </div>
            <div class="table-depotRepair">
                <table class="easyui-datagrid" id="depotInventory">
                </table>
            </div>
        </div>
        <div title="历史信息">
            <div class="content-title">
                <select id="deport">
                   	<option value="0">所有仓库</option>
                    <c:forEach items="${deports}" var="deport">
                    <option value="${deport.id }">${deport.name }</option>
                    </c:forEach>
                </select>
               	<div class="depot-data">
                    <input type="text" id="startTime5" class="repair-data-start chose-time" placeholder="开始时间">
                    <input type="text" id="endTime5" class="repair-data-end chose-time" placeholder="结束时间">
                </div>
                <div class="search-wrapper">
                    <div class="search-btn search5">搜索</div>
                </div>
            </div>
            <div class="time-chart">
            	<!-- js动态加载 -->
            </div>
            <div class="table-depotHistory">
                <table class="easyui-datagrid" id="depotHistory">
                    <tbody>
                    	<!-- easyUI动态加载 -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<div class="shade"></div>
<!--入库详情弹窗-->
<div class="popup into-detail-wrapper">
    <div class="title">
        <span>入库详情</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="into-detail-form" method="post">
            <table class="datagrid" id="into-detail-table">
                <tbody>
                </tbody>
            </table>
        </form>
    </div>
</div>
<!--出库详情弹窗-->
<div class="popup out-detail-wrapper">
    <div class="title">
        <span>出库详情</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="out-detail-form" method="post">
            <table class="datagrid" id="out-detail-table">
                <tbody>
                </tbody>
            </table>
        </form>
    </div>
</div>
<!--故障维修详情弹窗-->
<div class="popup repair-detail-wrapper">
    <div class="title">
        <span>故障维修-出库详情</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="repair-detail-form" method="post">
            <table class="datagrid" id="repair-detail-table">
            </table>
        </form>
    </div>
</div>
<!--盘点详情弹窗-->
<div class="popup inventory-detail-wrapper">
    <div class="title">
        <span>盘点信息</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="inventory-detail-form" method="post">
            <table class="datagrid" id="inventory-detail-table">
            </table>
        </form>
    </div>
</div>
<!--盘点丢失弹窗-->
<div class="popup inventory-lost-wrapper">
    <div class="title">
        <span>丢失</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="inventory-lost-form" method="post">
            <table class="datagrid" id="inventory-lost-table">
            </table>
        </form>
    </div>
    <!-- <div class="footer">
        <div class="submit inventory-lost-submit">提交</div>
    </div> -->
</div>
<!--盘点丢失扫码弹窗-->
<div class="popup inventory-scan-wrapper">
    <div class="title">
        <span>补领</span>
        <a class="close-popup">
            <i class="return-icon"></i>
        </a>
    </div>
    <div class="content">
        <div class="scan">
            <img src="../images/depot.png" alt="">
            <div>
                <p>请用扫码枪扫描该物质的二维码!或</p>
                <input id="qrcode" type="text" class="easyui-validatebox" data-options="validType:'englishNumber',required:true" maxlength="30" placeholder="请手动输入二维码编码">
            </div>
        </div>
    </div>
</div>
<!--盘点丢失入库成功弹窗-->
<div class="popup success-wrapper lost-success-wrapper">
    <div class="content content-success">
        <i></i>
        <span>提交成功！5s后自动关闭</span>
    </div>
    <div class="footer">
        <div class="submit btn-look">查看盘点信息</div>
        <div class="submit btn-return">返回丢失详情</div>
    </div>
</div>
<script src="<%=basePath %>/front/public/js/jquery-3.2.1.min.js"></script>
<script src="<%=basePath %>/front/public/js/jquery.easyui.min.js"></script>
<script src="<%=basePath %>/front/public/js/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath %>/front/public/js/laydate/laydate.js"></script>
<script src="<%=basePath %>/front/public/js/common.js"></script>
<script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
<script src="<%=basePath %>/front/public/js/depotHistory.js"></script>
</body>
</html>