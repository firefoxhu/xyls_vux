<template>
  <div class="circle-post-container">
    <scroller ref="circlePostScroller" class="circle-post-scroller"  :pullup="pullup">
      <div v-if="formShow">
        <group title="为了更好的用户体验，无需登录随用随走，请根据自己的需求线下联系。我们会对违规的进行删除望原谅。" style="text-align:left;">
          <x-textarea ref="content" v-model="content" :max="125" name="detail" placeholder="描述点什么吧！" autosize></x-textarea>
          <cell title="联系方式:">
            <x-input placeholder="微信/手机等" ref="concat" v-model="concat"></x-input>
          </cell>
          <p style="font-size:8px;margin-left:10px;">图片非必选项，最多3张图片(每个图小于5M)</p>
          <uploader
          :url="url"
        ></uploader>
        
        </group>      

        <div class="btn" @click="ready">
          发布
        </div>
        <div style="height:150px;"></div>
      </div>
      <div v-else>
        <msg :title="msg.title" :description="msg.desc" :icon="msg.icon" ></msg>
      </div>
    </scroller>
  </div>
</template>

<script>
/* eslint-disable */ 
import { XTextarea, XInput, Group, Cell, Msg } from 'vux'
import Uploader from '@/components/base/uploader'
import { postSend } from '@/api/post'
import { RESPONSE_CODE , SERVER_NAME ,UPLOAD_IMG} from '@/api/config'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      pullup:true,
      formShow: true,
      concat: '',
      content: '',
      imgs: [],
      msg:{
        title: '发布成功',
        desc: '请逛逛广场吧',
        icon: ''
      },
      url: SERVER_NAME+UPLOAD_IMG
    }
  },
  computed: {
    ...mapState({
      imgStatus: state => state.imgstore.img_status,
      imgPaths: state => state.imgstore.img_paths,
      imgCache: state => state.imgstore.img_upload_cache
    })
  },
  methods: {
    ready() {
      
      // 字段是否合法
      if( this.content.length < 5) {
        this.$refs.content.focus()
        this.toast('请将内容填写完整最少5个字！')
        return
      }

      if( this.concat.length < 3) {
        this.$refs.concat.focus()
        this.toast('请将联系方式填写完整！')
        return
      }
      // 是否有上传的图片
      this.$vux.loading.show({
        text: '发布中...'
      })
      if(this.imgCache.length !== 0) {
        this.$store.commit('set_img_status', 'uploading')
      }else{
        this.submit()
      }

    },
    submit () {
      let values = []
      for (let key of this.imgPaths) {
        values.push(key)
      }
      this.imgs = values
      postSend(this.content, this.concat, this.imgs.join(',')).then(res=>{
        this.$vux.loading.hide()
        
        if( res.code === RESPONSE_CODE) {
          this.msg = {icon: 'success',title: '发布成功',desc: '到广场看看吧'}
        }else {
          this.$vux.toast.text(res.msg, 'middle')
          this.msg = {icon: 'warn',title: '处理失败',desc: res.msg}
        }
        this.formShow = false
      })
    },
    toast(msg) {
        this.$vux.toast.show({
          text: msg,
          time: 1000,
          type: 'text',
        })
    }
  },
  watch: {
    imgStatus () {
      if (this.imgStatus === 'finished') {
        this.submit()
      }
    }
  },
  destoryed () {
    this.imgs = []
  },
  components: {
    Uploader,
    XTextarea,
    Group,
    XInput,
    Cell,
    Msg
  }
}
</script>

<style scoped lang="less">
.circle-post-container{
    height: 100%;
    width: 100%;
}
.circle-post-scroller{
  height: 78%;
  overflow: hidden;
}
.btn {
  width: 100%;
  height: 3em;
  background-color: green;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

