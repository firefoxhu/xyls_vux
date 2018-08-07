<template>
    <transition leave-active-class="slideOutRight" enter-active-class="slideInRight">
        <div class="animated category-list-container">
            <x-header :left-options="{showBack: false}" style="background-color:#D43D3D;">
                <a slot="left"  @click="back">
                    <x-icon type="ios-arrow-back" size="35" style="fill:#fff;position:relative;top:-11px;left:-20px;"></x-icon>
                </a> 
                <p>分类>{{title}}</p>
            </x-header>

            <scroller ref="CategoryListScroll" class="category-list-scroller" :data="articleList" :pullup="pullup" @scrollToEnd="downMore">
                <div>
                    <flexbox orient="vertical">
                        <flexbox-item v-for="item in articleList" :key="item.id">
                            <div class="item-box" @click="selectItem(item)">
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
                        <div style="height:44px;"></div>
                    </flexbox>
                </div>
            </scroller>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script style="text/ecmascript-6">
/* eslint-disable */
import { getArticleByCategoryId } from '@/api/article'
import { RESPONSE_CODE } from '@/api/config'
import {mapGetters, mapMutations} from 'vuex'

const size = 8 

export default {
    data () {
        return {
            page: 0,
            pullup: true,
            articleList: [],
            loading: true,
            title: '',
            id: '',
            tip: '努力载入中...'
        }
    },
    created () {
        if (!this.news.id) {
            this.$router.push({
                path: '/category'
            })
            return
        }
        this.title = this.news.title
        this.id = this.news.id
        this._getArticleList()
    },
    methods: {
        selectItem (item) {
            this.$router.push({
                path: `${this.id}/${item.id}`
            })
            this.setNews(item)
        },
        back () {
            this.$router.push({
                path: '/category'
            })
        },
        downMore () {
            if (!this.loading) {
                return
            }
            this.page++
            getArticleByCategoryId(this.id, this.page, this.size).then((res) => {

                if (res.code === RESPONSE_CODE) {
                    this.articleList = this.articleList.concat(res.data.list)
                    this.loading = res.data.hasNext

                    this.tip = this.loading ? '努力加载中...' : '没有更多数据~'
                }
            })
        },
        _getArticleList () {
            this.page = 0
            this.loading = true
            getArticleByCategoryId(this.id, this.page, this.size).then((res) => {
                
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
        ...mapMutations({
            setNews: 'SET_NEWS'
        })
    },
    computed: {
        ...mapGetters([
            'news'
        ])
    }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
.category-list-container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    bottom: 0;
    height: 100%;
}

.category-list-scroller{
    height: 100%;
    overflow: hidden;
}


.item-box{
  box-shadow: 2px 2px 3px 1px #E0E0E0;
  margin: 0 10px 8px 5px;
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
        line-height: 18px;
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
    .info{
        height: 30px;
        display: flex;
        width: 95%;
    }
    .views,.orgin{
        align-self: flex-end;
        font-size: 12px;
        color: #aaa;
        flex: 1
    }
    .views{
        text-align: right;
    }
}
</style>
