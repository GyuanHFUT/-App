
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
      flag++;
      console.log(flag);
      // var next=parseInt(flag);
      // console.log(typeof(next+1));
      $.router.load("#2");
    })
    $(".page").swipeRight(function(){
      $.router.load("#1");
    })
})