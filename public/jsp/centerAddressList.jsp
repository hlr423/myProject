<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
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
    <link rel="stylesheet" href="<%=basePath%>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/personMailList.css">
    <title>通讯录</title>
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
            <input id="keyword" type="text" placeholder="搜索姓名/电话">
            <div class="search-btn">搜索</div>
        </div>
        <div class="operation-wrapper">
            <div class="new-btn " id="newModule">
                <i></i>
                <span>新建</span>
            </div>
            <div class="new-btn" id="classification">
                <i></i>
                <span>分类</span>
            </div>
        </div>
        <div class="table-wrapper">
            <table class="easyui-datagrid" id="dg">
                <tbody>
                   <!-- JS -->
                </tbody>
            </table>
        </div>

        <!-- 弹框遮罩层 -->
        <div class="shade" id="shade"></div>
        <!--新建弹窗-->
        <div class="popup  newAdd-wrapper  newAddShow" id="edit-module">
            <div class="title">
                <span>新建</span>
                <a class="close-popup">
                    <i class="close-icon"></i>
                </a>
            </div>
            <div class="content">
                <form class="newAdd-form" method="post">
                    <div class="content-step">
                        <div class="content-item">
                            <label for="equipment-factory">*类型:</label>
                            <select id="addressTypes" class="easyui-validatebox part-factory " data-options="validType:'selectValueRequired'">
                                <option value="0">请选择类型</option>
                            </select>
                        </div>
                        <div class="content-item">
                            <label for="part-brand">*名称:</label>
                            <input id="addName" class="easyui-validatebox" type="text" data-options="required:true" maxlength="50" placeholder="请输入名称" />
                        </div>
                        <div class="content-item">
                            <label for="part-type">*电话:</label>
                            <input id="addTel" class="easyui-validatebox" type="text"   data-options="required:true" maxlength="50" placeholder="请输入电话" />
                        </div>
                        <div class="content-item">
                            <label for="part-type">*邮箱:</label>
                            <input id="addEmail" class="easyui-validatebox" type="text" data-options="required:true" maxlength="20" placeholder="请输入邮箱" />
                        </div>

                    </div>
                </form>
            </div>
            <div class="footer">
                <div class="submit newAdd-submit">提交</div>
            </div>
        </div>
        <!-- 新增类别 -->
        <div class="popup newAdd-wrapper  classification">
            <div class="title">
                <span>新增类别</span>
                <a class="close-popup">
                    <i class="close-icon"></i>
                </a>
            </div>
            <div class="content">
                <!-- 添加类别 -->
                <div class="operation-wrapper">
                    <input id="addAddressTypeName" class="easyui-validatebox" type="text" data-options="required:true" maxlength="50" placeholder="请输入类别名称" />
                    <div id="addressType_addSubmit" class="new-btn">
                        <i></i>
                        <span>添加</span>
                    </div>
                </div>
                <!-- 类别显示表 -->
                <div class="table-wrapper">
                    <table class="easyui-datagrid" id="classificationTable">
                        <tbody>
                            <tr>
                                <td>监管部门</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>监管部门</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        
        
        <!-- 编辑类别 -->
          <div class="popup newAdd-wrapper  " id="classification-change">
            <div class="title">
                <span>编辑类别</span>
                <a class="close-popup-edit">
                    <i class="close-icon"></i>
                </a>
            </div>
            <div class="content">
                <!-- 添加类别 -->
                <div class="operation-wrapper">
                    <input id="editAddressType" class="easyui-validatebox" type="text" data-options="required:true" maxlength="50" placeholder="请输入类别名称" />
                    <div class="new-btn">
                        <i></i>
                        <span id="editType_submit">保存</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 删除模态框 -->
        <div class="popup newAdd-wrapper-delete" id="Delete">
            <div class="title">
                <span>删除</span>
                <a class="close-popup-delete">
                    <i class="close-icon"></i>
                </a>
            </div>
            <div class="content">
                <!-- 添加类别 -->
               <div class="delete-module">
                    <p>确定要删除？</p>
               </div>

            </div>
            <div class="footer">
                <div class="submit deletePerson-submit">确定</div>
            </div>
        </div>
        
        
        <div class="popup newAdd-wrapper-delete" id="deleteType">
            <div class="title">
                <span>删除</span>
                <a class="close-popup-delete">
                    <i class="close-icon"></i>
                </a>
            </div>
            <div class="content">
                <!-- 添加类别 -->
               <div class="delete-module">
                    <p>确定要删除？</p>
               </div>

            </div>
            <div class="footer">
                <div class="submit deleteType-submit">确定</div>
            </div>
        </div>
        <input id="editAddressTypeId" type="hidden" value="" >
        <input id="editAddressListId" type="hidden" value="" >
        <script src="<%=basePath%>front/public/js/jquery-3.2.1.min.js"></script>
        <script src="<%=basePath%>front/public/js/jquery.easyui.min.js"></script>
        <script src="<%=basePath%>front/public/js/easyui-lang-zh_CN.js"></script>
        <script src="<%=basePath%>front/public/js/jquery.treetable.js"></script>
        <script src="<%=basePath%>front/public/js/customPrompt.js"></script>
        <script src="<%=basePath%>front/public/js/common.js"></script>
        <script src="<%=basePath%>front/public/js/personMailList.js"></script>
       
</body>

</html>
