<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>车辆配置</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/swiper-3.4.2.min.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/carConfigure.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
<div class="body-wrapper">
    <div class="search-wrapper">
        <select class="easyui-validatebox" type="text" id="topCarType">
        </select>
        <select class="easyui-validatebox" type="text" id="topCaretaker">
        </select>
        <select class="easyui-validatebox" type="text" id="topCarState">
        </select>
        <input type="text" placeholder="请输入车牌号" id="keyword">
        <div class="search-btn">搜索</div>
    </div>
    <div class="operation-wrapper">
        <div class="new-btn">
            <i></i>
            <span>新建</span>
        </div>
    </div>
    <div class="table-wrapper">
        <table class="easyui-datagrid" id="dg">
            <tbody>
            </tbody>
        </table>
    </div>
</div>
<div class="shade"></div>
<!--新建弹窗-->
<div class="popup newAdd-wrapper">
    <div class="title">
        <span>新建</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="newAdd-form" action="addCar" method="post" enctype="multipart/form-data">
            <div class="content-item">
                <label for="car-type">*车辆类型:</label>
                <select class="easyui-validatebox" type="text" data-options="validType:'selectValueRequired'" id="carType" name="carTypeId">
            	</select>
            </div>
            <div class="content-item">
                <label for="car-brand">*品牌:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true" placeholder="请输入品牌" maxlength="50" name="brand"/>
            </div>
            <div class="content-item">
                <label for="car-address">*型号:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true" placeholder="请输入型号" maxlength="50" name="model"/>
            </div>
            <div class="content-item">
                <label for="car-carNum">*车牌号:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true"  placeholder="请输入车牌号" maxlength="7" name="carNo"/>
            </div>
            <div class="content-item">
                <label for="car-picture">车辆照片:</label>
                <div class="inputFile car-picture">
                    <input type="file" name="carPic">
                    <span><i></i>上传文件</span>
                    <span>支持.jpg/.png/.JPEG</span>
                </div>
            </div>
            <div class="content-item">
                <label for="car-card">行驶证:</label>
                <div class="inputFile car-card">
                    <input type="file" class="" name="licencePic">
                    <span><i></i>上传文件</span>
                    <span>支持.jpg/.png/.JPEG</span>
                </div>
            </div>
            <div class="content-item">
                <label for="car-seat">*坐席:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'numInt'" placeholder="请输入坐席数" maxlength="4" name="seat"/>
            </div>
            <div class="content-item">
                <label for="station-people">*责任人:</label>
                <select class="easyui-validatebox" type="text" data-options="validType:'selectValueRequired'" id="caretaker" name="personId">
            	</select>
            </div>
            <div class="content-item">
                <label for="car-far">*首保公里数:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="请输入首保公里数(KM)" maxlength="10" name="firstInsurance"/>
            </div>
            <div class="content-item">
                <label for="car-far1">*初始公里数:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="请输入初始公里数(KM)" maxlength="10" name="initKmNum" />
            </div>
            <div class="content-item">
                <label for="car-cycle">*后期保养周期:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="请输入保养周期公里数(KM)" maxlength="10" name="maintainCycle"/>
            </div>
        </form>
    </div>
    <div class="footer">
        <div class="submit newAdd-submit">提交</div>
    </div>
</div>
<!--编辑弹窗-->
<div class="popup edit-wrapper">
    <div class="title">
        <span>编辑</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="edit-form" action="updateCar" method="post" enctype="multipart/form-data">
            <div class="content-item">
                <label for="car-type">*车辆类型:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="ecarType" name="carTypeId">
                </select>
            </div>
            <div class="content-item">
                <label for="car-type">*车辆状态:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="ecarState" name="carStateId">
                </select>
            </div>
            <div class="content-item">
                <label for="car-brand">*品牌:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true" placeholder="请输入品牌" maxlength="50" id="ebrand" name="brand"/>
            </div>
            <div class="content-item">
                <label for="car-address">*型号:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true" placeholder="请输入型号" maxlength="50" id="emodel" name="model"/>
            </div>
            <div class="content-item">
                <label for="car-carNum">*车牌号:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true"  placeholder="请输入车牌号" maxlength="7" id="ecarNo" name="carNo"/>
            </div>
             <div class="content-item">
                <label for="car-picture">车辆原照片:</label>
                <a class="edit-picture">
                    <i></i>原照片
                    <div>
                        <img src="" alt="加载失败">
                    </div>
                </a>
            </div>
            <div class="content-item">
                <label for="car-picture">车辆照片:</label>
                <div class="inputFile car-picture">
                    <input type="file" name="carPic">
                    <span><i></i>上传新文件</span>
                    <span>支持.jpg/.png/.JPEG</span>
                </div>
            </div>
            <div class="content-item">
                <label for="car-picture">原行驶证:</label>
                <a class="edit-driveCard">
                    <i></i>原行驶证
                    <div>
                        <img src="" alt="加载失败">
                    </div>
                </a>
            </div>
            <div class="content-item">
                <label for="car-card">行驶证:</label>
                <div class="inputFile car-card">
                    <input type="file"  class="" name="licencePic">
                    <span><i></i>上传新文件</span>
                    <span>支持.jpg/.png/.JPEG</span>
                </div>
            </div>
            <div class="content-item">
                <label for="car-seat">*坐席:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'numInt'" placeholder="请输入坐席数" maxlength="4" id="eseat" name="seat"/>
            </div>
            <div class="content-item">
                <label for="station-people">*责任人:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="eperson" name="personId">
                </select>
            </div>
            <div class="content-item">
                <label for="car-far">*首保公里数:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="请输入首保公里数(KM)" maxlength="10" id="efirstInsurance" name="firstInsurance"/>
            </div>
            <div class="content-item">
                <label for="car-far1">*初始公里数:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="请输入首保公里数(KM)" maxlength="10" id="einitKmNum" name="initKmNum"/>
            </div>
            <div class="content-item">
                <label for="car-cycle">*后期保养周期:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="请输入保养周期公里数(KM)" maxlength="10" id="emaintainCycle" name="maintainCycle"/>
            </div>
            <input type="hidden" value="" name="id" id="carId">
        </form>
    </div>
    <div class="footer">
        <div class="submit edit-submit">提交</div>
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
<script src="<%=basePath %>/front/public/js/swiper-3.4.2.min.js"></script>
<script src="<%=basePath %>/front/public/js/common.js"></script>
<script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
<script src="<%=basePath %>/front/public/js/carConfigure.js"></script>
</body>
</html>