$(document).ready(function(){
  var data ={
    "title":"专项学习测试"
  };
  var myTemplate = Handlebars.compile($("#myTemplate").html());
  $("#6").html(myTemplate(data));
  $.init();
  //一些使用到的全局变量
  var dui=0;
  var cuo=0;
  var zong=$(".weida").find('b').html();
  //页面翻转======这里的触摸还有一些问题，左滑的时候呈现出来的是右滑效果，是用了它原生的路由跳转的结果。
  $(".page").swipeLeft(function(){
      var flag=$(this).attr("id");
      if (flag<$(".page").length) {
          $('.flex:eq('+flag+')'). addClass('current').siblings().removeClass('current');
          flag++;
          $("#"+flag+"").find(".yeshu").html(""+flag+"/1311");
          $.router.load("#"+flag+"");
      }else{
          $.toast("已经是最后一题了")
      }
  });
  $(".page").swipeRight(function(){
     var flag=$(this).attr("id");
     if (flag>1) {
           flag--;
           $('.flex:eq('+(flag-1)+')').addClass('current').siblings().removeClass('current');
           $("#"+flag+"").find(".yeshu").html(""+flag+"/30");
           $.router.load("#"+flag+"");
     }else{
           $.toast("已经是第一题了")
     }
  });
//交卷部分
  $(document).on('tap','.confirm-ok', function () {
    $.confirm('确定交卷?', function () {
      $.router.load("./grade.html");
    });
  });
  //选项选择后对应选项颜色样式的改变

  $(".select").on('tap',function(){
     var parent  =  $(this).parent();
     var parents  =  $(this).parent().parent();
     var parentss=parents.parent();
     var x=parent.attr('value');
     x--;
     if(!parent.hasClass('yidian')){
       if ($(this).hasClass("dui")) {
           $(this).find('i').html('&#xe61b');
           //在popup层找到相对应的box改变颜色！
           $(this).addClass("duicolor");
           $('.flex:eq('+x+')').addClass("popdui");
           zong--;
           dui++;
           $(".dadui").find('b').html(dui);
           $(".weida").find('b').html(zong);
           parent.addClass('yidian');
           var flag=parentss.attr("id");
           if (flag<$(".page").length){
                $('.flex:eq('+flag+')'). addClass('current')
                   .siblings().removeClass('current');
                 flag++;
                 $("#"+flag+"").find(".yeshu").html(""+flag+"/30");
                 $.router.load("#"+flag+"");                //自动下一页，然后改变box当前页面，并且播放语音
             }else{
                 $.toast("已经是最后一题了")
             }
        }else{
          $(this).find('i').html('&#xe624');
          $(this).addClass("cuocolor");
          cuo++;
          zong--;
          $(".dacuo").find('b').html(cuo);
          $(".weida").find('b').html(zong);
          $('.flex:eq('+x+')').addClass("popcuo");
          parent.addClass('yidian');
           //给正确答案加样式！
          for(var i =parent.find(".select ").length - 1; i >= 0; i--){
               var a=parent.find(".select ")[i];
               if ($(a).hasClass("dui")){
                         $(a).addClass("duicolor");
                      };
              }
            }
      }else{
            $.toast("请注意不要重复选择！");
           }
 })
  //交卷所要做到的携带内容与结果
  //倒计时的实现
  //音频的实现
  //ajax事件的学习，需要用这个做一些事情
})
