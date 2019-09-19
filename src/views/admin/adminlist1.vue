<template>
<div class="memberL" id="vList">
  <h1>{{listName}}</h1>
  <div label="관리자 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" label-width="120px" @submit.prevent="submitForm" method="post" class="searchBoxStyle">
      <el-form size="mini" :inline="true">
        <el-form-item label="검색기간">
        <el-form-item>
          <el-select v-model="search.searchColumn">
            <el-option label="전체" :value="null"></el-option>
            <el-option label="등록일" value="AdminDate"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
        <el-col class="searc_d">
          <el-date-picker type="date" placeholder="Pick a date" v-model="search.startDate" style="width: 100%;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker>
        </el-col>
        </el-form-item>
        <el-form-item>
        <el-col class="searc_d">
          <el-date-picker type="date" placeholder="Pick a date" v-model="search.endDate" style="width: 100%;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker>  
        </el-col>     
        </el-form-item>
        </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
      <el-form-item label="아 이 디">
        <el-col>
          <el-input v-model="search.userName" :maxlength="30" placeholder="아이디 입력"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="이 름">
        <el-col>
          <el-input v-model="search.name" :maxlength="10" placeholder="이름 입력"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="관리자코드">
        <el-col>
          <el-input v-model="search.id" :maxlength="10" type="number" placeholder="관리자코드 입력"></el-input>
        </el-col>
      </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="이메일">
        <el-col>
          <el-input v-model="search.email" placeholder="이메일 입력"></el-input>
          </el-col>
      </el-form-item>
      <el-form-item class="member_btn_wrap">
        <el-col class="member_btn">
            <el-button type="info" icon="el-icon-search" @click="submitForm();pageReset() " size="mini">검색</el-button>
            <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
        </el-col>
      </el-form-item>
      </el-form>
    </el-form>
     <div class="register_admin"  v-loading="loading">
     <router-link :style="{ cursor: 'pointer'}" :to="{path: 'registAdmin'}" >
        <el-button plain type="primary" size="small" v-if="isAuth()" class=" button_space_bottom">관리자 등록</el-button>
      </router-link>
        <span v-model="results" class="search_number">검색 결과 수 : {{  paging.totalRecords }}
      
        </span>
     
     <table class="el-table" stripe :data="results" :model="results" >
        <thead class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>관리자 코드</th>
                <th>아이디</th>
                <th>이름</th>
                <th>이메일</th>
                <th>등록일</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
            <tr  v-for="(entry, key) in results" :key="results.id" @click="goAdmin(entry.id)" class="tablestyle">
              <router-link tag="td" v-bind:to="{path: 'admindetail'}">{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</router-link>
              <router-link tag="td" v-bind:to="{path: 'admindetail'}">0000{{ entry.id }}</router-link>
              <router-link tag="td" v-bind:to="{path: 'admindetail'}">{{ entry.userName}}</router-link>
              <router-link tag="td" v-bind:to="{path: 'admindetail'}">{{ entry.name }}</router-link>
              <router-link tag="td" v-bind:to="{path: 'admindetail'}">{{ entry.email }}</router-link>
              <router-link tag="td" v-bind:to="{path: 'admindetail'}">{{ entry.adminDateString }} </router-link>
            </tr>
            <tr v-model="noResults" v-if="noResults==='' ? false: true">
              <td colspan="7" class="noResults">
                {{noResults}}
              </td>
            </tr>
        </tbody>
    </table>
    <nav class="text-sm-center" v-model="noResults" v-if="noResults ===''? true: false">
      <ul class="pagination" id="searchPager">
          <li class="page-item page-arrow">
              <a class="page-link" @click="prevPage()">
                  &lt;
              </a>
          </li>

          <li v-for="pageobj in paging.totalPages" class="page-item page-num" v-bind:class="{active:pageobj==paging.page}" v-if="checkPage(pageobj)">
              <a class="page-link" @click="movePage(pageobj)">
                  {{pageobj}}
              </a>
          </li>

          <li class="page-item page-arrow">
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
import { GetAdmins } from '@/api/admin'
import { mapGetters } from 'vuex'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    name: "vList",
    data() {
      return {
        listName: '관리자 리스트',
         search: {
          id: null,
          userName: null,
          name: null,
          email: null,
          searchColumn: null,
          startDate:  new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          endDate: new Date()
        },
        paging: {
          page: 1,
          pageSize: 10,
          totalPages: 1,
          totalRecords: 0,
          orderBy: "id",
          ascending: false
        },
        results: null,
        list: null,
        loading: true,
        entry: null,
        noResults: '',
        resultsLen: ''
          }
      
    },
   
    created() {
      this.checkThisPage()
      this.submitForm()
      this.isAuth()
      
    },
     methods: {
        commit(){
         this.$store.commit('search', this.search)
        this.$store.commit('paging', this.paging)
        this.$store.commit('list', this.listName)
       },
       checkThisPage(){
         if(this.$store.state.example.list === this.listName) {
          this.search = this.$store.state.example.search
          this.paging = this.$store.state.example.paging
         } else {
           this.$store.commit('search', '')
          this.$store.commit('paging', '')
          this.$store.commit('list', '')
         }
        
       },
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
      pageReset(){
        this.paging.page = 1
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
       submitForm() {
        this.loading = true
        var i = this.search.startDate;
        var data = {search:this.search, paging: this.paging}
       
        GetAdmins(data)
            .then(response => {
              this.commit()
              this.results = response.results
              this.paging = response.paging
              this.resultsLen = this.results.length
              this.loading = false
              if(this.results.length === 0) {
                  return this.noResults = '검색결과가 없습니다.'
              } else {
                return this.noResults = ''
              }
          }).catch(response => {
              this.fetchSuccess = false
              console.log(response)
          })
        },
        resetBtn() {
          this.search = {
            id: null,
            userName: null,
            name: null,
            email: null,
            searchColumn: null,
            startDate:  new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
            }
        },
        goAdmin(id) {
          localStorage.setItem('id', id); 
        }
     },
      computed: {
    ...mapGetters([
      'roles',
    ])
    }
  }

</script>