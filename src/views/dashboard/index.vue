<template>
  <div class="dashboard-container memberL">
  <h1 style="padding-top: 15px;"><i class="el-icon-info" style="padding-right: 10px;"></i>Home</h1>
      <table class="homeWrap">
        <tr>
          <th>| 앱 신규 설치자</th>
          <th>| 전체 사용자</th>
          <th>| 스마트슈즈 활성 사용자</th>
        </tr>
        <tr>
          <td>
              <div>{{todayJoinUserCount}}명</div>
          </td>
          <td>
              <div>{{totalUserCount}}명</div>
          </td>
          <td>
              <div>{{shoeActiveCount}}명</div>
          </td>
        </tr>
        <tr>
          <th>| 사용자 성별 분포</th>
          <th>| 사용자 연령벌 분포</th>
          <th>| 1인 평균 영상 컨텐츠 구독 수</th>
        </tr>
        <tr>
          <td rowspan="3">
              <div>
                <barchart></barchart>
              </div>
          </td>
          <td rowspan="3" style="width: 450px;" >
              <div>
                <MyChart1 :width="450" :height="200"></MyChart1>
              </div>
          </td>
          <td>
              <div>{{personContentAverage}}개</div>
          </td>
        </tr>
        <tr>
          <th>| 1일 평균 실행 횟수</th>
        </tr>
        <tr>
          <td>
              <div>{{todayJoin}}회</div>
          </td>
        </tr>
        <tr>
          <th  colspan="3">| 요일별 사용자 분포(전체기간)</th>
        </tr>
        <tr>
          <td colspan="3">
              <div>
                <MyChart :width="750" :height="300" align="center"></MyChart>
              </div>
          </td>
        </tr>
      </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MyChart from '../../components/tab/chart'
import MyChart1 from '../../components/tab/ringchart'
import MyChart2 from '../../components/tab/donut'
import barchart from '../../components/tab/stackbarchart'
import { homeSummary } from '@/api/admin'

export default {
  components: { MyChart,MyChart1, MyChart2, barchart },
  data() {
    return {
      todayJoin: '',
      totalUserCount: '',
      shoeActiveCount: '',
      genderRate: '',
      personContentAverage: '',
      todayJoinUserCount: '',

        //Chart.js options that controls the appearance of the chart
       
      
    }
  },
  created() {
    this.homeSummary();
  },
  methods: {
    homeSummary() {
      homeSummary() 
      .then(response => {
        this.todayJoin = response.todayJoinUserCount
        this.totalUserCount = response.totalUserCount
        this.shoeActiveCount = response.shoeActiveCount
        this.genderRate = response.genderRate
        this.personContentAverage = response.personContentAverage.toFixed(2)
        // console.log(this.personContentAverage.))
        this.todayJoinUserCount = response.todayJoinUserCount
      })
    },
  },
  // mounted () {
  //   this.renderChart(this.datacollection,  this.options)
  // },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>