<template>
<div class="warmWrap" id="vList" v-loading ="loading">
  <h1>수정</h1>
  <el-form>
<table class="el-table badgeStyle" style="margin-bottom: 20px;">
      <tr>
        <th>광고/이벤트 제목</th>
        <td> <el-input style="width: 500px" size="small" v-model="bannerTitle" ></el-input></td>
      </tr>
      <tr>
        <th>광고 대 타이틀</th>
        <td><el-input style="width: 500px" size="small" v-model="bigTitle"></el-input></td>
      </tr>
      <tr>
        <th>광고 소 타이틀</th>
        <td><el-input style="width: 500px" size="small" v-model="smallTitle"></el-input></td>
      </tr>
      <tr>
        <th rowspan="2">이벤트 기간</th>
        <td>시작 날짜 
        <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="startDate" size="small"></el-date-picker>

          <el-time-picker
            v-model="startDate"
            format=HH:mm
            placeholder="Arbitrary time" size="small">
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
        <th>광고 배너 이미지</th>
        <td>
         <label>
            
            <span class='el-button fileBtn' style="font-size: 13px;">파일 선택
            </span>
            <input class="file-input" type="file" name="thumb" id="imageFile" accept="image/x-png,image/gif,image/jpeg" @change="change()" style="display: none;">
            <span>
              {{listRender}}
            </span>
            </label>
              <el-popover
                ref="popover4"
                placement="right"
                trigger="click"
                >
                <img v-bind:src="file.logicalPath" v-model="file">
                </el-popover>
                <el-button v-popover:popover4 size="small" class="linkA"> 
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
        @focus="onFocus($event)">
        </ckeditor>
    </div>

    <div class="btnWrap">
        <el-button type="info" size="small" class="submitBtn" @click="themeRegist()">저장</el-button>
        <router-link v-bind:to="{path: 'adverdetail'}"><el-button type="warning" size="small" class="submitBtn">취소</el-button></router-link>
    </div>
    </el-form>
    
</div>

</template>

<script>
import { adDetail, editAd } from '@/api/marketing'
import axios from 'axios'
import { mapGetters } from 'vuex'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import Ckeditor from 'vue-ckeditor2'
import { router } from '@/router'


  export default {
    components: { Ckeditor },
    data() {
      return {
        content: '',
        config: {
        height: 300,
            extraPlugins: 'uploadimage,uploadfile',
            removeButtons: 'Copy',
            // filebrowserBrowserUrl: 'http://localhost:9528/marketing/mainbanner/mainregist',
            filebrowserUploadUrl: 'http://smartshoe-api-dev.azurewebsites.net/api/File/UploadEditor'
      },
        bannerTitle: '',
        startDate: '',
        loading: false,
        endDate: '',
        value1: '',
        value2: '',
        content: '',
        bigTitle: '',
        smallTitle: '',
       mainBanner: '',
       imgFile: '',
       file: '',
        postFormData: new FormData(),
        listRender: '',
        originName:'',
      } 
    },
   
    created() {
    this.getDetail()
    },
     methods: {
    getDetail() {
        var id = localStorage.getItem('id')
            var data = {id: id}
            adDetail(data)
            .then(response => {
                //  this.config.readOnly = true;
                 this.mainBanner = response.adEvent
                 this.file = response.file
                this.content = this.mainBanner.contents
                this.bannerTitle = this.mainBanner.title
                this.bigTitle = this.mainBanner.bigTitle
                this.smallTitle = this.mainBanner.smallTitle
                this.originName = this.file.originName
                this.startDate = new Date(this.mainBanner.startDate)
                this.endDate = new Date(this.mainBanner.endDate)

             })
    },
           onBlur (editor) {
      console.log(editor)
    },
       onFocus (editor) {
      console.log(editor)
    },
       change() {
        //  data.append('thumbnailImage', document.getElementById('imageFile').files[0])
         this.postFormData.append('thumbnailImage', document.getElementById('imageFile').files[0])
         var a = document.getElementById('imageFile').value.substring(12)
        //  .substring(12)
         this.listRender = a
       },
         themeRegist() {
           var id = localStorage.getItem('id')
            var hours = new Date(this.startDate).getHours()
            var min = new Date(this.startDate).getMinutes()
            var hours1 = new Date(this.endDate).getHours()
            var min1 = new Date(this.endDate).getMinutes()
            var startDate = new Date(this.startDate).getFullYear() + '-' + (new Date(this.startDate).getMonth() + 1) + '-' + new Date(this.startDate).getDate()
            var endDate = new Date(this.endDate).getFullYear() + '-' + (new Date(this.endDate).getMonth() +1) + '-' + new Date(this.endDate).getDate()
              var data = new FormData()
            if (this.bannerTitle === ''){
              this.$message({
                showClose: true,
                message: '제목을 입력해 주세요.',
                type: 'error'
              });
            } 
            else if (this.bigTitle === ''){
              this.$message({
                showClose: true,
                message: '대제목을 입력해 주세요.',
                type: 'error'
              });
            } 
            else if (this.startDate === '') {
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
            }  else if (this.endDate < this.startDate) {
              this.$message({
                showClose: true,
                message: '종료 날짜가 시작 날짜보다 이전입니다.',
                type: 'error'
              });
            }  
            else{

            this.postFormData.append('adEventId', id)
             this.postFormData.append('contents', this.content)
             this.postFormData.append('title', this.bannerTitle)
             this.postFormData.append('bigTitle', this.bigTitle)
             this.postFormData.append('smallTitle', this.smallTitle)
             this.postFormData.append('startYmd', startDate)
             this.postFormData.append('startHour', hours)
             this.postFormData.append('startMinute', min)
             this.postFormData.append('endHour', hours1)
             this.postFormData.append('endMinute', min1)
             this.postFormData.append('endYmd', endDate)
             
            var data = this.postFormData
            this.$confirm('등록하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                this.loading = true
             editAd(data)
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
                    this.$router.push({ path: 'adverdetail' })
                }
             })
            })
             .catch(() => {
                this.loading = false
            this.$message.info('취소 되었습니다.'); 
            });
        }
         },
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
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