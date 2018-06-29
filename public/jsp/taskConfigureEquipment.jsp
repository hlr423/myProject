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
    <title>任务配置/设备、部件</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/select2.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/taskConfigureEquipment.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
<div class="body-wrapper">
    <div class="search-wrapper">
        <select class="easyui-validatebox" type="text" id="level">
        	<option value="0">请选择分属类型</option>
        	<option value="1">设备</option>
        	<option value="2">部件</option>
        </select>
        <select class="easyui-validatebox" type="text" id="topTaskType">
        	<option value="0">请选择任务类型</option>
            <c:forEach var="taskType" items="${taskTypes}">
	        	<option value="${taskType.id}">${taskType.name}</option>
	       	</c:forEach>
        </select>
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
				<!-- js动态加载 -->
            </tbody>
        </table>
    </div>
</div>
<div class="shade"></div>
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
<!--新建弹窗-->
<div class="popup newAdd-wrapper">
    <div class="title">
        <span>新建</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <div>
            <div class="new-equipment">
                <i></i>
            </div>
            <span>设备任务</span>
        </div>
        <div>
            <div class="new-part"><i></i></div>
            <span>部件任务</span>
        </div>
    </div>
</div>
<!--新建设备任务弹窗-->
<div class="popup newEquipment-wrapper">
    <div class="title">
        <span>设备任务配置</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="equipment-form" method="post" action="addEquipTask" enctype="multipart/form-data">
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span>1</span></span>
                        基础信息
                    </div>
                    <div class="line"></div>
                    <div>
                        <span><span>2</span></span>
                        设备模板
                    </div>
                    <div class="line"></div>
                    <div>
                        <span><span>3</span></span>
                        所需备件
                    </div>
                    <div class="line"></div>
                    <div>
                        <span><span>4</span></span>
                        操作说明
                    </div>
                </div>
                <div class="content-item">
                    <label for="task-type">*任务类型:</label>
                    <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="taskType">
                        <option value="0">请选择任务类型</option>
			            <c:forEach var="taskType" items="${taskTypes}">
				        	<option value="${taskType.id}">${taskType.name}</option>
				       	</c:forEach>
                    </select>
                </div>
                <div class="content-item">
                    <label for="task-type">*周期单位:</label>
                    <select id="unitId">
                        <option value="1">天</option>
                        <option value="2">小时</option>
                    </select>
                </div>
                <div class="content-item">
                    <label for="task-type">*任务周期:</label>
                    <input type="text"class="easyui-validatebox" data-options="required:true,validType:'positiveSupfour'" placeholder="请输入任务周期" maxlength="6" id="cycle">
                </div>
                <div class="content-item">
                    <label for="task-time">*所需时长:</label>
                    <input class="easyui-validatebox" value="1" type="text" data-options="required:true,validType:'positiveSupfour'" placeholder="请输入时长(小时)" maxlength="6" id="howLong"/>
                </div>
                <div class="content-item">
                    <label for="task-isCycle">*周期内完成:</label>
                    <div class="content-radio">
                        <span>
                        <a class="radio-wrapper radio-checked">
                        <i></i>
                        <input type="radio" name="isCycle" checked="checked" value="1">
                        </a>是
                    </span>
                        <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isCycle" value="0">
                        </a>否
                    </span>
                    </div>
                </div>
                <div class="content-item">
                    <label for="task-isPhoto">*拍照:</label>
                    <div class="content-radio">
                        <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="photo" value="1">
                        </a>是
                    </span>
                        <span>
                        <a class="radio-wrapper radio-checked">
                        <i></i>
                        <input type="radio" name="photo" checked="checked" value="0">
                        </a>否
                    </span>
                    </div>
                </div>
                <div class="content-item">
                    <label for="task-isTest">*强检:</label>
                    <div class="content-radio">
                        <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isTest" value="1">
                        </a>是
                    </span>
                        <span>
                        <a class="radio-wrapper radio-checked">
                        <i></i>
                        <input type="radio" name="isTest" checked="checked" value="0">
                        </a>否
                    </span>
                    </div>
                </div>
                <div class="content-item">
                    <label for="task-work">*所需工种:</label>
                </div>
                <div class="content-item">
                    <label for="task-work">*机修:</label>
                    <input class="easyui-validatebox equipment-input"  type="text" data-options="required:false,validType:'numInt'" placeholder="请输入人数" maxlength="6" id="wt1"/>
                </div>
                <div class="content-item">
                    <label for="task-work">*电工:</label>
                    <input class="easyui-validatebox equipment-input" type="text" data-options="required:false,validType:'numInt'" placeholder="请输入人数" maxlength="6" id="wt2"/>
                </div>
                <div class="content-item">
                    <label for="task-work">*运行:</label>
                    <input class="easyui-validatebox equipment-input" type="text" data-options="required:false,validType:'numInt'" placeholder="请输入人数" maxlength="6" id="wt3"/>
                </div>
                <div class="content-item">
                    <label for="task-car">*所需车辆:</label>
                    <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="carType">
                        <option value="0">请选择车辆类型</option>
			            <c:forEach var="carType" items="${carTypes}">
				        	<option value="${carType.id}">${carType.name}</option>
				       	</c:forEach>
                    </select>
                </div>
            </div>
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span>1</span></span>
                        基础信息
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span class="green"><span>2</span></span>
                        设备模板
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span><span>3</span></span>
                        所需备件
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span><span>4</span></span>
                        操作说明
                    </div>
                </div>
                <div class="content-item">
                    <label for="equipment-template">设备模板名称:</label>
                    <select id="etname" style="width:200px"></select>
                    <label for="equipment-brande">品牌:</label>
                    <select id="etbrand" style="width:200px"></select>
                </div>
                <div class="content-item">
                    <label for="equipment-name">规格型号:</label>
                    <select id="etmodel" style="width:200px"></select>
                    <label for="equipment-name">供货商:</label>
                    <select id="supplier" style="width:200px"></select>
                </div>
                <div class="content-item">
                    <p><span class="allData data-checked equipment-allData1"></span> &nbsp|&nbsp<span class="checkedData equipment-checkedData1">[已选<span class="part-add-data"></span>]</span></p>
                    <div class="table-div">
                        <table id="equipment-table" class="easyui-datagrid">
                        	<!-- js动态加载数据 设备模板 -->
                        </table>
                    </div>
                    <div class="table-div-checked">
                        <table id="equipment-table-checked" class="easyui-datagrid">

                        </table>
                    </div>
                </div>
            </div>
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span>1</span></span>
                        基础信息
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span class="green"><span>2</span></span>
                        设备模板
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span class="green"><span>3</span></span>
                        所需备件
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span><span>4</span></span>
                        操作说明
                    </div>
                </div>
                <div class="content-item">
                    <label for="equipment-template">备品备件:</label>
                    <select id="pname" style="width:200px"></select>
                    <label for="equipment-brande">药剂:</label>
                    <select id="mname" style="width:200px"></select>
                </div>
                <div class="content-item">
                    <p><span class="allData data-checked equipment-allData2"></span> &nbsp|&nbsp<span class="checkedData equipment-checkedData2">[已选<span class="equipment-add-data">0</span>]</span></p>
                    <div class="table-div">
                        <table id="equipment-table2" class="easyui-datagrid">
                            <!-- js动态加载 所需备件-->
                        </table>
                    </div>
                    <div class="table-div-checked">
                        <table id="equipment-table-checked2" class="easyui-datagrid">

                        </table>
                    </div>
                </div>
            </div>
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span>1</span></span>
                        基础信息
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span class="green"><span>2</span></span>
                        设备模板
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span class="green"><span>3</span></span>
                        所需备件
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span  class="green"><span>4</span></span>
                        操作说明
                    </div>
                </div>
                <div class="content-item" id="equipment-editor"></div>
            </div>
            <input type="hidden" id="addObj" name="obj" value="">
        </form>
    </div>
    <div class="footer">
        <div class="submit equipment-prev">上一步</div>
        <div class="submit equipment-next submit-show">下一步</div>
        <div class="submit equipment-submit">提交</div>
    </div>
