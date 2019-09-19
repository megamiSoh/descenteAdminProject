<template>
<div class="warmWrap" id="vList">
  <h1>신규등록</h1>
  <el-form style="overflow:hidden;">
<div class="warm_con">
    <el-form :inline="true" size="small">
      <el-form-item label="촬영 모델">
        <el-input placeholder="촬영 모델" :maxlength="10" v-model="pModel"></el-input>
    </el-form-item>
    </el-form>
  </div>
<div class="everWrap">
<div class="file has-name">
      <h2>Great 영상</h2>
          <el-dialog
            :visible.sync="greatShow"
            width="850"
            center>
             <!--popoverlayout start-->
        <div class="mediaPopOver">
          <h3>영상 찾아보기</h3>
            <el-form class="searchBoxStyle">
              <el-form size="mini" :inline="true">
                 <el-form-item label="검색기간 - 등록일"></el-form-item>
                <el-form-item>
                  <el-col>
                    <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="search1.startDate"></el-date-picker>   
                  </el-col>
                  </el-form-item>
                  <el-form-item>
                  <el-col
                    <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="search1.endDate"></el-date-picker>
                  </el-col>
                </el-form-item>
              </el-form>
              
              <!--datepicker end-->
              <el-form size="mini" :inline="true">
                <el-form-item label="메뉴 1/2 depth">
                    <el-col>
                        <el-select v-model="search1.parentMenuId" @change="childDefault1()">
                          <el-option label="전체" :value="null"></el-option>
                          <el-option v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id">
                          </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item>
                <el-col>
                  <el-select v-model="search1.menuId" placeholder="선택해 주세요." :disabled="search1.parentMenuId === null">
                      <span v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id" v-if="search1.parentMenuId === item.id">
                      <el-option v-for="child in item.children" :label="child.name" :value="child.id" :key="child.id" >
                      </el-option>
                      </span>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-form>
             <el-form size="mini" :inline="true">
               <el-form-item label="파일명">
                <el-input :maxlength="30" v-model="search1.originName">
                
                </el-input>
              </el-form-item>
              <el-form-item label="Code"  label-width="60px">
                <el-input v-model="search1.id" type="number">
                
                </el-input>
               
              </el-form-item>
              <el-form-item class="member_btn_wrap">
                <el-col class="member_btn">
                  <el-button type="info" icon="el-icon-search" @click="getMedia(); disabled()" size="mini">SEARCH</el-button>
                <el-button type="warning" @click="resetBtn()" size="mini">RESEST</el-button>
                </el-col>
              </el-form-item>
            </el-form>
            <el-form size="mini" :inline="true">
              
            </el-form>
             </el-form>
            <div>
            <table class="transMenu">
        <colgroup>
           <col width="50" />
            <col width="100" />
            <col width="100" />
            <col width="300" />
            <col width="" />
          </colgroup>
            <tr>
                <td>Code</td>
                <td>메뉴 1depth</td>
                <td>메뉴 2depth</td>
                <td>파일명</td>
                <td>등록일</td>
            </tr>
        </table>
        <table class="transMenuB">
        <colgroup>
           <col width="50" />
            <col width="100" />
            <col width="100" />
            <col width="300" />
            <col width="" />
          </colgroup>
            <tr>
                <td>Code</td>
                <td>메뉴 1depth</td>
                <td>메뉴 2depth</td>
                <td>파일명</td>
                <td>등록일</td>
            </tr>
        </table>
              <el-transfer
                v-model="great"
                :data="data1"
                :titles="[ 'Code', 'Add List' ]"
                :props="{
                  key: 'index',
                  label: 'label'
                }"
                
                :render-content="renderFunc"
                id="box"
              >
              </el-transfer>
            </div>
        </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="greatShow = false" size="small">닫기</el-button>
                <el-button type="primary" @click="add(); disabled()" size="small">선택</el-button>
            </span>
            </el-dialog>
            <el-button @click="getMedia(); greatShow = true; disabled(); " size="small"  class="btn_margin">추가</el-button>
    <!--popover End-->
        <table class="el-table"  stripe >
            <thead class="el-table-column">
                <tr>
                    <th class="tableResStyle">결과</th>
                    <th class="tableDelStyle">삭제</th>
                </tr>
            </thead>
            <tbody class="el-table-column" v-for="lists in greatList" :value="lists.id" :key="lists.id">
                <tr v-for="lists1 in lists" :key="lists1.id" :value="lists1.id">
                  <td>{{lists1.originName}}{{lists1.fileId}}</td>
                  <td>
                    <el-button type="danger" plain size="small" @click="greatDelete(lists1.fileId)" class="delete_BTN">삭제</el-button>
                  </td>
                </tr>
            </tbody>
            <tfoot>
               <tr v-if="greatList === null || greatList[0] <= 0">
                  <td colspan="2" align="center" style="padding: 20px;">
                    영상을 등록 해 주세요.
                  </td>
                </tr>
            </tfoot>
      </table>
