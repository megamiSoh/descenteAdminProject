
  <template>
  <div>
    <table class="el-table">
        <thead class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>등록일</th>
                <th>키</th>
                <th>몸무게</th>
                <th>BMI</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
            <tr v-for="item in results">
                <td>{{item.groupNo}}</td>
                <td>{{item.date}}</td>
                <td>{{item.height}}</td>
                <td>{{item.weight}}</td>
                <td>{{item.bmi}}</td>
                <td>{{item.bmiStatNm}}</td>
            </tr>
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px;" v-if="results <= 0">신체정보가 없습니다.</td>
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
  </div>
</template>
<script>
import { bodyGroups } from '@/api/member'

  export default {
    name: 'tabcon2',
    // props: ['left'],
     data() {
      return {
        paging: {
            page: 1,
            pageSize: 20,
            totalPages: 0,
            totalRecodes: 0,
            orderBy: 'GroupNo',
            ascending: false
        },
        results: ''
      }
      }, 
      created(){
       this.bodyDetail()
      },
      computed: {
     
  },
      methods: {
        movePage(page) {
          this.paging.page = page;
          this.submitForm()
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.submitForm()
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.submitForm()
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
        bodyDetail(){
            var id = localStorage.getItem('id')
            var data = {userId: id, paging: this.paging}
        bodyGroups(data)
        .then(response => {
            this.paging = response.paging
            this.results = response.results
            })
        },
    },
    
    
}
</script>
