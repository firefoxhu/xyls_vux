/* eslint-disable */
import axios from 'axios'
import { ARTICLE_HOT_URI, getUri, ARTICLE_BY_CATEGORY_URI, DETAIL_URI, FABULOUS, VIEWS_URI } from './config'

/**轮播图 */
export function getSwiperList () {
    return  [
        {
          url: '',
          picUrl: 'http://luosen365.com/image/20180425/1524639638619.jpg',
          title: '',
          fallbackImg: 'x'
        },
        {
          url: '',
          picUrl: 'http://luosen365.com/image/20180425/1524640019069.jpg',
          title: '',
          fallbackImg: 'x'
        },
        {
          url: '',
          picUrl: 'http://luosen365.com/image/20180425/1524639781449.jpg',
          title: '',
          fallbackImg: 'x'
        }
      ]
}

let data = {
  code: 0,
  data: [
    {
      id: 'dfsaafdsdsfdfsa',
      title: 'xxxxxxxxxxxxxxxxx',
      images: [
        'http://luosen365.com/image/20180330/1522381860204.png',
        'http://luosen365.com/image/20180330/1522381860204.png',
        'http://luosen365.com/image/20180330/1522381860204.png',
      ],
      content: 'fdsafdsafdsafdsafdsaf',
      time: 'fdsafdf',
      views: '9999',
      author: '信阳罗森'

    }
  ]
}

/**热点 */
export function getArticleList (page = 0, size = 8) {

    const url =getUri(ARTICLE_HOT_URI)

    const data = Object.assign({}, {
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


/**根据类型获取列表 */
export function getArticleByCategoryId(typeid, page = 0, size = 8) {

  const url =getUri(ARTICLE_BY_CATEGORY_URI)

  const data = Object.assign({}, {
    page: page,
    size: size,
    typeId: typeid
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}

/**根据id获取内容详情 */
export function getArticleById(id){

  const url =getUri(DETAIL_URI)

  const data = Object.assign({}, {
    id: id
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}



/**根据id获取内容详情 */
export function ArticleFabulous(id){

  const url =getUri(FABULOUS)

  const data = Object.assign({}, {
    id: id
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}

/**浏览量发送统计 */
export function countViews(id) {

const url =getUri(VIEWS_URI)

  const data = Object.assign({}, {
    id: id
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}
