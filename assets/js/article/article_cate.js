$(function(){

    var form = layui.form;
    var layer = layui.layer;
    // 1.获取文章分类的列表
    initArtCateList()
    // 获取文章分类的列表
    function initArtCateList(){
        $.ajax({
            method:"GET",
            url :"/my/article/cates",
            success: function(res){
                    // console.log(res);
              var htmlStr= template("tpl-artList",res);
              $("tbody").html(htmlStr);
            }
        })
    }
    //2. 给添加类别绑定点击事件
    var index = null;
    $("#btnAdd").on("click",function(){
        index =layer.open({
            area:["500px","250px"],
            type:1,
            title: '添加文章分类'
            ,content: $("#tpl-add").html()
          });

    })
    // 3.给表单设置提交事件 通过代理方式
    $("body").on("submit","#form-add",function(e){
        e.preventDefault();
        $.ajax({
            method: "POST",
            url:"/my/article/addcates",
            data :$(this).serialize(),
            success: function(res){
                // console.log(res);
                if(res.status !==0){
                    return layer.msg("新增文章分类失败!")
                }
                // 获取列表渲染页面
                initArtCateList() 
                layer.msg("新增文章分类成功!")
                layer.close(index);
            }
        })
    })
    // 4.给编辑绑定点击事件 通过代理方式
    var editIndex = null;
    $("tbody").on("click","#edit",function(){
        editIndex =layer.open({
            area:["500px","250px"],
            type:1,
            title: '修改文章分类'
            ,content: $("#tpl-edit").html()
          });
    })

})