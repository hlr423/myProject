<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>个人中心/我的资质</title>
    <link rel="stylesheet" href="<%=basePath%>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/swiper-3.4.2.min.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/personQualify.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
<div class="body-wrapper">
    <div class="search-wrapper">
        <input id="keyword" type="text" placeholder="关键字(证件名、发证单位、所属人)">
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
            <!-- JS -->
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
        <form class="newAdd-form" method="post" action="addCertification" enctype="multipart/form-data">
            <div class="content-item">
                <label for="station-name">*证件名称:</label>
                <input name="name" class="easyui-validatebox" type="text" data-options="required:true,validType:'allName'" placeholder="请输入证件名称" maxlength="50" />
            </div>
            <div class="content-item">
                <label for="station-region">*证件编号:</label>
                <input name="number" class="easyui-validatebox" type="text" data-options="required:true,validType:'englishNumber'" placeholder="请输入证件编号" maxlength="30" />
            </div>
            <div class="content-item">
                <label for="station-address">*发证单位:</label>
                <input name="department" class="easyui-validatebox" type="text" data-options="required:true,validType:'allName'" placeholder="请输入发证单位" maxlength="50" />
            </div>
            <div class="content-item">
                <label for="station-address">*有效期:</label>
                <input name="invalidateTime" class="easyui-validatebox chose-time" data-options="required:true,validType:'date'" type="text" placeholder="请选择时间"/>
            </div>
            <div class="content-item">
                <label for="station-picture">*上传证件:</label>
                <div class="inputFile card-picture">
                    <input name="images" type="file" multiple="multiple">
                    <span><i></i>上传文件</span>
                    <span state="1">支持.jpg/.png/.JPEG</span>
                </div>
            </div>
        </form>
    </div>
    <div class="footer">
        <div class="submit newAdd-submit">提交</div>
    </div>
</div>
<!--审核弹窗-->
<div class="popup approval-wrapper">
    <div class="title">
        <span>审核</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        请仔细核对证书,核对无误后审核!
    </div>
    <div class="footer">
        <div class="submit approval-submit-no">不通过</div>
        <div class="submit approval-submit-yes">通过</div>
    </div>
</div>
<!--不通过弹窗-->
<div class="popup approval-no-wrapper">
    <div class="title">
        <span>审核</span>
        <a class="close-popup">
            <i class="return-icon"></i>
        </a>
    </div>
    <div class="content">
        <textarea placeholder="请输入不通过原因"></textarea>
    </div>
    <div class="footer">
        <div class="submit approval-no-submit">提交</div>
    </div>
</div>
<!--证书弹窗-->
<div class="popup picture-wrapper">
    <div class="title">
        <span>证书照片</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
		       <!-- JS -->     
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
<script src="<%=basePath%>front/public/js/swiper-3.4.2.min.js"></script>
<script src="<%=basePath%>front/public/js/laydate/laydate.js"></script>
<script src="<%=basePath%>front/public/js/common.js"></script>
<script src="<%=basePath%>front/public/js/customPrompt.js"></script>
<!--<script src="../js/refresh.js"></script> -->
<script src="<%=basePath%>front/public/js/personQualify.js"></script>
</body>
</html>