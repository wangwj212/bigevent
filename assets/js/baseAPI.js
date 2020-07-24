// 直接设置url地址  不需要每次都带根路径
$.ajaxPrefilter(function(options){
    options.url = "http://ajax.frontend.itheima.net" + options.url ;

})