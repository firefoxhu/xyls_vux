<template>
  <transition  leave-active-class="slideOutRight" enter-active-class="slideInRight">
    <div class="animated search-container">
      <flexbox orient="vertical">
        <!-- header 头部-->
        <flexbox-item>
          <x-header :left-options="{showBack: false}" style="background-color:#D43D3D;">
            <a slot="left"  @click="back">
              <x-icon type="ios-arrow-back" size="35"  style="fill:#fff;position:relative;top:-12px;left:-23px;"></x-icon>
            </a>
            <div class="search-box">
              <input v-model="keyWord" class="serach-input" type="text" placeholder="请输入您要查询的关键字" v-on:keyup.13="searchKeyWord"/>
              <icon  class="animated wobble" @click.native="clearInput" v-show="keyWord.length >= 1" type="cancel" size="20" style="border-radius:8px;fill:#fff;position:relative;top:1.5px;left:-35px;"></icon>
            </div>
            <a slot="right" @click="searchKeyWord">
              <x-icon class="animated tada"  type="ios-search-strong" size="35" style="fill:#fff;position:relative;top:-12px;left:12px;"></x-icon>
            </a>
          </x-header>
        </flexbox-item>
        <!-- body 热词-->
        <flexbox-item>
          <divider>常见问题搜索</divider>
        </flexbox-item>  
        <flexbox-item>
          <div class="grad" style="width:95%;padding:0 0 15px 0;box-shadow: 2px 2px 3px 1px rgb(221, 101, 167);margin:0 auto;border-radius: 8px;text-align: center;">
            <x-button @click.native="searchByRecommend('空调过敏')" action-type="button" class="animated bounce"    mini :gradients="['#1D62F0', '#19D5FD']">空调过敏</x-button>
            <x-button @click.native="searchByRecommend('空调漏水')" action-type="button" class="animated pulse" mini :gradients="['#A644FF', '#FC5BC4']">空调漏水</x-button>
            <x-button @click.native="searchByRecommend('空调制冷')" action-type="button" class="animated flash" mini>空调不制冷</x-button>
            <x-button @click.native="searchByRecommend('油烟机清洗')" action-type="button" class="animated rubberBand" mini :gradients="['#FF2719', '#FF61AD']">油烟机多久清洗一次</x-button>
            <x-button @click.native="searchByRecommend('热水器')" action-type="button" class="animated shake" mini :gradients="['#6F1BFE', '#9479DF']">热水器其实很脏</x-button>
            <x-button @click.native="searchByRecommend('空调扇')" action-type="button" class="animated swing" mini type="primary">空调扇</x-button>
            <x-button @click.native="searchByRecommend('冰箱制冷')" action-type="button" class="animated tada" mini :gradients="['#FF5E3A', '#FF9500']">冰箱制冷效果不好</x-button>
            <x-button @click.native="searchByRecommend('空调故障代码')" action-type="button" class="animated wobble" mini type="warn">空调故障代码</x-button>
            <x-button @click.native="searchByRecommend('马桶')" action-type="button" class="animated jello" mini type="primary">马桶的正确使用方法</x-button>
          </div>
        </flexbox-item>
        <!-- body 热词搜索列表-->
        <flexbox-item>
          <div style="height:100%;width:100%;position: fixed;">
            <scroller ref="scroll" class="scroll" :data="rsearchList" :pullup="pullup" @scrollToEnd="recommendDown">
              <flexbox orient="vertical">
                <flexbox-item v-for="(item, index) in rsearchList" :key="index" class="animated bounce vux-1px-b">
                  <div  @click="recommendDetail(item)" style="margin: 10px 5px;height:80px;">
                    <flexbox :gutter="0">
                      <flexbox-item :span="1/3">
                        <img style="width:100%;height:80px;" v-lazy="item.images[0]"/>
                      </flexbox-item>
                      <flexbox-item :span="2/3" style="">
                        <div style="height:60px;overflow:hidden;padding-left:3px;">
                          <h5>{{item.title}}</h5>
                        </div>
                        <div style="height:15px;font-size:12px;color:#ccc;padding:0 3px;">
                          <span style="float:left;"> {{item.author}}</span>
                          <span style="float:right;">{{item.views}}浏览</span>
                          <span style="float:right;">{{item.fabulous}}赞&nbsp;&nbsp;</span>
                        </div>
                      </flexbox-item>
                    </flexbox>
                  </div>
                </flexbox-item>
                <load-more style="margin:20px auto;" :show-loading="rloading" :tip="rtip" background-color="#fbf9fe"></load-more>
                <div style="height:280px;margin-top:0px;margin:0 auto;">  
                </div>
              </flexbox>
            </scroller>
          </div>
        </flexbox-item>
      </flexbox>

      <!--今日头条搜索列表弹出列表-->
      <div v-transfer-dom>
        <popup v-model="popupShow" width="100%" height="100%"
          position="bottom">
            <flexbox orient="vertical">
              <flexbox-item>
                <x-header :left-options="{showBack: false}" style="background-color:#D43D3D;">
                  <div style="margin-top: 5px;" slot="overwrite-title" >
                    <button-tab>
                      <button-tab-item @click.native="ttabShow = 1" selected >搜索结果</button-tab-item>
                      <button-tab-item @click.native="ttabShow = 2" ><span class="vux-reddot-s">历史浏览</span></button-tab-item>
                    </button-tab>
                  </div>
                  <a slot="right" @click="popupShow = false">
                    <x-icon class="animated bounce" type="ios-arrow-down" size="35" style="fill:#fff;position:relative;top:-10px;left:12px;"></x-icon>
                  </a>
                </x-header>
              </flexbox-item>
              <flexbox-item v-if="ttabShow == 1">
                <div style="height:100%;width:100%;position: fixed;">
                  <scroller  class="scroll" :data="tsearchList" :pullup="pullup" @scrollToEnd="touTiaoMore">
                    <flexbox orient="vertical">
                      <flexbox-item  v-for="(item, index) in tsearchList" :key="index" class="vux-1px-b">
                        <div @click="getSearchQuestionDetail(item)" style="margin: 10px 5px;height:80px;">
                          <flexbox :gutter="0">
                            <flexbox-item :span="1/3">
                              <img style="width:100%;height:80px;" v-lazy="item.images"/>
                            </flexbox-item>
                            <flexbox-item :span="2/3" style="">
                              <div style="height:60px;overflow:hidden;padding-left:3px;">
                                <h5>{{item.title}}</h5>
                              </div>
                            </flexbox-item>
                          </flexbox>
                        </div>
                      </flexbox-item>
                      <flexbox-item>
                        <load-more :show-loading="tloading" :tip="ttip" background-color="#fbf9fe"></load-more>
                        <div style="height:40px;">  
                        </div>
                      </flexbox-item>

                    </flexbox>
                  </scroller>
                </div>
              </flexbox-item>
              <flexbox-item v-if="ttabShow == 2" style="margin-top:40px;">
                <divider>暂无历史浏览记录</divider>
              </flexbox-item>
            </flexbox>    
        </popup>
      </div>

      <!-- 今日头条详情弹窗-->
      <div v-transfer-dom>
        <popup v-model="popupDetailShow" width="100%" height="100%" class="vux-scrollable"
        position="right"
        @on-hide="popupShow = true"
        @on-show="popupShow = false"
        >
        <flexbox orient="vertical">
          <flexbox-item>
            <x-header :left-options="{showBack: false}" style="background-color:#D43D3D;">
              <a slot="right" @click="popupDetailShow = false">
                <x-icon class="animated bounce" type="ios-arrow-down" size="35" style="fill:#fff;position:relative;top:-10px;left:12px;"></x-icon>
              </a>
            </x-header>
          </flexbox-item>
          <flexbox-item>
            <div style="height:100%;width:100%;position: fixed;">
              <scroller ref="tscroll" class="scroll"  :pullup="pullup" @scrollToEnd="restHeight">
                <flexbox orient="vertical">
                  <flexbox-item>
                    <h4 v-html="ttitle" style="padding:5px;"></h4>
                  </flexbox-item>
                  <flexbox-item>
                    <div v-html="tcontent" id="tcontent" @click="proxyImage"></div>
                  </flexbox-item>
                  <flexbox-item style="height:50px;">
                  </flexbox-item>
                </flexbox> 
              </scroller>
            </div>
          </flexbox-item>
        </flexbox>  
        </popup>
      </div>
      <!-- 今日头条详情弹窗 文章详情图片预览-->
      <div v-transfer-dom>
          <previewer :list="previewerList" ref="previewer" :options="options"></previewer>
      </div>
      <!--路由本地定向搜索详情单页面-->
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
import { Previewer, ButtonTab, ButtonTabItem, XButton, Badge, Popup, Icon } from 'vux'
import { getArticleSearchResult } from '@/api/search'
import { RESPONSE_CODE } from '@/api/config'
import { mapMutations } from 'vuex'
import { getSearchQuestionList, getSearchQuestionDetail } from '@/api/toutiao'
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      pullup: true,
      /**本地定向搜索模块 */
      rkeyWord: '',
      rsearchList: [],
      rloading: false,
      rtip: '点击常见搜索问题',
      /** 头条搜索的列表 */
      popupShow: false,
      keyWord: '',
      tloading: false,
      ttip: '下拉加载更多...',
      tsearchList: [],
      /** 头部的tab切换 */
      ttabShow: 1,
      /** 详情面板的显示也隐藏 */
      popupDetailShow: false,
      /** 预览图片 */
      tcontent: '',
      ttitle: '',
      /** 预览图片 */
      previewerList: [],
      previewerIndex: 0,
      options: {
          index: 0
      }
    }      
  },
  methods: {

    recommendDetail(item) {
      if(!item.id) {
        return
      }

      this.$router.push({
        path: `/search/${item.id}`
      })

      this.setNews(item)
    },
    searchByRecommend(key) {

      this.rkeyWord = key
      this.rtip =  '努力查找中...'
      this.rloading = true

      this.$vux.loading.show({
        text: '搜索中...'
      })
      setTimeout(() => {

        this.rpage = 0
        this.rsize = 6 
        getArticleSearchResult(key, this.rpage, this.rsize).then((res)=>{
          if (res.code === RESPONSE_CODE) {

            this.rsearchList = res.data.list
            this.rloading = res.data.hasNext

            this.rtip = this.rloading ? '努力加载中...' : '暂无数据~'
          }
        })
        this.$vux.loading.hide()
      }, 2000)  
    },
    recommendDown() {

      // 检查是否有下一页数据
      if( !this.rloading){
        return
      }
      // 点击要搜索的关键字
      if(this.rkeyWord.length === 0) {
        return
      }

      this.rpage++

      getArticleSearchResult(this.keyWord, this.rpage, this.rsize).then((res)=>{
        if (res.code === RESPONSE_CODE) {
          this.rsearchList = this.rsearchList.concat(res.data.list)
          this.rloading = res.data.hasNext
          this.rtip = this.rloading ? '努力加载中...' : '没有更多数据~'
        }
      })
    },
    searchKeyWord() {
      if(this.keyWord.length > 0){
        this.popupShow = true
        this.page = 0
        this.size = 20

        getSearchQuestionList(this.keyWord, this.page, this.size, (res)=> {
          let temp =[]
          for( let x in res.data){
            if( res.data[x].id === undefined || 
              res.data[x].title=== undefined || 
              res.data[x].image_url === undefined || 
              res.data[x].has_video===undefined || 
              res.data[x].has_video === true)
              continue
            temp.push({
              id: res.data[x].id,
              title: res.data[x].title,
              images: res.data[x].image_url
            })
          }

          this.tsearchList = temp
        })
      }else {
        this.$vux.toast.text('请输入您要搜索的关键字', 'top')
      }
    },
    touTiaoMore() {
      this.page++
      this.ttip = '数据正在加载中...'
      getSearchQuestionList(this.keyWord, this.page, this.size, (res)=> {
        let temp = []
        for( let x in res.data){
          if( res.data[x].id === undefined || 
              res.data[x].title=== undefined || 
              res.data[x].image_url === undefined || 
              res.data[x].has_video===undefined || 
              res.data[x].has_video === true)
            continue
            
          temp.push({
            id: res.data[x].id,
            title: res.data[x].title,
            images: res.data[x].image_url,
          })
        }
        this.tsearchList = this.tsearchList.concat(temp)
        this.ttip = '下拉加载更多...'
      })
    },
    getSearchQuestionDetail(item){
      this.previewerList = []
      this.popupDetailShow = true
      getSearchQuestionDetail(item.id,(res)=>{
        if( res.success === true){
          this.tcontent = res.data.content.replace(/<img/g,'<img style="width:100%;margin:0 auto;"')
          this.ttitle = res.data.title
          return
        } 
        this.popupDetailShow = false
      })

    },
    restHeight() {
      if (!this.$refs.tscroll) {
        return
      }

      this.$refs.tscroll.refresh()
    },
    proxyImage(e) {

      if(e.target.tagName != 'IMG') {
        return
      }
      
      // 已处理过的不在处理
      if(this.previewerList.length != 0){
          this.options.index = Number(e.target.alt)
          this.$refs.previewer.show(this.options.index)
          return
      }
      // 获取去内容里所有的图片
      let imgs=document.getElementById("tcontent").getElementsByTagName("img")

      // 没有图片时
      if(imgs.length === 0){
        return
      }

      // 动态添加样式 并保存数组
      for(var i=0;i<imgs.length;i++){
          imgs[i].setAttribute("class","previewer")
          imgs[i].setAttribute("alt",i)
          this.previewerList.push({
            src: imgs[i].src
          })
      }
      this.options.index = Number(e.target.alt)
      this.$refs.previewer.show(this.options.index)

    },
    clearInput() {
      this.keyWord = ''
    },
    back () {
      this.$router.back()
    },
    ...mapMutations({
      setNews: 'SET_NEWS'
    })
  },
  watch:{
    tcontent(x) {
      setTimeout(()=>{
        this.$refs.tscroll.refresh()
      },20) 
    }
  }, 
  components: {
    XButton,
    Badge,
    Popup,
    ButtonTab, 
    ButtonTabItem,
    Previewer,
    Icon
  }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
.search-container{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  bottom: 0;
  z-index: 1;
}

.search-box{
  width:100%;
  position: absolute;
  left:25px;
  top:-3px;
}
.serach-input{
  width:75%;
  height:30px;
  padding-left: 5px;
  border-radius: 8px;
  margin-left:-55px;
  border: none;
  font-size: 12px;
  color: black;
  letter-spacing: 1px;
  background-color: white;
}

.grad {
  background: -webkit-linear-gradient(rgb(255, 0, 140), rgb(221, 101, 167)); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(rgb(255, 0, 140), rgb(221, 101, 167)); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(rgb(255, 0, 140), rgb(221, 101, 167)); /* Firefox 3.6 - 15 */
  background: linear-gradient(rgb(255, 0, 140),  rgb(221, 101, 167)); /* 标准的语法 */
}

.scroll{
  height: 100%;
  overflow: hidden;
}

</style>