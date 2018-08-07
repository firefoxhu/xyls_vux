/* eslint-disable */
import axios from 'axios'
import { getUri, COMMENT_LIST, COMMENT_ARTICLE } from './config'


/**获取当前id文章的所有评论 */
export function getArticleCommentList (id,page = 0, size = 8) {

    const url =getUri(COMMENT_LIST)

    const data = Object.assign({}, {
      id: id,  
      page: page,
      size: size
    })
  
    return axios.get(url, {
      params: data
    }).then((res) => {
      return Promise.resolve(res.data)
    }).catch((e) => {
      console.log(e)
    })
    
}

/**评论当前id文章   特别注意：  post请请求前往不要像get包裹params:{ data }*/
export function commentArticle (id,content) {

    const url =getUri(COMMENT_ARTICLE)

    const data = Object.assign({}, {
      id: id,  
      content: content
    })
    return axios.post(url,data
).then((res) => {
      return Promise.resolve(res.data)
    }).catch((e) => {
      console.log(e)
    })
}


