
$.ajaxPrefilter(function(options){
    // 1.直接设置url地址  不需要每次都带根路径
    options.url = "http://ajax.frontend.itheima.net" + options.url ;
    //2.统一为有权限的接口  设置headers请求头
    if(options.url.indexOf("/my/")!==-1){
        options.headers = {
            Authorization : localStorage.getItem("token")
        }
    }
})