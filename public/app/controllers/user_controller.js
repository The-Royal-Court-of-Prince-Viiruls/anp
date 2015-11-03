IlmoitusApp.controller('UserController', function ($scope, PostService,LoginService) {

$scope.userInfo = {};
$scope.usersPosts = [];

$scope.user = function() {
  LoginService.userInfo().then(function(d) {
      $scope.userInfo = d;
  });
};

this.listPosts = function(){
  LoginService.listUsersPosts(userInfo.id).then(function(d) {
      $scope.usersPosts = d;
  });
};

})
