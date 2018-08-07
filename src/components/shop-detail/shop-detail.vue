<template>
    <transition leave-active-class="slideOutRight" enter-active-class="slideInRight">
        <div class="animated shop-detail-container">

            <x-header :left-options="{showBack: false}" style="background-color:#D43D3D;">
                <a slot="left"  @click="back">
                    <x-icon type="ios-arrow-back" size="35" style="fill:#fff;position:relative;top:-11px;left:-20px;"></x-icon>
                </a> 
                门店详情
            </x-header>
            
            <scroller ref="shopDetailScroll" class="shop-detail-scroll" :pullup="pullup" @scrollToEnd="resizeHeight">
                <div>
                    <flexbox orient="vertical">
                        <flexbox-item>
                            <blur :blur-amount=5 :url="shop.picture[0]">
                                <div style="margin:5px 0 0 10px;">
                                    <p>门店名称：<span class="shop-name">{{shop.shopName}}</span></p>
                                    <p>专业师傅：<span class="shop-name">{{shop.userName}}</span></p>
                                    <p>预约电话：<span class="shop-name">{{shop.phone}}</span> 
                                        <x-button mini @click.native="makePhone(shop.phone)">
                                            联系师傅
                                        </x-button>
                                    </p>
                                    <p>是否上门：<span class="shop-name">专业团队上门服务</span></p>
                                    <p>
                                        认证资格：
                                        <badge text="企业认证" badge-color="#fff"></badge>  
                                        <badge text="身份认证" badge-color="#fff"></badge>
                                    </p>
                                    
                                </div>
                            </blur>
                        </flexbox-item>

                         <flexbox-item>
                            <divider>
                                <spinner type="ripple"></spinner>
                            </divider>
                        </flexbox-item>
                            
                        <flexbox-item>
                            <p class="device">门店：</p>
                            <flexbox>
                                <flexbox-item  v-for="(img, index) in shop.picture" :key="index" style="border:2px solid #fff;">
                                    <img class="previewer-img"  @load="loadImage" v-lazy="img" height="90" width="100%" style="border:0px solid #fff;" @click="show(index)"/>
                                </flexbox-item> 
                            </flexbox>
                        </flexbox-item>

                        <flexbox-item>
                            <span class="address">{{shop.address}} - {{shop.street}}</span>
                        </flexbox-item>

                        <flexbox-item>
                            <div class="amap-page-container" style="height:200px">
                                <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo" :plugin="plugin">
                                    <el-amap-info-window  :position="mywindow.position" :content="mywindow.content" :visible="mywindow.visible" :events="mywindow.events"></el-amap-info-window>
                                    <el-amap-marker :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
                                    <el-amap-circle :center="circle.center" :radius="circle.radius" :fillOpacity="circle.fillOpacity" :events="circle.events" :strokeColor="circle.strokeColor" :strokeStyle="circle.strokeStyle" :fillColor="circle.fillColor"></el-amap-circle>
                                </el-amap>
                            </div>
                        </flexbox-item>

                        <flexbox-item>
                            <p><span class="device"></span> 介绍：{{shop.description}}</p>
                        </flexbox-item>

                        <flexbox-item>
                            <divider>
                                -已触底线-
                            </divider>
                        </flexbox-item>
                        <div style="height:90px;"></div>
                    </flexbox>
                    <div v-transfer-dom>
                        <previewer :list="images" ref="previewer" :options="options"></previewer>
                    </div>
                </div>
            </scroller>
        </div>
    </transition>
</template>
<script style="text/ecmascript-6">
/* eslint-disable */
import {mapGetters} from 'vuex'
import { Previewer, XButton, Spinner, Blur, Badge }  from 'vux'

export default {
    data () {
        return {
            pullup: true,
            canSacle: false,
            zoom: 12,
            center: null,
            circle: {
                clickable: true,
                center: null,
                radius: 200,
                fillOpacity: 0.3,
                strokeStyle: 'dashed',
                fillColor: '#FFFF00',
                strokeColor: '#00BFFF'
            },
            marker: {
                position: null,
                events: {
                    click: () => {
                        
                        if(!this.mywindow.visible) {
                            return
                        }

                        if (this.mywindow.visible === true) {
                            this.mywindow.visible = false
                        } else {
                            this.mywindow.visible = true
                        }
                    },
                    dragend: (e) => {
                        this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
                    }
                },
                visible: true,
                draggable: false
            },
            mywindow: {
                position: null,
                content: '<h4>信阳罗森家电维修</div>',
                visible: true,
                events: {
                    close () {
                        if(!this.mywindow.visible) {
                            return
                        }

                        this.mywindow.visible = false

                    }
                }
            },
            plugin: {
                    pName: 'Scale',
                    events: {
                        init (instance) {
                           
                        }
                    }
            },
            images: [],
            options: {
                index: 0
            }
        }
    },
    computed: {
        ...mapGetters([
            'shop'
        ])
    },
    created(){
        if(!this.shop.id){
            this.$router.push({
                path: '/shop'
            })
            return
        }

        this._initMap()

        setTimeout(() => {
            if (!this.$refs.shopDetailScroll) {
                return
            }
            this.$refs.shopDetailScroll.refresh()
        }, 500)
        // 组装预览图片
        let that = this
        for(let item in this.shop.picture) {
            that.images.push({
                src: this.shop.picture[item]
            })
        }
    },
    methods: {
        _initMap () {
            this.center = [Number(this.shop.x).toFixed(8),Number(this.shop.y).toFixed(8)]
            this.circle.center = this.center
            this.marker.position = this.center
            this.mywindow.position = this.center
            this.mywindow.content = '<h4>'+this.shop.shopName+'</div>'
        },
        back () {
            this.$router.back()
        },
        makePhone(phone) {
            window.location.href = 'tel://'+phone
        },
        resizeHeight () {
            if (!this.$refs.shopDetailScroll) {
                return
            } 
            this.$refs.shopDetailScroll.refresh()
        },
        show (index) {
            if(!this.canSacle) {
                return
            }
            this.$refs.previewer.show(index)
        },
        loadImage() {
            // TODO 需要图片全部加载后 目前没处理
            this.canSacle = true
        }
    },
    components: {
        Previewer,
        XButton,
        Spinner,
        Blur, 
        Badge
    }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/reset.less';
.shop-detail-container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    height: 100%;
    overflow: hidden;
    .shop-detail-scroll{
        height: 100%;
        overflow: hidden;
        .shop-name{
            font-weight: bolder;
            font-size: 14px;
            color:white;
        }
        .device{
            border-left:10px solid #ccc;
            font-weight: bolder;
        }
        .address:before{
            height: 15px;
            width: 15px;
            content: url(../../assets/addr.png);
            vertical-align: middle;
            display: inline-block;
            line-height: 15px;
        }
    }
}
    
        
    
        
           

.slide-enter-active, .slide-leave-active{
    transition: all 0.3s;
}

.slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0);
}
</style>