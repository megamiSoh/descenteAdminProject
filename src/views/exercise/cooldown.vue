<template>
<div class="memberL" id="vList">
  <h1>{{listName}}</h1>
  <div label="Main 운동 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" label-width="120px" @submit.prevent="getCool" method="post" class="searchBoxStyle">
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
        <!--검색 날짜 -->
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
        <!--쿨다운 명칭-->
      <el-form size="mini" :inline="true">
        <el-form-item label="쿨다운 명칭">
        <el-col>
          <el-input :maxlength="30" v-model="search.name" placeholder="쿨다운 명칭 입력">
           
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="코드">
        <el-col>
          <el-input :maxlength="10" v-model="searchid" type="number" placeholder="코드 입력">
          </el-input>
        </el-col>
        </el-form-item>
      </el-form>
      <!--code-->
       <el-form size="mini" :inline="true">
        <el-form-item label="촬영모델">
         <el-select v-model="search.photoModelId">
            <el-option label="전체" :value="null"></el-option>
            <el-option v-for="lists in model" :key="lists.id" :value="lists.id" :label="lists.name">
            </el-option>
          </el-select>
          </el-form-item>
         <!-- memberButton -->   
         <el-form-item class="member_btn_wrap">        
          <el-col class="member_btn">
              <el-button type="info" icon="el-icon-search" @click="getCool(); pageReset();commit()" size="mini">검색</el-button>
              <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
          </el-col>
       </el-form-item>
       </el-form>
    </el-form>
    <div class="register_warm" v-loading="loading">
    <div class="button_space_bottom">
      <router-link v-bind:to="{ path: 'cooldown/coolregist' }" v-if="isAuth()">
        <el-button plain type="primary" size="small">신규 등록</el-button>
      </router-link>
          <span class="search_number">검색 결과 수 : {{  paging.totalRecords }}</span>
    </div>
     
     <table class="el-table" stripe :data="results" :model="results" >
     <colgroup>
      <col width="50" />
      <col width="100" />
      <col width="300" />
      <col width="150" />
      <col width="100" />
      <col width="100" />
     </colgroup>
        <thead class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>Code</th>
                <th>쿨다운 명칭</th>
                <th>촬영모델</th>
                <th>등록일</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
            <tr v-for="(entry, key) in results" :key="results.id" @click="goDetail(entry.id)" :class="entry.isActive? '':'activeColor'">
                <router-link tag ="td" v-bind:to="{path: 'cooldown/cooldetail' }">{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</router-link>
                <router-link tag ="td" v-bind:to="{path: 'cooldown/cooldetail' }">0000{{entry.id}}</router-link>
                <router-link tag ="td" v-bind:to="{path: 'cooldown/cooldetail' }">{{entry.name}}</router-link>
                <router-link tag ="td" v-bind:to="{path: 'cooldown/cooldetail' }">{{entry.photoModelName}}</router-link>
                <router-link tag ="td" v-bind:to="{path: 'cooldown/cooldetail' }">{{entry.createDateString}} </router-link>
                <td>
                  <span v-if="isAuth()">
                    <el-button type="success" size="small" plain @click="editsActive(entry.isActive, entry.id)" v-if="entry.isActive"> 활성화</el-button>
                  <el-button type="info" size="small" plain @click="editsActive(entry.isActive, entry.id)" v-else >비활성화</el-button>
                  </span>
                  <span v-else>
                  {{entry.isActive ? '활성화':'비활성화'}}
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
import { getCool, coolActive, getModel} from '@/api/exercise'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    name: "vList",
    data() {
      return {
        listName: '쿨다운 리스트',
          searchid: '',
         search: {
          id: 0,
          isActive: null,
          photoModelId: null,
          name: null,
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
        entry: null,
        noResults: '',
        model: '',
        pModel: '',
        editActive: '',
        resultRen: '',
        loading: true,
          }
      
    },
   
    created() {
      this.checkThisPage()
      this.getCool()
      this.getModel()
      this.isAuth()
    },
     methods: {
       checkThisPage(){
         if(this.$store.state.example.list === this.listName) {
    
          this.search = JSON.parse(this.$store.state.example.search)
          this.paging = JSON.parse(this.$store.state.example.paging)
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
        pageReset(){
          this.search.id = this.searchid
          this.paging = {
          page: 1,
          pageSize: 20,
          totalPages: 1,
          totalRecords: 1,
          orderBy: 'id',
          ascending: false
        }
        },
       isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 9
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
          this.getCool();
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.commit()
              this.getCool();
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.commit()
              this.getCool();
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
       getCool() {
        this.loading = true
        var data = {search:this.search, paging: this.paging}
        getCool(data)
            .then(response => {
              this.results = response.results
              this.paging = response.paging
              this.loading = false
              this.resultRen = this.results.length
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
        editsActive(val, val1){
          
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
            
          var data = {actionId: val1, isActive: this.editActive }
          coolActive(data)
          .then(response => {
            this.getCool()
          })
        },
        resetBtn() {
          this.search = {
            id: 0,
          isActive: null,
          photoModelId: null,
          name: null,
          searchColumn: null,
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          endDate: new Date()
            }
          this.searchid = ''
        },
       getModel() {
        var u = null;
        getModel(u)
          .then(response => {
          this.model = response.results
        })
      },
      goDetail(val) {
        localStorage.setItem('id', val)
      }  
      },
      computed: {
    ...mapGetters([
      'roles',
      
    ])
  } 
  }

</script>
