$(document).ready(function () {
          $.init();
        $("#send").click(function () {
        var account = $("#account").val();
        var pwd = $("#upwd").val();
       if (pwd.length!=0&&account.length!=0){
        var users = {"user_id":account, "user_pwd":name};
            $.ajax({
              type: 'get',
              url: '',
              data: "users",
              success: function(data){
                    $.alert("登陆成功!", function () {
                    $.router.load("../pages/choice_que.html"); 
        })},
                  error: function(xhr, type){
                    $.alert('登陆失败，请重试!')
                  }
            })}
            else{$.alert("用户名和密码不能为空！")}
    });

})