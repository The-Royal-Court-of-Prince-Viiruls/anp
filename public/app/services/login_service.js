IlmoitusApp.service('LoginService', function ($http, $rootScope) {
  this.login = function (user) {
    var promise = $http.post('/login', {email: user.email, password: user.password})
    .then(function(response){
      // The then function here is an opportunity to modify the response

      // The return value gets picked up by the then in the controller.
      return response.data;
    })
    return promise;
  }

  this.userInfo = function () {
    var promise = $http.get('/sessioninfo')
    .then(function(response){
      // The then function here is an opportunity to modify the response
      // The return value gets picked up by the then in the controller.
      return response.data;
    })
    return promise;
  };

  this.logout = function () {
    var promise = $http.get('/logout')
    .then(function(response){
      // The then function here is an opportunity to modify the response

      // The return value gets picked up by the then in the controller.
      return response.data;
    })
    return promise;
  };

  this.isLoggedIn = function() {
      $http.get('/loggedin')
        .success(function(data) {
          $rootScope.$broadcast('logged-value-changed',{ isLogged: {data} });
        })
    };
});
