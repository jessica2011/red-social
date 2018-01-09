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
  

  window.fbAsyncInit = function() {
    FB.init({
      appId: '{your-app-id}',
      cookie: true,
      xfbml: true,
      version: '{latest-api-version}'
    });
      
    FB.AppEvents.logPageView();
  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  // Registro de usuarios
  $('#btn-sign').click(function() {
    var $valEmail = $('#email').val();
    var $valPassword = $('#password').val();
    firebase.auth().createUserWithEmailAndPassword($valEmail, $valPassword)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode);
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
        alert(errorCode);
        alert(errorMessage);
      });
  });

  $('#btn-face').click(function() {
    var provider = new firebase.auth.FacebookAuthProvider();


    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        var token = result.credential.accessToken;
      }
      var user = result.user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  });
});