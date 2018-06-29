// ======================================全局变量======================================
var $shade = $('.shade'); // 遮罩
$(function () {
	var d = new Date();
	d.setMonth(d.getMonth()+1);
	d.setDate(0);
	// 日历插件
	lay('#startTime').each(function (e) {
	    laydate.render({
	        elem: this,
	        value: new Date(),
	        theme: 'person',
	        showBottom: false,
	    })
	})


	// 日历插件
	lay('#endTime').each(function (e) {
	    laydate.render({
	        elem: this,
	        theme: 'person',
	        value: d,
	        showBottom: false,
	    })
	})
    // ======================================表格======================================
    $('#dg').datagrid({
    	url: "getDetailedByArea",
    	queryParams: {"areaId":$("#areaId").val(),"startTime":$("#startTime").val(),"endTime":$("#endTime").val()},
        fit: true,
        fitColumns: true,
//        rownumbers: true,
        singleSelect: true,
        pagination: true,     //开启分页  
        pageSize: 10,         //分页大小  
        scrollbarSize: 6,
        columns: [
            [	
            	{
            		field: 'id',
            		hidden: true
            	},
            	{
            		field: 'index',
            		title: '',
            		width: 20,
            		align: "center"
            	},
                {
                    field: 'day',
                    title: '日期',
                    width: 100
                },
                {
                    field: 'name',
                    title: '班次名称',
                    width: 100,
                    align: 'center'
                },
                {
                    field: 'c',
                    title: '值班',
                    width: 100,
                    align: 'center',
                    formatter: function (value,row, index) {
                        return '<a class="on-duty" onclick=onDuty('+row.id+')>值班</a>'
                    }
                },
                {
                    field: 'operate',
                    title: '预备',
                    width: 150,
                    formatter: function (value,row, index) {
                        var content = '';
                        content += '<div class="table-operation">';
                        content += '<a class="table-prepare" onclick=prepare('+row.id+')><i></i>预备</a>';
                        content += '</div>';
                        return content;
                    }
                }
            ]
        ],
        onLoadSuccess:function(data){ MergeCells('dg','index,day');}
    });

	/*
     * EasyUI DataGrid根据字段动态合并单元格
     * @param fldList 要合并table的id
     * @param fldList 要合并的列,用逗号分隔(例如："name,department,office");
     */
    function MergeCells(tableID, fldList) {
        var Arr = fldList.split(",");
        var dg = $('#' + tableID);
        var fldName;
        var RowCount = dg.datagrid("getRows").length;
        var span;
        var PerValue = "";
        var CurValue = "";
        var length = Arr.length - 1;
        var sonFldname = "";
        var fldNameS = "";
        for (i = length; i >= 0; i--) {
            fldName = Arr[i];
            PerValue = "";
            span = 1;
            for (row = 0; row <= RowCount; row++) {
                if (row == RowCount) {
                    CurValue = "";
                } else {
                    if(fldName.indexOf('.')>0){
                        var ArrFldName = fldName.split('.')
                        fldNameS = ArrFldName[0];
                        sonFldname = ArrFldName[1];
                        CurValue = dg.datagrid("getRows")[row][fldNameS][sonFldname];
                    }else{
                        CurValue = dg.datagrid("getRows")[row][fldName];
                    }
                }
                if (PerValue == CurValue) {
                    span += 1;
                } else {
                    var index = row - span;
                    dg.datagrid('mergeCells', {
                        index: index,
                        field: fldName,
                        rowspan: span,
                        colspan: null
                    });
                    span = 1;
                    PerValue = CurValue;
                }
            }
        }
    }

    // ======================================关闭弹窗按钮======================================
    var $closeBtn = $('.close-icon'); // 关闭弹窗按钮
    $closeBtn.on('click', function () {
        $shade.fadeOut();
        $(this).parents('.popup').fadeOut();
    })
    
    $(".export-btn").click(function(){
     	var areaId = parseInt($("#areaId").val());
     	var startTime = $("#startTime").val();
     	var endTime = $("#endTime").val();
     	window.location.href = "getDetailedForExcel?areaId="+areaId+"&startTime="+startTime+"&endTime="+endTime;
    })
    
    $(".search-btn").click(function(data){
    	$('#dg').datagrid("load",{"areaId":$("#areaId").val(),"startTime":$("#startTime").val(),"endTime":$("#endTime").val()})
    })
    $("#areaId").change(function(){
    	$('#dg').datagrid("load",{"areaId":$("#areaId").val(),"startTime":$("#startTime").val(),"endTime":$("#endTime").val()})
    })
});

// ======================================其他方法======================================
// 预备
function prepare(id) {
    $shade.fadeIn();
    $('.schedule-popup').fadeIn();
    $('#state').text("预备");
    $('#yb').datagrid({
        // fit: true,
    	url: "getDetailedPrepare",
    	queryParams: {"id":id},
        fitColumns: true,
        singleSelect: true,
        scrollbarSize: 6,
        columns: [
            [	{
	            	field: 'id',
	            	hidden: true
            	},
                {
                    field: 'name',
                    title: '姓名',
                    width: 100,
                    align: 'center',
                    
                },
                {
                    field: 'wrokName',
                    title: '工种',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'tel',
                    title: '电话号码',
                    width: 100,
                    align: 'center',
                },
            ]
        ]
    });
};

// 值班
function onDuty(id) {
    $shade.fadeIn();
    $('.schedule-popup').fadeIn();
    $('#state').text("值班");
    $('#yb').datagrid({
        // fit: true,
    	url: "getDetailedDuty",
    	queryParams: {"id":id},
        fitColumns: true,
        singleSelect: true,
        scrollbarSize: 6,
        columns: [
            [
            	{
	            	field: 'id',
	            	hidden: true
            	},
                {
                    field: 'name',
                    title: '姓名',
                    width: 100,
                    align: 'center',
                    
                },
                {
                    field: 'wrokName',
                    title: '工种',
                    width: 100,
                    align: 'center',
                },
                {
                    field: 'tel',
                    title: '电话号码',
                    width: 100,
                    align: 'center',
                }
            ]
        ]
    });
} 

// 单个删除
function singleDelete() {
    $shade.fadeIn();
    $('.delete-wrapper').fadeIn();
};
