angular.module('overwatch_project').factory('Character', ['$http', function($http){

  function Character(){
    
  }

  Character.prototype = {
    setData: function(characterData){
      angular.extend(this, characterData)
      this.loadData(characterData)
    },
    load: function (battletag){
      var scope = this
      $http.get(`https://owapi.net/api/v2/u/${battletag}/heroes`).success(function(characterData){
        scope.setData(characterData)
      })
    },
    loadData: function(stats){

    }
  };
  return User
}])
