<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>仓库管理/盘点</title>
    <link rel="stylesheet" href="<%=basePath%>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>/front/public/css/depotIventory.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
<div class="body-wrapper">
    <div class="scan">
        <img src="<%=basePath%>/front/public/images/depot.png" alt="">
        <div>
            <p>请用扫码枪扫描该物质的二维码!或</p>
            <input type="text" class="easyui-validatebox" data-options="validType:'englishNumber'" maxlength="30" placeholder="请手动输入二维码编号" id="qrcode">
            <div class="scan-submit">提交</div>
        </div>
    </div>
    <div class="table-wrapper">
        <table class="easyui-datagrid" id="dg">
            <tbody>
           <!--  <tr>
                <td>设备</td>
                <td>潜污泵</td>
                <td></td>
                <td>255466554</td>
                <td>潜污泵</td>
                <td>耐得</td>
                <td>N123</td>
                <td>耐得</td>
                <td></td>
            </tr> -->
            </tbody>
        </table>
    </div>
    <div class="table-submit">
        保存
    </div>
</div>
<div class="shade"></div>
<!--盘点成功弹窗-->
<div class="popup inventory-success-wrapper  success-wrapper">
    <div class="content">
        <i></i>
        <span>提交成功!5S后自动关闭</span>
    </div>
    <div class="footer">
        <div class="submit btn-look">查看盘点信息</div>
        <div class="submit btn-close">关闭</div>
    </div>
</div>
<div class="popup inventory-prompt-wrapper  success-wrapper">
    <div class="content">
        <i></i>
        <span id="tip">提示：<span>还有3个潜污泵、2瓶PAC药剂未盘点</span>，确认提交？</span>
    </div>
    <div class="footer">
        <div class="submit btn-submit">提交</div>
        <div class="submit btn-continue">继续盘点</div>
    </div>
</div>
<script src="<%=basePath%>/front/public/js/jquery-3.2.1.min.js"></script>
<script src="<%=basePath%>/front/public/js/jquery.easyui.min.js"></script>
<script src="<%=basePath%>/front/public/js/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath%>/front/public/js/common.js"></script>
<script src="<%=basePath%>/front/public/js/customPrompt.js"></script>
<script src="<%=basePath%>/front/public/js/depotIventory.js"></script>
</body>
</html>