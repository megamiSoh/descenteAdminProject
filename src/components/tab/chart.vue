<script>
  import {Bar} from 'vue-chartjs'
  import { homeSummary } from '@/api/admin'
  export default {
      name: 'MyChart',
      extends: Bar,
    data () {
      return {
        datacollection: {
          labels: [],
          datasets: [
            {
              backgroundColor: '#f87979',
              pointBackgroundColor: 'white',
              borderWidth: 2,
              pointBorderColor: '#249EBF',
              data: []
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true,
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false,
                
              },
              barPercentage: 0.5
            }]
          },
          legend: {
            display: false
          },
          responsive: false,
          maintainAspectRatio: false,
        }
      }
    },
    methods: {
    homeSummary() {
      homeSummary() 
      .then(response => {
            var label = []
        var data = []
       var week = response.weekDayDistribution
       for(var i in week) {
           label.push(week[i].key)
           data.push(week[i].value)
       }
        this.datacollection.labels = label
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
      this.homeSummary()
   
    }
  }
</script>