<template>
<div class="warmWrap" id="vList" >
<el-form>
  <h1>신규등록</h1>
  <div class="warm_con">
  <el-form :inline="true">
    <el-form-item label="웜업 명칭">
      <el-input v-model="input" size="small"></el-input>
    </el-form-item>
    <el-form-item label="웜업 부위">
      <el-select placeholder="전체"  v-model="pSelect" size="small">
        <el-option :label="list.name" v-for="list in part" :value="list.id" :key="list.id" >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="촬영 모델">
      <el-select v-model="mSelect" size="small">
        <el-option :label="list.name" v-for="list in model" :value="list.id" :key="list.id" >
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  </div>
  <table class="el-table leftTitleTable">
   <tr>
    <th>웜업 동영상</th>
    <td  v-for="lists in data"> 
    {{lists.originName }}
    </td>
    <td  v-if="data.length <= 0">
          등록할 파일이 존재하지 않습니다.
      </td>
      <td><el-button @click="centerDialogVisible = true" size="small">변경</el-button></td>
   </tr>
    <tr>
      <th>썸네일 이미지</th>
      <td style="width: 600px;">
      {{todos}}
        <span v-if="!todos.length">
            등록할 파일이 존재하지 않습니다.
        </span>
      </td>
      <td>
        <label class="file-label">
        <span class="el-button fileBtn" type="primary" plane size="small" style="font-size:12px;">이미지 추가</span>
        <input class="file-input" type="file" id="file" accept="image/*" style="display: none;" @change="change()"> 
      </label>
      </td>
    </tr>
    <tr>
      <th>중간 이미지</th>
      <td>
        {{todos1}}
          <span v-if="!todos1.length">
              등록할 파일이 존재하지 않습니다.
          </span>
      </td>
      <td>
          <label class="file-label">
            <span class="el-button fileBtn" type="primary" plane size="small" style="font-size:12px;">이미지 추가</span>
            <input class="file-input" type="file" id="file1" accept="image/*" style="display: none;" @change="change1()"> 
        </label>
      </td>
    </tr>
    <tr>
      <th>상세 상단 이미지</th>
      <td>
       {{todos2}}
       <span v-if="!todos2.length">등록할 파일이 존재하지 않습니다.</span>
      </td>
      <td>
        <label class="file-label">
          <span class="el-button fileBtn" type="primary" plane size="small" style="font-size:12px;">이미지 추가</span>
          <input class="file-input" type="file" id="file2" accept="image/*" @change="change2()" style="display: none;" > 
        </label>
      </td>
    </tr>
  </table>

  <div class="btnWrap">
    <el-button type="info" size="small" class="submitBtn" @click="mediaRegist()" v-loading="fullscreenLoading">등록</el-button>
    <router-link v-bind:to="{path: '/exercise/warmup'}"><el-button type="warning" size="small" class="submitBtn">취소</el-button></router-link>
  </div>
  <el-dialog
          :visible.sync="centerDialogVisible">
          <playList @add = "pList" ref="formSend"></playList>
          </el-dialog>
</el-form>
</div>
</template>

<script>
import { GetVideoMenus, getMedia, GetWarmupPart, AddWarmup, getModel } from '@/api/exercise'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import playList from '@/components/tab/playList'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    components: {
      playList
    },
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
      } 
    },
   
    created() {
    this.getPart()
    this.getModel()
    },
     methods: {
       
       change() {
         this.postFormData.append('thumbnailImage', document.getElementById('file').files[0])
         var a = document.getElementById('file').value.substring(12)
         this.todos = a
       },
       change1() {
        
         this.postFormData.append('middleImage', document.getElementById('file1').files[0])
         var b = document.getElementById('file1').value.substring(12)   
         this.todos1 = b
        
       },
       change2() {
         this.postFormData.append('topImage', document.getElementById('file2').files[0])
         var c = document.getElementById('file2').value.substring(12)
         this.todos2 = c
       },
     
      getPart(){
        var data = null
       GetWarmupPart(data)
          .then(response => {
          this.part = response.results
          this.pSelect = this.part[0].id
        }).catch(response => {
          console.log(response)
        })
      },
      mediaRegist(){
        if(this.input <= 0) {
          this.$notify.error({
            title: 'Error',
            message: '웜업명칭을 입력해주세요.'
          });
        } else if (this.val <= 0) {
          this.$notify.error({
            title: 'Error',
            message: '웜업 동영상을 등록해 주세요.'
          });
        } else if (this.todos <= 0) {
          this.$notify.error({
            title: 'Error',
            message: '썸네일 이미지를 등록해 주세요.'
          });
        } else if (this.todos1 <= 0) {
          this.$notify.error({
            title: 'Error',
            message: '중간 이미지를 등록해 주세요.'
          });
        } else if (this.todos2 <= 0) {
          this.$notify.error({
            title: 'Error',
            message: '상세 상단 이미지를 등록해 주세요.'
          });
        }
        else{
        this.postFormData.append('name', this.input)
        this.postFormData.append('warmUpCateId', this.pSelect)
        this.postFormData.append('photoModelId', this.mSelect)
        this.postFormData.append('warmupVideoId', this.val)
        var data = this.postFormData
        this.$confirm('컨텐츠를 등록하시겠습니까?', '등록', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'Success'
        }).then(() =>{
            this.fullscreenLoading = true
        AddWarmup(data)
        .then(response => {
          this.fullscreenLoading = false
          if(response === undefined) {
              this.$message({
                  message: '컨텐츠를 등록할 수 없습니다.',
                  type: 'warning'
                  });
          } else {
              this.$message({
              message: '등록이 완료 되었습니다.',
              type: 'success'});
              this.$router.push({path: '/exercise/warmup'})
          }
        
        })
        })
        .catch(response => {
          this.fullscreenLoading = false;
          this.$message.info('취소 되었습니다.'); 
        
        })
        }
      },
      pList(val, data){
        this.data = data
        this.val = val
        this.centerDialogVisible = false
       },
     hello(){alert(1)},
      getModel() {
        var u = null;
        getModel(u)
          .then(response => {
          this.model = response.results
          this.mSelect = this.model[0].id
        })
      }

    }
}
</script>
