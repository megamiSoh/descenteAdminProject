<template>
<div class="memberL" id="vList">
  <h1>{{listName}}</h1>
  <div label="Main 배너 리스트" class="memberL_wrap">
    <el-form ref="form" :model="search" label-width="120px" @submit.prevent="getMedia" method="post" class="searchBoxStyle">
      <el-form size="mini" :inline="true">
        <el-form-item label="검색 기간">
          <el-form-item>
            <el-select v-model="search.searchColumn">
              <el-option label="전체" :value="null"></el-option>
              <el-option label="등록일" value="CreateDate"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-col>
              <el-date-picker type="date" placeholder="Pick a date" v-model="search.startDate" style="width: 100%; margin-right: 10px;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker>   
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col>
              <el-date-picker type="date" placeholder="Pick a date" v-model="search.endDate" style="width: 100%;" :clearable="false" :disabled="search.searchColumn === null"></el-date-picker> 
          </el-col>   
        </el-form-item>
      </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="메뉴1 / 2depth">
        <el-col>
         <el-select placeholder="전체"  v-model="search.parentMenuId" @change="reset()">
            <el-option label="전체" :value="null"></el-option>
            <el-option :label="videoMenus.name" v-for="videoMenus in videoMenu" :value="videoMenus.id" :key="videoMenus.id" v-if="videoMenus.parentId === null">
            {{videoMenus.name}}
            </el-option>
          </el-select>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col>
         <el-select v-model="search.menuId"  placeholder="선택해주세요." :disabled="search.parentMenuId === null">
            <div v-for="videoMenus in videoMenu">
                <el-option :label="child.name" v-for="child in videoMenus.children" v-if="search.parentMenuId === child.parentId" :value="child.id" :key="child.id" >
                    {{child.name}}
                </el-option>
            </div>
          </el-select>
          </el-col>
      </el-form-item>
      <el-form-item label="상태">
        <el-col>
         <el-select  v-model="search.state">
            <el-option label="전체" :value="null"></el-option>
            <el-option :label="bannerStates.name" v-for="bannerStates in stateResults" :value="bannerStates.key" :key="bannerStates.key">
            {{bannerStates.name}}
            </el-option>
          </el-select>
          </el-col>
      </el-form-item>
      </el-form>
      <el-form size="mini" :inline="true">
        <el-form-item label="파일 명">
        <el-col>
          <el-input :maxlength="30" v-model="search.originName" placeholder="파일명 입력">
           
          </el-input>
        </el-col>
      </el-form-item>
      <!--code-->
       <el-form-item label="코드">
        <el-col>
          <el-input :maxlength="10" type="number" v-model="search.id" placeholder="코드 입력">
           
          </el-input>
        </el-col>
        </el-form-item>
          <el-form-item class="member_btn_wrap">
          <el-col class="member_btn">
            <el-button type="info" icon="el-icon-search" @click="getMedia();commit()" size="mini">검색</el-button>
             <el-button type="info" @click="resetBtn()" size="mini">검색조건 초기화</el-button>
          
        </el-col>
        </el-form-item>
      
      </el-form>
    </el-form>
    <div class="register_warm">
    <router-link v-bind:to="{ path: 'mediaregist' }" v-if="isAuth()">
        <el-button plain type="primary" size="small" class="button_space_bottom">신규 등록</el-button>
    </router-link>
        <span class="search_number" >
        검색 결과 수 : {{  paging.totalRecords }}</span>
     </div>
     <table class="el-table" stripe :data="videoResults" :model="videoResults" v-loading="loading" >
        <thead class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>Code</th>
                <th>메뉴 1depth</th>
                <th>메뉴 2depth</th>
                <th>파일명</th>
                <th>등록일</th>
                <th>상태</th>
                <th>동영상</br>미리보기</th>
                <th>삭제</th>
            </tr>
        </thead>
        <tbody class="el-table-column listTable">
        <tr v-for="(entry, key) in videoResults" 
           :key="videoResults.id" style="cursor: pointer;">
            <td>{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
            <td>0000{{entry.fileId}}</td>
            <td>{{entry.parentMenuName}}</td>
            <td>{{entry.menuName}}</td>
            <td>{{entry.originName}}</td>
            <td>{{entry.createDateString}}{{entry.encodeState}}</td>
            <td class="mediaspinnerWRap" style="width: 100px; padding-top: 20px;">
             <div v-if="entry.encodeState === '10'" v-model="encodeState">완료</div>
              <span v-if="entry.encodeState === '20'" >
                <el-button plain type="success" size="small" class="submitBtn"  @click="encoding(key, entry.fileId);" >
                  인코딩
                </el-button>
              </span>
              <div v-if="entry.encodeState === '30'"   
                 v-loading="loading2"
                element-loading-text="변환중"
                element-loading-spinner="el-icon-loading"
                >
                 <!--<el-progress  :text-inside="true" :stroke-width="18" :percentage="entry.progress" ></el-progress>-->
                 
              </div>
             
            </td>
            <td>
              <el-button size="mini" @click="videoPlayer(entry.fileId)">미리보기</el-button>
            </td>
            <td>
                <span v-if="isAuth()">
                  <el-button type="danger" size="small" class="submitBtn" @click="deleteBtn(entry.fileId)" plain>삭제</el-button>
                </span>
                <span v-else>삭제</span>
            </td>
        </tr>
          <tr v-model="noResults" v-if="noResults === '' ? false: true">
            <td colspan="11" class="noResults">{{noResults}}</td>
          </tr>
        </tbody>
    </table>
    
  </div>
  <el-dialog :visible.sync="videoShow">
      <videoP :id="fileId" ref="form" ></videoP>
      </el-dialog>
   <nav class="text-sm-center" v-model="noResults" v-if="noResults ===''? true: false">
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
</template>

<script>
import Vue from 'vue'
import videoP from '../../components/tab/videoPlayer'
import { GetEncodeStatess, GetVideoMenus, GetVideos,Remove, EncodeVide} from '@/api/media'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import { getvideoUrl } from '@/api/exercise'
import formurlencoded from 'form-urlencoded'

 export default {
   components: {
        videoP
    },
    data() {
      return {
        listName: '영상 리스트',
        videoShow: false,
        fileId: '',
         search: {
            id: '',
            parentMenuId: null,
            menuId: null,
            originName: '',
            state: null,
            searchColumn: null,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
        },
        paging: {
          page: 1,
          pageSize: 20,
          totalPages: 0,
          totalRecords: 0,
          orderBy: 'CreateDate',
          ascending: false
        },
        // submitForm: true,
        results: null,
        list: null,
        listLoading: true,
        entry: null,
        videoResults: null,
        noResults: '',
        selected1: '',
        stateResults: '',
        leng: '',
        isActive: '',
        videoMenu: '',
        value1: null,
        value2: null,
        proValue: '',
        proName: '',
        enValue: '',
        encodeState: '',
        target: '',
        percentage: '',
        loading2: true,
        loading: false,
        watcher: false,
          }
      
    },
    created() {
      this.checkThisPage()
      this.getMedia()
      this.bannerState()
      this.getMenus()
      this.isAuth()
    
    },
     methods: {
       checkThisPage(){
         if(this.$store.state.example.list === this.listName) {
    
          this.search = JSON.parse(this.$store.state.example.search)
          this.paging = JSON.parse(this.$store.state.example.paging)
         } else {
           this.$store.commit('search', '')
            this.$store.commit('paging', '')
            this.$store.commit('list', '')
         }
        
       },
       commit(){
         this.$store.commit('search', this.search)
        this.$store.commit('paging', this.paging)
        this.$store.commit('list', this.listName)
       },
       videoPlayer(val){
             this.videoShow = true
             var data = {fileId: val}
             getvideoUrl(data)
             .then(response => {
                //  alert(response)
                 this.videoUrl = response    
                 this.callVideo(val)
            })
           
         },
          callVideo(val){
         this.$refs.form.videoId(val)
       },
       reset(){
        this.value2 = null
       },
       isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 25
            }).filter(item => {
                return item.authDivision === 'CU'
            }).length
           if(x > 0) {   
               return true
           } else {
               return false
           }
       },
        movePage(page) {
          this.paging.page = page;
          this.getMedia();
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.getMedia();
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.getMedia();
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },
       bannerState() {
        var bannerState = {id : this.stateResults.id}
          GetEncodeStatess(bannerState)
          .then(response => {
            this.stateResults = response
          }).catch(response => {
          })
        },
        getMenus() {
          GetVideoMenus()
          .then(response => {
            this.videoMenu= response.result
          }).catch(response => {
          })
        },
        encoding(val, val1){
          // this.encodeState = 30
          
          // this.getMedia()
            var i = val-1
            // console.log(this.videoResults[i].encodeState)
            this.videoResults[i].encodeState = '30'
            // this.encodeState =30
          var data = {fileId: val1}
          EncodeVide(data)
          .then((response)=> {
            this.videoResults[i].encodeState = '10'
            // this.getMedia()
            
            
          })
          .catch(err => {
            console.log(err)
          })
        },
        // getMedia1(){
        //   this.encodeState = '10'
        //   this.getMedia()
        // },
       getMedia(val1) {
         this.loading = true
         var mainBanner = { search: this.search, paging: this.paging}
          GetVideos(mainBanner)
          .then(response => {
            this.commit()
            this.loading = false
            this.videoResults = response.results
          //   console.log(
          //   this.videoResults.filter(item =>{
          //     return item.fileId === val1
          //   })[0].encodeState = 30
            
          //   // .map(data => {
          //   //   return data.encodeState = '30'
          //   // })
          // )
           
            this.paging = response.paging
            if(this.videoResults.length === 0) {
                  return this.noResults = '검색결과가 없습니다.'
              } else {
                return this.noResults = ''
              }
          }).catch(response => {
            console.log(response)
          })
        },
        
        resetBtn() {
          this.search = {
             id: '',
            parentMenuId: null,
            menuId: null,
            originName: '',
            state: null,
            searchColumn: null,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
            }
        },
        deleteBtn(id) {
            var data =  formurlencoded({ fileId: id })
            Remove(data)
            .then(response => {
                this.$message.error('관리자 삭제가 완료되었습니다.');
            })
        }
        
        },
       
         computed: {
    ...mapGetters([
            'roles'
        ]),
       
        
        
        }
  }

</script>