IlmoitusApp.controller('HomeController', function ($scope,$rootScope, SignupService, LoginService, $location,$window) {
  // Check if the user has just registered
  $scope.showSuccess = SignupService.getsignUpSuccess();
  // Login error message
  $scope.showLoginError = null;

  $scope.menuClick = function () {
    $('.menu')
    .on('click', '.item', function() {
        if(!$(this).hasClass('dropdown')) {
          $(this)
            .addClass('active')
            .closest('.ui.menu')
            .find('.item')
              .not($(this))
              .removeClass('active')
          ;
        }
      });
  };

  // Open the login modal
  $scope.loginModal = function() {
    $scope.showLoginError = null;
    $('#loginModal').modal('show');
  };

  // Close the login modal
  $scope.closeLogin = function() {
    $('#loginModal').modal('hide');
  };

  $scope.logout = function() {
    LoginService.logout().then(function(data) {
    $location.path('/');
    $window.location.reload();
    });
  };


  $scope.login = function() {
    // Send new user information to the service
    LoginService.login({
      email: $scope.email,
      password: $scope.password
    }).then(function(data) {
      if(data.message){
        // If there was an error show error message
        $scope.showLoginError = data.message[0];
    } else {
    $window.location.reload();
    }
    });
  };


})
