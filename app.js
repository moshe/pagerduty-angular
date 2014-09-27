angular.module('incidents', ['restangular', 'ngRoute']).
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

function ListCtrl($scope, $location, Restangular) {
  $scope.states = ["acknowledged","triggered","resolved"];
  $scope.incidents = Restangular.all("incidents").getList({sort_by: "created_on:desc"}).$object;

  $scope.byState = function(entry) {
  return entry.status === $scope.selectedState || $scope.selectedState === undefined;
  };

  $scope.update = function(pages, base, token) {
    for (i = 0; i < pages; i++) {
      $scope.incidents = Restangular.all("incidents").getList({offset:100 * i, sort_by: "created_on:desc"})
        .then(function(result) {
        Array.prototype.push.apply($scope.incidents,result);
        })
    }
  };

    $scope.setSelectedState = function (value) {
        if ($scope.selectedState === value) {
            $scope.selectedState = undefined;
        } else {
            $scope.selectedState = value;
        }
    };
}
