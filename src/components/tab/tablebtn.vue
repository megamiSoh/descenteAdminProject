<template>
        <div class="subcan_btn">
            <el-button type="info" size="small">등록</el-button>
            <el-button :plain="true" type="warning" size="small">취소</el-button>
        </div>
</template>
<script>
  export default {
    name: 'tablelaybtn'
}
</script>

<style scoped>
    .subcan_btn {float: right; margin-top: 30px;}
    .subcan_btn .el-button {width: 80px; font-weight: bold;}
</style>