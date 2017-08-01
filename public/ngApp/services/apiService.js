draco.factory('apiService',
  [function() {
    var apiService = {};

    apiService.serialize = function(obj) {
      var str = [];
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      }

      return str.join("&");
    };

    apiService.makeReq = function(url, type) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open(type, url, true);
        req.onload = function(e) {
          if (req.readyState === 4) {
            if (req.status === 200) {
              resolve(JSON.parse(req.responseText));
            } else {
              reject(console.error(req.statusText));
            }
          }
        };

        req.onerror = function(e) {
          reject(console.error(req.statusText));
        };

        req.send();
      })
    };

    // user api
    apiService.getUsers = function() {
      var url = '/api/users';
      return apiService.makeReq(url, 'GET');
    };

    apiService.getUser = function(email) {
      var url = '/api/user/' + email;
      return apiService.makeReq(url, 'GET');
    };

    // award api
    apiService.getAwards = function() {
      var url = '/api/awards';
      return apiService.makeReq(url, 'GET');
    };

    apiService.getUserAwards = function(email) {
      var url = '/api/user-awards/' + email;
      return apiService.makeReq(url, 'GET');
    };

    return apiService;
  }])
