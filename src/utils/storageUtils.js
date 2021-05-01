import store from 'store'
const User_KEY = 'user_key'
export default {
  saveUser(user) {
    store.set(User_KEY, user)
  },
  getUser() {
    return store.get(User_KEY)
  },
  removeUser() {
    store.remove(User_KEY)
  },
}

/*
进行local数据存储管理的工具模块
 */
// import store from "store";
// const USER_KEY = "user_key";
// export default {
//   saveUser(user) {
//     store.set(USER_KEY, user);
//   },
//   getUser() {
//     return store.get(USER_KEY) || {};
//   },
//   removeUser() {
//     store.remove(USER_KEY);
//   },
// };
