<template>
<div class="warmWrap" id="vList" v-loading="fullscreenLoading">
<el-form>
  <h1>수정</h1>
  <div class="warm_con">
  <el-form :inline="true">
    <el-form-item label="웜업 명칭">
      <el-input v-model="input" size="small"></el-input>
    </el-form-item>
    <el-form-item label="웜업 부위">
      <el-select placeholder="전체"  v-model="pSelect" size="small">
        <el-option :label="list.name" v-for="list in part" :value="list.id" :key="list.id" >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="촬영 모델">
      <el-select v-model="mSelect" size="small">
        <el-option :label="list.name" v-for="list in model" :value="list.id" :key="list.id" >
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  </div>
  <table class="el-table leftTitleTable">
    <tr>
      <th></th>
      <th>파일명</th>
      <th>기존 파일 미리보기</th>
      <th>파일 변경</th>
    </tr>
    <tr>
      <th>웜업 동영상</th>
      <td  v-if="data.length <= 0">
          등록할 파일이 존재하지 않습니다.
      </td>
      <td v-for="item in data" style="width: 600px;">{{item.originName}}</td>
      <td> <el-button @click="dialogTableVisible = true; videoPlayer()" size="small" class="linkA">{{video}}</el-button></td>
      <td align="center"><el-button @click="centerDialogVisible = true" size="small">동영상 변경</el-button></td>
    </tr>
    <tr>
      <th>썸네일 이미지</th>
      <td v-if="!todos.length">
          등록할 파일이 존재하지 않습니다.
      </td>
      <td>{{todos}}</td>
      <td><el-button @click="thumbPathShow = true" size="small" class="linkA">{{originTh}}</el-button></td>
      <td style="text-align: center;">
        <label class="file-label">
        <span class="el-button fileBtn" type="primary" plane size="small" style="font-size:12px;">이미지 변경</span>
        <input class="file-input" type="file" id="file" accept="image/*" style="display: none;" @change="change()"> 
      </label>
      </td>
    </tr>
    <tr>
      <th>중간 이미지</th>
      <td v-if="!todos1.length">
          등록할 파일이 존재하지 않습니다.
      </td>
      <td>{{todos1}}</td>
      <td><el-button @click="middleShow = true" size="small" class="linkA">{{originMp}}</el-button></td>
       <td style="text-align: center;">
          <label class="file-label">
            <span class="el-button fileBtn" type="primary" plane size="small" style="font-size:12px;">이미지 변경</span>
            <input class="file-input" type="file" id="file1" accept="image/*" style="display: none;" @change="change1()"> 
        </label>
      </td>
    </tr>
    <tr>
      <th>상세 상단 이미지</th>
      <td v-if="!todos2.length">
          등록할 파일이 존재하지 않습니다.
      </td>
      <td>{{todos2}}</td>
      <td><el-button @click="topShow = true" size="small" class="linkA">{{originTp}}</el-button></td>
      <td style="text-align: center;">
        <label class="file-label">
          <span class="el-button fileBtn" type="primary" plane size="small" style="font-size:12px;">이미지 변경</span>
          <input class="file-input" type="file" id="file2" accept="image/*" @change="change2()" style="display: none;" > 
        </label>
      </td>
    </tr>
  </table>

 <el-dialog title="동영상 미리보기" :visible.sync="dialogTableVisible">
    <videoP :id="fileId" ref="form" ></videoP>
  </el-dialog>
<el-dialog
      title="이미지 미리보기"
    :visible.sync="thumbPathShow"
    >
    <img v-bind:src="thumbPath"  style="width: 100%;" />
</el-dialog>
<el-dialog
    title="이미지 미리보기"
  :visible.sync="middleShow"
  >
  <img v-bind:src="middleImgPath"  style="width: 100%;" />
</el-dialog>
<el-dialog
    title="이미지 미리보기"
  :visible.sync="topShow"
  >
  <img v-bind:src="topImgPath" style="width: 100%;" />
</el-dialog>

  <div class="btnWrap">
    <el-button type="info" size="small" class="submitBtn" @click="mediaRegist()" >저장</el-button>
    <router-link v-bind:to="{path: '/exercise/warmup/warmdetail'}"><el-button type="warning" size="small" class="submitBtn">취소</el-button></router-link>
  </div>
  <el-dialog
          :visible.sync="centerDialogVisible">
         <playList @add = "pList" ref="formSend"></playList>
          </el-dialog>
</el-form>
</div>
</template>

