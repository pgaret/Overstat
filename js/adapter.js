function userAdapter(battletag){
  return $.ajax({
    url: `https://owapi.net/api/v2/u/${battletag}/stats/general`,
    method: "get",
    success: function(result, status, xhr){
      user = new User(battletag)
      user.addGameData(result.game_stats)
      user.addAverageData(result.average_stats)
    },
    error: function(xhr, status, error){
      //This should have error functionality eventually
    }
  })
}

function heroAdapter(battletag){
  // debugger
  character = $("#selectCharacter").val().toLowerCase()
  return $.ajax({
    url: `https://owapi.net/api/v2/u/${battletag}/heroes/${character}/general`,
    method: "get",
    success: function(result, status, xhr){
      user = new User(battletag)
      user.addCharacterData(character, result.general_stats)
    },
    error: function(xhr, status, error){
      //This should have error functionality eventually
    }
  })
}
