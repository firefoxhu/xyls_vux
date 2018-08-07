<template>
    <div class="animated pulse contact-us" v-show="contactShow">
        <p @click="subscribeUs">订阅我们</p>
        <p @click="contactUs" class="vux-1px-t" style="border-top:1px solid #fff;">联系客服</p>
    </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers'
/* eslint-disable */
export default {
    data(){
        return {
            contactShow: true
        }
    },
    methods:{
        subscribeUs(){
            this.$emit('subscribeUs')
        },
        contactUs(){
            this.$emit('contactUs')
        }
    },
    created(){
        this.timer = setInterval(()=>{
                this.contactShow = !this.contactShow
        },10000)
    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
.contact-us{
    position:absolute;
    bottom:20%;
    color:#fff;
    font-size:14px;
    background-color:#ccc;
    padding: 1px 1px;
    opacity:0.8;
    filter:alpha(opacity=80);
    width:30px;
    border-radius: 8px;
}
</style>