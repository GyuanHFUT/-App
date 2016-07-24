
$(document).ready(function () {
    $.init();
    function bofang()
        {
        var x = document.getElementById("audion");
        x.play();
        }
        function zhanting()
        {
        var x = document.getElementById("audion");
        x.pause();
        }
    console.log("哈哈哈我最帅嘿嘿嘿");
    $(".playn").on('click',function(){
        $(".playn").hide();
        $(".stopn").show();
        bofang();
    })
    $(".stopn").click(function(){
        $(".stopn").hide();
        $(".playn").show();
        zhanting();
    })
    
    $(".open-xiangjie").click(function(){
         var parents  =  $(this).parent().parent();
         var flag=parents.find(".xiangjie-wapper");
          flag.toggle();
          // console.log($(flag).css("display")==='none');
          $(this).addClass('active');
          if ($(flag).css("display")==='none') {
               $(this).removeClass('active');
          }
          else{
                $(this).addClass('active');
           };
         // parents.find(".xiangjie-wapper").toggle(
         //        ,
         //        function(){ $(this).removeClass('active')}
         //    ) 
    })
})