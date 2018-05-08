<template>
<div class="warmWrap" id="vList" v-loading = 'loading'>
  <h1>수정</h1>
  <el-form>
<div class="first_wrap">
<table class="el-table" cellspacing="0" cellpadding="0" >
  <tr class="el-table-column">
  <th rowspan="4" class="title_style" >기본 정보</th>
    <th style="width: 150px;">운동 분류</th>
    <td style="width: 403px;  padding: 10px 0 10px;">
      <el-select v-model="exerSelect" size="small">
        <el-option v-for="lists in exerKind" :value ="lists.id" :label="lists.name" :key="lists.id">
        </el-option>
      </el-select>
    </td>
    <th style="width: 150px;">운동 강도</th>
    <td>
      <el-select v-model="intensSelect" size="small">
        <el-option v-for="lists in intens" :value="lists.key" :label="lists.name" :key="lists.key">
          <span v-if="lists.key === 'HS'">상</span>
          <span v-if="lists.key === 'MS'">중</span>
          <span v-if="lists.key === 'LS'">하</span>
        </el-option>
      </el-select>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>컨텐츠 명</th>
    <td>
      <el-input :max-length="30" v-model="exerInput" size="small"></el-input>
    </td>
    <th>운동 효과</th>
    <td>
      <el-input :max-length="20" v-model="effectInput" class="effectStyle" size="small"></el-input>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>운동목적</th>
    <td style="padding: 10px 0 10px;">
        <el-form :inline="true" size="small">
            <el-form-item style="width: 150px;">
                <el-select v-model="muscleAreaCateId"  @click="whatDis()" size="small">
                    <el-option label="전체" :value="null" placeholder="전체">
                    </el-option>
                    <el-option :label="muscle.name" :key="muscle.name"  v-for="muscle in muscleResults" :value="muscle.id" >  
                    {{muscle.name}}
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="exerPurpose"  :disabled="muscleAreaCateId === null ? true: false" size="small">
                    <div v-for="muscle1 in muscleResults">
                        <el-option v-for="muscle2 in muscle1.childens" :key="muscle2.name" :label="muscle2.name" :value="muscle2.id">
                            {{muscle2.name}}
                        </el-option>
                    </div>
                </el-select>
            </el-form-item>
        </el-form>
    </td>
    <th rowspan="2">
        키워드
    </th>
    <td rowspan="2">
        <el-input v-model="keyword" class="effectStyle" size="small"></el-input> <span class="exam">예) #다이어트 #10대</span>
    </td>
  </tr>
  <tr  class="el-table-column">
    <th>운동 설명
    </th>
    <td style="padding: 0 0 10px;">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="text here"
        v-model="textarea">
      </el-input>
    </td>
  </tr>
  <tr>
    <th rowspan="3" class="title_style">이미지</th>
    <th class="separate">썸네일 이미지</th>
    <td colspan="2" class="separate" style="padding: 10px 0 10px 0; width: 600px;">
       <label class="file-label">
        <span class="el-button fileBtn" type="primary" plane size="small">이미지 추가</span>
        <input class="file-input" type="file" id="file" accept="image/*" @change="change()" style="display: none;" > 
      </label>
        <span class="file-name">
            {{todos1}}
            <el-dialog
                title="이미지 미리보기"
                :visible.sync="thumShow"
                >
                <img v-bind:src="thumbPath">
            </el-dialog>
        </span>
    </td>
    <td class="separate" >
        <el-button @click="thumShow = true" size="small" > 
                <div class="originname">
                이미지 미리보기
            </div>
            </el-button>
    </td>
  </tr>
  <tr>
    <th>중간 이미지</th>
    <td colspan="2" style="width: 600px;">
       <label class="file-label">
        <span class="el-button fileBtn" type="primary" plane size="small">이미지 추가</span>
        <input class="file-input" type="file" id="file1" accept="image/*" @change="change1()" style="display: none;" > 
      </label>
        <span class="file-name">
            {{todos2}}

            <el-dialog
                title="이미지 미리보기"
                :visible.sync="middleShow"
                >
                <img v-bind:src="midPath">
            </el-dialog>
        </span>
    </td>
    <td>
        <el-button @click="middleShow = true" size="small">  
            <div class="originname">
            이미지 미리보기
        </div>
        </el-button>
    </td>
  </tr>
  <tr>
    <th>상세 상단 이미지</th>
    <td colspan="2" style="padding: 10px 0 10px 0; width: 600px;">
       <label class="file-label">
      <span class="el-button fileBtn" type="primary" plane size="small">이미지 추가</span>
      <input class="file-input" type="file" id="file2" accept="image/*" @change="change2()" style="display: none;" > 
    </label>
      <span class="file-name">
                    {{todos3}}
                 
                      <el-dialog
                           title="이미지 미리보기"
                           :visible.sync="topShow"
                            >
                            <img v-bind:src="midPath">
                        </el-dialog>
      </span>
    </td>
    <td>
        <el-button @click="topShow = true" size="small" > 
            <div class="originname">
            이미지 미리보기
        </div>
        </el-button>
    </td>
  </tr>
  <tr>
    <th rowspan="3" class="title_style">
      동영상
    </th>
  <tr>
    <th class="mediaStart">운동 영상 종류</th>
    <td colspan="3" class="mediaStart">
      <el-radio v-model="radio1" :label="1">동영상 Only</el-radio>
      <el-radio v-model="radio1" :label="2">운동 조합</el-radio>
    </td>
  </tr>
  <tr>
    <td colspan="5">
      <table style="width: 100%; padding: 20px;" cellpadding="0" cellspacing="0">
        <tr v-if="onlyMedia()">
          <td>
            <el-form>
              <el-dialog :visible.sync="onlyShow" >
                <div class="mediaPopOver">
                    <h3>영상 찾아보기</h3>
                        <el-form class="searchBoxStyle">
                            <el-form size="mini" :inline="true">
                                <el-form-item label="검색기간 - 등록일" class="search_first"></el-form-item>
                                <el-form-item>
                                    <el-col style="margin-right: 10px;">
                                        <el-date-picker type="date" style="width: 100%; margin-right: 10px;" :clearable="false" v-model="search.startDate"></el-date-picker>   
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <el-col>
                                        <el-date-picker type="date"  style="width: 100%;" :clearable="false" v-model="search.endDate"></el-date-picker>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                            <el-form size="mini" :inline="true">
                                <el-form-item label="메뉴 1/2 depth"></el-form-item>
                                <el-form-item>
                                    <el-col>
                                    <el-select v-model="search.parentMenuId" @change="childDefault1()">
                                        <el-option label="전체" :value="null"></el-option>
                                        <el-option v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id">
                                        </el-option>
                                    </el-select>
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <el-col>
                                        <el-select v-model="search.menuId" placeholder="선택해 주세요." :disabled="search.parentMenuId === null">
                                            <span v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id" v-if="search.parentMenuId === item.id">
                                            <el-option v-for="child in item.children" :label="child.name" :value="child.id" :key="child.id" >
                                            </el-option>
                                            </span>
                                        </el-select>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                            <el-form size="mini" :inline="true">
                                <el-form-item label="파일명"></el-form-item>
                                <el-form-item>
                                    <el-col>
                                        <el-input :maxlength="30" v-model="search.originName">
                                        </el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="Code" label-width="60px">
                                    <el-col>
                                        <el-input  v-model="search.id" type="number">
                                        </el-input>
                                    </el-col>
                                </el-form-item>
                                <el-form-item class="member_btn_wrap">
                                    <el-col class="member_btn">
                                        <el-button type="info" icon="el-icon-search" @click="getMedia(); pageReset()" size="mini">SEARCH</el-button>
                                        <el-button type="warning" @click="mediaReset()" size="mini">RESEST</el-button>
                                    </el-col>
                                </el-form-item>
                            </el-form>
                                    
                                    </el-form>
                                    <div>
                                    <table class="search_table el-table"   align="center">
                                        <colgroup>
                                            <col width="50" />
                                            <col width="100" />
                                            <col width="130" />
                                            <col width="130" />
                                            <col width="300" />
                                            <col width="150" />
                                            <col width="100" />
                                        </colgroup>
                                        <thead class="el-table-column listTableHead">
                                        <tr>
                                            <th style="padding: 10px 0;">No</th>
                                            <th>Code</th>
                                            <th>메뉴 1depth</th>
                                            <th>메뉴 2depth</th>
                                            <th>파일명</th>
                                            <th>등록일</th>
                                            <th>선택</th>
                                        </tr>
                                        </thead>
                                        <tbody class="el-table-column listTable">
                                        <tr v-for="(lists, key) in results" :key="lists.id" @click="add6(lists.fileId)" align="center">
                                            <td style="padding: 10px;">{{ (results.length) - (++key) + 1}}</td>
                                            <td>0000{{ lists.fileId }}</td>
                                            <td>{{ lists.parentMenuName }}</td>
                                            <td>{{ lists.menuName }}</td>
                                            <td>{{ lists.originName }}</td>
                                            <td>{{ lists.createDateString }}</td>
                                            <td><el-button type="primary" plain size="small">선택</el-button></td>
                                        </tr>
                                        <tr v-show="mediaResultShow">
                                            <td colspan="8" align="center" style="padding: 40px;">검색결과가 없습니다.</td>
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
                                    <el-button @click="onlyShow = false" size="small">닫기</el-button>
                                    <el-button type="primary" @click="onlyShow = false" size="small">선택</el-button>
                                </span>
                                </el-dialog>
                            <el-button  @click="onlyShow = true; mediaOpen()" size="small" class="media_btn">추가</el-button>
                           
                                        <span v-for="lists in data4" :value="lists.id" :key="lists.id" style="display: inline-block;line-height: 70px; padding: 0 15px;"> {{ lists.originName }}
                                            <el-button @click="data4Show = true; videoPlayer(data4Path)" style="margin-left: 15px;" size="small" class="linkA">{{data4Name}}</el-button>
                                        </span>
                                        <span style="display: inline-block; line-height: 70px;">
                                            <el-dialog
                                                title="동영상 미리보기"
                                                :visible.sync = 'data4Show'
                                            >
                                                <videoP :id="data4Path" ref="form" />
                                            </el-dialog>
                                      </span>
                            </el-form>
                        </td>
                        </tr>
                        <tr v-if="mixMedia()">
                            <td colspan="3" style="width: 100%;">
                                <table style="width: 100%;" class="mixStyle"  cellpadding="0" cellspacing="0">
                                <tr>
                                    <th style="text-align: left; text-indent: 20px;">인트로</th>
                                </tr>
                                <tr>
                                    <td>
                                        <el-dialog
                                            :visible.sync="introShow"
                                           >
                                            
                                            <!--popoverlayout start-->
                                            <div class="mediaPopOver">
                                            <h3>영상 찾아보기</h3>
                                                <el-form class="searchBoxStyle">
                                                 <el-form size="mini" :inline="true">
                                                     <el-form-item label="검색기간 - 등록일" class="search_first"></el-form-item>
                                                     <el-form-item>
                                                    <el-col>
                                                        <el-date-picker type="date" :clearable="false" v-model="search.startDate"></el-date-picker>   
                                                    </el-col>
                                                    </el-form-item>
                                                    <el-form-item>
                                                    <el-col>
                                                        <el-date-picker type="date"  :clearable="false" v-model="search.endDate"></el-date-picker>
                                                    </el-col>
                                                    </el-form-item>
                                                 </el-form>
                                                    
                                    <!--datepicker end-->
                                                <el-form size="mini" :inline="true">
                                                    <el-form-item label="메뉴 1/2 depth"></el-form-item>
                                                    <el-form-item>
                                                        <el-col>
                                                        <el-select v-model="search.parentMenuId" @change="childDefault1()">
                                                            <el-option label="전체" :value="null"></el-option>
                                                            <el-option v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id">
                                                            </el-option>
                                                        </el-select>
                                                        </el-col>
                                                    </el-form-item>
                                                    <el-form-item>
                                                        <el-col>
                                                        <el-select v-model="search.menuId" placeholder="선택해 주세요." :disabled="search.parentMenuId === null">
                                                            <span v-for="item in mediaMenu" :label="item.name" :value="item.id" :key="item.id" v-if="search.parentMenuId === item.id" >
                                                            <el-option v-for="child in item.children" :label="child.name" :value="child.id" :key="child.id"  >
                                                            </el-option>
                                                            </span>
                                                        </el-select>
                                                        </el-col>
                                                    </el-form-item>
                                                </el-form>
                                                <el-form size="mini" :inline="true">
                                                    <el-form-item label="파일명"></el-form-item>
                                                    <el-form-item>
                                                        <el-col>
                                                            <el-input :maxlength="30" v-model="search.originName">
                                                            </el-input>
                                                        </el-col>
                                                    </el-form-item>
                                                    <el-form-item label="Code" label-width="60px"></el-form-item>
                                                    <el-form-item>
                                                        <el-col>
                                                            <el-input  v-model="search.id" type="number">
                                                            </el-input>
                                                        </el-col>
                                                    </el-form-item>
                                                    <el-form-item class="member_btn_wrap">
                                                        <el-col class="member_btn">
                                                            <el-button type="info" icon="el-icon-search" @click="getMedia(); pageReset()" size="mini">SEARCH</el-button>
                                                            <el-button type="warning" @click="mediaReset()" size="mini">RESEST</el-button>
                                                            </el-col>
                                                    </el-form-item>
                                                </el-form>
                                    </el-form>
                                                <div  v-loading="loading">
                                                <table class="el-table">
                                                <colgroup>
                                                    <col width="30" />
                                                    <col width="80" />
                                                    <col width="" />
                                                    <col width="" />
                                                    <col width="" />
                                                    <col width="" />
                                                </colgroup>
                                                    <thead class="el-table-column listTableHead">
                                                    <tr>
                                                        <th style="padding: 10px 0;">No</th>
                                                        <th>Code</th>
                                                        <th>메뉴 1depth</th>
                                                        <th>메뉴 2depth</th>
                                                        <th>파일명</th>
                                                        <th>등록일</th>
                                                        <th>미리보기</th>
                                                        <th>선택</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody class="el-table-column listTable">
                                                    <tr align="center" v-for="(lists, key) in results" :key="lists.id" @click="add1(lists.fileId)">
                                                        <td  style="padding: 10px;">{{ (results.length) - (++key) + 1}}</td>
                                                        <td>0000{{ lists.fileId }}</td>
                                                        <td>{{ lists.parentMenuName }}</td>
                                                        <td>{{ lists.menuName }}</td>
                                                        <td>{{ lists.originName }}</td>
                                                        <td>{{ lists.createDateString }}</td>
                                                        <td></td>
                                                        <td><el-button type="primary" plain size="small" >선택</el-button></td>
                                                    </tr>
                                                    <tr v-show="mediaResultShow">
                                                        <td colspan="8" align="center" style="padding: 40px;">검색 결과가 없습니다.</td>
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
                                                <el-button @click="introShow = false" size="small" >닫기</el-button>
                                                <el-button type="primary" @click="introShow = false" size="small">선택</el-button>
                                            </span>
                                        </el-dialog>
                                        <table class="media_result"   cellpadding="0" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <el-button @click="introShow = true; mediaOpen(); " size="small" style="margin: 10px;">찾아보기</el-button>
                                                        </td>
                                                        <td v-for="lists in data1"> 
                                                            {{ lists.originName }}
                                                        </td>
                                                        <td v-if="data1Name.length > 1">
                                                            <el-button size="small"  @click="data1Show = true;videoPlayer(data1Path)" class="linkA" style="margin-left: 15px"> {{data1Name}}</el-button>
                                                            <el-dialog title="동영상 미리보기" :visible.sync="data1Show">
                                                                <videoP :id="data1Path" ref="form" />
                                                            </el-dialog>
                                                        </td>
                                                        <td v-if="data1 <= 0 ">영상을 등록해 주세요.</td>
                                                    </tr>
                                                </tbody>
                                                
                                            </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                            <td>
                        <table cellpadding="0" cellspacing="0">
                        <tr>
                            <th class="titleTop">웜업</th>
                            <th><div class="restStyle">휴식시간(초)</div></th>
                            <th><el-input v-model="restWarm" class="restInput" size="small"></el-input></th>
                            <th class="titleBottom">
                                <el-button @click="warmShow = true" size="small">변경</el-button>
                            </th>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0" class= "resultsList">
                            <tr>
                                <th>Code</th>
                                <th>웜업 명칭</th>
                                <th>웜업 부위</th>
                                <th>촬영 모델</th>
                            </tr>
                            <tbody v-for="list in warmRender" :key="list.id" :value="list.id">
                                <tr v-for="lists in list" :key="lists.id" :value="lists.id">
                                <td>{{lists.id}}</td>
                                <td>{{lists.name}}</td>
                                <td>{{lists.warmUpCateName}}</td>
                                <td>{{lists.photoModelName}}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr v-if="warmRender <= 0">
                                    <td colspan="4">등록 해 주세요.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </td>
                </tr>
                <!--warmup TheEnd-->
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                        <tr>
                            <th class="titleTop">Main운동   </th>
                            <th><div class="restStyle">휴식시간(초)</div></th>
                            <th><el-input v-model="restMain" class="restInput" size="small"></el-input></th>
                            <th class="titleBottom">
                                <el-button @click="mainShow = true" size="small">변경</el-button>
                            </th>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0" class= "resultsList">
                            <tr>
                                <th>Code</th>
                                <th>운동 분류</th>
                                <th>웜업 명칭</th>
                                <th>사용 주동근</th>
                                <th>운동 강도</th>
                                <th>촬영 모델</th>
                                <th>족부압 데이터 유무</th>
                                <th>횟수 / 초</th>
                                <th>셋트</th>
                            </tr>
                            <tbody v-for="(list,index) in mainRender" :value="list.id" :key="list.id">
                                <tr v-for="(lists,index) in list" :valule="lists.id" :key="lists.id">
                                    <td>{{lists.id}}</td>
                                    <td>{{lists.exerKindCateName}}</td>
                                    <td>{{lists.name}}</td>
                                    <td>{{lists.muscleAreaCateName}}</td>
                                    <td>{{lists.intensityCd}}</td>
                                    <td>{{lists.photoModelName}}</td>
                                    <td>{{lists.isFootPressure? 'O': 'X'}}</td>
                                    <td style="width: 80px;">
                                        <el-input v-model="lists.mainCount" class="mainInput" size="small"></el-input>
                                    </td>
                                    <td style="width: 80px;">
                                        <el-input v-model="lists.mainSet" class="mainInput" size="small"></el-input>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot v-if="mainRender <= 0" >
                                <tr>
                                    <td colspan="9">등록 해 주세요.</td>
                                </tr>
                            </tfoot>
                        </table>

                    </td>
                </tr>
                <!--main Exercise The End-->
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0">
                        <tr>
                            <th class="coolTop">쿨다운 </th>
                            <th>
                                <el-button @click="coolShow = true" size="small">변경</el-button>
                            </th>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0" class= "resultsList">
                            <tr>
                                <th>Code</th>
                                <th>쿨다운 명칭</th>
                                <th>촬영 모델</th>
                            </tr>
                            <tbody v-for="(list,index) in coolRender" :value="list.id" :key="list.id">
                                <tr v-for="lists in list" :value="lists.id" :key="lists.id">
                                    <td>{{lists.id}}</td>
                                    <td>{{lists.name}}</td>
                                    <td>{{lists.photoModelName}}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr v-if="coolRender <= 0">
                                    <td colspan="3">등록 해 주세요.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </td>
                </tr>
            </table>
            </td>
        </tr>
                        </table>
                    </td>
                </tr>


