<template>
<div class="memberL" id="vList">
  <h1>{{listName}}</h1>
  <div label="회원 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" label-width="120px" @submit.prevent="getWarm" method="post" class="searchBoxStyle">
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
            <el-date-picker type="date" placeholder="Pick a date" v-model="search.startDate" style="width: 100%; margin-right: 10px;" :clearable="false" :disabled = "search.searchColumn === null"></el-date-picker>   
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col>
            <el-date-picker type="date" placeholder="Pick a date" v-model="search.endDate" style="width: 100%;" :clearable="false" :disabled = "search.searchColumn === null"></el-date-picker> 
        </el-col>  
      </el-form-item>
      </el-form>
      <!-- 웜업 부위 -->
      <el-form size="mini" :inline="true">
        <el-form-item label="웜업 부위">
        <el-col>
         <el-select v-model="search.warmUpCateId">
            <el-option label="전체" :value="null"></el-option>
            <el-option :label="warmparts.name" v-for="warmparts in warmPartResults" :value="warmparts.id" :key="warmparts.id" >
            </el-option>
          </el-select>
          </el-col>
          </el-form-item>
            <el-form-item label="상태">
              <el-col>
                  <el-select v-model="search.isActive">
                      <el-option label="전체" :value="null" placeholder="전체">
                      </el-option>
                      <el-option label="활성화" :value="true">
                      </el-option>
                      <el-option label="비활성화" :value="false">
                      </el-option>
                  </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="촬영 모델">
            <el-col>
            <el-select v-model="search.photoModelId" placeholder="촬영 모델" >
                <el-option label="전체" :value="null"></el-option>
                <el-option :label="model.name"  v-for="model in modelResults" :value="model.id" :key="model.name">
              </el-option>
            </el-select>
            </el-col>
        </el-form-item>
      </el-form>
      
      <!-- 웜업명칭 -->
     <el-form size="mini" :inline="true">
       <el-form-item label="웜업 명칭">
        <el-col>
          <el-input :maxlength="30" v-model="search.name" placeholder="웜업명칭 입력">
           
          </el-input>
        </el-col>
      </el-form-item>
      <!--code-->
       <el-form-item label="코드">
        <el-col>
          <el-input :maxlength="10"  type="number"  v-model="searchid"  placeholder="코드 입력">
           
          </el-input>
        </el-col>
        </el-form-item>
        <el-form-item class="member_btn_wrap">
        <el-col class="member_btn">
            <el-button type="info" icon="el-icon-search" @click="getWarm(); pageReset(); " size="mini" >검색</el-button>
             <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
           </el-col>
          </el-form-item>
     </el-form>
       
      
    </el-form>
    </div>
    <div class="register_warm" v-loading="loading">
    <div class="button_space_bottom">
      <router-link v-bind:to="{ path: 'warmup/warmregist' }"  v-if="isAuth()">
        <el-button plain type="primary" size="small">신규 등록</el-button>
    </router-link>
        <span class="search_number"  >
        검색 결과 수 : {{  paging.totalRecords }}</span>
    </div>
     
     <table class="el-table" stripe :data="results" :model="results" >
        <thead class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>Code</th>
                <th>웜업 명칭</th>
                <th>웜업 부위</th>
                <th>촬영 모델</th>
                <th>등록일</th>
                <th>이미지<br>미리보기</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody class="el-table-column  listTable">
            <tr v-for="(entry, key) in warmResults" :key="warmResults.id"  @click="goDetail(entry.id)"  :class="entry.isActive? '': 'activeColor'" disabled>
                <router-link tag="td" v-bind:to="{path: 'warmup/warmdetail'}">{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'warmup/warmdetail'}">0000{{entry.id}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'warmup/warmdetail'}">{{entry.name}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'warmup/warmdetail'}">{{entry.warmUpCateName}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'warmup/warmdetail'}">{{entry.photoModelName}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'warmup/warmdetail'}">{{entry.createDateString}}</router-link>
                <td>
                  <span  v-for="(item , index) in entry.thumbnailImage">
                      <el-button type="text" @click="dialogTableVisible = true; showImg(item.logicalPath, index)" size="small">링크</el-button>
                      <el-dialog title="이미지 미리보기" :visible.sync="dialogTableVisible">
                        <img :src = 'showImage' style="width: 100%;"/>
                      </el-dialog>
                    </span>
                </td>
                <td>
                  <span v-if="isAuth()">
                      <el-button type="success" size="small" plain @click="isActive(entry.id, entry.isActive)" v-if="entry.isActive">활성화</el-button>
                    <el-button type="info" size="small" plain @click="isActive(entry.id, entry.isActive)" v-else>비활성화</el-button>
                  </span>
                  <span v-else>
                  {{entry.isActive? '활성화': '비활성화'}}
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
import { warmPart, getModel, getWarm, EditIsAcive } from '@/api/exercise'
import { mapGetters } from 'vuex'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    name: "vList",
    data() {
      
      return {
        listName: '웜업 리스트',
         search: {
            id: 0,
            name: '',
            warmUpCateId: null,
            isActive: null,
            photoModelId:null,
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
        entry: null,
        modelResults: null,
        warmResults: null,
        noResults: '',
        selected: '',
        selected1: '',
        warmPartResults: '',
        leng: '',
        totalWarm: '',
        dialogTableVisible: false,
        media: '',
        showImage:'',
        loading: false,
        searchid: '',
          }
      
    },
   
    created() {
      this.checkThisPage()
      this.getModel()
      this.getWarm()
      this.warmPart()
      this.isAuth()
    },
     methods: {
        checkThisPage(){
         if(this.$store.state.example.list === this.listName) {
          this.searchid = this.search.id
          this.search = this.$store.state.example.search
          this.paging = this.$store.state.example.paging
          
         } else {
           this.$store.commit('search', '')
            this.$store.commit('paging', '')
            this.$store.commit('list', '')
         }
        
       },
       commit(){
        // this.searchid = this.search.id
         this.$store.commit('search', this.search)
        this.$store.commit('paging', this.paging)
        this.$store.commit('list', this.listName)
       },
       isAuth(){
          var x = this.roles.filter(item => {
                return item.menuId === 7
            }).filter(item => {
                return item.authDivision === 'CU'
            }).length
           if(x > 0) {
               
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
          this.commit()
          this.getWarm();
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.commit()
              this.getWarm();
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.commit()
              this.getWarm();
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
       warmPart() {
        var data = null
          warmPart(data)
          .then(response => {
            this.warmPartResults = response.results
          }).catch(response => {
            console.log(response)
          })
        },
       getWarm() {
         this.loading = true
         var warm = {search: this.search, paging: this.paging}
          getWarm(warm)
          .then(response => {
            this.loading = false
            this.commit()
            this.warmResults = response.results
            this.paging = response.paging
            this.midia = response.warmupMedia
            this.totalWarm = this.warmResults.length
            if(this.warmResults.length === 0) {
                  return this.noResults = '검색결과가 없습니다.'
              } else {
                return this.noResults = ''
              }
          }).catch(response => {
            console.log(response)
          })
        },
        pageReset(){
          this.paging.page = 1
          // this.search.id = this.searchid
        },
       getModel() {
        var data = null
         getModel(data)
          .then(response => {
            this.modelResults = response.results
          }).catch(response => {
            console.log(response)
          })
        },
        isActive(val, val1) {
          if(val1 === true) {
           var active = false
            this.$message({
            message: '비활성화 처리 되었습니다.',
            type: 'info'
        });
          } else {
            var active = true
             this.$message({
            message: '활성화 처리 되었습니다.',
            type: 'success'
        });
          }
          var data = {actionId: val, isActive: active}
         EditIsAcive(data)
          .then(response => {
           this.getWarm()
          })
        },
        resetBtn() {
          this.search = {
            id: 0,
            name: '',
            warmUpCateId: null,
            isActive: null,
            photoModelId:null,
            searchColumn: null,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() ),
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