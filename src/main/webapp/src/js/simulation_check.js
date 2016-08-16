$(document).ready(function(){
    var data = $('#exam').html();
        data = JSON.parse(data);
        console.log(data);
    data[0].first="page-current";
    data[0].box = "current";
    for(var t= 0 ;t<data.length;t++){
       var n = data[t].listen_type,
          title = data[t].listen_question,
           s= data[t].listen_style,
          answer = data[t].listen_answer;
       switch(n){
          case 1:data[t]["listen_name"]="关键词语选择";break;
          case 2:data[t]["listen_name"]="短对话理解"; break;
          case 3:data[t]["listen_name"]="长对话理解"; break;
          case 4:data[t]["listen_name"]="短文理解"; break;
          case 5:data[t]["listen_name"]="信息转换"; break;
       };
       if(title == ""){
         data[t].listen_question= data[t].listen_name;
       };
       switch(s){
            case 1:data[t]["selects_type"]="words";break;
            case 2:data[t]["selects_type"]="imgs"; break;
            case 3:data[t]["selects_type"]=""; break;
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
        var len = data.length,
            errlen =0,
            trulen = 0,
            nolen =0;
  //js控制页面对错渲染及错题数渲染。
    for(var i= 0 ;i<data.length;i++){
        var sele =$( $('.page')[i]).find('.selects');
            switch(data[i].listen_answer){
                case 'A':$(sele).find('.select:eq(0)').addClass('dui');$(sele).find('.select:eq(0)').find('i').html('&#xe674;');break;
                case 'B':$(sele).find('.select:eq(1)').addClass('dui');$(sele).find('.select:eq(1)').find('i').html('&#xe674;') ;break;
                case 'C':$(sele).find('.select:eq(2)').addClass('dui');$(sele).find('.select:eq(2)').find('i').html('&#xe674;'); break;
                case '': ; break;
            };
        switch(data[i].exam_answer){
            case 'A':$(sele).find('.select:eq(0)').addClass('cuo');$(sele).find('.select:eq(0)').find('i').html('&#xe8a3;');break;
            case 'B':$(sele).find('.select:eq(1)').addClass('cuo');$(sele).find('.select:eq(1)').find('i').html('&#xe8a3;'); break;
            case 'C':$(sele).find('.select:eq(2)').addClass('cuo');$(sele).find('.select:eq(2)').find('i').html('&#xe8a3;');break;
            case '':  ; break;
        };
        switch(data[i].exam_judge){
            case 12:nolen++;break;
            case 21:errlen++;$($('#box_li').find('li')[i]).addClass('popcuo');break;
            case 22:trulen++;$($('#box_li').find('li')[i]).addClass('popdui');break;
        }
        if(data[i].form_url !=="" ){
            var number_ans = [data[i].first_answer,data[i].second_answer,data[i].three_answer,data[i].four_answer,data[i].five_answer],
                exam_ans =  [data[i].exam_first,data[i].exam_second,data[i].exam_three,data[i].exam_four,data[i].exam_five];
            for(var a = 0;a<number_ans.length;a++){
                if(number_ans[a] == exam_ans[a] ){
                    $($($('.page')[i]).find('.trans_input')[a]).removeClass('cuo').addClass('dui');
                    // $('.page')[i].find('.trans_input')[a].removeClass('cuo');
                    if(a==0){
                        $($('#box_li').find('li')[i]).removeClass('.popcuo');
                    }else{
                        var flexbox = a+26;
                        $('#box_li').find('ul').append('<li class="flex popdui">'+flexbox+'</li> ');
                    }
                }else {
                    if(a!==0){
                        errlen++;
                        var flexbox = a+26;
                        $('#box_li').find('ul').append('<li class="flex popcuo">'+flexbox+'</li> ');
                    }else{
                        $($('#box_li').find('li')[i]).addClass('trans');
                    }
                }
            }

        }
    }
    $('.page').find('.errorlen').html(errlen);
    $('.popup').find('.dacuo strong').html(errlen) ;
    $('.popup').find('.dadui strong').html(trulen) ;
    $('.popup').find('.weida strong').html(nolen) ;
    var audio = $('.audion');
    //音频控制
    $('.yinpinicon').tap(function(){
        var flag = $(this).parents('.page').attr('id')-1;
        $(this).find('.playn').toggle();
        $(this).find('.stopn').toggle();
       audio[flag].paused? audio_play(audio,flag): audio_paused(audio,flag);
    });
  //页面翻转======这里的触摸还有一些问题，左滑的时候呈现出来的是右滑效果，是用了它原生的路由跳转的结果。
  $(".page").swipeLeft(function(){
      var flag=$(this).attr("id");
      if (flag<$(".page").length-1) {
          audio_paused(audio,flag-1);
          audio[flag-1].currentTime= 0;
          $('.flex:eq('+flag+')').addClass('current').siblings().removeClass('current');
          flag++;
          $.router.load("#"+flag+"");
          $('.page').find('.stopn').show();
          $('.page').find('.playn').hide();
      }else{
          $.toast("已经是最后一题了")
      }
  });
  $(".page").swipeRight(function(){
     var flag=$(this).attr("id");
     if (flag>1) {
           audio_paused(audio,flag-1);
           audio[flag-1].currentTime= 0;
           flag--;
           $('.flex:eq('+(flag-1)+')').addClass('current').siblings().removeClass('current');
           $.router.load2("#"+flag+"");
         $('.page').find('.stopn').show();
         $('.page').find('.playn').hide();

     }else{
           $.toast("已经是第一题了")
     }
  });
    //主要还是那个内联id的问题=====完美解决,查找前面li个数,内联id，小意思啦
 $(".flex").tap(function(){//点击盒子切换页面
     stopYinpin(audio);
     $('.page').find('.stopn').show();
     $('.page').find('.playn').hide();
     var flaglen= $(this).prevAll().length;
         flaglen++;
     var flag =$(this).html();
     $('.flex:eq('+(flaglen-1)+')'). addClass('current').siblings().removeClass('current');
     if(flag>26){
         var yeshu =$('.trans').prevAll().length;
         yeshu++;
         $.router.load("#"+yeshu+"");
     }else{
         $.router.load("#"+flaglen+"");
     }
   });
  //音频的实现；完全一题一播放；
    function audio_play(audio,t){
        audio[t].play();
        audio[t].onended = function(){
            $('.playn').show();
            $('.stopn').hide();
        }
    }
    function audio_paused(audio,t){
        audio[t].pause();
    }
  //收藏的页面功能实现
    shoucang();
  //ajax事件的学习，需要用这个做一些事情

})
