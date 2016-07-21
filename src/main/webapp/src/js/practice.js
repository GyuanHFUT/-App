$(document).ready(function () {
    $.init();
    console.log("哈哈哈");
    $(".playn").on('click',function(){
        $(".playn").hide();
        $(".stopn").show();
        var x = document.getElementsByClassName("audion");
        window,close();
        x.play();
    })
    $(".stopn").click(function(){
        $(".stopn").hide();
        $(".playn").show();
        $(".audion").pause();
    })

})