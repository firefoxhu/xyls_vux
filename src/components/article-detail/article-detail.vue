<template>
    <transition  leave-active-class="slideOutRight" enter-active-class="slideInRight">
        <div class="animated article-detail-container">
            <x-header :left-options="{showBack: false}" style="background-color:#D43D3D;">
                <a slot="left"  @click="back">
                    <x-icon type="ios-arrow-back" size="35" style="fill:#fff;position:relative;top:-11px;left:-20px;"></x-icon>
                </a> 
                资讯详情
            </x-header>
            <scroller ref="articleDetailScroll" class="article-detail-scroll" :pullup="pullup" @scrollToEnd="resizeHeight">
                <flexbox orient="vertical">
                    <flexbox-item>
                        <div class="content" id="content" v-html="news.content" @click="proxyImage"></div>
                    </flexbox-item >

                    <flexbox-item>
                        <blur :blur-amount=0 style="height:100%;" url="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525804149645&di=2c2268e3c2e6929ad9b054cf3b23c73a&imgtype=0&src=http%3A%2F%2Fimg.sccnn.com%2Fbimg%2F339%2F05837.jpg">
                            <flexbox>
                                <flexbox-item align="right">
                                    <x-button mini :disabled="true"  style="width:80px;height:80px;border-radius:50%; box-shadow: 2px 2px 3px 1px #E0E0E0;">
                                        阅读({{news.views}})
                                    </x-button>
                                </flexbox-item>
                                    
                                <flexbox-item>
                                    <x-button class="animated bounce" mini  @click.native.prevent="fabulous" style="width:80px;height:80px;border-radius:50%; box-shadow: 2px 2px 3px 1px #E0E0E0;">
                                        <emotion is-gif>强</emotion>({{fabulousNum}})
                                    </x-button>
                                </flexbox-item>
                            </flexbox>
                        </blur>
                    </flexbox-item>
                    <flexbox-item>
                        <divider style="padding:0 10%;font-size:12px;">
                            网友留言
                        </divider>
                    </flexbox-item>
                
                    <flexbox-item>
                        <div style="margin:3px 5px;">
                            <flexbox v-for="(item, index) in commentList" :key="index" :gutter="0" class="vux-1px-b" style="height:80px;overflow:hidden;">
                                <flexbox-item :span="1/6" align="center">
                                    <img src="../../assets/default.png" style="border-radius:50%;width:50px;height:50px;border:1px solid #ccc;" />
                                </flexbox-item>
                                <flexbox-item :span="5/6">
                                    <h5 style="color:#005fa7;">{{item.commentator}}</h5>
                                    <p style="font-size:12px;">{{item.content}}</p>
                                    <p style="font-size:12px;text-align:right;color:#ccc;">{{item.createTime}}&nbsp;&nbsp;</p>
                                </flexbox-item>
                            </flexbox>
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <load-more style="margin:20px  auto;" :show-loading="loading" :tip="tip" background-color="#fbf9fe"></load-more>
                        <div style="height:80px;"></div>
                    </flexbox-item>
                </flexbox>
            </scroller>
            <tabbar style="position: fixed" >
                <tabbar-item @on-item-click="commentTab()">
                    <span slot="label">评论留言</span>
                </tabbar-item>
            </tabbar>

            <div v-transfer-dom>
                <popup v-model="showPopup" height="auto">
                    <flexbox orient="vertical">
                        <flexbox-item>
                            <group>
                                <x-textarea ref="textAreas"
                                    v-model="textAreaValue" 
                                    :rows="2" autosize :max="60" 
                                    placeholder="说点什么吧" 
                                    @on-focus="commentTextArea('focus')" @on-blur="commentTextArea('blur')">
                                </x-textarea>
                                <x-input title=" " class="weui-vcode" :disabled="true">
                                    <x-button slot="right" type="primary" mini @click.native="submitComment">留言</x-button>
                                </x-input>
                            </group>
                        </flexbox-item>
                        <!--
                        <flexbox-item>
                            <tab :line-width=2 active-color='#fc378c' v-model="tabPanelIndex" style="height:35px;">
                                <tab-item class="vux-center" 
                                    :selected="currentTab === item" 
                                    v-for="(item, index) in tabs"
                                    @click="currentTab = item" 
                                    :key="index">{{item}}
                                </tab-item>
                            </tab>
                        </flexbox-item>
                        
                        <flexbox-item>
                            <swiper v-model="tabPanelIndex" :show-dots="false" dots-position="center">
                                <swiper-item v-for="(item, index) in tabs" :key="index">
                                    <div v-if=" '表情' === item " class="tab-swiper">
                                        <flexbox  wrap="wrap">
                                            <flexbox-item v-for="(emos, index2) in emotions" :key="index2">
                                                <div @click="selectEmotion(emos)">
                                                    <emotion :is-gif="true">{{emos}}</emotion>
                                                </div> 
                                            </flexbox-item>
                                        </flexbox>
                                    </div>

                                    <div v-if=" '其它' === item " class="tab-swiper">服务暂未开通</div>
                                </swiper-item>
                            </swiper>
                        </flexbox-item>
                        -->
                    </flexbox>
                </popup>
            </div>
            <div v-transfer-dom>
                <previewer :list="previewerList" ref="previewer" :options="options"></previewer>
            </div>

        </div>
    </transition>
