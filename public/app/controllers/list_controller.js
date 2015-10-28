IlmoitusApp.controller('ListController', function ($scope, FirebaseService, PostService) {

  $scope.posts = FirebaseService.getPosts();

  $scope.searchtype = {
    search:'Etsitään',
    give:'Lahjoitetaan',
    change:'Vaihdetaan'
  }

  $scope.query = function(){
    PostService.query(toArray($scope.searchtype));
  }

  // Open the search refining modal
  $scope.refineModal = function() {
    $('#refineModal').modal('show');
  };

  $scope.accordion = function() {
    $('.ui.accordion')
    .accordion();
  };

  toArray = function (object) {
    var array = [];
    var i = 0;
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        if (object[property]!== false) {
          array[i++]=object[property];
        }
      }
    }
    return array;
  }

})
