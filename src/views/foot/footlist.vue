<template>
<div  class="memberL">
    <div>
    <h1>{{listName}}</h1>
  <div label="족부압 리스트" class="memberL_wrap">
    <div class="footWrap searchBoxStyle">
      <el-form size="mini" :inline="true">
      <el-form-item label="검색 기간">
        <el-col class="searc_d" :model="search">
          <el-select v-model="search.searchColumn">
            <el-option label="전체기간" :value="null">
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
          <el-date-picker type="date" placeholder="Pick a date" v-model="search.endDate" style="width: 100%;" :clearable="false" :default-time="['00:00:00', '23:59:59']" :disabled = "search.searchColumn === null"></el-date-picker> 
        </el-col> 
      </el-form-item>
    </el-form>
    <el-form :inline="true" size="mini">
      <el-form-item label="운동명">
         <el-input v-model="search.title" placeholder="운동명 입력"></el-input>      
      </el-form-item>
      
      <el-form-item label="적합 여부">
        <el-select v-model="search.isGood">
          <el-option label="전체" :value="null">
          </el-option>
          <el-option label="적합" :value="true"></el-option>
          <el-option label="부적합" :value="false"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :inline="true" size="mini">
     <el-form-item label="데이터 제공자">
         <el-input v-model="search.name" placeholder="측정대상 이름입력"></el-input>      
        <el-col  class="member_btn">
        </el-col>
      </el-form-item>
      
      <el-form-item label="운동근육">
        <el-select v-model="search.kindId">
          <el-option label="전체" :value="null">
          </el-option>
          <el-option v-for="kindItem in kindResults" :label="kindItem.name" :value="kindItem.id" :key="kindItem.id"></el-option>
          
        </el-select>
      </el-form-item>
      
      <el-form-item class="member_btn_wrap">
        <el-col class="member_btn">
          <el-button type="info" @click="resetBtn()" size="small">검색조건 초기화</el-button>
        <el-button type="info" icon="el-icon-search" @click="pageReset() " size="small">검색</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <div class="titleChild" style="margin-top: -5px;" v-show="hideNShow" >
    <span  v-for="item in groupResult" class="autocomplete" @click="autoComplete(item)">
    {{item}}
    </span>
     </div>
    
      
    </el-form>
    </div>
    <el-dialog :visible.sync = "groupsetting"  width="400px">
        <div>
          <h3 class="dialogHeader">선택데이터 그룹설정</h3>
        <el-form>
          <el-form  :inline="true" size="mini">
            <el-form-item label="그룹명" >
            <input type="text" @input="GroupSearch1" @change="GroupSearch1" v-model="popgroupsearch.groupNm" v-on:keyup.esc="escStuff()" class="groupSearchInput" size="mini"/>
            </el-form-item>
            <el-form-item  label="그룹분류" >
              <el-input  disabled v-model="originData">
                
              </el-input>
            </el-form-item>
          </el-form>
          <el-form  :inline="true" size="small" class="foot_choiceDataGroup ">
            <el-form-item>
              <el-button @click="groupsetting = false" type="warning">취소</el-button>
              <el-button @click="groupListRegist()"  type="info">설정완료</el-button>
            </el-form-item>
          </el-form>
        </el-form>
        </div>
        <div class="titleChild" style="margin-left: 131px;
   top: 152px;" v-show="hideNShow1">
          <span v-for="item in groupResult1" class="autocomplete" @click="autoComplete1(item)" >
          {{item}}
          </span>
        
          </div>
        <div class="titleChild" style="margin-left: 131px;
   top: 152px;"  v-show="noResultShow">
        <span class="autocomplete" style="padding: 5px 0;">
        검색결과가 없습니다.
        </span>
        </div>
    </el-dialog>
    
    <div v-loading="loading">
    <div class='button_space_bottom'>
      <el-button size="small" type="danger" plain @click="ChartDelete()">선택 데이터 삭제</el-button>
      <el-button size="small" type="primary" plain @click="groupsetting = true">선택 데이터 그룹설정</el-button>
        <span class="search_number">검색 결과 수 : {{  paging.totalRecords }}</span>
     </div>
     <table class="el-table" stripe :data="results" :model="results"   >
        <thead class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>측정일자</th>
                <th>측정 데이터<br>업데이트 일시</th>
                <th>데이터 제공자<br>(측정대상)</th>
                <th>운동근육<br>(대분류)</th>
                <th>운동명</th>
                <th>적합 여부</th>
                <th>그룹명</th>
                <th>데이터차트</th>
                <th>선택<input type="checkbox" @change="selectKeysgroups($event)"></input></th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
            <tr v-for="(entry, key) in results" :key="results.id" @click="getKeys(entry.key)">
                <router-link tag="td" v-bind:to="{path : 'footchart'}">{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</router-link>
                <router-link tag="td" v-bind:to="{path : 'footchart'}">{{entry.createDate}}</router-link>
                <router-link tag="td" v-bind:to="{path : 'footchart'}">{{entry.updateDate}}
                  <span v-show="entry.updateDate === null">
                      <strong>-</strong>
                  </span>
                </router-link>
                <router-link tag="td" v-bind:to="{path : 'footchart'}">{{entry.name}}</router-link>
                <router-link tag="td" v-bind:to="{path : 'footchart'}">{{entry.kindName}}</router-link>
                <router-link tag="td" v-bind:to="{path : 'footchart'}">{{entry.title}} </router-link>
                 <router-link tag="td" v-bind:to="{path : 'footchart'}">{{entry.isGood? '적합' : '부적합'}} </router-link>
                <router-link tag="td" v-bind:to="{path : 'footchart'}">{{entry.groupNm}}
                  <span v-show="entry.groupNm === ''">
                      <strong>-</strong>
                  </span>
                </router-link>
                <td>
                  <router-link v-bind:to="{path: 'footchart'}"><el-button size="small" @click="getKeys(entry.key)">데이터 보기</el-button></router-link>
                </td>
                <td><input type="checkbox" :value="entry.key"  v-model="selectKeys" ></input></td>
            </tr>
            <tr v-model="noResults" v-if="noResults === '' ? false: true">
              <td colspan="11" class="noResults">{{noResults}}</td>
            </tr>
        </tbody>
    </table>
    <nav class="text-sm-center" v-model="noResults" v-if="noResults ===''? true: false" style="text-align: center;">
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
<div>

 </div>
</div>
</template>

<script>
import { footDetail,footData, footLogKind, deleteChart, editChart, sliceChart, addGroup, getLogFootGroup,footGroupName,footpressgroups, footGroupRegistItem, getLogFootGroups } from '@/api/admin'
import { mapGetters } from 'vuex'
import axios from 'axios'
import dc from  "dc"
import crossfilter from "crossfilter2"
import d3 from "../../../node_modules/dc/node_modules/d3";
export default {
  data(){
     
    return{
      listName: '데이터 검색',
      originData: '원본 데이터',
      groupsetting: false,
      hideNShow: false,
      hideNShow1: false,
      footTable: '',
      loading: false,
      loading1: false,
     zoom: false,
     brush: false,
    search: {
        kindId: null,
        name: "",
        searchColumn: null,
        isGood: null,
        title: null,
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date()
    },
    paging: {
        page: 1,
        pageSize: 10,
        totalPages: 19,
        totalRecords: 370,
        orderBy: "CreateDate",
        ascending: false
    },
     popgroupsearch: {
        muscle: null,
        groupNm :'',
        groupDivision: null
    },
    grouppaging: {
        page: 1,
        pageSize: 20,
        totalPages: 0,
        totalRecordes: 0,
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
     groupResult1: [],
      groupRegist:'',
      groupResults: '',
      noResultShow: false
    }
  },
created() {
this.getData()
this.footKind()
},


methods:{
  getGroupData(){
      this.loading = true
      var data = {paging: this.grouppaging, search: this.popgroupsearch}
      
      getLogFootGroups(data)  
       .then(response => {
          this.loading= false
        
        this.groupResults = response.results
        
      })
      .catch(error => {
      })
    },
   escStuff(event) {
        this.hideNShow = false
    },
  autoComplete(item){
    this.search.groupNm = item
    this.groupResult = []
    this.hideNShow = false
    },
    autoComplete1(item){
    this.popgroupsearch.groupNm = item
    this.popgroupsearch.groupDivision = "OR"
    this.groupResult1 = []
    this.hideNShow1 = false
     this.getGroupData()
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
         if(this.groupResult.length <= 0) {
           this.hideNShow = false
           
         } else {
           this.hideNShow = true
           
         }
      })
    },
     GroupSearch1({ type, target }) {
      var name = target.value
      var division = 'OR'
     this.noResultShow = false
     
      footGroupName(division, name)
      .then(response => {
         this.groupResult1 = response.results
         this.hideNShow1 = true
      })
    },
    groupListRegist(){
      if(this.popgroupsearch.groupNm === '') {
        this.$notify.error({
            title: 'Error',
            message: '그룹명을 선택해 주세요.'
        });
      }else if(this.selectKeys.length <= 0){
        this.$notify.error({
            title: 'Error',
            message: '데이터를 선택해 주세요.'
        })
      } else {
        
      var data = {groupNo: this.groupResults[0].groupNo, logKey:this.selectKeys }
      this.$confirm('그룹을 설정 하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
      footGroupRegistItem(data) 
      .then(response => {
        if(response === undefined) {
              this.$message({
                  message: '그룹을 설정할 수 없습니다.',
                  type: 'warning'
                  });
          } else {
              this.$message({
              message: '그룹설정이 완료 되었습니다.',
              type: 'success'});
          }
          this.groupsetting = false
             })
            })
             .catch(() => {
                this.fullscreenLoading = false
            this.$message.info('취소 되었습니다.'); 
            });
            }
    },
    getData(){
      this.loading = true
      var pageNo = localStorage.getItem('pageNo')
      var condition = localStorage.getItem('condition')
      if(!pageNo) {
        this.paging.page = 1
      } else {
        this.paging.page = pageNo
      }
      if(!condition) {
        this.search = {
            kindId: null,
            name: "",
            title: null,
            isGood: null,
            searchColumn: null,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
        }
      } else {
        this.search = JSON.parse(condition)
      }
      var data = {paging: this.paging, search: this.search}
      footDetail(data)     
       .then(response => {
         this.$store.commit('list', this.listName)
          this.loading= false
        this.results = response.results
        this.paging = response.paging
        
        if(this.paging.totalRecords <= 0) {
                  return this.noResults = '검색결과가 없습니다.'
              } else {
                return this.noResults = ''
              }
      })
      .catch(error => {
      })
    },
   
  selectKeysgroups(event) {
    console.log(event)
      if(event.target.checked ===true){
      var allSelect = []
      for(var index in this.results) {
          
          allSelect.push(this.results[index].key)
      }
      this.selectKeys = allSelect
      }
      else {
          this.selectKeys = []
      }
  },
  selectKey(){
    if(this.groupTitle <= 0) {
      this.$notify.error({
            title: 'Error',
            message: 'Group title을 입력해 주세요.'
          });
    } else if ( this.selectKeys <= 0) {
      this.$notify.error({
            title: 'Error',
            message: '데이터를 선택해 주세요.'
          });
    } else {
      this.getGroupData()
    this.loading1 = true
    var data = {groupNm : this.groupTitle, logKeys: JSON.stringify(this.selectKeys)}
    addGroup(data)
    .then(response => {
      if(response === undefined) {
        this.loading1 = false
        this.$message({
          message: '관리자에게 문의하세요.',
          type: 'warning'
        });
      } else {
        this.loading1 = false
        this.$message({
          message: '등록이 완료 되었습니다.',
          type: 'success'
        });
      this.groupTitle = ''
      this.logKeys = ''
      this.selectKeys =  []
      }
    })
    .catch(error => {
       this.loading1 = false
        this.$message({
          message: '관리자에게 문의하세요.',
          type: 'warning'
        });
     })
     }
  },
  getKeys(key){
    localStorage.setItem('logKey',key)
    localStorage.setItem('pageNo', this.paging.page)
  },
  range(val){
    this.rangeAll = val
    
  },
    pageReset(val){
      
    this.paging.page = 1
    localStorage.setItem('pageNo', 1)
    localStorage.setItem('condition', JSON.stringify(this.search))
    this.getData()
  },
    movePage(page) {
          this.paging.page = page;
        localStorage.setItem('pageNo', page)
          this.getData()
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              localStorage.setItem('pageNo', this.paging.page)
              this.getData()
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              localStorage.setItem('pageNo', this.paging.page)
              this.getData()
          }
      },
      checkPage(page) {
        var checkCnt = parseInt(page % this.paging.pageSize)
        if(this.paging.page <= 10){
        return parseInt(this.paging.page/11) + 1 == parseInt(page / 11) + 1
        }
        else {
          return parseInt(this.paging.page/10)  == parseInt(page / 10) 
        }
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
   
    ChartDelete(){
      if(this.selectKeys <= 0) {
        this.$notify.error({
            title: 'Error',
            message: '삭제할 데이터를 선택해 주세요.'
        });
      } else {
      this.$confirm('선택한 데이터를 삭제하시겠습니까?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          var data = {logKey: this.selectKeys}
          deleteChart(data)
          .then(response =>{
            if(response === undefined) {
              this.$message({
                  message: '관리자에게 문의하세요.',
                  type: 'warning'
                  });
          } else {
              this.$message({
              message: '선택한 데이터를 삭제되었습니다.',
              type: 'success'});
              this.getData()
          }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '취소되었습니다.'
          });          
        });
        }
    },
    
   
    resetBtn(){
      this.search = {
        key: "",
        kindId: null,
        name: "",
        title: "",
        isGood: null,
        platformCd: "",
        searchColumn: null,
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date()
      }
      localStorage.setItem('condition', JSON.stringify(this.search))
    },
  },
  computed: {
    ...mapGetters([
      'roles',
    ])
  }
}
</script>
