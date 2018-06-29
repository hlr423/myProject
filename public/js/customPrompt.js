/* 自定义提示窗插件，2s后自动消失，
    三种状态,默认success, default, error
    默认显示 操作成功
*/
(function () {
    function CustomPrompt(option) {
        this.init(option);
    };

    CustomPrompt.prototype = {
        init: function (option) {
            // 判断是否什么都没传
            var option = option === undefined ? {} : option;
            var defaultOption = {
                type: 'success',
                msg: '操作成功',
            };

            // 创建节点
            var wrapper = document.createElement('p');
            var i = document.createElement('i');
            var span = document.createElement('span');

            this.addClass.call(wrapper, 'prompt-wrapper');

            var wrapper1 = document.getElementsByClassName('prompt-wrapper')[0];

            // 判断是否重复创建节点
            if (wrapper1 !== undefined) {
                return;
            };

            // 生成一个新的文档片段
            var fragment = document.createDocumentFragment();

            wrapper.appendChild(i);
            wrapper.appendChild(span);
            fragment.appendChild(wrapper);
            document.body.appendChild(fragment);

            this.extend(option, defaultOption);

            // 3种类型的判断
            if (option.type === 'success') {
                this.addClass.call(wrapper, 'success');
            } else if (option.type === 'default') {
                this.addClass.call(wrapper, 'default');
            } else if (option.type === 'error') {
                this.addClass.call(wrapper, 'error');
            }

            // 写入要展示的信息
            span.innerHTML = option.msg;

            var that = this;
            var time = 1900;  // 1.9秒后删除节点

            // 再次查找到该节点
            wrapper1 = document.getElementsByClassName('prompt-wrapper')[0];

            setTimeout(function () {
                that.removeElement(wrapper1);
            }, time);
        },

        extend: function (option, tag) {
            for (var i in tag) {
                if (!(i in option)) {
                    option[i] = tag[i];
                };
            };
            return this;
        },

        removeElement: function (_element) {
            var _parentElement = _element.parentNode;
            
            if (_parentElement) {
                _parentElement.removeChild(_element);
            };
        },

        addClass: function (className) {
            this.className += " " + className;
        }
    };

    window.CustomPrompt = CustomPrompt;
})();