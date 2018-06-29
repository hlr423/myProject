<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>仓库配置</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/depotConfigure.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
<div class="body-wrapper">
    <div class="search-wrapper">
        <select id="toparea" class="easyui-combotrees cbt" data-options="prompt:'请选择区域'">
        </select>
        <input type="text" placeholder="请输入仓库名称" id="keyword">
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
            	<!-- js动态加载数据 -->
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
        <form class="newAdd-form" method="post" action="addDeport">
            <div class="content-item">
                <label for="depot-name">*仓库名称:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'allName'" placeholder="请输入仓库名称" maxlength="50" id="name" name="name"/>
            </div>
            <div class="content-item">
                <label for="depot-region">*区域:</label>
                <select id="area" class="newAdd-region-comboTree" data-options="required:true,prompt:'请选择区域'" name="areaId"  ></select>
                <!-- <select id="area" class="easyui-validatebox easyui-combotrees cbt " data-options="required:true,prompt:'请选择区域'" name="areaId" >
       			</select> -->
            </div>
            <div class="content-item">
                <label for="depot-address">*地址:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'address'" placeholder="请输入地址" maxlength="100" id="address" name="address"/>
            </div>
            <div class="content-item">
                <label for="station-area">*占地面积:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'"  placeholder="请输入占地面积(㎡)" maxlength="8" id="totalArea" name="totalArea"/>
            </div>
            <div class="content-item">
                <label for="station-people">*负责人:</label>
                <select class="easyui-combotrees cbt easyui-validatebox" data-options="required:true,validType:'name',prompt:'请选择负责人'" maxlength="30" id="headPerson" name="hpersonId">
       			</select>
            </div>
            <div class="content-item">
                <label for="depot-peoples">*仓库员:</label>
                <select id="person" class="newAdd-peoples-comboTree"   data-options="required:true,prompt:'请选择仓库员'"  multiple name="personId"></select>
                <!-- <select id="person" class="newAdd-peoples-comboTree easyui-combotrees cbt easyui-validatebox" data-options="required:true,prompt:'请选择仓库员'" multiple name="personId">
                </select> -->
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
        <form class="edit-form" method="post" action="updateDeport">
            <div class="content-item">
                <label for="depot-name">*仓库名称:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'allName'" placeholder="请输入仓库名称" maxlength="50" id="ename" name="name"/>
            </div>
            <div class="content-item">
                <label for="depot-region">*区域:</label>
                <select class="easyui-combotrees cbt" data-options="required:true,prompt:'请选择区域'" name="areaId" id="earea">
                </select>
            </div>
            <div class="content-item">
                <label for="depot-address">*地址:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'address'" placeholder="请输入地址" maxlength="100" id="eaddress" name="address"/>
            </div>
            <div class="content-item">
                <label for="station-area">*占地面积:</label>
                <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'"  placeholder="请输入占地面积(㎡)" maxlength="8" id="etotalArea" name="totalArea"/>
            </div>
            <div class="content-item">
                <label for="station-people">*负责人:</label>
                <select class="easyui-combotrees cbt easyui-validatebox" data-options="required:true,validType:'name',prompt:'请选择负责人'" maxlength="30" id="eperson" name="hpersonId">
       			</select>
            </div>
            <div class="content-item">
                <label for="depot-peoples">*仓库员:</label>
                <select class="easyui-combotrees cbt" data-options="required:true,prompt:'请选择仓库员'" multiple id="epersons" name="personId">
                </select>
            </div>
            <input type="hidden" value="" name="id" id="deportId">
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
<script src="<%=basePath %>/front/public/js/common.js"></script>
<script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
<!-- <script src="<%=basePath %>/front/public/js/refresh.js"></script> -->
<script src="<%=basePath %>/front/public/js/depotConfigure.js"></script>
</body>
</html>