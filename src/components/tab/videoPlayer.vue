<template>
<div>
     <video ref="azuremediaplayer" class="azuremediaplayer amp-default-skin amp-big-play-centered" @ended='video' tabindex="0"  :src="videoUrl">
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
        // id: '',
      }   
    },
  created() {
 
  },
     methods: {
       video() {
        // var myOptions = {
        //         "nativeControlsForTouch": false,
        //         controls: false,
        //         wasPaused: true,
        //         width: "719",
        //         height: "400",
        //     }
             this.myPlayer = amp(this.$refs.azuremediaplayer, 
      );
      console.log(this.myPlayer.wasPaused = true)
            this.myPlayer.src([
                    {
                            "src": this.videoUrl,
                            "type": "application/vnd.ms-sstr+xml"
                    }
           ]);
       },
        videoId(val){
          
             if(val !== undefined) {
                 var data = {fileId: val}
                //  this.id = val
             getvideoUrl(data)
             .then(response => {
                 var videoUrl = response   
                 this.videoUrl = videoUrl.replace("http", "https")
                 console.log('start')
                //  console.log(this.videoUrl.replace("http", "https"))
                
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
      console.log(this.myPlayer.wasPaused)
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