</div>
<!--新建部件任务弹窗-->
<div class="popup newPart-wrapper">
    <div class="title">
        <span>设备部件配置</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="part-form" method="post" action="addPartTask">
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span>1</span></span>
                        基础信息
                    </div>
                    <div class="line"></div>
                    <div>
                        <span><span>2</span></span>
                        部件模板
                    </div>
                    <div class="line"></div>
                    <div>
                        <span><span>3</span></span>
                        所需备件
                    </div>
                    <div class="line"></div>
                    <div>
                        <span><span>4</span></span>
                        操作说明
                    </div>
                </div>
                <div class="content-item">
                    <label for="task-type">*任务类型:</label>
                    <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="taskType1">
                        <option value="0">请选择任务类型</option>
			            <c:forEach var="taskType" items="${taskTypes}">
				        	<option value="${taskType.id}">${taskType.name}</option>
				       	</c:forEach>
                    </select>
                </div>
                <div class="content-item">
                    <label for="task-type">*周期单位:</label>
                    <select id="unitId1">
                        <option value="1">天</option>
                        <option value="2">小时</option>
                    </select>
                </div>
                <div class="content-item">
                    <label for="task-type">*任务周期:</label>
                    <input type="text" class="easyui-validatebox" data-options="required:true,validType:'positiveSupfour'" placeholder="请输入任务周期" maxlength="6" id="cycle1">
                </div>
                <div class="content-item">
                    <label for="task-time">*所需时长:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'positiveSupfour'" placeholder="请输入时长(小时)" maxlength="6" id="howLong1"/>
                </div>
                <div class="content-item">
                    <label for="task-isCycle">*周期内完成:</label>
                    <div class="content-radio">
                        <span>
                        <a class="radio-wrapper radio-checked">
                        <i></i>
                        <input type="radio" name="isCycle" checked="checked" value="1">
                        </a>是
                    </span>
                        <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isCycle" value="0">
                        </a>否
                    </span>
                    </div>
                </div>
                <div class="content-item">
                    <label for="task-isPhoto">*拍照:</label>
                    <div class="content-radio">
                        <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="photo" value="1">
                        </a>是
                    </span>
                        <span>
                        <a class="radio-wrapper radio-checked">
                        <i></i>
                        <input type="radio" name="photo" checked="checked" value="0">
                        </a>否
                    </span>
                    </div>
                </div>
                <div class="content-item">
                    <label for="task-isTest">*强检:</label>
                    <div class="content-radio">
                        <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isTest" value="1">
                        </a>是
                    </span>
                        <span>
                        <a class="radio-wrapper radio-checked">
                        <i></i>
                        <input type="radio" name="isTest" checked="checked" value="0">
                        </a>否
                    </span>
                    </div>
                </div>
                <div class="content-item">
                    <label for="task-work">*所需工种:</label>
                </div>
                <div class="content-item">
                    <label for="task-work">*机修:</label>
                    <input class="easyui-validatebox part-input" type="text" data-options="required:false,validType:'numInt'" placeholder="请输入人数" maxlength="6" id="wt11"/>
                </div>
                <div class="content-item">
                    <label for="task-work">*电工:</label>
                    <input class="easyui-validatebox part-input" type="text" data-options="required:false,validType:'numInt'" placeholder="请输入人数" maxlength="6" id="wt12"/>
                </div>
                <div class="content-item">
                    <label for="task-work">*运行:</label>
                    <input class="easyui-validatebox part-input" type="text" data-options="required:false,validType:'numInt'" placeholder="请输入人数" maxlength="6" id="wt13"/>
                </div>
                <div class="content-item">
                    <label for="task-car">*所需车辆:</label>
                    <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="carType1">
                        <option value="0">请选择车辆类型</option>
			            <c:forEach var="carType" items="${carTypes}">
				        	<option value="${carType.id}">${carType.name}</option>
				       	</c:forEach>
                    </select>
                </div>
            </div>
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span>1</span></span>
                        基础信息
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span class="green"><span>2</span></span>
                        部件模板
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span><span>3</span></span>
                        所需备件
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span><span>4</span></span>
                        操作说明
                    </div>
                </div>
                <div class="content-item">
                    <label for="part-template">部件模板名称:</label>
                    <select id="etname1" style="width:200px"></select>
                    <label for="part-brande">品牌:</label>
                    <select id="etbrand1" style="width:200px"></select>
                </div>
                <div class="content-item">
                    <label for="part-name">规格型号:</label>
                    <select id="etmodel1" style="width:200px"></select>
                    <label for="part-name">供货商:</label>
                    <select id="supplier1" style="width:200px"></select>
                </div>
                <div class="content-item">
                    <p><span class="allData data-checked part-allData1">共1254条数据</span> &nbsp|&nbsp<span class="checkedData part-checkedData1">[已选]</span></p>
                    <div class="table-div">
                        <table id="part-table" class="easyui-datagrid">
                            <!-- js动态加载数据 部件模板 -->
                        </table>
                    </div>
                    <div class="table-div-checked">
                        <table id="part-table-checked" class="easyui-datagrid">

                        </table>
                    </div>
                </div>
            </div>
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span>1</span></span>
                        基础信息
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span class="green"><span>2</span></span>
                        部件模板
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span class="green"><span>3</span></span>
                        所需备件
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span><span>4</span></span>
                        操作说明
                    </div>
                </div>
                <div class="content-item">
                    <label for="part-template">备品备件:</label>
                    <select id="pname1" style="width:200px"></select>
                    <label for="part-brande">药剂:</label>
                    <select id="mname1" style="width:200px"></select>
                </div>
                <div class="content-item">
                    <p><span class="allData data-checked part-allData2">共1254条数据</span> &nbsp|&nbsp<span class="checkedData part-checkedData2">[已选 <span class="part-add-data">0</span>]</span></p>
                    <div class="table-div">
                        <table id="part-table2" class="easyui-datagrid">
                            <!-- js动态加载数据 所需备件 -->
                        </table>
                    </div>
                    <div class="table-div-checked">
                        <table id="part-table-checked2" class="easyui-datagrid">

                        </table>
                    </div>
                </div>
            </div>
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span>1</span></span>
                        基础信息
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span class="green"><span>2</span></span>
                        部件模板
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span class="green"><span>3</span></span>
                        所需备件
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span  class="green"><span>4</span></span>
                        操作说明
                    </div>
                </div>
                <div class="content-item" id ="part-editor"></div>
            </div>
             <input type="hidden" id="addObj1" name="obj" value="">
        </form>
    </div>
    <div class="footer">
        <div class="submit part-prev">上一步</div>
        <div class="submit part-next submit-show">下一步</div>
        <div class="submit part-submit">提交</div>
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
        <form class="edit-form" method="post" action="updateTaskCycle">
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span>1</span></span>
                        基础信息
                    </div>
                    <div class="line"></div>
                    <div>
                        <span><span>2</span></span>
                        <span class="edit-type">部件模板</span>
                    </div>
                    <div class="line"></div>
                    <div>
                        <span><span>3</span></span>
                        所需备件
                    </div>
                    <div class="line"></div>
                    <div>
                        <span><span>4</span></span>
                        操作说明
                    </div>
                </div>
                <div class="content-item">
                    <label for="task-type">*任务类型:</label>
                    <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="etaskType">
                    </select>
                </div>
                <div class="content-item">
                    <label for="task-type">*周期单位:</label>
                    <select id="eunitId">
                    </select>
                </div>
                <div class="content-item">
                    <label for="task-type">*任务周期:</label>
                    <input type="text" class="easyui-validatebox" data-options="required:true,validType:'positiveSupfour'" placeholder="请输入任务周期" maxlength="6" id="ecycle">
                </div>
                <div class="content-item">
                    <label for="task-time">*所需时长:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'positiveSupfour'" placeholder="请输入时长(小时)" maxlength="6" id="ehowLong"/>
                </div>
                <div class="content-item">
                    <label for="task-isCycle">*周期内完成:</label>
                    <div class="content-radio">
                        <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isCycle" value="1">
                        </a>是
                    </span>
                        <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isCycle" value="0">
                        </a>否
                    </span>
                    </div>
                </div>
                <div class="content-item">
                    <label for="task-isPhoto">*拍照:</label>
                    <div class="content-radio">
                        <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="photo" value="1">
                        </a>是
                    </span>
                        <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="photo" value="0">
                        </a>否
                    </span>
                    </div>
                </div>
                <div class="content-item">
                    <label for="task-isTest">*强检:</label>
                    <div class="content-radio">
                        <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isTest" value="1">
                        </a>是
                    </span>
                        <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isTest" value="0">
                        </a>否
                    </span>
                    </div>
                </div>
                <div class="content-item">
                    <label for="task-work">*所需工种:</label>
                </div>
                <div class="content-item">
                    <label for="task-work">*机修:</label>
                    <input class="easyui-validatebox edit-input" type="text" data-options="required:false,validType:'numInt'" placeholder="请输入人数" maxlength="6" id="ewt1" />
                </div>
                <div class="content-item">
                    <label for="task-work">*电工:</label>
                    <input class="easyui-validatebox edit-input"type="text" data-options="required:false,validType:'numInt'" placeholder="请输入人数" maxlength="6" id="ewt2" />
                </div>
                <div class="content-item">
                    <label for="task-work">*运行:</label>
                    <input class="easyui-validatebox edit-input" type="text" data-options="required:false,validType:'numInt'" placeholder="请输入人数" maxlength="6" id="ewt3" />
                </div>
                <div class="content-item">
                    <label for="task-car">*所需车辆:</label>
                    <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="ecarType">
                    </select>
                </div>
            </div>
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span>1</span></span>
                        基础信息
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span class="green"><span>2</span></span>
                        <span class="edit-type">部件模板</span>
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span><span>3</span></span>
                        所需备件
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span><span>4</span></span>
                        操作说明
                    </div>
                </div>
                <div class="content-item">
                    <label for="edit-template">模板名称:</label>
                    <select id="eetname" style="width:200px"></select>
                    <label for="edit-brande">品牌:</label>
                    <select id="eetbrand" style="width:200px"></select>
                </div>
                <div class="content-item">
                    <label for="edit-name">规格型号:</label>
                    <select id="eetmodel" style="width:200px"></select>
                    <label for="edit-name">供货商:</label>
                    <select id="esupplier" style="width:200px"></select>
                </div>
                <div class="content-item">
                    <p><span class="allData data-checked edit-allData1"></span> &nbsp|&nbsp<span class="checkedData edit-checkedData1">[已选 ]</span></p>
                    <div class="table-div">
                        <table id="edit-table" class="easyui-datagrid">
                        	<!-- js动态加载模板数据 -->
                        </table>
                    </div>
                    <div class="table-div-checked">
                        <table id="edit-table-checked" class="easyui-datagrid">

                        </table>
                    </div>
                </div>
            </div>
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span>1</span></span>
                        基础信息
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span class="green"><span>2</span></span>
                        <span class="edit-type">部件模板</span>
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span class="green"><span>3</span></span>
                        所需备件
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span><span>4</span></span>
                        操作说明
                    </div>
                </div>
                <div class="content-item">
                    <label for="edit-template">备品备件:</label>
                    <select id="epname" style="width:200px"></select>
                    <label for="edit-brande">药剂:</label>
                    <select id="emname" style="width:200px"></select>
                </div>
                <div class="content-item">
                    <p><span class="allData data-checked edit-allData2">共1254条数据</span> &nbsp|&nbsp<span class="checkedData edit-checkedData2">[已选<span class="edit-add-data">0</span>]</span></p>
                    <div class="table-div">
                        <table id="edit-table2" class="easyui-datagrid">
                            <!-- js动态加载备件数据 -->
                        </table>
                    </div>
                    <div class="table-div-checked">
                        <table id="edit-table-checked2" class="easyui-datagrid">

                        </table>
                    </div>
                </div>
            </div>
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span>1</span></span>
                        基础信息
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span class="green"><span>2</span></span>
                        <span class="edit-type">部件模板</span>
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span class="green"><span>3</span></span>
                        所需备件
                    </div>
                    <div class="line line2"></div>
                    <div>
                        <span  class="green"><span>4</span></span>
                        操作说明
                    </div>
                </div>
                <div class="content-item" id = "edit-editor"></div>
            </div>
            <input type="hidden" name="obj" id="editObj" value="">
        </form>
    </div>
    <div class="footer">
        <div class="submit edit-prev">上一步</div>
        <div class="submit edit-next submit-show">下一步</div>
        <div class="submit edit-submit">提交</div>
    </div>
