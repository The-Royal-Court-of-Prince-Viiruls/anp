IlmoitusApp.controller('HomeController', function ($scope, PostService, SignupService, LoginService, $location) {

  // Check if the user has just registered
  $scope.showSuccess = SignupService.getsignUpSuccess();
  //login error message
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
    $('#loginModal').modal('show');
  };

  // Close the login modal
  $scope.closeLogin = function() {
    $('#loginModal').modal('hide');
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
      // If login is successful, show success message and redirect to profile
    $scope.closeLogin();
    }
    });
  };


})
