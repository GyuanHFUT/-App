$(document).ready(function(){
    $.init();
    // [
    //     {
    //         "listen_id":1,
    //         "listen_type":1,
    //         "listen_style":1,
    //         "listen_group":0,
    //         "listen_question":null,
    //         "radio_url":"../src/audio/1.mp3",
    //         "form_url":null,
    //         "option_A":"received",
    //         "option_B":"got",
    //         "option_C":"heard",
    //         "listen_answer":"A",
    //         "listen_text":"听力第一题",
    //         "listen_explain":"不应该这样做",
    //         "first_answer":null,
    //         "second_answer":null,
    //         "three_answer":null,
    //         "four_answer":null,
    //         "five_answer":null,
    //         "listen_score":1,
    //         "listen_degree":2,
    //         "listen_exam":1,
    //         "exam_radio":"../src/audio/1.mp3"
    //     }
    // ]
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
    var len = data.length, dui=0, cuo=0;
    var zong=len;//获取总题数
   $('.page').find('.wronglen').html(data.length);
    selects(dui,cuo,zong);
    shoucang();  //收藏部分！
    xiangjie();//详解打开和关闭

// 点击事件
$('input').focus(function(){
    if($("input").blur(function(){

        console.log($(this));
        console.log("hhhe");
        // $("input").css("background-color","#D6D6FF");
    });
}) ;
    //点击选项判断对错
    function  selects(dui,cuo,zong){
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
                    $(".dadui").find('strong').html(dui);
                    $(".weida").find('strong').html(zong);
                    parent.addClass('yidian');
                    var flag=parentss.attr("id");
                    if (flag<$(".page").length) {
                        $('.flex:eq('+flag+')'). addClass('current')
                            .siblings().removeClass('current');
                        flag++;

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
                    $(".dacuo").find('strong').html(cuo);
                    $(".weida").find('strong').html(zong);
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
    }
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
            $.router.load("#"+flag+"");
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