</template>

<script type="text/ecmascript-6">

/* eslint-disable */
import { Previewer ,Group ,XTextarea, Blur,XInput ,Swiper, SwiperItem,Tab, TabItem, WechatEmotion as Emotion, XButton, Popup, Tabbar, TabbarItem } from 'vux'
import { mapGetters } from 'vuex'
import * as type from '@/store/mutation-types.js'
import { getArticleById, ArticleFabulous, countViews } from '@/api/article'
import { RESPONSE_CODE } from '@/api/config'
import { getArticleCommentList, commentArticle } from '@/api/comment'
import { saveFabulous, loadFabulous, saveComment, loadComment, saveViews, loadViews } from '@/api/cache'

const list = () => ['表情', '其它']

  export default {
    data () {
        return {
            pullup: true,
            mfabulous: false,
            fabulousNum: '1',
            loading: true,
            tip: '努力加载中...',
            disabled: true,
            showPopup: false,
            // popup表情tab
            tabs: list(),
            currentTab: '表情',
            tabPanelIndex: 0,
            emotions: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极'],
            textAreaValue: "",
            showToast: false,
            commentList: null,
            previewerList: [],
            previewerIndex: 0,
            options: {
                index: 0
            }
        }
    },
    computed: {
        ...mapGetters([
            'news'
        ])
    },
    created() {
        if(!this.news.id){
            this.$router.back()
            return
        }
        
        setTimeout(() => {
            if (!this.$refs.articleDetailScroll) {
                return
            }
            this.$refs.articleDetailScroll.refresh()
        }, 500)

        // TODO 后期修改有点冲突先不改 拿本地缓存中的 点赞数量 如果有就用本地的 否则则用页面传送过来的
        let fabulousCache = loadFabulous({
            id: this.news.id
        })
        if( fabulousCache.id) {
            this.mfabulous = true
            this.fabulousNum = Number(fabulousCache.fabulous) < Number(this.news.fabulous) ? this.news.fabulous : fabulousCache.fabulous
        }
        
        
        if( !this.mfabulous) {
            this.fabulousNum = this.news.fabulous === null ? '1' : this.news.fabulous
        }

        // 加载评论信息
        this._getArticleComment()

        // 是否做浏览量历史判断++
        let cacheViews = loadViews({
            id: this.news.id
        })

        if(!cacheViews.id) {
            this.news.views = parseInt(this.news.views)+1

            // 浏览量++
            countViews(this.news.id).then((res) => {
               if (res.code == RESPONSE_CODE) {
                   saveViews({
                       id: this.news.id
                   })
               } 
            });
        }
    },
    methods: {
        submitComment(){
            if( this.textAreaValue.length < 3) {
                // TODO 显示文字
                this.$vux.toast.show({
                    text: '请输入一句话吧（3个字以上）', 
                    position: 'middle',
                    time: 1000,
                    type: 'warn'
                })
                return 
            }

            this.showPopup = false
            // TODO 提交服务器 利用本地缓存 对当前的id做一个缓存 并记录发言一次 每个最多发言5次  bug（刷新缓存则又可以发言5次）
            let cacheComment = loadComment({
                id: this.news.id
            })

            let times = 1
            if( cacheComment.id ) {
                times += cacheComment.times + 1
            }

            if( times >5) {
                this.$vux.toast.text( '休息一下在发言吧！','middle')
                return
            }

            commentArticle(this.news.id,this.textAreaValue).then((res)=>{
                if (res.code == RESPONSE_CODE) {
                    this.commentList.splice(0,0,res.data)
                    saveComment({
                        id: this.news.id,
                        times: times
                    })
                }else {
                    this.$vux.toast.text( '请求错误！','top')
                }
            })
        },
        selectEmotion(emo){
            
        },
        commentTextArea(event){

        },
        commentTab() {
            this.showPopup = true
        },
        fabulous() {

            // TODO 用缓存解决 点赞 记录当前点赞的id 只能一次  bug（清除缓存可以再次）

            if(!this.mfabulous){

                // 赞加一
                this.fabulousNum = Number(this.fabulousNum) + 1
                // 已经赞过
                this.mfabulous = true

                ArticleFabulous(this.news.id).then((res)=>{
                    if (res.code === RESPONSE_CODE) {

                        // 存入本地缓存
                        saveFabulous({
                            id: this.news.id,
                            fabulous: this.fabulousNum
                        })
                    }
                })


            }else {
                this.$vux.toast.text( '您已经点过赞了',   'middle')
            }
        },
        _getArticleDetail(id) {
            getArticleList(id).then((res) => {
                if (res.code === RESPONSE_CODE) {
                    this.setNews(res.data)
                }
            })
        },
        _getArticleComment() {
            //  请求服务器获取评论信息 获取客户的ip 作为评论的id唯一证据
            this.page = 0
            this.size = 6
            getArticleCommentList(this.news.id,this.page,this.size).then((res)=>{

                if (res.code === RESPONSE_CODE) {
                    this.commentList = res.data.list
                    this.loading = res.data.hasNext
                    this.tip = this.loading ? '努力加载中...' : (res.data.list.length === 0 ? '暂无评论' :'没有更多评论~')
                }else {
                    this.$vux.toast.text( '请求错误！',   'top')
                }
            })
        },
        _getNextArticleComment() {
            //  请求服务器获取评论信息 获取客户的ip 作为评论的id唯一证据
            if (!this.loading) {
                return
            }
            this.page++
            getArticleCommentList(this.news.id,this.page,this.size).then((res)=>{

                if (res.code === RESPONSE_CODE) {
                    this.commentList = this.commentList.concat(res.data.list)
                    this.loading = res.data.hasNext
                    this.tip = this.loading ? '努力加载中...' : '没有更多数据~'
                }else {
                    this.$vux.toast.text( '请求错误！',   'top')
                }
            })
        },
        resizeHeight () {
            if (!this.$refs.articleDetailScroll) {
                return
            }

            this.$refs.articleDetailScroll.refresh()
            // 判断是否有下一页数据  然后在请求处理
            this._getNextArticleComment()

            
        },
        back () {
            this.$router.back()
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
            let imgs=document.getElementById("content").getElementsByTagName("img")
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

        }
    },
    components: {
        Previewer,
        Emotion,
        XButton,
        Popup,
        Tabbar, 
        TabbarItem,
        Swiper, 
        SwiperItem,
        Tab, 
        TabItem,
        XInput,
        Group,
        XTextarea,
        Blur
        
    }
  }
</script>

<style scoped lang="less">
@import 'animate.css';
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
.article-detail-container{
    position: fixed;
    /** top能自动改变层级关系 */
    top: 0;
    width: 100%;
    background-color: #ffffff;
    height: 100%;
    /** z-index 和搜索的最后结果层级又管理 search的层级是 5  为了让其盖住 层级设置为 6  此设置对其他模块不影响**/
}

.title{
    flex: 1;
    color: #ffffff;
    line-height: 46px;
    text-align: center;
}
.article-detail-scroll{
    height: 100%;
    overflow: hidden;
}
.tab-swiper {
  background-color: #fff;

}
</style>