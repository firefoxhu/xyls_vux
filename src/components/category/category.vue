<template>
    <div class="cateogy-container">
        <scroller ref="categoryScroll" class="category-scroll" :data="categoryList" :pullup="pullup" @scrollToEnd="downMore">
            <div>
                <flexbox :gutter="0" wrap="wrap">
                    <flexbox-item  :span="1/3" v-for="(item, index) in categoryList" :key="index">
                        <div class="animated swing item" @click="selectItem(item)">
                            <flexbox orient="vertical">
                                <flexbox-item>
                                    <img  v-lazy='item.imgUrl' height="80" width="100%" alt="">
                                </flexbox-item>
                                <flexbox-item>
                                    <p style="font-size:14px;font-weight:bold;text-align:center;">{{item.title}}</p>
                                </flexbox-item>
                            </flexbox>
                        </div>
                    </flexbox-item>
                    <load-more style="margin:20px  auto;" :show-loading="loading" :tip="tip" background-color="#fbf9fe"></load-more> 
                </flexbox>
                
            </div>  
        </scroller>
        <router-view></router-view>
    </div>
</template>

<script style="text/ecmascript-6">
/* eslint-disable */
import { RESPONSE_CODE } from '@/api/config'
import { getCategoryList } from '@/api/category'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            page: 0,
            size: 14,
            pullup: true,
            categoryList: [],
            loading: true,
            tip: '努力加载中...'
        }
    },
    created() {
        this._getCategory()
    },
    methods: {
        selectItem (item) {
            this.$router.push({
                path: `category/${item.id}`,
            })
            this.setNews(item)
        },
        downMore() {
            if (!this.loading) {
                return
            }
            this.page++
            getCategoryList(this.page, this.size).then((res) => {
                if (res.code === RESPONSE_CODE) {
                    this.categoryList = this.categoryList.concat(res.data.list)
                    this.loading = res.data.hasNext
                    this.tip = this.loading ? '努力加载中...' : '没有更多数据~'
                }
            })           
        },
        _getCategory() {
            this.page = 0
            this.loading = true
            getCategoryList(this.page, this.size).then((res) => {
                
                if( !res) {
                    this.loading = false
                    this.tip = '网络不给力！'
                    return;
                }

                if (res.code === RESPONSE_CODE) {
                    
                    this.categoryList = res.data.list
                    this.loading = res.data.hasNext

                    this.tip = this.loading ? '努力加载中...' : '没有更多数据~'
                    
                }
            })
        },
        ...mapMutations({
            setNews: 'SET_NEWS'
        })
    }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/reset.less';
.cateogy-container{
    position: absolute;
    width: 100%;
    top: 90px;
    bottom:0;
    overflow: hidden;
    .category-scroll{
        height: 100%;
        overflow: hidden;
        bottom: 90px;
        .item{
            display: flex;
            flex-direction: row;
            overflow: hidden;
            border: 5px solid #ffffff;
            height: 120px;
            box-shadow: 2px 2px 3px 1px #E0E0E0;
            margin: 5px;
            img {
                width: 100%;
            }
        }
        
    }
}
</style>