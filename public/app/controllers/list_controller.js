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

})
