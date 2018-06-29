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
    <title>角色配置</title>
    <link rel="stylesheet" href="<%=basePath%>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/jquery.treetable.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/jquery.treetable.theme.default.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/roleConfig.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>


<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
            <input id="keyword" type="text" placeholder="请输入角色名称" maxlength="50">
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
                    <tr>
                        <td>超级管理员</td>
                    </tr>
                    <tr>
                        <td>运维人员</td>
                    </tr>
                </tbody>
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
            <form id="newForm" method="post">
                <div class="content-item">
                    <label for="">新建类型</label>
                    <div class="chose-type">
                        <a class="radio-wrapper radio-checked">
                            <i></i>
                            <input type="radio" name="new-type" value="1" checked>
                        </a> 根据模板创建
                        <a class="radio-wrapper">
                            <i></i>
                            <input type="radio" name="new-type" value="2">
                        </a> 自定义
                    </div>
                </div>
                <div class="content-item model-role">
                    <label>*模板角色</label>
                    <select name="" id="model-role" class="easyui-validatebox new-role" data-options="validType:'selectValueRequired'">
                        <!-- JS -->
                    </select>
                </div>
                
                <div class="content-item">
                    <label>*类型</label>
                    <select name="" id="domain" class="easyui-validatebox new-role" data-options="validType:'selectValueRequired'">
                        <option value="0">请选择类型</option>
                        <option value="1">内部</option>
                        <option value="2">外部</option>
                    </select>
                </div>
                
                <div class="content-item model-role">
                    <label>*能否跨域</label>
                    <select name="" id="model-role" class="easyui-validatebox new-role" data-options="validType:'selectValueRequired'">
                        <option value="0">请选择</option>
                        <option value="1">能</option>
                        <option value="2">不能</option>
                    </select>
                </div>
                <div class="content-item">
                    <label>*有效期</label>
                    <select name="" id="usefullTime" class="easyui-validatebox new-role" data-options="validType:'selectValueRequired'">
                        <option value="0">请选择有效期</option>
                        <option value="100">永久</option>
                        <option value="1">1个月</option>
                        <option value="3">3个月</option>
                        <option value="6">6个月</option>
                        <option value="12">12个月</option>
                    </select>
                </div>
                <div class="content-item">
                    <label>*角色名</label>
                    <input id="roleName" class="easyui-validatebox new-role-name" type="text" placeholder="请输入角色名" data-options="required:true,validType:'allName'"
                        maxlength="50" />
                </div>
                <div class="content-item">
                    <span>权限设置</span>
                </div>
                <table class="treetable power" id="treeTable1">
                    <!-- JS -->
                </table>
            </form>
        </div>
        <div class="footer">
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
            <form id="editForm" method="post">
                <div class="content-item">
                    <label>角色名</label>
                    <span>高级管理员</span>
                </div>
                <div class="content-item">
                    <label>类型</label>
                    <span>内部</span>
                </div>
                <div class="content-item">
                    <span>权限设置</span>
                </div>
                <table class="treetable power" id="treeTable3">
                   <!-- JS -->
                </table>
            </form>
        </div>
        <div class="footer">
            <div class="submit edit-submit">提交</div>
        </div>
    </div>
    <!-- 详情框 -->
    <div class="popup detail-popup">
        <div class="title">
            <span>查看权限</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <div class="content-item">
                <label>角色名</label>
                <span>高级管理员</span>
            </div>
            <div class="content-item">
                <label>类型</label>
                <span>内部</span>
            </div>
            <div class="content-item">
                <span>权限设置</span>
            </div>
            <table class="treetable power" id="treeTable2">
                <thead>
                    <tr>
                        <th>菜单名称</th>
                        <th>增</th>
                        <th>删</th>
                        <th>查</th>
                        <th>改</th>
                        <th>上传</th>
                        <th>下载</th>
                    </tr>
                </thead>
                <tbody>
                    <tr data-tt-id="1">
                        <td>基本信息</td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                    </tr>
                    <tr data-tt-id="1-1" data-tt-parent-id="1">
                        <td>组织机构管理</td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                    </tr>
                    <tr data-tt-id="1-2" data-tt-parent-id="1">
                        <td>账号管理</td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                    </tr>
                    <tr data-tt-id="2">
                        <td>资源管理</td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                    </tr>
                    <tr data-tt-id="1-1" data-tt-parent-id="2">
                        <td>车辆管理</td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                        <td>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row">
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- 修改角色名称 -->
    <div class="popup edit-role-name-popup">
        <div class="title">
            <span>修改角色</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <form id="editRoleForm" action="updateRoleName" method="post">
                <div class="content-item">
                    <label>角色名*</label>
                    <input type="hidden" name = "roleId" value="">
                    <input name="name" class="easyui-validatebox edit-role-name" type="text" placeholder="请输入角色名" data-options="required:true,validType:'allName'"
                        maxlength="50" />
                </div>
                
                <div class="content-item">
                    <label>*类型</label>
                    <select name="isInner" id="domain" class="easyui-validatebox new-role" data-options="validType:'selectValueRequired'">
                        <option value="0">请选择类型</option>
                        <option value=true>内部</option>
                        <option value=false>外部</option>
                    </select>
                </div>
                
                <div class="content-item model-role">
                    <label>*能否跨域</label>
                    <select name="isManager" id="model-role" class="easyui-validatebox new-role" data-options="validType:'selectValueRequired'">
                        <option value="0">请选择</option>
                        <option value=true>能</option>
                        <option value=false>不能</option>
                    </select>
                </div>
                <div class="content-item">
                    <label>*有效期</label>
                    <select name="usefulTime" id="usefullTime" class="easyui-validatebox new-role" data-options="validType:'selectValueRequired'">
                        <option value="0">请选择有效期</option>
                        <option value="100">永久</option>
                        <option value="1">1个月</option>
                        <option value="3">3个月</option>
                        <option value="6">6个月</option>
                        <option value="12">12个月</option>
                    </select>
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit edti-role-name-submit">提交</div>
        </div>
    </div>
    <!-- 删除框 -->
    <div class="infor-wrapper delete-wrapper">
        <p>
            <i></i>
            该角色下所有人员将被删除！
        </p>
        <div>
            <a class="delete-confirm">删除</a>
            <a class="infor-cancel">取消</a>
        </div>
    </div>
    
    
    <!-- 人员信息弹窗 -->
    <div class="popup persons-popup">
        <div class="title">
            <span>人员</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <table class="easyui-datagrid" id="persons">
                <tbody>
                    <tr>
                        <td>超级管理员</td>
                        <td>超级管理员</td>
                    </tr>
                    <tr>
                        <td>运维人员</td>
                        <td>运维人员</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    
    
    
    
    <script src="<%=basePath%>front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath%>front/public/js/jquery.treetable.js"></script>
    <script src="<%=basePath%>front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath%>front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath%>front/public/js/customPrompt.js"></script>
    <script src="<%=basePath%>front/public/js/common.js"></script>
    <!-- <script src="../js/refresh.js"></script> -->
    <script src="<%=basePath%>front/public/js/roleConfig.js"></script>
</body>

</html>