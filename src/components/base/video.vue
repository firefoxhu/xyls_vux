<template>
    <div>
        <div ref="vueDPlayer" class="vueDPlayer">
        </div>
    </div>
    
</template>
<script>
/* eslint-disable */
import 'DPlayer/dist/DPlayer.min.css'
import DPlayer from 'DPlayer'


export default {
    props:{
        video: {
            type: Object,
            default: {}
        }
    },
    mounted() {
        setTimeout(() => {
            this._initDPlayer()
        }, 500);
    },
    methods: {
        _initDPlayer() {
            if (!this.$refs.vueDPlayer) {
               return
            }

            this.vueDPlayer = new DPlayer({
                container: this.$refs.vueDPlayer,
                autoplay: false,
                theme: '#FADFA3',
                loop: false,
                lang: 'zh-cn',
                preload: 'auto',
                logo: require('@/assets/default.png'),
                volume: 0.7,
                mutex: true,
                video: {
                    url: this.video.url,
                    pic: this.video.pic === '' ? require('@/assets/default.png'): this.video.pic,
                    thumbnails: this.video.pic === '' ? require('@/assets/default.png'): this.video.pic,
                    type: 'auto',
                }
            })
            // this.vueDPlayer.on('error',()=>{
            //     this.vueDPlayer.notice('播放错误！请选择其它视频', 3000)                
            // })
            
        },
        _switchVideo() {

            if(!this.vueDPlayer) {
                return
            }

            this.vueDPlayer.notice(this.video.message, 3000)
            setTimeout(() => {
                this.vueDPlayer.switchVideo({
                    url: this.video.url,
                    pic: this.video.url,
                    thumbnails: this.video.url
                })
                
                this.vueDPlayer.play()
            }, 3000);

            
            
        }
    },
    watch:{
        video(y){
            this._switchVideo()
        }
    }
}
</script>


<style lang="less">
.vueDPlayer{
    height:200px;
}
.dplayer-logo{
    left:5px;
    top:5px;
}
.dplayer-logo img{
    border:1px solid #ffffff;
    border-radius: 50%;
    opacity:0.4;
    filter:alpha(opacity=40);
}

</style>