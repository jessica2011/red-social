$(document).ready(function() {


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

  var $btnPublicarModal = $('#btn-modal-publicar');
  var $txArea2 = $('#textarea2');
  var $titleModal = $('#title-modal');
  var $posteo = $('#box-posteo');

  $btnPublicarModal.on('click', function() {
    if ($txArea2.val() && $titleModal.val()) {
      $posteo.prepend('<div class="row"><div class="card sticky-action col s12 l6 offset-l3  light-blue lighten-5"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="../assets/images/outfits1.jpg"></div><div id="insert-title" class="card-action p-10"><p>Creado por <a href="#" class="create c-aquamar">paula.m.ramosr.14</a></p><p>Publicado el 4 de enero del 2018</p></div><div class="card-action p-10">  <span class="center-align f-size-10 col s4"><i class="material-icons pointer c-aquamar">favorite_border</i></span><span class="center-align f-size-10 col s4"><i class="material-icons pointer c-aquamar">comment</i></span><span class="center-align f-size-10 col s4 activator"><i class="material-icons pointer c-aquamar"> more_vert</i></span><br></div><div class="card-reveal" id="insert-comment"><span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span></div><div class="card-action p-10"><div class="row row1"><form class="input-field"><a href="#" class="prefix"><img src="../assets/images/user.png" alt="user" class="photo-perfil-circule"></a> <a id="btn-comment" class="btn btn-pub bg-aquamar right disabled">Publicar</a><textarea id="textarea1" class="materialize-textarea col s7 m9 l7 right" placeholder="Escribe un comentario..."></textarea></form></div></div><div id="box-content" class="comentarios">')
      
      
      var $txtTitle = $('#insert-title');
      var $txtComment = $('#insert-comment');
      var $parrafo = $('<p/>');
      var $title = $('<h5/>');
      $parrafo.text($txtComment.val());
      $title.text($txtTitle.val());
      $txtComment.prepend($parrafo);
      $txtTitle.prepend($title);
      $txtTitle.val('');
      $txtComment.val('');
      $txtTitle.focus();
    }
  });


});