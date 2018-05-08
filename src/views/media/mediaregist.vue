<template>
<div class="warmWrap" id="vList"   v-loading="loading2">
  <h1>신규등록</h1>
  <el-form :inline="true" size="small" style="overflow: hidden;">
    <el-form-item size="mini" label="메뉴 1depth">
         <el-select v-model="value">
            <el-option :label="videoMenus.name" v-for="videoMenus in videoMenu" :value="videoMenus.id" :key="videoMenus.id" v-if="videoMenus.parentId === null">
            {{ videoMenus.name }}
            </el-option>
          </el-select>
          </el-form-item>
    <el-form-item size="mini" label="메뉴 2depth">
         <el-select v-model="value1" :disabled="value === null" placeholder="1depth를 선택해 주세요.">
            <div v-for="videoMenus in videoMenu" >
                <el-option v-for="child in videoMenus.children" :label="child.name" :value="child.id" :key="child.id" v-if="value === child.parentId">
                {{ child.name }}
                </el-option>
            </div>
          </el-select>
          </el-form-item>
    </el-form>
<div>
  <label>
    <span class="el-button button_space_bottom" style="font-size: 12px;  text-align: right; float: right; padding: 10px 20px;" >영상 추가</span>
    <input class="file-input" type="file" id="file" @change="change()" accept="video/*" style="display: none;"> 
  </label>
    <span class="file-name">
    <table class="el-table">
        <thead  class="el-table-column listTableHead">
            <tr>
                <th>No</th>
                <th>파일명</th>
                <th width="150">삭제</th>
            </tr>
        </thead>
        <tbody  class="el-table-column listTable">
            <tr>
                <td v-if="!todos.length" colspan="3" style="padidng: 40px;">
                    등록할 파일이 존재하지 않습니다.
                </td>
            </tr>
            <tr v-for="(todo, index) in todos">
                <td>{{ index +1 }}</td>
                <td>{{ todo.text }}</td>
                <td><el-button type="danger" plain @click="removeTodo(index)" size="small">X</el-button></td>
            </tr>
        </tbody>
    </table>
    </span>
    <div class="btnWrap">
        <el-button type="info" size="small" class="submitBtn" @click="mediaRegist()">등록</el-button>
        <router-link v-bind:to="{path: 'medialist'}">
            <el-button type="warning" size="small" class="submitBtn">취소</el-button>
        </router-link>
    </div>
</div>

    

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GetVideoMenus, AddVideos, } from '@/api/media'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    data() {
      return {
          postFormData: new FormData(),
          postList: '',
           postList : '',
            todos   : [],
            videoMenu: '',
            value: 6,
            value1: 7,
            local:'',
            loading2: false,
            
      };
    },
   
    created() {
        this.getMenus()
    },
     methods: {
         
        change(e) {
       for(var key =0; key < document.getElementById('file').files.length; key++) {
           this.postFormData.append('mediaFile', document.getElementById('file').files[key])
       }
       var i = document.getElementById('file').value
           this.todos.push({text: i})
    },
    getMenus() {
        GetVideoMenus()
        .then(response => {
            this.videoMenu = response.result
        })
    },
      mediaRegist() {
          if(this.value <= 0){
              this.$notify.error({
                  title: 'Error',
                  message: '메뉴 1Depth를 선택해 주세요.'
              })
          } else if(this.value1 <= 0){
              this.$notify.error({
                  title: 'Error',
                  message: '메뉴 2Depth를 선택해 주세요.'
              })
          } else if (document.getElementById('file').value <= 0) {
              this.$notify.error({
                  title: 'Error',
                  message: '영상을 등록해 주세요.'
              })
          } else{
          this.loading2 = true
          this.postFormData.append('menuId' , this.value1)
          AddVideos(this.postFormData)
          .then(response => {
              this.loading2 = false
              this.$message({ 
                message: '등록이 완료되었습니다.',
                type: 'success'
            });
            this.$router.push({path: 'medialist'})
          }).catch(response => {
              this.$message({
                message: '관리자에게 문의하세요.',
                type: 'waning'
            });
          })}
        },
    removeTodo: function (index){
      this.todos.splice(index, 1)
    var value = this.postFormData.getAll('mediaFile')
        value.splice(index, 1)
        this.postFormData.delete('mediaFile')
    for(var key =0; key < value.length; key++) {
        this.postFormData.append('mediaFile', value[key])
        }
    }
  
    },
    computed: {
    ...mapGetters([
            'name'
        ])
    }
  }


</script>
