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
    <title>开关量</title>
    <link rel="stylesheet" href="<%=basePath %>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>front/public/css/analog.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
            <select id="client" class="easyui-combotrees cbt" >
                <option>请选择区域</option>
            </select>
            <select name="" id="stationList" onchange="chooseStation()">
                
            </select>
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
                        <td>1</td>
                        <td>2</td>
                        <td>停止</td>
                        <td>运行</td>
                        <td>普安乡污水处理厂</td>
                        <td>粗格栅及提升泵池</td>
                        <td>仪表A</td>
                        <td>超声波液位计（粗格栅）/液位值</td>
                    </tr>

                </tbody> -->
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
            <form id="newForm" method="post" action="addSwitch">
                <div class="content-item">
                    <label>区域</label>
                    <select id="area" class="easyui-combotrees cbt" >
                        <option>请选择区域</option>
                    </select>
                </div>
                <div class="content-item">
                    <label>厂站*</label>
                    <select name="" id="stations" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                       
                    </select>
                </div>
                <div class="content-item">
                    <label>位置</label>
                    <select name="" id="positions" class="easyui-validatebox" onchange="getEquip()">
                        
                    </select>
                </div>
                <div class="content-item">
                    <label>设备</label>
                    <select name="" id="equips" class="easyui-validatebox">

                    </select>
                </div>
                <div class="content-item">
                    <label>字节序号*</label>
                    <input id="subfix" class="easyui-validatebox" type="text" placeholder="请输入字节序号" data-options="required:true,validType:'numInt'" maxlength="3"
                    />
                </div>
                <div class="content-item">
                    <label>位号*</label>
                    <input id="bitfix" class="easyui-validatebox" type="text" placeholder="请输入位号" data-options="required:true,validType:'numOneEight'" maxlength="3"
                    />
                </div>
                <div class="content-item">
                    <label>off_des</label>
                    <input id="off_des" class="easyui-validatebox" type="text" placeholder="请输入位号为0的描述"  maxlength="50" />
                </div>
                <div class="content-item">
                    <label>on_des</label>
                    <input id="on_des" class="easyui-validatebox" type="text" placeholder="请输入位号为1的描述"  maxlength="50" />
                </div>
                
                <div class="content-item">
                    <label>描述</label>
                    <textarea id="description" placeholder="请输入描述"></textarea>
                </div>
                <input id="addSwitch" type="hidden" value="" name="switch1">
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
                    <label>厂站*</label>
                    <input id="estation" value=" "  disabled="true" class="easyui-validatebox" type="text"  maxlength="50"/>
                    
                </div>
                
                <div class="content-item">
                    <label>位置</label>
                    <select name="" id="eposition" class="easyui-validatebox" onchange="getEditEquip()">
                        
                    </select>
                </div>
                <div class="content-item">
                    <label>设备</label>
                    <select name="" id="eequip" class="easyui-validatebox">
                        
                    </select>
                </div>
                <div class="content-item">
                    <label>字节序号*</label>
                    <input id="esubfix" class="easyui-validatebox" type="text" placeholder="请输入字节序号" data-options="required:true,validType:'numInt'" maxlength="3"
                    />
                </div>
                <div class="content-item">
                    <label>位号*</label>
                    <input id="ebitfix" class="easyui-validatebox" type="text" placeholder="请输入位号" data-options="required:true,validType:'numOneEight'" maxlength="3"
                    />
                </div>
                <div class="content-item">
                    <label>off_des</label>
                    <input id="eoff_des" class="easyui-validatebox" type="text" placeholder="请输入位号为0的描述"  maxlength="50" />
                </div>
                <div class="content-item">
                    <label>on_des</label>
                    <input id="eon_des" class="easyui-validatebox" type="text" placeholder="请输入位号为1的描述"  maxlength="50" />
                </div>
                
                <div class="content-item">
                    <label>描述</label>
                    <textarea id="edescription" placeholder="请输入描述"></textarea>
                </div>
            </form>
        </div>
        <div class="footer">
            <div class="submit edit-submit">提交</div>
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
    <script src="<%=basePath %>front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath %>front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath %>front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath %>front/public/js/customPrompt.js"></script>
    <script src="<%=basePath %>front/public/js/common.js"></script>
    <!-- <script src="../js/refresh.js"></script> -->
    <script src="<%=basePath %>front/public/js/switch.js"></script>
</body>

</html>