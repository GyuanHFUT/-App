
$(document).ready(function(){
        $.init();
        var fm =3,
            lm = 0,
            fs = 0,
            ls = 0;
        var answer = [],time,datas;
        var test_num=0,grade = 0,
            zong=$(".weida").find('strong').html(),
            personal = new Object;
            personal.wrong = new Object;
            personal.true = new Array();
            personal.trans = new Array();
        $.ajax({
            type: 'get',
            async : false,
            url: '/JuniorHearing/exam/showExamOfListen',
            success:function(data){
                datas = data;
                datapush(data);
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
            var len = $('.page').length-2;
            var inputlist = $($('.page')[len]).find('input');
            time = $('.time');
            timing();
            setInterval(checkTime,1000);
            //页面翻转======这里的触摸还有一些问题，左滑的时候呈现出来的是右滑效果，是用了它原生的路由跳转的结果。
            var audio = $('.audion');
            var flexbox = $('.flex');
            audio_play(audio);
            if(flexbox.length==26){
                for(var n=27;n<31;n++){
                    $('#box_li').append('<li class="flex">'+n+'</li> ');
                }
            };
            $('.yinpinicon').tap(function(){
                $.alert('考试期间，请勿暂停音频')
            });
            $(".page").swipeLeft(function(){
                var flag=$(this).attr("id");
                if (flag<$(".page").length-1) {
                    $('.flex:eq('+flag+')').addClass('current').siblings().removeClass('current');
                    flag++;
                    //$("#"+flag+"").find(".yeshu").html(""+flag+"/30");
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
                    // $("#"+flag+"").find(".yeshu").html(""+flag+"/30");
                    $.router.load("#"+flag+"");
                }else{
                    $.toast("已经是第一题了")
                }
            });
            //选项选择后对应选项颜色样式的改变
            $(".select").on('tap',function(){
                var parent  =  $(this).parent();
                    // parents  =  $(this).parent().parent();
                var x=parent.attr('value'),
                    lisid = parent.attr('listenid'),
                    opt;
                var op = $(this).attr('value');
                var ans = answer[x-1];
                switch(ans){
                    case 'A': opt='1';break;
                    case 'B': opt='2';break;
                    case 'C': opt='3';break;
                }
                x--;
                if(!parent.hasClass('yidian')){
                    //没有点击过,有错：错题加一
                    $(this).addClass('option');
                    $('.flex:eq('+x+')').addClass('poplook');
                    zong--;
                    test_num++;
                    parent.addClass('yidian');
                    if(op !== opt){
                        personal.wrong[lisid.toString()]=op;
                    }else{
                        personal.true. push(lisid);
                    }
                }else if($(this).hasClass('option')){
                    //双次点击，删除所有曾经的痕迹
                    $(this).removeClass('option');
                    $('.flex:eq('+x+')').removeClass('poplook');
                    zong++;
                    test_num--;
                    parent.removeClass('yidian');
                    if(op !== opt){
                        delete  personal.wrong[lisid.toString()];
                        // personal.wrong.splice(lisid+':'+op,1);
                    }else{
                        personal.true.remove(lisid);
                    }
                    console.log( personal.wrong);
                }else{
                    //替换选项，先删后加
                    parent.find('.select').removeClass('option');
                    $(this).addClass('option');
                    delete  personal.wrong[lisid.toString()];
                    personal.true.remove(lisid);
                    if(op !== opt){
                        personal.wrong[lisid.toString()]=op;
                    }else{
                        personal.true. push(lisid);
                    }
                }
                $(".test_num").find('strong').html(test_num);
                $(".weida").find('strong').html(zong);
            });
            //点击
            $(".flex").tap(function(){
                //点击盒子切换页面
                var flag=$(this).html();
                $('.flex:eq('+(flag-1)+')'). addClass('current').siblings().removeClass('current');
                if(flag>=26){
                    var yeshu =flag;
                       flag = 26;
                    $("#"+flag+"").find(".yeshu").html(yeshu+"/30");
                    $.router.load("#"+flag+"");
                }else{
                    $.router.load("#"+flag+"");
                }
            });
            //点击弹框26-30题改变
            $(".open-popup").tap(function(){
                console.log(inputlist);
                $(inputlist).each(function(){
                    var text = $(this).val();
                    var test = $(this).parent().html();
                        test = test.split('.',1)-1;
                    if(text !==''){
                        $('.flex:eq('+test+')').addClass('poplook');
                    }else{
                        $('.flex:eq('+test+')').removeClass('poplook');
                    }
                });
            });
            //交卷部分
            $(document).on('tap','.confirm-ok', function () {
                $.confirm('确定交卷?', function () {
                    submit_paper(datas);
                    });
                    //交卷所要做到的携带内容与结果
                    //首先将最后五道题发送给后台，然后将所有的错题和对题题号形成数组给后台，后台判断最后五道题的对错，返回我答案及分数
                });
            $(".return").on('tap',function(){
                $.confirm('正在考试中，退出此次考试将无效', function () {
                    $.router.load("/JuniorHearing/user/showUserMessage");
                });

            });

  //初始化结束
  //添加”dui“class
  //一些使用到的全局变量
   function datapush(data){
        console.log(data);
        data[0].first="page-current";
        data[0].box = "current";
        for(var t= 0 ;t<data.length;t++){
            var n = data[t].listen_type,
                title = data[t].listen_question,
                s = data[t].listen_style;
            answer[t] = data[t].listen_answer;
            switch(n){
                case 1:data[t]["listen_name"]="关键词语选择";break;
                case 2:data[t]["listen_name"]="短对话理解"; break;
                case 3:data[t]["listen_name"]="长对话理解"; break;
                case 4:data[t]["listen_name"]="短文理解"; break;
                case 5:data[t]["listen_name"]="信息转换"; break;
            };
            if(title ==null){
                data[t].listen_question= data[t].listen_name;
            };
            switch(s){
                case 1:data[t]["selects_type"]="words";break;
                case 2:data[t]["selects_type"]="imgs"; break;
                case 3:data[t]["selects_type"]=""; break;
            };
        };
        answer[25]=[data[25].first_answer,data[25].second_answer,data[25].three_answer,data[25].four_answer,data[25].five_answer]
    };

  //倒计时效果
   function timing(){
        time[0].innerHTML=fm +''+ lm + ':' + fs+'' + ls;
    }


  //倒计时的实现
  function checkTime(){
      if(fm == 0 && lm == 0 && fs == 0 && ls == 0){
              $.toast('时间到，系统将强制交卷');
              audio_paused(audio);
              submit_paper(datas);
      }else{
          fm = checkfm(fm,lm,fs,ls);
          lm = checklm(lm,fs,ls);
          fs = checkfs(fs,ls);
          ls = checkls(ls);
      }
      for (var j = 0; j < time.length; j++) {
          time[j].innerHTML =fm +''+ lm + ':' + fs+'' + ls;
      }
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
    function audio_play(audio){
       audio[0].play();
       audio[0].onended = function(){
         $('.playn').show();
         $('.stopn').hide();
       }
    }
    function audio_paused(audio){
            audio[0].pause();
    }
    // window.onload=function (){
        // console.log(time);
        // return setInterval(checkTime(time,fm,lm,fs,ls),1000);
    // }

  //ajax事件的学习，需要用这个做一些事情
function submit_paper(data){
    audio_paused(audio);
    console.log(data);
    var traid = data[len].listen_id;
    var  judgment =true;
    var num = new Object;
    var x =0;
    $(inputlist).each(function(){
        var text = $(this).val();
        personal.trans.push(text);
    });
    for(var z=0;z< personal.trans.length;z++){
        if(answer[25][z]!== personal.trans[z]){
            x++;
            judgment = false;
            num[z.toString()]= personal.trans[z];
        }
    };
    if(judgment){
        personal.true.push(traid);
    }else{
        personal.wrong[traid.toString()]= num;
    }
    grade =  personal.true.length + 5 - x;
    $('#grade').find('.tips span').html(grade);
    var str = JSON.stringify(personal);
    var datas ={data:str};
    console.log(str);
    $.ajax({
        type: 'post',
        url: '/JuniorHearing/exam/acceptExamOfMessage',
        data:datas,
        success:function(data){
            if(data.success){
                $.router.load("./simulation_test.html#grade");
            } else{
                console.log("出错啦！！！");
                return false;
            }
        },
        error:function(){
            console.log('this is false!');
        }
    });
}
})
