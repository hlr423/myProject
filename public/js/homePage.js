window.onload = init;

// ============================地图js开始============================
var jsonStyle = [
	{
		"featureType": "land",
		"elementType": "geometry",
		"stylers": {
			"color": "#232630"
		}
	},
	{
		"featureType": "building",
		"elementType": "geometry",
		"stylers": {
			"color": "#2b2b2b"
		}
	},
	{
		"featureType": "highway",
		"elementType": "all",
		"stylers": {
			"lightness": -42,
			"saturation": -91
		}
	},
	{
		"featureType": "arterial",
		"elementType": "geometry",
		"stylers": {
			"lightness": -77,
			"saturation": -94
		}
	},
	{
		"featureType": "green",
		"elementType": "geometry",
		"stylers": {
			"color": "#1b1b1b"
		}
	},
	{
		"featureType": "water",
		"elementType": "geometry",
		"stylers": {
			"color": "#022338"
		}
	},
	{
		"featureType": "subway",
		"elementType": "geometry.stroke",
		"stylers": {
			"color": "#181818"
		}
	},
	{
		"featureType": "railway",
		"elementType": "geometry",
		"stylers": {
			"lightness": -52
		}
	},
	{
		"featureType": "all",
		"elementType": "labels.text.stroke",
		"stylers": {
			"color": "#313131"
		}
	},
	{
		"featureType": "all",
		"elementType": "labels.text.fill",
		"stylers": {
			"color": "#8b8787"
		}
	},
	{
		"featureType": "manmade",
		"elementType": "geometry",
		"stylers": {
			"color": "#1b1b1b"
		}
	},
	{
		"featureType": "local",
		"elementType": "geometry",
		"stylers": {
			"lightness": -75,
			"saturation": -91
		}
	},
	{
		"featureType": "subway",
		"elementType": "geometry",
		"stylers": {
			"lightness": -65
		}
	},
	{
		"featureType": "railway",
		"elementType": "all",
		"stylers": {
			"lightness": -40
		}
	},
	{
		"featureType": "background",
		"elementType": "geometry",
		"stylers": {
			"color": "#181818",
			"weight": "1"
		}
	},
	{
		"featureType": "boundary",
		"elementType": "all",
		"stylers": {
			"color": "#fff"
		}
	},
	{
		"featureType": "road",
		"elementType": "all",
		"stylers": {
			"color": "#292d37"
		}
	}
];

var map = new BMap.Map("allmap", {
	minZoom: 5,
	maxZoom: 20
}); // 创建Map实例,设置地图允许的最小/大级别
map.enableScrollWheelZoom(); //开启鼠标滚轮缩放
map.setMapStyle({
	styleJson: jsonStyle
});
getBoundary("简阳市");

