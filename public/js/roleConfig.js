// ======================================全局变量======================================
var $shade = $('.shade'); // 遮罩
var aclss = new Array();
var roleId;
var flag;
$(function () {
    // ======================================下拉树======================================
    $('#client').combotree({
        url: '../data/tree_data1.json',
        method: 'get',
        width: 250,
        height: 30,
        hasDownArrow: false
    });

    // ======================================表格======================================
    $('#dg').datagrid({
        url: "getByPage",
        method: "post",
        fit: true,
        fitColumns: true,
        rownumbers: true,
        singleSelect: true,
        pagination: true, //开启分页  
        pageSize: 10, //分页大小  
        scrollbarSize: 6,
        columns: [
            [{
                    field: 'name',
                    title: '角色名称',
                    width: 100,
                },
                {
                    field: 'detail',
                    title: '权限详情',
                    align: 'center',
                    width: 100,
                    formatter: function (value, rec) {
                        return '<a class="detail" onclick=openDetail(' + rec.id + ')>查看</a>'
                    }
                },
                {
                    field: 'persons',
                    title: '人员信息',
                    align: 'center',
                    width: 100,
                    formatter: function (value, rec) {
                        return '<a class="detail" onclick=getPersons(' + rec.id + ')>查看</a>'
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 100,
                    formatter: function (value, rec) {
                        var content = '';
                        content += '<div class="table-operation">';
                        content += '<a class="table-edit-role" onclick=editRole(' + rec.id + ')><i></i>修改角色</a>';
                        content += '<a class="table-edit-pow" onclick=editPow(' + rec.id + ')><i></i>修改权限</a>';
                        content += '<a class="table-delete" onclick=singleDelete(' + rec.id + ')><i></i>删除</a>';
                        content += '</div>';
                        return content;
                    }
                }
            ]
        ],
        onLoadSuccess: function (row, data) {
            if (null != data && null != data[0] && data[0].invalidate) {
                window.parent.location.href = data[0].loginPage;
            }
        }
    });
    // 初始化tabletree
    /* var option = {
        expandable: true,
        column: 0,
        indent: 20,
    }
    $('#treeTable1').treetable(option); // 新建
    $('#treeTable2').treetable(option); // 详情
    $('#treeTable3').treetable(option); // 编辑
*/

    // ======================================新建框======================================
    var $newPopup = $('.new-popup'); // 新建弹窗框
    var newBtn = document.getElementsByClassName('new-btn')[0]; // 新建按钮
    var newSubmit = document.getElementsByClassName('new-submit')[0]; // 新建提交按钮
    var $newRole = $('#newRole'); // 新建-通知角色cbt
    var $radioWrapper = $('.new-popup .radio-wrapper'); // 新建单选复选框

    // 打开弹窗，清空数据
    newBtn.addEventListener('click', function () {
        $.ajax({
            type: "post",
            url: "addTestRoleModel",
            dataType: "json",
            success: function (data) {
                if (null != data && null != data[0] && data[0].invalidate) {
                    window.parent.location.href = data[0].loginPage;
                }

                if (null != data && null != data[0] && data[0].noOpt) {
                    new CustomPrompt({
                        type: 'error',
                        msg: '您无权操作！'
                    });
                } else {
                    //console.log(data)
                    //console.log(JSON.stringify(data.resources))
                    var roleModels = data.roleModels;
                    var resultData = data.resources;
                    $("#model-role").empty();
                    var contentResource = "<option value='0'>请选择模板</option>";
                    for (var i = 0; i < roleModels.length; i++) {
                        var roleModel = roleModels[i];
                        contentResource += "<option value='" + roleModel.id + "'>" + roleModel.text + "</option>";
                    }
                    $("#model-role").append(contentResource);

                    var option = {
                        expandable: true,
                        column: 0,
                        indent: 20,
                    };
                    $('#treeTable1').remove();
                    var $treeTable1 = "<table class='treetable power' id='treeTable1'></table>"
                    $("#newForm").append($treeTable1);
                    var content = "<thead><tr><th><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' class='check-row checkedAll'></a></th><th>菜单名称:</th><th>查看</th><th>增加</th><th>删除</th><th>修改</th><th>上传</th><th>下载</th></tr></thead><tbody class='tbody-checkBox'>";
                    for (var i = 0; i < resultData.length; i++) {
                        var aclModelFirst = resultData[i];
                        var isPage = aclModelFirst.isPage;
                        content += "<tr data-tt-id='" + (i + 1) + "'>";
                        aclss.push((i + 1));
                       // content += "<td>" + aclModelFirst.text + "</td>";
                       // content += "<input name='isPage' type='hidden' value=" + aclModelFirst.isPage + " />"
                        if (isPage) {
                        	content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' class='check-row'></a></td>";
                        	content += "<td>" + aclModelFirst.text + "</td>";
                            content += "<input name='isPage' type='hidden' value=" + aclModelFirst.isPage + " />"
                            var noOpt = aclModelFirst.noOpt;
                            content += "<input name='resourceId' type='hidden' value=" + aclModelFirst.id + " />"
                            var opt = aclModelFirst.opt;
                            if ((noOpt & 1) == 0) {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row'></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' disabled></a></td>";
                            }

                            if ((noOpt & 2) == 0) {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='2' class='check-row'></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='2' class='check-row' disabled></a></td>";
                            }

                            if ((noOpt & 4) == 0) {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='4' class='check-row'></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='4' class='check-row' disabled></a></td>";
                            }

                            if ((noOpt & 8) == 0) {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='8' class='check-row'></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='8' class='check-row' disabled></a></td>";
                            }

                            if ((noOpt & 16) == 0) {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='16' class='check-row'></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='16' class='check-row' disabled></a></td>";
                            }
                            if ((noOpt & 32) == 0) {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='32' class='check-row'></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='32' class='check-row' disabled></a></td>";
                            }
                            content += "</tr>"
                        } else {
                            content += "<td></td>";
                            content += "<td>" + aclModelFirst.text + "</td>";
                            content += "<input name='isPage' type='hidden' value=" + aclModelFirst.isPage + " />"
                            content += "<td></td>";
                            content += "<td></td>";
                            content += "<td></td>";
                            content += "<td></td>";
                            content += "<td></td>";
                            var secondChildren = aclModelFirst.children;
                            for (var j = 0; j < secondChildren.length; j++) {
                                var secondChild = secondChildren[j];
                                var secondIsPage = secondChild.isPage;
                                content += "<tr data-tt-id='" + (i + 1) + "-" + (j + 1) + "' data-tt-parent-id='" + (i + 1) + "'>";
                                //aclss.push((i+1)+"-"+(j+1));
                                if (secondIsPage) {
                                	content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' class='check-row'></a></td>";
                                	content += "<td>" + secondChild.text + "</td>";
                                    content += "<input name='isPage' type='hidden' value=" + secondChild.isPage + " />"
                                	var secondOpt = secondChild.opt;
                                    var secondNoOpt = secondChild.noOpt;
                                    content += "<input name='resourceId' type='hidden' value='" + secondChild.id + "' />"

                                    if ((secondNoOpt & 1) == 0) {
                                        content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row'></a></td>";
                                    } else {
                                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' disabled></a></td>";
                                    }

                                    if ((secondNoOpt & 2) == 0) {
                                        content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='2' class='check-row'></a></td>";
                                    } else {
                                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='2' class='check-row' disabled></a></td>";
                                    }


                                    if ((secondNoOpt & 4) == 0) {
                                        content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='4' class='check-row'></a></td>";
                                    } else {
                                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='4' class='check-row' disabled></a></td>";
                                    }


                                    if ((secondNoOpt & 8) == 0) {
                                        content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='8' class='check-row'></a></td>";
                                    } else {
                                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='8' class='check-row' disabled></a></td>";
                                    }


                                    if ((secondNoOpt & 16) == 0) {
                                        content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='16' class='check-row'></a></td>";
                                    } else {
                                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='16' class='check-row' disabled></a></td>";
                                    }

                                    if ((secondNoOpt & 32) == 0) {
                                        content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='32' class='check-row'></a></td>";
                                    } else {
                                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='32' class='check-row' disabled></a></td>";
                                    }
                                    content += "</tr>"
                                } else {
                                    content += "<td></td>";
                                	content += "<td>" + secondChild.text + "</td>";
                                    content += "<input name='isPage' type='hidden' value=" + secondChild.isPage + " />"
                                    content += "<td></td>";
                                    content += "<td></td>";
                                    content += "<td></td>";
                                    content += "<td></td>";
                                    content += "<td></td>";
                                    var thirdChildren = secondChild.children;

                                    for (var k = 0; k < thirdChildren.length; k++) {
                                        var thirdChild = thirdChildren[k];
                                        var thirdOpt = thirdChild.opt;
                                        var thirdNoOpt = thirdChild.noOpt;
                                        content += "<tr data-tt-id='" + (i + 1) + "-" + (j + 1) + "-" + (k + 1) + "' data-tt-parent-id='" + (i + 1) + "-" + (j + 1) + "'>";
                                        content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' class='check-row'></a></td>";
                                        content += "<td>" + thirdChild.text + "</td>";
                                        content += "<input name='isPage' type='hidden' value=" + thirdChild.isPage + " />"
                                        content += "<input name='resourceId' type='hidden' value='" + thirdChild.id + "' />"

                                        if ((thirdNoOpt & 1) == 0) {
                                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row'></a></td>";
                                        } else {
                                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' disabled></a></td>";
                                        }


                                        if ((thirdNoOpt & 2) == 0) {
                                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='2' class='check-row'></a></td>";
                                        } else {
                                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='2' class='check-row' disabled></a></td>";
                                        }

                                        if ((thirdNoOpt & 4) == 0) {
                                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='4' class='check-row'></a></td>";
                                        } else {
                                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='4' class='check-row' disabled></a></td>";
                                        }


                                        if ((thirdNoOpt & 8) == 0) {
                                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='8' class='check-row'></a></td>";
                                        } else {
                                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='8' class='check-row' disabled></a></td>";
                                        }

                                        if ((thirdNoOpt & 16) == 0) {
                                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='16' class='check-row'></a></td>";
                                        } else {
                                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='16' class='check-row' disabled></a></td>";
                                        }


                                        if ((thirdNoOpt & 32) == 0) {
                                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='32' class='check-row'></a></td>";
                                        } else {
                                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='32' class='check-row' disabled></a></td>";
                                        }
                                        content += "</tr>"
                                    }
                                }
                            }
                        }
                    }
                    content += "</tbody>";
                    $("#treeTable1").append(content);
                    common.commonCheckbox('.power');
                    $('#treeTable1').treetable(option);
                    $('#treeTable1').treetable("expandAll")

                    $shade.fadeIn();
                    $newPopup.fadeIn();
                    $newPopup.find('input[type=text]').val('');
                    $('.new-role').find('option:eq(0)').attr('selected', true);
                    // 初始化单选框
                    $radioWrapper.eq(0).addClass('radio-checked').find('input').prop('checked', true);
                    $radioWrapper.eq(1).removeClass('radio-checked').find('input').prop('checked', false);
                    var content = createModelSelect();
                    if ($newPopup.find('.model-role').length === 0) {
                        $newPopup.find('.content-item').eq(0).after(content);
                    }
                    // 清空select
                    $newPopup.find('select').find('option:eq(0)').prop('selected', true);
                    // 清空复选框
                    $newPopup.find('.power .checkbox-wrapper').removeClass('checkbox-wrapper-checked').find('input').prop('checked', false);
                    // 移除重复提示
                    $('.repate-name').remove();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //请求错误的处理
                //请求错误的处理
                //请求错误的处理
            }
        })
    });
    common.commonRadio('.chose-type');

    // 新建类型单选框
    var $newType = $('input[name=new-type]');
    $newType.on('change', function () {
        var content = createModelSelect();

        if (this.value == 1) {
            // 是根据模板创建
            $(this).parents('.content-item').after(content);
            $.parser.parse($('#newForm'))
        } else {
            // 是自定义,移除模板角色
            var modelRole = document.getElementsByClassName('model-role')[0];
            modelRole.parentNode.removeChild(modelRole);
        }

        // 清空复选框
        $newPopup
            .find('.power .checkbox-wrapper').removeClass('checkbox-wrapper-checked')
            .find('input[type=checkbox]').prop('checked', false);

    })
    // ====复选框 只要有任何一个选中了 查这一个都应该选中=====
    $('#newForm').on('click', '.check-row', function () {
        var $this = $(this);
        // var $a = $this.parents('a');
        var $tr = $this.parents('tr');
        var All = $this.hasClass('checkedAll') //true, 全选
        var index = $tr.find('input[type=checkbox]').index($this);
        var checkBoxLenth = $this.parents('tr').find('input[type="checkbox"]:checked').length

        if ($tr.find('.check-row').eq(1)) {}
        if ($this.prop("checked") == true) {
            if (index == '0') {
                if (All === true) {
                    $this.prop('checked', true).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked'); //  选中当前的
                    $('.tbody-checkBox tr>td').find('.check-row').prop('checked', true).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked') //选中全选
                }
                if (All === false) {
                    flag = true;
                    $tr.find('.check-row').not($this).prop('checked', true).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked') //在本tr中除去当前checkbox以外全选中
                    $this.prop('checked', true).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked'); // 本tr中当前点击的checkbox被选中
                }
            } else {
                flag = false
                $this.prop('checked', true).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked'); // 本tr中当前点击的checkbox被选中
                $tr.find('.check-row').eq(1).prop('checked', true).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked'); //当人选中选中一个是查看选中
                // 单击选中只剩最后2个选项时，行全部选中
                if (checkBoxLenth == 6) {
                    $tr.find('.check-row').eq(0).prop('checked', false).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked'); //当人选中选中一个是查看选中
                }
            }
        }
        // 不选择
        if ($(this).prop("checked") == false) {
            //    获取选中checkbox的数量
            if (index == '0') {
                if (All === true) { //取消选中所有
                    $this.prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked'); //  取消选中当前的
                    $('.tbody-checkBox tr>td').find('.check-row').prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked') //选中全选

                }
                if (All === false) { //取消选中一行
                    $tr.find('.check-row').not($this).prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked') //在本tr中除去当前checkbox以外全选中
                    $this.prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked'); // 本tr中取消当前点击的checkbox被选中的

                }
            } else { //单击取消当前选中的
                $this.prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked'); // 本tr中当前取消点击的checkbox被选中
                // 当flag为true时，表一次性全选，取消一个时，每行全选复选框取消
                if (flag) {
                    if (checkBoxLenth == 6) {
                        $tr.find('.check-row').eq(0).prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked'); //当人选中选中一个是查看选中
                    }
                } else {
                    if (checkBoxLenth == 5) {
                        console.log("ds")
                        $tr.find('.check-row').eq(0).prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked'); //当人选中选中一个是查看选中
                    }
                }
                //  单击查看时取消全部选中和查看选中                 
                if (index == 1) {
                    $tr.find('.check-row').not($this).prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked') //在本tr中除去当前checkbox以外全选中
                    $this.prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked');
                }
            }
        }
        // 之前的
        //     if (index === 0) {

        //         $this.prop('checked', true).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked');
        //         // if ($tr.find('a').not($a).hasClass('checkbox-wrapper-checked')) {
        //         //     console.log("log")
        //         //     $this.prop('checked', true).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked');
        //         // }
        //     } else {
        //         $tr.find('td')
        //         // $tr.find('td:eq(1)')
        //             .find('.checkbox-wrapper').addClass('checkbox-wrapper-checked')
        //             .find('input').prop('checked', true)
        //     }
    });

    var newRoleName = document.getElementsByClassName('new-role-name')[0];
    newRoleName.addEventListener('blur', function () {
        //isRepate(this);
    })

    // 新建提交按钮
    newSubmit.addEventListener('click', function () {
        $('#newForm').form('submit', {
            onSubmit: function () {
                if ($(this).form('enableValidation').form('validate')) {
                    var data = new Object();
                    var accessType = $('#accessType').val();
                    var usefullTime = $("#usefullTime").val();
                    var isManager = $("#domain").val();
                    data.accessType = accessType;
                    data.usefullTime = usefullTime;
                    data.name = $("#roleName").val();
                    data.isManager = isManager;
                    var trs = $("#treeTable1").find("tbody").children("tr"); //得到所有tr
                    var array = new Array();
                    var j = 0;
                    for (var i = 0; i < trs.length; i++) {
                        var $tr = $(trs[i]);
                        var isPage = $tr.find("input[name='isPage']").val(); //得到是页面的tr
                        if (isPage == "true") {
                            if ($tr.find('input[type=checkbox]:checked').length != 0) { //得到分配权限的input【checkbox】数组
                                var acl = new Object();
                                var modelId = $tr.find("input[name='resourceId']").val();
                                acl.id = modelId;
                                var checkboxs = $tr.find('input[type=checkbox]:checked');
                                var opt = 0;
                                for (var k = 0; k < checkboxs.length; k++) {
                                    var $checkbox = $(checkboxs[k]);
                                    opt |= $checkbox.val();
                                }
                                acl.opt = opt;
                                array[j] = acl;
                                j++;
                            }
                        }
                    }
                    data.resources = array;
                    //console.log(JSON.stringify(data));
                    //{"accessType":"1","usefullTime":"1","name":"测试","resources":[{"id":"1","opt":9},{"id":"3","opt":17},{"id":"6","opt":1}]}
                    $.ajax({
                        type: "post",
                        url: "addRole",
                        data: "content=" + JSON.stringify(data),
                        dataType: "json",
                        success: function (data) {
                            if (null != data[0] && data[0].invalidate) {
                                window.parent.location.href = data[0].loginPage;
                            }

                            if (data.isExist) {
                                new CustomPrompt({
                                    type: 'default',
                                    msg: '该名称已存在！'
                                });
                            } else {
                                if (data.result) {
                                    new CustomPrompt({
                                        type: 'success',
                                        msg: '操作成功！'
                                    });

                                    $shade.fadeOut();
                                    $newPopup.fadeOut();
                                    setTimeout("window.location.reload()", 2000);
                                } else {
                                    new CustomPrompt({
                                        type: 'error',
                                        msg: '操作失败！'
                                    });
                                }
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //请求错误的处理
                            //请求错误的处理
                            //请求错误的处理
                        }
                    })
                } else {
                    return false
                }
            }
        });
    });
    // ======================================点击搜索======================================
    $(".search-btn").on("click", function () {
        search(1, 10);
    })
    // ======================================修改角色======================================
    var $editRolePopup = $('.edit-role-name-popup');
    // 判断角色名是否与数据库的重复
    var editRoleName = document.getElementsByClassName('edit-role-name')[0];
    editRoleName.addEventListener('blur', function () {
        isRepate(this);
    });

    // ===编辑中的复选框 只要有任何一个选中了 查这一个都应该选中===
    $('#editForm').on('click', '.check-row', function () {
        var $this = $(this);
        var $a = $this.parents('a');
        var $tr = $this.parents('tr');
        var index = $tr.find('input[type=checkbox]').index($this);
        var All = $this.hasClass('checkedAll') //true, 全选
        var checkBoxLenth = $this.parents('tr').find('input[type="checkbox"]:checked').length
        //选中函数创建
        if ($this.prop("checked") == true) {
            if (index == '0') {
                if (All === true) {
                    $this.prop('checked', true).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked'); //  选中当前的
                    $('.tbody-checkBox tr>td').find('.check-row').prop('checked', true).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked') //选中全选
                }
                if (All === false) {
                    flag = true;
                    $tr.find('.check-row').not($this).prop('checked', true).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked') //在本tr中除去当前checkbox以外全选中
                    $this.prop('checked', true).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked'); // 本tr中当前点击的checkbox被选中
                }
            } else {
                flag = false
                $this.prop('checked', true).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked'); // 本tr中当前点击的checkbox被选中
                $tr.find('.check-row').eq(1).prop('checked', true).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked'); //当人选中选中一个是查看选中

                // 单击选中只剩最后2个选项时，行全部选中
                if (checkBoxLenth == 6) {
                    $tr.find('.check-row').eq(0).prop('checked', false).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked'); //当人选中选中一个是查看选中
                }
            }
        }
        // 不选择函数的创建
        if ($(this).prop("checked") == false) {
            //    获取选中checkbox的数量
            if (index == '0') {
                if (All === true) { //取消选中所有
                    $this.prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked'); //  取消选中当前的
                    $('.tbody-checkBox tr>td').find('.check-row').prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked') //选中全选
                }
                if (All === false) { //取消选中一行
                    $tr.find('.check-row').not($this).prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked') //在本tr中除去当前checkbox以外全选中
                    $this.prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked'); // 本tr中取消当前点击的checkbox被选中的
                }
            } else { //单击取消当前选中的
                $this.prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked'); // 本tr中当前点击的checkbox被选中
                $tr.find('.check-row').eq(1).prop('checked', true).parents('.checkbox-wrapper').addClass('checkbox-wrapper-checked');
                // flag 为true时，取消一个则全部复选框不选中
                if (flag) {
                    if (checkBoxLenth == 6) {
                        if (index == 1) {

                            return 0;
                        } else {
                            $tr.find('.check-row').eq(0).prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked'); //取消全选复选框选中状态                            
                        }
                    }
                } else {
                    if (checkBoxLenth == 5) {
                        if (index == 1) {
                            return 0;
                        } else {
                            $tr.find('.check-row').eq(0).prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked'); //取消全选复选框选中状态                            
                        }
                        $tr.find('.check-row').eq(0).prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked'); //当人选中选中一个是查看选中
                    }
                    if (checkBoxLenth == 0) {
                        $tr.find('.check-row').eq(1).prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked');
                    } else {
                        if (index == 1) {
                            return 0
                        }
                    }
                }
                //  单击取消选中只有1个选项时，取消行全部选中和查看选中
                if (checkBoxLenth == 1) {
                    $this.parents('tr').find('.check-row').eq(1).prop('checked', false).parents('.checkbox-wrapper').removeClass('checkbox-wrapper-checked');
                }
            }
        }

    });
    // ======================================编辑框======================================
    // 编辑提交按钮
    var editSubmit = document.getElementsByClassName('edit-submit')[0]; // 编辑提交按钮
    var $editPopup = $('.edit-popup'); // 编辑弹窗框
    editSubmit.addEventListener('click', function () {
        $('#editForm').form('submit', {
            onSubmit: function () {
                var data = new Object();
                data.roleId = roleId;
                var trs = $("#treeTable3").find("tbody").children("tr"); //得到所有tr
                var array = new Array();
                var j = 0;
                for (var i = 0; i < trs.length; i++) {
                    var $tr = $(trs[i]);
                    var isPage = $tr.find("input[name='isPage']").val(); //得到是页面的tr
                    if (isPage == "true") {
                        if ($tr.find('input[type=checkbox]:checked').length != 0) { //得到分配权限的input【checkbox】数组
                            var acl = new Object();
                            var modelId = $tr.find("input[name='resourceId']").val();
                            acl.id = modelId;
                            var checkboxs = $tr.find('input[type=checkbox]:checked');
                            var opt = 0;
                            for (var k = 0; k < checkboxs.length; k++) {
                                var $checkbox = $(checkboxs[k]);
                                opt |= $checkbox.val();
                            }
                            acl.opt = opt;
                            array[j] = acl;
                            j++;
                        }
                    }
                }
                data.resources = array;
                //console.log(JSON.stringify(data));
                $.ajax({
                    type: "post",
                    url: "updateRole",
                    data: "content=" + JSON.stringify(data),
                    dataType: "json",
                    success: function (data) {
                        if (null != data[0] && data[0].invalidate) {
                            window.parent.location.href = data[0].loginPage;
                        }
                        if (data.result) {
                            new CustomPrompt({
                                type: 'success',
                                msg: '操作成功！'
                            });
                            $shade.fadeOut();
                            $('.edit-popup').fadeOut();
                        } else {
                            new CustomPrompt({
                                type: 'error',
                                msg: '操作失败！'
                            });
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //请求错误的处理
                        //请求错误的处理
                        //请求错误的处理
                    }
                })
                //return $(this).form('enableValidation').form('validate');
            }
        });
    });

    // ======================================关闭弹窗按钮======================================
    var $closeBtn = $('.close-icon'); // 关闭弹窗按钮
    $closeBtn.on('click', function () {
        $shade.fadeOut();
        $(this).parents('.popup').fadeOut();
    })


    // 编辑提交按钮
    var edtiRoleNameSubmit = document.getElementsByClassName('edti-role-name-submit')[0];
    edtiRoleNameSubmit.addEventListener('click', function () {
        $('#editRoleForm').form('submit', {
            onSubmit: function () {
                return $(this).form('enableValidation').form('validate');
            },
            success: function (data) {
                if (null != data[0] && data[0].invalidate) {
                    window.parent.location.href = data[0].loginPage;
                }

                var obj = JSON.parse(data)
                if (obj.isExist) {
                    new CustomPrompt({
                        type: 'default',
                        msg: '名称已存在！'
                    });
                } else {
                    if (obj.result) {
                        new CustomPrompt({
                            type: 'success',
                            msg: '操作成功！'
                        });
                        $shade.fadeOut();
                        $editRolePopup.fadeOut();
                    } else {
                        new CustomPrompt({
                            type: 'error',
                            msg: '操作失败！'
                        });
                    }
                }
            }
        });
    });

    // ======================================取消按钮======================================
    $('.infor-cancel').on('click', function () {
        $shade.fadeOut();
        $(this).parents('.infor-wrapper').fadeOut();
    });

    // ======================================确认删除按钮======================================
    var deleteConfirm = document.getElementsByClassName('delete-confirm')[0];
    deleteConfirm.addEventListener('click', function () {
        $shade.fadeOut();
        $('.delete-wrapper').fadeOut();
        $.ajax({
            type: "post",
            url: "deleteRole",
            data: "roleId=" + roleId,
            dataType: "json",
            success: function (data) {
                if (null != data[0] && data[0].invalidate) {
                    window.parent.location.href = data[0].loginPage;
                }
                if (data.result) {
                    new CustomPrompt({
                        type: 'success',
                        msg: '操作成功！'
                    });
                } else {
                    new CustomPrompt({
                        type: 'error',
                        msg: '操作失败！'
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //请求错误的处理
                //请求错误的处理
                //请求错误的处理
            }
        })
    });

    $('#persons').datagrid({
        fit: true,
        fitColumns: true,
        rownumbers: true,
        scrollbarSize: 6,
        columns: [
            [{
                    field: 'name',
                    title: '姓名',
                    width: 100,
                },
                {
                    field: 'organization',
                    title: '部门',
                    align: 'center',
                    width: 100
                },
                {
                    field: 'telephone',
                    title: '手机号',
                    align: 'center',
                    width: 100
                },
                {
                    field: 'workphone',
                    title: '人员信息',
                    align: 'center',
                    width: 100
                },
                {
                    field: 'personStatus',
                    title: '人员状态',
                    align: 'center',
                    width: 100
                }
            ]
        ]
    })


    //角色模板变化得到新的权限值
    $("#model-role").on("change", function () {
        var roleId = $(this).val();
        if (roleId != "0") {
            $.ajax({
                type: "post",
                url: "getAclByRoleId",
                data: "roleId=" + roleId + "&isMdel=" + true,
                dataType: "json",
                success: function (data) {
                    if (null != data[0] && data[0].invalidate) {
                        window.parent.location.href = data[0].loginPage;
                    }
                    var resultData = data.acls;
                    if (resultData.length > 0) {
                        var option = {
                            expandable: true,
                            column: 0,
                            indent: 20,
                        };
                        $('#treeTable1').remove();
                        var $treeTable1 = "<table class='treetable power' id='treeTable1'></table>"
                        $("#newForm").append($treeTable1);
                        var content = getContent(resultData);
                        $("#treeTable1").append(content);
                        common.commonCheckbox('.power');
                        $('#treeTable1').treetable(option);
                        $('#treeTable1').treetable("expandAll")
                    } else {
                        $("#treeTable1").empty();
                        $("#treeTable1").append("<strong align = 'center' style='color: red;'>请选择角色模板！</strong>");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //请求错误的处理
                    //请求错误的处理
                    //请求错误的处理
                }
            })
        }
    })
});

// ======================================其他方法======================================
// 修改角色权限
function editPow(obj) {
    roleId = obj;
    $.ajax({
        type: "post",
        url: "updateAclByRoleId",
        data: "roleId=" + obj + "&isMdel=" + false,
        dataType: "json",
        success: function (data) {
            //console.log(data)
            if (null != data && null != data[0] && data[0].invalidate) {
                window.parent.location.href = data[0].loginPage;
            }

            if (null != data && null != data[0] && data[0].noOpt) {
                new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
            } else {
                var isInner = data.isInner;
                var type = "外部";
                if (isInner) {
                    type = "内部";
                }
                $("#editForm").find(".content-item:eq(0)").find("span").text(data.name);
                $("#editForm").find(".content-item:eq(1)").find("span").text(type);
                var resultData = data.acls;
                if (resultData.length > 0) {
                    var option = {
                        expandable: true,
                        column: 0,
                        indent: 20,
                    };
                    $('#treeTable3').remove();
                    var $treeTable3 = "<table class='treetable power' id='treeTable3'></table>"
                    $("#editForm").append($treeTable3);
                    var content = getContent(resultData);
                    $("#treeTable3").append(content);
                    common.commonCheckbox('.power');
                    $('#treeTable3').treetable(option);
                    $('#treeTable3').treetable("expandAll")
                    $shade.fadeIn();
                    $('.edit-popup').fadeIn();
                } else {
                    $("#treeTable3").empty();
                    $("#treeTable3").append("<strong align = 'center' style='color: red;'>请选择角色模板！</strong>");
                    $shade.fadeIn();
                    $('.edit-popup').fadeIn();
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //请求错误的处理
            //请求错误的处理
            //请求错误的处理
        }
    })
};

// 单个删除
function singleDelete(obj) {
    roleId = obj;
    $.ajax({
        url: "deleteTest",
        method: "post",
        dataType: "json",
        success: function (data) {
            if (null != data && null != data[0] && data[0].invalidate) {
                window.parent.location.href = data[0].loginPage;
            }

            if (null != data && null != data[0] && data[0].noOpt) {
                new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
            } else {
                $shade.fadeIn();
                $('.delete-wrapper').fadeIn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //请求错误的处理
            //请求错误的处理
            //请求错误的处理
        }
    })
};

// 查看权限详情
function openDetail(obj) {
    $.ajax({
        type: "post",
        url: "getACLDetail",
        data: "roleId=" + obj,
        dataType: "json",
        success: function (data) {
            if (null != data && null != data[0] && data[0].invalidate) {
                window.parent.location.href = data[0].loginPage;
            }
            var isInner = data.isInner;
            var type = "外部";
            if (isInner) {
                type = "内部";
            }
            $(".detail-popup").find(".content-item:eq(0)").find("span").text(data.name);
            $(".detail-popup").find(".content-item:eq(1)").find("span").text(type);
            var resultData = data.acls;
            if (resultData.length > 0) {
                var option = {
                    expandable: true,
                    column: 0,
                    indent: 20,
                };
                $('#treeTable2').remove();
                var $treeTable2 = "<table class='treetable power' id='treeTable2'></table>"
                $(".detail-popup").find(".content").append($treeTable2);
                //*****************************************************************
                var content = getDetailContent(resultData);
                $("#treeTable2").append(content);
                common.commonCheckbox('.power');
                $('#treeTable2').treetable(option);
                $('#treeTable2').treetable("expandAll")
                $shade.fadeIn();
                $('.detail-popup').fadeIn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //请求错误的处理
            //请求错误的处理
            //请求错误的处理
        }
    })
}

// 修改角色权限（弹出框）
function editRole(obj) {
    $("#editRoleForm").find(".content-item:eq(0)").find("input[type='hidden'][name='roleId']").val(obj);
    $.ajax({
        url: "updateTest",
        method: "post",
        dataType: "json",
        success: function (data) {
            if (null != data && null != data[0] && data[0].invalidate) {
                window.parent.location.href = data[0].loginPage;
            }

            if (null != data && null != data[0] && data[0].noOpt) {
                new CustomPrompt({
                    type: 'error',
                    msg: '您无权操作！'
                });
            } else {
                $shade.fadeIn();
                $('.edit-role-name-popup').fadeIn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //请求错误的处理
            //请求错误的处理
            //请求错误的处理
        }
    })
}

// 新建生成模板角色select
function createModelSelect() {
    var content = '<div class="content-item model-role">';
    content += '<label>模板角色*</label> ';
    content += '<select name="" id="" class="easyui-validatebox new-role" data-options="validType:\'selectValueRequired\'">'
    content += '<option value="0">请选择模板</option>';
    content += '<option value="1">普通管理员</option>';
    content += '<option value="2">外部人员</option>';
    content += '</select></div>';
    return content;
}

// 生成按钮
// 1 添加关键参数按钮
// 2 名称重复提示
function createBtn(num) {
    switch (num) {
        case 2:
            var btn = '<div class="repate-name">';
            btn += '<i></i>';
            btn += '<span>名称已存在</span>';
            btn += '</div>';
            break;
    }
    return btn;
}

//点击搜索框
function search(pageIndex, pageSize) {
    var keyword = $("#keyword").val();
    var url = 'getByPage';
    if ($.trim(keyword).length > 0) {
        url = 'getByParas';
    }
    //	$('#dg').treegrid({
    //        url: url,
    //        queryParams:{"keyword":keyword}
    //    });

    $.ajax({
        type: "post",
        url: url,
        data: "likename=" + keyword,
        success: function (data) {
            if (null != data && null != data[0] && data[0].invalidate) {
                window.parent.location.href = data[0].loginPage;
            }
            $('#dg').datagrid("loadData", JSON.parse(data));
            $('#dg').datagrid('getPager').pagination({
                pageNumber: pageIndex
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {}
    })
}

//展示模块的下拉树：根据模板新建角色+修改角色的权限
function getContent(jsonObj) {
    var resultData = jsonObj;
    var content = "<thead><tr><th><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' class='check-row checkedAll'></a></th><th>菜单名称:</th><th>查看</th><th>增加</th><th>删除</th><th>修改</th><th>上传</th><th>下载</th></tr></thead><tbody class='tbody-checkBox'>";
    for (var i = 0; i < resultData.length; i++) {
        var aclModelFirst = resultData[i];
        var isPage = aclModelFirst.isPage;
        content += "<tr data-tt-id='" + (i + 1) + "'>";
        //aclss.push((i+1));
        if (isPage) {
        	content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' class='check-row'></a></td>";
        	content += "<td>" + aclModelFirst.text + "</td>";
        	content += "<input name='isPage' type='hidden' value=" + aclModelFirst.isPage + " />"
            var noOpt = aclModelFirst.noOpt;
            content += "<input name='resourceId' type='hidden' value=" + aclModelFirst.id + " />"
            var opt = aclModelFirst.opt;
            if ((noOpt & 1) == 0) {
                if ((opt & 1) != 0) {
                    content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='scan' id='' value='1'class='check-row' checked></a></td>";
                } else {
                    content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row'></a></td>";
                }
            } else {
                content += "<td><a class='checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' disabled></a></td>";
            }

            if ((noOpt & 2) == 0) {
                if ((opt & 2) != 0) {
                    content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='2' class='check-row' checked></a></td>";
                } else {
                    content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='2' class='check-row'></a></td>";
                }
            } else {
                content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='2' class='check-row' disabled></a></td>";
            }

            if ((noOpt & 4) == 0) {
                if ((opt & 4) != 0) {
                    content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='4' class='check-row' checked></a></td>";
                } else {
                    content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='4' class='check-row'></a></td>";
                }
            } else {
                content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='4' class='check-row' disabled></a></td>";
            }

            if ((noOpt & 8) == 0) {
                if ((opt & 8) != 0) {
                    content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='8' class='check-row' checked></a></td>";
                } else {
                    content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='8' class='check-row'></a></td>";
                }
            } else {
                content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='8' class='check-row' disabled></a></td>";
            }

            if ((noOpt & 16) == 0) {
                if ((opt & 16) != 0) {
                    content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='16' class='check-row' checked></a></td>";
                } else {
                    content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='16' class='check-row'></a></td>";
                }
            } else {
                content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='16' class='check-row' disabled></a></td>";
            }
            if ((noOpt & 32) == 0) {
                if ((opt & 32) != 0) {
                    content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='32' class='check-row' checked></a></td>";
                } else {
                    content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='32' class='check-row'></a></td>";
                }
            } else {
                content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='32' class='check-row' disabled></a></td>";
            }
            content += "</tr>"
        } else {
            content += "<td></td>";
        	content += "<td>" + aclModelFirst.text + "</td>";
        	content += "<input name='isPage' type='hidden' value=" + aclModelFirst.isPage + " />"
            content += "<td></td>";
            content += "<td></td>";
            content += "<td></td>";
            content += "<td></td>";
            content += "<td></td>";
            var secondChildren = aclModelFirst.children;
            for (var j = 0; j < secondChildren.length; j++) {
                var secondChild = secondChildren[j];
                var secondIsPage = secondChild.isPage;
                content += "<tr data-tt-id='" + (i + 1) + "-" + (j + 1) + "' data-tt-parent-id='" + (i + 1) + "'>";
                //aclss.push((i+1)+"-"+(j+1));
                if (secondIsPage) {
                	content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' class='check-row'></a></td>";
                	content += "<td>" + secondChild.text + "</td>";
                	content += "<input name='isPage' type='hidden' value=" + secondChild.isPage + " />"
                    var secondOpt = secondChild.opt;
                    var secondNoOpt = secondChild.noOpt;
                    content += "<input name='resourceId' type='hidden' value='" + secondChild.id + "' />"

                    if ((secondNoOpt & 1) == 0) {
                        if ((secondOpt & 1) != 0) {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' checked></a></td>";
                        } else {
                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row'></a></td>";
                        }
                    } else {
                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' disabled></a></td>";
                    }

                    if ((secondNoOpt & 2) == 0) {
                        if ((secondOpt & 2) != 0) {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='2' class='check-row' checked></a></td>";
                        } else {
                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='2' class='check-row'></a></td>";
                        }
                    } else {
                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='2' class='check-row' disabled></a></td>";
                    }


                    if ((secondNoOpt & 4) == 0) {
                        if ((secondOpt & 4) != 0) {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='4' class='check-row' checked></a></td>";
                        } else {
                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='4' class='check-row'></a></td>";
                        }
                    } else {
                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='4' class='check-row' disabled></a></td>";
                    }


                    if ((secondNoOpt & 8) == 0) {
                        if ((secondOpt & 8) != 0) {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='8' class='check-row' checked></a></td>";
                        } else {
                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='8' class='check-row'></a></td>";
                        }
                    } else {
                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='8' class='check-row' disabled></a></td>";
                    }


                    if ((secondNoOpt & 16) == 0) {
                        if ((secondOpt & 16) != 0) {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='16' class='check-row' checked></a></td>";
                        } else {
                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='16' class='check-row'></a></td>";
                        }
                    } else {
                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='16' class='check-row' disabled></a></td>";
                    }

                    if ((secondNoOpt & 32) == 0) {
                        if ((secondOpt & 32) != 0) {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='32' class='check-row' checked></a></td>";
                        } else {
                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='32' class='check-row'></a></td>";
                        }
                    } else {
                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='32' class='check-row' disabled></a></td>";
                    }
                    content += "</tr>"
                } else {
                    content += "<td></td>";
                	content += "<td>" + secondChild.text + "</td>";
                	content += "<input name='isPage' type='hidden' value=" + secondChild.isPage + " />"
                    content += "<td></td>";
                    content += "<td></td>";
                    content += "<td></td>";
                    content += "<td></td>";
                    content += "<td></td>";
                    var thirdChildren = secondChild.children;

                    for (var k = 0; k < thirdChildren.length; k++) {
                        var thirdChild = thirdChildren[k];
                        var thirdOpt = thirdChild.opt;
                        var thirdNoOpt = thirdChild.noOpt;
                        content += "<tr data-tt-id='" + (i + 1) + "-" + (j + 1) + "-" + (k + 1) + "' data-tt-parent-id='" + (i + 1) + "-" + (j + 1) + "'>";
                        content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' class='check-row'></a></td>";
                        content += "<td>" + thirdChild.text + "</td>";
                        content += "<input name='isPage' type='hidden' value=" + thirdChild.isPage + " />"
                        content += "<input name='resourceId' type='hidden' value='" + thirdChild.id + "' />"

                        if ((thirdNoOpt & 1) == 0) {
                            if ((thirdOpt & 1) != 0) {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' checked></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row'></a></td>";
                            }
                        } else {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' disabled></a></td>";
                        }


                        if ((thirdNoOpt & 2) == 0) {
                            if ((thirdOpt & 2) != 0) {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='2' class='check-row' checked></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='2' class='check-row'></a></td>";
                            }
                        } else {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='2' class='check-row' disabled></a></td>";
                        }

                        if ((thirdNoOpt & 4) == 0) {
                            if ((thirdOpt & 4) != 0) {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='4' class='check-row' checked></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='4' class='check-row'></a></td>";
                            }
                        } else {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='4' class='check-row' disabled></a></td>";
                        }


                        if ((thirdNoOpt & 8) == 0) {
                            if ((thirdOpt & 8) != 0) {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='8' class='check-row' checked></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='8' class='check-row'></a></td>";
                            }
                        } else {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='8' class='check-row' disabled></a></td>";
                        }

                        if ((thirdNoOpt & 16) == 0) {
                            if ((thirdOpt & 16) != 0) {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='16' class='check-row' checked></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='16' class='check-row'></a></td>";
                            }
                        } else {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='16' class='check-row' disabled></a></td>";
                        }
                        

                        if ((thirdNoOpt & 32) == 0) {
                            if ((thirdOpt & 32) != 0) {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='32' class='check-row' checked></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='32' class='check-row'></a></td>";
                            }
                        } else {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='32' class='check-row' disabled></a></td>";
                        }
                        content += "</tr>"
                    }
                }
            }
        }
    }
    content += "</tbody>";
    return content;
}

//查看某个角色的权限详情，由于不能编辑，因此input框都为disabled，不同于编辑权限的复选框
function getDetailContent(jsonObj) {
    var resultData = jsonObj;
    var content = "<thead><tr><th>菜单名称:</th><th>查看</th><th>增加</th><th>删除</th><th>修改</th><th>上传</th><th>下载</th></tr></thead>";
    for (var i = 0; i < resultData.length; i++) {
        var aclModelFirst = resultData[i];
        var isPage = aclModelFirst.isPage;
        content += "<tr data-tt-id='" + (i + 1) + "'>";
        //aclss.push((i+1));
        content += "<input name='isPage' type='hidden' value=" + aclModelFirst.isPage + " />"
        content += "<td>" + aclModelFirst.text + "</td>";
        if (isPage) {
            var noOpt = aclModelFirst.noOpt;
            content += "<input name='resourceId' type='hidden' value=" + aclModelFirst.id + " />"
            var opt = aclModelFirst.opt;
            if ((noOpt & 1) == 0) {
                if ((opt & 1) != 0) {
                    content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' checked disabled></a></td>";
                } else {
                    content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' disabled></a></td>";
                }
            } else {
                content += "<td><a class='checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' disabled></a></td>";
            }

            if ((noOpt & 2) == 0) {
                if ((opt & 2) != 0) {
                    content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='2' class='check-row' checked disabled></a></td>";
                } else {
                    content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='2' class='check-row' disabled></a></td>";
                }
            } else {
                content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='2' class='check-row' disabled></a></td>";
            }

            if ((noOpt & 4) == 0) {
                if ((opt & 4) != 0) {
                    content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='4' class='check-row' checked disabled></a></td>";
                } else {
                    content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='4' class='check-row' disabled></a></td>";
                }
            } else {
                content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='4' class='check-row' disabled></a></td>";
            }

            if ((noOpt & 8) == 0) {
                if ((opt & 8) != 0) {
                    content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='8' class='check-row' checked disabled></a></td>";
                } else {
                    content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='8' class='check-row' disabled></a></td>";
                }
            } else {
                content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='8' class='check-row' disabled></a></td>";
            }

            if ((noOpt & 16) == 0) {
                if ((opt & 16) != 0) {
                    content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='16' class='check-row' checked disabled></a></td>";
                } else {
                    content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='16' class='check-row' disabled></a></td>";
                }
            } else {
                content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='16' class='check-row' disabled></a></td>";
            }
            if ((noOpt & 32) == 0) {
                if ((opt & 32) != 0) {
                    content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='32' class='check-row' checked disabled></a></td>";
                } else {
                    content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='32' class='check-row' disabled></a></td>";
                }
            } else {
                content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='32' class='check-row' disabled></a></td>";
            }
            content += "</tr>"
        } else {
            content += "<td></td>";
            content += "<td></td>";
            content += "<td></td>";
            content += "<td></td>";
            content += "<td></td>";
            content += "<td></td>";
            var secondChildren = aclModelFirst.children;
            for (var j = 0; j < secondChildren.length; j++) {
                var secondChild = secondChildren[j];
                var secondIsPage = secondChild.isPage;
                content += "<tr data-tt-id='" + (i + 1) + "-" + (j + 1) + "' data-tt-parent-id='" + (i + 1) + "'>";
                //aclss.push((i+1)+"-"+(j+1));
                content += "<td>" + secondChild.text + "</td>";
                content += "<input name='isPage' type='hidden' value=" + secondChild.isPage + " />"
                if (secondIsPage) {
                    var secondOpt = secondChild.opt;
                    var secondNoOpt = secondChild.noOpt;
                    content += "<input name='resourceId' type='hidden' value='" + secondChild.id + "' />"

                    if ((secondNoOpt & 1) == 0) {
                        if ((secondOpt & 1) != 0) {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' checked disabled></a></td>";
                        } else {
                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' disabled></a></td>";
                        }
                    } else {
                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' disabled></a></td>";
                    }

                    if ((secondNoOpt & 2) == 0) {
                        if ((secondOpt & 2) != 0) {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='2' class='check-row' checked disabled></a></td>";
                        } else {
                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='2' class='check-row' disabled></a></td>";
                        }
                    } else {
                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='2' class='check-row' disabled></a></td>";
                    }


                    if ((secondNoOpt & 4) == 0) {
                        if ((secondOpt & 4) != 0) {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='4' class='check-row' checked disabled></a></td>";
                        } else {
                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='4' class='check-row' disabled></a></td>";
                        }
                    } else {
                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='4' class='check-row' disabled></a></td>";
                    }


                    if ((secondNoOpt & 8) == 0) {
                        if ((secondOpt & 8) != 0) {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='8' class='check-row' checked disabled></a></td>";
                        } else {
                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='8' class='check-row' disabled></a></td>";
                        }
                    } else {
                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='8' class='check-row' disabled></a></td>";
                    }


                    if ((secondNoOpt & 16) == 0) {
                        if ((secondOpt & 16) != 0) {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='16' class='check-row' checked disabled></a></td>";
                        } else {
                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='16' class='check-row' disabled></a></td>";
                        }
                    } else {
                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='16' class='check-row' disabled></a></td>";
                    }

                    if ((secondNoOpt & 32) == 0) {
                        if ((secondOpt & 32) != 0) {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='32' class='check-row' checked disabled></a></td>";
                        } else {
                            content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='32' class='check-row' disabled></a></td>";
                        }
                    } else {
                        content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='32' class='check-row' disabled></a></td>";
                    }
                    content += "</tr>"
                } else {
                    content += "<td></td>";
                    content += "<td></td>";
                    content += "<td></td>";
                    content += "<td></td>";
                    content += "<td></td>";
                    content += "<td></td>";
                    var thirdChildren = secondChild.children;

                    for (var k = 0; k < thirdChildren.length; k++) {
                        var thirdChild = thirdChildren[k];
                        var thirdOpt = thirdChild.opt;
                        var thirdNoOpt = thirdChild.noOpt;
                        content += "<tr data-tt-id='" + (i + 1) + "-" + (j + 1) + "-" + (k + 1) + "' data-tt-parent-id='" + (i + 1) + "-" + (j + 1) + "'>";
                        content += "<td>" + thirdChild.text + "</td>";
                        content += "<input name='isPage' type='hidden' value=" + thirdChild.isPage + " />"
                        content += "<input name='resourceId' type='hidden' value='" + thirdChild.id + "' />"

                        if ((thirdNoOpt & 1) == 0) {
                            if ((thirdOpt & 1) != 0) {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' checked disabled></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='scan' id='' value='1' class='check-row' disabled></a></td>";
                            }
                        } else {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='1' class='check-row' disabled></a></td>";
                        }


                        if ((thirdNoOpt & 2) == 0) {
                            if ((thirdOpt & 2) != 0) {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='2' class='check-row' checked disabled></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='2' class='check-row' disabled></a></td>";
                            }
                        } else {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='2' class='check-row' disabled></a></td>";
                        }

                        if ((thirdNoOpt & 4) == 0) {
                            if ((thirdOpt & 4) != 0) {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='4' class='check-row' checked disabled></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='4' class='check-row' disabled></a></td>";
                            }
                        } else {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='4' class='check-row' disabled></a></td>";
                        }


                        if ((thirdNoOpt & 8) == 0) {
                            if ((thirdOpt & 8) != 0) {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='8' class='check-row' checked disabled></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='8' class='check-row' disabled></a></td>";
                            }
                        } else {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='8' class='check-row' disabled></a></td>";
                        }

                        if ((thirdNoOpt & 16) == 0) {
                            if ((thirdOpt & 16) != 0) {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='16' class='check-row' checked disabled></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='16' class='check-row' disabled></a></td>";
                            }
                        } else {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='16' class='check-row' disabled></a></td>";
                        }


                        if ((thirdNoOpt & 32) == 0) {
                            if ((thirdOpt & 32) != 0) {
                                content += "<td><a class='checkbox-wrapper checkbox-wrapper-checked'><i></i><input type='checkbox' name='' id='' value='32' class='check-row' checked disabled></a></td>";
                            } else {
                                content += "<td><a class='checkbox-wrapper'><i></i><input type='checkbox' name='' id='' value='32' class='check-row' disabled></a></td>";
                            }
                        } else {
                            content += "<td><a class='checkbox-wrapper checkbox-wrapper-not'><i></i><input type='checkbox' name='' id='' value='32' class='check-row' disabled></a></td>";
                        }
                        content += "</tr>"
                    }
                }
            }
        }
    }
    return content;
}

//根据角色id得到下面人员
function getPersons(obj) {
    roleId = obj;
    $shade.fadeIn();
    $(".persons-popup").fadeIn();
    $('#persons').datagrid({
        url: "getPersons",
        queryParams: {
            roleId: roleId
        },
        method: "post",
        fit: true,
        fitColumns: true,
        scrollbarSize: 6,
        columns: [
            [{
                    field: 'name',
                    title: '姓名',
                    width: 100,
                },
                {
                    field: 'organization',
                    title: '部门',
                    align: 'center',
                    width: 100
                },
                {
                    field: 'telephone',
                    title: '手机号',
                    align: 'center',
                    width: 100
                },
                {
                    field: 'workphone',
                    title: '办公室电话',
                    width: 100
                },
                {
                    field: 'personStatus',
                    title: '状态',
                    width: 100
                }
            ]
        ],
        onLoadSuccess: function (row, data) {
            if (null != data && null != data[0] && data[0].invalidate) {
                window.parent.location.href = data[0].loginPage;
            }
        }
    });
}