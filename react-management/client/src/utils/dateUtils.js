/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2019-11-21 23:58:05
 * @LastEditors: Darren
 * @LastEditTime: 2019-11-22 00:04:42
 */
export function formatDate(time) {
  if (!time) {
    return ""
  }
  let date = new Date(time)
  return date.getFullYear() + '-' + format((date.getMonth() + 1)) + '-' + format(date.getDate()) + ' ' + format(date.getHours()) + ':' + format(date.getMinutes()) + ':' + format(date.getSeconds())
}

function format(arg) {
  return Number(arg) > 10 ? arg : `0${arg}`
}