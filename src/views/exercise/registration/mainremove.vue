<template>
<div class="warmWrap" id="vList" v-loading="loading">
  <h1>수정</h1>
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
    <th>운동 강도</th>
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
      <el-radio v-model="radio" :label="1">{{unit}}</el-radio>
      <el-radio v-model="radio" :label="2">
      {{unit1}}
      </el-radio>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>주동근 부위 / 세부</th>
    <td>
      <el-form :inline="true" size="small">
        <el-form-item>
          <el-select v-model="muscleAreaCateId"  @change="whatDis()" style="width: 150px;" size="small">
          <el-option label="전체" :value="null" placeholder="전체">
          </el-option>
          <el-option :label="muscle.name" :key="muscle.id"  v-for="muscle in muscleResults" :value="muscle.id" >  
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="muscleAreaCateDepth" size="small"  :disabled="muscleAreaCateId === null || muscleAreaCateId === 0 ? true: false" style="width: 150px;" placeholder="선택해 주세요.">
         <div v-for="muscle1 in muscleResults">
            <el-option v-for="muscle2 in muscle1.childens" :key="muscle2.id" :label="muscle2.name" :value="muscle2.id"> 
            </el-option>
          </div>
      </el-select>
        </el-form-item>
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
    <td colspan="2" class="separate">
       <label class="file-label">
        <span class="el-button fileBtn" type="primary" plane size="small">이미지 변경</span>
        <input class="file-input" type="file" id="file" accept="image/*" @change="change()" style="display: none;" > 
      </label>
        <span class="file-name">
                      {{todos1.slice(0,20)+'...'}}  
          <el-dialog
              title="이미지 미리보기"
              :visible.sync="thumShow"
              >
              <img v-bind:src="thPath" style="width: 100%;" />
          </el-dialog>
        </span>
    </td>
    <td class="separate">
      <el-button @click="thumShow=true" size="small" class="linkA">{{thImg.slice(0,20)+'...'}}</el-button>
    </td>
  </tr>
  <tr>
    <th>중간 이미지</th>
    <td colspan="2" style="width: 600px;" >
       <label class="file-label">
        <span class="el-button fileBtn" type="primary" plane size="small">이미지 변경</span>
        <input class="file-input" type="file" id="file1" accept="image/*" @change="change1()" style="display: none;" > 
      </label>
        <span class="file-name">
                      {{todos2.slice(0,20)+'...'}}
                  <el-dialog
                      title="이미지 미리보기"
                      :visible.sync="midShow"
                      >
                      <img v-bind:src="mpPath" style="width: 100%;" />
                  </el-dialog>
        </span>
    </td>
    <td>
       <el-button @click="midShow = true" size="small" class="linkA">{{mpImg.slice(0,20)+'...'}}</el-button>
    </td>
  </tr>
  <tr>
    <th>상세 상단 이미지</th>
    <td colspan="2" style="width: 600px;">
       <label class="file-label">
      <span class="el-button fileBtn" type="primary" plane size="small">이미지 변경</span>
      <input class="file-input" type="file" id="file2" accept="image/*" @change="change2()" style="display: none;" > 
    </label>
      <span class="file-name">
                    {{todos3.slice(0,20)+'...'}}
                  <el-dialog
                      title="이미지 미리보기"
                      :visible.sync="topShow"
                      >
                      <img v-bind:src="tpPath" style="width: 100%;" />
                  </el-dialog>
      </span>
    </td>
    <td><el-button @click="topShow= true" size="small" class="linkA">{{tpImg.slice(0,20)+'...'}}</el-button></td>
  </tr>
  <tr>
    <th rowspan="3" class="title_style">
      동영상
    </th>
    <th class="separate">운동소개 동영상</th>
    <td colspan="2" class="separate"   v-for="lists in data" style="width: 600px;">
        <el-button @click="introdShow = true" size="small" style="margin-right: 10px;">변경</el-button>
       {{ lists.originName }}</td>
      <td class="separate">
        <el-button  @click="introShow=true; videoPlayer(introPath)" size="small" class="linkA">{{introName}} </el-button>
        <el-dialog title="동영상 미리보기" :visible.sync="introShow">
          <videoP :id="introPath" ref="form"></videoP>
        </el-dialog>
      </td>
  </tr>
  <tr>
    <th>운동설명 동영상</th>
    <td colspan="2"  style="width: 600px;" v-for="lists in data1"><el-button @click="descShow = true" size="small" style="margin-right: 10px;">변경</el-button> {{ lists.originName }}</td>
    <td>
      <el-button @click="descVideoShow = true; videoPlayer(descPath)" size="small" class="linkA">{{descName}}</el-button>
      <el-dialog title="동영상 미리보기" :visible.sync="descVideoShow">
        <videoP :id="descPath" ref="form"></videoP>
      </el-dialog>
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
          <th>
            Full화면 버전
             <el-button @click="singleFull = true" size="small">변경</el-button>
            </th>
          <td>
            <el-form>
              
                
            <table class="media_result"  stripe >
                    <tbody>
                        <tr>
                          <td  v-for="lists in data4"> {{ lists.originName }}</td>
                        </tr>
                        <tr>
                          <td>
                            <el-button  @click="singFullShow = true; videoPlayer(singFullPath)" size="small" class="linkA">{{singFullName}}</el-button>
                            <el-dialog :visible.sync="singFullShow">
                              <videoP :id="singFullPath" ref="form"></videoP>
                            </el-dialog>
                          </td>
                        </tr>
                    </tbody>
                </table>
              </el-form>
          </td>
        </tr>
        <tr v-if="checked">
          <th>
          Half화면 버전
          <el-button @click="singleHalf = true" size="small">변경</el-button>
          </th>
          <td>
            <el-form>
              
                
            <table class="media_result"  stripe >
                    <tbody>
                        <tr>
                          <td>
                            <span v-for="lists in data2" class="titleFont">{{ lists.originName }}</span> 
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <el-button v-if="singHalfPath > 0" @click="singHalfShow = true; videoPlayer(singHalfPath)" size="small" class="linkA">{{singHalfName}}</el-button>
                            <el-dialog title="동영상 미리보기" :visible.sync="singHalfShow">
                              <videoP :id="singHalfPath" ref="form"></videoP>
                            </el-dialog>
                          </td>
                        </tr>
                    </tbody>
                </table>
              </el-form>
          </td>
        </tr>
      </table>
    </td>
    <td colspan="5" v-if="rightLeft()">
      <table style="width: 100%;">
        <tr>
          <td>
            <table style="width: 100%;">
              <tr>
                <th colspan="2">
                좌측 동영상
                </th>
              </tr>
              <tr>
                <th>
                Full화면 버전
                <el-button @click="leftFull = true" size="small">변경</el-button>
                </th>
                <td>
                  <el-form>
                   
                      
                <table class="media_result"  stripe >
                        <tbody>
                            <tr>
                              <td> 
                                <span v-for="lists in data5" class="titleFont">{{ lists.originName }}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <el-button v-if="leftFullName.length > 0" @click="leftFullShow  = true; videoPlayer(leftFullPath)" size="small" class="linkA">{{leftFullName}}</el-button>
                                <el-dialog title="동영상 미리보기" :visible.sync="leftFullShow">
                                  <videoP :id="leftFullPath" ref="form"></videoP>
                                </el-dialog>
                              </td>
                            </tr>
                        </tbody>
                    </table>
                    </el-form>
                </td>
              </tr>
              <tr v-if="checked">
                <th>
                Half화면 버전
                <el-button @click="leftHalf = true" size="small">변경</el-button>
                </th>
                <td>
                  <el-form>
                     
                        
                  <table class="media_result"  stripe >
                          <tbody>
                              <tr>
                                <td>
                                  <span v-for="lists in data6" class="titleFont">{{ lists.originName }}</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <el-button v-if="leftHalfPath > 0" @click="leftHalfShow = true; videoPlayer(leftHalfPath)" size="small" class="linkA">{{leftHalfName}}</el-button>
                                  <el-dialog title="동영상 미리보기" :visible.sync="leftHalfShow">
                                    <videoP :id="leftHalfPath" ref="form"></videoP>
                                  </el-dialog>
                                </td>
                              </tr>
                          </tbody>
                      </table>
                  </el-form>
                </td>
              </tr>
            </table>
          </td>
          <td>
            <table style="width: 100%;">
              <tr>
                <th colspan="2">우측 동영상</th>
              </tr>
              <tr>
                <th>
                Full화면 버전
                <el-button @click="rightFull = true" size="small">변경</el-button>
                </th>
                <td>
                  <el-form>
                    
                      
                  <table class="media_result"  stripe >
                          <tbody>
                              <tr>
                                <td>
                                <span v-for="lists in data7" class="titleFont">{{ lists.originName }}</span>
                               </td>
                              </tr>
                              <tr>
                                <td>
                                  <el-button v-if="rightFullPath > 0" @click="rightFullShow = true; videoPlayer(rightFullPath)" size="small" class="linkA">{{rightFullName}}</el-button>
                                  <el-dialog title="동영상 미리보기" :visible.sync="rightFullShow">
                                    <videoP :id="rightFullPath" ref="form" ></videoP>
                                  </el-dialog>
                                </td>
                              </tr>
                          </tbody>
                      </table>
                  </el-form>
                </td>
              </tr>
              <tr v-if="checked">
                <th>Half화면 버전
                  <el-button @click="rightHalf = true" size="small">변경</el-button>
                </th>
                <td>
                  <el-form>
                    
                      
                  <table class="media_result"  stripe >
                          <tbody>
                              <tr>
                                <td>
                                  <span v-for="lists in data8" class="titleFont">{{ lists.originName }}</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <el-button v-if="rightHalfPath > 0" @click="rightHalfShow = true; videoPlayer(rightHalfPath)" size="small" class="linkA">{{rightHalfName}}</el-button>
                                  <el-dialog title="동영상 미리보기" :visible.sync="rightHalfShow">
                                    <videoP :id="rightHalfPath" ref="form" > </videoP>
                                  </el-dialog>
                                </td>
                              </tr>
                          </tbody>
                      </table>
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
    <td class="footDialog">
      
        <el-button @click="footData = true" size="small" class="footBtn" >족부압 데이터</el-button>

    </td>
  </tr>
