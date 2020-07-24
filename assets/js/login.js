$(function(){
    //1. 点击注册  切换登录
    $(".reg-text").on("click",function(){
      
        $(".login").hide();
        $(".reg").show();
     })
    // 2.点击登录  切换注册 
     $(".login-text").on("click",function(){
        $(".login").show();
        $(".reg").hide();
     })
    // 3.校验输入框
    var form = layui.form;
   var layer = layui.layer;
         form.verify ({
            //  用户名校验
            username:[/^[\w]{3,12}$/,"用户名必须6到16位,且不能出现空格"],
            //  密码校验
             pwd : [/^[\S]{6,12}$/
                ,'密码必须6到12位，且不能出现空格'
              ],
            //  确认密码校验
              repwd:function(value){
               var pwd = $(".reg [name=password]").val();
                if(pwd!==value){
                     return  "两次密码不一致";
                }  
              }
            })
      // 4.注册表单提交   有接口
    $("#reg-form").on("submit",function(e){
         e.preventDefault();
         $.ajax({
            method : "POST",
            url : "/api/reguser",
            data: {
                 username: $("#reg-form [name=username]").val(),
                 password:$("#reg-form [name=password]").val()
            },
            success : function(res){
                if(res.status!== 0)
                  return layer.msg(res.message);
                  layer.msg("注册成功");
                  $(".login-text").click();  
                  
            }
         })
    })
   //登录提交
   $("#login-form").on("submit",function(e){
         e.preventDefault();
         $.ajax({
            method : "POST",
            url : "/api/login",
            data: {
                 username: $("#login-form [name=username]").val(),
                 password:$("#login-form [name=password]").val()
            },
            success : function(res){
                if(res.status!== 0)
                  return layer.msg(res.message);  
                  layer.msg("登录成功");
                  location.href = "/index.html"
            }
         })
    })

   }) 
   




     
