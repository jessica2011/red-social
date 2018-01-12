// materialize
$(document).ready(function() {
  $('.button-collapse').sideNav();
  $('.modal').modal();
});

// Enlazar los link de signUp y login
$(document).ready(function() {
  $('.enlace-signUp-js').click(function() {
    $('#initial').addClass('hide');
    $('#signUp').removeClass('hide');
  });
  $('.enlace-login-js').click(function() {
    $('#initial').addClass('hide');
    $('#login').removeClass('hide');
  });
  $('.a-login-js').click(function() {
    $('#signUp').addClass('hide');
    $('#login').removeClass('hide');
  });
  $('.a-signUp-js').click(function() {
    $('#login').addClass('hide');
    $('#signUp').removeClass('hide');
  });
});

// comentar el perfil de usuario

// perfil del user

var $btnPublicar = $('#btn-comment');
var $txArea = $('#textarea1');
var $box = $('#box-content');

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

$btnPublicar.on('click', function() {
  if ($txArea.val()) {
    $box.prepend('<div class="card-action p-10"><div class="row row1"><div id ="comentario" class="input-field m-0"><a class = "prefix"><img src="../assets/images/user.png" class="photo-perfil-circule"></a></div></div></div>');
    var $txt = $('#comentario');
    var $parrafo = $('<p/>', { 'class': 'col s10 m11 right m-0 w-wrap p-10 white l10' });
    $parrafo.text($txArea.val());
    $txt.prepend($parrafo);
    $txArea.val('');
    $txArea.focus();
  }
});

// Cargando nuevo post con foto del dispositivo
$('#btn-modal-publicar').click(function() {
  var photo = $('#img-file').attr('src');
  var textPost = $('#textarea2').val();
  $('#box-posteo').prepend(`
  <section id="box-posteo" class="container">
  <div class="row">
    <div class="card sticky-action col s12 l6 offset-l3  light-blue lighten-5">
      <div class="card-image waves-effect waves-block waves-light"><img class="activator" src="../assets/images/outfits1.jpg"></div>
      <div id="insert-title" class="card-action p-10">
        <h5>Outfits con estilo</h5>
        <p>Creado por <a href="#" class="create c-aquamar">paula.m.ramosr.14</a></p>
      </div>
      <div class="card-action p-10">  
        <span class="center-align f-size-10 col s4"><i class="material-icons pointer c-aquamar">favorite_border</i></span>
        <span class="center-align f-size-10 col s4"><i class="material-icons pointer c-aquamar">comment</i></span>
        <span class="center-align f-size-10 col s4 activator"><i class="material-icons pointer c-aquamar"> more_vert</i></span>
        <br>
      </div>
      <div class="card-reveal" id="insert-comment">
        <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
        <div id="textoPublicado"><div>
      </div>
      <div class="card-action p-10">
        <div class="row row1">
          <form class="input-field">
            <a href="#" class="prefix" id="photo">photo</a> 
            <a id="btn-comment" class="btn btn-pub bg-aquamar right disabled">Publicar</a>
            <textarea id="textarea1" class="materialize-textarea col s7 m9 l7 right" placeholder="Escribe un comentario..."></textarea>     
          </form>
        </div>  
      </div>
      <div id="box-content" class="comentarios">
      </div>
    </div>
  </div>
</section>`);
});

// modal2---> postear 


// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCBWu6u5irD8qmyjD6vmz8hiUSvzSHCRqs',
  authDomain: 'chicandfree-40254.firebaseapp.com',
  databaseURL: 'https://chicandfree-40254.firebaseio.com',
  projectId: 'chicandfree-40254',
  storageBucket: 'chicandfree-40254.appspot.com',
  messagingSenderId: '863256280939'
};
firebase.initializeApp(config);

// Ingresando con GOOGLE+
var provider = new firebase.auth.GoogleAuthProvider();
$('.btnGoogle-js').click(function() {
  firebase.auth()
    .signInWithPopup(provider)
    .then(function(result) {
      console.log(result.user);// gg
      saveData(result.user);
      $('#photo-user-js').append('<img class="circle" src=\'' + result.user.photoURL + '\'/>');
      window.location.href = '../views/home.html';
      var token = result.credential.accessToken;
      var user = result.user;
    });
});

// guarda automáticamente la infrmación del usuario al logearse con google+

function saveData(user) {
  var usuario = {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photo: user.photoURL
  };
  firebase.database().ref('informationUser/' + user.uid)
    .push(usuario);
}

// escribir en la base de datos
// $('#ggg').click(function() {
//   firebase.database().ref('informationUser')
//     .set({
//       nombre: 'jessS',
//       edad: '18',
//       sexo: 'masculino'
//     });
// });

// Aqui leo la BD
firebase.database().ref('informationUser')
  .on('child_added', function(s) {
    var user = s.val();
    $('#photo-user-js').append('<img class="circle" src=\'' + user.foto + '\'/>');
  });

// Registro de usuarios (signUp)
$('#btn-signUp-js').click(function(event) {
  // event.preventDefault();
  var $valEmail = $('#email').val();
  var $valPassword = $('#password').val();
  firebase.auth().createUserWithEmailAndPassword($valEmail, $valPassword)
    .then(function(result) {
    // alert('Autentificación correcta');
      window.location.href = '../views/home.html';
    // verifyAccount();
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert('Ya está registrado');
    });
});

// iniciar sesión de usuario
$('#btn-login-js').click(function() {
  var $valEmail2 = $('#email2').val();
  var $valPassword2 = $('#password2').val();
  firebase.auth().signInWithEmailAndPassword($valEmail2, $valPassword2)
    .then(function(result) {
      // alert('Autentificación correcta');
      window.location.href = '../views/home.html';
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('Credenciales Incorrectas, Ingrese Nuevamente');
    });
});

function observador() {
  var $userName = $('#nombre');
  var $photoUser = $('#photo-user-js') ;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Existe usuario activo');
      // nameUser(user);
      // logear(user);
      // User is signed in.
      var displayName = user.displayName;
      console.log(displayName);
      var email = user.email;
      console.log('******************');
      console.log(user.emailVerified);
      console.log('******************');
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      $userName.html(name);
      $photoUser.attr('src', photoURL);
      // ...
    } else {
      console.log('no existe usuario activo');
    }
  });
}
observador();

// function logear(user) {
//   if (user.emailVerified) {
//     window.location.href = '../views/home.html';
//   }
// }

// cierra sesion del usuario
$('.signOff-js').click(function() {
  firebase.auth().signOut()
    .then(function() {
      console.log('saliendo..');
      window.location.href = '../index.html';
    })
    .catch(function(error) {
      console.log(error);
    });
}); 

// verificar la cuenta por el email 
function verifyAccount() {
  var user = firebase.auth().currentUser;
  
  user.sendEmailVerification().then(function() {
    console.log('enviando correo de verificación');
  }).catch(function(error) {
    console.log(error);
  });
}

// locando nombre de usurio segun su correo 

// function nameUser(user) {
//   $('.name-user-js').innerHtml = `${user.email}`;
// }


