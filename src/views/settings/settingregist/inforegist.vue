<template>
<div class="warmWrap memberL" id="vList" v-loading="loading">
  <h1>신규등록</h1>
  <el-form>
  <div class="warm_con">
   <el-form :inline="true">
    <el-form-item label="공지사항 제목">
      <el-col>
        <el-input v-model="infoTitle" size="small"></el-input>
      </el-col>
    </el-form-item>
   </el-form>
<el-form :inline="true">
  <el-form-item label="게시일"></el-form-item>
  <el-form-item>
    <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="startDate" size="small"></el-date-picker>
  </el-form-item>
  <el-form-item style="margin-left: 10px">
    <el-time-picker
            v-model="startDate"
            format=HH:mm
            placeholder="Arbitrary time" size="small">
        </el-time-picker>
  </el-form-item>
</el-form>
    
  </div>
    
    <div class="app">
    <ckeditor 
      v-model="content" 
      :config="config" 
      @blur="onBlur($event)" 
      @focus="onFocus($event)">
    </ckeditor>
  </div>

    <div class="btnWrap">
        <el-button type="info" size="small" class="submitBtn" @click="themeRegist()">등록</el-button>
        <router-link v-bind:to="{path: 'infolist'}"><el-button type="warning" size="small" class="submitBtn">취소</el-button></router-link>
    </div>
    </el-form>
    
</div>

</template>

<script>
import { inforegist } from '@/api/settings'
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
            filebrowserBrowserUrl: 'http://localhost:9528/api/upload',
            filebrowserUploadUrl: 'http://localhost:59670/api/upload'
      },
        infoTitle: '',
        startDate: new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate() + 1, 9, 0),
        endDate: '',
        value2: '',
        content: '',
        bigTitle: '',
        smallTitle: '',
        loading: false,
       
      } 
    },
   
    created() {
    
    },
     methods: {
       onBlur (editor) {
      // console.log(editor)
    },
       onFocus (editor) {
      // console.log(editor)
    },
         themeRegist() {
            
            var hours = ("0" + new Date(this.startDate).getHours()).slice(-2)
            var min = ("0" + new Date(this.startDate).getMinutes()).slice(-2)
            var startDate = new Date(this.startDate).getFullYear() + '-' + (new Date(this.startDate).getMonth() + 1) + '-' + new Date(this.startDate).getDate()
            console.log(min)
              var data = new FormData()
            if (this.infoTitle === ''){
              this.$notify.error({
                showClose: true,
                message: '제목을 입력해 주세요.',
                title: 'Error'
              });
            } else if (this.startDate === '') {
              this.$notify.error({
                showClose: true,
                message: '게시일과 날짜를 입력해 주세요.',
                title: 'Error'
              });
            }  else if (this.startDate < new Date()){
                  this.$notify.error({
                showClose: true,
                message: '시작 날짜가 현재 날짜보다 이전입니다.',
                title: 'Error'
              });
            }
            else if (this.content <= 0){
                  this.$notify.error({
                showClose: true,
                message: '내용을 입력해 주세요.',
                title: 'Error'
              });
            }
            else{
            var data = {title: this.infoTitle, contents: this.content, startYmd: startDate, startHour: hours, startMinute: min}
             this.$confirm('등록하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                this.loading = true
             inforegist(data)
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
                this.$router.push({ path: 'infolist' })
                        }
             })
            })
             .catch(() => {
                this.fullscreenLoading = false
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