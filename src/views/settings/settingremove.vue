<template>
<div class="warmWrap" id="vList">
  <h1>수정</h1>
  <el-form>
  <div class="warm_con" >
  <el-form :inline="true" size="small">
    <el-form-item label="테마 분류명"><el-input v-model="themeName" size="small"></el-input></el-form-item>
  </el-form>
  <el-form :inline="true" size="small">
    <el-form-item label="키워드"> <el-input v-model="themeKeyword" size="small"></el-input></el-form-item>
  </el-form>
  <el-form  :inline="true" size="small">
    <el-form-item label="상태">
      {{results.isActive === true? "비활성화":"활성화"}}
    </el-form-item>
  </el-form>
  </div>

  <div >
  <table class="leftTitleTable el-table">
    <tr>
      <th>리스트 메뉴 이미지</th>
      <td><div v-model="files">
        <el-dialog title="이미지 미리보기" :visible.sync="dialogShow">
          <img :src="files.logicalPath" style="width: 100%;"/>
        </el-dialog>
        <label>
        <span class="el-button fileBtn" style="font-size: 13px;"> 파일 선택</span>
        <input class="file-input" type="file" name="resume" id="imageFile" accept="image/x-png,image/gif,image/jpeg" @change="fileChoice()" style="display: none;">
        {{fileName}}
        </label>
          
        <el-button size="small" @click="dialogShow=true" class="linkA" style="margin-right: 10px;"> {{ files.originName }}</el-button>
        </div></td>
    </tr>
  </table>
    </div>

    <div class="btnWrap">
        <el-button type="info" size="small" class="submitBtn" @click="themeRegist">저장</el-button>
        <router-link v-bind:to="{path: '/settings/settingdetail'}">
        <el-button type="warning" size="small" class="submitBtn">취소</el-button>
        </router-link>
    </div>
    </el-form>
</div>
</template>

<script>
import { themeDetail,themeRegist } from '@/api/settings'
import axios from 'axios'
import { mapGetters } from 'vuex'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'

  export default {
    data() {
      return {
        themeName: '',
        themeKeyword: '',
        results: '',
        files: '',
        dialogShow: false,
        postFormData: new FormData(),
        fileName: '',
      } 
    },
   
    created() {
      this.themeDetail()
    },
     methods: {
       fileChoice(){
        this.postFormData.append('menuImage', document.getElementById('imageFile').files[0])
        this.fileName = document.getElementById('imageFile').value.substring(12)
       },
         themeDetail() {
             var id = localStorage.getItem('id');
             var data = {id: id}
             themeDetail(data)
             .then(response => {
                 this.results = response.themeKind
                 this.files = response.file
                 this.themeName = this.results.name
                 this.themeKeyword = this.results.keyword
             })
         },
         themeRegist() {
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
           var id = localStorage.getItem('id');
             
             this.postFormData.append('name', this.themeName)
             this.postFormData.append('keyword', this.themeKeyword)
             
             this.postFormData.append('isActive', this.results.isActive)
             this.postFormData.append('themeKindId', id)
             var data = this.postFormData
             this.$confirm('등록하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                this.loading = true
             themeRegist(data)
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
                this.$router.push({ path: 'settingdetail' })
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
.submitBtn {font-weight: bold; width: 100px; }
.btnWrap {text-align: center; margin: 50px 0;}
.deactiBtn {font-weight: bold; margin-left: 50px; font-size: 14px}
</style>