<template>
<div class="memberL" id="vList">
  <h1>{{listName}}</h1>
  <div label="관리자 삭제 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" label-width="120px" @submit.prevent="submitForm" method="post" class="searchBoxStyle">
      <el-form size="mini" :inline="true">
        <el-form-item label="검색 기간">
        <el-col>
          <el-select v-model="search.searchColumn">
          <el-option label="전체" :value="null" id="all">
            </el-option>
            <el-option label="삭제일" value="DeleteDate">
            </el-option>
            <el-option label="등록일" value="AdminDate">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
          <el-col>
          <el-date-picker type="date" placeholder="Pick a date" v-model="search.startDate" style="width: 100%; margin-right: 10px;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker>   
        </el-col>
      </el-form-item>
      <el-form-item>
          <el-date-picker type="date" placeholder="Pick a date" v-model="search.endDate" style="width: 100%;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker> 
        </el-col> 
      </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="아 이 디">
        <el-col>
          <el-input v-model="search.userName" :maxlength="30" placeholder="아이디 입력"></el-input>
        </el-col>
      </el-form-item>
      <!-- Id -->
      <el-form-item label="이 름">
        <el-col>
          <el-input v-model="search.name" :maxlength="10" placeholder="이름 입력"></el-input>
        </el-col>
      </el-form-item>
      <!--code-->
      <el-form-item label="관리자코드">
        <el-col>
          <el-input v-model="search.id" :maxlength="10" type="number" placeholder="관리자코드 입력"></el-input>
        </el-col>
      </el-form-item>
      </el-form>
       <el-form size="mini" :inline="true">
        <el-form-item label="삭제자">
        <el-col>
          <el-input v-model="search.deleteUserName" :maxlength="10" placeholder="삭제자 입력"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item class="member_btn_wrap">
        <el-col class="member_btn">
          
            <el-button type="info" icon="el-icon-search" @click="submitForm(); pageReset();commit()" size="mini">검색</el-button>
            <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
        </el-col>
          </el-form-item>
       </el-form>
    </el-form>
    <div class="searchResult" v-model="results">검색 결과 수: {{  paging.totalRecords }}</div>
     <table class="el-table" stripe :data="results" :model="results" >
        <thead class="el-table-column listTableHead">
            <tr>
              <th>No</th>
              <th>삭제일</th>
              <th>관리자코드</th>
              <th>아이디</th>
              <th>이름</th>
              <th>연락처</th>
              <th>등록일</th>
              <th>삭제자</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
            <router-link  :style="{ cursor: 'pointer'}"tag='tr' v-bind:to="{ path: 'admindel/admindeldetail' }" v-for="(entry,key) in results" :key="results.id" v-on:click.native="goDelDetail(entry.id)" style="cursor: pointer;">
              <td>{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
              <td>{{entry.deleteDateString}}</td>
              <td>0000{{entry.id}}</td>
              <td>{{entry.userName}}</td>
              <td>{{entry.name}}</td>
              <td>{{entry.phoneNumber}} </td>
              <td>{{entry.adminDateString}} </td>
              <td>{{entry.deleteUserName}} </td>
            </router-link>
            <tr v-model="noResults" v-if="noResults === '' ? false: true">
              <td colspan="8" class="noResults">{{noResults}}</td>
            </tr>
        </tbody>
    </table>
    
  </div>
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
</template>

<script>
import { quitAdmin } from '@/api/admin'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    name: "vList",
    data() {
      return {
        listName: '관리자 삭제 리스트',
         search: {
          id: null,
          userName: null,
          name: null,
          email: null,
          searchColumn: null,
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          endDate: new Date(),
          deleteUserName: ''
        },
        paging: {
          page: 1,
          pageSize: 20,
          totalPages: 1,
          totalRecords: 2,
          orderBy: 'id',
          ascending: false
        },
        results: null,
        list: null,
        listLoading: true,
        entry: null,
        noResults: '',
        resultLen: ''
          }
      
    },
    created() {
      this.checkThisPage()
      this.submitForm()
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
      movePage(page) {
          this.paging.page = page;
          this.commit()
          this.submitForm();
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.commit()
              this.submitForm();
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.commit()
              this.submitForm();
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
       submitForm() {
        this.listLoading = true
        var data = {search:this.search, paging: this.paging}
       
        quitAdmin(data)
            .then(response => {
              this.results = response.results
              this.paging = response.paging
              this.resultLen = this.results.length
              this.listLoading = false
              if(this.results.length === 0) {
                  return this.noResults = '검색결과가 없습니다.'
              } else {
                return this.noResults = ''
              }
          }).catch(response => {
              this.fetchSuccess = false
          })
        },
        pageReset(){
          this.paging.page = 1
        },
        resetBtn() {
          this.search = {
            id: null,
            userName: null,
            name: null,
            email: null,
            searchColumn: null,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
            }
        },
       goDelDetail(id) {
                localStorage.setItem('id', id);
                let val = localStorage.getItem('id')
      }
    }
  }

</script>