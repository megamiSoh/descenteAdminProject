<template>
    <div  class="memberL" v-loading="loading"> 
        <h1>신규 등록</h1>
        <table class="el-table badgeStyle">
            <tr>
                <th class="badge_table_wrap">배지 이미지</th>
                <td>
                    <label>
                        <span class="el-button fileBtn" type="primary" plane size="small">찾아 보기</span>
                        <input type="file" id="file" accept="image/*" style="display: none;" @change='getFile()'>
                    </label>
                    {{badgeImg}}
                </td>
            </tr>
            <tr>
                <th>배지 명칭</th>
                <td style="margin-bottom: 10px;">
                    <el-input v-model="badgeName" style="width: 500px;" size="small"></el-input>
                </td>
            </tr>
            <tr>
                <th>배지 습득조건</th>
                <td class="badgeTrans">
                    <table class="getTable" style="margin-left: 0px">
                        <tr>
                            <th >조건</th>
                        </tr>
                    </table>
                    <table class="getTable" style="margin-left: 559px">
                        <tr>
                            <th style="width: 70%; border-right: 1px solid #fff;">조건</th>
                            <th>달성 건수</th>
                        </tr>
                    </table>
                    <div class="badgeTrans">
                        <el-transfer
                        v-model="value4"
                        :data="data"
                         :button-texts="['삭제', '추가']"
                         :titles="['전체 조건', '선택된 조건']"
                         :render-content="renderFunc"
                         id="transferAdd"
                         >
                    </el-transfer>
                    </div>
                </td>
            </tr>
        </table>
        <div class="btnWrap">
            <el-button @click="addBadge()" size="small" type="info">등록</el-button>
            <router-link v-bind:to ="{path: '/badge/badgelist'}">
            <el-button size="small" type="warning" v-bind:to ="{path: '/badge/badgelist'}">취소</el-button>
            </router-link>
        </div>
    </div>
</template>
<script>
import { badgeCon, badgeAdd} from '@/api/badge'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    data() {
      return {
        itemList: [],
        data:[],
        value4: [],
        badgeName: '',
        condition: '',
        value3: '',
        cell1: '',
        cell2: '',
        badgeImg: '',
        value: '',
        postFormData: new FormData(),
        loading: false,
        cntLength: '',
      }
    },
    
    created() {
        this.badgeCondition()
        // this.generateData()
        // this.click()
    },
    methods: {
        getFile() {
            this.postFormData.append('thumbnailImage', document.getElementById('file').files[0])
            this.badgeImg = document.getElementById('file').value.substring(12)
             
        },
        renderFunc(h, option) {  
            return <table id="dataListTable">
            <tr>
                <td style="width: 300px;">{ option.label }</td>
                <td>
                    <el-input type="text" v-model={ option.item } />
                </td>
            </tr>
          </table>
        },
        badgeCondition() {
            badgeCon()
            .then(response => {
                this.condition = response
                const dataList = [];
                for ( var key in this.condition) {
                    var index = this.condition[key]
                    dataList.push({
                        key: index.id,
                        label: index.description.toString(),
                        item: ''
                    });
                    
                }
                return this.data = dataList;
                })
        },
    addBadge(){
       
        var itemList = []
        for(var i = 0; i < this.value4.length; i++) {
            var x = this.value4[i] - 1
            itemList.push({
                id: this.value4[i],
                cnt: this.data[x].item
            })
        }
       
        if(this.badgeImg <= 0) {
            this.$notify.error({
            title: 'Error',
            message: '배지이미지를 등록해 주세요.'
          });
        } else if (this.badgeName <= 0){
            this.$notify.error({
            title: 'Error',
            message: '배지명칭을 입력해 주세요.'
          });
        } else if (itemList <= 0) {
            this.$notify.error({
            title: 'Error',
            message: '배지 습득조건을 선택해 주세요.'
          });
        } else if (itemList.filter(item => {
            return item.cnt
        }).length < itemList.length) {
            this.$notify.error({
            title: 'Error',
            message: '달성건수를 입력해 주세요.'
          });
        } 
        else {
             this.postFormData.append('badgeGetItem', JSON.stringify(itemList))
              this.postFormData.append('name', this.badgeName)
        var data = this.postFormData
        this.$confirm('등록 하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                this.loading = true
        badgeAdd(data)
        .then(response => {
             this.loading = false
        if(response === undefined) {
              this.$message({
                  message: '관리자에게 문의하세요.',
                  type: 'warning'
                  });
          } else {
              this.$message({
              message: '등록이 완료 되었습니다.',
              type: 'success'});
              this.$router.push({ path: '/badge/badgelist' })
          }
             })
            })
             .catch(() => {
                this.loading= false
            this.$message.info('취소 되었습니다.'); 
            });
        }

    
    },
      handleChange(value, direction, movedKeys) {
        // console.log(value, direction, movedKeys);
      }
    }
  };
</script>

<style scroped>
.badgeWrap h1 {font-size: 25px; text-indent: 25px; border-bottom:1px solid gray; padding-bottom: 10px;}
.transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
.el-transfer-panel {
    width: 435px;
}
.btn_style {
    text-align: center; 
    margin: 50px 0;
}
.el-transfer-panel:first-child .el-input {
    display: none;
}

.getTable th{
    font-weight: normal;
}
.badgeTable td {padding: 10px 0}
.badgeTable th {text-align: left; padding: 10px;}
.el-icon-arrow-left:before {
    content: "\E600";
}
.el-icon-arrow-right:before {
    content: "\E604";
}
</style>
<style>
#dataListTable .el-input__inner {height: 30px;}
#dataListTable td{padding: 0}
.el-transfer-panel .el-transfer-panel__header {margin-bottom: 50px;}
.main-container {width: 1280px;}
</style>