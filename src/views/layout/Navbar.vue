<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <levelbar></levelbar>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" v-bind:src="file.logicalPath"  v-model="file" v-if="file!=null"> 
        <img class="user-avatar" v-bind:src="noimg" v-else>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/admin/profile">
          <el-dropdown-item>
            프로필
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided><span @click="logout" style="display:block;">LogOut</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Levelbar from './Levelbar'
import Hamburger from '@/components/Hamburger'
import { GetAdmins, getUsers } from '@/api/admin'
import axios from 'axios'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
export default {
  components: {
    Levelbar,
    Hamburger
  },
  data() {
    return {
     search: {
          id: 0,
          userName: null,
          name: null,
          isMale: null,
          searchColumn: null,
          startDate: null,
          endDate: null
        },
        paging: {
          page: 1,
          pageSize: 20,
          totalPages: 0,
          totalRecodes: 0,
          orderBy: 'JoinDate',
          ascending: false,
        },
        user: null,
        getId: '',
        results: null,
        file: '',
        noimg: 'http://www.abc.net.au/news/image/8314104-1x1-940x940.jpg',
    }
  },
  created() {
    this.getAdmin()
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    getAdmin(){
            this.search.name = this.name
            var data = {search: this.search, paging: this.paging}
            GetAdmins(data)
            .then(response => {
                this.results = response.results
                this.getId = this.results[0].id
                var data = {id: this.getId}
                    getUsers(data)
                    .then(response => {
                    this.user = response.user
                    this.file = response.file
                    this.listLoading = false
                }).catch(response => {
                    this.fetchSuccess = false
                })
            })
        },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() 
        
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 35px;
        line-height: 35px;
        border-radius: 0px !important;
        .hamburger-container {
            line-height: 40px;
            height: 35px;
            float: left;
            padding: 0 10px;
        }
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .avatar-container {
            height: 35px;
            display: inline-block;
            position: absolute;
            right: 35px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 2px;
                position: relative;
                .user-avatar {
                    width: 30px;
                    height: 30px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 18px;
                    font-size: 12px;
                }
            }
        }
    }
</style>

