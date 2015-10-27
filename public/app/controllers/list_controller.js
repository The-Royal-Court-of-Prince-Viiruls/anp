IlmoitusApp.controller('ListController', function ($scope, FirebaseService) {

  $scope.posts = FirebaseService.getPosts();

// Open the search refining modal
  $scope.refineModal = function() {
    $('#refineModal').modal('show');
  };

  $scope.accordion = function() {
    $('.ui.accordion')
  .accordion();
  };

  $scope.shippingMethods = function(post) {
    var methods = post.methods;
    var result = "";
    if (methods.pickup === true) {
      result+="Nouto ";
    }
    if (methods.mail === true) {
      result+="Postitus ";
    }
    if (methods.home === true) {
      result+="Kotiintoimitus ";
    }

    return result;
  }

})
