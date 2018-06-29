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
	<title>工单管理</title>
	<link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
	<link rel="stylesheet" href="<%=basePath %>/front/public/css/workOrders.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
	<div class="body-wrapper">
		<div class="search-wrapper">
			<c:if test="${empty workTypes}">
            	<select name="" id="area" class="searchSelect">
           			<option value="0">请选择区域</option>
           			<c:forEach items="${areas}" var="area">
           				<option value="${area.id}">${area.name}</option>
           			</c:forEach>
	            </select>
           	</c:if>
           	<c:if test="${not empty workTypes}">
           		<input type="hidden" value="0" id="area">
           	</c:if>
			<select id="states">
				<option value="0">全部状态</option>
				<c:forEach var="state" items="${states}">
					<option value="${state.id }">${state.name }</option>
				</c:forEach>
			</select>
			<input type="text" placeholder="开始时间" class="chose-time" id="startTime">
			<input type="text" placeholder="结束时间" class="chose-time" id="endTime">
			<input type="text" placeholder="请输入工单编号" id="searchInput">
			<div class="search-btn">搜索</div>
		</div>
		<div class="operation-wrapper">
			<div class="new-btn">
				<i></i>
				<span>手动派发</span>
			</div>
		</div>
		<div class="table-wrapper">
			<table class="easyui-datagrid" id="dg">
				<tbody>
					<!-- <tr>
						<td>运维</td>
						<td>1234566</td>
						<td></td>
						<td>2017-12-21 12:54:03</td>
						<td>张三三、李斯、王武</td>
						<td></td>
						<td></td>
					</tr> -->
				</tbody>
			</table>
		</div>
	</div>
	<div class="shade"></div>
	<!--新建弹窗-->
	<div class="popup newAdd-popup">
		<div class="title">
			<span>新建</span>
			<a class="close-popup">
				<i class="close-icon"></i>
			</a>
		</div>
		<div class="content">
			<form class="newAdd-form"  action="addManualWorkSheet" method="post">
				<div class="content-item">
					<label>*运维时间:</label>
					<input class="popup-chose-time" type="text" placeholder="请选择时间" id="time"/>
				</div>
				<span class="task-title">
					<i></i>任务派发（必填）</span>
				<div class="task">
					<i class="delete-task"></i>
					<div class="content-item">
						<label>*地址:</label>
						<select class="easyui-validatebox area2" >
							<option>请选择区域</option>
						</select>
					</div>
					<div class="content-item">
						<label>*厂站名称:</label>
						<select class="easyui-validatebox station" data-options="required:true,validType:'selectValueRequired'" onChange="getEquipByStation()">
							<option value="0">请选择厂站</option>
							<option value="1">类型1</option>
						</select>
					</div>
					<div class="content-item">
						<label>*设备:</label>
						<select class="easyui-validatebox equip" data-options="required:true,validType:'selectValueRequired'">
							<option value="0">请选择设备</option>
							<option value="1">类型1</option>
						</select>
					</div>
					<div class="content-item">
						<label>*任务备注:</label>
						<input class="easyui-validatebox text" type="text" data-options="required:true" placeholder="请输入此任务的备注" maxlength="50" />
					</div>
					<div>
						<div class="person-num">
							<span>运维人员</span>
							<span>已选
								<span class="personnum">0</span>人</span>
							<a class="edit-person">
								<i></i>编辑人员</a>
						</div>
						<div class="person" id="checkedperson">
							<%-- <div>
								<img src="<%=basePath %>/front/public/images/head-img.png" alt="" srcset="">
								<div>
									<p>张江龙</p>
								</div>
							</div> --%>
						</div>
					</div>
				</div>
				<div class="add-taskBtn">
					<i></i>添加任务</div>
				<input id="addManualWorkSheet" type="hidden" value="" name="workSheet">
			</form>
		</div>
		<div class="footer">
			<div class="submit newAdd-submit">提交</div>
		</div>
	</div>
	<!--编辑人员弹窗-->
	<div class="popup edit-person-popup">
		<div class="title">
			<p>编辑人员</p>
			<a class="return-popup">
				<i class="return-icon"></i>
			</a>
		</div>
		<div class="content" id="person">

			<%-- <div class="content-person">
				<span>
					<a class="checkbox-all-wrapper">
						<i></i>
						<input type="checkbox" name="" class="check-all">
					</a>
					机修
				</span>
				<p>共有
					<span class="allPerson" id=num1>13</span>人，已选
					<span class="nowPerson">0</span>人</p>
				<div class="person">
					<div>
						<a class="checkbox-wrapper">
							<i></i>
							<input type="checkbox" class="check-row">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png" alt=" " srcset=" ">
						<p>张江龙龙龙龙龙龙龙龙龙龙</p>
					</div>
			 		<div>
						<a class="checkbox-wrapper ">
							<i></i>
							<input type="checkbox"  class="check-row">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png " alt="" srcset="">
						<p>张江龙龙</p>
					</div>
					<div>
						<a class="checkbox-wrapper">
							<i></i>
							<input type="checkbox" name="" id="" class="check-row">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png" alt=" " srcset=" ">
						<p>张江龙龙</p>
					</div>
					<div>
						<a class="checkbox-wrapper ">
							<i></i>
							<input type="checkbox" name=" " id=" " class="check-row">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png "alt="" srcset="">
						<p>张江龙</p>
					</div>
					<div>
						<a class="checkbox-wrapper">
							<i></i>
							<input type="checkbox" name="" id="" class="check-row">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png" alt=" " srcset=" ">
						<p>张江龙</p>
					</div>
					<div>
						<a class="checkbox-wrapper ">
							<i></i>
							<input type="checkbox" name=" " id=" " class="check-row">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png " alt="" srcset="">
						<p>张江龙</p>
					</div> 
				</div>
			</div>

			<div class="content-person">
				<span>
					<a class="checkbox-all-wrapper">
						<i></i>
						<input type="checkbox" name="" class="check-all">
					</a>
					机修
				</span>
				<p>共有
					<span class="allPerson">13</span>人，已选
					<span class="nowPerson">0</span>人</p>
				<div class="person">
					<div>
						<a class="checkbox-wrapper">
							<i></i>
							<input type="checkbox" name="" id="" class="check-row">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png"  alt=" " srcset=" ">
						<p>张江龙龙</p>
					</div>
					<div>
						<a class="checkbox-wrapper ">
							<i></i>
							<input type="checkbox " name=" " id=" " class="check-row ">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png "alt="" srcset="">
						<p>张江龙龙</p>
					</div>
					<div>
						<a class="checkbox-wrapper">
							<i></i>
							<input type="checkbox" name="" id="" class="check-row">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png" alt=" " srcset=" ">
						<p>张江龙龙</p>
					</div>
					<div>
						<a class="checkbox-wrapper ">
							<i></i>
							<input type="checkbox " name=" " id=" " class="check-row ">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png "alt="" srcset="">
						<p>张江龙</p>
					</div>
					<div>
						<a class="checkbox-wrapper">
							<i></i>
							<input type="checkbox" name="" id="" class="check-row">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png" alt=" " srcset=" ">
						<p>张江龙</p>
					</div>
					<div>
						<a class="checkbox-wrapper ">
							<i></i>
							<input type="checkbox " name=" " id=" " class="check-row ">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png " alt="" srcset="">
						<p>张江龙</p>
					</div>
				</div>
			</div>

			<div class="content-person">
				<span>
					<a class="checkbox-all-wrapper">
						<i></i>
						<input type="checkbox" name="" class="check-all">
					</a>
					机修
				</span>
				<p>共有
					<span class="allPerson">13</span>人，已选
					<span class="nowPerson">0</span>人</p>
				<div class="person">
					<div>
						<a class="checkbox-wrapper">
							<i></i>
							<input type="checkbox" name="" id="" class="check-row">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png"  alt=" " srcset=" ">
						<p>张江龙龙</p>
					</div>
					<div>
						<a class="checkbox-wrapper ">
							<i></i>
							<input type="checkbox " name=" " id=" " class="check-row ">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png " alt="" srcset="">
						<p>张江龙龙</p>
					</div>
					<div>
						<a class="checkbox-wrapper">
							<i></i>
							<input type="checkbox" name="" id="" class="check-row">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png" alt=" " srcset=" ">
						<p>张江龙龙</p>
					</div>
					<div>
						<a class="checkbox-wrapper ">
							<i></i>
							<input type="checkbox " name=" " id=" " class="check-row ">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png " alt="" srcset="">
						<p>张江龙</p>
					</div>
					<div>
						<a class="checkbox-wrapper">
							<i></i>
							<input type="checkbox" name="" id="" class="check-row">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png"  alt=" " srcset=" ">
						<p>张江龙</p>
					</div>
					<div>
						<a class="checkbox-wrapper ">
							<i></i>
							<input type="checkbox " name=" " id=" " class="check-row ">
						</a>
						<img src="<%=basePath %>/front/public/images/head-img.png " alt="" srcset="">
						<p>张江龙</p>
					</div>
				</div>
			</div> --%>
		</div>
		<div class="footer">
			<div class="submit edit-person-submit">提交</div>
		</div>

	</div>
	<script src="<%=basePath %>/front/public/js/jquery-3.2.1.min.js"></script>
	<script src="<%=basePath %>/front/public/js/jquery.easyui.min.js"></script>
	<script src="<%=basePath %>/front/public/js/easyui-lang-zh_CN.js"></script>
	<script src="<%=basePath %>/front/public/js/laydate/laydate.js"></script>
	<script src="<%=basePath %>/front/public/js/common.js"></script>
	<script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
	<!--<script src="<%=basePath %>/front/public/js/refresh.js"></script> -->
	<script src="<%=basePath %>/front/public/js/workOrders.js"></script>
</body>

</html>