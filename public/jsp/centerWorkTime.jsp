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
	<title>个人中心/我的班次</title>
	<link rel="stylesheet" href="<%=basePath %>front/public/css/fullcalendar.css">
	<link rel='stylesheet' href='<%=basePath %>front/public/css/fullcalendar.print.css' media='print' />
	<link rel="stylesheet" href="<%=basePath %>front/public/css/personShift.css">
	<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>
	<div class="body-wrapper">
		<div class="calendarWrapper">
			<div id="calendar" class="dib">
				<div class="work-time">
					<p>当月工时:<span>32</span>小时</p>
					<p>总在岗时间:<span>32</span>小时</p>
					<p>总请假时间:<span>32</span>小时</p>
					<p>总加班时间:<span>32</span>小时</p>
				</div>
				<!-- <div class="work-exportBtn"><i></i>导出</div> -->
			</div>
			<div class="rightSidePanel mb50 fr">
				<div id="div_day_detail" class="h_calendar_alm">
					<div class="alm_date"></div>
					<div class="alm_content nofestival">
						<div class="today_date"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script src="<%=basePath %>front/public/js/jquery-3.2.1.min.js"></script>
	<script src='<%=basePath %>front/public/js/jquery-ui.custom.min.js'></script>
	<script src="<%=basePath %>front/public/js/fullcalendar.js"></script>
	<script src="<%=basePath %>front/public/js/personShift.js"></script>
</body>

</html>