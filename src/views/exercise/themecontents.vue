<template>
<div class="memberL" id="vList">
  <h1>{{listName}}</h1>
  <div label="Main 운동 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" label-width="120px" @submit.prevent="submitForm" method="post" class="searchBoxStyle">
      <el-form size="mini" :inline='true'>
        <el-form-item label="검색 기간">
        <el-col class="searc_d" >
          <el-select v-model="search.searchColumn">
            <el-option label="전체" :value="null">
            </el-option>
            <el-option label="등록일" value="CreateDate">
            </el-option>
          </el-select>
        </el-col>
        </el-form-item>
        <el-form-item>
        <el-col class="searc_d" >
          <el-date-picker type="date" placeholder="Pick a date" v-model="search.startDate" style="width: 100%;" :disabled="search.searchColumn === null"></el-date-picker>
        </el-col>
        </el-form-item>
        <el-form-item>
        <el-col class="searc_d">
          <el-date-picker type="date" placeholder="Pick a date" v-model="search.endDate" style="width: 100%;" :disabled="search.searchColumn === null"></el-date-picker>  
        </el-col>   
      </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="족부압 데이터">
            <el-col>
            <el-select v-model="search.isFootPressure">
                <el-option label="전체" :value="null">
                </el-option>
                <el-option label="있음" :value="true">
                </el-option>
                <el-option label="없음" :value="false">
            </el-option>
            </el-select>
            </el-col>
        </el-form-item>
        <!--운동 분류-->
      <el-form-item label="운동분류">
        <el-col>
         <el-select v-model="search.exerKindCateId">
            <el-option label="전체" :value="null"></el-option>
            <el-option v-for="item in exerKind" :label="item.name" :value="item.id" :key="item.id">
            </el-option >
          </el-select>
        </el-col>
      </el-form-item>
        <!--상태-->
        <el-form-item label="상태">
        <el-col>
         <el-select v-model="search.isActive">
            <el-option label="전체" :value="null">
            </el-option>
            <el-option label="활성화" :value="true">
            </el-option>
            <el-option label="비활성화" :value="false"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="운동강도">
        <el-col>
         <el-select v-model="search.intensityCd">
            <el-option label="전체" :value="null"></el-option>
            <el-option v-for="item in intes" :label="item.name" :key="item.key" :value="item.key">
            </el-option>
            
          </el-select>
        </el-col>
      </el-form-item>
      <!--테마코드-->
      <el-form-item label="테마 CODE">
        <el-col>
          <el-input v-model="search.id" type="number" placeholder="테마코드 입력">
          
          </el-input>
        </el-col>
      </el-form-item>
      <!--운동 시간-->
      <el-form-item label="운동시간">
        <el-col>
         <el-select v-model="search.timeRangeCd">
            <el-option label="전체" :value="null"></el-option>
            <el-option v-for="item in timaRange" :key="item.key" :label="item.name" :value="item.key">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="컨텐츠 명">
        <el-col>
          <el-input v-model="search.name" placeholder="컨텐츠명 입력">
          </el-input>
        </el-col>
      </el-form-item>
      <!--키워드-->
      <el-form-item label="키워드">
        <el-col>
         <el-input v-model="search.keyword" placeholder="키워드 입력"></el-input>
        </el-col>
      </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="운동목적">
        <!--대-->
          <el-select v-model="purposeCateId" @change=" searchDepth(true)">
          <el-option label="전체" :value="null"></el-option>
            <el-option v-for="muscle in muscleResults" :value="muscle.id" :label="muscle.name" :key="muscle.name" >  
            </el-option>
          </el-select>
          <div v-if="purposeCateId=== 0"></div>
          <el-select  v-model="purposeCateId1" v-else  :disabled="purposeCateId === null ? true: false" placeholder="선택해 주세요." @change=" searchDepth(false)">
          <div v-for="muscle1 in muscleResults" v-if="purposeCateId === muscle1.id">
            <el-option v-for="muscle2 in muscle1.childens" :key="muscle2.name" :label="muscle2.name" :value="muscle2.id">
                {{muscle2.name}}
            </el-option>
          </div>
      </el-select>
        </el-form-item>  
         <!-- memberButton -->   
         <el-form-item class="member_btn_wrap">        
        <el-col class="member_btn">
            <el-button type="info" icon="el-icon-search" @click="submitForm(); pageReset();" size="mini">검색</el-button>
            <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
        </el-col>
        </el-form-item>
      </el-form>
        
      </el-form>
     
    <div class="register_warm" v-loading="loading">
      <div class="button_space_bottom">
        <router-link v-bind:to="{ path: 'themeregist' }" v-if="isAuth()">
          <el-button plain type="primary" size="small">신규 등록</el-button>
        </router-link>
        <span class="search_number">검색 결과 수 : {{  paging.totalRecords }}</span>
      </div>
     <table class="el-table" stripe :data="results" :model="results" >
        <thead class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>테마 Code</th>
                <th>운동 분류</th>
                <th>운동 강도</th>
                <th>컨텐츠명</th>
                <th>운동시간</th>
                <th>운동 영상종류</th>
                <th>운동목적 (대)</th>
                <th>운동목적 (소)</th>
                <th>키워드</th>
                <th>족부데이터<br>포함여부</th>
                <th>등록일</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
            <tr v-for="(entry, key) in results" :key="results.id" @click="goDetail(entry.id)" :class="entry.isActive? '': 'activeColor'">
                <router-link tag="td" v-bind:to="{ path: 'themecontents/themedetail' }">{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</router-link>
                <router-link tag="td" v-bind:to="{ path: 'themecontents/themedetail' }">0000{{entry.id}}</router-link>
                <router-link tag="td" v-bind:to="{ path: 'themecontents/themedetail' }">{{entry.exerKindCateName}}</router-link>
                <router-link tag="td" v-bind:to="{ path: 'themecontents/themedetail' }">{{entry.intensityName}}</router-link>
                <router-link tag="td" v-bind:to="{ path: 'themecontents/themedetail' }">{{entry.name}}</router-link>
                <router-link tag="td" v-bind:to="{ path: 'themecontents/themedetail' }">{{entry.time}}</router-link>
                <router-link tag="td" v-bind:to="{ path: 'themecontents/themedetail' }">{{entry.isMix? '운동조합': '동영상'}}</router-link>
                <router-link tag="td" v-bind:to="{ path: 'themecontents/themedetail' }">{{entry.bigPurposeCateName}}</router-link>
                <router-link tag="td" v-bind:to="{ path: 'themecontents/themedetail' }">{{entry.smallPurposeCateName}}</router-link>
                <router-link tag="td" v-bind:to="{ path: 'themecontents/themedetail' }">{{entry.keyword}}</router-link>
                <router-link tag="td" v-bind:to="{ path: 'themecontents/themedetail' }">{{entry.isFootPressure? 'O': 'X'}}</router-link>
                <router-link tag="td" v-bind:to="{ path: 'themecontents/themedetail' }">{{entry.createDateString}}</router-link>
                <td>
                  <span v-if="isAuth()">
                    <el-button type="success" size="small" plain @click="active(entry.isActive, entry.id)" v-if="entry.isActive"> 활성화</el-button>
                    <el-button type="info" size="small" plain @click="active(entry.isActive, entry.id)" v-else>비활성화</el-button>
                  </span>
                  <span v-else>
                  {{entry.isActive ? '활성화':'비활성화'}}
                  </span>
                </td>
            </tr>
            <tr>
              <td aligh="center"  colspan="13">{{noResults}}</td>
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
import { mapGetters } from 'vuex'
import { getTheme, getExerKind, getIntensity, getPurposeCategory, GetTimeRange, themeActive } from '@/api/exercise'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    name: "vList",
    data() {
      return {
        listName: '테마 컨텐츠 리스트',
         search: {
        id: null,
        name: '',
        keyword: '',
        exerKindCateId: null,
        intensityCd: null,
        purposeCateId: null,
        purposeCateDepth: null,
        timeRangeCd: null,
        isMix: null,
        isFootPressure: null,
        isActive: null,
        searchColumn: null,
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          endDate: new Date()
        },
        paging: {
          page: 1,
          pageSize: 10,
          totalPages: 1,
          totalRecords: 1,
          orderBy: 'id',
          ascending: false
        },
        // submitForm: true,
        results: null,
        list: null,
        loading: true,
        entry: null,
        noResults: '',
        exerKind: '',
        intes:'',
        timaRange: '',
        muscleResults: '',
        purposeCateId1: '',
        purposeCateId: null
          }
      
    },
   
    created() {
      this.checkThisPage()
      this.submitForm()
      this.getExer()
      this.getIntens()
      this.getTime()
      this.getMuscle()
      this.isAuth()
    },
     methods: {
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
       commit(){
         this.$store.commit('search', this.search)
        this.$store.commit('paging', this.paging)
        this.$store.commit('list', this.listName)
       },
       isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 10
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
        this.loading = true
        // var self = this;
     
        var data = {search:this.search, paging: this.paging}
        
        getTheme(data)
            .then(response => {
              this.loading = false
              this.commit()
              this.results = response.results
              this.paging = response.paging
              if(this.paging.totalRecords <= 0){
                   this.noResults = '검색결과가 없습니다.'
              } else {
                 this.noResults = ''
              }
              this.listLoading = false
          }).catch(response => {
              this.fetchSuccess = false
              console.log(response)
          })
        },
        getExer() {
           getExerKind()
          .then(response => {
            this.exerKind = response.results
          })
        },
        resetBtn() {
          this.search = {
            id: null,
        name: '',
        keyword: '',
        exerKindCateId: null,
        intensityCd: null,
        purposeCateId: null,
        purposeCateDepth: null,
        timeRangeCd: null,
        isMix: null,
        isFootPressure: null,
        isActive: null,
        searchColumn: null,
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          endDate: new Date()
            }
        },
        goDetail(id) {
                localStorage.setItem('id', id);
            },
        getIntens(){
          getIntensity()
          .then(response => {
            this.intes = response.results
          })
        },
        getMuscle() {
        this.listLoading = true
        getPurposeCategory()
            .then(response => {
              this.muscleResults = response.results
              this.listLoading = false
          }).catch(response => {
              this.fetchSuccess = false
              console.log(response)
          })
        },
        active(active, id) {
          if(active === true) {
            var isActive = false
            this.$message({
                    message: '비활성화 처리 되었습니다.',
                    type: 'info'
                });
          } else {
            var isActive = true
            this.$message({
                    message: '활성화 처리 되었습니다.',
                    type: 'success'
                });

          }
          var data = {themeId: id, isActive: isActive}
          themeActive(data)
          .then(response => {
            this.submitForm()
          })
        },
        searchDepth(val){
           if(val === true) {
               this.search.purposeCateDepth = 1
               this.search.purposeCateId = this.purposeCateId
               this.purposeCateId1 = null
           } else {
               this.search.purposeCateDepth = 2
                this.search.purposeCateId = this.purposeCateId1
           }
       },
        getTime() {
                GetTimeRange()
                .then(response => {
                    this.timaRange = response.results
                })
            },
        pageReset(){
          this.paging.page = 1
        },
        
        },
        computed: {
    ...mapGetters([
      'roles',
      
    ])
  }
  }

</script>