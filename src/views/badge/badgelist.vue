<template>
<div class="memberL" id="vList">
  <h1>{{listName}}</h1>
  <div label="뱃지 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" label-width="120px" @submit.prevent="submitForm" method="post" class="searchBoxStyle">
    <el-form size="mini" :inline="true">
        <el-form-item label="상태">
        <el-col>
          <el-select v-model = "search.isActive">
            <el-option label="전체" :value="null">
            </el-option>
            <el-option label="활성화" value="true">
            </el-option>
            <el-option label="비활성화" value="false">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      
      <!-- 배지명칭 -->
      <el-form-item label="배지명칭">
        <el-col>
          <el-input :maxlength="15" v-model="search.name" placeholder="배지 명칭 입력"></el-input>
        </el-col>
      </el-form-item>
      <!--습득조건-->
      <el-form-item label="습득조건">
        <el-col>
          <el-input :maxlength="10" v-model="search.description" placeholder="습득조건 입력"></el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <el-form size="mini" :inline="true">
        <el-form-item label="등록자">
        <el-col>
          <el-input :maxlength="10" v-model="search.userName" placeholder="등록자 입력"></el-input>
          </el-col>
      </el-form-item>
        <el-form-item class="member_btn_wrap">  
        <el-col class="member_btn">
          
            <el-button type="info" icon="el-icon-search" @click="getBadge(); commit()" size="mini">검색</el-button>
            <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
        </el-col>
        </el-form-item>
    </el-form>
    </el-form>
     <div class="register_admin" v-loading="loading">
     <div>
        <router-link v-bind:to="{path: 'badgelist/badgeregist'}" v-if="isAuth()">
            <el-button type="primary" plain size="small" class=" button_space_bottom">신규 등록</el-button>
        </router-link>
        <span class="search_number"> 검색 결과 수 : {{ paging.totalRecords }}</span>
     </div>
        
           
     
     <table class="el-table" stripe>
        <thead class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>배지 명칭</th>
                <th>습득 조건</th>
                <th>상태</th>
                <th>등록자</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
            <tr  v-for="(entry, key) in badge" :key="badge.id" @click="goAdmin(entry.id)" class="tablestyle" :class="entry.isActive? '': 'activeColor'">
              <router-link tag="td" v-bind:to="{path: 'badgelist/badgedetail'}">{{((paging.totalRecords + 1) - (paging.page - 1) * paging.pageSize) - key++}}</router-link>
              <router-link tag="td" v-bind:to="{path: 'badgelist/badgedetail'}">{{ entry.name }}</router-link>
              <router-link tag="td" v-bind:to="{path: 'badgelist/badgedetail'}">{{ entry.description}}</router-link>
              <td>
                <span v-if="isAuth()">
                    <el-button type="success" size="small" plain v-if="entry.isActive === true" @click="getActive(entry.id, entry.isActive)">
                    {{ entry.isActive ? '활성화' : '비활성화' }}
                </el-button>
                    <el-button type="info" size="small" plain @click="getActive(entry.id, entry.isActive)" v-else>{{ entry.isActive ? '활성화' : '비활성화' }}</el-button>
                </span>
                <span v-else>
                    {{entry.isActive ? '활성화' : '비활성화'}}
                </span>
            </td>
              <router-link tag="td" v-bind:to="{path: 'badgelist/badgedetail'}">{{ entry.createUserName }}</router-link>
            </tr>
            <tr  v-if="paging.totalRecords <= 0">
                <td colspan="5">검색결과가 없습니다.</td>
            </tr>
        </tbody>
    </table>
    <nav class="text-sm-center">
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
import { getBadge, getActivate } from '@/api/badge'
import axios from 'axios'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    name: "vList",
    data() {
      return {
          listName: '뱃지 리스트',
          search: {
            isActive: null,
            name: null,
            description: null,
            userName: null
          },
          paging: {
            page: 1,
            pageSize: 5,
            totalPages: 1,
            totalRecords: 0,
            orderBy: "id",
            ascending: false
          },
          badge: '',
          loading: true,
          }
    },
   
    created() {
        this.checkThisPage()
        this.getBadge()
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
                return item.menuId === 15
            }).filter(item => {
                return item.authDivision === 'CU'
            }).length
           if(x > 0) {
               
               return true
           } else {
               return false
           }
       },
        getBadge() {
            this.loading = true
            var data = {search: this.search, paging: this.paging}
            getBadge(data)
            .then(response => {
                this.loading = false
                this.badge = response.results
                this.paging = response.paging
                // this.noResults = this.badge.length
            })
        },
      movePage(page) {
          this.paging.page = page;
          this.commit()
          this.getBadge();
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.commit()
              this.getBadge();
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.commit()
              this.getBadge();
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
        resetBtn() {
          this.search = {
            isActive: null,
            name: null,
            description: null,
            userName: null
            }
        },
        goAdmin(id) {
          localStorage.setItem('id', id); 
        },
        getActive(id, isActive){
            var active = ''
            if(isActive === true) {
                active = false
                this.$message({
                    message: '비활성화 처리 되었습니다.',
                    type: 'info'
                });
            } else {
               active = true
               this.$message({
                    message: '활성화 처리 되었습니다.',
                    type: 'success'
                });
            }
            var data = {badgeId: id, isActive: active}
            getActivate(data)
            .then(response => {
                this.getBadge()
            })
        },
      
    },
    computed: {
    ...mapGetters([
      'roles',
      
    ])
  }
  }

</script>