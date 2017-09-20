(function ($) {
  $(function () {

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function () {
  $('.materialboxed').materialbox();
});

$(document).ready(function () {
  $('.slider').slider({
    height: 300
  });
});

$(document).ready(function () {
  Materialize.updateTextFields();
});
