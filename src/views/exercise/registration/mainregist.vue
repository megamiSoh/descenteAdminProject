<template>
<div class="warmWrap" id="vList">
  <h1>신규 등록</h1>
  <el-form>
<div class="first_wrap">
<table class="el-table mainTable" cellspacing="0" cellpadding="0" >
  <tr class="el-table-column">
  <th rowspan="4" class="title_style" >기본 정보</th>
    <th style="width: 150px;">운동 분류</th>
    <td style="width: 350px">
      <el-select v-model="exerSelect" size="small">
        <el-option v-for="lists in exerKind" :value ="lists.id" :label="lists.name" :key="lists.id">
        </el-option>
      </el-select>
    </td>
    <th style="width: 150px;">운동 강도</th>
    <td>
      <el-select v-model="intensSelect" size="small">
        <el-option v-for="lists in intens" :value="lists.key" :label="lists.name" :key="lists.key">
        </el-option>
      </el-select>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>촬영 모델</th>
    <td>
      <el-select v-model="mSelect" size="small">
        <el-option v-for="lists in model" :label="lists.name" :key="lists.id" :value="lists.id">
        </el-option>
      </el-select>
    </td>
    <th>운동 명칭</th>
    <td>
      <el-input :max-length="30" v-model="exerInput" size="small"></el-input>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>운동 효과</th>
    <td>
      <el-input :max-length="20" v-model="effectInput" size="small"></el-input>
    </td>
    <th>운동 단위</th>
    <td>
      <el-radio v-model="radio" :label="1" >{{unit}}</el-radio>
      <el-radio v-model="radio" :label="2">
      {{unit1}}
      </el-radio>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>주동근 부위 / 세부</th>
    <td>
    <el-form :inline="true" size="small">
    <el-select v-model="muscleAreaCateId"  @change="whatDis()" style="width: 150px" size="small">
      <el-option label="전체" :value="null" placeholder="전체">
      </el-option>
      <el-option :label="muscle.name" :key="muscle.id"  v-for="muscle in muscleResults" :value="muscle.id" >  
      </el-option>
    </el-select>
    <el-select size="small" v-model="muscleAreaCateDepth"  :disabled="muscleAreaCateId === null ||muscleAreaCateId < 0 ? true: false" placeholder="선택해 주세요." style="width: 150px">
      <span v-for="muscle1 in muscleResults" v-if="muscleAreaCateId === muscle1.id">
        <el-option v-for="muscle2 in muscle1.childens" :key="muscle2.id" :label="muscle2.name" :value="muscle2.id">
        </el-option>
      </span>
  </el-select>
    </el-form>
          
    </td>
    <th>운동 설명
    </th>
    <td>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="Please input"
        v-model="textarea">
      </el-input>
    </td>
  </tr>
  <tr>
    <th rowspan="3" class="title_style">이미지</th>
    <th class="separate">썸네일 이미지</th>
    <td colspan="3" class="separate">
       <label class="file-label">
        <span class="el-button fileBtn" type="primary" plane size="small">이미지 추가</span>
        <input class="file-input" type="file" id="file" accept="image/*" @change="change()" style="display: none;" > 
      </label>
        <span class="file-name">
          {{todos1}}
        </span>
    </td>
  </tr>
  <tr>
    <th>중간 이미지</th>
    <td colspan="3">
       <label class="file-label">
        <span class="el-button fileBtn" type="primary" plane size="small">이미지 추가</span>
        <input class="file-input" type="file" id="file1" accept="image/*" @change="change1()" style="display: none;" > 
      </label>
        <span class="file-name">
           {{todos2}}
        </span>
    </td>
  </tr>
  <tr>
    <th>상세 상단 이미지</th>
    <td colspan="3">
       <label class="file-label">
      <span class="el-button fileBtn" type="primary" plane size="small">이미지 추가</span>
      <input class="file-input" type="file" id="file2" accept="image/*" @change="change2()" style="display: none;" > 
    </label>
      <span class="file-name">
         {{todos3}}  
      </span>
    </td>
  </tr>
  <tr>
    <th rowspan="3" class="title_style">
      동영상
    </th>
    <th class="separate">운동소개 동영상</th>
    <td colspan="3" class="separate">
      <el-form>
      
        <el-button @click="introdShow = true; mediaOpen()" size="small">추가</el-button>
    
                <span v-for="lists in data">
                  {{ lists.originName }}
                </span>
          
        </el-form>
    </td>
  </tr>
  <tr>
    <th>운동설명 동영상</th>
    <td colspan="3">
       <el-form>
        <el-button @click="descShow = true; mediaOpen()" size="small">추가</el-button>
                <span v-for="lists in data1">
                  {{ lists.originName }}
                </span>
        </el-form>
    </td>
  </tr>
  <tr>
    <th>운동 좌우 유무</th>
    <td colspan="3">
      <el-radio v-model="radio1" :label="1">단일</el-radio>
      <el-radio v-model="radio1" :label="2">좌우</el-radio>
      <el-checkbox v-model="checked">족부압 유무</el-checkbox>
    </td>
  </tr>
  <tr>
    <th colspan="5" style="text-align: center;" class="title_style">운동동작 동영상</th>
  </tr>
  <tr>
    <td v-if="single()" colspan="5">
      <table style="width: 100%;">
        <tr>
          <th style=" width: 300px">Full화면 버전</th>
          <td>
            <el-form>
                  <el-button @click="mediaOpen(); singleFull = true" size="small">추가</el-button>
                    <span v-for="lists in data4" class="file-name">
                      {{ lists.originName }}
                    </span>
              </el-form>
          </td>
        </tr>
        <tr v-if="checked">
          <th>Half화면 버전</th>
          <td>
            <el-form>
              
                <el-button @click="singleHalf = true; mediaOpen()" size="small">추가</el-button>
            
                        <span v-for="lists in data2" class="file-name">
                           {{ lists.originName }}
                        </span>
                  </el-form>
          </td>
        </tr>
      </table>
    </td>
    <td colspan="5" v-if="rightLeft()" style="padding: 0">
      <table style="width: 100%;">
        <tr>
          <td  style="padding: 20px 0;">
            <table style="width: 100%;">
              <tr>
                <th colspan="2" width="50%">좌측 동영상</th>
              </tr>
              <tr>
                <th>Full화면 버전</th>
                <td>
                  <el-form>
                    <el-button @click="leftFull = true; mediaOpen()" size="small">추가</el-button>
                            <span v-for="lists in data5" class="file-name fine-name-long">
                              {{ lists.originName }}
                            </span>
                    </el-form>
                </td>
              </tr>
              <tr v-if="checked">
                <th>Half화면 버전</th>
                <td>
                  <el-form>   
                  <el-button @click="leftHalf = true;  mediaOpen()" size="small">추가</el-button>
                              <span v-for="lists in data6">
                                {{ lists.originName }}
                              </span>
                  </el-form>
                </td>
              </tr>
            </table>
          </td>
          <td style="padding: 20px 0">
            <table style="width: 100%;">
              <tr>
                <th colspan="2" width="50%">우측 동영상</th>
              </tr>
              <tr>
                <th>Full화면 버전</th>
                <td>
                  <el-form>
                      <el-button @click="rightFull = true; mediaOpen()" size="small">추가</el-button>
                              <span v-for="lists in data7" class="file-name fine-name-long">
                                {{ lists.originName }}
                              </span>
                  </el-form>
                </td>
              </tr>
              <tr v-if="checked">
                <th>Half화면 버전</th>
                <td>
                  <el-form>
                    
                      <el-button @click="rightHalf = true; mediaOpen()" size="small">추가</el-button>
                              <span v-for="lists in data8" class="file-name fine-name-long">
                                {{ lists.originName }}
                              </span>
                  </el-form>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr v-if="checked">
    <td>
      
        <el-button @click="footData = true" size="small" class="footBtn">족부압 데이터</el-button>

    </td>
  </tr>
</table>

</div>

