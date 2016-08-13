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
})