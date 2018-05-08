<template>
<div class="warmWrap" id="vList" v-loading="loading">
  <h1>수정</h1>
  <el-form>
  <el-form class="warm_con" size="mini" :inline="true">
    <el-form-item label="촬영 모델" ></el-form-item>
    <el-form-item>
      <el-col>
        <el-select v-model="pModel">
          <el-option v-for="lists in model" :value="lists.id" :label="lists.name" :key="lists.id" >
            {{lists.name}}
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="쿨다운 명칭" ></el-form-item>
    <el-form-item>
      <el-col>
        <el-input :maxlength="30" v-model="input"></el-input>
      </el-col>
    </el-form-item>
  </el-form>
 
 <table class="el-table leftTitleTable">
 <tr>
  <th></th>
  <th>파일명</th>
  <th>기존 파일 미리보기</th>
  <th colspan="2">파일 변경</th> 
 </tr>
  <tr>
    <th>쿨다운 동영상</th>
    <td  style="width: 600px;" v-for="lists in data" :key="data.id">{{ lists.originName }}</td>
    <td  style="width: 600px;" v-if="data <= 0">영상을 등록해 주세요.</td>
    <td><el-button @click="videoShow = true; videoPlayer(videoPath)" size="small" class="linkA">{{videoName}}</el-button></td>
    <td  align="center" style="padding-left: 0;"><el-button @click="coolShow = true;" size="small" >동영상 변경</el-button></td>
  </tr>
 </table>

<el-dialog title="동영상 미리보기" :visible.sync = 'videoShow'>
  <videoP :id="videoPath" ref="form"></videoP>
</el-dialog>
<el-dialog
        :visible.sync="coolShow"
        center>
        <playList @add = "pList" ref="formSend"></playList>
          </el-dialog>
        </el-dialog>
    <div class="btnWrap">
        <el-button type="info" size="small" class="submitBtn" @click="mediaRegist()">저장</el-button>
        <router-link v-bind:to="{path: '/exercise/cooldown/cooldetail'}">
        <el-button type="warning" size="small" class="submitBtn">취소</el-button>
        </router-link>
    </div>
    </el-form>
</div>
</template>

<script>
import { getModel,getMedia, coolDetail, GetVideoMenus, coolRemove, getvideoUrl} from '@/api/exercise'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import playList from '@/components/tab/playList'
import videoP from '@/components/tab/videoPlayer'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    components: {
      playList,
      videoP
    },
    data() {
      return {
         search: {
            id: '',
            parentMenuId: null,
            menuId: null,
            originName: '',
            searchColumn: 'CreateDate',
            startDate:new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
        },
        paging: {
          page: 1,
          pageSize: 5,
          totalPages: 0,
          totalRecords: 0,
          orderBy: 'CreateDate',
          ascending: true
        },
        data3:'',
        model:'',
        pModel: '',
        input: '',
        results:'',
        data: '',
        val: '',
        cooldown: '',
        files: '',
        addData: '',
        coolShow: false,
        videoName: '',
        videoPath: '',
        videoShow: false,
        postFormData: new FormData(),
        mediaResultShow: '',
        loading: false,
        videoUrl: '',
      } 
    },
   
    created() {
      this.getModel()
      this.getDetail()
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
       pList(val, data){
        this.data = data
        this.val = val
        this.coolShow = false
       },
      
        getDetail(){
          var id = localStorage.getItem('id')
          var data = {id: id}
          coolDetail(data)
          .then(response => {
            this.cooldown = response.cooldown
            this.files = response.files
            this.pModel = this.cooldown.photoModelId
            this.input = this.cooldown.name
            this.data = this.files
            this.val = this.data[0].id
            this.addData = this.data[0].id

            this.videoPath = this.files[0].id
            this.videoName = this.files[0].originName
          })
        },
      getModel() {
        var u = null;
       getModel(u)
          .then(response => {
          this.model = response.results
        })
      },
     
        mediaRegist() {
          if(this.input <= 0){
            this.$notify.error({
              title: 'Error',
              message: '쿨다운명칭을 입력해 주세요.'
            });
          } else if(this.data <= 0) {
            this.$notify.error({
              title: 'Error',
              message: '쿨다운 영상을 등록해 주세요.'
            });
          } else {

            var id = localStorage.getItem('id')
          this.postFormData.append('name', this.input)
          this.postFormData.append('photoModelId', this.pModel)
          this.postFormData.append('cooldownVideoId', this.val)
          this.postFormData.append('actionId', id)


          var data = this.postFormData
        this.$confirm('컨텐츠를 수정하시겠습니까?', '수정', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                this.loading = true

         coolRemove(data)
          .then(response => {
            this.loading = false
              if(response === undefined) {
                  this.$message({
                      message: '컨텐츠를 수정할 수 없습니다.',
                      type: 'warning'
                      });
              } else {
                  this.$message({
                  message: '수정이 완료 되었습니다.',
                  type: 'success'});
                  this.$router.push({ path: '/exercise/cooldown' })
              }
             })
            })
             .catch(() => {
                this.fullscreenLoading = false
            this.$message.info('취소 되었습니다.'); 
            });
            
        }
        }
    }
}
</script>
