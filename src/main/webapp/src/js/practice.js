
$(document).ready(function () {
    $.init();
    $(document).on("pageInit", "#page-index", function(e, pageId, $page) {
        alert("hhhh");
    });
    function bofang(x)
        {
        var x = document.getElementById("audion");
        x.play();
        }
        function zhanting()
        {
        var x = document.getElementById("audion");
        x.pause();
        }
    // console.log("哈哈哈我最帅嘿嘿嘿");
    // $(".playn").on('click',function(){
    //     $(".playn").hide();
    //     $(".stopn").show();
    //     bofang();
    // })
    // $(".stopn").click(function(){
    //     $(".stopn").hide();
    //     $(".playn").show();
    //     zhanting();
    // })
    $('.yinpinicon').tap(function(){
        $(".playn").toggle();
        $(".stopn").toggle();
        var flag=$(this).parent().find('audio');
        flag.play();
        
    } )
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
    //收藏部分！
    $(".shoucang").click(function(){
      if ($(this).hasClass('active')) 
          {
            $(this).removeClass('active');
            $.ajax({
                    type: 'get',
                    url: '',
                    data: "users",
                    success: function(data){
                      if(data.success){   
                        $.toast("取消收藏！")}
                        else{
                           $.toast("数据异常，请重试!");
                           $(this).addClass('active');
                        }
                       },
                  })          
      }
      else{
        $(this).addClass('active');
        $.ajax({
              type: 'get',
              url: '',
              data: "users",
              success: function(data){
                if(data.success){   
                  $.toast("收藏成功！")}
                  else{
                     $.toast("数据异常，请重试!");
                     $(this).removeClass('active');
                  }
                 },
            }) 
      }
    })
    //滑动翻页部分
    $(".page").swipeLeft(function(){
      var flag=$(this).attr("id");
      if (flag<$(".page").length) {
      $('.flex:eq('+flag+')'). addClass('current') 
           .siblings().removeClass('current');            
      flag++;
      $("#"+flag+"").find(".yeshu").html(""+flag+"/1311");       
      $.router.load("#"+flag+"");        
  }else{
     $.toast("已经是最后一题了")
  }
 })
    $(".page").swipeRight(function(){
     var flag=$(this).attr("id");
     if (flag>1) {
         flag--;
     $('.flex:eq('+(flag-1)+')'). addClass('current') 
           .siblings().removeClass('current');           
     
      $("#"+flag+"").find(".yeshu").html(""+flag+"/1311");       
      $.router.load("#"+flag+"");        
     }
     else{
        $.toast("已经是第一题了")
     }
    })

    $(".flex").tap(function(){//点击盒子切换页面
      var flag=$(this).html();       
     $('.flex:eq('+(flag-1)+')'). addClass('current') 
           .siblings().removeClass('current');           
      $("#"+flag+"").find(".yeshu").html(""+flag+"/1311");       
      $.router.load("#"+flag+"");        
    })

})