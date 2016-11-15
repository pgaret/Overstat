angular.module('overwatch_project').controller(
  'CharacterController', ['$scope', 'Character', function($scope, Character){
    //Set up the characters so that I can call on them later without getting errors
    $scope.character1 = "Empty"
    $scope.character2 = "Empty"
    $scope.character = "Empty"
    $scope.img_path = "css/overwatch-logo.jpg"

    $(function(){
      //If the search option is submitted, we need to create 1 or 2 users without refreshing the page
      $("form").submit(function(){
        if ($("#characterSelect").val() !== "None"){
          $scope.character1.fullyLoaded = false
          $scope.character2.fullyLoaded = false
          $scope.character.fullyLoaded = false

          $("#error_message1").text("")
          $("#error_message2").text("")

          $scope.isOne = $("#inputUser1").val()
          $scope.isTwo = $("#inputUser2").val()

          $("#video").css("display", "block")
          $("#add_user").css("display", "none")
          $("#logo").css("display", "none")

          $scope.character_name = $("#characterSelect").val()

          event.preventDefault()
          createCharacters()
        }
      })
      //Create the users - set them up in $scope, see user.js for model details
      function createCharacters(){
        char_name = $("#characterSelect").val().toLowerCase()
        //      debugger
        if ($scope.isOne === "" && $scope.isTwo !== ""){
          $scope.character = new Character($scope.isTwo.replace("#", "-"), char_name)
          $scope.character1 = "Nope"; $scope.character2 = "Nope"
        }
        else if ($scope.isOne !== "" && $scope.isTwo === ""){
          $scope.character = new Character($scope.isOne.replace("#", "-"), char_name)
          $scope.character1 = "Nope"; $scope.character2 = "Nope"
        }
        else{
          $scope.character1 = new Character($scope.isOne.replace("#", "-"), char_name)
          $scope.character2 = new Character($scope.isTwo.replace("#", "-"), char_name)
          $scope.character = "Nope"
        }
      }
      $("#scope_c").click(function(){
        console.log($scope);
      })
    })

    $scope.$watch('[character.fullyLoaded, character1.fullyLoaded, character2.fullyLoaded]', function(){
      //debugger
      if ($scope.character !== "Nope" && ready($scope.character)){
        $scope.character = OneCharacterData($scope.character)
      }
      else if(ready($scope.character1) && ready($scope.character2)){
        getCharacterData()
      }
    })

    //Check if the character is ready to have their keys analyzed
    ready = function(character){
      if (character){
        if (character.fullyLoaded)
          if (character.fullyLoaded !== 'error' && character.fullyLoaded !== false ){
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

    OneCharacterData = function(character){
      $scope.a_general_keys = getKeys(character.data.general_stats)

      for (stat in character.data.general_stats){
        character.data.general_stats[stat] = standardize(character.data.general_stats[stat])
      }

      $("#video").css("display", "none")
      $("#add_user").css("display", "block")
      $("#logo").css("display", "block")

      return character

    }

    function standardize(n) {
        let parts=n.toString().split(".");
        parts= parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
        return +parseFloat(parts).toFixed(2)
      }

    // If one character has data the other doesn't, fills in that data for the other with "N/A"
    getCharacterData = function(){
        let character1gk = getKeys($scope.character1.data.general_stats)
        let character2gk = getKeys($scope.character2.data.general_stats)

        let a_general_keys = uniq(character1gk.concat(character2gk))

        //Now we know all the stats we want to display, so put that in scope
        $scope.a_general_keys = a_general_keys

        for (let i = 0; i < a_general_keys.length; i++){
          if (!character1gk.includes(a_general_keys[i])){
            $scope.character1.data.general_stats[a_general_keys[i]] = ["n/a", 'black']
            $scope.character2.data.general_stats[a_general_keys[i]] = [$scope.character2.data.general_stats[a_general_keys[i]]]
          }
          if (!character2gk.includes(a_general_keys[i])){
            $scope.character2.data.general_stats[a_general_keys[i]] = ["n/a", 'black']
            $scope.character1.data.general_stats[a_general_keys[i]] = [$scope.character1.data.general_stats[a_general_keys[i]]]
          }
          if (character1gk.includes(a_general_keys[i]) && character2gk.includes(a_general_keys[i])) {
            if (isNumeric($scope.character1.data.general_stats[a_general_keys[i]]) || !$scope.character1.data.general_stats[a_general_keys[i]].includes(":")) {
              if(+parseFloat($scope.character1.data.general_stats[a_general_keys[i]]).toFixed(2) === +parseFloat($scope.character2.data.general_stats[a_general_keys[i]]).toFixed(2)) {
                $scope.character1.data.general_stats[a_general_keys[i]] = [numberWithCommas(+parseFloat($scope.character1.data.general_stats[a_general_keys[i]]).toFixed(2)), 'black']
                $scope.character2.data.general_stats[a_general_keys[i]] = [numberWithCommas(+parseFloat($scope.character2.data.general_stats[a_general_keys[i]]).toFixed(2)), 'black']
              }
              else if (parseFloat($scope.character1.data.general_stats[a_general_keys[i]]) > parseFloat(+$scope.character2.data.general_stats[a_general_keys[i]])) {
                $scope.character1.data.general_stats[a_general_keys[i]] = [numberWithCommas(+parseFloat($scope.character1.data.general_stats[a_general_keys[i]]).toFixed(2)), 'green']
                $scope.character2.data.general_stats[a_general_keys[i]] = [numberWithCommas(+parseFloat($scope.character2.data.general_stats[a_general_keys[i]]).toFixed(2)), 'red']
              }
              else {
                $scope.character1.data.general_stats[a_general_keys[i]] = [numberWithCommas(+parseFloat($scope.character1.data.general_stats[a_general_keys[i]]).toFixed(2)), 'red']
                $scope.character2.data.general_stats[a_general_keys[i]] = [numberWithCommas(+parseFloat($scope.character2.data.general_stats[a_general_keys[i]]).toFixed(2)), 'green']
              }
            }
          }
        }

      $("#video").css("display", "none")
      $("#add_user").css("display", "block")
      $("#logo").css("display", "block")

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

    $scope.removeUnderscore = function(str){
      while (str.includes("_")){
        str = str.replace("_", " ")
      }
      return str
    }

    $scope.allready = function(){
      if ($scope.character !== "Nope"){
        if ($scope.character.fullyLoaded === 'Loaded'){
          return true
        }
      }
      else if($scope.character1.fullyLoaded === 'Loaded' && $scope.character2.fullyLoaded === 'Loaded'){
        return true
      }
      return false
    }

    $scope.bothActive = function(){
      return $scope.character === "Nope"
    }


  }])
