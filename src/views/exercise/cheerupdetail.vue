<template>
<div class="warmWrap" id="vList" v-loading="loading">
  <h1>상세정보</h1>
  <el-form>
<div class="warm_con">
    <el-form :inline="true" size="small">
        <el-form-item label="촬영 모델">
      <el-col>
        <el-input placeholder="촬영 모델" :maxlength="10" v-model="pModel" disabled></el-input>
      </el-col>
    </el-form-item>
    </el-form>
  </div>
<div class="everWrap">
<div class="file has-name">
      <h2>Great 영상</h2>
            <el-button size="small"  class="btn_margin" disabled>추가</el-button>
    <!--popover End-->
        <table class="el-table"  stripe >
            <thead class="el-table-column">
                <tr>
                    <th class="tableResStyle">결과</th>
                    <th class="tableDelStyle">미리보기</th>
                </tr>
            </thead>
            <tbody class="el-table-column">
                <tr v-for="item in videos"  v-show="item.fileCd === 'GT'">
                  <td>
                    {{item.originName}}
                  </td>
                  <td>
                    <el-button size="small" @click="videoPlayer(item.fileId)  " class="delete_BTN" >영상 미리보기</el-button>
                  </td>
                </tr>
            </tbody>
      </table>
      <el-dialog :visible.sync="videoShow">
      <videoP :id="fileId" ref="form" ></videoP>
      </el-dialog>
</div>
<div  class="file has-name">
      <h2>Good영상</h2>
    <el-button @click="IsShow();goodShow = true" size="small"  class="btn_margin" disabled>추가</el-button>
    <table class="el-table"  stripe >
            <thead class="el-table-column">
                <tr>
                    <th class="tableResStyle">결과</th>
                    <th class="tableDelStyle">미리보기</th>
                </tr>
            </thead>
            <tbody class="el-table-column">
                <tr v-for="item in videos"  v-show="item.fileCd === 'GD'">
                  <td>
                    {{item.originName}}
                  </td>
                  <td>
                    <el-button size="small"  @click="videoPlayer(item.fileId)" class="delete_BTN" >영상 미리보기</el-button>
                  </td>
                </tr>
            </tbody>
        </table>
  </div>
  </div>
<div  class="file has-name">
      <h2>Bad영상</h2>
            <el-button @click="IsShow();badShow = true" size="small"  class="btn_margin" disabled>추가</el-button>
    <table class="el-table"  stripe >
            <thead class="el-table-column" v-model="results">
                <tr>
                    <th class="tableResStyle">결과</th>
                    <th class="tableDelStyle">미리보기</th>
                </tr>
            </thead>
            <tbody class="el-table-column">
                <tr v-for="item in videos"  v-show="item.fileCd === 'BD'">
                  <td>
                    {{item.originName}}
                  </td>
                  <td>
                    <el-button size="small"  @click="videoPlayer(item.fileId)" class="delete_BTN" >영상 미리보기</el-button>
                  </td>
                </tr>
            </tbody>
        </table>
        
    </div>
<div  class="file has-name">
      <h2>대기영상</h2>
    <el-button @click="IsShow();waitShow = true" size="small"  class="btn_margin" disabled>추가</el-button>
    <table class="el-table"  stripe >
            <thead class="el-table-column" v-model="results">
                <tr>
                    <th class="tableResStyle">결과</th>
                    <th class="tableDelStyle">미리보기</th>
                </tr>
            </thead>
            <tbody class="el-table-column">
                <tr v-for="item in videos"  v-show="item.fileCd === 'WT'">
                  <td>
                    {{item.originName}}
                  </td>
                  <td>
                   <el-button size="small" @click="videoPlayer(item.fileId)" class="delete_BTN" >영상 미리보기</el-button>
                  </td>
                </tr>
            </tbody>
        </table>
          </div>
</el-form>

<div class="btnWrap">
        <router-link v-bind:to="{path: '/exercise/cheeruplist/cheerremove'}" v-if="isAuth()">
        <el-button type="info" size="small" class="submitBtn" >수정</el-button>
        </router-link>
        <router-link v-bind:to="{path: '/exercise/cheeruplist'}"><el-button type="warning" size="small" class="submitBtn">취소</el-button></router-link>
    </div>
    <div>

</div>
</div>

</template>

