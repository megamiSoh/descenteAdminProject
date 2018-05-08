<template>
<div>
     <video ref="azuremediaplayer" class="azuremediaplayer amp-default-skin amp-big-play-centered " tabindex="0"  :src="videoUrl">
     </video>
</div>
</template>

<script>
import { getvideoUrl } from '@/api/exercise'
  export default {
    name: "videoP",
    props: ['id'],
    data() {
      return {
        videoUrl: '',
      }   
    },

     methods: {
        videoId(val){
          
             if(val !== undefined) {
                 var data = {fileId: val}
             getvideoUrl(data)
             .then(response => {
                 var videoUrl = response   
                 this.videoUrl = videoUrl.replace("http", "https")
                //  console.log(this.videoUrl.replace("http", "https"))
                 console.log(this.videoUrl)
            }).then(() => {
                var myOptions = {
                "nativeControlsForTouch": false,
                controls: true,
                autoplay: true,
                width: "719",
                height: "400",
            }
             this.myPlayer = amp(this.$refs.azuremediaplayer, myOptions, 
      );
            this.myPlayer.src([
                    {
                            "src": this.videoUrl,
                            "type": "application/vnd.ms-sstr+xml"
                    }
           ]);
            
            })
             }
            this.$emit('loadingWait', false)
         },

    },
    computed: {
    
  }
  }

</script>