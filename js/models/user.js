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
    },
    loadData: function(stats){
      this.average_data = {
        'Damage Done: ': stats.average_stats['damage_done_avg'],
        'Final Blows: ': stats.average_stats['final_blows_avg'],
        'Healing Done: ': stats.average_stats['healing_done_avg'],
        'Melee Final Blows: ': stats.average_stats['melee_final_blows_avg'],
        'Objective Kills: ': stats.average_stats['objective_kills_avg'],
        'Offensive Assists: ': stats.average_stats['offensive_assists_avg']
      }

      this.game_data = {
        'Damage Done: ': stats.average_stats['damage_done_avg'],
        'Final Blows: ': stats.average_stats['final_blows_avg'],
        'Healing Done: ': stats.average_stats['healing_done_avg'],
        'Melee Final Blows: ': stats.average_stats['melee_final_blows_avg'],
        'Objective Kills: ': stats.average_stats['objective_kills_avg'],
        'Offensive Assists: ': stats.average_stats['offensive_assists_avg']
      }
    }
  };
  return User
}])
