//封装一些常用函数
//替换总题数
function tiHuanZong (zong) {
        $(".weida").find('b').html(zong);
        $.each($(".yeshu"),function(i,val){
        var x= $(val).html();
        var y=x.replace(/1110/, zong);
        $(val).html(y);
       })
}
//点击选项判断对错
function  select(dui,cuo,zong){
        $(".select").on('tap',function(){
        var parent  =  $(this).parent();
        var parents  =  $(this).parent().parent();
        var parentss=parents.parent();
        var x=parent.attr('value');
        x--;
        if ($(this).hasClass("dui")) {
            $(this).find('i').html('&#xe61b;');
            //在popup层找到相对应的box改变颜色！
            $(this).addClass("duicolor");
            $('.flex:eq('+x+')').addClass("popdui");
            if (!parent.hasClass('yidian')) {//确认此题有没有被点击
            zong--;
            dui++;
            $(".dadui").find('b').html(dui);
            $(".weida").find('b').html(zong);
            parent.addClass('yidian');
            var flag=parentss.attr("id");
             if (flag<$(".page").length) {
                 $('.flex:eq('+flag+')'). addClass('current')
                    .siblings().removeClass('current');
                  flag++;
                  $("#"+flag+"").find(".yeshu").html(""+flag+"/1311");

                  $.router.load("#"+flag+"");                //自动下一页，然后改变box当前页面，并且播放语音
              }
                  else{ 
                     $.toast("已经是最后一题了")
              }
            };

        }
        else{
            $(this).addClass("cuocolor");
             $(this).find('i').html('&#xf0011');
             if (!parent.hasClass('yidian')) {
             cuo++;
             zong--;
             $(".dacuo").find('b').html(cuo);
             $(".weida").find('b').html(zong);
             $('.flex:eq('+x+')').addClass("popcuo");
            }
            parent.addClass('yidian');
             //给正确答案加样式！
             for (var i =parent.find(".select ").length - 1; i >= 0; i--) {
                 var a=parent.find(".select ")[i];
                 if ($(a).hasClass("dui"))
                        {
                           $(a).addClass("duicolor");
                        };
                }
                parents.find(".xiangjie-wapper").show();
                parentss.find(".open-xiangjie").addClass("active");

        }})
}
//收藏
function shoucang(){
 $(".shoucang").tap(function(){
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
}
//停止音频
function stopYinpin(x){

  var s=x.length;
  for (var i =s  - 1; i >= 0; i--) {
    x[i].pause(); 
  };
  $('.playn').show();  
  $('.stopn').hide();  
}
//详解打开和关闭
function xiangjie(){
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
}
//盒子切换事件
function box(x){
    $(".flex").tap(function(){//点击盒子切换页面
      stopYinpin(x);
      var flag=$(this).html();       
     $('.flex:eq('+(flag-1)+')'). addClass('current') 
           .siblings().removeClass('current');           
      $.router.load("#"+flag+"");        
    })    
}
//播放暂停图标显示与隐藏
   function icon() {
    $('.stopn').toggle(); 
    $('.playn').toggle();
 }
 //音频播放完自动暂停
 function stopNow(x){
  console.log(x.length);
  var s=x.length;
for (var i = s - 1; i >= 0; i--) {
      x[i].onended = function() {
          $('.playn').show();  
          $('.stopn').hide(); 
         };   
      }     
 }