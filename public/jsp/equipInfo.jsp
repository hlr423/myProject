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
    <title>设备信息</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/select2.css">
    <link rel="stylesheet" href="<%=basePath %>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>front/public/css/equipInfo.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
            <select id="client" class="easyui-combotrees cbt">
                <option>请选择区域</option>
            </select>
            
            <select name="" id="stationstate" onchange="getStationByState()">
                
            </select>
            
            <select name="" id="choseStation" onchange="getEquipsByStation()">
                <option value="0">请选择厂站</option>
                <option value="1">平窝乡污水处理厂</option>
            </select>
            <!-- <input type="text" placeholder="搜索厂站名称" maxlength="50" class="station-input">
            <div class="search-btn">搜索</div> -->
            <!-- <div class="export-btn">
                <i></i>
                导出
            </div> -->
        </div>
        <div class="table-wrapper">
            <div id="tab" class="easyui-tabs">
                <div title="基本信息">
                    <div class="chosed">
                        <div class="search-wrapper">
                            <select name="" id="equipTemp">
                                <option value="0">请选择设备模板</option>
                                <c:forEach var="equipTemp" items="${equipTemps}">
	            					<option value="${equipTemp.id}">${equipTemp.text}</option>
	       		 				</c:forEach>
                            </select>
                            <select name="" id="brand">
                                <option value="0">请选择品牌</option>
                                <c:forEach var="brand" items="${brands}">
	            					<option value="${brand.id}">${brand.text}</option>
	       		 				</c:forEach>
                            </select>
                            <select name="" id="position">
                                <option value="0">请选择工艺位置</option>
                                <c:forEach var="position" items="${positions}">
	            					<option value="${position.positionId}">${position.positionName}</option>
	       		 				</c:forEach>
                            </select>
                            <select name="" id="state">
                                <option value="0">请选择状态</option>
                                <option value="1">运行中</option>
                                <option value="2">热备</option>
                            </select>
                           <!--  <div class="chose-radio">
                                <div class="radio-wrapper radio-checked">
                                    <i></i>
                                    <input type="radio" name="1" checked>
                                </div>
                                <p>运行中</p>
                            </div>
                            <div class="chose-radio">
                                <div class="radio-wrapper">
                                    <i></i>
                                    <input type="radio" name="1">
                                </div>
                                <p>热备</p>
                            </div>
                            <div class="search-btn" id="search1">查询</div> -->
                        </div>
                        <div class="table1-wrapper">
                            <table class="easyui-datagrid" id="dg0">
                                <tbody>
                                    <tr>
                                        <td>潜污泵</td>
                                        <td>潜污泵</td>
                                        <td>耐得</td>
                                        <td>Q=25m3/h H=8m N=2.2kW</td>
                                        <td>提升泵池</td>
                                        <td>25461</td>
                                        <td>运行</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div title="运维信息">
                    <div class="chosed">
                        <div class="search-wrapper">
                            <select name="" id="taskType">
                                <option value="0">请选择任务类型</option>
                                <c:forEach var="taskType" items="${taskTypes}">
	            					<option value="${taskType.id}">${taskType.name}</option>
	       		 				</c:forEach>
                            </select>
                            <input type="text" placeholder="请选择开始时间" id="startTime1" class="chose-time">
                            <span class="line">-</span>
                            <input type="text" placeholder="请选择结束时间" id="endTime1" class="chose-time">
                            <div class="search-btn" id="search2">查询</div>
                        </div>
                        <div class="table1-wrapper">
                            <table class="easyui-datagrid" id="dg1">
                                <tbody>
                                    <tr>
                                        <td>运渣</td>
                                        <td>潜污泵</td>
                                        <td></td>
                                        <td></td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div title="预警信息">
                    <div class="chosed">
                        <div class="search-wrapper">
                            <select name="" id="allEquips1">
                                <option value="0">全部设备</option>
                            </select>
                            <input type="text" placeholder="请选择开始时间" id="startTime2" class="chose-time">
                            <span class="line">-</span>
                            <input type="text" placeholder="请选择结束时间" id="endTime2" class="chose-time">
                            <div class="search-btn" id="search3">查询</div>
                        </div>
                        <div class="table1-wrapper">
                            <table class="easyui-datagrid" id="dg2">
                                <!-- <tbody>
                                    <tr>
                                        <td>调节池超声波液位计</td>
                                        <td>COD超过上限值</td>
                                        <td>3</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2小时</td>
                                        <td>张珊三</td>
                                    </tr>
                                    <tr>
                                        <td>调节池超声波液位计</td>
                                        <td>COD超过上限值</td>
                                        <td>3</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2小时</td>
                                        <td>张珊三</td>
                                    </tr>
                                </tbody> -->
                            </table>
                        </div>
                    </div>
                </div>
                <div title="告警信息">
                    <div class="chosed">
                        <div class="search-wrapper">
                            <select name="" id="allEquips2">
                                <option value="0">全部设备</option>
                            </select>
                            <input type="text" placeholder="请选择开始时间" id="startTime3" class="chose-time">
                            <span class="line">-</span>
                            <input type="text" placeholder="请选择结束时间" id="endTime3" class="chose-time">
                            <div class="search-btn" id="search4">查询</div>
                        </div>
                        <div class="table1-wrapper">
                            <table class="easyui-datagrid" id="dg3">
                                <!-- <tbody>
                                    <tr>
                                        <td>调节池超声波液位计</td>
                                        <td>COD超过上限值</td>
                                        <td>3</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2小时</td>
                                        <td>张珊三</td>
                                    </tr>
                                    <tr>
                                        <td>调节池超声波液位计</td>
                                        <td>COD超过上限值</td>
                                        <td>3</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2小时</td>
                                        <td>张珊三</td>
                                    </tr>
                                </tbody> -->
                            </table>
                        </div>
                    </div>
                </div>
                <div title="故障信息">
                    <div class="chosed">
                        <div class="search-wrapper">
                            <select name="" id="allEquips3">
                                <option value="0">全部设备</option>
                            </select>
                            <input type="text" placeholder="请选择开始时间" id="startTime4" class="chose-time">
                            <span class="line">-</span>
                            <input type="text" placeholder="请选择结束时间" id="endTime4" class="chose-time">
                            <div class="search-btn" id="search5">查询</div>
                        </div>
                        <div class="table1-wrapper">
                            <table class="easyui-datagrid" id="dg4">
                                <!-- <tbody>
                                    <tr>
                                        <td>调节池超声波液位计</td>
                                        <td>COD超过上限值</td>
                                        <td>3</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2小时</td>
                                        <td>张珊三</td>
                                    </tr>
                                    <tr>
                                        <td>调节池超声波液位计</td>
                                        <td>COD超过上限值</td>
                                        <td>3</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2小时</td>
                                        <td>张珊三</td>
                                    </tr>
                                </tbody> -->
                            </table>
                        </div>
                    </div>
                </div>
                <div title="生命周期">
                    <div class="chosed">
                        <div class="search-wrapper">
                            <select name="" id="position1">
                                <option value="0">请选择工艺位置</option>
                                <c:forEach var="position" items="${positions}">
	            					<option value="${position.positionId}">${position.positionName}</option>
	       		 				</c:forEach>
                            </select>
                            <select name="" id="equip">
                            </select>
                        </div>
                        <div id="cur-title"></div>
                        <div class="time-chart">
							<!-- js动态加载 -->
                        </div>
                        <div class="table1-wrapper">
                            <table class="easyui-datagrid" id="dg5">
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="shade"></div>
    <!-- 通知状态详情框 -->
    <div class="popup notice-detail-popup">
        <div class="title">
            <span>通知详情</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <table class="easyui-datagrid" id="noticeDetail">
                <tbody>
                    <tr>
                        <td>张三三</td>
                        <td>13684203746</td>
                        <td>2017-12-06 12:44:32</td>
                        <td>2017-12-06 12:44:32</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- 下次运维任务 -->
    <div class="popup next-task-popup">
        <div class="title">
            <span>下次运维任务</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <table class="easyui-datagrid" id="nextTask">
                <tbody>
                    <tr>
                        <td>保养</td>
                        <td>2017-12-06 12:44:32</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="popup next-opreate-popup">
        <div class="title">
            <span>下次运维任务</span>
            <a class="return-popup">
                <i class="return-icon"></i>
            </a>
        </div>
        <div class="content">
            <div class="content-item">
                <p>第一步</p>
                <div class="img-box">
                    <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                    <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                    <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                    <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                </div>
                <p>
                    我是操作说明
                </p>
            </div>
            <div class="content-item">
                <p>第二步</p>
                <div class="img-box">
                    <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                </div>
                <p>
                    我是操作说明
                </p>
            </div>
        </div>
    </div>
    <!-- 运维详情框 -->
    <div class="popup yw-popup">
        <div class="title">
            <span>运维详情</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <table class="yw-table">
                <tbody>
                    <tr>
                        <td>任务类型</td>
                        <td></td>
                        <td>操作对象</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>状态</td>
                        <td></td>
                        <td>备注</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>操作人员</td>
                        <td colspan="3">张三</td>
                    </tr>
                    <tr>
                        <td>照片</td>
                        <td colspan="3">
                            <div class="img-box" id="pics">
                                <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                                <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                                <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>反馈</td>
                        <td colspan="3">
                            <div class="img-box" id="feedBacks">
                                <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                                <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                                <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                            </div>
                            <p></p>
                        </td>
                    </tr>
                    <tr>
                        <td>强检</td>
                        <td colspan="3">

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <script src="<%=basePath %>front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath %>front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath %>front/public/js/easyui-lang-zh_CN.js"></script>
     <script src="<%=basePath %>/front/public/js/select2.js"></script>
    <script src="<%=basePath %>/front/public/js/pinyin.js"></script>
    <script src="<%=basePath %>/front/public/js/zh-CN.js"></script>
    <script src="<%=basePath %>front/public/js/swiper-3.4.2.min.js"></script>
    <script src="<%=basePath %>front/public/js/laydate/laydate.js"></script>
    <script src="<%=basePath %>front/public/js/customPrompt.js"></script>
    <script src="<%=basePath %>front/public/js/common.js"></script>
    <!-- <script src="../js/refresh.js"></script> -->
    <script src="<%=basePath %>front/public/js/equipInfo.js"></script>
</body>

</html>