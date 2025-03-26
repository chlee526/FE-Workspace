# UI - TopSearch

-   페이지 내 검색 조건 컴포넌트
-   검색 조건 , 결과에 따라 slot 존재
-   페이지 내 다른 컴포넌트와 sync 연결을 통하여 데이터 조회 처리
-   스크롤 위치에 따라 컴포넌트 영역 확대/축소 가능
-   컴포넌트 내 results, input_form refs 의 outerHeight 값에 따라 쿠키, 스토어에 새로고침 시 보이게 하는 scroll값 위치 저장

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                                                         |
| ---------- | ----- | ------------------------------------------------------------ |
| 2023-06-14 | 1.0.0 | props - topScroll 제거 후 data로 이동, .env 설정에 따라 변경 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```vue
<!-- 기본 -->
<script>
data: [
    {
        asideToMargin: 50, //aside(도움말)과 inner_wrap과의 margin 차이
        scrollPos: 0,
        space: 0,
        firstObserver: null,
        inputResultHgt: 0,
        defaultSearchDatas: null, //reset 시 원복 처리 할 초기 검색조건
        tweening: false,
        isFirst: true,
        topScroll: process.env.VUE_APP_TOP_SCROLL === 'true' ? true : false,
        searchDisabled: false, //검색버튼 비활성화 여부
    },
];
</script>
<template>
    <div class="top_searchs" ref="wrap" :class="[{ 'is-expanded': $store.getters.getTopSearchExpanded }, { 'no-result': hasResultsSlot }]">
        <div class="wrap">
            <div class="inner_wrap" ref="inner_wrap">
                <!-- 검색 조건 -->
                <div class="searchs" ref="searchs">
                    <div class="input_form" ref="input_form">
                        <table class="wrap" ref="input_form_wrap" v-init>
                            <slot name="input_forms"></slot>
                        </table>
                    </div>
                    <div class="input_result">
                        <div class="wrap" ref="input_result_wrap" :style="'height:' + inputResultHgt + 'px'">
                            <slot name="input_result"></slot>
                        </div>
                        <div class="btns">
                            <comp-button class="is-icon-only is-large" title="검색 조건 초기화" @click="reset"><span class="icon">&#xe020;</span></comp-button>
                            <comp-button class="btn_search is-icon-with is-before is-large is-color-black" title="검색" @click="searchingClick" :disabled="searchInputDatas.searchDisabled"><span class="icon">&#xe007;</span><span class="txt">검색</span></comp-button>
                        </div>
                    </div>
                </div>
                <!-- // 검색 조건 -->
                <!-- 검색 결과 -->
                <div class="results" ref="results">
                    <slot name="results"></slot>
                </div>
                <!-- // 검색 결과 -->
            </div>
        </div>
        <button v-if="hasResultsSlot" ref="btn_expander" id="btn_expander" class="btn_expander" @click="evt_openCloseClick">열고/닫기</button>
    </div>
</template>
```

---

#### Props

|        필수        | Prop                 | 설명                                                             | 타입/값   | Default |
| :----------------: | :------------------- | :--------------------------------------------------------------- | --------- | ------- |
| :heavy_check_mark: | **searchDatas**      | 검색 결과                                                        | `Object`  |         |
| :heavy_check_mark: | **searchInputDatas** | 검색 조건                                                        | `Object`  |         |
|                    | **notyDisabled**     | 컴포넌트가 존재한 페이지 내 검색 중 noty화면 비 활성화 처리 여부 | `Boolean` | false   |

---

### Events

|         Event          | 설명                                                                                | Callback     |
| :--------------------: | :---------------------------------------------------------------------------------- | :----------- |
| **evt_openCloseClick** | 상단 검색창 열림/닫기 버튼                                                          | `Object`<br> |
|     **hndl_move**      | 스크롤 위치에 따른 특정 div의 style 변동 처리                                       | `Object`<br> |
|     **evt_scroll**     | 스크롤 방향에 따른 상단 검색창 유지/축소 처리                                       | `Object`<br> |
|     **searching**      | 검색창 조건별로 데이터 조회 이벤트 발생                                             | `Object`<br> |
|   **searchingClick**   | 데이터 조회 이벤트 발생시키기 위한 버튼 클릭                                        | `Object`<br> |
|       **reset**        | 신규 데이터 조회 이벤트 발생 전 가장 최근 혹은 기본 조회 조건으로 원복시키는 이벤트 | `Object`<br> |
