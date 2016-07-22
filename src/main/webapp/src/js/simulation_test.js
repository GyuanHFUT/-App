// window.onload=function(){
//    alert("hah");
//   $.init();
//    var data ={
//      "title":"专项学习"
//    };
//
//    var myTemplate = Handlebars.compile($("#myTemplate").html());
//    $("#12").html(myTemplate(data));
//
// }
$(document).ready(function(){
  var data ={
    "title":"专项学习"
  };
  console.log(data);
  var myTemplate = Handlebars.compile($("#myTemplate").html());
  $("#content").html(myTemplate(data));
$.init();
            // function show(t) {
            //      $("#content").html(t);
            //     }
            //
            //  var view = {
            //        title: 'YZF',
            //        cacl: function () {
            //           return 6 + 4;
            //        }
            //  };
            //  $("#content").html(Mustache.render("{{title}} spends {{cacl}}", view));


})
