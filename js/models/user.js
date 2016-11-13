angular.module('overwatch_project').factory('User', ['$http', function($http){

  function User(battletag){
    this.load(battletag)
  }

  User.prototype = {
    load: function (battletag){
      var scope = this
      $http.get(`https://owapi.net/api/v2/u/${battletag}/stats/general`).then(function(playerData){
        angular.extend(scope, playerData.data)
        scope.fullyLoaded = "Loaded"
        Store.users.push(scope)
    //    scope.loadData(playerData)
  }, function(error){
        if ($("#error_message1").text() !== "") {
          $("#error_message2").text(`Invalid battletag: ${battletag}`)
        } else{
          $("#error_message1").text(`Invalid battletag: ${battletag}`)
        }
    })
    }
  };
  return User
}])