</div>
<div  class="file has-name">
      <h2>Good영상</h2>
    
      <el-dialog
    :visible.sync="goodShow"
    width="850"
    center>
     <!--popoverlayout start-->
        <div class="mediaPopOver">
          <h3>영상 찾아보기</h3>
            <el-form class="searchBoxStyle">
              <el-form size="mini" :inline="true">
                 <el-form-item label="검색기간 - 등록일"></el-form-item>
                <el-form-item>
                  <el-col>
                    <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="search2.startDate"></el-date-picker>   
                  </el-col>
                  </el-form-item>
                  <el-form-item>
                  <el-col
                    <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="search2.endDate"></el-date-picker>
                  </el-col>
                </el-form-item>
              </el-form>
              
              <!--datepicker end-->
              <el-form size="mini" :inline="true">
                <el-form-item label="메뉴 1/2 depth">
                    <el-col>
                        <el-select v-model="search2.parentMenuId" @change="childDefault1()">
                          <el-option label="전체" :value="null"></el-option>
                          <el-option v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id">
                          </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item>
                <el-col>
                  <el-select v-model="search2.menuId" placeholder="선택해 주세요." :disabled="search2.parentMenuId === null">
                      <span v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id" v-if="search2.parentMenuId === item.id">
                      <el-option v-for="child in item.children" :label="child.name" :value="child.id" :key="child.id" >
                      </el-option>
                      </span>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-form>
             <el-form size="mini" :inline="true">
               <el-form-item label="파일명">
                <el-input :maxlength="30" v-model="search2.originName">
                
                </el-input>
              </el-form-item>
              <el-form-item label="Code" label-width="60px">
                <el-input  v-model="search2.id" type="number">
                
                </el-input>
               
              </el-form-item>
               <el-form-item class="member_btn_wrap">
                <el-col class="member_btn">
                  <el-button type="info" icon="el-icon-search" @click="getMedia1(); disabled()" size="mini">SEARCH</el-button>
                <el-button type="warning" @click="resetBtn()" size="mini">RESEST</el-button>
                </el-col>
              </el-form-item>
            </el-form>
            
             </el-form>
            <div>
            <table class="transMenu">
        <colgroup>
           <col width="50" />
            <col width="100" />
            <col width="100" />
            <col width="300" />
            <col width="" />
          </colgroup>
            <tr>
                <td>Code</td>
                <td>메뉴 1depth</td>
                <td>메뉴 2depth</td>
                <td>파일명</td>
                <td>등록일</td>
            </tr>
        </table>
        <table class="transMenuB">
        <colgroup>
           <col width="50" />
            <col width="100" />
            <col width="100" />
            <col width="300" />
            <col width="" />
          </colgroup>
            <tr>
                <td>Code</td>
                <td>메뉴 1depth</td>
                <td>메뉴 2depth</td>
                <td>파일명</td>
                <td>등록일</td>
            </tr>
        </table>
        </div>
            <div>
              <el-transfer
                v-model="good"
                :data="data2"
                :titles="[ 'Code', 'Add List' ]"
                :props="{
                  key: 'index',
                  label: 'label'
                }"
                
                :render-content="renderFunc1"
                id="box"
              >
              </el-transfer>
            </div>
        </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="goodShow = false" size="small">닫기</el-button>
        <el-button type="primary" @click="add(); disabled()" size="small">선택</el-button>
    </span>
    </el-dialog>
    <el-button @click="goodShow = true; disabled(); getMedia1()" size="small"  class="btn_margin">추가</el-button>
    <table class="el-table"  stripe >
            <thead class="el-table-column">
                <tr>
                    <th class="tableResStyle">결과</th>
                    <th class="tableDelStyle">삭제</th>
                </tr>
            </thead>
            <tbody class="el-table-column" v-for="lists in goodList" :key="lists.id" :value="lists.id">
                <tr v-for="lists1 in lists" :key="lists1.id" :value="lists.id">
                  <td>{{lists1.originName}}</td>
                  <td>
                    <el-button type="danger" plain size="small" class="delete_BTN" @click="goodDelete(lists1.fileId)">삭제</el-button>
                  </td>
                </tr>
            </tbody>
            <tfoot>
               <tr v-if="goodList === null || goodList[0] <= 0">
                  <td colspan="2" align="center" style="padding: 20px;">
                    영상을 등록 해 주세요.
                  </td>
                </tr>
            </tfoot>
        </table>
  </div>
  </div>
