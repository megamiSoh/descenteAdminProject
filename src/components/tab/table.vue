<template>
    <div class="admin_menu_wrap">
        <h1>- 메뉴 권한</h1>
        <table class="el-table" :data="result" v-model="result">
            <thead class="el-table-column" >
                <tr>
                    <th>1Depth</th>
                    <th>2Depth</th>
                    <th>메뉴 노출 및 <br>상세페이지 보기 권한</th>
                    <th colspan="2">기타권한</th>
                </tr>
            </thead>
            <tbody class="el-table-column">
                <tr v-for="menu in result" v-if="menu.id === 1">
                    <th>{{menu.name}}</th>
                    <th v-for="menu1 in menu.children">
                        {{menu1.name}}
                    </th>
                    <td>
                        <el-checkbox v-model="checked1" :checked="checked1"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='TP'">
                                {{ menu2.codeNm }}
                            </span>
                        </span>
                    </th>
                    <td>
                        <el-checkbox v-model="checked2"></el-checkbox>
                    </td>
                </tr>
                <tr v-for="menu in result" v-if="menu.id === 3">
                    <th rowspan="2">
                        {{ menu.name }}
                    </th>
                    <th rowspan="1" v-for="menu1 in menu.children" v-if="menu1.id===4">{{ menu1.name }}</th>
                    <td rowspan="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='UD'">
                                {{ menu2.codeNm }}
                            </span>
                        </span></th>
                    <td>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <!--관리자 삭제 리스트-->
                <tr v-for="menu in result" v-if="menu.id === 3">
                    <th v-for="menu1 in menu.children" v-if="menu1.id === 5">{{ menu1.name }}</th>
                    <td rowspan="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='MR'">
                                {{ menu2.codeNm }}
                            </span>
                        </span>
                    </th>
                    <td>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <!--운동 영상 관리-->
                <tr v-for="menu in result" v-if="menu.id === 6">
                    <th rowspan="5">
                        {{ menu.name }}
                    </th>
                    <th rowspan="1" v-for="menu1 in menu.children" v-if="menu1.id === 7">
                        {{menu1.name}}
                    </th>
                    <td rowspan="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children" v-if="menu1.id===7">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='CU'">
                                {{ menu2.codeNm }}
                            </span>
                        </span>
                    </th>
                    <td>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr v-for="menu in result" v-if="menu.id === 6">
                    <th rowspan="1" v-for="menu1 in menu.children" v-if="menu1.id === 8">
                        {{menu1.name}}
                    </th>
                    <td rowspan="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children" v-if="menu1.id===8">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='CU'">
                                {{ menu2.codeNm }}
                            </span>
                        </span>
                    </th>
                    <td>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr v-for="menu in result" v-if="menu.id === 6">
                    <th rowspan="1" v-for="menu1 in menu.children" v-if="menu1.id === 9">
                        {{menu1.name}}
                    </th>
                    <td rowspan="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children" v-if="menu1.id===9">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='CU'">
                                {{ menu2.codeNm }}
                            </span>
                        </span>
                    </th>
                    <td>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr v-for="menu in result" v-if="menu.id === 6">
                    <th rowspan="1" v-for="menu1 in menu.children" v-if="menu1.id === 10">
                        {{menu1.name}}
                    </th>
                    <td rowspan="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children" v-if="menu1.id===10">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='CU'">
                                {{ menu2.codeNm }}
                            </span>
                        </span>
                    </th>
                    <td>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr v-for="menu in result" v-if="menu.id === 6">
                    <th rowspan="1" v-for="menu1 in menu.children" v-if="menu1.id === 11">
                        {{menu1.name}}
                    </th>
                    <td rowspan="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children" v-if="menu1.id===11">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='CU'">
                                {{ menu2.codeNm }}
                            </span>
                        </span>
                    </th>
                    <td>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <!--스포츠 관리-->
                <tr v-for="menu in result" v-if="menu.id === 12">
                    <th rowspan="1">
                        {{ menu.name }}
                    </th>
                    <th rowspan="1" v-for="menu1 in menu.children" v-if="menu1.id === 13">
                        {{menu1.name}}
                    </th>
                    <td rowspan="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children" v-if="menu1.id===13">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='CU'">
                                {{ menu2.codeNm }}
                            </span>
                        </span>
                    </th>
                    <td>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <!--뱃지관리-->
                <tr v-for="menu in result" v-if="menu.id === 14">
                    <th rowspan="1">
                        {{ menu.name }}
                    </th>
                    <th rowspan="1" v-for="menu1 in menu.children" v-if="menu1.id === 15">
                        {{menu1.name}}
                    </th>
                    <td rowspan="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children" v-if="menu1.id===15">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='CU'">
                                {{ menu2.codeNm }}
                            </span>
                        </span>
                    </th>
                    <td>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <!--설정게시판 관리-->
                <tr v-for="menu in result" v-if="menu.id === 16">
                    <th rowspan="3">
                        {{ menu.name }}
                    </th>
                    <th rowspan="1" v-for="menu1 in menu.children" v-if="menu1.id === 17">
                        {{menu1.name}}
                    </th>
                    <td rowspan="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children" v-if="menu1.id===17">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='CU'">
                                {{ menu2.codeNm }}
                            </span>
                        </span>
                    </th>
                    <td>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr v-for="menu in result" v-if="menu.id === 16">
                    <th rowspan="1" v-for="menu1 in menu.children" v-if="menu1.id === 18">
                        {{menu1.name}}
                    </th>
                    <td rowspan="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children" v-if="menu1.id===18">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='CU'">
                                {{ menu2.codeNm }}
                            </span>
                        </span>
                    </th>
                    <td>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr v-for="menu in result" v-if="menu.id === 16">
                    <th rowspan="1" v-for="menu1 in menu.children" v-if="menu1.id === 19">
                        {{menu1.name}}
                    </th>
                    <td rowspan="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children" v-if="menu1.id===19">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='CU'">
                                {{ menu2.codeNm }}
                            </span>
                        </span>
                    </th>
                    <td>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <!--마케팅 관리-->
                <tr v-for="menu in result" v-if="menu.id === 20">
                    <th rowspan="3">
                        {{ menu.name }}
                    </th>
                    <th rowspan="1" v-for="menu1 in menu.children" v-if="menu1.id === 21">
                        {{menu1.name}}
                    </th>
                    <td rowspan="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children" v-if="menu1.id===21">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='CU'">
                                {{ menu2.codeNm }}
                            </span>
                        </span>
                    </th>
                    <td>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr v-for="menu in result" v-if="menu.id === 20">
                    <th rowspan="1" v-for="menu1 in menu.children" v-if="menu1.id === 22">
                        {{menu1.name}}
                    </th>
                    <td rowspan="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children" v-if="menu1.id===22">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='CU'">
                                {{ menu2.codeNm }}
                            </span>
                        </span>
                    </th>
                    <td>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
                <tr v-for="menu in result" v-if="menu.id === 20">
                    <th rowspan="1" v-for="menu1 in menu.children" v-if="menu1.id === 23">
                        {{menu1.name}}
                    </th>
                    <td rowspan="1">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <th>
                        <span v-for="menu1 in menu.children" v-if="menu1.id===23">
                            <span v-for="menu2 in menu1.auth" v-if="menu2.codeKey==='CU'">
                                {{ menu2.codeNm }}
                            </span>
                        </span>
                    </th>
                    <td>
                        <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                </tr>
               
            </tbody>
        </table>
    </div>
