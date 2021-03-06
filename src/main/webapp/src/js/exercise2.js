
$(document).ready(function () {
  $.ajax({        //获取题目的json数据
        type: 'get',
        url: '/JuniorHearing/shortDialogue/showAllShortDialogue',
        success: function(data){
            console.log(data);
            var data=data.shortDialogues;
            data[0].xx="page-current";
            data[0].box = "current";
            for (var t = 0; t <=data.length - 1 ; t++) {
                var flag=data[t].listen_answer,
                    s = data[t].listen_style;
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
                switch(s){
                    case 1:data[t]["selects_type"]="words";break;
                    case 2:data[t]["selects_type"]="imgs"; break;
                    case 3:data[t]["selects_type"]=""; break;
                };
                // var x="<li class="flex">"+(i+1)+"</li>";
                // $("#hbs2").append(x);
                //字符串拼接方法，待验证
            }
            console.log(data);
            //注册一个Handlebars模版，通过id找到某一个模版，获取模版的html框架
            //$("#table-template").html()是jquery的语法，不懂的童鞋请恶补。。。
            var myTemplate = Handlebars.compile($("#myTemplate").html());
            var myTemplate2 = Handlebars.compile($("#myTemplate2").html());
            //注册一个Handlebars Helper,用来将索引+1，因为默认是从0开始的
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
            //将json对象用刚刚注册的Handlebars模版封装，得到最终的html，插入到基础table中。
            $('#handlebars').html(myTemplate(data));
            $('#hbs2').html(myTemplate2(data));
            $.init();

            var dui=0;
            var cuo=0;
            var zong=data.length;//获取总题数
            tiHuanZong (zong);

            select(dui,cuo,zong,sessionStorage.islogin);
            shoucang();  //收藏部分！
            xiangjie();//详解打开和关闭
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
                    $.router.load2("#"+flag+"");
                }
                else{
                    $.toast("已经是第一题了")
                }
            })
            //if(islogin){
            //    $("header a").attr("href",'/JuniorHearing/user/showUserMessage#practice');
            //}
            box($audio);  //盒子切换
        },
  })
})
