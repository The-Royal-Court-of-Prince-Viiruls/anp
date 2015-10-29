IlmoitusApp.controller('SignupController', function ($scope, SignupService) {

$scope.signUp = function() {
  SignupService.signUp({
    firstName: $scope.firstName,
    lastName: $scope.lastName,
    email: $scope.email,
    password: $scope.password
  })
};

})
