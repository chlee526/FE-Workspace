# Team FE, ServiceDevelopment - Workspace

### 목차

1. [History](#history)
2. [프로젝트](#프로젝트)
3. [폴더 구조](#폴더-구조)
4. [공유 모듈](#공유-모듈)
5. [Workspace 관리](#workspace-관리)
6. [Submodule 관리](#submodule-관리)
7. [Patch-Package](#patch-package)

---

### Demo : [UI-Kit-Vue](https://ui-kit-vue.vercel.app)

---


### History

| 일자       | 버전  | 내용                         |
| ---------- | ----- | ---------------------------- |
| 2023-08-17 | 1.1.0 | Session방식의 권한 인증 추가 |
| 2023-06-02 | 1.0.0 | filter 제거                  |
| 2023-03-21 | 1.0.0 | Workspace 생성               |

---

### 프로젝트

| 일자       | 타입     | 프로젝트명   | 개발 Port | git                                                                                                    |
| ---------- | -------- | ------------ | --------- | ------------------------------------------------------------------------------------------------------- |
| 2023-08-08 | 관리자   | RSN-시장센싱 |     |             |
| 2023-04-05 | 대시보드 | 신한카드     |      |  |
| 2023-04-01 | 대시보드 | DEMO         |    |    |
| 2023-04-01 | 대시보드 | Boilerplate  |       |  |

---

### 폴더 구조

-   <strong>.vscode</strong> ··············// VS Code 설정(boilerplate내 파일 사용)
-   <strong>.eslintrc.js</strong> ··············// lint 설정(boilerplate내 파일 사용)
-   <strong>.prettierrc</strong> ··············// prettier 설정(boilerplate내 파일 사용)
-   <strong>.gitmodules</strong> ··············// 서브모듈 관리
-   <strong>package.json</strong> ··············// 패키지 및 workspace관리
-   <strong>boilerplate</strong> ··············// Boilerplate
    -   <strong>admin</strong> ··············// 관리자
    -   <strong>dashboard</strong> ··············// 대시보드
-   <strong>demo</strong> ··············// 데모버전(서브모듈)
    -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/demo-admin" target="_blank">admin</a></strong> ··············// 관리자
    -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/demo-dashboard" target="_blank">dashboard</a></strong> ··············// 대시보드
-   <strong>projects</strong> ··············// 프로젝트(서브모듈)
    -   <strong>년도\_프로젝트명</strong> ··············// 프로젝트 이름
-   <strong>shared</strong> ··············// 공유 라이브러리
    -   <strong>api</strong> ··············// 공용API
    -   <strong>config</strong> ··············// lint/prettier 설정
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/config/eslint-config-rsn" target="_blank">eslint-config-rsn</a></strong> ··············// ESLint 설정
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/config/prettier-config-rsn" target="_blank">prettier-config-rsn</a></strong> ··············// Prettier 설정
    -   <strong>layout</strong> ··············// 레이아웃
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/layout/aside" target="_blank">aside</a></strong> ··············// ASIDE - 도움말, Nabigator, Top이동
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/layout/footer" target="_blank">footer</a></strong> ··············// FOOTER - 프로젝트 env에서 텍스트 설정
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/layout/function" target="_blank">function</a></strong> ··············// 기능영역 - 엑셀,모달,다일로그,노티
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/layout/header" target="_blank">header</a></strong> ··············// HEADER - 로고, Utils(비밀번호 변경팝업 포함), 메뉴
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/layout/location" target="_blank">location</a></strong> ··············// LOCATION(GNB하단에 현재 위치) - 프로젝트 env에서 사용 설정
    -   <strong>library</strong> ··············// 공용 외부 라이브러리(treemap, cloud) - NPM설치 불가
    -   <strong>router</strong> ··············// 라우터/접근권한(permission)
    -   <strong>store</strong> ··············// 스토어 - Module(다이얼로그,모달,노티,엑셀,옵션,설정,사용자), Getters
    -   <strong>styles</strong> ··············// 공용 스타일
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/styles/font" target="_blank">font</a></strong> ··············// WebFont 파일
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/styles/base" target="_blank">base</a></strong> ··············// normalize, reset, font, colorset, animation
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/styles/layout" target="_blank">layout</a></strong> ··············// 레이아웃(공통, 에러, 팝업)
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/styles/ui" target="_blank">ui</a></strong> ··············// 공통UI(Default, Grid, Box, 도움말, 상태)
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/styles/util" target="_blank">util</a></strong> ··············// vars, mixins
    -   <strong>template</strong> ··············// 템플릿
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/template/age_rank_table" target="_blank">age_rank_table</a></strong> ··············// 성별/연령별 인기 검색어 순위
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/template/attr_selector" target="_blank">attr_selector</a></strong> ··············// 속성(연관어) 선택기
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/template/hot_keyword_rank" target="_blank">hot_keyword_rank</a></strong> ··············// 인기검색어 순위 변화
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/template/inc_genderage" target="_blank">inc_genderage</a></strong> ··············// 라이프사이클
        -   <strong>modal</strong> ··············// Modal
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/template/modal/ex_relation_keyword" target="_blank">ex_relation_keyword</a></strong> ··············// 연관키워드 제외
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/template/modal/reaction_volume" target="_blank">reaction_volume</a></strong> ··············// 반응량
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/template/modal/relinfo" target="_blank">relinfo</a></strong> ··············// 관련정보
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/template/modal/search_volume" target="_blank">search_volume</a></strong> ··············// 검색량
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/template/modal/similar" target="_blank">similar</a></strong> ··············// 유사수량
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/template/rkeyword" target="_blank">rkeyword</a></strong> ··············// 연관키워드
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/template/share_comparison" target="_blank">share_comparison</a></strong> ··············// 분석대상별 언급량 점유율
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/template/volume" target="_blank">volume</a></strong> ··············// 정보량
    -   <strong>ui</strong> ··············// UI(UI, Style)
        -   <strong>board</strong> ··············// 게시판
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/board/paginate" target="_blank">paginate</a></strong> ··············// 페이징
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/board/sort" target="_blank">sort</a></strong> ··············// 테이블 헤더 정렬
        -   <strong>chart</strong> ··············// 차트
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/chart/age" target="_blank">age</a></strong> ··············// 나이
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/chart/gage" target="_blank">gage</a></strong> ··············// 게이지
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/chart/gender" target="_blank">gender</a></strong> ··············// 성별
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/chart/column_line" target="_blank">column_line</a></strong> ··············// 컬럼/라인
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/chart/pie" target="_blank">pie</a></strong> ··············// 파이
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/chart/radar" target="_blank">radar</a></strong> ··············// 라이다
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/chart/treemap" target="_blank">treemap</a></strong> ··············// 트리맵
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/chart/wordcloud" target="_blank">wordcloud</a></strong> ··············// 워드클라우드
        -   <strong>function</strong> ··············// 기능
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/function/dialog" target="_blank">dialog</a></strong> ··············// 다이얼로그(alert, confirm)
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/function/excel" target="_blank">excel</a></strong> ··············// Excel매니저
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/function/modal" target="_blank">modal</a></strong> ··············// 모달
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/function/noty" target="_blank">noty</a></strong> ··············// 노티
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/blob/devel/shared/utils/prototype/README.md#string" target="_blank">copyClipboard</a></strong> ··············// 클립보드 복사
        -   <strong>form</strong> ··············// 폼
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/adv" target="_blank">adv</a></strong> ··············// 고급검색
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/button" target="_blank">button</a></strong> ··············// 버튼
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/checkbox" target="_blank">checkbox</a></strong> ··············// 체크박스
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/checkboxGrp" target="_blank">checkboxGrp</a></strong> ··············// 체크박스(그룹형)
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/colorPicker" target="_blank">colorPicker</a></strong> ··············// Color(피커)
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/datepicker" target="_blank">datepicker</a></strong> ··············// 달력(피커)
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/timepicker" target="_blank">timepicker</a></strong> ··············// 시간(피커)
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/favorite" target="_blank">favorite</a></strong> ··············// 즐겨찾기(★)
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/inputbox" target="_blank">inputbox</a></strong> ··············// 인풋박스
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/radio" target="_blank">radio</a></strong> ··············// 라디오
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/radioGrp" target="_blank">radioGrp</a></strong> ··············// 라디오(그룹형)
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/selectbox" target="_blank">selectbox</a></strong> ··············// 셀렉트박스(콤보박스)
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/slider" target="_blank">slider</a></strong> ··············// 슬라이더
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/switch" target="_blank">switch</a></strong> ··············// 스위치
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/tab" target="_blank">tab</a></strong> ··············// 탭
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/textarea" target="_blank">textarea</a></strong> ··············// 텍스트에어리어
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/filterGrp" target="_blank">filterGrp</a></strong> ··············// 필터링 그룹
            -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/form/listGrp" target="_blank">listGrp</a></strong> ··············// 목록 그룹
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/helpbox_btn" target="_blank">helpbox_btn</a></strong> ··············// 섹션(컨텐츠 박스) 도움말
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/icon" target="_blank">icon</a></strong> ··············// 아이콘
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/image" target="_blank">image</a></strong> ··············// 이미지
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/tooltip" target="_blank">tooltip</a></strong> ··············// 툴팁
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/excel_btn" target="_blank">excel_btn</a></strong> ··············// 엑셀 다운로드 버튼
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/fe_temp_ws/-/tree/main/shared/ui/top_search" target="_blank">top_search</a></strong> ··············// 페이지 상단 검색조건
    -   <strong>utils</strong> ··············// 유틸(기존Util대체 고민)
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/utils/directive" target="_blank">directive</a></strong> ··············// 사용자 디렉티브
        -   <strong><a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/utils/prototype" target="_blank">prototype</a></strong> ··············// Util Prototype
    -   <strong>view</strong> ··············// 공용화면(로그인, 처음 사용자 비밀번호 변경, 에러)

---

### 공유 모듈

/shared에서 사용되는 전체 파일에 대한 설명

#### API

템플릿, 공용 API모음

<table>
    <thead>
        <tr>
            <th colspan="4">경로</th>
            <th>용도</th>
            <th>파일</th>
            <th>파일용도</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="14">api</td>
            <td colspan="3">common</td>
            <td>공통</td>
            <td>auth.js</td>
            <td>인증/권한</td>
        </tr>
        <tr>
            <td rowspan="2"  colspan="3">datalab</td>
            <td rowspan="2">데이터랩 데이터 사용</td>
            <td>age.js</td>
            <td>나이대별 데이터</td>
        </tr>
        <tr>
            <td>gender.js</td>
            <td>성별 데이터</td>
        </tr>
        <tr>
            <td rowspan="2" colspan="3">member</td>
            <td rowspan="2">사용자</td>
            <td>login.js</td>
            <td>로그인, 로그아웃</td>
        </tr>
        <tr>
            <td>user.js</td>
            <td>비밀번호 변경</td>
        </tr>
        <tr>
            <td rowspan="3">template</td>
            <td rowspan="2" colspan="2">adv</td>
            <td rowspan="2">템플릿 - 고급검색</td>
            <td>favorites.js</td>
            <td>즐겨찾기</td>
        </tr>
        <tr>
            <td>lately.js</td>
            <td>최근 검색어 목록</td>
        </tr>
        <tr>
            <td>modal</td>
            <td>ex_relation_keyword</td>
            <td>제외키워드 관리</td>
            <td>ex_relation_keyword.js</td>
            <td>제외 키워드</td>
        </tr>
        <tr>
            <td colspan="3"></td>
            <td></td>
            <td>attrs.js</td>
            <td>속성</td>
        </tr>
        <tr>
            <td colspan="3"></td>
            <td></td>
            <td>datalist.js</td>
            <td>로우데이터</td>
        </tr>
        <tr>
            <td colspan="3"></td>
            <td></td>
            <td>excels.js</td>
            <td>엑셀</td>
        </tr>
        <tr>
            <td colspan="3"></td>
            <td></td>
            <td>popup.js</td>
            <td>팝업 리스트????</td>
        </tr>
        <tr>
            <td colspan="3"></td>
            <td></td>
            <td>rkeyword.js</td>
            <td>연관키워드</td>
        </tr>
        <tr>
            <td colspan="3"></td>
            <td></td>
            <td>volume.js</td>
            <td>정보량</td>
        </tr>
    </tbody>
</table>

#### config

Lint, Prettier 설정
모든 프로젝트네 공통으로 사용됨

<table>
    <thead>
        <tr>
            <th colspan="2">경로</th>
            <th>용도</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2">config</td>
            <td>eslint-config-rsn</td>
            <td>lint 설정</td>
        </tr>
        <tr>
            <td>prettier-config-rsn</td>
            <td>prettier 설정</td>
        </tr>
    </tbody>
</table>

#### layout

기본 레이아웃의 형태와 하위 엘리먼트는 공용으로 관리

<table>
    <thead>
        <tr>
            <th>경로</th>
            <th>용도</th>
            <th>파일</th>
            <th>파일용도</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="5">aside</td>
            <td rowspan="5">Aside 영역</td>
            <td>index.vue</td>
            <td>Aside 메인</td>
        </tr>
        <tr>
            <td>HelperMngr.vue</td>
            <td>도움말 기능 매니저</td>
        </tr>
        <tr>
            <td>Navigator.vue</td>
            <td>네비게이터</td>
        </tr>
        <tr>
            <td>TopMover.vue</td>
            <td>최상단 이동</td>
        </tr>
        <tr>
            <td>style.scss</td>
            <td>Aside 스타일 관리</td>
        </tr>
        <tr>
            <td rowspan="2">footer</td>
            <td rowspan="2">Footer 영역</td>
            <td>index.vue</td>
            <td>Footer 메인</td>
        </tr>
        <tr>
            <td>style.scss</td>
            <td>Footer 스타일 관리</td>
        </tr>
        <tr>
            <td>function</td>
            <td>기능(다이얼로그, 노티, 엑셀, 모달, 공지팝업) 영역</td>
            <td>index.vue</td>
            <td>기능 메인</td>
        </tr>
        <tr>
            <td rowspan="7">header</td>
            <td rowspan="7">Header 영역</td>
            <td>index.vue</td>
            <td>Header 메인</td>
        </tr>
        <tr>
            <td>Gnb.vue</td>
            <td>GNB<br>대시보드 스타일(세로형/가로형)에 따라 GNB or LNB로 사용 됨</td>
        </tr>
        <tr>
            <td>Lnb.vue</td>
            <td>LNB<br>대시보드 스타일(세로형/가로형)에 따라 GNB or LNB로 사용 됨</td>
        </tr>
        <tr>
            <td>HeaderEnvironmentSet.vue</td>
            <td>대시보드 개인 설정(가로형/세로형, 주요컬러)</td>
        </tr>
        <tr>
            <td>Pass_mdfy.vue</td>
            <td>비밀번호 변경</td>
        </tr>
        <tr>
            <td>Utils.vue</td>
            <td>헤더 Util(로그아웃, 시스템, 개인설정 등의 버튼)</td>
        </tr>
        <tr>
            <td>style.scss</td>
            <td>Header 스타일 관리</td>
        </tr>
        <tr>
            <td rowspan="2">location</td>
            <td rowspan="2">현재 메뉴 위치 표시</td>
            <td>index.vue</td>
            <td>Location 메인</td>
        </tr>
        <tr>
            <td>style.scss</td>
            <td>Location 스타일 관리</td>
        </tr>
    </tbody>
</table>

#### library

외부 리소스 자원

<table>
    <thead>
        <tr>
            <th>경로</th>
            <th>용도</th>
            <th>파일</th>
            <th>파일용도</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="4">library</td>
            <td rowspan="4">외부 리소스</td>
            <td>index.vue</td>
            <td>Library 메인</td>
        </tr>
        <tr>
            <td>jquery-treemap.js</td>
            <td>차트 - 트리맵</td>
        </tr>
        <tr>
            <td>jQWCloudv3.4.1.js</td>
            <td>차트 - 워드클라우드</td>
        </tr>
        <tr>
            <td>quill.js</td>
            <td>Quill Editor</td>
        </tr>
    </tbody>
</table>

#### router

고정 라우터/퍼미션

<table>
    <thead>
        <tr>
            <th>경로</th>
            <th>용도</th>
            <th>파일</th>
            <th>파일용도</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2">router</td>
            <td rowspan="2">고정 라우터/퍼미션</td>
            <td>index.vue</td>
            <td>고정 라우터, 페이지 진입 권한(로그인, 비밀번호변경), 라우터 권한 관리</td>
        </tr>
        <tr>
            <td>permission.js</td>
            <td>라우터 beforeEach 관리</td>
        </tr>
    </tbody>
</table>

#### store(vuex)

고정 라우터/퍼미션

<table>
    <thead>
        <tr>
            <th colspan="2">경로</th>
            <th>용도</th>
            <th>파일</th>
            <th>파일용도</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="10">store</td>
            <td></td>
            <td></td>
            <td>index.js</td>
            <td>Store 메인</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>getters.js</td>
            <td>Store Getter 관리</td>
        </tr>
        <tr>
            <td rowspan="8">modules</td>
            <td rowspan="8">vuex 모듈</td>
            <td>dialog.js</td>
            <td>기능 - 다이얼로그(Actions)</td>
        </tr>
        <tr>
            <td>excel.js</td>
            <td>기능 - 엑셀(Actions)</td>
        </tr>
        <tr>
            <td>modal.js</td>
            <td>기능 - Modal(Actions)</td>
        </tr>
        <tr>
            <td>noticePopup.js</td>
            <td>기능 - 공지 팝업(Actions)</td>
        </tr>
        <tr>
            <td>noty.js</td>
            <td>기능 - Noty(Actions)</td>
        </tr>
        <tr>
            <td>opts.js</td>
            <td>프로젝트 공통 코드 목록 관리(state, mutations, actions)</td>
        </tr>
        <tr>
            <td>setting.js</td>
            <td>프로젝트 설정 관리(state, mutations, actions)</td>
        </tr>
        <tr>
            <td>user.js</td>
            <td>사용자 관리(state, mutations, actions)</td>
        </tr>
    </tbody>
</table>

#### styles

고정 레이아웃, UI에 대한 스타일 정의(프로젝트 내에서 override 할수 있음)

<table>
    <thead>
        <tr>
            <th colspan="3">경로</th>
            <th>용도</th>
            <th>파일</th>
            <th>파일용도</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="40">styles</td>
            <td colspan="2"></td>
            <td></td>
            <td>styles</td>
            <td>Style 메인</td>
        </tr>
        <tr>
            <td colspan="2"></td>
            <td></td>
            <td>styles.module</td>
            <td>Export Style 관리</td>
        </tr>
        <tr>
            <td rowspan="5" colspan="2">base</td>
            <td rowspan="5">기본 Style 설정</td>
            <td>normalize</td>
            <td>스타일 기본 설정</td>
        </tr>
        <tr>
            <td>reset</td>
            <td>스타일 리셋 파일</td>
        </tr>
        <tr>
            <td>animation</td>
            <td>애니메이션 관리</td>
        </tr>
        <tr>
            <td>color_set</td>
            <td>컬러 설정</td>
        </tr>
        <tr>
            <td>progress</td>
            <td>프로그레스/로딩 관련</td>
        </tr>
        <tr>
            <td colspan="2">fonts</td>
            <td>웹폰트</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td rowspan="3" colspan="2">layout</td>
            <td rowspan="3">레이아웃</td>
            <td>error</td>
            <td>에러 페이지</td>
        </tr>
        <tr>
            <td>layout</td>
            <td>레이아웃</td>
        </tr>
        <tr>
            <td>popup</td>
            <td>Modal</td>
        </tr>
        <tr>
            <td rowspan="7">ui</td>
            <td>img</td>
            <td>UI공용 이미지</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td rowspan="6"></td>
            <td rowspan="6">컴포넌트화 되지 않은 UI</td>
            <td>bedge</td>
            <td>뱃지</td>
        </tr>
        <tr>
            <td>box</td>
            <td>박스 시스템</td>
        </tr>
        <tr>
            <td>default</td>
            <td>기본 UI 스타일링 모음</td>
        </tr>
        <tr>
            <td>grid</td>
            <td>그리드 시스템</td>
        </tr>
        <tr>
            <td>helper</td>
            <td>도움말</td>
        </tr>
        <tr>
            <td>is-status</td>
            <td>상태 스타일</td>
        </tr>
        <tr>
            <td rowspan="2" colspan="2">util</td>
            <td rowspan="2">mixin, variables</td>
            <td>mixins</td>
            <td>scss mixin</td>
        </tr>
        <tr>
            <td>variables</td>
            <td>설정값 변수화</td>
        </tr>
    </tbody>
</table>

#### templates

템플릿 모듈

<table>
    <thead>
        <tr>
            <th colspan="3">경로</th>
            <th>용도</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="40">templates</td>
            <td rowspan="5">modal</td>
            <td>relinfo</td>
            <td>관련정보(일자별정보량, 연관키워드, 로우데이터)</td>
        </tr>
        <tr>
            <td>ex_relation_keyword</td>
            <td>제외 키워드 설정</td>
        </tr>
        <tr>
            <td>reaction_volume</td>
            <td>반응량</td>
        </tr>
        <tr>
            <td>search_volume</td>
            <td>검색량</td>
        </tr>
        <tr>
            <td>similar</td>
            <td>유사수량</td>
        </tr>
        <tr>
            <td colspan="2">age_rank_table</td>
            <td>성별 인기 검색어 순위(테이블형태)</td>
        </tr>
        <tr>
            <td colspan="2">attr_selector</td>
            <td>분류체계 선택</td>
        </tr>
        <tr>
            <td colspan="2">hot_keyword_rank</td>
            <td>인기 검색어 순위 변화</td>
        </tr>
        <tr>
            <td colspan="2">inc_genderage</td>
            <td>성별/연령별 인기 검색어 순위</td>
        </tr>
        <tr>
            <td colspan="2">rkeyword</td>
            <td>연관키워드</td>
        </tr>
        <tr>
            <td colspan="2">share_comparison</td>
            <td>분석대상별 언급량 점유율 비교</td>
        </tr>
    </tbody>
</table>

#### ui

UI 컴포넌트/모듈

<table>
    <thead>
        <tr>
            <th colspan="3">경로</th>
            <th>용도</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="50">ui</td>
            <td rowspan="2">board</td>
            <td>paginate</td>
            <td>게시판 페이징</td>
        </tr>
        <tr>
            <td>sort</td>
            <td>게시판 정렬</td>
        </tr>
        <tr>
            <td rowspan="8">chart</td>
            <td>age</td>
            <td>나이별</td>
        </tr>
        <tr>
            <td>column_line</td>
            <td>컬럼&라인</td>
        </tr>
        <tr>
            <td>gage</td>
            <td>게이지</td>
        </tr>
        <tr>
            <td>gender</td>
            <td>성별</td>
        </tr>
        <tr>
            <td>pie</td>
            <td>파이(도넛)</td>
        </tr>
        <tr>
            <td>radar</td>
            <td>라이다</td>
        </tr>
        <tr>
            <td>treemap</td>
            <td>트리맵</td>
        </tr>
        <tr>
            <td>wordcloud</td>
            <td>워드클라우드</td>
        </tr>
        <tr>
            <td rowspan="19">form</td>
            <td>adv</td>
            <td>고급검색</td>
        </tr>
        <tr>
            <td>button</td>
            <td>버튼</td>
        </tr>
        <tr>
            <td>checkbox</td>
            <td>체크박스</td>
        </tr>
        <tr>
            <td>checkboxGrp</td>
            <td>체크박스 그룹형</td>
        </tr>
        <tr>
            <td>colorPicker</td>
            <td>컬러피커</td>
        </tr>
        <tr>
            <td>datepicker</td>
            <td>달력</td>
        </tr>
        <tr>
            <td>editor</td>
            <td>텍스트 에디터</td>
        </tr>
        <tr>
            <td>favorite</td>
            <td>즐겨찾기</td>
        </tr>
        <tr>
            <td>filterGrp</td>
            <td>필터링 그룹</td>
        </tr>
        <tr>
            <td>inputbox</td>
            <td>인풋박스</td>
        </tr>
        <tr>
            <td>listGrp</td>
            <td>목록</td>
        </tr>
        <tr>
            <td>radio</td>
            <td>라디오버튼</td>
        </tr>
        <tr>
            <td>radioGrp</td>
            <td>라디오버튼 그룹</td>
        </tr>
        <tr>
            <td>selectbox</td>
            <td>셀렉트박스</td>
        </tr>
        <tr>
            <td>slider</td>
            <td>슬라이더</td>
        </tr>
        <tr>
            <td>switch</td>
            <td>스위치(토글)</td>
        </tr>
        <tr>
            <td>tab</td>
            <td>탭</td>
        </tr>
        <tr>
            <td>textarea</td>
            <td>텍스트에어리어</td>
        </tr>
        <tr>
            <td>timepicker</td>
            <td>타임피커</td>
        </tr>
        <tr>
            <td rowspan="5">function</td>
            <td>dialog</td>
            <td>기능 - 다이얼로그</td>
        </tr>
        <tr>
            <td>excel</td>
            <td>기능 - 엑셀 매니저</td>
        </tr>
        <tr>
            <td>modal</td>
            <td>기능 - 모달</td>
        </tr>
        <tr>
            <td>notice_popup</td>
            <td>기능 - 공지사항(모달)</td>
        </tr>
        <tr>
            <td>noty</td>
            <td>기능 - 노티(알림)</td>
        </tr>
        <tr>
            <td colspan="2">excel_btn</td>
            <td>엑셀 다운로드 버튼</td>
        </tr>
        <tr>
            <td colspan="2">helpbox_btn</td>
            <td>도움말 버튼</td>
        </tr>
        <tr>
            <td colspan="2">icon</td>
            <td>아이콘</td>
        </tr>
        <tr>
            <td colspan="2">image</td>
            <td>이미지</td>
        </tr>
        <tr>
            <td colspan="2">tooltip</td>
            <td>툴팁</td>
        </tr>
        <tr>
            <td colspan="2">top_search</td>
            <td>상단검색조건</td>
        </tr>
        <tr>
            <td colspan="2">tree_view</td>
            <td>트리형 뷰어</td>
        </tr>
        <tr>
            <td colspan="2">tester</td>
            <td>퍼포먼스 테스터</td>
        </tr>
    </tbody>
</table>

#### utils

JS 유틸리티

<table>
    <thead>
        <tr>
            <th colspan="2">경로</th>
            <th>용도</th>
            <th>파일</th>
            <th>파일용도</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="50">utils</td>
            <td></td>
            <td></td>
            <td>index.js</td>
            <td>Util 메인</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>auth.js</td>
            <td>세션/토큰/인증</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>eventBus.js</td>
            <td>이벤트버스</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>localStorage.js</td>
            <td>로컬스토리지</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>refresh.js</td>
            <td>새로고침</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>request.js</td>
            <td>HttpRequest(Axios)</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td>validate.js</td>
            <td>유효성검증</td>
        </tr>
        <tr>
            <td rowspan="2">directive</td>
            <td rowspan="2">커스텀 디렉티브</td>
            <td>behavior-resize-scroll.js</td>
            <td>리사디즈, 스크롤 이벤트 감지</td>
        </tr>
        <tr>
            <td>click-outside.js</td>
            <td>컴포넌트/모듈 외 영역 클릭 감지</td>
        </tr>
        <tr>
            <td rowspan="7">prototype</td>
            <td rowspan="7">데이터 타입별 프로토 타입</td>
            <td>util.array.js</td>
            <td>Array</td>
        </tr>
        <tr>
            <td>util.colors.js</td>
            <td>Color</td>
        </tr>
        <tr>
            <td>util.date.js</td>
            <td>Date</td>
        </tr>
        <tr>
            <td>util.link.js</td>
            <td>Link</td>
        </tr>
        <tr>
            <td>util.number.js</td>
            <td>Number</td>
        </tr>
        <tr>
            <td>util.object.js</td>
            <td>Object</td>
        </tr>
        <tr>
            <td>util.string.js</td>
            <td>String</td>
        </tr>
    </tbody>
</table>

#### view

공통 화면

<table>
    <thead>
        <tr>
            <th colspan="3">경로</th>
            <th>용도</th>
            <th>파일</th>
            <th>파일용도</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="50">view</td>
            <td colspan="2">error</td>
            <td>에러</td>
            <td>index.vue</td>
            <td>에러 메인</td>
        </tr>
        <tr>
            <td rowspan="2">member</td>
            <td>login</td>
            <td>로그인</td>
            <td>index.vue</td>
            <td>로그인 메인</td>
        </tr>
        <tr>
            <td>pass</td>
            <td>비밀번호 최초 변경</td>
            <td>index.vue</td>
            <td>비밀번호 최초 변경 메인</td>
        </tr>
        <tr>
            <td rowspan="2" colspan="2">notice</td>
            <td rowspan="2">공지사항</td>
            <td>index.vue</td>
            <td>공지사항 메인</td>
        </tr>
        <tr>
            <td>NoticeDetail.vue</td>
            <td>공지사항 상세</td>
        </tr>
    </tbody>
</table>

---

### Workspace 관리

-   서브모듈을 사용하는 곳은 workspace에서 관리 하지 않음.
-   프로젝트간의 컴포넌트 및 라이브러리 공유 절대 금지.

```
// 추가
.package.json

"workspaces": [
    // 추가
]

// 모듈 등록(추가 후 모듈등록 해야 공유)
npm i
```

---

### Submodule 관리

-   서브모듈 추가는 Demo/Project 에서만 가능.

```
// 서브모듈(신규 프로젝트) 추가
1. gitlab에 프로젝트 생성(or 기존 respository)
2. git submodule add {연결할 git 주소} {저장 프로젝트명} (workspace/projects에 submodule 연결)
3. .gitmodules 파일에서 추가된 모듈의 속성에 'ignore = all' 추가(변경사항에 대해서 WS에서 체크하지 않음)
4. vscode에서 프로젝트 열기
5. boilerplate에서 타입에 맞게 프로젝트 복사
6. 프로젝트에 맞게 readme.md 작성
7. 프로젝트 커밋(Commit Message: init)
```

```
// 서브모듈 업데이트
1. git submodule update --init --recursive
```

```
// 서브모듈 삭제
1. .gitmodules에서 해당 내용 삭제
2. git rm -r --cached {폴더명}
```

---

### Patch-Package

-   라이브러리 자체에 버그 or 수정 사항이 생길 경우 사용

```
// node_modules에서 수정해야할 패키지를 변경한 뒤 아래 명령어 실행
1. npx patch-package {수정해야할 패키지명}  // patches 폴더 내 수정 기록에 대한 파일 생성
```
