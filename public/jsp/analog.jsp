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
    <title>模拟量</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/select2.css">
    <link rel="stylesheet" href="<%=basePath %>front/public/css/swiper-3.4.2.min.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/analog.css">
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
                <!-- <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>普安乡污水处理厂</td>
                        <td>粗格栅及提升泵池</td>
                        <td>仪表A</td>
                        <td>37</td>
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
            <form id="newForm" action="addAnalog" method="post">
                <div class="content-item">
                    <label>区域*</label>
                    <select id="area" class="easyui-combotrees cbt" >
                    <option>请选择区域</option>
                    </select>
                </div>
                <div class="content-item">
                    <label>厂站*</label>
                    <select name="" id="stations" class="easyui-validatebox" data-options="validType:'selectValueRequired'" onchange=getPosition()>
                        <option>请选择厂站</option>
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
                    <label>所占字节*</label>
                    <input id="len" class="easyui-validatebox" type="text" placeholder="请输入字节序号" data-options="required:true,validType:'numInt'" maxlength="1"
                    />
                </div>
                <div class="content-item">
                    <label>字节序号*</label>
                    <input id="subfix" class="easyui-validatebox" type="text" placeholder="请输入字节序号" data-options="required:true,validType:'numInt'" maxlength="3"
                    />
                </div>
                <div class="content-item">
                    <label>MAX</label>
                    <input id="max" class="easyui-validatebox" type="text" placeholder="请输入最大值" maxlength="50" />
                </div>
                <div class="content-item">
                    <label>MIN</label>
                    <input id="min" class="easyui-validatebox" type="text" placeholder="请输入最小值" maxlength="50" />
                </div>
                <div class="content-item">
                    <label>速度</label>
                    <input id="speed" class="easyui-validatebox" type="text" placeholder="请输入速度值" maxlength="50" />
                </div>
                <div class="content-item">
                    <label>面积</label>
                    <input id="square" class="easyui-validatebox" type="text" placeholder="请输入面积大小" maxlength="50" />
                </div>
                
                 <div class="content-item new-key-item">
                    <label>关键参数</label>
                    <div class="new-key-radio">
                       <!--  <div>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row" value="1">
                            </a>
                            <span>关键参数1</span>
                        </div>
                        <div>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row" value="2">
                            </a>
                            <span>关键参数2</span>
                        </div>
                        <div>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row" value="3">
                            </a>
                            <span>关键参数3</span>
                        </div>
                        <div>
                            <a class="checkbox-wrapper">
                                <i></i>
                                <input type="checkbox" name="" id="" class="check-row" value="4">
                            </a>
                            <span>关键参数4</span>
                        </div> -->
                    </div>
                </div>
                
                
                <div class="new-key-wrapper">
                    <div class="content-item">
                        <label>属性名</label>
                        <span></span>
                    </div>
                    <div class="content-item">
                        <label>属性值</label>
                        <span></span>
                    </div>
                    <div class="content-item">
                        <label>单位</label>
                        <span></span>
                    </div>
                    <div class="content-item">
                        <label>上限</label>
                        <span></span>
                    </div>
                    <div class="content-item">
                        <label>下限</label>
                        <span></span>
                    </div>
                </div>
                
                <div class="content-item">
                    <label>药品价格</label>
                    <input id="price" class="easyui-validatebox" type="text" placeholder="请输入药品价格" maxlength="50" />
                </div>
                <div class="content-item">
                    <label>描述</label>
                    <textarea id="description" placeholder="请输入描述"></textarea>
                </div>
                <input id="addAnalog" type="hidden" value="" name="analog">
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
                     <!--  <select name="" id="" class="easyui-validatebox" data-options="validType:'selectValueRequired'">
                        <option value="0">请选择级别</option>
                        <option value="1">普安乡污水处理厂</option>
                    </select>-->
                </div>
                <div class="content-item">
                    <label>位置</label>
                    <select name="" id="eposition" class="easyui-validatebox" onchange="getEditEquip()">
                        <option value="0">请选择位置</option>
                       
                    </select>
                </div>
                <div class="content-item">
                    <label>设备</label>
                    <select name="" id="eequip" class="easyui-validatebox">
                        <option value="0">请选择设备</option>
                       
                    </select>
                </div>
                <div class="content-item">
                    <label>所占字节*</label>
                    <input id="elen" class="easyui-validatebox" type="text" placeholder="请输入字节序号" data-options="required:true,validType:'numInt'" maxlength="1"
                    />
                </div>
                <div class="content-item">
                    <label>字节序号*</label>
                    <input id="esubfix" class="easyui-validatebox" type="text" placeholder="请输入字节序号" data-options="required:true,validType:'numInt'" maxlength="3"
                    />
                </div>
                <div class="content-item">
                    <label>MAX</label>
                    <input id="emax" class="easyui-validatebox" type="text" placeholder="请输入最大值" maxlength="50" />
                </div>
                <div class="content-item">
                    <label>MIN</label>
                    <input id="emin" class="easyui-validatebox" type="text" placeholder="请输入最小值" maxlength="50" />
                </div>
                <div class="content-item">
                    <label>速度</label>
                    <input id="espeed" class="easyui-validatebox" type="text" placeholder="请输入速度值" maxlength="50" />
                </div>
                <div class="content-item">
                    <label>面积</label>
                    <input id="esquare" class="easyui-validatebox" type="text" placeholder="请输入面积大小" maxlength="50" />
                </div>
                <div class="content-item">
                    <label>药品价格</label>
                    <input id="eprice" class="easyui-validatebox" type="text" placeholder="请输入药品价格" maxlength="50" />
                </div>
                 <div class="content-item edit-key-item">
                        <label>关键参数</label>
                        <div class="edit-key-radio">
                            <div>
                                <a class="checkbox-wrapper">
                                    <i></i>
                                    <input type="checkbox" name="" id="" class="check-row" value="1">
                                </a>
                                <span>关键参数1</span>
                            </div>
                            <div>
                                <a class="checkbox-wrapper">
                                    <i></i>
                                    <input type="checkbox" name="" id="" class="check-row" value="2">
                                </a>
                                <span>关键参数2</span>
                            </div>
                            <div>
                                <a class="checkbox-wrapper">
                                    <i></i>
                                    <input type="checkbox" name="" id="" class="check-row" value="3">
                                </a>
                                <span>关键参数3</span>
                            </div>
                            <div>
                                <a class="checkbox-wrapper">
                                    <i></i>
                                    <input type="checkbox" name="" id="" class="check-row" value="4">
                                </a>
                                <span>关键参数4</span>
                            </div>
                        </div>
                    </div>
                    <div class="edit-key-wrapper">
                        <div class="content-item">
                            <label>属性名</label>
                            <span></span>
                        </div>
                        <div class="content-item">
                            <label>属性值</label>
                            <span></span>
                        </div>
                        <div class="content-item">
                            <label>单位</label>
                            <span></span>
                        </div>
                        <div class="content-item">
                            <label>上限</label>
                            <span></span>
                        </div>
                        <div class="content-item">
                            <label>下限</label>
                            <span></span>
                        </div>
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
    <!-- 关键参数 -->
    <div class="popup key-param-detail">
    	<div class="title">
            <span>关键参数</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
        	<!-- <div class="content-item">
        		<label>属性名</label>
                <span></span>
            </div> -->
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
    <script src="<%=basePath%>front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath%>front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath%>front/public/js/easyui-lang-zh_CN.js"></script>
     <script src="<%=basePath %>front/public/js/select2.js"></script>
	<script src="<%=basePath %>front/public/js/pinyin.js"></script>
    <script src="<%=basePath%>front/public/js/customPrompt.js"></script>
    <script src="<%=basePath%>front/public/js/common.js"></script>
    <!-- <script src="../js/refresh.js"></script> -->
    <script src="<%=basePath%>front/public/js/analog.js"></script>
</body>

</html>