</template>
<script>
 import { getList } from '@/api/table'
 import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import axios from 'axios'
  export default {
    name: 'tablelay',
     data() {
      return {
        result: null,
        checked1: false,
        checked2: false,
        checked: false
        
      }
    },
    created() {
      var self = this;
      this.getMenu()
    },
    methods: {
        handleDataFc: function () {
            this.$emit('interface', chekced1())
        },
        getMenu() {
        this.listLoading = true
        this.dialogTableVisible = false
        // var self = this;
        // var data = {}
        // let val = this.user.id
        // var data = {result: this.result, children: this.result.children, auth: this.result.auth}
        // alert(1)
        axios.get('http://smartshoe-api-dev.azurewebsites.net/api/Menu/GetMenus' ,{ headers: { 'Authorization': 'Bearer ' + getToken() }})
            .then(response => {
                // alert(2)
            //   this.result = response.data.result
            //   this.result.children = response.data.result.children
            //   this.result.auth = response.data.result.auth
            //   this.listLoading = false
            // this.setState({
            //     result: data.result,
            //     data: data.data.children
            // })

            this.result = response.data.result
            // alert(response.data)
          }).catch(response => {
              this.fetchSuccess = false
          })
        }
    }
}
</script>

<style scoped>
    .admin_menu_wrap h1 {font-size: 20px; border-top: 1px solid black; padding-top: 48px; text-indent: 45px; }
    .el-table {text-align: center;}
    .el-table th {text-align: center; width: 155px;}
    .el-table td {width: 300px;}
    .el-table thead th {padding: 20px 0; background-color: #275273; color: #fff; font-weight: normal; font-size: 13px;}
    .el-table tbody th {background-color: #edf4ff; font-size: 11px;} 
    .registmenu ul {padding: 0;}
    .registmenu ul li {text-decoration: none; list-style: none;}
</style>