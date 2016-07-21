$(document).ready(function () {
          $.init();
         $("#youke").click(function () {
            $.router.load("/home"); 
         })

         $("#account").blur(function () {
            var account = $("#account").val();
            $.ajax({
              type: 'get',
              url: '',
              data: "account",
              success: function(data){
                    if(data){
                        $.alert('该手机号已被注册!')
                    }
             }
        })
     } ) 
        $("#send").click(function () {
        var account = $("#account").val();
        var pwd = $("#upwd").val();
        var name=$("#uname").val();
        if (name.length!=0){
            if (pwd.length>=4&&pwd.length<=16&&account.length>=4&&account.length<=16){
        var users = {"user_id":account, "user_name":name,"user_pwd":pwd};
            $.ajax({
              type: 'POST',
              url: '',
              data: "users",
              success: function(data){
                    $.alert("注册成功!", function () {
                    $.router.load("/home"); 
        })},
                  error: function(xhr, type){
                    $.alert('注册失败，请重试!')
                  }
            })}
            else{$.alert("账户和密码请设置4到16位之间！")}
        }
        else {$.alert("昵称不能为空！")}
    });

})