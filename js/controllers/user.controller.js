//Basic control flow:
// 1. router function takes in user input, determines how many users and what data they want to see
// 2. viewData function makes the API calls and passes the resulting data to the toHTML function
// 3. toHTML converts the data into HTML strings and returns it to viewData
// 4. viewData appends those HTML strings to the relevant container

//Other notes
// - toHTML executes the comparison and changes the text color
// - the API returns some pretty weird strings (ie time can be 00:30, 30 minutes, )

//Gets the most recently added user
user = function(){
  return Store.users[Store.users.length - 1]
}
//Gets the second most recently added user, for the 2-user use case
otheruser = function(){
  return Store.users[Store.users.length - 2]
}

//Stats come from the API with underscores instead of spaces, we fix that here for display purposes
parseStat = function(stat){
  while (stat.includes("_")){
    stat = stat.replace("_", " ")
  }
  return stat
}

parseData = function(data){
  var parts= String(+parseFloat(data).toFixed(2)).split(".")
  parts = String(parts[0]).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
  return parts
}

//We take in two data sets, check whether there is one or two users,
//then appropriately display them using a table
//The coloration also takes place here (does not deal with some string-based edge cases
//as the data came in with some really strange time formatting)
toHTML = function(data, data2){
  str = "<table>"
  //If there is only one user, display in two columns the stats and values, in black
  if (!data2){
    for (stat in data){
      console.log(data[stat])
      str += `<tr><td>${parseStat(stat)}</td><td>${parseData(data[stat])}</td></tr>`
    }
  }
  //Display the stats - if one user has a stat the other doesn't, display zero.
  //Otherwise, color the stat appropriately based on the comparison
  else{
    for (stat in data){
      if (data[stat] === undefined){
        str += `<tr><td style="color: red;">0</td><td>${parseStat(stat)}</td><td style="color: green;">${data2[stat]}</td></tr>`
      }
      else if (data2[stat] === undefined){
        str += `<tr><td style="color: green;">${parseData(data[stat])}</td><td>${parseStat(stat)}</td><td style="color: red;">0</td></tr>`
      }
      else if (data[stat] > data2[stat]){
        str += `<tr><td style="color: green;">${parseData(data[stat])}</td><td>${parseStat(stat)}</td><td style="color: red;">${parseData(data2[stat])}</td></tr>`
      }
      else {
        str += `<tr><td style="color: red;">${parseData(data[stat])}</td><td>${parseStat(stat)}</td><td style="color: green;">${parseData(data2[stat])}</td></tr>`
      }
    }
  }
  str += "</table>"
  return str
}

//Checks whether 1 or 2 people and makes sure player 1 and player 2 can both show independently
//Calls the toHTML function which returns the formatted data for HTML and appends it to the relevant container
function viewData(mode, type, battletag1, battletag2){
  if (battletag1){
    if (battletag2){
      $.when(
        window[mode](battletag1),
        window[mode](battletag2)
      ).then(function(){
        battletag1 === user.battletag ? $("#"+type).append(toHTML(user[type], otheruser()[type])) : $("#"+type).append(toHTML(otheruser()[type], user[type]))
      })
    }
    else {
      window[mode](battletag1).done(function(){
        $("#"+type).append(toHTML(user[type], null))
      })
    }
  }
  else{
    window[mode](battletag2).done(function(){
      $("#"+type).append(toHTML(user[type], null))
    })
  }
}

//Takes in the battletags and uses the adapters to grab their data, before shipping
//off the data to the viewData function
function router(toDo){
  input1 = $("#battletag1").val()
  input2 = $("#battletag2").val()

  // debugger
  if (toDo === 'character_data'){
    mode = "heroAdapter"
    showVideo("hero")
  }
  else{
    mode = "userAdapter"
    showVideo("user")
  }

  if (input1 !== "" && input2 !== ""){
    viewData(mode, toDo, input1, input2)
  }
  else if (input1 !== ""){
    viewData(mode, toDo, input1, null)
  }
  else if (input2 !== ""){
    viewData(mode, toDo, input2, null)
  }
  else {
    console.log("Nobody home")
  }

}

function showVideo(mode){
  // debugger
  if (mode === "user")
  {
    let heroes = ["Ana","Bastion","D.VA","Genji","Hanzo","Junkrat","Lucio","McCree","Mei","Mercy","Pharah","Reaper","Reinhardt","Roadhog","soldier76","Symmetra","Torbjorn","Tracer","Widowmaker","Winston","Zarya","Zenyatta"]
    let hero = heroes[Math.floor(Math.random()*heroes.length)]
    var vid_name = "css/CharacterVid/" + hero.toLowerCase() + ".webm"
  } else {
    var vid_name = $("#selectCharacter").val().toLowerCase()
    if (vid_name === "soldier: 76"){
      vid_name = "css/CharacterVid/soldier76.webm"
    } else {
      vid_name = "css/CharacterVid/" + $("#selectCharacter").val().toLowerCase() + ".webm"
    }
  }
  $("#source")[0].src = vid_name
  $('#video')[0].pause()
  $('#video')[0].load()
  $("#average_data").empty()
  $("#game_data").empty()
  $("#character_data").empty()
  $("#average_data").css("display", "none")
  $("#game_data").css("display", "none")
  $("#character_data").css("display", "none")
  $("#header").css("display", "none")
  $("#video").css("display", "block")

}