<el-dialog
        :visible.sync="footData"
        width="80%"
        center class="mediaPopOver">
        <h3>
           족부압 데이터
        </h3>
               <table class="el-table">
  <tr v-if="rightLeft()">
    <th style="padding: 15px;">좌측 데이터</th>
      <td colspan="5"  class="listTable">
        <div @paste="onPaste1">
          <v-table 
            :width="1021.6"
            :columns="columns"
            :table-data="tableData2"
            :show-vertical-border="true"
            v-model="tableData2"
          >
          </v-table>
        </div>
      </td>
  </tr>
  <tr v-if="rightLeft()">
    <th style="padding: 15px;">우측 데이터</th>
      <td colspan="5"  class="listTable">
        <div @paste="onPaste">
          <v-table 
            :width="1021.6"
            :columns="columns"
            :table-data="tableData1"
            :show-vertical-border="true"
            v-model="tableData1"
          >
          </v-table>
        </div>
      </td>
  </tr>
  <tr v-if="single()">
    <th style="padding: 15px;">단일</th>
      <td colspan="5" class="listTable">
        <div @paste="onPaste">
          <v-table 
            :width="1021.6"
            :columns="columns"
            :table-data="tableData1"
            :show-vertical-border="true"
            v-model="tableData1"
          >
          </v-table>
        </div>
      </td>
  </tr>
</table>
        <span class="popbtnWrap">
            <el-button @click="footData = false" type="info" size="small">닫기</el-button>
        </span>
        </el-dialog>