<script>
import { GetVideoMenus,  getMedia, GetWarmupPart, editWarmup, getDetail, getModel, getvideoUrl} from '@/api/exercise'
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
        fileId: '',
        thumbPathShow: false,
        middleShow: false,
        topShow: false,
        dialogTableVisible:false,
        fullscreenLoading: false,
        mSelect: '',
        part: '',
        pSelect: '',
        model: '',
         data3:'',
         search: {
            id: '',
            parentMenuId: null,
            menuId: null,
            originName: '',
            searchColumn: 'CreateDate',
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date(),
        },
        paging: {
          page: 1,
          pageSize: 10,
          totalPages: 0,
          totalRecords: 0,
          orderBy: 'CreateDate',
          ascending: true
        },
        pModel: '',
        input: '',
        results: '',
        value1:'',
        videoMenu: '',
        value2:'',
        list: '',
        data:'',
        val:'',
         postFormData: new FormData(),
          postList: '',
           postList : '',
            todos   : '',
            todos1: '',
            todos2:'',
            videoMenu: '',
            value: '',
            value1: '',
            local:'',
            centerDialogVisible: false,
            fullscreenLoading: false,
            loading: false,
            mediaMenu:'',
            thumbPath:'',
            middleImgPath: '',
            topImgPath:'',
            video: '',
            videoPath:'',
            naviShow: true,
            originTh:'',
            originMp: '',
            originTp: '',
      } 
    },
   
    created() {
    this.getPart()
    this.getModel()
    this.getMenus()
    this.getDetail()
    },
     methods: {
        videoPlayer(){
          this.videoShow = true
            //  this.fileId = this.data[0].fileId
             var data = {fileId: this.videoId}
             getvideoUrl(data)
             .then(response => {
                 this.videoUrl = response    
                 this.callVideo(this.videoId)
            })
        
         },
          callVideo(val){
         this.$refs.form.videoId(val)
       },
       change() {
         this.postFormData.append('thumbnailImage', document.getElementById('file').files[0])
         var a = document.getElementById('file').value.substring(12)
         this.todos = a
       },
       change1() {
        
         this.postFormData.append('middleImage', document.getElementById('file1').files[0])
         var b = document.getElementById('file1').value.substring(12)   
         this.todos1 = b
        
       },
       change2() {
         this.postFormData.append('topImage', document.getElementById('file2').files[0])
         var c = document.getElementById('file2').value.substring(12)
         this.todos2 = c
       },
       getMenus() {
          GetVideoMenus()
          .then(response => {
            this.videoMenu= response.result
            this.mediaMenu = response.result
          }).catch(response => {
            console.log(response)
          })
        },
        getDetail() {
        var id = localStorage.getItem('id')
        var data = {id: id}
        getDetail(data)
        .then(response => {
          this.warmup = response.warmup
          this.files = response.files
          this.input = this.warmup.name
          this.pSelect = this.warmup.warmUpCateId
          this.mSelect = this.warmup.photoModelId
          
          this.data = this.files.filter(item => {
                return item.fileCd === "WV"
          })
          this.val = this.data[0].id
          this.todos = this.files.filter(item => {
                return item.fileCd === "TH"
          })[0].originName
           this.originTh = this.files.filter(item => {
                return item.fileCd === "TH"
          })[0].originName
          this.todos1 = this.files.filter(item => {
                return item.fileCd === "MP"
          })[0].originName
          this.todos2 = this.files.filter(item => {
                return item.fileCd === "TP"
          })[0].originName
          
          this.originMp = this.files.filter(item => {
                return item.fileCd === "MP"
          })[0].originName
          this.originTp = this.files.filter(item => {
                return item.fileCd === "TP"
          })[0].originName

          this.video = this.files.filter(item => {
            return item.fileCd === 'WV'
          })[0].originName
          this.videoId = this.files.filter(item => {
            return item.fileCd === 'WV'
          })[0].id

          this.thumbPath = this.files.filter(item => {
            return item.fileCd === 'TH'
          })[0].logicalPath
          this.middleImgPath = this.files.filter(item => {
            return item.fileCd === 'MP'
          })[0].logicalPath
          this.topImgPath = this.files.filter(item => {
            return item.fileCd === 'TP'
          })[0].logicalPath
          this.videoPath = this.files.filter(item => {
            return item.fileCd === 'WV'
          })[0].logicalPath
        })
      },
      getPart(){
        var data = null
       GetWarmupPart(data)
          .then(response => {
          this.part = response.results
          this.pSelect = this.part[0].id
        }).catch(response => {
          console.log(response)
        })
      },
      mediaRegist(){
        if(this.input <= 0) {
          this.$notify.error({
            title: 'Error',
            message: '웜업명칭을 입력해주세요.'
          });
        } else if (this.val <= 0) {
          this.$notify.error({
            title: 'Error',
            message: '웜업 동영상을 등록해 주세요.'
          });
        } else if (this.todos <= 0) {
          this.$notify.error({
            title: 'Error',
            message: '썸네일 이미지를 등록해 주세요.'
          });
        } else if (this.todos1 <= 0) {
          this.$notify.error({
            title: 'Error',
            message: '중간 이미지를 등록해 주세요.'
          });
        } else if (this.todos2 <= 0) {
          this.$notify.error({
            title: 'Error',
            message: '상세 상단 이미지를 등록해 주세요.'
          });
        }
        else{
          var id = localStorage.getItem('id')
        this.postFormData.append('name', this.input)
        this.postFormData.append('warmUpCateId', this.pSelect)
        this.postFormData.append('photoModelId', this.mSelect)
        this.postFormData.append('warmupVideoId', this.val)
        this.postFormData.append('actionId', id )
        var data = this.postFormData
        this.$confirm('컨텐츠를 수정하시겠습니까?', '수정', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                this.fullscreenLoading = true
        editWarmup(data)
        .then(response => {
          this.fullscreenLoading = false;
          this.fullscreenLoading = false
            if(response === undefined) {
                this.$message({
                    message: '컨텐츠를 등록할 수 없습니다.',
                    type: 'warning'
                    });
            } else {
                this.$message({
                message: '수정이 완료 되었습니다.',
                type: 'success'});
                this.$router.push({ path: 'warmdetail' })
            }
        })
        })
        .catch(response => {
          this.fullscreenLoading = false
            this.$message.info('취소 되었습니다.'); 
        
        })
        }
      },
     
      pList(val, data){
        this.data = data
        this.val = val
        this.centerDialogVisible = false
       },
      getModel() {
        var u = null;
        getModel(u)
          .then(response => {
          this.model = response.results
          this.mSelect = this.model[0].id
        })
      }

    }
}
</script>
<style scoped>
.file-label {float: none;}

</style>