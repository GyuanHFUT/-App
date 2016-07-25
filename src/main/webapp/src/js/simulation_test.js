$(document).ready(function(){
  var data ={
    "title":"专项学习"
  };
  var myTemplate = Handlebars.compile($("#myTemplate").html());
  $("#content").html(myTemplate(data));
  $.init();
  $(document).on('click','.confirm-ok', function () {
    $.confirm('确定交卷?', function () {
      $.router.load("./grade.html");
    });
  });

})
