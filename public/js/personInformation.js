var personId = $("#personId").val();
$(function () {
    /*====================初始化+变量声明====================*/
    // 初始化时间插件
    for(var i = 0 ; i< 3; i++){
        var $year = $('.data-year');
        laydate.render({ // 初始化年份选择
            elem: $year[i],
            theme: 'date',
            type: 'year',
            format: 'yyyy',
            // showBottom: false,
            done: function (value, date, endDate) {
                // $('.data').val(value);
            }
        });
    }
    for(var j = 0; j < 3; j++){
        var $month = $('.data-month');
        laydate.render({ // 初始化月份选择
            elem: $month[j],
            theme: 'date',
            type: 'month',
            format: 'yyyy-MM',
            // showBottom: false,
            done: function (value, date, endDate) {
                // $('.data').val(value);
            }
        });
    }
    
    /*====================echart====================*/
    var myChart1 = echarts.init(document.getElementById('echart1'));
    var myChart2 = echarts.init(document.getElementById('echart2'));
    var option1 = { // 工时统计
        series: [
            {
                name:'工时统计',
                type:'pie',
                color: [ '#35DADD','#B6A2DE'],
                selectedMode: true,
                radius : '70%',
                center:['40%','48%'],
                data:[
                    {
                        name:'在岗时间',
                        value:1936,
                        label: {
                            normal: {
                                formatter: '{b}:{c}小时\n{d}%'
                        }
                        }
                    },
                    {
                        name:'请假时间',
                        value:80,
                        label: {
                            normal: {
                                formatter: '{b}:{c}小时\n{d}%'
                                // show: false
                            },
                            // emphasis: {
                            //     show: true,
                            //     formatter: '{b}:{c}小时\n{d}%'
                            // }
                        },
                        // labelLine: {
                        //     normal: {
                        //         show: false
                        //     },
                        // },
                    },
                ]
            }
        ]
    };
    var option2 = { // 效率统计
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#333'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14,
                    color: '#999'
                }
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }],
        yAxis: [{
            type: 'value',
            name: '%',
            nameTextStyle: {
                color: '#666'
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#CEE1FC'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14,
                    color: '#999'
                },
            },
            splitLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#ccc',
                    opacity: '0.2'
                }
            },
        }],
        series: [{
            name: '效率统计',
            type: 'line',
            symbol: 'circle',
            symbolSize: 1,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 1,
                    opacity: 0.5,
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 136, 212, 0.2)'
                    }, {
                        offset: 1,
                        color: 'rgba(0, 136, 212, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(0,136,212)',
                    borderColor: 'rgba(0,136,212,0.2)',
                    borderWidth: 12

                }
            },
            data: [50,20,90,13,60,88,99,66,44,33,22,99]
        }, ]
    };
    myChart1.setOption(option1);
    myChart2.setOption(option2);

    /*=========================弹窗=========================*/
    // 关闭弹窗
    $('.close-icon').on('click',function () {
        var $popup = $(this).parents('.popup');
        $('.shade').fadeOut();
        $popup.fadeOut();
    });

    /*====================修改资料-弹窗====================*/
    var personModify = document.querySelector('.person-modify'); // 修改资料
    var informationSubmit = document.querySelector('.information-submit'); //提交
    var pictureFile = document.querySelector('.head-picture input[type=file]');
    // 头像
    pictureFile.addEventListener('change',function () {
        validate.checkImg($(this));
    });
    
    //点击修改资料
    personModify.addEventListener('click',function () {
    	$(".information-wrapper").find("input[name='telephone']").val($("#telephoneShow").text());
    	$(".information-wrapper").find("input[name='workphone']").val($("#workphoneShow").text());
    	$(".information-wrapper").find("input[name='email']").val($("#emailShow").text());
    	$(".information-wrapper").find("input[name='address']").val($("#addressShow").text());
        $('.shade, .information-wrapper').fadeIn();
    });
    // 修改信息提交
    informationSubmit.addEventListener('click',function () {
       $('.information-form').form('submit',{
           onSubmit: function () {
               var formValue = $(this).form('enableValidation').form('validate');
               var inputFileAttr = $(this).find('input[type=file]').next().next('span').attr('state');
               return (formValue) && (inputFileAttr!='errFile')
           },
           success: function (data) {
        	   var dataTemp = JSON.parse(data);
        	   if(dataTemp.result){
        		   new CustomPrompt({
                       type: 'success',
                       msg: '操作成功！'
                   });
                   $('.shade, .information-wrapper').fadeOut();
                   setTimeout("window.location.reload()", 2000);
        	   }else{
        		   new CustomPrompt({
                       type: 'success',
                       msg: '修改失败！'
                   });
        	   }
           }
       })
    });

    /*====================选择年/季度/月====================*/
    $('.data').on('change',function(){
        var $content = $(this).parents('.title');
        var thisValue = this.value;
        $content.find('select:not(:nth-of-type(1))').removeClass('data-show');
        $content.find('.data-year').removeClass('data-show');
        $content.find('.data-month').removeClass('data-show');
        (thisValue == 0) && $content.find('.data-year').addClass('data-show');
        (thisValue == 1) && $content.find('.data-quarter').addClass('data-show');
        (thisValue == 2) && $content.find('.data-month').addClass('data-show');
    });
    /*====================工时统计搜索按钮====================*/
    var timeBtn = document.querySelector('.time-btn'); //工时统计按钮
    timeBtn.addEventListener('click',function () {
        var $content = $(this).parents('.title');
        var $year = $content.find('.data-year');
        var $month = $content.find('.data-month');
        var state = $content.find('.data').val(); // 0:年 1:季度 2:月
        var tempValue; // 年/季度/月value值
        // var dataValue = new
        if(state == 0){ // 年
            tempValue = $year.val();
            if(tempValue == '' || tempValue == 'undefind'){
                new CustomPrompt({
                    type: 'default',
                    msg: '请选择年份!!'
                });
            }else {
            	var url="getWorkTime";
            	var param={"timeType":state,"time":tempValue};
            	$.post(url,param,function(data){
            		//console.log(data)
            		var chartOption1 = myChart1.getOption();
            		var arr1 = [data[0].workTime,data[0].leftTime]; //模拟的 在岗时间,请假时间
            		chartOption1.series[0].data[0].value = arr1[0];
            		chartOption1.series[0].data[1].value = arr1[1];
            		myChart1.setOption(chartOption1);
            		$('.time-all').html(data[0].workTime);
            		$('.time-stay').html(data[0].overTime);
            		$('.time-leave').html(data[0].leftTime);          		
            	},"json");
            }
        }
        if(state == 1){ // 季度
        	tempValue = $("#workTime2").val();
        	var url="getWorkTime";
        	var param={"timeType":state,"time":tempValue};
        	$.post(url,param,function(data){
        		var chartOption1 = myChart1.getOption();
        		var arr1 = [data[0].workTime,data[0].leaveSum]; //模拟的 在岗时间,请假时间
        		chartOption1.series[0].data[0].value = arr1[0];
        		chartOption1.series[0].data[1].value = arr1[1];
        		myChart1.setOption(chartOption1);
        		$('.time-all').html(data[0].workTime);
        		$('.time-stay').html(data[0].overTime);
        		$('.time-leave').html(data[0].leftTime);       		
        	},"json");
        }
        if(state == 2){ // 月
            tempValue = $month.val();
            if(tempValue == '' || tempValue == 'undefind'){
                new CustomPrompt({
                    type: 'default',
                    msg: '请选择月份!!'
                });
            }else {
                var chartOption1 = myChart1.getOption();
                var url="getWorkTime";
            	var param={"timeType":state,"time":tempValue};
            	$.post(url,param,function(data){
            		var arr1 = [data[0].workTime, data[0].leaveSum]; //模拟的 在岗时间,请假时间
            		chartOption1.series[0].data[0].value = arr1[0];
            		chartOption1.series[0].data[1].value = arr1[1];
            		myChart1.setOption(chartOption1);
            		$('.time-all').html(data[0].workTime);
            		$('.time-stay').html(data[0].overTime);
            		$('.time-leave').html(data[0].leftTime);            		
            	},"json");
            }
        }
    });

    /*====================工单统计搜索按钮====================*/
    var orderBtn = document.querySelector('.order-btn'); //工单统计按钮
    orderBtn.addEventListener('click',function () {
        var $content = $(this).parents('.title');
        var $year = $content.find('.data-year');
        var $month = $content.find('.data-month');
        var state = $content.find('.data').val(); // 0:年 1:季度 2:月
        var tempValue; // 年/季度/月value值
        if(state == 0){ // 年
            tempValue = $year.val();
            if(tempValue == '' || tempValue == 'undefind'){
                new CustomPrompt({
                    type: 'default',
                    msg: '请选择年份!!'
                });
            }else {
            	$.ajax({
            		url:"getWorkSheetStatistic",
            		method:"post",
            		data:"timeType="+state+"&time="+$year.val(),
            		dataType:"json",
            		success:function(data){
            			//console.log(data)
            			var arr1 = data; // 模拟数据
                        $('.order-num').html(arr1[0])
                        $('.task-num').html(arr1[1])
                        $('.task-efficiency').html(arr1[2])
            		},
            		error:function (XMLHttpRequest, textStatus, errorThrown){ 
             	     	//请求错误的处理
             			//请求错误的处理
             			//请求错误的处理
             	   	}
            	})
            }
        }
        if(state == 1){ // 季度
        	$.ajax({
        		url:"getWorkSheetStatistic",
        		method:"post",
        		data:"timeType="+state+"&time="+$year.val(),
        		dataType:"json",
        		success:function(data){
        			var arr1 = data; 
                    $('.order-num').html(arr1[0])
                    $('.task-num').html(arr1[1])
                    $('.task-efficiency').html(arr1[2])
        		},
        		error:function (XMLHttpRequest, textStatus, errorThrown){ 
         	     	//请求错误的处理
         			//请求错误的处理
         			//请求错误的处理
         	   	}
        	})
        }
        if(state == 2){ // 月
            tempValue = $month.val();
            if(tempValue == '' || tempValue == 'undefind'){
                new CustomPrompt({
                    type: 'default',
                    msg: '请选择月份!!'
                });
            }else {
            	$.ajax({
            		url:"getWorkSheetStatistic",
            		method:"post",
            		data:"timeType="+state+"&time="+tempValue,
            		dataType:"json",
            		success:function(data){
            			 var arr1 = data;
                         $('.order-num').html(arr1[0])
                         $('.task-num').html(arr1[1])
                         $('.task-efficiency').html(arr1[2])
            		},
            		error:function (XMLHttpRequest, textStatus, errorThrown){ 
             	     	//请求错误的处理
             			//请求错误的处理
             			//请求错误的处理
             	   	}
            	})
            }
        }
    });

    /*====================效率统计搜索按钮====================*/
    var efficiencyBtn = document.querySelector('.efficiency-btn'); // 效率统计按钮
    efficiencyBtn.addEventListener('click',function () {
        var $content = $(this).parents('.title');
        var $year = $content.find('.data-year');
        var $quarter = $content.find('.data-quarter');
        var $month = $content.find('.data-month');
        var state = $content.find('.data').val(); // 0:年 1:季度 2:月
        var tempValue; // 年/季度/月value值
        var dataX ;// 年/季度/月  X轴
        if(state == 0){ // 年
            tempValue = $year.val();
            if(tempValue == '' || tempValue == 'undefind'){
                new CustomPrompt({
                    type: 'default',
                    msg: '请选择年份!!'
                });
            }else {
                dataX = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
                $.ajax({
            		url:"getEfficiencies",
            		method:"post",
            		data:"timeType="+state +"&time="+$year.val(),
            		dataType:"json",
            		success:function(data){
            			console.log(JSON.stringify(data))
            			if(null != data && data.length > 0){
            				myChart2.setOption({
                                xAxis: [{
                                    data: dataX
                                }],
                                series: {
                                    data: data
                                }
                            });
            			}
            		},
            		error:function (XMLHttpRequest, textStatus, errorThrown){ 
             	     	//请求错误的处理
             			//请求错误的处理
             			//请求错误的处理
             	   	}
            	})
            }
        }
        if(state == 1){ // 季度
            tempValue = $quarter.val();
            //var arr1 = [99,66,88]; // 模拟数据
            (tempValue == 0) && (dataX = ['1月', '2月', '3月']);
            (tempValue == 1) && (dataX = ['4月', '5月', '6月']);
            (tempValue == 2) && (dataX = ['7月', '8月', '9月']);
            (tempValue == 3) && (dataX = ['10月', '11月', '12月']);
            $.ajax({
        		url:"getEfficiencies",
        		method:"post",
        		data:"timeType="+state +"&time="+$quarter.val(),
        		dataType:"json",
        		success:function(data){
        			if(null != data && data.length > 0){
        				myChart2.setOption({
        	                xAxis: [{
        	                    data: dataX
        	                }],
        	                series: {
        	                    data: data
        	                }
        	            });
        			}
        		},
        		error:function (XMLHttpRequest, textStatus, errorThrown){ 
         	     	//请求错误的处理
         			//请求错误的处理
         			//请求错误的处理
         	   	}
        	})
        }
        if(state == 2){ // 月
            tempValue = $month.val();
            if(tempValue == '' || tempValue == 'undefind'){
                new CustomPrompt({
                    type: 'default',
                    msg: '请选择月份!!'
                });
            }else {
                var arr1 = [99,66,88,22,11,44,55,77,88,99,0,11,22,33,44]; // 模拟数据
                var year = tempValue.split('-')[0];
                var month = tempValue.split('-')[1];
                dataX = getDaysInMonth(year, month);
                $.ajax({
            		url:"getEfficiencies",
            		method:"post",
            		data:"timeType="+state +"&time="+$month.val(),
            		dataType:"json",
            		success:function(data){
            			if(null != data && data.length > 0){
            				myChart2.setOption({
                                xAxis: [{
                                    data: dataX
                                }],
                                series: {
                                    data: data
                                }
                            });
            			}
            		},
            		error:function (XMLHttpRequest, textStatus, errorThrown){ 
             	     	//请求错误的处理
             			//请求错误的处理
             			//请求错误的处理
             	   	}
            	})
            }
        }
    });
    
    $.ajax({
		url:"getInfoByPersonId",
		method:"post",
		data:"personId="+personId,
		dataType:"json",
		success:function(data){
			$("#nameShow").text(data.name);
			$("#roleNameShow").text(data.roleName);
			$("#idCardShow").text(data.idCard);
			$("#telephoneShow").text(data.telephone);
			$("#workphoneShow").text(data.workphone);
			$("#emailShow").text(data.email);
			$("#addressShow").text(data.address);
			var avatarUrl = data.avatarUrl;
			if(null != avatarUrl && avatarUrl.lastIndexOf('grzxAvatar.png') == -1){
				$("#avatar").attr("src",basePath() + data.avatarUrl);
			}
		},
		error:function (XMLHttpRequest, textStatus, errorThrown){ 
 	     	//请求错误的处理
 			//请求错误的处理
 			//请求错误的处理
 	   	}
	})
});

