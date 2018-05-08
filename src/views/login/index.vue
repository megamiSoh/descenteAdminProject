<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">관리자 홈페이지</h3>
      <span class="ipStyle">
      접속 IP : {{ ip }}
        </span>
       <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="yonghuming" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="아이디" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="mima" ></icon-svg>
        </span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="비밀번호"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          로그인
        </el-button>

      </el-form-item>
      
    </el-form>

        
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { getList } from '@/api/table'
import { getUser } from '@/api/table'
import { getInfo } from '@/api/login'
import axios from 'axios'
import formurlencoded from 'form-urlencoded'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('올바른 사용자 이름을 입력하십시오.'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('암호는 6 자 이상이어야합니다.'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        grant_type: 'password' ,
        client_id: 'DssfAdminWeb'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        grant_type: [{  required: true, trigger: 'blur'}],
        client_id: [{ required: true, trigger: 'blur'}]
      },
      loading: false,
      ip: ''
    }
  },
  created() {
      this.ipconfig()
    },
  methods: {
    ipconfig() {
      axios.get('https://dev.descente-training.co.kr/api/ip/GetIp',{ headers: { 'Authorization': 'Bearer ' + getToken() }} )
      .then(response =>{
        this.ip=response.data
      }).catch(response=>{
      })
    },
    handleLogin() {
        var data1 = formurlencoded({
        username: this.loginForm.username,
        password: this.loginForm.password,
        grant_type: this.loginForm.grant_type,
        client_id: this.loginForm.client_id })

          

          this.loading = true
          this.$store.dispatch('Login', data1).then(response => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(response => {
            this.loading = false
            this.$alert('아이디와 비밀번호를 확인해 주세요.', 'Warning', {
              confirmButtonText: 'OK',
               type: 'warning',
              callback: action => {
                this.$message({
                  type: 'warning',
                  message: '로그인 할수 없습니다.'
                });
              }
            });
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    

    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      overflow: hidden;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
  .ipStyle {
    color: #fff;
    text-align: center;
    display: block;
    padding: 10px;
    border: 1px solid #fff;
    margin-bottom: 13px;
  }
</style>
