draco.controller('homeCtrl',
  ['$scope', 'apiService',
  function($scope, apiService) {
    $scope.init = function() {
      $scope.getUsers();
    };

    $scope.getUsers = function() {
      apiService.getUsers().then(function(data) {
        $scope.setData('users', data);
        console.log(data);
      }, function(error) {
        console.log('INIT FAILED', error);
      });
    };
    
    $scope.setData = function(dataName, data) {
      $scope[dataName] = data;
      $scope.$apply();
    };

    $scope.init();
  }])
