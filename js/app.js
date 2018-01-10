$(document).ready(function() {
  // materialize
  $('.button-collapse').sideNav();
 
 

  

  /** formulario Registrar signUp**/
  var $btnSign = $('#btn-sign');
  var $email = $('#email');
  var $password = $('#password');
  // var $fullName = $('#full-name');
  // var $userName = $('#user-name');

  var validEmail = false; 
  var validPassword = false;  

  // Aqui indicar que se puede implementar la función como variable
  function activeButton() {
    if (validPassword && validEmail) {
      $btnSign.removeClass('disabled');
    }
  }

  function desactiveButton() {
    $btnSign.addClass('disabled');
  } 

  $password.on('input', function(event) {
    if ($password.val().length > 6) {
      validPassword = true;
      activeButton(); 
    } else {
      desactiveButton();
    }
  });

  $email.on('input', function(event) {
    var REGEXEMAIL = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;

    if (REGEXEMAIL.test($(this).val())) {
      validEmail = true;
      activeButton(); 
    } else {
      desactiveButton();
    }
  });

  $btnSign.on('click', function() {
    $(location).attr('href', '../views/perfil-user.html');
  });
});


