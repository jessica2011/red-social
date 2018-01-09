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


  /** formulario Registrar**/
  var $btnSign = $('#btn-sign');
  var $email = $('#email');
  var $password = $('#password');
  var $fullName = $('#full-name');
  var $userName = $('#user-name');

  var valEmail = false;
  var valPassword = false;
  var valfullName = false; 
  var valUserName = false;  
  
  
  // Aqui indicar que se puede implementar la función como variable
  function activeButtonSignUp() {
    // ojo quite valfullName y valUserName en el if
    if (valEmail && valPassword) {
      $btnSign.removeClass('disabled');
    }
  }
  
  function desactiveButtonSignUp() {
    $btnSign.addClass('disabled');
  } 
  
  $fullName.on('input', function(event) {
    if ($fullName.val().length > 2) {
      valfullName = true;
      activeButtonSignUp(); 
    } else {
      desactiveButtonSignUp();
    }
  });
  
  $userName.on('input', function(event) {
    if ($userName.val().length > 2) {
      valUserName = true;
      activeButtonSignUp(); 
    } else {
      desactiveButtonSignUp();
    }
  });
  
  $email.on('input', function(event) {
    var REGEXEMAIL = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
  
    if (REGEXEMAIL.test($(this).val())) {
      valEmail = true;
      activeButtonSignUp(); 
    } else {
      desactiveButtonSignUp();
    }
  });

  function valideEmail(event) {

  }
    
  $password.on('input', function(event) {
    if ($password.val().length > 6) {
      valPassword = true;
      activeButtonSignUp(); 
    } else {
      desactiveButtonSignUp();
    }
  });

  
  /** formulario Ingresar**/
  var $btnLogin = $('#btn-login');
  var $email2 = $('#email2');
  var $password2 = $('#password2');

  var valEmail2 = false;
  var valPassword2 = false;

  function activeButtonLogin() {
    // ojo quite valfullName y valUserName en el if
    if (valEmail2 && valPassword2) {
      $btnLogin.removeClass('disabled');
    }
  }
  
  function desactiveButtonLogin() {
    $btnLogin.addClass('disabled');
  }

  $email2.on('input', function(event) {
    var REGEXEMAIL = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
  
    if (REGEXEMAIL.test($(this).val())) {
      valEmail2 = true;
      activeButtonLogin(); 
    } else {
      desactiveButtonLogin();
    }
  });

  function valideEmail(event) {

  }
    
  $password2.on('input', function(event) {
    if ($password2.val().length > 6) {
      valPassword2 = true;
      activeButtonLogin(); 
    } else {
      desactiveButtonLogin();
    }
  });

  // function readURL(input) {
  //   if (input.files && input.files[0]) {
  //     var reader = new FileReader();
  //     reader.onload = function(event) {
  //       $('#img-file')
  //         .attr('src', event.target.result);
  //     };
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // }
});


