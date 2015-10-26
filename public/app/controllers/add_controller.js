IlmoitusApp.controller('AddController', function ($scope, FirebaseService, PostService) {

$scope.newGSM = '';
$scope.newEmail = '';

  $scope.addPost = function() {
    PostService.addPost({
      type: $scope.newType,
      item: $scope.newItem,
      category: $scope.newCategory,
      description: $scope.newDescription,
      location: $scope.newLocation,
      contact: {
        gsm: $scope.newGSM,
        email: $scope.newEmail
      }
    });
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
    });
  }

})
