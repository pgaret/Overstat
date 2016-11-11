class UsersController {

  createUser(data) {
    console.log("hi")
    new User(data)
  }


  showUser(data) {
    console.log('bye')
    debugger
    $('.user_1').append(`<p>${data.battletag}</p>`)
  }

  usersAdapter(battletag){
    return $.ajax({
    method: "GET",
    url: `https://owapi.net/api/v2/u/${battletag}/stats/general`
  }).done((response)=> {
    this.createUser(response)
    this.showUser(response)
  })
    // }).done(function(response) {
    //   var x = response.responseText
    //   debugger
    // });
    // return x
  }

}
