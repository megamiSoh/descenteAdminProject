<template>
<div class="warmWrap" id="vList" v-loading="loading">
  <h1>상세정보
     <span v-if="isAuth()">
        <el-button type="success" size="small" plain @click="active(detail.isActive)" v-if="detail.isActive"> 활성화</el-button>
        <el-button type="info" size="small" plain @click="active(detail.isActive)" v-else>비활성화</el-button>
        </span>
        <span v-else>
        {{detail.isActive ? '활성화':'비활성화'}}
    </span>
  </h1>
  <el-form>
<div class="first_wrap">
<table class="el-table" cellspacing="0" cellpadding="0" >
  <tr class="el-table-column">
  <th rowspan="4" class="title_style" >기본 정보</th>
    <th style="width: 150px;">운동 분류</th>
    <td style="width: 403px;  padding: 10px 0 10px;">
      <el-select v-model="exerSelect"disabled size="small">
        <el-option v-for="lists in exerKind" :value ="lists.id" :label="lists.name" :key="lists.id" >
        </el-option>
      </el-select>
    </td>
    <th  style="width: 150px;">운동 강도</th>
    <td>
      <el-select v-model="intensSelect" disabled size="small">
        <el-option v-for="lists in intens" :value="lists.key" :label="lists.name" :key="lists.key" >
          <span v-if="lists.key === 'HS'">상</span>
          <span v-if="lists.key === 'MS'">중</span>
          <span v-if="lists.key === 'LS'">하</span>
        </el-option>
      </el-select>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>컨텐츠 명</th>
    <td>
      <el-input :max-length="30" v-model="exerInput" disabled size="small"></el-input>
    </td>
    <th>운동 효과</th>
    <td>
      <el-input :max-length="20" v-model="effectInput" class="effectStyle" disabled size="small"></el-input>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>운동목적</th>
    <td style="padding: 10px 0 10px;">
      <el-select v-model="muscleAreaCateId"  @click="whatDis()" disabled size="small">
          <el-option label="전체" value="" placeholder="전체">
          </el-option>
          <el-option :label="muscle.name" :key="muscle.name"  v-for="muscle in muscleResults" :value="muscle.id" >  
          {{muscle.name}}
          </el-option>
        </el-select>
          <el-select v-model="exerPurpose" disabled size="small">
          <div  v-for="muscle in muscleResults">
            <el-option v-for="muscle1 in muscle.childens" :key="muscle1.name" :label="muscle1.name" :value="muscle1.id">
            </el-option>
          </div>
      </el-select>
    </td>
    <th rowspan="2">
        키워드
    </th>
    <td rowspan="2">
        <el-input v-model="keyword" class="effectStyle" disabled size="small"></el-input > <span class="exam" >예) #다이어트 #10대</span>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>운동 설명
    </th>
    <td style="padding: 0 0 10px;">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="text here"
        v-model="textarea" disabled>
      </el-input>
    </td>
  </tr>
  <tr>
    <th rowspan="3" class="title_style">이미지</th>
    <th class="separate">썸네일 이미지</th>
    <td colspan="3" class="separate" style="padding: 10px 0 10px 0;">
       <label class="file-label">
        
        <input class="file-input" type="file" id="file" accept="image/*" @change="change()" style="display: none;" > 
      </label>
        <span class="file-name">
                      <el-dialog
                            title="이미지 미리보기"
                            :visible.sync = 'thumbShow'
                            >
                            <img v-bind:src="thumbPath" />
                        </el-dialog>
                        <el-button @click="thumbShow = true" size="small" class="linkA"> 
                            <div class="originname" >
                            {{todos1}}
                        </div>
                        </el-button>
        </span>
    </td>
  </tr>
  <tr>
    <th>중간 이미지</th>
    <td colspan="3">
       <label class="file-label">
        <input class="file-input" type="file" id="file1" accept="image/*" @change="change1()" style="display: none;" > 
      </label>
        <span class="file-name">
                      <el-dialog
                            title="이미지 미리보기"
                            :visible.sync="midShow"
                            >
                            <img v-bind:src="midPath">
                        </el-dialog>
                        <el-button @click="midShow = true" size="small" class="linkA"> 
                            <div class="originname">
                             {{todos2}}
                        </div>
                        </el-button>
        </span>
    </td>
  </tr>
  <tr>
    <th>상세 상단 이미지</th>
    <td colspan="3" style="padding: 10px 0 10px 0;">
       <label class="file-label">
      <input class="file-input" type="file" id="file2" accept="image/*" @change="change2()" style="display: none;" > 
    </label>
      <span class="file-name">
                      <el-dialog
                            title="이미지 미리보기"
                            :visible.sync="topShow"
                            >
                            <img v-bind:src="topPath">
                        </el-dialog>
                        <el-button @click="topShow = true" size="small" class="linkA"> 
                            <div class="originname">
                           {{todos3}}
                        </div>
                        </el-button>
                   
      </span>
    </td>
  </tr>
  <tr>
    <th rowspan="3" class="title_style">
      동영상
    </th>
  <tr>
    <th class="mediaStart">운동 영상 종류</th>
    <td colspan="3" class="mediaStart">
      <el-radio v-model="radio1" :label="1" disabled>동영상 Only</el-radio>
      <el-radio v-model="radio1" :label="2" disabled>운동 조합</el-radio>
    </td>
  </tr>
  <tr>
    <td colspan="5">
      <table style="width: 100%; padding: 20px;" cellpadding="0" cellspacing="0">
        <tr v-if="onlyMedia()">
          <td>
            <el-form>
                <el-button  @click="onlyShow = true" size="small" class="media_btn" disabled>추가</el-button>
                    <el-button @click="data4Show = true; videoPlayer(data4Path)" size="small" class="media_btn linkA">{{data4}}</el-button>
                    <el-dialog
                    title="동영상 미리보기"
                    :visible.sync="data4Show"
                    >
                    <videoP :id="data4Path" ref="form" />
                    </el-dialog>
                            </el-form>
                        </td>
                        </tr>
                        <tr v-if="mixMedia()">
                            <td colspan="3" style="width: 100%;">
                                <table style="width: 100%;" class="mixStyle"  cellpadding="0" cellspacing="0">
                                <tr>
                                    <th style="text-align: left; text-indent: 20px;">인트로</th>
                                </tr>
                                <tr>
                                    <td>
                                        <el-button @click="introShow = true; mediaOpen()" size="small" style="margin: 10px;" disabled>찾아보기</el-button>
                                            <el-button class="linkA" @click="introMediaShow = true; videoPlayer(data1Path)" size="small">{{ data1 }}</el-button>
                                            <el-dialog
                                            title="동영상 미리보기"
                                            :visible.sync="introMediaShow"
                                            >
                                                
                                                <videoP :id="data1Path" ref="form" />
                                            </el-dialog>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                            <td>
                        <table cellpadding="0" cellspacing="0">
                        <tr>
                            <th class="titleTop">웜업</th>
                            <th><div class="restStyle">휴식시간(초)</div></th>
                            <th><el-input v-model="restWarm" class="restInput" disabled size="small"></el-input></th>
                            <th class="titleBottom">
                                <el-button @click="warmShow = true" size="small" disabled >변경</el-button>
                            </th>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0" class= "resultsList">
                            <tr>
                                <th>Code</th>
                                <th>웜업 명칭</th>
                                <th>웜업 부위</th>
                                <th>촬영 모델</th>
                            </tr>
                            <tbody v-for="list in warmRender" :key="list.id" :value="list.id">
                                <tr v-for="lists in list" :key="lists.id" :value="lists.id">
                                <td>{{lists.id}}</td>
                                <td>{{lists.name}}</td>
                                <td>{{lists.warmUpCateName}}</td>
                                <td>{{lists.photoModelName}}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr v-if="warmRender <= 0">
                                    <td colspan="4">등록 해 주세요.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </td>
                </tr>
                <!--warmup TheEnd-->
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                        <tr>
                            <th class="titleTop">Main운동   </th>
                            <th><div class="restStyle">휴식시간(초)</div></th>
                            <th><el-input v-model="restMain" class="restInput" disabled size="small"></el-input></th>
                            <th class="titleBottom">
                                <el-button @click="mainShow = true" size="small" disabled>변경</el-button>
                            </th>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0" class= "resultsList">
                            <tr>
                                <th>Code</th>
                                <th>운동 분류</th>
                                <th>웜업 명칭</th>
                                <th>사용 주동근</th>
                                <th>운동 강도</th>
                                <th>촬영 모델</th>
                                <th>족부압 데이터 유무</th>
                                <th>횟수 / 초</th>
                                <th>셋트</th>
                            </tr>
                            <tbody v-for="(list,index) in mainRender" :value="list.id" :key="list.id">
                                <tr v-for="(lists,index) in list" :valule="lists.id" :key="lists.id">
                                    <td>{{lists.id}}</td>
                                    <td>{{lists.actExeerKindCateName}}</td>
                                    <td>{{lists.name}}</td>
                                    <td>{{lists.muscleAreaCateName}}</td>
                                    <td>{{lists.intensityCd}}</td>
                                    <td>{{lists.photoModelName}}</td>
                                    <td>{{lists.isFootPressure}}</td>
                                    <td style="width: 80px;">
                                        <el-input v-model="lists.mainCount" class="mainInput" disabled size="small"></el-input>
                                    </td>
                                    <td style="width: 80px;">
                                        <el-input v-model="lists.mainSet" class="mainInput" disabled size="small"></el-input>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot v-if="mainRender <= 0" >
                                <tr>
                                    <td colspan="9">등록 해 주세요.</td>
                                </tr>
                            </tfoot>
                        </table>

                    </td>
                </tr>
                <!--main Exercise The End-->
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                        <tr>
                            <th class="coolTop">쿨다운 </th>
                            <th>
                                <el-button @click="coolShow = true" size="small" disabled>변경</el-button>
                                
                            </th>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0" class= "resultsList">
                            <tr>
                                <th>Code</th>
                                <th>쿨다운 명칭</th>
                                <th>촬영 모델</th>
                            </tr>
                            <tbody v-for="(list,index) in coolRender" :value="list.id" :key="list.id">
                                <tr v-for="lists in list" :value="lists.id" :key="lists.id">
                                    <td>{{lists.id}}</td>
                                    <td>{{lists.name}}</td>
                                    <td>{{lists.photoModelName}}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr v-if="coolRender <= 0">
                                    <td colspan="3">등록 해 주세요.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </td>
                </tr>
            </table>
            </td>
        </tr>
                        </table>
                    </td>
                </tr>


