angular.module('overwatch_project').factory('Character', ['$http', function($http){

  function Character(battletag, character){
    this.load(battletag, character)
  }

  Character.prototype = {
    load: function (battletag, character){
      var scope = this
      $http.get(`https://owapi.net/api/v2/u/${battletag}/heroes/${character}/general`).then(function(characterData){
        angular.extend(scope, characterData)
        scope.fullyLoaded = "Loaded"
        Store.characters.push(scope)
      }, function(error) {
        scope.fullyLoaded = error
        $("#video").css("display", "none")
        $("#logo").css("display", "block")
        $("#add_user").css("display", "block")
        $http.get(`https://owapi.net/api/v2/u/${battletag}/stats/general`).success(function() {
          $("#error_message1").text(`${battletag} has never played ${character}!`)
        }).error(function() {
          $("#error_message1").text(`Invalid battletag: ${battletag}`)
        })
      })
    }
  };
  return Character
}])
