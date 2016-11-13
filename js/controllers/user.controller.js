angular.module('overwatch_project').controller(
  'UserController', ['$scope', 'User', function($scope, User){
  $(function(){
    $("form").submit(function(){
      event.preventDefault()
      createUsers()
      checkUsers()
    })
    function createUsers(){
      $scope.user1 = new User($("#inputUser1").val().replace("#", "-"))
      if ($("#inputUser2").val() !== ""){
        $scope.user2 = new User($("#inputUser2").val().replace("#", "-"))
      }
    }
    function checkUsers(){
      debugger
      if ($scope.user1 && $scope.user2){
        if ($scope.user1.loadedFully == true && $scope.user2.loadedFully == true){
          console.log("Ready")
        }
      }
    }
  })
  }])
