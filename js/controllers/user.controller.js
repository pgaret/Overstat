$(function(){

})
user = function(){
  return Store.users[Store.users.length - 1]
}
otheruser = function(){
  return Store.users[Store.users.length - 2]
}


parseStat = function(stat){
  while (stat.includes("_")){
    stat = stat.replace("_", " ")
  }
  return stat
}

toHTML = function(data, data2){
  str = "<table>"
  if (!data2){
    for (stat in data){
      str += `<tr><td>${parseStat(stat)}</td><td>${data[stat]}</td></tr>`
    }
  }
  else{
    for (stat in data){
      if (data[stat] === undefined){
        str += `<tr><td style="color: red;">0</td><td>${parseStat(stat)}</td><td style="color: green;">${data2[stat]}</td></tr>`
      }
      else if (data2[stat] === undefined){
        str += `<tr><td style="color: green;">${data[stat]}</td><td>${parseStat(stat)}</td><td style="color: red;">0</td></tr>`
      }
      else if (data[stat] > data2[stat]){
        str += `<tr><td style="color: green;">${data[stat]}</td><td>${parseStat(stat)}</td><td style="color: red;">${data2[stat]}</td></tr>`
      }
      else {
        str += `<tr><td style="color: red;">${data[stat]}</td><td>${parseStat(stat)}</td><td style="color: green;">${data2[stat]}</td></tr>`
      }
    }
  }
  str += "</table>"
  return str
}

empty = function(){
  $("#average_data").empty();
  $("#game_data").empty();
  $("#character_data").empty();
}

function viewData(mode, type, battletag1, battletag2){
  // debugger
  if (battletag1){
    if (battletag2){
      $.when(
        window[mode](battletag1),
        window[mode](battletag2)
      ).then(function(){
        empty()
        $("#"+type).append(toHTML(user[type], otheruser()[type]))
      })
    }
    else {
      window[mode](battletag1).done(function(){
        empty()
        $("#"+type).append(toHTML(user[type], null))
      })
    }
  }
  else{
    window[mode](battletag2).done(function(){
      empty()
      $("#"+type).append(toHTML(user[type], null))
    })
  }
}

function router(toDo){
  input1 = $("#battletag1").val()
  input2 = $("#battletag2").val()
  // debugger
  if (toDo === 'character_data'){
    mode = "heroAdapter"
  }
  else{
    mode = "userAdapter"
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
