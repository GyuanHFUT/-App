$(document).ready(function(){
  var data = [
                       {     "listen_id":"1",
                             "listen_type":"1",
                             "listen_title":"",
                             "option_A": "../src/img/encouragement.jpg",
                             "option_B": "../src/img/encouragement.jpg",
                             "option_C": "../src/img/encouragement.jpg",
                             "listen_answer":"A",
                             "radio_url":"../src/audio/1.mp3",
                             "answer":"违反道路交通安全法，违反法律法规即为内联的新页面违法行为。官方已无违章/违规的说法。",
                             "yuanwen":"Is there anything wrong with you,Peter?",
                             "listen_style":"2"
                         },
                         {
                             "listen_id":"2",
                             "listen_type":"3",
                             "listen_title":"",
                             "option_A": "sunshine",
                             "option_B": "big",
                             "option_C": "two",
                             "listen_answer":"B",
                             "radio_url":"../src/audio/1.mp3",
                             "answer":"违反道路交通安全法，违反法律法规即为内联的新页面违法行为。官方已无违章/违规的说法。",
                             "yuanwen":"Is there anything wrong with you,Peter?",
                             "listen_style":"1",
                             "form_url":"../src/img/encouragement.jpg"
                         },
                         {
                             "listen_id":"3",
                             "listen_type":"2",
                             "listen_title":"What is Lily's father",
                             "option_A": "sunshine",
                             "option_B": "big",
                             "option_C": "three",
                             "listen_answer":"C",
                             "radio_url":"../src/audio/1.mp3",
                             "answer":"违反道路交通安全法，违反法律法规即为内联的新页面违法行为。官方已无违章/违规的说法。",
                             "yuanwen":"Is there anything wrong with you,Peter?",
                             "listen_style":"1"
                         }] ;
//   $.ajax({
//     type: 'get',
//     url: '',
//     success:function(data){
//       var data = JSON.parse(data);
//       for(var t= 0 ;t<data.length;t++){
//          data[t].first = "";
//          data[0].first="page-current";
//          data[t].box = "";
//          data[0].box = "current";
//          var n = data[t].listen_type,
//             title = data[t].listen_title,
//             s = data[t].listen_style,
//             answer = data[t].listen_answer;
//          switch(n){
//             case "1":data[t]["listen_name"]="关键词语选择";break;
//             case "2":data[t]["listen_name"]="短对话理解"; break;
//             case "3":data[t]["listen_name"]="长对话理解"; break;
//             case "4":data[t]["listen_name"]="短文理解"; break;
//             case "5":data[t]["listen_name"]="信息转换"; break;
//          };
//          if(title == ""){
//            data[t].listen_title= data[t].listen_name;
//          };
//          switch(s){
//               case "1":data[t]["selects_type"]="words";break;
//               case "2":data[t]["selects_type"]="imgs"; break;
//               case "3":data[t]["selects_type"]=""; break;
//           };
//       };
//       var myTemplate = Handlebars.compile($("#myTemplate").html());
//       $("#handlebars").html(myTemplate(data));
//       var box = Handlebars.compile($("#box").html());
//       $("#box_li").html(box(data));
//     }
// });
for(var t= 0 ;t<data.length;t++){
   data[t].first = "";
   data[0].first="page-current";
   data[t].box = "";
   data[0].box = "current";
   var n = data[t].listen_type,
      title = data[t].listen_title,
      s = data[t].listen_style,
      answer = data[t].listen_answer;
   switch(n){
      case "1":data[t]["listen_name"]="关键词语选择";break;
      case "2":data[t]["listen_name"]="短对话理解"; break;
      case "3":data[t]["listen_name"]="长对话理解"; break;
      case "4":data[t]["listen_name"]="短文理解"; break;
      case "5":data[t]["listen_name"]="信息转换"; break;
   };
   if(title == ""){
     data[t].listen_title= data[t].listen_name;
   };
   switch(s){
        case "1":data[t]["selects_type"]="words";break;
        case "2":data[t]["selects_type"]="imgs"; break;
        case "3":data[t]["selects_type"]=""; break;
    };
    
};
Handlebars.registerHelper("addOne",function(index,options){
  return parseInt(index)+1;
});
Handlebars.registerHelper("choice",function(option_A,options){
  var sty =  option_A.slice(option_A.length-4,option_A.length);
  if(sty !== ".jpg"){
             //满足添加继续执行
             console.log(sty);
             return options.fn(this);
           }else{
             //不满足条件执行{{else}}部分
             return options.inverse(this);
           }
  });
var myTemplate = Handlebars.compile($("#myTemplate").html());
$("#handlebars").html(myTemplate(data));
var box = Handlebars.compile($("#box").html());
$("#box_li").html(box(data));


  $.init();
  //初始化结束
  //添加”dui“class

  //一些使用到的全局变量
  var dui=0;
  var cuo=0;
  var zong=$(".weida").find('b').html();
  //倒计时效果

  //页面翻转======这里的触摸还有一些问题，左滑的时候呈现出来的是右滑效果，是用了它原生的路由跳转的结果。
  $(".page").swipeLeft(function(){
      var flag=$(this).attr("id");
      console.log(flag);
      if (flag<$(".page").length) {
          $('.flex:eq('+flag+')').addClass('current').siblings().removeClass('current');
          flag++;
          $("#"+flag+"").find(".yeshu").html(""+flag+"/30");
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
      //交卷所要做到的携带内容与结果
      //首先将最后五道题发送给后台，然后将所有的错题和对题题号形成数组给后台，后台判断最后五道题的对错，返回我答案及分数

      // var last = $(".trans_input input").val()
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
 });
 $(".flex").tap(function(){//点击盒子切换页面
     var flag=$(this).html();
     $('.flex:eq('+(flag-1)+')'). addClass('current').siblings().removeClass('current');
     $("#"+flag+"").find(".yeshu").html(""+flag+"/1311");
     $.router.load("#"+flag+"");
   })
  //倒计时的实现
  //音频的实现
  //ajax事件的学习，需要用这个做一些事情

})
