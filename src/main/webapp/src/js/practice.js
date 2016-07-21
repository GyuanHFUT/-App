$(document).ready(function () {
    $.init();
    console.log("哈哈哈");
    $(".playn").click(function(){
        $(".playn").hide();
        $(".stopn").show();
        $(".audion").play();
    })
    $(".stopn").click(function(){
        $(".stopn").hide();
        $(".playn").show();
        $(".audion").stop();
    })

})