$(function () {
    /*=========================初始化配置类+变量声明=========================*/

    // 整体table
    $('#dg').datagrid({
    	//url: '../../../approverProcess/getApproverProcesses',
    	url: 'getApproverProcesses',
        method: 'POST',
        /*onLoadSuccess: function (row, data){
        	if(data[0].invalidate){
				window.parent.location.href = data[0].loginPage;
			}
        },*/
        fit: true,
        fitColumns: true,
        rownumbers: true, // 显示行号列
        singleSelect: true, // 允许选择一行
        pagination: true,
        columns: [
            [
                {
                    field: 'approvalType',
                    title: '审批类型',
                    width: 150,
                },
                {
                    field: 'approvers',
                    title: '审批流程',
                    width: 150,
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 100,
                    formatter: function (value,row,index) {
                        return '<div class="table-operation"><a class="table-edit"" href=javascript:updateApprover('+row.approvalTypeId+')><i></i>编辑</a></div>';
                    }
                }
            ]
        ]
    });

    // 弹窗内容滚动删除提示框
    $('.popup .content').on('scroll', function () {
        var tooltip = document.querySelector('.tooltip.tooltip-right');
        if (tooltip !== null) {
            $(this).find('input').trigger('blur');
        }
    });

    /*=========================弹窗=========================*/

    // 关闭弹窗
    $('.close-icon').on('click',function () {
        var $popup = $(this).parents('.popup');
        $('.shade').fadeOut();
        $popup.fadeOut();
    });

    /*=========================编辑弹窗=========================*/
    var $editApproval = $('#approvalSel1'); // 编辑审批
    var radioIndex = 2; // 编辑弹窗选项卡指定成员
    // 编辑弹窗审批comboTree
    $editApproval.combotree({
        //url: '../../../approverProcess/getPersonsByRole',
    	url: 'getPersonsByRole',
        onBeforeSelect:function(node){
            if(node.isparent){
                $("#approvalSel1").tree("unselect");
            }
        },
        method: 'post',
        hasDownArrow: false,
        width: 250,
        height: 30
    });
    // 编辑弹窗
    /*$('.table-wrapper').on('click','.table-edit', function () {
        $('.shade, .edit-wrapper').fadeIn();
    });*/
   
    // 编辑单选
    common.commonRadio('.edit-wrapper .content-item>div');
    // 编辑增加审批人
    $('.edit-wrapper .edit-add').on('click',function () {
    	var $this = $(this);
    	var itemNum = $('.content-item').length-1;
        itemNum = Arabia_To_SimplifiedChinese(itemNum);
        var node = '<div class="content-item addContent">' +
            '<label for="approval-people">第'+itemNum+'审批人:</label>' +
            '<input class="edit-approval-comboTree" name="personIds" data-options="required:true,prompt:\'请选择审批人\'"><i class="edit-del"></i></div>';
        $this.parent().before(node);
        var $nowContent = $this.parents('.content-item').prev('.content-item'); // 生成的节点
        $nowContent.find('.edit-approval-comboTree').combotree({
            //url: '../../../approverProcess/getPersonsByRole',
        	url: 'getPersonsByRole',
            onBeforeSelect:function(node){
                if(node.isparent){
                    $("#approvalSel1").tree("unselect");
                }
            },
            method: 'post',
            required: true,
            hasDownArrow: false,
            width: 250,
            height: 30
        });
    });
    // 编辑删除审批人
    $('.edit-wrapper').on('click','.edit-del',function () {
        $(this).parents('.content-item').remove();
    });
    // 编辑选项卡
    $('.edit-wrapper .radio-wrapper input[type=radio]').on('click',function () {
        var index = $(this).parents('.radio-wrapper').index();
        index == 2 ? $('.edit-wrapper .edit-form').show() : $('.edit-wrapper .edit-form').hide();
        radioIndex = index;
    });
    /*=========================提交=========================*/
    // 编辑弹窗提交
    var editSubmit = document.querySelector('.edit-submit');
    editSubmit.addEventListener('click',function () {
    	var approverProcessType=$("input[name='approverProcessType']:checked").val();
        $('.edit-form').form('submit', {
        	//url:"../../../approverProcess/updateApprovers?approverProcessType="+approverProcessType,
        	url:"updateApprovers?approverProcessType="+approverProcessType,
            onSubmit: function () {
                if(radioIndex == 2){ // 指定成员
                    return $(this).form('enableValidation').form('validate');
                }
            },
            success: function (data) {
            	var json = eval("("+data+")");
     			if(json.data==0){
     				new CustomPrompt({
     					type: 'success',
     					msg: '提交成功'
     				});          		
     			}else{
     				new CustomPrompt({
     					type: 'error',
     					msg: '提交失败'
     				});
     			}
     			$('#dg').datagrid('reload');    // 重新载入当前页面数据
            	$('.shade, .edit-wrapper').fadeOut();        			
            }
        });
    });

});

