IlmoitusApp.service('LoggedIn', function ($http, $rootScope) {
  $scope.isLoggedIn = function() {
      $http.get('/loggedin')
        .success(function(data) {
          console.log(data);
          $rootScope.loggedIn = data;
        })
    };

});
