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


        function checkPhone(phone){ 
              if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){ 
                 $.toast("请输入正确的手机号码。");  
                 $("#account2").focus();
                  return false; 
              } return true; 
          }
         $("#account2").blur(function () {
            var account = $("#account2").val();
            checkPhone(account);
            })

      $("#upwd2").blur(function () {
          var pwd = $("#upwd2").val();
         if (pwd.length>=4&&pwd.length<=16){
          return true;
         }
         else{
            $.toast('新密码请设置4到16位之间!')
            $("#upwd2").focus();
         }
     } ) 

       $("#yanzheng").click(function () {
                 $.ajax({
                  type: 'get',
                  url: '',
                  data:'' ,
                  success: function(data){
                        if(data.success){
                            $.toast('验证码已发送，请查收!')
                        }
                        else{
                          $.toast('数据异常，请重试!')
                        }
                 }
            })          
           })

       $("#reset").click(function () {
        var account = $("#account").val();
        var pwd = $("#upwd").val();
         var yanzheng=$("#uyanzheng").val();
        if (yanzheng.length!=0){
        var users = {"user_id":account, "user_name":name,"user_pwd":pwd,"yanzheng":yanzheng};
            $.ajax({
              type: 'get',
              url: '',
              data: "users",
              success: function(data){
                if(data.success){
                    $.alert("密码重置成功!", function () {
                    $.router.load("../pages/choice_que.html"); 
                })}  
                else{
                   $.alert("验证码错误，请重试!");
                }
                }
            })
          }
        else {$.alert("验证码不能为空！")}
    });
})