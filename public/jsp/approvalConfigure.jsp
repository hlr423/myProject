<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
    <title>审批流程</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/swiper-3.4.2.min.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/approvalConfigure.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
<div class="body-wrapper">
    <!-- <div class="search-wrapper">
        <input type="text" placeholder="请输入部门名称">
        <div class="search-btn">搜索</div>
    </div> -->
    <div class="table-wrapper">
        <table class="easyui-datagrid" id="dg">
            <!-- <tbody>
            <tr>
                <td>请假审批</td>
                <td>张三三→李斯→张科</td>
                <td>2017-12-21 12:56:03</td>
                <td></td>
            </tr>
            </tbody> -->
        </table>
    </div>
</div>
<div class="shade"></div>
<!--编辑弹窗-->
<div class="popup edit-wrapper">
    <div class="title">
        <span>编辑</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <div class="content-item">
            <label for="approval-type">审批人类型:</label>
            <div>
                <a class="radio-wrapper">
                    <i></i>
                    <input type="radio" name="approverProcessType" value="1">
                    <span>主管-指定1级</span>
                </a>
                <a class="radio-wrapper">
                    <i></i>
                    <input type="radio" name="approverProcessType" value="2">
                    <span>主管-指定多级</span>
                </a>
                <a class="radio-wrapper  radio-checked">
                    <i></i>
                    <input type="radio" name="approverProcessType" checked value="3">
                    <span>指定成员</span>
                </a>
            </div>
        </div>
        <form class="edit-form" method="post">
	    	<input type="hidden" name="approvalTypeId" id="approvalTypeId"/>
            <div class="content-item">
                <label for="approval-people">第一审批人:</label>
                <input class="edit-approval-comboTree" id="approvalSel1" name="personIds" data-options="required:true,prompt:'请选择审批人'">
            </div>
            <!-- <div class="content-item">
                <label for="approval-people">第二审批人:</label>
                <input class="edit-approval-comboTree" data-options="required:true,prompt:'请选择审批人'">
                <i class="edit-del"></i>
            </div>
            <div class="content-item">
                <label for="approval-people">第三审批人:</label>
                <input class="edit-approval-comboTree" data-options="required:true,prompt:'请选择审批人'">
                <i class="edit-del"></i>
            </div> -->
            <div class="content-item" id="addApprover">
                <div class="edit-add"><i></i>增加审批人</div>
            </div>
        </form>
    </div>
    <div class="footer">
        <div class="submit edit-submit">提交</div>
    </div>
</div>
<script src="<%=basePath %>/front/public/js/jquery-3.2.1.min.js"></script>
<script src="<%=basePath %>/front/public/js/jquery.easyui.min.js"></script>
<script src="<%=basePath %>/front/public/js/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath %>/front/public/js/swiper-3.4.2.min.js"></script>
<script src="<%=basePath %>/front/public/js/common.js"></script>
<script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
<script src="<%=basePath %>/front/public/js/approvalConfigure.js"></script>
</body>
</html>