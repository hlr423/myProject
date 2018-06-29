<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>车辆管理/信息详情</title>
    <link rel="stylesheet" href="<%=basePath%>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>/front/public/css/carInformationDetail.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>

<div class="body-wrapper">
    <div class="car-list">
        < <a class="back-list">返回列表</a>
    </div>
    <div class="car-data">
        <div class="list">
            <div class="title">
                <i></i>
                <div>
                    <p id="carNo">川A·g5654</p>
                    <span id="carType">通勤车</span>
                </div>
            </div>
            <div class="content">
                <table id="tab1">
                    <tr>
                        <td>车辆类型</td>
                        <td>通勤车</td>
                    </tr>
                    <tr>
                        <td>车牌号</td>
                        <td>川AG5654</td>
                    </tr>
                    <tr>
                        <td>品牌</td>
                        <td>大众</td>
                    </tr>
                    <tr>
                        <td>型号</td>
                        <td>V8</td>
                    </tr>
                    <tr>
                        <td>核载人数</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>责任人</td>
                        <td>张江龙</td>
                    </tr>
                    <tr>
                        <td>行驶证</td>
                        <td class="car-card">[查看]</td>
                    </tr>
                    <tr>
                        <td>出车次数</td>
                        <td>13</td>
                    </tr>
                    <tr>
                        <td>当前公里数</td>
                        <td>15642</td>
                    </tr>
                    <tr>
                        <td>累计公里数</td>
                        <td>9999</td>
                    </tr>
                </table>
                <table id="tab2">
                    <tr>
                        <td>平均油耗</td>
                        <td>100L/百公里</td>
                    </tr>
                    <tr>
                        <td>平均油费</td>
                        <td>￥0.6/KM</td>
                    </tr>
                    <tr>
                        <td>累计费用</td>
                        <td>￥2564.12</td>
                    </tr>
                    <tr>
                        <td>加油费用</td>
                        <td>￥200.00</td>
                    </tr>
                    <tr>
                        <td>维修费用</td>
                        <td>￥200.00</td>
                    </tr>
                    <tr>
                        <td>维修申请</td>
                        <td class="car-repair">[执行]</td>
                    </tr>
                </table>
                <div>
                    <div>
                        <img id="qrcode" src="<%=basePath%>/front/public/images/twoCode.png" alt="">
                    </div>
                    <p>车辆二维码</p>
                </div>
            </div>
        </div>
        <div class="img">
            <i></i>
            <img id="carPic" src="<%=basePath%>/front/public/images/G5654.png" alt="">
        </div>
    </div>

    <div class="car-tab">
        <div class="export"><i></i>导出</div>
        <div id="tab" class="easyui-tabs">
            <div title="加油记录" class="table-carOil" >
                <table class="easyui-datagrid" id="carOil" >
                	<!-- js动态加载 -->
                </table>
            </div>
            <div title="保养记录" class="table-carKeep">
                <table class="easyui-datagrid" id="carKeep" >
                    <!-- js动态加载 -->
                </table>
            </div>
            <div title="维修记录" class="table-carRepair">
                <table class="easyui-datagrid" id="carRepair" >
                	<!-- js动态加载 -->
                </table>
            </div>
            <div title="生命周期" class="table-carLife">
                <select name="" id="type">
                    <option value="0">全部类型</option>
                    <option value="1">出车</option>
                    <option value="2">还车</option>
                    <option value="3">保养</option>
                    <option value="4">维修</option>
                </select>
                <table class="easyui-datagrid" id="carLife" >
                    <tbody>
                    <tr>
                        <td>出车</td>
                        <td>张江龙</td>
                        <td>2017-12-11 12:21.08</td>
                        <td></td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<div class="shade"></div>
<!--图片弹窗-->
<div class="popup picture-wrapper">
    <div class="title">
        <span>行驶证</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <img src="<%=basePath%>/front/public/images/G5654.png" alt="" id="img">
    </div>
</div>
<!-- 维修申请弹窗 -->
<div class="popup car-repair-popup">
    <div class="title">
        <span>维修申请</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
    	<span style="font-size: 5px">维修原因：</span>
        <textarea></textarea>
    </div>
    <div class="footer">
        <div class="submit car-repair-submit">提交</div>
    </div>
</div>
<script src="<%=basePath%>/front/public/js/jquery-3.2.1.min.js"></script>
<script src="<%=basePath%>/front/public/js/jquery.easyui.min.js"></script>
<script src="<%=basePath%>/front/public/js/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath%>/front/public/js/common.js"></script>
<script src="<%=basePath%>/front/public/js/customPrompt.js"></script>
<script src="<%=basePath%>/front/public/js/carInformationDetail.js"></script>
</body>
</html>