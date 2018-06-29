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
    <title>级别初始化</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/levelConfig.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
            <!-- <select id="client" class="easyui-combotrees cbt">
            </select> -->
            <input type="text" name="keyWord" id="keyWord" placeholder="请输入级别名称" maxlength="50">
            <div class="search-btn" onclick="searchFun()">搜索</div>
        </div>
        <!-- <div class="operation-wrapper">
            <div class="new-btn">
                <i></i>
                <span>新建</span>
            </div>
        </div> -->
        <div class="table-wrapper">
            <table class="easyui-datagrid" id="dg">
                <tbody>
                   
                </tbody>
            </table>
        </div>
    </div>
    <div class="shade"></div>
    <!-- 新建框 -->
    <!--<div class="popup new-popup">
        <div class="title">
            <span>新建</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <form id="newForm" method="post">
                <div class="content-item">
                    <label>*级别</label>
                    <select name="name" id="levelName" class="easyui-validatebox new-level" data-options="validType:'selectValueRequired'" onchange="levelValid()">
                        <option value="0">请选择级别</option>
                        <option value="一级">一级</option>
                        <option value="二级">二级</option>
                        <option value="三级">三级</option>
                    </select>
                </div>
                <div class="content-item">
                    <label>*超限小时</label>
                    <input class="easyui-validatebox" name="overtime" type="text" placeholder="请输入小于24小时的正数" data-options="required:true,validType:'lessThan'"
                        maxlength="4" />
                </div>
                <div class="content-item">
                    <label>*通知频率</label>
                    <input class="easyui-validatebox" name="notifyinterval" type="text" placeholder="请输入小于24小时的正数" data-options="required:true,validType:'lessThan24'"
                        maxlength="4" />
                </div>
                <div class="content-item">
                    <label>*通知角色</label>
                    <select name="roleIds" id="organizationIds" class="easyui-validatebox new-role" data-options="required:true, prompt:'请选择通知角色'">
                    </select>
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit new-submit">提交</div>
        </div>
    </div>-->
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
            	<input type="hidden" name="levelId"/>
                <div class="content-item">
                    <label>*级别名称</label>
                    <!--  <select name="name" class="easyui-validatebox edit-level" data-options="validType:'selectValueRequired'">
                        <option value="0">请选择级别</option>
                        <option value="1">一级</option>
                        <option value="2">二级</option>
                        <option value="3">三级</option>
                    </select>-->
                    <input class="easyui-validatebox" name="name" type="text" readonly style="background:#f0f0f0" maxlength="4" />
                </div>
                <div class="content-item">
                    <label>*超限时间</label>
                    <input class="easyui-validatebox" name="overtime" type="text" placeholder="请输入小于24小时的正数" data-options="required:true,validType:'lessThan'"
                        maxlength="4" />
                </div>
                <div class="content-item">
                    <label>*通知频率</label>
                    <input class="easyui-validatebox" name="notifyinterval" type="text" placeholder="请输入小于24小时的正数" data-options="required:true,validType:'lessThan24'"
                        maxlength="4" />
                </div>
                <div class="content-item">
                    <label>*通知角色</label>
                    <select name="roleIds" id="editRole" class="easyui-validatebox new-role" data-options="required:true, prompt:'请选择通知角色'">
                    </select>
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit edit-submit">提交</div>
        </div>
    </div>
    <!-- 删除框 -->
    <!-- <div class="infor-wrapper delete-wrapper">
        <p>
            <i></i>
            是否确认删除?
        </p>
        <div>
            <a class="delete-confirm">删除</a>
            <a class="infor-cancel">取消</a>
        </div>
    </div> -->
    <script src="<%=basePath %>/front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath %>/front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath %>/front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
    <script src="<%=basePath %>/front/public/js/common.js"></script>
    <!-- <script src="../js/refresh.js"></script> -->
    <script src="<%=basePath %>/front/public/js/levelConfig.js"></script>
</body>

</html>