</table>


    </td>
  </tr>
</table>
<div class="themePopWrap">
<el-dialog
    :visible.sync="coolShow"
    center>
        <!--popoverlayout start-->
        <h3>영상 찾아보기</h3>
        <!--popoverlayout start-->
        <el-form class="searchBoxStyle">
            <el-form size="mini" :inline="true">
                <el-form-item label="쿨다운 명칭"></el-form-item>
                <el-form-item>
                    <el-input  class="input_tag" v-model="coolSearch.name">
                
                    </el-input>
                </el-form-item>
                <el-form-item label="촬영 모델"></el-form-item>
                <el-form-item>
                    <el-select v-model="coolSearch.photoModelId"  >
                        <el-option label="전체" :value="null"></el-option>
                        <el-option :label="modelItem3.name"  v-for="modelItem3 in model" :value="modelItem3.id" :key="modelItem3.name">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form size="mini" :inline="true">
                <el-form-item label="Code">
                </el-form-item>
                <el-form-item>
                    <el-input  class="input_tag" v-model="coolSearch.id" type="number">
                
                    </el-input>
                </el-form-item>
                <el-form-item class="member_btn_wrap">
                    <el-col class="member_btn">
                        <el-button type="info" icon="el-icon-search" @click="coolActive()" size="mini">SEARCH</el-button>
                        <el-button type="warning" size="mini">RESEST</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-form>
        <el-form>
            </el-form>
            <table class="transMenu">
        <colgroup>
            <col width="100" />
            <col width="400" />
            <col width="150" />
          </colgroup>
            <tr>
                <td>code</td>
                <td>쿨다운 명칭</td>
                <td>촬영모델</td>
            </tr>
        </table>
        <table class="transMenuB">
        <colgroup>
            <col width="100" />
            <col width="400" />
            <col width="150" />
          </colgroup>
            <tr>
                <td>code</td>
                <td>쿨다운 명칭</td>
                <td>촬영모델</td>
            </tr>
        </table>
            <el-transfer
                v-model="coolList"
                :data="coolData"
                :titles="['code', 'Add List' ]"
                :props="{
                    key: 'index',
                    label: 'label'
                }"
                
                :render-content="renderFuncCool"
                id="box"
                >
                </el-transfer>
            <div v-model="coolResults">
            </div>  
    <span slot="footer" class="dialog-footer">
        <el-button @click="coolShow = false" size="small">닫기</el-button>
        <el-button type="primary" @click="coolShow = false; coolAdd()" size="small">선택</el-button>
    </span>
    </el-dialog>

