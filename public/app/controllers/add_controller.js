IlmoitusApp.controller('AddController', function ($scope, FirebaseService, PostService, LoginService) {

$scope.newGSM = '';
$scope.newEmail = '';

$scope.newShippingMethods = {
  pickup: false,
  mail: false,
  home: false
}

var sessionUserInfo = {};

LoginService.userInfo().then(function(d) {
    sessionUserInfo = d;
});

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
      user: sessionUserInfo.id,
    });
    FirebaseService.addPost({
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
      }
    });
  }

})
