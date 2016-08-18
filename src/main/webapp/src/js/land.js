$(document).ready(function () {
          $.init();
        $("#send").tap(function () {
        var account = $("#account").val();
        var pwd = $("#upwd").val();
       if (pwd.length!=0&&account.length!=0){
        var user = {"user_name":account, "user_pwd":pwd};
            $.ajax({
              type: 'post',
              url: '/JuniorHearing/user/userLogin',
              data: user,
              success: function(data){
                console.log(data);
                if(data.success){   

                  $.alert("登陆成功!", function () {
                    $.router.load("../pages/choice_que.html");
        })}
                  else{
                     $.alert(data.msg);
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
        var account = $("#account2").val();
                 $.ajax({
                  type: 'post',
                  url: '/JuniorHearing/user/sentCodeOfBack',
                  data:{
                    "user_name":account
                     } ,
                  success: function(data){
                    console.log(data);
                        if(data.success){
                            $.toast('验证码已发送，请查收!')
                        }
                        else{
                          $.toast(data.msg)
                        }
                 }
            })          
           })

       $("#reset").tap(function () {
        var account = $("#account2").val();
        var pwd = $("#upwd2").val();
         var yanzheng=$("#uyanzheng").val();
        if (yanzheng.length!=0){
        var users = {"user_name":account,"user_pwd":pwd,"user_code":yanzheng};
        console.log(users);
            $.ajax({
              type: 'post',
              url:'/JuniorHearing/user/backUserPwd',
              data: users,
              success: function(data){
                console.log(data);
                if(data.success){
                    $.alert("密码重置成功!", function () {
                    $.router.load("../pages/choice_que.html");
                })}  
                else{
                   $.alert(data.msg);
                }
                }
            })
          }
        else {$.alert("验证码不能为空！")}
    });
})