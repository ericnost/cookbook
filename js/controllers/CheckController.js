app.controller('CheckController', function ($scope) {

  $scope.checkModel = {
    veg: false,
    vegan: false,
    gf: false
  };

  $scope.checkResults = [];

  $scope.$watchCollection('checkModel', function () {
    $scope.checkResults = [];
    angular.forEach($scope.checkModel, function (value, key) {
      if (value) {
        $scope.checkResults.push(key);
      }
    });
  });
});