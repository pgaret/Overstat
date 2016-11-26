const User = (function(){
  id = 0

  return class User{
    constructor(battletag){
      this.battletag = battletag
      Store.users.push(this)
    }
    addGameData(data){
      this.game_data = data
    }
    addAverageData(data){
      this.average_data = data
      this.loaded = true
    }
    addCharacterData(character, data){
      this.character_data = data
    }
  }
}())
