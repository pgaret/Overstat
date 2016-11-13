// const Store = { users: [user1 : {general: general_data, blob: blob_data}], heroes: []}
const Store = {users: [], characters: []}

function user(){
  return Store.users[Store.users.length - 1]
}

function characters(){
  return Store.characters
}
