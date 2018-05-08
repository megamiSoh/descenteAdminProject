<template>
<div class="warmWrap" id="vList" v-loading="loading">
  <h1>상세 정보
    <span v-if="isAuth()">
      <el-button size="small" type="success" plain v-if="mainExer.isActive === true" @click="isActiveBtn(mainExer.isActive)">
        활성화
      </el-button>
      <el-button size="small" v-else type="info" plain @click="isActiveBtn(mainExer.isActive)">
        비활성화
      </el-button>
    </span>
    <span v-else>
      
    </span>
  </h1>
  <el-form>
<div class="first_wrap">
<table class="el-table" cellspacing="0" cellpadding="0" >
  <tr class="el-table-column">
  <th rowspan="4" class="title_style" >기본 정보</th>
    <th style="width: 150px;">운동 분류</th>
    <td style="width: 350px">
      {{exerKindData}}
       <el-select v-model="exerSelect" disabled size="small">
        <el-option v-for="lists in exerKind" :value ="lists.id" :label="lists.name" :key="lists.id">
        </el-option>
      </el-select>
    </td>
    <th>운동 강도</th>
    <td>
       <el-select v-model="intensSelect" disabled size="small">
        <el-option v-for="lists in intens" :value="lists.key" :label="lists.name" :key="lists.key">
        </el-option>
      </el-select>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th style="width: 150px;">촬영 모델</th>
    <td>
      <el-select v-model="mSelect" disabled size="small">
        <el-option v-for="lists in model" :label="lists.name" :key="lists.id" :value="lists.id">
        </el-option>
      </el-select>
    </td>
    <th>운동 명칭</th>
    <td style="padding-right: 20px; ">
      <el-input size="small" v-model="mainExer.name" disabled></el-input>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>운동 효과</th>
    <td>
     <el-input size="small" v-model="mainExer.effect" disabled></el-input>
    </td>
    <th>운동 단위</th>
    <td>
      <el-radio v-model="radio" :label="1" disabled>{{unit}}</el-radio>
      <el-radio v-model="radio" :label="2" disabled>
      {{unit1}}
      </el-radio>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>주동근 부위 / 세부</th>
    <td>
      <el-select v-model="muscleAreaCateId"  disabled style="width: 150px" size="small">
          <el-option label="전체" value="" placeholder="전체">
          </el-option>
          <el-option :label="muscle.name" :key="muscle.id"  v-for="muscle in muscleResults" :value="muscle.id" > 
          {{muscle.name}}
          </el-option>
        </el-select>
          <el-select v-model="muscleAreaCateDepth" style="width: 150px"  disabled size="small">
          <div v-for="muscle1 in muscleResults">
            <el-option v-for="muscle2 in muscle1.childens" :key="muscle2.id" :label="muscle2.name" :value="muscle2.id"> 
            </el-option>
          </div>
      </el-select>
    </td>
    <th>운동 설명
    </th>
    <td style="padding-right: 20px; ">
      <el-input type="textarea" :row="2" v-model="mainExer.description" disabled></el-input>
    </td>
  </tr>
  <tr>
    <th rowspan="3" class="title_style">이미지</th>
    <th class="separate">썸네일 이미지</th>
    <td class="separate" colspan="3">
        <el-dialog title="이미지 미리보기" :visible.sync = "thumShow">
        <img :src="thumPath" style="width: 100%;" /></img>
        </el-dialog>
        <el-button @click="thumShow=true" size="small" class="linkA">{{thumName}}</el-button>
    </td>
  </tr>
  <tr>
    <th>중간 이미지</th>
    <td colspan="3">
      <el-dialog title="이미지 미리보기" :visible.sync="midShow">
        <img :src="midPath" style="width: 100%;" /></img>
      </el-dialog>
      <el-button  size="small" @click="midShow = true"  class="linkA">{{midName}}</el-button>
    </td>
  </tr>
  <tr>
    <th>상세 상단 이미지</th>
    <td colspan="3">
      <el-dialog title="이미지 미리보기" :visible.sync="topShow">
        <img :src="topPath" style="width: 100%;" /></img>
      </el-dialog>
      <el-button size="small" @click="topShow = true"  class="linkA">{{topName}}</el-button>
    </td>
  </tr>
  <tr>
    <th rowspan="3" class="title_style">
      동영상
    </th>
    <th class="separate">운동소개 동영상</th>
    <td colspan="3" class="separate">
    <span>
      <el-dialog title="동영상 미리보기" :visible.sync="introShow">
        <videoP :id="introPath" ref="form"></videoP>
      </el-dialog>
      <el-button size="small" @click="introShow=true; videoPlayer(introPath)"  class="linkA">{{introName}}</el-button>
    </span>
    </td>
  </tr>
  <tr>
    <th>운동설명 동영상</th>
    <td colspan="3">
     <span>
     <el-dialog title="동영상 미리보기" :visible.sync="descShow">
        
        <videoP :id="descPath" ref="form"></videoP>
      </el-dialog>
      <el-button size="small" @click="descShow=true; videoPlayer(descPath)"  class="linkA">{{descName}}</el-button>
    </span>
    </td>
  </tr>
  <tr>
    <th>운동 좌우 유무</th>
    <td colspan="3">
      <el-radio v-model="radio1" :label="1" disabled>단일</el-radio>
      <el-radio v-model="radio1" :label="2" disabled>좌우</el-radio>
      <el-checkbox v-model="checked" disabled>족부압 유무</el-checkbox>
    </td>
  </tr>
  <tr>
    <th colspan="5" style="text-align: center;" class="title_style">운동동작 동영상</th>
  </tr>
  <tr>
    <td v-if="single()" colspan="5" style="padding: 0">
      <table style="width: 100%; margin: 20px 0;">
        <tr>
          <th style="width: 50%">Full화면 버전</th>
          <td>
            <span>
              <el-button size="small" @click="singFullShow = true; videoPlayer(singFullPath)"  class="linkA">{{singFullName}}</el-button>
              <el-dialog
                title="동영상 미리보기"
                :visible.sync="singFullShow"
              >
                <videoP :id="singFullPath" ref="form"></videoP>
              </el-dialog>
            </span>
          </td>
        </tr>
        <tr v-if="checked">
          <th style="width: 50%;">Half화면 버전</th>
          <td>
            <span>
              <el-button size="small" @click="singHalfShow = true; videoPlayer(singHalfPath)"  class="linkA">{{singHalfName}}</el-button>
              <el-dialog
                title="동영상 미리보기"
                :visible.sync="singHalfShow"
              >
              <videoP :id="singHalfPath" ref="form"></videoP>
              </el-dialog>
            </span>
          </td>
        </tr>
      </table>
    </td>
    <td colspan="5" v-if="rightLeft()" style="padding: 0">
      <table style="width: 100%; margin: 20px 0;" >
        <tr>
          <td>
            <table style="width: 100%;">
              <tr>
                <th colspan="2" style="width: 50%;">좌측 동영상</th>
              </tr>
              <tr>
                <th>Full화면 버전</th>
                <td>
                  <span>
                    <el-button size="small" @click="leftFullShow = true; videoPlayer(leftFullPath)"  class="linkA">{{leftFullName}}</el-button>
                    <el-dialog
                      title="동영상 미리보기"
                      :visible.sync="leftFullShow"
                    >
                    <videoP :id="leftFullPath" ref="form"></videoP>
                    </el-dialog>
                  </span>
                </td>
              </tr>
              <tr v-if="checked">
                <th>Half화면 버전</th>
                <td>
                  <span>
                    <el-button size="small" @click="leftHalfShow = true; videoPlayer(leftHalfPath)"  class="linkA">{{leftHalfName}}</el-button>
                    <el-dialog
                      title="동영상 미리보기"
                      :visible.sync="leftHalfShow"
                    >
                    <videoP :id="leftHalfPath" ref="form"></videoP>
                    </el-dialog>
                  </span>
                </td>
              </tr>
            </table>
          </td>
          <td>
            <table style="width: 100%;">
              <tr>
                <th colspan="2" style="width: 50%;">우측 동영상</th>
              </tr>
              <tr>
                <th>Full화면 버전</th>
                <td>
                    <span>
                      <el-button size="small" @click="rightFullShow = true; videoPlayer(rightFullPath)"  class="linkA">{{rightFullName}}</el-button>
                      <el-dialog
                        title="동영상 미리보기"
                        :visible.sync="rightFullShow"
                      >
                      <videoP :id="rightFullPath" ref="form"></videoP>
                      </el-dialog>
                    </span>
                </td>
              </tr>
              <tr v-if="checked">
                <th>Half화면 버전</th>
                <td>
                    <span>
                      <el-button size="small" @click="rightHalfShow = true; videoPlayer(rightHalfPath)"  class="linkA">{{rightHalfName}}</el-button>
                      <el-dialog
                        title="동영상 미리보기"
                        :visible.sync="rightHalfShow"
                      >
                      <videoP :id="rightHalfPath" ref="form"></videoP>
                      </el-dialog>
                    </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr v-if="checked">
    <td class="mediaPopOver">
       <el-dialog
          :visible.sync="footData"
          width="80%"
          center>
          <h3>족부압 데이터</h3>
          <table  class="footPressure el-table">
  <tr v-if="rightLeft()">
    <th style="padding: 15px;">좌측 데이터</th>
      <td colspan="5" class="listTable">
        <div @paste="onPaste1" class="greed_style">
          <v-table 
            :width="1021.6"
            :columns="columns"
            :table-data="tableData2"
            :show-vertical-border="true"
            v-model="tableData2"
          >
          </v-table>
        </div>
      </td>
  </tr>
  <tr v-if="rightLeft()">
    <th style="padding: 15px;">우측 데이터</th>
      <td colspan="5" class="listTable">
        <div @paste="onPaste" class="greed_style">
          <v-table 
            :width="1021.6"
            :columns="columns"
            :table-data="tableData1"
            :show-vertical-border="true"
            v-model="tableData1"
          >
          </v-table>
        </div>
      </td>
  </tr>
  <tr v-if="single()">
    <th  style="padding: 15px;">단일</th>
      <td colspan="5">
        <div @paste="onPaste" class="greed_style">
          <v-table 
            :width="1021.6"
            :columns="columns"
            :table-data="tableData1"
            :show-vertical-border="true"
            v-model="tableData1"
          >
          </v-table>
        </div>
      </td>
  </tr>
