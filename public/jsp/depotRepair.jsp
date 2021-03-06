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
    <title>仓库管理/维修</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/depotRepair.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
<div class="body-wrapper">
    <div class="search-wrapper">
        <select id="deportId">
	        <c:forEach var="deport" items="${deports}">
	            <option value="${deport.id}">${deport.name}</option>
	        </c:forEach>
        </select>
    </div>
    <div class="table-wrapper">
        <table class="easyui-datagrid" id="dg">
           <!--  <tbody>
            <tr>
                <td>内修工单</td>
                <td>1256445552</td>
                <td>张江龙</td>
                <td></td>
                <td>2017-12-54 12:54:10</td>
                <td></td>
                <td></td>
            </tr>
            </tbody> -->
        </table>
    </div>
</div>
<div class="shade"></div>
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
<!--清单详情弹窗-->
<div class="popup detail-wrapper">
    <div class="title">
        <span>清单</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <table class="easyui-datagrid" id="detail-table">
            <!-- <tr>
                <td>设备</td>
                <td>潜污泵</td>
                <td></td>
                <td>255466554</td>
                <td>潜污泵A</td>
                <td>耐得</td>
                <td>N125</td>
                <td></td>
            </tr> -->
        </table>
    </div>
</div>
<!--出库二维码-->
<div class="popup outCode-wrapper">
    <div class="title">
        <span>出库二维码</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <div>
            <img src="<%=basePath %>/front/public/images/twoCode.png" alt="">
        </div>
        <p>PAD扫描领取！</p>
    </div>
</div>
<!--外修出库-->
<div class="popup out-wrapper">
    <div class="title">
        <span>凭证码填写</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="out-form" method="post" action="addOutRepairFactory">
            <div class="content-item">
                <label for="">凭证码:</label>
                <input type="hidden" id="outRepairId" name="id">
                <input name="voucher" class="easyui-validatebox" type="text" data-options="required:true,validType:'numInt'" placeholder="请输收据凭证" maxlength="20" />
            </div>
        </form>
    </div>
    <div class="footer">
        <div class="submit out-submit">提交</div>
    </div>
</div>
<!--出库成功弹窗-->
<div class="popup depotOut-success success-wrapper">
    <div class="content">
        <i></i>
        <span>出库成功! <span>出库单号：<span>2017112810</span></span></span>
    </div>
    <div class="footer">
        <div class="submit btn-look">查看出库信息</div>
        <div class="submit btn-close">关闭</div>
    </div>
</div>
<!--补领弹窗-->
<div class="popup replacement-wrapper">
    <div class="title">
        <span>补领</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <div class="replacement-add"><i></i>添加物资</div>
        <div>
            <table class="easyui-datagrid" id="replacement-table">
                <!-- <tr>
                    <td>平窝乡污水处理厂</td>
                    <td>维修</td>
                    <td>潜污泵</td>
                    <td>设备</td>
                    <td>PCA</td>
                    <td></td>
                    <td>255466554</td>
                    <td>潜污泵A</td>
                    <td>耐得</td>
                    <td>N125</td>
                    <td></td>
                </tr>
                 -->
            </table>
        </div>
    </div>
    <div class="footer">
        <div class="submit replacement-submit">出库</div>
    </div>
</div>
<!--补领扫码弹窗-->
<div class="popup replacement-scan-wrapper">
    <div class="title">
        <span>补领</span>
        <a class="close-popup">
            <i class="return-icon"></i>
        </a>
    </div>
    <div class="content">
        <img src="<%=basePath %>/front/public/images/depot.png" alt="">
        <p>请用扫码枪扫描该物资的二维码!</p>
        <input type="text" id="binding" placeholder="请手动输入二维码">
    </div>
</div>
<!--回库弹窗-->
<div class="popup back-wrapper">
    <div class="title">
        <span>回库</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
 	
    	<form action="updateBackRepair" id="back-form" method="post">
    <div class="content">
	    	<input type="hidden" id="backId" name="id">
	        <div>
	            <table class="easyui-datagrid " id="back-table">
	            </table>
	        </div>
	        <p>累计：￥<span id="total-money">0</span></p>
    </div>
        </form>
   	
    <div class="footer">
        <div class="submit back-submit">提交</div>
    </div>
</div>
<!--补领添加物资弹窗-->
<div class="popup add-wrapper">
    <div class="title">
        <span>添加物资</span>
        <a class="close-popup">
            <i class="return-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="add-form" method="post" action="addRepairPart">
            <!-- <div class="content-item">
                <label for="station">*任务类型:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择任务类型</option>
                    <option value="1">厂站1</option>
                </select>   
            </div>-->
            <div class="content-item">
                <label for="station">*任务对象:</label>
                <select id="rep-obj" name="taskId" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择任务对象</option>
                </select>
            </div>
            <div class="content-item">
                <label for="station">*物资类型:</label>
                <select id="rep-type" name="typeId" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择物资类型</option>
                    <option value="1">设备</option>
                    <option value="2">部件</option>
                    <option value="3">药剂</option>
                </select>
            </div>
            <div class="content-item">
                <label for="station">*物资供应商:</label>
                <select id="rep-supp" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择供应商名称</option>
                </select>
            </div>
            <div class="content-item">
                <label for="station">*物资模板:</label>
                <select id="rep-temp" name="tempId" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择物资模板</option>
                </select>
            </div>
        </form>
    </div>
    <div class="footer">
        <div class="submit add-submit">添加</div>
    </div>
</div>

<script src="<%=basePath %>/front/public/js/jquery-3.2.1.min.js"></script>
<script src="<%=basePath %>/front/public/js/jquery.easyui.min.js"></script>
<script src="<%=basePath %>/front/public/js/jquery.qrcode.js"></script>
<script src="<%=basePath %>/front/public/js/utf.js"></script>
<script src="<%=basePath %>/front/public/js/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath %>/front/public/js/common.js"></script>
<script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
<script src="<%=basePath %>/front/public/js/depotRepair.js"></script>
</body>
</html>