<template>
<div class="warmWrap" id="vList">
  <h1>상세 정보
  </h1>
  <el-form>
<table class="el-table badgeStyle" style="margin-bottom: 20px;">
      <tr>
        <th>배너 제목</th>
        <td>
          <el-input size="small" style="width: 500px;" v-model="mainBanner.title" disabled></el-input>
        </td>
      </tr>
      <tr>
        <th>대 제목</th>
        <td>
        <el-input size="small" style="width: 500px;" v-model="mainBanner.bigTitle" disabled></el-input>
        </td>
      </tr>
      <tr>
        <th>소 제목</th>
        <td>
        <el-input size="small" style="width: 500px;" v-model="mainBanner.smallTitle" disabled></el-input>
        </td>
      </tr>
      <tr>
        <th rowspan="2">배너 노출 기간</th>
        <td>시작 날짜 
          <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="startDate" :disabled="true" size="small"></el-date-picker>

          <el-time-picker
            v-model="value1"
            format=HH:mm
            placeholder="Arbitrary time" 
            :disabled="true" size="small"
            >
        </el-time-picker>
        </td>
      </tr>
      <tr>
        <td>종료 날짜 
          <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="endDate" :disabled="true" size="small"></el-date-picker>

        <el-time-picker
            v-model="value2"
            format=HH:mm
            placeholder="Arbitrary time"
            :disabled="true" size="small"
            >
        </el-time-picker>
        </el-time-picker>
        </td>
      </tr>
      <tr>
        <th>광고배너 이미지</th>
        <td>
          <el-dialog
            title="이미지 미리보기"
            :visible.sync="showImg"
            >
            <img v-bind:src="file.logicalPath" v-model="file">
        </el-dialog>
    <el-button @click="showImg = true" size="small"  class="linkA"> 
        <div v-model="file" >
        {{ file.originName }}
    </div>
    </el-button>
        </td>
      </tr>
    </table>
    <div class="app backCk">
    <ckeditor 
      v-model="content" 
      :config="config" 
      @blur="onBlur($event)" 
      @focus="onFocus($event)"
      >
    </ckeditor>
  </div>

    <div class="btnWrap">
    <router-link v-bind:to="{ path: 'mainremove' }" v-if="isAuth()">
        <el-button type="info" size="small" class="submitBtn">수정</el-button>
    </router-link>
    <router-link  v-bind:to="{path: '/marketing/mainbanner'}">
        <el-button type="warning" size="small" class="submitBtn">취소</el-button>
    </router-link>
    </div>
    </el-form>
</div>
</template>
<script>
import { GetDetail } from '@/api/marketing'
import axios from 'axios'
import { mapGetters } from 'vuex'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import Ckeditor from 'vue-ckeditor2'


  export default {
    components: { Ckeditor },
    data() {
      return {
        showImg: false,
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
        bannerTitle: '',
        startDate: '',
        endDate: '',
        value1: '',
        value2: '',
        // content: '',
        mainBanner: '',
        file: ''
      } 
    },
   
    created() {
        this.mainDetail()
        this.isAuth()
    },
     methods: {
       isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 21
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
    
         mainDetail() {
            var id = localStorage.getItem('id')
             var data = {id: id}
             GetDetail(data)
             .then(response => {
                 this.config.readOnly = true;
                 this.mainBanner = response.mainBanner
                 this.file = response.file
                
                this.content = this.mainBanner.contents

                var startD = this.mainBanner.startDate
                startD = startD.replace(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$​/g,"")
                this.startDate = startD

                var endD = this.mainBanner.endDate
                endD = endD.replace(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$​/g,"")
                this.endDate = endD

                var startT = this.mainBanner.startDate
                startT = startT.replace(/^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/,"")
                this.value1 = startT

                var endT = this.mainBanner.endDate
                endT = endT.replace(/^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/,"")
                this.value2 = endT
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
</style>