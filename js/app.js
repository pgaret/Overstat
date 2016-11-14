let app = angular.module("overwatch_project", [])

$(function(){
  $("#character_name").hover(function(){
    console.log(this.innerHTML)
  })
})
