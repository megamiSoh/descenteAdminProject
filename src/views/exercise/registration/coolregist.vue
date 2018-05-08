<template>
<div class="warmWrap" id="vList">
  <h1>신규등록</h1>
  <el-form>
    <el-form :inline="true" size="small"  class="warm_con">
      <el-form-item label="촬영 모델" ></el-form-item>
      <el-form-item>
      <el-col>
        <el-select v-model="pModel">
          <el-option v-for="item in model" :key="item.id" :value="item.id" :label="item.name">
          </el-option>
        </el-select>
      </el-col>
      </el-form-item>
      <el-form-item label="쿨다운 명칭">
    </el-form-item>
    <el-form-item>
      <el-col>
        <el-input :maxlength="30" v-model="input"></el-input>
      </el-col>
    </el-form-item>
    </el-form>
<table class="el-table leftTitleTable">
  <tr>
    <th>쿨다운 동영상</th>
    <td v-for="lists in data" :key="data.id" style="width: 600px;"> {{ lists.originName }}</td>
    <td v-if="data <= 0"  style="width: 600px;">영상을 등록해 주세요.</td>
    <td><el-button @click="coolShow = true" size="small" style="margin-left: 40px;">추가</el-button></td>
  </tr>
</table>


    <div class="btnWrap">
        <el-button type="info" size="small" class="submitBtn" @click="mediaRegist()">등록</el-button>
        <router-link v-bind:to="{path: '/exercise/cooldown'}">
        <el-button type="warning" size="small" class="submitBtn">취소</el-button>
        </router-link>
    </div>
    </el-form>

  <el-dialog
        :visible.sync="coolShow"
        >
        <playList @add = "pList" ref="formSend"></playList>
          </el-dialog>
  </el-dialog>
</div>
</template>

<script>
import { getModel, getMedia, GetVideoMenus, addCool } from '@/api/exercise'
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
        fileId: '',
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
        loading: false,
        data3:'',
        model:'',
        pModel: '',
        input: '',
        results:'',
        data: '',
        noData: '',
        addData: '',
        val: '',
        imgAdd: '',
        coolShow: false,
        postFormData: new FormData(),
        fullscreenLoading: false,
        naviShow: '',
      } 
    },
   
    created() {
      this.getModel()
    },
     methods: {
      
       change() {
         var a = document.getElementById('file').value.substring(12)
         this.imgAdd = a
       },
      getModel() {
        var u = null;
        getModel(u)
          .then(response => {
          this.model = response.results
          this.pModel = this.model[0].id
        })
      },
      
        pList(val, data){
        this.data = data
        this.val = val
        this.coolShow = false
       },
        mediaRegist() {
          if(this.input <= 0){
            this.$notify.error({
              title: 'Error',
              message: '쿨다운명칭을 입력해 주세요.'
            });
          } else if(this.data <= 0) {
            this.$notify.error({
              title: 'Error',
              message: '쿨다운 영상을 등록해 주세요.'
            });
          } else {
          this.postFormData.append('name', this.input)
          this.postFormData.append('photoModelId', this.pModel)
          this.postFormData.append('cooldownVideoId', this.val)
          var data = this.postFormData
          this.$confirm('컨텐츠를 등록하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
               this.fullscreenLoading = true;
          addCool(data)
          .then(response => {
            this.fullscreenLoading = false;
            if(response === undefined) {
                this.$message({
                    message: '컨텐츠를 등록할 수 없습니다.',
                    type: 'warning'
                    });
            } else {
                this.$message({
                message: '등록이 완료 되었습니다.',
                type: 'success'});
                this.$router.push({ path: '/exercise/cooldown' })
            }
             })
            })
             .catch(() => {
                this.fullscreenLoading = false
            this.$message.info('취소 되었습니다.'); 
            });

        }
    }}
}
</script>
