$(document).ready(function () {
    $.init();
    ////上传头像
    var islogin = judgment2();

    sessionStorage.islogin =islogin;
    console.log( sessionStorage.islogin);
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
    if(islogin){
        $.ajax({
            type: 'get',
            url: '/JuniorHearing/user/showUserMessage',
            success: function (data) {
                console.log(data);
            }
        });
    }
    //侧边栏点击控制事件
    // var name = $('.panel-left').find('#exam').html();
    // if (name !== '${exam}') {
    //     console.log(name);
    //     name = JSON.parse(name);
    //     $('.panel-left').find('.login').hide();
    //     $('.panel-left').find('#nickname').css('display','inline-block').show();
    //     $('.panel-left').find('#nickname span').html(name.user_nickname);
    //     if(name.photo_url){
    //         $('.panel-left').find('#form1 img').attr('src',name.photo_url);
    //     };
    //
    // };
    $('.panel-left .control p').tap(function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
    $(document).on('click', '.open-preloader', function () {
        $.showPreloader();
        setTimeout(function () {
            $.hidePreloader();
        }, 2000);
    });
    judgment('#simulation', '模板测试功能', '../pages/simulation_test.html#1',islogin);
    judgment('.collect', '收藏功能', '/JuniorHearing/collect/showCollectByUser',islogin);
    judgment('.mistakes', '错题功能', '/JuniorHearing/mistake/showMistakeByUser',islogin);
    judgment('#form1 img', '上传头像功能', '1',islogin);
    //注销账号，移至设置页面
    // $('.panel-left .Logout').tap(function(){
    //     $.ajax({
    //         type:'get',
    //         url:'/JuniorHearing/user/deleteUser',
    //         success:function(data){
    //             // var data = JSON.parse(data);
    //             console.log(data);
    //             if(data.success){
    //                 $.toast(data.msg);
    //                 $.router.load("../pages/choice_que.html");
    //             }
    //             else{
    //                 $.toast(data.msg);
    //             }
    //         }
    //     })
    // })
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
                    $.router.load("../pages/choice_que.html");
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