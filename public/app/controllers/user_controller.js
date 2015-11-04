IlmoitusApp.controller('UserController', function ($scope, PostService, UserService, $rootScope) {
$scope.usersPosts = [];

UserService.listUsersPosts($rootScope.id).then(function(d) {
    $scope.usersPosts = d;
 });

 $scope.removePost = function(post) {
   UserService.removePost(post._id, post.user);
 }


})
