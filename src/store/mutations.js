/* eslint-disable */
import * as types from './mutation-types'
const matutaions = {
    [types.SET_NEWS](state, news) {
        state.news = news
    },
    [types.SET_SHOP](state, shop) {
        state.shop = shop
    },
    set_img_upload_cache (state, arg) {
        state.imgstore.img_upload_cache = arg
    },
    set_img_paths (state, arg) {
        state.imgstore.img_paths = arg
    },
    set_img_status (state, arg) {
        state.imgstore.img_status = arg
    }
}
export default matutaions