<el-dialog
        :visible.sync="introdShow"
        center>
        <!--popoverlayout start-->
        <div class="mediaPopOver">
          <h3>영상 찾아보기</h3>
            <el-form class="searchBoxStyle">
              <el-form :inline="true" size="mini">
                  <el-form-item label="검색기간 - 등록일" class="search_first">
                  </el-form-item>
                    <el-form-item>
                      <el-date-picker type="date" style="width: 100%; margin-right: 10px;" :clearable="false" v-model="search.startDate"></el-date-picker> 
                    </el-form-item>
                    <el-form-item>
                      <el-date-picker type="date"  style="width: 100%;" :clearable="false" v-model="search.endDate"></el-date-picker>
                  </el-form-item>
            </el-form>
            <el-form :inline="true" size="mini">
              <!--datepicker end-->
              <el-form-item label="메뉴 1/2 depth" >
                  <el-select v-model="search.parentMenuId" @change="childDefault1()">
                      <el-option label="전체" :value="null"></el-option>
                      <el-option v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="search.menuId" placeholder="선택해 주세요." :disabled="search.parentMenuId === null || search.parentMenuId <= 0 ? true: false">
                      <span v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id" v-if="search.parentMenuId === item.id">
                      <el-option v-for="child in item.children" :label="child.name" :value="child.id" :key="child.id" >
                      </el-option>
                      </span>
                  </el-select>
              </el-form-item>
              <el-form-item class="member_btn_wrap">
                      <el-col class="member_btn">
                        <el-button type="info" icon="el-icon-search" @click="getMedia(); pageReset()" size="mini">검색</el-button>
                      </el-col>
              </el-form-item>
            </el-form>
            <el-form :inline="true" size="mini">
                  <el-form-item label="파일명">
                        <el-input :maxlength="30" v-model="search.originName">
                        </el-input>
                  </el-form-item>
                  <el-form-item label="Code" label-width="60px">
                        <el-input  v-model="search.id" type="number">
                        </el-input>
                  </el-form-item>
                  <el-form-item class="member_btn_wrap">
                      <el-col class="member_btn">
                        <el-button type="warning" @click="mediaReset()" size="mini">검색조건 초기화</el-button>
                      </el-col>
                  </el-form-item>
              </el-form>
              
            </el-form>
            <div v-loading="loading">
              <table class="el-table" stripe>
                <thead class="el-table-column listTableHead">
                  <tr>
                    <th>No</th>
                    <th>Code</th>
                    <th>메뉴 1depth</th>
                    <th>메뉴 2depth</th>
                    <th>파일명</th>
                    <th>등록일</th>
                    <th>선택</th>
                  </tr>
                </thead>
                <tbody class="el-table-column listTable">
                  <tr v-for="(lists, key) in results" :key="lists.id" @click="add(lists.fileId)">
                    <td>{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
                    <td>0000{{ lists.fileId }}</td>
                    <td>{{ lists.parentMenuName }}</td>
                    <td>{{ lists.menuName }}</td>
                    <td>{{ lists.originName }}</td>
                    <td>{{ lists.createDateString }}</td>
                    <td><el-button type="primary" plain size="small">선택</el-button></td>
                  </tr>
                  <tr v-show="mediaResultsShow">
                    <td  colspan="7" style="padding: 40px; text-align: center;">검색결과가 없습니다.</td>
                  </tr>
                </tbody>
              </table>
                <nav class="text-sm-center">
                <ul class="pagination" id="searchPager" v-show="!mediaResultsShow">
                    <li class="page-item page-arrow">
                        <a class="page-link" @click="prevPage()">
                            &lt;
                        </a>
                    </li>

                    <li v-for="pageobj in paging.totalPages" class="page-item page-num" v-bind:class="{active:pageobj==paging.page}" v-if="checkPage(pageobj)">
                        <a class="page-link" @click="movePage(pageobj)">
                            {{pageobj}}
                        </a>
                    </li>

                    <li class="page-item page-arrow">
                        <a class="page-link" @click="nextPage()">
                            &gt;
                        </a>
                    </li>
                </ul>
              </nav>
            </div>
        </div>
        <span class="popbtnWrap">
            <el-button @click="introdShow = false" type="info" size="small">닫기</el-button>
        </span>
        </el-dialog>
<el-dialog
        :visible.sync="descShow"
        center>
        <!--popoverlayout start-->
        <div class="mediaPopOver">
          <h3>영상 찾아보기</h3>
           <el-form class="searchBoxStyle">
             <el-form :inline="true" size="mini">
                  <el-form-item label="검색기간 - 등록일" class="search_first"></el-form-item>
                    <el-form-item>
                      <el-date-picker type="date" style="width: 100%; margin-right: 10px;" :clearable="false" v-model="search.startDate"></el-date-picker> 
                    </el-form-item>
                    <el-form-item>
                      <el-date-picker type="date"  style="width: 100%;" :clearable="false" v-model="search.endDate"></el-date-picker>
                  </el-form-item>
            </el-form>
            <el-form :inline="true" size="mini">
              <!--datepicker end-->
              <el-form-item label="메뉴 1/2 depth">
                  <el-select v-model="search.parentMenuId" @change="childDefault1()">
                      <el-option label="전체" :value="null"></el-option>
                      <el-option v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="search.menuId" placeholder="선택해 주세요." :disabled="search.parentMenuId === null || search.parentMenuId <= 0 ? true: false">
                      <span v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id" v-if="search.parentMenuId === item.id">
                      <el-option v-for="child in item.children" :label="child.name" :value="child.id" :key="child.id" >
                      </el-option>
                      </span>
                  </el-select>
              </el-form-item>
              <el-form-item class="member_btn_wrap">
                      <el-col class="member_btn">
                        <el-button type="info" icon="el-icon-search" @click="getMedia(); pageReset()" size="mini">검색</el-button>
                      </el-col>
                  </el-form-item>
            </el-form>
            <el-form :inline="true" size="mini">
                  <el-form-item label="파일명">
                        <el-input :maxlength="30" v-model="search.originName">
                        </el-input>
                  </el-form-item>
                  <el-form-item label="Code" label-width="60px">
                        <el-input  v-model="search.id" type="number">
                        </el-input>
                  </el-form-item>
                  <el-form-item class="member_btn_wrap">
                      <el-col class="member_btn">
                      <el-button type="warning" @click="mediaReset()" size="mini">검색조건 초기화</el-button>
                      </el-col>
                  </el-form-item>
              </el-form>
           </el-form>
            <div v-loading="loading">
              <table class="el-table" stripe>
                <thead class="el-table-column listTableHead">
                  <tr>
                    <th>No</th>
                    <th>Code</th>
                    <th>메뉴 1depth</th>
                    <th>메뉴 2depth</th>
                    <th>파일명</th>
                    <th>등록일</th>
                    <th>선택</th>
                  </tr>
                </thead>
                <tbody class="el-table-column listTable">
                  <tr v-for="(lists, key) in results" :key="lists.id" @click="add1(lists.fileId)">
                    <td>{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
                    <td>0000{{ lists.fileId }}</td>
                    <td>{{ lists.parentMenuName }}</td>
                    <td>{{ lists.menuName }}</td>
                    <td>{{ lists.originName }}</td>
                    <td>{{ lists.createDateString }}</td>
                    <td><el-button type="primary" plain size="small">선택</el-button></td>
                  </tr>
                  <tr v-show="mediaResultsShow">
                    <td  colspan="7" style="padding: 40px; text-align: center;">검색결과가 없습니다.</td>
                  </tr>
                </tbody>
              </table>
              <nav class="text-sm-center" v-show="!mediaResultsShow">
                <ul class="pagination" id="searchPager">
                    <li class="page-item page-arrow">
                        <a class="page-link" @click="prevPage()">
                            &lt;
                        </a>
                    </li>

                    <li v-for="pageobj in paging.totalPages" class="page-item page-num" v-bind:class="{active:pageobj==paging.page}" v-if="checkPage(pageobj)">
                        <a class="page-link" @click="movePage(pageobj)">
                            {{pageobj}}
                        </a>
                    </li>

                    <li class="page-item page-arrow">
                        <a class="page-link" @click="nextPage()">
                            &gt;
                        </a>
                    </li>
                </ul>
              </nav>
            </div>
        </div>
        <span class="popbtnWrap">
            <el-button @click="descShow = false" size="small"  type="info">닫기</el-button>
        </span>
        </el-dialog>
<el-dialog
                  :visible.sync="singleFull"
              
                  center>
                  <!--popoverlayout start-->
                <div class="mediaPopOver">
          <h3>영상 찾아보기</h3>
            <el-form class="searchBoxStyle">
              <el-form :inline="true" size="mini">
                  <el-form-item label="검색기간 - 등록일" class="search_first"></el-form-item>
                    <el-form-item>
                      <el-date-picker type="date" style="width: 100%; margin-right: 10px;" :clearable="false" v-model="search.startDate"></el-date-picker> 
                    </el-form-item>
                    <el-form-item>
                      <el-date-picker type="date"  style="width: 100%;" :clearable="false" v-model="search.endDate"></el-date-picker>
                  </el-form-item>
                
            </el-form>
            <el-form :inline="true" size="mini">
              <!--datepicker end-->
              <el-form-item label="메뉴 1/2 depth">
                  <el-select v-model="search.parentMenuId" @change="childDefault1()">
                      <el-option label="전체" :value="null"></el-option>
                      <el-option v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="search.menuId" placeholder="선택해 주세요." :disabled="search.parentMenuId === null || search.parentMenuId <= 0 ? true: false">
                      <span v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id" v-if="search.parentMenuId === item.id">
                      <el-option v-for="child in item.children" :label="child.name" :value="child.id" :key="child.id" >
                      </el-option>
                      </span>
                  </el-select>
              </el-form-item>
              <el-form-item class="member_btn_wrap"> 
                      <el-col class="member_btn">
                        <el-button type="info" icon="el-icon-search" @click="getMedia(); pageReset()" size="mini">검색</el-button>
                      </el-col>
                  </el-form-item>
            </el-form>
            <el-form :inline="true" size="mini">
                  <el-form-item label="파일명">
                        <el-input :maxlength="30" v-model="search.originName">
                        </el-input>
                  </el-form-item>
                  <el-form-item label="Code" label-width="60px">
                        <el-input  v-model="search.id" type="number">
                        </el-input>
                  </el-form-item>
                  <el-form-item class="member_btn_wrap"> 
                      <el-col class="member_btn">
                      <el-button type="warning" @click="mediaReset()" size="mini">검색조건 초기화</el-button>
                      </el-col>
                  </el-form-item>
              </el-form>
            </el-form>
                    <div v-loading="loading">
                      <table class="el-table" stripe>
                        <thead class="el-table-column listTableHead">
                          <tr>
                            <th>No</th>
                            <th>Code</th>
                            <th>메뉴 1depth</th>
                            <th>메뉴 2depth</th>
                            <th>파일명</th>
                            <th>등록일</th>
                            <th>선택</th>
                          </tr>
                        </thead>
                        <tbody class="el-table-column listTable">
                          <tr v-for="(lists, key) in results" :key="lists.id" @click="add4(lists.fileId)">
                            <td>{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
                            <td>0000{{ lists.fileId }}</td>
                            <td>{{ lists.parentMenuName }}</td>
                            <td>{{ lists.menuName }}</td>
                            <td>{{ lists.originName }}</td>
                            <td>{{ lists.createDateString }}</td>
                            <td><el-button type="primary" plain size="small">선택</el-button></td>
                          </tr>
                          <tr v-show="mediaResultsShow">
                            <td  colspan="7" style="padding: 40px; text-align: center;">검색결과가 없습니다.</td>
                          </tr>
                        </tbody>
                      </table>
                      <nav class="text-sm-center" v-show="!mediaResultsShow">
                      <ul class="pagination" id="searchPager">
                          <li class="page-item page-arrow">
                              <a class="page-link" @click="prevPage()">
                                  &lt;
                              </a>
                          </li>

                          <li v-for="pageobj in paging.totalPages" class="page-item page-num" v-bind:class="{active:pageobj==paging.page}" v-if="checkPage(pageobj)">
                              <a class="page-link" @click="movePage(pageobj)">
                                  {{pageobj}}
                              </a>
                          </li>

                          <li class="page-item page-arrow">
                              <a class="page-link" @click="nextPage()">
                                  &gt;
                              </a>
                          </li>
                      </ul>
                    </nav>
                    </div>
                </div>
                  <span class="popbtnWrap">
                      <el-button @click="singleFull = false" size="small"  type="info">닫기</el-button>
                  </span>
                  </el-dialog>
<el-dialog
                :visible.sync="singleHalf"
            
                center>
                <!--popoverlayout start-->
                <div class="mediaPopOver">
          <h3>영상 찾아보기</h3>
            <el-form class="searchBoxStyle">
              <el-form :inline="true" size="mini">
                  <el-form-item label="검색기간 - 등록일" class="search_first"> </el-form-item>
                    <el-form-item>
                      <el-date-picker type="date" style="width: 100%; margin-right: 10px;" :clearable="false" v-model="search.startDate"></el-date-picker> 
                    </el-form-item>
                    <el-form-item>
                      <el-date-picker type="date"  style="width: 100%;" :clearable="false" v-model="search.endDate"></el-date-picker>
                  </el-form-item>
            </el-form>
            <el-form :inline="true" size="mini">
              <!--datepicker end-->
              <el-form-item label="메뉴 1/2 depth">
                  <el-select v-model="search.parentMenuId" @change="childDefault1()">
                      <el-option label="전체" :value="null"></el-option>
                      <el-option v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="search.menuId" placeholder="선택해 주세요." :disabled="search.parentMenuId === null || search.parentMenuId <= 0 ? true: false">
                      <span v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id" v-if="search.parentMenuId === item.id">
                      <el-option v-for="child in item.children" :label="child.name" :value="child.id" :key="child.id" >
                      </el-option>
                      </span>
                  </el-select>
              </el-form-item>
              <el-form-item class="member_btn_wrap">
                      <el-col class="member_btn">
                        <el-button type="info" icon="el-icon-search" @click="getMedia(); pageReset()" size="mini">검색</el-button>
                      </el-col>
                  </el-form-item>
            </el-form>
            <el-form :inline="true" size="mini">
                  <el-form-item label="파일명">
                        <el-input :maxlength="30" v-model="search.originName">
                        </el-input>
                  </el-form-item>
                  <el-form-item label="Code" label-width="60px">
                        <el-input  v-model="search.id" type="number">
                        </el-input>
                  </el-form-item>
                  <el-form-item class="member_btn_wrap">
                      <el-col class="member_btn">
                        <el-button type="warning" @click="mediaReset()" size="mini">검색조건 초기화</el-button>
                      </el-col>
                  </el-form-item>
              </el-form>
            </el-form>
                    <div v-loading="loading">
                      <table class="el-table" stripe>
                        <thead class="el-table-column listTableHead">
                          <tr>
                            <th>No</th>
                            <th>Code</th>
                            <th>메뉴 1depth</th>
                            <th>메뉴 2depth</th>
                            <th>파일명</th>
                            <th>등록일</th>
                            <th>선택</th>
                          </tr>
                        </thead>
                        <tbody class="el-table-column listTable">
                          <tr v-for="(lists, key) in results" :key="lists.id" @click="add2(lists.fileId)">
                            <td>{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
                            <td>0000{{ lists.fileId }}</td>
                            <td>{{ lists.parentMenuName }}</td>
                            <td>{{ lists.menuName }}</td>
                            <td>{{ lists.originName }}</td>
                            <td>{{ lists.createDateString }}</td>
                            <td><el-button type="primary" plain size="small">선택</el-button></td>
                          </tr>
                          <tr v-show="mediaResultsShow">
                            <td  colspan="7" style="padding: 40px; text-align: center;">검색결과가 없습니다.</td>
                          </tr>
                        </tbody>
                      </table>
                      <nav class="text-sm-center"  v-show="!mediaResultsShow">
                      <ul class="pagination" id="searchPager">
                          <li class="page-item page-arrow">
                              <a class="page-link" @click="prevPage()">
                                  &lt;
                              </a>
                          </li>

                          <li v-for="pageobj in paging.totalPages" class="page-item page-num" v-bind:class="{active:pageobj==paging.page}" v-if="checkPage(pageobj)">
                              <a class="page-link" @click="movePage(pageobj)">
                                  {{pageobj}}
                              </a>
                          </li>

                          <li class="page-item page-arrow">
                              <a class="page-link" @click="nextPage()">
                                  &gt;
                              </a>
                          </li>
                      </ul>
                    </nav>
                    </div>
                </div>
                <span class="popbtnWrap">
                    <el-button @click="singleHalf = false" size="small"  type="info">닫기</el-button>
                </span>
                </el-dialog>
<el-dialog
                    :visible.sync="leftFull"
                
                    center>
                    <!--popoverlayout start-->
                    <div class="mediaPopOver">
          <h3>영상 찾아보기</h3>
            <el-form class="searchBoxStyle">
              <el-form :inline="true" size="mini">
                  <el-form-item label="검색기간 - 등록일" class="search_first"></el-form-item>
                    <el-form-item>
                      <el-date-picker type="date" style="width: 100%; margin-right: 10px;" :clearable="false" v-model="search.startDate"></el-date-picker> 
                    </el-form-item>
                    <el-form-item>
                      <el-date-picker type="date"  style="width: 100%;" :clearable="false" v-model="search.endDate"></el-date-picker>
                  </el-form-item>
            </el-form>
            <el-form size="mini" :inline="true">
              <!--datepicker end-->
              <el-form-item label="메뉴 1/2 depth">
                  <el-select v-model="search.parentMenuId" @change="childDefault1()">
                      <el-option label="전체" :value="null"></el-option>
                      <el-option v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="search.menuId" placeholder="선택해 주세요." :disabled="search.parentMenuId === null || search.parentMenuId <= 0 ? true: false">
                      <span v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id" v-if="search.parentMenuId === item.id">
                      <el-option v-for="child in item.children" :label="child.name" :value="child.id" :key="child.id" >
                      </el-option>
                      </span>
                  </el-select>
              </el-form-item>
              <el-form-item class="member_btn_wrap">
                      <el-col class="member_btn">
                        <el-button type="info" icon="el-icon-search" @click="getMedia(); pageReset()" size="mini">검색</el-button>
                      </el-col>
                  </el-form-item>
            </el-form>
            <el-form :inline="true" size="mini">
                  <el-form-item label="파일명">
                        <el-input :maxlength="30" v-model="search.originName">
                        </el-input>
                  </el-form-item>
                  <el-form-item label="Code" label-width="60px">
                        <el-input  v-model="search.id" type="number">
                        </el-input>
                  </el-form-item>
                  <el-form-item class="member_btn_wrap">
                      <el-col class="member_btn">
                        <el-button type="warning" @click="mediaReset()" size="mini">검색조건 초기화</el-button>
                      </el-col>
                  </el-form-item>
              </el-form>
            </el-form>
                        <div v-loading="loading">
                          <table class="el-table" stripe>
                            <thead class="el-table-column listTableHead">
                              <tr>
                                <th>No</th>
                                <th>Code</th>
                                <th>메뉴 1depth</th>
                                <th>메뉴 2depth</th>
                                <th>파일명</th>
                                <th>등록일</th>
                                <th>선택</th>
                              </tr>
                            </thead>
                            <tbody class="el-table-column listTable">
                              <tr v-for="(lists, key) in results" :key="lists.id" @click="add5(lists.fileId)">
                                <td>{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
                                <td>0000{{ lists.fileId }}</td>
                                <td>{{ lists.parentMenuName }}</td>
                                <td>{{ lists.menuName }}</td>
                                <td>{{ lists.originName }}</td>
                                <td>{{ lists.createDateString }}</td>
                                <td><el-button type="primary" plain size="small">선택</el-button></td>
                              </tr>
                              <tr v-show="mediaResultsShow">
                                <td  colspan="7" style="padding: 40px; text-align: center;">검색결과가 없습니다.</td>
                              </tr>
                            </tbody>
                          </table>
                          <nav class="text-sm-center" v-show="!mediaResultsShow">
                          <ul class="pagination" id="searchPager">
                              <li class="page-item page-arrow">
                                  <a class="page-link" @click="prevPage()">
                                      &lt;
                                  </a>
                              </li>

                              <li v-for="pageobj in paging.totalPages" class="page-item page-num" v-bind:class="{active:pageobj==paging.page}" v-if="checkPage(pageobj)">
                                  <a class="page-link" @click="movePage(pageobj)">
                                      {{pageobj}}
                                  </a>
                              </li>

                              <li class="page-item page-arrow">
                                  <a class="page-link" @click="nextPage()">
                                      &gt;
                                  </a>
                              </li>
                          </ul>
                        </nav>
                        </div>
                    </div>
                    <span class="popbtnWrap">
                        <el-button @click="leftFull = false" size="small"  type="info">닫기</el-button>
                    </span>
                    </el-dialog>
<el-dialog
                  :visible.sync="leftHalf"
              
                  center>
                  <!--popoverlayout start-->
                      <div class="mediaPopOver">
                        <h3>영상 찾아보기</h3>
                          <el-form class="searchBoxStyle">
                            <el-form :inline="true" size="mini">
                                <el-form-item label="검색기간 - 등록일" class="search_first">
                                </el-form-item>
                                  <el-form-item>
                                    <el-date-picker type="date" style="width: 100%; margin-right: 10px;" :clearable="false" v-model="search.startDate"></el-date-picker> 
                                  </el-form-item>
                                  <el-form-item>
                                    <el-date-picker type="date"  style="width: 100%;" :clearable="false" v-model="search.endDate"></el-date-picker>
                                </el-form-item>
                          </el-form>
                          <el-form :inline="true" size="mini">
                            <!--datepicker end-->
                            <el-form-item label="메뉴 1/2 depth">
                                <el-select v-model="search.parentMenuId" @change="childDefault1()">
                                    <el-option label="전체" :value="null"></el-option>
                                    <el-option v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id">
                                    </el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item>
                                <el-select v-model="search.menuId" placeholder="선택해 주세요." :disabled="search.parentMenuId === null || search.parentMenuId <= 0 ? true: false"> 
                                    <span v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id" v-if="search.parentMenuId === item.id">
                                    <el-option v-for="child in item.children" :label="child.name" :value="child.id" :key="child.id" >
                                    </el-option>
                                    </span>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="member_btn_wrap">
                                    <el-col class="member_btn">
                                      <el-button type="info" icon="el-icon-search" @click="getMedia(); pageReset()" size="mini">검색</el-button>
                                    </el-col>
                                </el-form-item>
                          </el-form>
                          <el-form :inline="true" size="mini">
                                <el-form-item label="파일명">
                                      <el-input :maxlength="30" v-model="search.originName">
                                      </el-input>
                                </el-form-item>
                                <el-form-item label="Code" label-width="60px">
                                      <el-input  v-model="search.id" type="number">
                                      </el-input>
                                </el-form-item>
                                <el-form-item class="member_btn_wrap">
                                    <el-col class="member_btn">
                                      <el-button type="warning" @click="mediaReset()" size="mini">검색조건 초기화</el-button>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                          </el-form>
                          <div v-loading="loading">
                            <table class="el-table" stripe>
                              <thead class="el-table-column listTableHead">
                                <tr>
                                  <th>No</th>
                                  <th>Code</th>
                                  <th>메뉴 1depth</th>
                                  <th>메뉴 2depth</th>
                                  <th>파일명</th>
                                  <th>등록일</th>
                                  <th>선택</th>
                                </tr>
                              </thead>
                              <tbody class="el-table-column listTable">
                                <tr v-for="(lists, key) in results" :key="lists.id" @click="add6(lists.fileId)">
                                  <td>{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
                                  <td>0000{{ lists.fileId }}</td>
                                  <td>{{ lists.parentMenuName }}</td>
                                  <td>{{ lists.menuName }}</td>
                                  <td>{{ lists.originName }}</td>
                                  <td>{{ lists.createDateString }}</td>
                                  <td><el-button type="primary" plain size="small">선택</el-button></td>
                                </tr>
                                <tr v-show="mediaResultsShow">
                                  <td  colspan="7" style="padding: 40px; text-align: center;">검색결과가 없습니다.</td>
                                </tr>
                              </tbody>
                            </table>
                            <nav class="text-sm-center" v-show="!mediaResultsShow">
                            <ul class="pagination" id="searchPager">
                                <li class="page-item page-arrow">
                                    <a class="page-link" @click="prevPage()">
                                        &lt;
                                    </a>
                                </li>

                                <li v-for="pageobj in paging.totalPages" class="page-item page-num" v-bind:class="{active:pageobj==paging.page}" v-if="checkPage(pageobj)">
                                    <a class="page-link" @click="movePage(pageobj)">
                                        {{pageobj}}
                                    </a>
                                </li>

                                <li class="page-item page-arrow">
                                    <a class="page-link" @click="nextPage()">
                                        &gt;
                                    </a>
                                </li>
                            </ul>
                          </nav>
                          </div>
                      </div>
                  <span class="popbtnWrap">
                      <el-button @click="leftHalf = false;" size="small"  type="info">닫기</el-button>
                  </span>
                  </el-dialog>
<el-dialog
                      :visible.sync="rightFull"
                  
                      center>
                       <!--popoverlayout start-->
                      <div class="mediaPopOver">
                    <h3>영상 찾아보기</h3>
                      <el-form class="searchBoxStyle">
                        <el-form :inline="true" size="mini">
                            <el-form-item label="검색기간 - 등록일" class="search_first">
                            </el-form-item>
                              <el-form-item>
                                <el-date-picker type="date" style="width: 100%; margin-right: 10px;" :clearable="false" v-model="search.startDate"></el-date-picker> 
                              </el-form-item>
                              <el-form-item>
                                <el-date-picker type="date"  style="width: 100%;" :clearable="false" v-model="search.endDate"></el-date-picker>
                            </el-form-item>
                      </el-form>
                      <el-form size="mini" :inline="true">
                        <!--datepicker end-->
                        <el-form-item label="메뉴 1/2 depth">
                            <el-select v-model="search.parentMenuId" @change="childDefault1()">
                                <el-option label="전체" :value="null"></el-option>
                                <el-option v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="search.menuId" placeholder="선택해 주세요." :disabled="search.parentMenuId === null || search.parentMenuId <= 0 ? true: false">
                                <span v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id" v-if="search.parentMenuId === item.id">
                                <el-option v-for="child in item.children" :label="child.name" :value="child.id" :key="child.id" >
                                </el-option>
                                </span>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="member_btn_wrap">
                                <el-col class="member_btn">
                                  <el-button type="info" icon="el-icon-search" @click="getMedia(); pageReset()" size="mini">검색</el-button>
                                </el-col>
                            </el-form-item>
                      </el-form>
                      <el-form :inline="true" size="mini">
                            <el-form-item label="파일명" >
                                  <el-input :maxlength="30" v-model="search.originName">
                                  </el-input>
                            </el-form-item>
                            <el-form-item label="Code" label-width="60px">
                                  <el-input  v-model="search.id" type="number">
                                  </el-input>
                            </el-form-item>
                            <el-form-item class="member_btn_wrap">
                                <el-col class="member_btn">
                                  <el-button type="warning" @click="mediaReset()" size="mini">검색조건 초기화</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>
                      </el-form>
                          <div v-loading="loading">
                            <table class="el-table" stripe>
                              <thead class="el-table-column listTableHead">
                                <tr>
                                  <th>No</th>
                                  <th>Code</th>
                                  <th>메뉴 1depth</th>
                                  <th>메뉴 2depth</th>
                                  <th>파일명</th>
                                  <th>등록일</th>
                                  <th>선택</th>
                                </tr>
                              </thead>
                              <tbody class="el-table-column listTable">
                                <tr v-for="(lists, key) in results" :key="lists.id" @click="add7(lists.fileId)">
                                  <td>{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
                                  <td>0000{{ lists.fileId }}</td>
                                  <td>{{ lists.parentMenuName }}</td>
                                  <td>{{ lists.menuName }}</td>
                                  <td>{{ lists.originName }}</td>
                                  <td>{{ lists.createDateString }}</td>
                                  <td><el-button type="primary" plain size="small">선택</el-button></td>
                                </tr>
                                <tr v-show="mediaResultsShow">
                                  <td  colspan="7" style="padding: 40px; text-align: center;">검색결과가 없습니다.</td>
                                </tr>
                              </tbody>
                            </table>
                            <nav class="text-sm-center" v-show="!mediaResultsShow">
                            <ul class="pagination" id="searchPager">
                                <li class="page-item page-arrow">
                                    <a class="page-link" @click="prevPage()">
                                        &lt;
                                    </a>
                                </li>

                                <li v-for="pageobj in paging.totalPages" class="page-item page-num" v-bind:class="{active:pageobj==paging.page}" v-if="checkPage(pageobj)">
                                    <a class="page-link" @click="movePage(pageobj)">
                                        {{pageobj}}
                                    </a>
                                </li>

                                <li class="page-item page-arrow">
                                    <a class="page-link" @click="nextPage()">
                                        &gt;
                                    </a>
                                </li>
                            </ul>
                          </nav>
                          </div>
                      </div>
                      <span class="popbtnWrap">
                          <el-button @click="rightFull = false" size="small"  type="info">닫기</el-button>
                      </span>
                      </el-dialog>
<el-dialog
                      :visible.sync="rightHalf"
                  
                      center>
                      <!--popoverlayout start-->
                      <div class="mediaPopOver">
                      <h3>영상 찾아보기</h3>
                        <el-form class="searchBoxStyle">
                          <el-form :inline="true" size="mini">
                              <el-form-item label="검색기간 - 등록일" class="search_first">
                              </el-form-item>
                                <el-form-item>
                                  <el-date-picker type="date" style="width: 100%; margin-right: 10px;" :clearable="false" v-model="search.startDate"></el-date-picker> 
                                </el-form-item>
                                <el-form-item>
                                  <el-date-picker type="date"  style="width: 100%;" :clearable="false" v-model="search.endDate"></el-date-picker>
                              </el-form-item>
                        </el-form>
                        <el-form size="mini" :inline="true">
                          <!--datepicker end-->
                          <el-form-item label="메뉴 1/2 depth">
                              <el-select v-model="search.parentMenuId" @change="childDefault1()">
                                  <el-option label="전체" :value="null"></el-option>
                                  <el-option v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id">
                                  </el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item>
                              <el-select v-model="search.menuId" :disabled="search.parentMenuId === null || search.parentMenuId <= 0 ? true: false" placeholder="선택해 주세요.">
                                  <span v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id" v-if="search.parentMenuId === item.id">
                                  <el-option v-for="child in item.children" :label="child.name" :value="child.id" :key="child.id" >
                                  </el-option>
                                  </span>
                              </el-select>
                          </el-form-item>
                          <el-form-item class="member_btn_wrap">
                                <el-col class="member_btn">
                                  <el-button type="info" icon="el-icon-search" @click="getMedia(); pageReset()" size="mini">검색</el-button>
                                </el-col>
                              </el-form-item>
                        </el-form>
                        <el-form :inline="true" size="mini">
                              <el-form-item label="파일명">
                                    <el-input :maxlength="30" v-model="search.originName">
                                    </el-input>
                              </el-form-item>
                              <el-form-item label="Code" label-width="60px">
                                    <el-input  v-model="search.id" type="number">
                                    </el-input>
                              </el-form-item>
                              <el-form-item class="member_btn_wrap">
                                <el-col class="member_btn">
                                  <el-button type="warning" @click="mediaReset()" size="mini">검색조건 초기화</el-button>
                                </el-col>
                              </el-form-item>
                          </el-form>
                        </el-form>
                          <div v-loading="loading">
                            <table class="el-table" stripe>
                              <thead class="el-table-column listTableHead">
                                <tr>
                                  <th>No</th>
                                  <th>Code</th>
                                  <th>메뉴 1depth</th>
                                  <th>메뉴 2depth</th>
                                  <th>파일명</th>
                                  <th>등록일</th>
                                  <th>선택</th>
                                </tr>
                              </thead>
                              <tbody class="el-table-column listTable">
                                <tr v-for="(lists, key) in results" :key="lists.id" @click="add8(lists.fileId)">
                                  <td>{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
                                  <td>0000{{ lists.fileId }}</td>
                                  <td>{{ lists.parentMenuName }}</td>
                                  <td>{{ lists.menuName }}</td>
                                  <td>{{ lists.originName }}</td>
                                  <td>{{ lists.createDateString }}</td>
                                  <td><el-button type="primary" plain size="small">선택</el-button></td>
                                </tr>
                                <tr v-show="mediaResultsShow">
                                  <td  colspan="7" style="padding: 40px; text-align: center;">검색결과가 없습니다.</td>
                                </tr>
                              </tbody>
                            </table>
                            <nav class="text-sm-center" v-show="!mediaResultsShow">
                              <ul class="pagination" id="searchPager">
                                  <li class="page-item page-arrow">
                                      <a class="page-link" @click="prevPage()">
                                          &lt;
                                      </a>
                                  </li>

                                  <li v-for="pageobj in paging.totalPages" class="page-item page-num" v-bind:class="{active:pageobj==paging.page}" v-if="checkPage(pageobj)">
                                      <a class="page-link" @click="movePage(pageobj)">
                                          {{pageobj}}
                                      </a>
                                  </li>

                                  <li class="page-item page-arrow">
                                      <a class="page-link" @click="nextPage()">
                                          &gt;
                                      </a>
                                  </li>
                              </ul>
                            </nav>
                          </div>
                      </div>
                      <span class="popbtnWrap">
                          <el-button @click="rightHalf = false" type="info" size="small">닫기</el-button>
                      </span>
                      </el-dialog>



  <div class="btnWrap">
    <el-button type="info" size="small" class="submitBtn" @click="mainRegist()">등록</el-button>
    <router-link v-bind:to="{path: '/exercise/mainlist'}"><el-button type="warning" size="small" class="submitBtn">취소</el-button></router-link>
  </div>
  </el-form>
  

</div>
</template>

<script>
import { getExerKind, getIntensity, getModel, getMuscleArea, getEffectCd, getMedia, GetVideoMenus, addMainExer } from '@/api/exercise'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
  export default {
    data() {
      return {
        mediaResultsShow: '',
        sf: '',
        sh: '',
        lf: '',
        lh: '',
        rf: '',
        rh: '',
        intro: '',
        desc: '',
        loading: false,
        resultOrigin: '',
        footData: false,
        rightHalf: false,
        rightFull: false,
        leftHalf: false,
        leftFull: false,
        singleHalf:false,
        singleFull: false,
        descShow: false,
        introdShow: false,
        postFormData: new FormData(),
        exerKind: '',
        exerSelect: '',
        intens: '',
        intensSelect: '',
        model: '',
        mSelect: '',
        exerInput: '',
        effectInput: '',
        muscleAreaCateId: null,
        muscleResults:'',
        muscleAreaCateDepth: '',
        radio: 1,
        effectUnit: '',
        unit: '',
        unit1: '',
        textarea: '',
        todos1:'',
        todos2: '',
        todos3: '',
        todos: '',
        results:'',
        data3:'',
        fullscreenLoading: false,
         search: {
            id: '',
            parentMenuId: null,
            menuId: null,
            searchColumn: 'CreateDate',
            originName: '',
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
        },
        paging: {
          page: 1,
          pageSize: 5,
          totalPages: 0,
          totalRecords: 0,
          orderBy: 'CreateDate',
          ascending: true
        },
        videoCheck: [],
        data: '',
        data1: '',
        data2: '',
        data4: '',
        data5: '',
        data6: '',
        data7: '',
        data8: '',
        radio1: 1,
        checked: '',
        var1:'',
        var2: '',
        var4:'',
        var5:'',
        var6:'',
        var7:'',
      tableData1: [
        {
          Time: '',
          L1p: '',
          L2p: '',
          L3p: '',
          L4p: '',
          R1P: '',
          R2P: '',
          R3P: '',
          R4P: '',
          COGFront: '',
          COGBack: '',
          COGLeft: '',
          COPLeftFront: '',
          COPLeftBack: '',
          COPRgithFront: '',
          COPRgithBack:''
        }
      ],
      tableData2: [
        {
          Time: '',
          L1p: '',
          L2p: '',
          L3p: '',
          L4p: '',
          R1P: '',
          R2P: '',
          R3P: '',
          R4P: '',
          COGFront: '',
          COGBack: '',
          COGLeft: '',
          COPLeftFront: '',
          COPLeftBack: '',
          COPRgithFront: '',
          COPRgithBack:''
        }
      ],
      columns: [
        {
          field: "Time",
          title: "Time",
          width: 60,
          titleAlign: "center",
          columnAlign: "center",
          isEdit: false
        },
        {
          field: "L1p",
          title: "L1p",
          width: 40,
          titleAlign: "center",
          columnAlign: "center",
          isEdit: true
        },
        {
          field: "L2p",
          title: "L2p",
          width: 40,
          titleAlign: "center",
          columnAlign: "center",
          isEdit: true
        },
        {
          field: "L3p",
          title: "L3p",
          width: 40,
          titleAlign: "center",
          columnAlign: "center",
          isEdit: true
        },
        {
          field: "L4p",
          title: "L4p",
          width: 40,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "R1P",
          title: "R1P",
          width: 40,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "R2P",
          title: "R2P",
          width: 40,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "R3P",
          title: "R3P",
          width: 40,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "R4P",
          title: "R4P",
          width: 40,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "COGFront",
          title: "COGFront",
          width: 80,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "COGBack",
          title: "COGBack",
          width: 70,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "COGLeft",
          title: "COGLeft",
          width: 70,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "COPLeftFront",
          title: "COPLeftFront",
          width: 100,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "COPLeftBack",
          title: "COPLeftBack",
          width: 100,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "COPRgithFront",
          title: "COPRgithFront",
          width: 110,
          titleAlign: "center",
          columnAlign: "center"
        },
        {
          field: "COPRgithBack",
          title: "COPRgithBack",
          width: 110,
          titleAlign: "center",
          columnAlign: "center"
        },
       
      ]
      } 
    },
   
    created() {
      this.getExer()
      this.getIntens()
      this.getModel()
      this.getMuscle()
      this.getUnit()
      this.getMedia()
      this.mediaMenu()
    },
     methods: {
      movePage(page) {
          this.paging.page = page;
          this.getMedia()
      },
      nextPage() {
          if (this.paging.totalPages != this.paging.page) {
              this.paging.page = this.paging.page + 1;
              this.getMedia()
          }
      },
      prevPage() {
          if (this.paging.page != 1) {
              this.paging.page = this.paging.page - 1;
              this.getMedia()
          }
      },
      checkPage (page) {
          return parseInt(this.paging.page / 10) == parseInt(page / 10);
      },    
     onPaste(evt) {
      evt.preventDefault();

      var lines = evt.clipboardData.getData("Text").split("\r\n");
      var result = [];
      var headers = lines[0].split("\t");
      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split("\t")

        for (var j = 0; j < headers.length; j++) {

            obj[headers[j]] = currentline[j];
          
        }

        result.push(obj);
      }

      this.tableData1 = result;
    },
     onPaste1(evt) {
      evt.preventDefault();

      var lines = evt.clipboardData.getData("Text").split("\r\n");
      var result = [];
      var headers = lines[0].split("\t");
      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split("\t")

        for (var j = 0; j < headers.length; j++) {

            obj[headers[j]] = currentline[j];
          
        }

        result.push(obj);
      }

      this.tableData2 = result;
    },
       rightLeft() {
         if(this.radio1 === 2){
         return true}
       },
       single() {
         if(this.radio1 === 1){
           return true
         }
       },
       change() {
         this.postFormData.append('thumbnailImage', document.getElementById('file').files[0])
         var a = document.getElementById('file').value.substring(12)
         this.todos1 = a
       },
       change1() {
        
         this.postFormData.append('middleImage', document.getElementById('file1').files[0])
         var b = document.getElementById('file1').value.substring(12)   
         this.todos2 = b
        
       },
       change2() {
         this.postFormData.append('topImage', document.getElementById('file2').files[0])
         var c = document.getElementById('file2').value.substring(12)
         this.todos3 = c
       },
       mediaOpen(){
         this.sf = this.val6
         this.sh = this.val7
         this.lf = this.val4
         this.lh = this.val5
         this.rf = this.val6
         this.rh = this.val7
         this.intro = this.val
         this.desc = this.val1
       },
       add(val){
         var list = this.videoCheck.findIndex(item => {
          return item === val
        })
         if(list >= 0){
         
        this.$message({
            showClose: true,
            message: '이미 등록 된 동영상 입니다.',
            type: 'error'
          });

         } else if (list < 0 && this.val !== undefined){
            this.videoCheck.splice(this.videoCheck.findIndex(item => {
              return item === this.val
            }) ,1)
            this.introdShow = false
            this.data = this.results.filter(item => {
              return item.fileId === val
            }) 
            this.val = val
            this.videoCheck.push(val)
         }
         else {
          this.videoCheck.splice(this.videoCheck.findIndex(item => {
            return item === val
          }) ,1)
          this.introdShow = false
          this.data =this.results.filter(item => {
            return item.fileId === val
          }) 
          this.val = val
          this.videoCheck.push(val)
         }   
       },
       add1(val){
         var list = this.videoCheck.findIndex(item => {
            return item === val
          })
         if(list >= 0){
           this.$message({
            showClose: true,
            message: '이미 등록 된 동영상 입니다.',
            type: 'error'
          });
         } else if (list < 0 && this.val1 !== undefined){
            this.videoCheck.splice(this.videoCheck.findIndex(item => {
              return item === this.val1
            }) ,1)
            this.descShow = false
            this.data1 =this.results.filter(item => {
              return item.fileId === val
            }) 
            this.val1 = val
            this.videoCheck.push(val)
         }
         else {
          this.descShow = false
          this.data1 =this.results.filter(item => {
            return item.fileId === val
          }) 
          this.val1 = val
          this.videoCheck.push(val)
         } 
       },
       add2(val){
         var list = this.videoCheck.findIndex(item => {
            return item === val
          })
         if(list >= 0){
           this.$message({
            showClose: true,
            message: '이미 등록 된 동영상 입니다.',
            type: 'error'
          });
         } else if (list < 0 && this.val7 !== undefined){
            this.videoCheck.splice(this.videoCheck.findIndex(item => {
              return item === this.val7
            }) ,1)
            this.singleHalf = false
            this.data2 =this.results.filter(item => {
              return item.fileId === val
            }) 
            this.val7 = val
            this.videoCheck.push(val)
         }
         else {
          this.singleHalf = false
          this.data2 =this.results.filter(item => {
            return item.fileId === val
          }) 
          this.val7 = val
          this.videoCheck.push(val)
         } 
       },
        add4(val){
          var list = this.videoCheck.findIndex(item => {
                return item === val
              })
         if(list >= 0){
           this.$message({
            showClose: true,
            message: '이미 등록 된 동영상 입니다.',
            type: 'error'
          });
         } else if (list < 0 && this.val6 !== undefined){
            this.videoCheck.splice(this.videoCheck.findIndex(item => {
              return item === this.val6
            }) ,1)
            this.singleFull = false
            this.data4 =this.results.filter(item => {
              return item.fileId === val
            }) 
            this.val6 = val
            this.videoCheck.push(val)
         }
         else {
          this.singleFull = false
          this.data4 =this.results.filter(item => {
            return item.fileId === val
          }) 
          this.val6 = val
          this.videoCheck.push(val)
         } 
       },
        add5(val){
         var list = this.videoCheck.findIndex(item => {
                return item === val
              })
        

         if(list >= 0){
           this.$message({
            showClose: true,
            message: '이미 등록 된 동영상 입니다.',
            type: 'error'
          });
         } else if (list < 0 && this.val4 !== undefined){
            this.videoCheck.splice(this.videoCheck.findIndex(item => {
              return item === this.val4
            }) ,1)
            this.leftFull = false
            this.data5 =this.results.filter(item => {
              return item.fileId === val
            }) 
            this.val4 = val
            this.videoCheck.push(val)
         }
         else {
          this.leftFull = false
          this.data5 =this.results.filter(item => {
            return item.fileId === val
          }) 
          this.val4 = val
          this.videoCheck.push(val)
         }

          
       },
        add6(val){
         var list = this.videoCheck.findIndex(item => {
            return item === val
          })

          if(list >= 0){
           this.$message({
            showClose: true,
            message: '이미 등록 된 동영상 입니다.',
            type: 'error'
          });
         }
         else if (list < 0 && this.val5 !== undefined){
            this.videoCheck.splice(this.videoCheck.findIndex(item => {
              return item === this.val5
            }) ,1)
            this.leftHalf = false
            this.data6 =this.results.filter(item => {
              return item.fileId === val
            }) 
            this.val4 = val
            this.videoCheck.push(val)
         }
         else {
          this.leftHalf = false
          this.data6 =this.results.filter(item => {
            return item.fileId === val
          })
         this.val5 = val
          this.videoCheck.push(val)
         }
       },
        add7(val){
        var list = this.videoCheck.findIndex(item => {
            return item === val
          })

          if(list >= 0){
           this.$message({
            showClose: true,
            message: '이미 등록 된 동영상 입니다.',
            type: 'error'
          });
         }
         else if (list < 0 && this.val6 !== undefined){
            this.videoCheck.splice(this.videoCheck.findIndex(item => {
              return item === this.val6
            }) ,1)
            this.rightFull = false
            this.data7 =this.results.filter(item => {
              return item.fileId === val
            }) 
            this.val6 = val
            this.videoCheck.push(val)
         }
         else {
          this.rightFull = false
          this.data7 =this.results.filter(item => {
            return item.fileId === val
          })
         this.val6 = val
          this.videoCheck.push(val)
         }
       },
        add8(val){
        var list = this.videoCheck.findIndex(item => {
            return item === val
          })

          if(list >= 0){
           this.$message({
            showClose: true,
            message: '이미 등록 된 동영상 입니다.',
            type: 'error'
          });
         }
         else if (list < 0 && this.val7 !== undefined){
            this.videoCheck.splice(this.videoCheck.findIndex(item => {
              return item === this.val7
            }) ,1)
            this.rightHalf = false
            this.data8 =this.results.filter(item => {
              return item.fileId === val
            }) 
            this.val7 = val
            this.videoCheck.push(val)
         }
         else {
          this.rightHalf = false
          this.data8 =this.results.filter(item => {
            return item.fileId === val
          })
         this.val7 = val
          this.videoCheck.push(val)
         }
       },
      getExer(){
       getExerKind()
            .then(response => {
              this.exerKind = response.results
              this.exerSelect = this.exerKind[0].id
          }).catch(response => {
              this.fetchSuccess = false
          })
        },
         getIntens() {
            getIntensity()
            .then(response => {
                this.intens = response.results
                this.intensSelect = this.intens[0].key
            })
        },
        getModel() {
        var u = null;
        getModel(u)
          .then(response => {
          this.model = response.results
          this.mSelect = this.model[0].id
        })
      },
      getMuscle() {
        this.listLoading = true
          getMuscleArea()
            .then(response => {
              this.muscleResults = response.results
             this.muscleAreaCateId = this.muscleResults[0].id
             this.muscleAreaCateDepth = this.muscleResults[0].childens[0].id
          }).catch(response => {
              this.fetchSuccess = false
          })
        },
        getUnit() {
          getEffectCd()
          .then(response => {
            this.effectUnit = response.results
            this.unit = this.effectUnit.filter(item => {
              return item.key === 'CT'
            })[0].name
            this.unit1 = this.effectUnit.filter(item => {
              return item.key === 'SC'
            })[0].name
          })
        },
      getMedia() {
          this.loading=true
          var getCheer = { search: this.search, paging: this.paging}
          getMedia(getCheer)
          .then(response => {
            this.loading=false
            this.results = response.results
            this.paging = response.paging
            if(this.results.length <= 0) {
              this.mediaResultsShow = true
            } else {
              this.mediaResultsShow = false
            }
            // this.resultOrigin = response.results
          }).catch(response => {
          })
        },
         mediaMenu() {
          GetVideoMenus()
          .then(response => {
            this.mediaMenu = response.result
          })
        },
        whatDis() {
          this.muscleAreaCateDepth = null
        },
         childDefault1(){
          this.search.menuId = null
        },
        mediaReset() {
        this.search = {
            id: '',
            parentMenuId: null,
            menuId: null,
            originName: '',
            searchColumn: null,
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
        }
      },
        mainRegist() {
          if(this.exerInput <= 0) {
            this.$notify.error({
            title: 'Error',
            message: 'MAIN운동 명칭을 입력해주세요.'
          });
          } else if(this.effectInput <= 0) {
            this.$notify.error({
            title: 'Error',
            message: 'MAIN 운동효과를 입력해주세요.'
          });
          } else if(this.textarea <= 0) {
            this.$notify.error({
            title: 'Error',
            message: 'MAIN운동 설명을 입력해주세요.'
          });
          } else if(this.todos1 <= 0) {
            this.$notify.error({
            title: 'Error',
            message: '썸네일 이미지를 등록해 주세요.'
          });
          } else if(this.todos2 <= 0) {
            this.$notify.error({
            title: 'Error',
            message: '중간 이미지를 등록해 주세요.'
          });
          } else if(this.todos3 <= 0) {
            this.$notify.error({
            title: 'Error',
            message: '상세 상단 이미지를 등록해 주세요.'
          });
          } else if(this.data <= 0) {
            this.$notify.error({
            title: 'Error',
            message: '운동소개 영상을 등록해 주세요.'
          });
          } else if(this.data1 <= 0) {
            this.$notify.error({
            title: 'Error',
            message: '운동설명 영상을 등록해 주세요.'
          });
          } else if (this.radio1 === 1 && this.data4 <= 0) {
            this.$notify.error({
              title: 'Error',
              message: 'MAIN운동 동작 영상 Full버전을 등록해 주세요.'
            });
          } else if(this.checked === true && this.radio1 === 1 && this.data2 <= 0) {
                this.$notify.error({
                  title: 'Error',
                  message: 'MAIN운동 동작 영상 Half버전을 등록해 주세요.'
                });
          } else if (this.checked === true && this.tableData1.length === 1) {
              this.$notify.error({
                title: 'Error',
                message: '족부압 데이터를 등록해 주세요.'
              });
          } else if(this.radio1 === 2 &&( this.data5 <= 0 || this.data7 <= 0)) {
              this.$notify.error({
                title: 'Error',
                message: 'MAIN운동 동작 영상 Full버전을 좌우 모두 등록해 주세요.'
              });
            } else if(this.radio1 === 2 && this.checked === true && (this.data6 <= 0 || this.data8 <= 0)) {
              this.$notify.error({
                title: 'Error',
                message: 'MAIN운동 동작 영상 Half버전을 좌우 모두 등록해 주세요.'
              });
          } else {
          var radio = ''
          var radio1 =''
          this.postFormData.append('name', this.exerInput)
          this.postFormData.append('effect', this.effectInput)
          this.postFormData.append('description', this.textarea)
          this.postFormData.append('exerKindCateId', this.exerSelect)
          this.postFormData.append('intensityCd', this.intensSelect)
          this.postFormData.append('muscleAreaCateId', this.muscleAreaCateDepth)
          this.postFormData.append('photoModelId', this.mSelect)
          if(this.radio === 1) {
            radio = "CT"
          }else{
            radio = "SC"
          }
          this.postFormData.append('effectUnitCd', radio)
          
         
          if(this.checked === true && this.radio1 === 1){
            this.postFormData.append('actionHalfVideoId', this.data2[0].fileId)
            this.postFormData.append('isFootPressure', true)
            this.postFormData.append('footPressureData', JSON.stringify(this.tableData1))
            this.postFormData.append('actionVideoId', this.data4[0].fileId) 
            this.postFormData.append('isLeftRight', false)
          } else if (this.checked === true && this.radio1 === 2) {
              this.postFormData.append('isLeftRight', true)
              this.postFormData.append('isFootPressure', true)
              this.postFormData.append('actionLeftHalfVideoId', this.data6[0].fileId)
              this.postFormData.append('footPressureData', JSON.stringify(this.tableData1))
              this.postFormData.append('footPressureLeftData',JSON.stringify(this.tableData2))
              this.postFormData.append('actionHalfVideoId', this.data8[0].fileId)
              this.postFormData.append('actionVideoId', this.data7[0].fileId) 
              this.postFormData.append('actionLeftVideoId', this.data5[0].fileId)
          } else if(this.radio1 === 2) {
            this.postFormData.append('isLeftRight', true)
            this.postFormData.append('isFootPressure', false)
           this.postFormData.append('actionLeftVideoId', this.data5[0].fileId)
           this.postFormData.append('isFootPressure', false)
          this.postFormData.append('actionVideoId', this.data7[0].fileId)
          } else if (this.radio1 === 1) {
            this.postFormData.append('isFootPressure', false)
            this.postFormData.append('actionVideoId', this.data4[0].fileId) 
            this.postFormData.append('isLeftRight', false)
          }
          
          this.postFormData.append('introductionVideoId', this.data[0].fileId)
          this.postFormData.append('descriptionVideoId', this.data1[0].fileId)
          
         
          
           
         
          var data = this.postFormData
          this.$confirm('컨텐츠를 등록하시겠습니까?', '등록', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'Success'
            }).then(() =>{
                this.loading = true
          addMainExer(data)
          .then(response => {
            this.loading = false;
            this.loading = false
              if(response === undefined) {
                  this.$message({
                      message: '컨텐츠를 등록할 수 없습니다.',
                      type: 'warning'
                      });
              } else {
                  this.$message({
                  message: '등록이 완료 되었습니다.',
                  type: 'success'});
                  this.$router.push({path: '/exercise/mainlist'})
              }
          })
          })
          .catch(response => {
            this.loading = false
            this.$message.info('취소 되었습니다.'); 
          })
          }
        },
        pageReset(){
          this.paging.page = 1
        },
    }
}
</script>
