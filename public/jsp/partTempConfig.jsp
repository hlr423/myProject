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
    <title>部件模板初始化</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/select2.css">
    <link rel="stylesheet" href="<%=basePath%>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>/front/public/css/partTemplateConfig.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
<div class="body-wrapper">
    <div class="search-wrapper">
     <select id="supplier" >
            	<option value="0">请选择供应商</option>
            	<c:forEach items="${suppliers}" var="supplier">
                	<option value="${supplier.id}">${supplier.name}</option>
            	</c:forEach>
            </select>
        <input type="text" placeholder="请输入模板名称/品牌/规格型号/供应商" id="searchName">
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
           <!--  <tbody>
            <tr>
                <td>减速器</td>
                <td>耐得</td>
                <td>BWED120-289</td>
                <td>个</td>
                <td>1258</td>
                <td>12</td>
                <td></td>
                <td>12</td>
                <td></td>
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
<!--新建弹窗-->
<div class="popup newAdd-wrapper">
    <div class="title">
        <span>新建</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="newAdd-form" method="post" action="addPartTemp"  enctype="multipart/form-data">
        	<input id="add-eq-part" type="hidden" value="" name="equipTempIds">
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span>1</span></span>
                        基础信息
                    </div>
                    <div class="line"></div>
                    <div>
                        <span><span>2</span></span>
                        关联设备模版
                    </div>
                </div>
                <div class="content-item">
                    <label for="part-name">*部件模板名称:</label>
                    <input class="easyui-validatebox" id="add-name" name="name" type="text" data-options="required:true" maxlength="50" placeholder="请输入部件模板名称" />
                </div>
                <div class="content-item">
                    <label for="part-brand">*品牌:</label>
                    <input class="easyui-validatebox" id="add-brand" name="brand" type="text" data-options="required:true" maxlength="50" placeholder="请输入品牌" />
                </div>
                <div class="content-item">
                    <label for="part-type">*规格型号:</label>
                    <input class="easyui-validatebox" id="add-spec" name="spec" type="text" data-options="required:true" maxlength="50" placeholder="请输入规格型号" />
                </div>
                <div class="content-item">
                    <label for="part-type">*单位:</label>
                    <input class="easyui-validatebox" id="add-unit" name="unit" type="text" data-options="required:true" maxlength="10" placeholder="请输入单位" />
                </div>
                <div class="content-item">
                    <label for="part-type">*价格:</label>
                    <input class="easyui-validatebox" id="add-price" name="price" type="text" data-options="required:true,validType:'positiveTwo'" maxlength="11" placeholder="请输入价格(元)" />
                </div>
                <div class="content-item">
                    <label for="part-type">*保修期:</label>
                    <input class="easyui-validatebox" id="add-warranty" name="warranty" type="text" data-options="required:true,validType:'positiveInt'" maxlength="3" placeholder="请输入保修期(月)" />
                </div>
                <div class="content-item">
                    <label for="equipment-factory">*供应商:</label>
                    <select class="easyui-validatebox part-factory add-supply" name="supplierId" id="add-supply" data-options="validType:'selectValueRequired'">
                        <option value="0">请选择</option>
                        <option value="1">耐得</option>
                        <option value="2">二级</option>
                        <option value="3">三级</option>
                    </select>
                </div>
                <div class="content-item">
                    <label for="part-type">*供货周期:</label>
                    <input class="easyui-validatebox" id="add-supplyCycle" name="supplyCycle" type="text" data-options="required:true,validType:'positiveSup'" maxlength="3" placeholder="请输入供货周期(天)" />
                </div>
                <div class="content-item">
                    <label>模板照片:</label>
                    <div class="inputFile part-picture">
                        <input type="file" name="pic">
                        <span><i></i>上传文件</span>
                        <span>支持.jpg/.png/.JPEG</span>
                    </div>
                </div>
                <div class="content-item">
                    <label for="task-isTest">*是否重要:</label>
                    <div>
                    <span>
                        <a class="radio-wrapper radio-checked">
                        <i></i>
                        <input type="radio" value="true" name="important" checked="checked">
                        </a>是
                    </span>
                        <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" value="false" name="important">
                        </a>否
                    </span>
                    </div>
                </div>
            </div>
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span><i></i></span></span>
                        基础信息
                    </div>
                    <div class="line line-green"></div>
                    <div>
                        <span class="green"><span>2</span></span>
                        关联设备模版
                    </div>
                </div>
                <div class="content-item">
                    <label for="equipment-template">设备模板名称:</label>
                    <select name="" id="add-eq-type" style="width:200px"></select>
                    <label for="equipment-brande">品牌:</label>
                    <select name="" id="add-eq-brand" style="width:200px"></select>
                </div>
                <div class="content-item">
                    <label for="equipment-name">规格型号:</label>
                    <select name="" id="add-eq-spec" style="width:200px"></select>
                    <label for="equipment-name">供货商:</label>
                    <select name="" id="add-eq-factory" style="width:200px"></select>
                </div>
                <div class="content-item">
                    <p><span class="allData">共<span id="add-eq-num">1254</span>条数据</span> &nbsp|&nbsp<span class="checkedData">[已选<span class="part-add-data">0</span>]</span></p>
                    <div class="table-div">
                        <table id="partAdd-table" class="easyui-datagrid part-datagrid">
                        </table>
                    </div>
                    <div class="table-div-checked">
                        <table id="partAdd-table-checked" class="easyui-datagrid">

                        </table>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="footer">
        <div class="submit newAdd-prev">上一步</div>
        <div class="submit newAdd-next submit-show">下一步</div>
        <div class="submit newAdd-submit">提交</div>
    </div>