</div>
<!--设备模板详情-->
<div class="popup equipment-detail-wrapper">
    <div class="title">
        <span>设备模板详情</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <table class="datagrid" id="equipment-detail-table">
            <tr>
                <td>潜污泵</td>
                <td>耐得</td>
                <td>Q=25m3/h H=8m N=2.2kW</td>
                <td>耐得工业公司</td>
            </tr>
        </table>
    </div>
</div>
<!--工种详情-->
<div class="popup work-detail-wrapper">
    <div class="title">
        <span>工种详情</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <table class="work-detail-table">
            <tr>
                <td>类型</td>
                <td>数量</td>
            </tr>
            <tr>
                <td>机修</td>
                <td>1</td>
            </tr>
            <tr>
                <td>机修</td>
                <td>1</td>
            </tr>
            <tr>
                <td>机修</td>
                <td>1</td>
            </tr>
        </table>
    </div>
</div>
<!--所需备件详情-->
<div class="popup part-detail-wrapper">
    <div class="title">
        <span>所需备件详情</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <p>共 <span id="totalPart">1254</span>条数据</p>
        <div>
            <table class="datagrid" id="part-detail-table">
                <tr>
                    <td>备品备件</td>
                    <td>潜污泵</td>
                    <td>998</td>
                </tr>
                <tr>
                    <td>备品备件</td>
                    <td>潜污泵</td>
                    <td>998</td>
                </tr>
                <tr>
                    <td>备品备件</td>
                    <td>潜污泵</td>
                    <td>998</td>
                </tr>
                <tr>
                    <td>备品备件</td>
                    <td>潜污泵</td>
                    <td>998</td>
                </tr>
                <tr>
                    <td>备品备件</td>
                    <td>潜污泵</td>
                    <td>998</td>
                </tr>
                <tr>
                    <td>备品备件</td>
                    <td>潜污泵</td>
                    <td>998</td>
                </tr>
                <tr>
                    <td>备品备件</td>
                    <td>潜污泵</td>
                    <td>998</td>
                </tr>
                <tr>
                    <td>备品备件</td>
                    <td>潜污泵</td>
                    <td>998</td>
                </tr>
                <tr>
                    <td>备品备件</td>
                    <td>潜污泵</td>
                    <td>998</td>
                </tr>
                <tr>
                    <td>备品备件</td>
                    <td>潜污泵</td>
                    <td>998</td>
                </tr>
            </table>
        </div>
    </div>
</div>
<!--操作说明详情-->
<div class="popup explain-detail-wrapper">
    <div class="title">
        <span>操作说明详情</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">

    </div>
</div>
<script src="<%=basePath%>front/public/js/jquery-3.2.1.min.js"></script>
<script src="<%=basePath %>/front/public/js/select2.js"></script>
<script src="<%=basePath %>/front/public/js/pinyin.js"></script>
<script src="<%=basePath%>front/public/js/jquery.easyui.gai.js"></script>
<script src="<%=basePath%>front/public/js/jquery.form.js"></script>
<script src="<%=basePath%>front/public/js/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath %>/front/public/js/zh-CN.js"></script>
<script src="<%=basePath%>front/public/js/swiper-3.4.2.min.js"></script>
<script src="<%=basePath%>front/public/js/wangEditor.min.js"></script>
<script src="<%=basePath%>front/public/js/common.js"></script>
<script src="<%=basePath%>front/public/js/customPrompt.js"></script>
<script src="<%=basePath%>front/public/js/taskConfigureEquipment.js"></script>
</body>
</html>