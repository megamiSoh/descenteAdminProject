<template>
<div class="warmWrap" id="vList">
  <h1>상세 조회  <el-button @click="pushShow = true" size="small">Test Push</el-button>
  <!--<el-button type="success" size="small" @click="testPush">TEST PUSH</el-button>-->
  </h1>
  <div>
        <el-dialog
            :visible.sync="pushShow"
            style="margin-top: 5vh;"
            >
             <!--popoverlayout start-->
       <div class="mediaPopOver">
          <h3>발송대상</h3>
            <el-form class="searchBoxStyle">
              <el-form :inline="true" size="mini">
                <el-form-item label="검색기간-등록일" class="search_first">
                    <el-date-picker type="date" placeholder="Pick a date" style=" margin-right: 10px;" :clearable="false" v-model="search.startDate"></el-date-picker>
                </el-form-item>
                <el-form-item>   
                    <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="search.endDate"></el-date-picker>
                </el-form-item>
              </el-form>
              
              <!--datepicker end-->
              <el-form :inline="true" size="mini">
                <el-form-item label="아이디">
                <el-input :maxlength="30" v-model="search.userName">
                
                </el-input>
              </el-form-item>
              <el-form-item label="이름">
                <el-input   v-model="search.name">
                
                </el-input>
              </el-form-item>
              </el-form>
               <el-form :inline="true" size="mini">
                <el-form-item label="관리자 코드">
                <el-input   v-model="search.id">
                
                </el-input>
              </el-form-item>
              <el-form-item label="이메일">
                <el-input   v-model="search.mail">
                
                </el-input>
              </el-form-item>
              <el-form-item class="member_btn_wrap">
                <el-col class="member_btn">
                    <el-button type="info" icon="el-icon-search" @click="GetAdminUserApps()" size="mini">SEARCH</el-button>
                    <el-button type="warning" @click="resetBtn()" size="mini">RESEST</el-button>
                </el-col>
              </el-form-item>
               </el-form>
              
            </el-form>
            <div>
                 <table class="transMenu">
        <colgroup>
           <col width="50" />
            <col width="100" />
            <col width="100" />
            <col width="150" />
            <col width="" />
            <col width="" />
          </colgroup>
            <tr>
                <td>Code</td>
                <td>ID</td>
                <td>이름</td>
                <td>연락처</td>
                <td>E-mail</td>
                <td>등록일</td>
            </tr>
        </table>
        <table class="transMenuB">
        <colgroup>
           <col width="50" />
            <col width="100" />
            <col width="100" />
            <col width="150" />
            <col width="" />
            <col width="" />
          </colgroup>
            <tr>
                <td>Code</td>
                <td>ID</td>
                <td>이름</td>
                <td>연락처</td>
                <td>E-mail</td>
                <td>등록일</td>
            </tr>
        </table>
            </div>
            <div>
              <el-transfer
                v-model="appPushList"
                :data="data"
                :titles="[ 'Code', 'Add List' ]"
                :props="{
                  key: 'index',
                  label: 'label'
                }"
                
                :render-content="renderFunc"
                id="box"
              >
              </el-transfer>
            </div>
            
        </div>
            <div style="text-align: center; margin-top: 20px;">
                <el-button @click="pushShow = false" size="small" type="warning">닫기</el-button>
                <el-button type="info" @click="testPush()" size="small">Test Push 전송</el-button>
            </div>
            </el-dialog>
            
    <!--popover End-->
      </div>
  <el-form>