/*=========================其它方法=========================*/
// 其它类型验证方法
var validate = {
    checkImg: function (node) {
        var thisNode = $(node)[0];
        var $inputText = $(node).next().next('span');
        var imgArr = new Array();
        var length = thisNode.files.length;
        if(length != 0){ //选择了文件
            for (var i = 0; i < length; i++) {
                var imgName = thisNode.files[i].name;
                if(imgName.indexOf('jpg') != -1 || imgName.indexOf("png") != -1 || imgName.indexOf("JPEG") != -1){
                    imgArr.push(imgName);
                }else { // 选择错误的文件
                    $inputText.html('文件选择错误！！').css('color','#ff642e').attr('state','errFile');
                }
            }
            if(length == imgArr.length){
                $inputText.html(imgArr.toString()).css('color','#dcdcdc').removeAttr('state');
            }
        }else{
            $inputText.html('支持.jpg/.png/.JPEG').css('color','#dcdcdc').removeAttr('state');
        }
    }
};

// 获取具体月份天数
function getDaysInMonth(year, month) {
    var dataArr = [];
    month = parseInt(month, 10); //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
    var temp = new Date(year, month, 0);

    var data = temp.getDate();

    for (var i = 0; i < data; i++) {
        dataArr.push(i + 1 + '日');
    }
    return dataArr;
}

function basePath() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var currentPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = currentPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPath = currentPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPath + projectName + "/");
}
