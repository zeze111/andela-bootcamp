(function ($) {
  $(() => {

    $('.button-collapse').sideNav();

  }); // end of document ready
}(jQuery)); // end of jQuery name space

$(document).ready(() => {
  $('.materialboxed').materialbox();
});

$(document).ready(() => {
  $('.slider').slider({
    height: 300
  });
});

$(document).ready(() => {
  Materialize.updateTextFields();
});

$(document).ready(() => {
  $('select').material_select();
});

$('.dropdown-button').dropdown();
