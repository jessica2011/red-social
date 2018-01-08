
$(document).ready(function() {
  // materialize
  $('.button-collapse').sideNav();
  $('.modal').modal();

  // firebase
  var config = {
    apiKey: 'AIzaSyDPvJ1_QFhfrqTmC-v0DvGvi7BRUUCHrZ8',
    authDomain: 'redsocial-f8ee9.firebaseapp.com',
    databaseURL: 'https://redsocial-f8ee9.firebaseio.com',
    projectId: 'redsocial-f8ee9',
    storageBucket: 'redsocial-f8ee9.appspot.com',
    messagingSenderId: '785750535804'
  };
  firebase.initializeApp(config);


  $('#btn-enviar').click(function() {
    var $valEmail = $('#email').val();
    var $valContraseña = $('#contraseña').val();
    firebase.auth().createUserWithEmailAndPassword($valEmail, $valContraseña)
      .catch(function(error) {
      // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      // ...
      });
  });
 

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