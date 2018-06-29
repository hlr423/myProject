<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>厂站配置</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/swiper-3.4.2.min.css">
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/stationConfigure.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>
<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
        	<select id="toparea" class="easyui-combotrees cbt" data-options="required:true,prompt:'请选择区域'">
	        </select>
	        <input type="text" placeholder="请输入厂站名称" id="keyword">
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
            <form class="newAdd-form" method="post" action="addStation" enctype="multipart/form-data">
                <div class="content-item">
                    <label for="station-name">*厂站名称:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'allName'" placeholder="请输入厂站名称" maxlength="50" name="name"/>
                </div>
                <div class="content-item">
                    <label for="station-region">*区域:</label>
                    <select class="easyui-combotrees cbt" data-options="required:true,prompt:'请选择区域'" id="area" name="areaId">
       				</select>
                </div>
                <div class="content-item">
                    <label for="station-address">*地址:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'address'" placeholder="请输入地址" maxlength="100" name="address"/>
                </div>
                <div class="content-item">
                    <label for="station-area">*占地面积:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'"  placeholder="请输入占地面积(㎡)" maxlength="8" name="totalArea"/>
                </div>
                <div class="content-item">
                    <label for="station-water">*设计处理水量:</label>
                    <select class="easyui-validatebox" data-options="validType:'selectValueRequired',prompt:'请选择处理水量'" maxlength="30" id="treatWater" name="twId">
       				</select>
       			</div>
                <div class="content-item">
                    <label for="station-people">*责任人:</label>
                    <select class="easyui-validatebox" data-options="validType:'selectValueRequired',prompt:'请选择负责人'" maxlength="30" id="person" name="personId">
       				</select>
                </div>
                <div class="content-item">
                    <label for="station-SIM">*SIM卡号:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'englishNumber'" placeholder="请输入SIM卡号" maxlength="20" name="sim"/>
                </div>
                <div class="content-item">
                    <label for="station-cost">*通讯费:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="请输入通讯费(元)" maxlength="12" name="communicationCost"/>
                </div>
                <div class="content-item">
                    <label for="station-picture">厂站图片:</label>
                    <div class="inputFile station-picture">
                        <input type="file" multiple="multiple" name="stationPic">
                        <span><i></i>上传文件</span>
                        <span>支持.jpg/.png/.JPEG</span>
                    </div>
                </div>
                <div class="content-item">
                    <label for="station-paper">厂站图纸:</label>
                    <div class="inputFile station-paper">
                        <input type="file" multiple="multiple" name="stationDraw">
                        <span><i></i>上传文件</span>
                        <span>请选择文件...</span>
                    </div>
                </div>
                <div class="content-item">
                    <span>*设计进水指标值(mg/L):</span>
                </div>
                <div class="content-item">
                    <label for="station-COD">*COD:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="请输入COD值" maxlength="12" name="cod"/>
                </div>
                <div class="content-item">
                    <label for="station-TP">*TP:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="请输入TP值" maxlength="12" name="tp"/>
                </div>
                <div class="content-item">
                    <label for="station-TN">*TN:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="请输入TN值" maxlength="12" name="tn"/>
                </div>
                <div class="content-item">
                    <label for="station-SS">*SS:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" placeholder="请输入SS值" maxlength="12" name="ss"/>
                </div>
                <div class="content-item">
                    <label for="station-standard">*出水标准:</label>
                    <select class="easyui-validatebox" data-options="validType:'selectValueRequired',prompt:'请选择出水标准'" maxlength="30" id="outWater" name="owId">
       				</select>
                </div>
            </form>
        </div>
        <div class="footer">
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
            <form class="edit-form" method="post" action="updateStation" enctype="multipart/form-data">
                <div class="content-item">
                    <label for="station-name">*厂站名称:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'allName'" maxlength="50" name="name"/>
                </div>
                <div class="content-item">
                    <label for="station-region">*区域:</label>
                     <select class="easyui-combotrees cbt" data-options="required:true,prompt:'请选择区域'" id="earea" name="areaId">
       				</select>
                </div>
                <div class="content-item">
                    <label for="station-address">*地址:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'address'" maxlength="100" name="address"/>
                </div>
                <div class="content-item">
                    <label for="station-area">*占地面积:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" maxlength="8" name="totalArea"/>
                </div>
                <div class="content-item">
                    <label for="station-water">*设计处理水量:</label>
                    <select class="easyui-validatebox" data-options="validType:'selectValueRequired',prompt:'请选择处理水量'" maxlength="30" id="etreatWater" name="twId">
       				</select>
                </div>
                <div class="content-item">
                    <label for="station-people">*责任人:</label>
                    <select class="easyui-validatebox" data-options="validType:'selectValueRequired',prompt:'请选择负责人'" maxlength="30" id="eperson" name="personId">
       				</select>
                </div>
                <div class="content-item">
                    <label for="station-SIM">*SIM卡号:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'englishNumber'" maxlength="20" name="sim"/>
                </div>
                <div class="content-item">
                    <label for="station-cost">*通讯费:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" maxlength="12" name="communicationCost"/>
                </div>
                <div class="content-item">
                    <label for="station-picture">厂站图片:</label>
                    <div class="inputFile station-picture">
                        <input type="file" multiple="multiple" name="stationPic">
                        <span><i></i>上传文件</span>
                        <span>支持.jpg/.png/.JPEG</span>
                    </div>
                </div>
                <div class="content-item ">
                    <label for="station-pictures">已有图片:</label>
                    <div class="content-item-img pic">
                    </div>
                </div>
                <div class="content-item">
                    <label for="station-paper">厂站图纸:</label>
                    <div class="inputFile station-paper">
                        <input type="file" multiple="multiple" name="stationDraw">
                        <span><i></i>上传文件</span>
                        <span>请选择文件...</span>
                    </div>
                </div>
                <div class="content-item ">
                    <label for="station-pictures">已有图纸:</label>
                    <div class="content-item-img draw">
                    </div>
                </div>
                <div class="content-item">
                    <span>*设置进水指标值(mg/L):</span>
                </div>
                <div class="content-item">
                    <label for="station-COD">*COD:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" maxlength="12" name="cod"/>
                </div>
                <div class="content-item">
                    <label for="station-TP">*TP:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" maxlength="12" name="tp"/>
                </div>
                <div class="content-item">
                    <label for="station-TN">*TN:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" maxlength="12" name="tn"/>
                </div>
                <div class="content-item">
                    <label for="station-SS">*SS:</label>
                    <input class="easyui-validatebox" type="text" data-options="required:true,validType:'intOrFloat'" maxlength="12" name="ss"/>
                </div>
                <div class="content-item">
                    <label for="station-standard">*出水标准:</label>
                    <select class="easyui-validatebox" data-options="validType:'selectValueRequired',prompt:'请选择出水标准'" maxlength="30" id="eoutWater" name="owId">
       				</select>
                </div>
                <input type="hidden" name="id">
                <input type="hidden" name="picIds">
            </form>
        </div>
        <div class="footer">
            <div class="submit edit-submit">提交</div>
        </div>
    </div>
    <!--进水指标详情-->
    <div class="popup index-wrapper">
        <div class="title">
            <span>设计进水指标值</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
        	<!-- js动态加载进水指标 -->
        </div>
        <div class="footer">
            <!--<div class="submit edit-submit">提交</div>-->
        </div>
    </div>
    <!--厂站照片弹窗-->
    <div class="popup picture-wrapper">
        <div class="title">
            <span>厂站照片</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
        	<!-- js动态加载厂站照片 -->
        </div>
    </div>
    <!--厂站图纸弹窗-->
    <div class="popup paper-wrapper">
        <div class="title">
            <span>厂站图纸</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
        	<!-- js动态加载厂站图纸 -->
        </div>
        <div class="footer">
            <div class="submit paper-submit">确认</div>
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
    <script src="<%=basePath %>/front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath %>/front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath %>/front/public/js/swiper-3.4.2.min.js"></script>
    <script src="<%=basePath %>/front/public/js/common.js"></script>
    <script src="<%=basePath %>/front/public/js/customPrompt.js"></script>
     <!--<script src="<%=basePath %>/front/public/js/refresh.js"></script> -->
    <script src="<%=basePath %>/front/public/js/stationConfigure.js"></script>
</body>
</html>