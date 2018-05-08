<template>
<div class="memberL" id="vList">
  <h1>{{listName}}</h1>
  <div label="테마 분류 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" label-width="120px" @submit.prevent="submitForm" method="post" class="searchBoxStyle">
      <el-form size="mini" :inline="true">
        <el-form-item label="상태">
        <el-col :model="search">
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
        <!--테마 분류 명-->
        <el-form-item label="테마분류 명">
            <el-col>
                <el-input v-model="search.name" placeholder="테마분류명 입력"></el-input>
            </el-col>
        </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="Code">
       <el-col>
        <el-input v-model="search.id" type="number" placeholder="코드 입력"></el-input>
       </el-col>
        </el-form-item>  
      <el-form-item class="member_btn_wrap">        
        <el-col class="member_btn">
            <el-button type="info" icon="el-icon-search" @click="submitForm();commit()" size="mini">검색</el-button>
             <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
        </el-col>
        </el-form-item>
      </el-form>
    </el-form>
    <div class="register_warm" v-loading ="loading">
      <router-link  :style="{ cursor: 'pointer'}"  v-bind:to="{ path: 'themeregist' }" v-if="isAuth()"> 
        <el-button plain type="primary" size="small" class=" button_space_bottom">신규 등록</el-button>
      </router-link>
        <span class="search_number" v-model="results">검색 결과 수 : {{  paging.totalRecords }}</span>
     
     <table class="el-table" stripe :data="results" :model="results" >
     <colgroup>
        <col  width="100" />
        <col  width="200" />
        <col  />
        <col width="150" />
        <col  width="200" />
      </colgroup>
        <thead class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>Code</th>
                <th>테마 분류 명</th>
                <th>리스트 메뉴<br> 이미지 미리보기</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable" style="pointer: cursor;">
        <tr v-for="(entry, key) in results" :key="results.id" @click="goDetail(entry.id)" :class="entry.isActive ?'': 'activeColor'">
             <router-link  :style="{ cursor: 'pointer'}"  tag="td" v-bind:to="{ path: 'settingdetail' }">
                {{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}
             </router-link>
             <router-link  :style="{ cursor: 'pointer'}"  tag="td" v-bind:to="{ path: 'settingdetail' }">
                0000{{entry.id}}
             </router-link>
             <router-link  :style="{ cursor: 'pointer'}"  tag="td" v-bind:to="{ path: 'settingdetail' }">
                {{entry.name}}
             </router-link>
            <td v-for="item in entry.files"> 
                <el-button  @click="dialogTableVisible = true; showImg(item.logicalPath)" size="mini" type="text">링크</el-button>
                <el-dialog title="이미지 미리보기" :visible.sync="dialogTableVisible">
                    <img :src="showImage" style="width: 100%">
                </el-dialog>
            </td>
            <td>
               <span v-if="isAuth()">
                 <el-button type="success" size="small" plain style="width: 85px;" v-if="entry.isActive"  @click="activeBtn(entry.id,entry.isActive)" >
                활성화</el-button>
                <el-button type="info" size="small" plain style="width: 85px;" v-else @click="activeBtn(entry.id,entry.isActive)" >
                비활성화</el-button>
               </span>
               <span v-else>
                {{entry.isActive ? '활성화':'비활성화'}}
               </span>
            </td>
        </router-link>
            <tr v-model="noResults" v-if="noResults === '' ? false: true">
              <td colspan="11" class="noResults">{{noResults}}</td>
            </tr>
        </tbody>
    </table>
    
  </div>
    <nav class="text-sm-center">
      <ul class="pagination" id="searchPager">
          <li class="page-item">
              <a class="page-link" @click="prevPage()">
                  &lt;
              </a>
          </li>

          <li v-for="pageobj in paging.totalPages" class="page-item page-num" v-bind:class="{active:pageobj==paging.page}" v-if="checkPage(pageobj)">
              <a class="page-link" @click="movePage(pageobj)">
                  {{pageobj}}
              </a>
          </li>

          <li class="page-item">
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
import { mapGetters } from 'vuex'
import { themeActive, GetThemeKinds } from '@/api/settings'
import axios from 'axios'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import 'expose-loader?$!expose-loader?jQuery!jquery'
  export default {
    name: "vList",
    data() {
      return {
        listName: '테마 분류 리스트',
        search: {
            id: '',
            name: '',
            isActive: null
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
        Loading: true,
        entry: null,
        noResults: '',
        active: '',
        resultLen: '',
        dialogTableVisible: false,
        showImage: '',
          }
      
    },
   
    created() {
    this.checkThisPage()
      this.submitForm()
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
         var x = this.roles.filter(item => {
                return item.menuId === 19
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
          this.submitForm()
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.submitForm()
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.submitForm()
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
       submitForm() {
        this.loading = true
        // var self = this;
     
        var data = {search:this.search, paging: this.paging, userId: this.name}
        
        GetThemeKinds(data)
            .then(response => {
            this.commit()
            this.loading = false
              this.results = response.results
              this.paging = response.paging
              this.resultLen = this.results.length
              this.listLoading = false
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
        resetBtn() {
          this.search = {
            id: '',
            name: '',
            isActive: null
            }
        },
        goDetail(id) {
                localStorage.setItem('id', id);
            },
        activeBtn(val, isActive) {
        if(isActive === true) {
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
          var id = val
          var data = { themeKindId: id, isActive: active}
         themeActive(data)
          .then(response => {
            this.submitForm()
          })
        }
        },
        computed: {
    ...mapGetters([
            'roles'
        ])
    }
  }

</script>
