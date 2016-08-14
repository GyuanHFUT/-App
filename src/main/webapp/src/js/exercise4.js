
$(document).ready(function () {
  $.ajax({        //获取题目的json数据
        type: 'get',
        url: '/JuniorHearing/essay/showAllEssay',
        success: function(data){
        var data=data.essay;

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

            tiHuanZong (zong);
            var islogin;
            judgment2(islogin,function(islogin){
                select(dui,cuo,zong,islogin);
                if(islogin){
                    $("header a").attr("href",'/JuniorHearing/user/showUserMessage#practice');
                }
            });
            shoucang();  //收藏部分！
            xiangjie();//详解打开和关闭

            $('.yinpinicon').tap(function(){
                var $flag=$(this).parent().find('audio');
                var prev=$(this).parent().parent().parent().prev().find("audio");
                var next=$(this).parent().parent().parent().next().find("audio");
                var nextNext=$(this).parent().parent().parent().next().next().find("audio");
                console.log($flag.attr("src")==prev.attr("src"));
                if ($flag.attr("src")==prev.attr("src")) {
                    icon();
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
                    icon();
                }
            });
            var audio=document.getElementsByTagName('audio');
            stopNow(audio);
            function stopYinpin(){//停止音频
                if (panduan) {
                    $("audio").removeClass("bofang");
                    for (var i = audio.length - 1; i >= 0; i--) {
                        audio[i].pause();
                    };
                    icon();
                };
            }
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
                for (var i = audio.length - 1; i >= 0; i--) {
                    audio[i].pause();
                };
                $.router.load("#"+flag+"");
            })
        },
  })    
//    var data=[
//    [{"listen_id":28,
//    "listen_type":3,
//    "listen_group":32,
//    "listen_question":"dsfsd",
//    "radio_url":"../src/audio/1.mp3",
//    "listen_answer":"A",
//    "option_A":"sdd",
//    "option_B":"dddd",
//    "option_C":"ddssss",
//    "listen_score":1,
//    "listen_degree":2,
//   "yuanwen":"Is there anything wrong with you,Peter?",
//"answer":"违反道路交通安全法，违反法律法规即为内联的新页面违法行为。官方已无违章/违规的说法。"
//  },
//    {
//      "listen_id":29,
//    "listen_type":3,
//    "listen_group":32,
//    "listen_question":"hgjh",
//   "radio_url":"../src/audio/1.mp3",
//    "listen_answer":"B",
//    "option_A":"sjhkj",
//    "option_B":"jjjj",
//    "option_C":"kkkk",
//    "listen_score":1,
//    "listen_degree":3,
//   "yuanwen":"Is there anything wrong with you,Peter?",
//"answer":"违反道路交通安全法，违反法律法规即为内联的新页面违法行为。官方已无违章/违规的说法。"},
//    {"listen_id":30,
//    "listen_type":3,
//    "listen_group":32,
//    "listen_question":"jkl",
//    "radio_url":"../src/audio/1.mp3",
//    "listen_answer":"C",
//    "option_A":"hghh",
//    "option_B":"tryt",
//    "option_C":"eeee",
//    "listen_score":1,
//    "listen_degree":2,
//    "yuanwen":"Is there anything wrong with you,Peter?",
//  "answer":"违反道路交通安全法，违反法律法规即为内联的新页面违法行为。官方已无违章/违规的说法。"}],
//
//
//    [{"listen_id":9,"listen_type":3,"listen_group":31,"listen_question":"ertertertrr","radio_url":"../src/audio/2.mp3","listen_answer":"A","option_A":"sdfsd","option_B":"ddd","option_C":"ddddd","listen_score":1,"listen_degree":1,"listen_text":"听力作业","listen_explain":"完全"},{"listen_id":10,"listen_type":3,"listen_group":31,"listen_question":"saaaa","radio_url":"../src/audio/2.mp3","listen_answer":"C","option_A":"saszx","option_B":"vbnvb","option_C":"cccccc","listen_score":1,"listen_degree":1,"listen_text":"听力结束","listen_explain":"作业"}]]


})