/*=========================其它方法=========================*/
function updateApprover(approvalTypeId){
	$(".content-item.addContent").remove();
    $('#approvalSel1').combotree("setValue","");
	//var url="../../../approverProcess/updateApproversByApprovalType";
	var url="updateApproversByApprovalType";
	var param={"approvalTypeId":approvalTypeId};
	$.post(url,param,function(data){
		if(data[0]!=null && data[0].invalidate){
    		window.parent.location.href = data[0].loginPage;
    	}
    	if(data[0]!=null && null != data[0].noOpt && data[0].noOpt){
 			new CustomPrompt({
                type: 'error',
                msg: '您无权操作！'
            });
 		}else{
 			//编辑弹窗
 			$('.shade, .edit-wrapper').fadeIn();
 			$('#approvalTypeId').val(approvalTypeId);
 			if(data.apType==3){//指定成员
 				//$('input[name="approverProcessType"]').attr("checked",'3');
 				$.each(data.data,function(i,n){
 					if(i == 0){
 						if(n.personId!=null){
 							$('#approvalSel1').combotree("setValue",n.personId);					
 						}
 					}
 					if(i!=0){
 						var aa="approvalSel"+(i+1);
 						var content= '<div class="content-item addContent">';
 						content += '<label for="approval-people">第';
 						content += Arabia_To_SimplifiedChinese(i+1);
 						content += '审批人</label>';
 						content += '<input class="edit-approval-comboTree" id="'+aa+'" name="personIds" data-options="required:true,prompt:\'请选择审批人\'" >';
 						content += '<i class="edit-del"></i>';
 						content += '</div>';
 						$("#addApprover").before(content).show();
 						$('#'+aa).combotree({
 							//url:'../../../approverProcess/getPersonsByRole',
 							url:'getPersonsByRole',
 							onBeforeSelect:function(node){
 								if(node.isparent){
 									$("#approvalSel1").tree("unselect");
 								}
 							},
 							method: 'post',
 							hasDownArrow: false,
 							width: 250,
 							height: 30,
 							value:n.personId
 						});
 					}
 					
 				});
 			}			
 		}
		/*if(data.apType==2){//指定成员
			$("input[type=radio]").attr("checked",'2');
		}
		if(data.apType==1){//指定成员
			$('input[name="approverProcessType"]').attr("checked",'1');
		}*/
	},"json");
}

//阿拉伯数字转中文
function Arabia_To_SimplifiedChinese(Num) {
 for (i = Num.length - 1; i >= 0; i--) {
     Num = Num.replace(",", "")//替换Num中的“,”
     Num = Num.replace(" ", "")//替换Num中的空格
 }
 if (isNaN(Num)) { //验证输入的字符是否为数字
     //alert("请检查小写金额是否正确");
     return;
 }
 //字符处理完毕后开始转换，采用前后两部分分别转换
 part = String(Num).split(".");
 newchar = "";
 //小数点前进行转化
 for (i = part[0].length - 1; i >= 0; i--) {
     if (part[0].length > 10) {
         //alert("位数过大，无法计算");
         return "";
     }//若数量超过拾亿单位，提示
     tmpnewchar = ""
     perchar = part[0].charAt(i);
     switch (perchar) {
         case "0": tmpnewchar = "零" + tmpnewchar; break;
         case "1": tmpnewchar = "一" + tmpnewchar; break;
         case "2": tmpnewchar = "二" + tmpnewchar; break;
         case "3": tmpnewchar = "三" + tmpnewchar; break;
         case "4": tmpnewchar = "四" + tmpnewchar; break;
         case "5": tmpnewchar = "五" + tmpnewchar; break;
         case "6": tmpnewchar = "六" + tmpnewchar; break;
         case "7": tmpnewchar = "七" + tmpnewchar; break;
         case "8": tmpnewchar = "八" + tmpnewchar; break;
         case "9": tmpnewchar = "九" + tmpnewchar; break;
     }
     switch (part[0].length - i - 1) {
         case 0: tmpnewchar = tmpnewchar; break;
         case 1: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
         case 2: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
         case 3: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
         case 4: tmpnewchar = tmpnewchar + "万"; break;
         case 5: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
         case 6: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
         case 7: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
         case 8: tmpnewchar = tmpnewchar + "亿"; break;
         case 9: tmpnewchar = tmpnewchar + "十"; break;
     }
     newchar = tmpnewchar + newchar;
 }
 //替换所有无用汉字，直到没有此类无用的数字为止
 while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
     newchar = newchar.replace("零亿", "亿");
     newchar = newchar.replace("亿万", "亿");
     newchar = newchar.replace("零万", "万");
     newchar = newchar.replace("零零", "零");
 }
 //替换以“一十”开头的，为“十”
 if (newchar.indexOf("一十") == 0) {
     newchar = newchar.substr(1);
 }
 //替换以“零”结尾的，为“”
 if (newchar.lastIndexOf("零") == newchar.length - 1) {
     newchar = newchar.substr(0, newchar.length - 1);
 }
 return newchar;
}
