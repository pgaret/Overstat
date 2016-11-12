angular.module('overwatch_project').controller(
  'UserController', ['$scope', 'User', function($scope, User){
  $(function(){
    $("form").submit(function(){
      event.preventDefault()
      user1 = $("#inputUser1").val().replace("#", "-")
      if ($("#inputUser2").val() !== ""){
        user2 = $("#inputUser2").val().replace("#", "-")
      }
      $scope.user1 = new User(user1)
      $scope.user2 = new User(user2)
      $("#add_user").css("margin", "0 auto")
    })
  })
}])
