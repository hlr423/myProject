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
    <title>价格配置</title>
    <link rel="stylesheet" href="<%=basePath %>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>front/public/css/priceConfig.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
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
                        <td>水价</td>
                        <td>150元</td>
                    </tr>
                </tbody> -->
            </table>
        </div>
    </div>
    <div class="shade"></div>
    <!-- 新建 -->
    <div class="popup new-popup">
        <div class="title">
            <span>新建</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <form id="newForm" action="addPrice"  method="post">
                <div class="content-item">
                    <label>名称*</label>
                    <input class="easyui-validatebox" id="addName" type="text" placeholder="请输入名称" data-options="required:true,validType:'allName'" maxlength="50"
                    />
                </div>
                <div class="content-item">
                    <label>价格*</label>
                    <input class="easyui-validatebox" id="addPrice" type="text" placeholder="请输入价格" data-options="required:true,validType:'positiveTwo'" maxlength="50"
                    />
                </div>
                 <input id="addingPrice" type="hidden" value="" name="price">
            </form>
        </div>
        <div class="footer">
            <div class="submit new-submit">提交</div>
        </div>
    </div>
    <!-- 编辑 -->
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
                    <label>名称*</label>
                    <input class="easyui-validatebox" id="editName" type="text" placeholder="请输入名称" data-options="required:true,validType:'allName'" maxlength="50"
                    />
                </div>
                <div class="content-item">
                    <label>价格*</label>
                    <input class="easyui-validatebox" id="editPrice" type="text" placeholder="请输入价格" data-options="required:true,validType:'positiveTwo'" maxlength="50"
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
    <script src="<%=basePath %>front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath %>front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath %>front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath %>front/public/js/laydate/laydate.js"></script>
    <script src="<%=basePath %>front/public/js/customPrompt.js"></script>
    <script src="<%=basePath %>front/public/js/common.js"></script>
    <!-- <script src="../js/refresh.js"></script> -->
    <script src="<%=basePath %>front/public/js/priceConfig.js"></script>
</body>

</html>