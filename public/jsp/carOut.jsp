<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>车辆管理/出还车</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/carOut.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
<div class="body-wrapper">
    <div id="tab" class="easyui-tabs">
        <div title="出车" class="table-carOut">
            <table class="easyui-datagrid" id="carOut">
<!--                     <tbody>
                    <tr>
                        <td>运维</td>
                        <td>通勤车</td>
                        <td>川A76567</td>
                        <td>张江龙</td>
                        <td></td>
                        <td>1256445552</td>
                        <td></td>
                        <td>2017-12-54 12:54:10</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>运维</td>
                        <td>通勤车</td>
                        <td>川A76567</td>
                        <td>张江龙</td>
                        <td></td>
                        <td>1256445552</td>
                        <td></td>
                        <td>2017-12-54 12:54:10</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>运维</td>
                        <td>通勤车</td>
                        <td>川A76567</td>
                        <td>张江龙</td>
                        <td></td>
                        <td>1256445552</td>
                        <td></td>
                        <td>2017-12-54 12:54:10</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>运维</td>
                        <td>通勤车</td>
                        <td>川A76567</td>
                        <td>张江龙</td>
                        <td></td>
                        <td>1256445552</td>
                        <td></td>
                        <td>2017-12-54 12:54:10</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>运维</td>
                        <td>通勤车</td>
                        <td>川A76567</td>
                        <td>张江龙</td>
                        <td></td>
                        <td>1256445552</td>
                        <td></td>
                        <td>2017-12-54 12:54:10</td>
                        <td></td>
                    </tr>
                    </tbody> -->
                </table>
        </div>
        <div title="还车" class="table-carBack">
            <table class="easyui-datagrid" id="carBack">
<!--                 <tbody>
                <tr>
                    <td>运维</td>
                    <td>通勤车</td>
                    <td>川A76567</td>
                    <td>张江龙</td>
                    <td></td>
                    <td>1256445552</td>
                    <td></td>
                    <td>2017-12-54 12:54:10</td>
                    <td></td>
                </tr>
                <tr>
                    <td>运维</td>
                    <td>通勤车</td>
                    <td>川A76567</td>
                    <td>张江龙</td>
                    <td></td>
                    <td>1256445552</td>
                    <td></td>
                    <td>2017-12-54 12:54:10</td>
                    <td></td>
                </tr>
                <tr>
                    <td>运维</td>
                    <td>通勤车</td>
                    <td>川A76567</td>
                    <td>张江龙</td>
                    <td></td>
                    <td>1256445552</td>
                    <td></td>
                    <td>2017-12-54 12:54:10</td>
                    <td></td>
                </tr>
                <tr>
                    <td>运维</td>
                    <td>通勤车</td>
                    <td>川A76567</td>
                    <td>张江龙</td>
                    <td></td>
                    <td>1256445552</td>
                    <td></td>
                    <td>2017-12-54 12:54:10</td>
                    <td></td>
                </tr>
                <tr>
                    <td>运维</td>
                    <td>通勤车</td>
                    <td>川A76567</td>
                    <td>张江龙</td>
                    <td></td>
                    <td>1256445552</td>
                    <td></td>
                    <td>2017-12-54 12:54:10</td>
                    <td></td>
                </tr>
                </tbody> -->
            </table>
        </div>

    </div>
</div>
<div class="shade"></div>
<!--出车弹窗-->
<div class="popup carOut-wrapper">
    <div class="title">
        <span>出车</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="carOut-form" method="post">
            <div class="content-item">
                <label for="car-far">*当前公里数:</label>
                <input id="outKm" class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="" maxlength="10" />
            </div>
        </form>
    </div>
    <div class="footer">
        <div class="submit carOut-submit">提交</div>
    </div>
</div>
<!--出车二维码-->
<div class="popup outCode-wrapper">
    <div class="title">
        <span>出车二维码</span>
        <a class="close-popup">
            <i class="return-icon"></i>
        </a>
    </div>
    <div class="content">
        <div>
            <%-- <img src="<%=basePath %>/front/public/images/twoCode.png" alt=""> --%>
        </div>
        <p>PAD扫描取车！</p>
    </div>
</div>
<!--出车成功弹窗-->
<div class="popup carOut-success success-wrapper">
    <div class="content">
        <i></i>
        <span>提交成功！5s后自动关闭</span>
    </div>
    <div class="footer">
        <div class="submit btn-look">查看出车信息</div>
        <div class="submit btn-close">关闭</div>
    </div>
