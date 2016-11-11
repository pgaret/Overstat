$(function() {
  userController = new UsersController();

  $('#add_user').on('submit', function() {
    event.preventDefault();
    let user1 = $('#inputUser1').val().replace("#", "-")
    userController.usersAdapter(user1)
  })

})
