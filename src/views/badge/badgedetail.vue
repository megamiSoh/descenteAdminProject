<template>
    <div class="memberL" v-loading ="loading">
        <h1>상세 페이지 
        <el-button type="success" plain size="small" @click="getActive(push.isActive)" v-if="isAuth()">
        {{push.isActive ? '비활성화 처리' : '활성화 처리'}}</el-button>
        </h1>
        <table class="badgeStyle el-table">
            <tr>
                <th style="width: 150px;">배지 이미지</th>
                <td>
                    <el-button class="linkA" @click="imgShow = true" size="small">{{file.originName}}</el-button>
                    <el-dialog
                        title="이미지 미리보기"
                        :visible.sync="imgShow"
                    >
                    <img :src="file.logicalPath" style="width: 100%"/>
                    </el-dialog>
                    
                </td>
            </tr>
            <tr>
                <th>배지 명칭</th>
                <td>
                   <el-input v-model=" push.name" size="small" style="width: 500px;" disabled></el-input>
                </td>
            </tr>
            <tr>
                <th>상태</th>
                <td>{{push.isActive? '활성화' : '비활성화'}}</td>
            </tr>
            <tr>
                <th>배지 습득조건</th>
                <td>
                <div style="padding: 5px 0" v-for="item in items" :key="item.id">{{item.description}}</div>
                </td>
            </tr>
        </table>
        <div class="btn_style">
            <router-link v-bind:to="{path: 'badgeremove'}" v-if="isAuth()"><el-button type="info" size="small" >수정</el-button></router-link>
            <router-link v-bind:to="{path: '/badge/badgelist'}"><el-button type="warning" size="small">취소</el-button></router-link>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getActivate, getDetailData } from '@/api/badge'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    data() {
        return {
            push: '',
            items: '',
            file: '',
            imgShow: false,
            loading: true,
        }
    },
    
    created() {
      this.getDetail()
      this.isAuth()
    },
    methods: {
        isAuth(){
         var x = this.roles.filter(item => {
                return item.menuId === 15
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
           var data = {id : id}
           getDetailData(data)
           .then(response => {
               this.loading = false
               this.push = response.push
               this.items = response.items
               this.file = response.file
           })
       },
       getActive(isActive){
            var id = localStorage.getItem('id')
            if(isActive === true) {
                var active = false
                this.$message({
                    message: '비활성화 처리 되었습니다.',
                    type: 'info'
                });
            } else {
                var active = true
                this.$message({
                    message: '활성화 처리 되었습니다.',
                    type: 'success'
                });
            }
            var data = {badgeId: id, isActive: active}
            getActivate(data)
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
  };
</script>

<style scroped>
.badgeWrap h1 {font-size: 25px; text-indent: 25px; border-bottom:1px solid gray; padding-bottom: 10px;}
.btn_style {
    text-align: center; 
    margin: 50px 0;
}

.getTable th{
    font-weight: normal;
}
table.badgeStyle tr th {padding: 20px; text-align: left;}
</style>
<style>

</style>