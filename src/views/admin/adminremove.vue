<template>
<div class="detail_Wrap" v-loading = "loading">
<el-form :model="admin" v-loading="loading">
    <el-form-item>
        <h1>
            관리자 수정
            
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
              <span>{{admin.isMale? '남성': '여성'}}</span>
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
        <p class="adminP">메뉴 권한</p>
        

        <table class="el-table" :data="result">
            <thead class="el-table-column listTableHead" >
                <tr>
                    <th>1Depth</th>
                    <th>2Depth</th>
                    <th>메뉴 노출 및 <br>상세페이지 보기 권한</th>
                    <th colspan="2">기타권한</th>
                </tr>
            </thead>
            <tbody v-for="list in result" :key="list.id" class="el-table-column listTable">
                <th  style="background-color: #fafafa; font-weight: bold; color: #000;">
                    {{list.name}}
                </th>
                <td>
                    <div v-for="children in list.children">
                        <span :key="children.id">{{children.name}}{{children.id}}
                        </span>  
                    </div>
                </td>
                <td>
                <div v-for="children in list.children" :key="children.id">
                    <span v-for="auth in list.auth" :key="auth.codeKey">
                        <span v-if=""></span>
                        <input type="checkbox"  :value="{
                            menuId: children.id,
                            authDivision: auth.codeKey,
                        }" v-model="listAuth" @change="changeTitleChecked(children.parentId, $event, auth.codeKey, list.sort, children.id); childDisEvent($event, children.id)" >  
                    </span>
                </div>
                        
                </td>
                <td>
                    <div v-for="children in list.children" :key="children.id">
                        <span v-for="auth in children.auth" :key="auth.codeKey"  v-if="auth.codeKey != 'DR'">
                            {{auth.codeNm}}
                            
                        </span>
                        </div>
                </td> 
                   
                <td>
                  
                    <div  v-for="children in list.children" :key="children.id">
                        <span  v-for="auth in children.auth" :key="auth.codeKey"  v-if="auth.codeKey != 'DR'">
                        
                            <input type="checkbox" :value="{menuId:children.id, authDivision: auth.codeKey}" v-model="listAuth" @change="changeTitleChecked(children.parentId, $event, auth.codeKey, list.sort, children.id); " :id="children.id"  :disabled ="children.disabled" ref="children.id"  >
                      </span >       
                    </div>
                    
                </td> 
            </tbody>
        </table>  
    <div class="btnWrap">
        <el-button type="info" size="small" class="submitBtn" @click="submitAll()">저장</el-button>
    <router-link v-bind:to="{path: '/admin/admindetail'}">
        <el-button type="warning" size="small" class="submitBtn">취소</el-button>
    </router-link>
    </div>
  </div>
</el-form>   
</div>

  
</template>