// 绿色的经纬度
var normalPointArr = [
	[104.677851, 30.409728, '普安乡污水处理厂'], // 普安乡
	[104.724994, 30.421189, '禾丰镇污水处理厂'], // 合丰镇
	[104.626827, 30.556999, '三星镇污水处理厂'], // 三星镇
	[104.640769, 30.49167, '青龙镇污水处理厂'], //青龙镇
	[104.597938, 30.611343, '同合乡污水处理厂'], // 同合乡
	[104.572641, 30.505859, '平窝乡污水处理厂'], //平窝乡
	[104.698548, 30.528757, '踏水镇污水处理厂'], // 踏水镇
	[104.54447, 30.60836, '宏缘乡污水处理厂'], // 宏缘乡
	[104.661897, 30.588589, '新星乡污水处理厂'], // 新星乡
	[104.770412, 30.3534, '安乐乡污水处理厂'],   //安乐乡
	[104.705447, 30.342429, '五星乡污水处理厂'], //五星乡
	[104.784929, 30.48059, '金马镇污水处理厂'],  //金马镇
	[104.857224, 30.381817, '涌泉镇污水处理厂'], //涌泉镇
	[104.818705, 30.34, '平息乡污水处理厂'], //平息乡
	[104.454209, 30.273587, '芦葭镇污水处理厂'], //芦霞镇
	[104.325571, 30.435264, '石板凳镇污水处理厂'], //石板登
	[104.326003, 30.342429, '玉成乡污水处理厂'], //玉成乡
	[104.387518, 30.288557, '福田乡污水处理厂'], //福田乡
	[104.422588, 30.246136, '清风乡污水处理厂'], //清风乡
	[104.544183, 30.271341, '江源镇污水处理厂'], //江源镇
	[104.550794, 30.229162, '永宁乡污水处理厂'], //永宁乡
	[104.425463, 30.141752, '老龙乡污水处理厂'], //老龙乡
	[104.37487, 30.197204, '镇金镇污水处理厂'], //镇金镇
	[104.584427, 30.454817, '石钟镇污水处理厂'], //石钟镇
	[104.521905, 30.543065, '状溪乡污水处理厂'], //壮溪乡
	[104.691649, 30.299034, '飞龙乡污水处理厂'], //飞龙乡
	[104.646518, 30.345172, '平泉镇污水处理厂'], //平泉镇
	[104.365672, 30.39079, '坛罐乡污水处理厂'],     // 碳罐乡
	[104.430062, 30.428663, '太平桥镇污水处理厂'], //太平桥
	[104.432362, 30.396272, '海螺乡污水处理厂'], //海螺乡
	[104.40994, 30.331956, '草池镇污水处理厂'],  //草池镇
	[104.40994, 30.331956, '周家乡污水处理厂'], //周家乡
	[104.572354, 30.327717, '董家埂乡污水处理厂'],
	[104.520899, 30.320485, '东溪镇污水处理厂'],
	[104.496465, 30.38755, '石盘镇污水处理厂'],
	[104.487266, 30.469261, '灵仙乡污水处理厂'],
];
// 红色的经纬度
var faultPointArr = [
	[104.639619, 30.441865, '平武污水处理厂'], // 平武镇
];
// 黄色的经纬度
var disablePointArr = [
	[104.332901, 30.403748, '高明乡污水处理厂'], //高明乡
];

// 图片地址
var normalIcon = new BMap.Icon('../images/commonIcon.png', new BMap.Size(20, 20));
var faultIcon = new BMap.Icon('../images/faultIcon.png', new BMap.Size(20, 20));
var disableIcon = new BMap.Icon('../images/errorIcon1.png', new BMap.Size(20, 20));

// 覆盖物里面节点
var node = '<div class="title"><p class="title-p"><i></i>平武镇污水处理厂</p> <a class="station-close"><i></i></a></div>' +
	'<div class="station-content">' +
	'<div class="item">运行状态： <span class="item-run">超标</span></div>' +
	'<div class="item">超标原因：<span class="item-reason"></span></div>' +
	'<div class="item">处理状态：<span class="item-state">正在处理</span></div>' +
	'</div>'
// 创建点 并赋予点击事件  state = 0 达标 1 超标  2故障
function createPoint(arr, icon, state) {
	var point, mark;
	for (var i = 0; i < arr.length; i++) {
		point = new BMap.Point(arr[i][0], arr[i][1]);
		marker = new BMap.Marker(point, { icon: icon });
		map.addOverlay(marker);
		addClickHandler(marker, arr[i][2], state)

	}
}

