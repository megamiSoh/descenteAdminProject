<template>
<div class="warmWrap" id="vList">
  <h1>상세 정보 <el-button size="small" v-if="isAuth()" @click="active(results.isActive)">{{results.isActive ? '활성화' : '비활성화'}}</el-button> </h1>
  <el-form>
<div class="warm_con">
     <el-form :inline="true"  size="small">
        <el-form-item label="테마 분류명">
            <el-input v-model="results.name" disabled></el-input>
        </el-form-item>
    </el-form>
    <el-form :inline="true" size="small">
        <el-form-item label="키워드">
            <el-input v-model="results.keyword" disabled></el-input>
        </el-form-item>
    </el-form>
  </div>
  <div>
  <table class="leftTitleTable el-table">
    <tr>
        <th>리스트 메뉴 이미지</th>
        <td><el-dialog title="이미지 미리보기" :visible.sync="dialogShow">
            <img v-bind:src="files.logicalPath" style="width: 100%;">
        </el-dialog>

        <el-button @click="themeKind(); dialogShow = true" size="small" class="linkA"> 
            <div v-model="files">
                    {{ files.originName }}
            </div>
        </el-button></td>
    </tr>
  </table>
    
    </div>

    <div class="btnWrap">
    <router-link v-bind:to="{ path: 'settingremove' }" :style="{ cursor: 'pointer'}" v-if="isAuth()">
        <el-button type="info" size="small" class="submitBtn">수정</el-button>
    </router-link>
    <router-link :style="{ cursor: 'pointer'}" v-bind:to="{path: '/settings/themelist'}">
        <el-button type="warning" size="small" class="submitBtn">취소</el-button>
    </router-link>
    </div>
    </el-form>
</div>
</template>

<script>
import { themeDetail, themeActive } from '@/api/settings'
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
        activeResults: '',
        results: '',
        dialogShow: false,
      } 
    },
   
    created() {
        this.themeKind()
        this.isAuth()
    },
     methods: {
         isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 19
            }).filter(item => {
                return item.authDivision === 'CU'
            }).length
           if(x > 0) {
               
               return true
           } else {
               return false
           }
       },
         themeKind() {
              var id = localStorage.getItem('id');
              var data = {id: id}
             themeDetail(data)
              .then(response => {
                 this.results = response.themeKind
                 this.files = response.file
             })
         },
     
      active(isActive) {
          if(isActive === true) {
            var active = false
            this.$message({
                    message: '비활성화 처리 되었습니다.',
                    type: 'info'
                });
        } else {
            var active = true
            this.$message({
                    message: '활성화 처리 되었습니다.',
                    type: 'success'
                });
        }
          var id = localStorage.getItem('id');
         
          var data = {  themeKindId: id, isActive: active }
           themeActive(data)
           .then(response => {
               this.themeKind()
             })
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
.el-upload__tip {float: right; margin-left: 30px; margin-top: 0;}
.el-upload-list {float: left;}
.el-form-item__content {float: left}
.el-form-item {
  float: left;
  margin: 0;
}
.warm_con {overflow:hidden; margin-bottom: 20px;}
.warm_con_last { padding-top: 25px;}
.submitBtn {font-weight: bold; width: 100px; }
.btnWrap {text-align: center; margin: 50px 0;}
.deactiBtn {font-weight: bold; margin-left: 50px; font-size: 14px}
.originname {color: #0d52fb; text-decoration: underline;}
</style>
<style>
    .originname {color: #0d52fb; text-decoration: underline;}
</style>