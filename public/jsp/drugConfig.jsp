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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>药剂模板初始化</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/drugConfig.css">
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
            <input type="text" id="searchName" placeholder="请输入名称/品牌/型号/供应商" maxlength="50">
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
                <form id="newForm1">
                    <div class="content-item">
                        <label>*药剂模板名称</label>
                        <input class="easyui-validatebox new-name" id="new-name" type="text" placeholder="请输入药剂模板名称" data-options="required:true" maxlength="50"
                        />
                    </div>
                    <div class="content-item">
                        <label>*品牌</label>
                        <input class="easyui-validatebox" id="new-brand" type="text" placeholder="请输入品牌" data-options="required:true" maxlength="50" />
                    </div>
                    <div class="content-item">
                        <label>*规格型号</label>
                        <input class="easyui-validatebox" id="new-spec" type="text" placeholder="请输入规格型号" data-options="required:true" maxlength="50" />
                    </div>
                    <div class="content-item">
                        <label>*单位</label>
                        <input class="easyui-validatebox" id="new-unit" type="text" placeholder="请输入单位" data-options="required:true" maxlength="10" />
                    </div>
                    <div class="content-item">
                        <label>*价格</label>
                        <input class="easyui-validatebox" id="new-price" type="text" placeholder="请输入价格（元）" data-options="required:true,validType:'positiveTwo'" maxlength="11"
                        />
                    </div>
                    <div class="content-item">
                        <label>*保质期(月)</label>
                        <input class="easyui-validatebox" id="new-warranty" type="text" placeholder="请输入保质期(月)" data-options="required:true,validType:'positiveInt'"
                            maxlength="3" />
                    </div>
                    <div class="content-item">
                        <label>*供应商</label>
                        <select name="" id="new-supplier" class="easyui-validatebox new-level" data-options="validType:'selectValueRequired'">
							<option value="0">请选择供应商</option>
            				<c:forEach items="${suppliers}" var="supplier">
                				<option value="${supplier.id}">${supplier.name}</option>
            				</c:forEach>
                        </select>
                    </div>
                    <div class="content-item">
                        <label>*供应周期(天)</label>
                        <input class="easyui-validatebox" id="new-supplyCycle" type="text" placeholder="请输入供应周期(天)" data-options="required:true,validType:'positiveSup'"
                            maxlength="3" />
                    </div>
                    <div class="content-item">
                        <label>药剂图片*:</label>
                        <div class="inputFile drug-picture">
                            <input type="file" name="pic" id="add-pic"  multiple="multiple" >
                            <span><i></i>上传文件</span>
                            <span>支持.jpg/.png/.JPEG</span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="step">
                <form id="newForm2" method="">
                    <div class="item-group new-params">
                        <div class="title-num">
                            <p>关键参数1</p>
                        </div>
                        <div class="content-item">
                            <label>*属性名</label>
                            <input type="text" class="easyui-validatebox new-param-name" data-options="required:true" maxlength="50" placeholder="请输入属性名">
                        </div>
                        <div class="content-item">
                            <label>*属性值</label>
                            <input type="text" class="easyui-validatebox new-param-value" data-options="required:true,validType:'positiveTwo'" maxlength="7" placeholder="请输入属性值">
                        </div>
                        <div class="content-item">
                            <label>*单位</label>
                            <input type="text" class="easyui-validatebox new-param-unit" data-options="required:true" maxlength="10" placeholder="请输入单位">
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
                <form id="editForm1">
                    <div class="content-item">
                        <label>*设备模板名称</label>
                        <input type="hidden" id="edit-id">
                        <input class="easyui-validatebox edit-name" id="edit-name" type="text" placeholder="请输入设备模板名称" data-options="required:true" maxlength="50"
                        />
                    </div>
                    <div class="content-item">
                        <label>*品牌</label>
                        <input class="easyui-validatebox" id="edit-brand" type="text" placeholder="请输入品牌" data-options="required:true" maxlength="50" />
                    </div>
                    <div class="content-item">
                        <label>*规格型号</label>
                        <input class="easyui-validatebox" id="edit-spec" type="text" placeholder="请输入规格型号" data-options="required:true" maxlength="50" />
                    </div>
                    <div class="content-item">
                        <label>*单位</label>
                        <input class="easyui-validatebox" id="edit-unit" type="text" placeholder="请输入单位" data-options="required:true" maxlength="10" />
                    </div>
                    <div class="content-item">
                        <label>*价格</label>
                        <input class="easyui-validatebox" id="edit-price" type="text" placeholder="请输入价格" data-options="required:true,validType:'positiveTwo'" maxlength="11"
                        />
                    </div>
                    <div class="content-item">
                        <label>*保质期(月)</label>
                        <input class="easyui-validatebox" id="edit-warranty" type="text" placeholder="请输入保修期(月)" data-options="required:true,validType:'positiveInt'"
                            maxlength="3" />
                    </div>
                    <div class="content-item">
                        <label>*供应商</label>
                        <select name="" id="edit-supplier" class="easyui-validatebox new-level" data-options="validType:'selectValueRequired'">
							<option value="0">请选择供应商</option>
            				<c:forEach items="${suppliers}" var="supplier">
                				<option value="${supplier.id}">${supplier.name}</option>
            				</c:forEach>
                        </select>
                    </div>
                    <div class="content-item">
                        <label>*供应周期(天)</label>
                        <input class="easyui-validatebox" id="edit-supplyCycle" type="text" placeholder="请输入供应周期(天)" data-options="required:true,validType:'positiveSup'"
                            maxlength="3" />
                    </div>
                    <div class="content-item">
                        <label>药剂图片:</label>
                        <div class="inputFile edit-picture">
                            <input type="file" name="pic"  multiple="multiple" id="edit-pic">
                            <span><i></i>上传文件</span>
                            <span>支持.jpg/.png/.JPEG</span>
                        </div>
                    </div>
                    <div class="content-item">
                        <label>药剂原图片*:</label>
                        <a class="old-picture">
                            <i></i>照片
                            <div>
                                <img src="../images/twoCode.png" alt="" id="edit-show-pic"/>
                            </div>
                        </a>
                    </div>
                </form>
            </div>
            <div class="step">
                <form id="editForm2" method="">
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
<!--                 <tbody>
                    <tr>
                        <td>耐得工业</td>
                        <td>郑兴伦</td>
                        <td>13684203746</td>
                        <td>18070941596@163.com</td>
                        <td>谢家树</td>
                        <td>18581960824</td>
                        <td>18070941596@163.com</td>
                    </tr>
                </tbody> -->
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
    <script src="<%=basePath %>/front/public/js/drugConfig.js"></script>
</body>

</html>