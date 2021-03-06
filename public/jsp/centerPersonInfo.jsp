<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
    <title>个人中心/个人信息</title>
    <link rel="stylesheet" href="<%=basePath%>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/personInformation.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
<div class="body-wrapper">
    <div class="person-information">
        <div>
            <div class="headImg">
                <img id="avatar" src="<%=basePath%>front/public/images/grzxAvatar.png" alt="">
            </div>
            <span class="person-modify"><i></i>修改资料</span>
        </div>
        <div>
            <p><span id="nameShow"></span><i></i><i></i></p>
            <div class="item">
                <p><span><i class="icon"></i></span>角色: <span id="roleNameShow"></span></p>
                <p><span><i class="icon"></i></span>身份证号: <span id="idCardShow"></span></p>
            </div>
            <div class="item">
                <p><span><i class="icon"></i></span>电话:  <span id="telephoneShow"></span></p>
                <p><span><i class="icon"></i></span>办公室电话: <span id="workphoneShow"></span></p>
            </div>
            <div class="item">
                <p><span><i class="icon"></i></span>邮箱:  <span id="emailShow" title="邮箱"></span></p>
                <p><span><i class="icon"></i></span>家庭住址: <span id="addressShow" title="家庭地址"></span></p>
            </div>
        </div>
    </div>
    <div class="person-statistics">
        <div class="work-time">
            <div class="title">
                <span>工时统计</span>
                <select id="workTime1" class="data">
                    <option value="0">年</option>
                    <option value="1">季度</option>
                    <option value="2">月</option>
                </select>
                <input type="text" class="data-year data-show chose-time" placeholder="请选择年份">
                <select id="workTime2" class="data-quarter">
                    <option value="0">第一季度</option>
                    <option value="1">第二季度</option>
                    <option value="2">第三季度</option>
                    <option value="3">第四季度</option>
                </select>
                <input type="text" class="data-month chose-time" placeholder="请选择月份">
                <div class="time-btn btn">搜索</div>
            </div>
            <div>
                <div id="echart1"></div>
                <ul>
                    <li><p>总工时: </p><span class="time-all">2016</span> <a>h</a></li>
                    <li><p>加班时间:</p> <span class="time-stay">1936</span> <a>h</a></li>
                    <li><p>请假时间: </p><span class="time-leave">80</span> <a>h</a></li>
                </ul>
            </div>
        </div>
        <div class="work-order">
            <div class="title">
                <span>工单统计</span>
                <select class="data">
                    <option value="0">年</option>
                    <option value="1">季度</option>
                    <option value="2">月</option>
                </select>
                <input type="text" class="data-year data-show chose-time" placeholder="请选择年份">
                <select class="data-quarter">
                    <option value="0">第一季度</option>
                    <option value="1">第二季度</option>
                    <option value="2">第三季度</option>
                    <option value="3">第四季度</option>
                </select>
                <input type="text" class="data-month chose-time" placeholder="请选择月份">
                <div class="order-btn btn">搜索</div>
            </div>
            <ul>
                <li>
                    <i></i>
                    <p>完成工单数量</p>
                    <p class="order-num">1152</p>
                </li>
                <li>
                    <i></i>
                    <p>任务数量</p>
                    <p class="task-num">2021</p>
                </li>
                <li>
                    <i></i>
                    <p>任务效率</p>
                    <p class="task-efficiency">100%</p>
                </li>
            </ul>
        </div>
    </div>
    <div class="work-efficiency">
        <div class="title">
            <span>效率统计</span>
            <select class="data">
                <option value="0">年</option>
                <option value="1">季度</option>
                <option value="2">月</option>
            </select>
            <input type="text" class="data-year data-show chose-time" placeholder="请选择年份">
            <select class="data-quarter">
                 <option value="0">第一季度</option>
                 <option value="1">第二季度</option>
                 <option value="2">第三季度</option>
                 <option value="3">第四季度</option>
            </select>
            <input type="text" class="data-month chose-time" placeholder="请选择月份">
            <div class="efficiency-btn btn">搜索</div>
        </div>
        <div id="echart2"></div>
    </div>
</div>
<div class="shade"></div>
<div class="popup information-wrapper">
    <div class="title">
        <span>修改资料</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form action="updatePerson" class="information-form" method="post" enctype="multipart/form-data">
            <div class="content-item">
                <label for="station-name">*电话:</label>
                <input name="telephone" class="easyui-validatebox" type="text" data-options="required:true,validType:'mobile'"  maxlength="11" value="" />
            </div>
            <div class="content-item">
                <label for="station-name">*办公室电话:</label>
                <input name="workphone" class="easyui-validatebox" type="text" data-options="required:true,validType:'phone'"  maxlength="20" value=""/>
            </div>
            <div class="content-item">
                <label for="station-name">*邮箱:</label>
                <input name="email" class="easyui-validatebox" type="text" data-options="required:true,validType:'email' "  maxlength="20" value="" />
            </div>
            <div class="content-item">
                <label for="station-name">*家庭住址:</label>
                <input name="address" class="easyui-validatebox" type="text" data-options="required:true,"  maxlength="100" value="" />
            </div>
            <div class="content-item">
                <label for="station-picture">头像:</label>
                <div class="inputFile head-picture">
                    <input name="image" type="file" multiple="multiple">
                    <span><i></i>上传文件</span>
                    <span>支持.jpg/.png/.JPEG</span>
                </div>
            </div>
        </form>
    </div>
    <div class="footer">
        <div class="submit information-submit">提交</div>
    </div>
    <input id="personId" type="hidden" value="${sessionScope.personId}">
</div>
<script src="<%=basePath%>front/public/js/jquery-3.2.1.min.js"></script>
<script src="<%=basePath%>front/public/js/jquery.easyui.min.js"></script>
<script src="<%=basePath%>front/public/js/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath%>front/public/js/laydate/laydate.js"></script>
<script src="<%=basePath%>front/public/js/common.js"></script>
<script src="<%=basePath%>front/public/js/echarts.js"></script>
<script src="<%=basePath%>front/public/js/customPrompt.js"></script>
<script src="<%=basePath%>front/public/js/personInformation.js"></script>
<!--<script src="../js/refresh.js"></script> -->
</body>
</html>