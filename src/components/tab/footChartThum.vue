<template>
    <div v-loading="loading">
        <div v-show="!listShape">
        <table class="el-table">
            <thead class="el-table-column listTableHead">
                <tr>
                    <th>No</th>
                    <th>구간이름</th>
                    <th>추가날짜</th>
                    <th>데이터 제공자 <br> (측정대상)</th>
                    <th>선택</th>
                </tr>
            </thead>
            <tbody class="el-table-column listTable">
                <tr v-for="entry in cutInfos">
                    <td>{{entry.cutNo}}</td>
                    <td>{{entry.title}}
                        <span v-show="entry.title === null">
                            <strong>-</strong>
                        </span>
                    </td>
                    <td style="font-weight: bold"> - </td>
                    <td>{{entry.name}}
                        <span v-show="entry.name === null">
                            <strong>-</strong>
                        </span>
                    </td>
                    <td><input type="checkbox" ref="input" :value="entry.cutNo" v-model="listCutNo" @change="listCutNum(entry.cutNo)"/></td>
                </tr>
                <tr v-if="cutInfos === null">
                <td colspan="5" class="searchResultsStyle">검색결과가 없습니다.</td>
                    
                </tr>
            </tbody>
        </table>
    </div>
        
        <div class="chartStyleWrap" v-show="listShape">
            <div v-for="(item, key) in idListLeft" class="chartStyle">
            <el-form :inline="true" style="padding: 0 10px;">
                <el-form-item>No: {{item.cutNo}}</el-form-item>
                <el-form-item class="member_btn_wrap">
                   <input type="checkbox" :value="item.cutNo" v-model="listCutNo" @change="listCutNum(item.cutNo)"/>
                </el-form-item>
            </el-form> 
            <el-form>
            <el-form-item label=" - Left Data">
                <div :id="item.left">
            
                </div>
            </el-form-item>
            
          <el-form-item label=" - Right Data">
             <div :id="item.right">
            
            </div>
          </el-form-item>
            </el-form>
            <el-form style="text-align: center;" >
                <el-form-item class="chartTextWrap">구간이름 : {{item.title}} </el-form-item>
                <el-form-item class="chartTextWrap">{{item.start}} / {{item.end}}</el-form-item>
                <el-form-item class="chartTextWrap">데이터제공자 : {{item.name}}</el-form-item>
            </el-form>
        </div>
        </div>
    <nav class="text-sm-center"  v-if="cutInfos === null ? false: true" style="text-align: center;">
      <ul class="pagination" id="searchPager">
            <li class="page-item page-arrowFirst">
                <a class="page-link" @click="firstPage()">
                  &lt; &lt;
              </a>
            </li>
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
          <li class="page-item page-arrowFirst">
                <a class="page-link" @click="endPage()">
                  &gt;&gt;
              </a>
            </li>
      </ul>
    </nav>
   <el-form style="position: relative;  top: 40px; margin-right: 15px;">
     <el-form-item class="member_btn_wrap" size="mini"><el-button @click="listChart()">{{listShape? '목록형태로 보기':'차트형태로 보기'}}</el-button></el-form-item>
   </el-form>
    </div>
</template>
<script>
import dc from  "dc"
import crossfilter from "crossfilter2"
import d3 from "../../../node_modules/dc/node_modules/d3";
import { detailFootGroup, footLogKind, footpressgroups, removeFootGroup, footCutInfos, removeCutInfo, movefootInfo,copyfootInfo, footGroupName, getLogFootGroups, editFootGroup } from '@/api/admin.js'
export default {
    name: 'footThumb',
    props: ['item'], 
    data(){
        return{
            loading: false,
            paging: {
                page: 1,
                pageSize: 5,
                totalPages: 9,
                totalRecords: 87,
                orderBy: 'CutNo',
                ascending: false
            },
            cutInfos: '',
            idListLeft: '',
            listShape: false,
            listCutNo: [],
        }
    },
    created(){
        this.cutdetail()
        console.log('created')
    },
    mounted() {
        this.cutdetail()
        console.log('mounted')
    },
   
    methods: {
        submit(){
            this.cutdetail()
        },
     
    listCutNum(){
    this.$emit('listCutNum',this.listCutNo)
    },
         cutdetail(){
             
      this.loading = true
      var no = localStorage.getItem('no')
      var data ={groupNo : no, paging: this.paging}
       footCutInfos(data)
      .then(response=> {
            this.loading = false
            var idListLeft = []
            this.listCutNo = []
            this.paging = response.paging
            this.cutInfos= response.results
      
            for(var i in this.cutInfos) {
                idListLeft.push({
                    left:'test_composedLeft' +  (i + 1), 
                    right: 'test_composedRight' +  (i + 1),
                    title: this.cutInfos[i].title,
                    name: this.cutInfos[i].name,
                    cutNo: this.cutInfos[i].cutNo,
                    start: this.cutInfos[i].startTime,
                    end: this.cutInfos[i].endTime

                })
            }
            this.idListLeft = idListLeft
            
            for(var i in this.cutInfos) {
                this.showCharts(i)
            }
            // this.showCharts(1)
            // console.log(this.i)
        })
    },
        showCharts(val){
   
    var ndx = crossfilter(this.cutInfos[val].cutData);
    var parseDate = d3.time.format("%H:%M:%S.%L").parse
   

    this.cutInfos[val].cutData.forEach(function(d) {
    var timeformat = d.time + '.000'
      d.date = parseDate(timeformat.slice(0, 12))
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
    var hitslineChart = dc.compositeChart("#test_composedLeft"+(val+1));
  var hitslineChart1 = dc.compositeChart("#test_composedRight"+(val+1));

 var minDate = dateDim.bottom(1)[0].date
var maxDate = dateDim.top(1)[0].date
    function bindChart(charts){
        
      charts
        .width(250)
        .height(200)
        .dimension(dateDim)
         .x(d3.time.scale().domain([minDate, maxDate]))
        return charts;
      };

      bindChart(hitslineChart)
        .compose([
           dc.lineChart(hitslineChart)
                .dimension(dateDim)
                .colors('#CC1800')
                .group(l1pStatus, "l1p")
                ,
            dc.lineChart(hitslineChart)
                .dimension(dateDim)
                .colors('#4141ff')
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

      bindChart(hitslineChart1)
        .compose([
             dc.lineChart(hitslineChart1)
                .dimension(dateDim)
                .colors('#CC1800')
                .group(r1pStatus, "r1p")
                ,
            dc.lineChart(hitslineChart1)
                .dimension(dateDim)
                .colors('#4141ff')
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
           dc.renderAll();
    
    },
        listChart() {
        if(this.listShape === true) {
            this.listShape = false
        } else {
            this.listShape = true
        }
    },
        movePage(page) {
          this.paging.page = page;
          
            this.cutdetail()
            // this.cutdetail()
      },
      firstPage(){
          this.paging.page = 1
          this.cutdetail()
        //   this.cutdetail()
      },
      endPage(){
          this.paging.page = this.paging.totalPages
          this.cutdetail()
            // this.cutdetail()
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.cutdetail()
            // this.cutdetail()
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.cutdetail()
            // this.cutdetail()
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
          
      },
       
    
    }
}
</script>