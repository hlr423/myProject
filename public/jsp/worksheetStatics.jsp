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
    <title>统计报表/工单统计</title>
    <link rel="stylesheet" href="<%=basePath %>front/public/css/easyui.css">
    
    <link rel="stylesheet" href="<%=basePath %>front/public/css/workListStatistics.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-nav">
            <!-- date -->
            <div class="title">
                    <input type="text" class="data-year1  chose-time" placeholder="请选择年份">
                <select class="data">
                    <option value="0" selected>年</option>
                    <option value="1">季度</option>
                    <option value="2">月</option>
                </select>
                <input type="text" class="data-year data-show chose-time" placeholder="请选择年份">
                <select class="data-quarter">
                    <option value="0">春季</option>
                    <option value="1">夏季</option>
                    <option value="2">秋季</option>
                    <option value="3">冬季</option>
                </select>
                <input type="text" class="data-month chose-time" placeholder="请选择月份">
            </div>
            <div class="order-btn btn">搜索</div> 
        </div>
        <div class="person-statistics">
            <!-- 工单数统计 -->
            <div class="work-time">
                <div class="title">
                    <span>工单数统计</span>
                </div>
                <div>
                    <div id="echart1"></div>
                    <ul>
                        <li>
                            <p>工单总数</p>
                            <span class="time-all">10000</span>
                        </li>
                        <li>
                            <p>已完成工单 </p>
                            <span class="time-all">9950</span>
                        </li>
                        <li>
                            <p>未完成工单 </p>
                            <span class="time-all">50</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 工单分类统计 -->
              <div class="work-time">
                    <div class="title">
                        <span>工单分类统计</span>
                    </div>
                    <div>
                        <div id="echarts-wrapper-oilFee" class="echarts-wrapper"></div>
                        <div class="work-time-text">
    
                            <p>工单总数</p>
                            <p class="allfee"> <span>100,000</span> </p>    
                            <div>
                                <p class="text-p">工单1类
                                    <br>
                                    <span>
                                        41345
                                    </span>
                                </p>
                                <p class="text-p">工单2类
                                    <br>
                                    <span>
                                        22435
                                    </span>
                                </p>
                                <p class="text-p">工单3类
                                    <br>
                                    <span>
                                        31834
                                    </span>
                                </p>
                                <p class="text-p">工单4类
                                    <br>
                                    <span>
                                        4385
                                    </span>
                                    元
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    <script src="<%=basePath %>front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath %>front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath %>front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath %>front/public/js/laydate/laydate.js"></script>
    <script src="<%=basePath %>front/public/js/common.js"></script>
    <script src="<%=basePath %>front/public/js/echarts.js"></script>
    <script src="<%=basePath %>front/public/js/customPrompt.js"></script>
    <script src="<%=basePath %>front/public/js/workListStatistics.js"></script>
    <!--<script src="../js/refresh.js"></script> -->
</body>

</html>