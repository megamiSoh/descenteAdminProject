<template>
<div class="warmWrap" id="vList">
  <h1>수정</h1>
  <el-form>
<div class="first_wrap">
<table class="el-table  pushWrap" cellspacing="0" cellpadding="0" >
  <tr class="el-table-column">
  <th rowspan="2" class="title_style" >발송 정보</th>
    <th style="width: 150px;">발송 목적</th>
    <td style="width: 403px;  padding: 10px 0 10px;">
      <el-select v-model="sendSelect" size="small">
        <el-option v-for="lists in sendPurpose" :value ="lists.key" :label="lists.name" :key="lists.key">
        </el-option>
      </el-select>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>발송 일자</th>
    <td colspan="2" style="padding-right: 20px;">
         <el-date-picker type="date" placeholder="Pick a date" style=" margin-right: 10px;" :clearable="false" v-model="sendDate" size="small"></el-date-picker>  
    
        <el-select v-model="hours"  style="width: 100px;" size="small">
            <el-option v-for="i in 10" :value="i-1" :key="i">0{{i-1}}</el-option>
            <el-option v-for="index in hourArr" :value="index" :key="index">{{index}}</el-option>
        </el-select>
        시
        <el-select v-model="minutes" style="width: 100px;" size="small">
            <el-option v-for="i in 10" :value="i-1" :key="i">0{{i-1}}</el-option>
            <el-option v-for="index in minArr" :value="index" :key="index">{{index}}</el-option>
        </el-select>
        분
    </td>
  </tr>

  <tr class="el-table-column">
  <th rowspan="3" class="title_style" >발송 대상</th>
    <th style="width: 150px; border-top: 1px solid #ded5d5">발송 대상 성별</th>
    <td style="width: 403px;  padding: 10px 0 10px; border-top: 1px solid #ded5d5"  colspan="2">
    <div v-for="index in gender" :key="index.key" style="display: inline-block; padding: 10px;" >
        <label>
      <input type="checkbox"  :value="index.key" :id="index.key" v-model="targetGender">
      {{index.name}}
    </label>
    </div>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>발송대상 연령대</th>
    <td colspan="3" >
    
        <div  v-for="list in age" :key="list.key" style="display: inline-block;  padding: 10px;" >
        <label>
            <input type="checkbox" :value="list.key.toString()" v-model="targetAge" :id="list.key">
            {{list.name}}
        </label>
        </div>
    
    </td>
  </tr>
    <tr  class="el-table-column">
    <th>발송대상 신발유무</th>
    <td colspan="3">
        <div v-for="shoe in shoes" :key="shoe.key" style="display: inline-block;  padding: 10px;">
        <label>
            <input type="checkbox" :value="shoe.key"  v-model="haveShoes"  :id="shoe.key" >
            {{shoe.name}}
        </label>
        </div>
        <div>
            <span style="color: red; font-size: 12px">* 스마트슈즈 블루투스 연결을 1번이라도 했으면 보유로 판단</span>
        </div>
    </td>
  </tr>

  <tr class="el-table-column">
  <th rowspan="2" class="title_style" >Push</th>
    <th style="width: 150px; border-top: 1px solid #ded5d5">Push 타이틀</th>
    <td style="width: 403px;  padding: 10px 0 10px; border-top: 1px solid #ded5d5">
        <el-input v-model="pushTitle" style="width: 500px;" size="small"></el-input>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>Push 본문</th>
    <td>
        <el-input v-model="pushMain" style="width: 500px;" size="small"></el-input>
    </td>
  </tr>
   <tr class="el-table-column">
  <th class="title_style" >페이지</th>
    <th style="width: 150px; border-top: 1px solid #ded5d5">페이지 링크</th>
    <td style="width: 403px;  padding: 10px 0 10px; border-top: 1px solid #ded5d5">
       <el-button type="info" @click="dialogTableVisible = true" size="small">찾아보기</el-button>

        <el-dialog title="이벤트 페이지 링크 팝업창" :visible.sync="dialogTableVisible">
            <el-form class="searchBoxStyle">
            <el-form :inline="true"  size="mini" label-width="80px">
            <el-form-item label="검색기간">
                <el-col>
                    <el-select v-model="search.searchColumn" size="mini" style="width: 100px;" >
                        <el-option label="전체" :value="null"></el-option>
                        <el-option label="등록일" value="startDate"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col>
                    <el-date-picker type="date" v-model="search.startDate" placeholder="Pick a date" :clearable="false" size="mini" style="width: 100%; margin-right: 10px;" :disabled="search.searchColumn==null"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col>
                    <el-date-picker type="date" v-model="search.endDate" placeholder="Pick a date" :clearable="false" size="mini" style="width: 100%; margin-right: 10px;" :disabled="search.searchColumn==null"></el-date-picker>
                </el-col>
            </el-form-item>
            </el-form>
            <el-form :inline="true"  size="mini"  label-width="80px">
                <el-form-item label="상태">
                   <el-col>
                     <el-select v-model="search.state" size="mini">
                        <el-option label="전체" :value="null"></el-option>
                        <el-option v-for="list in states" :key="list.key" :value="list.key" :label="list.name">{{list.name}}</el-option>
                    </el-select>
                   </el-col>
                </el-form-item>
                <el-form-item label="제목">
                    <el-col>
                        <el-input v-model="search.title" size="mini"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form :inline="true"  label-width="80px">
                <el-form-item label="Code">
                    <el-col>
                        <el-input v-model="search.id" size="mini"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item class="member_btn_wrap">
                    <el-col>
                        <el-button type="info" size="mini" class="submitBtn" @click=" getActive()" >검색</el-button>
                        <el-button type="warning" size="mini" class="submitBtn" @click="reset()">초기화</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-form>
            <table class="el-table">
            <thead class="el-table-column listTableHead">
                <tr>
                    <th rowspan="2">No</th>
                    <th rowspan="2">Code</th>
                    <th rowspan="2">종류</th>
                    <th rowspan="2">제목</th>
                    <th rowspan="2">상태</th>
                    <th colspan="2">게시일</th>
                    <th rowspan="2">등록일</th>
                    <th rowspan="2"></th>
                </tr>
                <tr>
                    <th>시작일</th>
                    <th>종료일</th>
                </tr>
            </thead>
            <tbody  class="el-table-column listTable">
                <tr v-for="(entry, index) in results" :value="results.id" :key="results.id">
                    <td>{{index+1}}</td>
                    <td>{{entry.id}}</td>
                    <td>{{entry.stateNm}}</td>
                    <td>{{entry.stateNm}}</td>
                    <td>{{entry.title}}</td>
                    <td>{{entry.startDate}}</td>
                    <td>{{entry.endDate}}</td>
                    <td><el-button type="info" size="small" class="submitBtn" @click="adId(entry.id, entry.title)">선택</el-button></td>
                </tr>
            </tbody>
            </table>
        </el-dialog>
        {{addList}}
    </td>
  </tr>
