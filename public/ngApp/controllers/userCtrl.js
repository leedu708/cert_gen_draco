draco.controller('userCtrl',
  ['$scope', '$stateParams', '$window', 'apiService', '$filter',
  function($scope, $stateParams, $window, apiService, $filter) {
    $scope.init = function() {
      var email = $stateParams["email"];
      $scope.getUser(email);
      $scope.getAwards(email);
      $scope.preview = {
        "type": "none"
      };
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

        // convert all the sql dates to JS readable dates
        $scope.awards.forEach(function(award) {
          award.creation_time = $scope.convertDate(award.creation_time);
        });
      }, function(error) {
        console.log('INIT FAILED', error);
      });
    };

    $scope.sendWeekly = function(preview) {
      var toSend = angular.copy(preview);
      toSend.creation_time = $filter('date')(toSend.creation_time, "MM/dd/yyyy");
      apiService.sendWeekly(toSend).then(function(data) {
        $window.alert(data.message);
        console.log(data);
      }, function(error) {
        console.log("FAILED TO SEND WEEKLY EMAIL", error);
      });
    };

    $scope.sendMonthly = function(preview) {
      var toSend = angular.copy(preview);
      toSend.creation_time = $filter('date')(toSend.creation_time, "MM/dd/yyyy");
      apiService.sendMonthly(toSend).then(function(data) {
        $window.alert(data.message);
        console.log(data);
      }, function(error) {
        console.log("FAILED TO SEND MONTHLY EMAIL", error);
      });
    };

    $scope.convertDate = function(date) {
      var dateParts = date.split("-");
      return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
    };

    $scope.setPreview = function(award) {
      $scope.preview = award;
    };

    $scope.checkWeekCert = function(award) {
      var bool = !!(award.type == "Employee of the Week");
      return bool;
    };

    $scope.setData = function(dataName, data) {
      $scope[dataName] = data;
      $scope.$apply();
    };

    $scope.init();
  }])
