<template>
<div class="memberL">
    <div>
    <h1>데이터 그룹 상세정보</h1>
  <div label="족부압 리스트" class="memberL_wrap">
    <el-form>
        <el-form :inline="true" size="mini">
      <el-form-item label="운동근육">
        <el-select v-model="groupResult.kindId" :disabled="disabledShow">
          <el-option v-for="kindItem in kindResults" :label="kindItem.name" :value="kindItem.id" :key="kindItem.id"></el-option>
          
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :inline="true" size="mini">
        <el-form-item label="그룹분류">
        <el-select v-model="groupResult.groupDivision" :disabled="disabledShow">
          <el-option v-for="item in groupsfetch" :label="item.name" :value="item.key" :key="item.key">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :inline="true" size="mini">
        <el-form-item label="그룹명">
            <el-input :disabled="disabledShow" v-model="groupResult.groupNm"></el-input>
        </el-form-item>
    </el-form>
    <el-form :inline="true" size="mini">
        <el-form-item label="그룹설명">
            <el-input type="textarea" :row="2" :disabled="disabledShow" v-model="groupResult.description"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" plain size="mini" @click="deleteGroup()">그룹 삭제</el-button>
            <el-button plain size="mini" @click=" editFootGroup() ">{{disabledShow? "그룹 수정" : "수정 완료"}}</el-button>
        </el-form-item>
    </el-form>
    </el-form>

    <div>
        <h1>구간 데이터 목록</h1>
    </div>
    <div v-loading="loading">
    <footThumb v-on:listCutNum="hello"  ref="form"></footThumb>
    <el-form size="small" :inline="true" class="button_space_top" style="border-bottom: 2px solid #e5e5e5; padding-bottom: 20px;width: 100%;">
        <el-form-item><el-button type="danger" plain @click="removeCutInfo()">선택데이터 삭제</el-button></el-form-item>
        <el-form-item><el-button @click="copyShow = true">선택데이터 복사</el-button></el-form-item>
        <el-form-item><el-button @click="moveShow = true" >선택데이터 이동</el-button></el-form-item>
        
    </el-form>
</div>
    <el-form  class="btnWrap">
        <router-link v-bind:to="{path: 'footgroup'}">
            <el-button type="info" size="small">리스트로 돌아가기</el-button>
        </router-link>
    </el-form>
 </div> 
</div>

<div class="footAutoCom">
    <el-dialog :visible.sync = "copyShow" class="miniPopOver">
        <div>
          <h3 class="dialogHeader">데이터 복사</h3>
        <el-form>
          <el-form size="mini">
            <el-form-item label="데이터를 복사할 그룹 입력 - 선택" >
            <input type="text" @input="GroupSearch1" @change="GroupSearch1" v-model="popgroupsearch.groupNm" v-on:keyup.esc="escStuff()" class="groupSearchInput" size="mini"/>
            </el-form-item>
            <el-form-item  label="그룹분류" >
              <el-input  disabled v-model="originData">
                
              </el-input>
            </el-form-item>
          </el-form>
          <el-form  :inline="true" size="small" class="foot_choiceDataGroup ">
            <el-form-item>
              <el-button @click="copyShow=false" type="warning">취소</el-button>
              <el-button @click="copyCutInfo()"  type="info">복사</el-button>
            </el-form-item>
          </el-form>
        </el-form>
        </div>
        <div class="titleChild_copy" style="margin-left: 1px;
    top: 181px; overflow-y: scroll; height: 180px; display: none;" v-show="hideNShow1">
          <span v-for="item in groupResult1" class="autocomplete" @click="autoComplete1(item)" >
          {{item}}
          </span>
        
          </div>
        <div class="titleChild_copy" style="argin-left: 1px;
    top: 181px; overflow-y: scroll; height: 180px;"  v-show="noResultShow">
        <span class="autocomplete" style="padding: 5px 0;">
        검색결과가 없습니다.
        </span>
        </div>
    </el-dialog>

