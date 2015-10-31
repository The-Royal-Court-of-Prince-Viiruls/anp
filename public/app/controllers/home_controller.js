IlmoitusApp.controller('HomeController', function ($scope, PostService, SignupService) {

  // Check if the user has just registered
  $scope.showSuccess = SignupService.getsignUpSuccess();

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

})
