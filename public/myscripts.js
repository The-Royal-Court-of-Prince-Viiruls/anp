$(document).ready(function () {

//    Listeneri hakuehtomodalille
    $('#refineButton').click(function () {
        $('#refineModal').modal('show');
    });

//  Hakuehdot: sijainti dropdown menu
    $('#refineLocation')
  .dropdown()
;

});
