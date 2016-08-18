
$(document).ready(function () {
  $.ajax({        //获取题目的json数据
        type: 'get',
        url: '/JuniorHearing/longDialogue/showAllLongDialogue',
        success: function(data){
            var data=data.longDialogue;
            data[0][0].xx="page-current";
            data[0][0].box = "current";


            var flag=1;
            for (var t = 0; t <=data.length - 1 ; t++) {
                var jishu=flag+(data[t].length - 1);
                data[t][0].tishi="请听下面一段对话，回答第"+flag+"至第"+jishu+"小题。"
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
            var zong=(flag-1);//获取总题数
            var panduan;//
            tiHuanZong (zong);

            select(dui,cuo,zong,sessionStorage.islogin);
            shoucang(sessionStorage.islogin);  //收藏部分！
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
            // var $audio=$('audio');
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
                var patt=new RegExp("请听下面一段对话");
                panduan=patt.test($panduan);
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
                var patt=new RegExp("请听下面一段对话");
                panduan=patt.test($panduan);
                stopYinpin();

                var flag=$(this).attr("id");
                if (flag>1) {
                    flag--;
                    $('.flex:eq('+(flag-1)+')'). addClass('current')
                        .siblings().removeClass('current');

                    $.router.load2("#"+flag+"");
                }
                else{
                    $.toast("已经是第一题了")
                }
            })
            //if(islogin){
            //    $("header a").attr("href",'/JuniorHearing/user/showUserMessage#practice');
            //}
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
})