<div class="first_wrap">
<table class="el-table  pushWrap" cellspacing="0" cellpadding="0" >
  <tr class="el-table-column">
  <th rowspan="2" class="title_style" >발송 정보</th>
    <th style="width: 150px;">발송 목적</th>
    <td style="width: 403px;  padding: 10px 0 10px;" v-for="lists in sendPurpose" :value ="lists.key"  :key="lists.key" v-if="push.sendPurposeCd === lists.key" >
     {{lists.name}}
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>발송 일자</th>
    <td style="padding-right: 20px;" colspan="3">
         <el-date-picker type="date" placeholder="Pick a date" style="margin-right: 10px;" :clearable="false" v-model="sendDate" disabled size="small"></el-date-picker>  
       <span style="padding-right: 5px;">
         {{hours}}
        시
       </span>
      {{minutes}}
        분
    </td>
  </tr>

  <tr class="el-table-column">
  <th rowspan="3" class="title_style"  >발송 대상</th>
    <th style="width: 150px; border-top: 1px solid #ded5d5">발송 대상 성별</th>
    <td style="width: 403px;  padding: 10px 0 10px; border-top: 1px solid #ded5d5" colspan="2" >
    <span v-for="index in gender" :key="index.key" style="display: inline-block; padding: 10px;">
      <input type="checkbox"  :value="index.key" :id="index.key" v-model="targetGender" disabled>
      {{index.name}}
    </span>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>발송대상 연령대</th>
    <td colspan="3" >
        <div  v-for="list in age" :key="list.key" style="display: inline-block;  padding: 10px;"  >
            <input type="checkbox" :value="list.key" v-model="targetAge" :id="list.key" disabled>
            {{list.name}}
    
        </div>
    </td>
  </tr>
    <tr  class="el-table-column">
    <th>발송대상 신발유무</th>
    <td colspan="3">
        <div v-for="shoe in shoes" :key="shoe.key"  style="display: inline-block;  padding: 10px;">
            <input type="checkbox" :value="shoe.key"  v-model="haveShoes"  :id="shoe.key" disabled>
            {{shoe.name}}
        </div>
        <div>
            <span style="color: red; font-size: 12px">* 스마트슈즈 블루투스 연결을 1번이라도 했으면 보유로 판단</span>
        </div>
    </td>
  </tr>

  <tr class="el-table-column">
  <th rowspan="2" class="title_style" >Push</th>
    <th style="width: 150px; border-top: 1px solid #ded5d5">Push 타이틀</th>
    <td style="width: 403px;  border-top: 1px solid #ded5d5; padding: 10px 0 10px;">
        <el-input v-model="pushTitle" disabled size="small" style="width: 500px;"></el-input>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>Push 본문</th>
    <td>
        <el-input v-model="pushMain" disabled size="small" style="width: 500px;"></el-input>
    </td>
  </tr>
   <tr class="el-table-column">
  <th class="title_style" >페이지</th>
    <th style="width: 150px; border-top: 1px solid #ded5d5">페이지 링크</th>
    <td style="width: 403px; border-top: 1px solid #ded5d5; padding: 10px 0 10px;">
       <el-button type="info"  size="small" disabled>찾아보기</el-button>

        {{addList}}
    </td>
  </tr>
</table>

</div>
  <div class="btnWrap">
    <router-link v-bind:to="{path: 'pushremove'}"><el-button type="info" size="small" class="submitBtn" v-if="isAuth()">수정</el-button></router-link>
    <router-link v-bind:to="{path: '/marketing/pushlist'}"> <el-button type="warning" size="small" class="submitBtn">취소</el-button> </router-link>
  </div>
  
  </el-form>
 
</div>
</template>

