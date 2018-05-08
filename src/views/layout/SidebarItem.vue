<template>
  <div>
      <div style="font-size: 18px; font-weight: normal; color: #fff; padding: 30px 0 15px 20px;">
      <i class="el-icon-menu" style="padding-right: 10px;"></i>
        <router-link v-bind:to="{path: '/'}">DESCENTE</router-link>
      </div>
    <template v-for="item in results">
      <!--<router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.children[0].name}}
        </el-menu-item>
      </router-link>-->
      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <div class="eltitle" v-if="item.parentId === null" style="text-indent: 30px;">
            {{item.name}}
          </div>
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
          <router-link v-else class="menu-indent" v-bind:to="{path: child.path}">
          
            <el-menu-item :index="item.path+'/'+child.path" @click="delPageNo()">
              {{child.name}}
            </el-menu-item>
          
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import Router from 'vue-router'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import { authMenu } from '@/api/admin'
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
  data() {
      return {
        results: ''
      }
  },
  created() {
    this.homeMenu()
  },
  methods: {
    delPageNo(){
      localStorage.removeItem('pageNo')
      localStorage.removeItem('condition')
    },
    homeMenu(){
      authMenu()
      .then(response => {
        this.results = response.result
       
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.svg-icon {
  margin-right: 10px;
}
.hideSidebar .menu-indent{
  display: block;
  text-indent: 10px;
}
.eltitle {font-size: 12px; font-weight: bold;}
.el-submenu .el-menu-item {font-size: 10px; text-indent: 20px; }
.el-submenu .el-menu-item:hover{background-color: red;}
</style>