<div  class="file has-name">
      <h2>Bad영상</h2>

         <el-dialog
            :visible.sync="badShow"
            width="850"
            center>
           <!--popoverlayout start-->
        <div class="mediaPopOver">
          <h3>영상 찾아보기</h3>
            <el-form class="searchBoxStyle">
              <el-form size="mini" :inline="true">
                 <el-form-item label="검색기간 - 등록일"></el-form-item>
                <el-form-item>
                  <el-col>
                    <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="search3.startDate"></el-date-picker>   
                  </el-col>
                  </el-form-item>
                  <el-form-item>
                  <el-col
                    <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="search3.endDate"></el-date-picker>
                  </el-col>
                </el-form-item>
              </el-form>
              
              <!--datepicker end-->
              <el-form size="mini" :inline="true">
                <el-form-item label="메뉴 1/2 depth">
                    <el-col>
                        <el-select v-model="search3.parentMenuId" @change="childDefault1()">
                          <el-option label="전체" :value="null"></el-option>
                          <el-option v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id">
                          </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item>
                <el-col>
                  <el-select v-model="search3.menuId" placeholder="선택해 주세요." :disabled="search3.parentMenuId === null">
                      <span v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id" v-if="search3.parentMenuId === item.id">
                      <el-option v-for="child in item.children" :label="child.name" :value="child.id" :key="child.id" >
                      </el-option>
                      </span>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-form>
             <el-form size="mini" :inline="true">
               <el-form-item label="파일명">
                <el-input :maxlength="30" v-model="search3.originName">
                
                </el-input>
              </el-form-item>
              <el-form-item label="Code"  label-width="60px">
                <el-input v-model="search3.id" type="number">
                
                </el-input>
               
              </el-form-item>
              <el-form-item class="member_btn_wrap">
                <el-col class="member_btn">
                  <el-button type="info" icon="el-icon-search" @click="getMedia2(); disabled()" size="mini">SEARCH</el-button>
                <el-button type="warning" @click="resetBtn()" size="mini">RESEST</el-button>
                </el-col>
              </el-form-item>
            </el-form>
             </el-form>
            <table class="transMenu">
        <colgroup>
           <col width="50" />
            <col width="100" />
            <col width="100" />
            <col width="300" />
            <col width="" />
          </colgroup>
            <tr>
                <td>Code</td>
                <td>메뉴 1depth</td>
                <td>메뉴 2depth</td>
                <td>파일명</td>
                <td>등록일</td>
            </tr>
        </table>
        <table class="transMenuB">
        <colgroup>
           <col width="50" />
            <col width="100" />
            <col width="100" />
            <col width="300" />
            <col width="" />
          </colgroup>
            <tr>
                <td>Code</td>
                <td>메뉴 1depth</td>
                <td>메뉴 2depth</td>
                <td>파일명</td>
                <td>등록일</td>
            </tr>
        </table>
            <div>
              <el-transfer
                v-model="bad"
                :data="data3"
                :titles="[ 'Code', 'Add List' ]"
                :props="{
                  key: 'index',
                  label: 'label'
                }"
                
                :render-content="renderFunc2"
                id="box"
              >
              </el-transfer>
            </div>
        </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="badShow = false" size="small">닫기</el-button>
                <el-button type="primary" @click="add(); disabled()" size="small">선택</el-button>
            </span>
            </el-dialog>
            <el-button @click="badShow = true; disabled(); getMedia2()" size="small"  class="btn_margin">추가</el-button>
    <table class="el-table"  stripe >
            <thead class="el-table-column">
                <tr>
                    <th class="tableResStyle">결과</th>
                    <th class="tableDelStyle">삭제</th>
                </tr>
            </thead>
            <tbody class="el-table-column" v-for="lists in badList" :value="lists.id" :key="lists.id">
                <tr v-for="lists1 in lists" :value="lists1.id" :key="lists.id">
                  <td>{{lists1.originName}}</td>
                  <td>
                    <el-button type="danger" plain size="small" class="delete_BTN" @click="badDelete(lists1.fileId)">삭제</el-button>
                  </td>
                </tr>
            </tbody>
            <tfoot>
               <tr v-if=" badList === null || badList[0] <=0">
                  <td colspan="2" align="center" style="padding: 20px;">
                    영상을 등록 해 주세요.
                  </td>
                </tr>
            </tfoot>
        </table>
        
    </div>
<div  class="file has-name">
      <h2>대기영상</h2>
  
