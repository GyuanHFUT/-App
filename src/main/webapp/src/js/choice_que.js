// window.onload{
//   var name = getElementsByClassName('page-current').getElementsById(),
//   var href = getElementsByClassName('tab-item')

// }
$(document).ready(function () {
    $.init();
  $(document).on('click', '.open-preloader', function () {
          $.showPreloader();
          setTimeout(function () {
              $.hidePreloader();
          }, 2000);
        });
    $('#simulation').tap(function(){
        $.ajax({
                type: 'get',
                url: "/JuniorHearing/user/sendUser",
                success: function(data){
                    console.log(data);
                    if(data=="login"){
                        $.confirm('模拟考试需要登录，是否登陆?',
                            function () {
                                $.router.load("../pages/land.html");
                            }
                        );
                    }else{

                            $.router.load("../pages/simulation_test.html#1");

                    }
                }
            })

    })
})