IlmoitusApp.service('LoginService', function ($http) {
  this.login = function (user) {
    var promise = $http.post('/login', {email: user.email, password: user.password})
    .then(function(response){
      return response.data;
    })
    return promise;
  };

  this.logout = function () {
    var promise = $http.get('/logout')
    .then(function(response){
      return response;
    })
    return promise;
  };

});
