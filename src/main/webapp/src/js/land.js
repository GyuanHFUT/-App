$(document).ready(function () {
          $.init();
         $("#youke").click(function () {
            $.router.load("/home"); 
         })

        $("#send").click(function () {
        var account = $("#account").val();
        var pwd = $("#upwd").val();


            if (pwd.length!=0&&account.length!=0){
        var users = {"user_id":account, "user_pwd":name};
            $.ajax({
              type: 'POST',
              url: '',
              data: "users",
              success: function(data){
                    $.alert("登陆成功!", function () {
                    $.router.load("/home"); 
        })},
                  error: function(xhr, type){
                    $.alert('登陆失败，请重试!')
                  }
            })}
            else{$.alert("账户和密码不能为空！")}
    });

})