</table>
          <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="footData = false" type="info">닫기</el-button>
          </span>
          </el-dialog>
          <el-button @click="footData = true" size="small" class="footBtn">족부압 데이터</el-button>

    </td>
  </tr>
</table>
</div>
  <div class="btnWrap">
    <router-link v-if="isAuth()" v-bind:to="{path: 'mainremove'}"><el-button type="info" size="small" class="submitBtn">수정</el-button></router-link>
    <router-link v-bind:to="{path: '/exercise/mainlist'}"><el-button type="warning" size="small" class="submitBtn">취소</el-button>
    
    </router-link>
  </div>
  </el-form>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getExerKind, getIntensity, getModel, getMuscleArea, getEffectCd, getMedia, GetVideoMenus, getMainDetail, EditIsAcive, mainActive, getvideoUrl } from '@/api/exercise'
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
        videoUrl: '',
        loading: true,
        footData: false,
        postFormData: new FormData(),
        exerKindData: '',
        mainExer:'',
        files: '',
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
        muscleAreaCateDepth: 34,
        radio: '',
        effectUnit: '',
        unit: '',
        unit1: '',
        textarea: '',
        todos1:'',
        todos2: '',
        todos3: '',
        todos: '',
        results:'',
        data3:'',
        thumName:'',
        thumShow: false,
        thumPath: '',
        midName: '',
        midPath: '',
        midShow: false,
        topName: '',
        topPath: '',
        topShow: false,
        introName: '',
        introPath: '',
        introShow: false,
        descName: '',
        descPath: '',
        descShow: false,
        singFullName: '',
        singFullPath: '',
        singFullShow: false,
        singHalfName: '',
        singHalfPath: '',
        singHalfShow: false,
        leftFullPath: '',
        leftFullName: '',
        leftFullShow: false,
        leftHalfPath: '',
        leftHalfName: '',
        leftHalfShow: false,
        rightFullPath: '',
        rightFullName: '',
        rightFullShow: false,
        rightHalfPath: '',
        rightHalfName: '',
        rightHalfShow: false,
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
          pageSize: 10,
          totalPages: 0,
          totalRecords: 0,
          orderBy: 'CreateDate',
          ascending: true
        },
        data: '',
        data1: '',
        data2: '',
        data4: '',
        data5: '',
        data6: '',
        data7: '',
        data8: '',
        radio1: '',
        checked: '',
        var1:'',
        var2: '',
        var4:'',
        var5:'',
        var6:'',
        var7:'',
        foot: '',
      tableData1: null,
      tableData2: null,
      columns: [
        {
          field: "Time",
          title: "Time",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isEdit: false
        },
        {
          field: "L1p",
          title: "L1p",
          width: 40,
          titleAlign: "center",
          columnAlign: "center",
          isEdit: true
        },
        {
          field: "L2p",
          title: "L2p",
          width: 40,
          titleAlign: "center",
          columnAlign: "center",
          isEdit: true
        },
        {
          field: "L3p",
          title: "L3p",
          width: 40,
          titleAlign: "center",
          columnAlign: "center",
          isEdit: true
        },
        {
          field: "L4p",
          title: "L4p",
          width: 40,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "R1P",
          title: "R1P",
          width: 40,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "R2P",
          title: "R2P",
          width: 40,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "R3P",
          title: "R3P",
          width: 40,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "R4P",
          title: "R4P",
          width: 40,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "COGFront",
          title: "COGFront",
          width: 80,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "COGBack",
          title: "COGBack",
          width: 70,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "COGLeft",
          title: "COGLeft",
          width: 70,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "COPLeftFront",
          title: "COPLeftFront",
          width: 100,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "COPLeftBack",
          title: "COPLeftBack",
          width: 100,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "COPRgithFront",
          title: "COPRgithFront",
          width: 110,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "COPRgithBack",
          title: "COPRgithBack",
          width: 110,
          titleAlign: "center",
          columnAlign: "center"
        },
       
      ]
      } 
    },
   
    created() {
      this.getExer()
      this.getIntens()
      this.getModel()
      this.getUnit()
      this.getMedia()
      this.mediaMenu()
      this.getDetail()
      this.isAuth()
    },
     methods: {
       videoPlayer(val){
             var data = {fileId: val}
             getvideoUrl(data)
             .then(response => {
               if(response !== undefined) {
                  this.videoUrl = response    
                 this.callVideo(val)
               }
                 
            })
            
           
         },
          callVideo(val){
         this.$refs.form.videoId(val)
       },
       getDetail(){
          this.loading = true
          var id = localStorage.getItem('id')
          var data = {id: id}
          getMainDetail(data)
          .then(response => {
            this.loading = false
            this.mainExer = response.mainExercise
            this.files = response.files
            this.foot = response.footPressures
            
            this.thumName = this.files.filter(item => {
              return item.fileCd === 'TH'
            })[0].originName
            this.thumPath = this.files.filter(item => {
              return item.fileCd === 'TH'
            })[0].logicalPath

            this.midName = this.files.filter(item => {
              return item.fileCd === 'MP'
            })[0].originName
            this.midPath = this.files.filter(item => {
              return item.fileCd === 'MP'
            })[0].logicalPath

            this.topName = this.files.filter(item => {
              return item.fileCd === 'TP'
            })[0].originName
            
            this.topPath = this.files.filter(item => {
              return item.fileCd === 'TP'
            })[0].logicalPath

            this.introName = this.files.filter(item => {
              return item.fileCd === 'IV'
            })[0].originName

            this.introPath = this.files.filter(item => {
              return item.fileCd === 'IV'
            })[0].id

            this.descName = this.files.filter(item => {
              return item.fileCd === 'DV'
            })[0].originName

            this.descPath = this.files.filter(item => {
              return item.fileCd === 'DV'
            })[0].id
          



            if(this.mainExer.effectUnitCd === "CT") {
              this.radio = 1
            }else {
              this.radio = 2
            }
            if(this.mainExer.isLeftRight === true) {
              this.radio1 = 2
            } else {
              this.radio1 = 1
              

              
            }


            if(this.mainExer.isFootPressure === true && (this.mainExer.isLeftRight === false || this.mainExer.isLeftRight === null)) {
              this.checked = true
               var tableD1 = this.foot[0].value
              this.tableData1 = JSON.parse(tableD1)

              this.singFullName = this.files.filter(item => {
                return item.fileCd === 'AV'
              })[0].originName

              this.singFullPath = this.files.filter(item => {
                return item.fileCd === 'AV'
              })[0].id
              this.singHalfName = this.files.filter(item => {
                return item.fileCd === 'AH'
              })[0].originName

              this.singHalfPath = this.files.filter(item => {
                return item.fileCd === 'AH'
              })[0].id

              
            } else if(this.mainExer.isFootPressure === true && this.mainExer.isLeftRight === true) {

              this.checked = true
              var tableD1 = this.foot[0].value
              var tableD2 = this.foot[1].value
              this.tableData2 = JSON.parse(tableD2)
              this.tableData1 = JSON.parse(tableD1)
              this.leftFullName = this.files.filter(item => {
                return item.fileCd === 'LA'
              })[0].originName

              this.leftFullPath = this.files.filter(item => {
                return item.fileCd === 'LA'
              })[0].id

              this.leftHalfName = this.files.filter(item => {
                return item.fileCd === 'LH'
              })[0].originName

              this.leftHalfPath = this.files.filter(item => {
                return item.fileCd === 'LH'
              })[0].id

              this.rightFullName = this.files.filter(item => {
                return item.fileCd === 'RA'
              })[0].originName

              this.rightFullPath = this.files.filter(item => {
                return item.fileCd === 'RA'
              })[0].id

              this.rightHalfName = this.files.filter(item => {
                return item.fileCd === 'RH'
              })[0].originName

              this.rightHalfPath = this.files.filter(item => {
                return item.fileCd === 'RH'
              })[0].id

            } else if(this.mainExer.isFootPressure === false && (this.mainExer.isLeftRight === false || this.mainExer.isLeftRight === null)) {
              this.checked = false
              this.singFullName = this.files.filter(item => {
                return item.fileCd === 'AV'
              })[0].originName

              this.singFullPath = this.files.filter(item => {
                return item.fileCd === 'AV'
              })[0].id

            } else if(this.mainExer.isFootPressure === false && this.mainExer.isLeftRight === true ) {
              this.checked = false
              this.leftFullName = this.files.filter(item => {
                return item.fileCd === 'LA'
              })[0].originName

              this.leftFullPath = this.files.filter(item => {
                return item.fileCd === 'LA'
              })[0].id
              this.rightFullName = this.files.filter(item => {
                return item.fileCd === 'RA'
              })[0].originName

              this.rightFullPath = this.files.filter(item => {
                return item.fileCd === 'RA'
              })[0].id
            } 
            
            this.exerSelect = this.mainExer.exerKindCateId
            this.intensSelect = this.mainExer.intensityCd
            this.mSelect = this.mainExer.photoModelId
            this.muscleAreaCateDepth = this.mainExer.muscleAreaCateId
           this.getMuscle()
            
          })
        },
        getMuscle() {
        this.listLoading = true
        getMuscleArea()
            .then(response => {
              this.muscleResults = response.results
              this.listLoading = false
             
              for( var i in this.muscleResults ){
                var arrParent = this.muscleResults
                var arrList = arrParent[i].childens
                var newarr = []
                for(var x = 0; x < arrList.length; x++) {
                  if(arrList[x].id === this.muscleAreaCateDepth) {
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
      isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 8
            }).filter(item => {
                return item.authDivision === 'CU'
            }).length
           if(x > 0) {
               
               return true
           } else {
               return false
           }
       },
     onPaste(evt) {
      evt.preventDefault();

      var lines = evt.clipboardData.getData("Text").split("\r\n");
      var result = [];
      var headers = lines[0].split("\t");
      console.log(headers)
      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split("\t")
        console.log(currentline);

        for (var j = 0; j < headers.length; j++) {

            obj[headers[j]] = currentline[j];
          
        }

        result.push(obj);
      }

      console.log(JSON.stringify(result));
      console.log(result);
      this.tableData1 = result;
    },
     onPaste1(evt) {
      evt.preventDefault();

      var lines = evt.clipboardData.getData("Text").split("\r\n");
      var result = [];
      var headers = lines[0].split("\t");
      console.log(headers)
      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split("\t")
        console.log(currentline);

        for (var j = 0; j < headers.length; j++) {

            obj[headers[j]] = currentline[j];
          
        }

        result.push(obj);
      }

      console.log(JSON.stringify(result));
      console.log(result);
      this.tableData2 = result;
    },
       rightLeft() {
         if(this.radio1 === 2){
         return true}
       },
       single() {
         if(this.radio1 === 1){
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
       add(val){
         this.val = val
         this.data =this.results.filter(item => {
           return item.fileId === val
         })
       }, 
       add1(val){
         this.val1 = val
         this.data1 =this.results.filter(item => {
           return item.fileId === val
         })
       },
       add2(val){
         this.val7 = val
         this.data2 =this.results.filter(item => {
           return item.fileId === val
         })
       },
        add4(val){
         this.val6 = val
         this.data4 =this.results.filter(item => {
           return item.fileId === val
         })
       },
        add5(val){
         this.val4 = val
         this.data5 =this.results.filter(item => {
           return item.fileId === val
         })
       },
        add6(val){
         this.val5 = val
         this.data6 =this.results.filter(item => {
           return item.fileId === val
         })
       },
        add7(val){
         this.val6 = val
         this.data7 =this.results.filter(item => {
           return item.fileId === val
         })
       },
        add8(val){
         this.val7 = val
         this.data8 =this.results.filter(item => {
           return item.fileId === val
         })
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
      
        getUnit() {
          getEffectCd()
          .then(response => {
            this.effectUnit = response.results
            this.unit = this.effectUnit.filter(item => {
              return item.key === 'CT'
            })[0].name
            this.unit1 = this.effectUnit.filter(item => {
              return item.key === 'SC'
            })[0].name
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
        
        isActiveBtn(val) {
          var selectId = localStorage.getItem('id')
         if(val === true) {
                this.editActive = false
                 this.$message({
                    message: '비활성화 처리 되었습니다.',
                    type: 'info'
                });
            } else {
                this.editActive = true
                 this.$message({
                    message: '활성화 처리 되었습니다.',
                    type: 'success'
                });
            }
            var data = {actionId: selectId, isActive: this.editActive}
            mainActive(data)
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