<el-dialog :visible.sync = "moveShow" class="miniPopOver">
        <div>
          <h3 class="dialogHeader">데이터 이동</h3>
        <el-form>
          <el-form size="mini">
            <el-form-item label="데이터를 이동할 그룹 입력 - 선택" >
            <input type="text" @input="GroupSearch1" @change="GroupSearch1" v-model="popgroupsearch.groupNm" v-on:keyup.esc="escStuff()" class="groupSearchInput" size="mini"/>
            </el-form-item>
            <el-form-item  label="그룹분류" >
              <el-input  disabled v-model="originData">
                
              </el-input>
            </el-form-item>
          </el-form>
          <el-form  :inline="true" size="small" class="foot_choiceDataGroup ">
            <el-form-item>
              <el-button @click="moveShow=false" type="warning">취소</el-button>
              <el-button @click.prevent="movefootInfo()"  type="info">이동</el-button>
            </el-form-item>
          </el-form>
        </el-form>
        </div>
        <div class="titleChild_copy" style="margin-left: 1px;
    top: 181px; overflow-y: scroll; height: 180px;" v-show="hideNShow1">
          <span v-for="item in groupResult1" class="autocomplete" @click="autoComplete1(item)" >
          {{item}}
          </span>
        
          </div>
        <div class="titleChild_copy" style="margin-left: 1px;
    top: 181px; overflow-y: scroll; height: 180px;"  v-show="noResultShow">
        <span class="autocomplete" style="padding: 5px 0;">
        검색결과가 없습니다.
        </span>
        </div>
    </el-dialog>
