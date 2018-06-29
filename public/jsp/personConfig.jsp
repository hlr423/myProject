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
    <title>人员配置</title>
    <link rel="stylesheet" href="<%=basePath%>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/typePerson.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
            <select name="" id="worktypes">
                <option value="0">请选择</option>
            </select>
            <input id="keyword" type="text" placeholder="请输入姓名">
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
                    <tr>
                        <td>张三</td>
                        <td>13684203746</td>
                    </tr>
                    <tr>
                        <td>李四</td>
                        <td>13684203746</td>
                    </tr>
                </tbody>
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
                    <label>*姓名</label>
                    <select name="" id="createPersons" class="easyui-validatebox" data-options="required:true,validType:'selectValueRequired'">
                        <option value="0">请选择</option>
                    </select>
                </div>
                <div class="content-item">
                    <label>*电话</label>
                    <input type="text" disabled>
                </div>
                <div class="person-img">
                    <img src="../front/public/images/datou.png" alt="">
                </div>
                <div class="content-item">
                    <label>*工种</label>
                    <select name="" id="createWorkTypes" class="easyui-validatebox" data-options="required:true,validType:'selectValueRequired'">
                        <option value="0">请选择</option>
                    </select>
                </div>
                <div class="content-item">
                    <label>*技能</label>
                </div>
                <table id="skillTable" class="new-table">
                    <!-- JS -->
                </table>
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
        	<div class="content-item">
                <label>*姓名</label>
                <input id="updatePersonName" type="text" disabled="disabled">
            </div>
        	<div class="content-item">
                <label>*工种</label>
                <select name="" id="updateWorkTypes" class="easyui-validatebox" data-options="required:true,validType:'selectValueRequired'">
                    <option value="0">请选择</option>
                </select>
            </div>
            <div class="content-item">
                <label>*技能</label>
            </div>
            <form id="editForm" method="post">
                <table id="updateSkillTable" class="edit-table">
                    <thead>
                        <tr>
                            <th>机修</th>
                            <th>电工</th>
                            <th>运行</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <a class="checkbox-wrapper">
                                    <i></i>
                                    <input type="checkbox" name="" id="" class="check-row">
                                </a>
                            </td>
                            <td>
                                <a class="checkbox-wrapper">
                                    <i></i>
                                    <input type="checkbox" name="" id="" class="check-row">
                                </a>
                            </td>
                            <td>
                                <a class="checkbox-wrapper">
                                    <i></i>
                                    <input type="checkbox" name="" id="" class="check-row">
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
            是否删除工种配置?
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
    <script src="<%=basePath%>front/public/js/typePerson.js"></script>
</body>

</html>