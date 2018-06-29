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
    <title>财务分析</title>
    <link rel="stylesheet" href="<%=basePath %>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>front/public/css/money.css">
  	<style type="text/css">
  		.tanghui{
  			float: right;
  		}
  	</style>
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
            <select id="countType" class="searchSelect">
            	<option value="0">同比</option>
            	<option value="1">环比</option>
            </select>
            <input type="text" placeholder="请选择时间" id="startTime1" class="chose-time">
            <input type="button" value="搜索" class="financialAnalysis"/>
           <!--  <div class="financialAnalysis" onClick="search();">搜索</div> -->
        </div>
        <div class="echart-wrapper">
            <div>
                <p class="echart-title">车辆费用分析</p>
                <div>
                    <div id="echart1" class="echart"></div>
                    <div id="carMoneyDiv" class="detail">
                    	
                    </div>
                </div>
            </div>
            <div>
                <p class="echart-title">电耗费用分析</p>
                <div>
                    <div id="echart2" class="echart"></div>
                    <div id="dfMoneyDiv" class="detail"></div>
                </div>
            </div>
            <div>
                <p class="echart-title">药耗费用分析</p>
                <div>
                    <div id="echart3" class="echart"></div>
                    <div id="yhMoneyDiv" class="detail">
                    </div>
                </div>
            </div>
            <div>
                <p class="echart-title">人工成本分析</p>
                <div>
                    <div id="echart4" class="echart"></div>
                    <div id="rgMoneyDiv" class="detail">
                        
                    </div>
                </div>
            </div>
        </div>

        <script src="<%=basePath %>front/public/js/jquery-3.2.1.min.js"></script>
        <script src="<%=basePath %>front/public/js/jquery.easyui.min.js"></script>
        <script src="<%=basePath %>front/public/js/easyui-lang-zh_CN.js"></script>
        <script src="<%=basePath %>front/public/js/echarts.js"></script>
         <script src="<%=basePath %>front/public/js/laydate/laydate.js"></script>
        <script src="<%=basePath %>front/public/js/customPrompt.js"></script>
        <script src="<%=basePath %>front/public/js/common.js"></script>
        <!-- <script src="../js/refresh.js"></script> -->
        <script src="<%=basePath %>front/public/js/money.js"></script>
</body>

</html>