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
    <title>厂站信息</title>
    <link rel="stylesheet" href="<%=basePath %>/front/public/css/select2.css">
    <link rel="stylesheet" href="<%=basePath %>front/public/css/easyui.css">
    <link rel="stylesheet" href="<%=basePath %>front/public/css/swiper-3.4.2.min.css">
    <link rel="stylesheet" href="<%=basePath %>front/public/css/stationInfo.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
    <div class="body-wrapper">
        <div class="search-wrapper">
            <select id="client" class="easyui-combotrees cbt">
                <option >请选择区域</option>
            </select>
            
            <select name="" id="stationstate" onchange="getStationByState()">
                
            </select>
            
            <select name="" id="choseStation">
            </select>
           <!--  <input type="text" placeholder="搜索厂站名称" maxlength="50" class="station-input">
            <div class="search-btn">搜索</div> -->
           <!--  <div class="export-btn">
                <i></i>
                导出
            </div> -->
        </div>
        <div class="table-wrapper">
            <div id="tab" class="easyui-tabs">
                <div title="基本信息">
                    <div class="station-wrapper">
                        <div class="chosed">
                            <div class="station-info">
                                <div class="station-title">
                                    <i></i>
                                    <div>
                                        <p id="stationName"></p>
                                        <span id="curDay"></span>
                                    </div>
                                </div>
                                <div class="station-detail">
                                    <div class="qr">
                                        <img id="qrcode" src="" alt="">
                                        <p>厂站二维码</p>
                                    </div>
                                    <div id="info">
                                        <div class="detail-item">
                                            <label>占地面积</label>
                                            <span></span>
                                        </div>
                                        <div class="detail-item">
                                            <label>设计处理水量</label>
                                            <span></span>
                                        </div>
                                        <div class="detail-item">
                                            <label>投运时间</label>
                                            <span></span>
                                        </div>
                                        <div class="detail-item">
                                            <label>所在区域</label>
                                            <span></span>
                                        </div>
                                        <div class="detail-item">
                                            <label>责任人</label>
                                            <span></span>
                                        </div>
                                        <div class="detail-item">
                                            <label>责任人电话</label>
                                            <span></span>
                                        </div>
                                        <div class="detail-item">
                                            <label>经纬度</label>
                                            <span></span>
                                        </div>
                                        <div class="detail-item">
                                            <label>地址</label>
                                            <a class="map-btn"></a>
                                        </div>
                                        <div class="detail-item">
                                            <label>SIM卡号</label>
                                            <a class="sim-btn"></a>
                                        </div>
                                        <div class="detail-item">
                                            <label>站点图纸</label>
                                            <a>查看</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="station-img">
                                <div class="swiper-container">
                                    <div class="swiper-wrapper">
                                    </div>
                                    <div class="swiper-pagination"></div>
                                </div>
                            </div>
                        </div>
                        <div class="no-chose">
                            <div class="left">
                                <div class="no-chose-title">
                                    <i></i>
                                    <div>
                                        <p>未选择厂站</p>
                                    </div>
                                </div>
                                <div>
                                    <i></i>
                                    <p>暂无厂站信息</p>
                                </div>
                            </div>
                            <div class="right">
                                <img src="<%=basePath %>front/public/images/station.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="operate">
                        <div class="run" style="display:none">投运</div>
                        <div class="to-eq">查看设备信息</div>
                        <div class="to-parts">查看部件信息</div>
                    </div>
                </div>
                <div title="异常信息">
                    <div class="chosed1">
                        <div class="search-wrapper" style="display:none">
                            <select name="" id="abnormalType">
                                <option value="0">请选择异常类型</option>
                                <option value="1">预警</option>
                                <option value="2">告警</option>
                                <option value="3">故障</option>
                            </select>
                            <input type="text" placeholder="请选择开始时间" id="startTime1" class="chose-time">
                            <span class="line">-</span>
                            <input type="text" placeholder="请选择结束时间" id="endTime1" class="chose-time">
                            <div class="search-btn">查询</div>
                        </div>
                        <div class="table1-wrapper">
                            <table class="easyui-datagrid" id="dg1">
                                <!-- <tbody>
                                    <tr>
                                        <td></td>
                                        <td>调节池超声波液位计</td>
                                        <td>COD超过上限值</td>
                                        <td>3</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2小时</td>
                                        <td>张珊三</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>调节池超声波液位计</td>
                                        <td>COD超过上限值</td>
                                        <td>3</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2017-12-06 12:44:32</td>
                                        <td>2小时</td>
                                        <td>张珊三</td>
                                    </tr>
                                    
                                </tbody> -->
                            </table>
                        </div>
                    </div>
                    <!-- <div class="no-chose1">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="170px"
                            height="170px" viewBox="0 0 200 200" enable-background="new 0 0 200 200" xml:space="preserve" p-id="459">
                            <g p-id="460">
                                <path fill="#EEEEEE" d="M18.224,35.559c0,0,0.38-0.042,0.592,0.211s0.465,3.804,1.395,4.776s4.692,0.423,4.692,1.691
                                c0,1.014-3.496,1.124-4.68,2.096c-1.184,0.972-0.507,5.072-1.957,4.921c-1.135-0.119-0.338-3.381-1.733-4.692
                                s-4.776-1.057-4.776-2.24s3.466-0.465,4.65-1.818C17.59,39.152,17.083,35.559,18.224,35.559z"
                                    p-id="461"></path>
                                <path fill="#B1AFAE" d="M7.726,77.11c0,0,0.23-0.026,0.357,0.128c0.128,0.153,0.281,2.296,0.842,2.883s2.832,0.255,2.832,1.02
                                c0,0.612-2.11,0.678-2.824,1.265c-0.714,0.587-0.306,3.061-1.181,2.97c-0.685-0.072-0.204-2.041-1.046-2.832
                                c-0.842-0.791-2.883-0.638-2.883-1.352s2.092-0.281,2.806-1.097C7.343,79.279,7.037,77.11,7.726,77.11z"
                                    p-id="462"></path>
                                <path fill="#EEEEEE" d="M190.447,56.933c0,0,0.261-0.029,0.406,0.145s0.319,2.608,0.956,3.274c0.637,0.666,3.216,0.29,3.216,1.159
                                c0,0.695-2.396,0.77-3.208,1.437c-0.811,0.666-0.348,3.477-1.341,3.373c-0.778-0.081-0.232-2.318-1.188-3.216
                                c-0.956-0.898-3.274-0.724-3.274-1.536s2.376-0.319,3.187-1.246C190.013,59.396,189.665,56.933,190.447,56.933z"
                                    p-id="463"></path>
                                <path fill="#B1AFAE" d="M154.66,25.617c0,0,0.261-0.029,0.406,0.145c0.145,0.174,0.319,2.608,0.956,3.274
                                c0.637,0.666,3.216,0.29,3.216,1.159c0,0.695-2.396,0.77-3.208,1.437c-0.811,0.666-0.348,3.477-1.341,3.373
                                c-0.778-0.081-0.232-2.318-1.188-3.216c-0.956-0.898-3.274-0.724-3.274-1.536s2.376-0.319,3.187-1.246
                                C154.226,28.08,153.878,25.617,154.66,25.617z" p-id="464"></path>
                                <circle fill="#EEEEEE" cx="56.234" cy="19.989" r="3.79" p-id="465"></circle>
                                <circle fill="#EEEEEE" cx="178.362" cy="75.509" r="2.376" p-id="466"></circle>
                            </g>
                            <circle fill="#EEEEEE" cx="95.662" cy="104.843" r="77.333" p-id="467"></circle>
                            <path fill="#FDFDFD" d="M145.856,131.98c-0.023,3.196-2.633,5.769-5.829,5.746l-89.136-0.146c-3.196-0.023-5.769-2.633-5.746-5.829
                              l0.431-56.782c0.023-3.196,2.633-5.769,5.829-5.746l72.81,0.029c5.893,5.294,13.625,12.765,21.971,19.869L145.856,131.98z"
                                p-id="468"></path>
                            <path fill="#D8D8D8" d="M146.469,87.616c-0.026,1.112-0.949,1.992-2.061,1.966l-19.059-0.448c-1.112-0.026-1.992-0.949-1.966-2.061
                              l0.381-16.217c0.026-1.112,0.949-1.992,2.061-1.966L146.469,87.616z" p-id="469"></path>
                            <circle fill="#EEEEEE" cx="117.299" cy="128.428" r="18.247" p-id="470"></circle>
                            <path fill="#FFFFFF" d="M117.412,148.245c2.241,0,4.352-0.653,6.209-1.801l-0.006-2.304c0,0-0.31-3.921-3.169-4.83
                              c-0.044-0.014-0.76,0.77-2.055,0.699l-0.831-0.262c-0.085,0.004-0.178,0.127-0.262,0.131c-0.085-0.004-0.395-0.433-0.481-0.437
                              l-0.437,0.219c-1.294,0.071-2.054-0.403-2.098-0.389c-2.859,0.909-3.073,4.869-3.073,4.869l-0.006,2.304
                              C113.06,147.592,115.171,148.245,117.412,148.245z" p-id="471"></path>
                            <path fill="#FFFFFF" d="M126.565,131.668c-0.091-4.974-4.313-8.929-9.431-8.836c-5.117,0.094-9.192,4.202-9.1,9.175
                              c0.059,3.23,1.95,6.365,4.669,8.141l9.773-0.179c2.294-1.693,3.83-4.47,4.06-7.374C126.561,132.288,126.57,131.978,126.565,131.668z
                               M121.961,139.026l-9.001,0.165c-2.103-1.47-3.536-3.873-3.581-6.347c-0.074-4.03,3.384-7.361,7.723-7.441
                              c4.339-0.08,7.917,3.123,7.991,7.153C125.137,135.032,123.914,137.482,121.961,139.026z" p-id="472"></path>
                            <path fill="#B1AFAE" d="M113.09,139.511l8.674-0.159c1.881-1.543,3.058-3.992,3.013-6.467c-0.074-4.029-3.523-7.233-7.705-7.157
                              c-4.181,0.077-7.511,3.405-7.437,7.434C109.68,135.636,111.063,138.04,113.09,139.511z" p-id="473"></path>
                            <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="213.0032" y1="105.5631"
                                x2="213.0032" y2="105.5631" gradientTransform="matrix(0.9989 0.0478 -0.0478 0.9989 -99.1255 22.5725)"
                                p-id="474">
                                <stop offset="0.2225" style="stop-color:#FFFFFF" p-id="475"></stop>
                                <stop offset="1" style="stop-color:#D1D3D4" p-id="476"></stop>
                            </linearGradient>
                            <path fill="url(#SVGID_1_)" d="M108.588,138.199" p-id="477"></path>
                            <path fill="#B1AFAE" d="M122.101,140.456c-1.196,0.936-3.021,0.947-4.737,0.969c-1.752,0.023-3.397,0.04-4.644-0.756
                              c-0.398-0.254-0.581-0.843-0.41-0.847l10.184-0.231C122.665,139.587,122.402,140.221,122.101,140.456z"
                                p-id="478"></path>
                            <path fill="#C8C7C6" d="M109.59,133.167c-0.074-4.049,3.268-7.393,7.465-7.47c4.197-0.077,7.659,3.143,7.734,7.191
                              c0.03,1.624-0.464,3.237-1.336,4.592c1.06-1.425,1.672-3.18,1.639-4.947c-0.074-4.049-3.665-7.267-8.02-7.187
                              c-4.355,0.08-7.826,3.427-7.752,7.477c0.027,1.493,0.558,2.96,1.434,4.214C110.041,135.862,109.615,134.525,109.59,133.167z"
                                p-id="479"></path>
                            <path fill="#FFFFFF" d="M122.199,140.266c-1.218,0.535-3.07,0.508-4.805,0.538c-1.771,0.031-3.424,0.109-4.676-0.323
                              c-0.399-0.138-0.578-0.465-0.406-0.469l10.293-0.234C122.778,139.775,122.506,140.132,122.199,140.266z"
                                p-id="480"></path>
                            <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="221.3779" y1="106.4216"
                                x2="221.3779" y2="106.4216" gradientTransform="matrix(0.9989 0.0478 -0.0478 0.9989 -99.1255 22.5725)"
                                p-id="481">
                                <stop offset="0.2225" style="stop-color:#FFFFFF" p-id="482"></stop>
                                <stop offset="1" style="stop-color:#D1D3D4" p-id="483"></stop>
                            </linearGradient>
                            <path fill="url(#SVGID_2_)" d="M116.912,139.457" p-id="484"></path>
                            <path fill="#C1C1C1" d="M122.63,139.791c0,0.241-0.196,0.437-0.437,0.437h-9.617c-0.241,0-0.437-0.196-0.437-0.437l0,0
                              c0-0.241,0.196-0.437,0.437-0.437h9.617C122.434,139.354,122.63,139.549,122.63,139.791L122.63,139.791z"
                                p-id="485"></path>
                            <path fill="#B1AFAE" d="M119.922,145.551c0,0.108-0.088,0.196-0.196,0.196l-4.626,0.003c-0.108,0-0.196-0.088-0.196-0.196
                              l-0.002-3.131c0-0.108,0.088-0.196,0.196-0.196l4.626-0.003c0.108,0,0.196,0.088,0.196,0.196L119.922,145.551z"
                                p-id="486"></path>
                            <path fill="#CCCCCC" d="M119.374,145.166c0,0.082-0.069,0.148-0.153,0.148l-3.616,0.002c-0.085,0-0.154-0.066-0.154-0.148
                              l-0.001-2.36c0-0.082,0.069-0.148,0.153-0.148l3.616-0.002c0.085,0,0.154,0.066,0.154,0.148L119.374,145.166z"
                                p-id="487"></path>
                            <rect x="115.894" y="143.119" fill="#FFFFFF" width="1.315" height="0.527" p-id="488"></rect>
                            <rect x="117.613" y="143.118" fill="#FFFFFF" width="1.315" height="0.527" p-id="489"></rect>
                            <rect x="115.895" y="144.042" fill="#FFFFFF" width="3.034" height="0.813" p-id="490"></rect>
                            <g p-id="491">
                                <path fill="#D8D8D8" d="M111.976,131.974c-0.82-0.543,0.176-2.081,1.023-2.932s1.519-1.188,2.189-1.014
                                c0.469,0.122,1.102,1.168-0.015,2.077C113.919,131.126,113.369,132.898,111.976,131.974z" p-id="492"></path>
                                <circle fill="#D8D8D8" cx="111.865" cy="133.908" r="0.962" p-id="493"></circle>
                            </g>
                            <path fill="#D8D8D8" d="M112.247,85.099c0,1.057-0.857,1.913-1.913,1.913H59.158c-1.057,0-1.913-0.857-1.913-1.913l0,0
                              c0-1.057,0.857-1.913,1.913-1.913h51.175C111.39,83.186,112.247,84.042,112.247,85.099L112.247,85.099z"
                                p-id="494"></path>
                            <path fill="#D8D8D8" d="M83.201,98.717c0,1.057-0.857,1.913-1.913,1.913H59.158c-1.057,0-1.913-0.857-1.913-1.913l0,0
                              c0-1.057,0.857-1.913,1.913-1.913h22.129C82.344,96.804,83.201,97.66,83.201,98.717L83.201,98.717z"
                                p-id="495"></path>
                            <path fill="#D8D8D8" d="M83.201,112.335c0,1.057-0.857,1.913-1.913,1.913H59.158c-1.057,0-1.913-0.857-1.913-1.913l0,0
                              c0-1.057,0.857-1.913,1.913-1.913h22.129C82.344,110.422,83.201,111.278,83.201,112.335L83.201,112.335z"
                                p-id="496"></path>
                            <path fill="#D8D8D8" d="M141.451,148.653c-0.669-0.798-1.858-0.902-2.656-0.234l-0.003,0.003l-2.983-3.559
                              c3.835-4.361,6.162-10.08,6.162-16.344c0-13.675-11.086-24.76-24.76-24.76c-13.675,0-24.76,11.086-24.76,24.76
                              c0,13.675,11.086,24.76,24.76,24.76c5.177,0,9.983-1.59,13.957-4.307l2.876,3.43l-0.003,0.003c-0.798,0.669-0.902,1.858-0.234,2.656
                              l9.153,10.918c2.63-2.047,5.132-4.249,7.475-6.612L141.451,148.653z M117.149,146.768c-10.078,0-18.247-8.17-18.247-18.248
                              c0-10.078,8.17-18.247,18.247-18.247c10.078,0,18.248,8.17,18.248,18.247C135.397,138.598,127.227,146.768,117.149,146.768z"
                                p-id="497"></path>
                        </svg>
                        <p>请选择厂站</p>
                    </div> -->
                </div>
                <div title="运维信息">
                    <div class="chosed1">
                        <div class="search-wrapper" style="display:none">
                            <select name="" id="taskType">
                            </select>
                            <input type="text" placeholder="请选择开始时间" id="startTime" class="chose-time">
                            <span class="line">-</span>
                            <input type="text" placeholder="请选择结束时间" id="endTime" class="chose-time">
                            <div class="search-btn" id="search">查询</div>
                        </div>
                        <div class="table1-wrapper">
                            <table class="easyui-datagrid" id="dg2">
                                <tbody>
                                	<!-- 动态加载 -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div title="通信信息">
                    <div class="chosed1">
                        <div class="table1-wrapper">
                            <table class="easyui-datagrid" id="dg4">
                                <tbody>
                                    <tr>
                                       <!--  <td></td>
                                        <td>192.168.2.122</td>
                                        <td>2017-12-06 12:44:32</td> -->
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="shade"></div>
    <!-- 地图框 -->
    <div class="popup map-popup">
        <div class="title">
            <span>地图</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <div id="allmap"></div>
        </div>
    </div>
    <!-- SIM详情框 -->
    <div class="popup sim-popup">
        <div class="title">
            <span>SIM卡号详情</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <div class="content-item">
                <label>卡号</label>
                <span>13684203746</span>
            </div>
            <div class="content-item">
                <label>累计费用</label>
                <span>￥1,564.20</span>
            </div>
            <div class="content-item">
                <label>累计流量</label>
                <span>100G</span>
            </div>
            <div class="content-item">
                <label>剩余话费</label>
                <span>￥50.28</span>
            </div>
            <div class="content-item">
                <label>剩余流量</label>
                <span>500M</span>
            </div>
        </div>
    </div>
    <!-- 投运提示框 -->
    <div class="infor-wrapper run-wrapper">
        <p>
            <i></i>
            是否确认投运，投运后不能修改。
        </p>
        <div>
            <a class="run-confirm">确认</a>
            <a class="infor-cancel">取消</a>
        </div>
    </div>
    <!-- 通知状态详情框 -->
    <div class="popup notice-detail-popup">
        <div class="title">
            <span>通知详情</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <table class="easyui-datagrid" id="noticeDetail">
                <tbody>
                    <tr>
                        <td>张三三</td>
                        <td>13684203746</td>
                        <td>2017-12-06 12:44:32</td>
                        <td>2017-12-06 12:44:32</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- 下次运维任务 -->
    <div class="popup next-task-popup">
        <div class="title">
            <span>下次运维任务</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <table class="easyui-datagrid" id="nextTask">
                <tbody>
                    <tr>
                        <td>保养</td>
                        <td>2017-12-06 12:44:32</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="popup next-opreate-popup">
        <div class="title">
            <span>下次运维任务</span>
            <a class="return-popup">
                <i class="return-icon"></i>
            </a>
        </div>
        <div class="content">
            <div class="content-item">
                <p>第一步</p>
                <div class="img-box">
                    <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                    <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                    <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                    <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                </div>
                <p>
                    我是操作说明
                </p>
            </div>
            <div class="content-item">
                <p>第二步</p>
                <div class="img-box">
                    <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                </div>
                <p>
                    我是操作说明
                </p>
            </div>
        </div>
    </div>
    <!-- 运维详情框 -->
    <div class="popup yw-popup">
        <div class="title">
            <span>运维详情</span>
            <a class="close-popup">
                <i class="close-icon"></i>
            </a>
        </div>
        <div class="content">
            <table class="yw-table">
                <tbody>
                    <tr>
                        <td>任务类型</td>
                        <td></td>
                        <td>操作对象</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>状态</td>
                        <td></td>
                        <td>备注</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>运维人员</td>
                        <td colspan="3"></td>
                    </tr>
                    <tr>
                        <td>照片</td>
                        <td colspan="3">
                            <div class="img-box" id="pics">
                                <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                                <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                                <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>反馈</td>
                        <td colspan="3">
                            <div class="img-box" id="feedBacks">
                                <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                                <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                                <img src="<%=basePath %>front/public/images/G5654.png" alt="">
                            </div>
                            <p>文字</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <script src="<%=basePath %>front/public/js/jquery-3.2.1.min.js"></script>
    <script src="<%=basePath %>front/public/js/jquery.easyui.min.js"></script>
    <script src="<%=basePath %>front/public/js/select2.js"></script>
	<script src="<%=basePath %>front/public/js/pinyin.js"></script>
    <script src="<%=basePath %>front/public/js/easyui-lang-zh_CN.js"></script>
    <script src="<%=basePath %>front/public/js/zh-CN.js"></script>
    <script src="http://api.map.baidu.com/api?v=2.0&ak=GiIaCe6wmTFjiYAzqa7OzpGm9WLwPvCu"></script>
    <script src="<%=basePath %>front/public/js/swiper-3.4.2.min.js"></script>
    <script src="<%=basePath %>front/public/js/laydate/laydate.js"></script>
    <script src="<%=basePath %>front/public/js/customPrompt.js"></script>
    <script src="<%=basePath %>front/public/js/common.js"></script>
    <!-- <script src="<%=basePath %>front/public/js/refresh.js"></script> -->
    <script src="<%=basePath %>front/public/js/stationInfo.js"></script>
</body>

</html>