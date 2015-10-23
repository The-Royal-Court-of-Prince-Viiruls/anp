var IlmoitusApp = angular.module('IlmoitusApp', ['ngRoute']);

IlmoitusApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      controller: '',
      templateUrl: 'app/views/topics/index.html'
    })
    .when('/topics/:id', {
      controller: 'ShowTopicController',
      templateUrl: 'app/views/topics/show.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
