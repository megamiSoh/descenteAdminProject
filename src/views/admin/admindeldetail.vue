<template>
<div class="detail_Wrap">
<el-form  @submit.prevevnt="getUsers">
    <el-form-item>
        <h1>관리자 삭제 상세정보
            <p>  <el-button type="danger" @click="open3" v-if=
            "isAuth()">관리자 복구</el-button></p>
        </h1>
    </el-form-item>
    <el-form-item class="memimg_wrap">
    <img class="memimg" v-bind:src="file.logicalPath"  v-model="file" v-if="file!=null">
    <img class="memimg" v-bind:src="noimg" v-else>
    </el-form-item>
    <el-form-item class="meminfo">
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>아이디 :</div></el-col>
            <el-col :span="5" >
            {{admin.userName}}
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>이름 :</div></el-col>
            <el-col :span="5">
                {{admin.name }}
            </el-col> 
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>성별 :</div></el-col>
            </el-col>
            <el-col :span="5"  class="gender_style">
             {{admin.isMale? '남성': '여성'}}
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>생년월일 :</div></el-col>
            <el-col :span="5">
                {{admin.birthDateString }}
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>이메일 :</div></el-col>
            <el-col :span="5">
                {{admin.email }}
            </el-col>
        </el-row>
        </el-form-item>

        <el-form-item class="meminfo1">
            <el-row :gutter="20">
                <el-col :span="3" align="right"><div>삭제일 :</div></el-col>
                <el-col :span="5" value="id">
                {{admin.deleteDateString }}
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" align="right"><div>삭제자 :</div></el-col>
                <el-col :span="5">
                   {{admin.deleteUserName }}
                </el-col> 
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3" align="right"><div>삭제사유 :</div></el-col>
                <el-col :span="5">
                {{admin.deleteReason}}
                </el-col>
            </el-row>
        </el-form-item>
    
     
    <!-- 상단 데이터 끝-->
 <div class="admin_menu_wrap">
        <h1 class="adminP">메뉴 권한</h1>
        <adminAuth v-bind:authArr="listAuth"></adminAuth>
      
    <div class="btnWrap">
    <router-link v-bind:to="{path: '/admin/admindel'}">
        <el-button type="warning" size="small" class="submitBtn">취소</el-button>
    </router-link>
    </div>
  </div>
</el-form>  

</div>

  
</template>

<script>
import { mapGetters } from 'vuex'
import { quitDetail, getMenu, adminDetail, RestoreAdminRole } from '@/api/admin'
import adminAuth from "../../components/tab/adminAuth"
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'

export default {
    components: {
        adminAuth
    },
    data() {
      return {
        activeName: 'first',
        input2: '',
       admin: '',
        searchadmin: false,
        selected: 'a',
        result: null,
        auth: [],
        listAuth: [],
        file: {},
         results: null,
         noimg: 'http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg'
      };
    },
    created() {
      this.getUsers()
      this.isAuth()
    },
    methods: {
        isAuth(){
            var x = this.roles.filter(item => {
                return item.menuId === 5
            }).filter(item => {
                return item.authDivision === 'MR'
            }).length
           if(x > 0) {
               return true
           } else {
               return false
           }
        },
        getUsers() {
        this.listLoading = true
        let val = localStorage.getItem('id')
        var data = {id: val}
        quitDetail(data)
            .then(response => {
              this.admin = response.admin
              this.file = response.file
              this.listLoading = false
               this.menuAuth = response.menuAuth
            var auth = [].concat.apply([],this.menuAuth)
            this.listAuth = this.menuAuth
          }).catch(response => {
              this.fetchSuccess = false
          })
        },
       
        
         open3() {
        this.$confirm('관리자를 복구하시겠습니까?', '관리자 복구', {
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          type: 'warning'
        }).then(() => {
        let val = localStorage.getItem('id')
        var data = {adminId : val}
        RestoreAdminRole(data)
        .then(response => {
                 this.loading = false
                 if(response !== undefined) {
                    this.$message({
                        message: '복구가 완료 되었습니다.',
                        type: 'success'});
                        this.$router.push({path: '/admin/admindel'})
                }
             })
              })
             .catch(() => {
                this.loading = false
                this.$message.info('취소 되었습니다.'); 
                });
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
h1 {
    font-size: 1.7em;
}
h1 p {display: inline-block;}
h1 p:nth-child(2) {margin-left:200px;;}
.el-input.is-disabled .el-input__inner {border: 0; background-color: #fff;}
h1 .temp-pass {display: inline-block;}
h1 span {font-size: 12px; font-weight: normal; margin: 10px; display: block;}
.memimg_wrap {display:inline-block; margin: 0 25px; position:relative; top: -95px;}
.memimg {width: 100px; height: 100px; border-radius: 50px; }
.meminfo {width: 35%; display: inline-block; height: 220px;}
.meminfo1 {width: 40%; display: inline-block; height: 220px;}
.detail_Wrap{width: 1100px;
    margin: 0 40px 100px 85px; overflow: hidden;}
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
    line-height: 28px;
    width: 100px;
    padding-left: 0;
  }
  .el-col:nth-child(2), .el-col:nth-child(4) {
            font-size: 13px; font-weight: normal; line-height: 28px; width: 200px;
        }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
 .data_hight {line-height: 36px;}
 .el-button {font-size: 13px; font-weight: bold;}
 .el-select {width: 150px;}
 .el-input {width: 300px; margin-left: 10px; margin-bottom: 20px;}
 .gender_style  span {padding-left: 4px; display: block;}
 .codeCount {font-size: 12px; font-weight: normal;}
 .select_dia option {padding: 7px 0;}
 .admin_menu_wrap h1 {font-size: 20px; border-top: 1px solid black; padding-top: 48px; text-indent: 45px; }
   tbody.el-table-column.listTable td {
    border-top: 0;
    border-left: 0;
}

.el-table {text-align: center;}
    .el-table th {text-align: center; width: 155px;}
    .el-table td {width: 300px;}
    .registmenu ul {padding: 0;}
    .registmenu ul li {text-decoration: none; list-style: none;}
    .el-table td, .el-table th.is-leaf {border-bottom: 0;}
</style>