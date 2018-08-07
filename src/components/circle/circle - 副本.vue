<template>

    <div class="circle-container">


        <circle-square v-if="tabIndex === 0"></circle-square>
        <circle-surprise v-else-if="tabIndex === 1"></circle-surprise>
        <circle-post v-else-if="tabIndex === 2"></circle-post>
        <circle-user v-else-if="tabIndex === 3"></circle-user>

        <tabbar slot="bottom"  style="position: fixed">
            <tabbar-item selected @on-item-click="tabIndex = 0">
                <img slot="icon" src="@/assets/c1-s.png">
                <img slot="icon-active" src="@/assets/c1-d.png">
                <span slot="label">广场逛逛</span>
            </tabbar-item>
            <tabbar-item show-dot @on-item-click="tabIndex = 1">
                <img slot="icon" src="@/assets/c2-s.png">
                <img slot="icon-active" src="@/assets/c2-d.png">
                <span slot="label">资源分享</span>
            </tabbar-item>
            <tabbar-item @on-item-click="tabIndex = 2">
                <img slot="icon" src="@/assets/c3.gif">
                <span slot="label">求助发帖</span>
            </tabbar-item>
            <tabbar-item badge="2" @on-item-click="tabIndex = 3">
                <img slot="icon" src="@/assets/c4-d.png">
                <img slot="icon-active" src="@/assets/c4-s.png">
                <span slot="label">个人中心</span>
            </tabbar-item>
        </tabbar>  
    </div>
</template>


<script>
/* eslint-disable */
import { Tabbar,TabbarItem } from 'vux'
import CircleSquare from '@/components/circle/circle-square'
import CircleSurprise from '@/components/circle/circle-surprise'
import CirclePost from '@/components/circle/circle-post'
import CircleUser from '@/components/circle/circle-user'
import { setTimeout } from 'timers';
export default {
  data () {
    return {
        tabIndex: 0
    }
  },
  components: {
    Tabbar,
    TabbarItem,
    CircleSquare,
    CircleSurprise,
    CirclePost,
    CircleUser
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/close.less';
@import '~vux/src/styles/1px.less';
.circle-container{
    height: 100%;
    width: 100%;
    position: fixed;
}


</style>
