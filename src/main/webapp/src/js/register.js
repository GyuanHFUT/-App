$(document).ready(function () {
          $.init();
           $("#yanzheng").click(function () {
                var account = $("#account").val();
                 $.ajax({
                  type: 'post',
                  url: '/JuniorHearing/user/sentUserCode',
                  data:{
                    "user_name":account
                     },
                  success: function(data){
                      console.log(data);
                        if(data.success){
                            $.toast('验证码已发送，请查收!')
                        }
                        else{
                          $.toast('数据异常，请重试!')
                        }
                 }
            })          
           })

            function checkPhone(phone){ 
              if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){ 
                 $.toast("请输入正确的手机号码。");  
                 $("#account").focus();
                  return false; 
              } return true; 
          }
         $("#account").blur(function () {
            var account = $("#account").val();
            var flag=checkPhone(account);
            if(flag){
             $.ajax({
                  type: 'post',
                  url: '/JuniorHearing/user/userMapping',
                  data:{
                    "user_name":account
                     },
                  success: function(data){
                      console.log(data);
                        if(!data.success){                         
                          $.toast('该手机号已被注册!')
                          $("#account").focus();
                        }
                 }
            })
         }
     } ) 
     // $("#uyanzheng").blur(function () {
     //      var yanzheng = $("#uyanzheng").val();
     //     if (yanzheng.length!=6){
     //      $.toast('验证码格式错误!')
     //        $("#uyanzheng").focus();
     //     }
     //     else{
     //       return true; 
     //     }
     // } ) 

     $("#upwd").blur(function () {
          var pwd = $("#upwd").val();
         if (pwd.length>=4&&pwd.length<=16){
          return true;
         }
         else{
            $.toast('密码请设置4到16位之间!')
            $("#upwd").focus();
         }
     } ) 

        $("#send").click(function () {
        var account = $("#account").val();
        var pwd = $("#upwd").val();
        var name=$("#uname").val();
         var yanzheng=$("#uyanzheng").val();
        if (yanzheng.length!=0&&name.length!=0){
           
        var users = {"user_name":account, "user_nickname":name,"user_pwd":pwd,"user_code":yanzheng};

            $.ajax({
              type: 'post',
              url: '/JuniorHearing/user/addUser',
              data: users,
              success: function(data){
                console.log(data);
                if(data.success){
                    $.alert("注册成功!", function () {
                    $.router.load("/JuniorHearing/user/showUserMessage");
                })}  
                else{
                   $.alert("验证码错误，请重试!");
                }
                }
            })
          }
        else {$.alert("验证码和昵称不能为空！")}
    });

})