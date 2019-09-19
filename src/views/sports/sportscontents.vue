<template>
<div class="memberL" id="vList">
  <h1>{{listName}}</h1>
  <div label="Main 운동 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" label-width="120px" @submit.prevent="submitForm" method="post" class="searchBoxStyle">
      <el-form size="mini" :inline="true" > 
        <el-form-item label="검색 기간">
        <el-col  :model="search">
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
          <el-date-picker type="date" placeholder="Pick a date" v-model="search.startDate" style="width: 100%;" :disabled="search.searchColumn === null"></el-date-picker>
        </el-col>
        </el-form-item>
        <el-form-item>
        <el-col>
          <el-date-picker type="date" placeholder="Pick a date" v-model="search.endDate" style="width: 100%;" :disabled="search.searchColumn === null"></el-date-picker>  
        </el-col> 
      </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="스포츠분류">
        <el-col>
         <el-select v-model="search.purposeCateId">
            <el-option label="전체" :value="null"></el-option>
            <el-option v-for="item in sportsKind" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        </el-form-item>
        <!--상태-->
        <el-form-item label="운동분류">
        <el-col>
         <el-select v-model="search.exerKindCateId" >
          <el-option label="전체" :value="null"></el-option>
          <el-option v-for="lists in exerKind" :value ="lists.id" :label="lists.name" :key="lists.id">
        </el-option>
      </el-select>
        </el-col>
      </el-form-item>
      
      <el-form-item label="족부데이터">
        <el-col>
        <el-select v-model="search.isFootPressure">
                <el-option label="전체" :value="null">
                </el-option>
                <el-option label="있음" :value="true">
                </el-option>
                <el-option label="없음" :value="false"></el-option>
            </el-select>
        </el-col>
        </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
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
      <el-form-item label="운동 강도">
        <el-col>
         <el-select v-model="search.intensityCd" >
                <el-option label="전체" :value="null"></el-option>
                <el-option v-for="lists in intens" :label="lists.name" :value="lists.key" :key="lists.key">
                </el-option>
            </el-select>
        </el-col>
        <!--상태-->
        </el-form-item>
        <el-form-item label="운동 시간">
        <el-col>
        <el-select v-model="search.timeRangeCd">
          <el-option label="전체" :value="null"></el-option>
            <el-option v-for="item in timeRange" :key="item.key" :label="item.name" :value="item.key">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="컨텐츠 제목">
        <el-col>
          <el-input v-model="search.name" placeholder="컨텐츠 제목 입력">
          
          </el-input>
        </el-col>
        </el-form-item>
        <el-form-item label="운동 영상">
          <el-select v-model="search.isMix">
            <el-option label="전체" :value="null">
            </el-option>
            <el-option label="운동조합" :value="true">
            </el-option>
            <el-option label="외부영상" :value="false"></el-option>
            <el-option label="동영상" :value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="Code">
        <el-col>
          <el-input v-model="search.id" type="number" placeholder="코드 입력">
          </el-input>
        </el-col>
      </el-form-item>
         <el-form-item class="member_btn_wrap">        
        <el-col class="member_btn">
            <el-button type="info" icon="el-icon-search" @click="submitForm(); pageReset();" size="mini">검색</el-button>
            <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
        </el-col>
        </el-form-item>
      </el-form>
      </el-form>
     
    <div class="register_warm" v-loading ="loading">
        <router-link v-bind:to="{ path: 'sportsregist' }" v-if="isAuth()">
          <el-button type="primary" plain size="small" class=" button_space_bottom">신규 등록</el-button>
        </router-link>
        <span class="search_number">검색 결과 수 : {{  paging.totalRecords }}</span>
     <table class="el-table" stripe :data="results" :model="results" >
        <thead class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>Code</th>
                <th>스포츠 종류</th>
                <th>운동 분류</th>
                <th>운동 강도</th>
                <th>컨텐츠 명</th>
                <th>운동 시간</th>
                <th>운동 영상종류</th>
                <th>족부압 데이터<br>포함여부</th>
                <th>등록일</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
            <tr v-for="(entry, key) in results" :key="results.id" @click="goDetail(entry.id)" :class="entry.isActive? '' : 'activeColor'">
                <router-link tag="td" v-bind:to="{path: 'sportsdetail'}">{{ (results.length) - (++key) + 1 }}</router-link>
                <router-link tag="td" v-bind:to="{path: 'sportsdetail'}">0000{{entry.id}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'sportsdetail'}">{{entry.exerKindCateName}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'sportsdetail'}">{{entry.purposeCateName}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'sportsdetail'}">{{entry.intensityName}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'sportsdetail'}">{{entry.name}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'sportsdetail'}">{{entry.time}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'sportsdetail'}" >
                <span v-if="entry.isMix === false && entry.isLink === false">동영상</span>
                <span v-if="entry.isMix === false && entry.isLink === true">외부영상</span>
                <span v-if="entry.isMix === true">운동 조합</span>
                </router-link>
                <router-link tag="td" v-bind:to="{path: 'sportsdetail'}">{{entry.isFootPressure? 'O':'X'}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'sportsdetail'}">{{entry.createDateString}}</router-link>
                <td>
                  <span v-if="isAuth()">
                    <el-button type="success" size="small" @click="editIsActive(entry.isActive, entry.id)" v-if="entry.isActive" plain>활성화</el-button>
                    <el-button type="info" plain size="small" @click="editIsActive(entry.isActive, entry.id)" v-else>비활성화</el-button>
                  </span>
                  <span v-else>
                  {{entry.isActive ? '활성화' : '비활성화'}}
                  </span>
                </td>
            </tr>
            <tr v-if="paging.totalRecords === 0">
              <td colspan="11">검색 결과가 없습니다</td>
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
import { GetPurposeCategory, GetIntensityCd, orGetSpts, GetTimeRange, editIsActive, GetExerKind } from '@/api/sports'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken, } from '@/utils/auth'
  export default {
    name: "vList",
    data() {
      return {
        listName: '스포츠 컨텐츠 리스트',
         search: {
            id: null,
            name: '',
            exerKindCateId: null,
            intensityCd: null,
            purposeCateId: null,
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
        sSelect: null,
        sportsKind: '',
        resultsLen: '',
        intens: '',
        timeRange: '',
        exerKind: '',
          }
      
    },
   
    created() {
      this.checkThisPage()
      this.submitForm()
      this.getSportsKind()
      this.getIntens()
      this.getTime()
      this.getExer()
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
       pageReset(){
         this.paging.page = 1
       },
       isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 13
            }).filter(item => {
                return item.authDivision === 'CU'
            }).length
           if(x > 0) {
               
               return true
           } else {
               return false
           }
       },
      getSportsKind(){
        GetPurposeCategory()
        .then(response => {
          this.sportsKind = response.results
        })
      },
      getIntens() {
            GetIntensityCd()
            .then(response => {
                this.intens = response.results
            })
        },
      getExer(){
       GetExerKind()
            .then(response => {
              this.exerKind = response.results
              this.exerSelect = this.exerKind[0].id
          }).catch(response => {
              this.fetchSuccess = false
              console.log(response)
          })
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
        var data = {search:this.search, paging: this.paging}
        
        orGetSpts(data)
            .then(response => {
              this.commit()
              this.results = response.results
              this.paging = response.paging
              this.loading = false
          }).catch(response => {
              this.fetchSuccess = false
          })
        },
        getTime() {
                GetTimeRange()
                .then(response => {
                    this.timeRange = response.results
                })
            },
        editIsActive(active, id) {
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
          var data = {themeId: id , isActive : isActive}
          editIsActive(data)
          .then(response => {
            this.submitForm()
          })
        },
        resetBtn() {
          this.search = {
            id: null,
            name: '',
            exerKindCateId: null,
            intensityCd: null,
            purposeCateId: null,
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
        
        },
        computed: {
    ...mapGetters([
      'roles',
      
    ])
  }
  }

</script>