<template>
  <div class="recommend-container">
    <scroller class="article-scroller" ref="articleScroller" :data="articleList" :pullup="pullup" @scrollToEnd="upDown">
      <div>
        <flexbox orient="vertical">
          <flexbox-item>
            <swiper loop auto :list="swiperList" :index="initSelected"></swiper>
          </flexbox-item>
          <flexbox-item>
            <divider>
              <div class="message">
                <swiper auto  aligin="center" :interval=3000 :show-dots="false">
                  <swiper-item v-for="(item, index) in messageList" :key="index">
                    <p>{{item}}</p>
                  </swiper-item>
                </swiper>
              </div>
            </divider>
            
          </flexbox-item> 
          <flexbox-item>
            <div class="item-box" @click="selectItem(item ,index)" v-for="(item, index) in articleList"  :key="item.id">
              <flexbox v-if="item.showType == 'L'">
                <flexbox-item :span="1/3">
                  <img class="pic" v-lazy="item.images[0]"/>
                </flexbox-item>
                <flexbox-item :span="2/3">
                  <flexbox :gutter="0"  orient="vertical">
                    <flexbox-item>
                      <p class="title">{{item.title}}</p>
                    </flexbox-item>
                    <flexbox-item>
                      <div class="info">
                        <p class="orgin"> {{item.author}}</p>
                        <p class="views">{{item.views}}浏览</p>
                      </div>
                    </flexbox-item>
                  </flexbox>
                </flexbox-item>
              </flexbox>
              <flexbox v-if="item.showType == 'R'">
                <flexbox-item :span="2/3">
                  <flexbox :gutter="0"  orient="vertical">
                    <flexbox-item>
                      <p class="title">{{item.title}}</p>
                    </flexbox-item>
                    <flexbox-item>
                      <div class="info">
                        <p class="orgin"> {{item.author}}</p>
                        <p class="views">{{item.views}}浏览</p>
                      </div>
                    </flexbox-item>
                  </flexbox>
                </flexbox-item>
                <flexbox-item :span="1/3">
                  <img class="pic" v-lazy="item.images[0]"/>
                </flexbox-item>
              </flexbox>
              <flexbox orient="vertical" v-else-if="item.showType == 'T'" >
                <flexbox-item>
                  <p class="title2">{{item.title}}</p>
                </flexbox-item>
                <flexbox-item>
                  <flexbox >
                    <flexbox-item v-for="(pic, index) in item.images" :key="index">
                      <img style="width:100%;height:80px;" v-lazy="pic"/>
                    </flexbox-item>
                  </flexbox>
                </flexbox-item>
                <flexbox-item>
                  <span class="orgin"> {{item.author}}</span>
                  <span class="views">{{item.views}}浏览</span>
                </flexbox-item>
              </flexbox>
            </div>
          </flexbox-item>
          <load-more :show-loading="loading" :tip="tip" background-color="#fbf9fe"></load-more>
          <div style="height:90px;"></div>
        </flexbox>
      </div>
    </scroller>
    <router-view></router-view>
  </div>
</template>


<script>
/* eslint-disable */
import { Swiper, SwiperItem } from 'vux'
import { getSwiperList, getArticleList } from '@/api/article'
import { RESPONSE_CODE, SERVER_NAME } from '@/api/config'
import { mapMutations } from 'vuex'
import { loadViews } from '@/api/cache'

export default {
  data () {
    return {
      messageList: ['推荐就免费上门清洗油烟机、空调、冰柜等生活家电!!!','凡是通过该平台到门店维修一律免费维修!!!','公告：由于系统升级，评论留言将删选。'],
      initSelected: 0,
      swiperList: [],
      spinnerType: 'lines',
      loading: true,
      articleList: [],
      pullup: true,
      tip: '努力加载中...'
    }
  },
  created() {
      this._initSwiper()
      this._initArticle()
  },
  methods: {
    selectItem (item,index) {

      this.$router.push({
        path: `article/${item.id}`
      })

      this.setNews(item);
    },
    _initSwiper() {
      this.swiperList = getSwiperList().map((item, index) => ({
        url: item.url,
        img: item.picUrl,
        fallbackImg: item.fallbackImg,
        title: item.title
      }))
    },
    _initArticle() {
      this.page = 0
      this.size = 8
      getArticleList(this.page, this.size).then((res) => {

        if( !res) {
            this.loading = false
            this.tip = '网络不给力！'
            return;
        }

        if (res.code === RESPONSE_CODE) {

          this.articleList = res.data.list
          this.loading = res.data.hasNext

          this.tip = this.loading ? '努力加载中...' : '没有更多数据~'

        }
      })
    },
    upDown () {
      if (!this.loading) {
        return
      }
      this.page++
      getArticleList(this.page, this.size).then((res) => {
        if (res.code === RESPONSE_CODE) {
          
          this.articleList = this.articleList.concat(res.data.list)
          this.loading = res.data.hasNext

          this.tip = this.loading ? '努力加载中...' : '没有更多数据~'
        }
      })
    },
    ...mapMutations({
      setNews: 'SET_NEWS'
    })
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
.recommend-container{
  position: absolute;
  top: 90px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
}
.article-scroller{
  height: 100%;
}

.pic{
  width: 100%;
  height: 80px;
  margin: 0;
  padding: 0;
}

.title{
  margin-top:-5px;
  letter-spacing: 1px;
  font-size:16px;
  font-weight:bolder;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: #222222;
  line-height: 16px;
  height:50px;
}
.title2{
  letter-spacing: 1px;
  font-size:16px;
  font-weight:bolder;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: #222222;
  line-height: 18px;
}
.item-box{
  box-shadow: 2px 2px 3px 1px #E0E0E0;
  margin: 0 10px 8px 5px;
}
.info{
  height: 30px;
  display: flex;
  width:95%;
}
.views,.orgin{
  align-self: flex-end;
  font-size: 12px;
  color: #aaa;
  flex: 1;
}
.views{
  text-align: right;
}
.message{
  width:300px;
  height:12px;
}
.message p{
  font-size:12px;
  color:#c8c8c8;
}
</style>
