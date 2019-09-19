<template>
<div class="detail_Wrap" v-loading="loading">
    <h1>회원 상세정보 
        <div class="temp-pass">
        <el-button size="small" @click="open2()" v-if="sendPwd()">임시 비밀번호 발송</el-button></div>
        <span>회원코드 : 000{{user.id}} </span>
    </h1>
<el-form :model="user" :data="user" @submit.prevent="getUsers">
    <el-form-item class="memimg_wrap">
    <!--<img class="memimg" v-bind:src="file.logicalPath"  v-model="file" v-if="file!=null">-->
    <img class="memimg" v-bind:src="noimg"  v-model="file">
    </el-form-item>
    <el-form-item class="meminfo">
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>아이디 :</div></el-col>
            <el-col :span="5" value="id">
                
                <!-- <template scope="scope">
                {{scope.id}}
                </template> -->
                <div>{{user.userName}} </div>
            </el-col>
            <el-col :span="3" align="right"><div>App 알림 :</div></el-col>
            <el-col :span="5">
               <span v-if="user.isAppNotice">예</span>
               <span v-else>아니오</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>이름 :</div></el-col>
            <el-col :span="5">
                {{user.name}}
            </el-col>
            <el-col :span="3" align="right"><div>마케팅 알림 :</div></el-col>
            <el-col :span="5"> 
                <span v-if="user.isMarkNotice">예</span>
                <span v-else>아니오</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>성별 :</div></el-col>
            <el-col :span="5">
                <span v-if="user.isMale">남성</span>
                <span v-else>여성</span>
            </el-col>
            <el-col :span="3" align="right"><div>최근 접속일 :</div></el-col>
            <el-col :span="5">
                {{user.recentlyDateString}}
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="3" align="right"><div>생년월일 :</div></el-col>
            <el-col :span="5">
                {{user.birthDateString}}
            </el-col>
            <el-col :span="3" align="right"><div>가입일 :</div></el-col>
            <el-col :span="5">
                {{user.joinDateString}}
            </el-col>
        </el-row>
        <el-row :gutter="20" class="email_wrap">
            <el-col :span="3" align="right"><div>이메일 :</div></el-col>
            <el-col :span="8">
                {{user.email}}
            </el-col>
        </el-row>
        </el-form-item>
        <el-form-item class="tabWrap">
            <el-tabs  type="border-card"  @tab-click="handleClick">
                <el-tab-pane label="운동정보">
                    <tabcon1></tabcon1>
                </el-tab-pane>
                <el-tab-pane label="문진기록">
                    <tabcon3></tabcon3>
                </el-tab-pane>
                <el-tab-pane label="신체정보">
                    <tabcon2></tabcon2>
                </el-tab-pane>
                <el-tab-pane label="뱃지현황">
                    <tabcon4></tabcon4>
                </el-tab-pane>
            </el-tabs>
        </el-form-item>
    </el-form>

    <!-- 상단 데이터 끝-->
    
<div>
    <div class="btnWrap">
    <router-link v-bind:to="{path: '/member/memberlist'}">
        <el-button type="info" size="small">리스트로 돌아가기</el-button>
    </router-link>
    </div>
</div>   
</div>

  
</template>

<script>
import { mapGetters } from 'vuex'
import tabcon1 from '../../../components/tab/index'
import tabcon2 from '../../../components/tab/bodyinfo'
import tabcon3 from '../../../components/tab/questioninfo'
import tabcon4 from '../../../components/tab/badgelist'
import { getUsers, sendPwd } from '@/api/member'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
export default {
    components: {
        tabcon1, 
        tabcon2,
        tabcon3,
        tabcon4
    },
    data() {
      return {
          left: 'wow',
         loading: false,
        activeName: 'first',
        user: {
            id: '',
            userName: '',
            name: '',
            email: '',
            isMale: true,
            phoneNum: null,
            isAppNotice: false,
            isMarkNotice: false,
            recentlyDateString: '',
            recentlyDate: '',
            joinDateString: '',
            joinDate: '',
            birthDateString: '',
            birthDate: ''
        },
        menuAuth: {
          menuId: '',
          authDivision: ''
        },
        file: {},
        noimg: 'http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg'
      };
    },
    
    created() {
      this.sendPwd()
      this.getUsers()
    },
    methods: {
        sendPwd() {
            var x = this.roles.filter(item => {
                return item.menuId === 2
            }).filter(item => {
                return item.authDivision === 'TP'
            }).length
           if(x > 0) {
               
               return true
           } else {
               return false
           }
        },
       getUsers() {
        this.listLoading = true
        // var self = this;
        let val = localStorage.getItem('id')
        var data = {id: val}
        getUsers(data)
            .then(response => {
              this.user = response.user
              this.username = this.user.name
              this.file = response.file
              this.menuAuth = respomse.menuAuth
              this.listLoading = false
          }).catch(response => {
              this.fetchSuccess = false
          })
        },
        handleClick(tab, event) {
      },
       open2() {
        
        this.$confirm('임시 비밀번호가 발송되면 기존 비밀번호로는 로그인할수 없습니다.', '임시 비밀번호를 발송하시겠습니까?', 'Warning', {
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          type: 'warning'
        }).then(() => {
            var data = {id: this.name , userId: this.user.id}
                sendPwd(data)
                .then(response => {
                this.$message({
                    type: 'success',
                    message: '발송이 완료 되었습니다.',
                    showClose: true
                });
               }) 
          }).catch(response => {
             this.$message({
                type: 'info',
                message: '발송이 취소 되었습니다.'
            });  
          })
        }
    },
    computed: {
    ...mapGetters([
      'roles',
    ])
  }
}
  
</script>

<style scoped>
h1 {
    font-size: 1.7em;
    margin: 40px 0;
}
.el-input.is-disabled .el-input__inner {border: 0; background-color: #fff;}
h1 .temp-pass {display: inline-block;}
h1 span {font-size: 12px; font-weight: normal; margin: 10px; display: block;}
.memimg_wrap {display:inline-block; margin: 0 25px; position:relative; top: -130px;}
.memimg {width: 100px; height: 100px; border-radius: 50px; }
.meminfo {width: 80%; display: inline-block;}
.detail_Wrap{width: 1100px;
    margin: 0 40px 100px;}
 .el-row {
    margin-bottom: 20px;
       
    }
  .el-row:last-child {margin-bottom: 0; line-height: 17px;}
  .el-col {
    border-radius: 4px;
    font-weight: bold;
    font-size: 15px;
    line-height: 33px;
  }
  .el-col:nth-child(2), .el-col:nth-child(4) {
            font-size: 13px; font-weight: normal; line-height: 32px;
        }

  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
 .data_hight {line-height: 36px;}


</style>