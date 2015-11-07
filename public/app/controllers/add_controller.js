IlmoitusApp.controller('AddController', function ($scope,$rootScope, PostService) {

$scope.newGSM = '';
$scope.newEmail = '';

$scope.newShippingMethods = {
  pickup: false,
  mail: false,
  home: false
}

  $scope.addPost = function() {
    PostService.addPost({
      type: $scope.newType,
      item: $scope.newItem,
      category: $scope.newCategory,
      description: $scope.newDescription,
      condition: $scope.newCondition,
      location: $scope.newLocation,
      shipping: $scope.newShippingMethods,
      contact: {
        gsm: $scope.newGSM,
        email: $scope.newEmail
      },
      time: Date.now(),
      user: $rootScope.user.id,
    });

  }

})
