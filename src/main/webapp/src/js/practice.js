
$(document).ready(function () {
    $.init();
    function bofang()
        {
        var x = document.getElementById("audion");
        x.play();
        }
        function zhanting()
        {
        var x = document.getElementById("audion");
        x.pause();
        }
    console.log("哈哈哈");
    $(".playn").on('click',function(){
        $(".playn").hide();
        $(".stopn").show();
        bofang();
        // $(".stopn").style.display="block";
        // var x = document.getElementsByClassName("audion");
        // x.play();
    })
    $(".stopn").click(function(){
        $(".stopn").hide();
        $(".playn").show();
        zhanting();
    })

})