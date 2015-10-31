IlmoitusApp.service('LoginService', function ($http) {

  this.login = function (user) {
    var promise = $http.post('/login', {email: user.email, password: user.password})
    .then(function(response){
      // The then function here is an opportunity to modify the response

      // The return value gets picked up by the then in the controller.
      return response.data;
    })
    return promise;
  }
});
