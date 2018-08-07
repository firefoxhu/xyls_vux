<template>
    <div class="circle-square-container" ref="circleSquareContainer">
        <scroller ref="circleSquareScroller" class="circle-square-scroller"  :pullup="pullup" :data="postList" @scrollToEnd="upDown">
            <flexbox orient="vertical" :gutter="0"  align="center">
                <flexbox-item v-for="(item, index) in postList" :key="index">
                    <div class="post-item">
                        <h5><span v-if="item.top === '1'" style="color:red;font-size:18px;font-weight:bolder">顶</span>{{item.content}}</h5>
                        <flexbox v-if="item.pic !== undefined && item.pic.length !== 0" :gutter="0" @click.native="onItem(item.pic)">
                            <flexbox-item>
                                <img v-if="item.pic[0] !== undefined" v-lazy="item.pic[0]" width="95%" height="80"/>
                            </flexbox-item>
                            <flexbox-item>
                                <img v-if="item.pic[1] !== undefined" v-lazy="item.pic[1]" width="95%" height="80"/>
                            </flexbox-item>
                            <flexbox-item>
                                <img v-if="item.pic[2] !== undefined" v-lazy="item.pic[2]" width="95%" height="80"/>
                            </flexbox-item>
                        </flexbox> 
                        <a @click="doCopy(item.concat)">联系方式（{{item.concat}}）</a>
                    </div>
                </flexbox-item>
                <load-more :show-loading="loading" :tip="tip" background-color="#fbf9fe"></load-more>
            </flexbox>
        </scroller>
        <div v-transfer-dom>
            <previewer :list="previewerList" ref="previewer" :options="options" @on-close="onClose"></previewer>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { Previewer } from 'vux'
import { getPostList } from '@/api/post'
import { RESPONSE_CODE } from '@/api/config'
export default {
    data () {
        return {
            pullup: true,
            postList: [],
            loading: true,
            tip: '加载中...',
            previewerList: [],
            options: {
                index: 0
            }

        }
    },
    created(){
        this._initPostList()
    },
    methods: {
        onItem(pic){
            if(pic.length === 0){
                return
            }
            for(let i=0;i<pic.length;i++){
                this.previewerList.push({
                    src: pic[i]
                })
            }
            this.$refs.previewer.show(0)
        },
        onClose() {
            this.previewerList = []
            this.options.index =0
        },
        doCopy(value) {
            this.$copyText(value).then(e=> {
                this.$vux.toast.text('已复制联系方式', 'middle')
            })
        },
        _initPostList(){
            this.page = 0
            this.size = 6
            getPostList(this.page, this.size).then(res=>{
                if( res.code === RESPONSE_CODE) {
                    this.postList = res.data.list
                    this.loading = res.data.hasNext
                    this.tip = this.loading ? '加载中...':'已加载全部数据~'
                }
            })
        },
        nextPostList() {
            if(!this.loading){
                return
            }
            getPostList(++this.page, this.size).then(res=>{
                if( res.code === RESPONSE_CODE) {
                    this.postList = this.postList.concat(res.data.list)
                    this.loading = res.data.hasNext
                    this.tip = this.loading ? '加载中...':'已加载全部数据~'
                }
            })
        },
        upDown(){   
            this.nextPostList()
        }
    },
    components:{
        Previewer
    }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/close.less';
@import '~vux/src/styles/1px.less';
.circle-square-container{
    height: 100%;
    width: 100%;
}
.circle-square-scroller{
    height: 78%;
    overflow: hidden;
}
.post-item{
    box-shadow: 2px 2px 3px 1px #E0E0E0;
    margin: 0 10px 8px 5px;
}

</style>
