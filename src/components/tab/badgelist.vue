<template>
<div>
  <div label="뱃지 리스트" >
    <el-form ref="form" class="searchBoxStyle">
    <el-form size="mini" :inline="true">
      
      <!-- 배지명칭 -->
      <el-form-item label="명칭">
        <el-col>
          <el-input :maxlength="15" v-model="search.name"></el-input>
        </el-col>
      </el-form-item>
      <!--습득조건-->
      <el-form-item label="획득조건">
        <el-col>
          <el-input :maxlength="10" v-model="search.description"></el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <el-form>
        <el-form-item class="member_btn_wrap">
        <el-col class="member_btn">
            <el-button type="info" icon="el-icon-search" @click="getBadge()" size="mini">SEARCH</el-button>
            <el-button type="info" @click="resetBtn()" size="mini">RESET</el-button>
        </el-col>
        </el-form-item>
    </el-form>
    </el-form>
     <div class="register_admin" v-loading="loading">
    <el-button size="small" class="button_space_bottom member_btn_wrap" @click="badgeHistory()">획득 히스토리</el-button>
     <table class="el-table" stripe>
        <thead class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>명칭</th>
                <th>획득 조건</th>
                <th>레벨</th>
                <th>달성률</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
            <tr  v-for="(entry, key) in badge" :key="badge.id" class="tablestyle" @click="showDetail(entry.badgeId)">
              <td>{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
              <td>{{ entry.name }}</td>
              <td>{{ entry.description}}</td>
              <td>{{entry.achieveLevel}}</td>
              <td>{{ entry.achieveRate }} %</td>
            </tr>
            <tr>
                    <td colspan="5" style="text-align: center; padding: 40px;" v-if="badge <= 0">뱃지정보가 없습니다.</td>
                </tr>
        </tbody>
    </table>
    <nav class="text-sm-center" v-if="badge > 0">
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
  <div  class="exerpopDetail mediaPopOver">
  <el-dialog :visible.sync="detailIsShow" width="500">
  <h3>뱃지 상세정보 팝업</h3>
    <el-form style="overflow: hidden;">
        <el-form-item class="compo_badelist">
            <el-form-item label="뱃지 명칭"><span class="spanSize">{{detail.name}}</span></el-form-item>
            <el-form-item label="현재 레벨"><span class="spanSize">Lv.{{detail.achieveLevel}}</span></el-form-item>
            <el-form-item label="현재 달성"><span class="spanSize">{{detail.achieveRate}} %</span></el-form-item>
            <el-form-item label="획득 조건"><span class="spanSize">{{detail.description}}</span></el-form-item>
            <el-form-item label="현재 진행"><span class="spanSize">{{detail.getCnt}}</span></el-form-item>
        </el-form-item>
        <el-form-item class="compo_badgeImg">
            <img :src="detail.badgeImage" ></img>
        </el-form-item>
    </el-form>
    <div class="compoBadgeWrap">
        <table class="el-table">
            <thead class="el-table-column listTableHead">
                <tr>
                    <th>No</th>
                    <th>레벨</th>
                    <th>획득 일자</th>
                </tr>
            </thead>
            <tbody class="el-table-column listTable">
                <tr v-for="(item, key) in levelResults">
                    <td>{{(levelPaging.totalRecords - (levelPaging.page - 1) * levelPaging.pageSize) - key++}}</td>
                    <td>{{item.achieveLevel}}Lv</td>
                    <td>{{item.createDate}}</td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: center; padding: 40px;" v-if="levelResults <= 0">뱃지 정보가 없습니다.</td>
                </tr>
            </tbody>
        </table>
        <nav class="text-sm-center" v-if="levelResults > 0">
        <ul class="pagination" id="searchPager">
            <li class="page-item page-arrow">
                <a class="page-link" @click="prevPage1()">
                    &lt;
                </a>
            </li>

            <li v-for="pageobj in levelPaging.totalPages" class="page-item page-num" v-bind:class="{active:pageobj==levelPaging.page}" v-if="checkPage1(pageobj)">
                <a class="page-link" @click="movePage1(pageobj)">
                    {{pageobj}}
                </a>
            </li>

            <li class="page-item page-arrow">
                <a class="page-link" @click="nextPage1()">
                    &gt;
                </a>
            </li>
        </ul>
        </nav>
    </div>
  </el-dialog>

  <el-dialog :visible.sync="historyIsShow" width="500">
  <h3>획득 히스토리 팝업</h3>
    <div class="compoBadgeWrap">
        <table class="el-table">
            <thead class="el-table-column listTableHead">
                <tr>
                    <th>No</th>
                    <th>뱃지 명칭</th>
                    <th>레벨</th>
                    <th>획득 일자</th>
                </tr>
            </thead>
            <tbody class="el-table-column listTable">
                <tr v-for="(item, key) in history">
                    <td>{{(historyPaging.totalRecords - (historyPaging.page - 1) * historyPaging.pageSize) - key++}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.achieveLevel}}Lv</td>
                    <td>{{item.createDate}}</td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: center; padding: 40px;" v-if="history <= 0">뱃지 히스토리가 없습니다.</td>
                </tr>
            </tbody>
        </table>
        <nav class="text-sm-center" v-if="history > 0">
        <ul class="pagination" id="searchPager">
            <li class="page-item page-arrow">
                <a class="page-link" @click="prevPage2()">
                    &lt;
                </a>
            </li>

            <li v-for="pageobj in historyPaging.totalPages" class="page-item page-num" v-bind:class="{active:pageobj==historyPaging.page}" v-if="checkPage2(pageobj)">
                <a class="page-link" @click="movePage2(pageobj)">
                    {{pageobj}}
                </a>
            </li>

            <li class="page-item page-arrow">
                <a class="page-link" @click="nextPage2()">
                    &gt;
                </a>
            </li>
        </ul>
        </nav>
    </div>
  </el-dialog>
  </div>
