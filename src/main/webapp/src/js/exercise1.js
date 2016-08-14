
$(document).ready(function () {
  $.ajax({        //获取题目的json数据
        type: 'get',
        url: '/JuniorHearing/word/showAllWord',
        success: function(data){
            if(data.success){
               var data=data.word;
               console.log(data);
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
                var islogin = judgment2();
                select(dui,cuo,zong,islogin);
                tiHuanZong (zong);
                shoucang();  //收藏部分！
                xiangjie();//详解打开和关闭

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
                stopNow($audio);

                //滑动翻页部分
                $(".page").swipeLeft(function(){
                    var flag=$(this).attr("id");
                    if (flag<$(".page").length) {
                        $('.flex:eq('+flag+')'). addClass('current')
                            .siblings().removeClass('current');
                        flag++;
                        stopYinpin($audio);
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

                        stopYinpin($audio);
                        $.router.load("#"+flag+"");
                    }
                    else{
                        $.toast("已经是第一题了")
                    }
                })
                box($audio);
                if(islogin){
                    $("header a").attr("href",'/JuniorHearing/user/showUserMessage#practice');
                }
            }else{
                $toast("抽题失败！")
            }

        },
  })
})
