IlmoitusApp.controller('AddController', function ($scope, FirebaseService) {

$scope.newGSM = '';
$scope.newEmail = '';

  $scope.addPost = function() {
    FirebaseService.addPost({
      type: $scope.newType,
      item: $scope.newItem,
      category: $scope.newCategory,
      description: $scope.newDescription,
      location: $scope.newLocation,
      contact: {
        gsm: $scope.newGSM,
        email: $scope.newEmail
      }
    })
  }

})
