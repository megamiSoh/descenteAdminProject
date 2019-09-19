<template>
<div class="memberL" id="vList">
  <h1>{{listName}}</h1>
  <div label="Main 운동 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" label-width="120px" @submit.prevent="getMain" method="post" class="searchBoxStyle">
    <el-form size="mini" :inline="true">
        <el-form-item label="검색 기간" :model="search">
        <el-col class="searc_d">
          <el-select v-model="search.searchColumn">
            <el-option label="전체" :value='null'>
            </el-option>
            <el-option label="등록일" value="CreateDate">
            </el-option>
          </el-select>
        </el-col>
    </el-form-item>
    <el-form-item>
          <el-col>
          <el-date-picker type="date" v-model="search.startDate" style="width: 100%; margin-right: 10px;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker>   
        </el-col>
    </el-form-item>
    <el-form-item>
        <el-col>
          <el-date-picker type="date" v-model="search.endDate" style="width: 100%;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker> 
        </el-col>
      </el-form-item>
    </el-form>
    <el-form size="mini" :inline="true">
        <!-- 운동 분류 -->
      <el-form-item label="운동 분류">
        <el-col>
         <el-select v-model="search.actExerKindCateId">
            <el-option label="전체" :value="null"></el-option>
            <el-option :label="exerKind.name" :value="exerKind.id"  v-for="exerKind in actExerResults" :key="exerKind.id">
            </el-option>
          </el-select>
          </el-col>
    </el-form-item>
      <!-- 주동근 부위 / 세부 -->
      <el-form-item label="주동근 부위/세부" >
            <el-col :span="28" >
                  <el-select v-model="muscleAreaCateId"  @change="searchDepth(true)">
                    <el-option label="전체" :value="null">
                    </el-option>
                    <el-option :label="muscle.name" :key="muscle.name"  v-for="muscle in muscleResults" :value="muscle.id" >
                    </el-option>
                  </el-select>
                  <div v-if="muscleAreaCateId=== 0"></div>
                   <el-select v-model="muscleAreaCateId1" v-else  :disabled="muscleAreaCateId === null ? true: false" placeholder="선택해 주세요." @change="searchDepth(false)">
                    <div v-for="muscle1 in muscleResults" v-if="muscleAreaCateId === muscle1.id">
                      <el-option v-for="muscle2 in muscle1.childens" :key="muscle2.name" :label="muscle2.name" :value="muscle2.id">
                      </el-option>
                    </div>
                </el-select>
            </el-col>
      </el-form-item>
    </el-form>
    <el-form size="mini" :inline="true">
        <!-- 운동 강도 -->
       <el-form-item label="운동 강도">
            <el-col>
            <el-select v-model="search.intensityCd" >
                <el-option label="전체" :value="null"></el-option>
                <el-option v-for="lists in intens" :label="lists.name" :value="lists.key" :key="lists.key">
                </el-option>
            </el-select>
            </el-col>
        </el-form-item>
      </el-form-item>
      <!-- 촬영모델 -->
       <el-form-item label="촬영 모델">
            <el-col>
            <el-select  v-model="search.photoModelId">
                <el-option label="전체" :value="null"></el-option>
                <el-option v-for="lists in model" :label="lists.name" :value="lists.id" :key="lists.id">
                </el-option>
            </el-select>
            </el-col>
        </el-form-item>
      </el-form-item>
      <!--족부압 데이터-->
       <el-form-item label="족부압 데이터">
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
      </el-form-item>
    </el-form>
      <!--상태-->
    <el-form size="mini" :inline="true">
        <el-form-item label="상태">
            <el-col>
            <el-select v-model="search.isActive">
                <el-option label="전체" :value="null">
                </el-option>
                <el-option label="활성화" :value="true">
                </el-option>
                <el-option label="비활성화" :value="false">
                </el-option>
            </el-select>
            </el-col>
        </el-form-item>
      </el-form-item>
        <!--운동 명칭-->
      <el-form-item label="운동 명칭">
        <el-col>
          <el-input  :maxlength="30" v-model="search.name" placeholder="운동 명칭 입력">
           
          </el-input>
        </el-col>
      </el-form-item>
    </el-form>
      <!--code-->
    <el-form size="mini" :inline="true">
        <el-form-item label="코드">
        <el-col>
          <el-input :maxlength="10" v-model="searchid" type="number" placeholder="코드 입력">
         <!-- memberButton -->   
          </el-input>
        </el-col>
        </el-form-item>
        <el-form-item class="member_btn_wrap">
        <el-col class="member_btn">
            <el-button type="info" icon="el-icon-search" @click="getMain(); pageReset()" size="mini">검색</el-button>
             <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
        </el-col>
        </el-form-item>
      
    </el-form>
    </el-form>
    <div class="register_warm" v-loading="loading">
    <div class="button_space_bottom">
        <router-link v-bind:to="{ path: 'mainlist/mainregist' }" v-if="isAuth()">
            <el-button plain type="primary" size="small">신규 등록</el-button>
        </router-link>
        <span class="search_number" v-model="results">검색 결과 수 : {{  paging.totalRecords }}</span>
    </div>
     
     <table class="el-table" stripe :data="results" :model="results" >
        <thead class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>Code</th>
                <th>운동분류</th>
                <th>운동명칭</th>
                <th>주동근 부위</th>
                <th>주동근 세부 </th>
                <th>운동강도</th>
                <th>촬영모델</th>
                <th>족부압 데이터</th>
                <th>등록일</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
            <tr v-for="(entry, key) in results" :key="results.id" @click="goDetail(entry.id)" :class="entry.isActive? '':'activeColor'">
                <router-link tag="td" v-bind:to="{path:'mainlist/maindetail' }">
                {{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</router-link>
                <router-link tag="td" v-bind:to="{path:'mainlist/maindetail' }">
                0000{{entry.id}}</router-link>
                <router-link tag="td" v-bind:to="{path:'mainlist/maindetail' }">
                {{entry.exerKindCateName}}</router-link>
                <router-link tag="td" v-bind:to="{path:'mainlist/maindetail' }">
                {{entry.name}}</router-link>
                <router-link tag="td" v-bind:to="{path:'mainlist/maindetail' }">
                {{entry.muscleAreaParentCateName}}</router-link>
                <router-link tag="td" v-bind:to="{path:'mainlist/maindetail' }">
                {{entry.muscleAreaCateName}}</router-link>
                <router-link tag="td" v-bind:to="{path:'mainlist/maindetail' }">

                    <span v-if="entry.intensityCd==='LS' ">하</span>
                    <span v-if="entry.intensityCd==='MS' ">중</span>
                    <span v-if="entry.intensityCd==='HS' ">상</span>
                </router-link>
                <router-link tag="td" v-bind:to="{path:'mainlist/maindetail' }">
                {{entry.photoModelName}}</router-link>
                <router-link tag="td" v-bind:to="{path:'mainlist/maindetail' }" >{{entry.isFootPressure ? '예' : '아니오'}}</router-link>
                <router-link tag="td" v-bind:to="{path:'mainlist/maindetail' }">
                {{entry.createDateString}} </router-link>
                <td>
                    <span v-if="isAuth()">
                        <el-button type="success" size="small" plain @click="getActive(entry.isActive, entry.id)" v-if="entry.isActive">활성화</el-button>
                        <el-button type="info" size="small" plain @click="getActive(entry.isActive, entry.id)" v-else>비활성화</el-button>
                    </span>
                    <span v-else>
                    {{entry.isActive ? '활성화' : '비활성화'}}
                    </span>
                </td>
            </tr>
            <tr v-model="noResults" v-if="noResults === '' ? false: true">
              <td colspan="11" class="noResults">{{noResults}}</td>
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
import { mainActive, getMain, getMuscleArea, getExerKind, getIntensity, getModel } from '@/api/exercise'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    name: "vList",
    data() {
      return {
          listName: 'Main 운동 리스트',
          loading: false,
        search: {
            id: 0,
            name: '',
            actExerKindCateId: null,
            muscleAreaCateId: null,
            muscleAreaCateDepth: null,
            intensityCd: null,
            photoModelId:null,
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
        results: null,
        list: null,
        listLoading: true,
        entry: null,
        actExerResults: null,
        muscleResults: null,
        selected: '',
        selected1: '',
        noResults: '',
        intens: '',
        intensValue: '',
        model:'',
        editActive:'',
        resultLen: '',
        fullscreenLoading: false,
        listShape: false,
        muscleAreaCateId1: '',
        muscleAreaCateId: null,
        searchid: '',
          }
    },
   
    created() {
      this.checkThisPage()
      this.getMain()
      this.getActExer()
      this.getMuscle()
      this.getIntens()
      this.getModel()
      this.isAuth()
    },
     methods: {
         checkThisPage(){
         if(this.$store.state.example.list === this.listName) {
          this.search = this.$store.state.example.search
          this.paging = this.$store.state.example.paging
          this.searchid = this.search.id
         } else {
           this.$store.commit('search', '')
            this.$store.commit('paging', '')
            this.$store.commit('list', '')
         }
        
       },
       commit(){
           this.search.id = this.searchid
         this.$store.commit('search', this.search)
        this.$store.commit('paging', this.paging)
        this.$store.commit('list', this.listName)
       },
         isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 8
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
          this.getMain();
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.commit()
              this.getMain();
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.commit()
              this.getMain();
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
    //    whatDis() {
    //      this.search.muscleAreaCateDepth= null
         
    //    },
       searchDepth(val){
           if(val === true) {
               this.search.muscleAreaCateDepth = 1
               this.search.muscleAreaCateId = this.muscleAreaCateId
               this.muscleAreaCateId1 = ''
           } else {
               this.search.muscleAreaCateDepth = 2
                this.search.muscleAreaCateId = this.muscleAreaCateId1
           }
       },
       getActive(val, val1) {
            if(val === true) {
                this.editActive = false
                 this.$message({
                    message: '비활성화 처리 되었습니다.',
                    type: 'info'
                });
            } else {
                this.editActive = true
                 this.$message({
                    message: '활성화 처리 되었습니다.',
                    type: 'success'
                });
            }
            var data = {actionId: val1, isActive: this.editActive}
            mainActive(data)
           .then(response => {
               this.getMain()
           })
       },
       getMain() {
        this.loading = true
        // var self = this;
        var data = {search:this.search, paging: this.paging}
        getMain(data)
            .then(response => {
              this.results = response.results
              this.paging = response.paging
              this.commit()
              this.loading = false
              this.resultLen = this.results.length
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
        pageReset(){
            this.paging.page = 1
            this.search.id = this.searchid
        },
        getMuscle() {
        this.listLoading = true
        getMuscleArea()
            .then(response => {
              this.muscleResults = response.results
              this.listLoading = false
          }).catch(response => {
              this.fetchSuccess = false
              console.log(response)
          })
        },
        getActExer() {
        this.listLoading = true
        getExerKind()
            .then(response => {
              this.actExerResults = response.results
              this.listLoading = false
          }).catch(response => {
              this.fetchSuccess = false
              console.log(response)
          })
        },
        getIntens() {
            getIntensity()
            .then(response => {
                this.intens = response.results
            })
        },
        getModel() {
        var u = null;
        getModel(u)
          .then(response => {
          this.model = response.results
        })
      },
     
        resetBtn() {
          this.search = {
            id: 0,
            name: '',
            actExerKindCateId: null,
            muscleAreaCateId: null,
            muscleAreaCateDepth: null,
            intensityCd: null,
            photoModelId:null,
            isFootPressure: null,
            isActive: null,
            searchColumn: null,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
            }
            this.searchid = ''
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