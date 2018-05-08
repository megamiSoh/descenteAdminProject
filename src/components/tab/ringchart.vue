<script>
  //Importing Bar class from the vue-chartjs wrapper
  import {Doughnut} from 'vue-chartjs'
  import { homeSummary } from '@/api/admin'
  //Exporting this so it can be used in other components
  export default {
      name: 'MyChart1',
      extends: Doughnut,
    //   props: ['datacollection'],
    data () {
      return {
        // weekDayDistribution: '',
        datacollection: {
          //Data to be represented on x-axis
        //   labels: [],
          datasets: [
            {
            //   label: 'Data One',
              backgroundColor: ['#35B982', '#00D8FF', '#E11C01', '#249EBF', 'pink', '#E7664D'],
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: []
            }
          ]
        },
        //Chart.js options that controls the appearance of the chart
        options: {
    //       scales: {
    // //         yAxes: [{
    // //           ticks: {
    // //             beginAtZero: true
    // //           },
    // //           gridLines: {
    // //             display: false,
    // // //   scaleShowHorizontalLines: true,
    // // //   scaleShowVerticalLines: true,
    // //           }
    // //         }],
    // //         xAxes: [ {
    // //           gridLines: {
    // //             display: false,
                
    // //           },
    //           barPercentage: 0.1
    //         }]
    //       },
          legend: {
            display: true,
            labels: {
                boxWidth: 20,
                fontSize: 13,
                padding: 10
            }
          },
        //   renderChart(){
        //       return this.datacollection, this.options
        //   },
          responsive: false,
          maintainAspectRatio: false,
        }
      }
    },
    created(){
        // this.homeSummary()
    },
    methods: {
    homeSummary() {
      homeSummary() 
      .then(response => {
        //   console.log(this.datacollection.labels)
            var label = []
        var data = []
       var week = response.ageRate
    //    var dataset = this.datacollection.datasets
       for(var i in week) {
    //     //    console.log(week[i].key)
           label.push(week[i].key)
           data.push(week[i].value)
       }
        this.datacollection.labels = label
        // this.dataset.data = data
        this.datacollection.datasets.filter(item => {
            return item
        })[0].data = data
        // console.log(this.datacollection.datasets.filter(item => {
        //     return item
        // })[0].data )
       this.chartRender()
      })
     
    },
    chartRender(){
        this.renderChart(this.datacollection, this.options)
    },
  },
    mounted () {
    //renderChart function renders the chart with the datacollection and options object.
        this.homeSummary()
    //    this.chartRender()
    }
  }
</script>