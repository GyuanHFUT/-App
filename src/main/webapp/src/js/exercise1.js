
$(document).ready(function () {
       var dui=0;
       var cuo=0;
       var zong=$(".weida").find('b').html();
        
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
})

