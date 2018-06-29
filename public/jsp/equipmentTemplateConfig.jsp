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
    <title>设备模板初始化</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/equipmentTemplateConfig.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
            <select id="topsupplier" class="easyui-validatebox new-level">
            </select>
            <input type="text" placeholder="请输入模板名称/品牌/型号" maxlength="50" id="keyword">
            <div class="search-btn">搜索</div>
        </div>
        <div class="operation-wrapper">
            <div class="new-btn">
                <i></i>
                <span>新建</span>
            </div>
        </div>
        <div class="table-wrapper">
            <table class="easyui-datagrid" id="dg" >
                <tbody>
                </tbody>
            </table>
        </div>

        <!-- <div id="page" class="easyui-pagination"></div> -->
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
            <div class="step-icon">
                <div>
                    <div class="step-cirlce">
                        <div class="step-num">1</div>
                    </div>
                    <p>基础信息</p>
                </div>
                <div class="line gray"></div>
                <div>
                    <div class="step-cirlce gray">
                        <div class="step-num">2</div>
                    </div>
                    <p>关键参数</p>
                </div>
            </div>
            <div class="step">
                <form id="newForm1" action="addEquipTemp" method="POST" enctype="multipart/form-data">
                    <div class="content-item">
                        <label>*设备模板名称</label>
                        <input class="easyui-validatebox new-name" type="text" placeholder="请输入设备模板名称" data-options="required:true" maxlength="50" id="name"/>
                    </div>
                    <div class="content-item">
                        <label>*品牌</label>
                        <input class="easyui-validatebox" type="text" placeholder="请输入品牌" data-options="required:true" maxlength="50" id="brand"/>
                    </div>
                    <div class="content-item">
                        <label>*规格型号</label>
                        <input class="easyui-validatebox" type="text" placeholder="请输入规格型号" data-options="required:true" maxlength="50" id="model"/>
                    </div>
                    <div class="content-item">
                        <label>*单位</label>
                        <input class="easyui-validatebox" type="text" placeholder="请输入单位" data-options="required:true" maxlength="10" id="unit"/>
                    </div>
                    <div class="content-item">
                        <label>*价格</label>
                        <input class="easyui-validatebox" type="text" placeholder="请输入价格" data-options="required:true,validType:'positiveTwo'" maxlength="11" id="price"/>
                    </div>
                    <div class="content-item">
                        <label>*保修期(月)</label>
                        <input class="easyui-validatebox" type="text" placeholder="请输入保修期(月)" data-options="required:true,validType:'positiveInt'"
                            maxlength="3" id="warranty"/>
                    </div>
                    <div class="content-item">
                        <label>*MTBF(小时)</label>
                        <input class="easyui-validatebox" type="text" placeholder="请输入MTBF(小时)" data-options="required:true,validType:'positiveMtbf'"
                            maxlength="6" id="mtbf"/>
                    </div>
                    <div class="content-item">
                        <label>*重要级别</label>
                        <select name="" id="level" class="easyui-validatebox new-level" data-options="validType:'selectValueRequired'">
                        </select>
                    </div>
                    <div class="content-item">
                        <label>*供应商</label>
                        <select name="" id="supplier" class="easyui-validatebox new-level" data-options="validType:'selectValueRequired'">
                        </select>
                    </div>
                    <div class="content-item">
                        <label>*供应周期(天)</label>
                        <input class="easyui-validatebox" type="text" placeholder="请输入供应周期(天)" data-options="required:true,validType:'positiveSup'"
                            maxlength="3" id="suppluCycle"/>
                    </div>
                     <div class="content-item">
                        <label>模板照片:</label>
                        <div class="inputFile equip-picture">
                            <input type="file" class="" name="pic">
                            <span><i></i>上传文件</span>
                            <span title="支持.jpg/.png/.JPEG(小于2M)">支持.jpg/.png/.JPEG(小于2M)</span>
                        </div>
                    </div>
                    <input id="equipTempJson" type="hidden" value="" name="equipTempJson">
                    <input id="equipKeyparams" type="hidden" value="" name="equipKeyparams">
                    <input type="hidden" name="token" value="<%=session.getAttribute("token") %>" />
               </form>
            </div>
            <div class="step">
                <form id="newForm2" >
                    <div class="item-group addKeyparam">
                        <div class="title-num">
                            <p>关键参数1</p>
                        </div>
                        <div class="content-item">
                            <label>属性名</label>
                            <input type="text" class="easyui-validatebox"  maxlength="50" placeholder="请输入属性名" name="name">
                        </div>
                        <div class="content-item">
                            <label>属性值</label>
                            <input type="text" class="easyui-validatebox" data-options="validType:'positiveTwo'" maxlength="7" placeholder="请输入属性值" name="value">
                        </div>
                        <div class="content-item">
                            <label>单位</label>
                            <input type="text" class="easyui-validatebox" maxlength="10" placeholder="请输入单位" name="unit">
                        </div>
                        <div class="content-item">
                            <label>上限值</label>
                            <input type="text" class="easyui-validatebox" data-options="validType:'positiveTwo'" maxlength="7" placeholder="请输入上限值" name="upperLimit">
                        </div>
                        <div class="content-item">
                            <label>下限值</label>
                            <input type="text" class="easyui-validatebox" data-options="validType:'positiveTwo'" maxlength="7" placeholder="请输入下限值" name="lowerLimit">
                        </div>
                        <div class="content-item">
                            <div class="new-add">
                                <i></i>
                                <span>添加关键参数</span>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
        <div class="footer">
            <div class="new-next">下一步</div>
            <div class="new-prev">上一步</div>
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
            <div class="step-icon">
                <div>
                    <div class="step-cirlce">
                        <div class="step-num">1</div>
                    </div>
                    <p>基础信息</p>
                </div>
                <div class="line gray"></div>
                <div>
                    <div class="step-cirlce gray">
                        <div class="step-num">2</div>
                    </div>
                    <p>关键参数</p>
                </div>
            </div>
            <div class="step">
                <form id="editForm1" action="updateEquipTemp" method="POST" enctype="multipart/form-data">
                    <div class="content-item">
                        <label>*设备模板名称</label>
                        <input class="easyui-validatebox edit-name" type="text" placeholder="请输入设备模板名称" data-options="required:true" maxlength="50"
                         id="ename"/>
                    </div>
                    <div class="content-item">
                        <label>*品牌</label>
                        <input class="easyui-validatebox" type="text" placeholder="请输入品牌" data-options="required:true" maxlength="50" id="ebrand"/>
                    </div>
                    <div class="content-item">
                        <label>*规格型号</label>
                        <input class="easyui-validatebox" type="text" placeholder="请输入规格型号" data-options="required:true" maxlength="50" id="emodel"/>
                    </div>
                    <div class="content-item">
                        <label>*单位</label>
                        <input class="easyui-validatebox" type="text" placeholder="请输入单位" data-options="required:true" maxlength="10" id="eunit"/>
                    </div>
                    <div class="content-item">
                        <label>*价格</label>
                        <input class="easyui-validatebox" type="text" placeholder="请输入价格" data-options="required:true,validType:'positiveTwo'" maxlength="11"
                         id="eprice"/>
                    </div>
                    <div class="content-item">
                        <label>*保修期(月)</label>
                        <input class="easyui-validatebox" type="text" placeholder="请输入保修期(月)" data-options="required:true,validType:'positiveInt'"
                            maxlength="3" id="ewarranty"/>
                    </div>
                    <div class="content-item">
                        <label>*MTBF(小时)</label>
                        <input class="easyui-validatebox" type="text" placeholder="请输入MTBF(小时)" data-options="required:true,validType:'positiveMtbf'"
                            maxlength="6" id="emtbf"/>
                    </div>
                    <div class="content-item">
                        <label>*重要级别</label>
                        <select name="" id="elevel" class="easyui-validatebox new-level" data-options="validType:'selectValueRequired'">
                        </select>
                    </div>
                    <div class="content-item">
                        <label>*供应商</label>
                        <select name="" id="esupplier" class="easyui-validatebox new-level" data-options="validType:'selectValueRequired'">
                        </select>
                    </div>
                    <div class="content-item">
                        <label>*供应周期(天)</label>
                        <input class="easyui-validatebox" type="text" placeholder="请输入供应周期(天)" data-options="required:true,validType:'positiveSup'"
                            maxlength="3" id="esupplyCycle"/>
                    </div>
                    <div class="content-item">
                        <label for="car-picture">模板原照片:</label>
                        <a class="edit-picture">
                            <i></i>照片
                            <div>
                                <img id="ePic" src="" alt="">
                            </div>
                        </a>
                    </div>
                    <div class="content-item">
                        <label>模板照片:</label>
                        <div class="inputFile edit-picture">
                            <input type="file" name="pic">
                            <span><i></i>上传新照片</span>
                            <span title="支持.jpg/.png/.JPEG(小于2M)">支持.jpg/.png/.JPEG(小于2M)</span>
                        </div>
                    </div>
                    <input id="equipTempJson1" type="hidden" value="" name="equipTempJson">
                    <input id="equipKeyparams1" type="hidden" value="" name="equipKeyparams">
                </form>
            </div>
            <div class="step">
                <form id="editForm2" method="" >
                	<div class="item-group">
                        <div class="title-num">
                            <p>关键参数1</p>
                        </div>
                        <div class="content-item">
                            <label>*属性名</label>
                            <input type="text" class="easyui-validatebox" data-options="required:true" maxlength="50" placeholder="请输入属性名">
                        </div>
                        <div class="content-item">
                            <label>*属性值</label>
                            <input type="text" class="easyui-validatebox" data-options="required:true,validType:'positiveTwo'" maxlength="7" placeholder="请输入属性值">
                        </div>
                        <div class="content-item">
                            <label>*单位</label>
                            <input type="text" class="easyui-validatebox" data-options="required:true" maxlength="10" placeholder="请输入单位">
                        </div>
                        <div class="content-item">
                            <label>*上限值</label>
                            <input type="text" class="easyui-validatebox" data-options="required:true,validType:'positiveTwo'" maxlength="7" placeholder="请输入上限值">
                        </div>
                        <div class="content-item">
                            <label>*下限值</label>
                            <input type="text" class="easyui-validatebox" data-options="required:true,validType:'positiveTwo'" maxlength="7" placeholder="请输入下限值">
                        </div>
                        <div class="content-item">
                            <div class="edit-add">
                                <i></i>
                                <span>添加关键参数</span>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
        <div class="footer">
            <div class="edit-next">下一步</div>
            <div class="edit-prev">上一步</div>
            <div class="submit edit-submit">提交</div>
        </div>
    </div>
    <!-- 关键参数详情框 -->
    <div class="popup param-popup">
        <div class="title">
            <span>关键参数</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <table class="easyui-datagrid" id="paramTable">
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    <!-- 供应商详情框 -->
    <div class="popup sup-popup">
        <div class="title">
            <span>供应商详情</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <table class="easyui-datagrid" id="supTable">
                <tbody>
                </tbody>
            </table>
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
    <!-- <script src="<%=basePath %>/front/public/js/refresh.js"></script> -->
    <script src="<%=basePath %>/front/public/js/equipmentTemplateConfig.js"></script>
</body>

</html>