</div>
</template>

<script>
import { badgedetail,detailuserbadge,badgeLevel, badgehistory } from '@/api/member'
  export default {
    name: "tabcon4",
    data() {
      return {
          search: {
            name: null,
            description: null,
          },
          paging: {
            page: 1,
            pageSize: 20,
            totalPages: 0,
            totalRecords: 0,
            orderBy: "CreateDate",
            ascending: false
          },
          badge: '',
          loading: true,
          detail: '',
          detailIsShow: false,
          badgeId : '',
          levelPaging: {
                page: 1,
                pageSize: 3,
                totalPages: 0,
                totalRecords: 0,
                orderBy: "CreateDate",
                ascending: false
            },
             historyPaging: {
                page: 1,
                pageSize: 3,
                totalPages: 0,
                totalRecords: 0,
                orderBy: "CreateDate",
                ascending: false
            },
            levelResults: '',
            history:'',
            historyIsShow: false,
          }
    },
   
    created() {
       this.getBadge()
    },
     methods: {
         badgeHistory() {
             this.historyIsShow = true
             var id = localStorage.getItem('id')
             var data = {userId: id, paging: this.historyPaging}
            badgehistory(data)
            .then(response => {
                this.history = response.results
                this.historyPaging = response.paging
            })
         },
         badgeLevel(){
             var id = localStorage.getItem('id')
             var data = {userId : id, badgeId: this.badgeId, paging: this.levelPaging}
             badgeLevel(data)
             .then(response => {
                 this.levelResults = response.results
                 this.levelPaging = response.paging
             })
         },
         showDetail(val){
            this.detailIsShow = true
            this.badgeId = val
            var id = localStorage.getItem('id')
            var data = {userId: id, badgeId: val}
            detailuserbadge(data)
            .then(response => {
                this.detail = response
                this.badgeLevel()
            })
         },
      getBadge(){
          this.loading = true
          var id = localStorage.getItem('id')
          var data = {userId : id , search: this.search, paging: this.paging}
          
        badgedetail(data) 
        .then(response => {
            this.loading = false,
            this.badge = response.results
            this.paging =response.paging
        })
      },   
      movePage(page) {
          this.paging.page = page;
          this.getBadge();
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.getBadge();
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.getBadge();
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
      
      movePage1(page) {
          this.levelPaging.page = page;
          badgeLevel()
      },
      nextPage1() {
          if (this.levelPaging.totalPages != this.levelPaging.page) {
              this.levelPaging.page = this.levelPaging.page + 1;
              badgeLevel()
          }
      },
      prevPage1() {
          if (this.levelPaging.page != 1) {
              this.levelPaging.page = this.levelPaging.page - 1;
              badgeLevel()
          }
      },
      checkPage1 (page) {
          return parseInt(this.levelPaging.page / 10) == parseInt(page / 10);
      },
      
       movePage2(page) {
          this.historyPaging.page = page;
          badgeLevel()
      },
      nextPage2() {
          if (this.historyPaging.totalPages != this.historyPaging.page) {
              this.historyPaging.page = this.historyPaging.page + 1;
              badgeLevel()
          }
      },
      prevPage2() {
          if (this.historyPaging.page != 1) {
              this.historyPaging.page = this.historyPaging.page - 1;
              badgeLevel()
          }
      },
      checkPage2 (page) {
          return parseInt(this.historyPaging.page / 10) == parseInt(page / 10);
      },
        resetBtn() {
          this.search = {
            isActive: null,
            name: null,
            description: null,
            userName: null
            }
        },
        
      
    },
    computed: {
    
  }
  }

</script>