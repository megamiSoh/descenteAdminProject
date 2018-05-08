<template>
<div class="detail_Wrap"  v-loading.fullscreen.lock="fullscreenLoading" >
    <h1>관리자 등록</h1>
<el-form :model="user" @submit.prevent="submitAll"  class="admintopWrap">
    <el-form-item class="memimg_wrap">
    <img class="memimg" v-bind:src="file.logicalPath"  v-model="file" v-if="file!=null">
    <img class="memimg" v-bind:src="noimg" v-else>
    </el-form-item>
    <el-form-item class="meminfo">
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>아이디 :</div></el-col>
            <el-col :span="5" value="id">
            {{ user.userName}}
            </el-col>
            <el-col :span="8">
                <div><el-button type="info" size="small" @click="dialogTableVisible=true">아이디 검색</el-button></div>
            </el-col>
           
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>이름 :</div></el-col>
            <el-col :span="5">
                {{ user.name }}
            </el-col> 
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>성별 :</div></el-col>
            <el-col :span="5" v-if="user.isMale==null">
            </el-col>
            <el-col :span="5" v-else  class="gender_style">
              <span v-if="user.isMale">남성</span>
              <span v-else>여성</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>생년월일 :</div></el-col>
            <el-col :span="5">
                {{ user.birthDateString }}
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>이메일 :</div></el-col>
            <el-col :span="5">
                {{ user.email }}
            </el-col>
        </el-row>
        </el-form-item>
   
     <el-dialog title="아이디 검색" :visible.sync="dialogTableVisible" >
            <div>
              <el-select v-model="selected" @click="resetBtn()" class="select_dia">
                <el-option v-for="item in options" :label="item.label" :key="item.value" :value="item.value"></el-option>
              </el-select>
                <el-input v-model="search.userName" v-if="selected === 'id'" placeholder="아이디를 입력해주세요."></el-input>
                <el-input v-model="search.name" v-else placeholder="이름을 입력해주세요."></el-input>
            <el-button type="info" icon="el-icon-search" size="small" @click="submitForm()">Search</el-button>
            </div>
            <table class="el-table" stripe :data="results" :model="results">
            <thead class="el-table-column listTableHead">
                <tr>
                    <th width="130">아이디</th>
                    <th width="130">이름</th>
                    <th>연락처</th>
                    <th width="70">성별</th>
                    <th width="100">비고</th>
                </tr>
            </thead>
            <tbody class="el-table-column listTable">
                <tr v-for="entry in results" :key="results.id">
                    <td>{{entry.userName}}</td>
                    <td>{{entry.name}}</td>
                    <td>{{entry.phoneNum}} </td>
                    <td>{{entry.isMale? '남성' : '여성'}}</td>
                    <td><el-button type="info" size="mini" @click="getUsers(entry.id)">선택</el-button></td>
                </tr>
                <tr v-if="results === null">
                    <td colspan="5">아이디 / 이름을 검색해 주세요.</td>
                </tr>
        </tbody>
    </table>
          </el-dialog>
    <!-- 상단 데이터 끝-->
     <div class="admin_menu_wrap">
        <p class="adminP">메뉴 권한</p>
        <table class="el-table">
            <thead class="el-table-column  listTableHead" >
                <tr>
                    <th>1Depth</th>
                    <th>2Depth</th>
                    <th>메뉴 노출 및 <br>상세페이지 보기 권한</th>
                    <th colspan="2">기타권한</th>
                </tr>
            </thead>
            <tbody v-for="list in result" class="el-table-column listTable">
                <td style="background-color: #fafafa; font-weight: bold; color: #000;">
                    {{list.name}}
                </td>
                <td colspan="2">
               
                    <table>
                        <tr v-for="children in list.children" :key="children.id">
                            <td >{{children.name}}
                            </td>
                            <td v-for="auth in list.auth" :key="auth.codeKey" >
                            <label>
                                    <input type="checkbox"  :value="{
                                        menuId: children.id,
                                        authDivision: auth.codeKey,
                                    }" v-model="listAuth" @change="changeTitleChecked(children.parentId, $event, auth.codeKey, list.sort, children.id)" :disabled = 'disabled'>  
                            </label>
                            </td>
                        </tr>
                    </table>
                
                </td>
                <td colspan="2">
                    <table v-for="children in list.children" >
                        <tr v-for="auth in children.auth"   v-if="auth.codeKey != 'DR'">
                            <td>{{auth.codeNm}} </td>
                            <td>
                            <label>
                            <input type="checkbox" :value="{menuId:children.id, authDivision: auth.codeKey}" v-model="listAuth"  :id="children.id" :disabled= 'true'> 
                            </label>
                            </td>
                        </tr>
                    </table>
                </td> 
            </tbody>
        </table>  
        <div class="btnWrap" >
        <el-button v-show="btnShow" type="info" size="small" class="submitBtn" @click="submitAll()">등록</el-button>
        <router-link v-bind:to="{path: 'adminlist'}">
    <el-button type="warning" size="small" class="submitBtn">취소</el-button>
    </router-link>
    </div>
    </div>
 
 </el-form>  
</div>

  
</template>

