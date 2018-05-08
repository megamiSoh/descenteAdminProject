<template>
<div class="warmWrap" id="vList" v-loading="loading">
  <h1>신규등록</h1>
  <el-form>
  <div class="warm_con">
  <el-form :inline="true">
    <el-form-item label="분류">
      <el-select v-model="selectsIn" size="small">
            <el-option v-for="item in selects" :key="item.key" :value="item.key"  :label="item.name"></el-option>
        </el-select>
    </el-form-item>
  </el-form>
  
    <el-form :inline="true">
      <el-form-item label="FAQ 제목">
        <el-input v-model="faqTitle" :maxlength="30" size="small"></el-input>
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
        <router-link v-bind:to="{path: 'faqlist'}"><el-button type="warning" size="small" class="submitBtn">취소</el-button></router-link>
    </div>
    </el-form>
    
</div>

</template>

<script>
import { GetFaqDivision, AddFaq } from '@/api/settings'
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
       selects: '',
       selectsIn: '',
       faqTitle:'',
       loading: false,
      } 
    },
   
    created() {
    this.getSelects()
    },
     methods: {
       onBlur (editor) {
      console.log(editor)
    },
       onFocus (editor) {
      console.log(editor)
    },
    getSelects(){
         GetFaqDivision()
          .then(response => {
              this.selects = response
              this.selectsIn = this.selects[0].key
          })
      },
         themeRegist() {
            
            if (this.faqTitle === ''){
               this.$notify.error({
                showClose: true,
                message: '제목을 입력해 주세요.',
                title: 'error'
              });
            } else if (this.content <= 0){
               this.$notify.error({
                showClose: true,
                message: '내용을 입력해 주세요.',
                title: 'error'
              });
            } 
            else{

            
            
            var data = {title: this.faqTitle, contents: this.content, faqDivision: this.selectsIn}
            this.$confirm('등록하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                this.loading = true
             AddFaq(data)
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
                this.$router.push({ path: 'faqlist' })
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