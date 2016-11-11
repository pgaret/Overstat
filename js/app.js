$(function() {
  userController = new UsersController();

  $('add_user').on('submit', function() {
    event.preventDefault();
    userContoller.createUser()
  })

})
