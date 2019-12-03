/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2019-11-21 19:25:29
 * @LastEditors: Darren
 * @LastEditTime: 2019-11-21 21:59:25
 */
export default {
  saveUser(data) {
    localStorage.setItem("user", JSON.stringify(data))
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user") || "{}")
  },
  removeUser() {
    localStorage.removeItem("user")
  }
}