<template>

<div class="memberL" id="vList">
<router-view></router-view>
  <h1>{{listName}}</h1>
  <div label="프로모션 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" label-width="120px" @submit.prevent="getMain" method="post" class="searchBoxStyle">
      <el-form size="mini" :inline="true">
        <el-form-item label="검색 기간">
        <el-col class="searc_d">
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
            <el-date-picker type="date" placeholder="Pick a date" v-model="search.startDate" style="width: 100%; margin-right: 10px;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker>   
            </el-col>
      </el-form-item>
      <el-form-item>
        <el-col>    
        <el-date-picker type="date" placeholder="Pick a date" v-model="search.endDate" style="width: 100%;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker> 
        </el-col>  
      </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="상태">
        <el-col>
         <el-select v-model="search.state">
            <el-option label="전체" :value='null'></el-option>
            <el-option :label="bannerStates.name" v-for="bannerStates in stateResults" :value="bannerStates.key" :key="bannerStates.key">
            {{bannerStates.name}}
            </el-option>
          </el-select>
          </el-col>
      </el-form-item>
      
      <el-form-item label="Main 배너 제목">
        <el-col>
          <el-input :maxlength="30"  v-model="search.title" placeholder="메인배너 제목 입력">
           
          </el-input>
        </el-col>
      </el-form-item>
      </el-form>
      <!--code-->
       <el-form size="mini" :inline="true">
        <el-form-item label="코드">
        <el-col>
          <el-input :maxlength="10" v-model="search.id" type="number" placeholder="코드 입력">
           
          </el-input>
        </el-col>
        </el-form-item>
        <el-form-item class="member_btn_wrap">
        <el-col class="member_btn">
          
            <el-button type="info" icon="el-icon-search" @click="getMain();commit()" size="mini">검색</el-button>
             <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
           <!-- memberButton -->
        </el-col>
      </el-form-item>
       </el-form>
    </el-form>
    <div class="register_warm" v-loading="loading">
    <router-link v-bind:to="{ path: 'mainbanner/mainregist' }" v-if="isAuth()">
        <el-button plain type="primary" size="small" class=" button_space_bottom">신규 등록</el-button>
    </router-link>
        <span class="search_number" v-model="mainResults" >
        검색 결과 수 : {{  paging.totalRecords }}</span>
     
     <table class="el-table" stripe :data="mainResults" :model="mainResults" >
     <colgroup>
      <col width="50" />
      <col width="100" />
      <col width="" />
      <col width="" />
      <col width="" />
      <col width="" />
      <col width="80" />
      <col width="80" />
      <col width="80" />
     </colgroup>
        <thead class="el-table-column listTableHead">
            <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">Code</th>
                <th rowspan="2">배너 제목</th>
                <th colspan="2" rowspan="1">유효 등록기간</th>
                <th rowspan="2">등록일</th>
                <th rowspan="2">미리보기</th>
                <th rowspan="2">상태</th>
                <th rowspan="2" v-if="isAuth()">상태 변경</th>
            </tr>
            <tr>
                <th>시작날짜</th>
                <th>종료날짜</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
        <tr v-for="entry, key in mainResults" 
           :key="mainResults.id" @click="goDetail(entry.id)" :class="entry.state === 'NA' || entry.state ==='ED'? 'activeColor': ''">
            <router-link tag="td" v-bind:to="{ path: 'mainbanner/maindetail'}" >{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</router-link>
            <router-link tag="td" v-bind:to="{ path: 'mainbanner/maindetail'}" >0000{{entry.id}}</router-link>
            <router-link tag="td" v-bind:to="{ path: 'mainbanner/maindetail'}" >{{entry.title}}</router-link>
            <router-link tag="td" v-bind:to="{ path: 'mainbanner/maindetail'}" >{{entry.startDateString}}</router-link>
            <router-link tag="td" v-bind:to="{ path: 'mainbanner/maindetail'}" >{{entry.endDateString}}</router-link>
            <router-link tag="td" v-bind:to="{ path: 'mainbanner/maindetail'}" >{{entry.createDate}}</router-link>
            <td> 
            <span  v-for="(item , index) in entry.files">
               <el-button type="text" @click="dialogTableVisible = true; showImg(item.logicalPath, index)" size="small">링크</el-button>
                <el-dialog title="이미지 미리보기" :visible.sync="dialogTableVisible">
                  <img :src = 'showImage' style="width: 100%"/>
                </el-dialog>
              </span>
            </td>
            <td>
                <span v-for="states in stateResults" v-if="entry.state === states.key">
                   {{states.name}}
                </span>
            </td>
            <td v-if="isAuth()">
                <span  v-for="states in stateResults">
                  <el-button size="small"  type="info" plain style="width: 85px;" @click="activeBtn(entry.id, true)" v-if="entry.state === 'NA' && states.key === 'NA'">
                비활성화
                </el-button>
                <el-button size="small"  type="success" plain style="width: 85px;" @click="activeBtn(entry.id, false)" v-if="entry.state === 'RS' && states.key === 'RS'">
                활성화
                </el-button>
                <el-button size="small"  type="success" plain style="width: 85px;" @click="activeBtn(entry.id, false)" v-if="entry.state === 'PU' && states.key === 'PU'">
                활성화
                </el-button>
                </span>
            </td>
        </tr>
          <tr v-model="noResults" v-if="noResults === '' ? false: true">
            <td colspan="11" class="noResults">{{noResults}}</td>
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
</div>
</template>

<script>
import { AdvertStates, MainBanners, PhotoModels, EditIsAcive } from '@/api/marketing'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
  export default {
    name: "vList",
    data() {
      return {
        listName: '프로모션 리스트',
         search: {
            id: "",
            title: "",
            state : null,
            searchColumn: null,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
        },
        paging: {
          page: 1,
          pageSize: 20,
          totalPages: 1,
          totalRecords: 1,
          orderBy: 'id',
          ascending: false
        },
        // submitForm: true,
        results: null,
        list: null,
        Loading: true,
        entry: null,
        modelResults: null,
        mainResults: null,
        noResults: '',
        selected1: '',
        stateResults: '',
        leng: '',
        isActive: '',
        dialogTableVisible: false,
        resultsLen: '',
        files: '',
        showImage:'',
          }
      
    },
   
    created() {
     this.checkThisPage()
      this.getModel()
      this.getMain()
      this.bannerState()
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
       isAuth(){
         var auth = this.roles.filter(item => {
           return item.menuId === 21
         }).filter(item => {
           return item.authDivision === "CU"
         }).length
         if(auth > 0) {
           return true
         } else {
           return false
         }
       },
       showImg(img, index){
          this.showImage = img
       },
        movePage(page) {
          this.paging.page = page;
          this.getMain();
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.getMain();
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.getMain();
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
       bannerState() {
        var bannerState = {id : this.stateResults.id}
          AdvertStates(bannerState)
          .then(response => {
            this.stateResults = response
          }).catch(response => {
            console.log(response)
          })
        },
        // picChoice(id){
        //   alert(id)
        // },
       getMain() {
         this.loading = true
         var mainBanner = { search: this.search, paging: this.paging}
           MainBanners(mainBanner)
          .then(response => {
            this.commit()
            this.loading = false
            this.mainResults = response.results
            this.paging = response.paging
            this.files = response.files
            if(this.paging.totalRecords <= 0) {
                  return this.noResults = '검색결과가 없습니다.'
              } else {
                return this.noResults = ''
              }
          }).catch(response => {
            console.log(response)
          })
        },
       getModel() {
        var modelResults = null
          PhotoModels(modelResults)
          .then(response => {
            this.modelResults = response.results
          }).catch(response => {
            console.log(response)
          })
        },
        goDetail(id) {
          localStorage.setItem('id', id)
        },
        resetBtn() {
          this.search = {
            id: "",
            title: "",
            state : null,
            searchColumn: null,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
            }
        },
        activeBtn(id, active) {
          var id = id
          var active = active
console.log(active)
console.log(id)
          var data = { mainBannerId: id, isActive: active}
          EditIsAcive(data)
          .then(response => {
            this.getMain()
          })
        }
        
        }, computed: {
    ...mapGetters([
            'roles'
        ])
        }
  }

</script>