</table>

<div class="footDataWRap mediaPopOver">
  <el-dialog
        :visible.sync="footData"
        center>
        <h3>족부압 데이터</h3>
        <table class="el-table" >  
  <tr v-if="rightLeft()">
    <th style="padding: 15px">좌측 데이터</th>
      <td colspan="5" class="listTable">
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
    <th style="padding: 15px">우측 데이터</th>
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
  <tr v-if="single()">
    <th style="padding: 15px">단일</th>
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
        <div class="btnWrap">
            <el-button @click="footData = false" size="small" type="info">닫기</el-button>
        </div>
        </el-dialog>

</div>
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
            <tr v-for="(lists, key) in results" :key="lists.id" @click="add(lists.fileId)">
              <td>{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
              <td>0000{{ lists.fileId }}</td>
              <td>{{ lists.parentMenuName }}</td>
              <td>{{ lists.menuName }}</td>
              <td>{{ lists.originName }}</td>
              <td>{{ lists.createDateString }}</td>
              <td><el-button type="primary" plain size="small">선택</el-button></td>
            </tr>
            <tr>
              <td v-show="mediaResultShow" style="text-align: center; padding: 40px;" colspan="7">
                검색결과가 없습니다.
              </td>
            </tr>
          </tbody>
        </table>
        <nav class="text-sm-center" v-show="!mediaResultShow">
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
      <el-button @click="introdShow = false" size="small" type="info">닫기</el-button>
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
          <tr v-for="(lists, key) in results" :key="lists.id" @click="add1(lists.fileId)">
            <td>{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
            <td>0000{{ lists.fileId }}</td>
            <td>{{ lists.parentMenuName }}</td>
            <td>{{ lists.menuName }}</td>
            <td>{{ lists.originName }}</td>
            <td>{{ lists.createDateString }}</td>
            <td><el-button type="primary" plain size="small">선택</el-button></td>
          </tr>
          <tr>
            <td v-show="mediaResultShow" style="text-align: center; padding: 40px;" colspan="7">
              검색결과가 없습니다.
            </td>
          </tr>
        </tbody>
      </table>
      <nav class="text-sm-center" v-show="!mediaResultShow">
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
      <el-button @click="descShow = false" size="small" type="info">닫기</el-button>
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
<el-form :inline="true"  size="mini">
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
            <tr>
              <td v-show="mediaResultShow" style="text-align: center; padding: 40px;" colspan="7">
                검색결과가 없습니다.
              </td>
            </tr>
          </tbody>
        </table>
        <nav class="text-sm-center" v-show="!mediaResultShow">
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
      <el-button @click="singleFull = false" size="small" type="info">닫기</el-button>
  </span>
  </el-dialog>
<el-dialog
  :visible.sync="singleHalf"
  center>
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
            <tr>
              <td v-show="mediaResultShow" style="text-align: center; padding: 40px;" colspan="7">
                검색결과가 없습니다.
              </td>
            </tr>
          </tbody>
        </table>
        <nav class="text-sm-center" v-show="!mediaResultShow">
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
      <el-button @click="singleHalf = false" size="small" type="info">닫기</el-button>
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
          <tr>
            <td v-show="mediaResultShow" style="text-align: center; padding: 40px;" colspan="7">
              검색결과가 없습니다.
            </td>
          </tr>
        </tbody>
      </table>
      <nav class="text-sm-center" v-show="!mediaResultShow">
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
      <el-button @click="leftFull = false" size="small" type="info">닫기</el-button>
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
          <tr v-for="(lists, key) in results" :key="lists.id" @click="add6(lists.fileId)">
            <td>{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
            <td>0000{{ lists.fileId }}</td>
            <td>{{ lists.parentMenuName }}</td>
            <td>{{ lists.menuName }}</td>
            <td>{{ lists.originName }}</td>
            <td>{{ lists.createDateString }}</td>
            <td><el-button type="primary" plain size="small">선택</el-button></td>
          </tr>
          <tr>
            <td v-show="mediaResultShow" style="text-align: center; padding: 40px;" colspan="7">
              검색결과가 없습니다.
            </td>
          </tr>
        </tbody>
      </table>
      <nav class="text-sm-center" v-show="!mediaResultShow">
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
      <el-button @click="leftHalf = false" size="small" type="info">닫기</el-button>
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
            <tr v-for="(lists, key) in results" :key="lists.id" @click="add7(lists.fileId)">
              <td>{{(paging.totalRecords - (paging.page - 1) * paging.pageSize) - key++}}</td>
              <td>0000{{ lists.fileId }}</td>
              <td>{{ lists.parentMenuName }}</td>
              <td>{{ lists.menuName }}</td>
              <td>{{ lists.originName }}</td>
              <td>{{ lists.createDateString }}</td>
              <td><el-button type="primary" plain size="small">선택</el-button></td>
            </tr>
            <tr>
              <td v-show="mediaResultShow" style="text-align: center; padding: 40px;" colspan="7">
                검색결과가 없습니다.
              </td>
            </tr>
          </tbody>
        </table>
        <nav class="text-sm-center" v-show="!mediaResultShow">
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
      <el-button @click="rightFull = false" size="small" type="info">닫기</el-button>
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
          <el-select :disabled="search.parentMenuId === null || search.parentMenuId <= 0 ? true: false" v-model="search.menuId" placeholder="선택해 주세요.">
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
            <tr>
              <td v-show="mediaResultShow" style="text-align: center; padding: 40px;" colspan="7">
                검색결과가 없습니다.
              </td>
            </tr>
          </tbody>
        </table>
        <nav class="text-sm-center" v-show="!mediaResultShow">
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
      <el-button @click="rightHalf = false" size="small" type="info">닫기</el-button>
  </span>
  </el-dialog>






</div>
  <div class="btnWrap">
    <el-button type="info" size="small" class="submitBtn" @click="mainRegist()">저장</el-button>
    <router-link v-bind:to="{path: '/exercise/mainlist/maindetail'}">
    <el-button type="warning" size="small" class="submitBtn">취소</el-button>
    </router-link>
  </div>
  </el-form>
  

</div>
</template>

<script>
import { getExerKind,getIntensity, getModel, getMuscleArea, getEffectCd, getMedia, GetVideoMenus, editmainExer, getMainDetail, getvideoUrl} from '@/api/exercise'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { getToken, setToken, removeToken, reToken } from '@/utils/auth'
import videoP from '@/components/tab/videoPlayer'
  export default {
    components: {
      videoP
    },
    data() {
      return {
        videoUrl: '',
        topShow:false,
        midShow: false,
        mediaResultShow: '',
        loading: false,
        thPath: '',
        mpPath: '',
        tpPath: '',
        thumShow: false,
        footData: false,
        rightHalf: false,
        rightFull: false,
        leftHalf: false,
        leftFull:false,
        singleHalf: false,
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
        radio: '',
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
        introName:'',
        introPath: '',
        introShow: false,
        descName: '',
        descPath: '',
        descVideoShow: false,
        singFullName: '',
        singFullPath: '',
        singFullShow: false,
        singHalfName: '',
        singHalfPath: '',
        singHalfShow: false,
        leftFullName: '',
        leftFullPath: '',
        leftFullShow: false,
        leftHalfName: '',
        leftHalfPath: '',
        leftHalfShow: false,
        rightFullShow: false,
        rightFullName: '',
        rightFullPath: '',
        rightHalfName:'',
        rightHalfPath: '',
        rightHalfShow: false,
        videoCheck: [],
        thImg: '',
        mpImg: '',
        tpImg: '',
        search: {
            id: '',
            parentMenuId: null,
            menuId: null,
            originName: null,
            searchColumn: 'CreateDate',
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
      this.getUnit()
      this.getMedia()
      this.mediaMenu()
      this.getDetail()
      this.getMuscle()
      
    },
    
    
     methods: {
      
        videoPlayer(val){
             var data = {fileId: val}
             getvideoUrl(data)
             .then(response => {
                //  alert(response)
                 this.videoUrl = response    
                 this.callVideo(val)
            })
           
         },
          callVideo(val){
         this.$refs.form.videoId(val)
       },
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
      childDefault1(){
          this.search.menuId = null
        },
        whatDis() {
          this.muscleAreaCateDepth = null
        },
       getDetail(){
         this.loading = true
          var id = localStorage.getItem('id')
          var data = {id: id}
          getMainDetail(data)
          .then(response => {
            
            this.loading = false 
            this.mainExer = response.mainExercise
            this.files = response.files
            this.foot = response.footPressures
            this.exerSelect = this.mainExer.exerKindCateId
            this.exerInput = this.mainExer.name
            this.effectInput = this.mainExer.effect
            this.textarea = this.mainExer.description
            this.thImg = this.files.filter(item => {
              return item.fileCd === "TH"
            })[0].originName
            this.todos1 = this.thImg
            this.mpImg = this.files.filter(item=>{
              return item.fileCd === "MP"
            })[0].originName
            this.todos2 = this.mpImg
            this.tpImg =this.files.filter(item=> {
              return item.fileCd === "TP"
            })[0].originName
            this.todos3 = this.tpImg
            this.thPath = this.files.filter(item => {
              return item.fileCd === "TH"
            })[0].logicalPath
            this.mpPath = this.files.filter(item=>{
              return item.fileCd === "MP"
            })[0].logicalPath
            this.tpPath =this.files.filter(item=> {
              return item.fileCd === "TP"
            })[0].logicalPath


            this.data = this.files.filter(item => {
              return item.fileCd === "IV"
            })
            this.val = this.files.filter(item => {
              return item.fileCd === "IV"
            })[0].id
            this.videoCheck.push(this.val)
            this.introName = this.files.filter(item => {
              return item.fileCd === "IV"
            })[0].originName
            this.introPath = this.files.filter(item => {
              return item.fileCd === "IV"
            })[0].id

            this.data1 = this.files.filter(item => {
              return item.fileCd === "DV"
            })
            this.val1 =this.files.filter(item => {
              return item.fileCd === "DV"
            })[0].id
            this.videoCheck.push(this.val1)
            this.descName = this.files.filter(item => {
              return item.fileCd === "DV"
            })[0].originName
            this.descPath = this.files.filter(item => {
              return item.fileCd === "DV"
            })[0].id

            this.data2 = this.files.filter(item => {
              return item.fileCd === "AH"
            })
            

            this.data4 = this.files.filter(item => {
              return item.fileCd === "AV"
            })
           

            this.data5 = this.files.filter(item => {
              return item.fileCd === "LA"
            })
            

            this.data6 = this.files.filter(item => {
              return item.fileCd === "LH"
            })
            

            this.data7 = this.files.filter(item => {
              return item.fileCd === "RA"
            })
            

            this.data8 = this.files.filter(item => {
              return item.fileCd === "RH"
            })
            

            
            if(this.mainExer.effectUnitCd === "CT") {
              this.radio = 1
            }else {
              this.radio = 2
            }
            if(this.mainExer.isFootPressure === true && (this.mainExer.isLeftRight === false || this.mainExer.isLeftRight === null)) {
              this.checked = true
               var tableD1 = this.foot.filter(item=> {
                 return item.key === "FD"
               })[0].value
               
              this.tableData1 = JSON.parse(tableD1)
              this.singFullName = this.files.filter(item => {
                return item.fileCd === "AV"
              })[0].originName
              this.singFullPath = this.files.filter(item => {
                return item.fileCd === "AV"
              })[0].id
              this.val6 =this.files.filter(item => {
                return item.fileCd === "AV"
              })[0].id
              this.videoCheck.push(this.val6)
              
              this.val7 =this.files.filter(item => {
              return item.fileCd === "AH"
              })[0].id
              this.videoCheck.push(this.val7)
              this.singHalfName = this.files.filter(item => {
              return item.fileCd === "AH"
              })[0].originName
              this.singHalfPath = this.files.filter(item => {
                return item.fileCd === "AH"
              })[0].id


            } else if(this.mainExer.isFootPressure === true && this.mainExer.isLeftRight === true) {
              var tableD1 =this.foot.filter(item=> {
                 return item.key === "RF"
               })[0].value
              var tableD2 =this.foot.filter(item=> {
                 return item.key === "LF"
               })[0].value
              this.tableData2 = JSON.parse(tableD2)
              this.tableData1 = JSON.parse(tableD1)
              
              this.leftFullName = this.files.filter(item => {
              return item.fileCd === "LA"
              })[0].originName
              this.leftFullPath = this.files.filter(item => {
                return item.fileCd === "LA"
              })[0].id
              
              this.val4 = this.files.filter(item => {
                return item.fileCd === "LA"
              })[0].id
              this.videoCheck.push(this.val4)


              this.val5 = this.files.filter(item => {
              return item.fileCd === "LH"
              })[0].id
              this.videoCheck.push(this.val5)
              
              this.leftHalfName = this.files.filter(item => {
              return item.fileCd === "LH"
              })[0].originName
              this.leftHalfPath = this.files.filter(item => {
                return item.fileCd === "LH"
              })[0].id
              
              
              this.val6 = this.files.filter(item => {
              return item.fileCd === "RA"
              })[0].id
              this.videoCheck.push(this.val6)
              
              this.rightFullName = this.files.filter(item => {
              return item.fileCd === "RA"
              })[0].originName
              this.rightFullPath = this.files.filter(item => {
                return item.fileCd === "RA"
              })[0].id

              this.rightHalfName = this.files.filter(item => {
              return item.fileCd === "RH"
              })[0].originName
              this.rightHalfPath = this.files.filter(item => {
                return item.fileCd === "RH"
              })[0].id
               this.val7 = this.files.filter(item => {
              return item.fileCd === "RH"
              })[0].id
              this.videoCheck.push(this.val7)
              
            } else if(this.mainExer.isFootPressure === false && (this.mainExer.isLeftRight === false || this.mainExer.isLeftRight === null) ) {
              this.checked = false
              this.singFullName = this.files.filter(item => {
                return item.fileCd === "AV"
              })[0].originName

              this.singFullPath = this.files.filter(item => {
                return item.fileCd === "AV"
              })[0].id
              this.val6 = this.files.filter(item => {
                return item.fileCd === "AV"
              })[0].id
              this.videoCheck.push(this.val6)

              
            } else if(this.mainExer.isFootPressure === false && this.mainExer.isLeftRight === true) {
              this.checked = false
              this.leftFullName = this.files.filter(item => {
              return item.fileCd === "LA"
              })[0].originName
              this.leftFullPath = this.files.filter(item => {
                return item.fileCd === "LA"
              })[0].id
              this.val4 = this.files.filter(item => {
                return item.fileCd === "LA"
              })[0].id
              this.videoCheck.push(this.val4)

              this.rightFullName = this.files.filter(item => {
              return item.fileCd === "RA"
              })[0].originName
              this.rightFullPath = this.files.filter(item => {
                return item.fileCd === "RA"
              })[0].id
              this.val6 = this.files.filter(item => {
                return item.fileCd === "RA"
              })[0].id
              this.videoCheck.push(this.val6)

            }
            if(this.mainExer.isFootPressure === true ) {
              this.checked = true
            } else {
              this.checked = false
            }

            if(this.mainExer.isLeftRight === true) {
              this.radio1 = 2
            } else {
              this.radio1 = 1
            }
            this.exerKindData = this.exerKind.filter( item => {
              return item.id === this.mainExer.exerKindCateId
            })[0].name
             
            this.muscleAreaCateDepth = this.mainExer.muscleAreaCateId
             
            
            this.intensSelect = this.mainExer.intensityCd
            this.mSelect = this.mainExer.photoModelId
            this.getMuscle()
            // this.warmActive()
            // this.mainActive()
            // this.coolActive()
          })
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
            this.val5 = val
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
       getMedia(val) {
          var getCheer = { search: this.search, paging: this.paging}
          getMedia(getCheer)
          .then(response => {
            this.results = response.results
            this.paging = response.paging
            if(this.results.length <= 0){
              this.mediaResultShow = true
            } else {
              this.mediaResultShow = false
            }
          }).catch(response => {
          })
        },
      getExer(){
       getExerKind()
            .then(response => {
              this.exerKind = response.results
              this.listLoading = false
          }).catch(response => {
              this.fetchSuccess = false
          })
        },
         getIntens() {
            getIntensity()
            .then(response => {
                this.intens = response.results
            })
        },
        getModel() {
        var u = null;
        getModel(u)
          .then(response => {
          this.model = response.results
        })
      },
      getMuscle() {
        this.listLoading = true
        getMuscleArea()
            .then(response => {
              
              this.muscleResults = response.results
              this.listLoading = false
              for( var i in this.muscleResults ){
                var arrParent = this.muscleResults
                var arrList = arrParent[i].childens
                var newarr = []
                  
                for(var x = 0; x < arrList.length; x++) {
                  if(arrList[x].id === this.muscleAreaCateDepth) {
                  this.muscleAreaCateId = arrParent.filter(item => {
                     return item.childens === arrList
                   })[0].id
          
                   
                  }
                  
                }
                
              }
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
      
         mediaMenu() {
         GetVideoMenus()
          .then(response => {
            this.mediaMenu = response.result
          })
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
          } else if(this.val <= 0) {
            this.$notify.error({
            title: 'Error',
            message: '운동소개 영상을 등록해 주세요.'
          });
          } else if(this.val1 <= 0) {
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
          } 
          
          else if(this.radio1 === 2 &&( this.data5 <= 0 || this.data7 <= 0)) {
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
          var id = localStorage.getItem('id')
          this.postFormData.append('actionId', id)
          if(this.radio === 1) {
            radio = "CT"
          }else{
            radio = "SC"
          }
          this.postFormData.append('effectUnitCd', radio)
          
         
          if(this.checked === true && this.radio1 === 1){
            this.postFormData.append('actionHalfVideoId', this.val7)
            this.postFormData.append('isFootPressure', true)
            this.postFormData.append('footPressureData', JSON.stringify(this.tableData1))
            this.postFormData.append('actionVideoId', this.val6) 
            this.postFormData.append('isLeftRight', false)
          } else if (this.checked === true && this.radio1 === 2) {
            this.postFormData.append('isLeftRight', true)
            this.postFormData.append('isFootPressure', true)
              this.postFormData.append('actionLeftHalfVideoId', this.val5)
              this.postFormData.append('footPressureData', JSON.stringify(this.tableData1))
              this.postFormData.append('footPressureLeftData',JSON.stringify(this.tableData2))
              this.postFormData.append('actionHalfVideoId', this.val7)
              this.postFormData.append('actionVideoId', this.val6) 
              this.postFormData.append('actionLeftVideoId', this.val4)
          } else if(this.radio1 === 2) {
            this.postFormData.append('isLeftRight', true)
            this.postFormData.append('isFootPressure', false)
           this.postFormData.append('actionLeftVideoId', this.val4)
           this.postFormData.append('isFootPressure', false)
          this.postFormData.append('actionVideoId', this.val6)
          } else if (this.radio1 === 1) {
            this.postFormData.append('isFootPressure', false)
            this.postFormData.append('actionVideoId', this.val6) 
            this.postFormData.append('isLeftRight', false)
          }
          
          this.postFormData.append('introductionVideoId', this.val)
          this.postFormData.append('descriptionVideoId', this.val1)
          var data = this.postFormData
          this.$confirm('컨텐츠를 수정하시겠습니까?', '수정', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'Success'
        }).then(() =>{
             this.loading = true;

          editmainExer(data)
          .then(response => {
              this.loading = false
                if(response === undefined) {
                  this.$message({
                      message: '컨텐츠를 수정할 수 없습니다.',
                      type: 'warning'
                      });
              } else {
                  this.$message({
                      message: '수정이 완료 되었습니다.',
                      type: 'success'});
                      this.$router.push({path:'/exercise/mainlist/maindetail'})
              }
            
           }) 
           .catch(err => {
             console.log(err)
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
        charaLen(add){
          console.log(add)
        return console.log(add.split('').length > 20? add.slice(0,20+'.....') : add)}
        
        
     },
    // }
}
</script>