</table>

</div>
  <div class="btnWrap">
    <el-button type="info" size="small" class="submitBtn" @click="addPush()">저장</el-button>
    <router-link v-bind:to="{path: 'pushdetail'}">
    <el-button type="warning" size="small" class="submitBtn">취소</el-button>
    </router-link>
  </div>
  
  </el-form>
 
</div>
</template>

<script>
import { GetTargetSexCd, GetTagetAgesCd, GetBoardStates, GetTargetShoesCd, GetActiveAdEvents, AddPushs, GetSendPurposeCd, pushDetail } from '@/api/marketing'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    data() {
      return {
        postFormData: new FormData(),
        sendPurpose: '',
        sendSelect: '',
        sendDate: '',
        value2: '',
        value1: '',
        hours: '18',
        minutes: '00',
        minArr: [],
        hourArr: [],
        dialogTableVisible: false,
        gender: '',
        age: '',
        shoes: '',
        results: '',
        search: {
            id: '',
            title: '',
            state: null,
            searchColumn: null,
            startDate: 
          new Date().getFullYear()+ '-'+('00'+(new Date().getMonth()+1)).slice(-2)+ '-' + '01',
            endDate:  new Date().getFullYear()+ '-'+('00'+(new Date().getMonth()+1)).slice(-2)+ '-' + ('00'+new Date().getDate()).slice(-2)
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
        targetGender: '',
        targetAge: [],
        haveShoes: [],
        pushTitle:'',
        pushMain: '',
      } 
    },
   
    created() {
        this.getSendPurpose()
        this.minutesArr()
        this.getSex()
        this.getAge()
        this.getShoes()
        this.getActive()
        this.getState()
        this.getDetail()
    },
    
    methods: {
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
               
               var targetGender = this.push.targetSexCd
               this.targetGender = targetGender
            //    alert(this.targetGender)
            //    this.targetAge = this.push.tagetAgesCd
            //    this.haveShoes = this.push.targetShoesCd
               this.pushTitle = this.push.title
               this.pushMain = this.push.contents
            //    this.addList = this.file.originName
               
            })
        },
        adId(val, val1){
            this.dialogTableVisible = false,
            this.addList = val1
            this.addId = val
        },
        minutesArr(){
             var minArr = []
             var hourArr = []
            for(var i = 10; i <= 59; i++) {
                minArr.push(i)
            }
            for(var u = 10; u <= 24; u++) {
                hourArr.push(u)
            }
            this.hourArr = hourArr
            this.minArr = minArr
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
                this.states = response
            })
        },
        getShoes(){
            GetTargetShoesCd()
            .then(response => {
                this.shoes = response.results
            })
        },
        getActive(){
            var data = {search: this.search, paging: this.paging}
            GetActiveAdEvents(data)
            .then(response => {
                this.results = response.results
            })
        },
        addPush(){
            if(this.pushTitle === ''){
                this.$notify.error({
                    showClose: true,
                    message: 'PUSH 타이틀을 입력해 주세요.',
                     title: 'Error'
                })
            } else if (this.pushMain === '') {
                this.$notify.error({
                    showClose: true,
                    message: 'PUSH 본문을 입력해 주세요.',
                     title: 'Error'
                })
            } else if(this.addId === '') {
                this.$notify.error({
                    showClose: true,
                    message: '광고/ 이벤트 페이지 링크를 선택해 주세요.',
                     title: 'Error'
                })
            } 
            else {
            var pushDate = new Date(this.sendDate).getFullYear() + '-' + (new Date(this.sendDate).getMonth() + 1) + '-' + new Date(this.sendDate).getDate()
            this.postFormData.append('title', this.pushTitle)
            this.postFormData.append('contents', this.pushMain)
            this.postFormData.append('sendYmd', pushDate)
            this.postFormData.append('sendHour', this.hours)
            this.postFormData.append('sendMinutes', this.minutes)
            this.postFormData.append('sendPurposeCd', this.sendSelect)
            this.postFormData.append('targetSexCd', '['+ JSON.stringify(this.targetGender) +']')
            this.postFormData.append('tagetAgesCd','['+ JSON.stringify(this.targetAge) +']')
            this.postFormData.append('targetShoesCd', '['+ JSON.stringify(this.haveShoes) +']')
            this.postFormData.append('advertId', this.addId)
            AddPushs(this.postFormData)
            .then(response => {
                this.$message({
                    message: '등록이 완료되었습니다.',
                    type: 'success'
                });
                this.$router.push({path:'/marketing/pushlist'})
            })
            .catch(response => {
                this.$message({
                message: '관리자에게 문의하세요.',
                type: 'waning'
            });
            })
        }
        },
        getSendPurpose() {
            GetSendPurposeCd()
            .then(response => {
                this.sendPurpose = response.results
                this.sendSelect = this.sendPurpose[0].key
            })
        },
        reset() {
         this.search = {
            id: '',
            title: '',
            state: null,
            searchColumn: null,
            startDate: 
          new Date().getFullYear()+ '-'+('00'+(new Date().getMonth()+1)).slice(-2)+ '-' + '01',
            endDate:  new Date().getFullYear()+ '-'+('00'+(new Date().getMonth()+1)).slice(-2)+ '-' + ('00'+new Date().getDate()).slice(-2)
        }}
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
.input_wrap {float: left; width: 50%;}
.btnWrap {padding: 50px;
    text-align: center;}
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