$(document).ready(function () {
          $.init();
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
                  type: 'get',
                  url: '',
                  data:'' ,
                  success: function(data){
                        if(data){
                            $.alert('该手机号已被注册!')
                        }
                 }
            })
         }
     } ) 
     $("#uyanzheng").blur(function () {
          var yanzheng = $("#uyanzheng").val();
         if (yanzheng.length!=6){
          $.toast('验证码格式错误!')
            $("#uyanzheng").focus();
         }
         else{
           return true; 
         }
     } ) 

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
           
        var users = {"user_id":account, "user_name":name,"user_pwd":pwd,"yanzheng":yanzheng};
            $.ajax({
              type: 'get',
              url: '',
              data: "users",
              success: function(data){
                    $.alert("注册成功!", function () {
                    $.router.load("../pages/choice_que.html"); 
        })},
                  error: function(xhr, type){
                    $.alert('注册失败，请重试!')
                  }
            })
          }
        else {$.alert("验证码和昵称不能为空！")}
    });

})