</table>


    </td>
  </tr>
</table>

</div>
  <div class="btnWrap">
    <router-link v-bind:to="{path: '/exercise/themecontents/themeremove'}" v-if="isAuth()"><el-button type="info" size="small" class="submitBtn" >수정</el-button></router-link>
    <router-link v-bind:to="{path: '/exercise/themecontents'}">
    <el-button type="warning" size="small" class="submitBtn">취소</el-button>
    </router-link>
    <!--<el-button type="warning" size="small" class="submitBtn">비활성화</el-button>-->
  </div>
  
  </el-form>
 

 
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { themeDetail, EditTheme, warmActive, getvideoUrl, getMainActive, getCoolActive, getExerKind, getIntensity, getModel, getPurposeCategory, getEffectCd, GetVideoMenus, getMedia, GetWarmupPart, themeActive } from '@/api/exercise'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import videoP from '@/components/tab/videoPlayer'
  export default {
    components: {
        videoP
    },
    data() {
      return {
        postFormData: new FormData(),
        loading: false,
        addData: '',
        addData1:'',
        warmActions: '',
        files: '',
        warm: '',
        main: '', 
        cool: '',
        detail: '',
        mainActions: [],
        coolActions: '',
        exerKind: '',
        exerSelect: '',
        intens: '',
        intensSelect: '',
        model: '',
        mSelect: '',
        exerInput: '',
        effectInput: '',
        muscleAreaCateId: '',
        muscleResults:'',
        muscleAreaCateDepth: '',
        radio: '',
        effectUnit: '',
        textarea: '',
        todos1:'',
        todos2: '',
        todos3: '',
        todos: '',
        results:'',
        keyword: '',
        data3:'',
        exerPurpose: '',
         search: {
            id: '',
            parentMenuId: null,
            menuId: null,
            originName: '',
            searchColumn: 'CreateDate',
            startDate: '',
            endDate: new Date()
        },
        paging: {
          page: 1,
          pageSize: 10,
          totalPages: 0,
          totalRecords: 0,
          orderBy: 'CreateDate',
          ascending: true
        },
        warmSearch: {
            id: 0,
            name: '',
            warmUpCateId: '',
            photoModelId: '',
            searchColumn: '',
            startDate: '',
            endDate: new Date()
        },
        warmPaging: {
            page: 1,
            pageSize: 10,
            totalPages: 0,
            totalRecords: 0,
            orderBy: 'CreateDate',
            ascending: true
        },
        mainSearch: {
            id: 0,
            name: '',
            actExerKindCateId: null,
            muscleAreaCateId: null,
            muscleAreaCateDepth: null,
            intensityCd: null,
            photoModelId: null,
            isFootPressure: null,
            isActive: null,
            searchColumn: 'CreateDate',
            startDate: '',
            endDate: new Date()
        },
        mainPaging: {
            page: 1,
            pageSize: 10,
            totalPages: 0,
            totalRecords: 0,
            orderBy: 'CreateDate',
            ascending: true
        },
        coolSearch: {
            id: 0,
            name: '',
            photoModelId: null,
            searchColumn: "CreateDate",
            startDate: '',
            endDate: new Date()
        },
        coolPaging: {
            page: 1,
            pageSize: 10,
            totalPages: 0,
            totalRecords: 0,
            orderBy: 'CreateDate',
            ascending: true
        },
        data4: null,
        thumbShow: false,
        midShow: false,
        introShow: false,
        warmShow:false,
        onlyShow: false,
        mainShow: false,
        coolShow: false,
        topShow: false,
        introMediaShow: false,
        radio1: 2,
        var6:'',
        videoUrl: '',
        part: '',
        data1: null,
        pSelect: '',
        val1: '',
        warmAct: '',
        warmList: [],
        warmRender: '',
        mainData: '',
        mainList: [],
        mainResults: '',
        mainRender: '',
        coolData: '',
        coolList: [],
        coolResults: '',
        coolRender: '',
        isMix: '',
        restWarm: '',
        restMain: '',
        mainCount: [],
        mainSet: [],
        mainArr: [],
        warmArr: [],
        coolArr: [],
        intro: '',
        thumName: '',
        thumbPath: '',
        midImg: '',
        midPath: '',
        topImg: '',
        topPath: '',
        mainr:'',
        data4Path: '',
        data4Show: false,
        data1Path: '',
        renderFunc(h, option) {
          return <table  class="el-table" stripe>
          <thead class="el-table-column">
            <tr>
              <td>0000{ option.label }</td>
                <td>{ option.arrName }</td>
                <td>{ option.arrModel }</td>
                <td>{ option.arrCateName }</td>
            </tr>
          </thead>
          </table>;
        },
         renderFuncMain(h, option1) {
          return <table  class="el-table" stripe>
          <thead class="el-table-column">
            <tr>
              <td>0000{ option1.label }</td> 
                <td>{ option1.arrName }</td>
                <td>{ option1.arrAreaCate }</td>
                <td>{ option1.arrIntens }</td>
                <td>{ option1.arrModel }</td>
                <td>{ option1.arrFoot }</td>
            </tr>
          </thead>
          </table>;
        },
        renderFuncCool(h, option2) {
          return <table  class="el-table" stripe>
          <thead class="el-table-column">
            <tr>
              <td>0000{ option2.label }</td>
                <td>{ option2.arrName }</td>
                <td>{ option2.arrModel }</td>
            </tr>
          </thead>
          </table>;
        }
      } 
    },
   
    created() {
        this.getDetail()
      this.getExer()
      this.getIntens()
      this.getModel()
      this.getUnit()
      this.getMedia()
      this.getPart()
      this.mediaMenu()
      this.isAuth()
      this.getMuscle()
    this.warmActive()
    this.mainActive()
    this.coolActive()
    },
     methods: {
         videoPlayer(val){
             var data = {fileId: val}
             getvideoUrl(data)
             .then(response => {
                 this.videoUrl = response    
                 this.callVideo(val)
            })
           
         },
          callVideo(val){
         this.$refs.form.videoId(val)
       },
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
          themeDetail(data)
          .then(response => {
              this.loading = false
              this.detail = response.theme
              this.files = response.files
              this.warm = response.warmupData
              this.main = response.mainData
              this.cool = response.cooldownData
            //   alert(this.detail.isMix)
              if(this.detail.isMix === false) {
                  this.radio1 = 1
                  this.data4 = this.files.filter(item => {
                        return item.fileCd === "TM"
                    })[0].originName
                this.data4Path = this.files.filter(item => {
                    return item.fileCd === "TM"
                })[0].id
              this.val6 = this.data4[0].id
              } else {
                    this.radio = 2
                    var intro = this.files.filter(item => {
                return item.fileCd ==='TI'})[0].originName
                this.data1Path = this.files.filter(item => {
                return item.fileCd ==='TI'})[0].id
                   this.data1 = intro
                    this.addData1 = this.data1[0].id
                    
                    this.val1 = this.data1[0].id
                    this.restWarm = this.warm.restTime
                    this.restMain = this.main.restTime
              }
            //   alert(JSON.stringify(this.warm.actions))
              
              this.exerSelect = this.detail.exerKindCateId
              this.intensSelect = this.detail.intensityCd
              this.exerInput = this.detail.name
              this.effectInput = this.detail.effect
              this.exerPurpose = this.detail.purposeCateId
              this.keyword = this.detail.keyword
              this.textarea = this.detail.description
              var thumb = this.files.filter(item => {
                return item.fileCd === 'TH'})[0].originName
            this.todos1 = thumb
            var middle = this.files.filter(item => {
                return item.fileCd === 'MP'})[0].originName
            this.todos2 = middle
            var top = this.files.filter(item => {
                return item.fileCd === 'TP'})[0].originName
            this.todos3 = top

            
           
           this.thumName = this.files.filter(item => {
                  return item.fileCd === "TH"
              })[0].originName
              this.thumbPath = this.files.filter(item => {
                  return item.fileCd === "TH"
              })[0].logicalPath

              this.midImg = this.files.filter(item => {
                  return item.fileCd === "MP"
              })[0].originName
              this.midPath = this.files.filter(item => {
                  return item.fileCd === "MP"
              })[0].logicalPath

              this.topImg = this.files.filter(item => {
                  return item.fileCd === "TP"
              })[0].originName
              this.topPath = this.files.filter(item => {
                  return item.fileCd === "TP"
              })[0].logicalPath

                this.getMuscle()
                this.warmActive()
                this.mainActive()
                this.coolActive()
            
          })

      },   
        
         warmAdd(){
             this.warmShow = false
             var warm = []
             
             for(var i=0; i <= this.warmList.length; i++) {
               
             warm.push(this.warmAct.filter(item => {
                 return item.id === this.warmList[i];
             })) 
             }
             this.warmRender = warm
         },
         mainAdd(){
             var main = []
             
             for(var i=0; i <= this.mainList.length; i++) {
               
             main.push(this.mainResults.filter(item => {
                 return item.id === this.mainList[i];
             })) 
             }
             this.mainRender = main
             this.mainr = [].concat.apply([], this.mainRender);
             this.mainRender[0].mainCounter = this.mainCount
         },
         coolAdd(){
             var cool = []
             
             for(var i=0; i <= this.coolList.length; i++) {
               
             cool.push(this.coolResults.filter(item => {
                 return item.id === this.coolList[i];
             })) 
             }
             this.coolRender = cool
         },
    
     warmActive() {
            var warmA = { search: this.warmSearch, paging: this.warmPaging}
             warmActive(warmA)
            .then(response => {
                this.warmAct = response.results
                var data = [];
                this.data3 = data
                var warmList =[]
                var warmT = []
            for(var w in this.warm) {
                for(var i in this.warm[w]) {
                    var warm = this.warm[w][i].actionId
                   warmT.push(warm)
                    this.warmList = warmT
                     warmList.push(this.warmAct.filter(item => {
                        return item.id === warm   
                        
                         }) )   
                    }   
                    
                }
                this.warmRender = warmList
                for ( var i = 0; i <= this.warmAct.length; i++) {
                    
                    for(var key in this.warmAct[i]) {
                        var key = this.warmAct[i]
                        } 
                        var arrName = key.name
                        var arrPart = key.warmUpCateId
                        var arrCateName = key.warmUpCateName
                        var arrModel = key.photoModelName
                        
                        data.push(
                        {
                            label: key.id.toString(),
                            index: key.id
                        })  
                        this.data3[i].arrName = key.name
                        this.data3[i].arrPart = key.warmUpCateId
                        this.data3[i].arrModel = key.photoModelName
                        this.data3[i].arrCateName = key.warmUpCateName
                }
            })
        },
        mainActive() {
            var main ={ search: this.mainSearch, paging: this.mainPaging}
            getMainActive(main)
            .then(response => {
                this.mainResults = response.results
                var mainList = []
                var mainList1 = []
                this.mainResults[0].mainSet = this.mainSet
                this.mainResults[0].mainCount = this.mainCount
                var data = [];
                var mainT = []
                
                this.mainData = data
                 for(var m in this.main) {
                for(var x in this.main[m]) {
                    var mainId = this.main[m][x].actionId
                    
                    mainT.push(this.main[m][x].actionId)
                    this.mainList = mainT
                    mainList.push(this.mainResults.filter(item => {
                        return item.id === mainId
                    }))
                    
                   this.mainActions = [].concat.apply([], mainList)
                   if(this.mainActions.length > 0){
                    this.mainActions[x].mainSet = this.main[m][x].set
                    this.mainActions[x].mainCount = this.main[m][x].count
                   }
                    this.mainRender = [this.mainActions]
                }
                 }
                for ( var i = 0; i <= this.mainResults.length; i++) {
                    
                    for(var key in this.mainResults[i]) {
                        var key = this.mainResults[i]
                        } 
                        var arrCateName = key.actExerKindCateName
                        var arrName = key.name
                        var arrAreaCate = key.muscleAreaCateName
                        var arrIntens = key.intensityCd
                        var arrModel = key.photoModelName
                        var arrFoot = key.isFootPressure
                        
                        data.push(
                        {
                            label: key.id.toString(),
                            index: key.id
                        })  
                        this.mainData[i].arrCateName = key.actExerKindCateName
                        this.mainData[i].arrName = key.name
                        this.mainData[i].arrAreaCate = key.muscleAreaCateName
                        this.mainData[i].arrIntens = key.intensityCd
                        this.mainData[i].arrModel = key.photoModelName
                        this.mainData[i].arrFoot = key.isFootPressure
                }
            })
        },
        coolActive() {
            var cool = {search: this.coolSearch, paging: this.coolPaging}
            getCoolActive(cool)
            .then(response => {
                this.coolResults = response.results

                var data = [];
                this.coolData = data
                var coolList = []
                var coolT = []
                for(var w in this.cool) {
                for(var i in this.cool[w]) {
                    var coolId =  this.cool[w][i].actionId  
                    coolT.push(coolId)
                    this.coolList = coolT
                    coolList.push(this.coolResults.filter(item => {
                        return item.id === coolId
                    }) )
                }
                }
               
                this.coolRender = coolList

                
                for ( var i = 0; i <= this.coolResults.length; i++) {
                    
                    for(var key in this.coolResults[i]) {
                        var key = this.coolResults[i]
                        } 
                        var arrName = key.name
                        var arrModel = key.photoModelName

                        
                        data.push(
                        {
                            label: key.id.toString(),
                            index: key.id
                        })  
                        this.coolData[i].arrName = key.name
                        this.coolData[i].arrModel = key.photoModelName
                        
                }
            })
        },
       onlyMedia() {
         if(this.radio1 === 1){
         return true
         }
       },
       mixMedia() {
         if(this.radio1 === 2){
           return true
         }
       },
       change() {
         this.postFormData.append('thumbnailImage', document.getElementById('file').files[0])
         var a = document.getElementById('file').value.substring(12)
         this.todos1 = a
       },
       change1() {
        
         this.postFormData.append('middleImage', document.getElementById('file1').files[0])
         var b = document.getElementById('file1').value.substring(12)   
         this.todos2 = b
        
       },
       change2() {
         this.postFormData.append('topImage', document.getElementById('file2').files[0])
         var c = document.getElementById('file2').value.substring(12)
         this.todos3 = c
       },
        mediaOpen(){
           this.addData = this.val6
           this.addData1 = this.val1
       },
       add6(val){
        this.onlyShow = false
         this.val6 = val
          var results = this.results

         this.data4= this.results.filter(item => {
           return item.fileId === val
         }) 
         this.postFormData.append('themeVideoId', this.val6)

          var list = results.filter(item => {
                return item.fileId === this.val6
              })[0]
            var index = results.indexOf(list)
            results.splice(index, 1)
          this.results = results
            if(this.addData !== undefined) {
              var getCheer = { search: this.search, paging: this.paging}
                getMedia(getCheer)
                .then(response => { 
              this.resultOrigin = response.results
              
              this.results.push(this.resultOrigin.filter(item => {
                    // return item.fileId === JSON.parse(getItem)
                    return item.fileId === this.addData
                  })[0]) 
            })
          }
       },
      add1(val){
          this.introShow = false
         this.val1 = val
          var results = this.results
         this.data1= this.results.filter(item => {
           return item.fileId === val
         }) 

          var list = results.filter(item => {
                return item.fileId === this.val1
              })[0]
            var index = results.indexOf(list)
            results.splice(index, 1)
          this.results = results
            if(this.addData1 !== '') {
              var getCheer = { search: this.search, paging: this.paging}
                getMedia(getCheer)
                .then(response => { 
              this.resultOrigin = response.results
              
              this.results.push(this.resultOrigin.filter(item => {
                    return item.fileId === this.addData1
                  })[0]) 
            })
          }
       },
      getExer(){
        getExerKind()
            .then(response => {
              this.exerKind = response.results
              this.listLoading = false
          }).catch(response => {
              this.fetchSuccess = false
              console.log(response)
          })
        },
         getIntens() {
            getIntensity()
            .then(response => {
                this.intens = response.results
            })
        },
        getModel() {
        var u = null;
        getModel(u)
          .then(response => {
          this.model = response.results
        })
      },
      getMuscle() {
        getPurposeCategory()
            .then(response => {
              this.muscleResults = response.results
             for( var i in this.muscleResults ){
                var arrParent = this.muscleResults
                var arrList = arrParent[i].childens
                var newarr = []
                for(var x = 0; x < arrList.length; x++) {
                  if(arrList[x].id === this.exerPurpose) {
                  this.muscleAreaCateId = arrParent.filter(item => {
                     return item.childens === arrList
                   })[0].id
                  }
                  
                }
              }  
          }).catch(response => {
              this.fetchSuccess = false
              console.log(response)
          })
        },
        getUnit() {
          getEffectCd()
          .then(response => {
            this.effectUnit = response.results
          })
        },
      getMedia() {
          var getCheer = { search: this.search, paging: this.paging}
          getMedia(getCheer)
          .then(response => {
            this.results = response.results

              

          }).catch(response => {
            console.log(response)
          })
        },
        mediaMenu() {
          GetVideoMenus()
          .then(response => {
            this.mediaMenu = response.result
          })
        },
         getPart(){
        var u = null
        GetWarmupPart(u)
          .then(response => {
          this.part = response.results
        })
      },
    active(active) {
        var id = localStorage.getItem('id')
          if(active === true) {
            var isActive = false
            this.$message({
                    message: '비활성화 처리 되었습니다.',
                    type: 'info'
                });
          } else {
            var isActive = true
            this.$message({
                    message: '활성화 처리 되었습니다.',
                    type: 'success'
                });
          }
          var data = {themeId: id, isActive: isActive}
          themeActive(data)
          .then(response => {
            this.getDetail()
          })
        },
    },
    computed: {
    ...mapGetters([
      'roles',
      
    ])
  }
}
</script>
<style scoped>
table {width: 100%;}
.warmWrap {margin: 0 50px;}
h1 {
    margin: 35px 0 25px;
    text-indent: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid #cdcdcd;
}

