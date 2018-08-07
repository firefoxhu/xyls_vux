/* eslint-disable */
import axios from 'axios'
import { getUri, SEARCH_URI } from './config'


/** 文章搜索 */
export function getArticleSearchResult (keyWord,page = 0, size = 6) {

    const url =getUri(SEARCH_URI)
  
    const data = Object.assign({}, {
      page: page,
      size: size,
      keyWord: keyWord,
      timer: new Date().getTime()
    })
  
    return axios.get(url, {
      params: data
    }).then((res) => {
      return Promise.resolve(res.data)
    }).catch((e) => {
      console.log(e)
    })
}
