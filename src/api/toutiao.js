/**
 *  获取新闻：https://m.toutiao.com/list/?tag=新闻类型&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=时间

    获取文章：https://m.toutiao.com/i新闻ID/info/'

    获取段子：https://www.toutiao.com/api/article/feed/?category=essay_joke&utm_source=toutiao&widen=1&max_behot_time=1500114422&max_behot_time_tmp=1500114422&tadrequire=true&as=A1F52966E9EEF00&cp=59692E6FD0E09E1

    搜索： https://www.toutiao.com/search_content/?offset=相对位置&format=json&keyword=关键词&autoload=true&count=20&cur_tab=1
 */
/* eslint-disable */
import jsonp from 'jsonp'

 const category = [
    {
        type: '__all__',text: '推荐'
    },
    {
        type: 'news_hot', text: '热点'
    },
    {
        type: 'news_society', text: '社会'
    },
    {
        type: 'news_entertainment', text: '娱乐'
    },
    {
        type: 'news_tech', text: '科技'
    },
    {
        type: 'news_car', text: '汽车'
    },
    {
        type: 'news_sports', text: '体育'
    },
    {
        type: 'news_finance', text: '财经'
    },
    {
        type: 'news_military', text: '军事'
    },
    {
        type: 'news_world', text: '国际'
    },
    {
        type: 'news_fashion', text: '时尚'
    }
 ]

 
 export function getSearchQuestionList(keyWork,page = 0,size = 20,callback) {
    let url = 'https://www.toutiao.com/search_content/?offset='+page+'&format=json&keyword='+keyWork+'&autoload=true&count='+size+'&cur_tab=1'
    jsonp(url, { timeout: 3000 },function (err, res) {       
        callback(res)
    })

 }

 export function getSearchQuestionDetail(id,callback) {
    let url = 'https://m.toutiao.com/i'+id+'/info/'
    jsonp(url, { timeout: 3000 },function (err, res) {       
        callback(res)
    })

 }

 export function getTouTiaoByCategory(category) {

    jsonp('https://m.toutiao.com/list/?tag=' 
    + category + 
    '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt(new Date().getTime() / 1000),
        { timeout: 3000 },
        function (err, res) {
            console.log(res)
        if (err || res.data.length === 0) {
            console.log(res.data)
            return res.data
        }
    })

 }


