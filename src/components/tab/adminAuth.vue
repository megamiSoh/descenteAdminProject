<template>
    <div>
        <table class="el-table" :data="result">
            <thead class="el-table-column listTableHead" >
                <tr>
                    <th>1Depth</th>
                    <th>2Depth</th>
                    <th>메뉴 노출 및 <br>상세페이지 보기 권한</th>
                    <th colspan="2">기타권한</th>
                </tr>
            </thead>
            <tbody v-for="list in result" :key="list.id" class="el-table-column listTable">
                <th style="background-color: #fafafa; font-weight: bold; color: #000;">
                    {{list.name}}
                </th>
                <td>
                    <div v-for="children in list.children">
                        <span :key="children.id">{{children.name}}{{children.id}}
                        </span>  
                    </div>
                </td>
                <td>
                <div  v-for="children in list.children" :key="children.id">
                <span v-for="auth in list.auth" :key="auth.codeKey" >
                               
                                    <input type="checkbox" :value="{
                                        menuId: children.id,
                                        authDivision: auth.codeKey
                                    }" v-model="authArr" disabled>  
                            </span>
                        </div>
                </td>
                <td>
                    <div v-for="children in list.children" :key="children.id">
                        <span v-for="auth in children.auth" :key="auth.codeKey"  v-if="auth.codeKey != 'DR'">
                            {{auth.codeNm}}
                            
                        </span>
                        </div>
                </td> 
                <td>
                    <div  v-for="children in list.children" :key="children.id">
                        <span  v-for="auth in children.auth" :key="auth.codeKey"  v-if="auth.codeKey != 'DR'"><input type="checkbox" :value="{menuId:children.id, authDivision: auth.codeKey}" v-model="authArr" disabled>
                            </span>
                    </div>
                </td>
            </tbody>
        </table>  
    </div>
</template>
<script>
import { quitDetail, getMenu, adminDetail, RestoreAdminRole } from '@/api/admin'
export default {
    name: 'adminAuth',
    props: {
         authArr: {type: [Array], required: true}
    },
    data(){
        return {
            result: '',
            menuAuth: '',
            listAuth: '',
            auth: '',
        }
    },
    created(){
        this.getMenu()
        // this.getUsers()
    },
    methods: {
        getMenu() {
            // console.log(this.auth)
        getMenu()
            .then(response => {
            this.result = response.result
          }).catch(response => {
              this.fetchSuccess = false
          })
        },
        getUsers() {
            // alert(1)
            // console.log(this.auth)
            // this.listAuth = this.auth
        // this.dialogTableVisible = false
        // // let val = localStorage.getItem('id')
        // // var data = {id: val}
        // // adminDetail(data)
        // //     .then(response => {
        //         this.menuAuth = this.auth
        //         // this.file = response.file
        //         var auth = [].concat.apply([],this.menuAuth)
        //         this.listAuth = this.menuAuth
        //         console.log(this.listAuth)
            // }).catch(response => {
            //     this.fetchSuccess = false
            // })
        },
    }
}
</script>
<style scoped>
    .el-table {text-align: center;}
    .el-table th {text-align: center; width: 155px;}
    tbody.el-table-column.listTable td {padding: 0;  width: 180px;}
    tbody.el-table-column.listTable th {width: 350px;}
    tbody.el-table-column.listTable td div {padding: 20px; cursor: auto;
    height: 50px;}
</style>