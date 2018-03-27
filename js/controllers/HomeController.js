app.controller('HomeController', ['$scope', 'photos', function($scope, photos) {
	console.log($scope)
  photos.success(function(data) {
    $scope.photos = data;
    for (var x = 0; x<$scope.photos.length; x++){
    	if ($scope.photos[x].url == "") {$scope.photos[x].url = "data/img/default.jpg"} //could be slow; find more efficient way
    	//if ($scope.photos[x].veg == "yes") {$scope.photos[x].veg = "data/vegetarian-mark.svg"}  
    	//if ($scope.photos[x].vegan == "yes") {$scope.photos[x].vegan = "data/vegan.svg"}
    	//if ($scope.photos[x].GF == "yes") {$scope.photos[x].GF = "data/gf.png"} 
      if ($scope.photos[x].text) {$scope.photos[x].text = $scope.photos[x].text.split(/\r\n|\r|\n/g);} else {$scope.photos[x].text = [" ","Recipe coming soon!"]}
      
     /* $scope.photos[x].textShort = $scope.photos[x].text.slice()
    	if ($scope.photos[x].text.length >2) {$scope.photos[x].textShort.splice(3,$scope.photos[x].text.length,"....")} else{$scope.photos[x].textShort.slice(0,1)}
*/    }

  });

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
}]);