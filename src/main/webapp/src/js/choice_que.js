
$(document).ready(function () {
    $.init();
    //每日一句渲染

    $.ajax({
        type:'get',
        url:'/JuniorHearing/user/sendUserDay',
        success:function(data){
            console.log(data);
            var myTemplate = Handlebars.compile($("#myTemplate").html());
            $("#handlebars").html(myTemplate(data));
        }
    })

    //侧边栏点击控制事件
    var name = $('.panel-left').find('#exam').html();
    if(name !== '${exam}'){
        console.log(name);
        name = JSON.parse(name);
        $('.panel-left').find('.login').hide();
        $('.panel-left').find('#nickname').show();
        $('.panel-left').find('#nickname').html(name.user_nickname);
    };
    $('.panel-left .control p').tap(function(){
        $(this).addClass('active').siblings().removeClass('active');
    })
  $(document).on('click', '.open-preloader', function () {
          $.showPreloader();
          setTimeout(function () {
              $.hidePreloader();
          }, 2000);
        });
    judgment('#simulation','模板测试功能','../pages/simulation_test.html#1');
    judgment('.collect','收藏功能','#');
    judgment('.mistakes','错题功能','/JuniorHearing/mistake/showMistakeByUser');
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
    $('.panel-left .Logout').tap(function(){
            $.ajax({
                type:'get',
                url:'/JuniorHearing/user/cancelUser',
                success:function(data){
                    // var data = JSON.parse(data);
                    console.log(data);
                    if(data.success){
                        $.toast(data.msg);
                        $.router.load("../pages/choice_que.html");
                    }
                    else{
                        $.toast(data.msg);
                    }
                }
            })
        })
});