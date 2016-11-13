angular.module('overwatch_project').controller(
  'UserController', ['$scope', 'User', function($scope, User){
    //Set up the users so that I can call on them later without getting errors
    $scope.user1 = "Empty"
    $scope.user2 = "Empty"

  $(function(){
    //If the search option is submitted, we need to create 1 or 2 users without refreshing the page
    $("form").submit(function(){
      event.preventDefault()
      createUsers()
    })
    //Create the users - set them up in $scope, see user.js for model details
    function createUsers(){
      $scope.user1 = new User($("#inputUser1").val().replace("#", "-"))
      if ($("#inputUser2").val() !== ""){
        $scope.user2 = new User($("#inputUser2").val().replace("#", "-"))
      }
    }
    //Button that lets me access $scope whenever I feel like it
    $("#checkScope").click(function(){
      console.log($scope);
    })
  })
  //Put a watch on whether the users are loaded, if so it's time to compile data
  $scope.$watch('[user1.fullyLoaded, user2.fullyLoaded]', function(){
      if ($scope.user1.fullyLoaded && $scope.user2.fullyLoaded){
        getUserData()
      }
  })
  //Grabs the keys for any given dictionary and returns them in array form
  getKeys = function(data){
    let keys = []
    for (stat in data){
      keys.push(stat)
    }
    return keys.sort()
  }

  uniq = function (a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
  }

  getUserData = function(){
    let user1gk = getKeys($scope.user1.game_stats)
    let user2gk = getKeys($scope.user2.game_stats)
    let user1ak = getKeys($scope.user1.average_stats)
    let user2ak = getKeys($scope.user2.average_stats)

    let a_game_keys = uniq(user1gk.concat(user2gk))
    let a_avg_keys = uniq(user1ak.concat(user2ak))

    $scope.a_game_keys = a_game_keys
    $scope.a_avg_keys = a_avg_keys

    //to remove _ for display use
//     for(var key in x) {
//     if(x.hasOwnProperty(key)) {
//         key = key.replace(/\_/g,' ')
//     }
// }

// function renameKeys (dict, keyMap) {
//   return _.reduce(dict, function (newDict, val, oldKey) {
//     var newKey
//     if (keyMap[oldKey]) {
//       newKey = keyMap[oldKey]
//     } else {
//       newKey = oldKey
//     }
//     newDict[newKey] = val
//     return newDict
//   }, {})
// }


    for (let i = 0; i < a_game_keys.length; i++){
      if (!user1gk.includes(a_game_keys[i])){
        $scope.user1.game_stats[a_game_keys[i]] = "n/a"
      }
      if (!user2gk.includes(a_game_keys[i])){
        $scope.user2.game_stats[a_game_keys[i]] = "n/a"
      }
    }

    for (let i = 0; i < a_avg_keys.length; i++){
      if (!user1ak.includes(a_avg_keys[i])){
        $scope.user1.average_stats[a_avg_keys[i]] = "n/a"
      }
      if (!user2ak.includes(a_avg_keys[i])){
        $scope.user2.average_stats[a_avg_keys[i]] = "n/a"
      }
    }
  }
}])
