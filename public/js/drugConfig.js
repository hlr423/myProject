// ======================================全局变量======================================
var $shade = $('.shade'); // 遮罩
var $newPopup = $('.new-popup'); // 新建弹窗框
var newBtn = document.getElementsByClassName('new-btn')[0]; // 新建按钮
var newNextBtn = document.getElementsByClassName('new-next')[0]; // 新建-下一步按钮
var newPrevBtn = document.getElementsByClassName('new-prev')[0]; // 新建 上一步按钮
var newSubmit = document.getElementsByClassName('new-submit')[0]; // 新建提交按钮
var $newSelect = $newPopup.find('select'); // 新建框的select
var editSubmit = document.querySelector('.edit-submit'); // 编辑提交按钮
var $editPopup = $('.edit-popup'); // 编辑弹窗框
var editNextBtn = document.getElementsByClassName('edit-next')[0]; // 编辑-下一步按钮
var editPrevBtn = document.getElementsByClassName('edit-prev')[0]; // 编辑 上一步按钮
var editSubmit = document.getElementsByClassName('edit-submit')[0]; // 编辑提交按钮
var step = document.getElementsByClassName('step'); // 新建和编辑框分别有两个step
var stepNum = document.getElementsByClassName('step-num'); // 新建和编辑框顶部的123
var $step = $('.step');
var $line = $('.line'); // 新建和编辑框顶部的线
var deleteId;
$(function () {
    // ======================================下拉树======================================
    $('#client').combotree({
        url: '../data/tree_data1.json',
        method: 'get',
        width: 250,
        height: 30,
        hasDownArrow: false
    });
    // ======================================关键参数======================================
    $('#paramTable').datagrid({
        rownumbers: true,
        singleSelect: true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'name',
                    title: '属性名',
                    width: 117,
                    align: 'center'
                },
                {
                    field: 'value',
                    title: '属性值',
                    width: 117,
                    align: 'center'
                },
                {
                    field: 'unit',
                    title: '单位',
                    width: 117,
                    align: 'center'
                }
            ]
        ]
    })
    // ======================================供应商详情====================================== 
    $('#supTable').datagrid({
        fit: true,
        fitColumns: true,
        queryParams: {
            name: $("#searchName").val(),
            supplierId: $("#supplier").val()
        },
        singleSelect: true,
        scrollbarSize: 6,
        columns: [
            [
                {
                    field: 'name',
                    title: '供应商名称',
                    width: 50,
                },
                {
                    field: 'presaleName',
                    title: '售前联系人',
                    width: 50,
                },
                {
                    field: 'presalePhone',
                    title: '售前电话',
                    width: 50,
                },
                {
                    field: 'presaleMail',
                    title: '售前邮箱',
                    width: 50,
                },
                {
                    field: 'aftersaleName',
                    title: '售后联系人',
                    width: 50,
                },
                {
                    field: 'aftersalePhone',
                    title: '售后电话',
                    width: 50,
                },
                {
                    field: 'aftersaleMail',
                    title: '售后邮箱',
                    width: 50,
                },
            ]
        ]
    })
    // ======================================表格======================================
    $('#dg').datagrid({
        url: 'getListByPage',
        method: 'GET',
        fit: true,
        fitColumns: true,
        rownumbers: true,
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
                    field: 'name',
                    title: '药剂模板名称',
                    width: 60,
                },
                {
                    field: 'brand',
                    title: '品牌',
                    width: 60,
                },
                {
                    field: 'spec',
                    title: '规格型号',
                    width: 60,
                },
                {
                    field: 'unit',
                    title: '单位',
                    width: 60,
                },
                {
                    field: 'price',
                    title: '价格(元)',
                    width: 60,
                },
                {
                    field: 'picUrl',
                    title: '照片',
                    width: 60,
                    align: 'center',
                    formatter: function(value,row,index){
                        return "<a class='td-picture'><i></i>照片" +
                    		"<div><img src='"+basePath()+value+"' alt=''></div></a>";
                    }
                },
                {
                    field: 'warranty',
                    title: '保质期(月)',
                    width: 60,
                },
                {
                    field: 'supplier',
                    title: '供应商',
                    width: 60,
                    formatter: function (value, row, index) {
                        return '<a class="supplier" onclick=opensupPopup(' + row.id + ')>' + row.supplier + '</a>'
                    }
                },
                {
                    field: 'supplyCycle',
                    title: '供货周期(天)',
                    width: 60,
                },
                {
                    field: 'param',
                    title: '关键参数',
                    width: 60,
                    formatter: function (value, row, index) {
                        return '<a class="detail" onclick=openParamPopup(' + row.id + ')>详情</a>'
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    width: 100,
                    formatter: function (value, row, index) {
                        var content = '';
                        content += '<div class="table-operation">';
                        content += '<a class="table-edit" onclick=edit(' + row.id + ')><i></i>编辑</a>';
                        content += '<a class="table-delete" onclick=singleDelete(' + row.id + ')><i></i>删除</a>';
                        content += '</div>';
                        return content;
                    }
                }
            ]
        ]
    });

    // 滚动时判断是否有提示框
    $('.new-popup .content, .edit-popup .content').on('scroll', function () {
        var tooltip = document.querySelector('.tooltip.tooltip-right');
        if (tooltip !== null) {
            $(this).find('input').trigger('blur');
        };
    });




    // ======================================新建框======================================
    // 新建初始化上传图片
    var pictureFile = document.querySelector('.drug-picture input[type=file]');
    pictureFile.addEventListener('change',function () {
        validate.checkImg($(this));
    });

    // 打开弹窗，清空数据
    newBtn.addEventListener('click', function () {
        var $inputFile = $('.new-popup input[type=file]');
        $inputFile.val(''); // 清空新建inputFile
        $inputFile.next().next('span').html('支持.jpg/.png/.JPEG').css('color','#ccc').removeAttr('state');
        $shade.fadeIn();
        $newPopup.fadeIn();
        $newPopup.find('input[type=text]').val('');
        $newSelect.get(0).children[0].selected = true;
        step[0].style.display = 'block';
        step[1].style.display = 'none';
        newNextBtn.style.display = "inline-block";
        newPrevBtn.style.display = "none";
        newSubmit.style.display = "none";
        stepNum[0].removeChild(stepNum[0].firstChild);
        stepNum[0].innerHTML = '1';
        $(stepNum[1]).parent().addClass('gray');
        $('.line').eq(0).removeClass('green').addClass('gray');
    });


    // 新建-下一步
    newNextBtn.addEventListener('click', function () {
        var _this = this;
        var inputFileValue = $(this).parents('.popup').find('input[type=file]').val();
        var $inputFileSpan = $(this).parents('.popup').find('input[type=file]').next().next('span');
        // 重复判断
        var isRepate = getExist(null, $("#new-name").val(), $("#new-brand").val(), $("#new-spec").val(), $("#new-supplier").val());
        var result = $('#newForm1').form('enableValidation').form('validate') && !isRepate;
        if(inputFileValue == ''){ // 必选图片
            $inputFileSpan.html('请选择文件！！').css('color', '#ff642e').attr('state', 'errFile');
        }else{
            $inputFileSpan.css('color', '#dcdcdc').removeAttr('state');
        }
        if (result && ($inputFileSpan.attr('state') != 'errFile')) {
            _this.style.display = "none";
            newSubmit.style.display = "inline-block";
            step[1].style.display = "block";
            step[0].style.display = "none";
            newPrevBtn.style.display = "inline-block";
            var i = '<i class="sus"></i>';
            stepNum[0].innerHTML = '';
            $(stepNum[0]).append(i);
            $(stepNum[1]).parent().removeClass('gray');
            $line.eq(0).removeClass('gray').addClass('green');
        } else {
            return false;
        }
    });

    // 新建-上一步 
    newPrevBtn.addEventListener('click', function () {
        this.style.display = "none";
        newSubmit.style.display = "none";
        step[1].style.display = "none";
        step[0].style.display = "block";
        newNextBtn.style.display = "inline-block";
        stepNum[0].removeChild(stepNum[0].firstChild);
        stepNum[0].innerHTML = '1';
        $(stepNum[1]).parent().addClass('gray');
        $('.line').eq(0).removeClass('green').addClass('gray');
    });

    // 新建-添加关键参数
    $step.on('click', '.new-add', function () {
        var $itemGroup = $('.new-popup .item-group');
        var i = $itemGroup.length + 1;

        $(this).parent().remove();

        var newItemGroup = '<div class="item-group new-params">';
        newItemGroup += '<div class="title-num"><p>关键参数' + i + '</p><i class="remove-item-group"></i></div>'; // 序号
        newItemGroup += '<div class="content-item"><label>属性名*</label><input type="text" class="easyui-validatebox new-param-name" data-options="required:true" maxlength="50" placeholder="请输入属性名"></div>'; // 属性名
        newItemGroup += '<div class="content-item"><label>属性值*</label><input type="text" class="easyui-validatebox new-param-value" data-options="required:true,validType:\'positiveTwo\'" maxlength="7" placeholder="请输入属性值"></div>'; // 属性值
        newItemGroup += '<div class="content-item"><label>单位*</label><input type="text" class="easyui-validatebox new-param-unit" data-options="required:true" maxlength="10" placeholder="请输入单位"></div>'; // 单位
        newItemGroup += createBtn(1);

        $itemGroup.last().after(newItemGroup);
        // 再次解析表单规则
        $.parser.parse('#newForm2');

        // 滚动条向下移动
        console.log($newPopup.find('.content').scrollTop())
        var scrollHeight = $newPopup.find('.content').prop('scrollHeight');
        $newPopup.find('.content').scrollTop(scrollHeight);
    });

    // 删掉当前的组
    $step.on('click', '.remove-item-group', function () {
        var $this = $(this);
        console.log($this.parents('.popup'))

        var currForm = $this.parents('form');

        // 移除当前按钮
        $this.parents('.item-group').remove();

        // 添加关键参数的按钮数目
        var length = 0;
        // 判断是否是新建框
        var isNewPopup = $this.parents('.item-group').hasClass('new-params');

        if (isNewPopup) {
            length = currForm.find('.new-add').length;
        } else {
            length = currForm.find('.edit-add').length;
        }

        // 如果长度0的话，给最后一个item-group添加一个按钮
        if (length == 0) {
            if (isNewPopup) {
                currForm.find('.item-group').last().append(createBtn(1));
            } else {
                currForm.find('.item-group').last().append(createBtn(3));
            }
        }

        // 更改序号
        currForm.find('.title-num p').each(function (index) {
            var num = index + 1;
            this.innerHTML = '关键参数' + num;
        })
    })

    // 新建提交按钮
    newSubmit.addEventListener('click', function () {
        var va = $('#newForm2').form('enableValidation').form('validate');
        if (!va) {
            return va;
        }
        var array = new Array();
        var $nodeList = $('.new-params');
        for (var i = 0; i < $nodeList.length; i++) {
            var obj = new Object();
            obj.name = $nodeList.eq(i).find('.new-param-name').val();
            obj.param = $nodeList.eq(i).find('.new-param-value').val();
            obj.unit = $nodeList.eq(i).find('.new-param-unit').val();
            array.push(obj);
        }
        var da = new FormData();
    	da.append("name", $("#new-name").val());
    	da.append("brand", $("#new-brand").val());
    	da.append("spec", $("#new-spec").val());
    	da.append("unit", $("#new-unit").val());
    	da.append("price", $("#new-price").val());
    	da.append("warranty", $("#new-warranty").val());
    	da.append("supplyCycle", $("#new-supplyCycle").val());
    	da.append("supplier", $("#new-supplier").val());
    	da.append("medicineParams", JSON.stringify(array));
    	da.append("pic", $('#add-pic')[0].files[0]);
        $.ajax({
            url: "addMedicineTemp",
            type: "POST",
            cache: false,
	     	processData: false,
	     	contentType: false,
            dataType: "JSON",
            data: da,
            success: function (data) {
                if (data == 0) {
                    new CustomPrompt({
                        type: 'default',
                        msg: '相同模板名称、品牌、规格、供货商已存在！'
                    });
                } else {
                    new CustomPrompt({
                        type: 'success',
                        msg: '提交成功！'
                    });
                    $shade.fadeOut();
                    $newPopup.fadeOut();
                    $("#supplier").val(0);
                    $("#searchName").val("")
                }
                $('#dg').datagrid("load", { name: $("#searchName").val(), supplierId: $("#supplier").val() })
            }
        })
    });

    // ======================================编辑框======================================
    var editInputFile = document.querySelector('.edit-picture input[type=file]')
    // 初始化编辑上传图片
    editInputFile.addEventListener('change',function(){
        validate.checkImg($(this));
    });
    // 编辑-下一步
    editNextBtn.addEventListener('click', function () {
        var _this = this;
        //---- 重复验证
        var isRepate = getExist($("#edit-id").val(), $("#edit-name").val(), $("#edit-brand").val(), $("#edit-spec").val(), $("#edit-supplier").val());
        var $inputFileSpan = $(this).parents('.popup').find('input[type=file]').next().next('span');
        var result = $('#editForm1').form('enableValidation').form('validate') && !isRepate;
        if (result && ($inputFileSpan.attr('state') != 'errFile')) {
            _this.style.display = "none";
            editSubmit.style.display = "inline-block";
            step[3].style.display = "block";
            step[2].style.display = "none";
            editPrevBtn.style.display = "inline-block";
            var i = '<i class="sus"></i>';
            stepNum[3].innerHTML = '2';
            stepNum[2].innerHTML = '';
            $(stepNum[2]).append(i);
            $(stepNum[3]).parent().removeClass('gray');
            $line.eq(1).removeClass('gray').addClass('green');
        } else {
            return false;
        }
    });

    // 编辑-上一步 
    editPrevBtn.addEventListener('click', function () {
        this.style.display = "none";
        editSubmit.style.display = "none";
        step[3].style.display = "none";
        step[2].style.display = "block";
        editNextBtn.style.display = "inline-block";
        stepNum[3].removeChild(stepNum[3].firstChild);
        stepNum[2].innerHTML = '1';
        stepNum[3].innerHTML = '2';
        $(stepNum[3]).parent().addClass('gray');
        $line.eq(1).addClass('gray');
    });

    // 编辑-添加关键参数
    $step.on('click', '.edit-add', function () {
        var $itemGroup = $('.edit-popup .item-group');
        var i = $itemGroup.length + 1;

        $(this).parent().remove();

        var newItemGroup = '<div class="item-group edit-params">';
        newItemGroup += '<div class="title-num"><p>关键参数' + i + '</p><i class="remove-item-group"></i></div>'; // 序号
        newItemGroup += '<input type="hidden" class="edit-param-id" value="0">';
        newItemGroup += '<div class="content-item"><label>属性名*</label><input type="text" class="easyui-validatebox edit-param-name" data-options="required:true" maxlength="50" placeholder="请输入属性名"></div>'; // 属性名
        newItemGroup += '<div class="content-item"><label>属性值*</label><input type="text" class="easyui-validatebox edit-param-value" data-options="required:true,validType:\'positiveTwo\'" maxlength="7" placeholder="请输入属性值"></div>'; // 属性值
        newItemGroup += '<div class="content-item"><label>单位*</label><input type="text" class="easyui-validatebox edit-param-unit" data-options="required:true" maxlength="10" placeholder="请输入单位"></div>'; // 单位
        newItemGroup += createBtn(3);

        $itemGroup.last().after(newItemGroup);
        // 再次解析表单规则
        $.parser.parse('#editForm2');

        // 滚动条向下移动
        var scrollHeight = $editPopup.find('.content').prop('scrollHeight');
        $editPopup.find('.content').scrollTop(scrollHeight);
    });

    // 编辑 - 提交按钮
    editSubmit.addEventListener('click', function () {
        var va = $('#editForm2').form('enableValidation').form('validate');
        if (!va) {
            return va;
        }

        var array = new Array();
        var $nodeList = $('.edit-params');
        for (var i = 0; i < $nodeList.length; i++) {
            var obj = new Object();
            id = $nodeList.eq(i).find('.edit-param-id').val();
            if (id != 0) {
                obj.id = id;
            }
            obj.name = $nodeList.eq(i).find('.edit-param-name').val();
            obj.param = $nodeList.eq(i).find('.edit-param-value').val();
            obj.unit = $nodeList.eq(i).find('.edit-param-unit').val();
            array.push(obj);
        }
        var da = new FormData();
		da.append("id", $("#edit-id").val());
		da.append("name", $("#edit-name").val());
		da.append("brand", $("#edit-brand").val());
		da.append("spec", $("#edit-spec").val());
		da.append("unit", $("#edit-unit").val());
		da.append("price", $("#edit-price").val());
		da.append("warranty", $("#edit-warranty").val());
		da.append("supplyCycle", $("#edit-supplyCycle").val());
		da.append("supplier", $("#edit-supplier").val() );
		da.append("medicineParams", JSON.stringify(array));
		da.append("pic", $('#edit-pic')[0].files[0]);
        $.ajax({
            url: "updateMedicineTemp",
            type: "POST",
            cache: false,
	     	processData: false,
	     	contentType: false,
            dataType: "JSON",
            data: da,
            success: function (data) {
                if (data == 0) {
                    new CustomPrompt({
                        type: 'default',
                        msg: '相同模板名称、品牌、规格、供货商已存在！'
                    });
                } else {
                    new CustomPrompt({
                        type: 'success',
                        msg: '提交成功！'
                    });
                    $shade.fadeOut();
                    $editPopup.fadeOut();
                    $("#supplier").val(0);
                    $("#searchName").val("")
                }
                $('#dg').datagrid("load", { name: $("#searchName").val(), supplierId: $("#supplier").val() })
            }
        })
    });

    // ======================================关闭弹窗按钮======================================
    var $closeBtn = $('.close-icon'); // 关闭弹窗按钮
    $closeBtn.on('click', function () {
        $shade.fadeOut();
        $(this).parents('.popup').fadeOut();
    })

    // ======================================取消按钮======================================
    $('.infor-cancel').on('click', function () {
        $shade.fadeOut();
        $(this).parents('.infor-wrapper').fadeOut();
    });

    // ======================================确认删除按钮======================================
    var deleteConfirm = document.querySelector('.delete-confirm');
    deleteConfirm.addEventListener('click', function () {
        $shade.fadeOut();
        $('.delete-wrapper').fadeOut();
        $.post("deleteById", { "id": deleteId }, function (data) {
            if (data == 1) {
                new CustomPrompt({
                    type: 'success',
                    msg: '删除成功'
                });
            } else {
                new CustomPrompt({
                    type: 'default',
                    msg: '删除失败'
                });
            }
            $('#dg').datagrid("reload");
        })
        /* if (true) {
             new CustomPrompt({
                 type: 'success',
                 msg: '删除成功'
             });
         } else {
             new CustomPrompt({
                 type: 'error',
                 msg: '您暂无权限'
             });
         }*/
    });

    // ======================================搜索按钮======================================
    $(".search-btn").click(function () {
        $('#dg').datagrid("load", { name: $("#searchName").val(), supplierId: $("#supplier").val() })
    })
});

