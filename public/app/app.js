var IlmoitusApp = angular.module('IlmoitusApp', ['firebase', 'ngRoute']);

IlmoitusApp.config(function ($routeProvider) {

  var isLoggedIn = function($q, $timeout, $http, $location, $rootScope){
    var deferred = $q.defer();
    $http.get('/loggedin')
    .success(function(data) {
      if (data === true){
        deferred.resolve();
      } else {
        deferred.reject();
        $location.url('/');
      }
  });
  return deferred.promise;
  };

  $routeProvider
  .when('/', {
    controller: 'HomeController',
    templateUrl: 'app/views/etusivu.html'
  })
  .when('/posts', {
    controller:'ListController',
    templateUrl: 'app/views/posts.html'
  })
  .when('/add', {
    controller:'AddController',
    templateUrl: 'app/views/add.html',
    resolve: { loggedin: isLoggedIn }
  })
  .when('/signup', {
    controller:'SignupController',
    templateUrl: 'app/views/signup.html'
  })
  .when('/user', {
    controller:'UserController',
    templateUrl: 'app/views/user.html',
    resolve: { loggedin: isLoggedIn }
  });

});
