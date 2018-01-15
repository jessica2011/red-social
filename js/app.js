// materialize
$(document).ready(function() {
  $('.button-collapse').sideNav();
  $('.modal').modal();
});

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
      $('.photo-user-js').append('<img class="circle" src=\'' + result.user.photoURL + '\'/>');
      $('.name-user-js').append('<span>' + result.user.displayName + '</span>');
      
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
    .set(usuario);
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
    $('.photo-user-js').append('<img class="circle" src=\'' + user.photo + '\'/>');
    $('.name-user-js').append('<span>' + user.name + '</span>');  
  });

// Registro de usuarios (signUp)
$('#btn-signUp-js').click(function(event) {
  // event.preventDefault();
  var $valEmail = $('#email').val();
  var $valPassword = $('#password').val();
  firebase.auth().createUserWithEmailAndPassword($valEmail, $valPassword)
    .then(function(result) {
    // alert('Autentificación correcta');
      window.location.href = '../index.html';
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
    }, function(error) {
      console.error('Sign Out Error', error);
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
};

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


// perfil del user
$(document).ready(function() {
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
      $box.prepend('<div class="card-action p-0-0"><div class="row"><div id ="comentario" class="input-field"><a class = "prefix photo-user-js"></a></div></div></div>');
      var $txt = $('#comentario');
      var $parrafo = $('<p/>', { 'class': 'col s10 m11 right m-0 w-wrap p-10 white l11 m-msn ' });
      $parrafo.text($txArea.val());
      $txt.prepend($parrafo);
      $txArea.val('');
      $txArea.focus();
    }
  });

  // Cargando nuevo post con foto del dispositivo
  $('#aa').on('change', function() {
    var input = this;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(event) {
        $('#file-img').attr('src', event.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  });

  $('#textarea1-post-home').keyup(function() {
    var longTxArea2 = $('#textarea1-post-home').val().length;
    if (longTxArea2 >= 1) { // validar q hay imagen
      activeButton1(); 
    } else desactiveButton1();
  });

  function activeButton1() {
    $('#btn-comment-post-home').removeClass('disabled');  
  }
  function desactiveButton1() {
    $('#btn-comment-post-home').addClass('disabled');
  }

  $('#btn-comment-post-home').click(function() {
    var photo = $('#file-img').attr('src');
    var textPost = $('#textarea1-post-home').val();
    $('#textarea1-post-home').val('');
    $('#file-img').attr('src', 'http://via.placeholder.com/200/ecebeb/ecebeb');
    

    $('#box-posteo').prepend(
      '<div id=\'box-posteo\' class=\'m-bottom\'>' +
      '<div class=\'card-action light-blue lighten-5 p-24\'>' +
        '<div class=\'row m-0\'>' +
          '<form class=\'input-field\'>' +
            '<a href=\'#\' class=\'prefix photo-user-js\'>' + '</a> ' +
            '<h5 class=\'col s7 m9 l11 offset-l1\'>nombre del usuario</h5>' +    
          '</form>' +
          '<p>' + textPost + '</p>' +
        '</div>' +
      '</div>' +
      '<div class=\'card sticky-action light-blue lighten-5 m-0\'>' +
        '<div class=\'card-image waves-effect waves-block waves-light\'>' + '<img class=\'activator\' src =\' ' + photo + '\' alt =\'...\' />' +
        '</div>' +
        '<div class=\'card-action\'>' +
          '<span class=\'right activator m-left-15\'><i class=\'material-icons c-aquamar pointer\'> more_vert</i></span>' +
          '<span class=\'right m-left-15\'><i class=\'material-icons c-aquamar pointer\'>comment</i></span>' +
          '<span class=\'right m-left-15\'><i class=\'material-icons c-aquamar pointer\'>favorite_border</i></span><br>' +
        '</div>' +
        '<div class=\'card-reveal\'>' +
          '<span class=\'card-title grey-text text-darken-4\'>' + 'S/100.00' + '<i class=\'material-icons right\'>close</i>' + '</span>' + '<br>' +
          '<span>' + 'Color: Taupe' + '<br>' + 'Size:37' + '<br>' + 'Taco:5' + '<br>' + 'Incluye caja y bolsa de regalo.' + '</span>' + '<br><br>' +
          '<a class=\'waves-effect waves-light btn\'>Comprar</a><br><br>' +
          '<a href=\'#\'><i class=\'small material-icons teal-text text-lighten-2\'>shopping_cart</i><span class=\'gray-text name small-let text-darken-4\'>Añadir al carrito</span></a>' +
        '</div>' +
        '<div class=\'card-action\'>' +
          '<div class=\'row m-msn\'>' +
            '<form class=\'input-field m-msn\'>' +
              '<a href=\'#\' class=\'prefix photo-user-js\'>' + '</a>' +
              '<a id=\'btn-comment\' class=\'btn bg-aquamar right disabled m-left-15\'>Publicar</a>' +
              '<textarea id=\'textarea1\' class=\'materialize-textarea col s7 m9 l7 right\' placeholder=\'Escribe un comentario...\'></textarea>' +      
            '</form>' +
          '</div>' +
        '</div>' +
      '<div id=\'box-content\' class=\'comentarios m-msn\'></div>' +
    '</div>');
  });
});
