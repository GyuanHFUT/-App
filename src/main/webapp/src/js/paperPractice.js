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
                         }, {
                              "listen_id":"2",
                              "listen_type":"5",
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
                       ] ;

data[0].first="page-current";
data[0].box = "current";

for(var t= 0 ;t<data.length;t++){
   var n = data[t].listen_type,
      title = data[t].listen_title,
      s = data[t].listen_style;

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
   var zong=30;//获取总题数
    select(dui,cuo,zong);                  
    shoucang();  //收藏部分！
    xiangjie();//详解打开和关闭
  //页面翻转===这里的触摸还有一些问题，左滑的时候呈现出来的是右滑效果，是用了它原生的路由跳转的结果。
  $(".page").swipeLeft(function(){
      var flag=$(this).attr("id");
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

  //选项选择后对应选项颜色样式的改变


 $(".flex").tap(function(){//点击盒子切换页面
     var flag=$(this).html();
     $('.flex:eq('+(flag-1)+')'). addClass('current').siblings().removeClass('current');
     $("#"+flag+"").find(".yeshu").html(""+flag+"/1311");
     $.router.load("#"+flag+"");
   });
  
  //ajax事件的学习，需要用这个做一些事情

})
