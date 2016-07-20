$(document).ready(function () {
        $("#send").click(function () {
        var account = $("#account").val();
        
        var pwd = $("#upwd").val();
        var type=$("#utype").val();
        if (name.length!=0){
            if (pwd.length>=4&&pwd.length<=16){
        var users = {"user_name":account, "user_pwd":pwd,"user_desc":tip,"user_type":type};
        ajax.post('/Cktv/user/insertUser', users, function(data){
            if(data.success){
                layer.msg(data.msg);
            }else{
                layer.msg(data.msg);
            }
            window.location.reload();
        }, true);}
            else{layer.msg("密码请设置4到16位之间！")}
        }
        else {layer.msg("用户名不能为空！")}
    });
})