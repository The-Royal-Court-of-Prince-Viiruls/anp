IlmoitusApp.service('SignupService', function ($http,$window) {

  this.signUp = function (user) {
    $http.post('/signup', {email: user.email, password: user.password})
    .success(function(data, status, headers, config){
      $window.location.href = data.path;
    });
  }

});
