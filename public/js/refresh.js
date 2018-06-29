// 监听f5局部刷新内容frame
document.onkeydown = function (e) {
    e = window.event || e;
    var keycode = e.keyCode || e.which;
    if (keycode == 116) {
        if (window.event) {// ie 
            e.preventDefault();
            window.parent.frames["view_frame"].location.reload();
        } else {// firefox  
            e.preventDefault();
            window.parent.frames["view_frame"].location.reload();
        }
    }            
}