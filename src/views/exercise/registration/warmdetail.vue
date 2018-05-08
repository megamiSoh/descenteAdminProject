<template>
<div class="warmWrap" id="vList" v-loading="loading">
  <h1>상세정보 
    <span  v-if="isAuth()">
    <el-button type="success" size="small" plain @click="isActiveBtn(warmup.isActive)" v-if="warmup.isActive">활성화</el-button>
        <el-button type="info" size="small" plain @click="isActiveBtn(warmup.isActive)" v-else>비활성화</el-button>
      </span>
      <span v-else>
      {{entry.isActive? '활성화': '비활성화'}}
      </span>
  </h1>
  <el-form>
  <div class="warm_con">
  <el-form :inline="true">
    <el-form-item label="웜업 명칭">
      <el-input v-model="input" size="small" disabled></el-input>
    </el-form-item>
    <el-form-item label="웜업 부위">
      <el-select placeholder="전체"  v-model="pSelect" size="small" disabled>
        <el-option :label="list.name" v-for="list in part" :value="list.id" :key="list.id" >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="촬영 모델">
      <el-select v-model="mSelect" size="small" disabled>
        <el-option :label="list.name" v-for="list in model" :value="list.id" :key="list.id" >
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  </div>

  <table class="el-table leftTitleTable">
    <tr>
      <th>웜업 동영상</th>
      <td><el-button @click="dialogTableVisible = true; videoPlayer(video.id)" size="small" class="linkA">{{video.originName}}</el-button>
      </span>
    </el-form-item></td>
    </tr>
    <tr>
      <th>썸네일 이미지</th>
      <td><el-button @click="thumbPathShow = true" size="small" class="linkA">{{thumb}}</el-button></td>
    </tr>
    <tr>
      <th>중간 이미지</th>
      <td><el-button @click="middleShow = true"size="small" class="linkA">{{middleImg}}</el-button></td>
    </tr>
    <tr>
      <th>상세 상단 이미지</th>
      <td><el-button @click="topShow = true" size="small" class="linkA">{{topImg}}</el-button></td>
    </tr>
  </table>
 
  <el-dialog title="동영상 미리보기" :visible.sync="dialogTableVisible">
    <videoP :id="fileId" ref="form" ></videoP>
  </el-dialog>
    <el-dialog
        title="이미지 미리보기"
        :visible.sync="thumbPathShow"
        >
        <img v-bind:src="thumbPath" style="width: 100%;" />
    </el-dialog>
    <el-dialog
        title="이미지 미리보기"
        :visible.sync="middleShow"
        >
        <img v-bind:src="middleImgPath" style="width: 100%;" />
    </el-dialog>

    <el-dialog
        title="이미지 미리보기"
        :visible.sync="topShow"
        >
        <img v-bind:src="topImgPath" style="width: 100%;" />
    </el-dialog>
   
  <div class="btnWrap">
    <router-link v-bind:to="{path: 'warmremove'}" v-if="isAuth()"><el-button type="info" size="small" class="submitBtn">수정</el-button></router-link>
    <router-link v-bind:to="{path: '/exercise/warmup'}"><el-button type="warning" size="small" class="submitBtn">취소</el-button></router-link>
  </div>
  </el-form>
</div>
</template>

<script>
import { EditIsAcive, getDetail, GetWarmupPart, getModel,getvideoUrl } from '@/api/exercise'
import axios from 'axios'
import { mapGetters } from 'vuex'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import videoP from '@/components/tab/videoPlayer'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    components: {
      videoP
    },
    data() {
      return {
        fileId: '',
        topShow: false,
        middleShow: false,
        thumbPathShow: false,
        dialogTableVisible:false,
        warmup: '',
        files: '',
        part: '',
        model: '',
        thumb: '',
        middleImg: '',
        topImg:'',
        thumbPath:'',
        middleImgPath: '',
        topImgPath:'',
        video: '',
        videoPath:'',
        mSelect: '',
        input: '',
        pSelect: '',
        loading: false,
      } 
    },
    created() {
      this.getDetail()
      this.getPart()
      this.getModel()
      this.isAuth()
    },
     methods: {
       videoPlayer(val){
          console.log(val)
             this.videoShow = true
             this.fileId = val
             
             console.log(this.fileId)
             var data = {fileId: val}
             getvideoUrl(data)
             .then(response => {
                //  alert(response)
                 this.videoUrl = response    
                 this.callVideo(val)
            })
        
         },
          callVideo(val){
         this.$refs.form.videoId(val)
       },
       isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 7
            }).filter(item => {
                return item.authDivision === 'CU'
            }).length
           if(x > 0) {
               
               return true
           } else {
               return false
           }
       },
       isActiveBtn(val1) {
          if(val1 === true) {
           var active = false
           this.$message({
            message: '비활성화 처리 되었습니다.',
            type: 'info'
        });
          } else {
            var active = true
            this.$message({
            message: '활성화 처리 되었습니다.',
            type: 'success'
        });
          }
          var val = localStorage.getItem('id')
          var data = {actionId: val, isActive: active}
          EditIsAcive(data)
          .then(response => {
           this.getDetail()
          })
        },
      getDetail(){
        var id = localStorage.getItem('id')
        var data = {id: id}
        this.loading=true
        getDetail(data)
        .then(response => {
          this.loading = false
          this.warmup = response.warmup
          this.files = response.files
          this.input = this.warmup.name
          this.pSelect = this.warmup.warmUpCateId
          this.mSelect = this.warmup.photoModelId
          this.thumb = this.files.filter(item => {
            return item.fileCd === 'TH'
          })[0].originName
          this.middleImg = this.files.filter(item => {
            return item.fileCd === 'MP'
          })[0].originName
          this.topImg = this.files.filter(item => {
            return item.fileCd === 'TP'
          })[0].originName
          this.video = this.files.filter(item => {
            return item.fileCd === 'WV'
          })[0]

          this.thumbPath = this.files.filter(item => {
            return item.fileCd === 'TH'
          })[0].logicalPath
          this.middleImgPath = this.files.filter(item => {
            return item.fileCd === 'MP'
          })[0].logicalPath
          this.topImgPath = this.files.filter(item => {
            return item.fileCd === 'TP'
          })[0].logicalPath

        })
        .catch(response => {
          console.log(response)
        })
      },
       getPart(){
        var u = null
       GetWarmupPart(u)
          .then(response => {
          this.part = response.results
        })
        .catch(response => {
          console.log(response)
        })
      },
      getModel() {
        var u = null;
        getModel(u)
          .then(response => {
          this.model = response.results
        })
        .catch(response => {
          console.log(response)
        })
      }
    },
    computed: {
    ...mapGetters([
      'roles',
      
    ])
  }

}
</script>
<style scoped>

</style>