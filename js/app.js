
$(document).ready(function() {
  // materialize
  $('.button-collapse').sideNav();
  $('.modal').modal();


  var $btnPublicar = $('#btn-publicar');
  var $txArea = $('#textarea1');

  /* Activar boton publicar */
  $txArea.keyup(function() {
    var longTxArea = $txArea.val().length;
    longTxArea >= 1 ? activeButton() : desactiveButton();
  });


  // Aqui indicar que se puede implementar la función como variable
  function activeButton() {
    $btnPublicar.removeClass('disabled');  
  }
  function desactiveButton() {
    $btnPublicar.addClass('disabled');
  }
});