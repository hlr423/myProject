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
    <title>工资配置</title>
    <link rel="stylesheet" href="<%=basePath%>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/wageConfig.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
            <select name="" id="organizations" class="easyui-combotrees">
                <option value="0">请选择部门</option>
            </select>
            <input id="keyword" type="text" placeholder="请输入人员姓名">
            <div class="search-btn">搜索</div>
        </div>
        <div class="table-wrapper">
            <table class="easyui-datagrid" id="dg">
                <tbody>
                    <tr>
                        <td>张三三</td>
                        <td>性别</td>
                        <td>电话号码</td>
                        <td>部门</td>
                        <td>￥<span>2000</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="shade"></div>
    <!-- 编辑框 -->
    <div class="popup edit-popup">
        <div class="title">
            <span>编辑</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <form id="editForm" method="post">
                <div class="content-item">
                    <label>工资*</label>
                    <input id="updateWage" class="easyui-validatebox" type="text" placeholder="请输入工资" data-options="required:true,validType:'positiveTwo'" maxlength="11"
                    />
                </div>
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
    <script src="<%=basePath%>front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath%>front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath%>front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath%>front/public/js/customPrompt.js"></script>
    <script src="<%=basePath%>front/public/js/common.js"></script>
    <!-- <script src="../js/refresh.js"></script> -->
    <script src="<%=basePath%>front/public/js/wageConfig.js"></script>
</body>

</html>