<script>
import { testPush, GetTargetSexCd, GetTagetAgesCd, GetBoardStates, GetTargetShoesCd,  pushDetail, GetSendPurposeCd, GetAdminUserApps } from '@/api/marketing'
// import {getLoginInfo} from '@/api/login'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        sendPurpose: '',
        sendSelect: '',
        sendDate: '',
        value2: '',
        value1: '',
        hours: '',
        minutes: '',
        dialogTableVisible: false,
        gender: '',
        age: '',
        shoes: '',
        results: '',
        appPushList: [],
        data: [],
        search: {
            id: '',
            userName: '',
            name: '',
            email: '',
            searchColumn: '',
            startDate: '2017-10-01',
            endDate: '2017-12-31'
        },
        paging: {
            page: 1,
            pageSize: 20,
            totalPages: 0,
            totalRecodes: 0,
            orderBy: 'Id',
            ascending: true
        },
        states: '',
        addList: '',
        addId: '',
        targetGender: [],
        targetAge: [],
        haveShoes: [],
        pushTitle:'',
        pushMain: '',
        push: '',
        file: '',
        pushShow: false,
        apps: '',
        renderFunc(h, option) {
          return <table>
          <colgroup>
           <col width="50" />
            <col width="100" />
            <col width="100" />
            <col width="150" />
            <col width="" />
            <col width="" />
          </colgroup>
          <thead>
            <tr>
              <td>{ option.label }</td>
              <td>{ option.arrId }</td>
              <td>{ option.arrName }</td>
              <td>{ option.phone }</td>
              <td>{ option.arrMail }</td>
              <td>{ option.arrCreate }</td>
            </tr>
          </thead>
          </table>;
        }
      } 
    },
   
    created() {
        this.getSendPurpose()
        this.getSex()
        this.getAge()
        this.getShoes()
        this.GetAdminUserApps()
        this.getState()
        this.getDetail()
        this.isAuth()
    },
    
    methods: {
        isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 23
            }).filter(item => {
                return item.authDivision === 'CU'
            }).length
           if(x > 0) {   
               return true
           } else {
               return false
           }
       },
        testPush(){
            var getItem = localStorage.getItem('id')
            var data = {adminIds: this.appPushList, pushId : getItem}
            this.$confirm('TEST PUSH를 발송 하시겠습니까?', '발송', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
            testPush(data)
                .then(response => {
                     if(response === undefined) {
                this.$message({
                    message: 'TEST PUSH를 발송할 수 없습니다.',
                    type: 'warning'
                    })
                } else {
                    this.$message({
                    message: 'TEST PUSH 발송이 완료 되었습니다..',
                    type: 'success'});
                }
                })
                }).catch(err => {
               this.$message.info('취소 되었습니다.');
             })
        
        },
        getSex(){
            GetTargetSexCd()
            .then(response => {
                this.gender = response.results
            })
        },
        getAge(){
            GetTagetAgesCd()
            .then(response => {
                this.age = response.results
            })
        },
        getState(){
            GetBoardStates()
            .then(response => {
                this.states = response            })
        },
        getShoes(){
            GetTargetShoesCd()
            .then(response => {
                this.shoes = response.results
            })
        },
        getDetail(){
            var id = localStorage.getItem('id')
            var data = {id: id}
            pushDetail(data)
            .then(response => {
                this.push = response.push
                var date = this.push.sendDate
                this.file = response.file
               this.sendDate = new Date(date).getFullYear() + '-' + (new Date(date).getMonth()+1) + '-' + new Date(date).getDate()
               this.hours = new Date(date).getHours()
               this.minutes = new Date(date).getMinutes()
               this.targetGender = this.push.targetSexCd
               this.targetAge = this.push.tagetAgesCd
               this.haveShoes = this.push.targetShoesCd
               this.pushTitle = this.push.title
               this.pushMain = this.push.contents
            //    this.addList = this.file.originName
               
            })
        },
        GetAdminUserApps(){
            var data = {search: this.search, paging: this.paging}
            GetAdminUserApps(data) 
            .then(response=> {
                this.apps = response.results
                var data = [];
                this.data = data;
                for ( var i = 0; i < this.apps.length; i++) {
            
                for(var key in this.apps[i]) {
                    
                    var val = this.apps[i][key]
                    var key = this.apps[i]
                    var arrResult = key.fileId
                    var arrName = key.name
                    } 
                    var arrName = key.name
                    var arrId = key.userName
                    var arrMail = key.email
                    var arrCreate = key.adminDateString
                    // var ar
                    
                    data.push(
                    {
                        label: key.id.toString(),
                        index: key.id
                    })  
                    this.data[i].arrName = key.name
                    this.data[i].arrId = key.userName
                    this.data[i].arrCreate = key.adminDateString
                    this.data[i].arrMail = key.email
                    this.data[i].arrphone = key.phoneNumber
                }

            })
        },
        // getActive(){
        //     var data = {search: this.search, paging: this.paging}
        //     GetActiveAdEvents(data)
        //     .then(response => {
        //         this.results = response.results
        //         this.addList = this.results.filter(item => {
        //             return item.id === this.push.advertId
        //         })[0].title
        //     })
        // },
        getSendPurpose() {
            GetSendPurposeCd()
            .then(response => {
                this.sendPurpose = response.results
                this.sendSelect = this.sendPurpose[0].key
                
            })
        },
    }
    , computed: {
    ...mapGetters([
            'roles'
        ])
        }
}
</script>
<style scoped>
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
.media_result {width: 100%; display: block; line-height: 31px; border-bottom: 1px solid #ded5d5;}
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
.input_tag {width: 50%; float: left;}
.input_wrap {width: 35%;}
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
</style>