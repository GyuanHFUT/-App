
$(document).ready(function () {
    $.init();
    //侧边栏点击控制事件
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
});