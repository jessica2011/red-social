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

  // Registro de usuarios
  $('#btn-sign').click(function() {
    var $valEmail = $('#email').val();
    var $valPassword = $('#password').val();
    firebase.auth().createUserWithEmailAndPassword($valEmail, $valPassword)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
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
        console.log(errorMessage);
      });
  });


  function ingresoFacebook() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('public_profile');
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accesstoken;
        var user = result.user;
        console.log(user);
        var name = result.user.displayName;
        
        $('#btn-sign').on('click', function() {
          $(location).attr('href', '../views/perfil-user.html');
        });
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var erroremail = error.email;
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('Es rl mismo usuario');
        }
      });
    } else {
      firebase.auth().signOut();
    }
  }
  $('.btn-face').on('click', ingresoFacebook);


  // perfil
});  


