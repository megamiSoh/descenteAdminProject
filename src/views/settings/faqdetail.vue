<template>
<div class="warmWrap" id="vList">
  <h1>상세정보 <el-button size="small" v-if="isAuth()" @click="getActive(detail.isActive)">{{detail.isActive ? '활성화' : '비활성화'}}</el-button></h1>
  <el-form>
  <div class="warm_con">
    <el-form :inline="true" size="small">
      <el-form-item label="분류">
        <el-input  v-for="item in selects" v-if="selectsIn===item.key" :key="item.key" v-model="item.name" disabled></el-input>
      </el-form-item>
    </el-form>
  <el-form :inline="true" size="small" >
    <el-form-item label="FAQ 제목">
      <el-input v-model="faqTitle" disasbled disabled></el-input>
    </el-form-item>
  </el-form>
  </div>
  <!--<div class="warm_con">
    <h2>상태</h2>
    <el-form-item>
      <el-col>
      {{detail.isActive ? '활성화' : '비활성화'}}
      </el-col>
    </el-form-item>
  </div>-->
    <div class="disabled_editor backCk">
    <ckeditor 
      v-model="content" 
      :config="config" 
      @blur="onBlur($event)" 
      @focus="onFocus($event)">
    </ckeditor>
  </div>

    <div class="btnWrap">
        <router-link v-bind:to="{path: 'faqremove'}" v-if="isAuth()"><el-button type="info" size="small" class="submitBtn">수정</el-button></router-link>
        <router-link v-bind:to="{path: '/settings/faqlist'}"><el-button type="warning" size="small" class="submitBtn">취소</el-button></router-link>
    </div>
    </el-form>
    
</div>

</template>

<script>
import { GetDetail, GetFaqDivision, faqActive } from '@/api/settings'
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
        readOnly : true,
        removePlugins: 'dragdrop,basket',
            extraPlugins: 'uploadimage,uploadfile',
            removeButtons: 'Copy',
            filebrowserBrowserUrl: 'http://localhost:9528/api/upload',
            filebrowserUploadUrl: 'http://localhost:59670/api/upload'
      },
       selects: '',
       selectsIn: '',
       faqTitle:'',
       detail: ''
      } 
    },
   
    created() {
    this.getSelects()
    this.getDetail()
    this.isAuth()
    },
     methods: {
       isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 18
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
      // console.log(editor)
    },
       onFocus (editor) {
      // console.log(editor)
    },
    getDetail() {
        var id = localStorage.getItem('id')
        var data={id: id}
        GetDetail(data)
        .then(response => {
            this.detail = response
            this.selectsIn = this.detail.faqDivision
            this.faqTitle = this.detail.title
            this.content = this.detail.contents
        })
    },
    getActive(active){
        var id = this.detail.id;
        if(active === true) {
            var isActive = false
             this.$message({
                    message: '비활성화 처리 되었습니다.',
                    type: 'info'
                });
        } else {
            var isActive = true
            this.$message({
                    message: '활성화 처리 되었습니다.',
                    type: 'success'
                });
        }
        var data = {faqId : id, isActive: isActive}
       faqActive(data)
        .then(response => {
            this.getDetail()
            
        })
      },
    getSelects(){
          GetFaqDivision()
          .then(response => {
              this.selects = response
              
          })
      },
      
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
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
.cke_contents {background-color: blue !important;}
</style>