<el-dialog
    title="영상 찾아보기"
    :visible.sync="mainShow"
    center>
    <!--popoverlayout start-->
    <h3>영상 찾아보기</h3>
    <el-form class="searchBoxStyle">
        <el-form :inline="true" size="mini">
            <el-form-item label="운동 분류"></el-form-item>
            <el-form-item>
                <el-select v-model="mainSearch.actExerKindCateId">
                    <el-option label="전체" :value="null"></el-option>
                    <el-option :label="exerKindItem.name" :value="exerKindItem.id"  v-for="exerKindItem in exerKind" :key="exerKindItem.id">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="촬영 모델"></el-form-item>
            <el-form-item>
                <el-select v-model="mainSearch.photoModelId" >
                    <el-option label="전체" :value="null"></el-option>
                    <el-option :label="modelItem2.name"  v-for="modelItem2 in model" :value="modelItem2.id" :key="modelItem2.name">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-form :inline="true" size="mini">
            <el-form-item label="사용 주동근"></el-form-item>
            <el-form-item>
                <el-select v-model="mainSearch.muscleAreaCateId">
                    <el-option label="전체" :value="null" >
                    </el-option>
                    <el-option :label="muscle.name" :key="muscle.name"  v-for="muscle in muscleResults" :value="muscle.id" >
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="족부압 데이터"></el-form-item>
            <el-form-item>
                <el-select v-model="mainSearch.isFootPressure">
                    <el-option label="전체" :value="null">
                    </el-option>
                    <el-option label="있음" :value="true">
                    </el-option>
                    <el-option label="없음" :value="false"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-form :inline="true" size="mini">
            <el-form-item label="운동 강도"></el-form-item>
            <el-form-item>
                <el-select v-model="mainSearch.intensityCd" >
                    <el-option label="전체" :value="null"></el-option>
                    <el-option v-for="lists in intens" :label="lists.name" :value="lists.key" :key="lists.key">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="운동 명칭"></el-form-item>
            <el-form-item>
                <el-input  :maxlength="30" v-model="mainSearch.name">

                </el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true" size="mini">
            <el-form-item label="코드"></el-form-item>
            <el-form-item>
                <el-input :maxlength="10" v-model="mainSearch.id" type="number">
                </el-input>
            </el-form-item>
            <el-form-item class="member_btn_wrap">
                <el-col class="member_btn">
                    <el-button type="info" icon="el-icon-search" @click="mainActive()" size="mini">SEARCH</el-button>
                    <el-button type="warning" size="mini">RESEST</el-button>
                </el-col>
            </el-form-item>
        </el-form>
        </el-form> 
        <table class="transMenu">
        <colgroup>
            <col width="95" />
            <col width="150" />
            <col width="120" />
            <col width="30" />
            <col width="100" />
            <col width="50" />
          </colgroup>
            <tr>
                <td>Code</td>
                <td>운동명칭</td>
                <td>사용<br>주동근</td>
                <td>운동<br>강도</td>
                <td>촬영모델</td>
                <td>족부압<br>데이터</td>
            </tr>
        </table>
        <table class="transMenuB">
        <colgroup>
            <col width="95" />
            <col width="140" />
            <col width="120" />
            <col width="30" />
            <col width="100" />
            <col width="50" />
          </colgroup>
            <tr>
                <td>Code</td>
                <td>운동명칭</td>
                <td>사용<br>주동근</td>
                <td>운동<br>강도</td>
                <td>촬영모델</td>
                <td>족부압<br>데이터</td>
            </tr>
        </table>
        <el-transfer
            v-model="mainList"
            :data="mainData"
            :titles="['code', 'Add List' ]"
            :props="{
                key: 'index',
                label: 'label'
            }"
            
            :render-content="renderFuncMain"
            id="box"
            >
            </el-transfer>
        <div v-model="mainResults">
            
        </div>  
        
    <span slot="footer" class="dialog-footer">
        <el-button @click="mainShow = false" size="small">닫기</el-button>
        <el-button type="primary" @click="mainShow = false; mainAdd()" size="small">선택</el-button>
    </span>
