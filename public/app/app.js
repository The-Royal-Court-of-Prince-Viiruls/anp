var IlmoitusApp = angular.module('IlmoitusApp', ['firebase', 'ngRoute']);

IlmoitusApp.config(function ($routeProvider) {
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
    templateUrl: 'app/views/add.html'
  })
  .when('/signup', {
    controller:'SignupController',
    templateUrl: 'app/views/signup.html'
  })
});