// 给标注添加点击事件  state:0 绿色点 1 黄色点 2 红色点
var state = 0;
function addClickHandler(marker, stationName, state) {
	marker.addEventListener("click", function () {
		console.log(marker)
		var thisDiv = document.getElementsByClassName('stationData')[0];
		var point = {
			lat: this.point.lat,
			lng: this.point.lng
		};
		if (thisDiv) {
			$('.stationData').remove();
		}
		console.log(state)
		if (state == 0) {
			var showDiv = new myDiv(point);
			map.addOverlay(showDiv);

			var $myDiv = $('.map .stationData');
			$myDiv.append(node)
			$myDiv.find('.title-p').html('<i></i>' + stationName);
			$myDiv.find('.item-run').html('正常').css('color', '#25f482');
			$('.map .item:nth-of-type(2),.map .item:nth-of-type(3)').remove();
			$myDiv.css({
				height: 78 + 'px',
				top: $myDiv.position().top + 60 + 'px'

			})
		} else if (state == 1) {
			var showDiv = new myDiv(point);
			map.addOverlay(showDiv);
			var $myDiv = $('.map .stationData');
			$myDiv.append(node)
			$myDiv.find('.title-p').html('<i></i>' + stationName);
			$myDiv.find('.item-run').html('超标').css('color', '#ffff00');
			$myDiv.find('.item-reason').html('SS检测仪-出水超标')

		} else {
			var showDiv = new myDiv(point);
			map.addOverlay(showDiv);
			var $myDiv = $('.map .stationData');
			$myDiv.append(node)
			$myDiv.find('.title-p').html('<i></i>' + stationName);
			$myDiv.find('.item-run').html('故障').css('color', '#ff0000');
			$myDiv.find('.item-reason').html('SS检测仪-故障')
		}

	});
}


// 加载行政区域
function getBoundary(cityName) {
	var zoomNum = 11;
	if (cityName.split(",").length > 1) {
		zoomNum = 10;
	}
	for (var i = 0; i < cityName.split(",").length; i++) {
		var cn = cityName.split(",")[i];
		var bdary = new BMap.Boundary();
		bdary.get(cn, function (rs) { //获取行政区域
			//map.clearOverlays();        //清除地图覆盖物
			var count = rs.boundaries.length; //行政区域的点有多少个
			if (count === 0) {
				alert('未能获取当前输入行政区域');
				return;
			}
			var pointArray = [];
			for (var i = 0; i < count; i++) {
				var ply = new BMap.Polygon(rs.boundaries[i], {
					strokeWeight: 2,
					strokeColor: "#272c38",
					// fillColor: "#363d4f",
					fillColor: "#363d4f",
					fillOpacity: 0.4
				}); //建立多边形覆盖物
				map.addOverlay(ply); //添加覆盖物
				pointArray = pointArray.concat(ply.getPath());
			}
			map.setViewport(pointArray); //调整视野
			map.setZoom(zoomNum);
		});
	}
}

// 生成绿色的点
createPoint(normalPointArr, normalIcon, 0);
// 生成黄色的点
createPoint(disablePointArr, disableIcon, 1);
// 生成红色的点
createPoint(faultPointArr, faultIcon, 2);

// 继承API的BMap.Overlay
myDiv.prototype = new BMap.Overlay();
// 复杂的自定义覆盖物
function myDiv(point) {
	this._point = point;
}
// 实现初始化方法
myDiv.prototype.initialize = function (map) {
	// 保存map对象实例
	this._map = map;
	// 创建DIV元素，作为自定义覆盖物的容器
	var div = document.createElement('div');
	div.className = 'stationData';
	div.style.position = 'absolute';
	// 将div添加到覆盖物容器中
	map.getPanes().markerPane.appendChild(div);
	// 保存DIV实例
	this._div = div;
	// 需要将div元素作为方法的返回值，当调用该覆盖物的show、
	// hide方法，或者对覆盖物进行移除时，API都将操作此元素。
	return div;
};

myDiv.prototype.draw = function () {
	var map = this._map;
	var pixel = map.pointToOverlayPixel(this._point);
	var divHeight = this._div.offsetHeight;
	var divWidth = this._div.offsetWidth;
	this._div.style.left = (pixel.x - divWidth / 2 - 5) + "px";
	this._div.style.top = (pixel.y - divHeight - 22) + "px";
};

// 退出厂站弹窗
$('.map').on('click', '.station-close', function () {
	console.log($(this).parents('.stationData'))
	$(this).parents('.stationData').fadeOut(200);
});

// =============================地图js结束===========================

// ============================echart.js开始=========================

