function userAdapter(battletag, bt1){
  return $.ajax({
    url: `https://owapi.net/api/v2/u/${battletag}/stats/general`,
    method: "get",
    success: function(result, status, xhr){
      let user = new User(battletag)
      user.addGameData(result.game_stats)
      user.addAverageData(result.average_stats)
      battletag === bt1 ? Store.user = user : Store.otheruser = user
      endVideo()
    },
    error: function(xhr, status, error){
      //This should have error functionality eventually
      endVideo()
    }
  })
}

function heroAdapter(battletag, bt1){
  // debugger
  character = $("#selectCharacter").val().toLowerCase()
  return $.ajax({
    url: `https://owapi.net/api/v2/u/${battletag}/heroes/${character}/general`,
    method: "get",
    success: function(result, status, xhr){
      user = new User(battletag)
      user.addCharacterData(character, result.general_stats)
      battletag === bt1 ? Store.user = user : Store.otheruser = user
      endVideo()
    },
    error: function(xhr, status, error){
      //This should have error functionality eventually
      endVideo()
    }
  })
}

function endVideo(){
  setTimeout(function() {
    $("#video").css("display", "none")
    $("#header").css("display", "block")
    $("#average_data").css("display", "block")
    $("#game_data").css("display", "block")
    $("#character_data").css("display", "block")
  }, 500);
}
