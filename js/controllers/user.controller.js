//Basic control flow:
// 1. router function takes in user input, determines how many users and what data they want to see
// 2. viewData function makes the API calls and passes the resulting data to the toHTML function
// 3. toHTML converts the data into HTML strings and returns it to viewData
// 4. viewData appends those HTML strings to the relevant container

//Other notes
// - toHTML executes the comparison and changes the text color
// - the API returns some pretty weird strings (ie time can be 00:30, 30 minutes, )


//Stats come from the API with underscores instead of spaces, we fix that here for display purposes
parseStat = function(stat){
  while (stat.includes("_")){
    stat = stat.replace("_", " ")
  }
  return stat
}

// Take data round to two decimal places if not a whole number. And comma separator for values greate than 1000.
parseData = function(data){
  var parts= String(+parseFloat(data).toFixed(2)).split(".")
  parts = String(parts[0]).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
  return parts
}

//Take keys from object and put into an array so we can call sort on it later on (to show stats alphabetically.)
statsToArr = function(data) {
  stats = []
  for (dat in data) {
    stats.push(dat)
  }
  return stats
}

//We take in two data sets, check whether there is one or two users,
//then appropriately display them using a table
//The coloration also takes place here (does not deal with some string-based edge cases
//as the data came in with some really strange time formatting)
toHTML = function(data, data2, b1, b2){
  let stats = statsToArr(data)
  let stats2 = statsToArr(data2)
  let finalStats = statsToArr(data).sort()
  let finalStats2 = statsToArr(data).sort()
  // console.log(b2)
  let str = "";
  //If there is only one user, display in two columns the stats and values, in black
  if (!data2){
    str += `<div class="displaybattletag">${b1}</div><table>`
    for (let i = 0; i < finalStats.length; i++){
      str += `<tr><td style='text-align: left'>${parseStat(finalStats[i])}</td><td style='text-align: right'>${parseData(data[finalStats[i]])}</td></tr>`
    }
  }
  else if (!data) {
    str += `<div class="displaybattletag">${b2}</div><table>`
      for (let i = 0; i < finalStats2.length; i++){
        str += `<tr><td style='text-align: left'>${parseStat(finalStats2[i])}</td><td style='text-align: right'>${parseData(data2[finalStats2[i]])}</td></tr>`
    }
  }
  //Display the stats - if one user has a stat the other doesn't, display zero, and color is black.
  //Otherwise, color the stat appropriately based on the comparison.
  else{
    str += `<div class="displaybattletag">${b1} vs ${b2}</div><table>`
    let stats3 = _.union(stats, stats2).sort()
    for (let i = 0; i < stats3.length; i++){
      if (data[stats3[i]] === undefined){
        str += `<tr><td style="color: black; text-align: left">0</td><td style='text-align: center'>${parseStat(stats3[i])}</td><td style="color: black; text-align: right">${data2[stats3[i]]}</td></tr>`
      }
      else if (data2[stats3[i]] === undefined){
        str += `<tr><td style="color: black; text-align: left">${parseData(data[stats3[i]])}</td><td style='text-align: center'>${parseStat(stats3[i])}</td><td style="color: black; text-align: right">0</td></tr>`
      }
      else if (data[stats3[i]] > data2[stats3[i]]){
        str += `<tr><td style="color: green; text-align: left">${parseData(data[stats3[i]])}</td><td style='text-align: center'>${parseStat(stats3[i])}</td><td style="color: red; text-align: right">${parseData(data2[stats3[i]])}</td></tr>`
      }
      else if (data[stats3[i]] < data2[stats3[i]]) {
        str += `<tr><td style="color: red; text-align: left">${parseData(data[stats3[i]])}</td><td style='text-align: center'>${parseStat(stats3[i])}</td><td style="color: green; text-align: right">${parseData(data2[stats3[i]])}</td></tr>`
      }
      else {
        str += `<tr><td style="color: black; text-align: left">${parseData(data[stats3[i]])}</td><td style='text-align: center'>${parseStat(stats3[i])}</td><td style="color: black; text-align: right">${parseData(data2[stats3[i]])}</td></tr>`
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
        window[mode](battletag1, battletag1),
        window[mode](battletag2, battletag1)
      ).then(()=>{
        $("#"+type).append(toHTML(Store.user[type], Store.otheruser[type], battletag1, battletag2))
      })
    }
    else {
      window[mode](battletag1).done(function(){
        $("#"+type).append(toHTML(Store.user[type], null, battletag1, battletag2))
      })
    }
  }
  else{
    window[mode](battletag2).done(function(){
      $("#"+type).append(toHTML(Store.otheruser[type], null, battletag1, battletag2))
    })
  }
}

//Takes in the battletags and uses the adapters to grab their data, before shipping
//off the data to the viewData function
function router(toDo){
  input1 = $("#battletag1").val()
  input2 = $("#battletag2").val()

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

}

function showVideo(mode){
  if (mode === "user")
  {
    let heroes = ["Ana","Bastion","D.VA","Genji","Hanzo","Junkrat","Lucio","McCree","Mei","Mercy","Pharah","Reaper","Reinhardt","Roadhog","soldier76","Symmetra","Torbjorn","Tracer","Widowmaker","Winston","Zarya","Zenyatta"]
    let hero = heroes[Math.floor(Math.random()*heroes.length)]
    var vid_name = "css/CharacterVid/" + hero.toLowerCase() + ".webm"
  } else {
    var vid_name = $("#selectCharacter").val().toLowerCase()
    // edge case for soldier: 76
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
