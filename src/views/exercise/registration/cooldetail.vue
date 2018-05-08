<template>
<div class="warmWrap" id="vList" v-loading="loading">
  <h1>상세정보
    <span v-if="isAuth()">
        <el-button type="success" size="small" plain @click="editsActive(coolDown.isActive)" v-if="coolDown.isActive">활성화</el-button>
      <el-button type="info" size="small" plain @click="editsActive(coolDown.isActive)" v-else >비활성화</el-button>
      </span>
      <span v-else>
      {{coolDown.isActive ? '활성화':'비활성화'}}
    </span>
  </h1>
  <el-form>
  <el-form class=" warm_con" size="small" :inline="true">
    <el-form-item label="촬영 모델">
    <el-select v-model="coolDown.photoModelId" disabled>
          <el-option v-for="lists in model" :value="lists.id" :label="lists.name" :key="lists.id" >
            {{lists.name}}
          </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="쿨다운 명칭">
    <el-input size="small" disabled v-model="coolDown.name"></el-input>
    </el-form-item>
  </el-form>
<el-form size="mini" :inline="true">
    
  </el-form>
<table class="el-table leftTitleTable">
  <tr>
    <th>쿨다운 동영상</th>
    <td><el-button @click="videoShow = true; videoPlayer(logicalPath)" size="small" class="linkA">{{originName}}</el-button>
          <el-dialog
            title="동영상 미리보기"
            :visible.sync='videoShow'
          >
            <videoP :id="logicalPath" ref="form"> </videoP>
          </el-dialog>
    </el-form-item></td>
  </tr>
</table>
  

    <div class="btnWrap">
        <router-link v-bind:to="{ path: 'coolremove' }" v-if="isAuth()"><el-button type="info" size="small" class="submitBtn">수정</el-button></router-link>
        <router-link v-bind:to="{path: '/exercise/cooldown'}">
        <el-button type="warning" size="small" class="submitBtn">취소</el-button>
        </router-link>
    </div>
    </el-form>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getModel, coolDetail, coolActive, getvideoUrl } from '@/api/exercise'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import videoP from '@/components/tab/videoPlayer'
  export default {
    components: {
      videoP
    },
    data() {
      return {
        videoUrl: '',
        model:'',
        results:'',
        coolDown: '',
        files:'',
        videoShow: false,
        originName: '',
        logicalPath: '',
        loading: false,
      } 
    },
   
    created() {
      this.getModel()
      this.getDetail()
      this.isAuth()
    },
     methods: {
       videoPlayer(val){
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
                return item.menuId === 9
            }).filter(item => {
                return item.authDivision === 'CU'
            }).length
           if(x > 0) {
               
               return true
           } else {
               return false
           }
       },
       add(val){
         this.val = val
         this.data =this.results.filter(item => {
           return item.fileId === val
         })
       }, 
      getModel() {
        var u = null;
        getModel(u)
          .then(response => {
          this.model = response.results
        })
      },
      editsActive(val){
          var val1 = localStorage.getItem('id')
           if(val === true) {
                var editActive = false
                this.$message({
                    message: '비활성화 처리 되었습니다.',
                    type: 'info'
                });
            } else {
                var editActive = true
                this.$message({
                    message: '활성화 처리 되었습니다.',
                    type: 'success'
                });
            }
            
          var data = {actionId: val1, isActive: editActive }
          coolActive(data)
          .then(response => {
             this.getDetail()
          })
        },
        getDetail() {
          this.loading = true
          var id = localStorage.getItem('id')
          var data = {id: id}
          coolDetail(data)
          .then(response => {
            this.loading = false
          this.coolDown = response.cooldown
          this.files = response.files
          this.originName = this.files[0].originName
          this.logicalPath = this.files[0].id
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
