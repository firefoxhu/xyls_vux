<template>
  <div id="app">
    <!--头部-->
    <x-header style="background-color:#D43D3D;">
      <marquee :interval=5000 >
        <marquee-item v-for="(item, index) in marqueeList" :key="index" v-html="item"></marquee-item>
      </marquee>
      <a @click="cultureDialog = true" slot="overwrite-left" >
        <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-12px;"></x-icon>
      </a>
      <router-link tag="div" slot="right" to="/search">
        <x-icon class="animated bounce"  type="ios-search-strong" size="35" style="fill:#fff;position:relative;top:-8px;left:12px;"></x-icon>
      </router-link>
    </x-header>
    <!--切换tab-->
    <tab active-color='#D43D3D' :line-width=0>
      <tab-item
        :selected="initSelected === index"
        v-for="(item, index) in categoryList" 
        :key="index">
        <router-link tag="div" :to="navigation[index]">
          <span class="tab-link">{{item}}</span>
        </router-link>
      </tab-item>
    </tab>
    <!--路由主体-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!--脱离dom得提示信息等....-->
    <div v-transfer-dom>
        <x-dialog v-model="cultureDialog" hide-on-blur :dialog-style="{'height':'70%','padding':'15px 5px','overflow':'scroll','-webkit-overflow-scrolling':'touch'}">
            <p style="font-size:14px;text-align:left;">信阳365服务一个专业致力于信阳周边家电服务的平台, 是由信阳罗森机电公司负责开发。2017年服务网址网www.luosen365.com正式免费运作。信阳365服务平台本着为每个家电使用者带来电器科普,同时也将整合家电维修行业的一致性,给每个家电用户带来方便,本地诚信服务为目标。同时将为企业和商家提供如下服务：</p>
            <ul style="text-align:left;color:#c8c8c8;font-size:12px;">
                <li>1、服务网络只覆盖信阳市，为消费者提供优质高效的服务。</li>
                <li>2、为大家带来专业的知识库。</li>
            </ul>
            <img src="http://luosen365.com/image/20180512/1526119359358.jpg" width="50%"/>
            <p>长按二维码关注公众号</p>
            <p style="text-align:left;color:#c8c8c8;font-size:12px;text-align:center;">
                加入我们（点击拨打）：<a @click="makePhone('17839707710')">17839707710</a>
            </p>
            <div @click="cultureDialog = false">
                <span class="vux-close"></span>
            </div>
        </x-dialog>
    </div>
    <div v-transfer-dom>
      <contact-ask @contactUs="contactUs" @subscribeUs="subscribeUs"></contact-ask>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Tab, TabItem, Marquee, MarqueeItem, XDialog } from 'vux'
import ContactAsk from '@/components/base/contact-ask'

export default {
  name: 'app',
  data () {
    return {
      marqueeList: ['<h3>信阳365服务</h3>','<h3>家电百科知识库</h3>'],
      categoryList: ['热点', '分类', '服务','视频','圈子'],
      navigation: ['/article','/category','/shop','/video','/circle'],
      initSelected: 0,
      lineWidth: 0,
      cultureDialog: false
    }
  },
  created() {    
  },
  methods: {
    makePhone(phone) {
      window.location.href = 'tel://'+phone
    },
    subscribeUs(){
      this.alert()
    },
    contactUs(){
      this.alert()
    },
    alert(){
      this.$vux.alert.show({
        title: '↓长按关注↓',
        content: '<img width="50%" src="http://luosen365.com/image/20180512/1526119359358.jpg"/>',
      })
    }
  },
  components: {
    Tab,
    TabItem,
    Marquee,
    XDialog,
    MarqueeItem,
    ContactAsk
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/close.less';
@import '~vux/src/styles/1px.less';
body {
  background-color: #fbf9fe;
}
.tab-link{
  font-family: SimHei;
  color:#505050;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
&.router-link-active .tab-link{
  color: #D43D3D;
  font-size: 18px;
  font-weight: bolder;
}

</style>