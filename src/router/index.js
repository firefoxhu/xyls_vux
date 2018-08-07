import Vue from 'vue'
import Router from 'vue-router'
import Article from '@/components/article/article'
import ArticleDetail from '@/components/article-detail/article-detail'
import Category from '@/components/category/category'
import CategoryArticle from '@/components/category-list/category-list'
import Shop from '@/components/shop/shop'
import ShopDetail from '@/components/shop-detail/shop-detail'
import Search from '@/components/search/search'
import Video from '@/components/video/live-video'
import Circle from '@/components/circle/circle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/article'
    },
    {
      path: '/article',
      name: '文章列表',
      component: Article,
      children: [
        {
          path: ':id',
          component: ArticleDetail
        }
      ]
    },
    {
      path: '/category',
      name: '类别',
      component: Category,
      children: [
        {
          path: ':type',
          component: CategoryArticle,
          children: [
            {
              path: ':id',
              component: ArticleDetail
            }
          ]
        }
      ]
    },
    {
      path: '/shop',
      name: '门店',
      component: Shop,
      children: [
        {
          path: ':id',
          component: ShopDetail
        }
      ]
    },
    {
      path: '/search',
      name: '搜索',
      component: Search,
      children: [
        {
          path: ':id',
          component: ArticleDetail
        }
      ]
    },
    {
      path: '/video',
      name: '视频',
      component: Video
    },
    {
      path: '/circle',
      name: '圈子',
      component: Circle
    }
  ]
})
