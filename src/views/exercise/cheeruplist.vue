<template>
<div class="memberL" id="vList">
  <h1>{{listName}}</h1>
  <div label="응원영상 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" label-width="120px" @submit.prevent="submitForm" method="post" class="searchBoxStyle">
      <el-form size="mini" :inline="true">
        <el-form-item label="검색 기간">
        <el-col :model="search">
          <el-select v-model="search.searchColumn">
            <el-option label="전체" :value="null">
            </el-option>
            <el-option label="등록일" value="CreateDate">
            </el-option>
          </el-select>
        </el-col>
        </el-form-item>
        <el-form-item>
          <el-col>
            <el-date-picker type="date" placeholder="Pick a date" v-model="search.startDate" style="width: 100%;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col>
            <el-date-picker type="date" placeholder="Pick a date" v-model="search.endDate" style="width: 100%;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker>  
          </el-col>     
      </el-form-item>
      </el-form>
      <!--code-->
        <el-form size="mini" :inline="true">
            <el-form-item label="촬영모델">
            <el-col>
                <el-input :maxlength="10" v-model="search.name" placeholder="촬영모델 입력"></el-input>
            </el-col>
            </el-form-item>
                <el-form-item class="member_btn_wrap">        
                <el-col class="member_btn">
                    <el-button type="info" icon="el-icon-search" @click="submitForm(); pageReset(); commit()" size="mini">검색</el-button>
                    <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
                </el-col>
                </el-form-item>
        </el-form>
    </el-form>
    <div class="register_warm" v-loading="loading">
      <div class="button_space_bottom">
        <router-link v-bind:to="{ path: 'cheeruplist/cheerregist' }" v-if="isAuth()"> 
        <el-button plain type="primary" size="small">신규 등록</el-button>
        </router-link>
        <span class="search_number">검색 결과 수 : {{  paging.totalRecords }}</span>
      </div>
     <table class="el-table" stripe :data="results" :model="results" >
        <thead class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>촬영모델</th>
                <th>대기 영상</th>
                <th>Great 영상</th>
                <th>Good 영상</th>
                <th>Bad 영상</th>
                <th>등록일</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
            <tr v-for="entry, key in results" :key="results.id" @click="goDetail(entry.id)" >
                <router-link v-bind:to="{ path: 'cheeruplist/cheerupDetail' }" tag="td">{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</router-link>
                <router-link v-bind:to="{ path: 'cheeruplist/cheerupDetail' }" tag="td">{{entry.name}}</router-link>
                <router-link v-bind:to="{ path: 'cheeruplist/cheerupDetail' }" tag="td">{{entry.waitCount}}</router-link>
                <router-link v-bind:to="{ path: 'cheeruplist/cheerupDetail' }" tag="td">{{entry.greatCount}}</router-link>
                <router-link v-bind:to="{ path: 'cheeruplist/cheerupDetail' }" tag="td">{{entry.goodCount}}</router-link>
                <router-link v-bind:to="{ path: 'cheeruplist/cheerupDetail' }" tag="td">{{entry.badCount}}</router-link>
                <router-link v-bind:to="{ path: 'cheeruplist/cheerupDetail' }" tag="td">{{entry.createDateString}} </router-link>
            </tr>
            <tr v-if="noResults">
              <td colspan="11" class="noResults">검색결과가 없습니다.</td>
            </tr>
        </tbody>
    </table>
    <nav class="text-sm-center" v-if="!noResults">
      <ul class="pagination" id="searchPager">
          <li class="page-item">
              <a class="page-link" @click="prevPage()">
                  &lt;
              </a>
          </li>

          <li v-for="pageobj in paging.totalPages" class="page-item page-num" v-bind:class="{active:pageobj==paging.page}" v-if="checkPage(pageobj)">
              <a class="page-link" @click="movePage(pageobj)">
                  {{pageobj}}
              </a>
          </li>

          <li class="page-item">
              <a class="page-link" @click="nextPage()">
                  &gt;
              </a>
          </li>
      </ul>
    </nav>
    </div>
  </div>
</div>
</template>

<script>
import { GetCheerings,  } from '@/api/exercise'
import { mapGetters } from 'vuex'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    name: "vList",
    data() {
      return {
          listName: '응원영상 리스트',
        search: {
            name: '',
            searchColumn: null,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
        },
        paging: {
          page: 1,
          pageSize: 10,
          totalPages: 1,
          totalRecords: 0,
          orderBy: 'id',
          ascending: false
        },
        results: null,
        list: null,
        listLoading: true,
        entry: null,
        noResults: '',
        resultLen: '',
        loading: false,
        }
      
    },
   
    created() {
        this.checkThisPage()
        this.submitForm()
        this.isAuth()
    },
     methods: {
         checkThisPage(){
         if(this.$store.state.example.list === this.listName) {
    
          this.search = JSON.parse(this.$store.state.example.search)
          this.paging = JSON.parse(this.$store.state.example.paging)
         } else {
           this.$store.commit('search', '')
            this.$store.commit('paging', '')
            this.$store.commit('list', '')
         }
        
       },
       commit(){
         this.$store.commit('search', this.search)
        this.$store.commit('paging', this.paging)
        this.$store.commit('list', this.listName)
       },
        pageReset(){
            this.paging.page = 1
        },
       isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 11
            }).filter(item => {
                return item.authDivision === 'CU'
            }).length
           if(x > 0) {
               
               return true
           } else {
               return false
           }
       },
      movePage(page) {
          this.paging.page = page;
          this.commit()
          this.submitForm()
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.commit()
              this.submitForm()
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.commit()
              this.submitForm()
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
       submitForm() {
        this.loading = true
     
        var data = {search:this.search, paging: this.paging}
        GetCheerings(data)
            .then(response => {
              this.results = response.results
              this.paging = response.paging
              this.loading = false
              this.resultLen = this.results.length
              if(this.results.length === 0) {
                  return this.noResults = true
              } else {
                return this.noResults = false
              }
          }).catch(response => {
              this.fetchSuccess = false
              console.log(response)
          })
        },
        resetBtn() {
          this.search = {
            name: '',
            searchColumn: null,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
            }
        },
        goDetail(id) {
                localStorage.setItem('id', id);
            },
       
        
        },
        computed: {
    ...mapGetters([
      'roles',
      
    ])
  }
 
  }

