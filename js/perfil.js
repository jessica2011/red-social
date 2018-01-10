$(document).ready(function() {
  // materialize
  $('.button-collapse').sideNav();
  $('.modal').modal();


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
      $box.prepend('<div class="card-action p-10"><div class="row row1"><div id ="comentario" class="input-field m-0"><a class = "prefix"><img src="../assets/images/user2.jpg" class="photo-perfil-circule"></a></div></div></div>');
      var $txt = $('#comentario');
      var $parrafo = $('<p/>', { 'class': 'col s10 m11 right m-0 w-wrap p-10 white l10' });
      $parrafo.text($txArea.val());
      $txt.prepend($parrafo);
      $txArea.val('');
      $txArea.focus();
    }
  });


  // cargar las images l modal
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $('#img-file')
          .attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  // // Cargando nuevo post con foto del dispositivo
  // $('#anade-outfits').click(function() {
  //   var photo = $('#img-file').attr('src');
  //   var textPost = $('#textarea2').val();
  
  //   $('#box-posteot').prepend('<div class=\'card\'>' +
  //       '<div class=\'card-image\'>' +
  //         '<img src=\'' + photo + '\' alt=\'...\'>' +
  //         '<span class=\'card-title\'>Name</span>' +
  //         '<a class=\'btn-floating halfway-fab waves-effect waves-light yellow lighten-1\'>' +
  //           '<i class=\'material-icons black-text\'>favorite_border</i>' +
  //         '</a>' +
  //       '</div>' +
  //       '<div class=\'card-content\'>' +
  //         '<p>' + textPost + '</p>' +
  //       '</div>' +
  //     '</div>'
  //   );
  // });
});


