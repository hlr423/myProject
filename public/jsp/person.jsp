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
    <title>人员配置</title>
    <link rel="stylesheet" href="<%=basePath%>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/jquery.treetable.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/jquery.treetable.theme.default.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/personConfig.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
            <input id="keyword" type="text" placeholder="请输入姓名或手机号" maxlength="50">
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
                <!-- JS -->
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
                    <label>姓名*</label>
                    <input name="name" class="easyui-validatebox" type="text" placeholder="请输入姓名" data-options="required:true,validType:'allName'" maxlength="50"
                    />
                </div>
                <div class="content-item">
                    <label>性别*</label>
                    <div class="new-chose-gender">
                        <a class="radio-wrapper radio-checked">
                            <i></i>
                            <input type="radio" name="gender" checked="checked" value="男"> 男
                        </a>
                        <a class="radio-wrapper">
                            <i></i>
                            <input type="radio" name="gender" value="女"> 女
                        </a>
                    </div>
                </div>
                <div class="content-item">
                    <label>电话号码*</label>
                    <input name="telephone" class="easyui-validatebox" type="text" placeholder="请输入电话号码" data-options="required:true,validType:'mobile'" maxlength="11"/>
                </div>
                <div class="content-item">
                    <label>身份证号码*</label>
                    <input name="idCard" class="easyui-validatebox" type="text" placeholder="请输入身份证号码" data-options="required:true,validType:'idcard'" maxlength="18"/>
                </div>
                
                <div class="content-item">
                    <label>角色*</label>
                    <select name="" id="addRoleId" class="easyui-validatebox new-role" data-options="validType:'selectValueRequired'">
                        <!-- JS -->
                    </select>
                </div>
                <div class="content-item">
                    <label>部门*</label>
                    <select name="" id="newDep" class="easyui-combotrees" data-options="required:true, prompt:'请选择部门'">
                    </select>
                </div>
                <div class="content-item">
                    <label>工号</label>
                    <input name="sn" class="easyui-validatebox" type="text" placeholder="请输入工号" data-options="validType:'englishNumber'" maxlength="50"/>
                </div>
                <div class="content-item">
                    <label>职务</label>
                    <input name="position" class="easyui-validatebox" type="text" placeholder="请输入职务名称" data-options="validType:'allName'" maxlength="11" />
                </div>
                <div class="content-item">
                    <label>办公室电话</label>
                    <input name="workphone" class="easyui-validatebox" type="text" placeholder="请输入办公室电话" data-options="validType:'phone'" maxlength="12" />
                </div>
                <div class="content-item">
                    <label>邮箱</label>
                    <input name="email" class="easyui-validatebox" type="text" placeholder="请输入邮箱" data-options="validType:'email'" maxlength="50" />
                </div>
                <div class="content-item">
                    <label>家庭住址</label>
                    <input name="address" class="easyui-validatebox" type="text" placeholder="请输入家庭住址" maxlength="100" />
                </div>
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
                    <label>姓名*</label>
                    <input id="editName" class="easyui-validatebox" type="text" placeholder="请输入姓名" data-options="required:true,validType:'allName'" maxlength="50"
                    />
                </div>
                <div class="content-item">
                    <label>性别*</label>
                    <div id="editGender" class="edit-chose-gender">
                        <a class="radio-wrapper radio-checked">
                            <i></i>
                            <input value="男" type="radio" name="edit-gender" checked="checked"> 男
                        </a>
                        <a class="radio-wrapper">
                            <i></i>
                            <input value="女" type="radio" name="edit-gender"> 女
                        </a>
                    </div>
                </div>
                <div class="content-item">
                    <label>电话号码*</label>
                    <input id="editTelephone" class="easyui-validatebox" type="text" placeholder="请输入电话号码" data-options="required:true,validType:'mobile'" maxlength="11"/>
                </div>
                <div class="content-item">
                    <label>身份证号码*</label>
                    <input id="editIdCard"  class="easyui-validatebox" type="text" placeholder="请输入身份证号码" data-options="required:true,validType:'idcard'" maxlength="18"
                    />
                </div>
                
                <div class="content-item">
                    <label>角色*</label>
                    <select name="" id="editRoleId" class="easyui-validatebox edit-role" data-options="validType:'selectValueRequired'">
                        <!-- JS -->
                    </select>
                </div>
                
                <div class="content-item">
                    <label>部门*</label>
                    <select name="" id="editDep" class="easyui-combotrees" data-options="required:true, prompt:'请选择部门'">
                    </select>
                </div>
                
                <div class="content-item">
                    <label>状态*</label>
                    <select name="" id="editPersonStatusId" class="easyui-validatebox edit-role" data-options="validType:'selectValueRequired'">
                        <!-- JS -->
                    </select>
                </div>
                
                <div class="content-item">
                    <label>工号</label>
                    <input id="editSn" class="easyui-validatebox" type="text" placeholder="请输入工号" data-options="validType:'englishNumber'" maxlength="50"
                    />
                </div>
                <div class="content-item">
                    <label>职务</label>
                    <input id="editPosition" class="easyui-validatebox" type="text" placeholder="请输入职务名称" data-options="validType:'allName'" maxlength="11" />
                </div>
                <div class="content-item">
                    <label>办公室电话</label>
                    <input id="editWorkphone" class="easyui-validatebox" type="text" placeholder="请输入办公室电话" data-options="validType:'phone'" maxlength="12" />
                </div>
                <div class="content-item">
                    <label>邮箱</label>
                    <input id="editEmail" class="easyui-validatebox" type="text" placeholder="请输入邮箱" data-options="validType:'email'" maxlength="50" />
                </div>
                <div class="content-item">
                    <label>家庭住址</label>
                    <input id="editAddress" class="easyui-validatebox" type="text" placeholder="请输入家庭住址" maxlength="100" />
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit edit-submit">提交</div>
        </div>
    </div>
    <!-- 分配账号框 -->
    <div class="popup account-popup">
        <div class="title">
            <span>分配账号</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <div class="content-item">
                <label>*用户名</label>
                <input name="userName" type="text" placeholder="请输入用户名" maxlength="50" />
            </div>
        </div>
        <div class="footer">
            <div class="submit account-submit">提交</div>
        </div>

    </div>
    <!-- 分配管辖区域框 -->
    <div class="popup region-popup">
        <div class="title">
            <span>分配区域</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <div class="content-item">
                <label>姓名</label>
                <span>张阿三</span>
            </div>
            <table class="treetable" id="treeTable1">
                <!-- JS -->
            </table>
        </div>
        <div class="footer">
            <div class="submit region-submit">提交</div>
        </div>

    </div>
    <!-- 初始化密码框 -->
    <div class="infor-wrapper init-pwd-wrapper">
        <p>
            <i></i>
            是否确认初始化密码?
        </p>
        <div>
            <a class="init-confirm">确认</a>
            <a class="infor-cancel">取消</a>
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
	
 	<div class="infor-wrapper addToAddressList-wrapper">
        <p>
            <i></i>
            	加入通讯录?
        </p>
        <div>
            <a class="addToAddressList-confirm">加入</a>
            <a class="infor-cancel">取消</a>
        </div>
    </div>
    
    
    
    
    
    
    <script src="<%=basePath%>front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath%>front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath%>front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath%>front/public/js/jquery.treetable.js"></script>
    <script src="<%=basePath%>front/public/js/customPrompt.js"></script>
    <script src="<%=basePath%>front/public/js/common.js"></script>
    <!-- <script src="../js/refresh.js"></script> -->
    <script src="<%=basePath%>front/public/js/personConfig.js"></script>
</body>
</html>