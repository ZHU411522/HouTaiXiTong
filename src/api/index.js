import ajax from './ajax'

// 登录接口封装
export const reqLogin = (username, password) =>
  ajax('/login', { username, password }, 'POST')

// 获取一级/二级分类
export const reqCategorys = (parentId) =>
  ajax('/manage/category/list', { parentId })
