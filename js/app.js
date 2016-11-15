let app = angular.module("overwatch_project", [])

$("#video").css("display", "none")
$('#logo').hover(function() {
  $(this)[0].src="css/overstat_sombra.png"
  }, function() {
    $(this)[0].src="css/overstatv3.png"
})
$("#logo").click(function() {
  $("#source")[0].src = "css/CharacterVid/sombra.webm"
  $('#video')[0].pause()
  $('#video')[0].load()
  $("#video").css("display", "block")
  $(".user_data").css("display", "none")
  $(".character_data").css("display", "none")
  $("#add_user").css("display", "none")
  $("#logo").css("display", "none")
})
$("#video").click(function() {
  $('#video')[0].pause()
  $("#video").css("display", "none")
  $("#add_user").css("display", "block")
  $("#logo").css("display", "block")
  $(".user_data").css("display", "block")
  $(".character_data").css("display", "block")
})