<script>
import { mapGetters } from 'vuex'
import { authMenu, editAdmin, GetAdmins, getMenu, getUsers, adminDetail } from '@/api/admin'
import { getLoginInfo } from '@/api/login'
import axios from 'axios'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
export default {
    
    data() {
      return {
          listAuth: [],
          childId: [],
        results: null,
        activeName: 'first',
        noimg: 'http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg',
        dialogTableVisible: false,
         options: [{
          value: 'Option1',
          label: '아이디'
        }, {
          value: 'Option2',
          label: '이름'
        }],
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
        file: null,
        deleteReason: '',
        searchadmin: false,
        selected: 'a',
        result: null,
        auth: [],
        menuAuth: '',
        results: null,
         getId: '',
         isChecked: '',
        results1: null,
        search: {
          id: 0,
          userName: null,
          name: null,
          isMale: null,
          searchColumn: null,
          startDate: null,
          endDate: null
        },
        loading: false,
        valueAll: [],
        paging: {
          page: 1,
          pageSize: 20,
          totalPages: 0,
          totalRecodes: 0,
          orderBy: 'JoinDate',
          ascending: false,
          disabled : ''
        },
      };
    },
    created() {
         this.getMenu()
      this.getAdmin()
    //   this.getUsers()
      this.getAuth()
    //   this.$refs.id
     
    },
    computed: {
    ...mapGetters([
      'roles'
    ])
  },
  mounted(){
       this.disResult()
       
      setTimeout(() => {
      console.log('timeout ', this.$refs.id);
    }, 0)
     
  },
    methods: {
        childDisEvent(event, id) {
        if(event.target.checked === true) {
            document.getElementById(id).disabled = false
        } else {
            document.getElementById(id).disabled = true
        }
        },
        changeTitleChecked(data,event, key, sort, child) {

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

        getAdmin(){
            getLoginInfo()
            .then(response => {
                this.getId = response.admin.id
            })
        },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
       handleIconClick(ev) {
        // console.log(ev);
        },
        submitAll() {
        this.dialogTableVisible = false
   
        var listAuth = [].concat.apply([],this.listAuth)
        let val = localStorage.getItem('id')
        var data = {id: this.getId, userId: val, menuAuth: listAuth }
        this.$confirm(this.admin.name + '님의 정보를 수정하시겠습니까?', '관리자 수정', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'Success'
        }).then(() => {
        editAdmin(data)
            .then(response => {
            if(response === undefined){
                this.$message.error('관리자를 등록할 수 없습니다.');
            } else {
                this.$message({
                message: '관리자 등록이 완료 되었습니다..',
                type: 'success'
            });

        location.reload()
           }
          })
        }).catch(() => {
            this.fullscreenLoading = false
         this.$message.info('취소 되었습니다.'); 
        });
        },
        getMenu() {
            getMenu()
            .then(response => {
            this.result = response.result
            this.disResult()
            
          }).catch(response => {
              this.fetchSuccess = false
          })
        },
      
        getAuth() {
            
        this.loading = true
        this.dialogTableVisible = false
        let val = localStorage.getItem('id')
        var data = {id: val}
        adminDetail(data)
            .then(response => {
            this.loading =  false
            this.menuAuth = response.menuAuth
            this.admin = response.admin
            this.file = response.file
            var auth = [].concat.apply([],this.menuAuth)
            this.listAuth = this.menuAuth
            this.getMenu()
          }).catch(response => {
              this.fetchSuccess = false
          })
        },
         disResult(event){
        
             var dr = this.listAuth.filter(item => {
                return item.authDivision === "DR"
            })
            var valueResult = []
            for(var i = 0; i < dr.length; i++) {
                var x = dr[i].menuId
              valueResult.push(x)
            }
            
            var uniq =valueResult.reduce(function(a,b){
                if(a.indexOf(b) < 0) a.push(b);
                return a;
            }, [])
            var arr = []
            for(var i in uniq) {
                arr.push({
                    'id': uniq[i]
                })
               
            }
           
            this.valueAll = arr
             for(var x in this.listAuth) {
               
                 this.valueAll.filter(item => {
                     return item.id === this.listAuth[x].menuId
                 })[0].disabled = true
                 
                 
            }
              for (var u in this.result){
                   
                    var matchList = this.result[u].children.filter(list => {
                    return list.children
                })
                
                var matchListLen = matchList.length
                for(var z = 0; z < matchListLen; z++){
                    matchList[z].disabled = true
                }
                for(var l in this.valueAll){
                matchList.filter(match => {
                    return match.id === this.valueAll[l].id
                }).map(matching => {
                    return matching.disabled = false
                })
                }
                } 
                
              
        },
          
    },
   
    
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
 .codeCount {font-size: 12px; font-weight: normal;}
 .select_dia option {padding: 7px 0;}
 .admin_menu_wrap h1 {font-size: 20px; border-top: 1px solid black; padding-top: 48px; text-indent: 45px; }
    .el-table {text-align: center;}
    .el-table th {text-align: center; width: 155px;}
    tbody.el-table-column.listTable td {padding: 0;  width: 180px;}
    tbody.el-table-column.listTable th {width: 350px;}
    tbody.el-table-column.listTable td div {padding: 20px; cursor: auto;
    height: 50px;}
    .registmenu ul {padding: 0;}
    .registmenu ul li {text-decoration: none; list-style: none;}
    .el-table td, .el-table th.is-leaf{border-bottom: 0;}
    .btnWrap {text-align: center; margin-top: 50px;}
</style>