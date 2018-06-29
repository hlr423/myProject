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
    <title>位置初始化</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/placeConfig.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
            <!-- <select id="client" class="easyui-combotrees cbt">
            </select> -->
            <input type="text" name="keyWord" id="keyWord" placeholder="请输入一级位置名称" maxlength="50">
            <div class="search-btn" onclick="searchFun()">搜索</div>
        </div>
        <div class="operation-wrapper">
            <div class="new-btn">
                <i></i>
                <span>新建</span>
            </div>
        </div>
        <div class="table-wrapper">
            <table class="easyui-treegrid" id="dg">
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
            <form id="newForm" method="post">
                <div class="content-item">
                    <input type="hidden" name="series" value="一级"/>
                    <label>*位置名称</label>
                    <input class="easyui-validatebox" name="name" type="text" placeholder="请输入位置名称（默认一级）" data-options="required:true" maxlength="50" />
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
            <form id="editForm" method="post">
                <div class="content-item">
                	<input type="hidden" name="id"/>
                    <label>*位置名称</label>
                    <input class="easyui-validatebox" name="name" type="text" placeholder="请输入位置名称" data-options="required:true" maxlength="50" />
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit edit-submit">提交</div>
        </div>
    </div>
    <!-- 添加子类型 -->
    <div class="popup add-popup">
        <div class="title">
            <span>添加子类型</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <form id="addForm" method="post">
                <div class="content-item">
                	<input type="hidden" name="parentId" id="parentId"/>
                    <label>*位置名称</label>
                    <input class="easyui-validatebox" name="name" type="text" placeholder="请输入位置名称" data-options="required:true" maxlength="50" />
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit add-submit">提交</div>
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
    <script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
    <script src="<%=basePath %>/front/public/js/common.js"></script>
    <!-- <script src="../js/refresh.js"></script> -->
    <script src="<%=basePath %>/front/public/js/placeConfig.js"></script>
</body>

</html>