
$(document).ready(function () {

    $(".select").one('click',function(){
        var x=$(this).attr('value');
        var tihao=parseInt(x);
        // var flag=$(tihao).attr('value');
        var parents  =  $(this).parent().parent();
        var parentss=parents.parent();   
        console.log(x);     
        // console.log($('.flex[value="x"]'));   
        // console.log( $('.flex[value="1"]'));  
       console.log( $('.flex:eq(1)'))
       console.log( $('.flex:eq(tihao)'))
        if ($(this).hasClass("dui")) {
            $(this).find('i').html('&#xe61b;');
            //在popup层找到相对应的box改变颜色！
            $(this).addClass("duicolor");

            // $('.flex[value='1']').addClass("popdui");
            $('.flex[value="tihao"]').addClass("popdui");
            //自动下一页，然后改变box当前页面，并且播放语音
        }
        else{
             $(this).addClass("cuocolor");
             $(this).find('i').html('&#xf0011');
             var parent  =  $(this).parent();
            $('.flex[value=tihao]').addClass("popcuo");
              for (var i =parent.find(".select ").length - 1; i >= 0; i--) {
                var a=parent.find(".select ")[i];
                 if ($(a).hasClass("dui")) 
                    {
                       $(a).addClass("duicolor");
                    };
                     parents.find(".xiangjie-wapper").show();
                     parentss.find(".open-xiangjie").addClass("active");
                }
        }})
})

