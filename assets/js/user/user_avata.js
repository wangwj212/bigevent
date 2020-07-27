$(function(){
     // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

    // 2.给上传按钮绑定点击事件,点击上传触发input file 输入框
    $("#btnChoose").on("click",function(){
        $("#file").click();
    })
    // 3.给上传文件设置change事件
    $("#file").on("change",function(e){
        // console.log(e);
        // 3.1获取到上传的文件的数量
        var fileList = e.target.files;
        // console.log(fileList);
        // 3.2判断是否上传的了文件
        if(fileList.length ===0){
            return layui.layer.msg("请上传文件!");
        }
        // 3.3获取上传的文件
        var file = e.target.files[0];
        // 3.4根据根据选择的文件，创建一个对应的 URL 地址
        var newImgURL = URL.createObjectURL(file)
        // 3.5先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
         // 销毁旧的裁剪区域
        $image.cropper('destroy')     
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
    })
    // 4.给确定按钮绑定点击事件
    $("#btnSure").on("click",function(){
        // 4.1拿到上传文件的地址
        var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    //   4.2调用接口
      $.ajax({
          method:'POST',
          url:'/my/update/avatar',
          data: dataURL,
          success: function(res){
              if(res.status !==0){
                  return layui.layer.msg("更新头像失败!");
              }
              layui.layer.msg("更新头像成功!");
              window.parent.getUserInfo();
          }
      })
    })


})
