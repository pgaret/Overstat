// const Store = { users: [user1 : {general: general_data, blob: blob_data}], heroes: []}
const Store = {users: [], heroes: []}

function user(){
  return Store.users[Store.users.length - 1]
}

function hereos(){
  return Store.heroes
}
