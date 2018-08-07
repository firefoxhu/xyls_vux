<template>
    <div class="video-container">
        <flexbox orient="vertical" :gutter="0">
            <flexbox-item style="heihgt:30%;">
                <v-d-player :video="video"></v-d-player>
            </flexbox-item>
            <flexbox-item>
                <tab :line-width=1 active-color='#fc378c' v-model="tabIndex" bar-position="top">
                    <tab-item :selected="tabIndex === index" v-for="(item, index) in videoCategory" @click="tabIndex = index" :key="index">
                        <badge v-if="index === 1" class="animated flash"></badge>{{item.title}}
                    </tab-item>
                </tab>
            </flexbox-item>
            <flexbox-item>
                <div style="height:50%;width:100%;position: fixed;">
                  <scroller ref="liveVideoScroll"  class="live-video-scroll"  :pullup="pullup" @scrollToEnd="videoPullUp">
                    <flexbox orient="vertical">
                        <flexbox-item v-show="tabIndex === panelIndex-1" v-for="panelIndex in videoCategory.length" :key="panelIndex">
                            <grid :cols="2" :show-lr-borders="false" :show-vertical-dividers="false">
                                <grid-item @click.native="play(item)" v-for="(item, y) in videoList[tabIndex].list" :key="y">
                                    <img height="120"  width="100%"  v-lazy="item.pic"/>
                                    <h5 style="color:#000;">{{item.title}}</h5>
                                </grid-item>
                            </grid>
                            <load-more :show-loading="videoList[tabIndex].loading" :tip="videoList[tabIndex].tip" background-color="#fbf9fe"></load-more>
                        </flexbox-item>
                    </flexbox>
                  </scroller>
                </div>
            </flexbox-item>
        </flexbox>

    </div>
    
</template>
<script>
/* eslint-disable */
import { Tab, TabItem, Swiper, SwiperItem, Badge, Grid, GridItem } from 'vux'
import VDPlayer from '@/components/base/video'
import { getVideoByCategory, getVideoCategory } from '@/api/video'
import { RESPONSE_CODE } from '@/api/config'

export default {
    data(){
        return {
            pullup: true,
            tabIndex: 0,
            videoCategory: [],
            categoryId: '',
            video: { 
                url: 'http://www.luosen365.com/video/20180521/1526885417656.mp4',
                pic: '',
                message: '<div><h3 style=color:#ffffff;>信阳365服务只做最精准的周边服务</h3><p style=color:#cccccc;margin-top:5px;>3秒内自动切换...</p></div>'
            },
            // 动态重组菜单容器管理
            videoList: []
        }
    },
    created(){
        this._initCategoryList()
    },
    mounted() {
    },
    methods:{
        play(item) {
            this.video = {
                url: item.url,
                pic: item.pic,
                message: item.message === undefined ? this.video.message : item.message
            }
        },
        _initCategoryList() {
            getVideoCategory().then((res)=>{
                if (res.code === RESPONSE_CODE) {
                    this.videoCategory = res.data.list

                    let temp = []
                    for(let item in res.data.list)
                        temp.push(
                            {   
                                init: false,
                                page: 0,
                                size: 4,
                                loading: true,
                                tip: '努力加载中...',
                                list: []
                            }
                        )
                    // 动态创建容器管理数据
                    this.videoList =temp
                    // 初始化第一页
                    this._initVideoList()
                    
                }
            })
        },
        _initVideoList() {
            // 切换过来时 判断是否初始化加载过 no 主动请求第一页数据 yes则用户下拉触发请求
            if (this.videoList[this.tabIndex].init) {
                return
            }

            getVideoByCategory(this.videoList[this.tabIndex].page,this.videoList[this.tabIndex].size,this.videoCategory[this.tabIndex].id).then((res)=>{
                if (res.code === RESPONSE_CODE) {
          
                    this.videoList[this.tabIndex].list = res.data.list
                    this.videoList[this.tabIndex].loading = res.data.hasNext
                    this.videoList[this.tabIndex].init = true

                    this.videoList[this.tabIndex].tip =  res.data.hasNext ? '努力加载中...' : '没有更多数据~'
                }
            })

        },
        _vodeoNextList(){
            if( !this.videoList[this.tabIndex].loading) {
                return
            }

            getVideoByCategory(++this.videoList[this.tabIndex].page,this.videoList[this.tabIndex].size++,this.videoCategory[this.tabIndex].id).then((res)=>{
                if (res.code === RESPONSE_CODE) {
          
                    this.videoList[this.tabIndex].list = this.videoList[this.tabIndex].list.concat(res.data.list)
                    this.videoList[this.tabIndex].loading = res.data.hasNext

                    this.videoList[this.tabIndex].tip =  res.data.hasNext ? '努力加载中...' : '没有更多数据~'
                }
            })
        },
        videoPullUp() {
            this._vodeoNextList()
        }
    },
    watch:{
        tabIndex(y){
            this._initVideoList()
             setTimeout(()=>{
                this.$refs.liveVideoScroll.refresh()
            },1000) 
        }
    },
    components:{
        VDPlayer,
        Tab,
        TabItem,
        Swiper, 
        SwiperItem,
        Badge,
        Grid, 
        GridItem
    }
}
</script>


<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
.live-video-scroll{
    height: 100%;
    overflow: hidden; 
}
</style>