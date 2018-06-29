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
    <title>组织机构配置</title>
    <link rel="stylesheet" href="<%=basePath%>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/organConfig.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
            <input id="keyword" type="text" placeholder="请输入最低级部门名称" maxlength="50">
            <div class="search-btn">搜索</div>
        </div>
        <div class="operation-wrapper">
            <div class="new-btn">
                <i></i>
                <span>新建</span>
            </div>
            <div class="img-btn">
                <span>图表</span>
            </div>
        </div>
        
        <div class="table-wrapper">
            <table class="easyui-treegrid" id="dg"></table>
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
            <form id="newForm" action="addRoot" method="post">
                <div class="content-item">
                    <label>部门名称*</label>
                    <input class="easyui-validatebox" name="name" type="text" placeholder="请输入部门名称" data-options="required:true,validType:'allName'" maxlength="50"/>
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
            <form id="editForm" method="post" action="updateOrg">
                <div class="content-item">
                    <label>部门名称*</label>
                    <input type="hidden" name="orgId" value=""/>
                    <input type="hidden" name="parentId" value=""/>
                    <input class="easyui-validatebox" name="name" type="text" placeholder="请输入部门名称" data-options="required:true,validType:'allName'" maxlength="50"/>
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit edit-submit">提交</div>
        </div>
    </div>
    <!-- 添加子部门框 -->
    <div class="popup add-popup">
        <div class="title">
            <span>添加子部门</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <form id="addForm" method="post" action="addChildOrg">
                <div class="content-item">
                    <label>部门名称*</label>
                    <input type="hidden" name="parentId" value=""/>
                    <input class="easyui-validatebox" name="name" type="text" placeholder="请输入部门名称" data-options="required:true,validType:'allName'" maxlength="50"/>
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
            所有子部门及相关人员将一同被删除！
        </p>
        <div>
            <a class="delete-confirm">删除</a>
            <a class="infor-cancel">取消</a>
        </div>
    </div>
    	
    <!-- 详情框 -->
    <div class="popup detail-popup">
        <div class="title">
            <span>详情</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <table  class="detail-container" >
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>电话</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>张三</td>
                        <td>男</td>
                        <td>13684203746</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- 图表框 -->
    <div class="popup echart-popup">
        <div class="title">
            <span>图表</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <div id="echart1"></div>
        </div>
    </div>
    <script src="<%=basePath%>front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath%>front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath%>front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath%>front/public/js/customPrompt.js"></script>
    <script src="<%=basePath%>front/public/js/common.js"></script>
    <script src="<%=basePath%>front/public/js/echarts.js"></script>
    <!-- <script src="../js/refresh.js"></script> -->
    <script src="<%=basePath%>front/public/js/organConfig.js"></script>
</body>

</html>