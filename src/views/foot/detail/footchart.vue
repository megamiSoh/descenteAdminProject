<template>
<div  class="memberL">
<h1>데이터 보기</h1>
    <div v-loading="loading1">
 
<div style="overflow: hidden;" >
    <div style="width: 55%; float:left;">
   <el-form :inline="true" size="mini">
    <el-form-item label="데이터 제공자" label-width="100px">
        <el-input v-model="chartName" style="width: 100px;" :disabled="inputRemove"></el-input>
     </el-form-item>
    <el-form-item label="운동명" label-width="100px">
    <el-input v-model="chartTitle" :disabled="inputRemove"></el-input>
    </el-form-item>
   </el-form>
   <el-form :inline="true" size="mini">
    <el-form-item label="운동 근육" label-width="100px">
    <el-select v-model="kindId" style="width: 100px; font-size: 12px;" :disabled="inputRemove">
          <el-option label="전체" :value="null">
          </el-option>
          <el-option v-for="kindItem in kindResults" :label="kindItem.name" :value="kindItem.id" :key="kindItem.id"></el-option>
          
        </el-select>
    </el-form-item>
    <el-form-item label="적합여부" label-width="100px">
        <el-select v-model="isGood" :disabled="inputRemove">
            <el-option label="적합" :value="true"></el-option>
            <el-option label="부적합" :value="false"></el-option>
        </el-select>
    </el-form-item>
   </el-form>
   <el-button size="small" @click="showCharts('range'); removeShow = true; btnShow = false"> 데이터 가공 </el-button>
    <el-button size="small" @click="showCharts('range'); btnShow = true; removeShow = false"> 유효구간 지정 </el-button>
   
    <div style="width: 100%; overflow: hidden;">
      <footChart ref="form" v-on:cutList="cutList" ></footChart>
    </div>
    <el-form>
        <el-form-item label="시간축 조정" >
            <el-slider  @change="showCharts(slideRange)" v-model="slideRange" style="width: 57%; display: inline-block;"></el-slider>
        </el-form-item>
    </el-form>
  
  </div>
  <div class="foot_right">
    <h3 class="foot_rightTitle">| 유효구간 목록</h3>
    <div class="foot_rightContents" v-if="showRangeList.length <= 0 || removeShow === true ">유효구간을 지정해 주세요.</div>
    <div v-if="showRangeList.length > 0 && btnShow === true">
        <table class="el-table foot-minitable">
            <thead class="el-table-column listTableHead">
                <tr>
                    <th>No</th>
                    <th>유효구간<br>(시작)</th>
                    <th>유효구간<br>(종료)</th>
                    <th>구간이름</th>
                    <th>선택</th>
                </tr>
            </thead>
            <tbody class="el-table-column listTable">
                <tr v-for="(item, key) in showRangeList" @click="showChartData(key);">
                    <td>{{key + 1}}</td>
                    <td>{{item.startTime}}</td>
                    <td>{{item.endTime}}</td>
                    <td>{{chartInfo.title}} , {{chartInfo.name}} , {{item.startTimeOrigin}} , {{item.endTimeOrigin}}</td>
                    <label style="    display: inline-block;"><td style="pading: 10px;">
                    <input type="checkbox" v-model="delList"  :value="item"/>
                    </td></label>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</div>
   <el-form size="mini" :inline="true" v-show="removeShow">
        <el-form-item label="가공 구간">
        {{startRangeList[startRangeList.length -1]}} - {{endRangeList[endRangeList.length -1]}}
        </el-form-item>
        <el-form-item ><el-button @click.prevent="showCharts('range')">재설정</el-button></el-form-item>
        <el-form-item><el-button @click="footEdit()" type="info">가공구간 지정 완료</el-button></el-form-item>
    </el-form>

    <el-form size="mini" :inline="true"  v-show="btnShow">
        <el-form-item label="유효 구간">
        {{startRangeList[startRangeList.length -1]}} - {{endRangeList[endRangeList.length -1]}}
        </el-form-item>
        <el-form-item ><el-button @click="showCharts('range')">재설정</el-button></el-form-item>
        <el-form-item><el-button @click.prevent="chartSlice()" type="info" plain>유효구간 지정 완료</el-button></el-form-item>
        <el-form-item>
            <el-button @click="chartSelect()">{{selectText}}</el-button>
        </el-form-item>
        <el-form-item><el-button type="danger" @click="selectChartDel()">선택구간 삭제</el-button></el-form-item>
        <el-form-item style="float: right;"><el-button type="info" @click="groupsetting = true">선택구간 저장</el-button></el-form-item>
    </el-form>
 <el-form size="mini" :inline="true" class="foot_bottom_btnStyle">
    <el-form-item size="mini" :inline="true" style="padding-right: 100px;">
        <el-form-item>
            <el-button @click="originDataShow()">원본 데이터 보기</el-button>
        </el-form-item>
        <el-form-item>
            <el-button @click.prevent="showChartFunc()">
                보기설정 초기화
            </el-button>
        </el-form-item>
    </el-form-item>
    <el-form-item size="mini" :inline="true">
        <el-form-item>
            <el-button v-model="zoomMethods" @click="showCharts(true)">
                <strong>+</strong> 확대
            </el-button>
        </el-form-item>
        <el-form-item>
            <el-button  @click="showCharts(false)">
               <strong>-</strong> 축소
            </el-button>
        </el-form-item>
    </el-form-item>
 </el-form>
