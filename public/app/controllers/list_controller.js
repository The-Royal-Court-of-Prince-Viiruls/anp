IlmoitusApp.controller('ListController', function ($scope, FirebaseService) {

  $scope.posts = FirebaseService.getPosts();

  $scope.addPost = function() {
    FirebaseService.addPost({
      item: $scope.newItem,
      description: $scope.newDescription,
      price: $scope.newPrice
    })
  }

})
