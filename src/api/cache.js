/* eslint-disable */
import storage from 'good-storage'

// 点赞次数
const FABULOUS_KEY = '__fabulous__'
// 评论
const COMMENT_KEY = '__comment__'
// 浏览
const VIEWS_KEY = '__views__'

// 播放



export function saveFabulous(fablous) {
    storage.set(FABULOUS_KEY+fablous.id, fablous)
}

export function loadFabulous(fablous) {
    return storage.get(FABULOUS_KEY+fablous.id, [])
}


export function saveComment(comment) { 
    storage.set(COMMENT_KEY+comment.id, fablous)
}

export function loadComment(comment) {
    return storage.get(COMMENT_KEY+comment.id, [])
}

export function saveViews(views) { 
    storage.set(VIEWS_KEY+views.id, views)
}

export function loadViews(views) {
    return storage.get(VIEWS_KEY+views.id, [])
}
