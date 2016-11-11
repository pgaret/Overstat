class UsersController {

  createUser() {

    function usersAdapter(battletag){
      return $.ajax({
      method: "GET",
      url: `https://owapi.net/api/v2/u/${battletag}/stats/general`
      }).done(function( response ) {
        let data = response
        new User(data, data.battletag)
      });
    }
    $('#user_1').append()

  }


}