<script>
import NProgress from 'nprogress'
import { mapGetters } from 'vuex'
import { getMenu,onlyUser,getUsers, addAdmin, getLoginInfo } from '@/api/admin'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
export default {
    data() {
      return {
        search: { 
          userName: null,
          name: null
        },
        paging: {
          page: 1,
          pageSize: 20,
          totalPages: 0,
          totalRecodes: 0,
          orderBy: 'id',
          asnding: false
        },
        // submitForm: true,
        results: null,
        activeName: 'first',
        input2: '',
        dialogTableVisible: false,
         options: [{
          id: '',
        name: ''
        }],
        ops: [{
          id: '',
        name: '',
        value: ''
        }],
        user: {
            id: '',
            userName: '',
            name: '',
            email: '',
            isMale: null,
            phoneNum: null,
            isAppNotice: false,
            isMarkNotice: false,
            recentlyDateString: '',
            recentlyDate: '',
            joinDateString: '',
            joinDate: '',
            birthDateString: '',
            birthDate: ''
        },
        file: {},
        noimg: 'http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg',
        searchadmin: false,
        selected: 'id',
        result: null,
        auth: [],
        menuAuth: [{
           
        }],
        fullscreenLoading: false,
        listAuth: [],
        btnShow: false,
        getId: '',
        noData: true,
        disabled: true,
        name1: '',
        childDisabled: 'true',
        checkedData: false,
        data11: [],
        options: [{
          value: 'id',
          label: '아이디'
        }, {
          value: 'name',
          label: '이름'
        }]
      }
    },
     created() {
      this.getMenu()
      this.submitForm()
      this.getAdmin()
    },
    methods: {
        changeTitleChecked(data,event, key, sort, child) {
          this.data11 = []
            if(event.target.checked === true) {
            document.getElementById(child).disabled = false
           
            } else {
               document.getElementById(child).disabled = true
            }
           var sortVal = sort - 1 
        
         
                
            if (event.target.checked === true) {

                if(this.listAuth.filter(item => {
                    return item.menuId === data
                }).length === 0) {
                     this.listAuth.push({
                    menuId: data,
                    authDivision: key
                })
                }
                
            }else {
                document.getElementById(child).disabled = true
                var filterKey = this.listAuth.filter(item => {
                    return item.menuId === child
                }).filter(item => {
                    return item.authDivision !== 'DR'
                })
                if(key === "DR" && filterKey.length > 0) {
                    var filteredObj = this.listAuth.findIndex(function(item, i){
                    return item.menuId === child
                    });
                  
                    this.listAuth.splice(filteredObj, 1)
                }
                var sortVal = sort -1
              var parentFilter = this.listAuth.findIndex(item => {
                  return item.menuId === data
              })
           
            var itemList = this.result[sortVal].children.filter(item => {
                                return item.parentId === data
                            })
        
            var xarray = []
           
             for(var k in itemList) {
               
               xarray.push(this.listAuth.filter(item => {
                            return item.menuId === itemList[k].id
                 })[0])
                 
                 }
                 
                if(xarray.filter(item => {
                        return item === undefined
                    }).length === itemList.length ) {
                         this.listAuth.splice(parentFilter, 1)
                    }
            }
        },
        goAdminList() {
          location.href="/admin/adminlist"
        },
      getMenu() {
            getMenu()
            .then(response => {
            this.result = response.result
          }).catch(response => {
              this.fetchSuccess = false
          })
        },
      handleClick(tab, event) {
        console.log(tab, event);
      },
       handleIconClick(ev) {
        console.log(ev);
        },
       submitForm() {
        this.listLoading = true
        var data = {search:this.search}
        onlyUser(data)
            .then(response => {
                this.results = response.results
              this.listLoading = false
          }).catch(response => {
              this.fetchSuccess = false
              console.log(response)
          })
        },
        getUsers(id) {
        localStorage.setItem('id', id);
        let val = localStorage.getItem('id')
        var data = {id: val}
       getUsers(data)
            .then(response => {
              this.user = response.user
              this.file = response.file
              this.noData = false
              this.dialogTableVisible = false
              this.disabled = false
              this.btnShow = true
          }).catch(response => {
              this.fetchSuccess = false
          })
        },
        getAdmin(){
            getLoginInfo()
            .then(response => {
                this.getId = response.admin.id
            })
        },
        submitAll() {
        console.log()
        if(this.listAuth.length <= 0){
             this.$notify.error({
                title: 'Error',
                message: '관리자권한을 선택해 주세요.'
            });
        } else {
        this.fullscreenLoading = true
        let val = localStorage.getItem('id')
        var listAuth = [].concat.apply([],this.listAuth)
        var data = {userId : val, menuAuth: listAuth}
        this.$confirm(this.user.name + '회원님을 관리자로 등록하시겠습니까?', '관리자 등록', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'Success'
        }).then(() => {
            addAdmin(data)
            .then(response => {
                this.fullscreenLoading = false
            if(response === undefined){
                this.$message.error('관리자를 등록할 수 없습니다.');
            } else {
                this.$message({
                message: '관리자 등록이 완료 되었습니다..',
                type: 'success'
            });
            this.$router.push({path: 'adminlist'})
            }
          })
        })
        .catch(() => {
            this.fullscreenLoading = false
         this.$message.info('취소 되었습니다.'); 
        });
          }
        },
        resetBtn() {
          this.search = {
            id: 0,
            userName: null,
            name: null,
            isMale: null,
            searchColumn: null,
            startDate: null,
            endDate: null
            }
        }
    
    },
    
    computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'roles'
    ])
  }
}
  
</script>

<style scoped>
tbody.el-table-column.listTable td {
    border-top: 0;
    border-left: 0;
    height: 50px; padding: 0;}
    tbody.el-table-column.listTable td label {
        padding: 12px; display: inline-block; width: 100%;
    }
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
    .el-table td, .el-table th.is-leaf {border-bottom :0;}
    .btnWrap {text-align: center; margin-top: 50px;}
</style>