var m500 = [
	{
		name: '2017-12-01',
		value: ['2017-12-01', 1.3]
	},
	{
		name: '2017-12-03',
		value: ['2017-12-03', 1.4]
	},
	{
		name: '2017-12-04',
		value: ['2017-12-04', 1.2]
	},
	{
		name: '2017-12-05',
		value: ['2017-12-05', 1.3]
	},
	{
		name: '2017-12-08',
		value: ['2017-12-08', 0.9]
	},
	{
		name: '2017-12-13',
		value: ['2017-12-13', 0.8]
	},
	{
		name: '2017-12-18',
		value: ['2017-12-18', 1.1]
	},
	{
		name: '2017-12-21',
		value: ['2017-12-21', 1.0]
	},
	{
		name: '2017-12-23',
		value: ['2017-12-23', 1.2]
	},
	{
		name: '2017-12-28',
		value: ['2017-12-28', 1.3]
	}];

var m1000 = [
	{
		name: '2017-12-01',
		value: ['2017-12-01', 1.5]
	},
	{
		name: '2017-12-03',
		value: ['2017-12-03', 1.2]
	},
	{
		name: '2017-12-04',
		value: ['2017-12-04', 1.3]
	},
	{
		name: '2017-12-05',
		value: ['2017-12-05', 1.4]
	},
	{
		name: '2017-12-08',
		value: ['2017-12-08', 1.5]
	},
	{
		name: '2017-12-13',
		value: ['2017-12-13', 1.3]
	},
	{
		name: '2017-12-18',
		value: ['2017-12-18', 1.1]
	},
	{
		name: '2017-12-21',
		value: ['2017-12-21', 1.3]
	},
	{
		name: '2017-12-23',
		value: ['2017-12-23', 1.2]
	},
	{
		name: '2017-12-28',
		value: ['2017-12-28', 1.1]
	}];

var m1500 = [
	{
		name: '2017-12-01',
		value: ['2017-12-01', 1.3]
	},
	{
		name: '2017-12-03',
		value: ['2017-12-03', 1.1]
	},
	{
		name: '2017-12-04',
		value: ['2017-12-04', 1.2]
	},
	{
		name: '2017-12-05',
		value: ['2017-12-05', 1.3]
	},
	{
		name: '2017-12-08',
		value: ['2017-12-08', 1.2]
	},
	{
		name: '2017-12-13',
		value: ['2017-12-13', 1.3]
	},
	{
		name: '2017-12-18',
		value: ['2017-12-18', 1.2]
	},
	{
		name: '2017-12-21',
		value: ['2017-12-21', 1.3]
	},
	{
		name: '2017-12-23',
		value: ['2017-12-23', 1.2]
	},
	{
		name: '2017-12-28',
		value: ['2017-12-28', 1.1]
	}];

var m2000 = [
	{
		name: '2017-12-01',
		value: ['2017-12-01', 1.1]
	},
	{
		name: '2017-12-03',
		value: ['2017-12-03', 1.0]
	},
	{
		name: '2017-12-04',
		value: ['2017-12-04', 0.9]
	},
	{
		name: '2017-12-05',
		value: ['2017-12-05', 0.9]
	},
	{
		name: '2017-12-08',
		value: ['2017-12-08', 1.0]
	},
	{
		name: '2017-12-13',
		value: ['2017-12-13', 1.0]
	},
	{
		name: '2017-12-18',
		value: ['2017-12-18', 0.9]
	},
	{
		name: '2017-12-21',
		value: ['2017-12-21', 1.0]
	},
	{
		name: '2017-12-23',
		value: ['2017-12-23', 1.1]
	},
	{
		name: '2017-12-28',
		value: ['2017-12-28', 1.1]
	}];


// 处理水量
var waterCharts = echarts.init(document.getElementById('water-echarts'));
// 厂站吨水成本
// var myCharts3 = echarts.init(document.getElementById('echarts3'));

