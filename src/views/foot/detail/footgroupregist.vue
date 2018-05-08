<template>
<div class="memberL" v-loading="loading">
    <div class="dashboard-container" >
    <h1>그룹 등록</h1>
  <div label="그룹 등록" class="memberL_wrap">
    <el-form>
        <el-form :inline="true" size="mini">
      <el-form-item label="운동근육">
        <el-select v-model="kindId" >
          <el-option v-for="kindItem in kindResults" :label="kindItem.name" :value="kindItem.id" :key="kindItem.id"></el-option>
          
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :inline="true" size="mini">
        <el-form-item label="그룹분류">
        
        <el-select  v-model="groupDiv">
          <el-option v-for="item in groupsfetch" :label="item.name" :value="item.key" :key="item.key">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :inline="true" size="mini">
        <el-form-item label="그룹명">
            <el-input  v-model="groupNm"></el-input>
        </el-form-item>
    </el-form>
    <el-form :inline="true" size="mini">
        <el-form-item label="그룹설명">
            <el-input type="textarea" :row="2"  v-model="description"></el-input>
        </el-form-item>
    </el-form>
     <el-form>
        <el-form-item class="btnWrap">
            <el-button size="small" type="info" @click="foogRegist()">등록</el-button>
            <router-link v-bind:to="{path: 'footgroup'}">
            <el-button size="small" type="warning">취소</el-button>
            </router-link>
        </el-form-item>
    </el-form>
    </el-form>

   
 </div> 
</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { footGroupRegist, footLogKind, footpressgroups } from '@/api/admin.js'
export default {
  data(){
    return{
      kindResults: '',
      groupsfetch: '',
      kindId: null,
      groupfet: '',
      groupDiv: null,
      groupNm: '',
      description: '',
      loading: false,
    }
  },
created() {
    this.footPressGroups()
    this.footKind()
},


methods:{
    footKind(){
      footLogKind()
      .then(response => {
        this.kindResults = response.results
        this.kindId = this.kindResults[0].id
      })
    },
    footPressGroups() {
    footpressgroups()
    .then(response => {
      console.log(response.results)
      this.groupsfetch = response.results
      this.groupDiv = this.groupsfetch[0].key
    })
  },
    foogRegist() {
        if(this.groupNm <= 0) {
            this.$notify.error({
            title: 'Error',
            message: '그룹명을 입력해 주세요.'
          });
        } else {
        var data = {kindId: this.kindId, groupDivision: this.groupDiv, groupNm: this.groupNm, description: this.description}
        
        this.$confirm('그룹을 등록하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                this.loading = true
          footGroupRegist(data)
        .then(response => {
            this.loading = false;
            this.loading = false
              if(response === undefined) {
                  this.$message({
                      message: '그룹을 등록할 수 없습니다.',
                      type: 'warning'
                      });
              } else {
                  this.$message({
                  message: '등록이 완료 되었습니다.',
                  type: 'success'});
                  this.$router.push({path: '/foot/footgroup'})
              }
        })
        })
        .catch(response => {
            this.loading = false
            this.$message.info('취소 되었습니다.'); 
          })
          }
    },

  },
  mounted() {
      

    // console.log("root refs: " + this.$refs.chart);
    // console.log("root elm: " + this.$el);

    // console.dir(this.$refs);
  },
 
  
  computed: {
    ...mapGetters([
      'roles',
      // 'roles'
    ])
  }
}
</script>
