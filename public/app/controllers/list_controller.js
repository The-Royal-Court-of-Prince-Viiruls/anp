IlmoitusApp.controller('ListController', function ($scope, FirebaseService, PostService) {

  $scope.posts = FirebaseService.getPosts();

  $scope.searchshipping = {
    pickup:true,
    mail:true,
    home:true
  }

  $scope.searchtype = "";

  $scope.query = function(){
    queryObject = {
      type : $scope.searchtype,
      shipping : $scope.searchshipping
    }
    PostService.query(queryObject);
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
  $scope.shippingMethods = function(post) {
    var methods = post.methods;
    var result = "";
    if (methods.pickup === true) {
      result+="Nouto ";
    }
    if (methods.mail === true) {
      result+="Postitus ";
    }
    if (methods.home === true) {
      result+="Kotiintoimitus ";
    }

    return result;
  }

})
