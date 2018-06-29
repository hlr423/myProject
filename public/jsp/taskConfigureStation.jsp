<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>任务配置/厂站</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/taskConfigureStation.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
<div class="body-wrapper">
    <div class="search-wrapper">
        <select class="easyui-validatebox" type="text" id="topTaskType">
        </select>
        <select class="easyui-validatebox" type="text" id="topTreatWater">
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
<!--新建弹窗-->
<div class="popup newAdd-wrapper">
    <div class="title">
        <span>新建</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="newAdd-form" method="post" action="addStationTask">
            <div class="content-item">
                <label for="task-type">*任务类型:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="taskType" name="taskTypeId">
        		</select>
            </div>
            <div class="content-item">
                <label for="task-water">*设计处理水量:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="treatWater" name="treatWaterId">
        		</select>
            </div>
            <div class="content-item">
                <label for="task-maxCycle">*最大周期:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'positiveSupfour'" placeholder="最大周期" maxlength="6" id="maxCycle" name="maxCycle"/>
            </div>
            <div class="content-item">
                <label for="task-maxCycle">*最小周期:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'positiveSupfour'" placeholder="最小周期" maxlength="6" id="minCycle" name="minCycle"/>
            </div>
            <div class="content-item">
                <label for="task-cycle">*周期单位:</label>
                <select name="unitId" id="unit">
                    <option value="1">天</option>
                    <option value="2">小时</option>
                </select>
            </div>
            <div class="content-item">
                <label for="task-time">*所需时长:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="请输入时长(小时)" maxlength="6" id="howLong" name="howLong"/>
            </div>
            <div class="content-item">
                <label for="task-isCycle">*周期内完成:</label>
                <div>
                    <span>
                        <a class="radio-wrapper radio-checked">
                        <i></i>
                        <input type="radio" name="isCycleFinish" checked="checked" value="1">
                        </a>是
                    </span>
                    <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isCycleFinish" value="0">
                        </a>否
                    </span>
                </div>
            </div>
            <div class="content-item">
                <label for="task-isPhoto">*拍照:</label>
                <div>
                    <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isPhotograph" value="1">
                        </a>是
                    </span>
                    <span>
                        <a class="radio-wrapper radio-checked">
                        <i></i>
                        <input type="radio" name="isPhotograph" checked="checked" value="0">
                        </a>否
                    </span>
                </div>
            </div>
            <div class="content-item">
                <label for="task-isTest">*强检:</label>
                <div>
                    <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isMustCheck" value="1">
                        </a>是
                    </span>
                    <span>
                        <a class="radio-wrapper radio-checked">
                        <i></i>
                        <input type="radio" name="isMustCheck" checked="checked" value="0">
                        </a>否
                    </span>
                </div>
            </div>
            <div class="content-item">
                <label for="task-work">*所需工种:</label>
            </div>
            <div class="content-item">
                <label for="task-work">*机修:</label>
                <input class="easyui-validatebox equipment-input" type="text" data-options="required:false,validType:'numInt'" placeholder="请输入人数" maxlength="6" id="wt1" name="wt1"/>
            </div>
            <div class="content-item">
                <label for="task-work">*电工:</label>
                <input class="easyui-validatebox equipment-input" type="text" data-options="required:false,validType:'numInt'" placeholder="请输入人数" maxlength="6" id="wt2" name="wt2"/>
            </div>
            <div class="content-item">
                <label for="task-work">*运行:</label>
                <input class="easyui-validatebox equipment-input" type="text" data-options="required:false,validType:'numInt'" placeholder="请输入人数" maxlength="6" id="wt3" name="wt3"/>
            </div>
            <div class="content-item">
                <label for="task-car">*所需车辆:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="carType" name="carTypeId">
        		</select>
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
        <form class="edit-form" method="post" action="updateStationTask">
            <div class="content-item">
                <label for="task-type">*任务类型:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="etaskType" name="taskTypeId">
        		</select>
            </div>
            <div class="content-item">
                <label for="task-water">*设计处理水量:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="etreatWater" name="treatWaterId">
        		</select>
            </div>
            <div class="content-item">
                <label for="task-maxCycle">*最大周期:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'positiveSupfour'" placeholder="最大周期" maxlength="6" id="emaxCycle" name="maxCycle"/>
            </div>
            <div class="content-item">
                <label for="task-maxCycle">*最小周期:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'positiveSupfour'" placeholder="最小周期" maxlength="6" id="eminCycle" name="minCycle"/>
            </div>
            <div class="content-item">
                <label for="task-cycle">*周期单位:</label>
                <select name="unitId" id="eunit">
                    <option value="1">天</option>
                    <option value="2">小时</option>
                </select>
            </div>
            <div class="content-item">
                <label for="task-time">*所需时长:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'positiveSupfour'" placeholder="请输入时长(小时)" maxlength="6" id="ehowLong" name="howLong"/>
            </div>
            <div class="content-item ">
                <label for="task-isCycle">*周期内完成:</label>
                <div>
                    <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isCycleFinish" value="1">
                        </a>是
                    </span>
                    <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isCycleFinish" value="0">
                        </a>否
                    </span>
                </div>
            </div>
            <div class="content-item">
                <label for="task-isPhoto">*拍照:</label>
                <div>
                    <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isPhotograph" value="1">
                        </a>是
                    </span>
                    <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isPhotograph" value="0">
                        </a>否
                    </span>
                </div>
            </div>
            <div class="content-item">
                <label for="task-isTest">*强检:</label>
                <div>
                    <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isMustCheck" value="1">
                        </a>是
                    </span>
                    <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="isMustCheck" value="0">
                        </a>否
                    </span>
                </div>
            </div>
            <div class="content-item">
                <label for="task-work">*所需工种:</label>
            </div>
            <div class="content-item">
                <label for="task-work">*机修:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'numInt'" placeholder="请输入人数" maxlength="6" id="ewt1" name="wt1"/>
            </div>
            <div class="content-item">
                <label for="task-work">*电工:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'numInt'" placeholder="请输入人数" maxlength="6" id="ewt2" name="wt2"/>
            </div>
            <div class="content-item">
                <label for="task-work">*运行:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'numInt'" placeholder="请输入人数" maxlength="6" id="ewt3" name="wt3"/>
            </div>
            <div class="content-item">
                <label for="task-car">*所需车辆:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="ecarType" name="carTypeId">
        		</select>
            </div>
            <input type="hidden" id="stId" name="stationTaskId">
        </form>
    </div>
    <div class="footer">
        <div class="submit edit-submit">提交</div>
    </div>
</div>
<!--新建提交成功弹窗-->
<div class="popup newAdd-success">
    <div class="content">
        <i></i>
        <span>提交成功！5s后自动关闭</span>
    </div>
    <div class="footer">
        <div class="submit btn-close">关闭</div>
        <div class="submit btn-add">继续添加</div>
    </div>
</div>
<!--工种详情-->
<div class="popup detail-wrapper">
    <div class="title">
        <span>工种详情</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <table class="detail-table">
        	<!-- js动态加载 -->
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
<script src="<%=basePath %>/front/public/js/common.js"></script>
<script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
<script src="<%=basePath %>/front/public/js/taskConfigureStation.js"></script>
</body>
</html>