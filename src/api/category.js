/* eslint-disable */
import axios from 'axios'
import { CATEGORY_URI, getUri, CLASS_CATEGORY_LIFE } from './config'

/**获取所有的生活电器类型 */
export function getCategoryList (page = 0,size = 14) {

    const url =getUri(CATEGORY_URI)

    const data = Object.assign({}, {
        page: page,
        size: size,
        classId: CLASS_CATEGORY_LIFE
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch((e) => {
        console.log(e)
    })
}