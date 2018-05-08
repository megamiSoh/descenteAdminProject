<template>
<div class="warmWrap" id="vList">
  <h1>수정</h1>
  <el-form>
    <table class="el-table badgeStyle" style="margin-bottom: 20px;">
      <tr>
        <th>배너 제목</th>
        <td> <el-input style="width: 500px" size="small" v-model="mainTitle" ></el-input></td>
      </tr>
      <tr>
        <th>대 제목</th>
        <td><el-input style="width: 500px" size="small" v-model="bigTitle"></el-input></td>
      </tr>
      <tr>
        <th>소 제목</th>
        <td><el-input style="width: 500px" size="small" v-model="smallTitle"></el-input></td>
      </tr>
      <tr>
        <th rowspan="2">배너 노출 기간</th>
        <td>시작 날짜 
          <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="startDate" size="small"></el-date-picker>

          <el-time-picker
            v-model="startDate"
            format=HH:mm
            placeholder="Arbitrary time"  size="small"
            >
        </el-time-picker>
        </td>
      </tr>
      <tr>
        <td>종료 날짜 
          <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="endDate" size="small"></el-date-picker>

        <el-time-picker
            v-model="endDate"
            format=HH:mm
            placeholder="Arbitrary time" size="small"
            >
        </el-time-picker>
        </td>
      </tr>
      <tr>
        <th>광고배너 이미지</th>
        <td>
    <label>
          <span class="el-button fileBtn" style="font-size: 13px; margin-right: 5px;" >파일 선택</span>
          
          <input class="file-input" type="file" name="resume" id="imageFile" accept="image/x-png,image/gif,image/jpeg" @change="fileChoice()" style="display: none;">
          {{listRender}}
        </label>
          <el-dialog
            title="이미지 미리보기"
            :visible.sync="showImg"
        >
        <img v-bind:src="file.logicalPath" v-model="file">
    </el-dialog>
    <el-button @click="showImg = true" size="small" class="linkA"> 
         {{originName}}
    </el-button>
        </td>
      </tr>
    </table>

    <div class="app">
    <ckeditor 
      v-model="content" 
      :config="config" 
      @blur="onBlur($event)" 
      @focus="onFocus($event)"
      >
    </ckeditor>
  </div>

    <div class="btnWrap">
        <el-button type="info" size="small" class="submitBtn" @click="mainRemove()">저장</el-button>
        <router-link v-bind:to="{path: 'maindetail'}"><el-button type="warning" size="small" class="submitBtn">취소</el-button></router-link>
    </div>
    </el-form>
