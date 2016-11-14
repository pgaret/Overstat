angular.module('overwatch_project').controller(
  'CharacterController', ['$scope', 'Character', function($scope, Character){
    //Set up the characters so that I can call on them later without getting errors
    $scope.character1 = "Empty"
    $scope.character2 = "Empty"
    $(function(){
      //If the search option is submitted, we need to create 1 or 2 users without refreshing the page
      $("form").submit(function(){
        $scope.character1.fullyLoaded = false
        $scope.character2.fullyLoaded = false
        if ($("#characterSelect").val() !== "None"){
          $scope.character_name = $("#characterSelect").val()
          $("form").css("margin", "0 auto")
          event.preventDefault()
          createCharacters()
        }
      })
      //Create the users - set them up in $scope, see user.js for model details
      function createCharacters(){
        char_name = $("#characterSelect").val().toLowerCase()
        $scope.character1 = new Character($("#inputUser1").val().replace("#", "-"), char_name)
        if ($("#inputUser2").val() !== ""){
          $scope.character2 = new Character($("#inputUser2").val().replace("#", "-"), char_name)
        }
      }
      $("#scope_c").click(function(){
        console.log($scope);
      })
    })

    $scope.$watch('[character1.fullyLoaded, character2.fullyLoaded]', function(){
        if ($scope.character1.fullyLoaded && ($scope.character2.fullyLoaded || $("#inputUser2").val() === "")){
          getCharacterData()
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

    // If one character has data the other doesn't, fills in that data for the other with "N/A"
    getCharacterData = function(){
      if ($("#inputUser2").val() !== ""){
        let character1gk = getKeys($scope.character1.data.general_stats)
        let character2gk = getKeys($scope.character2.data.general_stats)

        let a_general_keys = uniq(character1gk.concat(character2gk))

        //Now we know all the stats we want to display, so put that in scope
        $scope.a_general_keys = a_general_keys

        for (let i = 0; i < a_general_keys.length; i++){
          if (!character1gk.includes(a_general_keys[i])){
            $scope.character1.data.general_stats[a_general_keys[i]] = "n/a"
          } else {
            if (isNumeric($scope.character1.data.general_stats[a_general_keys[i]])) {
             $scope.character1.data.general_stats[a_general_keys[i]] = numberWithCommas(+$scope.character1.data.general_stats[a_general_keys[i]].toFixed(2))
            }
          }
          if (!character2gk.includes(a_general_keys[i])){
            $scope.character2.data.general_stats[a_general_keys[i]] = "n/a"
          } else {
            if (isNumeric($scope.character2.data.general_stats[a_general_keys[i]])) {
              $scope.character2.data.general_stats[a_general_keys[i]] = numberWithCommas(+$scope.character2.data.general_stats[a_general_keys[i]].toFixed(2))
            }
          }
        }

      }
      else{
        $scope.a_general_keys = getKeys($scope.character1.data.general_stats)
      }

      function numberWithCommas(n) {
          var parts=n.toString().split(".");
          return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
        }
      function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
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
    }

  }])
