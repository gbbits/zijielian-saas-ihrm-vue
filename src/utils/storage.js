import { isNull } from 'src/utils/validate';

const keyName = 'zijielian-'

/**
 * 一般为5MB
 * 仅在客户端（即浏览器）中保存，不参与和服务器的通信
 *
 * localStorage 除非被清除，否则永久保存
 * sessionStorage 仅在当前会话下有效，关闭页面或浏览器后被清除
 *
 * 存储localStorage
 * data.type {session|local}
 * @param data
 */
export const setStorage = (data = {}) => {
  const name = keyName + data.name
  const obj = {
    dataType: typeof (data.content),
    content: data.content,
    type: data.type,
    datetime: new Date().getTime()
  }
  if (data.type) window.sessionStorage.setItem(name, JSON.stringify(obj))
  else window.localStorage.setItem(name, JSON.stringify(obj))
}

/**
 * 获取localStorage
 * @param data
 * @returns {*|{}|number}
 */
export const getStorage = (data = {}) => {
  const name = keyName + data.name
  let obj = {}; let content
  obj = window.sessionStorage.getItem(name)
  if (isNull(obj)) obj = window.localStorage.getItem(name)
  if (isNull(obj)) return
  try {
    obj = JSON.parse(obj)
  } catch {
    return obj
  }
  if (data.debug) {
    return obj
  }
  // eslint-disable-next-line eqeqeq
  if (obj.dataType == 'string') {
    content = obj.content
    // eslint-disable-next-line eqeqeq
  } else if (obj.dataType == 'number') {
    content = Number(obj.content)
    // eslint-disable-next-line eqeqeq
  } else if (obj.dataType == 'boolean') {
    // eslint-disable-next-line no-eval
    content = eval(obj.content)
    // eslint-disable-next-line eqeqeq
  } else if (obj.dataType == 'object') {
    content = obj.content
  }
  return content
}

/**
 * 删除localStorage
 * @param data
 */
export const delStorage = (data = {}) => {
  const name = keyName + data.name
  if (data.type) {
    window.sessionStorage.removeItem(name)
  } else {
    window.localStorage.removeItem(name)
  }
}

/**
 * 获取全部localStorage
 * @param data
 * @returns {[]}
 */
export const getAllStorage = (data = {}) => {
  const list = []
  if (data.type) {
    for (let i = 0; i <= window.sessionStorage.length; i++) {
      list.push({
        name: window.sessionStorage.key(i),
        content: getStorage({
          name: window.sessionStorage.key(i),
          type: 'session'
        })
      })
    }
  } else {
    for (let i = 0; i <= window.localStorage.length; i++) {
      list.push({
        name: window.localStorage.key(i),
        content: getStorage({
          name: window.localStorage.key(i)
        })
      })
    }
  }
  return list
}

/**
 * 清空全部localStorage
 * @param data
 */
export const delAllStorage = (data = {}) => {
  if (data.type) {
    window.sessionStorage.clear()
  } else {
    window.localStorage.clear()
  }
}
