<template>
<div class="detail_Wrap memberL">
    <h1>
        <p>프로필</p>
        <p>관리자 코드: 0000{{ admin.id }}</p>
    </h1>
<el-form>
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
            <el-col :span="3" align="right"><div>연락처 :</div></el-col>
            <el-col :span="5">
                {{ admin.phoneNumber }}
            </el-col> 
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>성별 :</div></el-col>
            </el-col>
            <el-col :span="5"  class="gender_style">
              {{admin.isMale ? '남성': '여성'}}
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
     
    <!-- 상단 데이터 끝-->
  
<div class="admin_menu_wrap">
        <h1>- 메뉴 권한</h1>
        <adminAuth  v-bind:authArr="listAuth"></adminAuth> 
    
  </div>
</el-form>   
</div>   
</div>

  
</template>

<script>
import { mapGetters } from 'vuex'
import { getLoginInfo, getUsers, adminDetail, getMenu } from '@/api/admin'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import adminAuth from "../../components/tab/adminAuth"
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
export default {
    components: {
        adminAuth
    },
    data() {
      return {
        listAuth: [],
        search: {
          id: 0,
          userName: null,
          name: null,
          isMale: null,
          searchColumn: null,
          startDate: null,
          endDate: null
        },
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
        paging: {
          page: 1,
          pageSize: 20,
          totalPages: 0,
          totalRecodes: 0,
          orderBy: 'JoinDate',
          ascending: false,
        },
        user: null,
        getId: '',
        results: null,
        file: '',
        noimg: 'http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg',
        admin: '',
        file: '',
        menuAuth: '',
        result: null
      }
    },
    created() {
      this.getAdmin()
      this.getMenu()
    },
    methods: { 
         getMenu() {
        getMenu()
            .then(response => {
            this.result = response.result
            // this.rId = response.data.result.children
          }).catch(response => {
              this.fetchSuccess = false
          })
        },
    
        getAdmin(){
            getLoginInfo()
            .then(response => {
                this.admin = response.admin
                this.menuAuth = response.menuAuth
                this.file = response.file
                var auth = [].concat.apply([],this.menuAuth)
                this.listAuth = this.menuAuth
            })
            .catch(response => {
                this.fetchSuccess = false
            })
        },
        
    },
    
    computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'

    ])
  }
}
  
</script>

<style scoped>
h1 p:last-child {font-size: 12px; font-weight: normal;}
.el-input.is-disabled .el-input__inner {border: 0; background-color: #fff;}
h1 .temp-pass {display: inline-block;}
h1 span {font-size: 12px; font-weight: normal; margin: 10px; display: block;}
.memimg_wrap {display:inline-block; margin: 0 25px; position:relative; top: -95px;}
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
 .el-table-column th, .el-table-column td {text-align: center;}
 .el-select {width: 150px;}
 .el-input {width: 300px; margin-left: 10px; margin-bottom: 20px;}
 .gender_style  span {padding-left: 4px; display: block;}
   .el-table {text-align: center;}
    .el-table th {text-align: center; width: 155px;}
    .el-table td {width: 300px;}
    
    .registmenu ul {padding: 0;}
    .registmenu ul li {text-decoration: none; list-style: none;}
     tbody.el-table-column.listTable td {
    border-top: 0;
    border-left: 0;
}
</style>