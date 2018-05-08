<template>
<div class="warmWrap" id="vList">
  <h1>상세정보 <el-button size="small" v-if="detail.isActive === true" @click="getActive(false)">비활성화 처리</el-button></h1>
  <el-form >
  <div class="warm_con">
    <el-form :inline="true" size="small">
      <el-form-item label="공지사항 제목"></el-form-item>
      <el-form-item>
        <el-input v-model="infoTitle" disabled></el-input>
      </el-form-item>
    </el-form>
  
  <el-form :inline="true" size="small">
    <el-form-item label="게시일"></el-form-item>
    <el-form-item><el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="updateDate" disabled size="small"></el-date-picker></el-form-item>
    <el-form-item style="margin-left: 10px;"> 
      <el-time-picker
            v-model="updateDate"
            format=HH:mm
            placeholder="Arbitrary time" 
            disabled 
            size="small">
        </el-time-picker>
    </el-form-item>
  </el-form>
  </div>
    <div class="app">
    <ckeditor 
      v-model="content" 
      :config="config" 
      @blur="onBlur($event)" 
      @focus="onFocus($event)"
      class="backCk">
    </ckeditor>
  </div>

    <div class="btnWrap">
        <router-link v-bind:to="{path: 'infolist/inforemove'}" v-if="isAuth()"><el-button type="info" size="small" class="submitBtn">수정</el-button></router-link>
        <router-link v-bind:to="{path: 'infolist'}"><el-button type="warning" size="small" class="submitBtn">취소</el-button></router-link>
    </div>
    </el-form>
    
</div>

</template>

<script>
import { mapGetters } from 'vuex'
import { noticeDetail, EditIsAcive } from '@/api/settings'
import axios from 'axios'
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
        readOnly : true,
        removePlugins: 'dragdrop,basket',
            extraPlugins: 'uploadimage,uploadfile',
            removeButtons: 'Copy',
            filebrowserBrowserUrl: 'http://localhost:9528/api/upload',
            filebrowserUploadUrl: 'http://localhost:59670/api/upload'
      },
        infoTitle: '',
        startDate: '',
        endDate: '',
        value1: '',
        value2: '',
        bigTitle: '',
        smallTitle: '',
        detail: '',
        updateTime:'',
        updateDate: '',
       
      } 
    },
   
    created() {
    this.getDetail()
    this.isAuth()
    },
     methods: {
       isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 17
            }).filter(item => {
                return item.authDivision === 'CU'
            }).length
           if(x > 0) {
               
               return true
           } else {
               return false
           }
       },
       onBlur (editor) {
    },
       onFocus (editor) {
    },
  
    getDetail() {
        var id = localStorage.getItem('id')
        var data = {id: id}
        noticeDetail(data)
        .then(response => {
            this.detail = response
            this.infoTitle = this.detail.title
            this.content = this.detail.contents
            this.updateDate = new Date(this.detail.startDate)
        })
    },
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
      },
       getActive(active) {
          var data = {noticeId: this.detail.id, isActive: active}
          EditIsAcive(data)
            .then(response => {
                this.getDetail()
                this.$message({
                message: active ? '활성화 되었습니다.' : '비활성화 처리 되었습니다.',
                center: true
              });
            })
      },
      
    },
    computed: {
    ...mapGetters([
      'roles',
      
    ])
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
<style>
.cke_editable {background-color: red}
</style>