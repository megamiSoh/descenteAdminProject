<template>
<div  class="memberL">
    <div class="dashboard-container">
    <h1>데이터 보기</h1>

<div style="overflow: hidden;">
    <div style="width: 55%; float:left;">
   <el-form :inline="true" size="mini">
    <el-form-item label="데이터 제공자">{{chartInfo.name}} </el-form-item>
    <el-form-item label="운동명">{{chartInfo.title}}</el-form-item>
    <el-form-item label="운동 근육">{{chartInfo.kindName}}</el-form-item>
   </el-form>
   <el-button size="small" @click="showCharts('range'); removeShow = true; btnShow = false"> 데이터 가공 </el-button>
    <el-button size="small" @click="showCharts('range'); btnShow = true; removeShow = false"> 유효구간 지정 </el-button>
    
    <div style="width: 100%; overflow: hidden;">
      <div ref="table" ></div>
      <div id="test_composedLeft"></div>
      <div id="test_composedRight"></div>
    </div>
    <el-form>
        <el-form-item label="시간축 조정">
            <el-slider v-model="slideRange" @change="showCharts(slideRange)"  style="width: 57%; display: inline-block;"></el-slider>
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
                    <td><input type="checkbox" v-model="delList"  :value="item"/></td>
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
        <el-form-item ><el-button @click="showCharts('range')">재설정</el-button></el-form-item>
        <el-form-item><el-button @click="footEdit()" type="info">가공구간 지정 완료</el-button></el-form-item>
    </el-form>

    <el-form size="mini" :inline="true"  v-show="btnShow">
        <el-form-item label="유효 구간">
        {{startRangeList[startRangeList.length -1]}} - {{endRangeList[endRangeList.length -1]}}
        </el-form-item>
        <el-form-item ><el-button @click="showCharts('range')">재설정</el-button></el-form-item>
        <el-form-item><el-button @click="chartSlice()" type="info" plain>유효구간 지정 완료</el-button></el-form-item>
        <el-form-item>
            <el-button @click="chartSelect()">{{selectText}}</el-button>
        </el-form-item>
        <el-form-item><el-button type="danger" @click="selectChartDel()">선택구간 삭제</el-button></el-form-item>
        <el-form-item style="float: right;"><el-button type="info" @click="groupsetting = true">선택구간 저장</el-button></el-form-item>
    </el-form>
 </div>
<div class="btnWrap">
    <router-link v-bind:to="{path: 'footlist'}">
        <el-button size="small" type="info">리스트로 돌아가기</el-button>
    </router-link>
</div>
  <el-dialog :visible.sync = "groupsetting"  width="400px">
        <div>
          <h3 class="dialogHeader">선택구간 그룹설정</h3>
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
              <el-button @click="" type="warning">취소</el-button>
              <el-button @click="groupListRegist()"  type="info">설정완료</el-button>
            </el-form-item>
          </el-form>
        </el-form>
        </div>
        <div class="titleChild" style="margin-left: 129px;
   top: 155px;" v-show="hideNShow1">
          <span v-for="item in groupResult1" class="autocomplete" @click="autoComplete1(item)" >
          {{item}}
          </span>
        
          </div>
        <div class="titleChild" style="margin-left: 129px;
   top: 155px;"  v-show="noResultShow">
        <span class="autocomplete" style="padding: 5px 0;">
        검색결과가 없습니다.
        </span>
        </div>
    </el-dialog>
</div>
</template>

