<template>
    <div>
        <div id="origin_composedLeft"></div>
        <div id="origin_composedRight"></div>
    </div>
</template>
<script>
import { footDetail,footData, footLogKind, deleteChart, editChart, sliceChart, addGroup, getLogFootGroup,footGroupName,footpressgroups, footGroupRegistItem, getLogFootGroups, footCutInfo,retoreOrigin } from '@/api/admin'
import dc from  "dc"
import crossfilter from "crossfilter2"
import d3 from "../../../node_modules/dc/node_modules/d3";

export default {
    name: 'footOrigin',
    date() {
        return {
            originFootData: '',
            logKey: '',
        }
    },
    created(){
        // this.footData()
    },
    methods:{
        showOriginCharts(val){
    var ndx = crossfilter(this.originFootData);
    var parseDate = d3.time.format("%H:%M:%S.%L").parse
   

    this.originFootData.forEach(function(d) {
      d.date =  parseDate(d.timeStr)
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


  var hitslineChart = dc.compositeChart("#origin_composedLeft");
  var hitslineChart1 = dc.compositeChart("#origin_composedRight");
 var minDate = dateDim.bottom(1)[0].date
var maxDate = dateDim.top(1)[0].date
    function bindChart(charts){
      charts
        .width(500)
        .height(200)
        .dimension(dateDim)
        .brushOn(false)
         .x(d3.time.scale().domain([minDate, maxDate]))
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

    dc.renderAll();
    
    },
        footData() {
        var key = localStorage.getItem('logKey') 
        this.logKey = key
        var data = {logKey: key}
        footData(data)
        .then(response => {
             this.originFootData = response.originFootData
            if(this.originFootData.length > 0){
            // this.originFootData = response.originFootData
            this.showOriginCharts()
            }
            
        })
        },
    }
}
</script>