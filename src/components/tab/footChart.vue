<template>
    <div>
        <div id="test_composedLeft"></div>
        <div id="test_composedRight"></div>
    </div>
</template>
<script>
import dc from  "dc"
import crossfilter from "crossfilter2"
import d3 from "../../../node_modules/dc/node_modules/d3";
import { footData } from '@/api/admin'
export default {
    name: 'footChart',
    // props:['chartInfo.name'],
    data(){
        return {
            zoomMethods:1,
            startRange: '',
            startRangeList: '',
            endRange: '',
            endRangeList: '',
            originTime: '',
            chartInfo: '',
            logKey: '',
            showChart: '',
            slideRange: '',
            zoom: '',
            startResults: '',
            sliceRange: '',
            groupNo: '',
            slideRange: 100,
        }
    },
    
    created(){
        this.footData()
       
    },
    methods: {
         showChartFunc(){
    this.showChart = true
    this.slideRange = 100
    this.zoom = false
     this.brush = false
     this.startRange =  ''
     this.startResults = ''
     this.sliceRange = ''
     this.groupNo = 1 
     this.footData()
  },
        chartSlice(){
        this.$emit('cutList', this.startRange, this.startRangeList, this.endRange, this.endRangeList, this.originTime, this.chartInfo, this.logKey, this.zoomMethods, this.slideRange)
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
    //   console.log(
    //     filter +
    //       "(" +
    //       f.length +
    //       ") = " 
    //       +
    //       JSON.stringify(f)
    //         .replace("[", "[\n\t")
    //         .replace(/}\,/g, "},\n\t")
    //         .replace("]", "\n]")
    //   );
    }
    let currentMeanOfInteractionIsTouch = false;


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
      } else if(val === true) {
          var minDate = dateDim.bottom(1)[0].date
          var maxDate = new Date(dateDim.top(1)[0].date)
          if(maxDate.getSeconds() <= this.zoomMethods) {
              maxDate.setSeconds(maxDate.getSeconds() - this.zoomMethods)
          } else {
              this.zoomMethods = 1 + this.zoomMethods
              maxDate.setSeconds(maxDate.getSeconds() - this.zoomMethods)
          }
          
      }  else if(val === false) {
      
          var minDate = dateDim.bottom(1)[0].date
          var maxDate = new Date(dateDim.top(1)[0].date)
          if(maxDate.getSeconds() <= this.zoomMethods) {
              maxDate.setSeconds(maxDate.getSeconds() + this.zoomMethods)
          } else {
              this.zoomMethods = 1 + this.zoomMethods
              maxDate.setSeconds(maxDate.getSeconds() + this.zoomMethods)
          }
        

      } else if(val === undefined) {
         var minDate = dateDim.bottom(1)[0].date
        var maxDate = dateDim.top(1)[0].date
        this.brush = false
        this.zoom = false
      } else if(typeof val === 'number') {
          var minDate = dateDim.bottom(1)[0].date
          var maxDate = new Date(dateDim.top(1)[0].date)
          maxDate.setSeconds(maxDate.getSeconds() + ((100-val)/5))
      } 
    var chartClickShow =  this.chartClickShow
  var mouse = this.zoom
  var brush = this.brush
    function bindChart(charts){
      charts
        .width(650)
        .height(300)
        .dimension(dateDim)
        .mouseZoomable(false)
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
            .yAxisLabel("LeftData");

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
    footData() {
      var key = localStorage.getItem('logKey') 
      this.logKey = key
      var data = {logKey: key}
      footData(data)
      .then(response => {
        this.chartInfo = response
        if(response.footPressData.length > 0){
            this.data = response.footPressData
            this.originFootData = response.originFootData
            this.showCharts()
            this.chartSlice()
        } else {
        this.$message.error('차트 정보가 없습니다.');
        }
      })
    },
    },
}
</script>