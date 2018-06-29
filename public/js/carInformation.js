$(function () {
    /*=========================点击车辆=========================*/
	getCar(0,"");
	$.ajax({
		type:"post",
		url:"getInit",
		dataType:"json",
		success:function(data){
			var content = "<option value='0'>请选择车辆类型</option>";
			if(data.length > 0){
				for(var i=0; i<data.length; i++){
					content += "<option value="+data[i].id+">"+data[i].name+"</option>";
				}
			}
			$("#carType").html(content);
		}
	});
	// 点击搜索
	$(".search-btn").on("click", function() {
		getCar($("#carType").val(),$("#keyword").val());
	});
    // 点击车辆跳转到车辆详情页面
    $('.car-information').on('click','.item',function () {
    	var carId = $(this).find("input:hidden").val();
    	window.location.href="../carInfo/toCarInfoDetail?$c*\a="+carId;
    })
});

/*=========================其它方法=========================*/
//根据车辆类型和车牌号查询车辆
function getCar(carTypeId,keyword){
	$.ajax({
		type:"post",
		url:"getAllCar",
		data:{
			carTypeId:carTypeId,
			keyword:keyword
		},
		dataType:"json",
		success:function(data){
			var content1 = "";
			if(data.length > 0){
				for(var i=0; i<data.length; i++){
					content1 += "<div class='car-item'><div class='car-title'><i></i><span>"+data[i].carType+"</span></div>";
					var cars = data[i].cars;
					if(cars.length > 0){
						for(var j=0; j<cars.length; j++){
							if(cars[j].carState == 1){
								content1 += "<div class='item car-wait'>";
							}else if(cars[j].carState == 5){
								content1 += "<div class='item car-disable'>";
							}else{
								content1 += "<div class='item car-use'>";
							}
							content1 += "<input type='hidden' value="+cars[j].id+">";
							content1 += "<div><i></i><img src="+basePath()+"front/public/images/car.png"+" alt=''></div>";
							content1 += "<span>"+cars[j].carNo+"</span></div>";
						}
					}
					content1 += "</div>";
				}
			}
			$(".table-wrapper").html(content1);
		}
	});
}
//得到项目根路径
function basePath(){
	//获取当前网址，如： http://localhost:8080/ems/Pages/Basic/Person.jsp
	var currentPath = window.document.location.href;
	//获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
	var pathName = window.document.location.pathname;
	var pos = currentPath.indexOf(pathName);
	//获取主机地址，如： http://localhost:8080
	var localhostPath = currentPath.substring(0, pos);
	//获取带"/"的项目名，如：/ems
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	//获取项目的basePath   http://localhost:8080/ems/
	var basePath=localhostPath+projectName+"/";
	return basePath;
}