</el-dialog>


<el-dialog
    :visible.sync="warmShow"
    center>
            <!--popoverlayout start-->
        <h3>영상 찾아보기</h3>
    <el-form class="searchBoxStyle">
        <el-form size="mini" :inline="true">
            <el-form-item label="웜업 부위"></el-form-item>
            <el-form-item>
                <el-select v-model="warmSearch.warmUpCateId">
                    <el-option label="전체" :value="null"></el-option>
                    <el-option v-for="lists in part" :key="lists.id" :value="lists.id" :label="lists.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="촬영 모델"></el-form-item>
            <el-form-item>
                <el-select v-model="warmSearch.photoModelId"  >
                    <el-option label="전체" :value="null"></el-option>
                    <el-option :label="modelItem1.name"  v-for="modelItem1 in model" :value="modelItem1.id" :key="modelItem1.name">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-form size="mini" :inline="true">
            <el-form-item label="웜업명칭"></el-form-item>
            <el-form-item>
                <el-input  class="input_tag" v-model="warmSearch.warmCateId">
            
                </el-input>
            </el-form-item>
                <el-form-item label="Code" label-width="60px"></el-form-item>
            <el-form-item>
                <el-input  class="input_tag" v-model="warmSearch.id" type="number">
            
                </el-input>
            </el-form-item>
        </el-form>
        <el-form size="mini" :inline="true">
             <el-form-item class="member_btn_wrap">
                <el-col class="member_btn">
                    <el-button type="info" icon="el-icon-search" @click="warmActive()" size="mini">SEARCH</el-button>
                    <el-button type="warning" size="mini">RESEST</el-button>
                </el-col>
            </el-form-item>
        </el-form>
        </el-form>  
        <table class="transMenu">
        <colgroup>
            <col width="80" />
            <col width="300" />
            <col width="100" />
            <col width="80" />
          </colgroup>
            <tr>
                <td>Code</td>
                <td>웜업 명칭</td>
                <td>웜업 부위</td>
                <td>촬영모델</td>
            </tr>
        </table>
        <table class="transMenuB">
        <colgroup>
            <col width="80" />
            <col width="300" />
            <col width="100" />
            <col width="80" />
          </colgroup>
            <tr>
                <td>Code</td>
                <td>웜업 명칭</td>
                <td>웜업 부위</td>
                <td>촬영모델</td>
            </tr>
        </table>
            <el-transfer
                v-model="warmList"
                :data="data3"
                :titles="['code', 'Add List' ]"
                :props="{
                    key: 'index',
                    label: 'label'
                }"
                :render-content="renderFunc"
                >
            </el-transfer>
        <span slot="footer" class="dialog-footer">
            <el-button @click="warmShow = false" size="small">닫기</el-button>
            <el-button type="primary" @click="warmAdd()" size="small">선택</el-button>
        </span>
    </el-dialog>
    </div>
