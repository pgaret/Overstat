angular.module('overwatch_project').controller(
  'UserController', ['$scope', 'User', function($scope, User){
    //Set up the users so that I can call on them later without getting errors
    $scope.user1 = "Empty"
    $scope.user2 = "Empty"
    $scope.user = "Empty"

  $(function(){
    //If the search option is submitted, we need to create 1 or 2 users without refreshing the page
    $("form").submit(function(){
      $scope.user1.fullyLoaded = false
      $scope.user2.fullyLoaded = false
      $scope.user.fullyLoaded = false
      if ($("#characterSelect").val() === "None"){
        $scope.user1.fullyLoaded = false
        $scope.user2.fullyLoaded = false
        $scope.user.fullyLoaded = false

        $("#error_message1").text("")
        $("#error_message2").text("")

        $scope.isOne = $("#inputUser1").val()
        $scope.isTwo = $("#inputUser2").val()

        $("#video").css("display", "block")
        $("#add_user").css("display", "none")
        $("#logo").css("display", "none")

        event.preventDefault()
        createUsers()
      }
    })
    //Create the users - set them up in $scope, see user.js for model details
    function createUsers(){
//      debugger
      if ($scope.isOne === "" && $scope.isTwo !== ""){
        $scope.user = new User($scope.isTwo.replace("#", "-"))
        $scope.user1 = "Nope"; $scope.user2 = "Nope"
      }
      else if ($scope.isOne !== "" && $scope.isTwo === ""){
        $scope.user = new User($scope.isOne.replace("#", "-"))
        $scope.user1 = "Nope"; $scope.user2 = "Nope"
      }
      else{
        $scope.user1 = new User($scope.isOne.replace("#", "-"))
        $scope.user2 = new User($scope.isTwo.replace("#", "-"))
        $scope.user = "Nope"
      }
    }
    //Button that lets me access $scope whenever I feel like it
    $("#scope_u").click(function(){
      console.log($scope);
    })
  })

  //Put a watch on whether the users are loaded, if so it's time to compile data
  $scope.$watch('[user.fullyLoaded, user1.fullyLoaded, user2.fullyLoaded]', function(){
  //  debugger
    if ($scope.user !== "Nope" && ready($scope.user)){
      $scope.user = OneUserData($scope.user)
    }
    else if(ready($scope.user1) && ready($scope.user2)){
      getUserData()
    }
  })

  //Check if the user is ready to have their keys analyzed
  ready = function(user){
    if (user){
      if (user.fullyLoaded)
        if (user.fullyLoaded !== 'error' && user.fullyLoaded !== false && user != "Nope"){
          return true
        }
    }
    return false
  }

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

  OneUserData = function(user){
//    debugger
    $scope.a_game_keys = getKeys(user.game_stats)
    $scope.a_average_keys = getKeys(user.average_stats)


    for (stat in $scope.user.game_stats){
      user.game_stats[stat] = standardize(user.game_stats[stat])
    }
    for (stat in $scope.user.average_stats){
      user.average_stats[stat] = standardize(user.average_stats[stat])
    }

    setTimeout(function() {
      $("#video").css("display", "none")
      $("#add_user").css("display", "block")
      $("#logo").css("display", "block")
      $(".user_data").css("display", "block")
      $(".character_data").css("display", "block")
      $("#display_user")[0].scrollIntoView()
    }, 2000);

    return user

  }

  function standardize(n) {
      let parts=n.toString().split(".");
      parts= parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
      return +parseFloat(parts).toFixed(2)
    }

  // If one user has data the other doesn't, fills in that data for the other with "N/A"
  getUserData = function(){
//    debugger
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

    setTimeout(function() {
      $("#video").css("display", "none")
      $("#add_user").css("display", "block")
      $("#logo").css("display", "block")
      $(".user_data").css("display", "block")
      $(".character_data").css("display", "block")
      $("#display_user")[0].scrollIntoView()
    }, 2000);

    function numberWithCommas(n) {
        var parts=n.toString().split(".");
        parts = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
        return +parseFloat(parts).toFixed(2)
      }
  }
  $scope.removeUnderscore = function(str){
    while (str.includes("_")){
      str = str.replace("_", " ")
    }
    return str
  }

  $scope.allready = function(){
    if ($scope.user !== "Nope"){
      if ($scope.user.fullyLoaded === 'Loaded'){
        return true
      }
    }
    else if($scope.user1.fullyLoaded === 'Loaded' && $scope.user2.fullyLoaded === 'Loaded'){
      return true
    }
    return false
  }

  $scope.bothActive = function(){
    return $scope.user === "Nope"
  }

}])
