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
    <title>排版规则配置</title>
    <link rel="stylesheet" href="<%=basePath%>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>/front/public/css/shift.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
    	<div class="search-wrapper">
        	<div>
            	<select name="" class="easyui-combotree cbt"  data-options="prompt:'请选择区域',url:'getArea'" id="area">
            	</select>
        	</div>
        </div>
        <div class="operation-wrapper">
            <div class="new-btn">
                <i></i>
                <span>新建</span>
            </div>
        </div>
        <div class="table-wrapper">
            <table class="easyui-datagrid" id="dg">
                <!-- <tbody>
                    <tr>
                        <td>简阳</td>
                        <td>3</td>
                        <td>4</td>
                        <td></td>
                        <td>7天</td>
                        <td>年</td>
                    </tr>
                </tbody> -->
            </table>
        </div>
    </div>
    <div class="shade"></div>
    <!-- 新建框 -->
    <div class="popup new-popup">
        <div class="title">
            <span>新建</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <form id="newForm" method="post" action="addShiftRule" enctype ="multipart/form-data">
                <div class="content-item">
                    <div class="new-total">
                        <div>
                            <span>电工总人数:</span>
                            <span></span>
                            <input type="hidden" id="newTotaldNum" value="0">
                        </div>
                        <div>
                            <span>运行总人数:</span>
                            <span></span>
                            <input type="hidden" id="newTotalyNum" value="0">
                        </div>
                        <div>
                            <span>机修总人数:</span>
                            <span></span>
                            <input type="hidden" id="newTotaljNum" value="0">
                        </div>
                    </div>
                </div>
                <div class="content-item">
                    <label>区域*</label>
                    <select name="areaId" id="addArea" class="easyui-validatebox easyui-combotree cbt" data-options="required:true,validType:'cbtRequired',url:'getArea'">
                    </select>
                </div>
                <div class="content-item">
                    <label>倒班数*</label>
                    <select name="num" id="addNum" class="auto-num">
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div class="content-item">
                    <table class="new-table">
                        <thead>
                            <tr>
                                <th>班次名称</th>
                                <th>上班时间</th>
                                <th>下班时间</th>
                                <th>电工人数</th>
                                <th>运行人数</th>
                                <th>机修人数</th>
                            </tr>
                        </thead>
                        <tbody class="add-item">
                            <tr>
                                <td>
                                    <input type="text" name="shifts[0].name" class="easyui-validatebox new-group-name" data-options="required:true" maxlength="50" placeholder="请输入名称">
                                </td>
                                <td>
                                    <input type="text" name="shifts[0].startTime" class="easyui-validatebox new-date-plugin new-start first-time" data-options="required:true" placeholder="请选择时间">
                                </td>
                                <td>
                                    <input type="text" name="shifts[0].endTime" class="easyui-validatebox new-date-plugin new-end" data-options="required:true" placeholder="请选择时间">
                                </td>
                                <td>
                                    <input type="text" name="shifts[0].electrician" class="easyui-validatebox new-d-num" data-options="required:true" maxlength="50" placeholder="请输入人数">
                                </td>
                                <td>
                                    <input type="text" name="shifts[0].technology" class="easyui-validatebox new-y-num" data-options="required:true" maxlength="50" placeholder="请输入人数">
                                </td>
                                <td>
                                    <input type="text" name="shifts[0].mechanic" class="easyui-validatebox new-j-num" data-options="required:true" maxlength="50" placeholder="请输入人数">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" name="shifts[1].name" class="easyui-validatebox new-group-name" data-options="required:true" maxlength="50" placeholder="请输入名称">
                                </td>
                                <td>
                                    <input type="text" name="shifts[1].startTime" class="easyui-validatebox new-date-plugin new-start" data-options="required:true" placeholder="请选择时间">
                                </td>
                                <td>
                                    <input type="text" name="shifts[1].endTime" class="easyui-validatebox new-date-plugin new-end" data-options="required:true" placeholder="请选择时间">
                                </td>
                                <td>
                                    <input type="text" name="shifts[1].electrician" class="easyui-validatebox new-d-num" data-options="required:true" maxlength="50" placeholder="请输入人数">
                                </td>
                                <td>
                                    <input type="text" name="shifts[1].technology" class="easyui-validatebox new-y-num" data-options="required:true" maxlength="50" placeholder="请输入人数">
                                </td>
                                <td>
                                    <input type="text" name="shifts[1].mechanic" class="easyui-validatebox new-j-num" data-options="required:true" maxlength="50" placeholder="请输入人数">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="content-item">
                    <label>班组数*</label>
                    <select name="groupNum" id="addGroupNum" class="new-group-number">
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div class="content-item">
                    <label>轮换周期*</label>
                    <input type="text" name="turnDays" class="easyui-validatebox" data-options="required:true,validType:'numInt'" maxlength="50" id="add-turnDays"
                        placeholder="请输入轮换周期天数">
                    <span>&nbsp;天</span>
                </div>
                <div class="content-item">
                    <label>生成周期*</label>
                    <select name="cycleId" id="add-cycle" class="easyui-validatebox" data-options="required:true,validType:'selectValueRequired'">
                        <option value="0">请选择生成周期</option>
                        <option value="1">年</option>
                        <option value="2">半年</option>
                        <option value="3">季度</option>
                        <option value="4">月</option>
                    </select>
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit new-submit">提交</div>
        </div>
    </div>
    <!-- 编辑框 -->
    <div class="popup edit-popup">
        <div class="title">
            <span>编辑</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <form id="editForm" method="post" action="updateShiftRule">
            	<input name="areaId" type="hidden" id="editArea">
            	<input name="id" type="hidden" id="editId">
                <div class="content-item">
                    <div class="edit-total">
                        <div>
                            <span>电工总人数:</span>
                            <span></span>
                            <input type="hidden" id="editTotaldNum" value="0">
                        </div>
                        <div>
                            <span>运行总人数:</span>
                            <span></span>
                            <input type="hidden" id="editTotalyNum" value="0">
                        </div>
                        <div>
                            <span>机修总人数:</span>
                            <span></span>
                            <input type="hidden" id="editTotaljNum" value="0">
                        </div>
                    </div>
                </div>
                <div class="content-item">
                    <label>*区域</label>
                    <span id="edit-area">成都</span>
                </div>
                <div class="content-item">
                    <label>*班组数</label>
                    <select name="num" id="editNum" class="auto-num">
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div class="content-item">
                    <table class="edit-table">
                        <thead>
                            <tr>
                                <th>班次名称</th>
                                <th>上班时间</th>
                                <th>下班时间</th>
                                <th>电工人数</th>
                                <th>运行人数</th>
                                <th>机修人数</th>
                            </tr>
                        </thead>
                        <tbody class="edit-item">
                            <tr>
                                <td>
                                    <input type="text" name="shifts[0].name" class="easyui-validatebox edit-group-name" data-options="required:true" maxlength="50" placeholder="请输入名称">
                                </td>
                                <td>
                                    <input type="text" name="shifts[0].startTime" class="easyui-validatebox edit-date-plugin edit-start first-time" data-options="required:true" placeholder="请选择时间">
                                </td>
                                <td>
                                    <input type="text" name="shifts[0].endTime" class="easyui-validatebox edit-date-plugin edit-end" data-options="required:true" placeholder="请选择时间">
                                </td>
                                <td>
                                    <input type="text" name="shifts[0].electrician" class="easyui-validatebox edit-d-num" data-options="required:true" maxlength="50" placeholder="请输入人数">
                                </td>
                                <td>
                                    <input type="text" name="shifts[0].technology" class="easyui-validatebox edit-y-num" data-options="required:true" maxlength="50" placeholder="请输入人数">
                                </td>
                                <td>
                                    <input type="text" name="shifts[0].mechanic" class="easyui-validatebox edit-j-num" data-options="required:true" maxlength="50" placeholder="请输入人数">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" name="shifts[1].name" class="easyui-validatebox edit-group-name" data-options="required:true" maxlength="50" placeholder="请输入名称">
                                </td>
                                <td>
                                    <input type="text" name="shifts[1].startTime" class="easyui-validatebox edit-date-plugin edit-start first-time" data-options="required:true" placeholder="请选择时间">
                                </td>
                                <td>
                                    <input type="text" name="shifts[1].endTime" class="easyui-validatebox edit-date-plugin edit-end" data-options="required:true" placeholder="请选择时间">
                                </td>
                                <td>
                                    <input type="text" name="shifts[1].electrician" class="easyui-validatebox edit-d-num" data-options="required:true" maxlength="50" placeholder="请输入人数">
                                </td>
                                <td>
                                    <input type="text" name="shifts[1].technology" class="easyui-validatebox edit-y-num" data-options="required:true" maxlength="50" placeholder="请输入人数">
                                </td>
                                <td>
                                    <input type="text" name="shifts[1].mechanic" class="easyui-validatebox edit-j-num" data-options="required:true" maxlength="50" placeholder="请输入人数">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="content-item">
                    <label>*班组数</label>
                    <select name="groupNum" id="editGroupNum" class="edit-group-number">
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div class="content-item">
                    <label>*轮换周期</label>
                    <input type="text" name="turnDays" class="easyui-validatebox" data-options="required:true,validType:'numInt'" maxlength="50" id="edit-turnDays"
                        placeholder="请输入轮换周期天数">
                    <span>&nbsp;天</span>
                </div>
                <div class="content-item">
                    <label>*生成周期</label>
                    <select name="cycleId" id="edit-cycle" class="easyui-validatebox" data-options="required:true,validType:'selectValueRequired'">
                        <option value="0">请选择生成周期</option>
                        <option value="1">年</option>
                        <option value="2">半年</option>
                        <option value="3">季度</option>
                        <option value="4">月</option>
                    </select>
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit edit-submit">提交</div>
        </div>
    </div>
    <div class="popup detail-popup">
        <div class="title">
            <span>倒班详情</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <div class="content-item">
                <label>倒班数</label>
                <span id="detailNum">3</span>
            </div>
            <table class="easyui-datagrid" id="db">
                <tbody>
                    <tr>
                        <td>早班</td>
                        <td>09:00:00</td>
                        <td>17:00:00</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>午班</td>
                        <td>09:00:00</td>
                        <td>17:00:00</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>晚班</td>
                        <td>09:00:00</td>
                        <td>17:00:00</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
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
    <!-- 启动框 -->
    <div class="infor-wrapper use-wrapper">
        <p>
            <i></i>
            启动后其他排班将不可用！
        </p>
        <div>
            <a class="use-confirm">启动</a>
            <a class="infor-cancel">取消</a>
        </div>
    </div>
    <script src="<%=basePath%>/front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath%>/front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath%>/front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath%>/front/public/js/laydate/laydate.js"></script>
    <script src="<%=basePath%>/front/public/js/customPrompt.js"></script>
    <script src="<%=basePath%>/front/public/js/common.js"></script>
    <!-- <script src="<%=basePath%>/front/public/js/refresh.js"></script> -->
    <script src="<%=basePath%>/front/public/js/shift.js"></script>
</body>
</html>
