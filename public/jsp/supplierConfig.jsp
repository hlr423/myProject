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
    <title>供应商初始化</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/supplierConfig.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
            <!-- <select id="client" class="easyui-combotrees cbt">
            </select> -->
            <input name="keyWord" id="keyWord" type="text" placeholder="请输入供应商名称/联系人" maxlength="50">
            <div class="search-btn" onclick="searchFun()">搜索</div>
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
                    <label>*供应商名称</label>
                    <input class="easyui-validatebox" name="name" type="text" placeholder="请输入供应商名称" data-options="required:true,validType:'allName'" maxlength="50"
                    />
                </div>
                <div class="content-item">
                    <label>*售前联系人</label>
                    <input class="easyui-validatebox" name="presaleName" type="text" placeholder="请输入售前联系人姓名" data-options="required:true,validType:'allName'" maxlength="50"
                    />
                </div>
                <div class="content-item">
                    <label>*售前电话</label>
                    <input class="easyui-validatebox" name="presalePhone" type="text" placeholder="请输入售前电话" data-options="required:true,validType:'mobile'" maxlength="11"
                    />
                </div>
                <div class="content-item">
                    <label>售前邮箱</label>
                    <input class="easyui-validatebox" name="presaleMail" type="text" placeholder="请输入售前邮箱" data-options="validType:'email'" maxlength="50" />
                </div>
                <div class="content-item">
                    <label>*售后联系人</label>
                    <input class="easyui-validatebox" name="aftersaleName" type="text" placeholder="请输入售后联系人" data-options="required:true,validType:'allName'" maxlength="50"
                    />
                </div>
                <div class="content-item">
                    <label>*售后电话</label>
                    <input class="easyui-validatebox" name="aftersalePhone" type="text" placeholder="请输入售后电话" data-options="required:true,validType:'mobile'" maxlength="11"
                    />
                </div>
                <div class="content-item">
                    <label>售后邮箱</label>
                    <input class="easyui-validatebox" name="aftersaleMail" type="text" placeholder="请输入售后邮箱" data-options="validType:'email'" maxlength="50" />
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
            	<input type="hidden" name="id"/>
                <div class="content-item">
                    <label>*供应商名称</label>
                    <input class="easyui-validatebox" name="name" type="text" placeholder="请输入供应商名称" data-options="required:true,validType:'allName'" maxlength="50"
                    />
                </div>
                <div class="content-item">
                    <label>*售前联系人</label>
                    <input class="easyui-validatebox" name="presaleName" type="text" placeholder="请输入售前联系人姓名" data-options="required:true,validType:'allName'" maxlength="50"
                    />
                </div>
                <div class="content-item">
                    <label>*售前电话</label>
                    <input class="easyui-validatebox" name="presalePhone" type="text" placeholder="请输入售前电话" data-options="required:true,validType:'mobile'" maxlength="11"
                    />
                </div>
                <div class="content-item">
                    <label>售前邮箱</label>
                    <input class="easyui-validatebox" name="presaleMail" type="text" placeholder="请输入售前邮箱" data-options="validType:'email'" maxlength="50" />
                </div>
                <div class="content-item">
                    <label>*售后联系人</label>
                    <input class="easyui-validatebox" name="aftersaleName" type="text" placeholder="请输入售后联系人" data-options="required:true,validType:'allName'" maxlength="50"
                    />
                </div>
                <div class="content-item">
                    <label>*售后电话</label>
                    <input class="easyui-validatebox" name="aftersalePhone" type="text" placeholder="请输入售后电话" data-options="required:true,validType:'mobile'" maxlength="11"
                    />
                </div>
                <div class="content-item">
                    <label>售后邮箱</label>
                    <input class="easyui-validatebox" name="aftersaleMail" type="text" placeholder="请输入售后邮箱" data-options="validType:'email'" maxlength="50" />
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
    <script src="<%=basePath %>/front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath %>/front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath %>/front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
    <script src="<%=basePath %>/front/public/js/common.js"></script>
    <!-- <script src="../js/refresh.js"></script> -->
    <script src="<%=basePath %>/front/public/js/supplierConfig.js"></script>
</body>

</html>