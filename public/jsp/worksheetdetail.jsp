<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>


<!DOCTYPE html>
<html lang="en">
<head>


<meta charset="UTF-8">
<title>工单管理/详情</title>
<link rel="stylesheet" href="<%=basePath%>/front/public/css/easyui.css">
<link rel="stylesheet"
	href="<%=basePath%>/front/public/css/swiper-3.4.2.min.css">
<link rel="stylesheet"
	href="<%=basePath%>/front/public/css/workOrdersDetail.css">

<link rel="stylesheet" href="<%=basePath%>front/public/css/module/idCardStyle.css">
</head>
<jsp:include page="repeatLogin.jsp"></jsp:include>

<body>

	<div class="body-wrapper">
		<div class="workOders-list">
			<a onClick="backWorkSheetList()" class="back-list">返回列表</a>
		</div>
		<div class="workOders-data">
			<div class="list">
				<div class="title">
					<i></i>
					<div>
						<p>工单详情</p>
						<span id="worksheetNo"></span>
					</div>
				</div>
				<div class="content">
					<table>
						<tr>
							<td>工单状态</td>
							<td id="worksheetState"></td>
						</tr>
						<tr>
							<td>派发时间</td>
							<td id="sendTime"></td>
						</tr>
						<tr>
							<td>运维人员</td>
							<td id="person"></td>
						</tr>
						<tr>
							<td>推荐运维时间</td>
							<td id="time"></td>
						</tr>
						<tr>
							<td>操作</td>
							<td class="workOrders-urged">督办</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="workOders-goods">
				<p class="table-title">
					<i></i>所需物质 <span></span>
				</p>
				<div>
					<table class="easyui-datagrid" id="goodsTable">
						<tbody>
							<!-- <tr>
								<td>设备</td>
								<td>潜污泵</td>
								<td>1</td>
								<td>1</td>
							</tr> -->
						</tbody>
					</table>
				</div>
			</div>
			<div class="workOders-car">
				<p class="table-title">
					<i></i>所需车辆 <span></span>
				</p>
				<div>
					<table class="easyui-datagrid" id="carTable">
						<tbody>
							<!--  <tr>
                                <td>婴儿车</td>
                                <td>AE86</td>
                            </tr> -->
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="work-tab">
			<div id="tab" class="easyui-tabs">
				<!-- <div title="平窝乡污水处理厂" class="table-station1">
					<table class="easyui-datagrid" id="station0">
						<tbody>
							 <tr>
                                <td>设备</td>
                                <td>维修</td>
                                <td>潜污泵</td>
                                <td>张江龙、渣渣龙</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>2017-12-11 12:21.08</td>
                                <td>2017-12-11 12:21.08</td>
                                <td></td>
                            </tr>
						</tbody>
					</table>
				</div> -->
				<div title="推荐轨迹">
					<div class="trajectory-wrapper" id="map1"></div>
				</div>
				<div title="实际轨迹">
					<div class="trajectory-wrapper" id="map2"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="shade"></div>
	<!--厂站操作说明弹窗-->
	<div class="popup description-popup">
		<div class="title">
			<span>操作说明</span> <a class="close-popup"> <i class="close-icon"></i>
			</a>
		</div>
		<div class="content" id="optdes">操作说明/富文本传来</div>
	</div>
	<!--厂站照片弹窗-->
	<div class="popup picture-popup">
		<div class="title">
			<span>厂站照片</span> <a class="close-popup"> <i class="close-icon"></i>
			</a>
		</div>
		<div class="content">
			<div class="swiper-container gallery-top">
				<div class="swiper-wrapper" id="pic">
					<div class="swiper-slide">
						<img src="<%=basePath%>/front/public/images/imgDemo.png" alt="">
					</div>
					<div class="swiper-slide">
						<img src="<%=basePath%>/front/public/images/imgDemo.png" alt="">
					</div>
					<div class="swiper-slide">
						<img src="<%=basePath%>/front/public/images/imgDemo.png" alt="">
					</div>
					<div class="swiper-slide">
						<img src="<%=basePath%>/front/public/images/imgDemo.png" alt="">
					</div>
					<div class="swiper-slide">
						<img src="<%=basePath%>/front/public/images/imgDemo.png" alt="">
					</div>
				</div>
			</div>
			<div class="swiper-container gallery-thumbs">
				<div class="swiper-wrapper" id="pic2">
					<div class="swiper-slide"
						style="background-image:url('<%=basePath%>/front/public/images/imgDemo.png')"></div>
					<div class="swiper-slide"
						style="background-image:url(<%=basePath%>/front/public/images/imgDemo.png)"></div>
					<div class="swiper-slide"
						style="background-image:url(<%=basePath%>/front/public/images/imgDemo.png)"></div>
					<div class="swiper-slide"
						style="background-image:url(<%=basePath%>/front/public/images/imgDemo.png)"></div>
					<div class="swiper-slide"
						style="background-image:url(<%=basePath%>/front/public/images/imgDemo.png)"></div>
				</div>
				<div class="swiper-button-next"></div>
				<div class="swiper-button-prev"></div>
			</div>
			<!-- Add Arrows -->
			<div class="swiper-pagination"></div>
		</div>
	</div>
	<!--厂站照片弹窗-->
	<div class="popup music-popup">
		<div class="title">
			<span>音频</span> <a class="close-popup"> <i class="close-icon"></i>
			</a>
		</div>
		<div class="content">
			<div class="music-table">
				<table class="easyui-datagrid" id="musicTable">
					<!--   <tr>
                        <td>
                            123123132
                        </td>
                       
                    </tr>
                    <tr>
                        <td>
                            123123132
                        </td>
                       
                    </tr>
                    <tr>
                        <td>
                            123123132
                        </td>
                       
                    </tr>
                    <tr>
                        <td>
                            123123132
                        </td>
                       
                    </tr>
                    <tr>
                        <td>
                            123123132
                        </td>
                       
                    </tr>
                    <tr>
                        <td>
                            123123132
                        </td>
                       
                    </tr>
                    <tr>
                        <td>
                            123123132
                        </td>
                       
                    </tr>
                    <tr>
                        <td>
                            123123132
                        </td>
                       
                    </tr>
                    <tr>
                        <td>
                            123123132
                        </td>
                       
                    </tr>
                    <tr>
                        <td>
                            123123132
                        </td>
                       
                    </tr>
                    <tr>
                        <td>
                            123123132
                        </td>
                       
                    </tr>
                    <tr>
                        <td>
                            123123132
                        </td>
                       
                    </tr>
                    <tr>
                        <td>
                            123123132
                        </td>
                       
                    </tr> -->
				</table>
			</div>
		</div>
	</div>
	<script src="<%=basePath%>/front/public/js/jquery-3.2.1.min.js"></script>
	<script src="<%=basePath%>/front/public/js/jquery.easyui.gai.js"></script>
	<script src="<%=basePath%>/front/public/js/easyui-lang-zh_CN.js"></script>
	<script src="<%=basePath%>/front/public/js/swiper-3.4.2.min.js"></script>
	<script src="<%=basePath%>/front/public/js/common.js"></script>
	<script src="<%=basePath%>/front/public/js/customPrompt.js"></script>
	<script src="<%=basePath%>/front/public/js/workOrdersDetail.js"></script>
	<script
		src="http://api.map.baidu.com/api?v=2.0&ak=GiIaCe6wmTFjiYAzqa7OzpGm9WLwPvCu"></script>
	<script
		src="http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js"></script>
	<script
		src="http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js"></script>
	<script>
	
		var jsonStyle = [
			{
				"featureType" : "land",
				"elementType" : "geometry",
				"stylers" : {
					"color" : "#232630"
				}
			},
			{
				"featureType" : "building",
				"elementType" : "geometry",
				"stylers" : {
					"color" : "#2b2b2b"
				}
			},
			{
				"featureType" : "highway",
				"elementType" : "all",
				"stylers" : {
					"lightness" : -42,
					"saturation" : -91
				}
			},
			{
				"featureType" : "arterial",
				"elementType" : "geometry",
				"stylers" : {
					"lightness" : -77,
					"saturation" : -94
				}
			},
			{
				"featureType" : "green",
				"elementType" : "geometry",
				"stylers" : {
					"color" : "#1b1b1b"
				}
			},
			{
				"featureType" : "water",
				"elementType" : "geometry",
				"stylers" : {
					"color" : "#022338"
				}
			},
			{
				"featureType" : "subway",
				"elementType" : "geometry.stroke",
				"stylers" : {
					"color" : "#181818"
				}
			},
			{
				"featureType" : "railway",
				"elementType" : "geometry",
				"stylers" : {
					"lightness" : -52
				}
			},
			{
				"featureType" : "all",
				"elementType" : "labels.text.stroke",
				"stylers" : {
					"color" : "#313131"
				}
			},
			{
				"featureType" : "all",
				"elementType" : "labels.text.fill",
				"stylers" : {
					"color" : "#8b8787"
				}
			},
			{
				"featureType" : "manmade",
				"elementType" : "geometry",
				"stylers" : {
					"color" : "#1b1b1b"
				}
			},
			{
				"featureType" : "local",
				"elementType" : "geometry",
				"stylers" : {
					"lightness" : -75,
					"saturation" : -91
				}
			},
			{
				"featureType" : "subway",
				"elementType" : "geometry",
				"stylers" : {
					"lightness" : -65
				}
			},
			{
				"featureType" : "railway",
				"elementType" : "all",
				"stylers" : {
					"lightness" : -40
				}
			},
			{
				"featureType" : "background",
				"elementType" : "geometry",
				"stylers" : {
					"color" : "#181818",
					"weight" : "1"
				}
			},
			{
				"featureType" : "boundary",
				"elementType" : "all",
				"stylers" : {
					"color" : "#fff"
				}
			},
			{
				"featureType" : "road",
				"elementType" : "all",
				"stylers" : {
					"color" : "#292d37"
				}
			}
		];
	
		//推荐轨迹的地图
		var map1 = new BMap.Map("map1", {
			minZoom : 5,
			maxZoom : 25,
			mapType : BMAP_HYBRID_MAP
		}); // 创建Map实例,设置地图允许的最小/大级别
		var nav_size = new BMap.Size(70, 50); //地图导航控件的参数    
		var nav_size2 = new BMap.Size(10, 50); //地图导航控件的参数    
		var top_right_control = new BMap.ScaleControl({
			anchor : BMAP_ANCHOR_TOP_RIGHT,
			offset : nav_size
		}); // 右上角，添加比例尺
		var top_right_navigation = new BMap.NavigationControl({
			anchor : BMAP_ANCHOR_TOP_RIGHT,
			offset : nav_size2
		}); //右上角，添加默认缩放平移控件
		map1.addControl(top_right_control);
		map1.addControl(top_right_navigation);
	
		var nav_size3 = new BMap.Size(90, 10);
		var mapType1 = new BMap.MapTypeControl({
			mapTypes : [ BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP ]
		});
		var mapType2 = new BMap.MapTypeControl({
			anchor : BMAP_ANCHOR_TOP_RIGHT,
			offset : nav_size3
		});
		map1.addControl(mapType1); //2D图，卫星图
		map1.addControl(mapType2); //左上角，默认地图控件
		map1.setCurrentCity("简阳"); //由于有3D图，需要设置城市哦
		map1.centerAndZoom("简阳", 13);
	
		map1.enableScrollWheelZoom(); //开启鼠标滚轮缩放
		//getBoundary("简阳");
		map1.setMapStyle({
			styleJson : jsonStyle
		});
	
		//实际轨迹的地图
		var map2 = new BMap.Map("map2", {
			minZoom : 5,
			maxZoom : 25,
			mapType : BMAP_HYBRID_MAP
		}); // 创建Map实例,设置地图允许的最小/大级别
		var nav_size = new BMap.Size(70, 50); //地图导航控件的参数    
		var nav_size2 = new BMap.Size(10, 50); //地图导航控件的参数    
		var top_right_control = new BMap.ScaleControl({
			anchor : BMAP_ANCHOR_TOP_RIGHT,
			offset : nav_size
		}); // 右上角，添加比例尺
		var top_right_navigation = new BMap.NavigationControl({
			anchor : BMAP_ANCHOR_TOP_RIGHT,
			offset : nav_size2
		}); //右上角，添加默认缩放平移控件
		map2.addControl(top_right_control);
		map2.addControl(top_right_navigation);
	
		var nav_size3 = new BMap.Size(90, 10);
		var mapType1 = new BMap.MapTypeControl({
			mapTypes : [ BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP ]
		});
		var mapType2 = new BMap.MapTypeControl({
			anchor : BMAP_ANCHOR_TOP_RIGHT,
			offset : nav_size3
		});
		map2.addControl(mapType1); //2D图，卫星图
		map2.addControl(mapType2); //左上角，默认地图控件
		map2.setCurrentCity("简阳"); //由于有3D图，需要设置城市哦
		map2.centerAndZoom("简阳", 11);
	
		map2.enableScrollWheelZoom(); //开启鼠标滚轮缩放
		//getBoundary("简阳");
		map2.setMapStyle({
			styleJson : jsonStyle
		});
	
	  
	
	
	
		//加载行政区域
		function getBoundary(cityName) {
			var zoomNum = 6;
			if (cityName.split(",").length > 1) {
				zoomNum = 10;
			}
			for (var i = 0; i < cityName.split(",").length; i++) {
				var cn = cityName.split(",")[i];
				var bdary = new BMap.Boundary();
				bdary.get(cn, function(rs) { //获取行政区域
					//map.clearOverlays();        //清除地图覆盖物       
					var count = rs.boundaries.length; //行政区域的点有多少个
					if (count === 0) {
						alert('未能获取当前输入行政区域');
						return;
					}
					var pointArray = [];
					for (var i = 0; i < count; i++) {
						var ply = new BMap.Polygon(rs.boundaries[i], {
							strokeWeight : 4,
							strokeColor : "#272c38",
							fillColor : "#363d4f",
							fillOpacity : 0.4
						}); //建立多边形覆盖物
						map1.addOverlay(ply); //添加覆盖物
						map2.addOverlay(ply); //添加覆盖物
						pointArray = pointArray.concat(ply.getPath());
					}
					map1.setViewport(pointArray); //调整视野
					map1.setZoom(zoomNum);
					map2.setViewport(pointArray); //调整视野
					map2.setZoom(zoomNum);
	
				});
			}
		}
	
	  getRoute();//推荐工单路径
	
	
	
	
	
	
		//将所有的站点标记到地图上
		function createMarks(arr) {
			var markers = [];
			var num = 0; //正常场站的数量
			for (var i = 0; i < arr.length; i++) {
				var lnglat = arr[i].lnglat;
				if (lnglat != null && lnglat != "") {
					var id = arr[i].id;
					var stationName = arr[i].name;
					var status = arr[i].status;
					var lng = lnglat.split(",")[0];
					var lat = lnglat.split(",")[1];
					var point = new BMap.Point(lng, lat);
					var iconTemp;
					var content;
					if (status == 1) {
						num++;
						iconTemp = new BMap.Icon("<%=basePath%>front/public/dist/images/commonIcon.png", new BMap.Size(40, 40)); //前面部分为图片的地址
					} else {
						iconTemp = new BMap.Icon("<%=basePath%>front/public/dist/images/errorIcon.png", new BMap.Size(50, 50)); //前面部分为图片的地址
					}
					var marker = new BMap.Marker(point, {
						icon : iconTemp
					}); // 创建标注
					map.addOverlay(marker); // 将标注添加到地图中
					//进行点的聚合，放大缩小
					markers.push(marker);
	
				}
			}
			var markerClusterer = new BMapLib.MarkerClusterer(map, {
				markers : markers
			});
			$(".count #normalstationnum").append(num);
		}
	
		//生成工单的推荐路径
		function getRoute() {
			$.ajax({
				type : "POST",
				url : "getRecommendRoute",
				dataType : "json",
				success : function(msg) {
					var point = [];
					var point1 = [];
					for (var i = 0; i < msg.station.length; i++) {
						var stationId = msg.station[i].stationId;
						point[i] = new BMap.Point(msg.station[i].position.split(",")[0], msg.station[i].position.split(",")[1]);
						iconTemp = new BMap.Icon("../front/public/images/commonIcon.png", new BMap.Size(40, 40));
						marker = new BMap.Marker(point[i], {
							icon : iconTemp
						}); // 创建标注
						map1.addOverlay(marker); // 将标注添加到地图中
						var stationName = msg.station[i].stationName;
						addClickHandler(stationId, stationName, marker);
						marker.addEventListener("mouseout", function(e) {
							removeOverlays();
						});
					}
					var driving = new BMap.DrivingRoute(map1, {
						renderOptions : {
							map : map1,
							autoViewport : true
						}
					});
					driving.search(point[0], point[0], {
						waypoints : point
					});
				}
			});
		}
		
		
		//站点的鼠标点击事件
function addClickHandler(stationId, stationName, marker) {
	marker.addEventListener("mouseover", function(e) {
		
		var p = e.target;
		var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
		var opts = {
			position : point, // 指定文本标注所在的地理位置
			offset : new BMap.Size(-70, -70) //设置文本偏移量
		}
		var label = new BMap.Label(stationName, opts); // 创建文本标注对象
		label.setStyle({
			padding : "0 20px",
			color : "#fff",
			fontSize : "12px",
			height : "40px",
			lineHeight : "40px",
			fontFamily : "微软雅黑",
			backgroundColor : '#4acf8f',
			textAlign : 'center',
			border : 'none',
			borderRadius : "8px"
		});
		map1.addOverlay(label);
	});
}

//删除文本框
function removeOverlays() {
	var allOverlay = map1.getOverlays();
	for (var i = 0; i < allOverlay.length; i++) {
		if (allOverlay[i] == "[object Label]") {
			map1.removeOverlay(allOverlay[i]);
		}
	}
}

	</script>
</body>

</html>