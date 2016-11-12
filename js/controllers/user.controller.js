angular.module('overwatch_project').controller(
  'UserController', ['$scope', 'User', function($scope, User){
  $(function(){
    $("form").submit(function(){
      event.preventDefault()
      name = $("#inputUser1").val().replace("#", "-")
      $scope.user = new User()
      $scope.user.load(name)
      $("#inputUser1").val("")
      $("#add_user").css("margin", "0 auto")
    })
  })
}])
