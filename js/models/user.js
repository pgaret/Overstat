const User = (function createUser() {
  return class User {
    constructor(data){
      this.data = data;
      this.battletag = data.battletag;
      Store.users.push(this);
    }
  }
})