</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import dc from  "dc"
import crossfilter from "crossfilter2"
import d3 from "../../../../node_modules/dc/node_modules/d3";
import footThumb from "../../../components/tab/footChartThum"
import { detailFootGroup, footLogKind, footpressgroups, removeFootGroup, footCutInfos, removeCutInfo, movefootInfo,copyfootInfo, footGroupName, getLogFootGroups, editFootGroup } from '@/api/admin.js'
export default {
    components: {
        footThumb
    },
    
  data(){
    return{
    loading: false,
      groupResult: '',
      kindResults: '',
      groupsfetch: '',
      kindId: '',
      groupfet: '',
      cutInfos: '',
    //   listCutNo: [],
      copyShow: false,
      moveShow: false,
      paging: {
          page: 1,
          pageSize: 5,
          totalPages: 9,
          totalRecords: 87,
          orderBy: 'CutNo',
          ascending: false
      },
       popgroupsearch: {
        muscle: null,
        groupNm :'',
        groupDivision: null
    },
    grouppaging: {
        page: 1,
        pageSize: 20,
        totalPages: 0,
        totalRecordes: 0,
        orderBy: "GroupNo",
        ascending: false
    },
    hideNShow1: false,
    noResultShow: false,
    groupResult1: [],
    originData: '구간 데이터',
    copygroupNo: '',
    kindId: '',
    disabledShow: true,
    cutData:'',
    idListLeft: '',
    SendcutNo: '',
    SendcutNo: '',
    listCutNo: ''
    }
  },

created() {
    this.getDetail()
    this.footPressGroups()
    this.footKind()
},
methods:{
    submit() {
      this.$refs.form.submit()
    },
    hello(val){
        this.listCutNo = val
    },
    editFootGroup() {
        if( this.disabledShow === true) {
             this.disabledShow = false
        } else {
             
            this.$confirm('그룹을 수정하시겠습니까?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
            }).then(() => {
            var groupNo = localStorage.getItem('no')
            var data = {groupNo :groupNo, kindId: this.groupResult.kindId, groupDivision: this.groupResult.groupDivision, groupNm: this.groupResult.groupNm, description: this.groupResult.description}
            editFootGroup(data)
            .then(response => {
              if(response === undefined) {
                //   alert(1)
              this.$message({
                  message: '관리자에게 문의하세요.',
                  type: 'warning'
                  });
                } else {
                    this.$message({
                    message: '수정이 완료 되었습니다.',
                    type: 'success'});
                    this.disabledShow = true
                    this.cutdetail()
                }
                })
                }).catch((err) => {
                    console.log(err)
                this.$message({
                    type: 'info',
                    message: '취소되었습니다.'
                });          
                });
        }
    },
 getGroupData(){
      this.loading = true
      var data = {paging: this.grouppaging, search: this.popgroupsearch}
      
      getLogFootGroups(data)  
       .then(response => {
          this.loading= false
        this.groupResults = response.results
        this.copygroupNo = this.groupResults.filter(item => {
           return item.groupNm === this.popgroupsearch.groupNm
       })[0].groupNo
        
      })
      .catch(error => {
      })
    },
   escStuff(event) {
        this.hideNShow = false
    },
  autoComplete(item){
    this.search.groupNm = item
    this.groupResult = []
    this.hideNShow = false
    },
    autoComplete1(item){
    this.popgroupsearch.groupNm = item
    this.popgroupsearch.groupDivision = "CU"
    this.groupResult1 = []
    this.hideNShow1 = false
     this.getGroupData()
    },
    addEvent ({ type, target }) {
    if(target.value === '') {
        this.search.title = "null"
    } else {
        this.search.title = target.value
    }
      this.logfootList()
      this.logfootList()
    },
     GroupSearch({ type, target }) {
      var name = target.value
      var division = ''
     
      footGroupName(division, name)
      .then(response => {
         this.groupResult = response.results
         this.kindId =this.groupResult.kindId
         if(this.groupResult.length <= 0) {
           this.hideNShow = false
           
         } else {
           this.hideNShow = true
           
         }
      })
    },
     GroupSearch1({ type, target }) {
      var name = target.value
      var division = 'CU'
     this.noResultShow = false
     
      footGroupName(division, name)
      .then(response => {
         this.groupResult1 = response.results
        
         if(this.popgroupsearch.groupNm === '') {
            this.noResultShow = false
            this.hideNShow1 = false
         }
         else if(this.groupResult1.length <= 0) {
           this.hideNShow1 = false
           this.noResultShow = true
         } 
         else {
           this.hideNShow1 = true
           this.noResultShow = false
         }
        
      })
    },
    copyCutInfo() {
        
        if(this.listCutNo <= 0) {
            this.$notify.error({
                title: 'Error',
                message: '복사할 데이터를 선택해 주세요.'
            });
        } else if(this.popgroupsearch.groupNm <=0){
            this.$notify.error({
                title: 'Error',
                message: '데이터를 복사할 그룹을 선택해 주세요.'
            });
        }
        else {
            this.$confirm('선택한 데이터를 복사하시겠습니까?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
            }).then(() => {
            var groupNo = localStorage.getItem('no')
            var data = {groupNo: groupNo, cutNo: this.listCutNo, copyGroupNo: this.copygroupNo}
      
            copyfootInfo(data)
            .then(response => {
              if(response === undefined) {
              this.$message({
                  message: '관리자에게 문의하세요.',
                  type: 'warning'
                  });
                } else {
                    this.$message({
                    message: '복사 완료 되었습니다.',
                    type: 'success'});
                    this.copyShow = false
                }
                })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '취소되었습니다.'
                });          
                });
        }
    },
    movefootInfo() {
        if(this.listCutNo <= 0) {
            this.$notify.error({
                title: 'Error',
                message: '이동할 데이터를 선택해 주세요.'
            });
        } else if(this.popgroupsearch.groupNm <=0){
            this.$notify.error({
                title: 'Error',
                message: '데이터를 이동할 그룹을 선택해 주세요.'
            });
        }
        else {
            
            this.$confirm('선택한 데이터를 이동하시겠습니까?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
            }).then(() => {
            var groupNo = localStorage.getItem('no')
            
            var data = {groupNo: groupNo, cutNo: this.listCutNo, moveGroupNo: this.copygroupNo}
          
            movefootInfo(data)
            .then(response => {
              if(response === undefined) {
              this.$message({
                  message: '관리자에게 문의하세요.',
                  type: 'warning'
                  });
                } else {
                    this.$message({
                    message: '이동 완료 되었습니다.',
                    type: 'success'});
                    this.moveShow = false
                    this.submit()
                }
                })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '취소되었습니다.'
                });          
                });
        }
    },
    removeCutInfo() {
        this.$confirm('선택한 데이터를 삭제하시겠습니까?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
        var groupno = localStorage.getItem('no')
        var data = {groupNo : groupno, cutNo: this.listCutNo}
        removeCutInfo(data)
        .then(response => {
            if(response === undefined) {
              this.$message({
                  message: '관리자에게 문의하세요.',
                  type: 'warning'
                  });
          } else {
              this.$message({
              message: '선택한 데이터가 삭제되었습니다.',
              type: 'success'});
             this.submit()
          }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '취소되었습니다.'
          });          
        });
    },
    footKind(){
      footLogKind()
      .then(response => {
        this.kindResults = response.results
      })
    },
    footPressGroups() {
    footpressgroups()
    .then(response => {
      this.groupsfetch = response.results
    })
  },
  
    getDetail() {
        var no = localStorage.getItem('no')
        var data = {groupNo: no}
        detailFootGroup(data) 
        .then(response => {
            this.groupResult = response


        })
    },
    deleteGroup(){
        var no = localStorage.getItem('no')
        var data = {groupNo: no}
         this.$confirm('그룹을 삭제하시겠습니까?', '삭제', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                this.loading = true
           removeFootGroup(data)
            .then(response => {
            this.loading = false
              if(response === undefined) {
                  this.$message({
                      message: '그룹을 삭제 할 수 없습니다.',
                      type: 'warning'
                      });
              } else {
                  this.$message({
                  message: '삭제가 완료 되었습니다.',
                  type: 'success'});
                  this.$router.push({path: '/foot/footgroup'})
              }
          })
          })
          .catch(response => {
            this.loading = false
            this.$message.info('취소 되었습니다.'); 
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
