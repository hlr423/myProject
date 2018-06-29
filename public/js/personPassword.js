$(function () {
    var submitBtn = document.querySelector('.submit');
    submitBtn.addEventListener('click',function () {
        $('.password-form').form('submit',{
            onSubmit: function () {
                var formValue = $(this).form('enableValidation').form('validate');
                console.log(formValue);
                if(formValue){
                	var oldPass = $("#oldPass").val();
                	var newPass = $("#password").val();
                	var newPassAssure = $("#newPassword").val();
                	var obj = new Object();
                	obj.oldPass = oldPass;
                	obj.newPass = newPass;
                	obj.newPassAssure = newPassAssure;
                	$.ajax({
                		url:"updatePass",
                		method:"post",
                		data:"passwords="+JSON.stringify(obj),
                		dataType:"json",
                		success:function(data){
                			console.log(data);
                			if(data.oldCorrect) {
                				if(data.isDifferent){
                					new CustomPrompt({
                                        type: 'error',
                                        msg: '两次密码输入不同！'
                                    });
                				}else{
                					if(data.result){
                						new CustomPrompt({
                                            type: 'success',
                                            msg: '操作成功！'
                                        });
                                       $('.password-form').find('input[type=password]').val('');
                					}
                				}
                            }else{
                                new CustomPrompt({
                                    type: 'error',
                                    msg: '旧密码输入错误！'
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
            },
        });
    });
});