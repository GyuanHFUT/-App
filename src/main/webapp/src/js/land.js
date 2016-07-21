$(document).ready(function () {
          $.init();
        $("#send").click(function () {
        var account = $("#account").val();
        var pwd = $("#upwd").val();
       if (pwd.length!=0&&account.length!=0){
        var users = {"user_id":account, "user_pwd":name};
            $.ajax({
              type: 'get',
              url: 'user/userLogin',
              data: "users",
              success: function(data){
                if(data.success){   
                  $.alert("登陆成功!", function () {
                    $.router.load("../pages/choice_que.html"); 
        })}
                  else{
                     $.alert("数据异常，请重试!");
                  }
                 }
            })}
            else{$.alert("用户名和密码不能为空！")}
    });

})