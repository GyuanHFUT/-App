
$(document).ready(function () {
    
    $(".stopn").click(function(){
        $(".stopn").hide();
        $(".playn").show();
        zhanting();
    })
    
    // function adddui (arr){
    //     for (var i = arr.length - 1; i >= 0; i--) {
    //         if(arr[i].hasClass("dui")) {
    //             $(".select")[i].addClass("duicolor");
    //         }
    //     };
    // }
    $(".select").one('click',function(){
        if ($(this).hasClass("dui")) {
            $(this).find('i').html('&#xe61b;');
            //在popup层找到相对应的box改变颜色！
            $(this).addClass("duicolor");
            //自动下一页
        }
        else{
             $(this).addClass("cuocolor");
             $(this).find('i').html('&#xf0011');
             var parent  =  $(this).parent();

              for (var i =parent.find(".select ").length - 1; i >= 0; i--) {
                var a=parent.find(".select ")[i];
                 if ($(a).hasClass("dui")) 
                    {
                       $(a).addClass("duicolor");
                    };
                 $(".xiangjie-wapper").show();
                }
        }})

})

