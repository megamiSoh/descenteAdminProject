<template>
<div class="memberL">
    <div>
    <h1>{{listName}}</h1>
  <div label="족부압 리스트" class="memberL_wrap">
    <div class="footWrap searchBoxStyle">
     
    <el-form :inline="true" size="mini">
      <el-form-item label="운동근육">
        <el-select v-model="search.muscle">
          <el-option label="전체" :value="null">
          </el-option>
          <el-option v-for="kindItem in kindResults" :label="kindItem.name" :value="kindItem.id" :key="kindItem.id"></el-option>
          
        </el-select>
      </el-form-item>
    </el-form>
    <el-form  :inline="true" size="mini">
      <el-form-item label="그룹명" >
      <input type="text" @input="GroupSearch" @change="GroupSearch" @click="GroupSearch" v-model="search.groupNm" v-on:keyup.esc="escStuff()" class="groupSearchInput" size="mini"/>
      </el-form-item>
    </el-form>
    <el-form :inline="true" size="mini">
        <el-form-item label="그룹분류">
        <el-select v-model="search.groupDivision">
            <el-option label="전체" :value="null"></el-option>
          <el-option v-for="item in groupsfetch" :label="item.name" :value="item.key" :key="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="member_btn_wrap">
        <el-col class="member_btn">
            <el-button type="info" icon="el-icon-search" @click="start()" size="mini">검색</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <div class="titleChild" v-show="hideNShow">
    <span v-for="item in groupResult" class="autocomplete" @click="autoComplete(item)" >
    {{item}}
    </span>
     </div>
    
      
    </el-form>
    </div>
    <div v-loading="loading">
    <div class="button_space_bottom">
        <router-link v-bind:to="{path: 'footgroupregist'}">
            <el-button size="mini" plain type="primary">새 그룹 등록</el-button>
        </router-link>
        <span class="search_number">검색 결과 수 : {{  paging.totalRecords }}</span>
     </div>
     <table class="el-table">
     <colgroup>
      <col width="50" />
      <col width="150" />
      <col width="150" />
      <col width="100" />
      <col width="100" />
      <col width="100" />
       <col width="" />
       <col width="115" />
     </colgroup>
        <thead class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>그룹명</th>
                <th>운동근육<br> (대분류)</th>
                <th>운동명</th>
                <th>보유 데이터 수</th>
                <th>그룹분류</th>
                <th>그룹설명</th>
                <th>선택<input type="checkbox" @change="selectKeysgroups($event)"></input></th>
            </tr>
        </thead>
     </table>
     <div class="infiniteList">
     <table class="el-table" stripe :data="results" :model="results"   >
     <colgroup>
      <col width="50" />
      <col width="150" />
      <col width="150" />
      <col width="100" />
      <col width="100" />
      <col width="100" />
       <col width="" />
       <col width="100" />
     </colgroup>
        
        <tbody class="el-table-column listTable">
            <tr v-for="(entry, key) in list" :key="results.id" @click="footDetail(entry.groupNo)"  >
                <router-link tag="td" v-bind:to="{path: 'footgroupdetail'}">{{entry.groupNo}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'footgroupdetail'}">{{entry.groupNm}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'footgroupdetail'}">{{entry.kindName}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'footgroupdetail'}"></router-link>
                <router-link tag="td" v-bind:to="{path: 'footgroupdetail'}">{{entry.dataCount}}</router-link>
                <router-link tag="td" v-bind:to="{path: 'footgroupdetail'}">{{entry.divisionName}} </router-link>
                <router-link tag="td" v-bind:to="{path: 'footgroupdetail'}">{{entry.description}}</router-link>
                <td v-bind:to="{path: 'footgroupdetail'}"><input type="checkbox" :value="entry.groupNo"  v-model="selectKeys" ></input></td>
                
            </tr>
            <tr>
              <td colspan="8">
                <infinite-loading @infinite="infiniteHandler"></infinite-loading>
              </td>
            </tr>
            <tr v-model="noResults" v-if="noResults === '' ? false: true">
              <td colspan="11" class="noResults">{{noResults}}</td>
            </tr>
        </tbody>
    </table>
   

    </div>
 
  </div>
  </div>
</div>
<div>
<el-form :inline="true" size="mini" class="button_space_top">
    <el-form-item>
        <el-button type="success" plain size="small" @click="exOpen = true">선택그룹 분석 전송</el-button>
    </el-form-item>
</el-form>
<el-dialog  :visible.sync="exOpen">
  <example></example>
</el-dialog>
 </div> 
</div>
</template>

