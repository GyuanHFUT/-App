$(document).ready(function () {

//每日一句

    $.ajax({
        type: 'get',
        url: '/JuniorHearing/user/sendUserDay',
        success: function (data) {
            var data = data.sentence;
            console.log(data);
            var myTemplate = Handlebars.compile($("#myTemplate").html());
            $("#day_word").html(myTemplate(data));
        }
    });
    ////上传头像
    sessionStorage.islogin = judgment2();
    if(sessionStorage.islogin == "true"){
        $.ajax({
            type: 'get',
            url: '/JuniorHearing/user/showUserMessage',
            success: function (data) {
                console.log(data);
                localStorage.localaccount=data.user_name;
                localStorage.localpwd=data.user_pwd;
                // name = JSON.parse(name);
                    $('.panel-left').find('.login').hide();
                    $('.panel-left').find('#nickname').css('display','inline-block').show();
                    $('.panel-left').find('#nickname span').html(data.user_nickname);
                    if(data.photo_url){
                        $('.panel-left').find('#form1 img').attr('src',data.photo_url);
                    };
            }
        });
    }
    $.init();

    $('.panel-left .control p').tap(function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
    $(document).on('click', '.open-preloader', function () {
        $.showPreloader();
        setTimeout(function () {
            $.hidePreloader();
        }, 2000);
    });
    judgment('#simulation', '模板测试功能', '../pages/simulation_test.html#1',sessionStorage.islogin);
    judgment('.collect', '收藏功能', '/JuniorHearing/collect/showCollectByUser',sessionStorage.islogin);
    judgment('.mistakes', '错题功能', '/JuniorHearing/mistake/showMistakeByUser',sessionStorage.islogin);
    judgment('#form1 img', '上传头像功能', '1',sessionStorage.islogin);
    
    //退出登陆
    $('.panel-left .Logout').tap(function () {
        $.ajax({
            type: 'get',
            url: '/JuniorHearing/user/cancelUser',
            success: function (data) {
                // var data = JSON.parse(data);
                console.log(data);
                if (data.success) {
                    $.toast(data.msg);
                    location.reload();
                }
                else {
                    $.toast("您还未登录！");
                }
            }
        })
    })
});
function myFunction(){
    var form=document.getElementById("form1");
    var formdata=new FormData(form);
    console.log(formdata);
    $.ajax({
        type : 'post',
        url : '/JuniorHearing/user/photoUpload',
        data : formdata,
        cache : false,
        processData : false,  //  不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
        contentType : false,  //  不设置Content-type请求头
        success : function(data){
            console.log(data);
            if(data.success){
                $.toast(data.msg);
                $('.panel-left').find('#form1 img').attr('src',data.photo_url);
            }else{
                $.toast(data.msg)}
        }
    })}