// ======================================其他方法======================================
// 其它类型验证方法
var validate = {
    checkImg: function (node) {
        var thisNode = $(node)[0];
        var $inputText = $(node).next().next('span');
        var imgArr = new Array();
        var length = thisNode.files.length;
        if (length != 0) { //选择了文件
            for (var i = 0; i < length; i++) {
                var imgName = thisNode.files[i].name;
                console.log(imgName.indexOf("png"));
                if (imgName.indexOf('jpg') != -1 || imgName.indexOf("png") != -1 || imgName.indexOf("JPEG") != -1) {
                    imgArr.push(imgName);
                } else { // 选择错误的文件
                    $inputText.html('文件选择错误！！').css('color', '#ff642e').attr('state', 'errFile');
                }
            }
            if (length == imgArr.length) {
                $inputText.html(imgArr.toString()).css('color', '#dcdcdc').removeAttr('state');
            }
        } else {
            $inputText.html('支持.jpg/.png/.JPEG').css('color', '#dcdcdc').removeAttr('state');
        }
    }
};

// 打开编辑
function edit(id) {
    var $inputFile = $('.edit-popup input[type=file]');
    $inputFile.val(''); // 清空新建inputFile
    $inputFile.next().next('span').html('支持.jpg/.png/.JPEG').css('color','#ccc').removeAttr('state');
    step[2].style.display = 'block';
    step[3].style.display = 'none';
    editNextBtn.style.display = "inline-block";
    editPrevBtn.style.display = "none";
    editSubmit.style.display = "none";
    stepNum[3].removeChild(stepNum[3].firstChild);
    stepNum[3].innerHTML = '2';
    $(stepNum[4]).parent().addClass('gray');
    $('.line').eq(2).removeClass('green').addClass('gray');
    //数据加载
    $.post("updateGetById", { "id": id }, function (data) {
        if (data.state == 200) {
            $("#edit-id").val(data.id);
            $("#edit-name").val(data.name);
            $("#edit-brand").val(data.brand);
            $("#edit-spec").val(data.spec);
            $("#edit-unit").val(data.unit);
            $("#edit-price").val(data.price);
            $("#edit-warranty").val(data.warranty);
            $("#edit-supplier").val(data.supplierId);
            $("#edit-supplyCycle").val(data.supplyCycle);
            $("#edit-show-pic").attr("src",basePath()+data.picUrl);
            var le = data.params.length;
            var newItemGroup = "";
            $(data.params).each(function (i, param) {

                newItemGroup += '<div class="item-group edit-params">';
                newItemGroup += '<div class="title-num"><p>关键参数' + (i + 1) + '</p>';
                if (i != 0) {
                    newItemGroup += '<i class="remove-item-group"></i>';
                }
                newItemGroup += '</div>'; // 序号
                newItemGroup += '<input type="hidden" class="edit-param-id" value="' + param.id + '">';
                newItemGroup += '<div class="content-item"><label>属性名*</label><input type="text" class="easyui-validatebox edit-param-name" data-options="required:true" maxlength="50" placeholder="请输入属性名" value="' + param.name + '"></div>'; // 属性名
                newItemGroup += '<div class="content-item"><label>属性值*</label><input type="text" class="easyui-validatebox edit-param-value" data-options="required:true,validType:\'positiveTwo\'" maxlength="7" placeholder="请输入属性值" value="' + param.value + '"></div>'; // 属性值
                newItemGroup += '<div class="content-item"><label>单位*</label><input type="text" class="easyui-validatebox edit-param-unit" data-options="required:true" maxlength="10" placeholder="请输入单位" value="' + param.unit + '"></div>'; // 单位
                if (le == (i + 1)) {
                    newItemGroup += createBtn(3);
                }
                newItemGroup += '</div>';
            })
            $("#editForm2").html(newItemGroup)
            // 再次解析表单规则
            $.parser.parse('#editForm2');

            // 滚动条向下移动
            var scrollHeight = $('.edit-popup').find('.content').prop('scrollHeight');
            $('.edit-popup').find('.content').scrollTop(scrollHeight);

            $shade.fadeIn();
            $('.edit-popup').fadeIn();
        } else {
            new CustomPrompt({
                type: 'error',
                msg: '数据异常'
            });
        }
    }, "JSON")
};

