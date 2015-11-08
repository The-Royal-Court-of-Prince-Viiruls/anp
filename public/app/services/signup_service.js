IlmoitusApp.service('SignupService', function ($http, $timeout) {
  var signUpSuccess = null;

  this.getsignUpSuccess = function () {
    return signUpSuccess;
  };

  // Mark signup as a success; timeouts in 5s
  this.setsignUpSuccess = function(value) {
    signUpSuccess = value;
    $timeout(function(){
      signUpSuccess = null;
    }, 5000);
  };

  this.signUp = function (user) {
    var promise = $http.post('/signup', {name:user.name,email: user.email, password: user.password})
    .then(function(response){
      return response.data;
    })
    return promise;
  }
});
