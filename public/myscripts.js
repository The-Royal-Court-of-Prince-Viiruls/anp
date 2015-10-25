$(document).ready(function () {

  //  Listeneri hakuehtomodalille
  $('#refineButton').click(function () {
    $('#refineModal').modal('show');
  });

  //  Hakuehdot: sijainti dropdown menu
  $('#refineLocation')
  .dropdown()
  ;

  // Ilmoituksen lisäys: "Vain nouto" -slideri
  $('.ui.slider.checkbox')
    .checkbox()
  ;

  // Ilmoituksen lisäys: Puhelinnumeron popup
  $('input')
  .popup({
    on: 'focus'
  });

});
