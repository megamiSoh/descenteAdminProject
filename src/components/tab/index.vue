
  <template>
  <div>
  <div class="tabTableStyle">
    <div id="exerApp">
      <h1 style="margin-bottom: 10px;">Date <span>날짜를 선택해 주세요</span></h1>
        <v-calendar
      :attributes='attributes'
      @update:frompage='checkMonth'
      @dayclick='dayClicked'
      v-model="selectedDate"
      >
    </v-calendar>
    </div>
    <div class="monthdata">
      <h1>Monthly data <span>월별 운동 평균치 입니다.</span></h1>
      <el-form>
      <el-form-item>
          <el-row :gutter="20" :bind="user">
              <el-col :span="4"><div class="grid-content bg-purple">{{summary.userExerciseMonthCount}}</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple">{{summary.intensity}}<span v-if="summary.intensity === null"><strong>-</strong></span></div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple">{{summary.sensoryIntensity}}<span v-if="summary.sensoryIntensity === null"><strong>-</strong></span></div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple">{{summary.satisfaction}}<span v-if="summary.satisfaction === null"><strong>-</strong></span></div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple">{{summary.progressResult}}<span v-if="summary.progressResult === null"><strong>-</strong></span></div></el-col>
          </el-row>
      </el-form-item>
      <el-form-item class="month-size">
          <el-row :gutter="20">
              <el-col :span="4"><div class="grid-content bg-purple">이달 진행한 운동 컨텐츠</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple">평균 난이도</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple">평균 체감 강도</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple">평균 만족도</div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple">평균 진행결과</div></el-col>
          </el-row>
      </el-form-item>
    </el-form>
    </div>
  </div>
  <p class="tabTextStyle">- {{username}} 회원님의  <strong style="color: #87113c;">{{year}}년 {{month}}월 {{selectedDay}}일 </strong> 운동 데이터 입니다.</p>
  <table class="el-table" >
    <tr class="el-table-column listTableHead">
      <th>운동시간</th>
      <th>운동 컨텐츠</th>
      <th>운동 주제</th>
      <th>소요 시간</th>
      <th>난이도</th>
      <th>진행결과</th>
      <th>체감 강도</th>
      <th>기분 상태</th>
      <th>만족도</th>
    </tr>
    <tbody class="el-table-column listTable" >
      <tr v-for="entry in dayUserResult" @click="themeShow(entry.themeId, entry.exerciseNo)">
      <td>{{entry.createTime}}</td>
      <td>{{entry.themeKindCateName}}</td>
      <td>{{entry.name}}</td>
      <td>{{entry.duration}}</td>
      <td>{{entry.intensityName}}</td>
      <td>{{entry.progressResult}}</td>
      <td>{{entry.intensItyName}}</td>
      <td>{{entry.feelState}}</td>
      <td>{{entry.satisfaction}}</td>
    </tr>
    <tr>
      <td colspan="9" style="text-align: center; padding: 40px;" v-if="dayUserResult === null ">운동정보가 없습니다.</td>
    </tr>
    </tbody>
  </table>
 
  
  <el-dialog align="center" :visible.sync="showDetail" class="mediaPopOver tabdefault">
    <h3>메인운동 상세 보기</h3>
    <table class="tabLeftTable el-table" cellspacing="0" cellpadding="0">
    <colgroup>
      <col width="200" />
      <col width="80" />
      <col width="80" />
      <col width="80" />
      <col width="60" />
      <col width="140" />
      <col width="200" />
    </colgroup>
      <tr v-for="item in themeItem">
        <th>{{item.name}}</th>
        <td><span v-if="item.isFootPressure === true">Great <span class="stateShape" v-if="item.greatCnt === null"><strong>ㅡ</strong></span><span v-else class="stateShape">{{item.greatCnt}}</span></span><span v-else><strong>ㅡ</strong></span></td>
        <td><span v-if="item.isFootPressure === true">Good<span class="stateShape" v-if="item.goodCnt === null"><strong>ㅡ</strong></span><span v-else class="stateShape">{{item.goodCnt}}</span> </span><span v-else><strong>ㅡ</strong></span></td>
        <td><span v-if="item.isFootPressure === true">Bad<span class="stateShape" v-if="item.badCnt === null"><strong>ㅡ</strong></span><span v-else class="stateShape">{{item.badCnt}}</span> </span><span v-else><strong>ㅡ</strong></span></td>
        <td><span v-if="item.isFootPressure === true">{{item.progressResult}}</span><span v-else><strong>ㅡ</strong></span></td>
        <td>{{item.count}}회 {{item.set}}세트</td>
        <td>
          <el-form :inline="true" size="mini" class="tabThemeShow"   v-if="item.isFootPressure === false || item.isFootPressure === null">
            <el-form-item v-show="item.exerKindCateId === 121"><el-input disabled size="mini" style="width:40px;" v-model="item.kg"></el-input></el-form-item>
            <el-form-item  v-show="item.exerKindCateId === 121">Kg</el-form-item>
            <el-form-item ><el-input disabled size="mini" style="width:40px;" v-model="item.inputCount"></el-input></el-form-item>
            <el-form-item>회</el-form-item>
            <el-form-item ><el-input disabled size="mini" style="width:40px;" v-model="item.inputSet"></el-input></el-form-item>
            <el-form-item>세트</el-form-item>
          </el-form>
          <span v-else><strong>ㅡ</strong></span>
        </td>
      </tr>
      <tr v-show="themeItem <= 0">
        <td colspan="7" style="padding: 40px;">운동정보가 없습니다.</td>
      </tr>
    </table>
</el-dialog>


  </div>
  
