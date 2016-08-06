// window.onload{
//   var name = getElementsByClassName('page-current').getElementsById(),
//   var href = getElementsByClassName('tab-item')

// }
$(document).ready(function () {
    $.init()
  $(document).on('click', '.open-preloader', function () {
          $.showPreloader();
          setTimeout(function () {
              $.hidePreloader();
          }, 2000);
        });
})