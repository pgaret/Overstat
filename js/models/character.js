angular.module('overwatch_project').factory('Character', ['$http', function($http){

  function Character(battletag, character){
    this.load(battletag, character)
  }

  Character.prototype = {
    load: function (battletag, character){
      var scope = this
      $http.get(`https://owapi.net/api/v2/u/${battletag}/heroes/${character}/general`).success(function(characterData){
        angular.extend(scope, characterData)
      }).success(function(resolved){
        scope.fullyLoaded = "Loaded"
        Store.characters.push(scope)
      })
    }
  };
  return Character
}])
