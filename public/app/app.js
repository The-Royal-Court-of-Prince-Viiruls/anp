var IlmoitusApp = angular.module('IlmoitusApp', ['firebase', 'ngRoute']);

IlmoitusApp.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    controller: '',
    templateUrl: 'app/views/etusivu.html'
  })
  .when('/posts', {
    controller:'',
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
});
