<template>
<div class="memberL" id="vList">
  <h1>Push 알림 리스트</h1>
  <div label="Push 알림 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" label-width="120px" @submit.prevent="getAdver" method="post" class="searchBoxStyle">
      <el-form size="mini" :inline="true">
        <el-form-item label="검색 기간">
        <el-col class="searc_d" :model="search">
          <el-select v-model="search.searchColumn">
          <el-option label="전체" :value="null">
            </el-option>
            <el-option label="발송일자" value="SendDate">
            </el-option>
            <el-option label="등록일자" value="CreateDate">
            </el-option>
          </el-select>
        </el-col>
        </el-form-item>
        <!--검색 날짜 -->
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
      <!-- 상태 -->
      <el-form size="mini" :inline="true">
        <el-form-item label="발송 목적">
        <el-col>
         <el-select v-model="search.sendPurposeCd">
            <el-option label="전체" :value="null"></el-option>
            <el-option :label="list.name" v-for="list in purposeList" :value="list.key" :key="list.key">
            </el-option>
          </el-select>
          </el-col>
      </el-form-item>
      <el-form-item label="상태">
        <el-col>
         <el-select v-model="search.sendState">
            <el-option label="전체" :value="null"></el-option>
            <el-option :label="bannerStates.name" v-for="bannerStates in stateResults" :value="bannerStates.key" :key="bannerStates.key">
            </el-option>
          </el-select>
          </el-col>
        </el-form-item>
          <el-form-item label="작성자">
        <el-col>
          <el-input :maxlength="30" v-model="search.userName" placeholder="작성자 입력">
           
          </el-input>
        </el-col>
      </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="코드">
        <el-col>
          <el-input :maxlength="10" v-model="search.id" type="number" placeholder="코드 입력">
           
          </el-input>
        </el-col>
        </el-form-item>
         <!-- Push 타이틀 -->
      <el-form-item label="Push 타이틀">
        <el-col>
          <el-input :maxlength="30" v-model="search.title" placeholder="Push타이틀 입력">
           
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="member_btn_wrap">
        <el-col class="member_btn">
            <el-button type="info" icon="el-icon-search" @click="getPush();pageReset()" size="mini">검색</el-button>
             <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
        </el-col>
       </el-form-item>
           <!-- memberButton -->
      </el-form>
    </el-form>
    <div class="register_warm" v-loading="loading">
    <router-link v-bind:to="{ path: 'pushlist/pushregist' }" v-if="isAuth()">
        <el-button plain type="primary" size="small" class=" button_space_bottom">신규 등록</el-button>
    </router-link>
        <span class="search_number" v-model="adResults" >
        검색 결과 수 : {{  paging.totalRecords }}</span>
    
     <table class="el-table" stripe :data="adResults" :model="adResults" >
        <thead class="el-table-column listTableHead">
            <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">Code</th>
                <th rowspan="2">발송목적</th>
                <th rowspan="2">Push 타이틀</th>
                <th rowspan="2">발송일자</th>
                <th rowspan="2">등록일</th>
                <th colspan="2" rowspan="1">미리보기</th>
                <th rowspan="2">작성자</th>
                <th rowspan="2">상태</th>
                <th rowspan="2">상태 변경</th>
            </tr>
            <tr>
                <th>Noti</th>
                <th>Link</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
        <tr v-for="(entry, key) in results" 
           :key="results.id" @click="goDetail(entry.id)" :class="entry.sendState === '20'? 'activeColor': ''">
            <router-link tag="td" v-bind:to="{ path: 'pushlist/pushdetail'}" >{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</router-link>
            <router-link tag="td" v-bind:to="{ path: 'pushlist/pushdetail'}" >0000{{entry.id}}</router-link>
            <router-link tag="td" v-bind:to="{ path: 'pushlist/pushdetail'}" >{{entry.sendPurposeCdNm}}</router-link>
            <router-link tag="td" v-bind:to="{ path: 'pushlist/pushdetail'}" >{{entry.title}}</router-link>
            <router-link tag="td" v-bind:to="{ path: 'pushlist/pushdetail'}" >{{entry.sendDateString}}</router-link>
            <router-link tag="td" v-bind:to="{ path: 'pushlist/pushdetail'}" >
                {{entry.createDateString}}
            </router-link>
            <td>
              </td>
            <td></td>
            <td>
              {{entry.createUserName}}
            </td>
            <td> 
                {{entry.sendStateNm}}
            </td>
            <td v-if="isAuth()">
                  <el-button type="info" size="small" plain style="width: 85px;"  @click="activeBtn(entry.id, true)" v-if = "entry.sendDateString.replace(/[^0-9]/g, '')> recent &&  entry.sendState === '20'">  비활성화 </el-button>
                  <el-button type="success" size="small" plain style="width: 85px;"  @click="activeBtn(entry.id, false)" v-if = "entry.sendState === '10' "> 활성화</el-button>
                  
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
import { getPush, AdvertStates, GetSendPurposeCd, pushActive, getsendstate } from '@/api/marketing'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
  export default {
    name: "vList",
    data() {
      return {
         search: {
            id: "",
            userName: '',
            sendPurposeCd: null,
            title: "",
            sendState : null,
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
        results: null,
        list: null,
        Loading: true,
        entry: null,
        modelResults: null,
        adResults: null,
        noResults: '',
        selected1: '',
        stateResults: '',
        leng: '',
        isActive: '',
        createDate: '',
        resultsLen: '',
        dialogTableVisible: false,
        purposeList: '',
        notiLink: false,
        recent: '',
        loading: false,
          }
      
    },
   
    created() {
      this.checkThisPage()
      this.getPush()
      this.bannerState()
      this.getPurpose()
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
                return item.menuId === 23
            }).filter(item => {
                return item.authDivision === 'CU'
            }).length
           if(x > 0) {   
               return true
           } else {
               return false
           }
       },
      totalList() {
             for(var i = 1 ; i <= this.paging.totalRecords; i++) {
                i 
             }
         },
        movePage(page) {
          this.paging.page = page;
          this.getPush();
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.getPush();
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.getPush();
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
      pageReset(){
        this.paging.page = 1
      },
       getPush() {
         this.loading= true
         var data = {search: this.search, paging: this.paging}
         getPush(data)
         .then(response => {
           this.loading = false
           this.commit()
           this.results = response.results
           this.paging = response.paging
           this.recent = new Date().getFullYear()+'' +("0" + (new Date().getMonth()+1)).slice(-2)+'' +("0" + new Date().getDate()).slice(-2)+ ''+
            ("0" + new Date().getHours()).slice(-2)+ ''+ 
            ("0" + new Date().getMinutes()).slice(-2)
          if(this.paging.totalRecords <= 0) {
                  return this.noResults = '검색결과가 없습니다.'
              } else {
                return this.noResults = ''
              }
          this.recent = Date.parse(new Date())
         
        for(var i = 0; i < this.resultsLen; i++) {
          this.results[i].total = Date.parse(this.results[i].sendDateString)
        }
           
         })
         
       },
       bannerState() {
        
          getsendstate()
          .then(response => {
            this.stateResults = response.results
          }).catch(response => {
            console.log(response)
          })
        },
    getPurpose(){
        GetSendPurposeCd()
        .then(response => {
            this.purposeList = response.results
        })
    },
      
        goDetail(id) {
          localStorage.setItem('id', id)
        },
        resetBtn() {
          this.search = {
            id: "",
            userName: '',
            sendPurposeCd: null,
            title: "",
            sendState : null,
            searchColumn: null,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
            }
        },
        activeBtn(id, isActive, sendDate) {
           if (isActive === true) {
             var active = true
            
           } else {
             var active = false
             
           }
          var id = id
          var data = { pushId: id, isActive: active}
          pushActive(data)
          .then(response => {
            if(response === undefined) {
               this.$message({
              message: '발송일자의 5일전에만 활성화 할 수 있습니다.',
              type: 'warning'
            });
            }
            else {
              if (isActive === true) {
             var active = true
             this.$message({
              message: '활성화 되었습니다.',
              type: 'success'
            });
           } else {
             var active = false
             this.$message({
              message: '비활성화 되었습니다.',
              type: 'info'
            });
           }
            }
            this.getPush();
            console.log(response)
          })
        }
        
        }, computed: {
    ...mapGetters([
            'roles'
        ])
        }
      
  }

</script>