<el-dialog
    :visible.sync="waitShow"
    width="850"
    center>
    <!--popoverlayout start-->
        <div class="mediaPopOver">
          <h3>영상 찾아보기</h3>
            <el-form class="searchBoxStyle">
              <el-form size="mini" :inline="true">
                 <el-form-item label="검색기간 - 등록일"></el-form-item>
                <el-form-item>
                  <el-col>
                    <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="search4.startDate"></el-date-picker>   
                  </el-col>
                  </el-form-item>
                  <el-form-item>
                  <el-col
                    <el-date-picker type="date" placeholder="Pick a date" :clearable="false" v-model="search4.endDate"></el-date-picker>
                  </el-col>
                </el-form-item>
              </el-form>
              
              <!--datepicker end-->
              <el-form size="mini" :inline="true">
                <el-form-item label="메뉴 1/2 depth">
                    <el-col>
                        <el-select v-model="search4.parentMenuId" @change="childDefault1()">
                          <el-option label="전체" :value="null"></el-option>
                          <el-option v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id">
                          </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item>
                <el-col>
                  <el-select v-model="search4.menuId" placeholder="선택해 주세요." :disabled="search4.parentMenuId === null">
                      <span v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id" v-if="search4.parentMenuId === item.id">
                      <el-option v-for="child in item.children" :label="child.name" :value="child.id" :key="child.id" >
                      </el-option>
                      </span>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-form>
             <el-form size="mini" :inline="true">
               <el-form-item label="파일명">
                <el-input :maxlength="30" v-model="search4.originName">
                
                </el-input>
              </el-form-item>
              <el-form-item label="Code" label-width="60px">
                <el-input  v-model="search4.id" type="number">
                
                </el-input>
               
              </el-form-item>
              <el-form-item class="member_btn_wrap">
                <el-col class="member_btn">
                  <el-button type="info" icon="el-icon-search" @click="getMedia3(); disabled()" size="mini">SEARCH</el-button>
                <el-button type="warning" @click="resetBtn()" size="mini">RESEST</el-button>
                </el-col>
              </el-form-item>
            </el-form>
             </el-form>
            <div>
            <table class="transMenu">
        <colgroup>
           <col width="50" />
            <col width="100" />
            <col width="100" />
            <col width="300" />
            <col width="" />
          </colgroup>
            <tr>
                <td>Code</td>
                <td>메뉴 1depth</td>
                <td>메뉴 2depth</td>
                <td>파일명</td>
                <td>등록일</td>
            </tr>
        </table>
        <table class="transMenuB">
        <colgroup>
           <col width="50" />
            <col width="100" />
            <col width="100" />
            <col width="300" />
            <col width="" />
          </colgroup>
            <tr>
                <td>Code</td>
                <td>메뉴 1depth</td>
                <td>메뉴 2depth</td>
                <td>파일명</td>
                <td>등록일</td>
            </tr>
        </table>
              <el-transfer
                v-model="wait"
                :data="data4"
                :titles="[ 'Code', 'Add List' ]"
                :props="{
                  key: 'index',
                  label: 'label'
                }"
                
                :render-content="renderFunc3"
                id="box"
              >
              </el-transfer>
            </div>
            
        </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="waitShow = false" size="small">닫기</el-button>
        <el-button type="primary" @click="add(); disabled()" size="small">선택</el-button>
    </span>
    </el-dialog>
    <el-button @click="waitShow = true;disabled(); getMedia3()" size="small"  class="btn_margin">추가</el-button>
    <table class="el-table"  stripe >
            <thead class="el-table-column">
                <tr>
                    <th class="tableResStyle">결과</th>
                    <th class="tableDelStyle">삭제</th>
                </tr>
            </thead>
            <tbody class="el-table-column" v-for="lists in waitList" :key="lists.id" :value="lists.id">
                <tr v-for="lists1 in lists" :key="lists1.id" :value="lists1.id">
                  <td>{{lists1.originName}}</td>
                  <td>
                    <el-button type="danger" plain size="small" class="delete_BTN" @click="waitDelete(lists1.fileId)">삭제</el-button>
                  </td>
                </tr>
            </tbody>
            <tfoot>
               <tr v-if=" waitList === null || waitList[0] <= 0">
                  <td colspan="2" align="center" style="padding: 20px;">
                    영상을 등록 해 주세요.
                  </td>
                </tr>
            </tfoot>
        </table>
          </div>
</el-form>

<div class="btnWrap">
        <el-button type="info" size="small" class="submitBtn" @click="mediaRegist()">등록</el-button>
        <router-link v-bind:to="{path: '/exercise/cheeruplist'}"><el-button type="warning" size="small" class="submitBtn">취소</el-button></router-link>
    </div>
    <div>

</div>
</div>

</template>

