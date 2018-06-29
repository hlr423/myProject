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
    <title>统计报表/厂站统计</title>
    <link rel="stylesheet" href="<%=basePath %>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>front/public/css/factoryStationStatistics.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-nav">
            <select id="select-area" class=" part-factory  easyui-combotrees " >
                <option value="0">全部区域</option>
                <option value="1">区域1</option>
                <option value="2">区域2</option>
                <option value="3">区域3</option>
            </select>

            <select class="easyui-validatebox part-factory stationValue" id="stations">
                <option value="0">全部厂站</option>
                <option value="1">厂站1</option>
                <option value="2">厂站2</option>
                <option value="3">厂站3</option>
            </select>

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
                    <option value="1">春季</option>
                    <option value="2">夏季</option>
                    <option value="3">秋季</option>
                    <option value="4">冬季</option>
                </select>
                <input type="text" class="data-month chose-time" placeholder="请选择月份">
            </div>
            <input type="text" class="input-search" placeholder=" 搜索厂站" maxlength="50">
            <div class="order-btn btn">搜索</div>
        </div>
        <div class="person-statistics">
            <!-- 厂站数量统计图1 -->
            <div class="work-time">
                <div class="title">
                    <span>厂站数量统计</span>
                </div>
                <div>
                    <div id="echart1"></div>
                    <ul>
                        <li>
                            <span class="time-all" id="stationtotal">152</span>
                        </li>
                        <li>
                            总数量
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 处理水量统计图2 -->
            <div class="work-time">
                <div class="title">
                    <span>处理水量统计</span>
                </div>
                <div>
                    <div id="echarts-wrapper1" class="echarts-wrapper"></div>
                    <div id="echarts-wrapper2" class="echarts-wrapper"></div>
                </div>
            </div>
            <!-- 达标统计图 3-->
            <div class="work-time">
                <div class="title">
                    <span>达标统计</span>
                </div>
                <div>
                    <div id="echarts-wrapper-standard1" class="echarts-wrapper"></div>
                    <div id="echarts-wrapper-standard2" class="echarts-wrapper "></div>
                    <div id="echarts-wrapper-standard3" class="echarts-wrapper"></div>
                </div>
            </div>
            <!-- 耗电统计图 4-->
            <div class="work-time">
                <div class="title">

                    <div class="select-btn">
                        <span>耗电统计</span>
                        <div class="select-btn-1">
                            <select class="easyui-validatebox part-factory ">
                                <option value="0">全部处理量</option>
                                <option value="1">处理量1</option>
                                <option value="2">处理量2</option>
                                <option value="3">处理量3</option>
                            </select>
                            <select class="easyui-validatebox part-factory ">
                                <option value="0">全部设备</option>
                                <option value="1">设备1</option>
                                <option value="2">设备2</option>
                                <option value="3">设备3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="work-time-text">
                        <p>累计电耗(Kw): </p>
                        <p>18545 </p>
                    </div>
                    <div id="echarts-wrapper-consumePower"></div>
                </div>
            </div>
            <!-- 药耗统计图 5-->
            <div class="work-time">
                <div class="title">

                    <div class="select-btn">
                        <span>药耗统计</span>
                        <div class="select-btn-1">
                            <select class=" easyui-validatebox part-factory ">
                                <option value="0">全部处理量</option>
                                <option value="1">处理量1</option>
                                <option value="2">处理量2</option>
                                <option value="3">处理量3</option>
                            </select>
                            <select class="easyui-validatebox part-factory ">
                                <option value="0">全部药剂</option>
                                <option value="1">次氨酸钠</option>
                                <option value="2">柠檬酸</option>
                                <option value="3">除磷</option>
                                <option value="3">碳源</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="work-time-text">
                        <p>累计药耗(mg): </p>
                        <p>185,512 </p>
                        <div class="text-bs">
                            <p><i></i>次氨酸钠</p>
                            <p><i></i>柠檬酸</p>
                            <p><i></i>除磷</p>
                            <p><i></i>碳源</p>
                        </div>
                    </div>
                    <div id="echarts-wrapper-drugPower"></div>
                </div>
            </div>
            <!-- 人工成本统计图6 -->
            <div class="work-time">
                <div class="title">
                    <span>人工成本统计</span>
                </div>
                <div>
                    <div class="work-time-text">
                        <p>累计成本(￥): </p>
                        <p>185,512 </p>
                    </div>
                    <div id="echarts-wrapper-personCost"></div>
                </div>
            </div>
            <!-- 厂站用水成本统计图 7-->
            <div class="work-time">
                <div class="title">
                    <span>厂站用水成本统计</span>
                </div>
                <div>
                    <div class="work-time-text">
                        <p>累计成本(￥): </p>
                        <p>185,512 </p>
                    </div>
                    <div id="echarts-wrapper-factoryWater"></div>
                </div>
            </div>
            <!-- 厂站总成本统计图 8-->
            <div class="work-time">
                <div class="title">
                    <span>厂站总成本统计</span>
                </div>
                <div>
                    <div class="work-time-text">
                        <p>累计成本(￥): </p>
                        <p>185,512 </p>
                    </div>
                    <div id="echarts-wrapper-factoryallCost"></div>
                </div>
            </div>
            <!-- 厂站平均出水指标 9-->
            <div class="work-time">
                <div class="title">
                    <div class="select-btn">
                        <span>厂站平均出水指标</span>
                        <div class="select-btn-1">
                            <select class="easyui-validatebox part-factory ">
                                <option value="1">COD</option>
                                <option value="2">TP</option>
                                <option value="3">TN</option>
                                <option value="3">SS</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div>
                    <div id="echart3"></div>
                </div>
            </div>
            <!-- 厂站污泥量统计图 10-->
            <div class="work-time">
                <div class="title">
                    <span>厂站污泥量统计</span>
                </div>
                <div>
                    <div class="work-time-text">
                        <p>日均量(T): </p>
                        <p>50 </p>
                        <p>月均量(T): </p>
                        <p>1500 </p>
                    </div>
                    <div id="echarts-wrapper-factorySludge"></div>
                </div>
            </div>
            <!-- 厂站减排统计图 11-->
            <div class="work-time">
                <div class="title">
                    <div class="select-btn">
                        <span>厂站减排统计</span>
                        <div class="select-btn-1">
                            <select class="easyui-validatebox part-factory ">
                                <option value="0">全部值</option>
                                <option value="1">COD</option>
                                <option value="2">TP</option>
                                <option value="3">TN</option>
                                <option value="3">SS</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="echarts-wrapper-emissionReduction"></div>
                </div>
            </div>
            <!-- 厂站预警、告警、故障总数统计图 12-->
            <div class="work-time">
                <div class="title">
                    <span>厂站预警、告警、故障总数统计</span>
                </div>
                <div>
                    <div id="echarts-wrapper-earlyWarning" class="echarts-wrapper"></div>
                    <div id="echarts-wrapper-giveAlarm" class="echarts-wrapper"></div>
                    <div id="echarts-wrapper-fault" class="echarts-wrapper"></div>
                </div>
            </div>
            <!-- 厂站通信率统计 13-->
            <div class="work-time">
                <div class="title">
                    <span>厂站通信率统计</span>
                </div>
                <div>
                    <div class="work-time-text">
                        <p>累计药耗(mg): </p>
                        <p>185,512 </p>
                    </div>
                    <div id="echarts-wrapper-communication"></div>
                </div>
            </div>
            <!-- 厂站吨水成本统计图 14-->
            <div class="work-time">
                <div class="title">
                    <div class="select-btn">
                        <span>厂站吨水成本统计</span>
                    </div>
                </div>
                <div>
                    <div id="echarts-wrapper-TonneWater"></div>
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
    <script src="<%=basePath %>front/public/js/echarts-liquidfill.js"></script>
    <script src="<%=basePath %>front/public/js/customPrompt.js"></script>
    <script src="<%=basePath %>front/public/js/factoryStationStatistics.js"></script>
</body>

</html>