var waterOption = {
	series: [{
		type: 'liquidFill',
		name: '41650m³',
		data: [0.6, 0.5, 0.4, 0.6],
		radius: '80%', // 调整大小
		itemStyle: {
			normal: {
				shadowBlur: 0
			}
		},
		outline: {
			borderDistance: 0,
			itemStyle: {
				borderWidth: 5,
				borderColor: '#06a8fd',
				shadowBlur: 20,
				shadowColor: 'rgba(157, 257, 250, 0.8)'
			}
		},
		label: {
			normal: {
				formatter: '\n\n{a}\n{b}\n',
				textStyle: {
					fontSize: 24,
					fontWeight: 300
				}
			}
		}
	}]
};
/*
var option3 = {
	backgroundColor: 'transformable',
	textStyle: {
		color: '#5be8eb'
	},
	legend: {
		icon: 'rect',
		itemWidth: 10,
		itemHeight: 2,
		itemGap: 13,
		data: ['500m³', '1000m³', '1500m³', '2000m³'],
		top: '15px',
		right: '4%',
		widht: 10,
		height: 2,
		textStyle: {
			fontSize: 12,
			color: '#5be8eb'
		}
	},
	tooltip: {
		trigger: 'axis',
		// trigger: 'item',
	},
	grid: {
		top: '50px',
		left: '60px',
		right: '50px',
		bottom: '40px',
	},
	xAxis: [{
		type: 'time',
		name: '日',
		splitLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLine: {
			lineStyle: {
				color: '#184877'
			}
		},
	}],
	yAxis: [{
		type: 'value',
		name: '元',
		axisTick: {
			show: false
		},
		axisLine: {
			lineStyle: {
				color: '#184877'
			}
		},
		axisLabel: {
			margin: 10,
			textStyle: {
				fontSize: 14
			}
		},
		splitLine: {
			lineStyle: {
				color: '#1b385d'
			}
		},
		min: '0',
		max: '2',
		splitNumber: 4
	}],
	series: [{
		name: '500m³',
		type: 'line',
		smooth: true,
		showSymbol: false,
		lineStyle: {
			normal: {
				width: 1
			}
		},
		itemStyle: {
			normal: {
				color: '#01fb7f',
			},
			emphasis: {
				color: '#01fb7f',
				borderColor: 'rgba(137,189,2,0.27)',
				borderWidth: 12
			}
		},
		data: m500,
	},
	{
		name: '1000m³',
		type: 'line',
		smooth: true,
		showSymbol: false,
		label: {
			show: false,
		},
		lineStyle: {
			normal: {
				width: 1
			}
		},
		itemStyle: {
			normal: {
				color: '#49a5cb',
			},
			emphasis: {
				color: '#49a5cb',
				borderColor: 'rgba(137,189,2,0.27)',
				borderWidth: 12
			}
		},
		data: m1000,
	},
	{
		name: '1500m³',
		type: 'line',
		smooth: true,
		showSymbol: false,
		label: {
			show: false,
		},
		lineStyle: {
			normal: {
				width: 1
			}
		},
		itemStyle: {
			normal: {
				color: '#9d8fe4',
			},
			emphasis: {
				color: '#9d8fe4',
				borderColor: 'rgba(137,189,2,0.27)',
				borderWidth: 12
			}
		},
		data: m1500,
	},
	{
		name: '2000m³',
		type: 'line',
		smooth: true,
		showSymbol: false,
		label: {
			show: false,
		},
		lineStyle: {
			normal: {
				width: 1
			}
		},
		itemStyle: {
			normal: {
				color: '#f07c57',
			},
			emphasis: {
				color: '#f07c57',
				borderColor: 'rgba(137,189,2,0.27)',
				borderWidth: 12
			}
		},
		data: m2000,
	},
	]
};*/
waterCharts.setOption(waterOption);
// myCharts3.setOption(option3);

// 报表自适应
window.addEventListener("resize", function () {
	// waterCharts.resize();
	// myCharts3.resize();
})
// ============================echart.js结束=========================


// =============================其他方法函数==========================

