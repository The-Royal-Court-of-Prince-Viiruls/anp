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
  .when('/faq', {
    controller:'',
    templateUrl: 'app/views/faq.html'
  })
  .when('/signup', {
    controller:'',
    templateUrl: 'app/views/signup.html'
  })
});
