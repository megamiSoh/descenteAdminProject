<template>
<div class="warmWrap" id="vList" v-loading="loading">
  <h1>신규등록</h1>
  <el-form>
  <div class="warm_con">
    <el-form :inline="true">
      <el-form-item label="테마 분류명">
        <el-input v-model="themeName" size="small"></el-input>
      </el-form-item>
    </el-form>
  <el-form :inline="true">
    <el-form-item label="키워드">
      <el-input v-model="themeKeyword" size="small"></el-input>
    </el-form-item>
  </el-form>
  </div>
  <div>
  <table class="el-table leftTitleTable">
  <tr>
    <th>리스트 메뉴 이미지</th>
    <td>
      <label>
            
            <span class='el-button fileBtn' style="font-size: 13px;">파일 선택
            </span>
            <input class="file-input" type="file" name="thumb" id="imageFile" accept="image/x-png,image/gif,image/jpeg" @change="change()" style="display: none;">
            <span>
              {{listRender}}
            </span>
            </label>
    </td>
  </tr>
  </table>
  
    
    </div>

    <div class="btnWrap">
        <el-button type="info" size="small" class="submitBtn" @click="themeRegist()">등록</el-button>
        <router-link v-bind:to="{path: 'themelist'}"><el-button type="warning" size="small" class="submitBtn">취소</el-button></router-link>
    </div>
    </el-form>
</div>
</template>

<script>
import { AddThemeKind } from '@/api/settings'
import axios from 'axios'
import { mapGetters } from 'vuex'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'

  export default {
    data() {
      return {
        themeName: '',
        themeKeyword: '',
        postFormData: '',
        listRender: '',
        loading: false,
        postFormData: new FormData(),
      } 
    },
   
    created() {
    
    },
     methods: {
       change() {
        //  data.append('menuImage', document.getElementById('imageFile').files[0])
         this.postFormData.append('menuImage', document.getElementById('imageFile').files[0])
         var a = document.getElementById('imageFile').value.substring(12)
        //  .substring(12)
         this.listRender = a
       },
         themeRegist(files) {
           if(this.themeName <= 0){
             this.$notify.error({
                    showClose: true,
                    message: '테마 분류명을 입력해 주세요.',
                    title: 'Error'
                })
           } else if(this.themeKeyword <= 0){
             this.$notify.error({
                    showClose: true,
                    message: '키워드를 입력해 주세요.',
                    title: 'Error'
                })
           } else if(this.listRender <= 0){
             this.$notify.error({
                    showClose: true,
                    message: '이미지를 등록해 주세요.',
                    title: 'Error'
                })
           } else {
            //  var data = new FormData();
             this.postFormData.append('name', this.themeName)
             this.postFormData.append('keyword', this.themeKeyword)
            
             var data = this.postFormData
             this.$confirm('등록하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                this.loading = true
             AddThemeKind(data)
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
                this.$router.push({ path: 'themelist' })
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
.el-upload__tip {float: right; margin-left: 30px; margin-top: 0;}
.el-upload-list {float: left;}
.el-form-item__content {float: left}
.el-form-item {
  float: left;
  margin: 0;
}
.warm_con {overflow:hidden; margin-bottom: 20px;}
.warm_con_last {    border-top: 1px dotted black;
    padding-top: 25px;}
.submitBtn {font-weight: bold; width: 100px; }
.btnWrap {text-align: center; margin: 50px 0;}
.deactiBtn {font-weight: bold; margin-left: 50px; font-size: 14px}
</style>