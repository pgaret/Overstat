angular.module('overwatch_project').factory('User', ['$http', function($http){

  function User(userData){
    this.setData(userData)
  }

  User.prototype = {
    setData: function(playerData){
      angular.extend(this, playerData)
    },
    load: function(battletag){
      var scope = this
      $http.get(`https://owapi.net/api/v2/u/${battletag}/stats/general`).success(function(playerData){
        scope.setData(playerData)
      })
    }
  };
  return User
}])
