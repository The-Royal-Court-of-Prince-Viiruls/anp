IlmoitusApp.controller('SignupController', function ($scope, SignupService, $location) {

$scope.showError = null;

$scope.signUp = function() {
  // Send new user information to the service
  SignupService.signUp({
    firstName: $scope.firstName,
    lastName: $scope.lastName,
    email: $scope.email,
    password: $scope.password
  }).then(function(data) {
    if(data.message){
      // If email is already registered, show error message
    $scope.showError = data.message;
  } else {
    // If signup is successful, show success message and redirect to home page
  SignupService.setsignUpSuccess("Success!");
  $location.path( data.path );
  }
  });
};

})
