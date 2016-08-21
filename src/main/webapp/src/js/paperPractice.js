$(document).ready(function(){
    $.ajax({        //获取题目的json数据
        type: 'get',
        url: '/JuniorHearing/exam/showExamOfListen',
        success: function(data){
            console.log(data);
            data[0].first="page-current";
            data[0].box = "current";
            data[15].tishi="请听下面一段对话，回答第16至第17小题。";
            data[17].tishi="请听下面一段对话，回答第18至第20小题。";
            data[20].tishi="请听下面一段对话，回答第21至第25小题。";
            for(var t= 0 ;t<data.length;t++){
                var n = data[t].listen_type,
                    title = data[t].listen_question,
                    s = data[t].listen_style;
                flag=data[t].listen_answer;
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
                switch(n){
                    case 1:data[t]["listen_name"]="关键词语选择";break;
                    case 2:data[t]["listen_name"]="短对话理解"; break;
                    case 3:data[t]["listen_name"]="长对话理解"; break;
                    case 4:data[t]["listen_name"]="短文理解"; break;
                    case 5:data[t]["listen_name"]="信息转换"; break;
                };
                if(title == null){
                    data[t].listen_question = data[t].listen_name;
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
            //初始化结束
            //添加”dui“class
            //一些使用到的全局变量
            var dui=0;
            var cuo=0;
            var zong=30;//获取总题数

            select(dui,cuo,zong,sessionStorage.islogin);
            shoucang();  //收藏部分！
            xiangjie();//详解打开和关闭

            //播放部分
            $('.yinpinicon').tap(function(){
                var $flag=$(this).parent().find('audio');
                var prev=$(this).parent().parent().parent().prev().find("audio");
                var next=$(this).parent().parent().parent().next().find("audio");
                var nextNext=$(this).parent().parent().parent().next().next().find("audio");
                console.log($flag.attr("src")==prev.attr("src"));
                if ($flag.attr("src")==prev.attr("src")) {

                    if ($(".bofang")[0]) {
                        icon();
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
            //$('.yinpinicon').tap(function(){
            //    var $flag=$(this).parent().find('audio');
            //    var prev=$(this).parent().parent().parent();
            //    var now=$(prev).attr("id");
            //    console.log(now);
            //    if (now>16) {};
            //    $(this).find('.playn').toggle();
            //    $(this).find('.stopn').toggle();
            //    var $flag=$(this).parent().find('audio');
            //    var flag=$flag[0];        //转化成dom对象！
            //    flag.paused ? flag.play() : flag.pause();
            //});
            var $audio=$('audio');
            stopNow($audio);
            //滑动翻页部分
            $(".page").swipeLeft(function(){

                var $panduan=$(this).next().find('.tishi').html();
                var patt=new RegExp("请听下面一段对话");
                panduan=patt.test($panduan);
                console.log(panduan);
                if(panduan){
                stopYinpin($audio);
                }
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
                if(panduan){
                    stopYinpin($audio);
                }
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
            //    $("header a").attr("href",'/JuniorHearing/user/showUserMessage');
            //}

            var flexbox = $('.flex');
            if(flexbox.length==26){
                for(var n=27;n<31;n++){
                    $('#box_li').append('<li class="flex">'+n+'</li> ');
                }
            };
            $(".flex").tap(function(){//点击盒子切换页面
                stopYinpin($audio);
                var flag=$(this).html();
                $('.flex:eq('+(flag-1)+')'). addClass('current')
                    .siblings().removeClass('current');
                if(flag>=26){
                    var yeshu =flag;
                    flag = 26;
                    $("#"+flag+"").find(".yeshu").html(yeshu+"/30");
                    $.router.load("#"+flag+"");
                }else{
                    $.router.load("#"+flag+"");
                }
            })
            //点击弹框26-30题改变

            }})
})
