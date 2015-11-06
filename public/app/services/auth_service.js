IlmoitusApp.service('AuthService', function($http){
  var user = {};
  user.role = "guest";

    this.getUser = function(){
      return user;
    };

    this.generateRoleData = function(role){
      user.role = role;
    };

    this.isUserAuthenticated = function () {
     var promise = $http.get('/loggedin')
     .then(function(response){
       return response;
     });
     return promise;
   };

});
