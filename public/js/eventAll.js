
(function (window,document) {
    var eventAll = function (targetDom,options,fuc) {
        (typeof targetDom) === 'string' ? this.targetDom = document.querySelector(targetDom) : this.targetDom = targetDom;
        this.options = options;
        this.fuc = fuc;
        this.init();
    };
    eventAll.prototype = {
        init: function () {
            this.event();
        },
        extend: function () {

        }
    }
})(window,document);