</div>
  <div class="btnWrap">
    <el-button type="info" size="small" class="submitBtn" @click="themeRegist()">저장</el-button>
    <router-link v-bind:to="{path: '/exercise/themecontents/themedetail'}">
    <el-button type="warning" size="small" class="submitBtn">취소</el-button>
    </router-link>
    <!--<el-button type="warning" size="small" class="submitBtn">비활성화</el-button>-->
  </div>
  
  </el-form>
 

 
</div>
</template>

<script>
import { themeDetail, EditTheme, warmActive, getMainActive, getCoolActive, getExerKind, getIntensity, getModel, getPurposeCategory, getEffectCd, GetVideoMenus, getMedia, GetWarmupPart, getvideoUrl } from '@/api/exercise'
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
        topShow: false,
        middleShow: false,
        thumShow: false,
        postFormData: new FormData(),
        addData: '',
        addData1:'',
        loading: false,
        warmActions: '',
        files: '',
        warm: '',
        main: '', 
        cool: '',
        detail: '',
        mainActions: [],
        coolActions: '',
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
        mediaResultShow: '',
        radio: '',
        effectUnit: '',
        textarea: '',
        todos1:'',
        todos2: '',
        todos3: '',
        todos: '',
        results:'',
        keyword: '',
        data3:'',
        exerPurpose: '',
         search: {
            id: '',
            parentMenuId: null,
            menuId: null,
            originName: '',
            searchColumn: 'CreateDate',
            startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            endDate: new Date()
        },
        paging: {
          page: 1,
          pageSize: 10,
          totalPages: 0,
          totalRecords: 0,
          orderBy: 'CreateDate',
          ascending: true
        },
        warmSearch: {
            id: 0,
            name: '',
            warmUpCateId: '',
            photoModelId: '',
            searchColumn: '',
            startDate: '',
            endDate: new Date()
        },
        warmPaging: {
            page: 1,
            pageSize: 10,
            totalPages: 0,
            totalRecords: 0,
            orderBy: 'CreateDate',
            ascending: true
        },
        mainSearch: {
            id: 0,
            name: '',
            actExerKindCateId: null,
            muscleAreaCateId: null,
            muscleAreaCateDepth: null,
            intensityCd: null,
            photoModelId: null,
            isFootPressure: null,
            isActive: null,
            searchColumn: 'CreateDate',
            startDate: '2017-01-01',
            endDate: new Date()
        },
        mainPaging: {
            page: 1,
            pageSize: 10,
            totalPages: 0,
            totalRecords: 0,
            orderBy: 'CreateDate',
            ascending: true
        },
        coolSearch: {
            id: 0,
            name: '',
            photoModelId: null,
            searchColumn: "CreateDate",
            startDate: '',
            endDate: new Date()
        },
        coolPaging: {
            page: 1,
            pageSize: 10,
            totalPages: 0,
            totalRecords: 0,
            orderBy: 'CreateDate',
            ascending: true
        },
        data4: null,
        introShow: false,
        warmShow:false,
        onlyShow: false,
        mainShow: false,
        coolShow: false,
        radio1: 2,
        val6:'',
        videoUrl: '',
        part: '',
        data1: null,
        pSelect: '',
        val1: '',
        warmAct: '',
        warmList: [],
        warmRender: '',
        mainData: '',
        mainList: [],
        mainResults: '',
        mainRender: '',
        coolData: '',
        coolList: [],
        coolResults: '',
        coolRender: '',
        isMix: '',
        restWarm: '',
        restMain: '',
        mainCount: [],
        mainSet: [],
        mainArr: '',
        warmArr: '',
        coolArr: '',
        intro: '',
        thumName: '',
        thumbPath: '',
        midImg: '',
        midPath: '',
        topImg: '',
        topPath: '',
        mainr:'',
        data1Name: '',
        data1Path: '',
        data1Show: false,
        data4Name: '',
        data4Path: '',
        data4Show: false,
        renderFunc(h, option) {
          return <table  style="width: 612px;">
          <colgroup>
            <col width="80" />
            <col width="300" />
            <col width="100" />
            <col width="80" />
          </colgroup>
          <thead>
            <tr>
              <td>0000{ option.label }</td>
                <td>{ option.arrName }</td>
                <td>{ option.arrCateName }</td>
                <td>{ option.arrModel }</td>
            </tr>
          </thead>
          </table>;
        },
         renderFuncMain(h, option1) {
          return <table  style="width: 612px;">
           <colgroup>
            <col width="95" />
            <col width="150" />
            <col width="120" />
            <col width="30" />
            <col width="100" />
            <col width="50" />
          </colgroup>
          <thead>
            <tr>
              <td>0000{ option1.label }</td>
                <td>{ option1.arrName }</td>
                <td>{ option1.arrAreaCate }</td>
                <td>{ option1.arrIntens }</td>
                <td>{ option1.arrModel }</td>
                <td>{ option1.arrFoot? 'O':'X' }</td>
            </tr>
          </thead>
          </table>;
        },
        renderFuncCool(h, option2) {
          return <table   style="width: 612px;">
          <col width="100" />
            <col width="400" />
            <col width="150" />
          <thead>
            <tr>
              <td>0000{ option2.label }</td>
                <td>{ option2.arrName }</td>
                <td>{ option2.arrModel }</td>
            </tr>
          </thead>
          </table>;
        }
      } 
    },
   
    created() {
        this.getDetail()
      this.getExer()
      this.getIntens()
      this.getModel()
      this.getUnit()
      this.getMedia()
      this.getPart()
      this.mediaMenu()
      this.getMuscle()
    this.mainActive()
    this.warmActive()
    this.coolActive()
    },
     methods: {
         videoPlayer(val){
             var data = {fileId: val}
             getvideoUrl(data)
             .then(response => {
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
         getDetail(){
             this.loading = true
          var id = localStorage.getItem('id')
          var data = {id: id}
          themeDetail(data)
          .then(response => {
              this.loading = false
              this.detail = response.theme
              this.files = response.files
              this.warm = response.warmupData
              this.main = response.mainData
              this.cool = response.cooldownData
            //   alert(this.detail.isMix)
           
              if(this.detail.isMix === false) {
                  this.radio1 = 1
                  this.data4 = this.files.filter(item => {
                  return item.fileCd === "TM"
              })
              this.data4Name = this.files.filter(item => {
                  return item.fileCd === "TM"
              })[0].originName
              this.data4Path = this.files.filter(item => {
                  return item.fileCd === "TM"
              })[0].id
              this.val6 = this.data4[0].id
              } else {
                    this.radio1 = 2
                    var intro = this.files.filter(item => {
                        return item.fileCd ==='TI'})
                    this.data1 = intro
                    this.data1Name = this.files.filter(item => {
                        return item.fileCd ==='TI'})[0].originName
                    this.data1Path = this.files.filter(item => {
                        return item.fileCd ==='TI'})[0].id
                    this.addData1 = this.data1[0].id
                    
                    this.val1 = this.data1[0].id
                    this.restWarm = this.warm.restTime
                    this.restMain = this.main.restTime
              }
            //   alert(JSON.stringify(this.warm.actions))
              
              this.exerSelect = this.detail.exerKindCateId
              this.intensSelect = this.detail.intensityCd
              this.exerInput = this.detail.name
              this.effectInput = this.detail.effect
              this.exerPurpose = this.detail.purposeCateId
              this.keyword = this.detail.keyword
              this.textarea = this.detail.description
              var thumb = this.files.filter(item => {
                return item.fileCd === 'TH'})[0].originName
            this.todos1 = thumb
            var middle = this.files.filter(item => {
                return item.fileCd === 'MP'})[0].originName
            this.todos2 = middle
            var top = this.files.filter(item => {
                return item.fileCd === 'TP'})[0].originName
            this.todos3 = top

            
           
           this.thumName = this.files.filter(item => {
                  return item.fileCd === "TH"
              })[0].originName
              this.thumbPath = this.files.filter(item => {
                  return item.fileCd === "TH"
              })[0].logicalPath

              this.midImg = this.files.filter(item => {
                  return item.fileCd === "MP"
              })[0].originName
              this.midPath = this.files.filter(item => {
                  return item.fileCd === "MP"
              })[0].logicalPath

              this.topImg = this.files.filter(item => {
                  return item.fileCd === "TP"
              })[0].originName
              this.topPath = this.files.filter(item => {
                  return item.fileCd === "TP"
              })[0].logicalPath

            this.getMuscle()
            this.mainActive()
            this.warmActive()
            this.coolActive()
          })

      },   
        
         warmAdd(){
             this.warmShow = false
             var warm = []
             
             for(var i=0; i <= this.warmList.length; i++) {
               
             warm.push(this.warmAct.filter(item => {
                 return item.id === this.warmList[i];
             })) 
             }
             this.warmRender = warm
         },
         mainAdd(){
             var main = []
             
             for(var i=0; i <= this.mainList.length; i++) {
               
             main.push(this.mainResults.filter(item => {
                 return item.id === this.mainList[i];
             })) 
             }
             this.mainRender = main
             this.mainr = [].concat.apply([], this.mainRender);
             this.mainRender[0].mainCounter = this.mainCount
         },
         coolAdd(){
             var cool = []
             
             for(var i=0; i <= this.coolList.length; i++) {
               
             cool.push(this.coolResults.filter(item => {
                 return item.id === this.coolList[i];
             })) 
             }
             this.coolRender = cool
         },
    
     warmActive() {
            var warmA = { search: this.warmSearch, paging: this.warmPaging}
             warmActive(warmA)
            .then(response => {
                this.warmAct = response.results
                var data = [];
                this.data3 = data
                var warmList =[]
                var warmT = []
            for(var w in this.warm) {
                for(var i in this.warm[w]) {
                    var warm = this.warm[w][i].actionId
                   warmT.push(warm)
                    this.warmList = warmT
                     warmList.push(this.warmAct.filter(item => {
                        return item.id === warm   
                        
                         }) )   
                    }   
                    
                }
                this.warmRender = warmList
                for ( var i = 0; i < this.warmAct.length; i++) {
                    
                    for(var key in this.warmAct[i]) {
                        var key = this.warmAct[i]
                        } 
                        var arrName = key.name
                        var arrPart = key.warmUpCateId
                        var arrCateName = key.warmUpCateName
                        var arrModel = key.photoModelName
                        
                        data.push(
                        {
                            label: key.id.toString(),
                            index: key.id
                        })  
                        this.data3[i].arrName = key.name
                        this.data3[i].arrPart = key.warmUpCateId
                        this.data3[i].arrModel = key.photoModelName
                        this.data3[i].arrCateName = key.warmUpCateName
                }
            })
        },
        mainActive() {
            var main ={ search: this.mainSearch, paging: this.mainPaging}
            getMainActive(main)
            .then(response => {
                this.mainResults = response.results
                var mainList = []
                var mainList1 = []
                this.mainResults[0].mainSet = this.mainSet
                this.mainResults[0].mainCount = this.mainCount
                var data = [];
                var mainT = []
                this.mainData = data
                 for(var m in this.main) {
                for(var x in this.main[m]) {
                    var mainId = this.main[m][x].actionId
                    
                    mainT.push(this.main[m][x].actionId)
                    
                    this.mainList = mainT
                    mainList.push(this.mainResults.filter(item => {
                        return item.id === mainId
                    }))
                   this.mainActions = [].concat.apply([], mainList)
                   if(this.mainActions.length > 0){
                    this.mainActions[x].mainSet = this.main[m][x].set
                    this.mainActions[x].mainCount = this.main[m][x].count
                   }
                    // mainList1.push(this.mainActions)
                    this.mainRender = [this.mainActions]
                }
                 }
                for ( var i = 0; i < this.mainResults.length; i++) {
                    
                    for(var key in this.mainResults[i]) {
                        var key = this.mainResults[i]
                        } 
                        var arrCateName = key.actExerKindCateName
                        var arrName = key.name
                        var arrAreaCate = key.muscleAreaCateName
                        var arrIntens = key.intensityCd
                        var arrModel = key.photoModelName
                        var arrFoot = key.isFootPressure
                        
                        data.push(
                        {
                            label: key.id.toString(),
                            index: key.id
                        })  
                        this.mainData[i].arrCateName = key.actExerKindCateName
                        this.mainData[i].arrName = key.name
                        this.mainData[i].arrAreaCate = key.muscleAreaCateName
                        this.mainData[i].arrIntens = key.intensityCd
                        this.mainData[i].arrModel = key.photoModelName
                        this.mainData[i].arrFoot = key.isFootPressure
                }
               
            })
        },
        coolActive() {
            var cool = {search: this.coolSearch, paging: this.coolPaging}
            getCoolActive(cool)
            .then(response => {
                this.coolResults = response.results

                var data = [];
                this.coolData = data
                var coolList = []
                var coolT = []
                for(var w in this.cool) {
                for(var i in this.cool[w]) {
                    var coolId =  this.cool[w][i].actionId  
                    coolT.push(coolId)
                    this.coolList = coolT
                    
                    coolList.push(this.coolResults.filter(item => {
                        return item.id === coolId
                    }) )
                }
                }
            //    coolList.splice(1, -1)
                this.coolRender = coolList

                
                for ( var i = 0; i < this.coolResults.length; i++) {
                    
                    for(var key in this.coolResults[i]) {
                        var key = this.coolResults[i]
                        } 
                        var arrName = key.name
                        var arrModel = key.photoModelName

                        
                        data.push(
                        {
                            label: key.id.toString(),
                            index: key.id
                        })  
                        this.coolData[i].arrName = key.name
                        this.coolData[i].arrModel = key.photoModelName
                        
                }
                
            })
        },
       onlyMedia() {
         if(this.radio1 === 1){
         return true
         }
       },
       mixMedia() {
         if(this.radio1 === 2){
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
           this.addData = this.val6
           this.addData1 = this.val1
       },
       add6(val){
        this.onlyShow = false
         this.val6 = val
          var results = this.results

         this.data4= this.results.filter(item => {
           return item.fileId === val
         }) 
         this.postFormData.append('themeVideoId', this.val6)

          var list = results.filter(item => {
                return item.fileId === this.val6
              })[0]
            var index = results.indexOf(list)
            results.splice(index, 1)
          this.results = results
            if(this.addData !== undefined) {
              var getCheer = { search: this.search, paging: this.paging}
                getMedia(getCheer)
                .then(response => { 
              this.resultOrigin = response.results
              
              this.results.push(this.resultOrigin.filter(item => {
                    // return item.fileId === JSON.parse(getItem)
                    return item.fileId === this.addData
                  })[0]) 
            })
          }
       },
      add1(val){
          this.introShow = false
         this.val1 = val
          var results = this.results
         this.data1= this.results.filter(item => {
           return item.fileId === val
         }) 

          var list = results.filter(item => {
                return item.fileId === this.val1
              })[0]
            var index = results.indexOf(list)
            results.splice(index, 1)
          this.results = results
            if(this.addData1 !== '') {
              var getCheer = { search: this.search, paging: this.paging}
                getMedia(getCheer)
                .then(response => { 
              this.resultOrigin = response.results
              
              this.results.push(this.resultOrigin.filter(item => {
                    return item.fileId === this.addData1
                  })[0]) 
            })
          }
       },
      getExer(){
        getExerKind()
            .then(response => {
              this.exerKind = response.results
              this.listLoading = false
          }).catch(response => {
              this.fetchSuccess = false
              console.log(response)
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
        getPurposeCategory()
            .then(response => {
              this.muscleResults = response.results
              for( var i in this.muscleResults ){
                var arrParent = this.muscleResults
                var arrList = arrParent[i].childens
                var newarr = []
                for(var x = 0; x < arrList.length; x++) {
                  if(arrList[x].id === this.exerPurpose) {
                  this.muscleAreaCateId = arrParent.filter(item => {
                     return item.childens === arrList
                   })[0].id
                  }
                  
                }
              }
          }).catch(response => {
              this.fetchSuccess = false
              console.log(response)
          })
        },
        getUnit() {
          getEffectCd()
          .then(response => {
            this.effectUnit = response.results
          })
        },
      getMedia() {
          this.loading = true
          var getCheer = { search: this.search, paging: this.paging}
          getMedia(getCheer)
          .then(response => {
              this.loading = false
            this.results = response.results
            this.paging = response.paging
            if(this.results.length <= 0){
                this.mediaResultShow = true
            } else {
                this.mediaResultShow = false
            }
              

          }).catch(response => {
            console.log(response)
          })
        },
        mediaMenu() {
          GetVideoMenus()
          .then(response => {
            this.mediaMenu = response.result
          })
        },
         getPart(){
        var u = null
        GetWarmupPart(u)
          .then(response => {
          this.part = response.results
        })
      },
       themeRegist() {
           console.log(this.mainr)
             if(this.exerInput <= 0) {
                this.$notify.error({
                    title: 'Error',
                    message: '컨텐츠 명을 입력해 주세요.'
                });
            } else if(this.effectInput <= 0) {
                this.$notify.error({
                    title: 'Error',
                    message: '운동효과를 입력해 주세요.'
                });
            } else if(this.textarea <= 0) {
                this.$notify.error({
                    title: 'Error',
                    message: '운동설명을 입력해 주세요.'
                });
            } else if(this.todos1 <= 0 && this.thumName <= 0){
                this.$notify.error({
                    title: 'Error',
                    message: '썸네일 이미지를 등록해 주세요.'
                });
            } else if(this.todos2 <= 0 && this.midImg <= 0) {
                this.$notify.error({
                    title: 'Error',
                    message: '중간 이미지를 등록해 주세요.'
                });
            } else if(this.todos3 <= 0 && this.topImg <= 0) {
                this.$notify.error({
                    title: 'Error',
                    message: '상세 상단 이미지를 등록해 주세요.'
                });
            } 
            else if(this.radio1 === 1 && this.radio === true && this.data4 <= 0 ) {
                    this.$notify.error({
                        title: 'Error',
                        message: '운동영상을 등록해 주세요.'
                    });
            } 
            else if(this.radio1 === 1 && this.radio === false && this.linkUrl <= 0 ) {
                    this.$notify.error({
                        title: 'Error',
                        message: '외부링크를 등록해 주세요.'
                    });
            } 
             else if(this.data1 <= 0 && this.radio1 === 2) {
                    this.$notify.error({
                        title: 'Error',
                        message: '인트로 영상을 등록해 주세요.'
                    });
                } else if(this.warmRender <= 0 && this.radio1 === 2) {
                    this.$notify.error({
                        title: 'Error',
                        message: '웜업 영상을 추가해 주세요.'
                    });
                } else if(this.restWarm <= 0 && this.radio1 === 2){
                    this.$notify.error({
                        title: 'Error',
                        message: '웜업 휴식시간을 입력해 주세요.'
                    });
                } else if(this.mainRender <= 0 && this.radio1 === 2){
                    this.$notify.error({
                        title: 'Error',
                        message: '메인운동 영상을 추가해 주세요.'
                    });
                } else if(this.restMain <= 0 && this.radio1 === 2) {
                    this.$notify.error({
                        title: 'Error',
                        message: '메인운동 휴식시간을 입력해 주세요.'
                    });
                } 
                else if(this.mainr !== ''){
                    if(this.radio1 === 2 &&this.mainr.filter(item => {
                            return item
                        }).filter(item => {
                            return item.mainCount
                        }).length < this.mainr.length)
                        {
                    this.$notify.error({
                        title: 'Error',
                        message: '횟수 / 초를 입력해 주세요.'
                    });
                    }
                    else if(this.radio1 === 2 && this.mainr.filter(item => {
                                return item
                            }).filter(item => {
                                return item.mainSet
                            }).length <  this.mainr.length )
                            {
                        this.$notify.error({
                            title: 'Error',
                            message: '셋트를 입력해 주세요.'
                        });
                    }
                }
                 else if(this.coolRender <= 0 && this.radio1 === 2){
                    this.$notify.error({
                        title: 'Error',
                        message: '쿨다운 영상을 추가해 주세요.'
                    });
                }
            else {

               this.postFormData.append('name', this.exerInput)
             this.postFormData.append('effect', this.effectInput)
             this.postFormData.append('description', this.textarea)
             this.postFormData.append('keyword', this.keyword)
             this.postFormData.append('exerKindCateId', this.exerSelect)
             this.postFormData.append('intensityCd', this.intensSelect)
             this.postFormData.append('purposeCateId', this.exerPurpose)
             

                 if(this.radio1 === 1) {
                 this.isMix = false
                 this.postFormData.append('isMix', false)
                 this.postFormData.append('themeVideoId', this.val6)
                } else if(this.radio1 === 2) {
                 this.isMix = true
                 this.postFormData.append('isMix', true)
                 this.postFormData.append('themeIntroVideoId', this.val1 )
                 // Warm 활성화
             var warmList = [].concat.apply([], this.warmRender);
             var warmActions = []
             var warmArr = []
            for(var u in warmList){       

             var warmId = warmList[u].id
            warmActions.push({
                    "actionId" : warmId, "sort": JSON.parse(u) + 1, "count" : 1, "set": 1
                })
            }
            warmArr.push(
                {
                    'restTime' : this.restWarm,  'actions' : warmActions
                })
                this.warmArr = warmArr
            this.postFormData.append('warmupData',  JSON.stringify(this.warmArr[0]))

            // Cool 활성화
             var coolList = [].concat.apply([], this.coolRender);
             var coolActions = []
             var coolArr = []
            for(var x in coolList){       

             var coolId = coolList[x].id
            coolActions.push({
                    "actionId" : coolId, "sort": JSON.parse(x) + 1, "count" : 1, "set": 1
                })
            }
            coolArr.push(
                {
                    'restTime' : 0,  'actions' : coolActions
                })
            this.coolArr = coolArr
            this.postFormData.append('cooldownData', JSON.stringify(this.coolArr[0]))
            
            // Main 활성화
             var mainList = [].concat.apply([], this.mainRender);
             var mainActions = []

            for(var i in mainList){       
             var mainCount = mainList[i].mainCount
             var mainSet = mainList[i].mainSet
             var mainId = mainList[i].id
             var mainArr = []
            mainActions.push({
                    "actionId" : mainId, "sort": JSON.parse(i) + 1, "count": mainCount, "set": mainSet 
                })
            }
            mainArr.push(
                {
                    'restTime' : this.restMain,  'actions' : mainActions
                })
                this.mainArr = mainArr
        
       
            this.postFormData.append('mainData',JSON.stringify(this.mainArr[0]))

             }  
            var id = localStorage.getItem('id')
            this.postFormData.append('themeId', id)
            
            

            var data = this.postFormData
        this.$confirm('컨텐츠를 수정하시겠습니까?', '등록', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'Success'
        }).then(() =>{
            this.loading = true
            EditTheme(data)
             .then(response => {
                 this.loading = false
                 if(response === undefined) {
                    this.$message({
                        message: '컨텐츠를 수정할 수 없습니다.',
                        type: 'warning'
                        });
                    this.postFormData = new FormData()
                } else {
                    this.$message({
                        message: '수정이 완료 되었습니다.',
                        type: 'success'});
                        this.$router.push({path: '/exercise/themecontents'})
                }
                
                
             })
              })
             .catch(() => {
                this.loading = false
                this.$message.info('취소 되었습니다.'); 
                });
            }
         },
    pageReset(){
        this.paging.page = 1
    },
    childDefault1(){
          this.search.menuId = null
        },
      active(active) {
          var id = localStorage.getItem('id')
          if(active === true) {
            var isActive = false
          } else {
            var isActive = true
          }
          var data = {themeId: id, isActive: isActive}
          themeActive(data)
          .then(response => {
            this.submitForm()
            this.$message({
              message: isActive ? '활성화 되었습니다.' : '비활성화 되었습니다.',
              center: true,
              type: 'success'
            });
          })
        },
      
    }
}
</script>
<style scoped>
.warmWrap {margin: 0 50px;}
h1 {
    margin: 35px 0 25px;
    text-indent: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid #cdcdcd;
}
h3{font-size: 14px; padding: 10px;; margin:  0 0 10px 0; text-align: center; background-color:#fcf7f7;}
.file-label {float: left;}
 .img_table {width: 75%;}
 .media_btn {float: left; margin: 20px 0 0 20px;}
.media_result {width: 100%; display: block; line-height: 31px; border-bottom: 1px solid #ded5d5;}
.greed{outline: none;}
.el-table {border: 1px solid #ded5d5;}
.el-table th {text-align: center;}
.el-table td {border: 0;}
.title_style { padding:30px 10px; border-right: 1px solid #ded5d5; border-top: 1px solid #ded5d5; width: 110px; background-color: #f5f5f5;}
.el-table td.separate {border-top: 1px solid #ded5d5;}
.el-table th.separate {border-top: 1px solid #ded5d5;}
.el-table td, .el-table th {padding: 0;}
table tfoot {vertical-align: middle;}
.el-table tfoot tr td {text-align: center; padding: 20px;}
table.resultsList td {height: 45px; border-bottom: 1px solid #d2d2d2; text-align: center;}
table.resultsList { margin-bottom: 20px}
.mainInput {width: 65px;}
.exam {font-size: 12px;}
.effectStyle {padding-right: 20px;}
.mixStyle tr, .mixStyle td, .mixStyle th {padding: 0;}
</style>
<style>
.text-sm-center { text-align: center; overflow: hidden;}
  .pagination {overflow: hidden; text-align: center; display: inline-block;}
  .page-item {float: left; list-style: none; color: #a9a9a9;}
  .active {font-weight: bold; color: #1f88e3;}
  .page-arrow {color: #000;}
  .page-link {padding: 10px;
    vertical-align: middle;
    text-align: center;
    display: inline-block;
    font-size: 13px;}
ul li {list-style-type: none;}
.search_table td {padding: 5px;}
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
.mixStyle {border: 1px solid #dedada;}
.mixStyle th {background-color: #f7f6f6; height: 40px;}
.mixStyle tr, .mixStyle td, .mixStyle th {}
.restStyle {float: left; width: 110px;}
.restInput {float: left; width: 80px;}
.el-table th.titleTop {width: 75%; text-align: left; text-indent: 20px;}
.el-table th.coolTop {width: 91%; text-align: left; text-indent: 20px;}
.el-table th.titleBottom {padding-right: 20px; }
.resultsList {margin-top: 15px;}

.resultsList th {background-color: #d2d2d2; color: #000; border-right: 1px solid #fff; margin-top: 20px;}
.el-table td.mediaStart {padding: 20px 0 5px; border-top: 1px solid #d2d2d2;}
.el-table th.mediaStart {padding: 20px 0 5px; border-top: 1px solid #d2d2d2;}
.el-popover {overflow-y: scroll;}
.el-table th div.el-dialog{height: 100%; overflow-y: scroll; margin-top: 0!important;}
.el-table .cell, .el-table th div {display: block; overflow: auto;}
.el-checkbox-group .el-transfer-panel__list {overflow: auto;}
.btnWrap {margin: 50px; text-align: center;}
.el-dialog--center .el-dialog__header {padding-top: 0;}
.el-dialog__header {padding-top: 0;}
.el-dialog--center .el-dialog__body {padding: 0 27px 30px;}
 .el-dialog__body {padding: 0 27px 30px;}
 .dialog-footer {text-align: center; display: block;}
</style>