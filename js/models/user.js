angular.module('overwatch_project').factory('User', ['$http', function($http){

  function User(battletag){
    this.load(battletag)
    Store.users.push(this)
  }

  User.prototype = {
    setData: function(playerData){
      angular.extend(this, playerData)
      this.loadAverageData(playerData.average_stats)
    },
    load: function(battletag){
      var scope = this
      $http.get(`https://owapi.net/api/v2/u/${battletag}/stats/general`).success(function(playerData){
        scope.setData(playerData)
      })
    },
    loadAverageData: function(average_stats){
      this.average_data = {
        'damage_done_avg': average_stats['damage_done_avg'],
        'final_blows_avg': average_stats['final_blows_avg'],
        'healing_done_avg': average_stats['healing_done_avg'],
        'melee_final_blows_avg': average_stats['melee_final_blows_avg'],
        'objective_kills_avg': average_stats['objective_kills_avg'],
        'offensive_assists_avg': average_stats['offensive_assists_avg'] 
      }
    }
  };
  return User
}])
