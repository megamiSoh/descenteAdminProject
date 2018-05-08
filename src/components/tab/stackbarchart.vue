<template>
  <ve-histogram :data="chartData" :settings="chartSettings" :width="width" :colors="color"></ve-histogram>
</template>

<script>
  import { homeSummary } from '@/api/admin'
   export default {
       name: 'MyChart2',
       data(){
          return {
                chartData: null,
                chartSettings: null,
                width: '150px',
                color: ['#249EBF', '#CC1800']
          }
       },
      methods: {
    homeSummary() {
      homeSummary() 
      .then(response => {
            var label = []
        var data = []
       var week = response.genderRate
       this.chartData = {
        columns: ['date'],
        rows: [
          {'date': '','남자': week[0].value, '여자': week[1].value }
        ]
      }
      this.chartSettings = {
        metrics: ['남자', '여자'],
        stack: { 'sales': ['남자', '여자'] }
      }
      })
     
    },
    
  },
    created () {
        this.homeSummary()
     
    }
  }
</script>