<div class="btnWrap">
    <el-button size="small" type="warning" @click="titleRemove()" v-show="editTitle">수정</el-button>
    <el-button size="small" type="warning" @click="editLogFoot()" v-show="!editTitle">수정완료</el-button>
    <router-link v-bind:to="{path: 'footlist'}">
        <el-button size="small" type="info">리스트로 돌아가기</el-button>
    </router-link>
</div>
  <div class="footAutoCom">
    <el-dialog :visible.sync = "groupsetting"  width="400px">
        <div>
          <h3 class="dialogHeader">선택구간 그룹설정</h3>
        <el-form>
          <el-form  :inline="true" size="mini">
            <el-form-item label="그룹명" >
            <input type="text" @input="GroupSearch1" @change="GroupSearch1" @click="GroupSearch1"  v-model="popgroupsearch.groupNm" v-on:keyup.esc="escStuff()" class="groupSearchInput" size="mini"/>
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
   top: 152px; position: 99999;" v-show="hideNShow1">
          <span v-for="item in groupResult1" class="autocomplete" @click="autoComplete1(item)" >
          {{item}}
          </span>
        
          </div>
        <div class="titleChild" style="margin-left: 131px;
   top: 152px; position: 99999;"  v-show="noResultShow">
        <span class="autocomplete" style="padding: 5px 0;">
        검색결과가 없습니다.
        </span>
        </div>
    </el-dialog>
    <div>
        
    </div>
  </div>
    <div style="position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0 -21px; background-color: rgba(18,18,18,0.5); overflow-y: auto; " v-show="originShow" >
        <div style="-webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 500px; 
     background-color: #fff;
     border-radius: 5px; 
     margin-top: 15vh; 
     margin: 15vh auto; padding: 1px 10px;
    "
    >
    
    <h3 class="foot_rightTitle">| 원본 데이터 보기<span @click="originDataShow() " style="cursor: pointer;float:right; display: inline-block;">X</span></h3>
            <!--<div id="origin_composedLeft"></div>
            <div id="origin_composedRight"></div>-->
            <footOrigin></footOrigin>
            <el-form size="mini" :inline="true" class="btnWrap">
                <el-form-item>
                    <el-button @click="restoreOrigin()">원본데이터로 복원</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="originDataShow()">확인</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
 </div>
 
    
</div>
</template>