<script>
import { footDetail,footData, footLogKind, deleteChart, editChart, sliceChart, addGroup, getLogFootGroup,footGroupName,footpressgroups, footGroupRegistItem, getLogFootGroups, footCutInfo } from '@/api/admin'
import { mapGetters } from 'vuex'
import axios from 'axios'
import dc from  "dc"
import crossfilter from "crossfilter2"
import d3 from "../../../../node_modules/dc/node_modules/d3";
export default {
  data(){
     
    return{
      originData: '구간 데이터',
      groupsetting: false,
      hideNShow: false,
      hideNShow1: false,
      footTable: '',
      loading: false,
      loading1: false,
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
     kindResults: '',
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
    }
  },
created() {
this.getData()
this.footKind()
this.footData()
// this.footPressGroups()
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
    this.popgroupsearch.groupDivision = "CU"
    this.groupResult1 = []
    this.hideNShow1 = false
     this.getGroupData()
    },
    addEvent ({ type, target }) {
    // console.log(target.value)
    
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
         this.groupResult1 = response.results
         if(this.popgroupsearch.groupNm === '') {
            this.noResultShow = false
            this.hideNShow1 = false
         }
         else if(this.groupResult1.length <= 0) {
           this.hideNShow1 = false
           this.noResultShow = true
         } 
         else {
           this.hideNShow1 = true
           this.noResultShow = false
         }
        
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
            message: '데이터를 선택해 주세요.'
        })
      } else {
       var logKey = localStorage.getItem('logKey')
       var data = { groupNo: this.groupResults[0].groupNo, logKey: logKey, cutData: this.rangelist }
      this.$confirm('그룹을 설정 하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
      footCutInfo(data) 
      .then(response => {
        if(response === undefined) {
              this.$message({
                  message: '그룹을 설정할 수 없습니다.',
                  type: 'warning'
                  });
          } else {
              this.$message({
              message: '그룹설정이 완료 되었습니다.',
              type: 'success'}).setTimeout(function(){
                  alert(111)
                  location.reload()
              }, 1000)
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
  //   logfootList(){
  //    getLogFootGroup()
  //    .then(response => {
  //      this.footList = response.results
  //    })
  //  },
    getData(){
      this.loading = true
      var data = {paging: this.paging, search: this.search}
      footDetail(data)     
       .then(response => {
          this.loading= false
        this.results = response.results
        this.paging = response.paging
        // var titleList = []
        // for(var i = 0; i)
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
    footData() {
      this.loading1 = true
      var key = localStorage.getItem('logKey') 
      this.logKey = key
      var data = {logKey: key}
      footData(data)
      .then(response => {
        this.loading1 = false
        this.chartInfo = response
        this.data = response.footPressData
        
        this.showCharts()
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
              message: '선택한 데이터가 삭제되었습니다.',
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
    this.showChart = true
    this.slideRange = 100
    this.zoom = false
     this.brush = false
     this.startRange =  ''
     this.startResults = ''
     this.sliceRange = ''
     this.groupNo = 1
  },
  
    showCharts(val){
    

      (function() {
    var compositeChart = dc.compositeChart;
    dc.compositeChart = function(parent, chartGroup) {
        var _chart = compositeChart(parent, chartGroup);
        
        _chart._brushing = function () {
            var extent = _chart.extendBrush();
            var rangedFilter = null;
            if(!_chart.brushIsEmpty(extent)) {
                rangedFilter = dc.filters.RangedFilter(extent[0], extent[1]);
            }

            dc.events.trigger(function () {
                if (!rangedFilter) {
                    _chart.filter(null);
                } else {
                    _chart.replaceFilter(rangedFilter);
                }
                _chart.redrawGroup();
            }, dc.constants.EVENT_DELAY);
        };
        
        return _chart;
    };
})();
    function print_filter(filter) {
      var f = eval(filter);
      if (typeof f.length != "undefined") {
      } else {
      }
      if (typeof f.top != "undefined") {
        f = f.top(Infinity);
      } else {
      }
      if (typeof f.dimension != "undefined") {
        f = f
          .dimension(function(d) {
            return "";
          })
          .top(Infinity);
      } else {
      }
      // console.log(
      //   filter +
      //     "(" +
      //     f.length +
      //     ") = " 
      //     +
      //     JSON.stringify(f)
      //       .replace("[", "[\n\t")
      //       .replace(/}\,/g, "},\n\t")
      //       .replace("]", "\n]")
      // );
    }
    let currentMeanOfInteractionIsTouch = false;


//  var data = this.data
    var ndx = crossfilter(this.data);
    var parseDate = d3.time.format("%H:%M:%S.%L").parse
   

    this.data.forEach(function(d) {
    
      d.date = parseDate(d.timeStr)
    });
    var dateDim = ndx.dimension(function(d) {
      return d.date;
    });
    
    var l1pStatus = dateDim.group().reduceSum(d => d.l1p);
    var l2pStatus = dateDim.group().reduceSum(d => d.l2p);
    var l3pStatus = dateDim.group().reduceSum(d => d.l3p);
    var l4pStatus = dateDim.group().reduceSum(d => d.l4p);
    var r1pStatus = dateDim.group().reduceSum(d => d.r1p);
    var r2pStatus = dateDim.group().reduceSum(d => d.r2p);
    var r3pStatus = dateDim.group().reduceSum(d => d.r3p);
    var r4pStatus = dateDim.group().reduceSum(d => d.r4p);
  var hitslineChart = dc.compositeChart("#test_composedLeft");
  var hitslineChart1 = dc.compositeChart("#test_composedRight");

      if (val === 'range') {
        this.brush = true
        this.zoom = false
        var minDate = dateDim.bottom(1)[0].date
        var maxDate = dateDim.top(1)[0].date
      } else if(val === 'back') {
        this.showChartFunc()
        this.brush = false
        this.zoom = false
        var minDate = dateDim.bottom(1)[0].date
        var maxDate = dateDim.top(1)[0].date
      } else if(val === 'zoom') {
        this.brush = false
        this.zoom = true
        var minDate = dateDim.bottom(1)[0].date
        var maxDate = dateDim.top(1)[0].date
      } else if(val === undefined) {
         var minDate = dateDim.bottom(1)[0].date
        var maxDate = dateDim.top(1)[0].date
        this.brush = false
        this.zoom = false
      } else if(typeof val === 'number') {
          var minDate = dateDim.bottom(1)[0].date
          var maxDate = new Date(dateDim.top(1)[0].date)
          maxDate.setSeconds(maxDate.getSeconds() + ((100-val)/5))
      } else if(val === "chartClickShow") {
          this.chartClickShow = true
      }
 
    var chartClickShow =  this.chartClickShow
  var mouse = this.zoom
  var brush = this.brush
    function bindChart(charts){
      charts
        .width(650)
        .height(300)
        .dimension(dateDim)
        .mouseZoomable(mouse)
         .x(d3.time.scale().domain([minDate, maxDate]))
        .brushOn(brush)
        .legend(
          dc
            .legend()
            .x(50)
            .y(10)
            .itemHeight(13)
            .gap(5)
        );
        return charts;
      };

      bindChart(hitslineChart)
        .compose([
           dc.lineChart(hitslineChart)
                .dimension(dateDim)
                .colors('red')
                .group(l1pStatus, "l1p")
                ,
            dc.lineChart(hitslineChart)
                .dimension(dateDim)
                .colors('blue')
                .group(l2pStatus, "l2p")
                ,
            dc.lineChart(hitslineChart)
              .dimension(dateDim)
              .colors('orange')
              .group(l3pStatus, "l3p")
              ,
            dc.lineChart(hitslineChart)
              .dimension(dateDim)
              .colors('green')
              .group(l4pStatus, "l4p")
            ])
            .yAxisLabel("LeftData");

      bindChart(hitslineChart1)
        .compose([
            dc.lineChart(hitslineChart1)
                .dimension(dateDim)
                .colors('red')
                .group(r1pStatus, "r1p")
                ,
            dc.lineChart(hitslineChart1)
                .dimension(dateDim)
                .colors('blue')
                .group(r2pStatus, "r2p")
                ,
            dc.lineChart(hitslineChart1)
              .dimension(dateDim)
              .colors('orange')
              .group(r3pStatus, "r3p")
              ,
            dc.lineChart(hitslineChart1)
              .dimension(dateDim)
              .colors('green')
              .group(r4pStatus, "r4p")  
            ])
            .yAxisLabel("Right Data");

    var drag = d3.behavior.drag()
   

    function rangesEqual(range1, range2) {
        if (!range1 && !range2) {
            return true;
        }
        else if (!range1 || !range2) {
            return false;
        }
        else if (range1.length === 0 && range2.length === 0) {
            return true;
        }
        else if (range1[0].valueOf() === range2[0].valueOf() &&
            range1[1].valueOf() === range2[1].valueOf()) {
            return true;
        }
        return false;
    }

    var x = []
    var y = []
    var listx = []
    var listy = []
    this.startRange = x
    this.startRangeList = listx
    this.endRange = y
    this.endRangeList = listy
    var originTime = []
    this.originTime = originTime
    
    hitslineChart.focusCharts = function (chartlist) {
        if (!arguments.length) {
            return this._focusCharts;
        }
        this._focusCharts = chartlist; 
        this.on('filtered', function (range_chart) {
            if (!range_chart.filter()) {
                dc.events.trigger(function () {
                    chartlist.forEach(function(focus_chart) {
                        focus_chart.x().domain(focus_chart.xOriginalDomain());
                    });
                });
            } else chartlist.forEach(function(focus_chart) {
                if (!rangesEqual(range_chart.filter(), focus_chart.filter())) {
                 
                    dc.events.trigger(function () {
                        if(brush === true){
                          var extent =range_chart.extendBrush();
                          var rangedFilter =  dc.filters.RangedFilter(extent[0], extent[1]);
                      
                          focus_chart.replaceFilter(rangedFilter)
                        }
                        if(mouse === true){
                          focus_chart.focus(range_chart.filter())
                        //  focus_chart.focus(this.showRangeList[0].start.startTime, this.showRangeList[0].start.endTime)
                        } 
                        
                       originTime.push(
                             range_chart.filter()
                           
                        )
                       x.push('00:00:'+ ('0' + range_chart.filter()[0].getSeconds()).slice(-2)+'.'+ ('00' + range_chart.filter()[0].getMilliseconds()).slice(-3))
                      y.push('00:00:'+ ('0' + range_chart.filter()[1].getSeconds()).slice(-2)+'.'+ ('00' + range_chart.filter()[1].getMilliseconds()).slice(-3))
                        listx.push(('0' + range_chart.filter()[0].getSeconds()).slice(-2)+'.'+ ('00' + range_chart.filter()[0].getMilliseconds()).slice(-3))
                        listy.push( ('0' + range_chart.filter()[1].getSeconds()).slice(-2)+'.'+ ('00' + range_chart.filter()[1].getMilliseconds()).slice(-3))
                    });
                }
            });
        });
        
        return this;
    };
  
    hitslineChart1.focusCharts = function (chartlist) {
        if (!arguments.length) {
            return this._focusCharts;
        }
        this._focusCharts = chartlist; 
  
        this.on('filtered', function (range_chart) {
            if (!range_chart.filter()) {
                dc.events.trigger(function () {
                    chartlist.forEach(function(focus_chart) {
                        focus_chart.x().domain(focus_chart.xOriginalDomain());
                      // focus_chart.x(d3.time.scale().domain([minDate, maxDate]))
                    });
                });
            }  else chartlist.forEach(function(focus_chart) {
                if (!rangesEqual(range_chart.filter(), focus_chart.filter())) {
                    dc.events.trigger(function () {
                        if(brush === true){
                          var extent =range_chart.extendBrush();
                          var rangedFilter =  dc.filters.RangedFilter(extent[0], extent[1]);
                          focus_chart.replaceFilter(rangedFilter)
                        }
                        if(mouse === true){
                          focus_chart.focus(range_chart.filter())
                       
                        }
                      x.push('00:00:'+ ('0' + range_chart.filter()[0].getSeconds()).slice(-2)+'.'+ ('00' + range_chart.filter()[0].getMilliseconds()).slice(-3))
                      y.push('00:00:'+ ('0' + range_chart.filter()[1].getSeconds()).slice(-2)+'.'+ ('00' + range_chart.filter()[1].getMilliseconds()).slice(-3))
                        
                    listx.push(('0' + range_chart.filter()[0].getSeconds()).slice(-2)+'.'+ ('00' + range_chart.filter()[0].getMilliseconds()).slice(-3))
                    listy.push( ('0' + range_chart.filter()[1].getSeconds()).slice(-2)+'.'+ ('00' + range_chart.filter()[1].getMilliseconds()).slice(-3))
                   
                    });
                    
                    
                }
            });
           
        });
        
        return this;
    };
    hitslineChart.focusCharts([hitslineChart, hitslineChart1]);
    hitslineChart1.focusCharts([hitslineChart, hitslineChart1]);

    
    dc.renderAll();
    },
   footEdit() {
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
              this.footData().setTimeout(function(){
                  location.reload()
              }, 1000)
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
      if (this.startRange.length <= 0){
        this.$notify.error({
            title: 'Error',
            message: '자를 영역을 선택해 주세요.'
          });
     } 
    //  else {
     this.loading1 = true
    
    //  var rangelist = []
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
        //  end: this.originTime[this.originTime.length -1]
     })
    // sliceChart(data)
    //   .then(response => {
    //     if(response === undefined) {
    //       this.loading1 = false
    //     this.$message({
    //       message: '관리자에게 문의하세요.',
    //       type: 'warning'
    //     });
    //      this.sliceRange = []
    //      this.showCharts(undefined)
    //     } else {
    //       this.loading1 = false
    //     this.$message({
    //       message: '등록이 완료 되었습니다.',
    //       type: 'success'
    //     });
    //     this.sliceRange = []
    //   this.showCharts(undefined)
    //     }
    //     this.sliceRange = []
    //   this.showCharts(undefined)
    //   })
    //   .catch(error => {
       
    //  })
    //  }
   },
  showChartData(key){
        // console.log(this.showRangeList[key])
     
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
      

    // console.log("root refs: " + this.$refs.chart);
    // console.log("root elm: " + this.$el);

    // console.dir(this.$refs);
  },
 
  
  computed: {
    ...mapGetters([
      'roles',
      // 'roles'
    ])
  }
}
</script>
