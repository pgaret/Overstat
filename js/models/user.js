const User = (function createUser() {
  return class User {
    constructor(data){
      this.data = data;
      Store.users.push(this);
    }
  }
}())
