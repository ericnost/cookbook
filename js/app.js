var app = angular.module('GalleryApp', ['ngRoute', 'ui.bootstrap']);

app.controller('SeasonDropdownCtrl', function($scope) {
  $scope.button = "Filter by season";
  $scope.actions = [
    "Fall", "Winter", "Spring", "Summer"
  ];
  $scope.change = function(name){
    $scope.button = name;
  }
});

app.config(function ($routeProvider) { 
  $routeProvider 
    .when('/', { 
      controller: 'HomeController', 
      templateUrl: 'views/home.html' 
    }) 
  .when('/photos/:id',{
    controller: 'PhotoController',
    templateUrl:'views/photo.html'
  })
    .otherwise({ 
      redirectTo: '/' 
    }); 
});

