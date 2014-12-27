var app = angular.module('incidents', ['restangular', 'ngRoute']).
  config(function($routeProvider, RestangularProvider) {
    $routeProvider.
      when('/', {
        controller:ListCtrl, 
        templateUrl:'list.html'
      }).
      otherwise({redirectTo:'/'});

      // Set base url
      RestangularProvider.setBaseUrl('https://<orgName>.pagerduty.com/api/v1');

      // auth details
      RestangularProvider.setDefaultHeaders({Authorization: 'Token token=<Token>'});

      // Date extractor
      RestangularProvider.setResponseExtractor(function(response, operation) {
        return response.incidents;
      });
  });

app.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});

function ListCtrl($scope, $location, Restangular) {
  $scope.states = ["acknowledged","triggered","resolved"];
  $scope.incidents = Restangular.all("incidents").getList({sort_by: "created_on:desc"}).$object;
  $scope.itemsPerPage = 100;
  $scope.currentPage = 0;
  $scope.pagesToFetch = 10;

  $scope.update = function(pages) {
    for (i = 0; i < pages; i++) {
      Restangular.all("incidents").getList({offset:100 * i, sort_by: "created_on:desc"})
        .then(function(result) {
        Array.prototype.push.apply($scope.incidents,result);
        })
    }
  };

  $scope.update($scope.pagesToFetch);

  $scope.byState = function(entry) {
  return entry.status === $scope.selectedState || $scope.selectedState === undefined;
  };

  $scope.setSelectedState = function (value) {
      if ($scope.selectedState === value) {
        $scope.selectedState = undefined;
      } else {
        $scope.selectedState = value;
      }
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.incidents.length/$scope.itemsPerPage)-1;
  };

  $scope.setPage = function(n) {
    $scope.currentPage = n;
  };

  $scope.nextPageDisabled = function() {
    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
  };

  $scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.range = function() {
    var rangeSize = 5;
    var ret = [];
    var start;

    start = $scope.currentPage -2;
    if ( start > $scope.pageCount()-rangeSize ) {
      start = $scope.pageCount()-rangeSize+1;
    }

    for (var i=start; i<start+rangeSize; i++) {
      if ( i >= 0) {
        ret.push(i);
      }
    }
    return ret;
  };
}
