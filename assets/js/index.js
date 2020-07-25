$(function(){
    // 1.调用getUserInfo获取用户信息
        getUserInfo();
        var  layer = layui.layer;
        $("#btnLogout").on("click",function(){
            console.log("ok");
            // 
            layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
                //do something
                // 1.清空本地存储中的token
                localStorage.removeItem("token")
                // 2.跳转login.html
                location.href= "/login.html"
                layer.close(index);
              });
        })



        // 获取用户基本信息
        function getUserInfo(){
            $.ajax({
                method : "GET",
                url : "/my/userinfo",
                headers : {
                    authorization: localStorage.getItem("token")||""
                },
                success : function(res){
                        if(res.status !==0)
                        return layer.msg("获取用户信息失败!")
                        // 2.渲染头像
                        renderAvatar(res.data)
                },
                complete:function(res){
                    console.log(res);
                    if(res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败！')
                    {
                        // 1.强制清空 token
                        localStorage.removeItem("token");
                        // 2.强制跳转到login页面
                        location.href= "/login.html"
                    }
                }
            
               
            })
          
        }




        // 2.渲染用户头像
        function renderAvatar(user){
            // 2.1获取用户名称
            var name = user.nickname || user.username;
            // 2.2 设置欢迎文本
            $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
            // 2.3 按需渲染用户头像
            if(user.user_pic !==null){
                // 2.3.1 渲染图片头像
                $(".layui-nav-img").attr("src",user.user_pic).show();
                $(".text-avatar").hide();

            }else {
                // 2.3.2渲染文本头像
                $(".layui-nav-img").hide();
                var first = name[0].toUpperCase();
                $(".text-avatar").html(first).show();
            }
           
        }
})