<script>
import { mapGetters } from 'vuex'
import { getMedia, GetVideoMenus, AddCheering } from '@/api/exercise'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    data() {
      
      
      return {
        data3:[],
        data1:[],
        data2:[],
        data4:[],
         search1: {
            id: '',
            parentMenuId: null,
            menuId: null,
            originName: '',
            searchColumn: 'CreateDate',
            startDate:new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
        },
        paging1: {
          page: 1,
          pageSize: 20,
          totalPages: 0,
          totalRecords: 0,
          orderBy: 'CreateDate',
          ascending: true
        },
        search2: {
            id: '',
            parentMenuId: null,
            menuId: null,
            originName: '',
            searchColumn: 'CreateDate',
            startDate:new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
        },
        paging2: {
          page: 1,
          pageSize: 20,
          totalPages: 0,
          totalRecords: 0,
          orderBy: 'CreateDate',
          ascending: true
        },
        search3: {
            id: '',
            parentMenuId: null,
            menuId: null,
            originName: '',
            searchColumn: 'CreateDate',
            startDate:new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
        },
        paging3: {
          page: 1,
          pageSize: 20,
          totalPages: 0,
          totalRecords: 0,
          orderBy: 'CreateDate',
          ascending: true
        },
        search4: {
            id: '',
            parentMenuId: null,
            menuId: null,
            originName: '',
            searchColumn: 'CreateDate',
            startDate:new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
        },
        paging4: {
          page: 1,
          pageSize: 20,
          totalPages: 0,
          totalRecords: 0,
          orderBy: 'CreateDate',
          ascending: true
        },
        pModel: '',
        wait: [],
        great: [],
        greatList:  null,
        goodList:  null,
        badList: null,
        waitList: null,
        good: [],
        bad: [],
        results1: '',
        results2: '',
        results3: '',
        results4: '',
        value1:'',
        videoMenu: '',
        value2:'',
        list: '',
        greatShow: false,
        goodShow: false,
        badShow: false,
        mediaMenu: '',
        waitShow:false,
        renderFunc(h, option) {
          return <table style="width: 630px;">
          <colgroup>
            <col width="50" />
            <col width="100" />
            <col width="100" />
            <col width="300" />
            <col width="" />
          </colgroup>
          <thead>
            <tr>
              <td>{ option.label }</td>
              <td>{ option.arrParent }</td>
              <td>{ option.arrMenu }</td>
              <td>{ option.arrName }</td>
              <td>{ option.arrCreate }</td>
            </tr>
          </thead>
          </table>;
        },
        renderFunc1(h, option) {
          return <table style="width: 630px;">
          <colgroup>
            <col width="50" />
            <col width="100" />
            <col width="100" />
            <col width="300" />
            <col width="" />
          </colgroup>
          <thead>
            <tr>
              <td>{ option.label }</td>
              <td>{ option.arrParent }</td>
              <td>{ option.arrMenu }</td>
              <td>{ option.arrName }</td>
              <td>{ option.arrCreate }</td>
            </tr>
          </thead>
          </table>;
        },
        renderFunc2(h, option) {
          return <table style="width: 630px;">
          <colgroup>
           <col width="50" />
            <col width="100" />
            <col width="100" />
            <col width="300" />
            <col width="" />
          </colgroup>
          <thead>
            <tr>
              <td>{ option.label }</td>
              <td>{ option.arrParent }</td>
              <td>{ option.arrMenu }</td>
              <td>{ option.arrName }</td>
              <td>{ option.arrCreate }</td>
            </tr>
          </thead>
          </table>;
        },
        renderFunc3(h, option) {
          return <table style="width: 630px;">
          <colgroup>
            <col width="50" />
            <col width="100" />
            <col width="100" />
            <col width="300" />
            <col width="" />
          </colgroup>
          <thead>
            <tr>
              <td>{ option.label }</td>
              <td>{ option.arrParent }</td>
              <td>{ option.arrMenu }</td>
              <td>{ option.arrName }</td>
              <td>{ option.arrCreate }</td>
            </tr>
          </thead>
          </table>;
        }
        }
  },
   
    created() {
      this.getMenus();
      this.getMedia();
      this.getMedia1();
      this.getMedia2();
      this.getMedia3()
    },
     methods: {
       
      getMenus() {
          GetVideoMenus()
          .then(response => {
            this.videoMenu= response.result
            this.mediaMenu = response.result
          }).catch(response => {
            console.log(response)
          })
        },
        
        getMedia() {
          var getCheer = { search: this.search1, paging: this.paging1}
          getMedia(getCheer)
          .then(response => {
            this.results1 = response.results
            this.paging1 = response.paging
            if(response.paging.totalRecords > response.paging.pageSize && response.paging.totalRecords !== response.paging.pageSize) {
              this.paging1.pageSize = response.paging.totalRecords
              this.getMedia()
            }
          var data = [];
          this.data1 = data
        // alert(JSON.stringify(this.results))
          for ( var i = 0; i < this.results1.length; i++) {
            
              for(var key in this.results1[i]) {
                
                 var val = this.results1[i][key]
                var key = this.results1[i]
                var arrResult = key.fileId
                var arrName = key.originName
                 } 
                var arrName = key.originName
                var arrParent = key.parentMenuName
                var arrMenu = key.menuName
                var arrCreate = key.createDateString
                
                 data.push(
                   {
                      label: key.fileId.toString(),
                      index: key.fileId
                      // disabled:
                  })  
                this.data1[i].arrName = key.originName
                this.data1[i].arrParent = key.parentMenuName
                this.data1[i].arrCreate = key.createDateString
                this.data1[i].arrMenu = key.menuName
              }
                      for(var w = 0; w <= this.good.length; w++) {
                this.data1.filter(item => {
                    return item.index === this.good[w]
                  }).filter(item => {
                    return item.disabled = true
                  })
               
               } 

              for(var e = 0; e <= this.bad.length; e++) {
                this.data1.filter(item => {
                    return item.index === this.bad[e]
                  }).filter(item => {
                    return item.disabled = true
                  })
               } 

              for(var r = 0; r <= this.wait.length; r++) {
                  this.data1.filter(item => {
                    return item.index === this.wait[r]
                  }).filter(item => {
                    return item.disabled = true
                  })  
               } 

          }).catch(response => {
            console.log(response)
          })
        },
        getMedia1() {
          var getCheer = { search: this.search2, paging: this.paging2}
          getMedia(getCheer)
          .then(response => {
            this.results2 = response.results
            this.paging2 = response.paging
          var data = [];
          this.data2 = data
          if(response.paging.totalRecords > response.paging.pageSize && response.paging.totalRecords !== response.paging.pageSize) {
              this.paging2.pageSize = response.paging.totalRecords
              this.getMedia1()
            }
          for ( var i = 0; i < this.results2.length; i++) {
            
              for(var key in this.results2[i]) {
                
                 var val = this.results2[i][key]
                var key = this.results2[i]
                var arrResult = key.fileId
                var arrName = key.originName
                 } 
                var arrName = key.originName
                var arrParent = key.parentMenuName
                var arrMenu = key.menuName
                var arrCreate = key.createDateString
                
                 data.push(
                   {
                      label: key.fileId.toString(),
                      index: key.fileId,
                      disabled: false
                  })  
                this.data2[i].arrName = key.originName
                this.data2[i].arrParent = key.parentMenuName
                this.data2[i].arrCreate = key.createDateString
                this.data2[i].arrMenu = key.menuName
              }
               for(var q = 0; q <= this.great.length; q++) {
                
                this.data2.filter(item => {
                    return item.index === this.great[q]
                  }).filter(item => {
                    return item.disabled = true
                  })  
                  
               }              

              for(var e = 0; e <= this.bad.length; e++) {
                
                this.data2.filter(item => {
                    return item.index === this.bad[e]
                  }).filter(item => {
                    return item.disabled = true
                  })
                

               } 

              for(var r = 0; r <= this.wait.length; r++) {
               
                this.data2.filter(item => {
                    return item.index === this.wait[r]
                  }).filter(item => {
                    return item.disabled = true
                  })
               
               } 

          }).catch(response => {
            console.log(response)
          })
        },
        getMedia2() {
          var getCheer = { search: this.search3, paging: this.paging3}
          getMedia(getCheer)
          .then(response => {
            this.results3 = response.results
            this.paging3 = response.paging
            if(response.paging.totalRecords > response.paging.pageSize && response.paging.totalRecords !== response.paging.pageSize) {
              this.paging3.pageSize = response.paging.totalRecords
              this.getMedia2()
            }
          var data = [];
          this.data3 = data
          for ( var i = 0; i < this.results3.length; i++) {
            
              for(var key in this.results3[i]) {
                
                 var val = this.results3[i][key]
                var key = this.results3[i]
                var arrResult = key.fileId
                var arrName = key.originName
                 } 
                var arrName = key.originName
                var arrParent = key.parentMenuName
                var arrMenu = key.menuName
                var arrCreate = key.createDateString
                
                 data.push(
                   {
                      label: key.fileId.toString(),
                      index: key.fileId
                      // disabled:
                  })  
                this.data3[i].arrName = key.originName
                this.data3[i].arrParent = key.parentMenuName
                this.data3[i].arrCreate = key.createDateString
                this.data3[i].arrMenu = key.menuName
              }
               for(var q = 0; q <= this.great.length; q++) {
                
                this.data3.filter(item => {
                    return item.index === this.great[q]
                  }).filter(item => {
                    return item.disabled = true
                  })
                
               }              
              for(var w = 0; w <= this.good.length; w++) {
               
                this.data3.filter(item => {
                    return item.index === this.good[w]
                  }).filter(item => {
                    return item.disabled = true
                  })
                 

               } 

              
              for(var r = 0; r <= this.wait.length; r++) {
                
                this.data3.filter(item => {
                    return item.index === this.wait[r]
                  }).filter(item => {
                    return item.disabled = true
                  })
                
                  
               } 

          }).catch(response => {
            console.log(response)
          })
        },
        getMedia3() {
          var getCheer = { search: this.search4, paging: this.paging4}
          getMedia(getCheer)
          .then(response => {
            this.results4 = response.results
            this.paging4 = response.paging
            if(response.paging.totalRecords > response.paging.pageSize && response.paging.totalRecords !== response.paging.pageSize) {
              this.paging4.pageSize = response.paging.totalRecords
              this.getMedia3()
            }
          var data = [];
          this.data4 = data
          for ( var i = 0; i < this.results4.length; i++) {
            
              for(var key in this.results4[i]) {
                
                 var val = this.results4[i][key]
                var key = this.results4[i]
                var arrResult = key.fileId
                var arrName = key.originName
                 } 
                var arrName = key.originName
                var arrParent = key.parentMenuName
                var arrMenu = key.menuName
                var arrCreate = key.createDateString
                
                 data.push(
                   {
                      label: key.fileId.toString(),
                      index: key.fileId,
                      disabled: false
                  })  
                this.data4[i].arrName = key.originName
                this.data4[i].arrParent = key.parentMenuName
                this.data4[i].arrCreate = key.createDateString
                this.data4[i].arrMenu = key.menuName
              }
              for(var q = 0; q <= this.great.length; q++) {
                 
                  this.data4.filter(item => {
                    return item.index === this.great[q]
                  }).filter(item => {
                    return item.disabled = true
                  })  
                  
               }              
              console.log(this.data2)
              for(var w = 0; w <= this.good.length; w++) {
                
                  this.data4.filter(item => {
                    return item.index === this.good[w]
                  }).filter(item => {
                    return item.disabled = true
                  })  

               } 

              for(var e = 0; e <= this.bad.length; e++) {
                 
                  this.data4.filter(item => {
                    return item.index === this.bad[e]
                  }).filter(item => {
                    return item.disabled = true
                  })  

               } 

              

          }).catch(response => {
            console.log(response)
          })
        },
        disabled(){
         var great = []
          var good = []
          var bad = []
          var wait = []
          console.log(this.great)
               for(var q = 0; q <= this.great.length; q++) {
                  great.push( this.results1.filter(item => {
                return item.fileId === this.great[q]
                }) )
                
               }              
              console.log(this.data2)
              for(var w = 0; w <= this.good.length; w++) {
                  good.push( this.results2.filter(item => {
                return item.fileId === this.good[w]
                }) )

               

               } 

              for(var e = 0; e <= this.bad.length; e++) {
                  bad.push( this.results3.filter(item => {
                return item.fileId === this.bad[e]
                }) )


               } 

              for(var r = 0; r <= this.wait.length; r++) {
                  wait.push( this.results4.filter(item => {
                return item.fileId === this.wait[r]
                }) )

               
                  
               } 
                 this.greatList = great
                 this.goodList = good
                 this.badList = bad
                 this.waitList = wait
           
      },
     mediaRegist() {
       var data = {photoModelName : this.pModel, wait: this.wait, great: this.great, good: this.good, bad: this.bad}
      if(this.pModel <= 0) {
        this.$notify.error({
            title: 'Error',
            message: '촬영모델을 입력해 주세요.'
          });
      } else if(this.great <= 0) {
          this.$notify.error({
            title: 'Error',
            message: 'Great 영상을 등록해 주세요.'
          });
       } else if(this.good <= 0) {
          this.$notify.error({
            title: 'Error',
            message: 'Good 영상을 등록해 주세요.'
          });
       } else if(this.bad <= 0) {
         this.$notify.error({
            title: 'Error',
            message: 'bad 영상을 등록해 주세요.'
          });
       } else if(this.wait <= 0) {
         this.$notify.error({
            title: 'Error',
            message: 'wait 영상을 등록해 주세요.'
          });
       } else {
       this.$confirm('컨텐츠를 등록하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                this.fullscreenLoading = true
       AddCheering(data)
       .then(response =>{
          this.fullscreenLoading = false
            if(response === undefined) {
                this.$message({
                    message: '컨텐츠를 등록할 수 없습니다.',
                    type: 'warning'
                    });
            } else {
                this.$message({
                message: '등록이 완료 되었습니다.',
                type: 'success'});
                this.$router.push({ path: '/exercise/cheeruplist' })
                        }
             })
            })
             .catch(() => {
                this.fullscreenLoading = false
            this.$message.info('취소 되었습니다.'); 
            });
       }
     }, 
     add(){
       this.greatShow = false
       this.badShow = false
       this.goodShow = false
       this.waitShow = false                
       },
      
       isShow(){
          // alert(this.paging1.totalRecords)
       },
       
       greatDelete(val){
        //  alert(val)
          this.greatList.splice(this.greatList.findIndex(item => {
            for(var key in this.greatList) {
              return item[key].fileId === val
            }
          }), 1) 
         
          this.great.splice(this.great.findIndex(item => {
            return item === val
          }), 1
          )
          this.getMedia()
          this.getMedia1()
          this.getMedia2()
          this.getMedia3()
       },
       goodDelete(val) {
         this.goodList.splice(this.goodList.findIndex(item => {
            for(var key in this.goodList) {
              return item[key].fileId === val
            }
          }), 1) 
          this.good.splice(this.good.findIndex(item => {
            return item === val
          }), 1
          )
          this.getMedia()
          this.getMedia1()
          this.getMedia2()
          this.getMedia3()
       },
       badDelete(val){
          this.badList.splice(this.badList.findIndex(item => {
            for(var key in this.badList) {
              return item[key].fileId === val
            }
          }), 1) 
         this.bad.splice(this.bad.findIndex(item => {
            return item === val
          }), 1
          )
          this.getMedia()
          this.getMedia1()
          this.getMedia2()
          this.getMedia3()
       },
       waitDelete(val){
         this.waitList.splice(this.waitList.findIndex(item => {
            for(var key in this.waitList) {
              return item[key].fileId === val
            }
          }), 1) 
          this.wait.splice(this.wait.findIndex(item => {
            return item === val
          }), 1
          )
          this.getMedia()
          this.getMedia1()
          this.getMedia2()
          this.getMedia3()
       },
      addTodo: function(){
      var text = this.postList.trim()
      if (text){
          var i =
        this.todos.push({text: text, done: false});
        this.postList = '';
      }
    },
    removeTodo: function (index){
      this.todos.splice(index, 1)
    },
    childDefault1(){
          this.search.menuId = null
        },
    toggleC: function(todo){
      todo.done = !todo.done
    }},
    computed: {
    ...mapGetters([
            'name'
        ])
    }
  }


