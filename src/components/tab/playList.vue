<template>
    <div>
        <div class="mediaPopOver">
          <h3>영상 찾아보기</h3>
            <el-form class="searchBoxStyle">
            <el-form :inline="true" size="mini">
                    <el-form-item label="검색기간 - 등록일">
                      <el-date-picker type="date"  :clearable="false" style="width: 179px;" v-model="search.startDate"></el-date-picker> 
                    </el-form-item>
                    <el-form-item>
                      <el-date-picker type="date"   :clearable="false" style="width: 179px;" v-model="search.endDate"></el-date-picker>
                  </el-form-item>
                
            </el-form>
            <el-form size="mini" :inline="true">
              <!--datepicker end-->
              <el-form-item label="메뉴 1/2 depth">
                  <el-select v-model="search.parentMenuId" @change="childDefault1()">
                      <el-option label="전체" :value="null"></el-option>
                      <el-option v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id">
                      </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                  <el-select v-model="search.menuId" placeholder="선택해 주세요.">
                      <span v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id" v-if="search.parentMenuId === item.id">
                      <el-option v-for="child in item.children" :label="child.name" :value="child.id" :key="child.id" >
                      </el-option>
                      </span>
                  </el-select>
              </el-form-item>
              <el-form-item  class="member_btn_wrap" style="">
                    <el-col class="member_btn">
                      <el-button type="info" icon="el-icon-search" @click="getMedia(); pageReset()" size="mini">검색</el-button>
                      </el-col>
                 </el-form-item>
            </el-form>
            <el-form :inline="true" size="mini" >
                  <el-form-item label="파일명">
                        <el-input :maxlength="30" v-model="search.originName">
                        </el-input>
                  </el-form-item>
                  <el-form-item label="Code" label-width="60px">
                        <el-input  v-model="search.id" type="number">
                        </el-input>
                  </el-form-item>
                <el-form-item  class="member_btn_wrap" style="">
                    <el-col class="member_btn">
                      
                      <el-button type="warning" @click="mediaReset()" size="mini">검색조건 초기화</el-button>
                    </el-col>
                  </el-form-item>
                  
              </el-form>
              
              <el-form :inline="true" size="mini" >
               
                
              </el-form>
             </el-form>
            <div style=" padding-top: 5px; margin-top: 10px;" >
              <table align="center" class="el-table">
              <colgroup>
                <col width="50" />
                <col width="100" />
                <col width="130" />
                <col width="130" />
                <col width="300" />
                <col width="150" />
                <col width="100" />
              </colgroup>
                <thead class="el-table-column listTableHead">
                  <tr>
                    <th  style="padding: 10px 0;">No</th>
                    <th>Code</th>
                    <th>메뉴 1depth</th>
                    <th>메뉴 2depth</th>
                    <th>파일명</th>
                    <th>등록일</th>
                    <th>선택</th>
                  </tr>
                </thead>
                <tbody class="el-table-column listTable">
                  <tr v-for="(lists, key) in results" :key="lists.id" @click="add(lists.fileId);" ref="formSend">
                    <td  style="padding: 10px;" align="center">{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
                    <td align="center">0000{{ lists.fileId }}</td>
                    <td align="center">{{ lists.parentMenuName }}</td>
                    <td align="center">{{ lists.menuName }}</td>
                    <td align="center">{{ lists.originName }}</td>
                    <td align="center">{{ lists.createDateString }}</td>
                    <td align="center"><el-button type="primary" plain size="small">선택</el-button></td>
                  </tr>
                  <tr v-show="mediaResultShow">
                      <td colspan="8" align="center" style="padding: 40px;">검색 결과가 없습니다.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav class="text-sm-center" v-show="!mediaResultShow">
              <ul class="pagination" id="searchPager">
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
              </ul>
            </nav>
        </div>
          <div class="popbtnWrap">
              <el-button@click="centerDialogVisible = false" size="small" type="info">닫기</el-button>
          </div>
    </div>
</template>
<script>
import { GetVideoMenus, getMedia, GetWarmupPart, AddWarmup, getModel } from '@/api/exercise'
 export default {
     name: 'playList',
    data() {
         return {
            mSelect: '',
        part: '',
        pSelect: '',
        model: '',
         data3:'',
         search: {
            id: '',
            parentMenuId: null,
            menuId: null,
            originName: '',
            searchColumn: 'CreateDate',
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
        },
        paging: {
          page: 1,
          pageSize: 5,
          totalPages: 0,
          totalRecords: 0,
          orderBy: 'CreateDate',
          ascending: true
        },
        pModel: '',
        input: '',
        results: '',
        value1:'',
        videoMenu: '',
        value2:'',
        list: '',
        data:'',
        val:'',
         postFormData: new FormData(),
          postList: '',
           postList : '',
            todos   : '',
            todos1: '',
            todos2:'',
            videoMenu: '',
            value: '',
            value1: '',
            local:'',
            centerDialogVisible: false,
            fullscreenLoading: false,
            mediaMenu:'',
            mediaResultShow:'',
            videoCheck: '',
         }
     },
     created(){
        // this.getPart()
        // this.getModel()
        this.getMedia()
        this.getMenus()
     },
     methods: {
          pageReset(){
        this.paging.page = 1
      },
      mediaReset() {
        this.search = {
            id: '',
            parentMenuId: null,
            menuId: null,
            originName: '',
            searchColumn: null,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
        }
      },
         movePage(page) {
          this.paging.page = page;
          this.getMedia()
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.getMedia()
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.getMedia()
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },   
       childDefault1(){
          this.search.menuId = null
        },
       add(val){
         this.centerDialogVisible = false
         this.val = val
         this.data = this.results.filter(item => {
           return item.fileId === val
         })
         console.log(this.data)
         this.$emit('add',  this.val, this.data)
       }, 
       
       getMenus() {
          GetVideoMenus()
          .then(response => {
            this.videoMenu= response.result
            this.mediaMenu = response.result
          }).catch(response => {
            console.log(response)
          })
        },
       getMedia() {
          var getCheer = { search: this.search, paging: this.paging}
          getMedia(getCheer)
          .then(response => {
            this.results = response.results
            this.paging = response.paging
            if(this.results.length <= 0) {
              this.mediaResultShow = true
            } else {
              this.mediaResultShow = false
            }
          }).catch(response => {
            console.log(response)
          })
        },
    
     },
 }
</script>
<style scoped>
    .el-dialog__body h3 {
    font-size: 14px;
    /* margin: 0 0 10px 0; */
    text-align: left; 
}
.mediaPopOver h3 {
    font-size: 14px;
    /* padding: 10px; */
    margin: 0 0 16px 0;
    /* text-align: center; */
    background-color: #fff;
    border-bottom: 1px solid gainsboro;
    padding: 0 0 5px 18px;
}
.popbtnWrap {padding: 30px 0 0px;}
</style>