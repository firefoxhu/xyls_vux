/* eslint-disable */
import axios from 'axios'
import { getUri, SQUARE_LIST, SQUARE_SEND } from './config'


/**获取帖子列表 */
export function getPostList (page = 0, size = 8) {

    const url =getUri(SQUARE_LIST)

    const data = Object.assign({}, {
      page: page,
      size: size
    })
  
    return axios.get(url, {
      params:data
    }).then((res) => {
      return Promise.resolve(res.data)
    }).catch((e) => {
      console.log(e)
    })
}


/**评论当前id文章   特别注意：  post请请求前往不要像get包裹params:{ data }*/
export function postSend (content, concat, pic) {

    const url =getUri(SQUARE_SEND)

    const data = Object.assign({}, {
      content: content,
      concat: concat,
      pic: pic
    })
    return axios.post(url,data
).then((res) => {
      return Promise.resolve(res.data)
    }).catch((e) => {
      console.log(e)
    })
}