</div>
<!--编辑弹窗-->
<div class="popup edit-wrapper">
    <div class="title">
        <span>编辑</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <form class="edit-form" method="post" action="updatePartTemp"  enctype="multipart/form-data">
        	<input type="hidden" name="id" id="edit-id">
        	<input type="hidden" name="equipTempIds" id="edit-eq-part">
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span>1</span></span>
                        基础信息
                    </div>
                    <div class="line"></div>
                    <div>
                        <span><span>2</span></span>
                        关联设备模版
                    </div>
                </div>
                <div class="content-item">
                    <label for="part-name">*部件模板名称:</label>
                    <input class="easyui-validatebox" type="text" id="edit-name" name="name" data-options="required:true" maxlength="50" placeholder="请输入部件模板名称" />
                </div>
                <div class="content-item">
                    <label for="part-brand">*品牌:</label>
                    <input class="easyui-validatebox" type="text" id="edit-brand" name="brand" data-options="required:true" maxlength="50" placeholder="请输入品牌" />
                </div>
                <div class="content-item">
                    <label for="part-type">*规格型号:</label>
                    <input class="easyui-validatebox" type="text" id="edit-spec" name="spec" data-options="required:true" maxlength="50" placeholder="请输入规格型号" />
                </div>
                <div class="content-item">
                    <label for="part-type">*单位:</label>
                    <input class="easyui-validatebox" type="text" id="edit-unit" name="unit" data-options="required:true" maxlength="10" placeholder="请输入单位" />
                </div>
                <div class="content-item">
                    <label for="part-type">*价格:</label>
                    <input class="easyui-validatebox" type="text" id="edit-price" name="price" data-options="required:true,validType:'positiveTwo'" maxlength="11" placeholder="请输入价格(元)" />
                </div>
                <div class="content-item">
                    <label for="part-type">*保修期:</label>
                    <input class="easyui-validatebox" type="text" id="edit-warranty" name="warranty" data-options="required:true,validType:'positiveInt'" maxlength="3" placeholder="请输入保修期(月)" />
                </div>
                <div class="content-item">
                    <label for="equipment-factory">*供应商:</label>
                    <select class="easyui-validatebox part-factory edit-supply" name="supplierId" id="edit-supply" data-options="validType:'selectValueRequired'">
                    </select>
                </div>
                <div class="content-item">
                    <label for="part-type">*供货周期:</label>
                    <input class="easyui-validatebox" type="text" id="edit-supplyCycle" name="supplyCycle" data-options="required:true,validType:'positiveSup'" maxlength="3" placeholder="请输入供货周期(天)" />
                </div>
                <div class="content-item">
                    <label>模板照片:</label>
                    <div class="inputFile edit-picture">
                        <input type="file" name="pic">
                        <span><i></i>上传文件</span>
                        <span>支持.jpg/.png/.JPEG</span>
                    </div>
                </div>
                <div class="content-item">
                    <label>模版原照片:</label>
                    <a class="old-picture">
                        <i></i>照片
                        <div>
                            <img src="../images/twoCode.png" alt="" id="edit-pic" >
                        </div>
                    </a>
                </div>
                <div class="content-item">
                    <label for="task-isTest">*是否重要:</label>
                    <div id="edit-imp">
                    <!-- <span>
                        <a class="radio-wrapper radio-checked">
                        <i></i>
                        <input type="radio" name="important" value="true" checked="checked">
                        </a>是
                    </span>
                        <span>
                        <a class="radio-wrapper">
                        <i></i>
                        <input type="radio" value="false" name="important">
                        </a>否
                    </span> -->
                    </div>
                </div>
            </div>
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span><i></i></span></span>
                        基础信息
                    </div>
                    <div class="line line-green"></div>
                    <div>
                        <span class="green"><span>2</span></span>
                        关联设备模版
                    </div>
                </div>
                <div class="content-item">
                    <label for="equipment-template">设备模板名称:</label>
                    <select name="" id="edit-eq-type" style="width:200px"></select>
                    <label for="equipment-brande">品牌:</label>
                    <select name="" id="edit-eq-brand" style="width:200px"></select>
                </div>
                <div class="content-item">
                    <label for="equipment-name">规格型号:</label>
                    <select name="" id="edit-eq-spec" style="width:200px"></select>
                    <label for="equipment-name">供货商:</label>
                    <select name="" id="edit-eq-factory" style="width:200px"></select>
                </div>
                <div class="content-item">
                    <p><span class="allData">共<span id="edit-eq-num"></span>条数据</span> &nbsp|&nbsp<span class="checkedData">[已选<span class="part-edit-data">0</span>]</span></p>
                    <div class="table-div">
                        <table id="partEdit-table" class="easyui-datagrid part-datagrid">
                        </table>
                    </div>
                    <div class="table-div-checked">
                        <table id="partEdit-table-checked" class="easyui-datagrid">

                        </table>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="footer">
        <div class="submit newAdd-prev">上一步</div>
        <div class="submit newAdd-next submit-show">下一步</div>
        <div class="submit edit-submit">提交</div>
    </div>
</div>
<!--关联设备模板详情-->
<div class="popup detail-wrapper">
    <div class="title">
        <span>关联设备模板</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <p>共<span id="etTotal">1254</span>条数据</p>
        <div>
            <table id="partDetail-table" class="easyui-datagrid">
            </table>
        </div>
    </div>
</div>
<!--供应商弹窗-->
<div class="popup factory-wrapper">
    <div class="title">
        <span>供应商</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <div>
            <table id="partFactory-table" class="easyui-datagrid">
            </table>
        </div>
    </div>
</div>
<script src="<%=basePath%>/front/public/js/jquery-3.2.1.min.js"></script>
<script src="<%=basePath %>/front/public/js/select2.js"></script>
<script src="<%=basePath %>/front/public/js/pinyin.js"></script>
<script src="<%=basePath%>/front/public/js/jquery.easyui.min.js"></script>
<script src="<%=basePath%>/front/public/js/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath%>/front/public/js/common.js"></script>
<script src="<%=basePath%>/front/public/js/customPrompt.js"></script>
<script src="<%=basePath%>/front/public/js/partTemplateConfig.js"></script>
</body>
</html>