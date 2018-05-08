<template>
<div class="warmWrap" id="vList" v-loading="loading">
  <h1>수정</h1>
  <el-form :inline="true">
  <div class="warm_con">
  <el-form>
    <el-form-item label="공지사항 제목"><el-input v-model="infoTitle" size="small"></el-input></el-form-item>
    
  </el-form>
  <el-form :inline="true">
    <el-form-item label="게시일"></el-form-item>
    <el-form-item>
      <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="updateDate" size="small"></el-date-picker>
    </el-form-item>
    <el-form-item style="margin-left: 10px;">
      <el-time-picker
            v-model="updateDate"
            format=HH:mm
            placeholder="Arbitrary time" size="small">
        </el-time-picker>
    </el-form-item>
  </el-form>
    
  </div>
    <!--<div class="warm_con">
    <h2>상태</h2>
    <el-form-item>
      <el-col>
        아직 수정 중 입니다.
      </el-col>
    </el-form-item>
  </div>-->
    <div class="app">
    <ckeditor 
      v-model="content" 
      :config="config" 
      @blur="onBlur($event)" 
      @focus="onFocus($event)">
    </ckeditor>
  </div>

    <div class="btnWrap">
        <router-link v-bind:to="{path: 'inforemove'}"><el-button type="info" size="small" class="submitBtn" @click="infoRegist()">저장</el-button></router-link>
        <router-link v-bind:to="{path: '/settings/infodetail'}">
        <el-button type="warning" size="small" class="submitBtn">취소</el-button>
      </router-link>
    </div>
    </el-form>
    
</div>

</template>

<script>
import { noticeDetail, EditNotice } from '@/api/settings'
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
        loading: false,
        config: {
        height: 300,
            extraPlugins: 'uploadimage,uploadfile',
            removeButtons: 'Copy',
            filebrowserBrowserUrl: 'http://localhost:9528/api/upload',
            filebrowserUploadUrl: 'http://localhost:59670/api/upload'
      },
        infoTitle: '',
        startDate: '',
        endDate: '',
        content: '',
        bigTitle: '',
        smallTitle: '',
        detail: '',
        updateTime:'',
       noticeId :'',
       updateDate:'',
      } 
    },
   
    created() {
    this.getDetail()
    },
     methods: {
       onBlur (editor) {
      // console.log(editor)
    },
       onFocus (editor) {
      // console.log(editor)
    },
    getDetail() {
        var id = localStorage.getItem('id')
        var data = {id: id}
        noticeDetail(data)
        .then(response => {
            this.detail = response
            this.infoTitle = this.detail.title
            this.content = this.detail.contents
            this.noticeId = this.detail.id
            this.updateDate =new Date(this.detail.startDate)
            
        })
    },
         infoRegist() {
           var hours = ("0" + new Date(this.updateDate).getHours()).slice(-2)
            var min = ("0" + new Date(this.updateDate).getMinutes()).slice(-2)
            // var hours = new Date(this.updateDate).getHours()
            // var min = new Date(this.updateDate).getMinutes()
            var startDate = new Date(this.updateDate).getFullYear() + '-' + (new Date(this.updateDate).getMonth() + 1) + '-' + new Date(this.updateDate).getDate()
            
              var data = new FormData()
            if (this.infoTitle === ''){
              this.$notify.error({
                showClose: true,
                message: '제목을 입력해 주세요.',
                type: 'Error'
              });
            } else if (this.updateDate === '') {
              this.$notify.error({
                showClose: true,
                message: '게시일과 시간을 입력해 주세요.',
                type: 'Error'
              });
            }  else if (this.updateDate < new Date()){
                  this.$notify.error({
                showClose: true,
                message: '시작 날짜가 현재 날짜보다 이전입니다.',
                type: 'Error'
              });
            } 
            else{

            
            
            var data = {title: this.infoTitle, contents: this.content, startYmd: startDate, startHour: hours, startMinute: min, noticeId: this.noticeId}
            this.$confirm('등록 하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                this.loading = true
             EditNotice(data)
             .then(response => {
              this.loading = false
        if(response === undefined) {
              this.$message({
                  message: '관리자에게 문의하세요.',
                  type: 'warning'
                  });
          } else {
              this.$message({
              message: '등록이 완료 되었습니다.',
              type: 'success'});
              this.$router.push({ path: '/settings/infolist' })
          }
             })
            })
             .catch(() => {
                this.loading= false
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