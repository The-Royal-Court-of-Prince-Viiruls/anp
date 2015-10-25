IlmoitusApp.controller('ListController', function ($scope, FirebaseService) {

  $scope.posts = FirebaseService.getPosts();

})
