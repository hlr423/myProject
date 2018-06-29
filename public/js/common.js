$.extend($.fn.validatebox.defaults.rules, {
    idcard: {// 验证身份证
        validator: function (value) {
            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
        },
        message: '身份证号码格式不正确'
    },
    minLength: {
        validator: function (value, param) {
            return value.length >= param[0];
        },
        message: '请输入至少（2）个字符.'
    },
    length: {
        validator: function (value, param) {
            var len = $.trim(value).length;
            return len >= param[0] && len <= param[1];
        },
        message: "输入内容长度必须介于{0}和{1}之间."
    },
    phone: {// 验证座机号码
        validator: function (value) {
            return /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '格式不正确,请使用下面格式:020-88888888'
    },
    mobile: {// 验证手机号码
        validator: function (value) {
            // return /^(13|15|18)\d{9}$/i.test(value);
            return /^0?(13|14|15|18|17)[0-9]{9}$/i.test(value);
        },
        message: '手机号码格式不正确'
    },
    intOrFloat: {// 验证整数或小数（小数点两位）
        validator: function (value) {
            return /^\d+(\.\d{0,2})?$/i.test(value);
        },
        message: '请输入整数或小数(保留两位)'
    },
    currency: {// 验证货币
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '货币格式不正确'
    },
    integer: {// 验证整数 可正负数
        validator: function (value) {
            //return /^[+]?[1-9]+\d*$/i.test(value);

            return /^([+]?[0-9])|([-]?[0-9])+\d*$/i.test(value);
        },
        message: '请输入整数'
    },
    age: {// 验证年龄
        validator: function (value) {
            return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i.test(value);
        },
        message: '年龄必须是0到120之间的整数'
    },
    chinese: {// 验证中文
        validator: function (value) {
            return /^[\Α-\￥]+$/i.test(value);
        },
        message: '请输入中文'
    },
    english: {// 验证英语
        validator: function (value) {
            return /^[A-Za-z]+$/i.test(value);
        },
        message: '请输入英文'
    },
    unnormal: {// 验证是否包含空格和非法字符
        validator: function (value) {
            return /.+/i.test(value);
        },
        message: '输入值不能为空和包含其他非法字符'
    },
    username: {// 验证用户名
        validator: function (value) {
            return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
        },
        message: '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
    },
    faxno: {// 验证传真
        validator: function (value) {
            //            return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/i.test(value);
            return /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '传真号码不正确'
    },
    zip: {// 验证邮政编码
        validator: function (value) {
            return /^[1-9]\d{5}$/i.test(value);
        },
        message: '邮政编码格式不正确'
    },
    ip: {// 验证IP地址
        validator: function (value) {
            return /d+.d+.d+.d+/i.test(value);
        },
        message: 'IP地址格式不正确'
    },
    name: {// 验证姓名，可以是中文或英文
        validator: function (value) {
            return /^[\Α-\￥]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
        },
        message: '请输入名字'
    },
    date: {//
        validator: function (value) {
            //格式yyyy-MM-dd或yyyy-M-d
            return /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/i.test(value);
        },
        message: '请输入合适的日期格式'
    },
    msn: {
        validator: function (value) {
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
        message: '请输入有效的msn账号(例：abc@hotnail(msn/live).com)'
    },
    same: {
        validator: function (value, param) {
            if ($("#" + param[0]).val() != "" && value != "") {
                return $("#" + param[0]).val() == value;
            } else {
                return true;
            }
        },
        message: '两次输入的密码不一致！'
    },
    // 各类名称
    allName:{// 验证姓名，可以是中文或英文
        validator: function (value) {
            return /^[\u4e00-\u9fa5a-zA-Z]+$/.test(value);
            // return /^[\Α-\￥]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
        },
        message: '名称只能是中英文'
    },
    // 英文+数字
    englishNumber: {
        validator: function (value) {
            return /^[0-9a-zA_Z]+$/i.test(value)
        },
        message: '请输入英文或数字'
    },
    // 下拉框必填
    selectValueRequired: {
        validator: function(value){
            return value == 0 ? false : true
        },
        message: '该选项是必选项'
    },
    // 下拉树必填
    cbtRequired: {
        validator: function(value, param){
            var keyWord = value.slice(0, 3);
            return keyWord == '请选择' ? false : true;
        },
        message: '该选项是必选项'
    },
    // 0-24的正数(1位小数)
    lessThan:{
        validator: function (value) {
            return /^(0\.[1-9]|[1-9](\.\d)?|1\d(\.\d)?|2[0-3](\.\d)?)$/g.test(value);
        },
        message: '请输入小于24的正数(不超过1位小数)'
    },
    // 正数，两位小数
    positiveTwo: {
        validator: function (value) {
        	 return /^[0-9]+(.[0-9]{1,2})?$/.test(value)
        },
        message: '请输入正数(不超过2位小数)'
    },
    // 小于240的正整数
    positiveInt: {
        validator: function (value) {
            return /^(([1-9]|[1-9][0-9])|^1\d{2}|2[0-3]\d|239)$/.test(value)
        },
        message: '请输入小于240的正整数'
    },
    // MTBF
    positiveMtbf: {
        validator: function (value) {
            return /^[1-9]+\d*$/.test(value) && value <= 175200
        },
        message: '请输入小于等于175200的正整数'
    },
    // 小于365的正整数
    positiveSup: {
        validator: function (value) {
            return /^[1-9]+\d*$/.test(value) && value <= 365
        },
        message: '请输入小于等于365的正整数'
    },
    // 数字长度为4位，最后一位可为小数
    positiveSupfour: {
        validator: function (value) {
            var reg = /.*\..*/;
         if( reg.test(value)){
            return  /^-?\d+\.?\d{1,1}$/.test(value)
         }else{
            return /^\d{1,4}$/.test(value)
         }
        },
        message: '请输入长度为4的正整数，或含一位小数'
    },
    // 正整数
    numInt: {
        validator: function (value) {
            return /^^[1-9]\d*$/.test(value)
        },
        message: '请输入正整数'
    },
    // 正整数 非空时不验证
    numIntEmpty: {
        validator: function (value) {
            if(value == ''){
                return true;
            }else {
                return /^^[1-9]\d*$/.test(value)
            }
        },
        message: '请输入正整数'
    },
    //验证1-8的数字
    numOneEight: {
        validator: function (value) {
            return /^^[1-8]\d*$/.test(value)
        },
        message: '请输入1-8之间的数'
    },
});

//====================其它公用部分====================
var common = {
    // 单个复选  true表示选完之后全选按钮 自动选上
    commonCheckbox : function (node,state) {
        $(node).on('change','.check-row',function () {
            var $this = $(this);
            var $checkbox =$this.parents(node).find('.checkbox-wrapper .check-row').not('.checkbox-wrapper-not .check-row');
            var checkboxNum = 0;
            if($this.is(":checked")){
                $this.parents('a').addClass('checkbox-wrapper-checked')
            }else {
                $this.parents('a').removeClass('checkbox-wrapper-checked')
            }
            if(state){
                $checkbox.each(function (index,n) {
                    $(n).is(":checked") ? checkboxNum++ : checkboxNum--;
                    if(checkboxNum == $checkbox.length){
                        $this.parents(node).find('.check-all').prop('checked',true).parents('a').addClass('checkbox-wrapper-checked');
                    }else {
                        $this.parents(node).find('.check-all').prop('checked',false).parents('a').removeClass('checkbox-wrapper-checked')
                    }
                })
            }
        })
    },
    // 全选、全不选
    checkboxAll : function (node) {
        $(node).on('change','.check-all',function () {
            var $this = $(this);
            var $checkbox = $(this).parents(node).find('.checkbox-wrapper .check-row').not('.checkbox-wrapper-not .check-row')
            if($this.is(":checked")){
                $this.parents('a').addClass('checkbox-wrapper-checked');
                $checkbox.each(function (index,n) {
                    $(n).prop('checked',true).parents('a').addClass('checkbox-wrapper-checked');
                })
            }else {
                $this.parents('a').removeClass('checkbox-wrapper-checked');
                $checkbox.each(function (index,n) {
                    $(n).prop('checked',false).parents('a').removeClass('checkbox-wrapper-checked');
                })
            }
        })
    },
    // 单选
    commonRadio : function (node) {
        $(node).on('change','input[type=radio]',function () {
            var $radio = $(node).find('input[type=radio]');
            var $parentNode;
            $radio.each(function (index,n) {
                if($(n).is(':checked')){
                    $parentNode = $(n).parents('.radio-wrapper');
                    $parentNode.addClass('radio-checked')
                }else {
                    $parentNode = $(n).parents('.radio-wrapper');
                    $parentNode.removeClass('radio-checked');
                }
            });
            // if($this.is(':checked')){
            //     $parentNode.addClass('radio-checked').siblings('.radio-wrapper').removeClass('radio-checked');
            //     // $parentNode.find('input[type=radio]').removeAttr('checked')
            // }
        })
    }
};