<script>
import { footDetail, footLogKind, deleteChart, editChart, sliceChart, addGroup, getLogFootGroup,footGroupName,footpressgroups, footGroupRegistItem, getLogFootGroups, footCutInfo,retoreOrigin, editLogFoot } from '@/api/admin'
import { mapGetters } from 'vuex'
import axios from 'axios'
import dc from  "dc"
import crossfilter from "crossfilter2"
import d3 from "../../../../node_modules/dc/node_modules/d3";
import footOrigin from '../../../components/tab/footOriginChart'
import footChart from '../../../components/tab/footChart'
export default {
components: {
        footOrigin,
        footChart
    },

  data(){
     
    return{
        isGood: null,
        zoomMethods:1 ,
        originShow: false,
        originFootData: '',
      originData: '구간 데이터',
      groupsetting: false,
      hideNShow: false,
      hideNShow1: false,
      footTable: '',
      loading: false,
      loading1: true,
      loading11: false,
     zoom: false,
     brush: false,
    search: {
        key: "",
        kindId: null,
        name: "",
        title: "",
        platformCd: null,
        searchColumn: null,
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date()
    },
    paging: {
        page: 1,
        pageSize: 5,
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
     logKey: '',
     slideRange: 100,
     rangeAll: '',
     startRange: '',
     startResults: '',
     endRange: '',
     groupNo: '',
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
      noResultShow: false,
      chartInfo: '',
      rangelist: [],
      startRangeList: '',
      endRangeList: '',
      showRangeList: [],
      delList: [],
      btnShow: false,
      removeShow: false,
      selectText: '전체선택',
      originTime: '',
      chartClickShow: false,
      groupsetting: false,
      chartName:'',
      chartTitle: '',
      chartKind: '',
      inputRemove: true,
      kindId: null,
      kindResults: null,
      editTitle: true
    }
  },
created() {
this.getData()
this.footKind()
},


methods:{
    editLogFoot(){
        
        var logKey = localStorage.getItem('logKey')
        var data = {logKey: logKey, kindId: this.kindId, name: this.chartName, title: this.chartTitle, isGood: this.isGood}
        this.$confirm('데이터를 수정 하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
        editLogFoot(data)
        .then(response => {
            if(response === undefined) {
              this.$message({
                  message: '데이터를 수정할 수 없습니다.',
                  type: 'warning'
                  });
          } else {
              this.$message({
              message: '데이터 수정이 완료 되었습니다.',
              type: 'success'});
              this.editTitle = true
        this.inputRemove = true
        this.$refs.form.footData()
          }
             })
            })
             .catch(() => {
            this.$message.info('취소 되었습니다.'); 
            });
    },
    titleRemove() {
        this.inputRemove = false
        this.editTitle = false
    },
    cutList(start, sList, end, eList, oTime, cInfo, log, zoom, slideR){
        // this.$refs.form.chartSlice()
        this.loading1 = false
        this.startRange = start
        this.startRangeList = sList
        this.endRange = end
        this.endRangeList = eList
        this.originTime = oTime
        this.chartInfo = cInfo
        this.logKey = log
        this.zoomMethods = zoom
        this.slideRange = slideR
        this.chartName = this.chartInfo.name
        
        this.isGood = this.chartInfo.isGood
        this.chartTitle = this.chartInfo.title
        this.kindId = this.chartInfo.kindId
    },
    showCharts(val){
        this.$refs.form.showCharts(val)
       
    },

    escStuff1(event) {
        this.originShow = false
    },
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
    this.popgroupsearch.groupDivision = "CU"
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
      var division = 'CU'
     this.noResultShow = false
      footGroupName(division, name)
      .then(response => {
        this.hideNShow1 = true
         this.groupResult1 = response.results
       
        
      })
    },
    groupListRegist(){
  
      if(this.popgroupsearch.groupNm === '') {
        this.$notify.error({
            title: 'Error',
            message: '그룹명을 선택해 주세요.'
        });
      }else if(this.rangelist <= 0){
        this.$notify.error({
            title: 'Error',
            message: '선택된 구간이 없습니다.'
        })
      } else {
       var logKey = localStorage.getItem('logKey')
       var groupNo = this.groupResults.filter(item => {
           return item.groupNm === this.popgroupsearch.groupNm
       })[0].groupNo
       var data = { groupNo: groupNo, logKey: logKey, cutData: this.rangelist }
      this.$confirm('그룹을 설정 하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                this.loading11 = true
      footCutInfo(data) 
      .then(response => {
          this.loading11 = false
        if(response === undefined) {
              this.$message({
                  message: '그룹을 설정할 수 없습니다.',
                  type: 'warning'
                  });
          } else {
              this.$message({
              message: '그룹설정이 완료 되었습니다.',
              type: 'success'})
              setTimeout(function(){
                  location.reload()
              }, 500)
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
      var data = {paging: this.paging, search: this.search}
      footDetail(data)     
       .then(response => {
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
  
  range(val){
    this.rangeAll = val
    
  },
    pageReset(){
    this.paging.page = 1
  },
    movePage(page) {
          this.paging.page = page;
          this.getData()
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.getData()
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.getData()
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
    footKind(){
      footLogKind()
      .then(response => {
        this.kindResults = response.results
      })
    },
  
    ChartDelete(){
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
    },
     showChartFunc(){
   this.$refs.form.showChartFunc()
   this.slideRange = 100
  },
  restoreOrigin(){
     var key = localStorage.getItem('logKey')
     var data = {logKey: key}
        
        this.$confirm('원본데이터로 복원 하시겠습니까?', '복원', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
     this.loading1 = true
     retoreOrigin(data) 
     .then(response => {
           this.loading1 = false
        if(response === undefined) {
              this.$message({
                  message: '관리자에게 문의하세요.',
                  type: 'warning'
                  });
          } else {
              this.$message({
              message: '데이터 복원이 완료 되었습니다.',
              type: 'success'});
            this.$refs.form.footData()
              this.originShow = false
          }
          this.groupsetting = false
             })
            })
             .catch(() => {
                this.fullscreenLoading = false
            this.$message.info('취소 되었습니다.'); 
            });
    
  },


    originDataShow(){
    if(this.originShow === true) {
        this.originShow = false
    } else {
        this.originShow = true
    }

    },
   footEdit() {
       this.$refs.form.chartSlice()
     if (this.startRange.length <= 0){
        this.$notify.error({
            title: 'Error',
            message: '자를 영역을 선택해 주세요.'
          });
     } else {
     var data = { logKey: this.logKey, startTime: this.startRange[this.startRange.length -1], endTime: this.endRange[this.endRange.length -1] }
     this.$confirm('데이터를 가공 하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
     this.loading1 = true
     editChart(data) 
     .then(response => {
           this.loading1 = false
        if(response === undefined) {
              this.$message({
                  message: '관리자에게 문의하세요.',
                  type: 'warning'
                  });
          } else {
              this.$message({
              message: '데이터 가공이 완료 되었습니다.',
              type: 'success'});
           this.$refs.form.footData()
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
   chartSlice(){
       this.$refs.form.chartSlice()
      if (this.startRange.length <= 0){
        this.$notify.error({
            title: 'Error',
            message: '자를 영역을 선택해 주세요.'
          });
     } 
     else {
    
     this.rangelist.push({
         startTime: this.startRange[this.startRange.length -1],
         endTime: this.endRange[this.endRange.length -1]
     })
     this.showRangeList.push({
        startTime: this.startRangeList[this.startRangeList.length -1],
         endTime: this.endRangeList[this.endRangeList.length -1],
         startTimeOrigin: this.startRange[this.startRange.length -1],
         endTimeOrigin: this.endRange[this.endRange.length -1],
         start: this.originTime[this.originTime.length -1]
      
     })
  }
   },
   chartSelect(event, key) {
    if(this.delList === this.showRangeList) {
        this.delList = []
        this.selectText = "전체 선택"
    } else {
        this.delList = this.showRangeList 
        this.selectText = "전체 해제"
    }
   },
   selectChartDel() {
       this.$confirm('선택한 데이터를 삭제하시겠습니까?', '삭제', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                 for(var i in this.delList)
                    {
                        this.showRangeList.splice(this.showRangeList.findIndex(item=> {
                            return item === this.delList[i]
                        }), 1)
                        }
                        this.delList.splice(this.delList)
                    if(this.showRangeList <= 0 ) {
                        this.delList = []
                            this.selectText = "전체 선택"
                    }
                this.$message({
                message: '삭제 되었습니다.',
                type: 'success'});
                
            })
             .catch(() => {
                this.fullscreenLoading = false
            this.$message.info('취소 되었습니다.'); 
            });
      
   },
   
    resetBtn(){
      this.search = {
        key: "",
        kindId: null,
        name: "",
        title: "",
        platformCd: "",
        searchColumn: null,
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date()
      }
    },
  },
  mounted() {
   
  },
 
  
  computed: {
    ...mapGetters([
      'roles',
      // 'roles'
    ])
  }
}
</script>
