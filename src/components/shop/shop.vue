<template>
  <div class="shop-container">
    <scroller ref="shopScroll" class="shop-scroll" :data="shopList" :pullup="pullup" @scrollToEnd="upMore">
      <div>
        <flexbox orient="vertical">
          <flexbox-item  v-for="item in shopList" :key="item.id">
            <div @click="selectItem(item)">
              <flexbox orient="vertical">
                <flexbox-item>
                <h4>{{item.shopName}}</h4>
                </flexbox-item>
                <flexbox-item>
                  <flexbox>
                    <flexbox-item v-for="(img, i) in item.picture" :key="i">
                      <img v-lazy="img" width="100%" height="80px" />
                    </flexbox-item>
                  </flexbox>
                </flexbox-item>
                <flexbox-item>
                  <div style="color:#999;font-size:12px;" class="icon-address vux-1px-b">{{item.address}}</div>
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
import { getShopList } from '@/api/shop'
import { getTouTiaoByCategory } from '@/api/toutiao'
import { mapMutations } from 'vuex'

const size = 6 

export default {
  data () {
    return {
      page: 0,
      pullup: true,
      loading: true,
      shopList: [],
      tip: '努力加载中...'
    }
  },
  created (){
    this._getShopList();
  },
  methods: {
    _getShopList() {
      this.page = 0
      this.size = 6
      this.loading = true
      getShopList(this.page, this.size).then((res) => {

        if( !res) {
          this.loading = false
          this.tip = '网络不给力！'
          return;
        }

        if (res.code === RESPONSE_CODE) {

            this.shopList = res.data.list
            this.loading = res.data.hasNext

            this.tip = this.loading ? '努力加载中...' : '没有更多数据~'
        }
      })
    },
    upMore () {
      if (!this.loading) {
            return
        }
        getShopList(++this.page, this.size).then((res) => {

            if (res.code === RESPONSE_CODE) {

                this.shopList = this.shopList.concat(res.data.list)
                this.loading = res.data.hasNext

                this.tip = this.loading ? '努力加载中...' : '没有更多数据~'
            }
            
        })        
    },
    selectItem (item) {
      this.$router.push({
        path: `shop/${item.id}`,
      })
      this.setShop(item)
    },
    ...mapMutations({
        setShop: 'SET_SHOP'
    })
  }
}
</script>


<style scoped lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
.shop-container{
  position: absolute;
  width: 100%;
  top: 90px;
  bottom: 0;
  overflow: hidden;
}
.shop-scroll{
    height: 100%;
    margin: 0 8px;
    overflow: hidden;
    bottom: 90px;
}
.icon-address:before{
    height: 15px;
    width: 15px;
    content: url(../../assets/addr.png);
    vertical-align: middle;
    display: inline-block;
}    
        
</style>

