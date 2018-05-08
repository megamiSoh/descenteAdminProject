
  <template>
  <div v-loading ="loading">
    <table class="el-table">
        <thead class="el-table-column listTableHead">
            <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">등록일</th>
                <th rowspan="2">운동 대목적</th>
                <th rowspan="2">운동 소목적</th>
                <th rowspan="2">밸런스테스트</th>
                <th colspan="2">문진기록</th>
                <th rowspan="2">결과</th>
            </tr>
            <tr>
                <th>운동</th>
                <th>자세</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
            <tr v-for="item in results" >
                <td>{{item.groupNo}}</td>
                <td>{{item.dateString}}</td>
                <td>{{item.bigPurpose}}</td>
                <td>{{item.smallPurpose}}</td>
                <td>{{item.isBalanceTest ? '예' : '아니오'}}</td>
                <td><el-button size="mini" @click="askAnswer(item.groupNo, true)">내역</el-button></td>
                <td><el-button size="mini" @click="askAnswer(item.groupNo, false)">내역</el-button></td>
                <td><el-button @click="askInfo(item.groupNo)" size="mini">내역</el-button></td>
            </tr>
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px;" v-if="results <= 0">문진기록이 없습니다.</td>
            </tr>
        </tbody>
    </table>
    
    <nav class="text-sm-center" v-if="results > 0">
      <ul class="pagination" id="searchPager">
          <li class="page-item">
              <a class="page-link" @click="prevPage()">
                  &lt;
              </a>
          </li>

          <li v-for="pageobj in paging.totalPages" class="page-item page-num" v-bind:class="{active:pageobj==paging.page}" v-if="checkPage(pageobj)">
              <a class="page-link" @click="movePage(pageobj)">
                  {{pageobj}}
              </a>
          </li>

          <li class="page-item">
              <a class="page-link" @click="nextPage()">
                  &gt;
              </a>
          </li>
      </ul>
    </nav>
    <div class="exerpopDetail mediaPopOver">
        <el-dialog :visible.sync="questResult">
        <h3>문진 상세 팝업</h3>
        <div class="exerImg">
            <img src="../../../static/images/exercise_part_pre.png" class="exerPartP"/>
            <img src="../../../static/images/exercise_part_back.png"class="exerPartB"/>
           <span class="frontStyle">앞</span>
           <span>뒤</span>
            <span v-for="item in Rt">
                <span v-for="list in item.contents">
                    <img :src="url('../../../static/images/'+list+'.png')" :class="'red'+list"/>
                </span>
            </span>
            <br>
            <span v-for="item in Rx">
                <span v-for="list in item.contents">
                    <img :src="url('../../../static/images/blue'+list+'.png')" :class="'blue'+list"/>
                </span>
            </span>
        </div>
        <div class="exerInfoTab">
            <ul>
                <li>
                    <span class="rx"></span>이완 부위
                </li>
                <li>
                    <span class="rt"></span>경직 부위
                </li>
                <li>
                    <span class="complex"></span>복합 부위
                </li>
            </ul>
            <p>* 문진/밸런스 테스트를 토대로 구성한 근육 분포도 입니다.</p>
            <div v-for="item in Re" class="PTabwrap">
                <div class="purposeTabWrap">
                    {{item.contents.BigPurpose}} 추천운동
                </div>
                <span v-for= 'list in item.contents.Exercise' class="purposeTab">
                    {{list}},
                </span>
            </div>
            <div v-for="item in Su" class="PTabwrap">
                <div  class="purposeTabWrap">
                    데상트가 제안하는 운동
                </div>
                <span v-for= 'list in item.contents' class="purposeTab">
                    {{list}},
                </span>
                <span v-show="item.contents <= 0" style=" font-weight: normal; font-size: 12px; padding: 10px;">제안운동이 없습니다. </span>
            </div>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="askShow">
    <h3 v-if="whichAsk === true">문진기록 - 운동목적</h3>
    <h3 v-if="whichAsk === false">문진기록 - 자세</h3>
        <table class="el-table">
            <thead class="el-table-column listTableHead">
                <tr>
                    <th>No</th>
                    <th>질문내용</th>
                    <th>답변</th>
                </tr>
            </thead>
            <tbody class="el-table-column listTable">
                <tr v-for="item in askResults">
                    <td>{{item.no}}</td>
                    <td>{{item.ask}}</td>
                    <td>{{item.answer}}</td>
                </tr>
            </tbody>
            <tfoot v-show="askResults <= 0">
                <tr>
                    <td colspan="3" style="font-weight: normal; text-align: center; padding: 40px;">문진 정보가 없습니다.</td>
                </tr>
            </tfoot>
        </table>
    </el-dialog>
    </div>
  </div>
</template>
<script>
import { askgroups,askresultInfo, askanswer } from '@/api/member'

  export default {
    name: 'tabcon3',
    // props: ['left'],
     data() {
      return {
          loading: false,
        paging: {
            page: 1,
            pageSize: 20,
            totalPages: 0,
            totalRecodes: 0,
            orderBy: 'GroupNo',
            ascending: false
        },
        results: '',
        questResult: false,
        Re : '',
        Su: '',
        Rx: '',
        Rt: '',
        askShow: false,
        askResults: '',
        whichAsk: '',
      }
      }, 
      created(){
       this.askDetail()
      },
      computed: {
     
  },
      methods: {
          askAnswer(val1, val2){
              this.askShow = true
              this.whichAsk = val2
              var id = localStorage.getItem('id')
              var data = {userId: id, groupNo:val1, isPurpose: val2 }
              askanswer(data)
              .then(response => {
                  this.askResults = response
                  
              })
          },
          url(val){
            return val
          },
        askInfo(val){
            this.questResult = true
            var id = localStorage.getItem('id')
            var data = {userId: id, groupNo: val}
            askresultInfo(data)
            .then(response => {
                console.log(response)
                var res = response
                // this.imgUrl = '../../../static/images/'+ +'.png'
                this.Re = res.filter(item => {
                    return item.questResultCd === "RE"
                })
                this.Su = res.filter(item => {
                    return item.questResultCd === "SU"
                })
                this.Rt = res.filter(item => {
                    return item.questResultCd === "RT"
                })

                this.Rx = res.filter(item => {
                    return item.questResultCd === "RX"
                })
            })
        },
        movePage(page) {
          this.paging.page = page;
          this.askDetail()
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.askDetail()
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.askDetail()
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
        askDetail(){
            this.loading=true
            var id = localStorage.getItem('id')
            var data = {userId: id, paging: this.paging}
        askgroups(data)
        .then(response => {
            this.loading = false
            this.paging = response.paging
            this.results = response.results
            })
        },
    },
    
    
}
</script>
<style scoped>
    .exerpopDetail .el-dialog {width: 500px; min-width: 500px;}
</style>
