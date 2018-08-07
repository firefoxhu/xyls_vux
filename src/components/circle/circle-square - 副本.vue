<template>
    <div class="circle-square-container" ref="circleSquareContainer">
        
        <scroller ref="circleSquareScroller" class="circle-square-scroller"  :pullup="pullup" :probeType="probeType" :listen-scroll="listenScroll" @scroll="scroll">
            <flexbox orient="vertical" :gutter="0">
                <flexbox-item style="background-image:url(http://pic.qiantucdn.com/58pic/28/56/26/058PIC858PICSR8n4QBX4sja0_PIC2018.jpg!qt324); background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;">
                        <flexbox :gutter="0" wrap="wrap">
                            <flexbox-item class="square-sort" :span="1/5" align="center" v-for="(item, index) in squareSortList" :key="index">
                                <img width="43" src="@/assets/square-1.png"/>
                                <p>{{item}}</p>
                            </flexbox-item>
                        </flexbox>
                </flexbox-item>
                <flexbox-item style="background-image:url( http://pic.qiantucdn.com/58pic/28/56/24/92r58PICppB9e58PICJ858PICdsu3_PIC2018.jpg!qt324); background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;">
                    当前分类位置列表：空调
                </flexbox-item>   
            </flexbox>
        </scroller>
    </div>
</template>

<script>
/* eslint-disable */
import { Blur  } from 'vux'
import { prefixStyle } from "@/api/dom"
const transform = prefixStyle('transform')
export default {
    data () {
        return {
            pullup: true,
            probeType: 3,
            listenScroll: false,
            scrollY: 0,
            squareSortList: ['空调','冰箱','洗衣机','电分扇','电视','油烟机','电灯','电脑','笔记本','其它']
        }
    },
    methods: {
        scroll(pos) {
            this.scrollY = pos.y
        }
    },
    watch: {
        scrollY(newY) {
               // this.$refs.test.style.backgroundColor = '#ffffff'
                //this.$refs.test.style[transform] = `translate3d(0,${newY}px,0)`
            if(newY < -102) {
                
                //this.$refs.circleSquareContainer.style.top = '90'
               // this.$refs.circleSquareContainer.style.backgroundColor = '#ffffff'
                //this.$refs.circleSquareContainer.style[transform] = `translate3d(0,${newY}px,0)` 
            }else {
                //this.$refs.circleSquareContainer.style.top= '90px'
            }
        }
    },
    components: {
       Blur
    }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/close.less';
@import '~vux/src/styles/1px.less';
.circle-square-container{
    height: 100%;
    width: 100%;
    position: fixed;
    
}
.circle-square-scroller{
    height: 81%;
    overflow: hidden;
}
.square-sort{
    border:0px solid red;
    border-radius: 50px;
    font-size: 12px;
    margin: 5px 0;
}
</style>
