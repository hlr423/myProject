<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>仓库管理/出入库</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/depotInto.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>

<div class="body-wrapper">
    <div id="tab" class="easyui-tabs">
        <div title="入库">
            <div class="search-wrapper">
                <select id="deportId">
                	<c:if test="${empty deports}">
                		<option value="0">无仓库</option>
                	</c:if>
                	<c:if test="${!empty deports}">
			        <c:forEach var="deport" items="${deports}">
			            <option value="${deport.id }">${deport.name }</option>
			        </c:forEach>
			        </c:if>
		        </select>
                
                <!-- <div class="search-btn into-search">搜索</div> -->
            </div>
            <div class="scan">
                <img src="${pageContext.request.contextPath}/front/public/images/depot.png" alt="">
                <div>
                    <form class="scan-into-form" method="post">
                        <p>请用扫码枪扫描该物资的二维码!或</p>
                        <input type="text" name="qrcode" id="qrcode" class="easyui-validatebox" data-options="validType:'englishNumber',required:true" maxlength="30" placeholder="请手动输入二维码编号">
                        <div class="scan-submit">提交</div>
                    </form>
                </div>
            </div>
            <div class="table-depotInto">
                <table class="easyui-datagrid" id="depotInto">
                    <tbody>
                    

                    </tbody>
                </table>
            </div>
            <div class="into-submit">
                提交
            </div>
        </div>
        <div title="出库">
            <div class="search-wrapper">
                <select id="deportId2">
                    <c:forEach var="deport" items="${deports}">
			            <option value="${deport.id }">${deport.name }</option>
			        </c:forEach>
                </select>
            </div>
            <div class="table-depotOut">
                <table class="easyui-datagrid" id="depotOut">
                   	
                </table>
            </div>
        </div>
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
<!--入库弹窗-->
<div class="popup depotInto-wrapper">
    <div class="title">
        <span>入库</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="depotInto-form" method="post">
            <div class="content-item">
                <label for="depot-type">*类型:</label>
                <div>
                    <span>
                        <a class="radio-wrapper radio-checked" onclick="addMatter(0)">
                        <i></i>
                        <input type="radio" name="type" value="0" checked="checked">
                        </a>设备
                    </span>
                    <span>
                        <a class="radio-wrapper" onclick="addMatter(1)">
                        <i></i>
                        <input type="radio" name="type" value="1">
                        </a>部件
                    </span>
                    <span>
                        <a class="radio-wrapper" onclick="addMatter(2)">
                        <i></i>
                        <input type="radio" name="type" value="2">
                        </a>药剂
                    </span>
                </div>
            </div>
            <div class="content-item">
                <label for="name">*供应商:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" name="templateSupplier" id="templateSupplier">
                    <!-- <option value="0">请选择模板</option>
                    <option value="1">模板1</option>
                    <option value="2">模板2</option> -->
                </select>
            </div>
            <div class="content-item">
                <label for="brand">*物资模板:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" name="templateMatter" id="templateMatter">
                    <!-- <option value="0">请选择品牌</option>
                    <option value="1">模板1-xx-xxx</option>
                    <option value="2">模板2-xx-xxx</option> -->
                </select>
            </div>
            <!-- <div class="content-item">
                <label for="name">*规格型号:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" name="templateModel" id="templateModel">
                    <option value="0">请选择规格型号</option>
                    <option value="1">模板1</option>
                    <option value="2">模板2</option>
                </select>
            </div>
            <div class="content-item">
                <label for="name">*供应商:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" name="templateSupplier" id="templateSupplier">
                    <option value="0">请选择供应商</option>
                    <option value="1">模板1</option>
                    <option value="2">模板2</option>
                </select>
            </div> -->
        </form>
    </div>
    <div class="footer">
        <div class="submit depotInto-submit">添加</div>
    </div>
</div>
<!--清单弹窗-->
<div class="popup detail-wrapper">
    <div class="title">
        <span>清单</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <!-- <div class="detail-add"><i></i>添加物资</div> -->
        <div>
            <table class="easyui-datagrid" id="detail-table">
                
            </table>
        </div>
    </div>
    <div class="footer">
        <div class="submit detail-submit">提交</div>
    </div>