// 获取当前时间
function getTime() {
	var showDate = document.getElementsByClassName('show-date')[0];
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth() + 1;
	var tian = today.getDate();
	var time = today.getHours();
	var minutes = today.getMinutes() < 10 ? '0' + String(today.getMinutes()) : today.getMinutes();
	showDate.firstElementChild.innerHTML = year + '-' + month + '-' + tian + ' ' + time + ':' + minutes;
}

// 获取星期
function getWeek() {
	var showDate = document.getElementsByClassName('show-date')[0];
	var node = showDate.firstElementChild.nextElementSibling;
	var week = new Date();
	switch (week.getDay()) {
		case 0:
			node.innerHTML = '星期天';
			break;
		case 1:
			node.innerHTML = '星期一';
			break;
		case 2:
			node.innerHTML = '星期二';
			break;
		case 3:
			node.innerHTML = '星期三';
			break;
		case 4:
			node.innerHTML = '星期四';
			break;
		case 5:
			node.innerHTML = '星期五';
			break;
		case 6:
			node.innerHTML = '星期六';
			break;
	}
}

// 初始化界面
function init() {
	// getTime();
	// getWeek();
	// 每一分钟更新一次时间
	// setInterval(getTime, 1000);
}

// 点击获取数据 COD 氨氮 总磷
function getData(index) {
	var ulNode = document.getElementsByClassName('content-data')[0].children;
	var liList = ulNode[0].children;
	var pNodeArr = [];
	var spanArr = [];
	var codArr = ['255.00', '765.00', '3102.50']; //COD
	var adArr = ['52.20', '156.60', '635.10']; //氨氮
	var PArr = ['5.40', '16.20', '65.70']; //磷
	var pCOD = ['COD月减排量(T)', 'COD季度减排量(T)', 'COD年减排量(T)'];
	var pAd = ['氨氮月减排量(T)', '氨氮季度减排量(T)', '氨氮年减排量(T)'];
	var pP = ['总磷月减排量(T)', '总磷季度减排量(T)', '总磷年减排量(T)'];
	var tempArr = [];
	var tempArr1 = [];
	if (index == 0) {
		tempArr = codArr;
		tempArr1 = pCOD;
	} else if (index == 1) {
		tempArr = adArr;
		tempArr1 = pAd;
	} else {
		tempArr = PArr;
		tempArr1 = pP;
	}
	for (var i = 0; i < liList.length; i++) {
		var divNode = liList[i].children;
		var divNode2 = divNode[0].children;
		pNodeArr.push(divNode2[0]);
		spanArr.push(divNode2[1]);

	}
	for (var j = 0; j < spanArr.length; j++) {
		spanArr[j].innerHTML = tempArr[j];
		pNodeArr[j].innerHTML = tempArr1[j];

	}
}
// COD 氨氮 总磷数据切换
$('.data-title>ul>li').on('click', function () {
	var $this = $(this);
	var tempIndex = $this.index();

	var ctxDataArr = [
		['COD日减排总量', '8.5'],
		['氨氮日减排总量', '1.74'],
		['总磷日减排总量', '0.18']
	]
	$('.data-title>ul>li').each(function (index, node) {
		if (tempIndex == index) {
			$('.cod-data>p').html(ctxDataArr[index][0]);
			$('.cod-data>span>span').html(ctxDataArr[index][1]);
			$(node).addClass('active');
			getData(index)
		} else {
			$(node).removeClass('active');
		}
	})
});

// 收缩/展开底部数据
var state = 0; //0收起 1展开
$('.data-show').on('click', function () {
	var $this = $(this);
	var heightNum = $('.data-content').height();
	var $img = $this.find('img');
	if (state == 0) {
		state = 1;
		$img.css({
			transform: 'rotate(-180deg)'
		})
		$('.info-data').animate({
			bottom: -heightNum + 'px'
		}, 1000)
	} else {
		state = 0;
		$img.css({
			transform: 'rotate(0deg)'
		})
		$('.info-data').animate({
			bottom: 0
		}, 1000)
	}
});