</script>
<style scoped>
table.transMenu {width: 670px;}
table.transMenuB {width: 670px;}
.warmWrap {margin: 0 50px;}
h1 {
    margin: 35px 0 25px;
    text-indent: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid #cdcdcd;
}
h2 {
    float: left;
    font-size: 15px;;



    margin: 0;
    min-width: 160px;
    line-height: 35px;
    }
h4 {
    border-bottom: 1px solid black;
    padding-bottom: 8px;
    text-indent: 20px;
    font-size: 15px;
}
.el-upload__tip {float: right; margin-left: 30px; margin-top: 0;}
.el-upload-list {float: left;}
.el-form-item__content {float: left}
.warm_con {overflow:hidden; margin-bottom: 20px;}
.warm_con_last {    border-top: 1px dotted black;
    padding-top: 25px;}
.btnWrap {text-align: center; margin: 50px 0;}
.deactiBtn {font-weight: bold; margin-left: 50px; font-size: 14px}
.video_wrap {overflow: hidden;}
.video_child {width: 45%; overflow: hidden; float: left;}
.upload_title li {list-style: none;}
.el-transfer-panel {width: 100%;}
.search_first {float: left;}
.input_tag {width: 50%; float: left;}
.input_wrap {width: 35%;}
.el-table td, .el-table th.is-leaf {padding: 0}

</style>
<style>
.everWrap {overflow: hidden;}
.delete_BTN{margin: 10px 8px;}
.el-table th.tableResStyle{width: 375px;
    background-color: #f6f6f6;
    text-align: center;
    border-right: 1px solid #fff;}
.el-table th.tableDelStyle {background-color: #f6f6f6;
    text-align: center;}
.btn_margin {display: inline-block;}
.has-name {width: 45%; float: left; overflow: hidden; border: 1px solid #ececec; margin: 10px; padding: 10px 20px;}
.has-name h2 {    display: inline-block;
    min-width: 87px;
    padding-bottom: 10px;}
.el-transfer-panel {width: 100%;}
.el-transfer__buttons button {float: left;}
.el-transfer-panel__list, .el-transfer-panel__body {height: 160px;}
.el-icon-arrow-left:before {
    content: "\25B2";}
.el-icon-arrow-right:before {
    content: "\25BC";
}
.el-form-item__label {font-weight: bold;}
.el-transfer-panel__item.el-checkbox .el-checkbox__label {padding-right: 45px; padding-left: 31px;}
.tresnfer_style td {border: 1px solid black;}
.el-transfer-panel__item {height: 39px; line-height: 39px;}
</style>