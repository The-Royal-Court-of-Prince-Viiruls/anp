IlmoitusApp.controller('UserController', function ($scope, PostService, LoginService, $rootScope) {

$scope.userInfo = {};
$scope.usersPosts = [];

$scope.user = function() {
  $scope.userInfo = $rootScope.userinfo;
};

$scope.listPosts = function(){
  LoginService.listUsersPosts(userInfo.id).then(function(d) {
      $scope.usersPosts = d;
  });
};

})
