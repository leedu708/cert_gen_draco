draco.controller('userCtrl',
  ['$scope', '$stateParams', 'apiService',
  function($scope, $stateParams, apiService) {
    $scope.init = function() {
      var email = $stateParams["email"];
      $scope.getUser(email);
      $scope.getAwards();
    };

    $scope.getUser = function(email) {
      apiService.getUser(email).then(function(data) {
        $scope.setData('user', data[0]);
        console.log(data);
      }, function(error) {
        console.log('INIT FAILED', error);
      });
    };

    $scope.getAwards = function() {
      apiService.getAwards().then(function(data) {
        $scope.setData('awards', data);
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
