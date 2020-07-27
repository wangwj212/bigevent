$(function(){
     var form = layui.form
     var layer = layui.layer
     form.verify ({
        nickname : function(value){
            if(value.length > 6)
            return '昵称长度必须在 1 ~ 6 个字符之间！';
        }
     })
    // 初始化用户的基本信息
    initUserInfo()
    function initUserInfo(){
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success : function(res){
                if(res.status !==0){
                    return layer.msg("获取用户信息失败")
                }
                form.val("formUserInfo",res.data)
            }
        })
    } 
    // 给重置按钮绑定点击事件
    $("#btnReset").on("click",function(e){
        e.preventDefault();
        initUserInfo()
    })
    // 监听表单提交事件
    $(".layui-form").on("submit",function(e){
        e.preventDefault();
        //发起ajax请求
        $.ajax({
            method : "POST",
            url : '/my/userinfo',
            data : $(this).serialize(),
            success : function(res){
                if(res.status !==0){
                    return layer.msg("更新用户信息失败!") 
                }
                console.log(res);
                layer.msg("更新用户信息成功!")
                // 调用父页面中的方法,重新渲染用户头像和用户信息
                window.parent.getUserInfo();
            }
        })
    })
   
})