</div>
</template>
<script>
import { GetDetail, editMain } from '@/api/marketing'
import axios from 'axios'
import { mapGetters } from 'vuex'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import Ckeditor from 'vue-ckeditor2'


  export default {
    components: { Ckeditor },
    data() {
      return {
        content: '',
        showImg: false,
        config: {
        height: 300,
        removePlugins: 'dragdrop,basket',
            extraPlugins: 'uploadimage,uploadfile',
            removeButtons: 'Copy',
            filebrowserBrowserUrl: 'http://localhost:9528/api/upload',
            filebrowserUploadUrl: 'http://localhost:59670/api/upload'
      },
        bannerTitle: '',
        startDate: '',
        endDate: '',
        // content: '',
        mainBanner: '',
        file: '',
        mainTitle: '',
        bigTitle: '',
        smallTitle: '',
        listRender: '',
        postFormData: new FormData(),
        originName: '',
      } 
    },
   
    created() {
        this.mainDetail()
        // this.mainBanner.title = this.mainTitle
    },
     methods: {
      fileChoice() {
      this.postFormData.append('bannerimage', document.getElementById('imageFile').files[0])
      this.listRender = document.getElementById('imageFile').value.substring(12)
    },
          onBlur (editor) {
      console.log(editor)
    },
    onFocus (editor) {
      console.log(editor)
    },
    
         mainDetail() {
            var id = localStorage.getItem('id')
            var data = {id: id}
             GetDetail(data)
             .then(response => {
                 this.config.readOnly = true;
                 this.mainBanner = response.mainBanner
                 this.file = response.file
                this.mainTitle = this.mainBanner.title
                this.content = this.mainBanner.contents
                this.bigTitle = this.mainBanner.bigTitle
                this.smallTitle = this.mainBanner.smallTitle
                var startD = this.mainBanner.startDate
                startD = startD.replace(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$​/g,"")
                this.startDate = startD
                var endD = this.mainBanner.endDate
                endD = endD.replace(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$​/g,"")
                this.endDate = endD
                this.originName = this.file.originName
             })
         },
      mainRemove() {
        
            var id = localStorage.getItem('id')
            var hours = new Date(this.startDate).getHours()
            var min = new Date(this.startDate).getMinutes()
            var hours1 = new Date(this.endDate).getHours()
            var min1 = new Date(this.endDate).getMinutes()
            var startDate = new Date(this.startDate).getFullYear() + '-' + (new Date(this.startDate).getMonth()+1) + '-' + new Date(this.startDate).getDate()
            var endDate = new Date(this.endDate).getFullYear() + '-' + (new Date(this.endDate).getMonth()+1) + '-' + new Date(this.endDate).getDate()
            // var data = new FormData();

            if (this.mainTitle === ''){
              this.$message({
                showClose: true,
                message: '제목을 입력해 주세요.',
                type: 'error'
              });
            } else if (this.bigTitle === '' || this.bigTitle === null){
              this.$message({
                showClose: true,
                message: '대제목을 입력해 주세요.',
                type: 'error'
              });
            } else if (this.startDate === '') {
              this.$message({
                showClose: true,
                message: '시작 날짜를 입력해 주세요.',
                type: 'error'
              });
            } else if (this.startDate < new Date()){
                  this.$message({
                showClose: true,
                message: '시작 날짜가 현재 날짜보다 이전입니다.',
                type: 'error'
              });
            } else if (this.endDate === '') {
              this.$message({
                showClose: true,
                message: '종료 날짜를 입력해 주세요.',
                type: 'error'
              });
            } else if (this.endDate < this.startDate) {
              this.$message({
                showClose: true,
                message: '종료 날짜가 시작 날짜보다 이전입니다.',
                type: 'error'
              });
            }
            else{
            this.postFormData.append('mainBannerId', id)
            this.postFormData.append('title', this.mainTitle)
            this.postFormData.append('contents', this.content)
            this.postFormData.append('startYmd', startDate)
            this.postFormData.append('startHour', hours)
            this.postFormData.append('startMinute', min)
            this.postFormData.append('endYmd', endDate)
            this.postFormData.append('endHour', hours1)
            this.postFormData.append('endMinute', min1)
            this.postFormData.append('bigTitle', this.bigTitle)
            this.postFormData.append('smallTitle', this.smallTitle)
            // data.append('bannerImage', document.getElementById('img').files[0])
              this.$confirm('등록하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                this.loading = true

            editMain(this.postFormData)
            .then(response => {
              this.loading = false
                if(response === undefined) {
                    this.$message({
                        message: '컨텐츠를 등록할 수 없습니다.',
                        type: 'warning'
                        });
                } else {
                    this.$message({
                    message: '등록이 완료 되었습니다.',
                    type: 'success'});
                    this.$router.push({ path: 'maindetail' })
                }
             })
            })
             .catch(() => {
                this.loading = false
            this.$message.info('취소 되었습니다.'); 
            });
        }

        }
    }
}


</script>
<style scoped>
.warmWrap {margin: 0 50px;}
h1 {
    margin: 35px 0 25px;
    text-indent: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid #cdcdcd;
}
h2 {
    float: left;
    font-size: 15px;;
    margin: 0;
    min-width: 160px;
    line-height: 35px;
    }
.el-time-spinner {margin-bottom: 17px;}
.el-col h3 {float: left; margin: 0; margin-right: 10px;}
.el-upload__tip {float: right; margin-left: 30px; margin-top: 0;}
.el-upload-list {float: left;}
.el-form-item__content {float: left}
.el-form-item {
  float: left;
  margin: 0;
}
.warm_con {overflow:hidden; margin-bottom: 20px;}
.submitBtn {font-weight: bold; width: 100px; }
.btnWrap {text-align: center; margin: 50px 0;}
.deactiBtn {font-weight: bold; margin-left: 50px; font-size: 14px}
</style>