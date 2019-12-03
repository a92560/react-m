/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2019-11-21 14:42:53
 * @LastEditors: Darren
 * @LastEditTime: 2019-12-01 15:50:41
 */
/* 
  包含应用中所有接口请求函数
*/

import ajax from './ajax'
import jsonp from 'jsonp'
import { ak } from '../config/apiConfig'
import { message } from 'antd'
const urlPrefix = "/api"
export function reqLogin(username, password) {
  return ajax({
    method: "POST",
    url: `${urlPrefix}/login`,
    data: {
      username,
      password
    }
  })
}

export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=${ak}`
    jsonp(url, {}, (err, data) => {
      if (!err && data.error === 0) {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0]
        resolve({ dayPictureUrl, weather })
      } else {
        message.error("获取天气信息失败")
      }
    })
  })
}

export const reqCategoryList = (page = 1, per_page = 3) => ajax.get(`${urlPrefix}/categorys/`, { params: { page, per_page } })

export function reqAddCategory(name) {
  return ajax({
    method: "POST",
    url: `${urlPrefix}/categorys/`,
    data: {
      name
    }
  })
}

export function reqUpdateCategory(cateId, name) {
  return ajax.patch(`${urlPrefix}/categorys/${cateId}`, { name: name })
}

// 请求商品列表
export const reqGetProduct = () => ajax("/api/products")

// 商品搜索
export const reqGetSearchProduct = (searchType, k) => ajax("/api/products", { params: { searchType, k } })


// 更新商品
export function reqUpdateProduct(proId, data) {
  return ajax({
    method: "PATCH",
    url: `${urlPrefix}/products/${proId}`,
    data
  })
}

// 根据分类ID获取分类名称
export const reqCategoryName = (cateId) => ajax(`${urlPrefix}/categorys/${cateId}`)

// 根据商品ID获取商品数据
export const reqProductDetail = (proId) => ajax(`${urlPrefix}/products/${proId}`)

// 获取分类列表
export const reqCategorys = () => ajax(`${urlPrefix}/categorys/`)


// 删除图片
export const reqDeleteImg = (name) => ajax.delete(`${urlPrefix}/products/image/upload`, { params: { name } })


// 添加商品
export const reqAddProduct = (data) => ajax.post(`${urlPrefix}/products`, data)

// 获取角色列表
export const reqGetRoles = ({ page, per_page }) => ajax(`${urlPrefix}/roles`, { params: { page, per_page } })


// 添加角色
export const reqAddRole = (roleName) => ajax.post(`${urlPrefix}/roles/`, { roleName })

// 更新角色权限
export const reqUpdateRole = (_id, data) => ajax.patch(`${urlPrefix}/roles/${_id}`, data)


// 获取所有角色列表
export const reqUserList = () => ajax(`${urlPrefix}/users/`)

// 添加用户
export const reqAddUser = (data) => ajax.post(`${urlPrefix}/users/`, data)


// 修改用户
export const reqUpdateUser = (_id, data) => ajax.patch(`${urlPrefix}/users/${_id}`, data)

// 删除用户
export const reqDeleteUser = (_id) => ajax.delete(`${urlPrefix}/users/${_id}`)