</div>
<!--更换车辆弹窗-->
<div class="popup carReplace-wrapper">
    <div class="title">
        <span>更换车辆</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="carReplace-form" method="post">
            <div class="content-item">
                <label for="car-type">车辆类型:</label>
                <span>通勤车</span>
            </div>
            <div class="content-item">
                <label for="car-num">*车牌号:</label>
                <select name="" id="change-car" class="car-num">
                    <option value="0">请选择车牌号</option>
                    <option value="1">AE86</option>
                    <option value="2">AE89</option>
                </select>
            </div>
        </form>
    </div>
    <div class="footer">
        <div class="submit carReplace-submit">提交</div>
    </div>
</div>
<!--更换车辆成功弹窗-->
<div class="popup carReplace-success success-wrapper">
    <div class="content">
        <i></i>
        <span>提交成功！5s后自动关闭</span>
    </div>
    <div class="footer">
        <div class="submit btn-close">关闭</div>
    </div>
</div>
<!--还车二维码-->
<div class="popup backCode-wrapper">
    <div class="title">
        <span>还车二维码</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <div>
            <img src="<%=basePath %>/front/public/images/twoCode.png" alt="">
        </div>
        <p>PAD扫描还车！</p>
    </div>
</div>
<!--还车信息弹窗-->
<div class="popup carBack-wrapper">
    <div class="title">
        <span>还车信息</span>
        <a class="close-popup">
            <i class="return-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="carBack-form" method="post" enctype="multipart/form-data">
            <div class="content-item">
                <label for="back-far">*当前公里数:</label>
                <input id="intKm" class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="" maxlength="10" />
            </div>
            <div class="content-item">
                <label for="back-cost">*产生费用:</label>
                <div>
                    <span>
                        <a class="radio-wrapper radio-checked">
                        <i></i>
                        <input type="radio" name="cost" checked="checked">
                        </a>是
                    </span>
                    <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" name="cost">
                        </a>否
                    </span>
                </div>
            </div>
            <div class="back-node">
                <div class="back-cost">
                    <div class="content-item">
                        <label for="back-title">费用明细</label>
                    </div>
                    <div class="content-item">
                        <label for="back-type">*类型:</label>
                        <select name="" id="back-type" class="back-type costType">
                            <option value="0">请选择费用类型</option>
                            <option value="1">油费</option>
                            <option value="2">其它</option>
                        </select>
                    </div>
                    <div class="content-item">
                        <label for="back-cost">*金额:</label>
                        <input class="easyui-validatebox money" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="请输入金额" maxlength="12" />
                        <!--<input class="easyui-validatebox oil-input" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="请输入加多少升" maxlength="6" />-->
                    </div>
                    <div class="content-item">
                        <label for="station-picture">*发票照片:</label>
                        <div class="inputFile carBack-picture">
                            <input type="file" name="files">
                            <span>上传</span>
                            <span>支持.jpg/.png/.JPEG</span>
                        </div>
                    </div>
                </div>
                <div class="content-item">
                    <div class="carBack-add"><i></i>添加费用明细</div>
                </div>
            </div>
        </form>
    </div>
    <div class="footer">
        <div class="submit carBack-submit">提交</div>
    </div>
</div>
<!--还车成功弹窗-->
<div class="popup carBack-success success-wrapper">
    <div class="content">
        <i></i>
        <span>提交成功！5s后自动关闭</span>
    </div>
    <div class="footer">
        <div class="submit btn-look">查看还车信息</div>
        <div class="submit btn-close">关闭</div>
    </div>
</div>
<script src="<%=basePath %>/front/public/js/jquery-3.2.1.min.js"></script>
<script src="<%=basePath %>/front/public/js/jquery.easyui.min.js"></script>
<script src="<%=basePath %>/front/public/js/jquery.qrcode.js"></script>
<script src="<%=basePath %>/front/public/js/utf.js"></script>
<script src="<%=basePath %>/front/public/js/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath %>/front/public/js/swiper-3.4.2.min.js"></script>
<script src="<%=basePath %>/front/public/js/common.js"></script>
<script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
<script src="<%=basePath %>/front/public/js/carOut.js"></script>
</body>
</html>