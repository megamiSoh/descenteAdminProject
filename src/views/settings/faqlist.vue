<template>
<div class="memberL" id="vList">
  <h1>{{listName}}</h1>
  <div label="FAQ 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" label-width="120px" @submit.prevent="submitForm" method="post" class="searchBoxStyle">
      <el-form size="mini" :inline="true">
        <el-form-item label="검색 기간">
        <el-col :model="search">
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
            <el-date-picker type="date" placeholder="Pick a date" v-model="search.startDate" style="width: 100%;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-col>
            <el-date-picker type="date" placeholder="Pick a date" v-model="search.endDate" style="width: 100%;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker>  
        </el-col>
      </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="분류" class="el-form-style">
            <el-select v-model="search.division">
                <el-option label="전체" :value="null"></el-option>
                <el-option v-for="item in selects" :key="item.key" :value="item.key" :label="item.name"></el-option>
            </el-select>
      </el-form-item>
      <!-- memberId -->
      <el-form-item label="FAQ 제목" class="el-form-style">
        <el-col>
          <el-input v-model="search.title" :maxlength="10" placeholder="FAQ제목 입력"></el-input>
        </el-col>
      </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="CODE">
        <el-col>
          <el-input v-model="search.id" :maxlength="10" placeholder="코드 입력">
           
          </el-input>
          <!-- memberCode -->
        </el-col>
        </el-form-item>
        <el-form-item class="member_btn_wrap">
        <el-col class="member_btn">
            <el-button type="info" icon="el-icon-search" @click="submitForm();pageReset()" size="mini">검색</el-button>
             <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
        </el-col>
        </el-form-item>
      
      </el-form>
    </el-form>
     
    <div class="searchResult" v-loading="loading">
    <span style="display: width: 45%; float: left; display: block;">
    <router-link v-bind:to="{ path: 'faqregist' }" v-if="isAuth()">
        <el-button plain type="primary" size="small" class=" button_space_bottom">신규 등록</el-button>
    </router-link>
    </span>
    <span class="search_number">검색 결과 수 : {{  paging.totalRecords }}</span>
    
     <table class="el-table" stripe :data="results" :model="results" >
      <colgroup>
        <col  width="100" />
        <col  width="200" />
        <col  width="200" />
        <col width="350" />
        <col  width="200" />
        <col />
      </colgroup>
        <thead class="el-table-column  listTableHead">
            <tr>
                <th>No</th>
                <th>Code</th>
                <th>분류</th>
                <th>FAQ제목</th>
                <th>등록일</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody class="listTable el-table-column">
            <tr v-for="(entry, key) in results" v-bind:key="results.id" @click="goDetail(entry.id)" :class="entry.isActive? '': 'activeColor'" >
                <router-link  tag="td" v-bind:to="{path: 'faqlist/faqdetail'}">{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</router-link>
                <router-link  tag="td" v-bind:to="{path: 'faqlist/faqdetail'}">0000{{entry.id}}</router-link>
                <router-link  tag="td" v-bind:to="{path: 'faqlist/faqdetail'}">{{entry.faqDivisionNm}}</router-link>
                <router-link  tag="td" v-bind:to="{path: 'faqlist/faqdetail'}">{{entry.title}}</router-link>
                <router-link  tag="td" v-bind:to="{path: 'faqlist/faqdetail'}">{{entry.createDate}}</router-link>
                <td>
                   <span v-if="isAuth()">
                     <el-button type="success" v-if="entry.isActive" size="small" plain @click="getActive(entry.id, entry.isActive)"> 활성화</el-button>
                    <el-button type="info" v-else size="small" plain @click="getActive(entry.id, entry.isActive)">비활성화</el-button>
                   </span>
                   <span v-else>{{entry.isActive ? '활성화' : '비활성화'}}</span>
                </td>
            </tr>
            <tr v-if="paging.totalRecords <= 0">
                <td colspan="6">검색결과가 없습니다.</td>  
            </tr>
        </tbody>
    </table>
    
  </div>
  <nav style="text-align: center;">
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
import { GetFaqs, GetFaqDivision, faqActive } from '@/api/settings'
import axios from 'axios'
import { mapGetters } from 'vuex'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import Ckeditor from 'vue-ckeditor2'
import { router } from '@/router'

  export default {
    components: { Ckeditor },
    data() {
       return{
        listName: 'FAQ 리스트',
        search: {
            id: '',
            title: '',
            isActive: null,
            division: null,
            searchColumn: null,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
      },
      paging: {
          page: 1,
          pageSize: 10,
          totalPages: 0,
          totalRecodes: 0,
          orderBy: 'id',
          ascending: false
      },
      results: '',   
      selects: '',
      loading: true,
      dialogTableVisible: false,
      resultsLen: '',
      config: {
        height: 300,
        readOnly : true,
        removePlugins: 'dragdrop,basket',
            extraPlugins: 'uploadimage,uploadfile',
            removeButtons: 'Copy',
            filebrowserBrowserUrl: 'http://localhost:9528/api/upload',
            filebrowserUploadUrl: 'http://localhost:59670/api/upload'
      },
       }
    },
   
    created() {
    this.checkThisPage()
     this.submitForm();
    this.getSelects()
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
                return item.menuId === 18
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
          this.submitForm();
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.submitForm();
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.submitForm();
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
      pageReset(){
          this.paging.page = 1
      },
      submitForm() {
          this.loading = true
          var data = {search: this.search, paging: this.paging}
          GetFaqs(data)
          .then(response => {
              this.commit()
              this.loading = false
              this.results = response.results
              this.paging = response. paging
            //   this.resultsLen = this.results.length
          })
      },
      getSelects(){
          GetFaqDivision()
          .then(response => {
              this.selects = response
          })
      },
      getActive(id, active){
        var id = id;
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
        var data = {faqId : id, isActive: isActive}
       faqActive(data)
        .then(response => {
            this.submitForm()
        })
      },
        resetBtn() {
          this.search = {
                 id: '',
                title: '',
                isActive: null,
                division: null,
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