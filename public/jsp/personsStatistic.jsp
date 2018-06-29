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
    <title>统计报表/人员统计</title>
    <link rel="stylesheet" href="<%=basePath%>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath%>front/public/css/personnelStatistics.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-nav">
            <select class="easyui-validatebox part-factory ">
                <option value="0">请选择部门</option>
                <option value="1">部门1</option>
                <option value="2">部门2</option>
                <option value="3">部门3</option>
            </select>
            <select class="easyui-validatebox part-factory ">
                <option value="0">请选择人员</option>
                <option value="1">人员1</option>
                <option value="2">人员2</option>
                <option value="3">人员3</option>
            </select>
            <input type="text" class="input-search" placeholder=" 请输入部门名称" maxlength="50">
            <div class="orderSearch-btn btn">搜索</div>
        </div>
        <div class="person-information">
            <div>
                <div class="headImg">
                    <img src="../images/head-img.png" alt="">
                </div>
            </div>
            <div>
                <p class="name-text">
                    <span>张江龙</span>
                    <i></i>
                    <span>
                        <i></i>天翔内部人员
                    </span>

                </p>
                <div class="item">
                    <p>
                        <span>
                            <i class="icon"></i>
                        </span>角色:
                        <span>超级管理员</span>
                    </p>
                    <p>
                        <span>
                            <i class="icon"></i>
                        </span>身份证号:
                        <span>544556133424453977</span>
                    </p>
                </div>
                <div class="item">
                    <p>
                        <span>
                            <i class="icon"></i>
                        </span>电话:
                        <span>12345676543</span>
                    </p>
                    <p>
                        <span>
                            <i class="icon"></i>
                        </span>办公室电话:
                        <span>028-1234567</span>
                    </p>
                </div>
                <div class="item">
                    <p>
                        <span>
                            <i class="icon"></i>
                        </span>邮箱:
                        <span title="12345676543@qq.com">12345676543@qq.com</span>
                    </p>
                    <p>
                        <span>
                            <i class="icon"></i>
                        </span>家庭住址:
                        <span title="成都市高兴区天府大道天府软件园B区7-615">成都市高兴区天府大道天府软件园B区7-615</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="person-statistics">
            <div class="work-time">
                <div class="title">
                    <span>工时统计</span>
                    <select class="data">
                        <option value="0">年</option>
                        <option value="1">季度</option>
                        <option value="2">月</option>
                    </select>
                    <input type="text" class="data-year data-show chose-time" placeholder="请选择日期">
                    <select class="data-quarter">
                        <option value="0">春季</option>
                        <option value="1">夏季</option>
                        <option value="2">秋季</option>
                        <option value="3">冬季</option>
                    </select>
                    <input type="text" class="data-month chose-time" placeholder="请选择月份">
                    <div class="time-btn btn">搜索</div>
                </div>
                <div>
                    <div id="echart1"></div>
                    <ul>
                        <li>
                            <p>总工时: </p>
                            <span class="time-all">2016</span>
                            <a>h</a>
                        </li>
                        <li>
                            <p>在岗时间:</p>
                            <span class="time-stay">1936</span>
                            <a>h</a>
                        </li>
                        <li>
                            <p>请假时间: </p>
                            <span class="time-leave">80</span>
                            <a>h</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="work-order">
                <div class="title">
                    <span>工单统计</span>
                    <select class="data">
                        <option value="0">年</option>
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
                    <div class="order-btn btn">搜索</div>
                </div>
                <ul>
                    <li>
                        <i></i>
                        <p>完成工单数量</p>
                        <p class="order-num">1152</p>
                    </li>
                    <li>
                        <i></i>
                        <p>任务数量</p>
                        <p class="task-num">2021</p>
                    </li>
                    <li>
                        <i></i>
                        <p>任务效率</p>
                        <p class="task-efficiency">100%</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="work-efficiency">
            <div class="title">
                <span>效率统计</span>
                <select class="data">
                    <option value="0">年</option>
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
                <div class="efficiency-btn btn">搜索</div>
            </div>
            <div id="echart2"></div>
        </div>
    </div>
    <script src="<%=basePath%>front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath%>front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath%>front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath%>front/public/js/laydate/laydate.js"></script>
    <script src="<%=basePath%>front/public/js/common.js"></script>
    <script src="<%=basePath%>front/public/js/echarts.js"></script>
    <script src="<%=basePath%>front/public/js/customPrompt.js"></script>
    <script src="<%=basePath%>front/public/js/personnelStatistics.js"></script>
    <!--<script src="../js/refresh.js"></script> -->
</body>

</html>
