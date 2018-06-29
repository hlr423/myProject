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
    <title>车辆管理/历史记录</title>
    <link rel="stylesheet" href="<%=basePath%>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>/front/public/css/carHistory.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>

<div class="body-wrapper">
    <div class="search-wrapper">
        <select name="" id="carType">
            <option value="0">全部类型</option>
            <c:forEach items="${carTypes}" var="carType">
            <option value="${carType.id}">${carType.name}</option>
            </c:forEach>
        </select>
        <input type="text" id="carNo" placeholder="搜索车牌号">
        <div class="search-btn">搜索</div>
    </div>
    <div class="table-wrapper">
        <div class="export"><i></i>导出</div>
        <div id="tab" class="easyui-tabs">
            <div title="维修记录" class="table-carRepair">
                <table class="easyui-datagrid" id="carRepair">
                    <!-- <tbody>
                    <tr>
                        <td>通勤车</td>
                        <td>川A76567</td>
                        <td>故障描述</td>
                        <td>张江龙</td>
                        <td>2017-12-54 12:54:10</td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody> -->
                </table>
            </div>
            <div title="出还车记录" class="table-carOut">
                <table class="easyui-datagrid" id="carOut">
                    <!-- <tbody>
                    <tr>
                        <td>运维</td>
                        <td>通勤车</td>
                        <td>川A76567</td>
                        <td>张江龙</td>
                        <td></td>
                        <td>1256445552</td>
                        <td></td>
                        <td>2017-12-54 12:54:10</td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody> -->
                </table>
            </div>
        </div>
    </div>
</div>
<div class="shade"></div>
<!--出车记录弹窗-->
<div class="popup out-wrapper">
    <div class="title">
        <span>出车记录</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <div class="item">
            <span>领取人</span>
            <span id="personName"></span>
        </div>
        <div class="item">
            <span>出车时间</span>
            <span id="outTime"></span>
        </div>
        <div class="item">
            <span>出车公里数</span>
            <span id="outKm"></span>
        </div>
    </div>
</div>
<!--还车记录弹窗-->
<div class="popup back-wrapper">
    <div class="title">
        <span>还车记录</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <div class="back-detail">
            <div class="item">
                <span>领取人</span>
                <span class="backPerson">张三三</span>
            </div>
            <div class="item">
                <span>还车时间</span>
                <span class="backTime">2017-12-20 12;54:23</span>
            </div>
            <div class="item">
                <span>还车公里数</span>
                <span class="backKm">15664</span>
            </div>
        </div>
        <div class="back-cost">
            <!-- <div class="cost-item">
                <span>费用类型</span>
                <span>金额</span>
                <span>发票照片</span>
            </div>
            <div class="cost-item">
                <span>油费</span>
                <span>￥100.00<span>/100升</span></span>
                <span class="cost-img">
                    <i></i>
                    <div>
                        <img src="../images/twoCode.png" alt="">
                    </div>
                </span>
            </div>
            <div class="cost-item">
                <span>停车费</span>
                <span>￥100.00</span>
                <span class="cost-img">
                    <i></i>
                </span>
            </div> -->
        </div>
    </div>
</div>
<!--图片弹窗-->
<div class="popup picture-wrapper">
    <div class="title">
        <span>发票</span>
        <a class="close-popup">
            <i class="return-icon"></i>
        </a>
    </div>
    <div class="content">
        <img src="<%=basePath%>/front/public/images/G5654.png" alt="">
    </div>
</div>
<script src="<%=basePath %>/front/public/js/jquery-3.2.1.min.js"></script>
<script src="<%=basePath %>/front/public/js/jquery.easyui.min.js"></script>
<script src="<%=basePath %>/front/public/js/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath %>/front/public/js/common.js"></script>
<script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
<script src="<%=basePath %>/front/public/js/carHistory.js"></script>
</body>
</html>
