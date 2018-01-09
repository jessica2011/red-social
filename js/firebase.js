$(document).ready(function() {
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

  // Registro de usuarios
  $('#btn-sign').click(function() {
    var $valEmail = $('#email').val();
    var $valPassword = $('#password').val();
    firebase.auth().createUserWithEmailAndPassword($valEmail, $valPassword)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
      });
  });

  // iniciar sesión de usuario
  $('#btn-login').click(function() {
    var $valEmail2 = $('#email2').val();
    var $valPassword2 = $('#password2').val();
    firebase.auth().signInWithEmailAndPassword($valEmail2, $valPassword2)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
      });
  });
});