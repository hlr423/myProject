<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>设备配置</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/select2.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/equipmentConfigure.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
<div class="body-wrapper">
    <div class="search-wrapper">
        <select name="" id="topEquipTemp">
        </select>
        <input type="text" placeholder="请输入设备名称" id="keyword">
        <div class="search-btn">搜索</div>
    </div>
    <div class="operation-wrapper">
        <div class="new-btn">
            <i></i>
            <span>新建</span>
        </div>
    </div>
    <div class="table-wrapper" >
        <table class="easyui-datagrid" id="dg">
            <tbody>
            	<!-- js动态加载 -->
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
        <form class="newAdd-form" method="post">
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span>1</span></span>
                        基础信息
                    </div>
                    <div class="line"></div>
                    <div>
                        <span><span>2</span></span>
                        关联设备模板
                    </div>
                    <div class="line"></div>
                    <div>
                        <span><span>3</span></span>
                        关联厂站
                    </div>
                </div>
                <div class="content-item">
                    <label for="equipment-name">*设备名称:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true" maxlength="50" placeholder="请输入设备名称" id="name"/>
                </div>
                <div class="content-item">
                    <label for="equipment-position">*工艺位置:</label>
                    <select class="easyui-validatebox newAdd-position" data-options="validType:'selectValueRequired'" id="position">
                    </select>
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
                        关联设备模板
                    </div>
                    <div class="line"></div>
                    <div>
                        <span><span>3</span></span>
                        关联厂站
                    </div>
                </div>
                <div class="content-item">
                    <label for="equipment-template">设备模板名称:</label>
                    <select id="etname" style="width:200px"></select>
                    <label for="equipment-brande">品牌:</label>
                     <select id="etbrand" style="width:200px"></select>
                </div>
                <div class="content-item">
                    <label for="equipment-name">规格型号:</label>
                    <select id="etmodel" style="width:200px"></select>
                    <label for="equipment-name">供货商:</label>
                     <select id="supplier" style="width:200px"></select>
                </div>
                <div class="content-item">
                	<p><span class="allData data-checked">共<span id="etnum">0</span>条数据</span> &nbsp|&nbsp<span class="equip-checkedData">[已选]</span></p>
                    <div class="table-div">
                        <table id="equipmentAdd-table" class="easyui-datagrid">
                        	<!-- js动态加载 -->
                        </table>
                    </div>
                    <div class="table-div-checked">
                        <table id="equipmentAdd-table-checked" class="easyui-datagrid">

                        </table>
                    </div>
                </div>
            </div>
            <div class="content-step">
                <div class="content-item content-title">
                    <div>
                        <span class="green"><span><i></i></span></span>
                        基础信息
                    </div>
                    <div class="line  line-green"></div>
                    <div>
                        <span class="green"><span><i></i></span></span>
                        关联设备模板
                    </div>
                    <div class="line line-green"></div>
                    <div>
                        <span class="green"><span>3</span></span>
                        关联厂站
                    </div>
                </div>
                <div class="content-item">
                    <label for="equipment-region">区域:</label>
                    <select id="area" class="easyui-combotrees cbt" data-options="prompt:'请选择区域'">
	        		</select>
                    <label for="equipment-water">设计处理水量:</label>
                    <select class="easyui-validatebox newAdd-water" id="treatWater" style="width:200px">
                    </select>
                </div>
                <div class="content-item">
                    <div class="content-checkbox">
                        <p>
                            <span class="station-allData">共<span id="snum">0</span>条数据</span>
                            &nbsp|&nbsp
                            <span class="station-checkedData">[已选]</span>
                            <span class="station-checkAll">
                            <a class="checkbox-all-wrapper">
                                <i></i>
                                <input type="checkbox" name="ceshi" class="check-all">
                            </a>
                            全选
                        </span>
                        </p>
                        <div class="station-item" id="station" >
                        </div>
                    </div>
                    <div class="station-item-checked">

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
        <form class="edit-form" method="post" action="updateEquip" enctype="multipart/form-data">
            <div class="content-item">
                <label for="name">*设备名称</label>
                <input class="easyui-validatebox" type="text" data-options="required:true" maxlength="50" placeholder="请输入设备名称" name="name" id="ename"/>
            </div>
            <div class="content-item">
                <label for="address">*工艺位置</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="eposition" name="pId">
                </select>
            </div>
            <div class="content-item">
                <label for="module">*设备模板</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="eequipTemp" name="etId">
                </select>
            </div>
            <div class="content-item">
                <label for="station">*所属厂站</label>
                <select id="estation" style="width:250px" name="sId"></select>
            </div>
            <div class="content-item">
                <label for="state">*设备状态</label>
                <select class="easyui-validatebox" data-options="validType:'selectValueRequired'" id="eequipState" name="esId">
                </select>
            </div>
            <div class="content-item">
                <label for="state">*启用时间:</label>
                <input class="easyui-validatebox chose-time" type="text" id="euseTime" name="useTime">
            </div>
            <div class="content-item">
                <label for="picture">设备照片:</label>
                <div class="inputFile equipment-picture">
                    <input type="file" name="pic">
                    <span><i></i>上传文件</span>
                    <span>支持.jpg/.png/.JPEG</span>
                </div>
            </div>
            <div class="content-item ">
                <label for="pictures">设备模板图片:</label>
                <div class="content-item-img">
                    <div class="content-img" id="epic">
                        
                    </div>
                </div>
            </div>
            <input type="hidden" name="id" id="id">
        </form>
    </div>
    <div class="footer">
        <div class="submit editAdd-submit">提交</div>
    </div>
</div>
<!--详情-->
<div class="popup detail-wrapper">
    <div class="title">
        <span>所属厂站</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
        <!-- js动态加载 -->
    </div>
</div>
<!--图片弹窗-->
<div class="popup img-wrapper">
    <div class="title">
        <span>图片</span>
        <a class="close-popup">
            <i class="close-icon"></i>
        </a>
    </div>
    <div class="content">
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
<script src="<%=basePath %>/front/public/js/select2.js"></script>
<script src="<%=basePath %>/front/public/js/pinyin.js"></script>
<script src="<%=basePath %>/front/public/js/jquery.easyui.min.js"></script>
<script src="<%=basePath %>/front/public/js/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath %>/front/public/js/zh-CN.js"></script>
<script src="<%=basePath %>/front/public/js/laydate/laydate.js"></script>
<script src="<%=basePath %>/front/public/js/common.js"></script>
<script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
<script src="<%=basePath %>/front/public/js/equipmentConfigure.js"></script>
</body>
</html>