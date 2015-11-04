IlmoitusApp.controller('UserController', function ($scope, PostService, UserService, $rootScope) {
console.log($rootScope.email);
$scope.usersPosts = [];

// UserService.listUsersPosts($rootScope.id).then(function(d) {
//    $scope.usersPosts = d;
//    console.log(d);
// });


})