.file-label {float: left;}
 .img_table {width: 75%;}
 .media_btn {float: left; margin: 20px 0 0 20px;}
.media_result {width: 50%; display: inline-block; line-height: 5px; }
.greed{outline: none;}
.el-table {border: 1px solid #ded5d5;}
.el-table th {text-align: center;}
.el-table td {border: 0;}
.title_style { padding:30px 10px; border-right: 1px solid #ded5d5; border-top: 1px solid #ded5d5; width: 110px; background-color: #f5f5f5;}
.el-table td.separate {border-top: 1px solid #ded5d5;}
.el-table th.separate {border-top: 1px solid #ded5d5;}
.el-table td, .el-table th {padding: 0;}
table tfoot {vertical-align: middle;}
.el-table tfoot tr td {text-align: center; padding: 20px;}
table.resultsList td {height: 45px; border-bottom: 1px solid #d2d2d2; text-align: center;}
table.resultsList { margin-bottom: 20px}
.mainInput {width: 65px;}
.exam {font-size: 12px;}
.effectStyle {padding-right: 20px;}
.btnWrap {margin: 50px; text-align: center;}
</style>
<style>
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
.mixStyle {border: 1px solid #dedada;}
.mixStyle th {background-color: #f7f6f6; height: 40px;}
.mixStyle tr, .mixStyle td, .mixStyle th {}
.restStyle {float: left; width: 110px;}
.restInput {float: left; width: 80px;}
.el-table th.titleTop {width: 75%; text-align: left; text-indent: 20px;}
.el-table th.coolTop {width: 91%; text-align: left; text-indent: 20px;}
.el-table th.titleBottom {padding-right: 20px; }
.resultsList {margin-top: 15px;}

.resultsList th {background-color: #d2d2d2; color: #000; border-right: 1px solid #fff; margin-top: 20px;}
.el-table td.mediaStart {padding: 20px 0 5px; border-top: 1px solid #d2d2d2;}
.el-table th.mediaStart {padding: 20px 0 5px; border-top: 1px solid #d2d2d2;}
.el-popover {overflow-y: scroll;}
.el-table th div.el-dialog{height: 100%; overflow-y: scroll; margin-top: 0!important;}
.el-table .cell, .el-table th div {display: block;}
img, video {width: 100%;}
</style>