// 关键参数框
function openParamPopup(id) {
    $shade.fadeIn();
    $('.param-popup').fadeIn();
    // 关键参数
    $('#paramTable').datagrid({ url: 'getParams', queryParams: { "id": id } });
}

// 供应详情
function opensupPopup(id) {
    $shade.fadeIn();
    $('.sup-popup').fadeIn();
    $('#supTable').datagrid({ url: 'getSupplier', queryParams: { "id": id } });
}

// 单个删除
function singleDelete(id) {
    deleteId = id;
    $shade.fadeIn();
    $('.delete-wrapper').fadeIn();
};

// 判断是否与数据库的数据重复
function getExist(id, name, brand, spec, supplierId) {
    var bo = false;
    $.ajax({
        async: false,
        url: "getExist",
        data: { "id": id, "name": name, "brand": brand, "spec": spec, "supplierId": supplierId },
        success: function (boo) {
            var flag = boo === "false" ? false : true;
            if (flag) {
                new CustomPrompt({
                    type: 'default',
                    msg: '相同模板名称、品牌、规格、供货商已存在！'
                });
            }
            bo = flag;
        }
    })
    return bo;
}

// 生成按钮
// 1 添加关键参数按钮
// 2 名称重复提示
function createBtn(num) {
    switch (num) {
        case 1:
            var btn = '<div class="content-item">';
            btn += '<div class="new-add">';
            btn += '<i></i><span>添加关键参数</span>';
            btn += '</div></div>';
            break;
        case 2:
            var btn = '<div class="repate-name">';
            btn += '<i></i>';
            btn += '<span>名称已存在</span>';
            btn += '</div>';
            break;
        case 3:
            var btn = '<div class="content-item">';
            btn += '<div class="edit-add">';
            btn += '<i></i><span>添加关键参数</span>';
            btn += '</div></div>';
            break;
    }

    return btn;
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
var basePath=localhostPath+projectName;
return projectName;
}