</template>
<script>
import {  sendPwd, monthSummary, exerDate, getDayUserexer, getUsers, getExerKind, themeuser } from '@/api/member'
import VCalendar from 'v-calendar';

  export default {
    name: 'tabcon1',
    // props: ['left'],
     data() {
      return {
         showDetail: false,
        //  left: '',
          user: '',
          file: '',
          menuAuth: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          pickDate: '',  
        },
         dayUserResult: '',
        formLabelWidth: '120px',
        // dayClicked: '',
         mode: 'single',
          selectedDate: null,
          exerKind: '',
      //    attrs: [
      //   {
      //     key: 'today',
      //     highlight: {
      //       backgroundColor: '#ff8080',
      //     },
      //     // Just use a normal style
      //     contentStyle: {
      //       color: '#fafafa',
      //     },
      //     dates: new Date(2018, 0, 1)
      //   },
      // ],
      selectedDay: new Date().getDate(), 
      username: '',
      themeResults: '',
      themeItem: '',
      todos: [
        {
          id: 0,
          date: new Date() ,
          isCompleted: false,
          high: '#97a4c0',
          style: '#fff',
          opacity: 0,
        },
        
      ],
      
      month: new Date().getMonth() +1,
      year: new Date().getFullYear(),
      summary: '',
      }
      }, 
      created(){
        this.monthSummary()
        this.dayuser()
        this.getUsers()
        this.getExer()
      },
      computed: {
     
      attributes() {
        // console.log(this.todos)
        // alert(this.todos[0])
        // dot: {
        //   backgroundColor: this.todos[0].color
        // }
      return this.todos.map(t => ({
        // key: `todo.${t.id}`,
        key: `todo.${t.id}`,
        dot: {
          backgroundColor: t.color,
          opacity: t.opacity
        },
        highlight: {
          backgroundColor: t.high
        },
        contentStyle: {
            color: t.style,
          },
        dates: t.date,
        customData: t,
       dateList: ''
      }
      
      ));
    },
   
  },
      methods: {
        getExer() {
           getExerKind()
          .then(response => {
            this.exerKind = response.results
          })
        },
        themeShow(val,val1) {
          this.showDetail = true
          var id = localStorage.getItem('id')
          var data = {userId: id, themeId: val, exerciseNo: val1}
          themeuser(data)
          .then(response => {
            this.themeResults = response
            this.themeItem = response.items
          })
        },
        getUsers() {
        let val = localStorage.getItem('id')
        var data = {id: val}
        getUsers(data)
            .then(response => {
              this.username = response.user.name
          }).catch(response => {
          })
        },
         dayClicked(day) {
           this.todos.filter(item => {
             return item.id === 0
           })[0].date = new Date(this.year, this.month -1, day.day)
      this.selectedDay = day.day
      this.dayuser()
      
    },
         dayuser() {
        var id = localStorage.getItem('id')
        var data = {userId : id, year: this.year, month: this.month, day: this.selectedDay}
        getDayUserexer(data)
        .then(response => {
          this.dayUserResult = response.results
        })
      },
        checkMonth(monthComps){
          this.month = monthComps.month
          this.year = monthComps.year
          this.monthSummary()
          this.exerciseDate()
        },
        
        monthSummary() {
          var id = localStorage.getItem('id')
          // var years = new Date(this.todos[0].date).getFullYear()
          var data = {userId : id, year: this.year, month: this.month}
          monthSummary(data)
          .then(response => {
            this.summary = response
          })
        },
        exerciseDate(){
          var id = localStorage.getItem('id')
          var data = {userId : id, year: this.year, month: this.month}
          exerDate(data)
          .then(response => {
            var dateList = []
            for(var i in response) {
            dateList.push({
                id: JSON.parse(i) + 1,  
                date: new Date(this.year, this.month-1, response[i]),
                color: '#f2518c'
              })
            }
            
            dateList.push({
          id: 0,
          date: new Date() ,
          isCompleted: false,
          high: '#97a4c0',
          style: '#fff',
          opacity: 0,
        })
      
        this.todos = dateList
          })
        },
     
    },
    
    
}
</script>

<style scoped>
  #exerApp {float: left;}
    .calwrap {width:24%; display: inline-block; overflow: hidden; border-bottom: 2px solid darkgray; height: 360px;}
    h1 {margin: 0; border-bottom: 2px solid darkgray; text-align: center; font-weight: normal; padding: 15px 0;}
    h1 span {font-weight: normal; font-size: 12px;} 
    .monthdata {width: 75%; float: right;}
    
  .el-col {
    border-radius: 4px;
    padding: 0;
    width: 160px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #f9f9f9;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    min-height: 36px;
    font-weight: bold;
    text-align: center;
    font-size: 24px;
  }
  .row-bg {
    background-color: #f9fafc;
  }
  .el-form {
    margin-top: 10px;
    padding: 45px 0 45px 11px;
    background-color: #f9f9f9;
  }
  
  .month-size .grid-content  {
      font-size: 12px;
  }
  .el-table {text-align: center;}
  .el-table th>.cell {text-align: center;}
  .el-dialog {width: 800px;}
  .el-dialog .el-form {background: none; margin: 0; padding: 0;}
  .main {padding: 0 92px; display: inline-block; font-weight: bold;}
  .main:first-child {margin-left: 5px;}
  .main:last-child {margin-right: 5px;}
  .main2 {display: inline-block; padding: 0 72px; font-weight: bold;}
  .el-icon-arrow-left {display: none;}
   .el-icon-arrow-right {display: none;}
   .is-scrollable {padding: 0;}
   .el-dialog title {font-size: 30px;}
   .exerdesee {font-weight: bold; font-size: 35px;}
</style>