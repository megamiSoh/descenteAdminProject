<template>
<div class="memberL" id="vList">
  <h1>{{listName}}</h1>
  <div label="회원 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" @submit.prevent="submitForm" method="post" class="searchBoxStyle">
      <el-form size="mini" :inline="true"> 
        <el-form-item label="검색 기간">
        <el-col :model="search">
          <el-select v-model="search.searchColumn">
            <el-option label="전체" :value="null"></el-option>
            <el-option label="가입일" value="JoinDate">
            </el-option>
            <el-option label="접속일" value="RecentlyDate">
            </el-option>
          </el-select>
        </el-col>
        </el-form-item>
        <el-form-item>
        <!-- memberSelect -->
        <el-col>
          <el-date-picker type="date" placeholder="Pick a date" v-model="search.startDate" style="width: 100%;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker>
        </el-col>
        </el-form-item>
        <el-form-item>
        <el-col>
          <el-date-picker type="date" placeholder="Pick a date" v-model="search.endDate" style="width: 100%;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker>  
        </el-col>      
      </el-form-item>
      <!-- memberDate -->
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="아 이 디" class="el-form-style">
        <el-col>
          <el-input v-model="search.userName" prop="username" :maxlength="12" placeholder="아이디 입력"></el-input>
        </el-col>
      </el-form-item>
      <!-- memberId -->
      <el-form-item label="이 름" class="el-form-style">
        <el-col>
          <el-input v-model="search.name" :maxlength="10" placeholder="이름 입력"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="성 별">
        <el-col>
          <el-select v-model="search.isMale" placeholder="성별">
            <el-option label="전체" :value="null">
            </el-option>
            <el-option label="여성" :value="false">
            </el-option>
            <el-option label="남성" :value="true">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item></el-form-item>
      </el-form>
      
      <!-- memberName -->
      <el-form size="mini" :inline="true">
        <el-form-item label="회원 코드">
        <el-col >
          <el-input v-model="searchid" :maxlength="10" type="number" placeholder="회원코드 입력">
           
          </el-input>
          <!-- memberCode -->
        </el-col>
        </el-form-item>
        <el-form-item class="member_btn_wrap">
        <el-col class="member_btn">
            <el-button type="info" icon="el-icon-search" @click="submitForm(); pageReset(); resultId()" size="mini">검색</el-button>
             <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
           <!-- memberButton -->
        </el-col>
      </el-form-item>
      </el-form>
      <!-- memberGender -->
       
    </el-form>
    <div v-loading="loading" style="background-color: #fff;">
    <div v-model="results" class="searchResult">검색 결과 수 :  {{  paging.totalRecords }}</div>
     <table class="el-table" stripe :data="results" :model="results">
      <colgroup>
        <col width="10" />
        <col width="150" />
        <col width="200" />
        <col width="200" />
        <col width="100" />
        <col width="50" />
        <col width="80" />
        <!--<col width="80" />-->
        <col width="80" />
        <col width="80" />
        <col width="80" />
      </colgroup>
        <thead class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>회원코드</th>
                <th>아이디</th>
                <th>이메일</th>
                <th>이름</th>
                <th>성별</th>
                <!--<th>연락처</th>-->
                <th>APP 알림</th>
                <th>마케팅 알림</th>
                <th>접속일</th>
                <th>가입일</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
            <tr v-for="(entry, key) in results" v-bind:key="results.id" @click="goDetail(entry.id)" class="tablestyle {cursor: pointer;}">
                <router-link  v-bind:to="{ path: '/memberlist/memdetail' }" tag="td">{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</router-link>
                <router-link  v-bind:to="{ path: '/memberlist/memdetail' }" tag="td">0000{{entry.id}}</router-link>
                <router-link  v-bind:to="{ path: '/memberlist/memdetail' }" tag="td">{{entry.userName}}</router-link>
                <router-link  v-bind:to="{ path: '/memberlist/memdetail' }" tag="td">{{entry.email}}</router-link>
                <router-link  v-bind:to="{ path: '/memberlist/memdetail' }" tag="td">{{entry.name}}</router-link>
                <router-link  v-bind:to="{ path: '/memberlist/memdetail' }" tag="td">{{entry.isMale? '남성' : '여성'}}</router-link>
                <!--<router-link  v-bind:to="{ path: '/memberlist/memdetail' }" tag="td">{{entry.phoneNum}} </router-link>-->
                <router-link tag="td"  v-bind:to="{ path: '/memberlist/memdetail' }" >{{entry.isAppNotice? "예": "아니오"}} </router-link>
                <router-link tag="td" v-bind:to="{ path: '/memberlist/memdetail' }" >{{entry.isMarkNotice? "예": "아니오"}} </router-link>
                <router-link  v-bind:to="{ path: '/memberlist/memdetail' }" tag="td">{{entry.recentlyDateString}} </router-link>
                <router-link  v-bind:to="{ path: '/memberlist/memdetail' }" tag="td">{{entry.joinDateString}} </router-link>
            </tr>
            <tr v-model="noResults" v-if="noResults === '' ? false: true"  >
              <td colspan="11" class="noResults">{{noResults}}</td>
            </tr>
        </tbody>
    </table>
    <nav class="text-sm-center " v-model="noResults" v-if="noResults ===''? true: false">
      <ul class="pagination" id="searchPager">
          <li class="page-item page-arrow">
              <a class="page-link btnArrow" @click="prevPage();">
                  &lt;
              </a>
          </li>

          <li v-for="pageobj in paging.totalPages" class="page-item page-num" v-bind:class="{active:pageobj==paging.page}" v-if="checkPage(pageobj)">
              <a class="page-link" @click="movePage(pageobj);">
                  {{pageobj}}
              </a>
          </li>

          <li class="page-item page-arrow">
              <a class="page-link" @click="nextPage();">
                  &gt;
              </a>
          </li>
      </ul>
    </nav>
   <!-- <div>
        <pageNavi></pageNavi>
    </div>-->
  </div>
  </div>
</div>

</template>

<script>
import { submitForm } from '@/api/member'
import { mapGetters } from 'vuex'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { isvalidUsername } from '@/utils/validate'
import pageNavi from '@/components/tab/pagenation'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    components: {
      pageNavi
    },
    data() {
      return {
        listName: '회원리스트',
        searchid: '',
          loading: false,
         search: {
          id: 0,
          userName: null,
          name: null,
          isMale: null,
          searchColumn: null,
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          endDate: new Date()
        },
        paging: {
          page: 1,
          pageSize: 10,
          totalPages: 1,
          totalRecords: 0,
          orderBy: 'JoinDate',
          ascending: true
        },
        results: null,
        list: null,
        entry: null,
        noResults: '',
        resultLen: '',
          }
      
    },
    
    created() {
      this.checkThisPage()
      this.submitForm()
    },
     methods: {
       checkThisPage(){
         if(this.$store.state.example.list === this.listName) {
    
          this.search = this.$store.state.example.search
          this.paging = this.$store.state.example.paging
          // console.log(this.$store.state.example.paging)
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
        // console.log(this.paging)
       },
      resultId() {
        this.commit()
        console.log(this.$store.state.example)
        if(this.searchid === '') {
          this.search.id = 0
        } else {
          this.search.id = this.searchid
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
        submitForm(data)
            .then(response => {
              
              this.loading = false
              this.results = response.results
              this.paging = response.paging
              if(this.paging.totalRecords === 0) {
                  this.noResults = '검색결과가 없습니다.'
              } else {
                this.noResults = ''
              }
          }).catch(response => {
          })
        },
        resetBtn() {
          this.search = {
           id: 0,
          userName: null,
          name: null,
          isMale: null,
          searchColumn: null,
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          endDate: new Date()
            }
        },
        pageReset(){
          this.paging.page = 1
        },
        goDetail(id) {
                localStorage.setItem('id', id);
            },
        
        
        },
       computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'roles'
      
    ]),
    getSearch() {
      return this.$store.state.example
    }
  } 
     
  }

</script>
