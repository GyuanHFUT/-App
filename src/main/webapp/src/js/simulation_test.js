$(document).ready(function(){

var answer = [];
  $.ajax({
    type: 'get',
    url: '',
    success:function(data){
      var data = JSON.parse(data);
      data[0].first="page-current";
      data[0].box = "current";
      for(var t= 0 ;t<data.length;t++){
         var n = data[t].listen_type,
            title = data[t].listen_title,
            s = data[t].listen_style;
            answer[t] = data[t].listen_answer;
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
    }
});
// data[0].first="page-current";
// data[0].box = "current";
var answer = [];
// for(var t= 0 ;t<data.length;t++){
//    var n = data[t].listen_type,
//       title = data[t].listen_title,
//       s = data[t].listen_style;
//       answer[t] = data[t].listen_answer;
//    switch(n){
//       case "1":data[t]["listen_name"]="关键词语选择";break;
//       case "2":data[t]["listen_name"]="短对话理解"; break;
//       case "3":data[t]["listen_name"]="长对话理解"; break;
//       case "4":data[t]["listen_name"]="短文理解"; break;
//       case "5":data[t]["listen_name"]="信息转换"; break;
//    };
//    if(title == ""){
//      data[t].listen_title= data[t].listen_name;
//    };
//    switch(s){
//         case "1":data[t]["selects_type"]="words";break;
//         case "2":data[t]["selects_type"]="imgs"; break;
//         case "3":data[t]["selects_type"]=""; break;
//     };
// };
//
// Handlebars.registerHelper("addOne",function(index,options){
//   return parseInt(index)+1;
// });
// Handlebars.registerHelper("choice",function(option_A,options){
//   var sty =  option_A.slice(option_A.length-4,option_A.length);
//   if(sty !== ".jpg"){
//              //满足添加继续执行
//              return options.fn(this);
//            }else{
//              //不满足条件执行{{else}}部分
//              return options.inverse(this);
//            }
//   });
// var myTemplate = Handlebars.compile($("#myTemplate").html());
// $("#handlebars").html(myTemplate(data));
// var box = Handlebars.compile($("#box").html());
// $("#box_li").html(box(data));
  $.init();


  //初始化结束
  //添加”dui“class
  //一些使用到的全局变量
  var test_num=0,
      zong=$(".weida").find('strong').html(),
      personal = new Object;
      personal.wrong = new Array();
      personal.true = new Array();
      personal.trans = new Array();
      personal.opts = new Array();
  //倒计时效果
  var fm =3,
  lm = 0,
  fs = 0,
  ls = 0;
  var time = $('.time');
 // time[0].html()=fm +''+ lm + ':' + fs+'' + ls;
  setInterval(checkTime,1000);
  //页面翻转======这里的触摸还有一些问题，左滑的时候呈现出来的是右滑效果，是用了它原生的路由跳转的结果。
  audio_play();
  $('yinpinicon').tag(function(){
     $.alert('考试期间，请勿暂停音频')
  })
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
//交卷部分
  $(document).on('tap','.confirm-ok', function () {
    $.confirm('确定交卷?', function () {
      var pages =$('.page');
      var len = $('.page').length-1;
      var ne = $($('.page')[len]).find('input');
     $(ne).each(function(){
       var text = $(this).val();
        personal.trans.push(text);
      })
      console.log(personal);
      //
      // $.ajax({
      //   type: 'post',
      //   url: '',
     //    data:'personal',
     //   success:function(data){
      //     var success = JSON.parse(data);
      //     if(success){
      //         $.router.load("./grade.html");
      //     } else{
      //       return false;
      //     }
      //  },
       // error:function(){
       //    console.log('this is false!');
    // }
      // })
      //交卷所要做到的携带内容与结果
      //首先将最后五道题发送给后台，然后将所有的错题和对题题号形成数组给后台，后台判断最后五道题的对错，返回我答案及分数
      // var last = $(".trans_input input").val()

    });
  });
  //选项选择后对应选项颜色样式的改变
  $(".select").on('tap',function(){
        var parent  =  $(this).parent(),
            parents  =  $(this).parent().parent(),
            parentss=parents.parent();
        var x=parent.attr('value'),
            opt;
        var op = $(this).attr('value');
        var ans = answer[x];
            switch(ans){
              case 'A': opt='1';break;
              case 'B': opt='2';break;
              case 'C': opt='3';break;
            }
            x--;
        if(!parent.hasClass('yidian')){
           //没有点击过
           $(this).addClass('option');
           $('.flex:eq('+x+')').addClass('poplook');
           zong--;
           test_num++;
           parent.addClass('yidian');
           personal.opts[x] = $(this).attr('value');
           if(op == opt){
             personal.wrong.push(parent.attr('value'));
           }else{
             personal.true. push(parent.attr('value'));
           }
         }else if($(this).hasClass('option')){
           //双次点击
           $(this).removeClass('option');
           $('.flex:eq('+x+')').removeClass('poplook');
           zong++;
           test_num--;
           parent.removeClass('yidian');
           personal.opts.splice(x,1);
           if(op == opt){
             var s =parent.attr('value');
             personal.wrong.remove(s);
           }else{
              var s =parent.attr('value');
              personal.true.remove(s);
           }
         }else{
           //替换选项
           parent.find('.select').removeClass('option');
           $(this).addClass('option');
           personal.opts[x] = $(this).attr('value');
           var s =parent.attr('value');
           personal.wrong.remove(s);
           personal.true.remove(s);
           if(op == opt){
             personal.wrong.push(parent.attr('value'));
           }else{
             personal.true. push(parent.attr('value'));
           }
         }
        $(".test_num").find('strong').html(test_num);
        $(".weida").find('strong').html(zong);
     console.log(personal);
 });
 $(".flex").tap(function(){//点击盒子切换页面
     var flag=$(this).html();
     $('.flex:eq('+(flag-1)+')'). addClass('current').siblings().removeClass('current');
     $("#"+flag+"").find(".yeshu").html(""+flag+"/1311");
     $.router.load("#"+flag+"");
   });

  //倒计时的实现
  function checkTime(){
      if(fm == 0 && lm == 0 && fs == 0 && ls == 0){
          $.alert('时间到，请点击交卷', function () {
              $.router.load("./grade.html");
          });
      }else{
          fm = checkfm(fm,lm,fs,ls);
          lm = checklm(lm,fs,ls);
          fs = checkfs(fs,ls);
          ls = checkls(ls);
      }
      for (var j = 0; j < time.length; j++) {
          var each = time[j].innerHTML=fm +''+ lm + ':' + fs+'' + ls;
      }
      return each;
  };

  function checkls(ls){
     if(ls == 0){
        ls = 9;
     }else{
        ls--;
     }
     return ls;
   };
  function checkfs(fs,ls){
     if(fs == 0 && ls ==0){
       fs = 5;
     }else if(ls == 0){
       fs--;
     }else{
       return fs;
     }
     return fs;
   };
  function checklm(lm,fs,ls){
     if(lm == 0 && ls == 0 && fs == 0){
       lm = 9;
     }else if(ls== 0 &&fs == 0){
       lm--;
     }else{
       return lm;
     }
     return lm;
   };
  function checkfm(fm,lm,fs,ls){
     if(lm == 0 && fs == 0 && ls == 0 ){
       fm--;
     }
     return fm;
   };
   Array.prototype.remove = function(b) {
      var a = this.indexOf(b);
      if (a >= 0) {
      this.splice(a, 1);
      return true;
      }
      return false;
      };


  //音频的实现

function audio_play(){
   var audio = $(this).find('audio');
   audio[0].play();
   audio[0].onended = function(){
     $('.playn').show();
     $('.stopn').hide();
   }
}

  //ajax事件的学习，需要用这个做一些事情
})
