draco.controller('userCtrl',
  ['$scope', '$stateParams', '$window', 'apiService',
  function($scope, $stateParams, $window, apiService) {
    $scope.init = function() {
      var email = $stateParams["email"];
      $scope.getUser(email);
      $scope.getAwards(email);
    };

    $scope.getUser = function(email) {
      apiService.getUser(email).then(function(data) {
        $scope.setData('user', data[0]);
      }, function(error) {
        console.log('INIT FAILED', error);
      });
    };

    $scope.getAwards = function(email) {
      apiService.getUserAwards(email).then(function(data) {
        $scope.setData('awards', data);
      }, function(error) {
        console.log('INIT FAILED', error);
      });
    };

    $scope.sent = function(email) {
      $window.alert("Award sent to: " + email);
    };

    $scope.setData = function(dataName, data) {
      $scope[dataName] = data;
      $scope.$apply();
    };

    $scope.init();
  }])