</div>
<!--清单扫码弹窗-->
<!-- <div class="popup scan-wrapper">
    <div class="title">
        <span>清单</span>
        <a class="close-popup">
            <i class="return-icon"></i>
        </a>
    </div>
    <div class="content">

            <div class="scan">
                <img src="../images/depot.png" alt="">
                <div>
                    <p>请用扫码枪扫描该物质的二维码!或</p>
                    <input type="text" id="outQrcode" class="easyui-validatebox" data-options="validType:'englishNumber',required:true" maxlength="30" placeholder="请手动输入二维码编码">
                </div>
            </div>

    </div>
</div> -->
<!--添加物资弹窗-->
<!--<div class="popup add-wrapper">
    <div class="title">
        <span>添加物资</span>
        <a class="close-popup">
            <i class="return-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="add-form" method="post">
            <div class="content-item">
                <label for="station">*厂站:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择厂站</option>
                    <option value="1">厂站1</option>
                </select>
            </div>
            <div class="content-item">
                <label for="station">*任务类型:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择任务类型</option>
                    <option value="1">厂站1</option>
                </select>
            </div>
            <div class="content-item">
                <label for="station">*任务对象:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择任务对象</option>
                    <option value="1">厂站1</option>
                </select>
            </div>
            <div class="content-item">
                <label for="station">*物资类型:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择物资类型</option>
                    <option value="1">厂站1</option>
                </select>
            </div>
            <div class="content-item">
                <label for="station">*物资模板名称:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择物资模板名称</option>
                    <option value="1">厂站1</option>
                </select>
            </div>
        </form>
    </div>
    <div class="footer">
        <div class="submit add-submit">添加</div>
    </div>
</div>-->
<!--备货弹窗-->
<div class="popup stocking-wrapper">
    <div class="title">
        <span>备货</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <div class="stocking-add"><i></i>添加物资</div>
        <div>
            <table class="easyui-datagrid" id="stocking-table">
            </table>
        </div>
    </div>
    <div class="footer">
        <div class="submit stocking-submit">提交</div>
    </div>
</div>
<!--备货添加物资弹窗-->
<div class="popup stocking-add-wrapper">
    <div class="title">
        <span>添加物资</span>
        <a class="close-popup">
            <i class="return-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="stocking-add-form" method="post">
        	<input type="hidden" name="workSheetId" id="workSheetId"/>
            <div class="content-item">
                <label for="station">*厂站:</label>
                <select id="weekStat" name="stationId" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择厂站</option>
                    
                </select>
            </div>
            <!-- <div class="content-item">
                <label for="station">*任务类型:</label>
                <select id="weekTaskt" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择任务类型</option>
                    
                </select>
            </div> -->
            <div class="content-item">
                <label for="station">*任务对象:</label>
                <select id="weekTaskn" name="taskId" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择任务对象</option>
                    
                </select>
            </div>
            <div class="content-item">
                <label for="station">*物资类型:</label>
                <select id="weekMatt" name="type" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择物资类型</option>
                    <option value="1">设备</option>
                    <option value="2">部件</option>
                    <option value="3">药剂</option>
                </select>
            </div>
            <div class="content-item">
                <label for="station">*物资供应商:</label>
                <select id="weekSupp" name="supplier" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择供应商名称</option>
                </select>
            </div>
            <div class="content-item">
                <label for="station">*物资模板对象:</label>
                <select id="weekTemp" name="templateId" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择物资模板对象</option>
                    
                </select>
            </div>
        </form>
    </div>
    <div class="footer">
        <div class="submit stocking-add-submit">添加</div>
    </div>
