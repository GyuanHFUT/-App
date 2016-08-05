
$(document).ready(function () {

    var data = [
                          { 
                              "listen_id":1,
                              "listen_type":1,
                              "option_A": "sunshine",
                              "option_B": "big",
                              "option_C": "boy",
                              "listen_answer":"A",
                              "radio_url":"../src/audio/1.mp3",
                              "answer":"违反道路交通安全法，违反法律法规即为内联的新页面违法行为。官方已无违章/违规的说法。",
                              "yuanwen":"Is there anything wrong with you,Peter?"
                          },
                          {
                              "listen_id":2,
                              "listen_type":1,
                              "option_A": "sunshine",
                              "option_B": "big",
                              "option_C": "two",
                              "listen_answer":"B",
                              "radio_url":"../src/audio/1.mp3",
                              "answer":"违反道路交通安全法，违反法律法规即为内联的新页面违法行为。官方已无违章/违规的说法。",
                              "yuanwen":"Is there anything wrong with you,Peter?"
                          },
                          {
                              "listen_id":3,
                              "listen_type":1,
                              "option_A": "sunshine",
                              "option_B": "big",
                              "option_C": "three",
                              "listen_answer":"C",
                              "radio_url":"../src/audio/1.mp3",
                              "answer":"违反道路交通安全法，违反法律法规即为内联的新页面违法行为。官方已无违章/违规的说法。",
                              "yuanwen":"Is there anything wrong with you,Peter?"
                          }
                       ] ;
      data[0].xx="page-current";
      data[0].box = "current";
      
      for (var t = 0; t <=data.length - 1 ; t++) {
        var flag=data[t].listen_answer; 
        switch (flag)
        {
        case "A":
          data[t].A="dui";
          break;
        case "B":
          data[t].B="dui";
          break;
        case "C":
          data[t].C="dui";
          break;
        };

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
       var zong=data.length;//获取总题数
        $(".weida").find('b').html(zong);
        $.each($(".yeshu"),function(i,val){
         var x= $(val).html();
         var y=x.replace(/1110/, zong);
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
        
  //播放部分
                $('.yinpinicon').tap(function(){

                    $(this).find('.playn').toggle();  
                    $(this).find('.stopn').toggle();  
                    var $flag=$(this).parent().find('audio');  
                    var flag=$flag[0];        //转化成dom对象！
                    flag.paused ? flag.play() : flag.pause();        
               });
                  var $audio=$('audio');
                   var audio=$audio[0];  
                  audio.onended = function() {
                          $('.playn').show();  
                          $('.stopn').hide(); 
                    };              
                function stopYinpin(){
                  audio.pause(); 
                  $('.playn').show();  
                  $('.stopn').hide();  
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
                     // parents.find(".xiangjie-wapper").toggle(
                     //        ,
                     //        function(){ $(this).removeClass('active')}
                     //    ) 
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
                  var flag=$(this).attr("id");
                  if (flag<$(".page").length) {
                  $('.flex:eq('+flag+')'). addClass('current') 
                       .siblings().removeClass('current');            
                  flag++;
                  stopYinpin();
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
                 
                       stopYinpin();
                  $.router.load("#"+flag+"");        
                 }
                 else{
                    $.toast("已经是第一题了")
                 }
                })

                $(".flex").tap(function(){//点击盒子切换页面
                  stopYinpin();
                  var flag=$(this).html();       
                 $('.flex:eq('+(flag-1)+')'). addClass('current') 
                       .siblings().removeClass('current');           

                  $.router.load("#"+flag+"");        
                })
})
