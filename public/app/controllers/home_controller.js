IlmoitusApp.controller('HomeController', function ($scope, PostService) {

  // Open the login modal
  $scope.loginModal = function() {
    $('#loginModal').modal('show');
  };

  $scope.closeLogin = function() {
    $('#loginModal').modal('hide');
  };

})
