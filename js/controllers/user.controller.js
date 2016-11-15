angular.module('overwatch_project').controller(
  'UserController', ['$scope', 'User', function($scope, User){
    //Set up the users so that I can call on them later without getting errors
    $scope.user1 = "Empty"
    $scope.user2 = "Empty"


  $(function(){
    //If the search option is submitted, we need to create 1 or 2 users without refreshing the page
    $("form").submit(function(){
      $("#error_message1").text("")
      $("#error_message2").text("")

      $("#video").css("display", "block")
      $("#add_user").css("display", "none")
      $("#logo").css("display", "none")

      $scope.user1.fullyLoaded = false
      $scope.user2.fullyLoaded = false
      if ($("#characterSelect").val() === "None"){
        $("form").css("margin", "0 auto")
        event.preventDefault()
        createUsers()
      }
      else{

      }
    })
    //Create the users - set them up in $scope, see user.js for model details
    function createUsers(){
      $scope.user1 = new User($("#inputUser1").val().replace("#", "-"))
      if ($("#inputUser2").val() !== ""){
        $scope.user2 = new User($("#inputUser2").val().replace("#", "-"))
      }
    }
    //Button that lets me access $scope whenever I feel like it
    $("#scope_u").click(function(){
      console.log($scope);
    })
  })

  //Put a watch on whether the users are loaded, if so it's time to compile data
  $scope.$watch('[user1.fullyLoaded, user2.fullyLoaded]', function(){
      if ($scope.user1.fullyLoaded && ($scope.user2.fullyLoaded || $scope.user2.fullyLoaded === 'error' || $("#inputUser2").val() === "")){
        getUserData()
      }
      else {

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
  //Takes in an array, returns that array without duplicate entries
  uniq = function (a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
  }

  // If one user has data the other doesn't, fills in that data for the other with "N/A"
  getUserData = function(){
    if ($("#inputUser2").val() !== "" || $scope.user2.error === true){
      let user1gk = getKeys($scope.user1.game_stats)
      let user2gk = getKeys($scope.user2.game_stats)
      let user1ak = getKeys($scope.user1.average_stats)
      let user2ak = getKeys($scope.user2.average_stats)

      let a_game_keys = uniq(user1gk.concat(user2gk))
      let a_average_keys = uniq(user1ak.concat(user2ak))

      //Now we know all the stats we want to display, so put that in scope
      $scope.a_game_keys = a_game_keys
      $scope.a_average_keys = a_average_keys



      for (let i = 0; i < a_game_keys.length; i++){
        if (!user1gk.includes(a_game_keys[i])){
          $scope.user1.game_stats[a_game_keys[i]] = ["n/a", 'black']
          $scope.user2.game_stats[a_game_keys[i]] = [$scope.user2.game_stats[a_game_keys[i]]]
        }
        if (!user2gk.includes(a_game_keys[i])){
          $scope.user2.game_stats[a_game_keys[i]] = ["n/a", 'black']
          $scope.user1.game_stats[a_game_keys[i]] = [$scope.user1.game_stats[a_game_keys[i]]]
        }
        // LOGIC FOR COLORS HERE
        if (user1gk.includes(a_game_keys[i]) && user2gk.includes(a_game_keys[i])) {
          if(+parseFloat($scope.user1.game_stats[a_game_keys[i]]).toFixed(2) === +parseFloat($scope.user2.game_stats[a_game_keys[i]]).toFixed(2)) {
            $scope.user1.game_stats[a_game_keys[i]] = [numberWithCommas(+$scope.user1.game_stats[a_game_keys[i]].toFixed(2)), 'black']
            $scope.user2.game_stats[a_game_keys[i]] = [numberWithCommas(+$scope.user2.game_stats[a_game_keys[i]].toFixed(2)), 'black']
          }
          else if (parseFloat($scope.user1.game_stats[a_game_keys[i]]) > parseFloat(+$scope.user2.game_stats[a_game_keys[i]])) {
            $scope.user1.game_stats[a_game_keys[i]] = [numberWithCommas(+$scope.user1.game_stats[a_game_keys[i]].toFixed(2)), 'green']
            $scope.user2.game_stats[a_game_keys[i]] = [numberWithCommas(+$scope.user2.game_stats[a_game_keys[i]].toFixed(2)), 'red']
          }

          else {
            $scope.user1.game_stats[a_game_keys[i]] = [numberWithCommas(+$scope.user1.game_stats[a_game_keys[i]].toFixed(2)), 'red']
            $scope.user2.game_stats[a_game_keys[i]] = [numberWithCommas(+$scope.user2.game_stats[a_game_keys[i]].toFixed(2)), 'green']
          }
        }
      }

      for (let i = 0; i < a_average_keys.length; i++){
        if (!user1ak.includes(a_average_keys[i])){
          $scope.user1.average_stats[a_average_keys[i]] = ["n/a", 'black']
          $scope.user2.average_stats[a_average_keys[i]] = [$scope.user2.average_stats[a_average_keys[i]]]
        }
        if (!user2ak.includes(a_average_keys[i])){
          $scope.user2.average_stats[a_average_keys[i]] = ["n/a", 'black']
          $scope.user1.average_stats[a_average_keys[i]] = [$scope.user1.average_stats[a_average_keys[i]]]
        }
        // LOGIC FOR COLORS HERE
        if (user1ak.includes(a_average_keys[i]) && user2ak.includes(a_average_keys[i])) {
          if(+parseFloat($scope.user1.average_stats[a_average_keys[i]]).toFixed(2) === +parseFloat($scope.user2.average_stats[a_average_keys[i]]).toFixed(2)) {
            $scope.user1.average_stats[a_average_keys[i]] = [numberWithCommas(+$scope.user1.average_stats[a_average_keys[i]].toFixed(2)), 'black']
            $scope.user2.average_stats[a_average_keys[i]] = [numberWithCommas(+$scope.user2.average_stats[a_average_keys[i]].toFixed(2)), 'black']
          }
          else if (parseFloat($scope.user1.average_stats[a_average_keys[i]]) > parseFloat(+$scope.user2.average_stats[a_average_keys[i]])) {
            $scope.user1.average_stats[a_average_keys[i]] = [numberWithCommas(+$scope.user1.average_stats[a_average_keys[i]].toFixed(2)), 'green']
            $scope.user2.average_stats[a_average_keys[i]] = [numberWithCommas(+$scope.user2.average_stats[a_average_keys[i]].toFixed(2)), 'red']
          }

          else {
            $scope.user1.average_stats[a_average_keys[i]] = [numberWithCommas(+$scope.user1.average_stats[a_average_keys[i]].toFixed(2)), 'red']
            $scope.user2.average_stats[a_average_keys[i]] = [numberWithCommas(+$scope.user2.average_stats[a_average_keys[i]].toFixed(2)), 'green']
          }
        }
      }
      //
      // for (let i = 0; i < a_avg_keys.length; i++){
      //   if (!user1ak.includes(a_avg_keys[i])){
      //     $scope.user1.average_stats[a_avg_keys[i]] = "n/a"
      //   } else {
      //     $scope.user1.average_stats[a_avg_keys[i]] = numberWithCommas(+$scope.user1.average_stats[a_avg_keys[i]].toFixed(2))
      //   }
      //   if (!user2ak.includes(a_avg_keys[i])){
      //     $scope.user2.average_stats[a_avg_keys[i]] = "n/a"
      //   } else {
      //     $scope.user2.average_stats[a_avg_keys[i]] = numberWithCommas(+$scope.user2.average_stats[a_avg_keys[i]].toFixed(2))
      //   }
      // }

    }
    else{
      $scope.a_game_keys = getKeys($scope.user1.game_stats)
      $scope.a_average_keys = getKeys($scope.user1.average_stats)

    }

    $("#video").css("display", "none")
    $("#add_user").css("display", "block")
    $("#logo").css("display", "block")

    function numberWithCommas(n) {
        var parts=n.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
      }

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
  }

  $scope.removeUnderscore = function(str){
    while (str.includes("_")){
      str = str.replace("_", " ")
    }
    return str
  }

}])