<script>
import { footDetail,footData, footLogKind, deleteChart, editChart, sliceChart, addGroup, getLogFootGroup,footGroupName,footpressgroups,getLogFootGroups, removeFootGroup } from '@/api/admin'
import { mapGetters } from 'vuex'
import axios from 'axios'
import dc from  "dc"
import crossfilter from "crossfilter2"
import d3 from "../../../node_modules/dc/node_modules/d3";
import InfiniteLoading from 'vue-infinite-loading';
import example from '@/components/tab/example'
export default {
  name: 'dashboard',
  components: {
    InfiniteLoading,
    example
  },
  data(){
    return{
      listName: '데이터 그룹 검색',
      exOpen: false,
      footTable: '',
      loading: false,
      loading1: false,
     zoom: false,
     brush: false,
    search: {
        muscle: null,
        groupNm :'',
        groupDivision: null
    },
    paging: {
        page: 1,
        pageSize: 20,
        totalPages: 0,
        totalRecords: 0,
        orderBy: "GroupNo",
        ascending: false
    },
     results: '',
     noResults: '',
     data: [],
     showChart: false,
     kindResults: '',
     logKey: '',
     slideRange: 100,
     rangeAll: '',
     startRange: '',
     startResults: '',
     endRange: '',
     groupNo: 1,
     selectKeys: [],
     groupTitle: '',
     footList: '',
     targetBool: '',
     text: '',
     titleDataList: '',
     groupResult: [],
     groupsfetch: '',
     autoValue: '',
     hideNShow: false,
     busy: false,
     list: [],
     pagingPage: '',
     pagingTotal: '',
     newPaging: {
        page: 1,
        pageSize: 20,
        totalPages: 0,
        totalRecords: 0,
        orderBy: "GroupNo",
        ascending: false
    },
    }
  },
created() {
this.footKind()
this.footPressGroups()
},


methods:{
start(){
 this.paging.pageSize = this.pagingTotal
 this.paging.page = 1
  var data = {paging: this.paging, search: this.search}
getLogFootGroups(data) 
      .then(response =>  {
        this.paging.totalRecords = response.paging.totalRecords
        this.results = response.results
        this.list = []
        this.list = this.list.concat(response.results);
      })
}
,
//infinite list function
infiniteHandler($state) {

if(this.pagingPage === '' && this.paging.page === 1) {
  this.paging.page = 1
     
} else if (this.paging.totalPages != this.paging.page){
              this.paging.page = this.paging.page + 1; 
              }
      var data = {paging: this.paging, search: this.search}
       getLogFootGroups(data) 
      .then(response =>  {
        this.$store.commit('list', this.listName)
        var page = response.paging
         this.paging = response.paging
         this.pagingTotal = response.paging.totalRecords
         this.pagingPage = response.paging.page
        if ( page.totalRecords ) {
          this.list = this.list.concat(response.results);
          $state.loaded();
          if (this.list.length === page.totalRecords) {
            $state.complete();
          }
        } else {
          $state.complete();
        }

        if(this.paging.totalRecords <= 0) {
                  return this.noResults = '검색결과가 없습니다.'
              } else {
                return this.noResults = ''
              }
      });
    },

    escStuff(event) {
        this.hideNShow = false
    },
    autoComplete(item){
this.search.groupNm = item
this.groupResult = []
this.hideNShow = false

    },
    footDetail(no) {
        localStorage.setItem('no', no)
    },
    selectKeysgroups(event) {
      this.paging.pageSize = this.pagingTotal
      this.paging.page = 1
        var data = {paging: this.paging, search: this.search}
      getLogFootGroups(data) 
            .then(response =>  {
        
        this.results = response.results
        if(event.target.checked ===true){
        var allSelect = []
        this.selectKeys = allSelect
        for(var index in this.results) {
            
            allSelect.push(this.results[index].groupNo)
        }
        
        }
        else {
            this.selectKeys = []
        }
      })
        
    },
  footPressGroups() {
    footpressgroups()
    .then(response => {
      this.groupsfetch = response.results
    })
  },
    addEvent ({ type, target }) {
    
    if(target.value === '') {
        this.search.title = "null"
    } else {
        this.search.title = target.value
    }
   
      this.logfootList()
      this.logfootList()
    },
     GroupSearch({ type, target }) {
      var name = target.value
      var division = ''
      footGroupName(division, name)
      .then(response => {
         this.groupResult = response.results
         this.hideNShow = true
      })
    },

    footKind(){
      footLogKind()
      .then(response => {
        this.kindResults = response.results
      })
    },
    footData(key) {
      this.loading1 = true
      this.logKey = key
      footData(key)
      .then(response => {
        this.loading1 = false
        this.data = response.footPressData
        
        this.showCharts()
      })
    },
   
  },
  mounted() {
      

  },
 
  
  computed: {
    ...mapGetters([
      'roles',
    ])
  }
}
</script>
