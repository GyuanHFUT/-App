
$(document).ready(function () {
    var data=[
    [{"listen_id":28,
    "listen_type":3,
    "listen_group":32,
    "listen_question":"dsfsd",
    "radio_url":"../src/audio/1.mp3",
    "listen_answer":"A",
    "option_A":"sdd",
    "option_B":"dddd",
    "option_C":"ddssss",
    "listen_score":1,
    "listen_degree":2,
   "yuanwen":"Is there anything wrong with you,Peter?",
"answer":"违反道路交通安全法，违反法律法规即为内联的新页面违法行为。官方已无违章/违规的说法。"
  },
    {
      "listen_id":29,
    "listen_type":3,
    "listen_group":32,
    "listen_question":"hgjh",
   "radio_url":"../src/audio/1.mp3",
    "listen_answer":"B",
    "option_A":"sjhkj",
    "option_B":"jjjj",
    "option_C":"kkkk",
    "listen_score":1,
    "listen_degree":3,
   "yuanwen":"Is there anything wrong with you,Peter?",
"answer":"违反道路交通安全法，违反法律法规即为内联的新页面违法行为。官方已无违章/违规的说法。"},
    {"listen_id":30,
    "listen_type":3,
    "listen_group":32,
    "listen_question":"jkl",
    "radio_url":"../src/audio/1.mp3",
    "listen_answer":"C",
    "option_A":"hghh",
    "option_B":"tryt",
    "option_C":"eeee",
    "listen_score":1,
    "listen_degree":2,
    "yuanwen":"Is there anything wrong with you,Peter?",
  "answer":"违反道路交通安全法，违反法律法规即为内联的新页面违法行为。官方已无违章/违规的说法。"}],


    [{"listen_id":9,"listen_type":3,"listen_group":31,"listen_question":"ertertertrr","radio_url":"../src/audio/2.mp3","listen_answer":"A","option_A":"sdfsd","option_B":"ddd","option_C":"ddddd","listen_score":1,"listen_degree":1,"listen_text":"听力作业","listen_explain":"完全"},{"listen_id":10,"listen_type":3,"listen_group":31,"listen_question":"saaaa","radio_url":"../src/audio/2.mp3","listen_answer":"C","option_A":"saszx","option_B":"vbnvb","option_C":"cccccc","listen_score":1,"listen_degree":1,"listen_text":"听力结束","listen_explain":"作业"}]]

      data[0][0].xx="page-current";
      data[0][0].box = "current";
      
       
       var flag=1;
       for (var t = 0; t <=data.length - 1 ; t++) {
            var jishu=flag+(data[t].length - 1);
            data[t][0].tishi="你将听到一篇短文，短文后有第"+flag+"至第"+jishu+"小题。请根据短文内容，在每小题所给的A.B.C三个选项中选出一个最佳选项。"
            for (var i= 0; i<=data[t].length - 1 ;i++) {
         var s=data[t][i].listen_answer; 
          switch (s)
          {
          case "A":
            data[t][i].A="dui";
            break;
          case "B":
            data[t][i].B="dui";
            break;
          case "C":
            data[t][i].C="dui";
            break;
          };
               data[t][i].tihao=flag;
               flag++;
            }
       } 

        var myTemplate = Handlebars.compile($("#myTemplate").html());
        var myTemplate2 = Handlebars.compile($("#myTemplate2").html());
        //注册一个Handlebars Helper,用来将索引+1，因为默认是从0开始的
        Handlebars.registerHelper("addOne",function(index,options){
          return parseInt(index)+1;
        });
        
        //将json对象用刚刚注册的Handlebars模版封装，得到最终的html，插入到基础table中。
        $('#handlebars').html(myTemplate(data));
        $('#hbs2').html(myTemplate2(data));
        $.init();

       var dui=0;
       var cuo=0;

       var zong=(flag-1);
       $(".weida").find('b').html(zong);

       $.each($(".yeshu"),function(i,val){
         var x= $(val).html();
         var y=x.replace(/1311/, zong);
          $(val).html(y);
       })



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
                  // $("#"+flag+"").find(".yeshu").html(""+flag+"/1311");

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
        
       $('.yinpinicon').tap(function(){
                    var $flag=$(this).parent().find('audio');  
                    var prev=$(this).parent().parent().parent().prev().find("audio");
                    var next=$(this).parent().parent().parent().next().find("audio");
                    var nextNext=$(this).parent().parent().parent().next().next().find("audio");
                      console.log($flag.attr("src")==prev.attr("src"));
                    if ($flag.attr("src")==prev.attr("src")) {
                           $(this).find('.stopn').toggle(); 
                           $(this).find('.playn').toggle();
                           if ($(".bofang")[0]) {
                              $(".bofang")[0].paused?$(".bofang")[0].play():$(".bofang")[0].pause();
                           }else{
                            $.toast("请从本题第一小题开始播放!");
                           }
                    }
                      else{
                          var flag=$flag[0]; 
                          $(flag).addClass("bofang");
                          $(".bofang")[0].paused?$(".bofang")[0].play():$(".bofang")[0].pause();
                                  $(this).find('.stopn').toggle(); 
                                  $(this).find('.playn').toggle();
                   }        
               });
                   var audio=document.getElementsByTagName('audio');

                  audio.onended = function() {
                          $('.playn').show();  
                          $('.stopn').hide(); 
                    };              
                function stopYinpin(){//停止音频
                  if (panduan) {
                    $("audio").removeClass("bofang");
                    for (var i = audio.length - 1; i >= 0; i--) {
                      audio[i].pause();
                    };

                  $('.playn').show();  
                  $('.stopn').hide();                      
                  };
            }
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
                })
                //收藏部分！
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
                //滑动翻页部分
                $(".page").swipeLeft(function(){
                  var $panduan=$(this).next().find('.tishi').html();
                  var patt=new RegExp("你将听到一篇短文");
                  panduan=patt.test($panduan);
                  console.log(panduan);
                  stopYinpin();
                  var flag=$(this).attr("id");
                  if (flag<$(".page").length) {
                  $('.flex:eq('+flag+')'). addClass('current') 
                       .siblings().removeClass('current');            
                  flag++;
                 
                  $.router.load("#"+flag+"");        
              }else{
                 $.toast("已经是最后一题了")
              }
             })
                $(".page").swipeRight(function(){
                  var $panduan=$(this).find('.tishi').html();
                  var patt=new RegExp("你将听到一篇短文");
                  panduan=patt.test($panduan);
                  console.log(panduan);
                  stopYinpin();         
                 var flag=$(this).attr("id");
                 if (flag>1) {
                     flag--;
                 $('.flex:eq('+(flag-1)+')'). addClass('current') 
                       .siblings().removeClass('current');           
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
                     stopYinpin();
                  $.router.load("#"+flag+"");        
                })
})
