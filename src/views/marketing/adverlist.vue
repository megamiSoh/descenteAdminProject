<template>
<div class="memberL" id="vList">
  <h1>광고/이벤트 리스트</h1>
  <div label="Main 배너 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" label-width="120px" @submit.prevent="getAdver" method="post" class="searchBoxStyle">
      <el-form size="mini" :inline="true">
        <el-form-item label="검색 기간">
        <el-col class="searc_d" :model="search">
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
      <!-- 상태 -->
      <el-form size="mini" :inline="true">
        <el-form-item label="상태">
        <el-col >
         <el-select  v-model="search.state">
            <el-option label="전체" :value="null"></el-option>
            <el-option :label="bannerStates.name" v-for="bannerStates in stateResults" :value="bannerStates.key" :key="bannerStates.key">
            {{bannerStates.name}}
            </el-option>
          </el-select>
          </el-col>
      </el-form-item>
      
      <!-- 광고/이벤트 제목 -->
      <el-form-item label="광고/이벤트 제목">
        <el-col>
          <el-input :maxlength="30"  v-model="search.title" placeholder="광고/이벤트 제목 입력">
           
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
            <el-button type="info" icon="el-icon-search" @click="getAdver()" size="mini">검색</el-button>
             <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
           <!-- memberButton -->
        </el-col>
      </el-form-item>
      </el-form>
    </el-form>
    <div class="register_warm" v-loading="loading">
    <router-link v-bind:to="{ path: 'adverlist/adverregist' }" v-if="isAuth()">
        <el-button plain type="primary" size="small" class=" button_space_bottom">신규 등록</el-button>
    </router-link>
        <span class="search_number" v-model="adResults" >
        검색 결과 수 : {{  paging.totalRecords }}</span>
     
     <table class="el-table" stripe :data="adResults" :model="adResults" >
     <colgroup>
      <col width="50" />
      <col width="100" />
      <col width="" />
      <col width="" />
      <col width="" />
      <col width="80" />
      <col width="50" />
      <col width="100" />
      <col width="100" />
     </colgroup>
        <thead class="el-table-column listTableHead">
            <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">Code</th>
                <th rowspan="2">광고/이벤트 제목</th>
                <th colspan="2" rowspan="1">이벤트 일자</th>
                <th rowspan="2">등록일</th>
                <th rowspan="2" style="padding: 10px;">미리보기</th>
                <th rowspan="2">상태</th>
                <th v-if="isAuth()" rowspan="2">상태 변경</th>
            </tr>
            <tr>
                <th>시작날짜</th>
                <th>종료날짜</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
        <tr v-for="(entry, key) in adResults" 
           :key="adResults.id" @click="goDetail(entry.id)" :class="entry.stateNm ==='비활성화' || entry.stateNm ==='만료' ? 'activeColor': ''">
            <router-link tag="td" v-bind:to="{ path: 'adverlist/adverdetail'}" >{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</router-link>
            <router-link tag="td" v-bind:to="{ path: 'adverlist/adverdetail'}" >0000{{entry.id}}</router-link>
            <router-link tag="td" v-bind:to="{ path: 'adverlist/adverdetail'}" >{{entry.title}}</router-link>
            <router-link tag="td" v-bind:to="{ path: 'adverlist/adverdetail'}" >{{entry.startDate}}</router-link>
            <router-link tag="td" v-bind:to="{ path: 'adverlist/adverdetail'}" >{{entry.endDate}}</router-link>
            <router-link tag="td" v-bind:to="{ path: 'adverlist/adverdetail'}" >
                {{entry.createDate}}
            </router-link>
            <td v-for="item in entry.files"> 
               <el-button type="text" @click="dialogTableVisible = true; showImg(item.logicalPath)" size="small">링크</el-button>
                <el-dialog title="이미지 미리보기" :visible.sync="dialogTableVisible">
                  <img :src = 'showImage' style="width: 100%"/>
                </el-dialog>
            </td>
            <td> 
              {{entry.stateNm}}
            <td v-if="isAuth()">
              <span>
                <span v-if="entry.startDate.replace(/[^0-9]/g, '') > recent && entry.stateNm ==='비활성화'">
                  <el-button size="small" @click="activeBtn(entry.id, true)" type="info" plain>비활성화</el-button>
                </span>
               <span v-if=" entry.stateNm ==='예약중'">
                  <el-button size="small" @click="activeBtn(entry.id, false)" type="success" plain>
                  활성화</el-button>
                </span>
                <span v-if=" entry.stateNm ==='게시중'">
                  <el-button size="small" @click="activeBtn(entry.id, false)" type="success" plain>활성화</el-button>
                </span>
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
import { getAdEvent, AdvertStates, adActive } from '@/api/marketing'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
  export default {
    name: "vList",
    data() {
      return {
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
        dialogTableVisible: false,
        recent: '',
        showImage:'',
        rep: '',
          }
      
    },
   
    created() {
      var self = this;
      this.getAdver()
      this.bannerState()
      this.isAuth()
    },
     methods: {
       isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 22
            }).filter(item => {
                return item.authDivision === 'CU'
            }).length
           if(x > 0) {   
               return true
           } else {
               return false
           }
       },
       showImg(img){
          this.showImage = img
       },
        movePage(page) {
          this.paging.page = page;
          this.getAdver();
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.getAdver();
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.getAdver();
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
       getAdver() {
         this.loading= true
         var mainBanner = { search: this.search, paging: this.paging}
          getAdEvent(mainBanner)
          .then(response => {
            this.loading=false
            this.adResults = response.results
            this.paging = response.paging
            this.rep = /[^0-9]/g,""
            this.recent = new Date().getFullYear()+'' +("0" + (new Date().getMonth()+1)).slice(-2)+'' +("0" + new Date().getDate()).slice(-2)+ ''+
            ("0" + new Date().getHours()).slice(-2)+ ''+ 
            ("0" + new Date().getMinutes()).slice(-2)
            if(this.paging.totalRecords <= 0) {
                  return this.noResults = '검색결과가 없습니다.'
              } else {
                return this.noResults = ''
              }
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

        activeBtn(id, isActive) {
          var id = id
          if(isActive === true) {
            var active = true
            this.$message({
              message:'활성화 되었습니다.',
              type: 'success'
            });
          } else {
            var active = false
            this.$message({
              message:'비활성화 되었습니다.',
              type: 'info'
            });
          }
          var data = { adEventId: id, isActive: active}
          adActive(data)
          .then(response => {
            this.getAdver()
            
          })
        }
        
        }
        , computed: {
    ...mapGetters([
            'roles'
        ])
        }
      
  }

</script>