</div>
<!--备货扫码弹窗-->
<div class="popup stocking-scan-wrapper">
    <div class="title">
        <span>备货</span>
        <a class="close-popup">
            <i class="return-icon"></i>
        </a>
    </div>
    <div class="content">
            <div class="scan">
                <img src="${pageContext.request.contextPath}/front/public/images/depot.png" alt="">
                <div>
                    <p>请用扫码枪扫描该物资的二维码!或</p>
                    <input type="text" id="stockQrcode" class="easyui-validatebox" data-options="validType:'englishNumber',required:true" maxlength="30" placeholder="请手动输入二维码编号">
                </div>
            </div>
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
                <tr>
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
                <tr>
                    <td>平窝乡污水处理厂</td>
                    <td>维修</td>
                    <td>潜污泵</td>
                    <td>设备</td>
                    <td>PCA</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>平窝乡污水处理厂</td>
                    <td>维修</td>
                    <td>潜污泵</td>
                    <td>设备</td>
                    <td>PCA</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>平窝乡污水处理厂</td>
                    <td>维修</td>
                    <td>潜污泵</td>
                    <td>设备</td>
                    <td>PCA</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    </div>
    <div class="footer">
        <div class="submit replacement-submit">提交</div>
    </div>
</div>
<!--补领添加物资弹窗-->
<div class="popup replacement-add-wrapper">
    <div class="title">
        <span>添加物资</span>
        <a class="close-popup">
            <i class="return-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="replacement-add-form" method="post">
        	<input type="hidden" name="workSheetId" id="workSheetId2"/>
            <div class="content-item">
                <label for="station">*厂站:</label>
                <select name="stationId" id="weekStat2" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择厂站</option>
                    
                </select>
            </div>
            <!-- <div class="content-item">
                <label for="station">*任务类型:</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择任务类型</option>
                    <option value="1">厂站1</option>
                </select>
            </div> -->
            <div class="content-item">
                <label for="station">*任务对象:</label>
                <select id="weekTaskn2" name="taskId" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择任务对象</option>
                    
                </select>
            </div>
            <div class="content-item">
                <label for="station">*物资类型:</label>
                <select id="weekMatt2" name="type" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择物资类型</option>
                    <option value="1">设备</option>
                    <option value="2">部件</option>
                    <option value="3">药剂</option>
                </select>
            </div>
            <div class="content-item">
                <label for="station">*物资供应商:</label>
                <select id="weekSupp2" name="supplier" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择供应商名称</option>
                </select>
            </div>
            <div class="content-item">
                <label for="station">*物资模板对象:</label>
                <select id="weekTemp2" name="templateId" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                    <option value="0">请选择物资模板对象</option>
                    
                </select>
            </div>
        </form>
    </div>
    <div class="footer">
        <div class="submit replacement-add-submit">添加</div>
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
            <div class="scan">
                <img src="${pageContext.request.contextPath}/front/public/images/depot.png" alt="">
                <div>
                    <p>请用扫码枪扫描该物资的二维码!或</p>
                    <input type="text" id="replaceQrcode" class="easyui-validatebox" data-options="validType:'englishNumber',required:true" maxlength="30" placeholder="请手动输入二维码编号">
                </div>
            </div>
    </div>
</div>
<!--出库单二维码-->
<div class="popup outCode-wrapper">
    <div class="title">
        <span>出库单二维码</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <div>
            <%-- <img src="${pageContext.request.contextPath}/front/public/images/twoCode.png" alt=""> --%>
        </div>
        <p>PAD扫描领取！</p>
    </div>
</div>
<!--出库成功弹窗-->
<div class="popup depotOut-success">
    <div class="content">
        <i></i>
        <span>提交成功！5s后自动关闭</span>
    </div>
    <div class="footer">
        <div class="submit btn-look">查看出库信息</div>
        <div class="submit btn-close">关闭</div>
    </div>
</div>

<script src="<%=basePath %>/front/public/js/jquery-3.2.1.min.js"></script>
<script src="<%=basePath %>/front/public/js/jquery.easyui.min.js"></script>
<script src="<%=basePath %>/front/public/js/jquery.qrcode.js"></script>
<script src="<%=basePath %>/front/public/js/utf.js"></script>
<script src="<%=basePath %>/front/public/js/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath %>/front/public/js/common.js"></script>
<script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
<script src="<%=basePath %>/front/public/js/depotInto.js"></script>
</body>
</html>