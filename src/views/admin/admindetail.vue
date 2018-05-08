<template>
<div class="detail_Wrap" v-loading = "loading">
<el-form :model="admin" @submit.prevevnt="getUsers">
    <el-form-item>
        <h1>
           관리자 상세화면
            <p>  <el-button type="danger" @click="open3" v-if="isAuth()" size="small">관리자 삭제</el-button></p>
            <div class="codeCount">관리자 코드: 0000{{admin.id}}</div>
        </h1>
    </el-form-item>
    <el-form class="admintopWrap">
        <el-form-item class="memimg_wrap">
    <img class="memimg" v-bind:src="file.logicalPath"  v-model="file" v-if="file!=null">
    <img class="memimg" v-bind:src="noimg" v-else>
    </el-form-item>
    <el-form-item class="meminfo">
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>아이디 :</div></el-col>
            <el-col :span="5" value="id">
            {{ admin.userName}}
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>이름 :</div></el-col>
            <el-col :span="5">
                {{ admin.name }}
            </el-col> 
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>성별 :</div></el-col>
            <el-col :span="5" class="gender_style">
              <span v-if="admin.isMale">남성</span>
              <span v-else>여성</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>생년월일 :</div></el-col>
            <el-col :span="5">
                {{ admin.birthDateString }}
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>이메일 :</div></el-col>
            <el-col :span="5">
                {{ admin.email }}
            </el-col>
        </el-row>
        </el-form-item>
    </el-form>
   
     
<div class="admin_menu_wrap">
        <p class="adminP">메뉴 권한</p>
        <adminAuth v-bind:authArr="listAuth"></adminAuth>
       
    <div class="btnWrap">
    <router-link v-if="isAuth()"  :style="{ cursor: 'pointer'}" v-bind:to="{path: '/admindetail/adminremove'}">
        <el-button type="info" size="small" class="submitBtn">수정</el-button>
    </router-link>
    <router-link  :style="{ cursor: 'pointer'}" v-bind:to="{path: 'adminlist'}">
    <el-button type="warning" size="small" class="submitBtn">취소</el-button>
    </router-link>
    </div>
  </div>
</el-form>   
</div>

  
</template>

<script>
import { mapGetters } from 'vuex'
import { getMenu, adminDetail, removeAdmin } from '@/api/admin'
import axios from 'axios'
import formurlencoded from 'form-urlencoded'
import adminAuth from "../../components/tab/adminAuth"
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
export default {
    components: {
        adminAuth
    },
    data() {
      return {
          listAuth: [],
        results: null,
        activeName: 'first',
        input2: '',
        dialogTableVisible: false,
        admin: {
          id: '',
          userName: '',
          name: '',
          phoneNumber: null,
          email: '',
          adminDateString: null,
          adminDate: '',
          deleteUserName: null,
          deleteReason: null,
          deleteDateString: null,
          deleteDate: null,
          birthDateString: '',
          birthDate: ''
    },
        file: {},
        deleteReason: '',
        searchadmin: false,
        selected: 'a',
        result: null,
        auth: [],
        menuAuth: {
          menuId: '',
          authDivision: ''
        },
        loading: false,
        results: null,
        noimg:'http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg',
      };
    },
    created() {
      this.getUsers()
    //   this.getMenu()
      this.isAuth()
    },
    methods: {
        isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 4
            }).filter(item => {
                return item.authDivision === 'UD'
            }).length
           if(x > 0) {
               
               return true
           } else {
               return false
           }
       },
        show() {
            if(this.menuAuth.length===0) {
                return true;
            }else {
                return false;
            }
        },

      handleClick(tab, event) {
        // console.log(tab, event);
      },
       handleIconClick(ev) {
        // console.log(ev);
        },
    
        goRemove() {
        localStorage.setItem('id', this.admin.id);
        },
        getUsers() {
        this.loading = true
        this.dialogTableVisible = false
        let val = localStorage.getItem('id')
        var data = {id: val}
        adminDetail(data)
            .then(response => {
                this.loading = false
                this.admin = response.admin
                this.menuAuth = response.menuAuth
                this.file = response.file
                var auth = [].concat.apply([],this.menuAuth)
                this.listAuth = this.menuAuth
            }).catch(response => {
                this.fetchSuccess = false
            })
        },
        open3() {
        this.$prompt('삭제 이유',' 관리자권한을 삭제 하시겠습니까?', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
        }).then(value => {
            let val = localStorage.getItem('id')
            var data = {adminId: val, deleteReason: value.value}
            removeAdmin(data)
                .then(response => {
                  this.$message({
                  type: 'success',
                  message: '관리자 권한이 삭제되었습니다.',
                });
              })
              }).catch(response => {
                  this.$message({
            type: 'info',
            message: '취소되었습니다.'
          });       
        });
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
h1 {
    font-size: 1.7em;
}
h1 p {display: inline-block;}
h1 p:nth-child(2) {margin-left:200px;;}
.el-input.is-disabled .el-input__inner {border: 0; background-color: #fff;}
h1 .temp-pass {display: inline-block;}
h1 span {font-size: 12px; font-weight: normal; margin: 10px; display: block;}
.memimg {width: 100px; height: 100px; border-radius: 50px; }
.meminfo {width: 80%; display: inline-block;}
.detail_Wrap{width: 1100px;
    margin: 0 40px 100px 85px;}
 .el-row {
    margin-bottom: 10px;
       
    }
  .el-row:last-child {margin-bottom: 0; line-height: 17px;}
  .el-col {
    border-radius: 4px;
    font-weight: bold;
    font-size: 15px;
    text-align: left;
    margin-left: 30px;
    line-height: 28px
  }
  .el-col:nth-child(2), .el-col:nth-child(4) {
            font-size: 13px; font-weight: normal; line-height: 28px;
        }
  
 .data_hight {line-height: 36px;}
 .el-button {font-size: 13px; font-weight: bold;}
 .el-table-column th, .el-table-column td {text-align: center;}
 .el-select {width: 150px;}
 .el-input {width: 300px; margin-left: 10px; margin-bottom: 20px;}
 .gender_style  span {padding-left: 4px; display: block;}
 .codeCount {font-size: 12px; font-weight: normal;}
 .select_dia option {padding: 7px 0;}
 .admin_menu_wrap h1 {font-size: 20px; border-top: 1px solid black; padding-top: 48px; text-indent: 45px; }
    .el-table {text-align: center;}
    .el-table th {text-align: center; width: 155px;}
    .el-table td {width: 300px;}
    .registmenu ul {padding: 0;}
    .registmenu ul li {text-decoration: none; list-style: none;}
    .el-table td, .el-table th.is-leaf {border-bottom: 0;}
    .btnWrap {text-align: center; margin-top: 50px;}
     .admin_menu_wrap h1 {font-size: 20px; border-top: 1px solid black; padding-top: 48px; text-indent: 45px; }
   tbody.el-table-column.listTable td {
    border-top: 0;
    border-left: 0;
}
</style>