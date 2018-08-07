/* eslint-disable */
import axios from 'axios'
import { getUri, VIDEO_LIST_URI, CATEGORY_URI, CLASS_CATEGORY_VIDEO } from './config'

/** 获取video的类别 */
export function getVideoCategory(page=0,size=6) {
    const url =getUri(CATEGORY_URI)

    const data = Object.assign({}, {
      page: page,
      size: size,
      classId: CLASS_CATEGORY_VIDEO
    })
  
    return axios.get(url, {
      params: data
    }).then((res) => {
      return Promise.resolve(res.data)
    }).catch((e) => {
      console.log(e)
    })
}

/** 根据类别获取video列表 */
export function getVideoByCategory(page=0,size=4,categoryId) {
    const url =getUri(VIDEO_LIST_URI)

    const data = Object.assign({}, {
      page: page,
      size: size,
      categoryId: categoryId
    })
  
    return axios.get(url, {
      params: data
    }).then((res) => {
      return Promise.resolve(res.data)
    }).catch((e) => {
      console.log(e)
    })
}