<script>
import { mapGetters } from 'vuex'
import { getMedia, GetVideoMenus, AddCheering, cheerDetail, getvideoUrl } from '@/api/exercise'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import videoP from '../../components/tab/videoPlayer'
  export default {
     components: {
        videoP
    },
    data() {
      
      
      return {
        data3:[],
         search: {
            id: '',
            parentMenuId: null,
            menuId: null,
            originName: '',
            searchColumn: 'CreateDate',
            startDate: null,
            endDate: null
        },
        paging: {
          page: 1,
          pageSize: 20,
          totalPages: 0,
          totalRecords: 0,
          orderBy: 'CreateDate',
          ascending: true
        },
        pModel: '',
        greatList:  null,
        goodList:  null,
        badList: null,
        waitList: null,
        results: '',
        value1:'',
        videoMenu: '',
        value2:'',
        list: '',
        greatShow: false,
        goodShow: false,
        badShow: false,
        mediaMenu: '',
        waitShow:false,
        gt: '',
        loading: false,
        greatName:'',
        greatPath:'',
        goodName: '',
        goodPath:'',
        badName: '',
        badPath: '',
        waitName: '',
        waitPath: '',
        videos: '',
        videoUrl: '',
        videoShow: false,
        myPlayer: '',
        fileId: '',
        }
  },
   
    created() {
      this.getDetail();
      this.isAuth()
    
    },
     methods: {
         
        //  videoPath(val) {
        //      alert(val)
        //      this.videoShow = true
        //      var data = {fileId: val}
        //      getvideoUrl(data)
        //      .then(response => {
        //         //  alert(response)
        //          this.videoUrl = response
        //      })
        //  },
         isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 10
            }).filter(item => {
                return item.authDivision === 'CU'
            }).length
           if(x > 0) {
               
               return true
           } else {
               return false
           }
       },
      getDetail(){
        this.loading = true
          var id = localStorage.getItem('id')
          var data = {id: id}
        cheerDetail(data)
          .then(response => {
            this.loading = false
            this.pModel = response.photoModel.name
            this.videos = response.videos
          })
      },
       IsShow(){
         if(this.greatList <= 0){
                    this.great = []
                  }
       },
       videoPlayer(val){
             this.videoShow = true
             this.fileId = val
             
             console.log(this.fileId)
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
    },
    mounted() {
   setTimeout(() => {
      console.log('timeout ', this.$refs.whatever);
    }, 0)
  },
    computed: {
    ...mapGetters([
            'roles'
        ])
    }
  }


</script>
<style scoped>
h2 {
    float: left;
    font-size: 15px;
    margin: 0;
    min-width: 160px;
    line-height: 35px;
}

.el-upload__tip {float: right; margin-left: 30px; margin-top: 0;}
.el-upload-list {float: left;}
.el-form-item__content {float: left}
.el-form-item {
  margin: 0;
  float: left;
  margin-bottom: 12px;
}
.warm_con {overflow:hidden; margin-bottom: 20px;}
.warm_con_last {    border-top: 1px dotted black;
    padding-top: 25px;}
.submitBtn {font-weight: bold; width: 100px; }
.btnWrap {text-align: center; margin: 50px 0;}
.deactiBtn {font-weight: bold; margin-left: 50px; font-size: 14px}
.video_wrap {overflow: hidden;}
.video_child {width: 45%; overflow: hidden; float: left;}
.upload_title li {list-style: none;}
.el-transfer-panel {width: 100%;}
.search_first {float: left;}
.input_tag {width: 50%; float: left;}
.input_wrap {width: 35%;}
.el-table td, .el-table th.is-leaf {padding: 0}

</style>
<style>
.everWrap {overflow: hidden;}
.delete_BTN{margin: 10px 8px;}
.el-table th.tableResStyle{width: 375px;
    background-color: #f6f6f6;
    text-align: center;
    border-right: 1px solid #fff;}
.el-table th.tableDelStyle {background-color: #f6f6f6;
    text-align: center;}
.btn_margin {display: inline-block;}
.has-name {width: 45%; float: left; overflow: hidden; border: 1px solid #ececec; margin: 10px; padding: 10px 20px;}
.has-name h2 {    display: inline-block;
    min-width: 87px;
    padding-bottom: 10px;}
.el-transfer-panel {width: 100%;}
.el-transfer__buttons button {float: left;}
.el-transfer-panel__list, .el-transfer-panel__body {height: 160px;}
.el-icon-arrow-left:before {
    content: "\25B2";}
.el-icon-arrow-right:before {
    content: "\25BC";
}
.el-form-item__label {font-weight: bold;}
.el-transfer-panel__item.el-checkbox .el-checkbox__label {padding-right: 45px; padding-left: 31px;}
.tresnfer_style td {border: 1px solid black;}
.el-transfer-panel__item {height: 39px; line-height: 39px;}
</style>