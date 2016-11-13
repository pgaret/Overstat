angular.module('overwatch_project').factory('User', ['$http', function($http){

  function User(battletag){
    this.load(battletag)
  }

  User.prototype = {
    load: function (battletag){
      var scope = this
      $http.get(`https://owapi.net/api/v2/u/${battletag}/stats/general`).success(function(playerData){
        angular.extend(scope, playerData)
    //    scope.loadData(playerData)
      }).success(function(resolved){
        scope.fullyLoaded = "Loaded"
        Store.users.push(scope)
      })
    }
  };
  return User
}])