</script>
<!--<style scoped>
.memberL {width: 1290px; margin:0 0 100px;}
  h1 {font-size: 1.3em;  margin: 15px 40px;}
  .memberL_wrap{width: 1180px; margin: 0 30px; background-color: #eef1f6; border-radius: 5px; padding: 17px 0 1px;}
  .searc_d {padding-right: 5px;}
  .el-input input {height: 30px;}
  .el-table th, .el-table td {text-align:center; font-size: 13px;}
  .el-form{border-bottom: 20px solid #fff; padding: 0 0 15px;}
  .el-form-item {margin-bottom: 0px; font-weight: bold;}
  .member_btn {float: right; margin-right: 25px;}
  .member_btn button {float: right; margin-left: 8px;}
  .el-table .cell, .el-table th>div {padding: 0;}
  .el-pagination{text-align: center; width: 1100px; margin: 50px 0;}
  .el-button {width: 120px;}
  .tablestyle {cursor: pointer;}
  .tablestyle:hover {background-color: rgba(171,202,254,0.2);}
  .search_number {float: right; display: inline-block; font-size: 13px; margin-top: 12px;}
  .register_warm {background-color: #fff;}
  .el-select {float: left;}
  .state_style {float: left;}
  .text-sm-center {width: 1280px; text-align: center; overflow: hidden;}
  .pagination {overflow: hidden; text-align: center; display: inline-block;}
  .page-item {float: left; list-style: none; color: #a9a9a9;}
  .active {font-weight: bold; color: #1f88e3;}
  .page-arrow {color: #000;}
  .page-link {padding: 10px;
    vertical-align: middle;
    text-align: center;
    display: inline-block;
    font-size: 13px;}
</style>-->