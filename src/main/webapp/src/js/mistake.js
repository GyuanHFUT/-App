$(document).ready(function(){
    $.init();
    var data = $('#exam').html();
    data = JSON.parse(data);
    console.log(data);
})